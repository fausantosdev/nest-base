export abstract class Crypt {
  abstract hash(text: string): Promise<string>
  abstract compare(text: string, hash: string): Promise<boolean>
  abstract random(): string
}
