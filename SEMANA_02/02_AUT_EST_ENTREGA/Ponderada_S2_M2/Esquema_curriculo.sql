CREATE TABLE Conquistas ( 
	ID_Conquista         INTEGER NOT NULL    ,
	ID_Pessoa_3          INTEGER NOT NULL    ,
	Título               VARCHAR(50)     ,
	Instituição          VARCHAR(50)     ,
	Descrição            VARCHAR(350)     ,
	Data                 DATE     ,
	CONSTRAINT pk_Conquistas PRIMARY KEY ( ID_Conquista, ID_Pessoa_3 )
 );

CREATE TABLE Experiência ( 
	ID_Experiência       INTEGER NOT NULL    ,
	ID_Pessoa            INTEGER NOT NULL    ,
	Empresa              VARCHAR(100)     ,
	Realizações          VARCHAR(350)     ,
	Cargo                VARCHAR(50)     ,
	Início               DATE     ,
	Fim                  DATE     ,
	CONSTRAINT pk_Experiência PRIMARY KEY ( ID_Experiência, ID_Pessoa )
 );

CREATE TABLE Formação ( 
	ID_Form              INTEGER NOT NULL    ,
	ID_Pessoa_2          INTEGER NOT NULL    ,
	Instituição          VARCHAR(50)     ,
	Curso                VARCHAR(50)     ,
	Realizações          VARCHAR(350)     ,
	Início               DATE     ,
	Fim                  DATE     ,
	CONSTRAINT pk_Formação PRIMARY KEY ( ID_Form, ID_Pessoa_2 )
 );

CREATE TABLE Habilidades ( 
	ID_Habilidades       INTEGER NOT NULL    ,
	ID_Pessoa_3          INTEGER NOT NULL    ,
	Nome                 VARCHAR(50)     ,
	Nível                INTEGER     ,
	Descrição            VARCHAR(350)     ,
	CONSTRAINT pk_Habilidades PRIMARY KEY ( ID_Habilidades, ID_Pessoa_3 )
 );

CREATE TABLE Idiomas ( 
	ID                   INTEGER NOT NULL    ,
	ID_Pessoa_5          INTEGER NOT NULL    ,
	Idioma               VARCHAR(50)     ,
	Proeficiência        INTEGER     ,
	CONSTRAINT pk_Idiomas PRIMARY KEY ( ID, ID_Pessoa_5 )
 );

CREATE TABLE Personalidade ( 
	ID                   INTEGER NOT NULL    ,
	ID_Pessoa_4          INTEGER NOT NULL    ,
	Traço_de_personalidade INTEGER NOT NULL    ,
	CONSTRAINT pk_Personalidade PRIMARY KEY ( ID, ID_Pessoa_4 )
 );

CREATE TABLE Pessoa ( 
	ID                   INTEGER NOT NULL  PRIMARY KEY  ,
	Nome                 VARCHAR(50) NOT NULL    ,
	Sobrenome            VARCHAR(50) NOT NULL    ,
	Email                VARCHAR(100) NOT NULL    ,
	Telefone             INTEGER NOT NULL    ,
	Endereço             VARCHAR(100) NOT NULL    
 );
