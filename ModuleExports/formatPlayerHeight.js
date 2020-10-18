function formatPlayerHeight(string) {
    if (string != "") {
        words = string.split(" ");
        let heightInMetres = words[0];

        //*No player has a height greater than 2 metres, if it is then we know that the ft height is being displayed first
        if (heightInMetres > 2) {
            //*The height in metres is conatined within brackets so use match to extract it
            heightInsideBrackets = string.match(/\((.*)\)/);
            if (heightInsideBrackets != null) {
                let heightInMetres = heightInsideBrackets[1];

                //*Remove any whitespace from the string
                heightInMetres = heightInMetres.replace(/\s+/g, '');
                return heightInMetres;
            }
            else {
                return heightInMetres = `${words[0]}${words[1]} ${words[2]}"`
            }
            
        }

        return `${heightInMetres}m`;
    }
    else
        return "N/A";
    
}


module.exports = formatPlayerHeight;