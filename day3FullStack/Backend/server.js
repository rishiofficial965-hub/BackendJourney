require('dotenv').config()

const app = require("./src/app")

const connectToDb = require("./src/confiq/database")

connectToDb()

app.listen(3000,()=>console.log("server is running"))