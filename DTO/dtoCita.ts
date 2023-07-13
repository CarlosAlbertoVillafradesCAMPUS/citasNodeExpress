import { Expose, Transform, Type } from "class-transformer";

export class dtoCita{
    @Expose({name:"fecha"})
    @Type(() => Date)
    cit_fecha:Date;

    @Expose({name:"estado_cita"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: "Error en los parametros de entrada"};}, {toClassOnly: true})
    cit_estadoCita:number;

    @Expose({name:"medico"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: "Error en los parametros de entrada"};}, {toClassOnly: true})
    cit_medico:number;

    @Expose({name:"usuario"})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value);
    else throw {status:400, message: "Error en los parametros de entrada"};}, {toClassOnly: true})
    cit_datosUsuario:number;

    constructor(cit_fecha:Date, cit_estadoCita:number, cit_medico:number, cit_datosUsuario:number){
        this.cit_fecha = cit_fecha;
        this.cit_estadoCita = cit_estadoCita;
        this.cit_medico = cit_medico;
        this.cit_datosUsuario = cit_datosUsuario;
    }
}