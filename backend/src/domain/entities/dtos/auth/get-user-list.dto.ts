export class GetUserListDto {
  constructor(
    public email?: string,
    public name?: string,
    public surname?: string,
    public role?: string,
    public idGroup?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, GetUserListDto?] {
    const { email, name, surname, role, idGroup } = object;

    return [undefined, new GetUserListDto(email, name, surname, role, idGroup)];
  }
}
