# SkinologyKE Deployment Instructions

## Flask API (Render/Fly.io)
- Add `requirements.txt` and `Procfile` to `api/`.
- Push to GitHub and connect to Render/Fly.io.
- Set environment variables for secrets.

## Streamlit App (Streamlit Cloud)
- Ensure `requirements.txt` is up to date.
- Push your Streamlit app to GitHub.
- Go to https://streamlit.io/cloud and deploy your repo.
- Set up environment variables as needed.
- Access your app via the provided live URL.

## Frontend (Firebase Hosting)
- Run `firebase init` in `frontend/`.
- Deploy with `firebase deploy`.

## Domain & SSL
- Buy domain (Namecheap).
- Connect to Vercel/Firebase/Render.
- Enable SSL in hosting provider settings.

# Example live URLs (replace with your actual URLs):
- API: https://skinologyke-api.onrender.com
- Frontend: https://skinologyke.web.app
- Blog: https://yourusername.github.io/skinologyke-blog
