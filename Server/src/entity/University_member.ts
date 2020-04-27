import {Entity, PrimaryGeneratedColumn, ManyToOne, Column, ManyToMany, JoinTable} from "typeorm";
import {User} from "./User";
import {Division} from "./Division";
import {Subject} from "./Subject";

export enum university_position {
  ADMIN = 'Администрация',
  TEACHER = 'Преподаватель',
  HEADMAN = 'Староста',
  STUDENT = 'Студент'
}

@Entity()
export class University_member {

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @ManyToOne(type => User, user => user.id)
    user: User;

    @ManyToOne(type => Division, division => division.id)
    division: Division;

    @Column('varchar')
    university_name: string;

    @Column({
      type: "enum",
      enum: university_position,
      default: university_position.STUDENT
    })
    role: university_position

    @ManyToMany(type => Subject)
    @JoinTable()
    categories: Subject[];
}




