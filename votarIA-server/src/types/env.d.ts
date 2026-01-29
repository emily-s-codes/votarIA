/**
 * Global NodeJS environment variable overrides.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    /** * Port for the Express server. 
     * @default 3000
     */
    PORT?: string;

    /** * Google Gemini API key. 
     * @required 
     */
    GOOGLE_API_KEY: string;
  }
}