import { Expose, Transform, Type } from "class-transformer";

export class dtoConsultoria{
    @Expose({name:"nombre"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    cons_nombre:string;

    constructor(cons_nombre:string){
        this.cons_nombre = cons_nombre;
    }
}