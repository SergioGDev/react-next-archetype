import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../entities/dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    roles: string[];
  };
}

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUser implements LoginUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    // Buscar el usuario
    const user = await this.authRepository.login(loginUserDto);

    // Obtener el token
    const token = await this.signToken({ id: user.id }, '2h' );

    if (!token) throw CustomError.internalServer('Error generating token'); // TODO: Cambiar el mensaje

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles
      }
    }
  }

}