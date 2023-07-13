import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {dtoMedico} from "../controller/dtoMedico.js";

const proxyMedico = (req,res,next) =>{
    try {
        let data = plainToClass(dtoMedico, req.body, {excludeExtraneousValues:true})
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export default proxyMedico;