export enum Time {
    Milliseconds = 'milliseconds',
    Seconds = 'seconds',
    Minutes = 'minutes',
    Hours = 'hours'
}

export namespace Time {
    export function getDaysIn(unit: Time, days: string): number {
        const match = days.match(/^(\d+)\s*(\w+)$/);
        if (!match) {
            throw new Error('Invalid days format. Please provide a days in the format like "365 days".');
        }

        const [, num, unitStr] = match;
        const noOfDays = parseInt(num);
        const milliseconds = noOfDays * 24 * 60 * 60 * 1000;

        switch (unit) {
            case Time.Milliseconds:
                return milliseconds;
            case Time.Seconds:
                return milliseconds / 1000;
            case Time.Minutes:
                return milliseconds / (1000 * 60);
            case Time.Hours:
                return milliseconds / (1000 * 60 * 60);
            default:
                return 0;
        }
    }
}
