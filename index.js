//iniciamento das variaveis (pacotes instalados)
var express = require ('express');
var app = express();
var path = require('path');
var request = require ('request');
var bodyParser = require ('body-parser');

express()
  .use('/public', express.static(path.join(__dirname, 'static')))
  .set('static', path.join(__dirname, 'static'))
  .get('/', (req, res) => res.render('/static/index.html'))
  //.listen(PORT, () => console.log(`Listening on ${ PORT }`))

//iniciamento do bodyparse (comandos do express para usar o path)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
//static -> pasta com html, javascript, imagens
//public -> pasta usada para o client
app.use('/public', express.static(path.join(__dirname, 'static')));

//homepage index.html
app.get('/', function(req,res){
   res.sendFile(path.join(__dirname + '/static/index.html'));  
});

var uri = 'https://api.fortnitetracker.com/v1/profile/';
//https://api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}
//platform = pc, xbl, psn
//TRN-Api-Key: a768e120-a23b-4880-a2a3-fdbdda42c52a

//post para jQuery postar a informação sobre o usuário (API)
app.post('/', function(req,res){
    console.log(req.body);
    request.get(uri + req.body.opcaoPlat + '/' + req.body.campoNickname,{
        headers : {
            'TRN-Api-Key': 'a768e120-a23b-4880-a2a3-fdbdda42c52a'           
        }}, function (error,response,body){
            console.log(body); 
            res.json(body);
            //manda os dados de volta para o body para o user ver         
    });
}); 

var port = process.env.PORT || 5000; //port de um servidor externo
app.listen(port);
//app.listen(PORT, () => console.log(`Listening on ${ PORT }`))