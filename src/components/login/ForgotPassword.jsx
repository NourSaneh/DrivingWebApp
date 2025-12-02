// src/Pages/components/login/ForgotPassword.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  OutlinedInput,
  Typography,
} from "@mui/material";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

export default function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleReset(e) {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch {
      alert("Error sending reset email.");
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: { xs: 2, sm: 3 },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        Reset your password
      </DialogTitle>

      <DialogContent>
        {!sent ? (
          <>
            <Typography sx={{ color: "text.secondary", mb: 2 }}>
              Enter your email and we’ll send a reset link.
            </Typography>

            <OutlinedInput
              fullWidth
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                height: 45,
                borderRadius: 3,
              }}
            />
          </>
        ) : (
          <Typography sx={{ color: "green", mb: 2 }}>
            Reset email sent! Check your inbox.
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button onClick={handleClose}>Close</Button>

        {!sent && (
          <Button
            variant="contained"
            onClick={handleReset}
            sx={{ borderRadius: 2 }}
          >
            Send Link
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
