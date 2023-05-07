import { Injectable, Logger } from '@nestjs/common';
import { SetsRepository } from '~/infra/database/repositories/sets-repository';

@Injectable()
export class GetAllSetsService {
  private logger = new Logger(GetAllSetsService.name);
  constructor(private readonly setsRepository: SetsRepository) {}

  async execute() {
    try {
      return this.setsRepository.getAllSets();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
