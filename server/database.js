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

export async function getUserPasswd(id) {
    const [rows] = await pool.query(`
        SELECT PASSWD_USR 
        FROM USUARIOS
        WHERE ID_USR = ${id}
        `);
    return rows[0];
    // Regresa la contraseña de un usuario dado un ID
}

export async function createUser(nombre, correo, passwd, tel, full_name, perfil, status) {
    const [result] = await pool.query(`
        INSERT INTO USUARIOS (NOMBRE_USR, CORREO_USR, PASSWD_USR, TEL_USR, FULL_NAME_USR, PERFIL_USR, STATUS_USR)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [nombre, correo, passwd, tel, full_name, perfil, status]);   // Si no se recibe el perfil y status, en la base de datos se asignan valores por defecto
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

export async function loginUser(correo, passwd) {
    const [rows] = await pool.query(`
        SELECT ID_USR, NOMBRE_USR, CORREO_USR, STATUS_USR, PERFIL_USR
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

export async function getUserByName(nombre) {
    const [rows] = await pool.query(`
        SELECT *
        FROM USUARIOS
        WHERE NOMBRE_USR = ?
        `, [nombre]);
    return rows;
    // Regresa el usuario con el nombre dado
}

export async function getUserByPerfil(perfil) {
    const [rows] = await pool.query(`
        SELECT *
        FROM USUARIOS
        WHERE PERFIL_USR = '${perfil}'
        `);
    return rows;
    // Regresa todos los usuarios con el perfil dado
}

export async function logicalDelete(id) {
    const [rows] = await pool.query(`
        UPDATE USUARIOS
        SET STATUS_USR = '2'
        WHERE ID_USR = ?
        `, [id]);
    return rows;
    // Actualiza el status de un usuario a inactivo
}

export async function updateUser(nombre, correo, perfil, status, id) {   // No cambia contraseñas
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
    return rows.length > 0 ? rows[0] : null;
    // Regresa un pbs dada una clave de pbs y si no encuentra pbs regresa null
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
        SET STOCK_PBS = STOCK_PBS + ${stock}, PRECIO_PBS = ${precio}
        WHERE CLAVE_PBS = '${clave}'
        `);
    // Función que actualiza el stock de los pbs después de recibir un pedido
    // No se cambia la marca porque hay pbs equivalentes, comparten la clave pero son diferentes marcas y modelos.
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

/*
   ********************************************
                Citas de usuario!
   ********************************************
*/

export async function getCitas(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM CITAS
        WHERE ID_USR = ${id}
        `);
    return rows.length > 0 ? rows[0] : null;
    // Regresa todas las citas
}


export async function getCitaByDate(date) {
    const [rows] = await pool.query(`
        SELECT *
        FROM CITAS
        WHERE FECHA_CITA = ?
        `, [date]);
    return rows.length > 0 ? rows : null;
    // Regresa una cita dado un id de usuario
}

export async function getUserIDToCita(fullName, email) {
    const [rows] = await pool.query(`
        SELECT ID_USR
        FROM USUARIOS
        WHERE FULL_NAME_USR = ?
        AND CORREO_USR = ?
    `, [fullName, email]);
    return rows.length > 0 ? rows : null;
    // Regresa el id del usuario dado su nombre y correo
}

export async function createCita(id_usr, date, motivo) {
    await pool.query(`
        INSERT INTO CITAS(ID_USR, FECHA_CITA, MOTIVO_CITA)
        VALUES(?,?,?)`, [id_usr, date, motivo]);
    // Crea una cita
}

export async function checkAvailableCita(date) {
    let fecha = date.split('T')[0];
    const [rows] = await pool.query(`
    SELECT COUNT(*) AS total
    FROM CITAS
    WHERE FECHA_CITA LIKE '%${fecha}%'
    `, [date]);
    return rows[0].total < 5;   // Devuelve true si hay espacio para agendar
}

/*
   ********************************************
                Ventas de parabrisas!
   ********************************************
*/

export async function getTelRFC(fullName, email) {
    const [rows] = await pool.query(`
        SELECT TEL_USR, RFC_USR
        FROM USUARIOS
        WHERE FULL_NAME_USR = ?
        AND CORREO_USR = ?
        `, [fullName, email]);
    console.log("db.js" + rows);
    return rows.length > 0 ? rows[0] : null;
    // Regresa el teléfono y RFC del cliente dado su nombre y correo y si no, regresa null
}

export async function cantVentasPbsMes(fecha) {
    fecha = fecha.slice(0, 7);
    const [rows] = await pool.query(`
        SELECT COUNT(*) AS TOTAL
        FROM VENTAS
        WHERE FECHA_VENTA LIKE '%${fecha}%'
        `);
    return rows.length > 0 ? rows : "N/A";
    // Regresa el total de ventas por mes
}

export async function totalVentasPbsMes(fecha) {
    fecha = fecha.slice(0, 7);
    const [rows] = await pool.query(`
            SELECT SUM(TOTAL_VENTA) AS VENTAS
            FROM VENTAS
            WHERE FECHA_VENTA LIKE '%${fecha}%' 
            `);
    return rows.length > 0 ? rows : "N/A";
    // Regresa el total neto de ventas por mes
}

export async function pbsMasVendidoMes(fecha) {
    fecha = fecha.slice(0, 7);
    const [rows] = await pool.query(`
                SELECT CLAVE_PBS, SUM(PIEZAS) AS VENDIDOS
                FROM VENTAS
                JOIN PARABRISAS ON VENTAS.ID_PBS = PARABRISAS.ID_PBS
                WHERE FECHA_VENTA LIKE '%${fecha}%'
                GROUP BY CLAVE_PBS
                ORDER BY VENDIDOS DESC
                LIMIT 1
                `);
    return rows.length > 0 ? rows : "N/A";
    // Regresa el pbs más vendido por mes
}

export async function clienteFrecuenteMes(fecha) {
    fecha = fecha.slice(0, 7);
    const [rows] = await pool.query(`
                    SELECT U.NOMBRE_USR AS NOMBRE, COUNT(*) AS COMPRAS
                    FROM VENTAS V
                    JOIN USUARIOS U ON V.ID_USR = U.ID_USR
                    WHERE FECHA_VENTA LIKE '2024-03%'
                    GROUP BY V.ID_USR
                    ORDER BY COMPRAS DESC
                    LIMIT 1; 
                    `);
    return rows.length > 0 ? rows : "N/A";
    // Regresa el cliente frecuente por mes
}

export async function cantVentasGrafica(fecha) {
    fecha = fecha.slice(0, 7);
    fecha = fecha + '-01';  // Eliminamos el día que tomó para reemplazarlo por el primer día del mes
    const [rows] = await pool.query(`
        SELECT 
        DATE_FORMAT(FECHA_VENTA, '%Y-%m') AS MES,
        COUNT(*) AS TOTAL_VENTAS
        FROM VENTAS
        WHERE FECHA_VENTA BETWEEN DATE_ADD(?, INTERVAL -6 MONTH) 
        AND DATE_ADD(?, INTERVAL -1 DAY)
        GROUP BY MES
        ORDER BY MES   
        `, [fecha, fecha]);
    return rows;
    // Regresa la cantidad de ventas por mes durante seis meses, se encuentran en MES Y TOTAL_VENTAS variables
}

export async function concentradoVentas(fecha) {
    fecha = fecha.slice(0, 7);
    const [rows] = await pool.query(`
            SELECT 
            UPPER(p.marca_pbs) AS MARCA,
            UPPER(p.clave_pbs) AS CLAVE,
            SUM(v.piezas) AS PZAS_VENDIDAS,
            p.stock_pbs AS PZAS_RESTANTES
            FROM VENTAS v
            JOIN PARABRISAS p ON v.id_pbs = p.id_pbs
            WHERE FECHA_VENTA LIKE '%${fecha}%'
            GROUP BY p.marca_pbs, p.clave_pbs, p.stock_pbs
            ORDER BY p.marca_pbs, PZAS_VENDIDAS DESC;
            `);
    return rows;
    // Detalles de ventas para tabla: Claves | Marca | Pzas Vendidas | Pzas Restantes
}
/*
    ********************************************
                FeedBack!
    ********************************************
*/

export async function createFeedBack(interfazAtractiva, interfazFacilUso, sistemaFunciona, informacionAccesible, gustoSistema, sugerencia){
    if(sugerencia === "" || sugerencia === null || sugerencia === undefined){
        const [rows] = await pool.query(`
        INSERT INTO FEEDBACK(interfaz_atractiva, interfaz_facil_uso, sistema_funciona, informacion_accesible, gusto_sistema)
        VALUES(?, ?, ?, ?, ?)
        `, [interfazAtractiva, interfazFacilUso, sistemaFunciona, informacionAccesible, gustoSistema]);
        return rows;
    }else{
        const [rows] = await pool.query(`
        INSERT INTO FEEDBACK(interfaz_atractiva, interfaz_facil_uso, sistema_funciona, informacion_accesible, gusto_sistema, sugerencia)
        VALUES(?, ?, ?, ?, ?, ?)
        `, [interfazAtractiva, interfazFacilUso, sistemaFunciona, informacionAccesible, gustoSistema, sugerencia]);
        return rows;
    }
    // Crea un nuevo feedback
}