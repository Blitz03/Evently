import mongoose from "mongoose";

//* Implementing a Cached Connection Approach
//* This approach prevents repeated connections to the database on every action using connectToDatabase(), optimizing performance.
//* If a connection exists in the cache, it returns the existing connection.
//* If not, it creates a new connection and stores it in the cache for future use.

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
