export class CreateAnswerDto {
    question: {id: number};
    user: {id: number};
    text: string;
    date: Date;
}
