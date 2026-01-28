/**
 * Extends the global NodeJS namespace to provide strong typing for environment variables.
 * This ensures that the application has access to the necessary configuration 
 * and API keys during runtime.
 */
declare namespace NodeJS {
  /**
   * Defines the structure of the process.env object.
   */
  interface ProcessEnv {
    /** * The port number on which the Express server will listen. 
     * Optional: defaults to a system-assigned port or 3000 if not provided.
     */
    PORT?: string;

    /** * The authentication key for the Google Gemini API. 
     * Required for the LangChain/Google Generative AI integration to function.
     */
    GOOGLE_API_KEY: string;
  }
}