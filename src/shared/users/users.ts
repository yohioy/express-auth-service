import { UsersModel } from './users.model';
import { MongoEntityManager } from 'typeorm';

export interface ICreateUser {
    cognitoId: string;
    firstName: string;
    createdDate: number;
    modifiedDate: number;
    group: string;
    userStatus: string;
    verificationStatus: string;
}

export class Users {

    protected dbManager: MongoEntityManager;

    constructor (options) {
        this.dbManager = options.dbManager;
    }

    async create (data: ICreateUser): Promise<any> {
        return this.dbManager.insertOne(UsersModel, data);
    }

    async findUser (id: string): Promise<any> {
        return this.dbManager.findOne(UsersModel, { where: { cognitoId: id } });
    }

    async updateVerifiedUser (id: string, status: string): Promise<any> {
        return this.dbManager.updateOne(UsersModel, { cognitoId: id }, { $set: { verificationStatus: status } });
    }



}
