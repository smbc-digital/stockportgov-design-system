function findRecursively(arrElements, aNode) { // recursive function to traverse DOM
  var regexPattern = new RegExp('-fileSizeError*');
  
  if (!aNode)
      return;
  if (aNode.id !== undefined && aNode.id.search(regexPattern) != -1)
      arrElements.push(aNode);  // FOUND ONE!
  for (var idx in aNode.childNodes) // search children...
      findRecursively(arrElements, aNode.childNodes[idx]);
};

function getElementsByRegex () {
  var arrElements = [];   // to accumulate matching elements
  findRecursively(arrElements, document); // initiate recursive matching
  return arrElements; // return matching elements
};

function ValidateSize (file) {
  var FileSize = file.files[0].size / 1024 / 1024 // in MB
  var sizeValidation = document.getElementById(file.id + '-fileSizeError')
  var next = document.getElementsByClassName('govuk-button')
  var input = document.getElementById(file.id)
  var validation = document.getElementById(file.id + '-error')
  if (FileSize > 23) {
    if (validation !== null) {
      validation.remove()
    }
    sizeValidation.style.display = 'block'
    next[0].disabled = true
    input.setAttribute('aria-describedby', file.id + '-fileSizeError')
  } else {
    sizeValidation.style.display = 'none'
    input.removeAttribute('aria-describedby')
    var fileSizeErrors = getElementsByRegex()
    var errorCount = 0
    for (var i = 0; i < fileSizeErrors.length; i++) {
      if (fileSizeErrors[i].style.display === 'block') {
        errorCount++
      }
    }
    if (errorCount <= 0) next[0].disabled = false
  }
}

export default ValidateSize
