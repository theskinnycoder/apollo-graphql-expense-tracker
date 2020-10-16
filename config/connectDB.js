import { connect } from 'mongoose';
import { config } from 'dotenv';

config({ path: './config/config.env' });

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		const conn = await connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log(`MongoDB Connected...${conn.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

export default connectDB;
