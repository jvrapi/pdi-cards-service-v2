import { Color, ColorName } from '~/app/entities/color';

export class MessagingColorsMapper {
  static toDomain(color: string[]): Color[] {
    if (color.length) {
      return color.map(
        (name) => new Color(ColorName[name as keyof typeof ColorName]),
      );
    }

    return [];
  }
}
