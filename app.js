const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const db = require("./db/db");

//MIDDLEWARES
const { customers } = require("./middlewares/customers");
const auth = require("./middlewares/auth");
const panelAuth = require("./middlewares/panelAuth");

//FOR HIGH PERFOMANCE MULTI-CORE
/* const cluster = require("cluster");
const numCPUs = require("os").cpus().length; */

//PORT
const PORT = process.env.PORT || 3030;

//WORKLAYER
const { saveClickEvents } = require("./worklayer/collectData/clickWorker");
const { saveSubmitEvents } = require("./worklayer/collectData/submitWorker");
const {
  saveKeyPressEvents,
} = require("./worklayer/collectData/keypressWorker");

//AI WORKLAYER
const { getNlpData } = require("./worklayer/ai/nlpWorker");

//PANEL WORKLAYER
const { login } = require("./worklayer/panel/loginWoker");
const { register } = require("./worklayer/panel/registerWorker");
const {
  visitors,
  getVisitors,
} = require("./worklayer/collectData/visitorWorker");

//ENV FILE
require("dotenv").config({});

//PREVENT CORS
app.use(cors());

//BODY-PARSER
app.use(express.json());

//DB()
db();
/* 
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else { */
//Set Customers to Redis
/* customers(); */

//Auth Mıddleware
app.use(auth);

//Welcome Page
app.get("/", (req, res) => {
  res.send("<h1>SPY SERVER</h1>");
});

//Click Requests
app.post("/logapi/clicks", (req, res) => {
  saveClickEvents(req, res);
});

//Submit Requests
app.post("/logapi/submit", (req, res) => {
  saveSubmitEvents(req, res);
});

//Keylogger Requests
app.post("/logapi/keypress", (req, res) => {
  saveKeyPressEvents(req, res);
});

//Visitors Requests
app.post("/logapi/visitors", visitors);

//--------------- PANEL
app.post("/logapi/login", (req, res) => {
  login(req, res);
});

app.post("/logapi/register", (req, res) => {
  register(req, res);
});

app.get("/logapi/getvisitors", panelAuth, (req, res) => {
  getVisitors(req, res);
});

//------------------ AI
app.get("/logapi/getnlpdata", panelAuth, (req, res) => {
  getNlpData(req, res);
});

server.listen(PORT, () => {
  console.log("listening on *: " + PORT);
});
/* 
  console.log(`Worker ${process.pid} started`);
}
 */
