var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform, Type } from "class-transformer";
export class dtoCita {
    constructor(cit_fecha, cit_estadoCita, cit_medico, cit_datosUsuario) {
        this.cit_fecha = cit_fecha;
        this.cit_estadoCita = cit_estadoCita;
        this.cit_medico = cit_medico;
        this.cit_datosUsuario = cit_datosUsuario;
    }
}
__decorate([
    Expose({ name: "fecha" }),
    Type(() => Date),
    __metadata("design:type", Date)
], dtoCita.prototype, "cit_fecha", void 0);
__decorate([
    Expose({ name: "estado_cita" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: "Error en los parametros de entrada" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoCita.prototype, "cit_estadoCita", void 0);
__decorate([
    Expose({ name: "medico" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: "Error en los parametros de entrada" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoCita.prototype, "cit_medico", void 0);
__decorate([
    Expose({ name: "usuario" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: "Error en los parametros de entrada" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoCita.prototype, "cit_datosUsuario", void 0);
