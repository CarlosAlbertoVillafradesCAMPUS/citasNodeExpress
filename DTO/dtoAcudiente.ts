import { Expose, Transform, Type } from "class-transformer";

export class dtoAcudiente{
    @Expose({name:"nombre"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    acu_nombreCompleto:string;

    @Expose({name:"telefono"})
    @Transform(({value}) =>  {if(/^[\d\s+]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    acu_telefono:string;

    @Expose({name:"direccion"})
    @Transform(({value}) =>  {if(/^[\w\s+#-]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    acu_direccion:string;

    constructor(acu_nombreCompleto:string, acu_telefono:string, acu_direccion:string){
        this.acu_nombreCompleto = acu_nombreCompleto;
        this.acu_telefono = acu_telefono;
        this.acu_direccion = acu_direccion;
    }
}