const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt');

const UsersDao= require('./../models/daos/Users.dao');
const User = new UsersDao();

const { formatUserForDB } = require('../utils/users.utils');
const { logger } = require('../log/logger');

const salt = () => bCrypt.genSaltSync(10); 
const encrypt = (password)=> bCrypt.hashSync(password,salt())

const isValidPassword = (user, password)=>bCrypt.compareSync(password,user.password);


//Passport Local Strategy

//logica de registro
passport.use('signup',new LocalStrategy({
	passReqToCallback:true,
	},
	(req, username, password, done)=>{

    const userObject = {
          name: req.body.firstname,
          email: username,
          password: encrypt(password),
          isAdmin: req.body.isAdmin,
          userAvatar: req.body.useravatar,
      }

		const newUser = formatUserForDB(userObject);
		User.createUser(newUser)
		.then((user)=>{
			logger.log('info', 'Successful registration');
			return done(null,user)
		})
		.catch(error=>{
			logger.log('error','Error signing up >>>')
	
			return done(error)
		})
	}
));



//logica de login
passport.use('signin',new LocalStrategy( 
	(username, password, done)=>{
		User.getByEmail(username)
		.then(user=>{ 
			if(!isValidPassword(user,password)){
				logger.log('info', 'Incorrect password');
				return done(null,false)
			}
			return done(null,user)
		})
		.catch(error => done(error))

	}
));


passport.serializeUser((user,done)=>{
	done(null,user._id)
})


passport.deserializeUser((id,done)=>{	
	User.getById(id)
	.then(user=>{
		done(null,user)
	})
})


module.exports= passport;
