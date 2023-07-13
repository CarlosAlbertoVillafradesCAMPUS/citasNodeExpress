import dotenv from "dotenv";
import express from "express";
import storagePacientes from "./routers/pacientes.js";
import storageCitas from "./routers/citas.js";
import storageMedicos from "./routers/medicos.js"; 
import storageConsultorias from "./routers/consultorias.js";
import storageGenero from "./routers/genero.js";
import storageTipoDocumento from "./routers/tipo_documento.js";
import storageAcudiente from "./routers/acudiente.js";
import storageEstadoCita from "./routers/estado_cita.js";


dotenv.config();
let appExpress = express();

appExpress.use(express.json())
appExpress.use("/pacientes", storagePacientes);
appExpress.use("/citas", storageCitas);
appExpress.use("/medicos", storageMedicos);
appExpress.use("/consultorias", storageConsultorias);
appExpress.use("/genero", storageGenero);
appExpress.use("/tipoDocumento", storageTipoDocumento);
appExpress.use("/acudiente", storageAcudiente);
appExpress.use("/estadoCita", storageEstadoCita);

let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config,() =>console.log(`http://${config.hostname}:${config.port}`));