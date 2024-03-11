import { GeneralTableRowType } from "@/components/common/GeneralTable/generalTable.types";
import { UserData } from "@/context/AuthContext/authContext.types";

export const getRowsUsersData = (
  userDataList: UserData[]
): GeneralTableRowType[] => {
  return userDataList.map<GeneralTableRowType>(
    ({ name, surname, email }) => ({
      tableRow: [
        { id: "name", cellData: name, position: 0 },
        { id: "surname", cellData: surname, position: 1 },
        { id: "email", cellData: email, position: 2 },
      ],
    })
  );
};
