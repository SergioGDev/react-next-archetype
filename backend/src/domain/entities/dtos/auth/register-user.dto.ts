import { Validators } from "../../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public role: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, surname, email, password, role } = object;

    if (!name) return ["Missing name", undefined];
    if (!surname) return ["Missing surname", undefined];
    if (!email) return ["Missing email", undefined];
    if (!Validators.email.test(email)) return ["Email is not valid", undefined];
    if (!password) return ["Missing password", undefined];
    if (password.length < 6) return ["Password too short", undefined];

    return [
      undefined,
      new RegisterUserDto(
        name,
        surname,
        email.toLowerCase(),
        password,
        role ?? "USER_ROLE"
      ),
    ];
  }
}
