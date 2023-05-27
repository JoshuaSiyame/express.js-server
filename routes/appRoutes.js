// import required modules/packages
const express = require("express");
const User = require("../models/userModel");

// router instance
const router = express.Router();

// app endpoints
router.get("/test", (req, res)=>{
    res.send("test route handler working");
});

router.get("/users", async (req, res)=>{
    // retrieve users from the database
    const users = await User.find({});
    if(!users){
        return res.status(500).send("Failed to get users, Something broke... 500!");
    };
    if(users.length == 0){
        return res.status(200).send("No users yet");
    };

    res.status(200).json({ users });
});

router.get("/user/:userId", async (req, res)=>{
    // get requested userId from params
    const userId = req.params.userId;

    // get the user based on requested id
    const user = await User.findById(userId);

    if(!user){
        return res.status(500).send("Failed to get user, Something broke... 500!");
    };

    res.status(200).json({ user });
});

router.post("/new-user", async (req, res)=>{
    // perform object destructuring to obtain content of the body
    const { username, email, age } = req.body;

    // data validation
    if(!username || username.length ==0 || username == ""){
        return res.status(400).send("Username is required");
    };
    if(!email || email.length ==0 || email == ""){
        return res.status(400).send("Email is required");
    };
    if(!age || age.length ==0 || age == ""){
        return res.status(400).send("Age is required");
    };

    // create an instance to check for user existence
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(403).send("User with same email exists");
    };

    // new user
    const newUser = new User({
        username,
        email,
        age
    });

    // check user data before submitting to database
    // console.log(newUser);

    // save the newUser to the database
    const savedUser = await newUser.save();

    // return response to client
    res.status(201).send("New user created");
});

router.put("/user/:userId", async (req, res)=>{
    // get requested id
    const userId = req.params.userId;

    // perform object destructuring to obtain content of the body
    const { username, email, age } = req.body;

    // check user existence
    const existingUser = await User.findById(userId);
    if(!existingUser){
        return res.status(403).send("User to be updated does not exists");
    };

    // create userUpdate object
    const userUpdate = {
        username,
        email,
        age
    };

    try {
        // update the user based on id requested
        const updatedUser = await User.findByIdAndUpdate(userId, userUpdate);

        res.status(201).send("User updated");
    } catch (err) {
        console.log(err);
        return res.status(400).send("Failed to update user");
    };
});

router.delete("/user/:userId", async (req, res)=>{
    // get requested userId
    const userId = req.params.userId;

    // check for existence
    const existingUser = await User.findById(userId);
    if(existingUser){
        // delete the user
        await User.findByIdAndRemove(userId);
        res.status(200).send("User deleted");
    }else{
        return res.status(400).send("Failed to delete user");
    }
})

// export router instance
module.exports = router;