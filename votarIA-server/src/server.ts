import '../config';
import app from "./app";

/**
 * The port number on which the Express server will listen.
 * Prioritizes the PORT environment variable, defaulting to 3000 if not specified.
 */
const PORT = process.env.PORT || 3000;

/**
 * Starts the HTTP server and begins listening for incoming connections.
 * Loads environment configurations before initializing the listener.
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});