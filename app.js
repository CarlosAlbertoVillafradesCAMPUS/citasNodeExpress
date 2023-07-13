import dotenv from "dotenv";
import express from "express";
import storagePacientes from "./routers/pacientes.js";
import storageCitas from "./routers/citas.js";
import storageMedicos from "./routers/medicos.js"; 
import storageConsultorias from "./routers/consultorias.js";
import storageGenero from "./routers/genero.js";


dotenv.config();
let appExpress = express();

appExpress.use(express.json())
appExpress.use("/pacientes", storagePacientes);
appExpress.use("/citas", storageCitas);
appExpress.use("/medicos", storageMedicos);
appExpress.use("/consultorias", storageConsultorias);
appExpress.use("/genero", storageGenero);

let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config,() =>console.log(`http://${config.hostname}:${config.port}`));