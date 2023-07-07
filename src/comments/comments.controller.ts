import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from './dto/comments.dto';

@ApiTags('comments')
@Controller('comments')
@ApiBearerAuth('access-token')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get('')
    getComments() {
        return this.commentsService.getAll();
    }

    @Post('/create')
    @ApiBody({ type: CreateCommentDto })
    createComments(@Body() comments: CreateCommentDto) {
        return this.commentsService.create(comments);
    }

    @Put('/update/:id')
    @ApiBody({ type: UpdateCommentDto })
    editComments(@Param('id', ParseIntPipe) id: number,@Body() comments: UpdateCommentDto) {
        console.log(comments);
        return true;
    }

    @Delete('/delete/:id')
    @ApiBody({ type: UpdateCommentDto })
    deleteComments(@Param('id', ParseIntPipe) id: number) {
        console.log(id);
        return true;
    }


}
