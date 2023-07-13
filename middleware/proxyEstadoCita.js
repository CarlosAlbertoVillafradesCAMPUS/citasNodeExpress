import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {dtoEstadoCita} from "../controller/dtoEstadoCita.js"

const proxyEstadoCita = (req,res,next) =>{
    try {
        let data = plainToClass(dtoEstadoCita, req.body, {excludeExtraneousValues:true})
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export default proxyEstadoCita;