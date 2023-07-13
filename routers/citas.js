import dotenv from "dotenv";
import mysql from "mysql2";
import {Router} from "express";
import proxyCita from "../middleware/proxyCita.js";

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
        /*sql*/ `SELECT cita.*, usuario.usu_id FROM cita INNER JOIN usuario ON cita.cit_datosUsuario = usuario.usu_id WHERE usuario.usu_id = ? AND cita.cit_estadoCita = 1 ORDER BY cita.cit_fecha ASC`,
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

storageCitas.get("/:fecha", (req,res)=>{

    const {fecha} = req.params;

    con.query(
        /*sql*/ `SELECT cita.* FROM cita WHERE cita.cit_fecha LIKE ?`,
        [fecha + "%"],

        (err,data,fil)=>{
            if (err) {
                res.status(500).send("Error al traer los datos")
            }else{
                res.send(data)
            }  
        }
    )
})

storageCitas.get("/cantidad/:idMedico", (req, res) => {

    const { idMedico } = req.params;
    const {fecha} = req.query;

    con.query(
      /*sql*/ `SELECT cita.* FROM cita WHERE cita.cit_medico = ? AND cita.cit_fecha LIKE ?`,
      [idMedico, fecha + "%"],
  
      (err, data, fil) => {
        if (err) {
          res.status(500).send("Error al traer los datos");
        } else {
          res.send(data);
        }
      }
    );
  });

  storageCitas.get("/genero/:genero", (req, res) => {

    const { genero } = req.params;

    con.query(
      /*sql*/ `SELECT cita.*, usuario.usu_nombre, usuario.usu_primer_apellido_usuar, genero.gen_nombre, estado_cita.estcita_nombre FROM cita INNER JOIN usuario ON cita.cit_datosUsuario = usuario.usu_id INNER JOIN genero ON usuario.usu_genero = genero.gen_id INNER JOIN estado_cita ON cita.cit_estadoCita = estado_cita.estcita_id WHERE genero.gen_id = ? AND estado_cita.estcita_id = 2 `,
      [genero],
  
      (err, data, fil) => {
        if (err) {
          res.status(500).send("Error al traer los datos");
        } else {
          res.send(data);
        }
      }
    );
  });

  storageCitas.get("/rechazadas/:fecha", (req, res) => {

    const { fecha } = req.params;

    con.query(
      /*sql*/ `SELECT cita.cit_fecha, usuario.usu_nombre, usuario.usu_primer_apellido_usuar, medico.med_nombreCompleto, estado_cita.estcita_nombre FROM cita INNER JOIN usuario ON cita.cit_datosUsuario = usuario.usu_id INNER JOIN medico ON cita.cit_medico = medico.med_nroMatriculaProfesional INNER JOIN estado_cita ON cita.cit_estadoCita = estado_cita.estcita_id WHERE cita.cit_estadoCita = 3 AND cita.cit_fecha LIKE ?`,
      [fecha + "%"],
  
      (err, data, fil) => {
        if (err) {
          res.status(500).send("Error al traer los datos");
        } else {
          res.send(data);
        }
      }
    );
  });
  
  storageCitas.post("/", proxyCita, (req,res)=>{

    // dtaos de entrada
  //   {
  //     "fecha": "2023-11-21",
  //     "estado_cita": 1,
  //     "medico":123456789,
  //     "usuario": 123456789
  // }

    con.query(
        /*sql*/`INSERT INTO cita SET ?`,
        [req.body],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al agregar la cita")
            }else{
                res.send("Agregado con exito")
            }
        }
    )
})

storageCitas.put("/:idCita", proxyCita, (req,res)=>{

    const { idCita } = req.params;

    con.query(
        /*sql*/`UPDATE cita SET ? WHERE cit_codigo = ? `,
        [req.body, idCita],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al modificar la cita")
            }else{
                res.send("Modificado con exito")
            }
        }
    )
})

storageCitas.delete("/:idCita", (req,res)=>{

    const { idCita } = req.params;

    con.query(
        /*sql*/`DELETE FROM cita WHERE cit_codigo = ?`,
        [idCita],

        (err, data, fil)=>{
            if (err) {
                res.status(500).send("Error al eliminar la cita")
            }else{
                res.send("Eliminado con exito")
            }
        }
    )
})



export default storageCitas;