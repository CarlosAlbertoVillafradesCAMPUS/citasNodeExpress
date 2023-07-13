import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {dtoPaciente} from "../controller/dtoPaciente.js";

const proxyPaciente = (req,res,next) =>{
    try {
        let data = plainToClass(dtoPaciente, req.body, {excludeExtraneousValues:true})
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export default proxyPaciente;