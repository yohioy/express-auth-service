import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity('users')
export class UsersModel {

    @PrimaryColumn()
    id: string | undefined;

    @Column()
    firstName: string | undefined;

    @Column()
    userStatus: string | undefined;

    @Column()
    group: string | undefined;

    @Column()
    createdDate: number | undefined;

    @Column()
    modifiedDate: number | undefined;

    @Column()
    verificationStatus: string | undefined;

}
