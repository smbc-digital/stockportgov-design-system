import 'govuk-frontend/govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind'

function Button ($module) {
  this.$module = $module
}

/**
* If data-disable-on-click is true then the button is disabled on
* first click by the user.
*/
Button.prototype.disable = function (event) {
  var target = event.target
  // Check the button that is clicked on has the disableOnClick feature enabled
  if (target.getAttribute('data-disable-on-click') !== 'true') {
    return
  }

  target.classList.add('govuk-button--disabled')
  target.disabled = true
  target.blur()
}

Button.prototype.init = function () {
  this.$module.addEventListener('click', this.disable)
}

export default Button
