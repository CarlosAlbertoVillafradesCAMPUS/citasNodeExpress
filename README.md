# Trabajo con Node.js, Express.js y Sql

Esta es una aplicación desarrollada con Node, Express y Sql sobre un registro de citas medicas.

## Requisitos previos

- Node.js instalado en tu máquina.

## Instalación

1. Clona este repositorio o descarga los archivos en tu máquina local.
2. Abre una terminal en el directorio raíz de la aplicación.
3. Ejecuta el siguiente comando para instalar las dependencias:

```
npm install
```

## Configuración

1. Asegurarse de tener creada la base de datos con sus respectivos registros. en la ruta **db/db_citas_medicas.sql** se encuentran los comandos para la creacion de la base de datos y la inserción de algunos registros.
2. Crea un archivo `.env` en el directorio raíz de la aplicación, teniendo como base el archivo `.env.example`
3. Dentro del archivo `.env` , define las siguientes variables de entorno:

```
MY_CONFIG={"hostname":"", "port":}
MY_CONNECT={"host":"", "user":"", "password":"", "database":"", "port":3306}
```
4. abrir 2 terminales, en una correr el comando `npm run dev` y en la otra el comando `npm run tsc`, para todos los endPoints funcionen a la perfeccion.

## Uso

Puedes probar diferentes rutas accediendo a:

- `http://"hostname":"port"/pacientes/` para acceder al CRUD de usuario y rutas relacionadas a pacientes.

- `http://"hostname":"port"/citas/` para acceder al CRUD de cita y rutas relacionadas.

- `http://"hostname":"port"/medicos/` para acceder al CRUD de medico y rutas relacionadas.

- `http://"hostname":"port"/consultorias/`para acceder al CRUD de consultorio y rutas relacionadas.

- `http://"hostname":"port"/genero/` para acceder al CRUD de genero y rutas relacionadas.

- `http://"hostname":"port"/tipoDocumento/` para acceder al CRUD de tipoDocumento y rutas relacionadas.

- `http://"hostname":"port"/acudiente/` para acceder al CRUD de acudiente y rutas relacionadas.

- `http://"hostname":"port"/estadoCita/` para acceder al CRUD de estadoCita y rutas relacionadas.

- `http://"hostname":"port"/especialidad/` para acceder al CRUD de especialidad y rutas relacionadas.


  

# Crud y Endpoints de Pacientes

## Crud

### GET:  `http://"hostname":"port"/pacientes/`

Trae todos los pacientes en orden alfabetico

### POST:  `http://"hostname":"port"/pacientes/`

Agregar datos a la tabla usuario

**Parámetros de entrada:**

- `cc` : Numero de documento del paciente. (number).
- `primer_nombre` : Primer nombre. (string).
- `segundo_nombre`: Segundo nombre. (string)
- `primer_apellido` : primer apellido. (string)
- `segundo_apellido` : Segundo apellido. (string)
- `telefono` : Numero telefonico del paciente. (string)
- `direccion` : Direccion del paciente. (string)
- `email` : Email del paciente. (string)
- `tipo_documento` : ID del tipo de documento. (number)
- `genero` : ID del genero. (number)
- `acudiente` : ID del acudiente. (number)


**Ejemplo:**

```js
{
    "cc": 123456789,
    "primer_nombre": "ana",
    "segundo_nombre": "maria",
    "primer_apellido": "cardenas",
    "segundo_apellido": "roa",
    "telefono": "+57319567",
    "direccion": "calle#14-16",
    "email": "ana@gmail.com",
    "tipo_documento": 2,
    "genero": 1,
    "acudiente": 1
}
```

### PUT:  `http://"hostname":"port"/pacientes/"idPaciente"`

Modificar datos de un paciente especifico en la tabla usuario

**Parámetros de entrada:**

se debe respetar los mismo tipos de datos del methodo post.


**Ejemplo:**

```js
{
    "cc": 123456789,
    "primer_nombre": "carlos",
    "segundo_nombre": "alberto",
    "primer_apellido": "villafrades",
    "segundo_apellido": "pinilla",
    "telefono": "+57319567",
    "direccion": "calle#14-16",
    "email": "ana@gmail.com",
    "tipo_documento": 2,
    "genero": 1,
    "acudiente": 1
}
```


### DELETE:  `http://"hostname":"port"/pacientes/"idPaciente"`

Elimina el registro de un usuario especifico


## EndPoints

### GET:  `http://"hostname":"port"/pacientes/medico/"idMedico"`

Este EndPoint trae todos los pacientes que tienen citas con un médico específico

**Ejemplo:**

```js
[
  {
    "usu_id": 123456789,
    "usu_nombre": "ana",
    "usu_segdo_nombre": "maria",
    "usu_primer_apellido_usuar": "cardenas",
    "usu_segdo_apellido_usuar": "roa",
    "usu_telefono": "+57319567",
    "usu_direccion": "calle#14-16",
    "usu_email": "ana@gmail.com",
    "usu_tipodoc": 2,
    "usu_genero": 1,
    "usu_acudiente": 1,
    "cit_fecha": "2023-11-24T05:00:00.000Z",
    "med_nroMatriculaProfesional": 123456789,
    "med_nombreCompleto": "Chapatin gonzales"
  },
  ...
]
```

# Crud y Endpoints de Citas

## Crud

### GET:  `http://"hostname":"port"/citas/`

Trae todos las citas en orden alfabetico por los pacientes de dichas citas

### POST:  `http://"hostname":"port"/citas/`

Agregar datos a la tabla cita

**Parámetros de entrada:**

- `fecha` : Fecha en la que se agendara la cita. (date).
- `estado_cita` : ID del estado de la cita. (number).
- `medico`: ID de un medico existente. (number).
- `usuario` : ID de un paciente existente. (number).


**Ejemplo:**

```js
{
    "fecha": "2023-11-21",
    "estado_cita": 1,
    "medico":1234,
    "usuario": 123456789
}
```

### PUT:  `http://"hostname":"port"/citas/"idCita"`

Modificar datos de una cita especifica en la tabla cita

**Parámetros de entrada:**

se debe respetar los mismo tipos de datos del methodo post.


**Ejemplo:**

```js
{
    "fecha": "2023-09-10",
    "estado_cita": 3,
    "medico":1234,
    "usuario": 123456789
}
```


### DELETE:  `http://"hostname":"port"/citas/"idCita"`

Elimina el registro de una cita especifico

## EndPoints

### 1-GET:  `http://"hostname":"port"/citas/proxima/"idPaciente"`

Este endpoint permite encontrar la proxima cita ACTIVA  o disponible de un paciente especifico.

**Ejemplo:**

```js
{
"cit_codigo": 15,
"cit_fecha": "2023-11-24T05:00:00.000Z",
"cit_estadoCita": 1,
"cit_medico": 123456789,
"cit_datosUsuario": 123456789,
"usu_id": 123456789
}
```

### 2-GET:  `http://"hostname":"port"/citas/"fecha"`

Este endpoint permite traer todas las citas que hay en un dia especifico

**Ejemplo:**

```js
{
"cit_codigo": 9,
"cit_fecha": "2023-08-30T05:00:00.000Z",
"cit_estadoCita": 3,
"cit_medico": 475899584,
"cit_datosUsuario": 1098817567
},
{
"cit_codigo": 13,
"cit_fecha": "2023-08-30T05:00:00.000Z",
"cit_estadoCita": 3,
"cit_medico": 475899584,
"cit_datosUsuario": 3456
},...
```

### 3-GET:  `http://"hostname":"port"/citas/"fecha"`

Este endpoint permite traer todas las citas que hay en un dia especifico

**Ejemplo:**

```js
{
"cit_codigo": 9,
"cit_fecha": "2023-08-30T05:00:00.000Z",
"cit_estadoCita": 3,
"cit_medico": 475899584,
"cit_datosUsuario": 1098817567
},
{
"cit_codigo": 13,
"cit_fecha": "2023-08-30T05:00:00.000Z",
"cit_estadoCita": 3,
"cit_medico": 475899584,
"cit_datosUsuario": 3456
},...
```

### 4-GET:  `http://"hostname":"port"/citas/cantidad/"idMedico"?fecha=""`

Este endpoint permite contar el numero de citas que un medico tiene en un dia especifico

### 5-GET:  `http://"hostname":"port"/citas/genero/"idGenero"`

Este endpoint permite traer todas las citas realizadas por pacientes de un genero especifico y si su estado de cita fue atendida

**Ejemplo:**

```js
{
"cit_codigo": 14,
"cit_fecha": "2023-09-30T05:00:00.000Z",
"cit_estadoCita": 2,
"cit_medico": 475899584,
"cit_datosUsuario": 1098817567,
"usu_nombre": "Carlos",
"usu_primer_apellido_usuar": "pinilla",
"gen_nombre": "Femenino",
"estcita_nombre": "ATENDIDA"
},...
```

### 6-GET:  `http://"hostname":"port"/citas/rechazadas/"mes"`

Este endpoint permite traer todas las citas que fueron rechazadas y en un mes especifica

**Ejemplo:**

```js
{
"cit_fecha": "2023-08-30T05:00:00.000Z",
"usu_nombre": "Carlos",
"usu_primer_apellido_usuar": "pinilla",
"med_nombreCompleto": "Carlos Villa",
"estcita_nombre": "CANCELADA"
},...
```

# Crud y Endpoints de Medicos

## Crud

### GET:  `http://"hostname":"port"/medicos/`

Trae todos los medicos con su respectivo consultorio

### POST:  `http://"hostname":"port"/medicos/`

Agregar datos a la tabla medico

**Parámetros de entrada:**

- `cc` : numero de indentificacion del medico. (number).
- `nombre` : Nombre completo del medico. (string).
- `consultorio`: ID de un consultorio existente. (number).
- `especialidad` : ID de una especialidad existente. (number).


**Ejemplo:**

```js
{
    "cc": 123456789,
    "nombre": "Chapatin gonzales",
    "consultorio": 2,
    "especialidad": 8
}
```

### PUT:  `http://"hostname":"port"/medicos/"idMedico"`

Modificar datos de una medico especifico en la tabla medico

**Parámetros de entrada:**

se debe respetar los mismo tipos de datos del methodo post.


**Ejemplo:**

```js
{
    "cc": 123456789,
    "nombre": "fabian gonzales",
    "consultorio": 1,
    "especialidad": 5
}
```


### DELETE:  `http://"hostname":"port"/medicos/"idMedico"`

Elimina el registro de un medico especifico


## EndPoints

### 1-GET:  `http://"hostname":"port"/medicos/"nameEspecialidad"`

Este endpoint permite traer todos los medicos de una especialidad especifica

**Ejemplo:**

```js
{
"med_nroMatriculaProfesional": 425899584,
"med_nombreCompleto": "Felipe",
"med_consultorio": 1,
"med_especialidad": 1,
"esp_nombre": "Cardiología"
},...
```

# Crud y Endpoints de Consultorias

## Crud

### GET:  `http://"hostname":"port"/consultorias/`

Trae todos los consultoios de la tabla consultorio

### POST:  `http://"hostname":"port"/consultorias/`

Agregar datos a la tabla consultorio

**Parámetros de entrada:**

- `nombre` : Nombre del conusltorio. (string).



**Ejemplo:**

```js
{
    "nombre": "DonVilla"
}
```

### PUT:  `http://"hostname":"port"/consultorias/"idConsultorio"`

Modificar datos de un consultorip especifico en la tabla consultorio.

**Parámetros de entrada:**

se debe respetar los mismo tipos de datos del methodo post.


**Ejemplo:**

```js
{
    "nombre": "DondeVilla"
}
```


### DELETE:  `http://"hostname":"port"/consultorias/"idConsultorio"`

Elimina el registro de un consultorio especifico

# Endpoints 

### 1-GET:  `http://"hostname":"port"/consultorias/"idPaciente"`

Este endpoint permite traer todos los consultorios o las consultoias de un paciente en especifico

**Ejemplo:**

```js
{
"cons_codigo": 2,
"cons_nombre": "El Villa",
"usu_id": 123456789,
"usu_nombre": "ana",
"usu_primer_apellido_usuar": "cardenas",
"cit_fecha": "2023-11-24T05:00:00.000Z"
},...
```

# Crud y Endpoints de Genero

## Crud

### GET:  `http://"hostname":"port"/genero/`

Trae todos los generos de la tabla genero

### POST:  `http://"hostname":"port"/genero/`

Agregar datos a la tabla genero

**Parámetros de entrada:**

- `nombre` : Nombre del genero. (string).
- `abreviatura` : abreviatura del genero. (string).



**Ejemplo:**

```js
{
    "nombre": "Indefinido",
    "abreviatura": "IND"
}
```

### PUT:  `http://"hostname":"port"/genero/"idGenero"`

Modificar datos de un genero especifico en la tabla genero.

**Parámetros de entrada:**

se debe respetar los mismo tipos de datos del methodo post.


**Ejemplo:**

```js
{
    "nombre": "INDEFINIDO",
    "abreviatura": "IND"
}
```


### DELETE:  `http://"hostname":"port"/genero/"idGenero"`

Elimina el registro de un genero especifico


# Crud y Endpoints de tipoDocumento

## Crud

### GET:  `http://"hostname":"port"/tipoDocumento/`

Trae todos los tipoDocumento de la tabla tipoDocumento

### POST:  `http://"hostname":"port"/tipoDocumento/`

Agregar datos a la tabla tipoDocumento

**Parámetros de entrada:**

- `nombre` : Nombre del tipoDocumento. (string).
- `abreviatura` : abreviatura del tipoDocumento. (string).



**Ejemplo:**

```js
{
    "nombre": "cedula ciudadania",
    "abreviatura": "CC"
}
```

### PUT:  `http://"hostname":"port"/tipoDocumento/"idTipoDocumento"`

Modificar datos de un tipoDocumento especifico en la tabla tipoDocumento.

**Parámetros de entrada:**

se debe respetar los mismo tipos de datos del methodo post.


**Ejemplo:**

```js
{
    "nombre": "CEDULA CIUDADANIA",
    "abreviatura": "C.C"
}
```


### DELETE:  `http://"hostname":"port"/tipoDocumento/"idTipoDocumento"`

Elimina el registro de un tipoDocumento especifico


# Crud y Endpoints de acudiente

## Crud

### GET:  `http://"hostname":"port"/acudiente/`

Trae todos los acudientes de la tabla acudiente

### POST:  `http://"hostname":"port"/acudiente/`

Agregar datos a la tabla acudiente

**Parámetros de entrada:**

- `nombre` : Nombre completo del acudiente. (string).
- `telefono` : telefono del acudiente. (string).
- `direccion` : direccion del acudiente. (string).



**Ejemplo:**

```js
{
    "nombre": "jairo Villafrades",
    "telefono": "+57 3175049475",
    "direccion": "calle#14-16"
}
```

### PUT:  `http://"hostname":"port"/acudiente/"idAcudiente"`

Modificar datos de un acudiente especifico en la tabla acudiente.

**Parámetros de entrada:**

se debe respetar los mismo tipos de datos del methodo post.


**Ejemplo:**

```js
{
    "nombre": "JAIRO VILLAFRADES",
    "telefono": "+57 3175049475",
    "direccion": "calle#14-16"
}
```


### DELETE:  `http://"hostname":"port"/acudiente/"idAcudiente"`

Elimina el registro de un acudiente especifico


# Crud y Endpoints de estadoCita

## Crud

### GET:  `http://"hostname":"port"/estadoCita/`

Trae todos los estadoCita de la tabla estadoCita

### POST:  `http://"hostname":"port"/estadoCita/`

Agregar datos a la tabla estadoCita

**Parámetros de entrada:**

- `nombre` : Nombre del estado de la cita. (string).



**Ejemplo:**

```js
{
    "nombre": "activa"
}
```

### PUT:  `http://"hostname":"port"/estadoCita/"idEstadoCita"`

Modificar datos del estadoCita especifico en la tabla estadoCita.

**Parámetros de entrada:**

se debe respetar los mismo tipos de datos del methodo post.


**Ejemplo:**

```js
{
    "nombre": "ACTIVA"
}
```


### DELETE:  `http://"hostname":"port"/estadoCita/"idEstadoCita"`

Elimina el registro de un estadoCita especifico


# Crud y Endpoints de especialidad

## Crud

### GET:  `http://"hostname":"port"/especialidad/`

Trae todos las especialidades de la tabla especialidad

### POST:  `http://"hostname":"port"/especialidad/`

Agregar datos a la tabla especialidad

**Parámetros de entrada:**

- `nombre` : Nombre de la especialidad. (string).



**Ejemplo:**

```js
{
    "nombre": "dermatologia"
}
```

### PUT:  `http://"hostname":"port"/especialidad/"idEspecialidad"`

Modificar datos de la especialidad especifica en la tabla especialidad.

**Parámetros de entrada:**

se debe respetar los mismo tipos de datos del methodo post.


**Ejemplo:**

```js
{
    "nombre": "DERMATOLOGIA"
}
```


### DELETE:  `http://"hostname":"port"/especialidad/"idEspecialidad"`

Elimina el registro de una especialidad especifica


## IMPORTANTE
Respetar los tipos de datos de entrada a la hora de hacer un POST o un PUT, para que el aplicativo no les salte un error.


# Contacto

**Nombre**: Carlos Villafrades Pinilla.

**Email**: cavillafrades@gmail.com