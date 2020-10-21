function Recaptcha ($module) {
  this.$module = $module
}

/**
* Update recaptcha html element with accessability attributes
*/
Recaptcha.prototype.updateAttributes = function () {
  var textarea = document.getElementById('g-recaptcha-response')
  var iFrame = document.getElementsByTagName('iframe')
  textarea.setAttribute('aria-label', 'recaptcha')
  textarea.setAttribute('aria-disabled', 'true')
  iFrame[0].setAttribute('title', 'recaptcha')
  iFrame[1].setAttribute('title', 'recaptcha')
}

Recaptcha.prototype.init = function () {
  window.addEventListener('load', this.updateAttributes.bind(this))
}

export default Recaptcha
