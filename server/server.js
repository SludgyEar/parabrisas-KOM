import express from 'express';
import { getUsers, getUserById, createUser, loginUser, getUserByEmail, getUserByName, logicalDelete,
        updateUser, updateUserWPasswd, getActiveUsers, getInactiveUsers, getUserPasswd, getUserByPerfil } from './database.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import CryptoJS from "crypto-js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get("/usuarios", async (req, res) => {
    const { id, nombre, correo, status, perfil } = req.query; // Cambiado: Ahora se obtienen los parámetros de consulta
    let users = [];

    if (id) {
        users = await getUserById(id);
    } else if (nombre) {
        users = await getUserByName(nombre);
    } else if (correo) {
        users = await getUserByEmail(correo);
    } else if (status){
        if(status == '1' || status == 1){
            users = await getActiveUsers();
            console.log("Usuarios activos");
        }else{
            users = await getInactiveUsers() // Usuarios activos e inactivos
            console.log("Usuarios inactivos");
        }
    } else if(perfil){
        users = await getUserByPerfil(perfil);
    }else { users = await getUsers(); } // Si no hay parámetros, obtén todos los usuarios 

    res.status(201).send(users); // Cambiado: Se envía la lista de usuarios
});

app.get("/usuariosActivos", async (req, res) => {
    const users = await getActiveUsers();
    res.status(201).send(users);
    // Obtener todos los usuarios activos
});

app.put("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const user = await logicalDelete(id);
    res.status(201).send(user);
    // Eliminar usuario
});

app.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const {nombre, correo, passwd,  perfil, status} = req.body;
    let user;
    let passwdQuery = await getUserPasswd(id);
    if (passwdQuery.PASSWD_USR != passwd) {          // Hacer un query para obtener la contraseña del usuario a modificar y aquí comparar si se ha modificado
        user = await updateUserWPasswd(nombre, correo, CryptoJS.SHA256(passwd).toString(), perfil, status, id);
        console.log("Contraseña diferente!!!");
        console.log(`Contraseña en la BD: ${passwdQuery} Contraseña en el body: ${passwd}`);
    } else { user = await updateUser(nombre, correo, perfil, status, id); console.log("Contraseña igual"); }
    
    if(user){
        res.status(201);
        console.log("Usuario actualizado")
    }else{ res.status(401); console.log("Error al actualizar usuario");}
    // Actualizar usuario
});

app.put("/changePasswd/:id/:passwd", async (req, res) => {
    const id = req.params.id;
    const passwd = req.params.passwd
    const user = await changePasswd(id, passwd);
    if(user){
        res.status(201).send(user);
        console.log("Contraseña cambiada exitosamente");
    }else { res.status(401).send('Error al cambiar contraseña'); }
    // Cambia la contraseña de un usuario
});


app.post("/register", async (req, res) => {
    const {nombre, correo, passwd, perfil, status} = req.body;
    const user = await createUser(nombre, correo, passwd, perfil, status);
    res.status(201).send(user);
    console.log("Usuario registrado exitosamente");
    // Crear usuario
});

app.post("/login", async (req, res) => {
    const {correo, passwd} = req.body;
    try {
        const user = await loginUser(correo, passwd);
        if (user){
            res.status(201).send(user);
            console.log('Usuario autenticado');
            
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
            console.log('Usuario no autenticado');
            
        }
    } catch (error) {console.log(error);}
    // Autenticar usuario
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(5000, ()=>{
    console.log('Server started on port 5000');
});