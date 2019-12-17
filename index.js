let express = require('express')
let database = require('./database')
let app = express()

let queryString
let queryPassInValues
let reqBody

const PORT = 9000


// MIDDLEWARE
app.use(express.json())

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  if(req.method == 'OPTION') res.end()
  else next()
	//Capital J in vim join
})



// Routes
app.get('/', (req, res)=>{
  res.send('Hello from index.js')
})

app.get('/api/clients', (req, res) =>{
  queryString = `SELECT * FROM clients`
  database.all(queryString, (err, results)=>{
    if(err){
      res.sendStatus(500)
      console.log('Could not get all clients from databse')
    } else {
      res.status(200).json(results)
    }
  })
})

app.get('/api/clients/:id', (req, res)=>{
  queryString = `SELECT * FROM clients WHERE clients.oid = ?`
  queryPassInValues = [req.params.id]

  database.all(queryString, queryPassInValues, (err, results)=>{
    if(err){
      res.sendStatus(500)
      console.log('Could not get single client with id',err)
    } else res.status(200).json(results)
  })
})

app.put('/api/clients/:id',(req, res)=>{
  queryPassInValues = [req.body.full_name, req.body.email, req.body.topic_of_interest, req.body.zip, req.params.id]
  queryString = `UPDATE clients SET full_name = ?, email = ?, topic_of_interest = ?, zip = ? WHERE clients.oid = ?`
 
  database.run(queryString, queryPassInValues, err=>{
    if(err) {
      console.log(err)
      res.sendStatus(500)
    }else res.sendStatus(200)
  })
})

app.post('/api/clients', (req, res)=>{
  queryPassInValues = [req.body.full_name, req.body.email, req.body.topic_of_interest, req.body.zip]
  queryString = `INSERT INTO clients VALUES (?, ?, ?, ?)`
  console.log('hi')
  database.run(queryString, queryPassInValues, err=>{
    if(err){
      console.log(err)
      res.sendStatus(500)
    } else res.sendStatus(200)
  })
})

app.delete('/api/clients/:id', (req, res)=>{
  queryPassInValues = [req.params.id] 
  queryString = `DELETE FROM clients WHERE clients.oid = ?`

  database.run(queryString, queryPassInValues, err=>{
    if(err){
      console.log(err)
      res.sendStatus(500)
    } else res.sendStatus(200)
  })
})


app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}`)
})
