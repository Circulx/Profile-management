import mongoose from 'mongoose';

console.log('Mongoose version:', mongoose.version); // Debugging: Check Mongoose version

// Ensure the MONGODB_URI environment variable is set
if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// Define connection options
const options: mongoose.ConnectOptions = {
  bufferCommands: false, // Disable Mongoose buffering
  autoIndex: true, // Enable automatic index creation
};

// Define the Mongoose connection interface
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include the Mongoose connection
declare global {
  var mongoose: MongooseConnection;
}

// Initialize the cached connection
let cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

// Function to connect to MongoDB
async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection');

    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      throw error;
    });
  }

  try {
    // Await the connection promise
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset the promise on error
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  if (cached.conn) {
    await cached.conn.disconnect();
    console.log('MongoDB disconnected through app termination');
    process.exit(0);
  }
});

export default dbConnect;