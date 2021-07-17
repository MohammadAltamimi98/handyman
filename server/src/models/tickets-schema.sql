DROP TABLE public.tickets IF EXISTS;

CREATE TABLE public.tickets (
	id serial NOT NULL,
	adminname varchar(255) NOT NULL, 
	userid int4 ,
	description varchar(255),
	type varchar(255),
	service varchar(255),
	CONSTRAINT tickets_pkey PRIMARY KEY (id)
);
ALTER TABLE public.tickets ADD CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES public.users(id);