import {Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column} from "typeorm";
import {University_member} from "./University_member";
import {Subject} from "./Subject";
import {Group} from "./Group";

enum lesson_type {
  'лекция' = 1,
  'практика' = 2,
  'экзамен' = 3,
  'консультация' = 4
}

enum time {
  'первая_пара' = 1,
  'вторая_пара' = 2,
  'третья_пара' = 3,
  'четвератя_пара' = 4,
  'пятая_пара' = 5,
  'шестая_пара' = 6,
  'седьмая_пара' = 7,
  'восьмая_пара' = 8
}

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => University_member, university_member => university_member.id)
  member_id: University_member;

  @ManyToOne(type => Subject, subject => subject.id)
  subject_id: Subject;
  
  @ManyToOne(type => Group, group => group.id)
  group_id: Group;

  @CreateDateColumn({type:'date'})
  date: Date;

  @Column("enum", { enum: time })
  time: time;

  @Column("enum", { enum: lesson_type })
  lesson_type: lesson_type;
}
