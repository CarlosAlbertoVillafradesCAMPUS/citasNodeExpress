var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
export class dtoPaciente {
    constructor(usu_id, usu_nombre, usu_segdo_nombre, usu_primer_apellido_usuar, usu_segdo_apellido_usuar, usu_telefono, usu_direccion, usu_email, usu_tipodoc, usu_genero, usu_acudiente) {
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
__decorate([
    Expose({ name: "cc" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: "Error en los parametros de entrada" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoPaciente.prototype, "usu_id", void 0);
__decorate([
    Expose({ name: "primer_nombre" }),
    Transform(({ value }) => {
        if (/^[A-Z-a-z\s]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en los parametros de entradas" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoPaciente.prototype, "usu_nombre", void 0);
__decorate([
    Expose({ name: "segundo_nombre" }),
    Transform(({ value }) => {
        if (/^[A-Z-a-z\s]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en los parametros de entradas" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoPaciente.prototype, "usu_segdo_nombre", void 0);
__decorate([
    Expose({ name: "primer_apellido" }),
    Transform(({ value }) => {
        if (/^[A-Z-a-z\s]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en los parametros de entradas" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoPaciente.prototype, "usu_primer_apellido_usuar", void 0);
__decorate([
    Expose({ name: "segundo_apellido" }),
    Transform(({ value }) => {
        if (/^[A-Z-a-z\s]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en los parametros de entradas" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoPaciente.prototype, "usu_segdo_apellido_usuar", void 0);
__decorate([
    Expose({ name: "telefono" }),
    Transform(({ value }) => {
        if (/^[\d\s+]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en los parametros de entradas" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoPaciente.prototype, "usu_telefono", void 0);
__decorate([
    Expose({ name: "direccion" }),
    Transform(({ value }) => {
        if (/^[\w\s+#-]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en los parametros de entradas" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoPaciente.prototype, "usu_direccion", void 0);
__decorate([
    Expose({ name: "email" }),
    Transform(({ value }) => {
        if (/^[\w\s+#@.-]+$/g.test(value))
            return value;
        else
            throw { status: 400, message: "Error en los parametros de entradas" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], dtoPaciente.prototype, "usu_email", void 0);
__decorate([
    Expose({ name: "tipo_documento" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: "Error en los parametros de entrada" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoPaciente.prototype, "usu_tipodoc", void 0);
__decorate([
    Expose({ name: "genero" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: "Error en los parametros de entrada" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoPaciente.prototype, "usu_genero", void 0);
__decorate([
    Expose({ name: "acudiente" }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: "Error en los parametros de entrada" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], dtoPaciente.prototype, "usu_acudiente", void 0);
