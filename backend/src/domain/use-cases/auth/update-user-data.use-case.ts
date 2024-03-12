import { JwtAdapter } from "../../../config";
import { logger } from "../../../config/logger";
import { UpdateUserDataDto } from "../../entities/dtos/auth";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserData {
  userData: {
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

interface UpdateUserDataUseCase {
  execute(updateUserDataDto: UpdateUserDataDto): Promise<UserData>;
}

export class UpdateUserData implements UpdateUserDataUseCase {
  // Inyección de Dependencias
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(updateUserDataDto: UpdateUserDataDto): Promise<UserData> {
    // Actualiza los datos del usuario
    const user = await this.authRepository.updateUserData(updateUserDataDto);
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

    logger.info(`Updated user data: ${JSON.stringify(user)}`);
    return {
      userData: {
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
