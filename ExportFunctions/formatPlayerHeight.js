function formatPlayerHeight(string) {
    if (string != "") {
        words = string.split(" ");
        const heightInMetres = words[0];

        //*No player has a height greater than 2 metres, if it is then we know that the ft height is being displayed first
        if (heightInMetres > 2) {
            //*The height in metres is conatined within brackets so use match to extract it
            heightInsideBrackets = string.match(/\((.*)\)/);
            let heightInMetres = heightInsideBrackets[1];
            //*Remove any whitespace from the string
            heightInMetres = heightInMetres.replace(/\s+/g, '');
            return heightInMetres;
        }

        return `${heightInMetres}m`;
    }
    else
        return "N/A";
    
}


module.exports = formatPlayerHeight;