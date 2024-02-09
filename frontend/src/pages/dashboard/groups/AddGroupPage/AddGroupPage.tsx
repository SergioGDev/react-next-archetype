import React from "react";

import { Box, Typography } from "@mui/material";
import AddGroupFormWidget from "@/widgets/forms/AddGroupFormWidget/AddGroupFormWidget";

const AddGroupPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 5 }}>
      <Typography variant="h4">Add group</Typography>
      <Box
        sx={{ padding: 3 }}
      >
        <AddGroupFormWidget />
      </Box>
    </Box>
  );
};

export default AddGroupPage;
