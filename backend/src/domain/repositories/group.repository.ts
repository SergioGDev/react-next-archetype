import { RegisterGroupDto, GetGroupListDto, GetGroupDataDto } from "../entities/dtos/group";
import { GroupEntity } from "../entities/group.entity";

export abstract class GroupRepository {

  abstract registerGroup(registerGroupDto: RegisterGroupDto): Promise<GroupEntity>;
  abstract getGroupList(getGroupListDto: GetGroupListDto): Promise<GroupEntity[]>;
  abstract getGroupData(getGroupDataDto: GetGroupDataDto): Promise<GroupEntity>;

}