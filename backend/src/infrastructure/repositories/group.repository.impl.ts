import { GroupEntity } from '../../domain';
import { GroupDatasource } from '../../domain/datasources/group.datasource';
import { RegisterGroupDto } from '../../domain/entities/dtos/group/register-group.dto';
import { GroupRepository } from '../../domain/repositories/group.repository';

export class GroupRepositoryImpl implements GroupRepository {
  constructor(
    private readonly groupDatasource: GroupDatasource
  ) {}

  registerGroup(registerGroupDto: RegisterGroupDto): Promise<GroupEntity> {
    return this.groupDatasource.registerGroup(registerGroupDto);
  }

}