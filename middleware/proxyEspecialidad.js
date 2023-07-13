import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {dtoEspecialidad} from "../controller/dtoEspecialidad.js"


const proxyEspecialidad = (req,res,next) =>{
    try {
        let data = plainToClass(dtoEspecialidad, req.body, {excludeExtraneousValues:true})
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export default proxyEspecialidad;