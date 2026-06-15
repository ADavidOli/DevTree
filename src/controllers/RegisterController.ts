

export const register = (req, res) => {
    console.log(req.body);
    res.json({
        msg: 'estás en register'
    })
}