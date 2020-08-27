import 'govuk-frontend/govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind'

var MAX_FILE_SIZE = 23

function FileUpload ($module) {
  this.$module = $module
}

/**
* When a file is selected via a html input of type file, This will validate that the file
* selected is not over 23Mb
*/
FileUpload.prototype.validateFileSize = function (event) {
  var target = event.target
  var FileSize = target.files[0].size / 1024 / 1024
  var sizeValidation = document.getElementById(target.id + '-fileSizeError')
  var next = document.getElementsByClassName('govuk-button')
  var input = document.getElementById(target.id)
  var validation = document.getElementById(target.id + '-error')
  if (FileSize > MAX_FILE_SIZE) {
    if (validation !== null) {
      validation.remove()
    }
    sizeValidation.style.display = 'block'
    next[0].disabled = true
    input.setAttribute('aria-describedby', target.id + '-fileSizeError')
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

function findRecursively (arrElements, aNode) {
  var regexPattern = new RegExp('-fileSizeError*')

  if (!aNode) return
  if (aNode.id !== undefined && aNode.id.search(regexPattern) !== -1) {
    arrElements.push(aNode)
  }
  for (var idx in aNode.childNodes) {
    findRecursively(arrElements, aNode.childNodes[idx])
  }
};

function getElementsByRegex () {
  var arrElements = []
  findRecursively(arrElements, document)
  return arrElements
};

/**
* Initialise an event listener for onchange on the element
*/
FileUpload.prototype.init = function () {
  this.$module.addEventListener('change', this.validateFileSize)
}

export default FileUpload
