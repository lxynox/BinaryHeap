var assert = require('assert')
var BHeap = require('.').BinaryHeap
var randInt = (min, max) => min + Math.floor( (max-min)*Math.random() )

describe('Binary Heap', function() {

  describe('> init without arguments', function() {
    var heap = new BHeap()

    describe(' isEmpty(), peek()', function() {
      it('should create an empty heap', function() {
        assert(heap.isEmpty())
        assert.equal(heap.peek(), undefined)
      })
    })

    describe(' push()', function() {
      it('should have 1 element on top of heap after push 1 element into heap', function() {
        var e = randInt(0, 10)
        heap.push(e)

        assert(!heap.isEmpty())
        assert.equal(heap.peek(), e)
      })
    })

    describe(' pop()', function() {
      it('should be empty after 1 push and 2 pop', function() {
        heap.pop()
        assert(heap.isEmpty())

        assert.equal(heap.pop(), null)
        assert(heap.isEmpty())
      })
    })

    describe(' contains(),  remove(e)', function() {
      it('should contain 5, 10 after pushing [1, 5, 10, 100] to the heap', function() {
        for (const e of [1, 5, 10, 100])
          heap.push(e)

        assert(heap.contains(5))
        assert(heap.contains(10))
        assert(!heap.contains(50))
      })

      it('should not contain 5 after 5 is removed from heap', function() {
        heap.remove(5)
        assert(!heap.contains(5))
      })
    })

  })

  describe('> init with a random integer array', function() {
    var unsorted = [...Array(10).keys()].map(k => randInt(0, 100))
    var heap = new BHeap(unsorted)

    it('should sort an array in ascending order', function() {
      var sorted = []
      while (! heap.isEmpty()) {
        sorted.push(heap.pop())
      }

      assert.deepEqual(sorted, unsorted.sort( (n1, n2) => n1 - n2 ))
    })
  })

  describe('> init with an object array and a comparator function', function() {
    var objs = [
      {'id': 'z'},
      {'id': 'a'},
      {'id': 'x'}
    ]
    var cmp = (o1, o2) => o2.id - o1.id
    var heap = new BHeap(objs, cmp)

    it('should sort the object array in descending order', function() {
      var sorted = []
      while (! heap.isEmpty()) {
        sorted.push(heap.pop().id)
      }

      assert.deepEqual(sorted, objs.map(o => o.id).sort().reverse())
    })
  })
})
