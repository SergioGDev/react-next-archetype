import { LoginUserDto } from "../entities/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../entities/dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

// Son las reglas de implementación del "juego"
export abstract class AuthDatasource {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract getUserList(): Promise<UserEntity[]>;

}