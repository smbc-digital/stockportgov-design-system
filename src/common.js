/**
 * TODO: Ideally this would be a NodeList.prototype.forEach polyfill
 * This seems to fail in IE8, requires more investigation.
 * See: https://github.com/imagitama/nodelist-foreach-polyfill
 */
export function nodeListForEach (nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback)
  }
  for (var i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes)
  }
}

/**
 * Remove the class if it does exist
 *
 * @param {Element}
 */
export function _removeClass ($element, classToRemove) {
  if ($element.className !== undefined) {
    var classList = $element.className.split(' ')
    for (var x = 0; x < classList.length; x++) {
      var className = classList[x]
      if (className === classToRemove) {
        classList[x] = ''
      }
    }
    $element.className = classList.join(' ')
  }
}

/**
 * Add the class if it doesn't exist
 *
 * @param {Element}
 */
export function _addClass ($element, classToAdd) {
  if ($element.className !== undefined) {
    var classList = $element.className.split(' ')
    var exists = false
    for (var x = 0; x < classList.length; x++) {
      var className = classList[x]
      if (className === classToAdd) {
        exists = true
      }
    }

    if (!exists) {
      $element.className = classList.join(' ') + ' ' + classToAdd
    }
  } else {
    $element.className = classToAdd
  }
}
