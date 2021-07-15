CREATE TABLE public.tickets (
	id serial NOT NULL,
	name varchar(255) NOT NULL,
	userid int4 NULL,
	description varchar(255) NULL,
	CONSTRAINT tickets_pkey PRIMARY KEY (id)
);
ALTER TABLE public.tickets ADD CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES public.users(id);