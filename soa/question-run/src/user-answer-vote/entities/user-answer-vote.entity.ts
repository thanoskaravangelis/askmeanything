import {Column, Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Answer} from "../../answer/entities/answer.entity";

@Entity()
export class UserAnswerVote {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => User,user => user.votes, {nullable:false, onDelete:"CASCADE"})
    @JoinColumn({name: 'userId'})
    user: User;

    @Column()
    userId: number;

    @ManyToOne(() => Answer,answer => answer.votes, {nullable:false, onDelete:"CASCADE"})
    @JoinColumn({name: 'answerId'})
    answer: Answer;

    @Column()
    answerId: number;

    @Column({nullable:true})
    upvote: boolean;

    @Column({nullable:true})
    downvote: boolean;
}
