import 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind' // addEventListener, event.target normalization and DOMContentLoaded
import 'govuk-frontend/govuk/vendor/polyfills/Event'
import 'govuk-frontend/govuk/vendor/polyfills/Element/prototype/classList'
import { nodeListForEach } from '../../common'

function Time ($module) {
  this.$module = $module
  this.$inputs = $module.querySelectorAll('input[type="radio"]')
}

Time.prototype.init = function () {
  var $module = this.$module
  var $inputs = this.$inputs

  nodeListForEach($inputs, function ($input) {
    var target = $input.getAttribute('data-aria-controls')

    // Skip radios without data-aria-controls attributes, or where the
    // target element does not exist.
    if (!target || !$module.querySelector('#' + target)) {
      return
    }

    // Promote the data-aria-controls attribute to a aria-controls attribute
    // so that the relationship is exposed in the AOM
    $input.setAttribute('aria-controls', target)
    $input.removeAttribute('data-aria-controls')
  })

  // When the page is restored after navigating 'back' in some browsers the
  // state of form controls is not restored until *after* the DOMContentLoaded
  // event is fired, so we need to sync after the pageshow event in browsers
  // that support it.
  if ('onpageshow' in window) {
    window.addEventListener('pageshow', this.syncAllConditionalReveals.bind(this))
  } else {
    window.addEventListener('DOMContentLoaded', this.syncAllConditionalReveals.bind(this))
  }

  // Although we've set up handlers to sync state on the pageshow or
  // DOMContentLoaded event, init could be called after those events have fired,
  // for example if they are added to the page dynamically, so sync now too.
  this.syncAllConditionalReveals()

  // Handle events
  $module.addEventListener('click', this.handleClick.bind(this))
}

/**
 * Sync the conditional reveal states for all inputs in this $module.
 */
Time.prototype.syncAllConditionalReveals = function () {
  nodeListForEach(this.$inputs, this.syncConditionalRevealWithInputState.bind(this))
}

/**
 * Sync conditional reveal with the input state
 *
 * Synchronise the visibility of the conditional reveal, and its accessible
 * state, with the input's checked state.
 *
 * @param {HTMLInputElement} $input Radio input
 */
Time.prototype.syncConditionalRevealWithInputState = function ($input) {
  var $target = document.querySelector('#' + $input.getAttribute('aria-controls'))

  if ($target && $target.classList.contains('smbc-time__body__conditional')) {
    var inputIsChecked = $input.checked

    $target.classList.toggle('smbc-time__body__conditional--hidden', !inputIsChecked)
  }
}

/**
 * Click event handler
 *
 * Handle a click within the $module – if the click occurred on a radio, sync
 * the state of the conditional reveal for all radio buttons in the same form
 * with the same name (because checking one radio could have un-checked a radio
 * in another $module)
 *
 * @param {MouseEvent} event Click event
 */
Time.prototype.handleClick = function (event) {
  var $clickedInput = event.target

  // Ignore clicks on things that aren't radio buttons
  if ($clickedInput.type !== 'radio') {
    return
  }

  // We only need to consider radios with conditional reveals, which will have
  // aria-controls attributes.
  var $allInputs = document.querySelectorAll('input[type="radio"][aria-controls]')

  nodeListForEach($allInputs, function ($input) {
    var hasSameFormOwner = ($input.form === $clickedInput.form)
    var hasSameName = ($input.name === $clickedInput.name)

    if (hasSameName && hasSameFormOwner) {
      this.syncConditionalRevealWithInputState($input)
    }
  }.bind(this))
}

export default Time
