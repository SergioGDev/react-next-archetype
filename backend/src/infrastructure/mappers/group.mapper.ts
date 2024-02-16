import { CustomError, GroupEntity } from "../../domain";

export class GroupMapper {
  static groupEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, description, creatorId, userList, status, creationDate } =
      object;

    if (!_id || !id) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missing name");
    if (!creatorId) throw CustomError.badRequest("Missing email of the creator of the group");

    return new GroupEntity(
      id || _id,
      name,
      description,
      creatorId,
      creationDate,
      status,
      userList
    );
  }
}
