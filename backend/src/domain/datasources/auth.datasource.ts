import { LoginUserDto, RegisterUserDto, RenewTokenDto } from "../entities/dtos/auth";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract renewToken(renewTokenDto: RenewTokenDto): Promise<UserEntity>;
    abstract getUserList(): Promise<UserEntity[]>;

}