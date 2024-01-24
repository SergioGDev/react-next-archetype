export type RespData<T extends Object> = {
  data?: T | RespError | any;
  status: number;
}

export type RespError = {
  type: string,
  msg: string,
  code: string;
}
