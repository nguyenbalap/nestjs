import { Injectable } from "@nestjs/common";
import { Comment } from "./comment.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

    getAll() {
        return this.commentRepository.find();
    }

    create(data: any) {
        const comment = new Comment();
        comment.content = data.content;
        comment.user = data.userId;
        comment.post  = data.postId;
        return this.commentRepository.save(comment);
    }
}