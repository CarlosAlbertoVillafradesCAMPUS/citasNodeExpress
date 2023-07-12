import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";

dotenv.config();
let storageMedicos = Router();

let con = undefined;
storageMedicos.use((req,res,next) =>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
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

export default storageMedicos;