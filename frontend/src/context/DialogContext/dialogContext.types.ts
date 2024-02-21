export type DialogContextType = {
    dialogData?: DialogData;
    showDialog: boolean;
}

export type DialogData = {
    title: string;
    contentText: string;
    type: DialogType;
    actionConfirm: (...data: any) => void;
};

export type DialogType = 'CONFIRM_DIALOG' | 'ACCEPT_CANCEL_DIALOG';

export type DialogContextProps = DialogContextType & {
    openDialog: (dialogData: DialogData) => void;
    closeDialog: () => void;
};
