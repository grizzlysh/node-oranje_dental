require("dotenv").config();
const cors       = require("cors");
const winston    = require("winston");
const express    = require("express");
const bodyParser = require("body-parser");


winston.exceptions.handle(
  new winston.transports.Console({ colorize: true, prettyprint: true}),
  new winston.transports.File({ filename: "UncaughtExceptions.log" })
);

process.on("unhandledRejection", (error) => {
  throw error;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));

const app = express();
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

const db = require("./models");
// db.sequelize.sync()
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Drop and Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


require("./routes/reservations.route")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to hf appserver." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});