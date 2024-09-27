export const formatTimeToString = (time) => {
    if (time != undefined) {
        let timeString = time.toString();
        timeString = timeString.split(':');

        if (timeString[0][0] == 0) {
            //timeString[0].replace(/^0+/, '!');
            timeString[0] = +timeString[0];
        }

        return `${timeString[0]}:${timeString[1]}`;
    } else {
        return '';
    }   
};

export const validateEmail = (email) => {
    alert(email);
};