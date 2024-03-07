import React from "react";

import { Box, Typography } from "@mui/material";
import AddGroupFormWidget from "@/widgets/forms/AddGroupFormWidget/AddGroupFormWidget";
import { useParams } from "next/navigation";

const AddGroupPage = () => {
  const { id } = useParams<{ id: string }>()!;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">{id ? 'Edit group' : 'Add new group'}</Typography>
      <Box sx={{ padding: 3 }}>
        <AddGroupFormWidget />
      </Box>
    </Box>
  );
};

export default AddGroupPage;
