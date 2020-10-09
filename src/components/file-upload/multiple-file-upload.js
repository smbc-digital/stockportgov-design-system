import 'govuk-frontend/govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind'

var INPUT_FILE_ERROR_CLASS = 'smbc-input--file-error'
var FORM_GROUP_ERROR_CLASS = 'govuk-form-group--error'
var INPUT_ERROR_CLASS = 'govuk-input--error'
var UPLOAD_FILES_DISABLED_TEXT = 'Upload button is currently disabled'
var UPLOAD_FILES_ENABLED_TEXT = 'Upload button is currently enabled'

function MultipleFileUpload ($module) {
  this.$module = $module
  this.$uploadFileButton = document.getElementById('upload')
  this.$uploadFileInformation = document.getElementById('upload-information')
  this.$formGroup = document.getElementById('multiple-file-upload-form-group')
  this.maxFileSize = this.$module.getAttribute('data-individual-file-size')
  this.sizeValidation = document.getElementById(this.$module.id + '-fileSizeError')
  this.readableMaxFileSize  = (this.maxFileSize / 1048576) + 'MB'
}

/**
* When a file is selected via a html input of type file, This will validate that the file
* selected is not over the specified max file size
*/
MultipleFileUpload.prototype.validateFileSize = function (event) {
  var target = event.target
  var validation = document.getElementById(target.id + '-error')
  var errorText = '<span class="govuk-visually-hidden"Error:></span> '
  var allValid = true

  for (var index = 0; index < target.files.length; index++) {
    var fileSize = target.files[index].size

    if (fileSize > this.maxFileSize) {
      if (validation !== null) {
        validation.remove()
      }
      this.sizeValidation.style.display = 'block'
      this.$module.setAttribute('aria-describedby', target.id + '-fileSizeError')
      this.sizeValidation.setAttribute('style', 'white-space: pre-line;')
      if (target.files.length === 1) {
        errorText += 'The selected file must be smaller than ' + this.readableMaxFileSize
      } else {
        errorText += target.files[index].name + ' must be smaller than ' + this.readableMaxFileSize + '\r\n'
      }
      allValid = false
      this.$formGroup.classList.add(FORM_GROUP_ERROR_CLASS)
    }
  }

  this.sizeValidation.innerHTML = errorText

  if (allValid) {
    this.sizeValidation.style.display = 'none'
    if (validation !== null) {
      validation.remove()
    }
    this.$module.removeAttribute('aria-describedby')

    if (this.$module.classList.contains(INPUT_ERROR_CLASS)) {
      this.$module.classList.remove(INPUT_ERROR_CLASS)
    }

    if (this.$module.classList.contains(INPUT_FILE_ERROR_CLASS)) {
      this.$module.classList.remove(INPUT_FILE_ERROR_CLASS)
    }

    if (this.$formGroup.classList.contains(FORM_GROUP_ERROR_CLASS)) {
      this.$formGroup.classList.remove(FORM_GROUP_ERROR_CLASS)
    }
  }
}


/**
* Disable the upload files button, when no files have been selected
* via the html input
*/
MultipleFileUpload.prototype.disableButtonOnNoFilesSelected = function (event) {
  if(event.target.files.length > 0 ){
    this.$uploadFileButton.disabled = false
    this.$uploadFileButton.setAttribute("aria-disabled", false)
    this.$uploadFileInformation.innerHTML = UPLOAD_FILES_ENABLED_TEXT
  } else {
    this.$uploadFileButton.disabled = true
    this.$uploadFileButton.setAttribute("aria-disabled", true)
    this.$uploadFileInformation.innerHTML = UPLOAD_FILES_DISABLED_TEXT
  }
}

/**
 * Initialise an event listener for onchange on the element
 */
MultipleFileUpload.prototype.init = function () {

  if(this.$uploadFileInformation !== null){
    this.$uploadFileButton.disabled = true
    this.$uploadFileButton.setAttribute("aria-disabled", true);
    this.$uploadFileInformation.innerHTML = UPLOAD_FILES_DISABLED_TEXT
    this.$module.addEventListener('change', this.disableButtonOnNoFilesSelected.bind(this))
  }
  this.$module.addEventListener('change', this.validateFileSize.bind(this))
}

export default MultipleFileUpload
