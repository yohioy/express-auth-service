import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity('users')
export class UsersModel {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    cognitoId: string;

    @Column()
    firstName: string;

    @Column()
    email: string;

    @Column()
    userStatus: string;

    @Column()
    group: string;

    @Column()
    createdDate: number;

    @Column()
    modifiedDate: number;

    @Column()
    verificationStatus: string;

}