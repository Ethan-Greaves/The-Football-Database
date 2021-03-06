/* eslint-disable prettier/prettier */
const countryFlags = {
    Afghanistan:                    "https://cdn.countryflags.com/thumbs/afghanistan/flag-wave-250.png",
    Albania:                        "https://cdn.countryflags.com/thumbs/albania/flag-wave-250.png",
    Algeria:                        "https://cdn.countryflags.com/thumbs/algeria/flag-wave-250.png",
    Andorran:                       "https://cdn.countryflags.com/thumbs/andorra/flag-wave-250.png",
    Angola:                         "https://cdn.countryflags.com/thumbs/angola/flag-wave-250.png",
    Argentina:                      "https://cdn.countryflags.com/thumbs/argentina/flag-wave-250.png",
    Armenia:                        "https://cdn.countryflags.com/thumbs/armenia/flag-wave-250.png",
    Australia:                      "https://cdn.countryflags.com/thumbs/australia/flag-wave-250.png",
    Austria:                        "https://cdn.countryflags.com/thumbs/austria/flag-wave-250.png",
    Azerbaijan:                     "https://cdn.countryflags.com/thumbs/azerbaijan/flag-wave-250.png",
    Bahamas:                        "https://cdn.countryflags.com/thumbs/bahamas/flag-wave-250.png",
    Bahrain:                        "https://cdn.countryflags.com/thumbs/bahrain/flag-wave-250.png",
    Bangladesh:                     "https://cdn.countryflags.com/thumbs/bangladesh/flag-wave-250.png",
    Barbados:                       "https://cdn.countryflags.com/thumbs/barbados/flag-wave-250.png",
    Belarus:                        "https://cdn.countryflags.com/thumbs/belarus/flag-wave-250.png",
    Belgium:                        "https://cdn.countryflags.com/thumbs/belgium/flag-wave-250.png",
    Belize:                         "https://cdn.countryflags.com/thumbs/belize/flag-wave-250.png",
    Benin:                          "https://cdn.countryflags.com/thumbs/benin/flag-wave-250.png",
    Bhutan:                         "https://cdn.countryflags.com/thumbs/bhutan/flag-wave-250.png",
    "Bosnia-Herzegovina":           "https://cdn.countryflags.com/thumbs/bosnia-and-herzegovina/flag-wave-250.png",
    Botswana:                       "https://cdn.countryflags.com/thumbs/botswana/flag-wave-250.png",
    Brazil:                         "https://cdn.countryflags.com/thumbs/brazil/flag-wave-250.png",
    Brunei:                         "https://cdn.countryflags.com/thumbs/brunei/flag-wave-250.png",
    Bulgaria:                       "https://cdn.countryflags.com/thumbs/bulgaria/flag-wave-250.png",
    "Burkina-Faso":                 "https://cdn.countryflags.com/thumbs/burkina-faso/flag-wave-250.png",
    Burundi:                        "https://cdn.countryflags.com/thumbs/burundi/flag-wave-250.png",
    Cambodia:                       "https://cdn.countryflags.com/thumbs/cambodia/flag-wave-250.png",
    Cameroon:                       "https://cdn.countryflags.com/thumbs/cameroon/flag-wave-250.png",
    Canada:                         "https://cdn.countryflags.com/thumbs/canada/flag-wave-250.png",
    Chad:                           "https://cdn.countryflags.com/thumbs/chad/flag-wave-250.png",
    Chile:                          "https://cdn.countryflags.com/thumbs/chile/flag-wave-250.png",
    China:                          "https://cdn.countryflags.com/thumbs/china/flag-wave-250.png",
    Colombia:                       "https://cdn.countryflags.com/thumbs/colombia/flag-wave-250.png",
    Comoros:                        "https://cdn.countryflags.com/thumbs/comoros/flag-wave-250.png",
    "Costa-Rica":                   "https://cdn.countryflags.com/thumbs/costa-rica/flag-wave-250.png",
    Croatia:                        "https://cdn.countryflags.com/thumbs/croatia/flag-wave-250.png",
    Cuba:                           "https://cdn.countryflags.com/thumbs/cuba/flag-wave-250.png",
    Cyprus:                         "https://cdn.countryflags.com/thumbs/cyprus/flag-wave-250.png",
    "Czech Republic":               "https://cdn.countryflags.com/thumbs/czech-republic/flag-wave-250.png",
    Denmark:                        "https://cdn.countryflags.com/thumbs/denmark/flag-wave-250.png",
    Ecuador:                        "https://cdn.countryflags.com/thumbs/ecuador/flag-wave-250.png",
    Egypt:                          "https://cdn.countryflags.com/thumbs/egypt/flag-wave-250.png",
    England:                        "https://cdn.countryflags.com/thumbs/england/flag-wave-250.png",
    Estonia:                        "https://cdn.countryflags.com/thumbs/estonia/flag-wave-250.png",
    Ethiopia:                       "https://cdn.countryflags.com/thumbs/ethiopia/flag-wave-250.png",
    Finland:                        "https://cdn.countryflags.com/thumbs/finland/flag-wave-250.png",
    France:                         "https://cdn.countryflags.com/thumbs/france/flag-wave-250.png",
    Gabon:                          "https://cdn.countryflags.com/thumbs/gabon/flag-wave-250.png",
    Georgia:                        "https://cdn.countryflags.com/thumbs/georgia/flag-wave-250.png",
    Germany:                        "https://cdn.countryflags.com/thumbs/germany/flag-wave-250.png",
    Ghana:                          "https://cdn.countryflags.com/thumbs/ghana/flag-wave-250.png",
    Greece:                         "https://cdn.countryflags.com/thumbs/greece/flag-wave-250.png",
    Guinea:                         "https://cdn.countryflags.com/thumbs/guinea/flag-wave-250.png",
    Hungary:                        "https://cdn.countryflags.com/thumbs/hungary/flag-wave-250.png",
    Iceland:                        "https://cdn.countryflags.com/thumbs/iceland/flag-wave-250.png",
    India:                          "https://cdn.countryflags.com/thumbs/india/flag-wave-250.png",
    Ireland:                        "https://cdn.countryflags.com/thumbs/ireland/flag-wave-250.png",
    Italy:                          "https://cdn.countryflags.com/thumbs/italy/flag-wave-250.png",
    "Ivory Coast":                  "https://cdn.countryflags.com/thumbs/cote-d-ivoire/flag-wave-250.png",
    Jamaica:                        "https://cdn.countryflags.com/thumbs/jamaica/flag-wave-250.png",
    Japan:                          "https://cdn.countryflags.com/thumbs/japan/flag-wave-250.png",
    "South Korea":                  "https://cdn.countryflags.com/thumbs/south-korea/flag-wave-250.png",
    Lithuania:                      "https://cdn.countryflags.com/thumbs/lithuania/flag-wave-250.png",
    Macedonia:                      "https://cdn.countryflags.com/thumbs/macedonia/flag-wave-250.png",
    Mexico:                         "https://cdn.countryflags.com/thumbs/mexico/flag-wave-250.png",
    Moldova:                        "https://cdn.countryflags.com/thumbs/moldova/flag-wave-250.png",
    Morocco:                        "https://cdn.countryflags.com/thumbs/morocco/flag-wave-250.png",
    Netherlands:                    "https://cdn.countryflags.com/thumbs/netherlands/flag-wave-250.png",
    Nigeria:                        "https://cdn.countryflags.com/thumbs/nigeria/flag-wave-250.png",
    Norway:                         "https://cdn.countryflags.com/thumbs/norway/flag-wave-250.png",
    Panama:                         "https://cdn.countryflags.com/thumbs/panama/flag-wave-250.png",
    Paraguay:                       "https://cdn.countryflags.com/thumbs/paraguay/flag-wave-250.png",
    Peru:                           "https://cdn.countryflags.com/thumbs/peru/flag-wave-250.png",
    Poland:                         "https://cdn.countryflags.com/thumbs/poland/flag-wave-250.png",
    Portugal:                       "https://cdn.countryflags.com/thumbs/portugal/flag-wave-250.png",
    Romania:                        "https://cdn.countryflags.com/thumbs/romania/flag-wave-250.png",
    Russia:                         "https://cdn.countryflags.com/thumbs/russia/flag-wave-250.png",
    Senegal:                        "https://cdn.countryflags.com/thumbs/senegal/flag-wave-250.png",
    Serbia:                         "https://cdn.countryflags.com/thumbs/serbia/flag-wave-250.png",
    Slovakia:                       "https://cdn.countryflags.com/thumbs/slovakia/flag-wave-250.png",
    Slovenia:                       "https://cdn.countryflags.com/thumbs/slovenia/flag-wave-250.png",
    Spain:                          "https://cdn.countryflags.com/thumbs/spain/flag-wave-250.png",
    Sweden:                         "https://cdn.countryflags.com/thumbs/sweden/flag-wave-250.png",
    Switzerland:                    "https://cdn.countryflags.com/thumbs/switzerland/flag-wave-250.png",
    Tunisia:                        "https://cdn.countryflags.com/thumbs/tunisia/flag-wave-250.png",
    Turkey:                         "https://cdn.countryflags.com/thumbs/turkey/flag-wave-250.png",
    Ukraine:                        "https://cdn.countryflags.com/thumbs/ukraine/flag-wave-250.png",
    "United States":                "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-wave-250.png",
    USA:                            "https://cdn.countryflags.com/thumbs/united-states-of-america/flag-wave-250.png",
    Uruguay:                        "https://cdn.countryflags.com/thumbs/uruguay/flag-wave-250.png",
    "United Kingdom":               "https://cdn.countryflags.com/thumbs/united-kingdom/flag-wave-500.png",
    Venezuela:                      "https://cdn.countryflags.com/thumbs/venezuela/flag-wave-250.png",
    Scotland:                       "https://cdn.countryflags.com/thumbs/scotland/flag-wave-250.png",
    "Northern Ireland":             "https://cdn.countryflags.com/thumbs/northern-ireland/flag-wave-250.png",
    Wales:                          "https://cdn.countryflags.com/thumbs/wales/flag-wave-250.png"
}


module.exports = countryFlags;