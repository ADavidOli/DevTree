import jwt, {JwtPayload} from 'jsonwebtoken';


export const generateJWT = (payload: JwtPayload)=>{
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: '180d', //tiempo de autenticacion.,
    });
    return token
}