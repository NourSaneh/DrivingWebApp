// src/Pages/components/login/ContentLeft.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

export default function ContentLeft() {
  return (
    <Box sx={{ maxWidth: 420 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ color: "#145bff", mb: 4 }}
      >
        Sitemark
      </Typography>

      {[
        {
          title: "Adaptable performance",
          text: "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
        },
        {
          title: "Built to last",
          text: "Experience unmatched durability that goes above and beyond with lasting investment.",
        },
        {
          title: "Great user experience",
          text: "Integrate our product into your routine with an intuitive and easy-to-use interface.",
        },
        {
          title: "Innovative functionality",
          text: "Stay ahead with features that set new standards, addressing your evolving needs better than the rest.",
        },
      ].map((item, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
