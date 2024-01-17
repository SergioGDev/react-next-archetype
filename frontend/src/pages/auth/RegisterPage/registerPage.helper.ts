import { FormControlSelectItemList } from "@/components/ui/FormControlSelect/formControlSelect.types";
import { LEADER_ROLE, USER_ROLE } from "@/consts/pattern.consts";

export const getRolesItemList = (): FormControlSelectItemList<String>[] => {
  return [
    { label: "User", value: USER_ROLE, key: USER_ROLE },
    { label: "Leader", value: LEADER_ROLE, key: LEADER_ROLE },
  ];
};
