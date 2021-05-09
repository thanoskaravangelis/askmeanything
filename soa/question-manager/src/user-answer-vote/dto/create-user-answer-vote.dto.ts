export class CreateUserAnswerVoteDto {
    user: {id:number};
    answer: {id: number};
    upvote: boolean;
    downvote: boolean;
}
