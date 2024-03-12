import { JwtAdapter } from "../../../config";
import { logger } from "../../../config/logger";
import { LoginUserDto } from "../../entities/dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    creationDate: Date;
    status?: string;
    idGroup?: string;
    img?: string;
  };
}

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    // Buscar el usuario
    const user = await this.authRepository.login(loginUserDto);
    const {
      id,
      name,
      surname,
      email,
      role,
      creationDate,
      status,
      idGroup,
      img,
    } = user;

    // Obtener el token
    const token = await this.signToken(
      { id, name, surname, email, role, idGroup, creationDate, status },
      "2h"
    );

    if (!token) throw CustomError.internalServer("Error generating token"); // TODO: Cambiar el mensaje

    logger.info(`User logged: ${user.email}`);
    return {
      token: token,
      user: {
        id,
        name,
        surname,
        email,
        role,
        creationDate,
        status,
        idGroup,
        img,
      },
    };
  }
}
