import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itunesRoutes from "./routes/itunesRoutes.js"; // Import the iTunes routes
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token verification
import verifyToken from "./middleware/authMiddleware.js"; // Import the token verification middleware

dotenv.config(); // Load environment variables from .env

// Prevent server from starting without JWT_SECRET key
if (!process.env.JWT_SECRET) {
	throw new Error("JWT_SECRET must be defined in .env");
}
const app = express(); //Create Express app instance

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174","https://macaw-client.onrender.com"] })); // Allow request from React frontend
app.use(express.json()); // Parse incoming JSON requests

app.get("/", (req, res) => {
	res.send("iTunes API server is running");
});

// Issue a JWT token to the React client for authentication
// This token will be used to access the iTunes API routes
app.post("/api/token", (req, res) => {
	const token = jwt.sign({ client: "itunes-app" }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
	res.json({ token });
});

// iTunes route protected: - valid JWT token required on every request to access the iTunes API
app.use("/api/itunes", verifyToken, itunesRoutes);

// Catches any unhandled errors and sends a 500 response
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});
// Start server on port from .env or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
