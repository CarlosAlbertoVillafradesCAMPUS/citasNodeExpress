import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {dtoCita} from "../controller/dtoCita.js";

const proxyCita = (req,res,next) =>{
    try {
        let data = plainToClass(dtoCita, req.body, {excludeExtraneousValues:true})
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export default proxyCita;