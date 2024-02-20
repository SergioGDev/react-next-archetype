import { AuthDatasource, AuthRepository, UserEntity } from '../../domain';
import { LoginUserDto, RegisterUserDto, RenewTokenDto } from '../../domain/entities/dtos/auth';
import { UpdateUserDataDto } from '../../domain/entities/dtos/auth/update-user-data.dto';

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

    updateUserData(updateUserDataDto: UpdateUserDataDto): Promise<UserEntity> {
        return this.authDatasource.updateUserData(updateUserDataDto);
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }

    renewToken(renewTokenDto: RenewTokenDto): Promise<UserEntity> {
        return this.authDatasource.renewToken(renewTokenDto);
    }

}