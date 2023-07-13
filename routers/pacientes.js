import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import proxyPaciente from "../middleware/proxyPaciente.js";

dotenv.config();
let storagePacientes = Router();

let con = undefined;
storagePacientes.use((req,res,next)=>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
})

storagePacientes.get("/", (req,res)=>{
    con.query(
        /*sql*/ `SELECT * FROM usuario ORDER BY usu_nombre ASC`,
        (err, data, fil)=> {
            if (err) {
                res.send("Error al traer lo datos")
            }else{
                res.send(data)
            }
            
        }
    )
})

storagePacientes.get("/medico/:idMedico", (req,res)=>{

const {idMedico} = req.params;

    con.query(
        /*sql*/ `SELECT usuario.*, cita.cit_fecha, medico.med_nroMatriculaProfesional, medico.med_nombreCompleto FROM usuario INNER JOIN cita ON usuario.usu_id = cita.cit_datosUsuario INNER JOIN medico ON cita.cit_medico = medico.med_nroMatriculaProfesional WHERE medico.med_nroMatriculaProfesional = ?`,
        [idMedico],
        
        (err,data,fil)=>{
            if (err) {
                res.status(500).send("Error al obtener los datos")
            }else{
                res.send(data)
            }   
        }
        )
})

storagePacientes.post("/", proxyPaciente, (req,res)=>{

    // dtaos de entrada
    // {
    //     "cc": 123456789,
    //     "primer_nombre": "ana",
    //     "segundo_nombre": "maria",
    //     "primer_apellido": "cardenas",
    //     "segundo_apellido": "roa",
    //     "telefono": "+57319567",
    //     "direccion": "calle#14-16",
    //     "email": "ana@gmail.com",
    //     "tipo_documento": 2,
    //     "genero": 1,
    //     "acudiente": 1
    // }

    con.query(
        /*sql*/`INSERT INTO usuario SET ?`,
        [req.body],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al agregar el paciente")
            }else{
                res.send("Agregado con exito")
            }
        }
    )
})

storagePacientes.put("/:idPaciente", proxyPaciente, (req,res)=>{

    const { idPaciente } = req.params;

    con.query(
        /*sql*/`UPDATE usuario SET ? WHERE usu_id = ? `,
        [req.body, idPaciente],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al modificar el paciente")
            }else{
                res.send("Modificado con exito")
            }
        }
    )
})

storagePacientes.delete("/:idPaciente", (req,res)=>{

    const { idPaciente } = req.params;

    con.query(
        /*sql*/`DELETE FROM usuario WHERE usu_id = ?`,
        [idPaciente],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al eliminar el paciente")
            }else{
                res.send("Eliminado con exito")
            }
        }
    )
})



export default storagePacientes;