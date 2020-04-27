import {Entity, ManyToOne, Column, PrimaryGeneratedColumn} from "typeorm";
import {Status} from "./Status";

@Entity()
export class Mark {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Status, status => status.id)
    status: Status;

    @Column("int")
    mark: number;
}
