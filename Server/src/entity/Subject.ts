import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Subject {

    @PrimaryColumn()
    id: number; 

    @Column('varchar')
    subject_name: string;

}
