exports.popover = function(req, res){
	console.log('My session:', req.session);
	res.render('auth/index.pop', req.viewVars);
};

exports.classicSignup = function(req, res){
	if( !req.body ){
		console.log('Why you signup nobody?');
		return res.redirect('/?nobodySignup');
	}
	
	var user = new app.models.User();
	user.set('nick', req.body.nick);
	user.set('email', req.body.email);
	user.set('password', req.body.pass);
	user.set('providers', ['signup:'+user.get('email')]);
	user.set('profiles', [{_name: 'signup'}]);
	
	user.save(function(err){
		if(err){
			req.viewVars.u = user;
			return classicYieldErr(req, res, 'signup', err);
		} else {
			req.session.user = {
				provider: 'signup',
				id: user.get('id'),
				nick: user.get('nick')
			}
			
			req.flash('notice', 'Welcome!');
			req.viewVars.welcome_login = "Welcome, "+user.nick;
			req.render('auth/win_pop', req.viewVars);
		}
	});
};

exports.classicLogin = function(req, res, next) {
	if(!req.body){
		console.log('why u login nobody?');
		return res.redirect('/?nobodyLogin');
	}
	
	app.models.User.classicLogin(req.body.emal, req.body.pass, function(err, user){
		if(err){
			return classicYieldErr(req, res, 'signIn', err);
		} else {
			if(user){
				req.session.user = {
					provider: 'signup',
					id: user.get('id'),
					nick: user.get('nick')
				}
				
				req.flash('notice', 'Welcome!');
				req.viewVars.welcome_login = 'Welcome, '+user.nick;
				res.render('auth/win_pop', req.viewVars);
			} else {
				return classicYieldErr(req, res, 'signIn', {
					errors: {
						'loginpass': {
							name: 'V',
							path: 'login+password',
							type: 'loginpass'
						}
					}
				});
			}
		}
	});
};

function classicYieldErr(req, res, mode, err){
	req.veiwVars.erroredForm = mode;
	if(mode === 'signIn'){
		req.viewVars.signin_errors = app.helpers.displayErrors(err);
	} else {
		req.viewVars.signup_errors = app.helpers.displayErrors(err);
	}
	req.viewVars.email = req.body.email;
	res.render('auth/index_pop', req.viewVars);
}