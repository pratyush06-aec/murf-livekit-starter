!(function (t) {
  var e = {};
  function n(o) {
    if (e[o]) return e[o].exports;
    var a = (e[o] = { i: o, l: !1, exports: {} });
    return (t[o].call(a.exports, a, a.exports, n), (a.l = !0), a.exports);
  }
  ((n.m = t),
    (n.c = e),
    (n.d = function (t, e, o) {
      n.o(t, e) || Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: o });
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return (n.d(e, 'a', e), e);
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = '/'),
    n((n.s = 16)));
})({
  16: function (t, e, n) {
    t.exports = n('i2mZ');
  },
  i2mZ: function (t, e) {
    var n = $('[data-socket-url]').data('socket-url') || !1,
      o = $('[data-socket-id]').data('socket-id') || !1,
      a = $('[data-socket-time]').data('socket-time') || !1,
      i = $('[data-socket-hash]').data('socket-hash') || !1;
    if (n && o && a && i) {
      var s = new WebSocket(n);
      ((s.onopen = function () {
        s.send(JSON.stringify({ type: 'join', id: o, time: a, hash: i }));
      }),
        (s.onmessage = function (t) {
          var e,
            n,
            o,
            a,
            i,
            s = JSON.parse(t.data);
          ((e = s.count || 0),
            (n = $('.js-notifications-tooltip')),
            (o = $('.js-notification-dot')),
            parseInt(e) > 0
              ? (n.each(function () {
                  $(this).removeAttr('style').text(e);
                }),
                o.addClass('is-active'))
              : (n.each(function () {
                  $(this).css({ display: 'none' });
                }),
                o.removeClass('is-active')),
            (a = s.html),
            (i = $('.notifications').find('.js-notifications-container')).length &&
              (i.prepend(a[window.userLang]),
              void 0 !== kaspersky.unreadCount && ++kaspersky.unreadCount));
        }),
        (s.onclose = console.log),
        (s.onerror = console.error),
        (window.socket = s));
    }
  },
});
//# sourceMappingURL=ws-client.js.map
