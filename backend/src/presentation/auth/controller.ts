import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import {
  GetUserListDto,
  LoginUserDto,
  RegisterUserDto,
  RenewTokenDto,
  UpdateUserDataDto,
} from "../../domain/entities/dtos/auth";
import { GetUserList } from "../../domain/use-cases/auth/get-user-list.use-case";
import { RenewToken } from "../../domain/use-cases/auth/renew-token.use-case";
import { LoginUser, RegisterUser } from "../../domain/use-cases/auth";
import { UpdateUserData } from "../../domain/use-cases/auth/update-user-data.use-case";
import { logger } from "../../config/logger";

export class AuthController {
  // Inyección de Dependencias
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    logger.error(error); // Winston o el logger que sea
    return res.status(500).json({ error: "Internal Server Error" });
  };

  // REGISTER USER
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  // LOGIN USER
  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  // RENEW TOKEN
  renewToken = (req: Request, res: Response) => {
    const [error, renewTokenDto] = RenewTokenDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new RenewToken(this.authRepository)
      .execute(renewTokenDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  // Update User Data
  updateUserData = (req: Request, res: Response) => {
    const [error, updateUserDataDto] = UpdateUserDataDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new UpdateUserData(this.authRepository)
      .execute(updateUserDataDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  // Get Users
  getUsers = (req: Request, res: Response) => {
    const [, getUserListDto] = GetUserListDto.create(req.query);

    new GetUserList(this.authRepository)
      .execute(getUserListDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
