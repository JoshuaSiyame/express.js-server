// import required module/package
const mongoose = require("mongoose");

// user schema instance
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        default: 0
    }
});

// user schema model instance
const User = mongoose.model("user", userSchema);

// export model instance
module.exports = User;