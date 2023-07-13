import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import proxyMedico from "../middleware/proxyMedico.js";

dotenv.config();
let storageMedicos = Router();

let con = undefined;
storageMedicos.use((req,res,next) =>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
})

storageMedicos.get("/", (req,res)=>{

    con.query(
        /*sql*/`SELECT medico.*, consultorio.cons_nombre FROM medico INNER JOIN consultorio ON medico.med_consultorio = consultorio.cons_codigo`,
        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }
        }
    )
})

storageMedicos.get("/:especialidad", (req,res)=>{

    const {especialidad} = req.params;

    con.query(
        /*sql*/`SELECT medico.*, especialidad.esp_nombre FROM medico INNER JOIN especialidad ON medico.med_especialidad = especialidad.esp_id WHERE especialidad.esp_nombre = ?`,
        [especialidad],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }
        }
    )
})

storageMedicos.post("/", proxyMedico, (req,res)=>{

    // dtaos de entrada
    // {
    //     "cc": 123456789,
    //     "nombre": "Chapatin gonzales",
    //     "consultorio": 2,
    //     "especialidad": 8
    // }

    con.query(
        /*sql*/`INSERT INTO medico SET ?`,
        [req.body],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al agregar el medico")
            }else{
                res.send("Agregado con exito")
            }
        }
    )
})

storageMedicos.put("/:idMedico", proxyMedico, (req,res)=>{

    const { idMedico } = req.params;

    con.query(
        /*sql*/`UPDATE medico SET ? WHERE med_nroMatriculaProfesional = ? `,
        [req.body, idMedico],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al modificar el medico")
            }else{
                res.send("Modificado con exito")
            }
        }
    )
})

storageMedicos.delete("/:idMedico", (req,res)=>{

    const { idMedico } = req.params;

    con.query(
        /*sql*/`DELETE FROM medico WHERE med_nroMatriculaProfesional = ?`,
        [idMedico],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al eliminar el medico")
            }else{
                res.send("Eliminado con exito")
            }
        }
    )
})




export default storageMedicos;