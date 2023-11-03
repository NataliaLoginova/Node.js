CREATE TABLE IF NOT EXISTS products (
    id serial PRIMARY KEY,
    title character varying NOT NULL,
    description character varying NOT NULL,
    price integer NOT NULL,
    code character varying NOT NULL UNIQUE
);

INSERT INTO products (title, description, code, price) VALUES
('Book', 'Interesting book', 'OA234', 200),
('Pen', 'Cute pen', 'TI130', 20),
('Magazine', 'Interesting magazine', 'CH963', 50),