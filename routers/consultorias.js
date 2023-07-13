import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import proxyConsultorias from "../middleware/proxyConsultorias.js"

dotenv.config();
let storageConsultorias = Router();

let con = undefined;
storageConsultorias.use((req,res,next) =>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
})

storageConsultorias.get("/:idPaciente?", (req,res)=>{

    let sql = (req.params.idPaciente)
    ? [`SELECT consultorio.*, usuario.usu_id, usuario.usu_nombre, usuario.usu_primer_apellido_usuar, cita.cit_fecha FROM usuario INNER JOIN cita ON cita.cit_datosUsuario = usuario.usu_id INNER JOIN medico ON cita.cit_medico = medico.med_nroMatriculaProfesional INNER JOIN consultorio ON medico.med_consultorio = consultorio.cons_codigo WHERE usuario.usu_id = ?`, req.params.idPaciente]
    : [`SELECT * FROM consultorio`];

    con.query(...sql,
        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }
        }
    )
})

storageConsultorias.post("/", proxyConsultorias, (req,res)=>{

    // dtaos de entrada
    // {
    //     "nombre": "BELLO",
    // }

    con.query(
        /*sql*/`INSERT INTO consultorio SET ?`,
        [req.body],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al agregar el consultorio")
            }else{
                res.send("Agregado con exito")
            }
        }
    )
})

storageConsultorias.put("/:idConsultoria", proxyConsultorias, (req,res)=>{

    const { idConsultoria } = req.params;

    con.query(
        /*sql*/`UPDATE consultorio SET ? WHERE cons_codigo = ? `,
        [req.body, idConsultoria],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al modificar el consultorio")
            }else{
                res.send("Modificado con exito")
            }
        }
    )
})

storageConsultorias.delete("/:idConsultoria", (req,res)=>{

    const { idConsultoria } = req.params;

    con.query(
        /*sql*/`DELETE FROM consultorio WHERE cons_codigo = ?`,
        [idConsultoria],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al eliminar el consultorio")
            }else{
                res.send("Eliminado con exito")
            }
        }
    )
})

export default storageConsultorias;