import React from "react";
import styles from "./HomePage.module.scss";

import { useAuthContext } from "@/context/AuthContext";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const HomePage = () => {
  const { logout } = useAuthContext();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          padding: 4,
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          Home Page
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Link href="/admin/list-data">
            <Button color="primary" variant="contained">
              Go to List Data
            </Button>
          </Link>

          <Button color="info" variant="contained" onClick={() => logout()}>
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
