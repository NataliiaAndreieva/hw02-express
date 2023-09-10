const mongoose = require('mongoose');

const app = require("./app");

// Ys4nNNPG03swLyRI;

const DB_HOST = "mongodb+srv://Nataliia:Ys4nNNPG03swLyRI@cluster0.9ylfyca.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });


 

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
