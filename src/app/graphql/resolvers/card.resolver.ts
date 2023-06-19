import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Card } from '../entities/card';
import { GetCardsService } from '../services/get-cards.service';
import { GetCardsArgs } from '../args/get-cards';
import { Card as CardEntity } from '~/app/entities/card';
import { Face } from '../entities/face';

@Resolver(() => Card)
export class CardResolver {
  constructor(private readonly getCardsService: GetCardsService) {}
  @Query(() => [Card])
  async cards(@Args() args: GetCardsArgs) {
    const { filters } = args;
    const cards = await this.getCardsService.execute(filters);
    return cards;
  }

  @ResolveField(() => [String])
  colors(@Root() card: CardEntity) {
    return card.colors.map((color) => color.value);
  }

  @ResolveField(() => [String])
  formats(@Root() card: CardEntity) {
    return card.formats.map((format) => format.value);
  }

  @ResolveField(() => [String])
  versions(@Root() card: CardEntity) {
    return card.versions.map((version) => version.value);
  }

  @ResolveField(() => String)
  type(@Root() card: CardEntity) {
    return card.typeLine;
  }

  @ResolveField(() => [Face])
  faces(@Root() card: CardEntity) {
    card.faces?.map((face) => ({
      id: face.id,
      name: face.name,
      type: face.typeLine,
      colors: face.colors.map((color) => color.value),
      imageUri: face.imageUri,
    }));
  }
}
