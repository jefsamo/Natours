const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION!!!");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

// const DB = process.env.DATABASE_LOCAL;
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const d = new Date().toISOString();
// const now = d.getUTCDate;
// console.log(process.env);
// console.log(app.get("env"));
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    // useNewUrlParser: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log(`DB Connected! ${d}`));
// .catch((err) => {
//   console.log(`DB Connection Error: ${err.message}`);
// });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running at port ${port}...`);
});
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED EXCEPTION!!!");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
