import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuestionHasKeyword} from "../../question-has-keywords/entities/question-has-keyword.entity";

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => QuestionHasKeyword, questionhaskeywords =>questionhaskeywords.keyword)
  questions: QuestionHasKeyword[];
}
