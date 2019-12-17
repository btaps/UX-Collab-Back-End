let sqlite3 = require('sqlite3')

let database = new sqlite3.Database('./database.db')

const createClientTableQuery = `CREATE TABLE IF NOT EXISTS clients (
full_name TEXT,
email TEXT,
topic_of_interest TEXT,
zip INTEGER)`

database.run(createClientTableQuery, err=>{
  if(err) console.log('Could not create Client table', err)
  else console.log('Create client table succeeded!')
})

module.exports = database
