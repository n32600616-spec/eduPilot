import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "EduPilot AI Server is running 🚀"
  });
});

app.post("/api/mentor", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "Gemini API key is not configured yet."
      });
    }

    const response = await fetch(
     "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: "You are EduPilot AI Mentor, a friendly and intelligent tutor. Explain concepts simply, help students learn step by step, identify mistakes, and encourage practice. Keep answers useful and student-friendly."
              }
            ]
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      return res.status(response.status).json({
        success: false,
        error: data?.error?.message || "Gemini API request failed"
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("Mentor error:", error);

    res.status(500).json({
      success: false,
      error: "AI Mentor server error"
    });
  }
});
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`EduPilot AI Server running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});

process.on("SIGINT", () => {
  console.log("Server stopping...");
  server.close(() => {
    process.exit(0);
  });
});



