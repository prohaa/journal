import {Entity, PrimaryGeneratedColumn, ManyToOne, Column} from "typeorm";
import {Lesson} from "./Lesson";
import {Group_member} from "./Group_member";

@Entity()
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Lesson, lesson => lesson.id)
  group_member: Lesson;

  @ManyToOne(type => Group_member, group_member => group_member.id)
  lesson: Group_member;

  @Column('bool')
  Status: boolean;
}
