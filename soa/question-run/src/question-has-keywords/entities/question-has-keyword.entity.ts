import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Keyword } from "../../keywords/entities/keyword.entity";
import { Question } from "../../question/entities/question.entity";

@Entity()
export class QuestionHasKeyword {
  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne (() => Keyword, question => question.keywords, {nullable: false, onDelete: "CASCADE"})
  @JoinColumn({name: 'questionId'})
  question: Question;

  @ManyToOne(() => Keyword,keyword => keyword.questions, {nullable:false, onDelete:"CASCADE"})
  @JoinColumn({name: 'keywordId'})
  keyword: Keyword;
}
