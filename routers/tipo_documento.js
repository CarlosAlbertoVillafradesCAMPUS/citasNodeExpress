import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import proxyTipoDocumento from "../middleware/proxyTipoDocumento.js";


dotenv.config();
let storageTipoDocumento = Router();

let con = undefined;
storageTipoDocumento.use((req,res,next) =>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
})

storageTipoDocumento.get("/", (req,res)=>{
    con.query(
        /*sql*/`SELECT * FROM tipo_documento`,
        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }
        }
    )
})

storageTipoDocumento.post("/", proxyTipoDocumento, (req,res)=>{

    // dtaos de entrada
    // {
    //     "nombre": "Cedula Extranjera",
    //     "abreviatura": "CE"
    // }

    con.query(
        /*sql*/`INSERT INTO tipo_documento SET ?`,
        [req.body],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al agregar el tipo de documento")
            }else{
                res.send("Agregado con exito")
            }
        }
    )
})

storageTipoDocumento.put("/:idTipoDocumento", proxyTipoDocumento, (req,res)=>{

    const { idTipoDocumento } = req.params;

    con.query(
        /*sql*/`UPDATE tipo_documento SET ? WHERE tipdoc_id = ? `,
        [req.body, idTipoDocumento],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al modificar el tipo de documento")
            }else{
                res.send("Modificado con exito")
            }
        }
    )
})

storageTipoDocumento.delete("/:idTipoDocumento", (req,res)=>{

    const { idTipoDocumento } = req.params;

    con.query(
        /*sql*/`DELETE FROM tipo_documento WHERE tipdoc_id = ?`,
        [idTipoDocumento],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al eliminar el tipo de documento")
            }else{
                res.send("Eliminado con exito")
            }
        }
    )
})

export default storageTipoDocumento;