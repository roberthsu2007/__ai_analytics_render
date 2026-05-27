<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# AI Analytics Render

A React + Vite application for processing and summarizing meeting transcripts using Google Gemini AI.

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key:
   ```bash
   echo "GEMINI_API_KEY=your_api_key_here" > .env.local
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

## Deploy to Render

1. Push your repository to GitHub
2. Connect your repository to Render at https://render.com
3. Create a new Web Service with these settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `NODE_ENV`: `production`
     - `GEMINI_API_KEY`: Your Gemini API key

## Build for Production

```bash
npm run build
```

This generates:
- Frontend bundle in `dist/` (via Vite)
- Backend server in `dist/server.cjs` (via esbuild)

## Start Production Server

```bash
npm start
```
