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

DELIMITER //
CREATE TRIGGER update_state_by_stock
AFTER UPDATE ON PARABRISAS
FOR EACH ROW
BEGIN
	UPDATE PARABRISAS
    SET ESTADO_PBS = CASE
		WHEN NEW.STOCK_PBS <= 0 THEN 'AGOTADO'
        ELSE 'DISPONIBLE'
	END
	WHERE ID_PBS = NEW.ID_PBS;
END;
//
DELIMITER ;

SELECT * FROM PARABRISAS;
SELECT clave_pbs, COUNT(*) as total
FROM parabrisas
GROUP BY clave_pbs
HAVING COUNT(*) > 1;

DELETE FROM PARABRISAS WHERE 1=1;

insert into PARABRISAS (clave_pbs, marca_pbs, precio_pbs, stock_pbs) values ('FW00399GUY', 'TOYOTA', 2214, 13);
insert into PARABRISAS (clave_pbs, marca_pbs, precio_pbs, stock_pbs) values ('FW00212EGF', 'MAZDA', 1975, 13);