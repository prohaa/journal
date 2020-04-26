import {Entity, PrimaryGeneratedColumn, ManyToOne, Column, ManyToMany, JoinTable} from "typeorm";
import {User} from "./User";
import {Division} from "./Division";

enum university_position {
  'Администрация' = 1,
  'Преподаватель' = 2,
  'Староста' = 3,
  'Студент' = 4
}

@Entity()
export class University_member {

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @ManyToOne(type => User, user => user.id)
    user_id: User;

    @ManyToOne(type => Division, division => division.id)
    division_id: Division;

    @Column('varchar')
    university_name: string;

    @Column("enum", { enum: university_position })
    university_position: university_position;

}
