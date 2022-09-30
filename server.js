const dotenv = require('dotenv');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const listeners = require('./listeners');

dotenv.config({ path: './config.env' });

const app = require('./app');

// Below snippet is used to connect to DB. This is disablled becouse we will not be needing Database for this project

// Connecting to DATABASE ->>
const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {
		// <- Using Mongoose Connection
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB connection established');
	})
	.catch((err) => {
		console.log('DB CONNECTION FAILED');
		console.log('ERR: ', err);
	});

// Catching uncaught exception ->>
process.on('unCaughtException', (err) => {
	console.log(`UNCAUGHT EXCEPTION -> ${err.name} - ${err.message}`);
	console.log('App SHUTTING DOWN...');
	process.exit(1); // <- Then will shut down the server.
});

// Starting Server ->>
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
	console.log(`App running at port`, (`${port}`), '...');
});
server.timeout = 0;
const io = socketio(server, {
    // cors: {
    //     origin: 'http://localhost:3000',
    // },
});
// io.use((socket, next) => {
// 	const token = socket.handshake.auth.token;
// 	// console.log(token, process.env.API_KEY);
// 	if (token !== process.env.API_KEY) {
// 		console.log("Lock Not Authorized");
// 		next(new Error("Lock Not Authorized"));
// 	}
// 	else {
// 		next();
// 	}
// });

listeners(io);

// Catching unHandleled Rejections ->
process.on('unhandledRejection', (err) => {
	console.log(`UNHANDELLED REJECTION -> ${err.name} - ${err.message}`);
	console.log(err);
	console.log('App SHUTTING DOWN...');
	server.close(() => {	// <- This will first terminate all requests
		
		process.exit(1); // <- Then will shut down the server.
	});
});

 process.on('uncaughtException', function (err) {
     console.error(err);
     console.log('Node NOT Exiting...');
 });

