import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import proxyEspecialidad from "../middleware/proxyEspecialidad.js";


dotenv.config();
let storageEspecialidad = Router();

let con = undefined;
storageEspecialidad.use((req,res,next) =>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
})

storageEspecialidad.get("/", (req,res)=>{
    con.query(
        /*sql*/`SELECT * FROM especialidad`,
        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }
        }
    )
})

storageEspecialidad.post("/", proxyEspecialidad, (req,res)=>{

    // dtaos de entrada
    // {
    //     "nombre": "hermatologia",
    // }

    con.query(
        /*sql*/`INSERT INTO especialidad SET ?`,
        [req.body],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al agregar la especialidad")
            }else{
                res.send("Agregado con exito")
            }
        }
    )
})

storageEspecialidad.put("/:idEspecialidad", proxyEspecialidad, (req,res)=>{

    const { idEspecialidad } = req.params;

    con.query(
        /*sql*/`UPDATE especialidad SET ? WHERE esp_id = ? `,
        [req.body, idEspecialidad],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al modificar la especialidad")
            }else{
                res.send("Modificado con exito")
            }
        }
    )
})

storageEspecialidad.delete("/:idEspecialidad", (req,res)=>{

    const { idEspecialidad } = req.params;

    con.query(
        /*sql*/`DELETE FROM especialidad WHERE esp_id = ?`,
        [idEspecialidad],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al eliminar la especialidad")
            }else{
                res.send("Eliminado con exito")
            }
        }
    )
})

export default storageEspecialidad;