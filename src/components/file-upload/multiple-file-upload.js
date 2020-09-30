import 'govuk-frontend/govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind'

var MAX_FILE_SIZE = 23

function MultipleFileUpload ($module) {
  this.$module = $module
}

/**
* When a file is selected via a html input of type file, This will validate that the file
* selected is not over 23Mb
*/
MultipleFileUpload.prototype.validateFileSize = function (event) {
  var target = event.target
  var sizeValidation = document.getElementById(target.id + '-fileSizeError')
  var formGroup = document.getElementById('multiple-file-upload-form-group')
  var input = document.getElementById(target.id)
  var validation = document.getElementById(target.id + '-error')
  var errorText = '<span class="govuk-visually-hidden"Error:></span> '
  var allValid = true

  for (var index = 0; index < target.files.length; index++) {
    var fileSize = target.files[index].size / 1024 / 1024

    if (fileSize > MAX_FILE_SIZE) {
      if (validation !== null) {
        validation.remove()
      }
      sizeValidation.style.display = 'block'
      input.setAttribute('aria-describedby', target.id + '-fileSizeError')
      sizeValidation.setAttribute('style', 'white-space: pre-line;')
      if (target.files.length === 1) {
        errorText += 'The file must be smaller than 23MB'
      } else {
        errorText += target.files[index].name + ' must be smaller than 23MB\r\n'
      }
      allValid = false
      formGroup.classList.add('govuk-form-group--error')
    }
  }

  sizeValidation.innerHTML = errorText

  if (allValid) {
    sizeValidation.style.display = 'none'
    input.removeAttribute('aria-describedby')
    formGroup.classList.remove('govuk-form-group--error')
  }
}

/**
* Initialise an event listener for onchange on the element
*/
MultipleFileUpload.prototype.init = function () {
  this.$module.addEventListener('change', this.validateFileSize)
}

export default MultipleFileUpload
