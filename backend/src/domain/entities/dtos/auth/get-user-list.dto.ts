export class GetUserListDto {
  constructor(
    public email?: string,
    public name?: string,
    public surname?: string,
    public role?: string,
    public idGroup?: string,
    public hardCompare?: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string?, GetUserListDto?] {
    const { email, name, surname, role, idGroup, hardCompare } = object;

    return [undefined, new GetUserListDto(email, name, surname, role, idGroup, hardCompare)];
  }
}
