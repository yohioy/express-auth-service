import express, { Application, Response, Request } from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { Db } from './middleware/DbMongo';
import { UsersModel } from './shared/users/users.model';


type TAppConfig = {
    host: string;
    port: string;
}

const AppConfig: TAppConfig = config.get('App');

// Create a new express application instance
const app: Application = express();

// Call middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(Db([UsersModel]));

app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Hello from home');
});

app.listen(AppConfig.port, () => {
    console.log(`Server running on port http://${AppConfig.host}:${AppConfig.port}`);
});
