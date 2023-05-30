//PRESSIONE COM O BOTÃO DIREITO NA PASTA "BACKEND" E SELECIONE "ABRIR NO TERMINAL INTEGRADO". ENTÃO, DIGITE "node app_41.js" E ACESSE O LINK FORNECIDO.
//NESTE PROJETO ESTÃO PRESENTES, CONFORME SOLICITADO NAS ATIVIDADES PONDERADAS DO GITHUB:
//1. TODOS OS ENDPOINTS PARA CADA TABELA DO BANCO DE DADOS
//2. 5 ENDPOINTS PARA A TABELA "PESSOA" COM FRONT-END (HTML)

//CONSTANTES QUE ARMAZENAM VALORES IMPORTANTES PARA O SCRIPT
const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false }) 

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/dbUser.db';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.static("../frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

// RETORNA TODOS OS REGISTROS NA TABELA SELECIONADA
app.get('/usuarios', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); 
	var sql = 'SELECT * FROM pessoa ORDER BY nome_completo COLLATE NOCASE'; //seleciona os registros e ordena alfabeticamente
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close();
});

// INSERE UM NOVO REGISTRO NA TABELA
app.post('/insereUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); 
	var nome_completo = req.body.nome_completo;
	var email = req.body.email;
	var telefone = req.body.telefone;
	var endereco = req.body.endereco;
	sql = `INSERT INTO pessoa (nome_completo, email, telefone, endereco) VALUES ("${nome_completo}", "${email}", "${telefone}", "${endereco}")`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>CADASTRO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close();
	res.end();
});

// SELECIONA AS INFORMAÇÕES QUE DESEJA ALTERAR E MONTA UM FORMULÁRIO PARA UPDATE
app.get('/atualizaUsuario', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `SELECT * FROM pessoa WHERE pessoa.id=${id}`; //recolhe as informações de um cadastro específico, à partir da chave primária
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// ATUALIZA DE FATO AS INFORMAÇÕES DO CADASTRO SELECIONADO
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var nome_completo = req.body.nome_completo
	var email = req.body.email
	var telefone = req.body.telefone
	var endereco = req.body.endereco
	var id = req.body.id
	sql = `UPDATE pessoa SET nome_completo= "${nome_completo}", email= "${email}", telefone= "${telefone}", endereco= "${endereco}" WHERE pessoa.id=${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>CADASTRO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close();
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id
	sql = `DELETE FROM pessoa WHERE pessoa.id= ${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>CADASTRO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close();
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

//ATIVIDADE PONDERADA DA SEMANA 4 - CRIAÇÃO DOS ENDPOINTS DE CONSULTA (SELECT)

//------------------------------------CRUD DA TABELA FORMACAO---------------------------------------
//--------------------------------------------------------------------------------------------------

//CREATE
app.use(express.json());
    app.get('/insereFormacao', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
		//VARIÁVEIS PARA CADA PARÂMETRO DA TABELA
		var instituicao = req.body.instituicao;
		var curso = req.body.curso;
		var realizacoes = req.body.realizacoes;
		var inicio = req.body.inicio;
		var fim = req.body.fim;
		//CHAMANDO A FUNÇÃO EM SQL
        var sql = `INSERT INTO formacao (instituicao, curso, realizacoes, inicio, fim) VALUES ("${instituicao}", "${curso}", "${realizacoes}", "${inicio}", "${fim}")`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

//READ
app.use(express.json());
    app.get('/formacao', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql = `SELECT * FROM formacao`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

//UPDATE

// SELECIONA AS INFORMAÇÕES QUE SERÃO ALTERADAS
app.get('/atualizaFormacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `SELECT * FROM formacao WHERE id=${id}`; //recolhe as informações de um cadastro específico, à partir da chave primária
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// ATUALIZA DE FATO AS INFORMAÇÕES DO CADASTRO SELECIONADO
app.post('/atualizaFormacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var instituicao = req.body.instituicao;
	var curso = req.body.curso;
	var realizacoes = req.body.realizacoes;
	var inicio = req.body.inicio;
	var fim = req.body.fim;
	var id = req.body.id
	sql = `UPDATE formacao SET instituicao= "${instituicao}", curso= "${curso}", realizacoes= "${realizacoes}", inicio= "${inicio}", fim= "${fim}" WHERE id=${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>CADASTRO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close();
});

//DELETE

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeFormacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id
	sql = `DELETE FROM formacao WHERE id= ${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>CADASTRO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close();
});

//------------------------------------CRUD DA TABELA EXPERIENCIA------------------------------------
//--------------------------------------------------------------------------------------------------

//CREATE
app.use(express.json());
    app.get('/insereExperiencia', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
		//VARIÁVEIS PARA CADA PARÂMETRO DA TABELA
		var empresa = req.body.empresa;
		var realizacoes = req.body.realizacoes;
		var cargo = req.body.cargo;
		var inicio = req.body.inicio;
		var fim = req.body.fim;
		//CHAMANDO A FUNÇÃO EM SQL
        var sql = `INSERT INTO experiencia (empresa, realizacoes, cargo, inicio, fim) VALUES ("${empresa}", "${realizacoes}", "${cargo}", "${inicio}", "${fim}")`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

//READ
app.use(express.json());
    app.get('/experiencia', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql = `SELECT * FROM experiencia`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

//UPDATE

// SELECIONA AS INFORMAÇÕES QUE SERÃO ALTERADAS
app.get('/atualizaExperiencia', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `SELECT * FROM experiencia WHERE id=${id}`; //recolhe as informações de um cadastro específico, à partir da chave primária
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// ATUALIZA DE FATO AS INFORMAÇÕES DO CADASTRO SELECIONADO
app.post('/atualizaExperiencia', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var empresa = req.body.empresa;
	var realizacoes = req.body.realizacoes;
	var cargo = req.body.cargo;
	var inicio = req.body.inicio;
	var fim = req.body.fim;
	var id = req.body.id;
	sql = `UPDATE experiencia SET empresa= "${empresa}", realizacoes= "${realizacoes}", cargo= "${cargo}", inicio= "${inicio}", fim= "${fim}" WHERE experiencia.id=${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>CADASTRO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close();
});

//DELETE

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeExperiencia', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `DELETE FROM experiencia WHERE experiencia.id= ${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>CADASTRO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close();
});

//------------------------------------CRUD DA TABELA HABILIDADES------------------------------------
//--------------------------------------------------------------------------------------------------

//CREATE
app.get('/insereHabilidades', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH);
	//VARIÁVEIS PARA CADA PARÂMETRO DA TABELA
	var nome = req.body.nome;
	var nivel = req.body.nivel;
	var descricao = req.body.descricao;
	//CHAMANDO A FUNÇÃO EM SQL
	var sql = `INSERT INTO habilidades (nome, nivel, descricao) VALUES ("${nome}", "${nivel}", "${descricao}")`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
})

//READ
app.use(express.json());
    app.get('/habilidades', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql = `SELECT * FROM habilidades`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

//UPDATE

// SELECIONA AS INFORMAÇÕES QUE SERÃO ALTERADAS
app.get('/atualizaHabilidades', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `SELECT * FROM habilidades WHERE habilidades.id=${id}`; //recolhe as informações de um cadastro específico, à partir da chave primária
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// ATUALIZA DE FATO AS INFORMAÇÕES DO CADASTRO SELECIONADO
app.post('/atualizaHabilidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var nome = req.body.nome;
	var nivel = req.body.nivel;
	var descricao = req.body.descricao;
	var id = req.body.id;
	sql = `UPDATE habilidades SET nome= "${nome}", nivel= "${nivel}", descricao= "${descricao}" WHERE habilidades.id=${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>CADASTRO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close();
});

//DELETE

//EXCLUI UM REGISTRO DO BANCO DE DADOS
app.get('/removeHabilidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `DELETE FROM habilidades WHERE habilidades.id= ${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>CADASTRO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close();
});

//------------------------------------CRUD DA TABELA IDIOMAS------------------------------------
//----------------------------------------------------------------------------------------------

//CREATE
app.get('/insereIdiomas', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH);
	//VARIÁVEIS PARA CADA PARÂMETRO DA TABELA
	var idioma = req.body.idioma;
	var nivel = req.body.nivel;
	//CHAMANDO A FUNÇÃO EM SQL
	var sql = `INSERT INTO idiomas (idioma, nivel) VALUES ("${idioma}", "${nivel}")`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
})

//READ
app.use(express.json());
    app.get('/idiomas', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql = `SELECT * FROM idiomas`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

//UPDATE

// SELECIONA AS INFORMAÇÕES QUE SERÃO ALTERADAS
app.get('/atualizaIdiomas', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `SELECT * FROM idiomas WHERE idiomas.id=${id}`; //recolhe as informações de um cadastro específico, à partir da chave primária
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// ATUALIZA DE FATO AS INFORMAÇÕES DO CADASTRO SELECIONADO
app.post('/atualizaIdiomas', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var idioma = req.body.idioma;
	var nivel = req.body.nivel;
	var id = req.body.id;
	sql = `UPDATE idiomas SET idioma= "${idioma}", nivel= "${nivel}" WHERE idiomas.id=${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>CADASTRO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close();
});

//DELETE

//EXCLUI UM REGISTRO DO BANCO DE DADOS
app.get('/removeIdiomas', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `DELETE FROM idiomas WHERE idiomas.id= ${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>CADASTRO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close();
});

//------------------------------------CRUD DA TABELA PERSONALIDADE------------------------------------
//----------------------------------------------------------------------------------------------------

//CREATE
app.get('/inserePersonalidade', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH);
	//VARIÁVEIS PARA CADA PARÂMETRO DA TABELA
	var categoria = req.body.categoria;
	//CHAMANDO A FUNÇÃO EM SQL
	var sql = `INSERT INTO personalidade (categoria) VALUES ("${categoria}")`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
})

//READ
app.use(express.json());
    app.get('/personalidade', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql = `SELECT * FROM personalidade`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

//UPDATE

// SELECIONA AS INFORMAÇÕES QUE SERÃO ALTERADAS
app.get('/atualizaPersonalidade', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `SELECT * FROM personalidade WHERE personalidade.id=${id}`; //recolhe as informações de um cadastro específico, à partir da chave primária
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// ATUALIZA DE FATO AS INFORMAÇÕES DO CADASTRO SELECIONADO
app.post('/atualizaPersonalidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var categoria = req.body.categoria;
	var id = req.body.id;
	sql = `UPDATE personalidade SET categoria= "${categoria}" WHERE personalidade.id=${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>CADASTRO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close();
});

//DELETE

//EXCLUI UM REGISTRO DO BANCO DE DADOS
app.get('/removePersonalidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `DELETE FROM personalidade WHERE personalidade.id= ${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>CADASTRO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close();
});

//------------------------------------CRUD DA TABELA CONQUISTAS---------------------------------------
//----------------------------------------------------------------------------------------------------

//CREATE
app.use(express.json());
    app.get('/insereConquistas', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
		//VARIÁVEIS PARA CADA PARÂMETRO DA TABELA
		var titulo = req.body.titulo;
		var instituicao = req.body.instituicao;
		var descricao = req.body.descricao;
		var data = req.body.data;
		//CHAMANDO A FUNÇÃO EM SQL
        var sql = `INSERT INTO conquistas (titulo, instituicao, descricao, data) VALUES ("${titulo}", "${instituicao}", "${descricao}", "${data}")`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

//READ
app.use(express.json());
    app.get('/conquistas', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql = `SELECT * FROM conquistas`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

//UPDATE

// SELECIONA AS INFORMAÇÕES QUE SERÃO ALTERADAS
app.get('/atualizaConquistas', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id;
	sql = `SELECT * FROM conquistas WHERE conquistas.id=${id}`; //recolhe as informações de um cadastro específico, à partir da chave primária
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// ATUALIZA DE FATO AS INFORMAÇÕES DO CADASTRO SELECIONADO
app.post('/atualizaConquistas', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var titulo = req.body.titulo;
	var instituicao = req.body.instituicao;
	var descricao = req.body.descricao;
	var data = req.body.data;
	var id = req.body.id
	sql = `UPDATE conquistas SET titulo= "${titulo}", instituicao= "${instituicao}", descricao= "${descricao}", data= "${data}" WHERE conquistas.id=${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>CADASTRO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close();
});

//DELETE

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeConquistas', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var id = req.query.id
	sql = `DELETE FROM conquistas WHERE conquistas.id= ${id}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>CADASTRO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close();
});
