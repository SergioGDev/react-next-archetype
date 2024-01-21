import { RegisterGroupDto } from "../entities/dtos/group/register-group.dto";
import { GroupEntity } from "../entities/group.entity";

export abstract class GroupRepository {

  abstract registerGroup(registerGroupDto: RegisterGroupDto): Promise<GroupEntity>;

}