import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import proxyGenero from "../middleware/proxyGenero.js";

dotenv.config();
let storageGenero = Router();

let con = undefined;
storageGenero.use((req,res,next) =>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
})

storageGenero.get("/", (req,res)=>{
    con.query(
        /*sql*/`SELECT * FROM genero`,
        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }
        }
    )
})

storageGenero.post("/", proxyGenero, (req,res)=>{

    // dtaos de entrada
    // {
    //     "nombre": "Indefinido",
    //     "abreviatura": "IND"
    // }

    con.query(
        /*sql*/`INSERT INTO genero SET ?`,
        [req.body],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al agregar el genero")
            }else{
                res.send("Agregado con exito")
            }
        }
    )
})

storageGenero.put("/:idGenero", proxyGenero, (req,res)=>{

    const { idGenero } = req.params;

    con.query(
        /*sql*/`UPDATE genero SET ? WHERE gen_id = ? `,
        [req.body, idGenero],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al modificar el genero")
            }else{
                res.send("Modificado con exito")
            }
        }
    )
})

storageGenero.delete("/:idGenero", (req,res)=>{

    const { idGenero } = req.params;

    con.query(
        /*sql*/`DELETE FROM genero WHERE gen_id = ?`,
        [idGenero],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al eliminar el genero")
            }else{
                res.send("Eliminado con exito")
            }
        }
    )
})

export default storageGenero;