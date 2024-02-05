import { JwtAdapter } from "../../../config";
import { RenewTokenDto } from "../../entities/dtos/auth";
import { RegisterUserDto } from "../../entities/dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
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

interface RenewTokenUseCase {
  execute(renewTokenDto: RenewTokenDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class RenewToken implements RenewTokenUseCase {
  // Inyección de Dependencias
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(renewTokenDto: RenewTokenDto): Promise<UserToken> {
    const user = await this.authRepository.renewToken(renewTokenDto);

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

    const newToken = await this.signToken(
      {
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
      "2h"
    );

    if (!newToken) throw CustomError.internalServer("Error generating token");

    return {
      token: newToken,
      user: {
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
