# EduPilot Dashboard

React + Vite student dashboard matching the supplied EduPilot visual direction.

## Run
```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Notes
- Dashboard is functional with React Router, responsive sidebar, search, theme toggle, notifications, profile menu, charts, local demo data and clickable actions.
- AI is intentionally abstracted in `src/services/aiService.js`. Connect DeepSeek later through a secure backend/API route; never expose the API key in frontend code.
