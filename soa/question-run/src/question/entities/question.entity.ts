import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Answer} from "../../answer/entities/answer.entity";
import {QuestionHasKeyword} from "../../question-has-keywords/entities/question-has-keyword.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.questions ,{nullable : false, onDelete: "CASCADE"})
    @JoinColumn({name:'userId'})
    user:User;

    @Column()
    userId: number;

    @Column({nullable:false})
    title: string;

    @Column({nullable:false})
    text: string;

    @Column({nullable:true})
    date: Date;

    @Column({nullable:true})
    views: number;

    @Column({nullable:true})
    updatedAt: Date;

    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];

    @OneToMany(type => QuestionHasKeyword, questionhaskeywords =>questionhaskeywords.question)
    keywords: QuestionHasKeyword[];
}
