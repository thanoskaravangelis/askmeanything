import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "../../question/entities/question.entity";
import {User} from "../../users/entities/user.entity";
import {UserAnswerVote} from "../../user-answer-vote/entities/user-answer-vote.entity";

@Entity()
export class Answer{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Question, question => question.answers,{nullable:false, onDelete: "CASCADE"})
    @JoinColumn({name: 'questionId'})
    question: Question;

    @Column()
    questionId: number;

    @ManyToOne(() => User, user => user.answers,{nullable:false, onDelete: "CASCADE"})
    @JoinColumn({name: 'userId'})
    user: User;

    @Column()
    userId: number;

    @Column()
    text: string;

    @Column()
    date: Date;

    @Column({nullable:true})
    updatedAt: Date;

    @OneToMany(type => UserAnswerVote, useranswervote =>useranswervote.answer)
    votes: UserAnswerVote[];
}
