import { Set } from '~/app/entities/set';
import { NewSet } from '../types/new-set';
import { MessagingCardMapper } from './messaging-card-mapper';

export class MessagingSetMapper {
  static toDomain(newSet: NewSet) {
    const set = new Set({
      id: newSet.id,
      iconUri: newSet.iconUri,
      code: newSet.code,
      name: newSet.name,
      type: newSet.type,
      releasedAt: newSet.releasedAt,
      isDigital: newSet.isDigital,
      isFoilOnly: newSet.isFoilOnly,
    });

    if (newSet.cards?.length) {
      set.cards = newSet.cards.map(MessagingCardMapper.toDomain);
    }

    return set;
  }
}
