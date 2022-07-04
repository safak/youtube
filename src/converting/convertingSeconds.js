export const convertingSeconds = (seconds) => {
    
    seconds = Number(seconds);
    
    const day = Math.floor(seconds / (3600 * 24));
    const hour = Math.floor(seconds % (3600 *24) / (3600));
    const minute = Math.floor(seconds % 3600 / 60);

    const dayShow = day > 0 ? day + (day === 1 ? "day" : "days") : "";
    const hourShow = hour > 0 ? hour + (hour === 1 ? "hour" : "hours") : "";
    const minuteShow = minute > 0 ? minute + (minute === 1 ? "minute" : "minutes") : "";

    return dayShow + hourShow + minuteShow;

};