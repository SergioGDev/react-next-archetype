export class GetGroupListDto {
  public constructor(public name?: string, public creatorId?: string) {}

  static create(object: { [key: string]: any }): GetGroupListDto {
    const { name, creatorId } = object;

    return new GetGroupListDto(name, creatorId);
  }
}
