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

  @Column({nullable:false})
  password: string;

  @Column({nullable:false})
  email: string;

  @Column({nullable:true})
  first_name: string;

  @Column({nullable:true})
  last_name: string;

  @Column({nullable:true})
  date_of_birth: Date;

  @Column({nullable:true})
  link1: string;

  @Column({nullable:true})
  link2: string;

  @Column({nullable:true})
  short_descr: string;

  @Column({nullable:true})
  prof_image: string;

  @Column({nullable:true})
  country: string;

  @CreateDateColumn()
  createdAt;

  @OneToMany( type => Question, question => question.user)
  questions: Question[];

  @OneToMany( type => Answer , answer => answer.user)
  answers: Answer[];

  @OneToMany(type => UserAnswerVote, useranswervote =>useranswervote.user)
  votes: UserAnswerVote[];
}
