# Nightwalker Coding Austria — Lip Reading app at Hackathon 2023

Audio-Visual Hidden Unit BERT model for lips reading task for the Austrian Red Cross challenge
Integrated the model into the web app, passing the video stream from the smartphone to the model, reading the lips and generating
a text passed as a message to the chat.

This application allowed the Red Cross team to communicate in a very noisy environment, when it is not possible to use walkie-talkies

Used AV-HuBERT, FastAPI, Next.js, WebRTC, Vercel, Render

## Deployment

On every commit to the `master` branch, the backend and frontend services are
deployed.

**Backend:** https://nightwalker-backend.onrender.com  
**Frontend:** https://nightwalker-frontend.vercel.app/

## Run locally

This explains how to run the backend and frontend services locally.  
You should have a recent version of Python and Node installed.

### Backend

Change to the backend directory:

```bash
cd backend/
```

Create a virtual environment and activate it:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Run the backend (for development):

```bash
cd src/
uvicorn main:app --reload
```

### Frontend

We use `pnpm` as our Node package manager.

Change to the frontend directory:

```bash
cd frontend/
```

Install the dependencies:

```bash
pnpm install
```

Run the frontend (for development):

```bash
pnpm dev
```
