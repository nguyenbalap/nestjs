import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  getAll() {
    return this.commentRepository.find({
      where: {
        reply_to_comment: null,
      },
      relations: {
        user: true,
      },
    });
  }

  create(data: any) {
    const comment = new Comment();
    comment.content = data.content;
    comment.reply_to_comment = data.reply_to_comment || null;
    comment.user = data.userId;
    comment.post = data.postId;
    return this.commentRepository.save(comment);
  }

  getAllReply(id: number) {
    return this.commentRepository.find({
      where: { reply_to_comment: id },
      relations: {
        user: true,
      },
    });
  }
}
