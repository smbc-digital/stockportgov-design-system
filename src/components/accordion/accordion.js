import 'govuk-frontend/govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind'

function Accordion ($module) {
  this.$module = $module
  this.moduleId = $module.getAttribute('id')

  this.collapse = true

  this.hideDivClassOverride = '--hidden'
  this.sectionHeaderClass = 'smbc-accordion__header'
  this.sectionItemClass = 'smbc-accordion__item'

  this.closedIcon = document.createElement('i')
  this.closedIcon.className = 'fas fa-caret-square-right'

  this.openedIcon = document.createElement('i')
  this.openedIcon.className = 'fas fa-caret-square-down'
}

Accordion.prototype.init = function () {
  if (!this.$module) {
    return
  }

  if (this.$module.childNodes === null || this.$module.childNodes.length === 0) {
    window.addEventListener('DOMContentLoaded', this.reInit.bind(this))
  } else {
    this.initSections(this.$module.childNodes)
  }
}

Accordion.prototype.reInit = function () {
  if (!this.$module) {
    return
  }

  if (this.$module.childNodes != null || this.$module.childNodes.length > 0) {
    this.initSections(this.$module.childNodes)
  }
}

Accordion.prototype.initSections = function (sections) {
  for (var x = 0; x < sections.length; x++) {
    var section = sections[x]
    if (section.hasAttribute('data-section')) {
      var header = section.querySelector('.' + this.sectionHeaderClass)
      if (header) {
        var icon = this.collapse === true ? this.closedIcon.cloneNode() : this.openedIcon.cloneNode()
        icon.addEventListener('click', this.groupClick.bind(this))
        if (header.firstElementChild) {
          header.firstElementChild.addEventListener('click', this.groupClick.bind(this))
          header.insertBefore(icon, header.firstElementChild)
        } else {
          header.append(icon)
        }
      }
      if (this.collapse === true) {
        var items = section.querySelectorAll('.' + this.sectionItemClass)
        if (items) {
          for (var i = 0; i < items.length; i++) {
            var classes = items[i].className.split(' ')
            for (var n = 0; n < classes.length; n++) {
              if (classes[n] === this.sectionItemClass) {
                classes[n] += this.hideDivClassOverride
              }
            }
            items[i].className = classes.join(' ')
          }
        }
      }
    }
  }
}

Accordion.prototype.groupClick = function (ev) {
  var section = ev.target.parentElement.parentElement
  if (section.hasAttribute('data-section')) {
    this.toggle(section)
  }
}

Accordion.prototype.toggle = function (section) {
  var header = section.querySelector('.' + this.sectionHeaderClass)
  if (header && header.hasChildNodes) {
    var icon, i
    var children = header.childNodes
    for (i = 0; i < children.length; i++) {
      var child = children[i]
      if (child.nodeName === 'I') {
        icon = child.className === this.closedIcon.className ? this.openedIcon.cloneNode() : this.closedIcon.cloneNode()
        header.removeChild(child)
      }
    }
    if (header.firstElementChild) {
      header.insertBefore(icon, header.firstElementChild)
    } else {
      header.append(icon)
    }
  }

  var items = section.querySelectorAll('[class*=' + this.sectionItemClass)
  if (items) {
    for (i = 0; i < items.length; i++) {
      var classes = items[i].className.split(' ')
      for (var n = 0; n < classes.length; n++) {
        if (classes[n] === this.sectionItemClass) {
          classes[n] += this.hideDivClassOverride
        } else if (classes[n] === this.sectionItemClass + this.hideDivClassOverride) {
          classes[n] = this.sectionItemClass
        }
      }
      items[i].className = classes.join(' ')
    }
  }
}

export default Accordion
