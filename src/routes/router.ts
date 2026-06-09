import { Router } from "express";


const router = Router();


// ROUTING
router.post('/auth/register', (req, res)=>{

    console.log(req.body);
    res.json({
        msg:'estás en register'
    })
});

router.get('/nosotros', (req, res)=>{
    res.send('nosotros');
})

router.get('/blog', (req, res)=>{
    res.send('blog');
})



export default router;