USE parabrisaskom;
-- DELETE FROM USUARIOS WHERE 1=1; -- Query para borrar todos los usuarios de la tabla
-- SET SQL_SAFE_UPDATES = 0; -- Query para deshabilitar el borrado seguro

CREATE TABLE Parabrisas(
	id_pbs SMALLINT AUTO_INCREMENT PRIMARY KEY,
    clave_pbs VARCHAR(25) NOT NULL,
    marca_pbs VARCHAR(25) NOT NULL,
    precio_pbs INT NOT NULL,
    stock_pbs INT NOT NULL DEFAULT 0,
	estado_pbs ENUM('DISPONIBLE', 'AGOTADO') DEFAULT 'DISPONIBLE',
    alta_pbs TIMESTAMP NOT NULL DEFAULT NOW()
);

-- drop trigger update_state_by_stock;
-- drop table Parabrisas;

SELECT clave_pbs, COUNT(*) as total
FROM parabrisas
GROUP BY clave_pbs
HAVING COUNT(*) > 1;

DELETE FROM PARABRISAS WHERE 1=1;

insert into PARABRISAS (clave_pbs, marca_pbs, precio_pbs, stock_pbs) values ('FW00399GUY', 'TOYOTA', 2214, 13);
insert into PARABRISAS (clave_pbs, marca_pbs, precio_pbs, stock_pbs) values ('FW00212EGF', 'MAZDA', 1975, 13);

SELECT * FROM PARABRISAS;

SELECT PRECIO_PBS
FROM PARABRISAS
WHERE ID_PBS > 618
AND ID_PBS < 701;

