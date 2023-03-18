const express = require('express');
const {auth} = require('express-openid-connect');
const ws = require('ws');
const http = require('http');
const app = express();
const ejs = require('ejs')
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static('public'));
const server = http.createServer(app);
const wss = new ws.Server({ server });

// auth router attaches /login, /logout, and /callback routes to the baseURL
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://139.59.93.186:5000',
    clientID: 'iMSMvoulDBaSBQlQ3TgGFN0RUzHeytY2',
    issuerBaseURL: 'https://dev-vrdpq0akts13bxty.us.auth0.com'
  };
app.use(auth(config));
const { requiresAuth } = require('express-openid-connect');


wss.on('connection', function(user){

    user.onmessage = function(msg)
    {  
       
        wss.clients.forEach((ele) => {
            if(ele!=user)
                       
            ele.send(msg.data)
        });
    }
    // user.on('close', (user)=>{
    //    console.log(server.clients.size)
    // })
    
    })

// req.isAuthenticated is provided from the auth router
function authenticate(req, res, next){
if (req.oidc.isAuthenticated()){
    next();
} else {
    res.redirect('/login');
}
}

// app.get('/', authenticate, requiresAuth(), (req, res) => {
//     let userData = req.oidc.user;
//     //console.log(userData)
//     res.render('index', {userData})
// });
app.get('/', authenticate,(req, res) => {
    res.render('index')
});
app.get('/userinfo', requiresAuth(), (req, res) => {
    let userData = req.oidc.user;
    res.json({userData});
  });

app.get('/profile', requiresAuth(), (req, res) => {
    let userData = req.oidc.user;
    console.log(userData)
    res.render('profile', {userData});
  });

app.get('./chat', (req, res) => {
    res.render('chat');
});
app.get('./home', (req, res) => {
    res.render('home');
});





server.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on port ${server.address().port} :)`);
    });