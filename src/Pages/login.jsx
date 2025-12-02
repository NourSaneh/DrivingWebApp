// src/Pages/Login.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";

import ContentLeft from "../components/login/ContentLeft";
import SignInCard from "../components/login/SignInCard";
import ForgotPassword from "../components/login/ForgotPassword";

export default function Login() {
  const [forgotOpen, setForgotOpen] = React.useState(false);

  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          minHeight: "100vh",
          background: {
            xs: "#ffffff",
            md: "radial-gradient(circle at 0% 0%, #f3f6ff 0, #f9fbff 40%, #ffffff 100%)",
          },
        }}
      >
        <CssBaseline />

        {/* LEFT SIDE (hidden on mobile) */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            px: { md: 10 },
          }}
        >
          <ContentLeft />
        </Grid>

        {/* RIGHT SIDE CARD */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { xs: "flex-start", md: "center" },
            py: { xs: 6, sm: 8, md: 0 },
            px: { xs: 2, sm: 4 },
          }}
        >
          <SignInCard openForgot={() => setForgotOpen(true)} />
        </Grid>
      </Grid>

      {/* FORGOT PASSWORD POPUP */}
      <ForgotPassword open={forgotOpen} handleClose={() => setForgotOpen(false)} />
    </>
  );
}
