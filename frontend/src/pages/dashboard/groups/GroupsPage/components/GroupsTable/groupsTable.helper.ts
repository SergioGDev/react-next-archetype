import { GeneralTableRowType } from "@/components/common/GeneralTable/generalTable.types";
import { getShortString } from "@/helpers/getShortString";
import { GroupData } from "@/types/group.types";

export const getRowsGroupsData = (
  groupDataList: GroupData[] = []
): GeneralTableRowType[] => {
  return groupDataList.map<GeneralTableRowType>(
    ({ id, name, description, creatorId }) => ({
      tableRow: [
        { id: "name", cellData: name, position: 0 },
        { id: "creatorId", cellData: creatorId, position: 1 },
        {
          id: "description",
          cellData: getShortString(description, 50),
          position: 2,
        },
        { id: "id", cellData: id, position: -1, hiddenData: false },
      ],
    })
  );
};
