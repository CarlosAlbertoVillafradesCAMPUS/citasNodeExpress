CREATE DATABASE db_citas_medicas;
USE db_citas_medicas;
CREATE TABLE tipo_documento(
    tipdoc_id INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipdoc_nombre VARCHAR(20)NOT NULL,
    tipdoc_abreviatura VARCHAR(20) NOT NULL
);

CREATE TABLE genero(
    gen_id INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    gen_nombre VARCHAR(20)NOT NULL,
    gen_abreviatura VARCHAR(20) NOT NULL
);

CREATE TABLE acudiente(
    acu_codigo INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    acu_nombreCompleto VARCHAR(100)NOT NULL,
    acu_telefono VARCHAR(50) NOT NULL,
    acu_direccion VARCHAR(200) NOT NULL
);

CREATE TABLE estado_cita(
    estcita_id INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estcita_nombre VARCHAR(20)NOT NULL
);

CREATE TABLE consultorio(
    cons_codigo INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cons_nombre VARCHAR(50)NOT NULL
);
CREATE TABLE especialidad(
    esp_id INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    esp_nombre VARCHAR(20)NOT NULL
);
CREATE TABLE medico(
    med_nroMatriculaProfesional INT(12) NOT NULL PRIMARY KEY,
    med_nombreCompleto VARCHAR(120)NOT NULL,
    med_consultorio INT(12) NOT NULL,
    med_especialidad INT(12) NOT NULL
);


CREATE TABLE usuario(
    usu_id INT(12) NOT NULL PRIMARY KEY,
    usu_nombre VARCHAR(50) NOT NULL,
    usu_segdo_nombre VARCHAR(45) NOT NULL,
    usu_primer_apellido_usuar VARCHAR(50) NOT NULL,
    usu_segdo_apellido_usuar VARCHAR(100) NOT NULL,
    usu_telefono VARCHAR(50) NOT NULL,
    usu_direccion VARCHAR(100) NOT NULL,
    usu_email VARCHAR(100) NOT NULL,
    usu_tipodoc INT(12) NOT NULL,
    usu_genero INT(12) NOT NULL,
    usu_acudiente INT(12) NOT NULL
);
CREATE TABLE cita(
    cit_codigo INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cit_fecha DATE NOT NULL,
    cit_estadoCita INT(12) NOT NULL,
    cit_medico INT(12) NOT NULL,
    cit_datosUsuario INT(12) NOT NULL
);

/* foreign key y relaciones */

ALTER TABLE usuario ADD CONSTRAINT usuario_tipo_documento_fk FOREIGN KEY(usu_tipodoc) REFERENCES tipo_documento(tipdoc_id);
ALTER TABLE usuario ADD CONSTRAINT usuario_genero_fk FOREIGN KEY(usu_genero) REFERENCES genero(gen_id);
ALTER TABLE usuario ADD CONSTRAINT usuario_acudiente_fk FOREIGN KEY(usu_acudiente) REFERENCES acudiente(acu_codigo);
ALTER TABLE medico ADD CONSTRAINT medico_especialidad_fk FOREIGN KEY(med_especialidad) REFERENCES especialidad(esp_id);
ALTER TABLE medico ADD CONSTRAINT medico_consultorio_fk FOREIGN KEY(med_consultorio) REFERENCES consultorio(cons_codigo);
ALTER TABLE cita ADD CONSTRAINT cita_estado_cita_fk FOREIGN KEY(cit_estadoCita) REFERENCES estado_cita(estcita_id);
ALTER TABLE cita ADD CONSTRAINT cita_medico_fk FOREIGN KEY(cit_medico) REFERENCES medico(med_nroMatriculaProfesional);
ALTER TABLE cita ADD CONSTRAINT cita_usuario_fk FOREIGN KEY(cit_datosUsuario) REFERENCES usuario(usu_id);


/* insert de tablas */

/* ESPECIALIDAD */
INSERT INTO especialidad(esp_nombre) VALUES ("Cardiología");
INSERT INTO especialidad (esp_nombre) values ('Neumología');
INSERT INTO especialidad (esp_nombre) values ('Geriatría');
INSERT INTO especialidad (esp_nombre) values ('Hematología');
INSERT INTO especialidad (esp_nombre) values ('Nefrología');
INSERT INTO especialidad (esp_nombre) values ('Neurología');
INSERT INTO especialidad (esp_nombre) values ('Pediatría ');
INSERT INTO especialidad (esp_nombre) values ('Psiquiatría');
INSERT INTO especialidad (esp_nombre) values ('Rehabilitación');
INSERT INTO especialidad (esp_nombre) values ('Reumatología');
INSERT INTO especialidad (esp_nombre) values ('Neurocirugía');

/* CONSULTORIO */

INSERT INTO consultorio(cons_nombre) VALUES ("El Prado");
INSERT INTO consultorio(cons_nombre) VALUES ("El Villa");

/* MEDICO */
INSERT INTO medico (med_nroMatriculaProfesional, med_nombreCompleto, med_consultorio, med_especialidad) VALUES ("425899584", "Felipe", 1, 1);
INSERT INTO medico (med_nroMatriculaProfesional, med_nombreCompleto, med_consultorio, med_especialidad) VALUES ("1234", "Chapulin ramires", 2, 4);

/* ESTADO CITA */
INSERT INTO estado_cita (estcita_nombre) VALUES ("ACTIVA"), ('SUPENDIDA'), ('CANCELADA'), ('PERDIDA');

/* ACUDIENTE */
INSERT INTO acudiente (acu_nombreCompleto, acu_telefono, acu_direccion) VALUES ( "Paco Alberto Escalante Prada", "3155466998", "Calle 21 nº 41-25");

/* GENERO */
INSERT INTO genero (gen_nombre, gen_abreviatura) VALUES ("Femenino", "Fem"), ("Masculino", "Mas");

/* TIPO DOCUMENTO */
INSERT INTO tipo_documento (tipdoc_nombre, tipdoc_abreviatura) VALUES ("Tarjeta de Identidad", "TI"), ("Cedula Ciudadani", "CC");

/* USUARIO */
INSERT INTO
    usuario (
        usu_id,
        usu_nombre,
        usu_segdo_nombre,
        usu_primer_apellido_usuar,
        usu_segdo_apellido_usuar,
        usu_telefono,
        usu_direccion,
        usu_email,
        usu_tipodoc,
        usu_genero,
        usu_acudiente
    ) VALUES (
        1089617567,
        "Andres",
        "Galvis",
        "pinilla",
        "Mora",
        "3158696969",
        "Parque de los gatos",
        "daniLaMasViral@gmail.com",
        1,
        1,
        1
    );

/* CITA */
INSERT INTO cita(cit_fecha,cit_estadoCita,cit_medico,cit_datosUsuario) VALUES ("2023-07-23 10:30:00",1,475899584,1089617567);
INSERT INTO cita(cit_fecha,cit_estadoCita,cit_medico,cit_datosUsuario) VALUES ("2023-09-30",1,475899584,1098817567);

SELECT * FROM cita;
SELECT cita.*, usuario.usu_nombre FROM cita INNER JOIN usuario ON cita.cit_datosUsuario = usuario.usu_id ORDER BY usuario.usu_nombre ASC;

SELECT consultorio.*, usuario.usu_id, usuario.usu_nombre, usuario.usu_primer_apellido_usuar, cita.cit_fecha FROM usuario INNER JOIN cita ON cita.cit_datosUsuario = usuario.usu_id INNER JOIN medico ON cita.cit_medico = medico.med_nroMatriculaProfesional INNER JOIN consultorio ON medico.med_consultorio = consultorio.cons_codigo WHERE usuario.usu_id = ?;

SELECT medico.*, consultorio.cons_nombre FROM medico INNER JOIN consultorio ON medico.med_consultorio = consultorio.cons_codigo;