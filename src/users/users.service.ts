import { User } from "./user.entity";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterFace } from "./interfaces/user.interface";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    getAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async create(data: UserInterFace): Promise<User> {
        const user = new User();
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.role = data.role;
        user.avatar = data.avatar;
        user.password = await bcrypt.hash(data.password, 10);
        return this.usersRepository.save(user);
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id: id });
    }

    findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneBy({ email: email });
    }
}