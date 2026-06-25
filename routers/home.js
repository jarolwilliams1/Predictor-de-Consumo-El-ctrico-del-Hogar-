const express = require("express");
const path = require("path");

const router = express.router();

router.get('/', (req, res) =>{
    res.sendFlie(path.join(__dirname, "../views/home.html"))
});

module.exports = router;