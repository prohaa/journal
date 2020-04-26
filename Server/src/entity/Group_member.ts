import {Entity, PrimaryGeneratedColumn, ManyToOne, Column} from "typeorm";
import {Group} from "./Group";
import { University_member } from "./University_member";

@Entity()
export class Group_member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => University_member, university_member => university_member.id)
  member_id: University_member;

  @ManyToOne(type => Group, group => group.id)
  group_id: Group;
}
