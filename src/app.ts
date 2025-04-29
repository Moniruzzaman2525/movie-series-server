
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import router from "./app/routes";


const app: Application = express();

app.use(express.json());
app.use(cors())
app.use(cookieParser())


app.use('/api/v1', router)


app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Movie series server is running...'
    })
})


export default app
