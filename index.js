const express = require('express');
// const cors=require('cors');
const app = express();
const port = 9000;
const conn = require('mysql');
const body = require('body-parser'); 

// untuk query builder
const knex = require('knex')({
  client: 'mysql',
  connection: {
    database: "bloggg",
    host: 'localhost',
    user: 'root',
    password: "",
    port: 3306
  }
})

app.use(body.json()); //ubah data body jadi json
// app.use(cors);

app.get('/', (req, res)=>{
  res.send('baba')
})

app.get('/content', async(req, res)=>{
  let content = await knex('contents').innerJoin('comments',function(){
    this.on('contents.id', '=', 'comments.content_id')
  })
  res.json(content);
})

app.post('/content', async(req, res)=>{
  let request=req.body;
  let content=await knex('contents').insert(request);
  res.json(content);

  // res.send('data berhasil di tambah');
})

app.put('/content/:id', async(req, res)=>{
  let id=req.params.id
  await knex('contents').where('id', id).update(req.body);
  res.json(res.body);

})

app.delete('/comment/:id', async(req, res)=>{
  await knex('contents').where('id', req.params.id).del();

  res.send('data sudah diapus');
})


app.get('/comment', async(req, res)=>{
  let content = await knex('comments');
  res.json(content);
})

app.post('/comment', async(req, res)=>{
  let request=req.body;
  let content=await knex('comments').insert(request);
  res.json(content);

})

app.put('/comment/:id', async(req, res)=>{
  let id=req.params.id
  await knex('comments').where('id', id).update(req.body);
  res.json(res.body);

  // res.send('data berhasil di update');
})

app.delete('/content/:id', async(req, res)=>{
  await knex('comments').where('id', req.params.id).del();

  res.send('data sudah diapus');
})

app.post('/', (req, res)=>{
  console.log(req.body)
  res.send('Halo saya adalah '+req.body.nama)
})

app.listen(port, ()=>{
  console.log('berjalan di port '+port)
})