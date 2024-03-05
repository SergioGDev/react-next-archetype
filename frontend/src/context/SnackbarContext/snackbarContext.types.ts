export type SnackbarContextType = {
    snackbarMessage: string;
    open: boolean; 
};

export type SnackbarContextProps = SnackbarContextType & {
    showSnackbar: (msg: string) => void;
};
