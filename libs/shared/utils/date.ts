const MS_IN_DAY = 24 * 60 * 60 * 1000;

const todayPlusDays = (days: number) => new Date(Date.now() + days * MS_IN_DAY);

export { todayPlusDays };
