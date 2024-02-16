import { GeneralTableRowType } from "@/components/common/GeneralTable/generalTable.types";
import { GroupData } from "@/types/group.types";

export const getRowsGroupsData = (
  groupDataList: GroupData[] = []
): GeneralTableRowType[] => {
  return groupDataList.map<GeneralTableRowType>(
    ({ name, description, creatorId }) => ({
      tableRow: [
        { id: "name", cellData: name, position: 0 },
        { id: "creatorId", cellData: creatorId, position: 1 },
        { id: "description", cellData: description, position: 2 },
      ],
    })
  );
};
