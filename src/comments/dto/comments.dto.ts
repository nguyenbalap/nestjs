import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({ type: 'text' })
    content: string;

    @ApiProperty()
    postId: number;

    @ApiProperty()
    userId: number;

}

export class UpdateCommentDto {
    @ApiProperty({ type: 'text' })
    content: string;
}