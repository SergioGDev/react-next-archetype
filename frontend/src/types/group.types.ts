export type GroupData = {
  name: string;
  description: string;
  creatorId: string;
  creationDate?: Date;
  status?: string;
}

export type GroupListPageApiRespData = {
  groups: GroupData[];
}