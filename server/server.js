import express from 'express';
import {getUsers, getUserById, createUser, loginUser, getUserByEmail, getUserByName, logicalDelete} from './database.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get("/usuarios", async (req, res) => {
    const { id, nombre, correo } = req.query; // Cambiado: Ahora se obtienen los parámetros de consulta
    let users = [];

    if (id) {
        users = await getUserById(id);
    } else if (nombre) {
        users = await getUserByName(nombre);
    } else if (correo) {
        users = await getUserByEmail(correo);
    } else {
        users = await getUsers(); // Si no hay parámetros, obtén todos los usuarios
    }

    res.status(201).send(users); // Cambiado: Se envía la lista de usuarios
});

app.put("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const user = await logicalDelete(id);
    res.status(201).send(user);
    // Eliminar usuario
});

// app.get("/usuarios", async(req, res) => {
//     const users = await getUsers();
//     res.status(201).send(users);
//     // Obtener todos los usuarios
// });

// app.get("/usuarios/:id", async (req, res) => {
//     const id = req.params.id;
//     const user = await getUserById(id);
//     res.status(201).send(user);
//     // Obtener usuario por id
//     if (user) {
//         console.log('Búsqueda por ID correcta');

//     } else {
//         console.log('Búsqueda por ID incorrecta');

//     }
// });

// app.get("/valida/:correo", async (req, res) =>{
//     const correo = req.params.correo;
//     const user = await getUserByEmail(correo);
//     res.status(201).send(user);
//     // Obtener usuario por nombre
// });

// app.get("/usuarios/:correo", async (req, res) => {
//     const correo = req.params.correo;
//     const user = await getUserByEmail(correo);
//     res.status(201).send(user);
//     // Obtener usuario por correo
//     if (user) {
//         console.log('Búsqueda por CORREO correcta');

//     } else {
//         console.log('Búsqueda por CORREO incorrecta');

//     }
// });

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