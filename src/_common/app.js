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
    escapeRegExp = function (str) {
      return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
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
})();
