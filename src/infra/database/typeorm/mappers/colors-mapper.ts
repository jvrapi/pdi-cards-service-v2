import { Color } from '~/app/entities/color';

export class ColorsMapper {
  static toDomain(color: Color): Color {
    return new Color({
      id: color.id,
      name: color.name,
      color: color.color,
      createdAt: color.createdAt,
      updatedAt: color.updatedAt,
    });
  }
}
