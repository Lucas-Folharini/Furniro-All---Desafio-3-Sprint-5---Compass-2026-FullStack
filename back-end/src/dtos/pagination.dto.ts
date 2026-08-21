export class PaginationDto<T> {
  constructor(
    public readonly data: T[],
    public readonly page: number,
    public readonly limit: number,
    public readonly totalItems: number,
    public readonly totalPages: number
  ) {}
}
