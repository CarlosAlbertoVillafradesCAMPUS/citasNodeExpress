import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";

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


export default storagePacientes;