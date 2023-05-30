const express = require('express');
const cors = require('cors');
const Router = express.Router();
const DbConnection = require("./DBConnection/connection");
const UserRoutes = require("./routes/userRoutes")
const SkillRoutes = require("./routes/SkillRoute");
var timeout = require('connect-timeout')

const app = express();
// app.use(express.timeout(300000));
app.use(timeout('30s'));
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors({
    origin: '*'
}));

Router.get("/", (req, res) => {
    return res.json({ success: true, message: "Successfully deployed." })
})

app.use("/", Router);
app.use("/api/user", UserRoutes);
app.use("/api/skill", SkillRoutes);

app.listen(PORT, () => {
    console.log("Server started at " + PORT);
    DbConnection();
})