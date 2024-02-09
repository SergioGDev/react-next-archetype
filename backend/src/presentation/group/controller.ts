import { Request, Response } from "express";
import { GroupRepository } from "../../domain/repositories/group.repository";
import { CustomError } from "../../domain";
import {
  RegisterGroupDto,
  GetGroupListDto,
} from "../../domain/entities/dtos/group";
import { GetGroupList, RegisterGroup } from "../../domain/use-cases/group";

export class GroupController {
  constructor(private readonly groupRepository: GroupRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error); // Winston o el logger que sea
    return res.status(500).json({ error: "Internal Server Error" });
  };

  // REGISTER GROUP
  registerGroup = (req: Request, res: Response) => {
    const [error, registerGroupDto] = RegisterGroupDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new RegisterGroup(this.groupRepository)
      .execute(registerGroupDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  // GET GROUP LIST
  getGroupList = (req: Request, res: Response) => {
    const getGroupListDto = GetGroupListDto.create(req.body);

    new GetGroupList(this.groupRepository)
      .execute(getGroupListDto)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
