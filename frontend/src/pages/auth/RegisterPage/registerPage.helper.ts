import { FormControlSelectItemList } from "@/components/ui/FormControlSelect/formControlSelect.types";
import { COORDINATOR_ROLE, USER_ROLE } from "@/consts/pattern.consts";

export const getRolesItemList = (): FormControlSelectItemList<String>[] => {
  return [
    { label: "User", value: USER_ROLE, key: USER_ROLE },
    { label: "Leader", value: COORDINATOR_ROLE, key: COORDINATOR_ROLE },
  ];
};
