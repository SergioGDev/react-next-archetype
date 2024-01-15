import React from "react";
import styles from "./HomePage.module.scss";

import { Box, Typography } from "@mui/material";

const HomePage = () => {

  return (
    <>
      <Box
        sx={{
          padding: 5,
        }}
      >
        <Typography variant="h3">
          Home Page
        </Typography>

      </Box>
    </>
  );
};

export default HomePage;
