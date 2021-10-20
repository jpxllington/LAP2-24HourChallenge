DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title varchar(250) NOT NULL,
    name varchar(100),
    body varchar NOT NULL
);