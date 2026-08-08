var Stats = function () {
    var e,
      t,
      o,
      n,
      l,
      i,
      r,
      a,
      d = 0,
      s = 0,
      p = Date.now(),
      h = p,
      y = p,
      g = 0,
      c = 1e3,
      m = 0,
      b = [
        [16, 16, 48],
        [0, 255, 255],
      ],
      u = 0,
      f = 1e3,
      w = 0,
      x = [
        [16, 48, 16],
        [0, 255, 0],
      ];
    for (
      e = document.createElement('div'),
        e.style.cursor = 'pointer',
        e.style.width = '80px',
        e.style.opacity = '0.9',
        e.style.zIndex = '10001',
        e.addEventListener(
          'mousedown',
          function (e) {
            (e.preventDefault(),
              (d = (d + 1) % 2),
              0 == d
                ? ((o.style.display = 'block'), (i.style.display = 'none'))
                : ((o.style.display = 'none'), (i.style.display = 'block')));
          },
          !1
        ),
        o = document.createElement('div'),
        o.style.textAlign = 'left',
        o.style.lineHeight = '1.2em',
        o.style.backgroundColor =
          'rgb(' +
          Math.floor(b[0][0] / 2) +
          ',' +
          Math.floor(b[0][1] / 2) +
          ',' +
          Math.floor(b[0][2] / 2) +
          ')',
        o.style.padding = '0 0 3px 3px',
        e.appendChild(o),
        n = document.createElement('div'),
        n.style.fontFamily = 'Helvetica, Arial, sans-serif',
        n.style.fontSize = '9px',
        n.style.color = 'rgb(' + b[1][0] + ',' + b[1][1] + ',' + b[1][2] + ')',
        n.style.fontWeight = 'bold',
        n.innerHTML = 'FPS',
        o.appendChild(n),
        l = document.createElement('div'),
        l.style.position = 'relative',
        l.style.width = '74px',
        l.style.height = '30px',
        l.style.backgroundColor = 'rgb(' + b[1][0] + ',' + b[1][1] + ',' + b[1][2] + ')',
        o.appendChild(l);
      l.children.length < 74;

    )
      ((t = document.createElement('span')),
        (t.style.width = '1px'),
        (t.style.height = '30px'),
        (t.style.cssFloat = 'left'),
        (t.style.backgroundColor = 'rgb(' + b[0][0] + ',' + b[0][1] + ',' + b[0][2] + ')'),
        l.appendChild(t));
    for (
      i = document.createElement('div'),
        i.style.textAlign = 'left',
        i.style.lineHeight = '1.2em',
        i.style.backgroundColor =
          'rgb(' +
          Math.floor(x[0][0] / 2) +
          ',' +
          Math.floor(x[0][1] / 2) +
          ',' +
          Math.floor(x[0][2] / 2) +
          ')',
        i.style.padding = '0 0 3px 3px',
        i.style.display = 'none',
        e.appendChild(i),
        r = document.createElement('div'),
        r.style.fontFamily = 'Helvetica, Arial, sans-serif',
        r.style.fontSize = '9px',
        r.style.color = 'rgb(' + x[1][0] + ',' + x[1][1] + ',' + x[1][2] + ')',
        r.style.fontWeight = 'bold',
        r.innerHTML = 'MS',
        i.appendChild(r),
        a = document.createElement('div'),
        a.style.position = 'relative',
        a.style.width = '74px',
        a.style.height = '30px',
        a.style.backgroundColor = 'rgb(' + x[1][0] + ',' + x[1][1] + ',' + x[1][2] + ')',
        i.appendChild(a);
      a.children.length < 74;

    )
      ((t = document.createElement('span')),
        (t.style.width = '1px'),
        (t.style.height = 30 * Math.random() + 'px'),
        (t.style.cssFloat = 'left'),
        (t.style.backgroundColor = 'rgb(' + x[0][0] + ',' + x[0][1] + ',' + x[0][2] + ')'),
        a.appendChild(t));
    return {
      domElement: e,
      update: function () {
        ((p = Date.now()),
          (u = p - h),
          (f = Math.min(f, u)),
          (w = Math.max(w, u)),
          (r.textContent = u + ' MS (' + f + '-' + w + ')'));
        var e = Math.min(30, 30 - (u / 200) * 30);
        ((a.appendChild(a.firstChild).style.height = e + 'px'),
          (h = p),
          s++,
          p > y + 1e3 &&
            ((g = Math.round((1e3 * s) / (p - y))),
            (c = Math.min(c, g)),
            (m = Math.max(m, g)),
            (n.textContent = g + ' FPS (' + c + '-' + m + ')'),
            (e = Math.min(30, 30 - (g / 100) * 30)),
            (l.appendChild(l.firstChild).style.height = e + 'px'),
            (y = p),
            (s = 0)));
      },
    };
  },
  Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: (function () {
      try {
        var e = document.createElement('canvas');
        return !(
          !window.WebGLRenderingContext ||
          (!e.getContext('webgl') && !e.getContext('experimental-webgl'))
        );
      } catch (e) {
        return !1;
      }
    })(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage: function () {
      var e = document.createElement('div');
      return (
        (e.id = 'webgl-error-message'),
        (e.style.fontFamily = 'monospace'),
        (e.style.fontSize = '13px'),
        (e.style.fontWeight = 'normal'),
        (e.style.textAlign = 'center'),
        (e.style.background = '#fff'),
        (e.style.color = '#000'),
        (e.style.padding = '1.5em'),
        (e.style.width = '400px'),
        (e.style.margin = '5em auto 0'),
        this.webgl ||
          (e.innerHTML = window.WebGLRenderingContext
            ? [
                'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.',
              ].join('\n')
            : [
                'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.',
              ].join('\n')),
        e
      );
    },
    addGetWebGLMessage: function (e) {
      var t, o, n;
      ((e = e || {}),
        (t = void 0 !== e.parent ? e.parent : document.body),
        (o = void 0 !== e.id ? e.id : 'oldie'),
        (n = Detector.getWebGLErrorMessage()),
        (n.id = o),
        t.appendChild(n));
    },
  };
'object' == typeof module && (module.exports = Detector);
