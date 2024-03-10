import { GetUserListDto } from "../../entities/dtos/auth";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserList {
  length: number;
  userList: {
    name: string;
    surname: string;
    email: string;
    role: string;
    creationDate: Date;
    status: string;
    idGroup?: string;
    img?: string;
  }[];
}

interface GetUserListUseCase {
  execute(getUserListDto: GetUserListDto): Promise<UserList>;
}

export class GetUserList implements GetUserListUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(getUserListDto: GetUserListDto): Promise<UserList> {
    // Buscar el usuario
    const userList = await this.authRepository.getUserList(getUserListDto);
    const userListMapped = userList.map(
      ({ name, surname, email, role, status, creationDate, idGroup, img }) => ({
        name,
        surname,
        email,
        role,
        status,
        creationDate,
        idGroup,
        img,
      })
    );

    return {
      userList: userListMapped,
      length: userList.length,
    };
  }
}
