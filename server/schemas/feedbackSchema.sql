-- Esquema para gestionar el FeedBack de los usuarios
USE parabrisaskom;
CREATE TABLE feedback (
    id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    interfaz_atractiva TINYINT NOT NULL,
    interfaz_facil_uso TINYINT NOT NULL,
    sistema_funciona TINYINT NOT NULL,
    informacion_accesible TINYINT NOT NULL,
    gusto_sistema TINYINT NOT NULL,
    sugerencia TEXT,
    fecha_registro TIMESTAMP NOT NULL DEFAULT NOW()
)
COMMENT='Tabla de feedback del sistema. Valores de 1 (bajo) a 5 (alto) en preguntas';

ALTER TABLE FEEDBACK MODIFY COLUMN SUGERENCIA varchar(255) DEFAULT "S/Sugerencia" NOT NULL;

ALTER TABLE feedback
  ADD CONSTRAINT chk_interfaz_atractiva
    CHECK (interfaz_atractiva BETWEEN 1 AND 5),
  ADD CONSTRAINT chk_interfaz_facil_uso
    CHECK (interfaz_facil_uso BETWEEN 1 AND 5),
  ADD CONSTRAINT chk_sistema_funciona
    CHECK (sistema_funciona BETWEEN 1 AND 5),
  ADD CONSTRAINT chk_informacion_accesible
    CHECK (informacion_accesible BETWEEN 1 AND 5),
  ADD CONSTRAINT chk_gusto_sistema
    CHECK (gusto_sistema BETWEEN 1 AND 5);


SELECT * FROM FEEDBACK;

INSERT INTO FEEDBACK(interfaz_atractiva, interfaz_facil_uso, sistema_funciona, informacion_accesible, gusto_sistema, sugerencia)
VALUES (1,2,3,4,5,'sugerencia');

INSERT INTO FEEDBACK(interfaz_atractiva, interfaz_facil_uso, sistema_funciona, informacion_accesible, gusto_sistema)
VALUES (1,2,3,4,5);