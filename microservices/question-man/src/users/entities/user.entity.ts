import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "../../question/entities/question.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false, unique:true})
  username: string;

  @OneToMany( type => Question, question => question.user)
  questions: Question[];
}
