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
  ssl_store_id: process.env.SSL_STORE_ID,
  ssl_store_pass: process.env.SSL_STORE_PASS,
  ssl_payment_api: process.env.SSL_PAYMENT_API,
  ssl_validation_api: process.env.SSL_VALIDATION_API,
  ssl_success_backend_url: process.env.SSL_SUCCESS_BACKEND_URL,
  ssl_fail_backend_url: process.env.SSL_FAIL_BACKEND_URL,
  ssl_cancel_backend_url: process.env.SSL_cancel_BACKEND_URL,
  ssl_success_frontend_url: process.env.SSL_SUCCESS_FRONTEND_URL,
  ssl_fail_frontend_url: process.env.SSL_fail_FRONTEND_URL,
  ssl_cancel_frontend_url: process.env.SSL_cancel_FRONTEND_URL,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
