-- ===================
-- DATABASE CREATION
-- ===================
CREATE DATABASE IF NOT EXISTS evplatform
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE evplatform;


-- ===================
-- COMPANIES
-- ===================
CREATE TABLE companies (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(500) NOT NULL,
    website VARCHAR(250),
    email VARCHAR(250),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE INDEX companies_ix_1 ON companies (created_at);
CREATE INDEX companies_ix_2 ON companies (updated_at);
CREATE UNIQUE INDEX companies_ix_name_unique ON companies(name);

-- ===================
-- COMPANY ASSOCIATIONS
-- ===================
CREATE TABLE company_associations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    parent_company_id BIGINT UNSIGNED NOT NULL,
    child_company_id BIGINT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE INDEX company_associations_ix_1 ON company_associations (parent_company_id);
CREATE INDEX company_associations_ix_2 ON company_associations (child_company_id);
CREATE UNIQUE INDEX company_associations_ix_unique ON company_associations (parent_company_id, child_company_id);
CREATE INDEX company_associations_ix_4 ON company_associations (created_at);
CREATE INDEX company_associations_ix_5 ON company_associations (updated_at);


-- ===================
-- STATION TYPES
-- ===================
CREATE TABLE station_types (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(500) NOT NULL,
    max_power INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE INDEX station_types_ix_1 ON station_types (max_power);
CREATE INDEX station_types_ix_2 ON station_types (created_at);
CREATE INDEX station_types_ix_3 ON station_types (updated_at);
CREATE UNIQUE INDEX station_types_ix_unique ON station_types(name);


-- ===================
-- STATIONS
-- ===================
CREATE TABLE stations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    company_id BIGINT UNSIGNED NOT NULL,
    station_type_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(500) NOT NULL,
    location POINT NOT NULL COMMENT 'Geographic coordinates using WGS 84 (SRID 4326 standard)',
    reference VARCHAR(32),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

# For MySQL 8, if available
ALTER TABLE stations
    ADD CONSTRAINT enforce_srid CHECK (ST_SRID(location) = 4326);

CREATE INDEX stations_ix_1 ON stations (company_id);
CREATE INDEX stations_ix_2 ON stations (station_type_id);
CREATE INDEX stations_ix_3 ON stations (created_at);
CREATE INDEX stations_ix_4 ON stations (updated_at);
CREATE SPATIAL INDEX stations_ix_5_spatial ON stations (location);
CREATE UNIQUE INDEX stations_ix_5 ON stations(reference);


-- ===================
-- FOREIGN KEYS
-- ===================
ALTER TABLE company_associations
    ADD CONSTRAINT fk_company_associations_child
        FOREIGN KEY (child_company_id) REFERENCES companies (id)
        ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE company_associations
    ADD CONSTRAINT fk_company_associations_parent
        FOREIGN KEY (parent_company_id) REFERENCES companies (id)
        ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE stations
    ADD CONSTRAINT fk_stations_company
        FOREIGN KEY (company_id) REFERENCES companies (id)
        ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE stations
    ADD CONSTRAINT fk_stations_station_type
        FOREIGN KEY (station_type_id) REFERENCES station_types (id)
        ON DELETE RESTRICT ON UPDATE CASCADE;