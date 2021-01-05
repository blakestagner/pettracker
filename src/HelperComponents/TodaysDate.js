

export function TodaysDate() {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    return (
        `${year}-${
            month < 10 ? `0${month}`: month}-${
            day < 10 ? `0${day}` : day}`
    )
}

export function TwoDaysAgo() {
        var twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 1);
        var year = twoDaysAgo.getFullYear();
        var month = twoDaysAgo.getMonth() + 1;
        var day = twoDaysAgo.getDate();
        return (
            `${year}-${
                month < 10 ? `0${month}`: month}-${
                day < 10 ? `0${day}` : day}`
        )
        
}
export function SevenDaysAgo() {
    var sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    var year = sevenDaysAgo.getFullYear();
    var month = sevenDaysAgo.getMonth() + 1;
    var day = sevenDaysAgo.getDate();
    return (
        `${year}-${
            month < 10 ? `0${month}`: month}-${
            day < 10 ? `0${day}` : day}`
    )
    
}
export function FourteenDaysAgo() {
    var sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 14);
    var year = sevenDaysAgo.getFullYear();
    var month = sevenDaysAgo.getMonth() + 1;
    var day = sevenDaysAgo.getDate();
    return (
        `${year}-${
            month < 10 ? `0${month}`: month}-${
            day < 10 ? `0${day}` : day}`
    )
    
}
export function ThirtyDaysAgo() {
    var ThirtyDaysAgo = new Date();
    ThirtyDaysAgo.setDate(ThirtyDaysAgo.getDate() - 30);
    var year = ThirtyDaysAgo.getFullYear();
    var month = ThirtyDaysAgo.getMonth() + 1;
    var day = ThirtyDaysAgo.getDate();
    return (
        `${year}-${
            month < 10 ? `0${month}`: month}-${
            day < 10 ? `0${day}` : day}`
    )
    
}