const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

//find one user
function find(req,res) {
	User.findOne({
		_id : req.params.id
	})
	 .then(result => {
	 	res.send(result)
	 })
	  .catch(err => {
	  	console.log(err)
	  })
}

function signUp(req,res) {
	let user = new User(req.body)
	user.save((err, newUser) => {
		if(err) console.log(err)
		res.send(newUser)
	})
}

function signIn(req,res) {
	User.findOne({
		username : req.body.username
	})
	.then(user => {
		if(!user) {res.status(500).send(err)}
			else{
				bcrypt.compare(req.body.password, user.password)
				 .then(function(result) {
				 	jwt.sign({
				 		userId : user._id,
				 		username : user.username,
				 		email : user.email
					}, process.env.secret, function(err,token) {
						res.send({user, message: "Successful Login", token : token })
					});
				 })
				 .catch(err => {
				  res.status(500).send(err);	
				 })
			}			
	})
	.catch(err => {
		res.status(500).send(err);
	})
}


module.exports = {
	find,
	signUp,
	signIn

}