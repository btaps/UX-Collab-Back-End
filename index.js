let express = require('express')
let app = express()


const PORT = 9000


// MIDDLEWARE
app.use(express.json())

app.get('/', (req, res)=>{
  res.send('Hello from index.js')
})


app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}`)
})
