import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }, passwordRequired = true) {
    const {
      id,
      _id,
      name,
      surname,
      email,
      password,
      role,
      status,
      creationDate,
      idGroup,
      img,
    } = object;

    if (_id === undefined && id === undefined) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missing name");
    if (!surname) throw CustomError.badRequest("Missing surname");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!password && passwordRequired) throw CustomError.badRequest("Missing password");
    if (!role) throw CustomError.badRequest("Missing role");

    return new UserEntity(
      id || _id,
      name,
      surname,
      email,
      role,
      creationDate,
      status,
      password,
      idGroup,
      img
    );
  }
}
