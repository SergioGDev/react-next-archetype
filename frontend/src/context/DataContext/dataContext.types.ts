export type Item = {
    id: number;
    name: string;
}

export type DataContextType = {
    dataList: Item[];
};

export type DataContextProps = DataContextType & {
    // Insert here the functions to modify state;
    addItem: (item: Item) => void;
    removeItem: (id: number) => void;
};