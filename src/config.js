//get .env variables and export them

const REACT_APP_SITE_KEY = process.env.REACT_APP_SITE_KEY;
const REACT_APP_SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const REACT_APP_GOOGLE_CLIENT_SECRET =
  process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

export {
  REACT_APP_SITE_KEY,
  REACT_APP_SECRET_KEY,
  REACT_APP_BACKEND_URL,
  REACT_APP_GOOGLE_CLIENT_ID,
  REACT_APP_GOOGLE_CLIENT_SECRET,
};
