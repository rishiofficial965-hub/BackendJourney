const app = require("./src/app1");
const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://rishi:VVOuAoNcKDNt3Mcz@cluster0.qi2thxz.mongodb.net/day-2",
    )
    .then(() => console.log("connected to database"));
}
connectToDb();
//starting server on port....
app.listen(3000, () => console.log("server is running......"));
