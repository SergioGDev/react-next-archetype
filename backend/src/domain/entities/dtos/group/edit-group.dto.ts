export class EditGroupDto {
  public constructor(
    public id: string,
    public name?: string,
    public description?: string | undefined,
  ) {}

  static create(object: { [key: string]: any }): [string?, EditGroupDto?] {
    const { id, name, description } = object;

    if (name.length < 6) return ["Name too short", undefined];

    return [undefined, new EditGroupDto(id, name, description,)];
  }
}
