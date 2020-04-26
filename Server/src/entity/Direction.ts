import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Direction {
  @PrimaryColumn()
  id: number;

  @Column('varchar')
  direction_name: string;
}
