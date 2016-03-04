/* eslint-env mocha */
/*global expect */

var sourcemaps = require('../../src/sourcemaps')
var before = '  <ul id="treeview">\n' +
             '    <li>\n' +
             '      <treeitem data="0}"></treeitem>\n' +
             '    </li>\n' +
             '  </ul>'
var after = '<ul id="treeview"> <li> <treeitem data="0}"></treeitem> </li> </ul>'

describe('Souremaps mapper', function () {

  it('line 1', function () {
    var lines = sourcemaps.mapper(before, after)

    expect(lines[0].original).to.eql({ line: 0, column: 2 })
    expect(lines[0].generated).to.eql({ line: 0, column: 0 })
  })

  it('line 2', function () {
    var lines = sourcemaps.mapper(before, after)

    expect(lines[1].original).to.eql({ line: 1, column: 4 })
    expect(lines[1].generated).to.eql({ line: 0, column: 19 })
  })

  it('line 3', function () {
    var lines = sourcemaps.mapper(before, after)

    expect(lines[2].original).to.eql({ line: 2, column: 6 })
    expect(lines[2].generated).to.eql({ line: 0, column: 24 })
  })

  it('line 4', function () {
    var lines = sourcemaps.mapper(before, after)

    expect(lines[3].original).to.eql({ line: 3, column: 4 })
    expect(lines[3].generated).to.eql({ line: 0, column: 56 })
  })
})
