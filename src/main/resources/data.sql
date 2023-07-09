
--  application data ---------------
INSERT INTO vets VALUES (default, 'James', 'Carter', 'James@gmail.com',1);
INSERT INTO vets VALUES (default, 'Helen', 'Leary', 'Helen@gmail.com',1);
INSERT INTO vets VALUES (default, 'Linda', 'Douglas', 'Linda@gmail.com',1);
INSERT INTO vets VALUES (default, 'Rafael', 'Ortega', 'Rafael@gmail.com',1);
INSERT INTO vets VALUES (default, 'Henry', 'Stevens', 'Henry@gmail.com',1);
INSERT INTO vets VALUES (default, 'Sharon', 'Jenkins', 'Sharon@gmail.com',1);

INSERT INTO specialties VALUES (default, 'radiology', 1);
INSERT INTO specialties VALUES (default, 'surgery', 1);
INSERT INTO specialties VALUES (default, 'dentistry', 1);

INSERT INTO vet_specialties VALUES (2, 1, 1);
INSERT INTO vet_specialties VALUES (3, 2, 1);
INSERT INTO vet_specialties VALUES (3, 3, 1);
INSERT INTO vet_specialties VALUES (4, 2, 1);
INSERT INTO vet_specialties VALUES (5, 1, 1);

INSERT INTO types VALUES (default, 'cat', 1);
INSERT INTO types VALUES (default, 'dog', 1);
INSERT INTO types VALUES (default, 'lizard', 1);
INSERT INTO types VALUES (default, 'snake', 1);
INSERT INTO types VALUES (default, 'bird', 1);
INSERT INTO types VALUES (default, 'hamster', 1);

INSERT INTO owners (id, first_name, last_name,address,  city, telephone, version, email) VALUES (default, 'George', 'Franklin', '110 W. Liberty St.', 'Madison', '6085551023',1, 'George@gmail.com');
INSERT INTO owners (id, first_name, last_name,address,  city, telephone, version, email) VALUES (default, 'Betty', 'Davis', '638 Cardinal Ave.', 'Sun Prairie', '6085551749',1, 'Betty@gmail.com');
INSERT INTO owners (id, first_name, last_name,address,  city, telephone, version, email) VALUES (default, 'Eduardo', 'Rodriquez', '2693 Commerce St.', 'McFarland', '6085558763', 2, 'Eduardo@gmail.com');
INSERT INTO owners (id, first_name, last_name,address,  city, telephone, version, email) VALUES (default, 'Harold', 'Davis', '563 Friendly St.', 'Windsor', '6085553198', 2, 'Harold@gmail.com');
INSERT INTO owners (id, first_name, last_name,address,  city, telephone, version, email) VALUES (default, 'Peter', 'McTavish', '2387 S. Fair Way', 'Madison', '6085552765', 2, 'Peter@gmail.com');
INSERT INTO owners (id, first_name, last_name,address,  city, telephone, version, email) VALUES (default, 'Jean', 'Coleman', '105 N. Lake St.', 'Monona', '6085552654', 2, 'Jean@gmail.com');
INSERT INTO owners (id, first_name, last_name,address,  city, telephone, version, email) VALUES (default, 'Jeff', 'Black', '1450 Oak Blvd.', 'Monona', '6085555387', 2, 'Jeff@gmail.com');
INSERT INTO owners (id, first_name, last_name,address,  city, telephone, version, email) VALUES (default, 'Maria', 'Escobito', '345 Maple St.', 'Madison', '6085557683', 2, 'Maria@gmail.com');
INSERT INTO owners (id, first_name, last_name,address,  city, telephone, version, email) VALUES (default, 'David', 'Schroeder', '2749 Blackhawk Trail', 'Madison', '6085559435', 2, 'David@gmail.com');
INSERT INTO owners (id, first_name, last_name,address,  city, telephone, version, email) VALUES (default, 'Carlos', 'Estaban', '2335 Independence La.', 'Waunakee', '6085555487', 2, 'Carlos@gmail.com');

INSERT INTO pets VALUES (default, 'Leo', '2010-09-07', 1, 1, 1);
INSERT INTO pets VALUES (default, 'Basil', '2012-08-06', 6, 2, 1);
INSERT INTO pets VALUES (default, 'Rosy', '2011-04-17', 2, 3, 1);
INSERT INTO pets VALUES (default, 'Jewel', '2010-03-07', 2, 3, 1);
INSERT INTO pets VALUES (default, 'Iggy', '2010-11-30', 3, 4, 1);
INSERT INTO pets VALUES (default, 'George', '2010-01-20', 4, 5, 1);
INSERT INTO pets VALUES (default, 'Samantha', '2012-09-04', 1, 6, 1);
INSERT INTO pets VALUES (default, 'Max', '2012-09-04', 1, 6, 1);
INSERT INTO pets VALUES (default, 'Lucky', '2011-08-06', 5, 7, 1);
INSERT INTO pets VALUES (default, 'Mulligan', '2007-02-24', 2, 8, 1);
INSERT INTO pets VALUES (default, 'Freddy', '2010-03-09', 5, 9, 1);
INSERT INTO pets VALUES (default, 'Lucky', '2010-06-24', 2, 10, 1);
INSERT INTO pets VALUES (default, 'Sly', '2012-06-08', 1, 10, 1);

INSERT INTO visits VALUES (default, 7, '2013-01-01', 'rabies shot', 1);
INSERT INTO visits VALUES (default, 8, '2013-01-02', 'rabies shot', 1);
INSERT INTO visits VALUES (default, 8, '2013-01-03', 'neutered', 1);
INSERT INTO visits VALUES (default, 7, '2013-01-04', 'spayed', 1);
