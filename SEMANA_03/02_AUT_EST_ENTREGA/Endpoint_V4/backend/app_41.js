//PRESSIONE COM O BOTÃO DIREITO NA PASTA "BACKEND" E SELECIONE "ABRIR NO TERMINAL INTEGRADO". ENTÃO, DIGITE "node app_41.js" E ACESSE O LINK FORNECIDO.

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
	sql = `SELECT * FROM pessoa WHERE id=${id}`; //recolhe as informações de um cadastro específico, à partir da chave primária
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

// ATUALIZA DE FATOS AS INFORMAÇÕES DO CADASTRO SELECIONADO
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var nome_completo = req.body.nome_completo
	var email = req.body.email
	var telefone = req.body.telefone
	var endereco = req.body.endereco
	var id = req.body.id
	sql = `UPDATE pessoa SET nome_completo= "${nome_completo}", email= "${email}", telefone= "${telefone}", endereco= "${endereco}" WHERE id=${id}`;
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
	sql = `DELETE FROM pessoa WHERE id= ${id}`;
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