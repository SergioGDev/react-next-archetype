import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from '../../domain';
import { LoginUserDto, RenewTokenDto } from '../../domain/entities/dtos/auth';

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: AuthDatasource
    ) {}

    getUserList(): Promise<UserEntity[]> {
        return this.authDatasource.getUserList();
    }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }

    renewToken(renewTokenDto: RenewTokenDto): Promise<UserEntity> {
        return this.authDatasource.renewToken(renewTokenDto);
    }

}