import "dotenv/config";
import express from "express";
import cors from 'cors';
import proxy from "express-http-proxy";
import morgan from "morgan";

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

app.use("/api/authentication", proxy("http://localhost:8001"));
app.use("/api/course-management", proxy("http://localhost:8002"));
app.use("/api/learner", proxy("http://localhost:8003"));
app.use("/api/notification", proxy("http://localhost:8004")); // products

app.get('/', (req, res) => {
    const json = {
        "id": "Gateway™ API",
        "auth": ["http://localhost:8000/api/authentication", "http://localhost:8001/"],
        "courses": ["http://localhost:8000/api/course-management", "http://localhost:8002/"],
        "lms": ["http://localhost:8000/api/learner", "http://localhost:8003/"],
        "notifications": ["http://localhost:8000/api/notification", "http://localhost:8004/"],
    }
    res.json(json).status(200);
});

app.listen(8000, () => {
    console.log("Gateway is Listening to Port 8000");
});
