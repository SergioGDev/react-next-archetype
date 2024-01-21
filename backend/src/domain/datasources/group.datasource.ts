import { RegisterGroupDto } from "../entities/dtos/group/register-group.dto";
import { GroupEntity } from "../entities/group.entity";

export abstract class GroupDatasource {
  
  abstract registerGroup(registerGroupDto: RegisterGroupDto): Promise<GroupEntity>;
  
}