var auth = require('/routes/auth')
	, filters = require('/routes/filters')
	, pages = require('/routes/pages');
	
app.all('*', );

app.get('/', pages.home);
app.get('/home', pages.home);
app.get('/story', pages.story);
app.get('/wedding', pages.wedding);
app.get('/wedding/ceremony', pages.wedding);
app.get('/wedding/video', pages.wedding);
app.get('/wedding/pictures', pages.wedding);
app.get('/wedding/cards', pages.wedding);

app.get('/auth/loginform', );
app.get('/auth/registerform', );
app.get('/auth/logoutform', );
app.get('/auth/account', );

app.post('/auth/login', );
app.post('/auth/register', );
app.post('/auth/logout', );
app.post('/auth/update', );
