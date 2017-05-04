//exporta el objeto module.exports
module.exports = {
   // "IP":'127.0.0.1' || process.env.IP,
    "IP": process.env.IP || '0.0.0.0',
    "PORT":process.env.PORT || '3000',
    "color_theme": {
        "info":"rainbow",
        "data":"green",
        "error":"red",
        "warning":"yellow"
    },//estatico
    "STATIC_PATCH":"./static",
    "dbStringConnection":process.env.DB || "mongodb://carlos:crispin@ds131511.mlab.com:31511/condominio"
};