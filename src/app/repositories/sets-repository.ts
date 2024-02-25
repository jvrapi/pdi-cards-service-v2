import { Set } from '~/app/entities/set';

export abstract class SetsRepository {
  abstract getAllSets(): Promise<Set[]>;
  abstract getById(id: string): Promise<Set | null>;
}
