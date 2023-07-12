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


export default storagePacientes;