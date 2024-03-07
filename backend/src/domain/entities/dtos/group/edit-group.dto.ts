export class EditGroupDto {
  public constructor(
    public name?: string,
    public description?: string | undefined,
    public creatorId?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, EditGroupDto?] {
    const { name, description, creatorId } = object;

    if (name.length < 6) return ["Name too short", undefined];

    return [undefined, new EditGroupDto(name, description, creatorId)];
  }
}
