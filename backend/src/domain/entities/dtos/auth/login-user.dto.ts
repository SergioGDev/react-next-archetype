export class LoginUserDto {

  constructor(
    public email: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['Missing email', undefined];
    if (!password) return ['Missing password', undefined];
    if (password.length < 6) return ['Password too short', undefined];

    return [undefined, new LoginUserDto(email.toLowerCase(), password)];
  }
}