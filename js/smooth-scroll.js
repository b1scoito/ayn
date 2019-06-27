/*! Copyright (c) Go Make Things, LLC

https://github.com/cferdinandi/smooth-scroll

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS 
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

!function(a, b) {
    "function" == typeof define && define.amd ? define([], b(a)) : "object" == typeof exports ? module.exports = b(a) : a.smoothScroll = b(a)
}("undefined" != typeof global ? global : this.window || this.global, function(a) {
    "use strict";
    var d, e, f, g, h, i, j, b = {}, c = "querySelector"in document && "addEventListener"in a, k = {
        selector: "[data-scroll]",
        selectorHeader: null,
        speed: 500,
        easing: "easeInOutCubic",
        offset: 0,
        callback: function() {}
    }, l = function() {
        var a = {}
          , b = !1
          , c = 0
          , d = arguments.length;
        "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (b = arguments[0],
        c++);
        for (var e = function(c) {
            for (var d in c)
                Object.prototype.hasOwnProperty.call(c, d) && (b && "[object Object]" === Object.prototype.toString.call(c[d]) ? a[d] = l(!0, a[d], c[d]) : a[d] = c[d])
        }; c < d; c++) {
            var f = arguments[c];
            e(f)
        }
        return a
    }, m = function(a) {
        return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight)
    }, n = function(a, b) {
        var e, f, c = b.charAt(0), d = "classList"in document.documentElement;
        for ("[" === c && (b = b.substr(1, b.length - 2),
        e = b.split("="),
        e.length > 1 && (f = !0,
        e[1] = e[1].replace(/"/g, "").replace(/'/g, ""))); a && a !== document && 1 === a.nodeType; a = a.parentNode) {
            if ("." === c)
                if (d) {
                    if (a.classList.contains(b.substr(1)))
                        return a
                } else if (new RegExp("(^|\\s)" + b.substr(1) + "(\\s|$)").test(a.className))
                    return a;
            if ("#" === c && a.id === b.substr(1))
                return a;
            if ("[" === c && a.hasAttribute(e[0])) {
                if (!f)
                    return a;
                if (a.getAttribute(e[0]) === e[1])
                    return a
            }
            if (a.tagName.toLowerCase() === b)
                return a
        }
        return null
    }, o = function(a) {
        "#" === a.charAt(0) && (a = a.substr(1));
        for (var e, b = String(a), c = b.length, d = -1, f = "", g = b.charCodeAt(0); ++d < c; ) {
            if (e = b.charCodeAt(d),
            0 === e)
                throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
            f += e >= 1 && e <= 31 || 127 == e || 0 === d && e >= 48 && e <= 57 || 1 === d && e >= 48 && e <= 57 && 45 === g ? "\\" + e.toString(16) + " " : e >= 128 || 45 === e || 95 === e || e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 97 && e <= 122 ? b.charAt(d) : "\\" + b.charAt(d)
        }
        return "#" + f
    }, p = function(a, b) {
        var c;
        return "easeInQuad" === a && (c = b * b),
        "easeOutQuad" === a && (c = b * (2 - b)),
        "easeInOutQuad" === a && (c = b < .5 ? 2 * b * b : -1 + (4 - 2 * b) * b),
        "easeInCubic" === a && (c = b * b * b),
        "easeOutCubic" === a && (c = --b * b * b + 1),
        "easeInOutCubic" === a && (c = b < .5 ? 4 * b * b * b : (b - 1) * (2 * b - 2) * (2 * b - 2) + 1),
        "easeInQuart" === a && (c = b * b * b * b),
        "easeOutQuart" === a && (c = 1 - --b * b * b * b),
        "easeInOutQuart" === a && (c = b < .5 ? 8 * b * b * b * b : 1 - 8 * --b * b * b * b),
        "easeInQuint" === a && (c = b * b * b * b * b),
        "easeOutQuint" === a && (c = 1 + --b * b * b * b * b),
        "easeInOutQuint" === a && (c = b < .5 ? 16 * b * b * b * b * b : 1 + 16 * --b * b * b * b * b),
        c || b
    }, q = function(a, b, c) {
        var d = 0;
        if (a.offsetParent)
            do
                d += a.offsetTop,
                a = a.offsetParent;
            while (a);return d = Math.max(d - b - c, 0),
        Math.min(d, s() - r())
    }, r = function() {
        return Math.max(document.documentElement.clientHeight, a.innerHeight || 0)
    }, s = function() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
    }, t = function(a) {
        return a && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(a) : {}
    }, u = function(a) {
        return a ? m(a) + a.offsetTop : 0
    }, v = function(b, c, d) {
        d || (b.focus(),
        document.activeElement.id !== b.id && (b.setAttribute("tabindex", "-1"),
        b.focus(),
        b.style.outline = "none"),
        a.scrollTo(0, c))
    };
    b.animateScroll = function(b, c, e) {
        var f = t(c ? c.getAttribute("data-options") : null)
          , i = l(d || k, e || {}, f)
          , m = "[object Number]" === Object.prototype.toString.call(b)
          , n = m || !b.tagName ? null : b;
        if (m || n) {
            var o = a.pageYOffset;
            i.selectorHeader && !g && (g = document.querySelector(i.selectorHeader)),
            h || (h = u(g));
            var z, A, r = m ? b : q(n, h, parseInt(i.offset, 10)), w = r - o, x = s(), y = 0, B = function(d, e, f) {
                var g = a.pageYOffset;
                (d == e || g == e || a.innerHeight + g >= x) && (clearInterval(f),
                v(b, e, m),
                i.callback(b, c))
            }, C = function() {
                y += 16,
                z = y / parseInt(i.speed, 10),
                z = z > 1 ? 1 : z,
                A = o + w * p(i.easing, z),
                a.scrollTo(0, Math.floor(A)),
                B(A, r, j)
            }, D = function() {
                clearInterval(j),
                j = setInterval(C, 16)
            };
            0 === a.pageYOffset && a.scrollTo(0, 0),
            D()
        }
    }
    ;
    var w = function(c) {
        a.location.hash;
        e && (e.id = e.getAttribute("data-scroll-id"),
        b.animateScroll(e, f),
        e = null,
        f = null)
    }
      , x = function(b) {
        if (0 === b.button && !b.metaKey && !b.ctrlKey && (f = n(b.target, d.selector),
        f && "a" === f.tagName.toLowerCase() && f.hostname === a.location.hostname && f.pathname === a.location.pathname && /#/.test(f.href))) {
            var c = o(f.hash);
            if ("#" === c) {
                b.preventDefault(),
                e = document.body;
                var g = e.id ? e.id : "smooth-scroll-top";
                return e.setAttribute("data-scroll-id", g),
                e.id = "",
                void (a.location.hash.substring(1) === g ? w() : a.location.hash = g)
            }
            e = document.querySelector(c),
            e && (e.setAttribute("data-scroll-id", e.id),
            e.id = "",
            f.hash === a.location.hash && (b.preventDefault(),
            w()))
        }
    }
      , y = function(a) {
        i || (i = setTimeout(function() {
            i = null,
            h = u(g)
        }, 66))
    };
    return b.destroy = function() {
        d && (document.removeEventListener("click", x, !1),
        a.removeEventListener("resize", y, !1),
        d = null,
        e = null,
        f = null,
        g = null,
        h = null,
        i = null,
        j = null)
    }
    ,
    b.init = function(e) {
        c && (b.destroy(),
        d = l(k, e || {}),
        g = d.selectorHeader ? document.querySelector(d.selectorHeader) : null,
        h = u(g),
        document.addEventListener("click", x, !1),
        a.addEventListener("hashchange", w, !1),
        g && a.addEventListener("resize", y, !1))
    }
    ,
    b
});
