import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAll(): Promise<Post[]> {
    return (
      this.postsRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        // .leftJoinAndSelect("post.comments", "comment")
        .loadRelationCountAndMap('post.comments_count', 'post.comments')
        .getMany()
    );
  }

  getById(id: number) {
    return this.postsRepository.find({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
  }

  create(data: any) {
    const post = new Post();
    post.title = data.title;
    post.content = data.content;
    post.user = data.userId;
    return this.postsRepository.save(post);
  }

  async edit(id: number, data: any) {
    const postToUpdate = await this.postsRepository.findOneBy({ id });
    postToUpdate.title = data.title;
    postToUpdate.content = data.content;
    return this.postsRepository.save(postToUpdate);
  }

  async destroy(id: number) {
    const photoToRemove = await this.postsRepository.findOneBy({
      id,
    });
    return this.postsRepository.remove(photoToRemove);
  }
}
