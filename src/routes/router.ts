import { Router } from "express";
import { body } from "express-validator";
// import { register } from "../controllers/RegisterController";
import { CreateAccount, getUser, login, uploadImage, updateProfile, getUserByHandle } from "../handlers";
import { handleInputError } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";

const router = Router();


// ROUTING
router.post('/auth/register',
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password').isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('email').isEmail().withMessage('email no valido'),
    handleInputError,
    CreateAccount);

router.post('/auth/login',

    body('password').notEmpty().withMessage('El password es obligatorio'),
    body('email').isEmail().withMessage('email no valido'),
    handleInputError,
    login);

router.get('/user', authenticate,getUser);

router.patch('/user',
    body('handle').notEmpty().withMessage('el handle no puede ir vacio'),
    body('description').notEmpty().withMessage('la descripcion no puede ir vacia'),
    handleInputError,
    authenticate, updateProfile);

router.get('/:handle',getUserByHandle)


// cargando las imagenes.
router.post('/user/image', authenticate, uploadImage)


export default router;