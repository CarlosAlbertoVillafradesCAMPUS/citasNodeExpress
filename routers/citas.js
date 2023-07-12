import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";

dotenv.config();
let storageCitas = Router();

let con = undefined;
storageCitas.use((req,res,next) =>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
})

storageCitas.get("/", (req,res,next)=>{
    con.query(
        /*sql*/`SELECT cita.*, usuario.usu_nombre FROM cita INNER JOIN usuario ON cita.cit_datosUsuario = usuario.usu_id ORDER BY usuario.usu_nombre ASC`,
        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }
        }
    )
})

storageCitas.get("/proxima/:idPaciente", (req,res)=>{

    const {idPaciente} = req.params;

    con.query(
        /*sql*/ `SELECT cita.*, usuario.usu_id FROM cita INNER JOIN usuario ON cita.cit_datosUsuario = usuario.usu_id WHERE usuario.usu_id = ? ORDER BY cita.cit_fecha ASC`,
        [idPaciente],

        (err,data,fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data[0])
            }  
        }
    )
})

export default storageCitas;