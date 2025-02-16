import express from 'express';
import {getUsers, getUserById, createUser, loginUser, getUserByEmail, getUserByName} from './database.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get("/usuarios", async(req, res) => {
    const users = await getUsers();
    res.status(201).send(users);
    // Obtener todos los usuarios
});

app.get("/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUserById(id);
    // res.status(201).send(user);
    // Obtener usuario por id
    if (user) {
        res.status(201).send(user);
        console.log('Búsqueda por ID correcta');

    } else {
        res.status(401).send('TOO BAD');
        console.log('Búsqueda por ID incorrecta');

    }
});

app.get("/usuarios/:nombre", async (req, res) =>{
    const nombre = req.params.nombre;
    const user = await getUserByName(nombre);
    res.status(201).send(user);
    // Obtener usuario por nombre
    if (user) {
        res.status(201).send(user);
        console.log('Búsqueda por NOMBRE correcta');

    } else {
        res.status(401).send('TOO BAD');
        console.log('Búsqueda por NOMBRE incorrecta');

    }
});

app.get("/usuarios/:correo", async (req, res) => {
    const correo = req.params.correo;
    const user = await getUserByEmail(correo);
    res.status(201).send(user);
    // Obtener usuario por correo
    if (user) {
        res.status(201).send(user);
        console.log('Búsqueda por CORREO correcta');

    } else {
        res.status(401).send('TOO BAD');
        console.log('Búsqueda por CORREO incorrecta');

    }
});

app.post("/register", async (req, res) => {
    const {nombre, correo, passwd, perfil, status} = req.body;
    const user = await createUser(nombre, correo, passwd, perfil, status);
    res.status(201).send(user);
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