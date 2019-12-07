autors = [
    `Ramirez Scotland`,
    `Andrea Brown`,
    `Emmanuella Johnson`,
    `Islay Jimenez`,
    `Sean Arnold`,
    `Michelle Morrison`,
    `Andrina Bennett`,
    `Emil Reyes`,
    `Marvin O'Brien`,
    `Wilma O'Reilly`
]

smiles = [
    `./images/emoji/smile.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/angry.png`,
]

const getRandomIntegerNumber = (min, max) => {
    return min + Math.floor(max * Math.random());
};

const formatDate = (date) => {
    const formatDueDate = Object.fromEntries(
        new Intl.DateTimeFormat(`en-US`, {
            hourCycle: `h12`,
            day: `2-digit`,
            month: `long`,
            hour: `numeric`,
            minute: `numeric`
        })
            .formatToParts(date)
            .map((el) => [el.type, el.value])
    );
    return formatDueDate;
};

const getRandomDate = () => {
    const targetDate = new Date();
    const sign = Math.random() > 0.5 ? 1 : -1;
    const diffValue = sign * getRandomIntegerNumber(0, 7);

    targetDate.setDate(targetDate.getDate() + diffValue);
    return targetDate;
};