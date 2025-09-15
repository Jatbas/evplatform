INSERT INTO companies (id, name, website, email) VALUES
  (1, 'Company 1', 'https://company1.fi', 'info@company1.fi'),
  (2, 'Company 2', 'https://company2.fi', 'contact@company2.fi'),
  (3, 'Company 3', 'https://company3.fi', 'hello@company3.fi');


INSERT INTO company_associations (parent_company_id, child_company_id)
VALUES (1, 2), (1, 3);


INSERT INTO station_types (id, name, max_power) VALUES
(1, 'Standard Charger', 10);


INSERT INTO stations (id, company_id, station_type_id, name, location) VALUES
(1, 3, 1, 'Station 1 - Helsinki Cathedral', ST_GeomFromText('POINT(24.9523 60.1699)', 4326)),
(2, 2, 1, 'Station 2 - Suomenlinna', ST_GeomFromText('POINT(24.9873 60.1446)', 4326)),
(3, 2, 1, 'Station 3 - Linnanmäki', ST_GeomFromText('POINT(24.9415 60.1886)', 4326)),
(4, 3, 1, 'Station 4 - Temppeliaukio', ST_GeomFromText('POINT(24.9225 60.1756)', 4326)),
(5, 1, 1, 'Station 5 - Kiasma', ST_GeomFromText('POINT(24.9384 60.1720)', 4326));