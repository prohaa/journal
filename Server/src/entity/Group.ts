import {Entity, PrimaryGeneratedColumn, ManyToOne, Column} from "typeorm";
import {Direction} from "./Direction";
import {Division} from "./Division";

enum course {
  'course1' = 1,
  'course2' = 2,
  'course3' = 3,
  'course4' = 4
}

@Entity()
export class Group {

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @ManyToOne(type => Division, division => division.id)
    division_id: Division;

    @ManyToOne(type => Direction, direction => direction.id)
    direction_id: Direction;

    @Column("enum", { enum: course })
    course: string;

    @Column('int')
    group_member: number;
}
