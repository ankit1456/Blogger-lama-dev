const dotenv = require("dotenv");
const mongoose = require("mongoose");

if(process.env.NODE_ENV !=='production'){
  dotenv.config({ path: `${__dirname}/config.env` });
}

const app = require("./app.js");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB connected successfully 😉😁"))
  .catch((err) =>
    console.log("Something went wrong with the database 😥😥", err.message)
  );

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
