import express from "express";
import { signUp , signIn, forgotPassword, resetPassword, isLoggedIn} from "../controllers/authController.js"

const router = express.Router();

// sign up route

router.post("/sign-up", signUp);


  // sign in Route
  router.post("/sign-in", signIn);

  // forgot password
  router.post("/forgot-password", forgotPassword)

  // reset password route
  router.put("/reset-password/:resetToken",resetPassword);

  // isLoggedIn
  router.get("/isLoggedin", isLoggedIn)

  

export default router;