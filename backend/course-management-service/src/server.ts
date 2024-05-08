import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import app from "./app";
import databaseSetup from "./bootstrap/database";
// import {AppLogger} from "./utils/logger";


const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT;
let server: https.Server | http.Server;

console.log("isProduction : " + isProduction)
if (isProduction) {
    server = https.createServer({
        key: fs.readFileSync(process.env.SERVER_KEY_PATH || 'server.key'),
        cert: fs.readFileSync(process.env.SERVER_CERT_PATH || 'server.cert')
    }, app);
} else {
    server = new http.Server(app);
}

databaseSetup().then(() => {
    // AppLogger.info('--> Mongoose connected!');
    console.log('--> Mongoose connected!');
    // passportStartup(app).then(() => {
    // AppLogger.info('--> Passport started!');
    server.listen(port, () => {
        // AppLogger.info('--> Course Management Service successfully started at port: ' + port);
        console.log('--> Course Management Service successfully started at port: ' + port);
    });
    // }).catch(console.error);
}).catch(console.error);

export default server;
