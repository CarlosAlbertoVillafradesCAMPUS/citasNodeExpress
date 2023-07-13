import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import proxyAcudiente from "../middleware/proxyAcudiente.js";



dotenv.config();
let storageAcudiente = Router();

let con = undefined;
storageAcudiente.use((req,res,next) =>{
    let my_conexion = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(my_conexion);
    next();
})

storageAcudiente.get("/", (req,res)=>{
    con.query(
        /*sql*/`SELECT * FROM acudiente`,
        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }
        }
    )
})

storageAcudiente.post("/", proxyAcudiente, (req,res)=>{

    // dtaos de entrada
    // {
//     "nombre": "jairo Villafrades",
//     "telefono": "+57 3175049475",
//     "direccion": "calle#14-16"
//     }

    con.query(
        /*sql*/`INSERT INTO acudiente SET ?`,
        [req.body],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al agregar el acudiente")
            }else{
                res.send("Agregado con exito")
            }
        }
    )
})

storageAcudiente.put("/:idAcudiente", proxyAcudiente, (req,res)=>{

    const { idAcudiente } = req.params;

    con.query(
        /*sql*/`UPDATE acudiente SET ? WHERE acu_codigo = ? `,
        [req.body, idAcudiente],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al modificar el acudiente")
            }else{
                res.send("Modificado con exito")
            }
        }
    )
})

storageAcudiente.delete("/:idAcudiente", (req,res)=>{

    const { idAcudiente } = req.params;

    con.query(
        /*sql*/`DELETE FROM acudiente WHERE acu_codigo = ?`,
        [idAcudiente],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al eliminar el acudiente")
            }else{
                res.send("Eliminado con exito")
            }
        }
    )
})

export default storageAcudiente;