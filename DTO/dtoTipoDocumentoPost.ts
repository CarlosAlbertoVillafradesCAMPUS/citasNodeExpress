import { Expose, Transform, Type } from "class-transformer";

export class dtoTipoDocumentoPost{
    @Expose({name:"nombre"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    tipdoc_nombre:string;

    @Expose({name:"abreviatura"})
    @Transform(({value}) =>  {if(/^[A-Za-z\.]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    tipdoc_abreviatura:string;
    constructor(tipdoc_nombre:string, tipdoc_abreviatura:string){
        this.tipdoc_nombre = tipdoc_nombre;
        this.tipdoc_abreviatura = tipdoc_abreviatura;
    }
}