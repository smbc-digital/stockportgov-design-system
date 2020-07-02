function findRecursively (aNode, regularExpression) {
  var arrElements = [] // to accumulate matching elements

  // recursive function to traverse DOM
  if (!aNode) return
  if (aNode.id !== undefined && aNode.id.search(regularExpression) !== -1) {
    arrElements.push(aNode) // FOUND ONE!
  }

  for (var idx in aNode.childNodes) { // search children...
    findRecursively(aNode.childNodes[idx])
  }
}

function GetElementsByRegex (pattern) {
  var regularExpression = new RegExp(pattern) // the regex to match with

  var arrElements = findRecursively(document, regularExpression) // initiate recursive matching
  return arrElements // return matching elements
}

function ValidateSize (file) {
  var FileSize = file.files[0].size / 1024 / 1024 // in MB
  var sizeValidation = document.getElementById(file.id + '-fileSizeError')
  var next = document.getElementById('submit')
  var input = document.getElementById(file.id)
  var validation = document.getElementById(file.id + '-error')
  if (FileSize > 23) {
    if (validation !== null) {
      validation.remove()
    }
    sizeValidation.style.display = 'block'
    next.disabled = true
    input.setAttribute('aria-describedby', file.id + '-fileSizeError')
  } else {
    sizeValidation.style.display = 'none'
    input.removeAttribute('aria-describedby')
    var fileSizeErrors = GetElementsByRegex('-fileSizeError*')
    var errorCount = 0
    for (var i = 0; i < fileSizeErrors.length; i++) {
      if (fileSizeErrors[i].style.display === 'block') {
        errorCount++
      }
    }
    if (errorCount <= 0) next.disabled = false
  }
}

export default ValidateSize
