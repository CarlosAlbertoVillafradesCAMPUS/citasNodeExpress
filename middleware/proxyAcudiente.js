import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {dtoAcudiente} from "../controller/dtoAcudiente.js"

const proxyAcudiente = (req,res,next) => {
    try {
        let data = plainToClass(dtoAcudiente, req.body, {excludeExtraneousValues:true});
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export default proxyAcudiente;