import { LoginUserDto, RegisterUserDto, RenewTokenDto } from "../entities/dtos/auth";
import { UserEntity } from "../entities/user.entity";

/*
    Lo mismo que en el datasource, solo que cuando hagamos la implementación 
    tendrá un argumento que me permitirá sobrescribir el datasource
 */
export abstract class AuthRepository {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract renewToken(renewTokenDto: RenewTokenDto): Promise<UserEntity>;
    abstract getUserList(): Promise<UserEntity[]>;

}