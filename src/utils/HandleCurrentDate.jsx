export const getCurrentDateTime = () => {
    const dateObj = new Date();
    
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format

    const formattedDateTime = `${day}-${month}-${year} ${formattedHours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amOrPm}`;
    return formattedDateTime;
};