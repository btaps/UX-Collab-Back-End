let fs = require('fs')
let sqlite3 = require('sqlite3')
let database = new sqlite3.Database('./database.db')
let sqlBuffer = fs.readFileSync('./seed.sql')
let sqlString = sqlBuffer.toString()

database.exec(sqlString, err=>{
  if(err) console.log('Could not load SQL Query string from seed.sql', err)
  else console.log('Database.exec() was successfull')
})
