const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dbConfig = require('./db/config');
const apiRoutes = require('./routers/index.routers');
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport')
const cluster = require('cluster')
const os = require('os')
const { logger } = require('./log/logger');
require('dotenv').config()
/////////
const ProdDao = require('./models/daos/Product.dao')
const products = new ProdDao()
/////////

//--------------------Middlewares--------------------
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, '/public')))


//---------Session---------//

app.use(session({
  name: 'coder-session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConfig.mongo_sessions.connectTo('sessions')
  })
}))
app.use(passport.initialize());
app.use(passport.session());


//--------------------Routes--------------------
app.use('/api', apiRoutes);

const auth = require('./middlewares/auth');

app.get('/', (req,res)=>{
	const user =  req.user;
  if (user) {
		if(req.session.cart === undefined){
			req.session.cart = []
		}
		console.log(req.session.cart)
    return res.redirect('/home');
  }
  else {
    return res.render('pages/login');
  }
})
app.get('/register', function (req, res) {
	res.render('pages/register');
})

app.get('/profile',(req,res)=>{
	const user =  req.user;
	const isAdmin =  req.user.isAdmin
	res.render('pages/profile',{user,isAdmin})
})
app.get('/users',(req,res)=>{
	const user =  req.user;
	const isAdmin =  req.user.isAdmin
	res.render('pages/users',{user,isAdmin})
})

app.get('/logout',auth,(req,res)=>{
	req.logOut(function(err) {
		if (err) { 
			return next(err)
		}
		})
	logger.log('info', `User log out`);
	res.redirect('/')
})
app.get('/chat',auth, function (req, res) {
	const user = req.user
	let isAdmin
	req.user.isAdmin === "true" ? isAdmin=true : isAdmin= false;
	res.render('pages/chat',{isAdmin,user});
})
app.get('/signup-error',(req,res)=>{
	res.render('pages/register')
})
app.get('/signin-error',(req,res)=>{
	res.redirect('/')
})

app.get('/home', auth , function (req, res) {
	const user = req.user
	let isAdmin
	req.user.isAdmin === "true" ? isAdmin=true : isAdmin= false;
	
	res.render('pages/home',{user,isAdmin});
})
app.get('/newProduct',auth, (req, res)=>{
	const isAdmin = req.user.isAdmin
	res.render('pages/newProduct',{isAdmin})
})
app.get('/products/:id',auth, async (req, res)=>{
	const {id} = req.params
	const isAdmin = req.user.isAdmin
	try {
		const prod = await products.getById(id)
		res.render('pages/product-detail',{ prod,isAdmin })
	} catch (error) {
		logger.log('error',error.message)
	}
})
app.get('/cart',(req,res)=>{
	const user = req.user
	res.render('pages/cart',{user})
})


//----------------Template engine----------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//--------------------Chat--------------------
//Socket.io 
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const ChatsDao = require('./models/daos/Chat.dao');
const Chat = new ChatsDao()

let chat = [];
io.on('connection', (socket) => {
	emitirChat()
	socket.on('incomingMessage', async (mje) => {
		chat.push(mje)
		let newChatJSON = JSON.stringify(chat)
		try {
			fs.promises.writeFile('./db/chat/chat.txt', newChatJSON)
			await Chat.model.updateOne({
				id: 'mensajes'
			}, {
				$set: {
					mensajes: newChatJSON
				}
			})
		} catch (error) {
			console.log(`No se pudo guardar el chat en chat.txt`, error)
		}
		emitirChat();
	})
});

const emitirChat = () => {
	io.sockets.emit('chat', chat);
}




//---------------Conexion mongoose---------------
(async () => {
	await mongoose
		.connect(dbConfig.mongo.uri)
		.then(() => logger.log('info', `Connecting to ${dbConfig.mongo.name}`))
	try {
		const chatDB = await Chat.getAll()
		if (chatDB[0] === undefined) {
			let mensajes = {
				id: "mensajes",
				mensajes: JSON.stringify(chat)
			};
			await Chat.createChat(mensajes)
		}
	} catch (error) {
		logger.log('error',error.message)
	}
})();


const PORT = parseInt(process.argv[2]) || 8080
const modoCluster = process.argv[3] == 'CLUSTER'


if (modoCluster && cluster.is) {
    const numCPUs = os.cpus().length

    logger.log('info', `Number de proc: ${numCPUs}`)
    logger.log('info', `PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        logger.log('info', 'Worker', worker.process.pid, 'exited', new Date().toLocaleString())
        cluster.fork()
    })
} else {

    logger.log('info', "Worker process initialice");
        const runningServer = server.listen(PORT,()=>{
            logger.log('info', `Server on ${PORT}`);
            
        })
        runningServer.on("error", (error)=>{
					logger.log('error',error.message)
        })
}