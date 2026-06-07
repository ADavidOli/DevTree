import { Router } from "express";


const router = Router();


// ROUTING
router.get('/', (req, res)=>{
    res.send('hola');
})

router.get('/nosotros', (req, res)=>{
    res.send('nosotros');
})

router.get('/blog', (req, res)=>{
    res.send('blog');
})



export default router;