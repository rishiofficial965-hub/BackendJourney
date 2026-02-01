require("dotenv").config()
const app = require("./src/app1");
const connectToDb = require("./src/confiq/database");

connectToDb();

//starting server on port....
app.listen(3000, () => console.log("server is running......"));
