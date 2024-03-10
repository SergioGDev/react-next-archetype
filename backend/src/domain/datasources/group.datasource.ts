import { GetGroupDataDto, GetGroupListDto, RegisterGroupDto } from "../entities/dtos/group";
import { EditGroupDto } from "../entities/dtos/group/edit-group.dto";
import { GroupEntity } from "../entities/group.entity";

export abstract class GroupDatasource {
  
  abstract registerGroup(registerGroupDto: RegisterGroupDto): Promise<GroupEntity>;
  abstract getGroupList(getGroupListDto: GetGroupListDto): Promise<GroupEntity[]>;
  abstract getGroupData(getGroupDataDto: GetGroupDataDto): Promise<GroupEntity>;
  abstract editGroup(editGroupDto: EditGroupDto): Promise<GroupEntity>;
  
}