export class NFLTeam {
	city: string;
	mascot: string;

	static alphabetical(a, b) {
		if (a.city < b.city)
			return -1;
		if (a.city > b.city)
			return 1;
		return 0;
	}
}