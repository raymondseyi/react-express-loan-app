const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const signUp = (req, res) => {
    let userDetails = req.body;
    userModel.find({email:userDetails.email}, (err, result)=> {
        if (err) {
            res.sendStatus(500).send({message: "Internal Server Error", status: false});
        } else {
            if (result.length > 0) {
                res.send({message: "Email Exist!!!", status: false});
            } else {
                console.log(result)
               let form = new userModel(userDetails);
                form.save((error)=> {
                   if (error) {
                        res.sendStatus(500).send({message: "Internal Server Error", status: false});
                    } else {
                        res.send({message: "Sign Up Successful", status: true}); 
                    }
                })
            }
            
        }
    })
}

const signIn = (req, res) => {
   
    let { email, password } = req.body

    userModel.findOne({email: email}, (err, user) => {
        if (err) {
            res.sendStatus(500).send({message: "Internal Server Error", status: false});
        } else {
            if (user) {
                user.validatePassword(password, (error, same)=> {
                    if (error) {
                        console.log(error);
                        res.sendStatus(500).send({message: "Internal Server Error", status: false});
                    } else {
                        if (same) {
                            // let userData = {email}
                            // console.log(email)
                            jwt.sign({email},SECRET,{expiresIn:'1h'},(err,token)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    console.log(token)
                                }
                                console.log(token);
                                res.send({message: "Your head correct", status: true}); 
                            })
                            
                        } else {
                            res.send({message: "Invalid Details!!!", status: false}); 
                        }
                    }
                })
            } else {
                res.send({message: "Account does not exist!!!", status: false}); 
            }
        }
    })
}
module.exports = { signUp, signIn }