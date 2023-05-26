const express = require('express');
const app = express();
const PORT = 8000;

app.use("/", (req, res) => {
    return res.json({ success: true, message: "Successfully deployed." })
})

app.listen(PORT, () => {
    console.log("Server started at " + PORT);
})