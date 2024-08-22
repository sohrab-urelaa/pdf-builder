function formatDateString(dateString) {
    const isoString = dateString.slice(0, -2);
    const date = new Date(isoString);

    const optionsDate = { year: "numeric", month: "long" }; // June 2024
    const optionsTime = { hour: "numeric", minute: "numeric", hour12: true }; // 5:33 AM

    const formattedDate = new Intl.DateTimeFormat("en-US", optionsDate).format(
        date
    );
    const formattedTime = new Intl.DateTimeFormat("en-US", optionsTime).format(
        date
    );
    return `${date.getDate()} ${formattedDate} At ${formattedTime}`;
}

export default formatDateString;
