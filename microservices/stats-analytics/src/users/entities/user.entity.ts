import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "../../question/entities/question.entity";
import {Answer} from "../../answer/entities/answer.entity";
import {UserAnswerVote} from "../../user-answer-vote/entities/user-answer-vote.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false, unique:true})
  username: string;

  @OneToMany( type => Question, question => question.user)
  questions: Question[];

  @OneToMany( type => Answer , answer => answer.user)
  answers: Answer[];

  @OneToMany(type => UserAnswerVote, useranswervote =>useranswervote.user)
  votes: UserAnswerVote[];
}
