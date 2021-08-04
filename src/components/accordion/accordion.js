import 'govuk-frontend/govuk/vendor/polyfills/Event' // addEventListener and event.target normaliziation
import 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind'
import 'govuk-frontend/govuk/vendor/polyfills/Element/prototype/classList'
import { nodeListForEach } from '../../common'

function Accordion ($module) {
  this.$module = $module

  this.collapse = true

  this.sectionHeaderClass = 'smbc-accordion__header'
  this.sectionItemClass = 'smbc-accordion__item'
  this.hiddenSectionItemClass = this.sectionItemClass + '--hidden'

  this.iconClass = 'smbc-accordion__icon-left'
  this.openedIconClass = this.iconClass + '--open'
  this.closedIconClass = this.iconClass + '--closed'
}

Accordion.prototype.init = function () {
  if (!this.$module) {
    return
  }

  if (this.$module.childNodes === null || this.$module.childNodes.length === 0) {
    window.addEventListener('DOMContentLoaded', this._reInit.bind(this))
  } else {
    nodeListForEach(this.$module.childNodes, this._initSection.bind(this))
  }
}

Accordion.prototype._reInit = function () {
  if (!this.$module) {
    return
  }

  if (this.$module.childNodes != null || this.$module.childNodes.length > 0) {
    nodeListForEach(this.$module.childNodes, this._initSection.bind(this))
  }
}

/**
 * Set up the Sections of the Accordion
 *
 * @param {Node} $section DIV
 */
Accordion.prototype._initSection = function ($section) {
  if ($section.hasAttribute('data-section')) {
    var $header = $section.querySelector('.' + this.sectionHeaderClass)
    if ($header) {
      $header.addEventListener('click', this._handleClick.bind(this))
      if ($header.firstElementChild) {
        $header.classList.remove(this.collapse ? this.openedIconClass : this.closedIconClass)
        $header.classList.add(this.collapse ? this.closedIconClass : this.openedIconClass)
      }
    }

    if (this.collapse === true) {
      var $items = $section.querySelectorAll('.' + this.sectionItemClass)
      if ($items) {
        var classToReplace = this.sectionItemClass
        var replacementClass = this.hiddenSectionItemClass
        nodeListForEach($items, function ($item) {
          $item.classList.replace(classToReplace, replacementClass)
        })
      }
    }
  }
}

Accordion.prototype._handleClick = function (event) {
  if (event.target.hasAttribute('data-section')) {
    this._toggle(event.target)
  } else if (event.target.parentElement.hasAttribute('data-section')) {
    this._toggle(event.target.parentElement)
  } else if (event.target.parentElement.parentElement.hasAttribute('data-section')) {
    this._toggle(event.target.parentElement.parentElement)
  }
}

/**
 * Toggle the Sections of the Accordion open/closed
 *
 * @param {Node} $section DIV
 */
Accordion.prototype._toggle = function ($section) {
  var classToReplace = this.collapse ? this.hiddenSectionItemClass : this.sectionItemClass
  var replacementClass = this.collapse ? this.sectionItemClass : this.hiddenSectionItemClass

  this.collapse = this.collapse ? !this.collapse : true

  var $header = $section.querySelector('.' + this.sectionHeaderClass)
  if ($header && $header.firstElementChild) {
    $header.classList.remove(this.collapse ? this.openedIconClass : this.closedIconClass)
    $header.classList.add(this.collapse ? this.closedIconClass : this.openedIconClass)
  }

  var $items = $section.querySelectorAll('.' + classToReplace)
  if ($items) {
    nodeListForEach($items, function ($item) {
      $item.classList.replace(classToReplace, replacementClass)
    })
  }
}

export default Accordion
