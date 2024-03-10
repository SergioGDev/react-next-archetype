import { GetGroupDataDto } from "../../entities/dtos/group";
import { UserEntity } from "../../entities/user.entity";
import { GroupRepository } from "../../repositories/group.repository";
import { EditGroupDto } from "../../entities/dtos/group/edit-group.dto";

interface GroupToken {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  creationDate: Date;
  status: string;
  userList?: UserEntity[];
}

interface EditGroupUseCase {
  execute(editGroupDto: EditGroupDto): Promise<GroupToken>;
}

export class EditGroup implements EditGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(editGroupDto: EditGroupDto): Promise<GroupToken> {
    const group = await this.groupRepository.editGroup(editGroupDto);

    return { ...group };
  }
}
