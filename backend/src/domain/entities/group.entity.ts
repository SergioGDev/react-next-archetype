export class GroupEntity {
  
  constructor(
    public id: string,
    public name: string,
    public description: string | undefined,
    public creatorId: string,
    public creationDate: Date,
    public status: string,
  ) { }

}