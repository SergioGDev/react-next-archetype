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
  execute(): Promise<UserList>;
}

export class GetUserList implements GetUserListUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<UserList> {
    // Buscar el usuario
    const userList = await this.authRepository.getUserList();

    return {
      userList,
      length: userList.length
    };
  }
}
