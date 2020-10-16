import { ApolloServer, ApolloError } from 'apollo-server-express';
import express, { static as serveStatic } from 'express';
import { config } from 'dotenv';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import connectDB from './config/connectDB';
import path from 'path';

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
config({ path: './config/config.env' });

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

	if (process.env.NODE_ENV === 'production') {
		app.use(serveStatic('client/build'));
		app.get('*', (_, res) =>
			res.sendFile('index.html', {
				root: path.join(__dirname, 'client', 'build'),
			})
		);
	}

	app.listen(
		PORT,
		console.log(
			`Server running in ${NODE_ENV} mode listening for requests at http://localhost:${PORT}${server.graphqlPath}`
		)
	);
})();
