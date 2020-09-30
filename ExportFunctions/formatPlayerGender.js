function formatPlayerGender(string) {
    string === "Male" ? string = "M" : string = "F";
    return string;
}

module.exports = formatPlayerGender;