import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "voxa-ai",
  name: "voxa-ai",
  // eventKey: process.env.INNGEST_EVENT_KEY,
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
