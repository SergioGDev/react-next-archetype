import { JwtAdapter } from "../../../config";
import { RegisterGroupDto } from "../../entities/dtos/group/register-group.dto";
import { GroupRepository } from "../../repositories/group.repository";

interface GroupToken {
  group: {
    name: string;
    description: string | undefined;
    creatorId: string;
    status: string;
    creationDate: Date;
  };
}

interface RegisterGroupUseCase {
  execute(registerGroupDto: RegisterGroupDto): Promise<GroupToken>;
}

export class RegisterGroup implements RegisterGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(registerGroupDto: RegisterGroupDto): Promise<GroupToken> {
    const groupData = await this.groupRepository.registerGroup(
      registerGroupDto
    );

    const { name, description, creatorId, status, creationDate } = groupData;

    return { group: { name, description, creatorId, status, creationDate } };
  }
}
