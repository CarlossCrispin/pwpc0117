//exporta el objeto module.exports
module.exports = {
   "IP":'127.0.0.1' || process.env.IP,
    //"IP": process.env.IP || '127.0.0.1',
   "IP": process.env.IP || '0.0.0.0',
    "color_theme": {
        "info":"rainbow",
        "data":"green",
        "error":"red",
        "warning":"yellow"
    },//estatico
    "STATIC_PATCH":"./static",
    "dbStringConnection":process.env.DB || "mongodb://localhost:27017/bodega"
};