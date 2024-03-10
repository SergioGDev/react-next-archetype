import { Request, Response } from "express";
import { GroupRepository } from "../../domain/repositories/group.repository";
import { CustomError } from "../../domain";
import {
  RegisterGroupDto,
  GetGroupListDto,
  GetGroupDataDto,
  EditGroupDto,
} from "../../domain/entities/dtos/group";
import { GetGroupList, RegisterGroup } from "../../domain/use-cases/group";
import { GetGroupData } from "../../domain/use-cases/group/get-group-data-use-case";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { EditGroup } from "../../domain/use-cases/group/edit-group-use-case";

export class GroupController {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly authRepository: AuthRepository
  ) {}

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
    const getGroupListDto = GetGroupListDto.create(req.query);

    new GetGroupList(this.groupRepository)
      .execute(getGroupListDto)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  // GET GROUP DATA
  getGroupData = (req: Request, res: Response) => {
    const getGroupDataDto = GetGroupDataDto.create(req.params);

    new GetGroupData(this.groupRepository, this.authRepository)
      .execute(getGroupDataDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  // EDIT GROUP
  editGroup = (req: Request, res: Response) => {
    const [error, editGroupDto] = EditGroupDto.create({
      ...req.body,
      ...req.params,
    });

    if (error) return res.status(400).json({ error });

    new EditGroup(this.groupRepository)
      .execute(editGroupDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
