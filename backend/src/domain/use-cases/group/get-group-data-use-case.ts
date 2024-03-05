import { GetGroupDataDto } from "../../entities/dtos/group";
import { UserEntity } from "../../entities/user.entity";
import { AuthRepository } from "../../repositories/auth.repository";
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
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly authRepository: AuthRepository
  ) {}

  async execute(getGroupDataDto: GetGroupDataDto): Promise<GroupsToken> {
    const groupListData = await this.groupRepository.getGroupData(
      getGroupDataDto
    );

    const userList = await this.authRepository.getUsersFromGroup(getGroupDataDto.id);

    return { ...groupListData, userList };
  }
}
