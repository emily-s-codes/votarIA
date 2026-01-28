import dotenv from "dotenv";

/**
 * Initializes the environment variable configuration.
 * Loads variables from a `.env` file into `process.env` at the earliest 
 * possible stage of application execution.
 */
dotenv.config();