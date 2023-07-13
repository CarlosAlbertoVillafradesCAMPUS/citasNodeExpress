import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import proxyEstadoCita from "../middleware/proxyEstadoCita.js";


dotenv.config();
let storageEstadoCita = Router();

let con = undefined;
storageEstadoCita.use((req,res,next) =>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
})

storageEstadoCita.get("/", (req,res)=>{
    con.query(
        /*sql*/`SELECT * FROM estado_cita`,
        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }
        }
    )
})

storageEstadoCita.post("/", proxyEstadoCita, (req,res)=>{

    // dtaos de entrada
    // {
    //     "nombre": "pendiente",
    // }

    con.query(
        /*sql*/`INSERT INTO estado_cita SET ?`,
        [req.body],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al agregar el estado de cita")
            }else{
                res.send("Agregado con exito")
            }
        }
    )
})

storageEstadoCita.put("/:idEstadoCita", proxyEstadoCita, (req,res)=>{

    const { idEstadoCita } = req.params;

    con.query(
        /*sql*/`UPDATE estado_cita SET ? WHERE estcita_id = ? `,
        [req.body, idEstadoCita],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al modificar el estado de cita")
            }else{
                res.send("Modificado con exito")
            }
        }
    )
})

storageEstadoCita.delete("/:idEstadoCita", (req,res)=>{

    const { idEstadoCita } = req.params;

    con.query(
        /*sql*/`DELETE FROM estado_cita WHERE estcita_id = ?`,
        [idEstadoCita],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al eliminar el estado de la cita")
            }else{
                res.send("Eliminado con exito")
            }
        }
    )
})

export default storageEstadoCita;