var chroma = require("chroma-js");
const colors = chroma.scale(["green", "red"]).padding([0.3, 0])
/*
  scale of colors  0 0.5 1
  0 = 0
  0.5 = 50
  1 = 1000


  For <= 50
  50 - 0.5
  number -  x
  x = (number*0.5)/50


  for <= 1000
  1000 - 0.5
  number -  x
  x = (number*0.5)/50 + 0.5
*/


module.exports =  function( number ) {
  console.log(number)
  if(number <= 50) return colors((number*0.5)/50)
  return colors((number*0.5)/50 + 0.5)
}