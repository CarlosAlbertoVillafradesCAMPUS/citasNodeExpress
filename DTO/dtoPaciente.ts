import { Expose, Transform, Type } from "class-transformer";

export class dtoPaciente{
    @Expose({name:"cc"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: "Error en los parametros de entrada"};}, {toClassOnly: true})
    usu_id:number;

    @Expose({name:"primer_nombre"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    usu_nombre:string;

    @Expose({name:"segundo_nombre"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    usu_segdo_nombre:string;

    @Expose({name:"primer_apellido"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    usu_primer_apellido_usuar:string;

    @Expose({name:"segundo_apellido"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    usu_segdo_apellido_usuar:string;

    @Expose({name:"telefono"})
    @Transform(({value}) =>  {if(/^[\d\s+]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    usu_telefono:string;

    @Expose({name:"direccion"})
    @Transform(({value}) =>  {if(/^[\w\s+#-]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    usu_direccion:string;

    @Expose({name:"email"})
    @Transform(({value}) =>  {if(/^[\w\s+#@.-]+$/g.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    usu_email:string;

    @Expose({name:"tipo_documento"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: "Error en los parametros de entrada"};}, {toClassOnly: true})
    usu_tipodoc:number;

    @Expose({name:"genero"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: "Error en los parametros de entrada"};}, {toClassOnly: true})
    usu_genero:number;

    @Expose({name:"acudiente"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: "Error en los parametros de entrada"};}, {toClassOnly: true})
    usu_acudiente:number;

    constructor(usu_id:number, usu_nombre:string, usu_segdo_nombre:string, usu_primer_apellido_usuar:string, usu_segdo_apellido_usuar:string, usu_telefono:string, usu_direccion:string, usu_email:string, usu_tipodoc:number, usu_genero:number, usu_acudiente:number){
        this.usu_id = usu_id;
        this.usu_nombre = usu_nombre;
        this.usu_segdo_nombre = usu_segdo_nombre;
        this.usu_primer_apellido_usuar = usu_primer_apellido_usuar;
        this.usu_segdo_apellido_usuar = usu_segdo_apellido_usuar;
        this.usu_telefono = usu_telefono;
        this.usu_direccion = usu_direccion;
        this.usu_email = usu_email;
        this.usu_tipodoc = usu_tipodoc;
        this.usu_genero = usu_genero;
        this.usu_acudiente = usu_acudiente;
    }
}