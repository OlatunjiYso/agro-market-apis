import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "regenerator-runtime/runtime";


import { authHandler } from './Users/routes';

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/auth', authHandler);


app.listen(process.env.PORT, () => {
    if(process.env.NODE_ENV === 'developement') {
        console.log(`server running on localhost: ${process.env.PORT}`);
    }
});