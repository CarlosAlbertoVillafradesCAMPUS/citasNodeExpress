import { Expose, Transform, Type } from "class-transformer";

export class dtoMedico{
    @Expose({name:"cc"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: "Error en los parametros de entrada"};}, {toClassOnly: true})
    med_nroMatriculaProfesional:number;

    @Expose({name:"nombre"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    med_nombreCompleto:string;

    @Expose({name:"consultorio"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: "Error en los parametros de entrada"};}, {toClassOnly: true})
    med_consultorio:number;

    @Expose({name:"especialidad"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: "Error en los parametros de entrada"};}, {toClassOnly: true})
    med_especialidad:number;

    constructor(med_nroMatriculaProfesional:number, med_nombreCompleto:string, med_consultorio:number, med_especialidad:number){
        this.med_nroMatriculaProfesional = med_nroMatriculaProfesional;
        this.med_nombreCompleto = med_nombreCompleto;
        this.med_consultorio = med_consultorio;
        this.med_especialidad = med_especialidad;
    }
}