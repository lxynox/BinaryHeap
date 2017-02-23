'use strict';

(function defineBinaryHeap(global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    factory(exports)             // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory) // AMD
  } else {
    global = {}
    factory(global)              // script, wsh, asp
  }
}(this, function binaryHeapFactory(exports) {
  // implementation

  // Global namespace

  let BinaryHeap

  // ## constructor function

  BinaryHeap = function(arr = [], comparator = (n1, n2) => n1 - n2) {
    this.cmp = comparator
    this.content = [null]

    if (!Array.isArray(arr)) {
      throw new Error('use type [Object Array] for second param.')
    }

    if (arr.length > 0) {
      for (const e of arr) {
        this.push(e)
      }
    }
  }

  // ## Utilities

  BinaryHeap.prototype.__swap = function(arr, x, y) {
    const tmp = arr[x]
    arr[x] = arr[y]
    arr[y] = tmp
  }

  BinaryHeap.prototype.__lessThan = function(n1, n2) {
    return this.cmp(n1, n2) < 0
  }

  BinaryHeap.prototype.__bubble = function(index) {
    let parentIndex = index >> 1

    if (parentIndex > 0 && this.__lessThan(this.content[index], this.content[parentIndex])) {
      this.__swap(this.content, index, parentIndex)
      this.__bubble(parentIndex)
    }
  }

  BinaryHeap.prototype.__sink = function(index) {
    let minIndex = index
    let lcIndex = 2*index
    let rcIndex = 2*index+1

    if (lcIndex < this.content.length && this.__lessThan(this.content[lcIndex], this.content[minIndex])) {
      minIndex = lcIndex
    }
    if (rcIndex < this.content.length && this.__lessThan(this.content[rcIndex], this.content[minIndex])) {
      minIndex = rcIndex
    }

    if (minIndex !== index) {
      this.__swap(this.content, minIndex, index)
      this.__sink(minIndex)
    }
  }

  BinaryHeap.prototype.__pop = function(index = 1) {
    if (this.size() <= 0) {
      throw new Error('Cannot pop from an empty heap.')
    }
    if (index < 1 || index >= this.content.length) {
      throw new Error('Invalid index.')
    }

    let ret = this.content[index]
    let leaf = this.content.pop()

    if (index < this.content.length) {
      this.content[index] = leaf
      this.__sink(index)
    }

    return ret
  }

  // ## apis

  // ### isEmpty()
  /**
   * [check if the heap is empty]
   * @return {Boolean} [is empty or not]
   */
  BinaryHeap.prototype.isEmpty = function() {
    return this.content.length === 1
  }

  // ### size()
  /**
   * [count the number of elements in current heap]
   * @return {[Number]} [size of the heap]
   */
  BinaryHeap.prototype.size = function() {
    return this.content.length - 1
  }

  // ### peek()
  /**
   * [top element of current heap]
   * @return {[Object]} [top element]
   */
  BinaryHeap.prototype.peek = function() {
    return this.content[1]
  }

  // ### push(e)
  /**
   * [push element into heap]
   * @param  {[Object]} e [element]
   */
  BinaryHeap.prototype.push = function(e) {
    const index = this.content.push(e) - 1

    this.__bubble(index)
  }

  // ### pop()
  /**
   * [remove top element from heap]
   * @return {[Object]} [removed element]
   */
  BinaryHeap.prototype.pop = function() {
    let ret = null

    try {
      ret = this.__pop()
    } catch (err) {
      console.error('Failed to pop peek element:', err)
    }

    return ret
  }

  // ### contains(e)
  /**
   * [check if contains target element]
   * @param  {[Object]} e [target element]
   * @return {[Boolean]}   [contains or not]
   */
  BinaryHeap.prototype.contains = function(e) {
    return this.content.includes(e)
  }

  // ### remove(e)
  /**
   * [remove target element from heap]
   * @param  {[Object]} e [target element]
   * @return {[Boolean]}   [removed or not]
   */
  BinaryHeap.prototype.remove = function(e) {
    let index = this.content.indexOf(e)
    let canRemove = false

    if (index === -1) {
      return canRemove
    }

    try {
      this.__pop(index)
      canRemove = true
    } catch(err) {
      console.error('Failed to remove:', err)
    }

    return canRemove
  }

  // ## Everything ready, export them
  exports.BinaryHeap = BinaryHeap
}))
