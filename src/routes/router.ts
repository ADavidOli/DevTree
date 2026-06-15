import { Router } from "express";
// import { register } from "../controllers/RegisterController";
import { CreateAccount } from "../handlers";

const router = Router();


// ROUTING
router.post('/auth/register',CreateAccount);

router.get('/nosotros', (req, res)=>{
    res.send('nosotros');
})

router.get('/blog', (req, res)=>{
    res.send('blog');
})



export default router;