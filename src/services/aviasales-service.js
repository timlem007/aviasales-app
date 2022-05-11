export default class AviasalesService {
  GET_SEARCH = 'https://aviasales-test-api.kata.academy/';

  getSearchId = async () => {
    try {
      const res = await fetch(`${this.GET_SEARCH}search`);
      if (!res.ok) {
        throw new Error(`Could not fetch getSearchId, received ${res.status}`);
      }
      const inText = await res.json();
      this.searchId = inText.searchId;
      return this.searchId;
    } catch {
      throw new Error();
    }
  };

  getTickets = async () => {
    const res = await fetch(`${this.GET_SEARCH}tickets?searchId=${this.searchId}`);
    if (!res.ok) return this.getTickets();
    return res.json();
  };
}
