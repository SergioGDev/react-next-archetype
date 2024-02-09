import { GetGroupListDto } from "../../entities/dtos/group";
import { GroupEntity } from "../../entities/group.entity";
import { GroupRepository } from "../../repositories/group.repository";

interface GroupsToken {
  groups: GroupEntity[];
}

interface GetGroupListUseCase {
  execute(getGroupListDto: GetGroupListDto): Promise<GroupsToken>;
}

export class GetGroupList implements GetGroupListUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(getGroupListDto: GetGroupListDto): Promise<GroupsToken> {
    const groupListData = await this.groupRepository.getGroupList(getGroupListDto);

    return { groups: groupListData }
  }
}
