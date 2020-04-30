import {Router} from 'express'
import con from '../db/conexao';


const route_ = new Router();


route_.get("/", (req, res) => {
  
    return res.json({ qualquerCoisa: true });
})

//get, post, delete, insert
route_.get('/usuarios', (req,res) => {
  const users = []
  con.query("SELECT * FROM usuarios", function (err, result, fields){
    if (err) throw err;
     
    return res.json(result);
  });
})

route_.put('/editar/:id', (req,res) => {

  const id = req.params.id;
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const nivel = req.body.nivel;

  con.query(`UPDATE from usuarios where id = ${id} ADRESS (nome, usuario, senha_original, nivel) WHERE (?,?,?,?)`, function (err, result, fields) {
    if (err) throw err;
    
    return res.status(200).send();
  });
})

route_.delete('/delete/:id', (req,res) => {

  const id = req.params.id;

  con.query(`DELETE from usuarios where id = ${id}`, function (err, result, fields) {
    if (err) throw err;
    
    return res.status(200).send();
  });
  
})

export default route_;