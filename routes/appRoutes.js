// import required modules/packages
const express = require("express");

// router instance
const router = express.Router();

// app endpoints
router.get("/test", (req, res)=>{
    res.send("test route handler working");
});

router.get("/", (req, res)=>{
    res.send("Welcome home developer");
});

// export router instance
module.exports = router;