import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Answer} from "../../answer/entities/answer.entity";
import {QuestionHasKeyword} from "../../question-has-keyword/entities/question-has-keyword.entity";

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
    views: number;

    @UpdateDateColumn({nullable:true})
    updatedAt;

    @CreateDateColumn()
    createdAt;

    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];

    @OneToMany(type => QuestionHasKeyword, questionhaskeywords =>questionhaskeywords.question)
    keywords: QuestionHasKeyword[];
}
