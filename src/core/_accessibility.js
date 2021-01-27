// Only current option available for this Accessibility Core Module is to
// show elements that should remain hidden when JavaScript is disabled
function Accessibility ($module) {
  this.$module = $module
}

Accessibility.prototype.init = function () {
  // Check if it has a hidden modifier, to remove as we have JS enabled
  if (this.$module.classList.contains('smbc-accessibility__nojs--hidden')) {
    this.$module.classList.remove('smbc-accessibility__nojs--hidden')
  }
}

export default Accessibility
