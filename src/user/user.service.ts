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

  async insertUser(user: User): Promise<void> {
    await this.userRepository.insert(user);
  }

  findByUsername(userName: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userName });
  }
}
