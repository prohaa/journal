import {Entity, PrimaryGeneratedColumn, ManyToOne, Column} from "typeorm";
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
    division: Division;

    @Column('varchar')
    direction_name: string;

    @Column("enum", { enum: course })
    course: string;

    @Column('int')
    group_member: number;
}
