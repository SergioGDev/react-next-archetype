import { JwtAdapter } from "../../../config";
import { UpdateUserDataDto } from "../../entities/dtos/auth";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserData {
  userData: {
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
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(updateUserDataDto: UpdateUserDataDto): Promise<UserData> {
    // Actualiza los datos del usuario
    const user = await this.authRepository.updateUserData(updateUserDataDto);
    const {
      name,
      surname,
      email,
      role,
      creationDate,
      status,
      idGroup,
      img,
    } = user;

    return {
      userData: {
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
