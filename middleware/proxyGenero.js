import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {dtoGeneroPost} from "../controller/dtoGeneroPost.js";

const proxyGenero = (req,res,next) =>{
    try {
        let data = plainToClass(dtoGeneroPost, req.body, {excludeExtraneousValues:true})
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export default proxyGenero;