import { inject, injectable } from 'tsyringe';
import { Forum, Status } from '@prisma/client';
import IForumRepository from '../repositories/IForumRepository';

interface IRequest {
  newStatus: Status;
  idForum: string;
  score: number;
}

@injectable()
class UpdateForumStatusService {
  constructor(
    @inject('ForumRepository')
    private forumRepository: IForumRepository,
  ) {}

  public async execute({ newStatus, idForum, score }: IRequest): Promise<Forum | null> {
    console.log("NO SERVICE, O VALOR DE SCORE EH = " + score);
    const updatedForum = await this.forumRepository.updateStatusForum(newStatus, idForum, score);
    return updatedForum;
  }
}

export default UpdateForumStatusService;
