import React from "react";

import { GeneralTableRowActionsProps } from "./generalTableRowActions.types";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import { useGeneralTableRowActions } from "./hooks/useGeneralTableRowActions";
import { Role } from "@/types/roles.types";

const GeneralTableRowActions = ({
  rowId,
  tableActions,
}: GeneralTableRowActionsProps) => {
  const { userData, onClickGeneralTableAction } = useGeneralTableRowActions();

  return (
    <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }}>
      {tableActions
        .filter(({ actionData }) => {
          if (!(actionData?.roles as Role[]).includes(userData?.role!))
            return false;
          return true;
        })
        .map(({ Icon, actionType, actionData, iconTooltip }, index) => (
          <Tooltip key={`${index}_${actionType}`} title={iconTooltip}>
            <IconButton
              onClick={() =>
                onClickGeneralTableAction(actionType, actionData, {
                  id: rowId,
                  userId: userData?.id,
                })
              }
            >
              <Icon color="primary" />
            </IconButton>
          </Tooltip>
        ))}
    </TableCell>
  );
};

export default GeneralTableRowActions;
