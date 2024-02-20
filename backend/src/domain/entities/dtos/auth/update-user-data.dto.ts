export class UpdateUserDataDto {

  constructor(
    public email: string,
    public name?: string,
    public surname?: string,
    public idGroup?: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateUserDataDto?] {
    const { email, name, surname, idGroup } = object;

    if (!email) return ["Missing email", undefined];

    return [undefined, new UpdateUserDataDto(email, name, surname, idGroup)];
  }
}