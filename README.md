# Model Cards App

End-to-end web app for authoring AI model cards, enriching them with structured content, and converting them into ODRL JSON-LD policies. The flow is: create or load a model card in the UI, optionally extract text/tables/images from a PDF via the Flask service, then store and manage cards through the Node/Express API, and finally generate an ODRL policy using OpenAI. The project ships with three parts:

- `app`: React + Vite frontend UI
- `server`: Node/Express API backed by MongoDB and OpenAI for ODRL conversion
- `server-flask`: Flask service for parsing PDF model cards (text, tables, images)

## Prerequisites

- Node.js 18+ (recommended)
- pnpm (recommended) or npm
- Python 3.10+
- A MongoDB instance (local or cloud)

## Setup

### 1) API server (Node/Express)

Create `server/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/model-cards
JWT_SECRET=replace-me
COOKIE_SECRET=replace-me
OPENAI_API_KEY=replace-me
PORT=3000
```

Install and run:

```bash
cd server
pnpm install
pnpm dev
```

The API listens on `http://localhost:3000`.

Optional dev seed:

```bash
pnpm reset-db
```

### 2) PDF parser service (Flask)

Create `server-flask/.env`:

```env
CLOUDINARY_CLOUD_NAME=replace-me
CLOUDINARY_API_KEY=replace-me
CLOUDINARY_API_SECRET=replace-me
```

Install and run:

```bash
cd server-flask
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python index.py
```

The Flask service listens on `http://localhost:8080`.

### 3) Frontend (React + Vite)

Install and run:

```bash
cd app
pnpm install
pnpm dev
```

The UI runs on `http://localhost:5173`.

## Configuration Notes

- The Flask service uploads extracted images to Cloudinary when credentials are present. If you leave the Cloudinary vars unset, image extraction is skipped.

## Project Structure

```
.
├── app/                         # React + Vite frontend
│   └── src/
│       ├── components/          # Reusable UI components
│       ├── constants/
│       │   └── index.ts          # API base URLs
│       ├── pages/                # UI pages and flows
│       └── services/             # API client wrappers
├── server/                      # Node/Express API service
│   ├── app.ts                    # Express app setup and routes
│   ├── index.ts                  # Server bootstrap
│   ├── controllers/              # Request handlers and ODRL logic
│   ├── models/                   # Mongoose schemas
│   ├── routers/                  # REST route definitions
│   └── db/
│       └── reset-db.ts           # Dev-only database seeding
└── server-flask/                 # Flask PDF parsing service
    ├── index.py                  # `/upload_pdf/<model_card_id>` endpoint
    └── requirements.txt          # Python dependencies
```
