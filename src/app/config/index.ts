import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expired: process.env.JWT_ACCESS_EXPIRED,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expired: process.env.JWT_REFRESH_EXPIRED,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.GOOGLE_CALLBACK_URL,
  express_session_secret: process.env.EXPRESS_SESSION_SECRET,
  frontend_url: process.env.FRONTEND_URL,
};
