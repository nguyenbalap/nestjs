import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBody, ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from './dto/comments.dto';
import { OwnerGuard } from 'src/guards/owner.guard';

@ApiTags('comments')
@Controller('comments')
@ApiBearerAuth('access-token')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('')
  getComments() {
    return this.commentsService.getAll();
  }

  @Post(':userId/create')
  @UseGuards(OwnerGuard)
  @ApiBody({ type: CreateCommentDto })
  createComments(@Body() comments: CreateCommentDto) {
    return this.commentsService.create(comments);
  }

  @Put(':userId/update/:id')
  @UseGuards(OwnerGuard)
  @ApiBody({ type: UpdateCommentDto })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'userId' })
  editComments(
    @Param('id', ParseIntPipe) id: number,
    @Body() comments: UpdateCommentDto,
  ) {
    return 'Not allowed';
  }

  @Delete(':userId/delete/:id')
  @UseGuards(OwnerGuard)
  @ApiBody({ type: UpdateCommentDto })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'userId' })
  deleteComments(@Param('id', ParseIntPipe) id: number) {
    return 'Not allowed';
  }

  @Get('/reply/:id')
  getCommentReplies(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.getAllReply(id);
  }
}
