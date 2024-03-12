import { JwtAdapter } from "../../../config";
import { logger } from "../../../config/logger";
import { RegisterUserDto } from "../../entities/dtos/auth/register-user.dto";
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

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class RegisterUser implements RegisterUserUseCase {
  // Inyección de Dependencias
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    // Crear el usuario
    const user = await this.authRepository.register(registerUserDto);
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
    // Token
    const token = await this.signToken({ id }, "2h");

    if (!token) throw CustomError.internalServer("Error generating token");

    logger.info(`Register new user: ${JSON.stringify(user)}`);
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
