import express from 'express'
import {  signUp } from './signup'
import { respond } from '../../utils/respond';
import { signin } from './signin';
import { validateRequest } from '../../middlewares/validateRequest';


const authRouter = express.Router()

console.log('authRouter');
authRouter.post('/signup', signUp, respond);
authRouter.post('/signin', validateRequest, signin, respond);



export default authRouter