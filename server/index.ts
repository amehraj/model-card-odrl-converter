import http from "http";
import app from "./app.ts";
import dotenv from "dotenv";
import { connectDatabase } from "./db/connection.ts";

dotenv.config();

const initServer = async () => {
  const server = http.createServer(app);
  const PORT = process.env.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  await connectDatabase();
};

initServer();
