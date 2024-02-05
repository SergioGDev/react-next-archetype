
export class RenewTokenDto {
  private constructor(public token: string) {}

  static create(object: {[key: string]: any}): [string?, RenewTokenDto?] {
    const { token } = object;
    
    if (!token) return ["Missing token", undefined];

    return [undefined, new RenewTokenDto(token)];
  }
}
