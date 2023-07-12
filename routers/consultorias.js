import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";

dotenv.config();
let storageConsultorias = Router();

let con = undefined;
storageConsultorias.use((req,res,next) =>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
})

storageConsultorias.get("/:idPaciente", (req,res)=>{

    const {idPaciente} = req.params;
    
    con.query(
        /*sql*/`SELECT consultorio.*, usuario.usu_id, usuario.usu_nombre, usuario.usu_primer_apellido_usuar, cita.cit_fecha FROM usuario INNER JOIN cita ON cita.cit_datosUsuario = usuario.usu_id INNER JOIN medico ON cita.cit_medico = medico.med_nroMatriculaProfesional INNER JOIN consultorio ON medico.med_consultorio = consultorio.cons_codigo WHERE usuario.usu_id = ?`,
        [idPaciente],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }
        }
    )
})

export default storageConsultorias;