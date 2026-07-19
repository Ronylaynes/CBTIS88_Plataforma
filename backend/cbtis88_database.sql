-- ================================================================
--  CBTIS No. 88 — Base de Datos MySQL
--  Basada en el diagrama entidad-relación del proyecto
--  Tablas: users, prefichas, projects, teachers, documents
--
--  IMPORTAR:
--    mysql -u root -p < cbtis88_database.sql
-- ================================================================

CREATE DATABASE IF NOT EXISTS cbtis88
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cbtis88;

-- ================================================================
-- 1. USERS — Usuarios del sistema (admin / user)
-- ================================================================
CREATE TABLE IF NOT EXISTS users (
    id            INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    email         VARCHAR(191)    NOT NULL UNIQUE,
    password_hash VARCHAR(255)    NOT NULL,
    -- rol: admin → acceso total | user → solo ve su preficha
    role          ENUM('admin','user','teacher','servicios_escolares')
                                  NOT NULL DEFAULT 'user',
    first_name    VARCHAR(100)    NOT NULL,
    last_name     VARCHAR(100)    NOT NULL,
    is_active     TINYINT(1)      NOT NULL DEFAULT 1,
    created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                  ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role  (role)
) ENGINE=InnoDB;

-- ================================================================
-- 2. TEACHERS — Plantilla docente
-- ================================================================
CREATE TABLE IF NOT EXISTS teachers (
    id              INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(200)  NOT NULL,
    materia         VARCHAR(150)  NULL,
    especialidad    VARCHAR(150)  NULL,
    foto_url        VARCHAR(500)  NULL,
    email           VARCHAR(191)  NULL,
    is_director     TINYINT(1)    NOT NULL DEFAULT 0,
    bio             TEXT          NULL,
    created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_especialidad (especialidad)
) ENGINE=InnoDB;

-- ================================================================
-- 3. PREFICHAS — Registro de aspirantes de nuevo ingreso
--
--  Flujo de status:
--    pendiente → aprobada  → Aspirante aceptado
--    pendiente → rechazada → Datos incompletos
--    pendiente → (sin cambio) → En espera de revisión
-- ================================================================
CREATE TABLE IF NOT EXISTS prefichas (
    id                  INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    user_id             INT UNSIGNED    NULL,           -- FK a users (si el aspirante tiene cuenta)
    folio               VARCHAR(20)     NOT NULL UNIQUE, -- generado automáticamente: CBT2026A0001

    -- Datos personales
    curp                VARCHAR(18)     NOT NULL UNIQUE,
    nombre_completo     VARCHAR(300)    NOT NULL,
    nombre              VARCHAR(100)    NOT NULL,
    apellido_paterno    VARCHAR(100)    NOT NULL,
    apellido_materno    VARCHAR(100)    NOT NULL,
    fecha_nacimiento    DATE            NOT NULL,
    sexo                ENUM('M','F','NB') NOT NULL,

    -- Contacto
    telefono            VARCHAR(15)     NOT NULL,
    email               VARCHAR(191)    NOT NULL,
    direccion           TEXT            NULL,

    -- Especialidades elegidas (1ª obligatoria, 2ª y 3ª opcionales)
    especialidad_1      VARCHAR(100)    NOT NULL,
    especialidad_2      VARCHAR(100)    NULL,
    especialidad_3      VARCHAR(100)    NULL,

    -- Procedencia escolar
    secundaria_nombre   VARCHAR(200)    NULL,
    promedio_egreso     DECIMAL(4,2)    NULL,
    año_egreso          YEAR            NULL,

    -- Tutor / padre de familia
    tutor_nombre        VARCHAR(200)    NULL,
    tutor_parentesco    VARCHAR(50)     NULL,
    tutor_telefono      VARCHAR(15)     NULL,
    tutor_email         VARCHAR(191)    NULL,

    -- Foto del aspirante (capturada con cámara web)
    foto_url            VARCHAR(500)    NULL,

    -- Pago / método de pago (campo del diagrama)
    metodo_pago         VARCHAR(100)    NULL,
    pago_confirmado     TINYINT(1)      NOT NULL DEFAULT 0,

    -- Documentos entregados
    acta_nacimiento     TINYINT(1)      NOT NULL DEFAULT 0,
    certificado_sec     TINYINT(1)      NOT NULL DEFAULT 0,
    curp_doc            TINYINT(1)      NOT NULL DEFAULT 0,
    comprobante_dom     TINYINT(1)      NOT NULL DEFAULT 0,

    -- Status del expediente
    -- pendiente   → en espera de revisión
    -- aprobada    → aspirante aceptado
    -- rechazada   → datos incompletos
    -- en_lista_espera, inscrito
    status              ENUM('pendiente','aprobada','rechazada',
                             'en_lista_espera','inscrito')
                                        NOT NULL DEFAULT 'pendiente',
    observaciones       TEXT            NULL,
    revisado_por        INT UNSIGNED    NULL,           -- FK a users (admin que revisó)
    fecha_revision      DATETIME        NULL,

    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_preficha_user     FOREIGN KEY (user_id)      REFERENCES users(id)    ON DELETE SET NULL,
    CONSTRAINT fk_preficha_revisor  FOREIGN KEY (revisado_por) REFERENCES users(id)    ON DELETE SET NULL,

    INDEX idx_curp      (curp),
    INDEX idx_folio     (folio),
    INDEX idx_status    (status),
    INDEX idx_user_id   (user_id)
) ENGINE=InnoDB;

-- ================================================================
-- 4. PROJECTS — Proyectos escolares / institucionales
--    1 maestro puede tener muchos proyectos
-- ================================================================
CREATE TABLE IF NOT EXISTS projects (
    id           INT UNSIGNED   AUTO_INCREMENT PRIMARY KEY,
    titulo       VARCHAR(300)   NOT NULL,
    descripcion  TEXT           NULL,
    imagen_url   VARCHAR(500)   NULL,
    thumbnail_url VARCHAR(500)  NULL,
    especialidad VARCHAR(150)   NULL,
    alumnos      TEXT           NULL,          -- nombres de los alumnos participantes
    maestro_id   INT UNSIGNED   NULL,          -- FK a teachers
    fecha        VARCHAR(20)    NULL,          -- ej. "2025-A"
    is_active    TINYINT(1)     NOT NULL DEFAULT 1,
    -- Tipo de proyecto
    type         ENUM('innovation','social','awarded','research','other')
                                NOT NULL DEFAULT 'other',
    is_featured  TINYINT(1)     NOT NULL DEFAULT 0,
    award        VARCHAR(200)   NULL,          -- nombre del premio si lo tiene
    created_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_teacher FOREIGN KEY (maestro_id) REFERENCES teachers(id) ON DELETE SET NULL,
    INDEX idx_maestro   (maestro_id),
    INDEX idx_is_active (is_active),
    INDEX idx_featured  (is_featured)
) ENGINE=InnoDB;

-- ================================================================
-- 5. DOCUMENTS — Documentos subidos por el admin
--    1 admin puede subir muchos documentos
--    Tipos: reporte, acta, convenio, transparencia, otro
-- ================================================================
CREATE TABLE IF NOT EXISTS documents (
    id                INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
    titulo            VARCHAR(300)  NOT NULL,
    tipo              ENUM('reporte','acta','convenio','transparencia',
                           'normatividad','otro')
                                    NOT NULL DEFAULT 'otro',
    archivo_url       VARCHAR(500)  NOT NULL,
    tamano_kb         INT UNSIGNED  NULL,
    fecha_publicacion DATE          NULL,
    uploaded_by       INT UNSIGNED  NULL,      -- FK a users (admin que subió)
    is_public         TINYINT(1)    NOT NULL DEFAULT 1,   -- 1=visible al público
    created_at        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_document_user FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_tipo      (tipo),
    INDEX idx_is_public (is_public)
) ENGINE=InnoDB;

-- ================================================================
-- 6. CONFIGURACIÓN GENERAL DEL SISTEMA
-- ================================================================
CREATE TABLE IF NOT EXISTS configuracion (
    clave       VARCHAR(100)  NOT NULL PRIMARY KEY,
    valor       TEXT          NOT NULL,
    descripcion VARCHAR(300)  NULL,
    updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ================================================================
-- 7. LOG DE AUDITORÍA — registro de acciones del sistema
-- ================================================================
CREATE TABLE IF NOT EXISTS auditoria (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     INT UNSIGNED    NULL,
    accion      VARCHAR(100)    NOT NULL,   -- LOGIN, CREATE_PREFICHA, APPROVE_PREFICHA...
    tabla       VARCHAR(100)    NULL,
    registro_id INT UNSIGNED    NULL,
    detalle     JSON            NULL,
    ip          VARCHAR(45)     NULL,
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_auditoria_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_accion  (accion),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB;

-- ================================================================
-- VISTAS ÚTILES
-- ================================================================

-- Vista: expediente completo del aspirante (para exportar a Excel)
CREATE OR REPLACE VIEW v_aspirantes AS
SELECT
    p.folio,
    p.curp,
    p.nombre_completo,
    p.nombre,
    p.apellido_paterno,
    p.apellido_materno,
    DATE_FORMAT(p.fecha_nacimiento, '%d/%m/%Y') AS fecha_nacimiento,
    CASE p.sexo
        WHEN 'M'  THEN 'Masculino'
        WHEN 'F'  THEN 'Femenino'
        ELSE 'No binario'
    END                                          AS sexo,
    p.telefono,
    p.email,
    p.direccion,
    p.especialidad_1                             AS primera_opcion,
    p.especialidad_2                             AS segunda_opcion,
    p.especialidad_3                             AS tercera_opcion,
    p.secundaria_nombre,
    p.promedio_egreso,
    p.año_egreso,
    p.tutor_nombre,
    p.tutor_parentesco,
    p.tutor_telefono,
    p.metodo_pago,
    p.pago_confirmado,
    CASE p.acta_nacimiento  WHEN 1 THEN 'Sí' ELSE 'No' END AS acta_nacimiento,
    CASE p.certificado_sec  WHEN 1 THEN 'Sí' ELSE 'No' END AS certificado_sec,
    CASE p.curp_doc         WHEN 1 THEN 'Sí' ELSE 'No' END AS curp_doc,
    CASE p.comprobante_dom  WHEN 1 THEN 'Sí' ELSE 'No' END AS comprobante_dom,
    p.status,
    p.observaciones,
    DATE_FORMAT(p.created_at, '%d/%m/%Y %H:%i') AS fecha_registro,
    CONCAT(u.first_name, ' ', u.last_name)       AS revisado_por
FROM prefichas p
LEFT JOIN users u ON u.id = p.revisado_por;

-- Vista: resumen de prefichas por status
CREATE OR REPLACE VIEW v_resumen_prefichas AS
SELECT
    status,
    COUNT(*)                         AS total,
    COUNT(acta_nacimiento = 1 OR NULL) AS con_acta,
    COUNT(certificado_sec = 1 OR NULL) AS con_certificado,
    COUNT(pago_confirmado = 1 OR NULL) AS con_pago
FROM prefichas
GROUP BY status;

-- ================================================================
-- PROCEDIMIENTO: Generar folio automático
-- Formato: CBT + AÑO + LETRA_PERIODO + consecutivo con 4 dígitos
-- Ejemplo: CBT2026A0001
-- ================================================================
DELIMITER $$

CREATE PROCEDURE IF NOT EXISTS generar_folio(OUT p_folio VARCHAR(20))
BEGIN
    DECLARE v_año       CHAR(4);
    DECLARE v_periodo   CHAR(1);
    DECLARE v_consec    INT DEFAULT 1;
    DECLARE v_mes       INT;

    SET v_año  = YEAR(NOW());
    SET v_mes  = MONTH(NOW());
    SET v_periodo = IF(v_mes <= 6, 'A', 'B');

    SELECT COUNT(*) + 1
      INTO v_consec
      FROM prefichas
     WHERE folio LIKE CONCAT('CBT', v_año, v_periodo, '%');

    SET p_folio = CONCAT('CBT', v_año, v_periodo, LPAD(v_consec, 4, '0'));
END $$

DELIMITER ;

-- ================================================================
-- DATOS INICIALES
-- ================================================================

-- Configuración del plantel
INSERT IGNORE INTO configuracion (clave, valor, descripcion) VALUES
('nombre_plantel',      'CBTIS No. 88',                          'Nombre oficial'),
('clave_plantel',       'CHBT0088V',                             'Clave de centro de trabajo'),
('director',            'Nombre del Director',                   'Director actual'),
('telefono',            '962-000-0000',                          'Teléfono principal'),
('direccion',           'Tapachula, Chiapas, México',            'Dirección'),
('correo',              'contacto@cbtis88.edu.mx',               'Correo institucional'),
('prefichas_abiertas',  '1',                                     '1=Abierto 0=Cerrado'),
('max_prefichas',       '240',                                   'Límite de prefichas');

-- Especialidades disponibles (para validación en el backend)
INSERT IGNORE INTO configuracion (clave, valor, descripcion) VALUES
('especialidades', 'Mecánica Industrial,Electricidad,Mecatrónica,Programación,Ciberseguridad,Gestión e Innovación Turística,Inteligencia Artificial',
 'Lista de especialidades separadas por coma');

-- ================================================================
-- USUARIO ADMINISTRADOR INICIAL
-- Email:    admin@cbtis88.edu.mx
-- Password: Admin@2025
-- IMPORTANTE: cambia la contraseña después del primer login
--
-- El hash de abajo es bcrypt de "Admin@2025"
-- Generarlo en Python:
--   import bcrypt
--   bcrypt.hashpw(b'Admin@2025', bcrypt.gensalt()).decode()
-- ================================================================
INSERT IGNORE INTO users
  (email, password_hash, role, first_name, last_name)
VALUES
  ('admin@cbtis88.edu.mx',
   '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TiGX5atUSi3RQN7NGAL/sEbQVJXi',
   'admin',
   'Super',
   'Admin');
