import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDialogContext } from "../../DialogContextProvider";

const ConfirmDialog = () => {
  const { dialogData, showDialog, closeDialog } = useDialogContext();

  return (
    <Fragment>
      <Dialog
        open={showDialog}
        onClose={() => closeDialog()}
      >
        <DialogTitle id="alert-dialog-title">
          {dialogData?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogData?.contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Cancel</Button>
          <Button onClick={() => {
            dialogData?.actionConfirm()
            closeDialog()
          }} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmDialog;
