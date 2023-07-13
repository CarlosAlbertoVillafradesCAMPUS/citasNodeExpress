import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {dtoTipoDocumentoPost} from "../controller/dtoTipoDocumentoPost.js"

const proxyTipoDocumento = (req,res,next) => {
    try {
        let data = plainToClass(dtoTipoDocumentoPost, req.body, {excludeExtraneousValues:true});
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export default proxyTipoDocumento;