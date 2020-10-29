import { createConnection, ConnectionOptions, Connection } from "typeorm";

export const Db = (entities) => {

    const options: ConnectionOptions = {
        type: 'mongodb',
        entities: entities
        //@todo - add db details
    };

    return async (req, res, next) => {
        req.dbConnection = await createConnection(options);
        next();
    }
};
