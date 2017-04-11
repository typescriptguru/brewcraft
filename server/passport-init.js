// Database Model
var accountSchema = require('./model/model').accountSchema;
var mongoose = require('mongoose');
var Account = mongoose.model('Account', accountSchema);
// Utils
var bCrypt = require('bcrypt-nodejs');
var Util = require('./lib/util.js');
var config = require('./global/config.js');
// Passport Strategy
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport) {

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function (account, done) {
		console.log('serializing user:', account.username);
		done(null, account);
	});

	passport.deserializeUser(function (id, done) {
		Account.findById(id, function (err, account) {
			console.log('deserializing user:', account.username);
			done(err, account);
		});
	});

	passport.use('login', new LocalStrategy({
		passReqToCallback: true
	},
		function (req, username, password, done) {
			// check in mongo if a user with username exists or not
			Account.findOne({ 'username': username },
				function (err, user) {
					if (err)
						return done(err);
					if (!user) {
						console.log('User Not Found with username ' + username);
						return done(null, false);
					}
					if (!isValidPassword(user, password)) {
						console.log('Invalid Password');
						return done(null, false); // redirect back to login page
					}
					return done(null, user);
				}
			);
		}
	));

	passport.use('signup', new LocalStrategy({
		passReqToCallback: true // allows us to pass back the entire request to the callback
	},
		function (req, username, password, done) {
			Account.findOne({ 'username': username }, function (err, account) {
				if (err) {
					console.log('Error in SignUp: ' + err);
					return done(err);
				}
				if (account) {
					return done(null, false, { message: `User already exists with username ${username}` });
				} else {
					Config.insertMany([{
						region: null,
						language: null,
						newsletter: null,
						units: null,
						subscription: null
					}]).then((doc) => {
						console.log(doc[0]._id);
						Account.insertMany([{
							username: req.body.username,
							password: createHash(req.body.password),
							firstname: req.body.firstname ? req.body.firstname : null,
							secondname: req.body.secondname ? req.body.secondname : null,
							address1: null,
							address2: null,
							city: null,
							country: null,
							sec_question: req.body.sec_question ? req.body.sec_question : null,
							sec_answer: req.body.sec_answer ? req.body.sec_answer : null,
							type: 'doctor',
							config: doc[0]._id,
							photo: Util.SERVER_URL + 'assets/gravatar/default.jpg'
						}]).then((doc) => {
							console.log(`Account: ${doc[0].username} successfully added...`);
							return done(null, doc[0]);
						});
					});
				}
			});
		})
	);

	passport.use('facebook', new FacebookStrategy({
		clientID: config.FACEBOOK_APP_ID,
		clientSecret: config.FACEBOOK_APP_SECRET,
		callbackURL: config.server_url + "auth/facebook/callback"
	},
		function (accessToken, refreshToken, profile, cb) {
			Account.findOrCreate({ username: profile.id }, function (err, user) {
				console.log(err, user);
				return cb(err, user);
			});
		}
	));

	passport.use('google', new GoogleStrategy({
		clientID: config.GOOGLE_APP_ID,
		clientSecret: config.GOOGLE_APP_SECRET,
		callbackURL: config.server_url + "auth/google/callback"
	},
		function (accessToken, refreshToken, profile, cb) {
			console.log('google auth', profile);
			Account.findOrCreate({ googleId: profile.id }, function (err, user) {
				return cb(err, user);
			});
		}
	));

	var isValidPassword = function (account, password) {
		return bCrypt.compareSync(password, account.password);
	};
	// Generates hash using bCrypt
	var createHash = function (password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
};