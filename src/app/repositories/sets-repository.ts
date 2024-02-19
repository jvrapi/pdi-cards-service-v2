import { Set } from '~/app/entities/set';

export abstract class SetsRepository {
  abstract getAllSets(): Promise<Set[]>;
  abstract create(set: CreateSetParams): Promise<void>;
  abstract getById(id: string): Promise<Set | null>;
}
