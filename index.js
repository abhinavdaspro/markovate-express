const express = require('express');
const cors = require('cors');
const Router = express.Router();
const DbConnection = require("./DBConnection/connection");
const UserRoutes = require("./routes/userRoutes")
const SkillRoutes = require("./routes/SkillRoute");
var timeout = require('connect-timeout')

const app = express();
// app.use(timeout('30s'));

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// app.options('*', cors())
// app.use(cors({
//     origin: ['https://markovate-react-app.vercel.app', "http://localhost:3000"]
// }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


Router.get("/", (req, res) => {
    return res.json({ success: true, message: "Successfully deployed." })
})

app.use("/", Router);
app.use("/api/user", cors(), UserRoutes);
app.use("/api/skill", SkillRoutes);

app.listen(PORT, () => {
    console.log("Server started at " + PORT);
    DbConnection();
})