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
        SELECT NOMBRE_USR, CORREO_USR, STATUS_USR, PERFIL_USR
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

/*
   ********************************************
                Catalogode Pbs!
   ********************************************
*/

export async function getAllPbs() {
    const [rows] = await pool.query(`
        SELECT *
        FROM PARABRISAS
        `);
    return rows;
}
// Clave, marca y edo

export async function getPbsByMark(marca) {
    const [rows] = await pool.query(`
        SELECT *
        FROM PARABRISAS
        WHERE MARCA_PBS = '${marca}'
        `);   
    return rows;
    // Regresa un pbs dada una marca de vehículo
}

export async function getPbsByKey(clave) {
    const [rows] = await pool.query(`
        SELECT *
        FROM PARABRISAS
        WHERE CLAVE_PBS = '${clave}'
        `);
    return rows;
    // Regresa un pbs dada una clave de pbs
}

export async function getPbsKeyByKey(clave) {
    const [rows] = await pool.query(`
        SELECT CLAVE_PBS
        FROM PARABRISAS
        WHERE CLAVE_PBS = '${clave}'
        `);
    return rows[0];
    // Regresa un pbs dada una clave de pbs
}

export async function getPbsByState(edo) {
    const [rows] = await pool.query(`
        SELECT *
        FROM PARABRISAS
        WHERE ESTADO_PBS = '${edo}'
        `);
    return rows;
    // Regresa pbs dado un estado 'disponible' o 'agotado'
}

export async function createPbs(clave, marca, precio, stock) {
    await pool.query(
        `INSERT INTO PARABRISAS(CLAVE_PBS, MARCA_PBS, PRECIO_PBS, STOCK_PBS)
        VALUES (?,?,?,?)`, [clave, marca, precio, stock]);
    // Función que agrega pbs nuevos
}

export async function updatePbsStock(clave, precio, stock) {
    await pool.query(
        `UPDATE PARABRISAS
        SET STOCK_PBS = STOCK_PBS + ${stock}
        SET PRECIO_PBS = ${precio}
        WHERE CLAVE_PBS = ${clave}
        `);
    // Función que actualiza el stock de los pbs después de recibir un pedido
}

export async function decreaseStock(salidas) {
    await pool.query(
        `UPDATE PARABRISAS
        SET STOCK_PBS = STOCK_PBS - ?`, [salidas]);
    // Función que disminuye el stock de pbs
}

export async function increaseStock(entradas) {
    await pool.query(
        `UPDATE PARABRISAS
        SET STOCK_PBS = STOCK_PBS + ?`, [entradas]);
    // Función que aumenta el stock de pbs
}

try{
    const res = await getPbsByKey('FW51532SUV');
    console.log(res);
}catch(err){console.log(err);}