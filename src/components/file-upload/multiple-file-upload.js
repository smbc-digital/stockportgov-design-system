import 'govuk-frontend/govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind'

var INPUT_FILE_ERROR_CLASS = 'smbc-input--file-error'
var FORM_GROUP_ERROR_CLASS = 'govuk-form-group--error'
var INPUT_ERROR_CLASS = 'govuk-input--error'

function MultipleFileUpload ($module) {
  this.$module = $module
}

/**
* When a file is selected via a html input of type file, This will validate that the file
* selected is not over the specified max file size
*/
MultipleFileUpload.prototype.validateFileSize = function (event) {
  var target = event.target
  var sizeValidation = document.getElementById(target.id + '-fileSizeError')
  var formGroup = document.getElementById('multiple-file-upload-form-group')
  var input = document.getElementById(target.id)
  var validation = document.getElementById(target.id + '-error')
  var errorText = '<span class="govuk-visually-hidden"Error:></span> '
  var allValid = true
  var maxFileSize = target.getAttribute('data-individual-file-size')
  var readableMaxFileSize = (maxFileSize / 1024000).toFixed(0) + 'MB'

  for (var index = 0; index < target.files.length; index++) {
    var fileSize = target.files[index].size

    if (fileSize > maxFileSize) {
      if (validation !== null) {
        validation.remove()
      }
      sizeValidation.style.display = 'block'
      input.setAttribute('aria-describedby', target.id + '-fileSizeError')
      sizeValidation.setAttribute('style', 'white-space: pre-line;')
      if (target.files.length === 1) {
        errorText += 'The selected file must be smaller than ' + readableMaxFileSize
      } else {
        errorText += target.files[index].name + ' must be smaller than ' + readableMaxFileSize + '\r\n'
      }
      allValid = false
      formGroup.classList.add(FORM_GROUP_ERROR_CLASS)
    }
  }

  sizeValidation.innerHTML = errorText

  if (allValid) {
    sizeValidation.style.display = 'none'
    if (validation !== null) {
      validation.remove()
    }
    input.removeAttribute('aria-describedby')

    if (input.classList.contains(INPUT_ERROR_CLASS)) {
      input.classList.remove(INPUT_ERROR_CLASS)
    }

    if (input.classList.contains(INPUT_FILE_ERROR_CLASS)) {
      input.classList.remove(INPUT_FILE_ERROR_CLASS)
    }

    if (formGroup.classList.contains(FORM_GROUP_ERROR_CLASS)) {
      formGroup.classList.remove(FORM_GROUP_ERROR_CLASS)
    }
  }
}

/**
* Initialise an event listener for onchange on the element
*/
MultipleFileUpload.prototype.init = function () {
  this.$module.addEventListener('change', this.validateFileSize)
}

export default MultipleFileUpload
