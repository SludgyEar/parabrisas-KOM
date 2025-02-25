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
    const [rows] = await pool.query(`
        SELECT * FROM USUARIOS
        ORDER BY STATUS_USR ASC
        `);
    return rows;
    // Regresa todos los usuarios
}

export async function getActiveUsers() {
    const [rows] = await pool.query(`SELECT * FROM usuarios WHERE STATUS_USR = '1'`);
    return rows;
    // Regresa todos los usuarios activos
}

export async function getInactiveUsers() {
    const [rows] = await pool.query(`SELECT * FROM usuarios WHERE STATUS_USR = '2'`);
    return rows;
    // Regresa todos los usuarios inactivos
}

export async function getUserPasswd(id){
    const [rows] = await pool.query(`
        SELECT PASSWD_USR 
        FROM USUARIOS
        WHERE ID_USR = ${id}
        `);
    return rows[0];
    // Regresa la contraseña de un usuario dado un ID
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

export async function getUserByPerfil(perfil){
    const [rows] = await pool.query(`
        SELECT *
        FROM USUARIOS
        WHERE PERFIL_USR = '${perfil}'
        `);
    return rows;
    // Regresa todos los usuarios con el perfil dado
}

export async function logicalDelete(id){
    const [rows] = await pool.query(`
        UPDATE USUARIOS
        SET STATUS_USR = '2'
        WHERE ID_USR = ?
        `, [id]);
    return rows;
    // Actualiza el status de un usuario a inactivo
}

export async function updateUser(nombre, correo, perfil, status, id){   // No cambia contraseñas
    const [rows] = await pool.query(`
        UPDATE USUARIOS
        SET NOMBRE_USR = ?, CORREO_USR = ?, PERFIL_USR = ?, STATUS_USR = ?
        WHERE ID_USR = ${id}
        `, [nombre, correo, perfil, status]);
    return rows;
    // Actualiza los datos de un usuario
}

export async function updateUserWPasswd(nombre, correo, passwd, perfil, status, id) {
    const [rows] = await pool.query(`
        UPDATE USUARIOS
        SET NOMBRE_USR = ?, CORREO_USR = ?, PASSWD_USR = ?, PERFIL_USR = ?, STATUS_USR = ?
        WHERE ID_USR = ${id}
        `, [nombre, correo, passwd, perfil, status]);
    return rows;
    // Actualiza los datos de un usuario incluyendo su contraseña
}