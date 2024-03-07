import { LoginUserDto, RegisterUserDto, RenewTokenDto } from "../entities/dtos/auth";
import { GetUserListDto } from "../entities/dtos/auth/get-user-list.dto";
import { UpdateUserDataDto } from "../entities/dtos/auth/update-user-data.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract renewToken(renewTokenDto: RenewTokenDto): Promise<UserEntity>;
    abstract updateUserData(updateUserDataDto: UpdateUserDataDto): Promise<UserEntity>;
    abstract getUsersFromGroup(idGroup: string): Promise<UserEntity[]>;
    abstract getUserList(getUserListDto: GetUserListDto): Promise<UserEntity[]>;

}