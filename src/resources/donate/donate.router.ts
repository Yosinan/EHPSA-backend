
import { Router } from 'express';
import { createDonate } from './donate.controller';
import { respond } from '../../utils/respond';

const donateRouter = Router();

donateRouter.post('/donate', createDonate,respond);

export default donateRouter;
