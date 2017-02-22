var assert = require('assert')
var BHeap = require('.').BinaryHeap
var randomInt = (min, max) => min + Math.floor( (max-min)*Math.random() )

describe('Binary Heap', function() {

  describe('create a min heap by default', function() {
    it('should sort an array in incrementing order', function() {
      var unsorted = [...Array(10).keys()].map(k => randomInt(0, 100))
      var heap = new BHeap(unsorted)

      var sorted = []
      while (! heap.isEmpty()) {
        sorted.push(heap.pop())
      }

      assert.deepEqual(sorted, unsorted.sort( (n1, n2) => n1 - n2 ))
    })
  })

})
