import express from 'express'
import cors from 'cors';
import Crud from './routes/Crud'

class App {
    constructor(){
        this.server = express()
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.server.use(cors());
        this.server.use(express.json());
    }
    routes(){
        this.server.use(Crud)
    }
}

export default new App;
