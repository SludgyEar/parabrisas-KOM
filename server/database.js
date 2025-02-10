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
}

export async function getUserById(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM USUARIOS
        WHERE ID_USR = ?
        `, [id]);
    return rows[0];
}

export async function createUser(nombre, correo, passwd, perfil, status){
    const [result] = await pool.query(`
        INSERT INTO USUARIOS (NOMBRE_USR, CORREO_USR, PASSWD_USR, PERFIL_USR, STATUS_USR)
        VALUES (?, ?, ?, ?, ?)
        `, [nombre, correo, passwd, perfil, status]);
    const id = result.insertId  // Obtenemos el id que se generó al insertar el registro
    return getUserById(id);     // Desplegamos el registro que acabamos de insertar
}