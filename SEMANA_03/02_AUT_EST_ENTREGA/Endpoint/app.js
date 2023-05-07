//ESCREVA "node app.js" NO TERMINAL PARA INICIAR O SERVIDOR E ACESSAR O SITE http://localhost:3000/tudo

var express = require("express");
var app = express();
var port = process.env.PORT||3000;
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var DBPATH = 'seuDB.db';
var db = new sqlite3.Database(DBPATH);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.send("Salvei aqui!");
});

app.get("/conquistas", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    db.all(`SELECT * FROM Conquistas`, [], (err, rows)=>
    {
        if(err)
        {
            res.send(err);
        }
        res.send(rows);
    })
})

app.get("/pessoa", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    db.all(`SELECT * FROM Pessoa`, [], (err, rows)=>
    {
        if(err)
        {
            res.send(err);
        }
        res.send(rows);
    })
})

app.get("/habilidades", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    db.all(`SELECT * FROM Habilidades`, [], (err, rows)=>
    {
        if(err)
        {
            res.send(err);
        }
        res.send(rows);
    })
})

app.get("/idiomas", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    db.all(`SELECT * FROM Idiomas`, [], (err, rows)=>
    {
        if(err)
        {
            res.send(err);
        }
        res.send(rows);
    })
})

app.get("/personalidade", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    db.all(`SELECT * FROM Personalidade`, [], (err, rows)=>
    {
        if(err)
        {
            res.send(err);
        }
        res.send(rows);
    })
})

app.listen(port, () =>
{
    console.log(`Servidor rodando na porta ${port}`);
})
