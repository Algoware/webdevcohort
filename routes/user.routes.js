import express from 'express'
import {registerUser,login,verifyUser} from '../controller/user.crontroller.js'  

const router = express.Router();

router.post('/register',registerUser);


router.post('/login',login);

router.get('/verify/:token',verifyUser);

export default router;