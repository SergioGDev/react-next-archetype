import { GetGroupDataDto } from "../../entities/dtos/group";
import { UserEntity } from "../../entities/user.entity";
import { GroupRepository } from "../../repositories/group.repository";

interface GroupsToken {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  creationDate: Date;
  status: string;
  userList?: UserEntity[];
}

interface GetGroupDataUseCase {
  execute(GetGroupDataDto: GetGroupDataDto): Promise<GroupsToken>;
}

export class GetGroupData implements GetGroupDataUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(GetGroupDataDto: GetGroupDataDto): Promise<GroupsToken> {
    const groupListData = await this.groupRepository.getGroupData(
      GetGroupDataDto
    );

    return { ...groupListData };
  }
}
