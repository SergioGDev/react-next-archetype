import { Request, Response } from "express";
import {
  CustomError,
  LoginUser,
  RegisterUser,
  RegisterUserDto,
} from "../../domain";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { LoginUserDto } from "../../domain/entities/dtos/auth";

export class AuthController {
  // Inyección de Dependencias
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error); // Winston o el logger que sea
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

  // Get Users
  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) =>
        res.json({
          // users,
          user: req.body.user,
        })
      )
      .catch(() => res.status(500).json({ error: "Internal Server Error" }));
  };
}
