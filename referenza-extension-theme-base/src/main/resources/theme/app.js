"use strict";
(function (undefined) {
  var d = document,
    Ap = Array.prototype,

    qs = function (sel) {
      return d.querySelector(sel);
    },
    qsa = function (sel) {
      return Ap.slice.call(d.querySelectorAll(sel));
    },

    siblings = function (elem) {
      return Ap.slice.call(elem.parentNode.children).filter(function ($c) {
        return $c != elem;
      });
    },

    escapeRegExp = function (str) {
      return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    },

    getClassList = function (elem) {
      return elem.className.split(/\s+/).map(function (n) {
        return n.trim();
      }).filter(function (n) {
        return n;
      });
    },
    setClassList = function (elem, classList) {
      elem.className = classList.join(" ");
    },
    addClass = function (elem, className) {
      if (!hasClass(elem, className)) {
        var classes = getClassList(elem);
        classes.push(className);
        setClassList(elem, classes);
      }
    },
    removeClass = function (elem, className) {
      setClassList(elem, getClassList(elem).filter(function (n) {
        return n != className;
      }));
    },
    hasClass = function (elem, className) {
      return getClassList(elem).indexOf(className) > -1;
    },

    $articleEntries = qsa(".toc-category-entry"),
    $pane = qs("#pane");

  qs("#toc-search").onkeyup = function (e) {
    var term = this.value.trim() || false;
    var regex = term && RegExp(escapeRegExp(term), "i");
    if (term) {
      $pane.setAttribute("searching", "");
    } else {
      $pane.removeAttribute("searching");
    }
    $articleEntries.forEach(function (entry) {
      if (term && !regex.test(entry.children[0].textContent)) {
        entry.setAttribute("hidden", "");
      } else {
        entry.removeAttribute("hidden");
      }
    });
  };

  d.addEventListener("click", function (e) {
    if (hasClass(e.target, "tabbed-section-label")) {
      siblings(e.target.parentNode).forEach(function ($s) {
        removeClass($s.children[0], "active");
      });
      addClass(e.target, "active");
    }
  }, true);
})();
