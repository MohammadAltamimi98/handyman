DROP TABLE IF EXISTS users ;

CREATE TABLE users (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"admin" bool NULL DEFAULT false,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);