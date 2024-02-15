import { UserData } from "@/context/AuthContext/authContext.types";
import { GeneralTableRowType } from "@/components/common/GeneralTable/generalTable.types";

export const getRowsUserData = (
  userDataList: UserData[]
): GeneralTableRowType[] => {
  return userDataList.map<GeneralTableRowType>(
    ({ name, surname, email, role }) => ({
      tableRow: [
        { id: "name", cellData: `${name} ${surname}`, position: 0 },
        { id: "email", cellData: email, position: 1 },
        { id: "role", cellData: role, position: 2 },
      ],
    })
  );
};
