import { User } from "src/users/entities/user.entity";
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
import {Answer} from "../../answer/entities/answer.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.questions ,{nullable : false, onDelete: "CASCADE"})
    @JoinColumn({name:'userId'})
    user:User;

    @Column()
    userId: number;

    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];
}
