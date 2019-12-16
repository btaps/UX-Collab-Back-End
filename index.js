let express = require('express')
let app = express()


const PORT = 9000


// MIDDLEWARE
app.use(express.json())




app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}`)
})
