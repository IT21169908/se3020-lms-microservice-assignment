// <reference path="global.d.ts" />
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import favicon from 'serve-favicon';
import * as favPath from 'path';

const isProduction = process.env.NODE_ENV === "production";
const app = express();


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


app.use(favicon(favPath.join(__dirname, "../resources", "favicons/favicon.ico")));
app.use('/api/static', express.static(favPath.join(__dirname, "../resources")));

app.get('/api', (req, res) => {
    res.json("Learner service™ API").status(200);
});

export default app;