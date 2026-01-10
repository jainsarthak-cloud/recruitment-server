import { ChatGroq } from '@langchain/groq';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Try loading .env from project root, then src/.env as a fallback
const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'src', '.env'),
];

for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error(
    'GROQ_API_KEY environment variable is not set. Create a .env file in the project root (or src/.env) with: GROQ_API_KEY=your_key, or set it in your system environment.'
  );
}

export const llm = new ChatGroq({
  temperature: 0,
  model: 'llama-3.1-8b-instant',
  apiKey: GROQ_API_KEY,
});
