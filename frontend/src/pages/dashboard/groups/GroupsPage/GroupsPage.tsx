import React from "react";

import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const GroupsPage = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 5 }}>
      <Typography variant="h3">Groups</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 1,
          paddingX: 5,
          paddingY: 3,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push("/dashboard/groups/add")}
        >
          Add new group
        </Button>
      </Box>
    </Box>
  );
};

export default GroupsPage;
