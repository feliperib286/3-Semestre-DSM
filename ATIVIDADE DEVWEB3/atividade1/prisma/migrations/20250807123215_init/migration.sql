-- CreateTable
-- CreateTable
CREATE TABLE  carro (
  Idprova INTEGER NOT NULL,
  modelo VARCHAR(20) NULL,
  PRIMARY KEY(Idprova)
);

CREATE TABLE pessoa (
  id INT NOT NULL,
  nome VARCHAR(100) NULL,
  PRIMARY KEY(id)
);

CREATE TABLE pesso_por_carro (
  carro_Idprova INTEGER NOT NULL,
  pessoa_id INT NOT NULL,
  PRIMARY KEY(carro_Idprova, pessoa_id)
 );

CREATE TABLE telefone (
  id INTEGER NOT NULL,
  pessoa_id INT NOT NULL,
  numeros VARCHAR(11) NULL,
  PRIMARY KEY(id)

);
