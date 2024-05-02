export const userFirstTwoLetters = (text: string) => {
    let words = text.split(' ');
    let firstLetter = words[0] ? words[0][0] : '';
    let secondLetter = words[1] ? words[1][0] : '';
    return firstLetter + secondLetter;
}