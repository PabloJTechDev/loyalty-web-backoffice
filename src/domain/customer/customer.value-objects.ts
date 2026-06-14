// Customer domain value objects — pure TypeScript, no framework dependencies

export class CustomerId {
  private constructor(readonly value: string) {}

  static of(value: string): CustomerId {
    if (!value) throw new Error(`Invalid CustomerId: ${value}`)
    return new CustomerId(value)
  }

  equals(other: CustomerId): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
