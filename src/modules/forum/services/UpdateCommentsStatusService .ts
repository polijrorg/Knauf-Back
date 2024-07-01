import { inject, injectable } from 'tsyringe';
import { Comments } from '@prisma/client';
import IForumRepository from '../repositories/IForumRepository';

interface IRequest {
  newStatus: string;
  idComments: string;
}

@injectable()
class UpdateCommentsStatusService {
  constructor(
    @inject('ForumRepository')
    private forumRepository: IForumRepository,
  ) {}

  public async execute({ newStatus, idComments }: IRequest): Promise<Comments | null> {
    const updatedComment = await this.forumRepository.updateStatusComments(newStatus, idComments);
    return updatedComment;
  }
}

export default UpdateCommentsStatusService;
