create database parabrisasKom;
use parabrisasKom;

-- SET SQL_SAFE_UPDATES = 0;

create table usuarios(
	id_usr SMALLINT PRIMARY KEY AUTO_INCREMENT,
    correo_usr VARCHAR(50) UNIQUE NOT NULL,
    passwd_usr VARCHAR(64) NOT NULL,
    perfil_usr VARCHAR(1),
    status_usr VARCHAR(1),
    alta_usr TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO usuarios (correo_usr, passwd_usr, perfil_usr, status_usr) VALUES ('uno@ejemplo.com', '1', 'A', '1');
INSERT INTO usuarios (correo_usr, passwd_usr, perfil_usr, status_usr) VALUES ('dos@ejemplo.com', '2', 'A', '1');
INSERT INTO usuarios (correo_usr, passwd_usr, perfil_usr, status_usr) VALUES ('tres@ejemplo.com', '3', 'A', '2');
INSERT INTO usuarios (correo_usr, passwd_usr, perfil_usr, status_usr) VALUES ('cuatro@ejemplo.com', '4', 'B', '1');
INSERT INTO usuarios (correo_usr, passwd_usr, perfil_usr, status_usr) VALUES ('cinco@ejemplo.com', '5', 'B', '1');

-- DELETE FROM USUARIOS where 1=1;

DELIMITER //
CREATE TRIGGER before_insert_password
BEFORE INSERT ON USUARIOS
FOR EACH ROW
BEGIN
    SET NEW.passwd_usr = SHA2(NEW.passwd_usr, 256);
END;
//
DELIMITER ;

SELECT * FROM USUARIOS;
ALTER TABLE USUARIOS AUTO_INCREMENT = 6;

UPDATE usuarios SET nombre_usr = 'uno' WHERE correo_usr = 'uno@ejemplo.com';
UPDATE usuarios SET nombre_usr = 'dos' WHERE correo_usr = 'dos@ejemplo.com';
UPDATE usuarios SET nombre_usr = 'tres' WHERE correo_usr = 'tres@ejemplo.com';
UPDATE usuarios SET nombre_usr = 'cuatro' WHERE correo_usr = 'cuatro@ejemplo.com';
UPDATE usuarios SET nombre_usr = 'cinco' WHERE correo_usr = 'cinco@ejemplo.com';
UPDATE usuarios SET nombre_usr = 'six' WHERE correo_usr = 'six@ejemplo.com';
DELETE FROM USUARIOS WHERE ID_USR > 5;
