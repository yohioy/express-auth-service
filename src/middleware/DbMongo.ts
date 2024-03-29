import { createConnection, getConnection, ConnectionOptions, Connection, MongoEntityManager } from "typeorm";
const debug = require('debug')('app:middleware:db-mongo');

export const Db = (entities) => {

    const options: ConnectionOptions = {
        type: "mongodb",
        //url: "mongodb://root:rootpassword@127.0.0.1:27017/express?w=1",
        host: "127.0.0.1",
        port:27017,
        username: "root",
        password: "rootpassword",
        database: "blog",
        entities: entities,
        synchronize: true,
        logging: true,
        useUnifiedTopology: true,
        authSource: "admin",
        readPreference: "primary",
        ssl: false
    };

    return async (req, res, next) => {

        try{
            const connection = await createConnection(options);
            const mongoManager: MongoEntityManager = await connection.mongoManager;
            req.dbManager = mongoManager;
        } catch (e) {
            if (e.name === "AlreadyHasActiveConnectionError") {
                const existentConn = getConnection("default");
                const mongoManager: MongoEntityManager = await existentConn.mongoManager;
                req.dbManager = mongoManager;
            } else {
                debug('Error', e);
                console.log('Error', e);
            }
        }
        next();
    }
};
