import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/user.entity';
import { HttpException } from '../shared/utils/http-exception';

const JWT_SECRET = process.env.JTW_SECRET || 'furniro_secret_key_2026';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(data: Partial<User>) {
    const { name, email, password } = data;

    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new HttpException(400, 'User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password!, 10);
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await this.userRepository.save(user);
    const { password: _, ...userWithoutPassord } = user;
    return userWithoutPassord;
  }

  async login(data: Partial<User>) {
    const { email, password } = data;

    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException(401, 'invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password!, user.password);

    if (!isPasswordValid) {
      throw new HttpException(401, 'invalid credentials');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}
