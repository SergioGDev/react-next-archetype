import { GeneralTableAction } from "../../../generalTable.types";
import { useRouter } from "next/navigation";

export const useGeneralTableBody = () => {
  const router = useRouter();

  const onClickGeneralTableAction = (
    actionType: GeneralTableAction,
    actionData?: { [key: string]: any },
    body?: { [key: string]: any }
  ) => {
    switch (actionType) {
      case "GO_TO_PAGE_ACTION":
        if (body && actionData) {
          const { id } = body;
          const { path } = actionData;
  
          router.push((path as string).replace(":id", id));
        }

      case "DELETE_ACTION":
    }
  };

  return { onClickGeneralTableAction };
};
