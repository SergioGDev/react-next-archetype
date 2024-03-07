import { JwtPayload } from "jsonwebtoken";
import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, UserEntity } from "../../domain";
import {
  GetUserListDto,
  LoginUserDto,
  RegisterUserDto,
  RenewTokenDto,
} from "../../domain/entities/dtos/auth";
import { UserMapper } from "../mappers/user.mapper";
import { UpdateUserDataDto } from "../../domain/entities/dtos/auth/update-user-data.dto";
import { getWhereClause, getWhereClauseWithCoincidences } from "../../helpers/getWhereClause";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;
type DecodeTokenFunction = (
  token: string
) => Promise<string | JwtPayload | null>;
type ValidateTokenFunction = (token: string) => Promise<string | null>;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    private readonly decodeToken: DecodeTokenFunction = JwtAdapter.decodeToken,
    private readonly validateToken: ValidateTokenFunction = JwtAdapter.validateToken
  ) {}

  async getUserList(getUserListDto: GetUserListDto): Promise<UserEntity[]> {
    try {
      const whereClauses: { [key: string]: any } = getWhereClauseWithCoincidences(getUserListDto);
      const userListObj = await UserModel.find(whereClauses);

      if (!userListObj) throw CustomError.internalServer();

      return userListObj.map((userObj) =>
        UserMapper.userEntityFromObject(userObj)
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async updateUserData(
    updateUserDataDto: UpdateUserDataDto
  ): Promise<UserEntity> {
    try {
      const whereClauses: { [key: string]: any } = getWhereClause(
        updateUserDataDto,
        ["email"]
      );

      const user = await UserModel.findOneAndUpdate(
        {
          email: updateUserDataDto.email,
        },
        whereClauses
      );

      if (!user) throw CustomError.internalServer();

      return { ...UserMapper.userEntityFromObject(user), ...whereClauses };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      // 1. Verificar si el correo existe
      const user = await UserModel.findOne({ email });

      if (!user) throw CustomError.badRequest("Invalid email or password");

      // 2. Validamos la contraseña
      const isMatching = this.comparePassword(password, user.password);
      if (!isMatching)
        throw CustomError.badRequest("Invalid email or password");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, surname, email, password, role } = registerUserDto;

    try {
      // 1. Verificar si el correo existe
      const exist = await UserModel.findOne({ email });

      if (exist) throw CustomError.badRequest("User already exists");

      // 2. Solamente puede existir una cuenta de admin
      if (role === "ADMIN_ROLE") {
        const existsAdminAccount = await UserModel.findOne({
          role: "ADMIN_ROLE",
        });
        if (existsAdminAccount)
          throw CustomError.badRequest("Already exist an admin account");
      }

      const user = await UserModel.create({
        name,
        surname,
        email,
        password: this.hashPassword(password),
        role,
      });

      // 3. Hacer un hash de la contraseña
      await user.save();

      // 4. Mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getUsersFromGroup(idGroup: string): Promise<UserEntity[]> {
    try {
      const userList = await UserModel.find({ idGroup });
      if (!userList) throw CustomError.internalServer();

      return userList.map((userObj) =>
        UserMapper.userEntityFromObject(userObj)
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async renewToken(renewTokenDto: RenewTokenDto): Promise<UserEntity> {
    const { token } = renewTokenDto;

    try {
      const respValidateToken = await this.validateToken(renewTokenDto!.token);
      if (!respValidateToken) throw CustomError.unauthorized("Invalid token");

      const decoded = await this.decodeToken(token);
      if (!decoded) throw CustomError.badRequest("Cant decode token");

      return UserMapper.userEntityFromObject(decoded as UserEntity, false);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
