import express, { Application, Request, Response } from 'express';
import { booksRouter } from './app/controllers/books.controller';
import { borrowRouter } from './app/controllers/borrow.controller';


const app: Application = express();
app.use(express.json());

app.use('/api/books', booksRouter);
app.use('/api/borrow', borrowRouter);

app.get('/', (req:Request, res:Response)=>{
    res.send('Welcome to the Library Management App');
})

export default app;