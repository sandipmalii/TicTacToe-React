import dotenv from "dotenv";
dotenv.config();
import ws, { WebSocketServer } from "ws";

import express from "express";
import cors from "cors";
import connectDB from "./config/connectDb.js";
import userRoutes from "./routes/userRoute.js";
import friendRoutes from "./routes/friendRoute.js";
import ProfileRoute from "./routes/ProfileRoute.js";
import { GameManager } from "./websocketclasses/GameManager.js";

const app = express();
const port = process.env.PORT || 8000; // Use a default port if PORT is not set

// CORS Policy
app.use(cors());

// JSON
app.use(express.json());

// Connect to the database
connectDB(process.env.DATABASE_URL)
	.then(() => {
		// Load Routes
		app.use("/api/user", userRoutes);
		app.use("/api/friends", friendRoutes);
		app.use("/api/profile", ProfileRoute);

		// Start the server
		app.listen(port, () => {
			console.log(`Server listening at http://localhost:${port}`);
		});

		//Initialising the web socket server
		const webSocketServer = new WebSocketServer({ port: 8080 });

		//Create a Game Manager Instance
		const gameManager = new GameManager();

		webSocketServer.on("connection", function connection(socket) {
			socket.on("error", () => console.log("Socket Error"));
			gameManager.createUser(socket);

			socket.on("disconnect", function disconnect() {
				gameManager.removeUser(socket);
			});

			socket.send("Hello From the server");
		});
	})
	.catch((error) => {
		console.error("Database connection error:", error);
	});

/*<=============COnfiguration of URL Data like %,=, search, etc.==================>*/

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

