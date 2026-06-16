import { Router } from "express";
import { body } from "express-validator";
// import { register } from "../controllers/RegisterController";
import { CreateAccount } from "../handlers";

const router = Router();


// ROUTING
router.post('/auth/register',
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password').isLength({min:8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('email').isEmail().withMessage('email no valido'),
    CreateAccount);

router.get('/nosotros', (req, res)=>{
    res.send('nosotros');
})

router.get('/blog', (req, res)=>{
    res.send('blog');
})



export default router;