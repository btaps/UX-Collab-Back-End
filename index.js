let express = require('express')
let database = require('./database')
let app = express()

let queryString

const PORT = 9000


// MIDDLEWARE
app.use(express.json())

app.get('/', (req, res)=>{
  res.send('Hello from index.js')
})

app.get('/api/clients', (req, res) =>{
  queryString = `SELECT * FROM clients`
  database.all(queryString, (err, results)=>{
    if(err){
      res.sendStatus(500)
      console.log('Could not get all clients from databse')
    } else res.status(200).json(results)
  })
})


app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}`)
})
