import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {dtoConsultoria} from "../controller/dtoConsultoria.js"

const proxyConsultorias = (req,res,next) => {
    try {
        let data = plainToClass(dtoConsultoria, req.body, {excludeExtraneousValues:true});
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export default proxyConsultorias;