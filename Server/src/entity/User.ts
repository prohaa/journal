import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    role_name: string

    @Column('varchar')
    email: string;

    @Column('varchar')
    login: string;

    @Column('varchar')
    password: string;

    @Column('varchar')
    perm_name: string; 

    @Column('varchar')
    first_name: string; 

    @Column('varchar')
    last_name: string; 

    @Column('varchar')
    middle_name: string; 
}
