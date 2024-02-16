export class GetGroupDataDto {
  public constructor(public id: string) {}

  static create(object: { [key: string]: any }): GetGroupDataDto {
    const { id } = object;

    return new GetGroupDataDto(id);
  }
}
