import {Entity, PrimaryColumn, ManyToMany, JoinTable} from "typeorm";
import {Permission} from "./Permission";

@Entity()
export class Role {

  @PrimaryColumn()
    name: string;

  @ManyToMany(type => Permission)
  @JoinTable()
  categories: Permission[];
}
