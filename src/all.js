import { nodeListForEach } from './common'
import Button from './components/button/button'
import FileUpload from './components/file-upload/file-upload'
import MultipleFileUpload from './components/file-upload/multiple-file-upload'

function initAll (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  var $buttons = scope.querySelectorAll('[data-module="govuk-button"]')
  nodeListForEach($buttons, function ($button) {
    new Button($button).init()
  })

  var $fileUploads = scope.querySelectorAll('[data-module="smbc-file-upload"]')
  nodeListForEach($fileUploads, function ($fileUpload) {
    new FileUpload($fileUpload).init()
  })

  var $multipleFileUploads = scope.querySelectorAll('[data-module="smbc-multiple-file-upload"]')
  nodeListForEach($multipleFileUploads, function ($multipleFileUpload) {
    new MultipleFileUpload($multipleFileUpload).init()
  })
}

export {
  initAll,
  Button,
  FileUpload,
  MultipleFileUpload
}
