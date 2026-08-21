import { QueryDto } from './query.dto';

export type ProductSortField = 'id' | 'price' | 'name' | 'category';
export type SortOrder = 'ASC' | 'DESC';

export class ProductQueryDto extends QueryDto {
  category?: string;
  search?: string;
  sort: ProductSortField = 'id';
  order: SortOrder = 'ASC';
  minPrice?: number;
  maxPrice?: number;

  static from(query: Record<string, unknown>): ProductQueryDto {
    const dto = new ProductQueryDto();
    dto.setPagination(query);
    dto.setSorting(query);

    const category = String(query.category ?? '').trim();
    const search = String(query.search ?? '').trim();

    if (category) dto.category = category;
    if (search) dto.search = search;

    const minPrice = Number(query.minPrice);
    const maxPrice = Number(query.maxPrice);

    if (query.minPrice !== undefined) dto.minPrice = minPrice;
    if (query.maxPrice !== undefined) dto.maxPrice = maxPrice;

    return dto;
  }

  private setSorting(query: Record<string, unknown>): void {
    const sort = String(query.sort ?? 'id');

    if (['id', 'price', 'name', 'category'].includes(sort)) {
      this.sort = sort as ProductSortField;
    }

    this.order = String(query.order)?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }
}
