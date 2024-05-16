// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="global.d.ts" />
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import favicon from 'serve-favicon';
import * as favPath from 'path';
import {RabbitMQService} from "./services/RrabbitMQService";
import {initRoutes} from "./routes";
import {RequestLoggerHandler} from "./middleware/request-logger";
import {ResponseHandler} from "./middleware/response-handler";
import {jsonErrorHandler} from "./middleware/error-handler";
import {Authentication} from "./middleware/authentication";

const expressApp = async () => {
    const isProduction = process.env.NODE_ENV === "production";
    const app = express();

    app.use(RequestLoggerHandler);
    app.use(ResponseHandler);

    app.use(express.json({limit: '20mb'}));
    app.use(express.urlencoded({limit: '20mb', extended: true}));

    if (!isProduction) {
        app.use(morgan("dev"));
        app.use(cors({
            optionsSuccessStatus: 200,
            origin: '*',
            allowedHeaders: ['Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Authorization, X-Requested-With', 'Cache-Control']
        }));
    } else {
        app.use(morgan('combined'));
        app.use(cors());
    }

    const rabbitMQService = await RabbitMQService.getInstance()

    app.use(favicon(favPath.join(__dirname, "../resources", "favicons/favicon.ico")));
    app.use('/static', express.static(favPath.join(__dirname, "../resources")));

    app.get('', (req, res) => {
        res.json("Auth service™ API").status(200);
    });

    app.use('/me', Authentication.verifyToken);
    initRoutes(app, rabbitMQService)

    // Error Handling
    app.use(jsonErrorHandler);

    return app;
}


export default expressApp;
