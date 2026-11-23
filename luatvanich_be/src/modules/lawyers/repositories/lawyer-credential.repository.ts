import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LawyerCredential } from '../entities/lawyer-credential.entity';
import { LawyerCredentialTranslation } from '../entities/lawyer-credential-translation.entity';

@Injectable()
export class LawyerCredentialRepository {
  constructor(
    @InjectRepository(LawyerCredential)
    private readonly credRepo: Repository<LawyerCredential>,
    @InjectRepository(LawyerCredentialTranslation)
    private readonly transRepo: Repository<LawyerCredentialTranslation>,
  ) {}

  async saveCredential(data: Partial<LawyerCredential>): Promise<LawyerCredential> {
    return this.credRepo.save(this.credRepo.create(data));
  }

  async deleteByLawyerId(lawyerId: string): Promise<void> {
    await this.credRepo.delete({ lawyerId });
  }

  async upsertTranslation(
    data: Partial<LawyerCredentialTranslation>,
  ): Promise<LawyerCredentialTranslation> {
    return this.transRepo.save(this.transRepo.create(data));
  }
}
