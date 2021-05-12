export interface Crumb {
  text: string;
  url?: string;
  child?: Crumb[];
}
