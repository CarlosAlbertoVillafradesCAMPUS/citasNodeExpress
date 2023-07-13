import {Expose, Transform, Type} from "class-transformer";

export class dtoGeneroPost{
    @Expose({name:"nombre"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    gen_nombre:string;

    @Expose({name:"abreviatura"})
    @Transform(({value}) =>  {if(/^[A-Za-z\.]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    gen_abreviatura:string;
    constructor(gen_nombre:string, gen_abreviatura:string){
        this.gen_nombre = gen_nombre;
        this.gen_abreviatura = gen_abreviatura;
    }
}