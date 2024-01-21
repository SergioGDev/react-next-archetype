export class RegisterGroupDto {
  public constructor(
    public name: string,
    public description: string | undefined,
    public creatorId: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterGroupDto?] {
    const { name, description, creatorId } = object;

    if (!name) return ["Missing name", undefined];
    if (name.length < 6) return ["Name too short", undefined];
    if (!creatorId) return ["Missing creator email", undefined]

    return [undefined, new RegisterGroupDto(name, description, creatorId)];
  }
}
