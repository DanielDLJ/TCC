var chroma = require("chroma-js");

const pHUniversalIndicator = chroma.scale([
    "#cd1719", // firebrick
    "#d92521", //crimson
    "#ed6a18", //chocolate
    "#f5990d", //orange
    "#dec401", //gold 
    "#bdc403", //goldenrod
    "#92c020", //yellowgreen
    "#40a535", //limegreen
    "#609bb5", //cadetblue
    "#6499d2", //cornflowerblue
    "#3869b1", //steelblue
    "#2e4c9b", //darkslateblue
    "#41348b", //darkslateblue
    "#422985", //darkslateblue
    "#61257d" //darkslateblue
]);

const pHscale = chroma.scale([
    "red", // ff1717
    "orangered", //fe4e15
    "darkorange", //ff7e07
    "sandybrown", //fdbc58
    "khaki", // ffde59
    "darkkhaki", //c9e165
    "yellowgreen", // 7ed956
    "seagreen", //0bb755
    "darkturquoise", //0abebd
    "lightseagreen", //0291be
    "cornflowerblue", //57aefe
    "royalblue", //5666ff
    "mediumslateblue", //a056ff
    "mediumorchid", //ce57ff
    "violet" //#fb55fd
  ]);


module.exports =  pHUniversalIndicator