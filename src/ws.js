import app from "./app.js";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin:"*"
  }
})

io.on("connection", (socket) => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

const PORT = process.env.PORT;
console.log(PORT);
httpServer.listen(PORT);

export {io}