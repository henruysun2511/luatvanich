import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultationNote } from '../entities/consultation-note.entity';

@Injectable()
export class ConsultationNoteRepository {
  constructor(
    @InjectRepository(ConsultationNote)
    private readonly repo: Repository<ConsultationNote>,
  ) {}

  async createNote(
    consultationRequestId: string,
    authorId: string | null,
    authorName: string | null,
    note: string,
  ): Promise<ConsultationNote> {
    const entity = this.repo.create({
      consultationRequestId,
      authorId,
      authorName,
      note,
    });
    return this.repo.save(entity);
  }

  async findById(id: string): Promise<ConsultationNote | null> {
    return this.repo.findOne({ where: { id } });
  }

  async deleteNote(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
