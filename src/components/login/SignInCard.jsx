// src/Pages/components/login/SignInCard.jsx
import React from "react";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";

import { auth } from "../../firebase";

export default function SignInCard({ openForgot }) {
  const [errorMsg, setErrorMsg] = React.useState("");

  // EMAIL/PASSWORD LOGIN
  async function handleLogin(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMsg("");
      window.location.href = "/"; // redirect
    } catch (err) {
      setErrorMsg("Invalid email or password.");
    }
  }

  // GOOGLE LOGIN
  async function googleLogin() {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      window.location.href = "/";
    } catch {
      setErrorMsg("Google sign-in failed.");
    }
  }

  // FACEBOOK LOGIN
  async function facebookLogin() {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
      window.location.href = "/";
    } catch {
      setErrorMsg("Facebook sign-in failed.");
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 420,
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        border: "1px solid rgba(15,23,42,0.08)",
        boxShadow: { md: "0 24px 60px rgba(15,23,42,0.06)" }
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#111827",
          width: { xs: 36, sm: 40 },
          height: { xs: 36, sm: 40 },
          mb: 1.5,
        }}
      >
        <LockOutlinedIcon fontSize="small" />
      </Avatar>

      <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
        Sign in
      </Typography>

      {/* ERROR */}
      {errorMsg && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Typography>
      )}

      {/* SIGN-IN FORM */}
      <Box component="form" onSubmit={handleLogin}>
        <TextField
          fullWidth
          required
          name="email"
          label="Email"
          sx={{ mb: 2 }}
          size="small"
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Password
          </Typography>

          <Link
            href="#"
            underline="hover"
            variant="body2"
            onClick={(e) => {
              e.preventDefault();
              openForgot();
            }}
          >
            Forgot your password?
          </Link>
        </Box>

        <TextField
          fullWidth
          required
          name="password"
          label="Password"
          type="password"
          sx={{ mb: 2 }}
          size="small"
        />

        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Remember me"
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            py: 1.2,
            mb: 2,
            borderRadius: 999,
            textTransform: "none",
            background: "linear-gradient(90deg, #111827, #020617)",
            fontWeight: 600,
          }}
        >
          Sign in
        </Button>

        {/* DIVIDER */}
        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
          <Box sx={{ flex: 1, height: 1, bgcolor: "divider" }} />
          <Typography variant="caption" sx={{ mx: 1 }}>
            or
          </Typography>
          <Box sx={{ flex: 1, height: 1, bgcolor: "divider" }} />
        </Box>

        {/* GOOGLE */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={googleLogin}
          sx={{ mb: 2 }}
        >
          Sign in with Google
        </Button>

        {/* FACEBOOK */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon />}
          onClick={facebookLogin}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </Paper>
  );
}
