import { UserModel } from "../../data/mongodb";
import { GroupModel } from "../../data/mongodb/models/group.model";
import { CustomError } from "../../domain";
import { GroupDatasource } from "../../domain/datasources/group.datasource";
import { GetGroupDataDto } from "../../domain/entities/dtos/group";
import { GetGroupListDto } from "../../domain/entities/dtos/group/get-group-list.dto";
import { RegisterGroupDto } from "../../domain/entities/dtos/group/register-group.dto";
import { GroupEntity } from "../../domain/entities/group.entity";
import { getWhereClauseWithCoincidences } from "../../helpers/getWhereClause";
import { GroupMapper } from "../mappers/group.mapper";

export class GroupDatasourceImpl implements GroupDatasource {
  constructor() {}

  async registerGroup(
    registerGroupDto: RegisterGroupDto
  ): Promise<GroupEntity> {
    const { name, description, creatorId } = registerGroupDto;

    try {
      const existsCreator = await UserModel.findOne({ email: creatorId });
      if (!existsCreator)
        throw CustomError.badRequest(
          "The email of the creator is not registered"
        );

      const existNameAndEmail = await GroupModel.findOne({ creatorId, name });
      if (existNameAndEmail)
        throw CustomError.badRequest(
          "This email already have a group with that name"
        );

      const group = await GroupModel.create({
        name,
        description,
        creatorId,
      });

      await group.save();
      return GroupMapper.groupEntityFromObject(group);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getGroupList(getGroupListDto: GetGroupListDto): Promise<GroupEntity[]> {
    try {
      const whereClauses: { [key: string]: any } = getWhereClauseWithCoincidences(getGroupListDto);
      const groupList = await GroupModel.find(whereClauses);

      if (!groupList) throw CustomError.internalServer();

      return groupList.map((groupEntity) =>
        GroupMapper.groupEntityFromObject(groupEntity)
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getGroupData(getGroupDataDto: GetGroupDataDto): Promise<GroupEntity> {
    try {
      const group = await GroupModel.findById(getGroupDataDto.id);
      if (!group) throw CustomError.badRequest('No group found');

      return GroupMapper.groupEntityFromObject(group);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
