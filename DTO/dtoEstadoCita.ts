import { Expose, Transform, Type } from "class-transformer";

export class dtoEstadoCita{

    @Expose({name:"nombre"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    estcita_nombre:string;

    constructor(estcita_nombre:string){
        this.estcita_nombre = estcita_nombre;
    }
}