import { nodeListForEach } from './common'
import Accessibility from './core/_accessibility'
import Accordion from './components/accordion/accordion'
import Button from './components/button/button'
import Calendar from './components/calendar/calendar'
import Time from './components/time/time'
import FileUpload from './components/file-upload/file-upload'
import MultipleFileUpload from './components/file-upload/multiple-file-upload'
import Recaptcha from './components/recaptcha/recaptcha'

function initAll (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  var $accessibility = scope.querySelectorAll('[class*="smbc-accessibility"]')
  nodeListForEach($accessibility, function ($accessibility) {
    new Accessibility($accessibility).init()
  })

  var $accordions = scope.querySelectorAll('[data-module="smbc-accordion"]')
  nodeListForEach($accordions, function ($accordion) {
    new Accordion($accordion).init()
  })

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

  var $recaptchas = scope.querySelectorAll('[data-module="smbc-recaptcha"]')
  nodeListForEach($recaptchas, function ($recaptcha) {
    new Recaptcha($recaptcha).init()
  })

  var $calendars = scope.querySelectorAll('[data-module="smbc-calendar"]')
  nodeListForEach($calendars, function ($calendar) {
    new Calendar($calendar).init()
  })

  var $times = scope.querySelectorAll('[data-module="smbc-time"]')
  nodeListForEach($times, function ($time) {
    new Time($time).init()
  })
}

export {
  initAll,
  Accordion,
  Button,
  FileUpload,
  MultipleFileUpload,
  Recaptcha
}
