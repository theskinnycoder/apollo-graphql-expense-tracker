const { ApolloServer, ApolloError } = require('apollo-server-express');
const express = require('express');
const dotenv = require('dotenv');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: './config/config.env' });

(async () => {
	const app = express();

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		formatError: err => {
			return err.originalError instanceof ApolloError
				? err.message
				: new Error('Internal Server Error');
		},
	});

	server.applyMiddleware({ app });

	await connectDB();

	app.listen(
		PORT,
		console.log(
			`Server running in ${NODE_ENV} mode listening for requests at http://localhost:${PORT}${server.graphqlPath}`
		)
	);
})();
