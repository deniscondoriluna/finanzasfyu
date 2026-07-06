import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async register(dto: CreateStudentDto) {
    const exists = await this.studentRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('El email ya está registrado');

    const hashed = await bcrypt.hash(dto.password, 10);
    const student = this.studentRepo.create({ ...dto, password: hashed });
    await this.studentRepo.save(student);

    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      isActive: student.isActive,
      createdAt: student.createdAt,
    };
  }

  async login(dto: { email: string; password: string }) {
    const student = await this.studentRepo.findOne({ where: { email: dto.email } });
    if (!student) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(dto.password, student.password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
    };
  }

  async findById(id: string) {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Estudiante no encontrado');

    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      isActive: student.isActive,
      createdAt: student.createdAt,
    };
  }

  async findAll() {
    const students = await this.studentRepo.find();
    return students.map(s => ({
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      email: s.email,
      isActive: s.isActive,
      createdAt: s.createdAt,
    }));
  }
}