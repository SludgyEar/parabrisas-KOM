import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

export async function getUsers() {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
    // Regresa todos los usuarios
}
export async function createUser(nombre, correo, passwd, perfil, status){
    const [result] = await pool.query(`
        INSERT INTO USUARIOS (NOMBRE_USR, CORREO_USR, PASSWD_USR, PERFIL_USR, STATUS_USR)
        VALUES (?, ?, ?, ?, ?)
        `, [nombre, correo, passwd, perfil, status]);   // Si no se recibe el perfil y status, en la base de datos se asignan valores por defecto
        const id = result.insertId  // Obtenemos el id que se generó al insertar el registro
        return getUserById(id);     // Desplegamos los datos del registro que acabamos de insertar
    }
    
export async function getUserById(id) {
    const [rows] = await pool.query(`
            SELECT *
            FROM USUARIOS
            WHERE ID_USR = ?
            `, [id]);
    return rows;
    // Regresa el usuario con el id dado
}

export async function loginUser(correo, passwd){
    const [rows] = await pool.query(`
        SELECT NOMBRE_USR
        FROM USUARIOS
        WHERE CORREO_USR = ?
        AND PASSWD_USR = ?
        `, [correo, passwd]);
    return rows[0];
    // Regresa el username del correo y contraseña correctamente ligados
}

export async function getUserByEmail(correo) {
    const [rows] = await pool.query(`
        SELECT *
        FROM USUARIOS
        WHERE CORREO_USR = ?
        `, [correo]);
    return rows;
    // Regresa el nombre del usuario con el correo dado
}

export async function getUserByName(nombre){
    const [rows] = await pool.query(`
        SELECT *
        FROM USUARIOS
        WHERE NOMBRE_USR = ?
        `, [nombre]);
    return rows;
    // Regresa el usuario con el nombre dado
}
