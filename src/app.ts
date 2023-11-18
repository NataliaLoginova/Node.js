import express, {Request, Response, NextFunction, Application} from 'express';
import {connectToDB} from "./db/db-connection";
import {productController} from "./product/product.controller";
import {cartController} from "./cart/Cart.contoller";
import bodyParser from "body-parser";
import {seedProducts} from "./dataload/seed-products";
import {userController} from "./user/User.controller";
import cookieParser from 'cookie-parser';
import {authMiddleware} from "./middlewares/authentification";
import {seedRoles} from "./dataload/seed-roles";
import {config} from 'dotenv';
import {healthCheck} from './healthCheck';
import {debug} from 'debug';
import {loggers} from './middlewares/loggers';

const debugLogger = debug('my-app:server');
const {APP_PORT, DB_CONNECTION_URL} = config().parsed!;

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    debugLogger(`Error occurred:${err}`)
    res.status(500);
    res.send({message: err.message});
};

const app: Application = express();

const server = app.listen(APP_PORT, async () => {
    console.log(`The server has been started on port ${APP_PORT}`);
    await connectToDB(DB_CONNECTION_URL);
    await seedProducts();
    await seedRoles();
})

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(loggers)
app.use('/health', healthCheck);
app.use('/auth', userController)
app.use(productController)
app.use('/profile', authMiddleware, cartController)
app.use(errorHandler)

let connections: Array<Record<string, any>> = [];

server.on('connection', (connection) => {
    connections.push(connection);

    connection.on('close', () => {
        connections = connections.filter((currentConnection) => currentConnection !== connection);
    });
});

export const shutdown = () => {
    debugLogger('Received kill signal, shutting down gracefully');

    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 20000);

    connections.forEach((connection) => connection.end());

    setTimeout(() => {
        connections.forEach((connection) => connection.destroy());
    }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);