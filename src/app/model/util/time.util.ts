const OneSecondInMS = 1000;
const OneMinuteInMS = 60 * OneSecondInMS;
const OneHourInMS = 60 * OneMinuteInMS;
const OneDayInMS = 24 * OneHourInMS;

export class TimeUtil {
    public static get chicagoToday(): string {
        return this.chicagoDateString();
    }

    public static get chicagoDateStringWeekAgo(): string {
        const date = new Date();
        date.setDate(date.getDate() - 6);
        return this.chicagoDateString(date.getTime());
    }

    public static chicagoDateString(time: number = Date.now()): string {
        const date = new Date();
        return new Date(time - OneMinuteInMS * date.getTimezoneOffset())
            .toISOString()
            .slice(0, 10);
    }

    public static chicagoTimeString(time: number = Date.now()): string {
        const date = new Date();
        return new Date(time - OneMinuteInMS * date.getTimezoneOffset())
            .toISOString()
            .slice(11, 16);
    }

    public static getTimeStamp(dateString: string): Number {
        const date = new Date(dateString);
        return date.getTime();
    }
}
