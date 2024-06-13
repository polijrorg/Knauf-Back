import { inject, injectable } from 'tsyringe';
import { Forum } from '@prisma/client';
import IForumRepository from '../repositories/ForumRepository';
import ICreateForumDTO from '../dtos/ICreateForumDTO';

@injectable()
class CreateForumService {
  constructor(
        @inject('ForumRepository')
        private forumRepository: IForumRepository,
  ) {}

  public async execute({
    idModule, idUser, text,
  }: ICreateForumDTO): Promise<Forum> {
    const forum = await this.forumRepository.create({ idModule, idUser, text });

    return forum;
  }
}

export default CreateForumService;
