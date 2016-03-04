var SourceMapGenerator = require('source-map').SourceMapGenerator


var map = new SourceMapGenerator({
  file: "test.js"
})

module.exports = {
  
  mapper:function(from,to){
    // explode the source into lines
    var maps = []
    var lines = from.split(/[\r\n]/)
    var offset = 0
    lines.forEach(function(line,idx){
      var indent = line.match(/^\s*/)[0].length
      var find = line.replace(/^\s*/, '')
      if(indent < 0) indent = 0
      var column = to.indexOf(find)
      if(column < 0) column = 0
      maps.push({ original:{ line: idx, column:indent}, generated: {line:0, column:column + offset }})
      to = to.substring(column)
      offset += column
    })
    return maps
  }
}
// map.addMapping({
//   source: "test.tag",
//   original: {line: 33,column: 2},
//   generated: {line: 10,column: 35}
// })

//  console.log(map.toString())