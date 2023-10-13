import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async insertUser(userName: string, passWord: string): Promise<void> {
    await this.userRepository.insert({ userName, passWord, position: 'STAFF' });
  }

  findByUsername(userName: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userName });
  }
}
