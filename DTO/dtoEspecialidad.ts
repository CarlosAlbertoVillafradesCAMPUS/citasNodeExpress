import { Expose, Transform, Type } from "class-transformer";

export class dtoEspecialidad{

    @Expose({name:"nombre"})
    @Transform(({value}) =>  {if(/^[A-Z-a-z\s]+$/.test(value)) return value;
    else throw {status:400, message:"Error en los parametros de entradas"};}, {toClassOnly:true})
    esp_nombre:string;

    constructor(esp_nombre:string){
        this.esp_nombre = esp_nombre;
    }
}