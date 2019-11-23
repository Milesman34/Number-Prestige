//Removes the identifier from the element name
const removeIdentifier = elementName => ["#", "."].includes(elementName[0]) ?
    elementName.slice(1, elementName.length) :
    elementName;

//Capitalizes a word
const capitalizeWord = str => str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();

//Capitalizes a phrase
const capitalizePhrase = str => str.split(" ").map(capitalizeWord).join(" ");

//Rounds a number to a given number of decimal places
const roundTo = (num, places = 0) =>
	Math.round(num * 10 ** places) / (10 ** places);

//Formats a number in exponential format (if over the requirement)
const formatSci = (num, limit = 1e6, places = 2) => {
	if (num >= limit) {
        //Splits the orders of magnitude and the amount before it to format it
		let oom = Math.floor(Math.log10(num));
		let div = roundTo(num / (10 ** oom), places);

		return `${div}e${oom}`;
	} else
		return num.toString();
}

//Attempts to get an item from local storage
//If it does not exist, it sets the item
const lsGetOrSetDefault = (item, def) => {
    if (localStorage.getItem(item) === null)
        localStorage.setItem(item, def);

    return localStorage.getItem(item);
}
