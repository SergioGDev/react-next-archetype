import { RegisterGroupDto, GetGroupListDto } from "../entities/dtos/group";
import { GroupEntity } from "../entities/group.entity";

export abstract class GroupRepository {

  abstract registerGroup(registerGroupDto: RegisterGroupDto): Promise<GroupEntity>;
  abstract getGroupList(getGroupListDto: GetGroupListDto): Promise<GroupEntity[]>;

}