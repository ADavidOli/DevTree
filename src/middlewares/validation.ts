import type { Request, Response } from "express"
import { validationResult } from "express-validator";

export const handleInputError = (req: Request, res:Response)=>{
    
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

}