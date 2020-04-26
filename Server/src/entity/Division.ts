import {Entity, PrimaryColumn, Column} from "typeorm";
@Entity()
export class Division {

    @PrimaryColumn()
    id: number; 

    @Column('varchar')
    faculty_name: string;

    @Column('varchar')
    Department_name: string;
}