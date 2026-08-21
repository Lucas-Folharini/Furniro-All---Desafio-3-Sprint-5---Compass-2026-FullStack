export class QueryDto {
  page = 1;
  limit = 10;

  protected static positiveInteger(value: unknown, fallback: number): number {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
  }

  protected setPagination(query: Record<string, unknown>): void {
    this.page = QueryDto.positiveInteger(query.page, 1);
    this.limit = Math.min(QueryDto.positiveInteger(query.limit, 10), 100);
  }
}
