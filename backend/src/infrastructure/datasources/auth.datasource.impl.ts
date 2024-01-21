import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { LoginUserDto } from "../../domain/entities/dtos/auth";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async getUserList(): Promise<UserEntity[]> {
    try {
      const userListObj = await UserModel.find();

      if (!userListObj) throw CustomError.internalServer();

      return userListObj.map((userObj) => UserMapper.userEntityFromObject(userObj));
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

      if (!user) throw CustomError.badRequest("Email not registered."); // TODO: Cambiar el mensaje

      // 2. Validamos la contraseña
      const isMatching = this.comparePassword(password, user.password);
      if (!isMatching) throw CustomError.badRequest("Invalid password"); // TODO: Cambiar el mensaje

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

      const user = await UserModel.create({
        name,
        surname,
        email,
        password: this.hashPassword(password),
        role,
      });

      // 2. Hacer un hash de la contraseña
      await user.save();

      // 3. Mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
