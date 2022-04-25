const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phonenumber: String,
    address: String,
    password: String,
    bvn: String,
})

let saltRound = 10;
userSchema.pre('save', function (next) {
    let document = this;
    bcrypt.hash(document.password, saltRound, (err, hashedPassword) => {
        if (err) {
            console.log(err)
        } else {
            document.password = hashedPassword;
            next();
        }
    });
})
userSchema.methods.validatePassword = function(password, callback){
    const document = this;
    bcrypt.compare(password, document.password, (err, same)=> {
        if (!err) {
            callback(err, same);
        } else {
            next();
        }
    })
}


let userModel = mongoose.model('users_tb', userSchema);

module.exports = userModel;