import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URI;

if (!MONGO_URL) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

// Augment the global type to include cached mongoose connection
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Use global object safely
const globalWithCache = global as typeof globalThis & {
  mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalWithCache.mongooseCache) {
  globalWithCache.mongooseCache = { conn: null, promise: null };
}

const cached = globalWithCache.mongooseCache;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      dbName: "eventDB",
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
  } catch (err) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }

  return cached.conn;
};
