import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRoute } from './modules/users/user.route';
const app = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

export default app;
