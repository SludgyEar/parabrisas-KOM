USE PARABRISASKOM;
-- Creación de la tabla de ventas, la cual referencia al usuario que la adquirio,
-- el usuario que la vendio, la pieza adquirida, su precio, el total de piezas adquiridas y el total de la venta
CREATE TABLE ventas(
	id_venta smallint auto_increment primary key,
    id_usr smallint not null,
    id_vendedor smallint not null,
    id_pbs smallint not null,
    piezas smallint not null,
    totalxPza decimal(4,2),
    total_venta decimal(10,2),
    fecha_venta timestamp not null default now(),
    foreign key (id_usr) references usuarios(id_usr),
    foreign key(id_vendedor) references usuarios(id_usr),
    foreign key (id_pbs) references parabrisas(id_pbs)
);

ALTER TABLE VENTAS
MODIFY COLUMN totalxPza DECIMAL(6,2);

-- Querys estadísticos
-- Cantidad de ventas por mes:
SELECT COUNT(*) AS total_ventas
FROM ventas
WHERE fecha_venta >= '2024-03-01'
  AND fecha_venta < DATE_ADD('2024-03-01', INTERVAL 1 MONTH); -- Busca mayor o igual a una fecha es decir desde ese día hasta agregar un mes

SELECT COUNT(*) AS TOTAL
FROM VENTAS
WHERE FECHA_VENTA LIKE '%2024-03%';

-- Ingresos totales por mes:
SELECT SUM(TOTAL_VENTA) AS VENTAS
FROM VENTAS
WHERE FECHA_VENTA LIKE '%2024-03%';

-- Pbs más vendido por mes:
SELECT id_pbs, SUM(piezas) AS total_vendidos
FROM ventas
WHERE fecha_venta LIKE '2024-03%'
GROUP BY id_pbs
ORDER BY total_vendidos DESC
LIMIT 1;

-- Cliente más frecuente en el mes:
SELECT u.nombre_usr -- , COUNT(*) AS total_compras
FROM ventas v
JOIN usuarios u ON v.id_usr = u.id_usr
WHERE fecha_venta LIKE '2024-03%'
GROUP BY v.id_usr
ORDER BY total_compras DESC
LIMIT 1;
-- Las compras de los clientes en un mes:
SELECT U.NOMBRE_USR, V.ID_USR, COUNT(*) AS COMPRAS
FROM VENTAS V
JOIN USUARIOS U ON V.ID_USR = U.ID_USR
WHERE FECHA_VENTA LIKE '%2024-03%'
GROUP BY V.ID_USR
ORDER BY COMPRAS DESC;
-- Obtención de datos para graficar
SELECT 
    DATE_FORMAT(fecha_venta, '%Y-%m') AS mes,
    COUNT(*) AS total_ventas
FROM VENTAS
WHERE fecha_venta BETWEEN DATE_ADD('2024-07-01', INTERVAL -6 MONTH) 
                      AND DATE_ADD('2024-07-01', INTERVAL -1 DAY)
GROUP BY mes
ORDER BY mes;
-- Detalles de ventas para tabla
-- Claves | Marca | Pzas Vendidas | Pzas Restantes
-- Op 1
SELECT 
    p.clave_pbs AS Clave,
    p.marca_pbs AS Marca,
    SUM(v.piezas) AS Pzas_Vendidas,
    p.stock_pbs AS Pzas_Restantes
FROM VENTAS v
JOIN PARABRISAS p ON v.id_pbs = p.id_pbs
GROUP BY p.clave_pbs, p.marca_pbs, p.stock_pbs
ORDER BY Pzas_Vendidas DESC;
-- Op 2
SELECT 
    p.marca_pbs AS Marca,
    SUM(v.piezas) AS Pzas_Vendidas,
    SUM(p.stock_pbs) AS Pzas_Restantes
FROM VENTAS v
JOIN PARABRISAS p ON v.id_pbs = p.id_pbs
GROUP BY p.marca_pbs
ORDER BY Pzas_Vendidas DESC;
-- Op 3 Seleccionada but static
SELECT 
	p.clave_pbs AS Clave,
    p.marca_pbs AS Marca,
    SUM(v.piezas) AS Pzas_Vendidas,
    p.stock_pbs AS Pzas_Restantes
FROM VENTAS v
JOIN PARABRISAS p ON v.id_pbs = p.id_pbs
GROUP BY p.clave_pbs, p.marca_pbs, p.stock_pbs
ORDER BY p.marca_pbs, Pzas_Vendidas DESC;

SELECT 
    p.marca_pbs AS Marca,
    p.clave_pbs AS Clave,
    SUM(v.piezas) AS Pzas_Vendidas,
    p.stock_pbs AS Pzas_Restantes
FROM VENTAS v
JOIN PARABRISAS p ON v.id_pbs = p.id_pbs
WHERE fecha_venta BETWEEN DATE_ADD('2024-07-01', INTERVAL -6 MONTH) 
                      AND DATE_ADD('2024-07-01', INTERVAL -1 DAY)
GROUP BY p.marca_pbs, p.clave_pbs, p.stock_pbs
ORDER BY p.marca_pbs, Pzas_Vendidas DESC;

-- Corrigiendo
-- Pbs más vendido
SELECT CLAVE_PBS, SUM(PIEZAS) AS VENDIDOS
FROM VENTAS
JOIN PARABRISAS ON VENTAS.ID_PBS = PARABRISAS.ID_PBS
WHERE FECHA_VENTA LIKE '%2024-07%'
GROUP BY CLAVE_PBS
ORDER BY VENDIDOS DESC
LIMIT 1;
-- Cliente frecuente
SELECT u.nombre_usr AS COMPRAS
    FROM ventas v
    JOIN usuarios u ON v.id_usr = u.id_usr
    WHERE fecha_venta LIKE '%2024-07%'
    GROUP BY v.id_usr
    LIMIT 1  ;