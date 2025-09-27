export interface PokemonResponse {
  count:    number;
  next:     string;
  previous: string;
  results:  Result[];
  error?: string;
}

export interface Result {
  name: string;
  url:  string;
}
