// Use JWT to authorize requests and secure my API
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
	// Get token from the request headers
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		// If no token is provided, return a forbidden response
		return res
			.status(401)
			.json({ message: "Access denied. No token provided" });
	}
	try {
		// Verify token using the secret key from the .env file
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		// Attach the payload to request object
		req.payload = payload;

		// Proceed to the protected route
		next();
	} catch (err) {
		// Handle token verification errors
		if (err.name === "TokenExpiredError") {
			return res.status(401).json({ message: "Session expired. Please start a new session.", code: "TOKEN_EXPIRED" });
		}
		// If token is invalid, return a forbidden response
		return res.status(403).json({ message: "Invalid token", code: "TOKEN_INVALID" });
	}	
};

// Export the middleware to be used in other parts of the application
export default verifyToken;
