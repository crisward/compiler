var SourceMapGenerator = require('source-map').SourceMapGenerator

module.exports = {
  
  mapper:function(from,to){
    // explode the source into lines
    var maplines = []
    var lines = from.split(/[\r\n]/)
    var offset = 0
    lines.forEach(function(line,idx){
      var indent = line.match(/^\s*/)[0].length
      var find = line.replace(/^\s*/, '')
      if(indent < 0) indent = 0
      var column = to.indexOf(find)
      if(column < 0) column = 0
      maplines.push({ original:{ line: idx+1, column:indent}, generated: {line:1, column:column + offset }})
      to = to.substring(column)
      offset += column
    })
    this.maplines = maplines
  },
  
  createMap:function(src,file){
    var map = new SourceMapGenerator({
      file: file
    })
    //map.setSourceContent("module-one.scm",fs.readFileSync("path/to/module-one.scm"))
    this.maplines.forEach(function(mapline){
      mapline.source = src
      map.addMapping(mapline)
    })
    return '//# sourceMappingURL=data:application/json;charset=utf-8;base64,' + new Buffer(map.toString()).toString('base64')
  }
}
// map.addMapping({
//   source: "test.tag",
//   original: {line: 33,column: 2},
//   generated: {line: 10,column: 35}
// })

//  console.log(map.toString())