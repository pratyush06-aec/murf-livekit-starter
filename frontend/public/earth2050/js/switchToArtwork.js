!(function (A) {
  var e = {};
  function t(r) {
    if (e[r]) return e[r].exports;
    var n = (e[r] = { i: r, l: !1, exports: {} });
    return (A[r].call(n.exports, n, n.exports, t), (n.l = !0), n.exports);
  }
  ((t.m = A),
    (t.c = e),
    (t.d = function (A, e, r) {
      t.o(A, e) || Object.defineProperty(A, e, { configurable: !1, enumerable: !0, get: r });
    }),
    (t.n = function (A) {
      var e =
        A && A.__esModule
          ? function () {
              return A.default;
            }
          : function () {
              return A;
            };
      return (t.d(e, 'a', e), e);
    }),
    (t.o = function (A, e) {
      return Object.prototype.hasOwnProperty.call(A, e);
    }),
    (t.p = '/'),
    t((t.s = 18)));
})({
  '0XFg': function (A, e, t) {
    !(function (A) {
      var t = {
        not_string: /[^s]/,
        number: /[diefg]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder:
          /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/,
      };
      function r() {
        var A = arguments[0],
          e = r.cache;
        return (
          (e[A] && e.hasOwnProperty(A)) || (e[A] = r.parse(A)),
          r.format.call(null, e[A], arguments)
        );
      }
      ((r.format = function (A, e) {
        var n,
          i,
          a,
          s,
          c,
          u,
          B,
          l,
          f = 1,
          h = A.length,
          g = '',
          w = [],
          d = !0,
          E = '';
        for (i = 0; i < h; i++)
          if ('string' === (g = o(A[i]))) w[w.length] = A[i];
          else if ('array' === g) {
            if ((s = A[i])[2])
              for (n = e[f], a = 0; a < s[2].length; a++) {
                if (!n.hasOwnProperty(s[2][a]))
                  throw new Error(r("[sprintf] property '%s' does not exist", s[2][a]));
                n = n[s[2][a]];
              }
            else n = s[1] ? e[s[1]] : e[f++];
            if (
              ('function' == o(n) && (n = n()),
              t.not_string.test(s[8]) && t.not_json.test(s[8]) && 'number' != o(n) && isNaN(n))
            )
              throw new TypeError(r('[sprintf] expecting number but found %s', o(n)));
            switch ((t.number.test(s[8]) && (d = n >= 0), s[8])) {
              case 'b':
                n = n.toString(2);
                break;
              case 'c':
                n = String.fromCharCode(n);
                break;
              case 'd':
              case 'i':
                n = parseInt(n, 10);
                break;
              case 'j':
                n = JSON.stringify(n, null, s[6] ? parseInt(s[6]) : 0);
                break;
              case 'e':
                n = s[7] ? n.toExponential(s[7]) : n.toExponential();
                break;
              case 'f':
                n = s[7] ? parseFloat(n).toFixed(s[7]) : parseFloat(n);
                break;
              case 'g':
                n = s[7] ? parseFloat(n).toPrecision(s[7]) : parseFloat(n);
                break;
              case 'o':
                n = n.toString(8);
                break;
              case 's':
                n = (n = String(n)) && s[7] ? n.substring(0, s[7]) : n;
                break;
              case 'u':
                n >>>= 0;
                break;
              case 'x':
                n = n.toString(16);
                break;
              case 'X':
                n = n.toString(16).toUpperCase();
            }
            t.json.test(s[8])
              ? (w[w.length] = n)
              : (!t.number.test(s[8]) || (d && !s[3])
                  ? (E = '')
                  : ((E = d ? '+' : '-'), (n = n.toString().replace(t.sign, ''))),
                (u = s[4] ? ('0' === s[4] ? '0' : s[4].charAt(1)) : ' '),
                (B = s[6] - (E + n).length),
                (c = s[6] && B > 0 ? ((l = u), Array(B + 1).join(l)) : ''),
                (w[w.length] = s[5] ? E + n + c : '0' === u ? E + c + n : c + E + n));
          }
        return w.join('');
      }),
        (r.cache = {}),
        (r.parse = function (A) {
          for (var e = A, r = [], n = [], o = 0; e; ) {
            if (null !== (r = t.text.exec(e))) n[n.length] = r[0];
            else if (null !== (r = t.modulo.exec(e))) n[n.length] = '%';
            else {
              if (null === (r = t.placeholder.exec(e)))
                throw new SyntaxError('[sprintf] unexpected placeholder');
              if (r[2]) {
                o |= 1;
                var i = [],
                  a = r[2],
                  s = [];
                if (null === (s = t.key.exec(a)))
                  throw new SyntaxError('[sprintf] failed to parse named argument key');
                for (i[i.length] = s[1]; '' !== (a = a.substring(s[0].length)); )
                  if (null !== (s = t.key_access.exec(a))) i[i.length] = s[1];
                  else {
                    if (null === (s = t.index_access.exec(a)))
                      throw new SyntaxError('[sprintf] failed to parse named argument key');
                    i[i.length] = s[1];
                  }
                r[2] = i;
              } else o |= 2;
              if (3 === o)
                throw new Error(
                  '[sprintf] mixing positional and named placeholders is not (yet) supported'
                );
              n[n.length] = r;
            }
            e = e.substring(r[0].length);
          }
          return n;
        }));
      var n = function (A, e, t) {
        return ((t = (e || []).slice(0)).splice(0, 0, A), r.apply(null, t));
      };
      function o(A) {
        return Object.prototype.toString.call(A).slice(8, -1).toLowerCase();
      }
      ((e.sprintf = r), (e.vsprintf = n));
    })('undefined' == typeof window || window);
  },
  18: function (A, e, t) {
    A.exports = t('BcGP');
  },
  '1TIj': function (A, e, t) {
    'use strict';
    (function (A) {
      var r = t('eWjs'),
        n = t('AL2p'),
        o = t('EuP9').Buffer;
      A.__TYPEDARRAY_POOL ||
        (A.__TYPEDARRAY_POOL = {
          UINT8: n([32, 0]),
          UINT16: n([32, 0]),
          UINT32: n([32, 0]),
          BIGUINT64: n([32, 0]),
          INT8: n([32, 0]),
          INT16: n([32, 0]),
          INT32: n([32, 0]),
          BIGINT64: n([32, 0]),
          FLOAT: n([32, 0]),
          DOUBLE: n([32, 0]),
          DATA: n([32, 0]),
          UINT8C: n([32, 0]),
          BUFFER: n([32, 0]),
        });
      var i = 'undefined' != typeof Uint8ClampedArray,
        a = 'undefined' != typeof BigUint64Array,
        s = 'undefined' != typeof BigInt64Array,
        c = A.__TYPEDARRAY_POOL;
      (c.UINT8C || (c.UINT8C = n([32, 0])),
        c.BIGUINT64 || (c.BIGUINT64 = n([32, 0])),
        c.BIGINT64 || (c.BIGINT64 = n([32, 0])),
        c.BUFFER || (c.BUFFER = n([32, 0])));
      var u = c.DATA,
        B = c.BUFFER;
      function l(A) {
        if (A) {
          var e = A.length || A.byteLength,
            t = r.log2(e);
          u[t].push(A);
        }
      }
      function f(A) {
        A = r.nextPow2(A);
        var e = r.log2(A),
          t = u[e];
        return t.length > 0 ? t.pop() : new ArrayBuffer(A);
      }
      function h(A) {
        return new Uint8Array(f(A), 0, A);
      }
      function g(A) {
        return new Uint16Array(f(2 * A), 0, A);
      }
      function w(A) {
        return new Uint32Array(f(4 * A), 0, A);
      }
      function d(A) {
        return new Int8Array(f(A), 0, A);
      }
      function E(A) {
        return new Int16Array(f(2 * A), 0, A);
      }
      function p(A) {
        return new Int32Array(f(4 * A), 0, A);
      }
      function Q(A) {
        return new Float32Array(f(4 * A), 0, A);
      }
      function U(A) {
        return new Float64Array(f(8 * A), 0, A);
      }
      function C(A) {
        return i ? new Uint8ClampedArray(f(A), 0, A) : h(A);
      }
      function F(A) {
        return a ? new BigUint64Array(f(8 * A), 0, A) : null;
      }
      function m(A) {
        return s ? new BigInt64Array(f(8 * A), 0, A) : null;
      }
      function _(A) {
        return new DataView(f(A), 0, A);
      }
      function H(A) {
        A = r.nextPow2(A);
        var e = r.log2(A),
          t = B[e];
        return t.length > 0 ? t.pop() : new o(A);
      }
      ((e.free = function (A) {
        if (o.isBuffer(A)) B[r.log2(A.length)].push(A);
        else {
          if (('[object ArrayBuffer]' !== Object.prototype.toString.call(A) && (A = A.buffer), !A))
            return;
          var e = A.length || A.byteLength,
            t = 0 | r.log2(e);
          u[t].push(A);
        }
      }),
        (e.freeUint8 =
          e.freeUint16 =
          e.freeUint32 =
          e.freeBigUint64 =
          e.freeInt8 =
          e.freeInt16 =
          e.freeInt32 =
          e.freeBigInt64 =
          e.freeFloat32 =
          e.freeFloat =
          e.freeFloat64 =
          e.freeDouble =
          e.freeUint8Clamped =
          e.freeDataView =
            function (A) {
              l(A.buffer);
            }),
        (e.freeArrayBuffer = l),
        (e.freeBuffer = function (A) {
          B[r.log2(A.length)].push(A);
        }),
        (e.malloc = function (A, e) {
          if (void 0 === e || 'arraybuffer' === e) return f(A);
          switch (e) {
            case 'uint8':
              return h(A);
            case 'uint16':
              return g(A);
            case 'uint32':
              return w(A);
            case 'int8':
              return d(A);
            case 'int16':
              return E(A);
            case 'int32':
              return p(A);
            case 'float':
            case 'float32':
              return Q(A);
            case 'double':
            case 'float64':
              return U(A);
            case 'uint8_clamped':
              return C(A);
            case 'bigint64':
              return m(A);
            case 'biguint64':
              return F(A);
            case 'buffer':
              return H(A);
            case 'data':
            case 'dataview':
              return _(A);
            default:
              return null;
          }
          return null;
        }),
        (e.mallocArrayBuffer = f),
        (e.mallocUint8 = h),
        (e.mallocUint16 = g),
        (e.mallocUint32 = w),
        (e.mallocInt8 = d),
        (e.mallocInt16 = E),
        (e.mallocInt32 = p),
        (e.mallocFloat32 = e.mallocFloat = Q),
        (e.mallocFloat64 = e.mallocDouble = U),
        (e.mallocUint8Clamped = C),
        (e.mallocBigUint64 = F),
        (e.mallocBigInt64 = m),
        (e.mallocDataView = _),
        (e.mallocBuffer = H),
        (e.clearCache = function () {
          for (var A = 0; A < 32; ++A)
            ((c.UINT8[A].length = 0),
              (c.UINT16[A].length = 0),
              (c.UINT32[A].length = 0),
              (c.INT8[A].length = 0),
              (c.INT16[A].length = 0),
              (c.INT32[A].length = 0),
              (c.FLOAT[A].length = 0),
              (c.DOUBLE[A].length = 0),
              (c.BIGUINT64[A].length = 0),
              (c.BIGINT64[A].length = 0),
              (c.UINT8C[A].length = 0),
              (u[A].length = 0),
              (B[A].length = 0));
        }));
    }).call(e, t('DuR2'));
  },
  '3c5u': function (A, e, t) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 });
    var r,
      n =
        Object.assign ||
        function (A) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (A[r] = t[r]);
          }
          return A;
        },
      o = t('pcrw'),
      i = (r = o) && r.__esModule ? r : { default: r };
    var a = {
      cover: function (A) {
        return '.5+(uv-.5)*vec2(min(ratio/' + A + ',1.),min(' + A + '/ratio,1.))';
      },
      contain: function (A) {
        return '.5+(uv-.5)*vec2(max(ratio/' + A + ',1.),max(' + A + '/ratio,1.))';
      },
      stretch: function () {
        return 'uv';
      },
    };
    e.default = function (A, e) {
      var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
        r = n({ resizeMode: 'cover' }, t).resizeMode,
        o = (0, i.default)(
          A,
          'attribute vec2 _p;\nvarying vec2 _uv;\nvoid main() {\ngl_Position = vec4(_p,0.0,1.0);\n_uv = vec2(0.5, 0.5) * (_p+vec2(1.0, 1.0));\n}',
          (function (A, e) {
            var t = a[e];
            if (!t) throw new Error('invalid resizeMode=' + e);
            return (
              'precision highp float;varying vec2 _uv;uniform sampler2D from, to;uniform float progress, ratio, _fromR, _toR;vec4 getFromColor(vec2 uv){return texture2D(from,' +
              t('_fromR') +
              ');}vec4 getToColor(vec2 uv){return texture2D(to,' +
              t('_toR') +
              ');}\n' +
              A +
              '\nvoid main(){gl_FragColor=transition(_uv);}'
            );
          })(e.glsl, r)
        );
      return (
        o.bind(),
        o.attributes._p.pointer(),
        {
          draw: function (t, r, n) {
            var i =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : A.drawingBufferWidth,
              a =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : A.drawingBufferHeight,
              s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
            (o.bind(),
              (o.uniforms.ratio = i / a),
              (o.uniforms.progress = t),
              (o.uniforms.from = r.bind(0)),
              (o.uniforms.to = n.bind(1)),
              (o.uniforms._fromR = r.shape[0] / r.shape[1]),
              (o.uniforms._toR = n.shape[0] / n.shape[1]));
            var c = 2;
            for (var u in e.paramsTypes) {
              var B = u in s ? s[u] : e.defaultParams[u];
              if ('sampler2D' === e.paramsTypes[u])
                if (B) {
                  if ('function' != typeof B.bind)
                    throw new Error(
                      'uniform[' + u + ']: A gl-texture2d API-like object was expected'
                    );
                  o.uniforms[u] = B.bind(c++);
                } else
                  console.warn(
                    'uniform[' +
                      u +
                      ']: A texture MUST be defined for uniform sampler2D of a texture'
                  );
              else o.uniforms[u] = B;
            }
            A.drawArrays(A.TRIANGLES, 0, 3);
          },
          dispose: function () {
            o.dispose();
          },
        }
      );
    };
  },
  '47hU': function (A, e, t) {
    'use strict';
    var r =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (A) {
              return typeof A;
            }
          : function (A) {
              return A &&
                'function' == typeof Symbol &&
                A.constructor === Symbol &&
                A !== Symbol.prototype
                ? 'symbol'
                : typeof A;
            },
      n = t('Y4Gl'),
      o = t('4pkP'),
      i = t('1TIj');
    A.exports = function (A) {
      if (arguments.length <= 1)
        throw new Error('gl-texture2d: Missing arguments for texture2d constructor');
      a ||
        (function (A) {
          ((a = [
            A.LINEAR,
            A.NEAREST_MIPMAP_LINEAR,
            A.LINEAR_MIPMAP_NEAREST,
            A.LINEAR_MIPMAP_NEAREST,
          ]),
            (s = [
              A.NEAREST,
              A.LINEAR,
              A.NEAREST_MIPMAP_NEAREST,
              A.NEAREST_MIPMAP_LINEAR,
              A.LINEAR_MIPMAP_NEAREST,
              A.LINEAR_MIPMAP_LINEAR,
            ]),
            (c = [A.REPEAT, A.CLAMP_TO_EDGE, A.MIRRORED_REPEAT]));
        })(A);
      if ('number' == typeof arguments[1])
        return d(
          A,
          arguments[1],
          arguments[2],
          arguments[3] || A.RGBA,
          arguments[4] || A.UNSIGNED_BYTE
        );
      if (Array.isArray(arguments[1]))
        return d(
          A,
          0 | arguments[1][0],
          0 | arguments[1][1],
          arguments[2] || A.RGBA,
          arguments[3] || A.UNSIGNED_BYTE
        );
      if ('object' === r(arguments[1])) {
        var e = arguments[1],
          t = u(e) ? e : e.raw;
        if (t)
          return (function (A, e, t, r, n, o) {
            var i = w(A);
            return (A.texImage2D(A.TEXTURE_2D, 0, n, n, o, e), new f(A, i, t, r, n, o));
          })(
            A,
            t,
            0 | e.width,
            0 | e.height,
            arguments[2] || A.RGBA,
            arguments[3] || A.UNSIGNED_BYTE
          );
        if (e.shape && e.data && e.stride)
          return (function (A, e) {
            var t = e.dtype,
              r = e.shape.slice(),
              a = A.getParameter(A.MAX_TEXTURE_SIZE);
            if (r[0] < 0 || r[0] > a || r[1] < 0 || r[1] > a)
              throw new Error('gl-texture2d: Invalid texture size');
            var s = g(r, e.stride.slice()),
              c = 0;
            'float32' === t
              ? (c = A.FLOAT)
              : 'float64' === t
                ? ((c = A.FLOAT), (s = !1), (t = 'float32'))
                : 'uint8' === t
                  ? (c = A.UNSIGNED_BYTE)
                  : ((c = A.UNSIGNED_BYTE), (s = !1), (t = 'uint8'));
            var u,
              l,
              h = 0;
            if (2 === r.length)
              ((h = A.LUMINANCE),
                (r = [r[0], r[1], 1]),
                (e = n(e.data, r, [e.stride[0], e.stride[1], 1], e.offset)));
            else {
              if (3 !== r.length) throw new Error('gl-texture2d: Invalid shape for texture');
              if (1 === r[2]) h = A.ALPHA;
              else if (2 === r[2]) h = A.LUMINANCE_ALPHA;
              else if (3 === r[2]) h = A.RGB;
              else {
                if (4 !== r[2]) throw new Error('gl-texture2d: Invalid shape for pixel coords');
                h = A.RGBA;
              }
            }
            c !== A.FLOAT ||
              A.getExtension('OES_texture_float') ||
              ((c = A.UNSIGNED_BYTE), (s = !1));
            var d = e.size;
            if (s)
              u =
                0 === e.offset && e.data.length === d
                  ? e.data
                  : e.data.subarray(e.offset, e.offset + d);
            else {
              var E = [r[2], r[2] * r[0], 1];
              l = i.malloc(d, t);
              var p = n(l, r, E, 0);
              (('float32' !== t && 'float64' !== t) || c !== A.UNSIGNED_BYTE
                ? o.assign(p, e)
                : B(p, e),
                (u = l.subarray(0, d)));
            }
            var Q = w(A);
            (A.texImage2D(A.TEXTURE_2D, 0, h, r[0], r[1], 0, h, c, u), s || i.free(l));
            return new f(A, Q, r[0], r[1], h, c);
          })(A, e);
      }
      throw new Error('gl-texture2d: Invalid arguments for texture2d constructor');
    };
    var a = null,
      s = null,
      c = null;
    function u(A) {
      return (
        ('undefined' != typeof HTMLCanvasElement && A instanceof HTMLCanvasElement) ||
        ('undefined' != typeof HTMLImageElement && A instanceof HTMLImageElement) ||
        ('undefined' != typeof HTMLVideoElement && A instanceof HTMLVideoElement) ||
        ('undefined' != typeof ImageData && A instanceof ImageData)
      );
    }
    var B = function (A, e) {
      o.muls(A, e, 255);
    };
    function l(A, e, t) {
      var r = A.gl,
        n = r.getParameter(r.MAX_TEXTURE_SIZE);
      if (e < 0 || e > n || t < 0 || t > n) throw new Error('gl-texture2d: Invalid texture size');
      return (
        (A._shape = [e, t]),
        A.bind(),
        r.texImage2D(r.TEXTURE_2D, 0, A.format, e, t, 0, A.format, A.type, null),
        (A._mipLevels = [0]),
        A
      );
    }
    function f(A, e, t, r, n, o) {
      ((this.gl = A),
        (this.handle = e),
        (this.format = n),
        (this.type = o),
        (this._shape = [t, r]),
        (this._mipLevels = [0]),
        (this._magFilter = A.NEAREST),
        (this._minFilter = A.NEAREST),
        (this._wrapS = A.CLAMP_TO_EDGE),
        (this._wrapT = A.CLAMP_TO_EDGE),
        (this._anisoSamples = 1));
      var i = this,
        a = [this._wrapS, this._wrapT];
      (Object.defineProperties(a, [
        {
          get: function () {
            return i._wrapS;
          },
          set: function (A) {
            return (i.wrapS = A);
          },
        },
        {
          get: function () {
            return i._wrapT;
          },
          set: function (A) {
            return (i.wrapT = A);
          },
        },
      ]),
        (this._wrapVector = a));
      var s = [this._shape[0], this._shape[1]];
      (Object.defineProperties(s, [
        {
          get: function () {
            return i._shape[0];
          },
          set: function (A) {
            return (i.width = A);
          },
        },
        {
          get: function () {
            return i._shape[1];
          },
          set: function (A) {
            return (i.height = A);
          },
        },
      ]),
        (this._shapeVector = s));
    }
    var h = f.prototype;
    function g(A, e) {
      return 3 === A.length
        ? 1 === e[2] && e[1] === A[0] * A[2] && e[0] === A[2]
        : 1 === e[0] && e[1] === A[0];
    }
    function w(A) {
      var e = A.createTexture();
      return (
        A.bindTexture(A.TEXTURE_2D, e),
        A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MIN_FILTER, A.NEAREST),
        A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MAG_FILTER, A.NEAREST),
        A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_S, A.CLAMP_TO_EDGE),
        A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_T, A.CLAMP_TO_EDGE),
        e
      );
    }
    function d(A, e, t, r, n) {
      var o = A.getParameter(A.MAX_TEXTURE_SIZE);
      if (e < 0 || e > o || t < 0 || t > o) throw new Error('gl-texture2d: Invalid texture shape');
      if (n === A.FLOAT && !A.getExtension('OES_texture_float'))
        throw new Error('gl-texture2d: Floating point textures not supported on this platform');
      var i = w(A);
      return (A.texImage2D(A.TEXTURE_2D, 0, r, e, t, 0, r, n, null), new f(A, i, e, t, r, n));
    }
    (Object.defineProperties(h, {
      minFilter: {
        get: function () {
          return this._minFilter;
        },
        set: function (A) {
          this.bind();
          var e = this.gl;
          if (
            (this.type === e.FLOAT &&
              a.indexOf(A) >= 0 &&
              (e.getExtension('OES_texture_float_linear') || (A = e.NEAREST)),
            s.indexOf(A) < 0)
          )
            throw new Error('gl-texture2d: Unknown filter mode ' + A);
          return (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, A), (this._minFilter = A));
        },
      },
      magFilter: {
        get: function () {
          return this._magFilter;
        },
        set: function (A) {
          this.bind();
          var e = this.gl;
          if (
            (this.type === e.FLOAT &&
              a.indexOf(A) >= 0 &&
              (e.getExtension('OES_texture_float_linear') || (A = e.NEAREST)),
            s.indexOf(A) < 0)
          )
            throw new Error('gl-texture2d: Unknown filter mode ' + A);
          return (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, A), (this._magFilter = A));
        },
      },
      mipSamples: {
        get: function () {
          return this._anisoSamples;
        },
        set: function (A) {
          var e = this._anisoSamples;
          if (((this._anisoSamples = 0 | Math.max(A, 1)), e !== this._anisoSamples)) {
            var t = this.gl.getExtension('EXT_texture_filter_anisotropic');
            t &&
              this.gl.texParameterf(
                this.gl.TEXTURE_2D,
                t.TEXTURE_MAX_ANISOTROPY_EXT,
                this._anisoSamples
              );
          }
          return this._anisoSamples;
        },
      },
      wrapS: {
        get: function () {
          return this._wrapS;
        },
        set: function (A) {
          if ((this.bind(), c.indexOf(A) < 0))
            throw new Error('gl-texture2d: Unknown wrap mode ' + A);
          return (
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, A),
            (this._wrapS = A)
          );
        },
      },
      wrapT: {
        get: function () {
          return this._wrapT;
        },
        set: function (A) {
          if ((this.bind(), c.indexOf(A) < 0))
            throw new Error('gl-texture2d: Unknown wrap mode ' + A);
          return (
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, A),
            (this._wrapT = A)
          );
        },
      },
      wrap: {
        get: function () {
          return this._wrapVector;
        },
        set: function (A) {
          if ((Array.isArray(A) || (A = [A, A]), 2 !== A.length))
            throw new Error('gl-texture2d: Must specify wrap mode for rows and columns');
          for (var e = 0; e < 2; ++e)
            if (c.indexOf(A[e]) < 0) throw new Error('gl-texture2d: Unknown wrap mode ' + A);
          ((this._wrapS = A[0]), (this._wrapT = A[1]));
          var t = this.gl;
          return (
            this.bind(),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, this._wrapS),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, this._wrapT),
            A
          );
        },
      },
      shape: {
        get: function () {
          return this._shapeVector;
        },
        set: function (A) {
          if (Array.isArray(A)) {
            if (2 !== A.length) throw new Error('gl-texture2d: Invalid texture shape');
          } else A = [0 | A, 0 | A];
          return (l(this, 0 | A[0], 0 | A[1]), [0 | A[0], 0 | A[1]]);
        },
      },
      width: {
        get: function () {
          return this._shape[0];
        },
        set: function (A) {
          return (l(this, (A |= 0), this._shape[1]), A);
        },
      },
      height: {
        get: function () {
          return this._shape[1];
        },
        set: function (A) {
          return ((A |= 0), l(this, this._shape[0], A), A);
        },
      },
    }),
      (h.bind = function (A) {
        var e = this.gl;
        return (
          void 0 !== A && e.activeTexture(e.TEXTURE0 + (0 | A)),
          e.bindTexture(e.TEXTURE_2D, this.handle),
          void 0 !== A ? 0 | A : e.getParameter(e.ACTIVE_TEXTURE) - e.TEXTURE0
        );
      }),
      (h.dispose = function () {
        this.gl.deleteTexture(this.handle);
      }),
      (h.generateMipmap = function () {
        (this.bind(), this.gl.generateMipmap(this.gl.TEXTURE_2D));
        for (var A = Math.min(this._shape[0], this._shape[1]), e = 0; A > 0; ++e, A >>>= 1)
          this._mipLevels.indexOf(e) < 0 && this._mipLevels.push(e);
      }),
      (h.setPixels = function (A, e, t, r) {
        var a = this.gl;
        (this.bind(),
          Array.isArray(e)
            ? ((r = t), (t = 0 | e[1]), (e = 0 | e[0]))
            : ((e = e || 0), (t = t || 0)),
          (r = r || 0));
        var s = u(A) ? A : A.raw;
        if (s) {
          this._mipLevels.indexOf(r) < 0
            ? (a.texImage2D(a.TEXTURE_2D, 0, this.format, this.format, this.type, s),
              this._mipLevels.push(r))
            : a.texSubImage2D(a.TEXTURE_2D, r, e, t, this.format, this.type, s);
        } else {
          if (!(A.shape && A.stride && A.data))
            throw new Error('gl-texture2d: Unsupported data type');
          if (
            A.shape.length < 2 ||
            e + A.shape[1] > this._shape[1] >>> r ||
            t + A.shape[0] > this._shape[0] >>> r ||
            e < 0 ||
            t < 0
          )
            throw new Error('gl-texture2d: Texture dimensions are out of bounds');
          !(function (A, e, t, r, a, s, c, u) {
            var l = u.dtype,
              f = u.shape.slice();
            if (f.length < 2 || f.length > 3)
              throw new Error('gl-texture2d: Invalid ndarray, must be 2d or 3d');
            var h = 0,
              w = 0,
              d = g(f, u.stride.slice());
            'float32' === l
              ? (h = A.FLOAT)
              : 'float64' === l
                ? ((h = A.FLOAT), (d = !1), (l = 'float32'))
                : 'uint8' === l
                  ? (h = A.UNSIGNED_BYTE)
                  : ((h = A.UNSIGNED_BYTE), (d = !1), (l = 'uint8'));
            if (2 === f.length)
              ((w = A.LUMINANCE),
                (f = [f[0], f[1], 1]),
                (u = n(u.data, f, [u.stride[0], u.stride[1], 1], u.offset)));
            else {
              if (3 !== f.length) throw new Error('gl-texture2d: Invalid shape for texture');
              if (1 === f[2]) w = A.ALPHA;
              else if (2 === f[2]) w = A.LUMINANCE_ALPHA;
              else if (3 === f[2]) w = A.RGB;
              else {
                if (4 !== f[2]) throw new Error('gl-texture2d: Invalid shape for pixel coords');
                w = A.RGBA;
              }
              f[2];
            }
            (w !== A.LUMINANCE && w !== A.ALPHA) || (a !== A.LUMINANCE && a !== A.ALPHA) || (w = a);
            if (w !== a) throw new Error('gl-texture2d: Incompatible texture format for setPixels');
            var E = u.size,
              p = c.indexOf(r) < 0;
            p && c.push(r);
            if (h === s && d)
              0 === u.offset && u.data.length === E
                ? p
                  ? A.texImage2D(A.TEXTURE_2D, r, a, f[0], f[1], 0, a, s, u.data)
                  : A.texSubImage2D(A.TEXTURE_2D, r, e, t, f[0], f[1], a, s, u.data)
                : p
                  ? A.texImage2D(
                      A.TEXTURE_2D,
                      r,
                      a,
                      f[0],
                      f[1],
                      0,
                      a,
                      s,
                      u.data.subarray(u.offset, u.offset + E)
                    )
                  : A.texSubImage2D(
                      A.TEXTURE_2D,
                      r,
                      e,
                      t,
                      f[0],
                      f[1],
                      a,
                      s,
                      u.data.subarray(u.offset, u.offset + E)
                    );
            else {
              var Q;
              Q = s === A.FLOAT ? i.mallocFloat32(E) : i.mallocUint8(E);
              var U = n(Q, f, [f[2], f[2] * f[0], 1]);
              (h === A.FLOAT && s === A.UNSIGNED_BYTE ? B(U, u) : o.assign(U, u),
                p
                  ? A.texImage2D(A.TEXTURE_2D, r, a, f[0], f[1], 0, a, s, Q.subarray(0, E))
                  : A.texSubImage2D(A.TEXTURE_2D, r, e, t, f[0], f[1], a, s, Q.subarray(0, E)),
                s === A.FLOAT ? i.freeFloat32(Q) : i.freeUint8(Q));
            }
          })(a, e, t, r, this.format, this.type, this._mipLevels, A);
        }
      }));
  },
  '4pkP': function (A, e, t) {
    'use strict';
    var r = t('BAkm'),
      n = { body: '', args: [], thisVars: [], localVars: [] };
    function o(A) {
      if (!A) return n;
      for (var e = 0; e < A.args.length; ++e) {
        var t = A.args[e];
        A.args[e] =
          0 === e
            ? { name: t, lvalue: !0, rvalue: !!A.rvalue, count: A.count || 1 }
            : { name: t, lvalue: !1, rvalue: !0, count: 1 };
      }
      return (A.thisVars || (A.thisVars = []), A.localVars || (A.localVars = []), A);
    }
    function i(A) {
      for (var e = [], t = 0; t < A.args.length; ++t) e.push('a' + t);
      return new Function(
        'P',
        [
          'return function ',
          A.funcName,
          '_ndarrayops(',
          e.join(','),
          ') {P(',
          e.join(','),
          ');return a0}',
        ].join('')
      )(
        (function (A) {
          return r({
            args: A.args,
            pre: o(A.pre),
            body: o(A.body),
            post: o(A.proc),
            funcName: A.funcName,
          });
        })(A)
      );
    }
    var a = {
      add: '+',
      sub: '-',
      mul: '*',
      div: '/',
      mod: '%',
      band: '&',
      bor: '|',
      bxor: '^',
      lshift: '<<',
      rshift: '>>',
      rrshift: '>>>',
    };
    !(function () {
      for (var A in a) {
        var t = a[A];
        ((e[A] = i({
          args: ['array', 'array', 'array'],
          body: { args: ['a', 'b', 'c'], body: 'a=b' + t + 'c' },
          funcName: A,
        })),
          (e[A + 'eq'] = i({
            args: ['array', 'array'],
            body: { args: ['a', 'b'], body: 'a' + t + '=b' },
            rvalue: !0,
            funcName: A + 'eq',
          })),
          (e[A + 's'] = i({
            args: ['array', 'array', 'scalar'],
            body: { args: ['a', 'b', 's'], body: 'a=b' + t + 's' },
            funcName: A + 's',
          })),
          (e[A + 'seq'] = i({
            args: ['array', 'scalar'],
            body: { args: ['a', 's'], body: 'a' + t + '=s' },
            rvalue: !0,
            funcName: A + 'seq',
          })));
      }
    })();
    var s = { not: '!', bnot: '~', neg: '-', recip: '1.0/' };
    !(function () {
      for (var A in s) {
        var t = s[A];
        ((e[A] = i({
          args: ['array', 'array'],
          body: { args: ['a', 'b'], body: 'a=' + t + 'b' },
          funcName: A,
        })),
          (e[A + 'eq'] = i({
            args: ['array'],
            body: { args: ['a'], body: 'a=' + t + 'a' },
            rvalue: !0,
            count: 2,
            funcName: A + 'eq',
          })));
      }
    })();
    var c = { and: '&&', or: '||', eq: '===', neq: '!==', lt: '<', gt: '>', leq: '<=', geq: '>=' };
    !(function () {
      for (var A in c) {
        var t = c[A];
        ((e[A] = i({
          args: ['array', 'array', 'array'],
          body: { args: ['a', 'b', 'c'], body: 'a=b' + t + 'c' },
          funcName: A,
        })),
          (e[A + 's'] = i({
            args: ['array', 'array', 'scalar'],
            body: { args: ['a', 'b', 's'], body: 'a=b' + t + 's' },
            funcName: A + 's',
          })),
          (e[A + 'eq'] = i({
            args: ['array', 'array'],
            body: { args: ['a', 'b'], body: 'a=a' + t + 'b' },
            rvalue: !0,
            count: 2,
            funcName: A + 'eq',
          })),
          (e[A + 'seq'] = i({
            args: ['array', 'scalar'],
            body: { args: ['a', 's'], body: 'a=a' + t + 's' },
            rvalue: !0,
            count: 2,
            funcName: A + 'seq',
          })));
      }
    })();
    var u = [
      'abs',
      'acos',
      'asin',
      'atan',
      'ceil',
      'cos',
      'exp',
      'floor',
      'log',
      'round',
      'sin',
      'sqrt',
      'tan',
    ];
    !(function () {
      for (var A = 0; A < u.length; ++A) {
        var t = u[A];
        ((e[t] = i({
          args: ['array', 'array'],
          pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
          body: { args: ['a', 'b'], body: 'a=this_f(b)', thisVars: ['this_f'] },
          funcName: t,
        })),
          (e[t + 'eq'] = i({
            args: ['array'],
            pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
            body: { args: ['a'], body: 'a=this_f(a)', thisVars: ['this_f'] },
            rvalue: !0,
            count: 2,
            funcName: t + 'eq',
          })));
      }
    })();
    var B = ['max', 'min', 'atan2', 'pow'];
    !(function () {
      for (var A = 0; A < B.length; ++A) {
        var t = B[A];
        ((e[t] = i({
          args: ['array', 'array', 'array'],
          pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
          body: { args: ['a', 'b', 'c'], body: 'a=this_f(b,c)', thisVars: ['this_f'] },
          funcName: t,
        })),
          (e[t + 's'] = i({
            args: ['array', 'array', 'scalar'],
            pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
            body: { args: ['a', 'b', 'c'], body: 'a=this_f(b,c)', thisVars: ['this_f'] },
            funcName: t + 's',
          })),
          (e[t + 'eq'] = i({
            args: ['array', 'array'],
            pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
            body: { args: ['a', 'b'], body: 'a=this_f(a,b)', thisVars: ['this_f'] },
            rvalue: !0,
            count: 2,
            funcName: t + 'eq',
          })),
          (e[t + 'seq'] = i({
            args: ['array', 'scalar'],
            pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
            body: { args: ['a', 'b'], body: 'a=this_f(a,b)', thisVars: ['this_f'] },
            rvalue: !0,
            count: 2,
            funcName: t + 'seq',
          })));
      }
    })();
    var l = ['atan2', 'pow'];
    (!(function () {
      for (var A = 0; A < l.length; ++A) {
        var t = l[A];
        ((e[t + 'op'] = i({
          args: ['array', 'array', 'array'],
          pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
          body: { args: ['a', 'b', 'c'], body: 'a=this_f(c,b)', thisVars: ['this_f'] },
          funcName: t + 'op',
        })),
          (e[t + 'ops'] = i({
            args: ['array', 'array', 'scalar'],
            pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
            body: { args: ['a', 'b', 'c'], body: 'a=this_f(c,b)', thisVars: ['this_f'] },
            funcName: t + 'ops',
          })),
          (e[t + 'opeq'] = i({
            args: ['array', 'array'],
            pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
            body: { args: ['a', 'b'], body: 'a=this_f(b,a)', thisVars: ['this_f'] },
            rvalue: !0,
            count: 2,
            funcName: t + 'opeq',
          })),
          (e[t + 'opseq'] = i({
            args: ['array', 'scalar'],
            pre: { args: [], body: 'this_f=Math.' + t, thisVars: ['this_f'] },
            body: { args: ['a', 'b'], body: 'a=this_f(b,a)', thisVars: ['this_f'] },
            rvalue: !0,
            count: 2,
            funcName: t + 'opseq',
          })));
      }
    })(),
      (e.any = r({
        args: ['array'],
        pre: n,
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
          body: 'if(a){return true}',
          localVars: [],
          thisVars: [],
        },
        post: { args: [], localVars: [], thisVars: [], body: 'return false' },
        funcName: 'any',
      })),
      (e.all = r({
        args: ['array'],
        pre: n,
        body: {
          args: [{ name: 'x', lvalue: !1, rvalue: !0, count: 1 }],
          body: 'if(!x){return false}',
          localVars: [],
          thisVars: [],
        },
        post: { args: [], localVars: [], thisVars: [], body: 'return true' },
        funcName: 'all',
      })),
      (e.sum = r({
        args: ['array'],
        pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=0' },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
          body: 'this_s+=a',
          localVars: [],
          thisVars: ['this_s'],
        },
        post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return this_s' },
        funcName: 'sum',
      })),
      (e.prod = r({
        args: ['array'],
        pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=1' },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 1 }],
          body: 'this_s*=a',
          localVars: [],
          thisVars: ['this_s'],
        },
        post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return this_s' },
        funcName: 'prod',
      })),
      (e.norm2squared = r({
        args: ['array'],
        pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=0' },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 2 }],
          body: 'this_s+=a*a',
          localVars: [],
          thisVars: ['this_s'],
        },
        post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return this_s' },
        funcName: 'norm2squared',
      })),
      (e.norm2 = r({
        args: ['array'],
        pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=0' },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 2 }],
          body: 'this_s+=a*a',
          localVars: [],
          thisVars: ['this_s'],
        },
        post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return Math.sqrt(this_s)' },
        funcName: 'norm2',
      })),
      (e.norminf = r({
        args: ['array'],
        pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=0' },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 4 }],
          body: 'if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}',
          localVars: [],
          thisVars: ['this_s'],
        },
        post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return this_s' },
        funcName: 'norminf',
      })),
      (e.norm1 = r({
        args: ['array'],
        pre: { args: [], localVars: [], thisVars: ['this_s'], body: 'this_s=0' },
        body: {
          args: [{ name: 'a', lvalue: !1, rvalue: !0, count: 3 }],
          body: 'this_s+=a<0?-a:a',
          localVars: [],
          thisVars: ['this_s'],
        },
        post: { args: [], localVars: [], thisVars: ['this_s'], body: 'return this_s' },
        funcName: 'norm1',
      })),
      (e.sup = r({
        args: ['array'],
        pre: { body: 'this_h=-Infinity', args: [], thisVars: ['this_h'], localVars: [] },
        body: {
          body: 'if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_',
          args: [{ name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 }],
          thisVars: ['this_h'],
          localVars: [],
        },
        post: { body: 'return this_h', args: [], thisVars: ['this_h'], localVars: [] },
      })),
      (e.inf = r({
        args: ['array'],
        pre: { body: 'this_h=Infinity', args: [], thisVars: ['this_h'], localVars: [] },
        body: {
          body: 'if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_',
          args: [{ name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 }],
          thisVars: ['this_h'],
          localVars: [],
        },
        post: { body: 'return this_h', args: [], thisVars: ['this_h'], localVars: [] },
      })),
      (e.argmin = r({
        args: ['index', 'array', 'shape'],
        pre: {
          body: '{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}',
          args: [
            { name: '_inline_0_arg0_', lvalue: !1, rvalue: !1, count: 0 },
            { name: '_inline_0_arg1_', lvalue: !1, rvalue: !1, count: 0 },
            { name: '_inline_0_arg2_', lvalue: !1, rvalue: !0, count: 1 },
          ],
          thisVars: ['this_i', 'this_v'],
          localVars: [],
        },
        body: {
          body: '{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}',
          args: [
            { name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 },
            { name: '_inline_1_arg1_', lvalue: !1, rvalue: !0, count: 2 },
          ],
          thisVars: ['this_i', 'this_v'],
          localVars: ['_inline_1_k'],
        },
        post: { body: '{return this_i}', args: [], thisVars: ['this_i'], localVars: [] },
      })),
      (e.argmax = r({
        args: ['index', 'array', 'shape'],
        pre: {
          body: '{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}',
          args: [
            { name: '_inline_0_arg0_', lvalue: !1, rvalue: !1, count: 0 },
            { name: '_inline_0_arg1_', lvalue: !1, rvalue: !1, count: 0 },
            { name: '_inline_0_arg2_', lvalue: !1, rvalue: !0, count: 1 },
          ],
          thisVars: ['this_i', 'this_v'],
          localVars: [],
        },
        body: {
          body: '{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}',
          args: [
            { name: '_inline_1_arg0_', lvalue: !1, rvalue: !0, count: 2 },
            { name: '_inline_1_arg1_', lvalue: !1, rvalue: !0, count: 2 },
          ],
          thisVars: ['this_i', 'this_v'],
          localVars: ['_inline_1_k'],
        },
        post: { body: '{return this_i}', args: [], thisVars: ['this_i'], localVars: [] },
      })),
      (e.random = i({
        args: ['array'],
        pre: { args: [], body: 'this_f=Math.random', thisVars: ['this_f'] },
        body: { args: ['a'], body: 'a=this_f()', thisVars: ['this_f'] },
        funcName: 'random',
      })),
      (e.assign = i({
        args: ['array', 'array'],
        body: { args: ['a', 'b'], body: 'a=b' },
        funcName: 'assign',
      })),
      (e.assigns = i({
        args: ['array', 'scalar'],
        body: { args: ['a', 'b'], body: 'a=b' },
        funcName: 'assigns',
      })),
      (e.equals = r({
        args: ['array', 'array'],
        pre: n,
        body: {
          args: [
            { name: 'x', lvalue: !1, rvalue: !0, count: 1 },
            { name: 'y', lvalue: !1, rvalue: !0, count: 1 },
          ],
          body: 'if(x!==y){return false}',
          localVars: [],
          thisVars: [],
        },
        post: { args: [], localVars: [], thisVars: [], body: 'return true' },
        funcName: 'equals',
      })));
  },
  AL2p: function (A, e, t) {
    'use strict';
    var r =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (A) {
            return typeof A;
          }
        : function (A) {
            return A &&
              'function' == typeof Symbol &&
              A.constructor === Symbol &&
              A !== Symbol.prototype
              ? 'symbol'
              : typeof A;
          };
    A.exports = function (A, e) {
      switch ((void 0 === e && (e = 0), void 0 === A ? 'undefined' : r(A))) {
        case 'number':
          if (A > 0)
            return (function (A, e) {
              var t, r;
              for (t = new Array(A), r = 0; r < A; ++r) t[r] = e;
              return t;
            })(0 | A, e);
          break;
        case 'object':
          if ('number' == typeof A.length)
            return (function A(e, t, r) {
              var n = 0 | e[r];
              if (n <= 0) return [];
              var o,
                i = new Array(n);
              if (r === e.length - 1) for (o = 0; o < n; ++o) i[o] = t;
              else for (o = 0; o < n; ++o) i[o] = A(e, t, r + 1);
              return i;
            })(A, e, 0);
      }
      return [];
    };
  },
  BAkm: function (A, e, t) {
    'use strict';
    var r =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (A) {
              return typeof A;
            }
          : function (A) {
              return A &&
                'function' == typeof Symbol &&
                A.constructor === Symbol &&
                A !== Symbol.prototype
                ? 'symbol'
                : typeof A;
            },
      n = t('GaOS');
    A.exports = function (A) {
      var e = new (function () {
        ((this.argTypes = []),
          (this.shimArgs = []),
          (this.arrayArgs = []),
          (this.arrayBlockIndices = []),
          (this.scalarArgs = []),
          (this.offsetArgs = []),
          (this.offsetArgIndex = []),
          (this.indexArgs = []),
          (this.shapeArgs = []),
          (this.funcName = ''),
          (this.pre = null),
          (this.body = null),
          (this.post = null),
          (this.debug = !1));
      })();
      ((e.pre = A.pre), (e.body = A.body), (e.post = A.post));
      var t = A.args.slice(0);
      e.argTypes = t;
      for (var o = 0; o < t.length; ++o) {
        var i = t[o];
        if ('array' === i || ('object' === (void 0 === i ? 'undefined' : r(i)) && i.blockIndices)) {
          if (
            ((e.argTypes[o] = 'array'),
            e.arrayArgs.push(o),
            e.arrayBlockIndices.push(i.blockIndices ? i.blockIndices : 0),
            e.shimArgs.push('array' + o),
            o < e.pre.args.length && e.pre.args[o].count > 0)
          )
            throw new Error('cwise: pre() block may not reference array args');
          if (o < e.post.args.length && e.post.args[o].count > 0)
            throw new Error('cwise: post() block may not reference array args');
        } else if ('scalar' === i) (e.scalarArgs.push(o), e.shimArgs.push('scalar' + o));
        else if ('index' === i) {
          if ((e.indexArgs.push(o), o < e.pre.args.length && e.pre.args[o].count > 0))
            throw new Error('cwise: pre() block may not reference array index');
          if (o < e.body.args.length && e.body.args[o].lvalue)
            throw new Error('cwise: body() block may not write to array index');
          if (o < e.post.args.length && e.post.args[o].count > 0)
            throw new Error('cwise: post() block may not reference array index');
        } else if ('shape' === i) {
          if ((e.shapeArgs.push(o), o < e.pre.args.length && e.pre.args[o].lvalue))
            throw new Error('cwise: pre() block may not write to array shape');
          if (o < e.body.args.length && e.body.args[o].lvalue)
            throw new Error('cwise: body() block may not write to array shape');
          if (o < e.post.args.length && e.post.args[o].lvalue)
            throw new Error('cwise: post() block may not write to array shape');
        } else {
          if ('object' !== (void 0 === i ? 'undefined' : r(i)) || !i.offset)
            throw new Error('cwise: Unknown argument type ' + t[o]);
          ((e.argTypes[o] = 'offset'),
            e.offsetArgs.push({ array: i.array, offset: i.offset }),
            e.offsetArgIndex.push(o));
        }
      }
      if (e.arrayArgs.length <= 0) throw new Error('cwise: No array arguments specified');
      if (e.pre.args.length > t.length) throw new Error('cwise: Too many arguments in pre() block');
      if (e.body.args.length > t.length)
        throw new Error('cwise: Too many arguments in body() block');
      if (e.post.args.length > t.length)
        throw new Error('cwise: Too many arguments in post() block');
      return (
        (e.debug = !!A.printCode || !!A.debug),
        (e.funcName = A.funcName || 'cwise'),
        (e.blockSize = A.blockSize || 64),
        n(e)
      );
    };
  },
  BcGP: function (A, e, t) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 });
    var r = t('3c5u'),
      n = t.n(r),
      o = t('47hU'),
      i = t.n(o),
      a = t('eMjc'),
      s = t.n(a),
      c =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (A) {
              return typeof A;
            }
          : function (A) {
              return A &&
                'function' == typeof Symbol &&
                A.constructor === Symbol &&
                A !== Symbol.prototype
                ? 'symbol'
                : typeof A;
            },
      u =
        'function' == typeof Symbol && 'symbol' === c(Symbol.iterator)
          ? function (A) {
              return void 0 === A ? 'undefined' : c(A);
            }
          : function (A) {
              return A &&
                'function' == typeof Symbol &&
                A.constructor === Symbol &&
                A !== Symbol.prototype
                ? 'symbol'
                : void 0 === A
                  ? 'undefined'
                  : c(A);
            },
      B =
        Object.assign ||
        function (A) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (A[r] = t[r]);
          }
          return A;
        };
    (t('hKoQ').polyfill(), $('.js-start-generate-demo').addClass('is-' + window.userLang));
    var l = (window.earthDemo = window.earthDemo || {});
    l.transitions = {
      warp: {
        paramsTypes: { amplitude: 'float', waves: 'float', colorSeparation: 'float' },
        defaultParams: { amplitude: 1, waves: 30, colorSeparation: 0.3 },
        glsl: 'uniform float amplitude; // = 1.0\nuniform float waves; // = 30.0\nuniform float colorSeparation; // = 0.3\nfloat PI = 3.14159265358979323846264;\nfloat compute(vec2 p, float progress, vec2 center) {\nvec2 o = p*sin(progress * amplitude)-center;\n\nvec2 h = vec2(1., 0.);\nfloat theta = acos(dot(o, h)) * waves;\nreturn (exp(cos(theta)) - 2.*cos(4.*theta) + pow(sin((2.*theta - PI) / 24.), 5.)) / 10.;\n}\nvec4 transition(vec2 uv) {\nvec2 p = uv.xy / vec2(1.0).xy;\nfloat inv = 1. - progress;\nvec2 dir = p - vec2(.5);\nfloat dist = length(dir);\nfloat disp = compute(p, progress, vec2(0.5, 0.5)) ;\nvec4 texTo = getToColor(p + inv*disp);\nvec4 texFrom = vec4(\ngetFromColor(p + progress*disp*(1.0 - colorSeparation)).r,\ngetFromColor(p + progress*disp).g,\ngetFromColor(p + progress*disp*(1.0 + colorSeparation)).b,\n1.0);\nreturn texTo*progress + texFrom*inv;\n}',
      },
      offsetToUp: {
        paramsTypes: { direction: 'vec2' },
        defaultParams: { direction: [0, -1] },
        glsl: 'uniform vec2 direction; // = vec2(0.0, 1.0)\n\nvec4 transition (vec2 uv) {\nvec2 p = uv + progress * sign(direction);\nvec2 f = fract(p);\nreturn mix(\ngetToColor(f),\ngetFromColor(f),\nstep(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0)\n);\n}',
      },
      offsetToUpRight: {
        paramsTypes: { direction: 'vec2' },
        defaultParams: { direction: [-1, -1] },
        glsl: 'uniform vec2 direction; // = vec2(0.0, 1.0)\n\nvec4 transition (vec2 uv) {\nvec2 p = uv + progress * sign(direction);\nvec2 f = fract(p);\nreturn mix(\ngetToColor(f),\ngetFromColor(f),\nstep(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0)\n);\n}',
      },
      zoomIn: {
        paramsTypes: { strength: 'float' },
        defaultParams: { strength: 1 },
        glsl: 'uniform float strength; // = 0.4\n\nconst float PI = 3.141592653589793;\n\nfloat Exponential_easeInOut(in float begin, in float change, in float duration, in float time) {\nif (time == 0.0)\nreturn begin;\nelse if (time == duration)\nreturn begin + change;\ntime = time / (duration / 2.0);\nif (time < 1.0)\nreturn change / 2.0 * pow(2.0, 10.0 * (time - 1.0)) + begin;\nreturn change / 2.0 * (-pow(2.0, -10.0 * (time - 1.0)) + 2.0) + begin;\n}\n\nfloat Sinusoidal_easeInOut(in float begin, in float change, in float duration, in float time) {\nreturn -change / 2.0 * (cos(PI * time / duration) - 1.0) + begin;\n}\n\nfloat rand (vec2 co) {\nreturn fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvec3 crossFade(in vec2 uv, in float dissolve) {\nreturn mix(getFromColor(uv).rgb, getToColor(uv).rgb, dissolve);\n}\n\nvec4 transition(vec2 uv) {\nvec2 texCoord = uv.xy / vec2(1.0).xy;\n\nvec2 center = vec2(0.5, 0.5);\nfloat dissolve = Exponential_easeInOut(0.0, 1.0, 1.0, progress);\n\nfloat strength = Sinusoidal_easeInOut(0.0, strength, 0.5, progress);\n\nvec3 color = vec3(0.0);\nfloat total = 0.0;\nvec2 toCenter = center - texCoord;\n\nfloat offset = rand(uv);\nfor (float t = 0.0; t <= 40.0; t++) {\nfloat percent = (t + offset) / 40.0;\nfloat weight = 4.0 * (percent - percent * percent);\ncolor += crossFade(texCoord + toCenter * percent * strength, dissolve) * weight;\ntotal += weight;\n}\nreturn vec4(color / total, 1.0);\n}',
      },
      zoomOut: {
        paramsTypes: { strength: 'float' },
        defaultParams: { strength: -1 },
        glsl: 'uniform float strength; // = 0.4\n\nconst float PI = 3.141592653589793;\n\nfloat Exponential_easeInOut(in float begin, in float change, in float duration, in float time) {\nif (time == 0.0)\nreturn begin;\nelse if (time == duration)\nreturn begin + change;\ntime = time / (duration / 2.0);\nif (time < 1.0)\nreturn change / 2.0 * pow(2.0, 10.0 * (time - 1.0)) + begin;\nreturn change / 2.0 * (-pow(2.0, -10.0 * (time - 1.0)) + 2.0) + begin;\n}\n\nfloat Sinusoidal_easeInOut(in float begin, in float change, in float duration, in float time) {\nreturn -change / 2.0 * (cos(PI * time / duration) - 1.0) + begin;\n}\n\nfloat rand (vec2 co) {\nreturn fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvec3 crossFade(in vec2 uv, in float dissolve) {\nreturn mix(getFromColor(uv).rgb, getToColor(uv).rgb, dissolve);\n}\n\nvec4 transition(vec2 uv) {\nvec2 texCoord = uv.xy / vec2(1.0).xy;\n\nvec2 center = vec2(0.5, 0.5);\nfloat dissolve = Exponential_easeInOut(0.0, 1.0, 1.0, progress);\n\nfloat strength = Sinusoidal_easeInOut(0.0, strength, 0.5, progress);\n\nvec3 color = vec3(0.0);\nfloat total = 0.0;\nvec2 toCenter = center - texCoord;\n\nfloat offset = rand(uv);\nfor (float t = 0.0; t <= 40.0; t++) {\nfloat percent = (t + offset) / 40.0;\nfloat weight = 4.0 * (percent - percent * percent);\ncolor += crossFade(texCoord + toCenter * percent * strength, dissolve) * weight;\ntotal += weight;\n}\nreturn vec4(color / total, 1.0);\n}',
      },
      feed: {
        paramsTypes: { strength: 'float' },
        defaultParams: { strength: 0.6 },
        glsl: 'uniform float strength; // = 0.4\n\nconst float PI = 3.141592653589793;\n\nfloat Exponential_easeInOut(in float begin, in float change, in float duration, in float time) {\nif (time == 0.0)\nreturn begin;\nelse if (time == duration)\nreturn begin + change;\ntime = time / (duration / 2.0);\nif (time < 1.0)\nreturn change / 2.0 * pow(2.0, 10.0 * (time - 1.0)) + begin;\nreturn change / 2.0 * (-pow(2.0, -10.0 * (time - 1.0)) + 2.0) + begin;\n}\n\nfloat Sinusoidal_easeInOut(in float begin, in float change, in float duration, in float time) {\nreturn -change / 2.0 * (cos(PI * time / duration) - 1.0) + begin;\n}\n\nfloat rand (vec2 co) {\nreturn fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvec3 crossFade(in vec2 uv, in float dissolve) {\nreturn mix(getFromColor(uv).rgb, getToColor(uv).rgb, dissolve);\n}\n\nvec4 transition(vec2 uv) {\nvec2 texCoord = uv.xy / vec2(1.0).xy;\n\nvec2 center = vec2(0.6, 0.9);\nfloat dissolve = Exponential_easeInOut(0.0, 1.0, 1.0, progress);\n\nfloat strength = Sinusoidal_easeInOut(0.0, strength, 0.5, progress);\n\nvec3 color = vec3(0.0);\nfloat total = 0.0;\nvec2 toCenter = center - texCoord;\n\nfloat offset = rand(uv);\nfor (float t = 0.0; t <= 40.0; t++) {\nfloat percent = (t + offset) / 40.0;\nfloat weight = 4.0 * (percent - percent * percent);\ncolor += crossFade(texCoord + toCenter * percent * strength, dissolve) * weight;\ntotal += weight;\n}\nreturn vec4(color / total, 1.0);\n}',
      },
      pixelize: {
        name: 'pixelize',
        paramsTypes: { squaresMin: 'ivec2', steps: 'int' },
        defaultParams: { squaresMin: [20, 20], steps: 50 },
        glsl: '// Author: gre\n// License: MIT\n// forked from https://gist.github.com/benraziel/c528607361d90a072e98\n\nuniform ivec2 squaresMin/* = ivec2(20) */; // minimum number of squares (when the effect is at its higher level)\nuniform int steps /* = 50 */; // zero disable the stepping\n\nfloat d = min(progress, 1.0 - progress);\nfloat dist = steps>0 ? ceil(d * float(steps)) / float(steps) : d;\nvec2 squareSize = 2.0 * dist / vec2(squaresMin);\n\nvec4 transition(vec2 uv) {\n  vec2 p = dist>0.0 ? (floor(uv / squareSize) + 0.5) * squareSize : uv;\n  return mix(getFromColor(p), getToColor(p), progress);\n}\n',
        author: 'gre',
        license: 'MIT',
        createdAt: 'Tue, 30 May 2017 14:26:44 +0200',
        updatedAt: 'Wed, 31 May 2017 10:58:26 +0200',
      },
    };
    var f = (l.sizes = {
        '5:4': [1.25, 1],
        '4:5': [1, 1.25],
        '4:3': [1.33, 1],
        '3:4': [1, 1.33],
        '1_34:1': [1.34, 1],
        '1:1_34': [1, 1.34],
        '3:2': [1.5, 1],
        '2:3': [1, 1.5],
        '14:9': [1.56, 1],
        '9:14': [1, 1.56],
        '16:10': [1.6, 1],
        '10:16': [1, 1.6],
        '16:9': [1.78, 1],
        '9:16': [1, 1.78],
        '18:9': [2, 1],
        '9:18': [1, 2],
        '18_5:9': [2.05, 1],
        '9:18_5': [1, 2.05],
        '19_5:9': [2.17, 1],
        '9:19_5': [1, 2.17],
        '19:9': [2.11, 1],
        '9:19': [1, 2.11],
        '2_2:1': [2.2, 1],
        '1:2_2': [1, 2.2],
        '21:9': [2.3, 1],
        '9:21': [1, 2.3],
      }),
      h = '',
      g = window.userLang ? '--' + window.userLang : '--en';
    ((l.current = null),
      (l.currentCanvas = null),
      (l.nextCanvas = null),
      (l.stage = 0),
      (l.panorams = {}),
      (l.boot = function (A) {
        $.ajax({
          url:
            ('en' === window.userLang ? '' : '/' + window.userLang) +
            '/api/demo_variables/?' +
            Date.now(),
        }).done(function (e) {
          ((l.totalPanoramas = 0), (l.loadedPanoramas = 0), (l.data = e));
          for (var t = Object.keys(l.data), r = 0; r < t.length; r++) {
            var n = t[r];
            (l.data[n].panoramas &&
              'earth' !== l.data[n].panoramas[l.data[n].panoramas.length - 1].type &&
              l.data[n].panoramas.push({ type: 'earth', effect: 'zoomOut' }),
              'feed' === l.data[n].type &&
                'feed' !== l.data[n].panoramas[0].type &&
                l.data[n].panoramas.unshift({ type: 'feed', effect: 'feed', html: l.data[n].html }),
              (l.totalPanoramas += l.data[n].panoramas.length));
          }
          (l.createMode || A) && l.startAnimation();
        });
      }),
      l.boot(),
      (l.screenshots = {}),
      $.ajax({
        url:
          '/api/getscreen/' +
          (function () {
            window.innerWidth < 768 && (h = '--mobile');
            var A = Object.keys(f),
              e = [window.innerWidth, window.innerHeight],
              t = e[0] > e[1] ? [e[0] / e[1], 1] : [1, e[1] / e[0]],
              r = A.filter(function (A) {
                return (1 === t[0] && 1 === f[A][0]) || (1 === t[1] && 1 === f[A][1]);
              });
            return (
              r.sort(function (A, e) {
                if (1 === t[0]) {
                  if (Math.abs(t[1] - f[A][1]) < Math.abs(t[1] - f[e][1])) return -1;
                  if (Math.abs(t[1] - f[A][1]) > Math.abs(t[1] - f[e][1])) return 1;
                } else {
                  if (1 !== t[1]) return 0;
                  if (Math.abs(t[0] - f[A][0]) < Math.abs(t[0] - f[e][0])) return -1;
                  if (Math.abs(t[0] - f[A][0]) > Math.abs(t[0] - f[e][0])) return 1;
                }
              }),
              r[0]
            );
          })(),
      }).done(function (A) {
        l.screenshots = A.files;
      }),
      (l.startAnimation = function () {
        var A = l && l.data && l.data[index] ? l.data[index] : null;
        if (A && 'point' === A.type && A.year !== window.YEAR_ID) {
          if (l.createMode) {
            $('.js-timeline-item[data-year="2050"]').eq(0).trigger('click');
            var e = setInterval(function () {
              2050 === window.YEAR_ID
                ? (clearInterval(e), setTimeout(l.startAnimation, 2e3))
                : $('.js-timeline-item[data-year="2050"]').eq(0).trigger('click');
            }, 1e3);
          }
          return !1;
        }
        if (
          (window.PLANET.deactivateHexagon(),
          window.PLANET.commentToggle(!1),
          $('.kaspersky-app, .notifications-tooltip, .toogle-map-mobile').css(
            'pointer-events',
            'none'
          ),
          $('.planet-comment, .planet-comment-line, .main-container').addClass('demo-disable'),
          $(
            '.best-of-week, .kaspersky-app__map, .k-menu__container, .footer, .mobile-menu, .toogle-map-mobile, .k-menu-item_hamburger'
          ).addClass('demo-hide'),
          $('.authorization').addClass('demo-disable'),
          (l.earthCanvas = document.querySelector('.kaspersky-app__map')),
          (l.current = l.earthCanvas),
          (l.next = l.earthCanvas),
          (l.currentPanorama = 'earth'),
          (l.nextPanorama = 'earth'),
          (l.stage = 0),
          (l.running = !0),
          window.resizeEarth(),
          (l.initialization = { way: 1, item: 0 }),
          l && !l.createMode)
        ) {
          ($('.main-container').append(
            '<div class="demo-loader" style="display:none;"><div class="js-demo-loader-inner"></div></div>'
          ),
            (l.textExit = {
              ru: 'Нажмите сюда, чтобы выйти из демо режима',
              en: 'Click here to exit demo mode',
            }),
            $('.main-container').append(
              '<div class="demo-exit"><a href="' +
                window.langUrl +
                '" class="demo-exit__wrap js-demo-exit-link"><span class="demo-exit__text">' +
                ('ru' === window.userLang ? l.textExit.ru : l.textExit.en) +
                '</span></a></div>'
            ));
          var t = 0;
          for (var r in l.data) t += l.data[r].panoramas.length;
          (l.progressBarStart(0, 2 * t), l.initPanoramas());
        } else l.screenshotsInitializationPanorams();
      }));
    var w = 'Что-то пошло не так.<br/>Пожалуйста, перезагрузите страницу.',
      d = 'Something went wrong.<br/>Please reload the page.';
    ((l.progressBarStart = function (A, e) {
      ((l.progressBar = [A, e]),
        0 === e && (e = 1),
        $('.js-demo-loader-inner').css({
          width: (l.progressBar[0] / l.progressBar[1]) * 100 + '%',
        }),
        $('.demo-loader').fadeIn(100));
    }),
      (l.progressBarUpdate = function () {
        ((l.progressBar[0] += 1),
          $('.js-demo-loader-inner').css({
            width: (l.progressBar[0] / l.progressBar[1]) * 100 + '%',
          }));
      }),
      (l.progressBarEnd = function () {
        ($('.demo-loader').fadeOut(300), (l.stage = 0), l.processAnimation(1));
      }),
      (l.progressBarError = function () {
        ($('.demo-loader').find('.demo-loader__message').remove(),
          $('.demo-loader')
            .addClass('is-error')
            .append(
              '<span class="demo-loader__message">' + ('ru' === window.userLang ? w : d) + '</span>'
            ));
      }),
      (l.processAnimation = function (A) {
        if (((l.stageIndex = A), 0 === l.stage))
          if ('point' === l.data[A].type) {
            for (var e = 0, t = 0; t < window.PLANET.planetLocations.current_locations.length; t++)
              if (
                window.PLANET.planetLocations.current_locations[t].location_id ===
                l.data[A].location_id
              ) {
                e = t;
                break;
              }
            var r = !1;
            ('rabat' === l.data[A].location_id && (r = !0),
              window.PLANET.demoStartLocation(
                e,
                function () {
                  (l.stage++, l.processAnimation(A));
                },
                r
              ));
          } else
            'sputnik' === l.data[A].type
              ? window.PLANET.demoMoveToSputnik(l.data[A].location_id, function () {
                  (l.stage++, l.processAnimation(A));
                })
              : 'feed' === l.data[A].type &&
                (window.PLANET.stopEarth(),
                window.PLANET.stopSputnik(0),
                window.PLANET.stopSputnik(1),
                l.stage++,
                l.processAnimation(A));
        else
          l.switchPanorama(l.data[A].panoramas[l.stage - 1], function () {
            ($('#glTransition').remove(),
              l.stage < l.data[A].panoramas.length
                ? (l.stage++, l.processAnimation(A))
                : 'point' === l.data[A].type
                  ? window.PLANET.demoMoveFromHexagon(function () {
                      var e = Object.keys(l.data),
                        t = e.indexOf(A.toString());
                      void 0 !== e[t + 1]
                        ? ((l.stage = 0), l.processAnimation(e[t + 1]))
                        : l.makeScreenshots || ((l.stage = 0), l.processAnimation(e[0]));
                    })
                  : 'sputnik' === l.data[A].type
                    ? (window.PLANET.demoMoveFromSputnik(),
                      setTimeout(function () {
                        var e = Object.keys(l.data),
                          t = e.indexOf(A.toString());
                        void 0 !== e[t + 1]
                          ? ((l.stage = 0), l.processAnimation(e[t + 1]))
                          : l.makeScreenshots || ((l.stage = 0), l.processAnimation(e[0]));
                      }, 2e3))
                    : 'feed' === l.data[A].type &&
                      (window.PLANET.startEarth(),
                      window.PLANET.startSputnik(),
                      setTimeout(function () {
                        var e = Object.keys(l.data),
                          t = e.indexOf(A.toString());
                        void 0 !== e[t + 1]
                          ? ((l.stage = 0), l.processAnimation(e[t + 1]))
                          : l.makeScreenshots || ((l.stage = 0), l.processAnimation(e[0]));
                      }, 2e3)));
          });
      }),
      (l.initPanoramas = function () {
        var A = document.querySelector('#demoPanorams');
        A ||
          (((A = document.createElement('div')).id = 'demoPanorams'), $('.kaspersky-app').after(A));
        var e =
            l.data[window.earthDemo.initialization.way].panoramas[
              window.earthDemo.initialization.item
            ],
          t = document.createElement('div');
        if (
          (t.classList.add('demo-panorama'),
          t.classList.add('js-demo-panorama'),
          A.appendChild(t),
          'panorama' === e.type)
        ) {
          var r = e.data;
          ((t.innerHTML =
            '<div class="brief-360 brief-360_panorama"><div class="brief__panorama brief__panorama--next"><div class="brief__vr-exit-button" style="top: 200px; display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M6.586 8L1.293 2.707c-.39-.39-.39-1.024 0-1.414.39-.39 1.024-.39 1.414 0L8 6.586l5.293-5.293c.39-.39 1.024-.39 1.414 0 .39.39.39 1.024 0 1.414L9.414 8l5.293 5.293c.39.39.39 1.024 0 1.414-.39.39-1.024.39-1.414 0L8 9.414l-5.293 5.293c-.39.39-1.024.39-1.414 0-.39-.39-.39-1.024 0-1.414L6.586 8z" clip-rule="evenodd"></path></svg></div><div class="transition__preloader display-none" style="display: none;"></div><div class="timeline-new"><div data-year="2030" class="js-timeline-item timeline-new__item  ' +
            (2030 === (!!r.brief.year && r.brief.year) ? 'active disabled' : '') +
            '">2030</div><div data-year="2040" class="js-timeline-item timeline-new__item ' +
            (2040 === (!!r.brief.year && r.brief.year) ? 'active disabled' : '') +
            '">2040</div><div data-year="2050" class="js-timeline-item timeline-new__item ' +
            (2050 === (!!r.brief.year && r.brief.year) ? 'active disabled' : '') +
            '">2050</div></div><a href="/locations/' +
            r.brief.location.slug +
            '" class="brief__city-nane">' +
            r.brief.location.name +
            '</a></div></div>'),
            (kaspersky.artwork = r.showData));
          var n = $(t).find('.brief__panorama--next');
          (n.briefPanorama(r.showData, function () {
            (n.trigger('animate:stop'),
              (e.element = t),
              (e.imageFrom = document.createElement('img')),
              (e.imageFrom.crossOrigin = 'anonymous'),
              (e.imageTo = document.createElement('img')),
              (e.imageTo.crossOrigin = 'anonymous'),
              (e.screenshots = { from: '', to: '' }));
            var A = 0,
              r = 0,
              o = 0;
            ((e.imageFrom.onload = function () {
              ((e.screenshots.from = e.imageFrom),
                (e.imageFrom = null),
                l.progressBarUpdate(),
                ++A > 1 &&
                  (l.initialization.item++,
                  l.data[l.initialization.way].panoramas[l.initialization.item]
                    ? l.initPanoramas()
                    : (l.initialization.way++,
                      (l.initialization.item = 0),
                      l.data[l.initialization.way] ? l.initPanoramas() : l.progressBarEnd())));
            }),
              (e.imageTo.onload = function () {
                ((e.screenshots.to = e.imageTo),
                  (e.imageTo = null),
                  l.progressBarUpdate(),
                  ++A > 1 &&
                    (l.initialization.item++,
                    l.data[l.initialization.way].panoramas[l.initialization.item]
                      ? l.initPanoramas()
                      : (l.initialization.way++,
                        (l.initialization.item = 0),
                        l.data[l.initialization.way] ? l.initPanoramas() : l.progressBarEnd())));
              }),
              (e.imageFrom.onerror = function () {
                ++r > 1
                  ? l.progressBarError()
                  : ((e.imageFrom.src = ''),
                    (e.imageFrom.src =
                      '//' + l.screenshots[e.data.slug + '_start' + h + g].url + '?' + Date.now()));
              }),
              (e.imageTo.onerror = function () {
                ++o > 1
                  ? l.progressBarError()
                  : ((e.imageTo.src = ''),
                    (e.imageTo.src =
                      '//' + l.screenshots[e.data.slug + '_start' + h + g].url + '?' + Date.now()));
              }),
              (e.imageFrom.src =
                '//' + l.screenshots[e.data.slug + '_start' + h + g].url + '?' + Date.now()),
              (e.imageTo.src =
                '//' + l.screenshots[e.data.slug + '_end' + h + g].url + '?' + Date.now()),
              e.imageFrom.complete &&
                e.imageFrom.naturalWidth &&
                e.imageFrom.naturalWidth > 0 &&
                ((e.screenshots.from = e.imageFrom),
                (e.imageFrom = null),
                l.progressBarUpdate(),
                ++A > 1 &&
                  (l.initialization.item++,
                  l.data[l.initialization.way].panoramas[l.initialization.item]
                    ? l.initPanoramas()
                    : (l.initialization.way++,
                      (l.initialization.item = 0),
                      l.data[l.initialization.way] ? l.initPanoramas() : l.progressBarEnd()))),
              e.imageTo.complete &&
                e.imageTo.naturalWidth &&
                e.imageTo.naturalWidth > 0 &&
                ((e.screenshots.to = e.imageTo),
                (e.imageTo = null),
                l.progressBarUpdate(),
                ++A > 1 &&
                  (l.initialization.item++,
                  l.data[l.initialization.way].panoramas[l.initialization.item]
                    ? l.initPanoramas()
                    : (l.initialization.way++,
                      (l.initialization.item = 0),
                      l.data[l.initialization.way] ? l.initPanoramas() : l.progressBarEnd()))));
          }),
            (l.panorams[e.data.id] = B({}, window.PNRM)));
        } else if ('thing' === e.type) {
          r = e.data;
          ((t.innerHTML =
            '<div class="brief-360 brief-360_thing "> <div class="brief__panorama"> <div class="brief__panorama-wrap" style="background-image:url(//' +
            l.screenshots[e.data.slug + h + g].url +
            ')"></div><div class="timeline-new"><div data-year="2030" class="js-timeline-item timeline-new__item  ' +
            (2030 === (!!r.brief.year && r.brief.year) ? 'active disabled' : '') +
            '">2030</div><div data-year="2040" class="js-timeline-item timeline-new__item ' +
            (2040 === (!!r.brief.year && r.brief.year) ? 'active disabled' : '') +
            '">2040</div><div data-year="2050" class="js-timeline-item timeline-new__item ' +
            (2050 === (!!r.brief.year && r.brief.year) ? 'active disabled' : '') +
            '">2050</div></div><a href="/locations/' +
            r.brief.location.slug +
            '" class="brief__city-nane">' +
            r.brief.location.name +
            '</a> </div> </div>'),
            (e.element = t),
            (e.imageFrom = document.createElement('img')),
            (e.imageFrom.crossOrigin = 'anonymous'),
            (e.screenshots = { from: '', to: '' }));
          var o = 0;
          ((e.imageFrom.onload = function () {
            ((e.screenshots.from = e.imageFrom),
              (e.screenshots.to = e.imageFrom),
              (e.imageFrom = null),
              l.progressBarUpdate(),
              l.initialization.item++,
              l.data[l.initialization.way].panoramas[l.initialization.item]
                ? l.initPanoramas()
                : (l.initialization.way++,
                  (l.initialization.item = 0),
                  l.data[l.initialization.way] ? l.initPanoramas() : l.progressBarEnd()),
              (kaspersky.artwork = r.showData));
          }),
            (e.imageFrom.onerror = function () {
              ++o > 1
                ? l.progressBarError()
                : ((e.imageFrom.src = ''),
                  (e.imageFrom.src =
                    '//' + l.screenshots[e.data.slug + h + g].url + '?' + Date.now()));
            }),
            (e.imageFrom.src = '//' + l.screenshots[e.data.slug + h + g].url + '?' + Date.now()),
            e.imageFrom.complete &&
              e.imageFrom.naturalWidth &&
              e.imageFrom.naturalWidth > 0 &&
              ((e.screenshots.from = e.imageFrom),
              (e.screenshots.to = e.imageFrom),
              (e.imageFrom = null),
              l.progressBarUpdate(),
              l.initialization.item++,
              l.data[l.initialization.way].panoramas[l.initialization.item]
                ? l.initPanoramas()
                : (l.initialization.way++,
                  (l.initialization.item = 0),
                  l.data[l.initialization.way] ? l.initPanoramas() : l.progressBarEnd()),
              (kaspersky.artwork = r.showData)));
        } else if ('feed' === e.type) {
          ((t.innerHTML =
            '<div class="brief-360 brief-360_thing "> <div class="brief__panorama"> <div class="brief__panorama-wrap is-feed" style="background-image:url(//' +
            l.screenshots['feed' + h + g].url +
            ')"></div> </div> </div>'),
            (e.element = t),
            (e.imageFrom = document.createElement('img')),
            (e.imageFrom.crossOrigin = 'anonymous'),
            (e.screenshots = { from: '', to: '' }));
          o = 0;
          ((e.imageFrom.onload = function () {
            ((e.screenshots.from = e.imageFrom),
              (e.screenshots.to = e.imageFrom),
              (e.imageFrom = null),
              l.progressBarUpdate(),
              l.progressBarUpdate(),
              l.initialization.item++,
              l.data[l.initialization.way].panoramas[l.initialization.item]
                ? l.initPanoramas()
                : (l.initialization.way++,
                  (l.initialization.item = 0),
                  l.data[l.initialization.way] ? l.initPanoramas() : l.progressBarEnd()));
          }),
            (e.imageFrom.onerror = function () {
              ++o > 1
                ? l.progressBarError()
                : ((e.imageFrom.src = ''),
                  (e.imageFrom.src = '//' + l.screenshots['feed' + h + g].url + '?' + Date.now()));
            }),
            (e.imageFrom.src = '//' + l.screenshots['feed' + h + g].url + '?' + Date.now()),
            e.imageFrom.complete &&
              e.imageFrom.naturalWidth &&
              e.imageFrom.naturalWidth > 0 &&
              ((e.screenshots.from = e.imageFrom),
              (e.screenshots.to = e.imageFrom),
              (e.imageFrom = null),
              l.progressBarUpdate(),
              l.progressBarUpdate(),
              l.initialization.item++,
              l.data[l.initialization.way].panoramas[l.initialization.item]
                ? l.initPanoramas()
                : (l.initialization.way++,
                  (l.initialization.item = 0),
                  l.data[l.initialization.way] ? l.initPanoramas() : l.progressBarEnd())));
        } else
          ((e.element = t),
            (e.screenshots = { from: '', to: '' }),
            l.progressBarUpdate(),
            l.progressBarUpdate(),
            l.initialization.item++,
            l.data[l.initialization.way].panoramas[l.initialization.item]
              ? l.initPanoramas()
              : (l.initialization.way++,
                (l.initialization.item = 0),
                l.data[l.initialization.way] ? l.initPanoramas() : l.progressBarEnd()));
      }),
      (l.switchPanorama = function (A, e) {
        ('panorama' === A.type &&
          A.steps &&
          A.steps.length &&
          (window.earthDemo.panorams[A.data.id].demoZoom(0, 1),
          window.earthDemo.panorams[A.data.id].demoRotateByAxis([A.steps[0]], 0)),
          (l.current = l.next),
          (l.next = A.element),
          (l.currentPanorama =
            'object' === u(l.nextPanorama) ? B({}, l.nextPanorama) : l.nextPanorama),
          (l.nextPanorama = 'object' === (void 0 === A ? 'undefined' : u(A)) ? B({}, A) : A),
          'earth' === A.type && ((l.next = l.earthCanvas), (l.nextPanorama = 'earth')));
        var t = function (A) {
          ($('#demoPanorams .brief__panorama')
            .not($(l.next).find('.brief__panorama'))
            .trigger('animate:stop'),
            $(l.next).find('.brief__panorama').trigger('animate:start'),
            A || $(l.earthCanvas).find('.main-container').trigger('animate:stop'));
        };
        'earth' === l.currentPanorama
          ? ((l.imageFrom = document.createElement('img')),
            (l.imageFrom.onload = function () {
              l.startTransition(l.imageFrom, A.screenshots.from, A, e, t);
            }),
            setTimeout(function () {
              s()(
                l.earthCanvas.querySelector('.brief__panorama, .overflow-x, .main-container') ||
                  l.earthCanvas,
                {
                  imageTimeout: 0,
                  logging: !1,
                  backgroundColor: '#000000',
                  useCORS: !0,
                  allowTaint: !0,
                }
              ).then(function (A) {
                l.imageFrom.src = A.toDataURL();
              });
            }, 0))
          : 'earth' === l.nextPanorama
            ? ($(l.earthCanvas).find('.main-container').trigger('animate:start'),
              (l.imageTo = document.createElement('img')),
              (l.imageTo.onload = function () {
                l.startTransition(l.currentPanorama.screenshots.to, l.imageTo, A, e, t);
              }),
              setTimeout(
                function () {
                  s()(
                    l.earthCanvas.querySelector('.brief__panorama, .overflow-x, .main-container') ||
                      l.earthCanvas,
                    {
                      imageTimeout: 0,
                      logging: !1,
                      backgroundColor: '#000000',
                      useCORS: !0,
                      allowTaint: !0,
                    }
                  ).then(function (A) {
                    l.imageTo.src = A.toDataURL();
                  });
                },
                'panorama' !== l.currentPanorama.type ? 4e3 : 0
              ))
            : 'panorama' !== l.currentPanorama.type
              ? setTimeout(
                  function () {
                    l.startTransition(
                      l.currentPanorama.screenshots.to,
                      l.nextPanorama.screenshots.from,
                      A,
                      e,
                      t
                    );
                  },
                  1e3 * (l.currentPanorama.velocity || 14)
                )
              : l.startTransition(
                  l.currentPanorama.screenshots.to,
                  l.nextPanorama.screenshots.from,
                  A,
                  e,
                  t
                );
      }),
      (l.startTransition = function (A, e, t, r, o) {
        ((l.canvasTransition = document.querySelector('#glTransition')),
          l.canvasTransition && $(l.canvasTransition).remove(),
          (l.canvasTransition = document.createElement('canvas')),
          (l.canvasTransition.id = 'glTransition'),
          $('.kaspersky-app').after(l.canvasTransition),
          (l.canvasTransition.width =
            window.earthDemo && window.earthDemo.createMode
              ? document.documentElement.offsetWidth
              : window.innerWidth),
          (l.canvasTransition.height =
            window.earthDemo && window.earthDemo.createMode
              ? document.documentElement.offsetHeight
              : window.innerHeight),
          (l.canvasTransitionGL =
            l.canvasTransition.getContext('webgl') ||
            l.canvasTransition.getContext('experimental-webgl')),
          l.canvasTransitionGL.clear(l.canvasTransitionGL.COLOR_BUFFER_BIT),
          l.canvasTransitionGL.clear(l.canvasTransitionGL.DEPTH_BUFFER_BIT),
          l.canvasTransitionGL.clear(l.canvasTransitionGL.STENCIL_BUFFER_BIT),
          l.canvasTransitionGL.pixelStorei(l.canvasTransitionGL.UNPACK_FLIP_Y_WEBGL, !0));
        var a = l.canvasTransitionGL.createBuffer();
        (l.canvasTransitionGL.bindBuffer(l.canvasTransitionGL.ARRAY_BUFFER, a),
          l.canvasTransitionGL.bufferData(
            l.canvasTransitionGL.ARRAY_BUFFER,
            new Float32Array([-1, -1, -1, 4, 4, -1]),
            l.canvasTransitionGL.STATIC_DRAW
          ),
          l.canvasTransitionGL.viewport(0, 0, l.canvasTransition.width, l.canvasTransition.height));
        var s = i()(l.canvasTransitionGL, A);
        ((s.minFilter = l.canvasTransitionGL.LINEAR), (s.magFilter = l.canvasTransitionGL.LINEAR));
        var c = i()(l.canvasTransitionGL, e);
        ((c.minFilter = l.canvasTransitionGL.LINEAR),
          (c.magFilter = l.canvasTransitionGL.LINEAR),
          (l.canvasTransition.style.display = 'block'));
        var u = n()(l.canvasTransitionGL, l.transitions[t.effect]),
          B = 0;
        window.requestAnimationFrame(function A() {
          ((l.canvasTransition.width =
            window.earthDemo && window.earthDemo.createMode
              ? document.documentElement.offsetWidth
              : window.innerWidth),
            (l.canvasTransition.height =
              window.earthDemo && window.earthDemo.createMode
                ? document.documentElement.offsetHeight
                : window.innerHeight),
            u.draw(
              B,
              s,
              c,
              l.canvasTransition.width,
              l.canvasTransition.height,
              l.transitions[t.effect].defaultParams
            ),
            (B += 0.025) < 1
              ? window.requestAnimationFrame(A)
              : ((l.canvasTransition.style.display = 'none'),
                $('.js-demo-panorama').removeClass('is-active'),
                t.element && $(t.element).addClass('is-active'),
                o && o('earth' === t.type),
                'panorama' === t.type && t.steps && t.steps.length
                  ? window.earthDemo.panorams[t.data.id].demoRotateByAxis(
                      t.steps,
                      !1,
                      r,
                      t.velocity
                    )
                  : r && r()));
        });
      }),
      $(document).on('keydown', function (A) {
        var e = $('.js-demo-exit-link');
        e.length &&
          ((27 !== A.which && 'Escape' !== A.code && 'Escape' !== A.key) ||
            (A.preventDefault(), (window.location = e.attr('href'))));
      }));
  },
  Bu7k: function (A, e, t) {
    var r =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (A) {
              return typeof A;
            }
          : function (A) {
              return A &&
                'function' == typeof Symbol &&
                A.constructor === Symbol &&
                A !== Symbol.prototype
                ? 'symbol'
                : typeof A;
            },
      n = t('vjK3');
    A.exports = function () {
      var A = {};
      return function (e) {
        if (
          ('object' !== (void 0 === e ? 'undefined' : r(e)) || null === e) &&
          'function' != typeof e
        )
          throw new Error('Weakmap-shim: Key must be object');
        var t = e.valueOf(A);
        return t && t.identity === A ? t : n(e, A);
      };
    };
  },
  DuR2: function (A, e) {
    var t,
      r =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (A) {
              return typeof A;
            }
          : function (A) {
              return A &&
                'function' == typeof Symbol &&
                A.constructor === Symbol &&
                A !== Symbol.prototype
                ? 'symbol'
                : typeof A;
            };
    t = (function () {
      return this;
    })();
    try {
      t = t || Function('return this')() || (0, eval)('this');
    } catch (A) {
      'object' === ('undefined' == typeof window ? 'undefined' : r(window)) && (t = window);
    }
    A.exports = t;
  },
  EKta: function (A, e, t) {
    'use strict';
    ((e.byteLength = function (A) {
      var e = c(A),
        t = e[0],
        r = e[1];
      return (3 * (t + r)) / 4 - r;
    }),
      (e.toByteArray = function (A) {
        for (
          var e,
            t = c(A),
            r = t[0],
            i = t[1],
            a = new o(
              (function (A, e, t) {
                return (3 * (e + t)) / 4 - t;
              })(0, r, i)
            ),
            s = 0,
            u = i > 0 ? r - 4 : r,
            B = 0;
          B < u;
          B += 4
        )
          ((e =
            (n[A.charCodeAt(B)] << 18) |
            (n[A.charCodeAt(B + 1)] << 12) |
            (n[A.charCodeAt(B + 2)] << 6) |
            n[A.charCodeAt(B + 3)]),
            (a[s++] = (e >> 16) & 255),
            (a[s++] = (e >> 8) & 255),
            (a[s++] = 255 & e));
        2 === i &&
          ((e = (n[A.charCodeAt(B)] << 2) | (n[A.charCodeAt(B + 1)] >> 4)), (a[s++] = 255 & e));
        1 === i &&
          ((e =
            (n[A.charCodeAt(B)] << 10) |
            (n[A.charCodeAt(B + 1)] << 4) |
            (n[A.charCodeAt(B + 2)] >> 2)),
          (a[s++] = (e >> 8) & 255),
          (a[s++] = 255 & e));
        return a;
      }),
      (e.fromByteArray = function (A) {
        for (var e, t = A.length, n = t % 3, o = [], i = 0, a = t - n; i < a; i += 16383)
          o.push(u(A, i, i + 16383 > a ? a : i + 16383));
        1 === n
          ? ((e = A[t - 1]), o.push(r[e >> 2] + r[(e << 4) & 63] + '=='))
          : 2 === n &&
            ((e = (A[t - 2] << 8) + A[t - 1]),
            o.push(r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + '='));
        return o.join('');
      }));
    for (
      var r = [],
        n = [],
        o = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
        i = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        a = 0,
        s = i.length;
      a < s;
      ++a
    )
      ((r[a] = i[a]), (n[i.charCodeAt(a)] = a));
    function c(A) {
      var e = A.length;
      if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
      var t = A.indexOf('=');
      return (-1 === t && (t = e), [t, t === e ? 0 : 4 - (t % 4)]);
    }
    function u(A, e, t) {
      for (var n, o, i = [], a = e; a < t; a += 3)
        ((n = ((A[a] << 16) & 16711680) + ((A[a + 1] << 8) & 65280) + (255 & A[a + 2])),
          i.push(r[((o = n) >> 18) & 63] + r[(o >> 12) & 63] + r[(o >> 6) & 63] + r[63 & o]));
      return i.join('');
    }
    ((n['-'.charCodeAt(0)] = 62), (n['_'.charCodeAt(0)] = 63));
  },
  EuP9: function (A, e, t) {
    'use strict';
    (function (A) {
      var r = t('EKta'),
        n = t('ujcs'),
        o = t('sOR5');
      function i() {
        return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function a(A, e) {
        if (i() < e) throw new RangeError('Invalid typed array length');
        return (
          s.TYPED_ARRAY_SUPPORT
            ? ((A = new Uint8Array(e)).__proto__ = s.prototype)
            : (null === A && (A = new s(e)), (A.length = e)),
          A
        );
      }
      function s(A, e, t) {
        if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s)) return new s(A, e, t);
        if ('number' == typeof A) {
          if ('string' == typeof e)
            throw new Error('If encoding is specified then the first argument must be a string');
          return B(this, A);
        }
        return c(this, A, e, t);
      }
      function c(A, e, t, r) {
        if ('number' == typeof e) throw new TypeError('"value" argument must not be a number');
        return 'undefined' != typeof ArrayBuffer && e instanceof ArrayBuffer
          ? (function (A, e, t, r) {
              if ((e.byteLength, t < 0 || e.byteLength < t))
                throw new RangeError("'offset' is out of bounds");
              if (e.byteLength < t + (r || 0)) throw new RangeError("'length' is out of bounds");
              e =
                void 0 === t && void 0 === r
                  ? new Uint8Array(e)
                  : void 0 === r
                    ? new Uint8Array(e, t)
                    : new Uint8Array(e, t, r);
              s.TYPED_ARRAY_SUPPORT ? ((A = e).__proto__ = s.prototype) : (A = l(A, e));
              return A;
            })(A, e, t, r)
          : 'string' == typeof e
            ? (function (A, e, t) {
                ('string' == typeof t && '' !== t) || (t = 'utf8');
                if (!s.isEncoding(t))
                  throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | h(e, t),
                  n = (A = a(A, r)).write(e, t);
                n !== r && (A = A.slice(0, n));
                return A;
              })(A, e, t)
            : (function (A, e) {
                if (s.isBuffer(e)) {
                  var t = 0 | f(e.length);
                  return 0 === (A = a(A, t)).length ? A : (e.copy(A, 0, 0, t), A);
                }
                if (e) {
                  if (
                    ('undefined' != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer) ||
                    'length' in e
                  )
                    return 'number' != typeof e.length || (r = e.length) != r ? a(A, 0) : l(A, e);
                  if ('Buffer' === e.type && o(e.data)) return l(A, e.data);
                }
                var r;
                throw new TypeError(
                  'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                );
              })(A, e);
      }
      function u(A) {
        if ('number' != typeof A) throw new TypeError('"size" argument must be a number');
        if (A < 0) throw new RangeError('"size" argument must not be negative');
      }
      function B(A, e) {
        if ((u(e), (A = a(A, e < 0 ? 0 : 0 | f(e))), !s.TYPED_ARRAY_SUPPORT))
          for (var t = 0; t < e; ++t) A[t] = 0;
        return A;
      }
      function l(A, e) {
        var t = e.length < 0 ? 0 : 0 | f(e.length);
        A = a(A, t);
        for (var r = 0; r < t; r += 1) A[r] = 255 & e[r];
        return A;
      }
      function f(A) {
        if (A >= i())
          throw new RangeError(
            'Attempt to allocate Buffer larger than maximum size: 0x' + i().toString(16) + ' bytes'
          );
        return 0 | A;
      }
      function h(A, e) {
        if (s.isBuffer(A)) return A.length;
        if (
          'undefined' != typeof ArrayBuffer &&
          'function' == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(A) || A instanceof ArrayBuffer)
        )
          return A.byteLength;
        'string' != typeof A && (A = '' + A);
        var t = A.length;
        if (0 === t) return 0;
        for (var r = !1; ; )
          switch (e) {
            case 'ascii':
            case 'latin1':
            case 'binary':
              return t;
            case 'utf8':
            case 'utf-8':
            case void 0:
              return x(A).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return 2 * t;
            case 'hex':
              return t >>> 1;
            case 'base64':
              return P(A).length;
            default:
              if (r) return x(A).length;
              ((e = ('' + e).toLowerCase()), (r = !0));
          }
      }
      function g(A, e, t) {
        var r = A[e];
        ((A[e] = A[t]), (A[t] = r));
      }
      function w(A, e, t, r, n) {
        if (0 === A.length) return -1;
        if (
          ('string' == typeof t
            ? ((r = t), (t = 0))
            : t > 2147483647
              ? (t = 2147483647)
              : t < -2147483648 && (t = -2147483648),
          (t = +t),
          isNaN(t) && (t = n ? 0 : A.length - 1),
          t < 0 && (t = A.length + t),
          t >= A.length)
        ) {
          if (n) return -1;
          t = A.length - 1;
        } else if (t < 0) {
          if (!n) return -1;
          t = 0;
        }
        if (('string' == typeof e && (e = s.from(e, r)), s.isBuffer(e)))
          return 0 === e.length ? -1 : d(A, e, t, r, n);
        if ('number' == typeof e)
          return (
            (e &= 255),
            s.TYPED_ARRAY_SUPPORT && 'function' == typeof Uint8Array.prototype.indexOf
              ? n
                ? Uint8Array.prototype.indexOf.call(A, e, t)
                : Uint8Array.prototype.lastIndexOf.call(A, e, t)
              : d(A, [e], t, r, n)
          );
        throw new TypeError('val must be string, number or Buffer');
      }
      function d(A, e, t, r, n) {
        var o,
          i = 1,
          a = A.length,
          s = e.length;
        if (
          void 0 !== r &&
          ('ucs2' === (r = String(r).toLowerCase()) ||
            'ucs-2' === r ||
            'utf16le' === r ||
            'utf-16le' === r)
        ) {
          if (A.length < 2 || e.length < 2) return -1;
          ((i = 2), (a /= 2), (s /= 2), (t /= 2));
        }
        function c(A, e) {
          return 1 === i ? A[e] : A.readUInt16BE(e * i);
        }
        if (n) {
          var u = -1;
          for (o = t; o < a; o++)
            if (c(A, o) === c(e, -1 === u ? 0 : o - u)) {
              if ((-1 === u && (u = o), o - u + 1 === s)) return u * i;
            } else (-1 !== u && (o -= o - u), (u = -1));
        } else
          for (t + s > a && (t = a - s), o = t; o >= 0; o--) {
            for (var B = !0, l = 0; l < s; l++)
              if (c(A, o + l) !== c(e, l)) {
                B = !1;
                break;
              }
            if (B) return o;
          }
        return -1;
      }
      function E(A, e, t, r) {
        t = Number(t) || 0;
        var n = A.length - t;
        r ? (r = Number(r)) > n && (r = n) : (r = n);
        var o = e.length;
        if (o % 2 != 0) throw new TypeError('Invalid hex string');
        r > o / 2 && (r = o / 2);
        for (var i = 0; i < r; ++i) {
          var a = parseInt(e.substr(2 * i, 2), 16);
          if (isNaN(a)) return i;
          A[t + i] = a;
        }
        return i;
      }
      function p(A, e, t, r) {
        return V(x(e, A.length - t), A, t, r);
      }
      function Q(A, e, t, r) {
        return V(
          (function (A) {
            for (var e = [], t = 0; t < A.length; ++t) e.push(255 & A.charCodeAt(t));
            return e;
          })(e),
          A,
          t,
          r
        );
      }
      function U(A, e, t, r) {
        return Q(A, e, t, r);
      }
      function C(A, e, t, r) {
        return V(P(e), A, t, r);
      }
      function F(A, e, t, r) {
        return V(
          (function (A, e) {
            for (var t, r, n, o = [], i = 0; i < A.length && !((e -= 2) < 0); ++i)
              ((t = A.charCodeAt(i)), (r = t >> 8), (n = t % 256), o.push(n), o.push(r));
            return o;
          })(e, A.length - t),
          A,
          t,
          r
        );
      }
      function m(A, e, t) {
        return 0 === e && t === A.length ? r.fromByteArray(A) : r.fromByteArray(A.slice(e, t));
      }
      function _(A, e, t) {
        t = Math.min(A.length, t);
        for (var r = [], n = e; n < t; ) {
          var o,
            i,
            a,
            s,
            c = A[n],
            u = null,
            B = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
          if (n + B <= t)
            switch (B) {
              case 1:
                c < 128 && (u = c);
                break;
              case 2:
                128 == (192 & (o = A[n + 1])) && (s = ((31 & c) << 6) | (63 & o)) > 127 && (u = s);
                break;
              case 3:
                ((o = A[n + 1]),
                  (i = A[n + 2]),
                  128 == (192 & o) &&
                    128 == (192 & i) &&
                    (s = ((15 & c) << 12) | ((63 & o) << 6) | (63 & i)) > 2047 &&
                    (s < 55296 || s > 57343) &&
                    (u = s));
                break;
              case 4:
                ((o = A[n + 1]),
                  (i = A[n + 2]),
                  (a = A[n + 3]),
                  128 == (192 & o) &&
                    128 == (192 & i) &&
                    128 == (192 & a) &&
                    (s = ((15 & c) << 18) | ((63 & o) << 12) | ((63 & i) << 6) | (63 & a)) >
                      65535 &&
                    s < 1114112 &&
                    (u = s));
            }
          (null === u
            ? ((u = 65533), (B = 1))
            : u > 65535 &&
              ((u -= 65536), r.push(((u >>> 10) & 1023) | 55296), (u = 56320 | (1023 & u))),
            r.push(u),
            (n += B));
        }
        return (function (A) {
          var e = A.length;
          if (e <= H) return String.fromCharCode.apply(String, A);
          var t = '',
            r = 0;
          for (; r < e; ) t += String.fromCharCode.apply(String, A.slice(r, (r += H)));
          return t;
        })(r);
      }
      ((e.Buffer = s),
        (e.SlowBuffer = function (A) {
          +A != A && (A = 0);
          return s.alloc(+A);
        }),
        (e.INSPECT_MAX_BYTES = 50),
        (s.TYPED_ARRAY_SUPPORT =
          void 0 !== A.TYPED_ARRAY_SUPPORT
            ? A.TYPED_ARRAY_SUPPORT
            : (function () {
                try {
                  var A = new Uint8Array(1);
                  return (
                    (A.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function () {
                        return 42;
                      },
                    }),
                    42 === A.foo() &&
                      'function' == typeof A.subarray &&
                      0 === A.subarray(1, 1).byteLength
                  );
                } catch (A) {
                  return !1;
                }
              })()),
        (e.kMaxLength = i()),
        (s.poolSize = 8192),
        (s._augment = function (A) {
          return ((A.__proto__ = s.prototype), A);
        }),
        (s.from = function (A, e, t) {
          return c(null, A, e, t);
        }),
        s.TYPED_ARRAY_SUPPORT &&
          ((s.prototype.__proto__ = Uint8Array.prototype),
          (s.__proto__ = Uint8Array),
          'undefined' != typeof Symbol &&
            Symbol.species &&
            s[Symbol.species] === s &&
            Object.defineProperty(s, Symbol.species, { value: null, configurable: !0 })),
        (s.alloc = function (A, e, t) {
          return (function (A, e, t, r) {
            return (
              u(e),
              e <= 0
                ? a(A, e)
                : void 0 !== t
                  ? 'string' == typeof r
                    ? a(A, e).fill(t, r)
                    : a(A, e).fill(t)
                  : a(A, e)
            );
          })(null, A, e, t);
        }),
        (s.allocUnsafe = function (A) {
          return B(null, A);
        }),
        (s.allocUnsafeSlow = function (A) {
          return B(null, A);
        }),
        (s.isBuffer = function (A) {
          return !(null == A || !A._isBuffer);
        }),
        (s.compare = function (A, e) {
          if (!s.isBuffer(A) || !s.isBuffer(e)) throw new TypeError('Arguments must be Buffers');
          if (A === e) return 0;
          for (var t = A.length, r = e.length, n = 0, o = Math.min(t, r); n < o; ++n)
            if (A[n] !== e[n]) {
              ((t = A[n]), (r = e[n]));
              break;
            }
          return t < r ? -1 : r < t ? 1 : 0;
        }),
        (s.isEncoding = function (A) {
          switch (String(A).toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'latin1':
            case 'binary':
            case 'base64':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return !0;
            default:
              return !1;
          }
        }),
        (s.concat = function (A, e) {
          if (!o(A)) throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === A.length) return s.alloc(0);
          var t;
          if (void 0 === e) for (e = 0, t = 0; t < A.length; ++t) e += A[t].length;
          var r = s.allocUnsafe(e),
            n = 0;
          for (t = 0; t < A.length; ++t) {
            var i = A[t];
            if (!s.isBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');
            (i.copy(r, n), (n += i.length));
          }
          return r;
        }),
        (s.byteLength = h),
        (s.prototype._isBuffer = !0),
        (s.prototype.swap16 = function () {
          var A = this.length;
          if (A % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
          for (var e = 0; e < A; e += 2) g(this, e, e + 1);
          return this;
        }),
        (s.prototype.swap32 = function () {
          var A = this.length;
          if (A % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
          for (var e = 0; e < A; e += 4) (g(this, e, e + 3), g(this, e + 1, e + 2));
          return this;
        }),
        (s.prototype.swap64 = function () {
          var A = this.length;
          if (A % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
          for (var e = 0; e < A; e += 8)
            (g(this, e, e + 7),
              g(this, e + 1, e + 6),
              g(this, e + 2, e + 5),
              g(this, e + 3, e + 4));
          return this;
        }),
        (s.prototype.toString = function () {
          var A = 0 | this.length;
          return 0 === A
            ? ''
            : 0 === arguments.length
              ? _(this, 0, A)
              : function (A, e, t) {
                  var r = !1;
                  if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return '';
                  if (((void 0 === t || t > this.length) && (t = this.length), t <= 0)) return '';
                  if ((t >>>= 0) <= (e >>>= 0)) return '';
                  for (A || (A = 'utf8'); ; )
                    switch (A) {
                      case 'hex':
                        return y(this, e, t);
                      case 'utf8':
                      case 'utf-8':
                        return _(this, e, t);
                      case 'ascii':
                        return T(this, e, t);
                      case 'latin1':
                      case 'binary':
                        return v(this, e, t);
                      case 'base64':
                        return m(this, e, t);
                      case 'ucs2':
                      case 'ucs-2':
                      case 'utf16le':
                      case 'utf-16le':
                        return N(this, e, t);
                      default:
                        if (r) throw new TypeError('Unknown encoding: ' + A);
                        ((A = (A + '').toLowerCase()), (r = !0));
                    }
                }.apply(this, arguments);
        }),
        (s.prototype.equals = function (A) {
          if (!s.isBuffer(A)) throw new TypeError('Argument must be a Buffer');
          return this === A || 0 === s.compare(this, A);
        }),
        (s.prototype.inspect = function () {
          var A = '',
            t = e.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((A = this.toString('hex', 0, t).match(/.{2}/g).join(' ')),
              this.length > t && (A += ' ... ')),
            '<Buffer ' + A + '>'
          );
        }),
        (s.prototype.compare = function (A, e, t, r, n) {
          if (!s.isBuffer(A)) throw new TypeError('Argument must be a Buffer');
          if (
            (void 0 === e && (e = 0),
            void 0 === t && (t = A ? A.length : 0),
            void 0 === r && (r = 0),
            void 0 === n && (n = this.length),
            e < 0 || t > A.length || r < 0 || n > this.length)
          )
            throw new RangeError('out of range index');
          if (r >= n && e >= t) return 0;
          if (r >= n) return -1;
          if (e >= t) return 1;
          if (((e >>>= 0), (t >>>= 0), (r >>>= 0), (n >>>= 0), this === A)) return 0;
          for (
            var o = n - r,
              i = t - e,
              a = Math.min(o, i),
              c = this.slice(r, n),
              u = A.slice(e, t),
              B = 0;
            B < a;
            ++B
          )
            if (c[B] !== u[B]) {
              ((o = c[B]), (i = u[B]));
              break;
            }
          return o < i ? -1 : i < o ? 1 : 0;
        }),
        (s.prototype.includes = function (A, e, t) {
          return -1 !== this.indexOf(A, e, t);
        }),
        (s.prototype.indexOf = function (A, e, t) {
          return w(this, A, e, t, !0);
        }),
        (s.prototype.lastIndexOf = function (A, e, t) {
          return w(this, A, e, t, !1);
        }),
        (s.prototype.write = function (A, e, t, r) {
          if (void 0 === e) ((r = 'utf8'), (t = this.length), (e = 0));
          else if (void 0 === t && 'string' == typeof e) ((r = e), (t = this.length), (e = 0));
          else {
            if (!isFinite(e))
              throw new Error(
                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
              );
            ((e |= 0),
              isFinite(t) ? ((t |= 0), void 0 === r && (r = 'utf8')) : ((r = t), (t = void 0)));
          }
          var n = this.length - e;
          if (
            ((void 0 === t || t > n) && (t = n),
            (A.length > 0 && (t < 0 || e < 0)) || e > this.length)
          )
            throw new RangeError('Attempt to write outside buffer bounds');
          r || (r = 'utf8');
          for (var o = !1; ; )
            switch (r) {
              case 'hex':
                return E(this, A, e, t);
              case 'utf8':
              case 'utf-8':
                return p(this, A, e, t);
              case 'ascii':
                return Q(this, A, e, t);
              case 'latin1':
              case 'binary':
                return U(this, A, e, t);
              case 'base64':
                return C(this, A, e, t);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return F(this, A, e, t);
              default:
                if (o) throw new TypeError('Unknown encoding: ' + r);
                ((r = ('' + r).toLowerCase()), (o = !0));
            }
        }),
        (s.prototype.toJSON = function () {
          return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
        }));
      var H = 4096;
      function T(A, e, t) {
        var r = '';
        t = Math.min(A.length, t);
        for (var n = e; n < t; ++n) r += String.fromCharCode(127 & A[n]);
        return r;
      }
      function v(A, e, t) {
        var r = '';
        t = Math.min(A.length, t);
        for (var n = e; n < t; ++n) r += String.fromCharCode(A[n]);
        return r;
      }
      function y(A, e, t) {
        var r = A.length;
        ((!e || e < 0) && (e = 0), (!t || t < 0 || t > r) && (t = r));
        for (var n = '', o = e; o < t; ++o) n += D(A[o]);
        return n;
      }
      function N(A, e, t) {
        for (var r = A.slice(e, t), n = '', o = 0; o < r.length; o += 2)
          n += String.fromCharCode(r[o] + 256 * r[o + 1]);
        return n;
      }
      function I(A, e, t) {
        if (A % 1 != 0 || A < 0) throw new RangeError('offset is not uint');
        if (A + e > t) throw new RangeError('Trying to access beyond buffer length');
      }
      function b(A, e, t, r, n, o) {
        if (!s.isBuffer(A)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > n || e < o) throw new RangeError('"value" argument is out of bounds');
        if (t + r > A.length) throw new RangeError('Index out of range');
      }
      function R(A, e, t, r) {
        e < 0 && (e = 65535 + e + 1);
        for (var n = 0, o = Math.min(A.length - t, 2); n < o; ++n)
          A[t + n] = (e & (255 << (8 * (r ? n : 1 - n)))) >>> (8 * (r ? n : 1 - n));
      }
      function K(A, e, t, r) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var n = 0, o = Math.min(A.length - t, 4); n < o; ++n)
          A[t + n] = (e >>> (8 * (r ? n : 3 - n))) & 255;
      }
      function S(A, e, t, r, n, o) {
        if (t + r > A.length) throw new RangeError('Index out of range');
        if (t < 0) throw new RangeError('Index out of range');
      }
      function L(A, e, t, r, o) {
        return (o || S(A, 0, t, 4), n.write(A, e, t, r, 23, 4), t + 4);
      }
      function O(A, e, t, r, o) {
        return (o || S(A, 0, t, 8), n.write(A, e, t, r, 52, 8), t + 8);
      }
      ((s.prototype.slice = function (A, e) {
        var t,
          r = this.length;
        if (
          ((A = ~~A),
          (e = void 0 === e ? r : ~~e),
          A < 0 ? (A += r) < 0 && (A = 0) : A > r && (A = r),
          e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
          e < A && (e = A),
          s.TYPED_ARRAY_SUPPORT)
        )
          (t = this.subarray(A, e)).__proto__ = s.prototype;
        else {
          var n = e - A;
          t = new s(n, void 0);
          for (var o = 0; o < n; ++o) t[o] = this[o + A];
        }
        return t;
      }),
        (s.prototype.readUIntLE = function (A, e, t) {
          ((A |= 0), (e |= 0), t || I(A, e, this.length));
          for (var r = this[A], n = 1, o = 0; ++o < e && (n *= 256); ) r += this[A + o] * n;
          return r;
        }),
        (s.prototype.readUIntBE = function (A, e, t) {
          ((A |= 0), (e |= 0), t || I(A, e, this.length));
          for (var r = this[A + --e], n = 1; e > 0 && (n *= 256); ) r += this[A + --e] * n;
          return r;
        }),
        (s.prototype.readUInt8 = function (A, e) {
          return (e || I(A, 1, this.length), this[A]);
        }),
        (s.prototype.readUInt16LE = function (A, e) {
          return (e || I(A, 2, this.length), this[A] | (this[A + 1] << 8));
        }),
        (s.prototype.readUInt16BE = function (A, e) {
          return (e || I(A, 2, this.length), (this[A] << 8) | this[A + 1]);
        }),
        (s.prototype.readUInt32LE = function (A, e) {
          return (
            e || I(A, 4, this.length),
            (this[A] | (this[A + 1] << 8) | (this[A + 2] << 16)) + 16777216 * this[A + 3]
          );
        }),
        (s.prototype.readUInt32BE = function (A, e) {
          return (
            e || I(A, 4, this.length),
            16777216 * this[A] + ((this[A + 1] << 16) | (this[A + 2] << 8) | this[A + 3])
          );
        }),
        (s.prototype.readIntLE = function (A, e, t) {
          ((A |= 0), (e |= 0), t || I(A, e, this.length));
          for (var r = this[A], n = 1, o = 0; ++o < e && (n *= 256); ) r += this[A + o] * n;
          return (r >= (n *= 128) && (r -= Math.pow(2, 8 * e)), r);
        }),
        (s.prototype.readIntBE = function (A, e, t) {
          ((A |= 0), (e |= 0), t || I(A, e, this.length));
          for (var r = e, n = 1, o = this[A + --r]; r > 0 && (n *= 256); ) o += this[A + --r] * n;
          return (o >= (n *= 128) && (o -= Math.pow(2, 8 * e)), o);
        }),
        (s.prototype.readInt8 = function (A, e) {
          return (e || I(A, 1, this.length), 128 & this[A] ? -1 * (255 - this[A] + 1) : this[A]);
        }),
        (s.prototype.readInt16LE = function (A, e) {
          e || I(A, 2, this.length);
          var t = this[A] | (this[A + 1] << 8);
          return 32768 & t ? 4294901760 | t : t;
        }),
        (s.prototype.readInt16BE = function (A, e) {
          e || I(A, 2, this.length);
          var t = this[A + 1] | (this[A] << 8);
          return 32768 & t ? 4294901760 | t : t;
        }),
        (s.prototype.readInt32LE = function (A, e) {
          return (
            e || I(A, 4, this.length),
            this[A] | (this[A + 1] << 8) | (this[A + 2] << 16) | (this[A + 3] << 24)
          );
        }),
        (s.prototype.readInt32BE = function (A, e) {
          return (
            e || I(A, 4, this.length),
            (this[A] << 24) | (this[A + 1] << 16) | (this[A + 2] << 8) | this[A + 3]
          );
        }),
        (s.prototype.readFloatLE = function (A, e) {
          return (e || I(A, 4, this.length), n.read(this, A, !0, 23, 4));
        }),
        (s.prototype.readFloatBE = function (A, e) {
          return (e || I(A, 4, this.length), n.read(this, A, !1, 23, 4));
        }),
        (s.prototype.readDoubleLE = function (A, e) {
          return (e || I(A, 8, this.length), n.read(this, A, !0, 52, 8));
        }),
        (s.prototype.readDoubleBE = function (A, e) {
          return (e || I(A, 8, this.length), n.read(this, A, !1, 52, 8));
        }),
        (s.prototype.writeUIntLE = function (A, e, t, r) {
          ((A = +A), (e |= 0), (t |= 0), r) || b(this, A, e, t, Math.pow(2, 8 * t) - 1, 0);
          var n = 1,
            o = 0;
          for (this[e] = 255 & A; ++o < t && (n *= 256); ) this[e + o] = (A / n) & 255;
          return e + t;
        }),
        (s.prototype.writeUIntBE = function (A, e, t, r) {
          ((A = +A), (e |= 0), (t |= 0), r) || b(this, A, e, t, Math.pow(2, 8 * t) - 1, 0);
          var n = t - 1,
            o = 1;
          for (this[e + n] = 255 & A; --n >= 0 && (o *= 256); ) this[e + n] = (A / o) & 255;
          return e + t;
        }),
        (s.prototype.writeUInt8 = function (A, e, t) {
          return (
            (A = +A),
            (e |= 0),
            t || b(this, A, e, 1, 255, 0),
            s.TYPED_ARRAY_SUPPORT || (A = Math.floor(A)),
            (this[e] = 255 & A),
            e + 1
          );
        }),
        (s.prototype.writeUInt16LE = function (A, e, t) {
          return (
            (A = +A),
            (e |= 0),
            t || b(this, A, e, 2, 65535, 0),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[e] = 255 & A), (this[e + 1] = A >>> 8))
              : R(this, A, e, !0),
            e + 2
          );
        }),
        (s.prototype.writeUInt16BE = function (A, e, t) {
          return (
            (A = +A),
            (e |= 0),
            t || b(this, A, e, 2, 65535, 0),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[e] = A >>> 8), (this[e + 1] = 255 & A))
              : R(this, A, e, !1),
            e + 2
          );
        }),
        (s.prototype.writeUInt32LE = function (A, e, t) {
          return (
            (A = +A),
            (e |= 0),
            t || b(this, A, e, 4, 4294967295, 0),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[e + 3] = A >>> 24),
                (this[e + 2] = A >>> 16),
                (this[e + 1] = A >>> 8),
                (this[e] = 255 & A))
              : K(this, A, e, !0),
            e + 4
          );
        }),
        (s.prototype.writeUInt32BE = function (A, e, t) {
          return (
            (A = +A),
            (e |= 0),
            t || b(this, A, e, 4, 4294967295, 0),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[e] = A >>> 24),
                (this[e + 1] = A >>> 16),
                (this[e + 2] = A >>> 8),
                (this[e + 3] = 255 & A))
              : K(this, A, e, !1),
            e + 4
          );
        }),
        (s.prototype.writeIntLE = function (A, e, t, r) {
          if (((A = +A), (e |= 0), !r)) {
            var n = Math.pow(2, 8 * t - 1);
            b(this, A, e, t, n - 1, -n);
          }
          var o = 0,
            i = 1,
            a = 0;
          for (this[e] = 255 & A; ++o < t && (i *= 256); )
            (A < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1),
              (this[e + o] = (((A / i) >> 0) - a) & 255));
          return e + t;
        }),
        (s.prototype.writeIntBE = function (A, e, t, r) {
          if (((A = +A), (e |= 0), !r)) {
            var n = Math.pow(2, 8 * t - 1);
            b(this, A, e, t, n - 1, -n);
          }
          var o = t - 1,
            i = 1,
            a = 0;
          for (this[e + o] = 255 & A; --o >= 0 && (i *= 256); )
            (A < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1),
              (this[e + o] = (((A / i) >> 0) - a) & 255));
          return e + t;
        }),
        (s.prototype.writeInt8 = function (A, e, t) {
          return (
            (A = +A),
            (e |= 0),
            t || b(this, A, e, 1, 127, -128),
            s.TYPED_ARRAY_SUPPORT || (A = Math.floor(A)),
            A < 0 && (A = 255 + A + 1),
            (this[e] = 255 & A),
            e + 1
          );
        }),
        (s.prototype.writeInt16LE = function (A, e, t) {
          return (
            (A = +A),
            (e |= 0),
            t || b(this, A, e, 2, 32767, -32768),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[e] = 255 & A), (this[e + 1] = A >>> 8))
              : R(this, A, e, !0),
            e + 2
          );
        }),
        (s.prototype.writeInt16BE = function (A, e, t) {
          return (
            (A = +A),
            (e |= 0),
            t || b(this, A, e, 2, 32767, -32768),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[e] = A >>> 8), (this[e + 1] = 255 & A))
              : R(this, A, e, !1),
            e + 2
          );
        }),
        (s.prototype.writeInt32LE = function (A, e, t) {
          return (
            (A = +A),
            (e |= 0),
            t || b(this, A, e, 4, 2147483647, -2147483648),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[e] = 255 & A),
                (this[e + 1] = A >>> 8),
                (this[e + 2] = A >>> 16),
                (this[e + 3] = A >>> 24))
              : K(this, A, e, !0),
            e + 4
          );
        }),
        (s.prototype.writeInt32BE = function (A, e, t) {
          return (
            (A = +A),
            (e |= 0),
            t || b(this, A, e, 4, 2147483647, -2147483648),
            A < 0 && (A = 4294967295 + A + 1),
            s.TYPED_ARRAY_SUPPORT
              ? ((this[e] = A >>> 24),
                (this[e + 1] = A >>> 16),
                (this[e + 2] = A >>> 8),
                (this[e + 3] = 255 & A))
              : K(this, A, e, !1),
            e + 4
          );
        }),
        (s.prototype.writeFloatLE = function (A, e, t) {
          return L(this, A, e, !0, t);
        }),
        (s.prototype.writeFloatBE = function (A, e, t) {
          return L(this, A, e, !1, t);
        }),
        (s.prototype.writeDoubleLE = function (A, e, t) {
          return O(this, A, e, !0, t);
        }),
        (s.prototype.writeDoubleBE = function (A, e, t) {
          return O(this, A, e, !1, t);
        }),
        (s.prototype.copy = function (A, e, t, r) {
          if (
            (t || (t = 0),
            r || 0 === r || (r = this.length),
            e >= A.length && (e = A.length),
            e || (e = 0),
            r > 0 && r < t && (r = t),
            r === t)
          )
            return 0;
          if (0 === A.length || 0 === this.length) return 0;
          if (e < 0) throw new RangeError('targetStart out of bounds');
          if (t < 0 || t >= this.length) throw new RangeError('sourceStart out of bounds');
          if (r < 0) throw new RangeError('sourceEnd out of bounds');
          (r > this.length && (r = this.length), A.length - e < r - t && (r = A.length - e + t));
          var n,
            o = r - t;
          if (this === A && t < e && e < r) for (n = o - 1; n >= 0; --n) A[n + e] = this[n + t];
          else if (o < 1e3 || !s.TYPED_ARRAY_SUPPORT)
            for (n = 0; n < o; ++n) A[n + e] = this[n + t];
          else Uint8Array.prototype.set.call(A, this.subarray(t, t + o), e);
          return o;
        }),
        (s.prototype.fill = function (A, e, t, r) {
          if ('string' == typeof A) {
            if (
              ('string' == typeof e
                ? ((r = e), (e = 0), (t = this.length))
                : 'string' == typeof t && ((r = t), (t = this.length)),
              1 === A.length)
            ) {
              var n = A.charCodeAt(0);
              n < 256 && (A = n);
            }
            if (void 0 !== r && 'string' != typeof r)
              throw new TypeError('encoding must be a string');
            if ('string' == typeof r && !s.isEncoding(r))
              throw new TypeError('Unknown encoding: ' + r);
          } else 'number' == typeof A && (A &= 255);
          if (e < 0 || this.length < e || this.length < t)
            throw new RangeError('Out of range index');
          if (t <= e) return this;
          var o;
          if (
            ((e >>>= 0),
            (t = void 0 === t ? this.length : t >>> 0),
            A || (A = 0),
            'number' == typeof A)
          )
            for (o = e; o < t; ++o) this[o] = A;
          else {
            var i = s.isBuffer(A) ? A : x(new s(A, r).toString()),
              a = i.length;
            for (o = 0; o < t - e; ++o) this[o + e] = i[o % a];
          }
          return this;
        }));
      var M = /[^+\/0-9A-Za-z-_]/g;
      function D(A) {
        return A < 16 ? '0' + A.toString(16) : A.toString(16);
      }
      function x(A, e) {
        var t;
        e = e || 1 / 0;
        for (var r = A.length, n = null, o = [], i = 0; i < r; ++i) {
          if ((t = A.charCodeAt(i)) > 55295 && t < 57344) {
            if (!n) {
              if (t > 56319) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (i + 1 === r) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              n = t;
              continue;
            }
            if (t < 56320) {
              ((e -= 3) > -1 && o.push(239, 191, 189), (n = t));
              continue;
            }
            t = 65536 + (((n - 55296) << 10) | (t - 56320));
          } else n && (e -= 3) > -1 && o.push(239, 191, 189);
          if (((n = null), t < 128)) {
            if ((e -= 1) < 0) break;
            o.push(t);
          } else if (t < 2048) {
            if ((e -= 2) < 0) break;
            o.push((t >> 6) | 192, (63 & t) | 128);
          } else if (t < 65536) {
            if ((e -= 3) < 0) break;
            o.push((t >> 12) | 224, ((t >> 6) & 63) | 128, (63 & t) | 128);
          } else {
            if (!(t < 1114112)) throw new Error('Invalid code point');
            if ((e -= 4) < 0) break;
            o.push((t >> 18) | 240, ((t >> 12) & 63) | 128, ((t >> 6) & 63) | 128, (63 & t) | 128);
          }
        }
        return o;
      }
      function P(A) {
        return r.toByteArray(
          (function (A) {
            if (
              (A = (function (A) {
                return A.trim ? A.trim() : A.replace(/^\s+|\s+$/g, '');
              })(A).replace(M, '')).length < 2
            )
              return '';
            for (; A.length % 4 != 0; ) A += '=';
            return A;
          })(A)
        );
      }
      function V(A, e, t, r) {
        for (var n = 0; n < r && !(n + t >= e.length || n >= A.length); ++n) e[n + t] = A[n];
        return n;
      }
    }).call(e, t('DuR2'));
  },
  GaOS: function (A, e, t) {
    'use strict';
    var r = t('f0ZI');
    A.exports = function (A) {
      var e = ["'use strict'", 'var CACHED={}'],
        t = [],
        n = A.funcName + '_cwise_thunk';
      e.push(['return function ', n, '(', A.shimArgs.join(','), '){'].join(''));
      for (
        var o = [],
          i = [],
          a = [
            [
              'array',
              A.arrayArgs[0],
              '.shape.slice(',
              Math.max(0, A.arrayBlockIndices[0]),
              A.arrayBlockIndices[0] < 0 ? ',' + A.arrayBlockIndices[0] + ')' : ')',
            ].join(''),
          ],
          s = [],
          c = [],
          u = 0;
        u < A.arrayArgs.length;
        ++u
      ) {
        var B = A.arrayArgs[u];
        (t.push(['t', B, '=array', B, '.dtype,', 'r', B, '=array', B, '.order'].join('')),
          o.push('t' + B),
          o.push('r' + B),
          i.push('t' + B),
          i.push('r' + B + '.join()'),
          a.push('array' + B + '.data'),
          a.push('array' + B + '.stride'),
          a.push('array' + B + '.offset|0'),
          u > 0 &&
            (s.push(
              'array' +
                A.arrayArgs[0] +
                '.shape.length===array' +
                B +
                '.shape.length+' +
                (Math.abs(A.arrayBlockIndices[0]) - Math.abs(A.arrayBlockIndices[u]))
            ),
            c.push(
              'array' +
                A.arrayArgs[0] +
                '.shape[shapeIndex+' +
                Math.max(0, A.arrayBlockIndices[0]) +
                ']===array' +
                B +
                '.shape[shapeIndex+' +
                Math.max(0, A.arrayBlockIndices[u]) +
                ']'
            )));
      }
      for (
        A.arrayArgs.length > 1 &&
          (e.push(
            'if (!(' +
              s.join(' && ') +
              ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"
          ),
          e.push(
            'for(var shapeIndex=array' +
              A.arrayArgs[0] +
              '.shape.length-' +
              Math.abs(A.arrayBlockIndices[0]) +
              '; shapeIndex--\x3e0;) {'
          ),
          e.push(
            'if (!(' +
              c.join(' && ') +
              ")) throw new Error('cwise: Arrays do not all have the same shape!')"
          ),
          e.push('}')),
          u = 0;
        u < A.scalarArgs.length;
        ++u
      )
        a.push('scalar' + A.scalarArgs[u]);
      return (
        t.push(['type=[', i.join(','), '].join()'].join('')),
        t.push('proc=CACHED[type]'),
        e.push('var ' + t.join(',')),
        e.push(
          [
            'if(!proc){',
            'CACHED[type]=proc=compile([',
            o.join(','),
            '])}',
            'return proc(',
            a.join(','),
            ')}',
          ].join('')
        ),
        A.debug && console.log('-----Generated thunk:\n' + e.join('\n') + '\n----------'),
        new Function('compile', e.join('\n'))(r.bind(void 0, A))
      );
    };
  },
  Gd3S: function (A, e, t) {
    'use strict';
    var r = t('dVck');
    A.exports = function (A, e, t) {
      return r((t = void 0 !== t ? t + '' : ' '), e) + A;
    };
  },
  NRIt: function (A, e, t) {
    'use strict';
    A.exports = function (A, e) {
      for (var t = {}, r = 0; r < A.length; ++r)
        for (var n = A[r].name, o = n.split('.'), i = t, a = 0; a < o.length; ++a) {
          var s = o[a].split('[');
          if (s.length > 1) {
            (s[0] in i || (i[s[0]] = []), (i = i[s[0]]));
            for (var c = 1; c < s.length; ++c) {
              var u = parseInt(s[c]);
              c < s.length - 1 || a < o.length - 1
                ? (u in i || (c < s.length - 1 ? (i[u] = []) : (i[u] = {})), (i = i[u]))
                : (i[u] = e ? r : A[r].type);
            }
          } else
            a < o.length - 1
              ? (s[0] in i || (i[s[0]] = {}), (i = i[s[0]]))
              : (i[s[0]] = e ? r : A[r].type);
        }
      return t;
    };
  },
  NdPJ: function (A, e) {
    A.exports = function (A) {
      return atob(A);
    };
  },
  OVux: function (A, e, t) {
    'use strict';
    ((e.uniforms = function (A, e) {
      for (var t = A.getProgramParameter(e, A.ACTIVE_UNIFORMS), r = [], n = 0; n < t; ++n) {
        var i = A.getActiveUniform(e, n);
        if (i) {
          var a = o(A, i.type);
          if (i.size > 1)
            for (var s = 0; s < i.size; ++s)
              r.push({ name: i.name.replace('[0]', '[' + s + ']'), type: a });
          else r.push({ name: i.name, type: a });
        }
      }
      return r;
    }),
      (e.attributes = function (A, e) {
        for (var t = A.getProgramParameter(e, A.ACTIVE_ATTRIBUTES), r = [], n = 0; n < t; ++n) {
          var i = A.getActiveAttrib(e, n);
          i && r.push({ name: i.name, type: o(A, i.type) });
        }
        return r;
      }));
    var r = {
        FLOAT: 'float',
        FLOAT_VEC2: 'vec2',
        FLOAT_VEC3: 'vec3',
        FLOAT_VEC4: 'vec4',
        INT: 'int',
        INT_VEC2: 'ivec2',
        INT_VEC3: 'ivec3',
        INT_VEC4: 'ivec4',
        BOOL: 'bool',
        BOOL_VEC2: 'bvec2',
        BOOL_VEC3: 'bvec3',
        BOOL_VEC4: 'bvec4',
        FLOAT_MAT2: 'mat2',
        FLOAT_MAT3: 'mat3',
        FLOAT_MAT4: 'mat4',
        SAMPLER_2D: 'sampler2D',
        SAMPLER_CUBE: 'samplerCube',
      },
      n = null;
    function o(A, e) {
      if (!n) {
        var t = Object.keys(r);
        n = {};
        for (var o = 0; o < t.length; ++o) {
          var i = t[o];
          n[A[i]] = r[i];
        }
      }
      return n[e];
    }
  },
  P6hE: function (A, e, t) {
    var r = t('Bu7k');
    A.exports = function () {
      var A = r();
      return {
        get: function (e, t) {
          var r = A(e);
          return r.hasOwnProperty('value') ? r.value : t;
        },
        set: function (e, t) {
          return ((A(e).value = t), this);
        },
        has: function (e) {
          return 'value' in A(e);
        },
        delete: function (e) {
          return delete A(e).value;
        },
      };
    };
  },
  QINn: function (A, e, t) {
    'use strict';
    A.exports = function (A, e, t) {
      return 0 === A.length
        ? A
        : e
          ? (t || A.sort(e),
            (function (A, e) {
              for (var t = 1, r = A.length, n = A[0], o = A[0], i = 1; i < r; ++i)
                if (((o = n), e((n = A[i]), o))) {
                  if (i === t) {
                    t++;
                    continue;
                  }
                  A[t++] = n;
                }
              return ((A.length = t), A);
            })(A, e))
          : (t || A.sort(),
            (function (A) {
              for (var e = 1, t = A.length, r = A[0], n = A[0], o = 1; o < t; ++o, n = r)
                if (((n = r), (r = A[o]) !== n)) {
                  if (o === e) {
                    e++;
                    continue;
                  }
                  A[e++] = r;
                }
              return ((A.length = e), A);
            })(A));
    };
  },
  Re3r: function (A, e) {
    function t(A) {
      return (
        !!A.constructor && 'function' == typeof A.constructor.isBuffer && A.constructor.isBuffer(A)
      );
    }
    A.exports = function (A) {
      return (
        null != A &&
        (t(A) ||
          (function (A) {
            return (
              'function' == typeof A.readFloatLE && 'function' == typeof A.slice && t(A.slice(0, 0))
            );
          })(A) ||
          !!A._isBuffer)
      );
    };
  },
  Rl1y: function (A, e) {
    A.exports = [
      'abs',
      'acos',
      'all',
      'any',
      'asin',
      'atan',
      'ceil',
      'clamp',
      'cos',
      'cross',
      'dFdx',
      'dFdy',
      'degrees',
      'distance',
      'dot',
      'equal',
      'exp',
      'exp2',
      'faceforward',
      'floor',
      'fract',
      'gl_BackColor',
      'gl_BackLightModelProduct',
      'gl_BackLightProduct',
      'gl_BackMaterial',
      'gl_BackSecondaryColor',
      'gl_ClipPlane',
      'gl_ClipVertex',
      'gl_Color',
      'gl_DepthRange',
      'gl_DepthRangeParameters',
      'gl_EyePlaneQ',
      'gl_EyePlaneR',
      'gl_EyePlaneS',
      'gl_EyePlaneT',
      'gl_Fog',
      'gl_FogCoord',
      'gl_FogFragCoord',
      'gl_FogParameters',
      'gl_FragColor',
      'gl_FragCoord',
      'gl_FragData',
      'gl_FragDepth',
      'gl_FragDepthEXT',
      'gl_FrontColor',
      'gl_FrontFacing',
      'gl_FrontLightModelProduct',
      'gl_FrontLightProduct',
      'gl_FrontMaterial',
      'gl_FrontSecondaryColor',
      'gl_LightModel',
      'gl_LightModelParameters',
      'gl_LightModelProducts',
      'gl_LightProducts',
      'gl_LightSource',
      'gl_LightSourceParameters',
      'gl_MaterialParameters',
      'gl_MaxClipPlanes',
      'gl_MaxCombinedTextureImageUnits',
      'gl_MaxDrawBuffers',
      'gl_MaxFragmentUniformComponents',
      'gl_MaxLights',
      'gl_MaxTextureCoords',
      'gl_MaxTextureImageUnits',
      'gl_MaxTextureUnits',
      'gl_MaxVaryingFloats',
      'gl_MaxVertexAttribs',
      'gl_MaxVertexTextureImageUnits',
      'gl_MaxVertexUniformComponents',
      'gl_ModelViewMatrix',
      'gl_ModelViewMatrixInverse',
      'gl_ModelViewMatrixInverseTranspose',
      'gl_ModelViewMatrixTranspose',
      'gl_ModelViewProjectionMatrix',
      'gl_ModelViewProjectionMatrixInverse',
      'gl_ModelViewProjectionMatrixInverseTranspose',
      'gl_ModelViewProjectionMatrixTranspose',
      'gl_MultiTexCoord0',
      'gl_MultiTexCoord1',
      'gl_MultiTexCoord2',
      'gl_MultiTexCoord3',
      'gl_MultiTexCoord4',
      'gl_MultiTexCoord5',
      'gl_MultiTexCoord6',
      'gl_MultiTexCoord7',
      'gl_Normal',
      'gl_NormalMatrix',
      'gl_NormalScale',
      'gl_ObjectPlaneQ',
      'gl_ObjectPlaneR',
      'gl_ObjectPlaneS',
      'gl_ObjectPlaneT',
      'gl_Point',
      'gl_PointCoord',
      'gl_PointParameters',
      'gl_PointSize',
      'gl_Position',
      'gl_ProjectionMatrix',
      'gl_ProjectionMatrixInverse',
      'gl_ProjectionMatrixInverseTranspose',
      'gl_ProjectionMatrixTranspose',
      'gl_SecondaryColor',
      'gl_TexCoord',
      'gl_TextureEnvColor',
      'gl_TextureMatrix',
      'gl_TextureMatrixInverse',
      'gl_TextureMatrixInverseTranspose',
      'gl_TextureMatrixTranspose',
      'gl_Vertex',
      'greaterThan',
      'greaterThanEqual',
      'inversesqrt',
      'length',
      'lessThan',
      'lessThanEqual',
      'log',
      'log2',
      'matrixCompMult',
      'max',
      'min',
      'mix',
      'mod',
      'normalize',
      'not',
      'notEqual',
      'pow',
      'radians',
      'reflect',
      'refract',
      'sign',
      'sin',
      'smoothstep',
      'sqrt',
      'step',
      'tan',
      'texture2D',
      'texture2DLod',
      'texture2DProj',
      'texture2DProjLod',
      'textureCube',
      'textureCubeLod',
      'texture2DLodEXT',
      'texture2DProjLodEXT',
      'textureCubeLodEXT',
      'texture2DGradEXT',
      'texture2DProjGradEXT',
      'textureCubeGradEXT',
    ];
  },
  TNdZ: function (A, e) {
    A.exports = {
      0: 'NONE',
      1: 'ONE',
      2: 'LINE_LOOP',
      3: 'LINE_STRIP',
      4: 'TRIANGLES',
      5: 'TRIANGLE_STRIP',
      6: 'TRIANGLE_FAN',
      256: 'DEPTH_BUFFER_BIT',
      512: 'NEVER',
      513: 'LESS',
      514: 'EQUAL',
      515: 'LEQUAL',
      516: 'GREATER',
      517: 'NOTEQUAL',
      518: 'GEQUAL',
      519: 'ALWAYS',
      768: 'SRC_COLOR',
      769: 'ONE_MINUS_SRC_COLOR',
      770: 'SRC_ALPHA',
      771: 'ONE_MINUS_SRC_ALPHA',
      772: 'DST_ALPHA',
      773: 'ONE_MINUS_DST_ALPHA',
      774: 'DST_COLOR',
      775: 'ONE_MINUS_DST_COLOR',
      776: 'SRC_ALPHA_SATURATE',
      1024: 'STENCIL_BUFFER_BIT',
      1028: 'FRONT',
      1029: 'BACK',
      1032: 'FRONT_AND_BACK',
      1280: 'INVALID_ENUM',
      1281: 'INVALID_VALUE',
      1282: 'INVALID_OPERATION',
      1285: 'OUT_OF_MEMORY',
      1286: 'INVALID_FRAMEBUFFER_OPERATION',
      2304: 'CW',
      2305: 'CCW',
      2849: 'LINE_WIDTH',
      2884: 'CULL_FACE',
      2885: 'CULL_FACE_MODE',
      2886: 'FRONT_FACE',
      2928: 'DEPTH_RANGE',
      2929: 'DEPTH_TEST',
      2930: 'DEPTH_WRITEMASK',
      2931: 'DEPTH_CLEAR_VALUE',
      2932: 'DEPTH_FUNC',
      2960: 'STENCIL_TEST',
      2961: 'STENCIL_CLEAR_VALUE',
      2962: 'STENCIL_FUNC',
      2963: 'STENCIL_VALUE_MASK',
      2964: 'STENCIL_FAIL',
      2965: 'STENCIL_PASS_DEPTH_FAIL',
      2966: 'STENCIL_PASS_DEPTH_PASS',
      2967: 'STENCIL_REF',
      2968: 'STENCIL_WRITEMASK',
      2978: 'VIEWPORT',
      3024: 'DITHER',
      3042: 'BLEND',
      3088: 'SCISSOR_BOX',
      3089: 'SCISSOR_TEST',
      3106: 'COLOR_CLEAR_VALUE',
      3107: 'COLOR_WRITEMASK',
      3317: 'UNPACK_ALIGNMENT',
      3333: 'PACK_ALIGNMENT',
      3379: 'MAX_TEXTURE_SIZE',
      3386: 'MAX_VIEWPORT_DIMS',
      3408: 'SUBPIXEL_BITS',
      3410: 'RED_BITS',
      3411: 'GREEN_BITS',
      3412: 'BLUE_BITS',
      3413: 'ALPHA_BITS',
      3414: 'DEPTH_BITS',
      3415: 'STENCIL_BITS',
      3553: 'TEXTURE_2D',
      4352: 'DONT_CARE',
      4353: 'FASTEST',
      4354: 'NICEST',
      5120: 'BYTE',
      5121: 'UNSIGNED_BYTE',
      5122: 'SHORT',
      5123: 'UNSIGNED_SHORT',
      5124: 'INT',
      5125: 'UNSIGNED_INT',
      5126: 'FLOAT',
      5386: 'INVERT',
      5890: 'TEXTURE',
      6401: 'STENCIL_INDEX',
      6402: 'DEPTH_COMPONENT',
      6406: 'ALPHA',
      6407: 'RGB',
      6408: 'RGBA',
      6409: 'LUMINANCE',
      6410: 'LUMINANCE_ALPHA',
      7680: 'KEEP',
      7681: 'REPLACE',
      7682: 'INCR',
      7683: 'DECR',
      7936: 'VENDOR',
      7937: 'RENDERER',
      7938: 'VERSION',
      9728: 'NEAREST',
      9729: 'LINEAR',
      9984: 'NEAREST_MIPMAP_NEAREST',
      9985: 'LINEAR_MIPMAP_NEAREST',
      9986: 'NEAREST_MIPMAP_LINEAR',
      9987: 'LINEAR_MIPMAP_LINEAR',
      10240: 'TEXTURE_MAG_FILTER',
      10241: 'TEXTURE_MIN_FILTER',
      10242: 'TEXTURE_WRAP_S',
      10243: 'TEXTURE_WRAP_T',
      10497: 'REPEAT',
      10752: 'POLYGON_OFFSET_UNITS',
      16384: 'COLOR_BUFFER_BIT',
      32769: 'CONSTANT_COLOR',
      32770: 'ONE_MINUS_CONSTANT_COLOR',
      32771: 'CONSTANT_ALPHA',
      32772: 'ONE_MINUS_CONSTANT_ALPHA',
      32773: 'BLEND_COLOR',
      32774: 'FUNC_ADD',
      32777: 'BLEND_EQUATION_RGB',
      32778: 'FUNC_SUBTRACT',
      32779: 'FUNC_REVERSE_SUBTRACT',
      32819: 'UNSIGNED_SHORT_4_4_4_4',
      32820: 'UNSIGNED_SHORT_5_5_5_1',
      32823: 'POLYGON_OFFSET_FILL',
      32824: 'POLYGON_OFFSET_FACTOR',
      32854: 'RGBA4',
      32855: 'RGB5_A1',
      32873: 'TEXTURE_BINDING_2D',
      32926: 'SAMPLE_ALPHA_TO_COVERAGE',
      32928: 'SAMPLE_COVERAGE',
      32936: 'SAMPLE_BUFFERS',
      32937: 'SAMPLES',
      32938: 'SAMPLE_COVERAGE_VALUE',
      32939: 'SAMPLE_COVERAGE_INVERT',
      32968: 'BLEND_DST_RGB',
      32969: 'BLEND_SRC_RGB',
      32970: 'BLEND_DST_ALPHA',
      32971: 'BLEND_SRC_ALPHA',
      33071: 'CLAMP_TO_EDGE',
      33170: 'GENERATE_MIPMAP_HINT',
      33189: 'DEPTH_COMPONENT16',
      33306: 'DEPTH_STENCIL_ATTACHMENT',
      33635: 'UNSIGNED_SHORT_5_6_5',
      33648: 'MIRRORED_REPEAT',
      33901: 'ALIASED_POINT_SIZE_RANGE',
      33902: 'ALIASED_LINE_WIDTH_RANGE',
      33984: 'TEXTURE0',
      33985: 'TEXTURE1',
      33986: 'TEXTURE2',
      33987: 'TEXTURE3',
      33988: 'TEXTURE4',
      33989: 'TEXTURE5',
      33990: 'TEXTURE6',
      33991: 'TEXTURE7',
      33992: 'TEXTURE8',
      33993: 'TEXTURE9',
      33994: 'TEXTURE10',
      33995: 'TEXTURE11',
      33996: 'TEXTURE12',
      33997: 'TEXTURE13',
      33998: 'TEXTURE14',
      33999: 'TEXTURE15',
      34000: 'TEXTURE16',
      34001: 'TEXTURE17',
      34002: 'TEXTURE18',
      34003: 'TEXTURE19',
      34004: 'TEXTURE20',
      34005: 'TEXTURE21',
      34006: 'TEXTURE22',
      34007: 'TEXTURE23',
      34008: 'TEXTURE24',
      34009: 'TEXTURE25',
      34010: 'TEXTURE26',
      34011: 'TEXTURE27',
      34012: 'TEXTURE28',
      34013: 'TEXTURE29',
      34014: 'TEXTURE30',
      34015: 'TEXTURE31',
      34016: 'ACTIVE_TEXTURE',
      34024: 'MAX_RENDERBUFFER_SIZE',
      34041: 'DEPTH_STENCIL',
      34055: 'INCR_WRAP',
      34056: 'DECR_WRAP',
      34067: 'TEXTURE_CUBE_MAP',
      34068: 'TEXTURE_BINDING_CUBE_MAP',
      34069: 'TEXTURE_CUBE_MAP_POSITIVE_X',
      34070: 'TEXTURE_CUBE_MAP_NEGATIVE_X',
      34071: 'TEXTURE_CUBE_MAP_POSITIVE_Y',
      34072: 'TEXTURE_CUBE_MAP_NEGATIVE_Y',
      34073: 'TEXTURE_CUBE_MAP_POSITIVE_Z',
      34074: 'TEXTURE_CUBE_MAP_NEGATIVE_Z',
      34076: 'MAX_CUBE_MAP_TEXTURE_SIZE',
      34338: 'VERTEX_ATTRIB_ARRAY_ENABLED',
      34339: 'VERTEX_ATTRIB_ARRAY_SIZE',
      34340: 'VERTEX_ATTRIB_ARRAY_STRIDE',
      34341: 'VERTEX_ATTRIB_ARRAY_TYPE',
      34342: 'CURRENT_VERTEX_ATTRIB',
      34373: 'VERTEX_ATTRIB_ARRAY_POINTER',
      34466: 'NUM_COMPRESSED_TEXTURE_FORMATS',
      34467: 'COMPRESSED_TEXTURE_FORMATS',
      34660: 'BUFFER_SIZE',
      34661: 'BUFFER_USAGE',
      34816: 'STENCIL_BACK_FUNC',
      34817: 'STENCIL_BACK_FAIL',
      34818: 'STENCIL_BACK_PASS_DEPTH_FAIL',
      34819: 'STENCIL_BACK_PASS_DEPTH_PASS',
      34877: 'BLEND_EQUATION_ALPHA',
      34921: 'MAX_VERTEX_ATTRIBS',
      34922: 'VERTEX_ATTRIB_ARRAY_NORMALIZED',
      34930: 'MAX_TEXTURE_IMAGE_UNITS',
      34962: 'ARRAY_BUFFER',
      34963: 'ELEMENT_ARRAY_BUFFER',
      34964: 'ARRAY_BUFFER_BINDING',
      34965: 'ELEMENT_ARRAY_BUFFER_BINDING',
      34975: 'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING',
      35040: 'STREAM_DRAW',
      35044: 'STATIC_DRAW',
      35048: 'DYNAMIC_DRAW',
      35632: 'FRAGMENT_SHADER',
      35633: 'VERTEX_SHADER',
      35660: 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      35661: 'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      35663: 'SHADER_TYPE',
      35664: 'FLOAT_VEC2',
      35665: 'FLOAT_VEC3',
      35666: 'FLOAT_VEC4',
      35667: 'INT_VEC2',
      35668: 'INT_VEC3',
      35669: 'INT_VEC4',
      35670: 'BOOL',
      35671: 'BOOL_VEC2',
      35672: 'BOOL_VEC3',
      35673: 'BOOL_VEC4',
      35674: 'FLOAT_MAT2',
      35675: 'FLOAT_MAT3',
      35676: 'FLOAT_MAT4',
      35678: 'SAMPLER_2D',
      35680: 'SAMPLER_CUBE',
      35712: 'DELETE_STATUS',
      35713: 'COMPILE_STATUS',
      35714: 'LINK_STATUS',
      35715: 'VALIDATE_STATUS',
      35716: 'INFO_LOG_LENGTH',
      35717: 'ATTACHED_SHADERS',
      35718: 'ACTIVE_UNIFORMS',
      35719: 'ACTIVE_UNIFORM_MAX_LENGTH',
      35720: 'SHADER_SOURCE_LENGTH',
      35721: 'ACTIVE_ATTRIBUTES',
      35722: 'ACTIVE_ATTRIBUTE_MAX_LENGTH',
      35724: 'SHADING_LANGUAGE_VERSION',
      35725: 'CURRENT_PROGRAM',
      36003: 'STENCIL_BACK_REF',
      36004: 'STENCIL_BACK_VALUE_MASK',
      36005: 'STENCIL_BACK_WRITEMASK',
      36006: 'FRAMEBUFFER_BINDING',
      36007: 'RENDERBUFFER_BINDING',
      36048: 'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE',
      36049: 'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME',
      36050: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL',
      36051: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE',
      36053: 'FRAMEBUFFER_COMPLETE',
      36054: 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT',
      36055: 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT',
      36057: 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS',
      36061: 'FRAMEBUFFER_UNSUPPORTED',
      36064: 'COLOR_ATTACHMENT0',
      36096: 'DEPTH_ATTACHMENT',
      36128: 'STENCIL_ATTACHMENT',
      36160: 'FRAMEBUFFER',
      36161: 'RENDERBUFFER',
      36162: 'RENDERBUFFER_WIDTH',
      36163: 'RENDERBUFFER_HEIGHT',
      36164: 'RENDERBUFFER_INTERNAL_FORMAT',
      36168: 'STENCIL_INDEX8',
      36176: 'RENDERBUFFER_RED_SIZE',
      36177: 'RENDERBUFFER_GREEN_SIZE',
      36178: 'RENDERBUFFER_BLUE_SIZE',
      36179: 'RENDERBUFFER_ALPHA_SIZE',
      36180: 'RENDERBUFFER_DEPTH_SIZE',
      36181: 'RENDERBUFFER_STENCIL_SIZE',
      36194: 'RGB565',
      36336: 'LOW_FLOAT',
      36337: 'MEDIUM_FLOAT',
      36338: 'HIGH_FLOAT',
      36339: 'LOW_INT',
      36340: 'MEDIUM_INT',
      36341: 'HIGH_INT',
      36346: 'SHADER_COMPILER',
      36347: 'MAX_VERTEX_UNIFORM_VECTORS',
      36348: 'MAX_VARYING_VECTORS',
      36349: 'MAX_FRAGMENT_UNIFORM_VECTORS',
      37440: 'UNPACK_FLIP_Y_WEBGL',
      37441: 'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
      37442: 'CONTEXT_LOST_WEBGL',
      37443: 'UNPACK_COLORSPACE_CONVERSION_WEBGL',
      37444: 'BROWSER_DEFAULT_WEBGL',
    };
  },
  U27o: function (A, e) {
    function t(A, e, t) {
      ((this.shortMessage = e || ''),
        (this.longMessage = t || ''),
        (this.rawError = A || ''),
        (this.message = 'gl-shader: ' + (e || A || '') + (t ? '\n' + t : '')),
        (this.stack = new Error().stack));
    }
    ((t.prototype = new Error()),
      (t.prototype.name = 'GLError'),
      (t.prototype.constructor = t),
      (A.exports = t));
  },
  UD6v: function (A, e, t) {
    var r = t('TNdZ');
    A.exports = function (A) {
      return r[A];
    };
  },
  V0SU: function (A, e, t) {
    'use strict';
    var r =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (A) {
              return typeof A;
            }
          : function (A) {
              return A &&
                'function' == typeof Symbol &&
                A.constructor === Symbol &&
                A !== Symbol.prototype
                ? 'symbol'
                : typeof A;
            },
      n = t('NRIt'),
      o = t('U27o');
    function i(A) {
      return new Function('y', 'return function(){return y}')(A);
    }
    function a(A, e) {
      for (var t = new Array(A), r = 0; r < A; ++r) t[r] = e;
      return t;
    }
    A.exports = function (A, e, t, s) {
      function c(A, e, t) {
        switch (t) {
          case 'bool':
          case 'int':
          case 'sampler2D':
          case 'samplerCube':
            return 'gl.uniform1i(locations[' + e + '],obj' + A + ')';
          case 'float':
            return 'gl.uniform1f(locations[' + e + '],obj' + A + ')';
          default:
            var r = t.indexOf('vec');
            if (!(0 <= r && r <= 1 && t.length === 4 + r)) {
              if (0 === t.indexOf('mat') && 4 === t.length) {
                var n = t.charCodeAt(t.length - 1) - 48;
                if (n < 2 || n > 4)
                  throw new o('', 'Invalid uniform dimension type for matrix ' + name + ': ' + t);
                return 'gl.uniformMatrix' + n + 'fv(locations[' + e + '],false,obj' + A + ')';
              }
              throw new o('', 'Unknown uniform data type for ' + name + ': ' + t);
            }
            var n = t.charCodeAt(t.length - 1) - 48;
            if (n < 2 || n > 4) throw new o('', 'Invalid data type');
            switch (t.charAt(0)) {
              case 'b':
              case 'i':
                return 'gl.uniform' + n + 'iv(locations[' + e + '],obj' + A + ')';
              case 'v':
                return 'gl.uniform' + n + 'fv(locations[' + e + '],obj' + A + ')';
              default:
                throw new o('', 'Unrecognized data type for vector ' + name + ': ' + t);
            }
        }
      }
      function u(e) {
        for (
          var n = ['return function updateProperty(obj){'],
            o = (function A(e, t) {
              if ('object' !== (void 0 === t ? 'undefined' : r(t))) return [[e, t]];
              var n = [];
              for (var o in t) {
                var i = t[o],
                  a = e;
                (parseInt(o) + '' === o ? (a += '[' + o + ']') : (a += '.' + o),
                  'object' === (void 0 === i ? 'undefined' : r(i))
                    ? n.push.apply(n, A(a, i))
                    : n.push([a, i]));
              }
              return n;
            })('', e),
            i = 0;
          i < o.length;
          ++i
        ) {
          var a = o[i],
            u = a[0],
            B = a[1];
          s[B] && n.push(c(u, B, t[B].type));
        }
        n.push('return obj}');
        var l = new Function('gl', 'locations', n.join('\n'));
        return l(A, s);
      }
      function B(n, c, B) {
        if ('object' === (void 0 === B ? 'undefined' : r(B))) {
          var f = l(B);
          Object.defineProperty(n, c, { get: i(f), set: u(B), enumerable: !0, configurable: !1 });
        } else
          s[B]
            ? Object.defineProperty(n, c, {
                get:
                  ((h = B),
                  new Function(
                    'gl',
                    'wrapper',
                    'locations',
                    'return function(){return gl.getUniform(wrapper.program,locations[' + h + '])}'
                  )(A, e, s)),
                set: u(B),
                enumerable: !0,
                configurable: !1,
              })
            : (n[c] = (function (A) {
                switch (A) {
                  case 'bool':
                    return !1;
                  case 'int':
                  case 'sampler2D':
                  case 'samplerCube':
                  case 'float':
                    return 0;
                  default:
                    var e = A.indexOf('vec');
                    if (0 <= e && e <= 1 && A.length === 4 + e) {
                      var t = A.charCodeAt(A.length - 1) - 48;
                      if (t < 2 || t > 4) throw new o('', 'Invalid data type');
                      return 'b' === A.charAt(0) ? a(t, !1) : a(t, 0);
                    }
                    if (0 === A.indexOf('mat') && 4 === A.length) {
                      var t = A.charCodeAt(A.length - 1) - 48;
                      if (t < 2 || t > 4)
                        throw new o(
                          '',
                          'Invalid uniform dimension type for matrix ' + name + ': ' + A
                        );
                      return a(t * t, 0);
                    }
                    throw new o('', 'Unknown uniform data type for ' + name + ': ' + A);
                }
              })(t[B].type));
        var h;
      }
      function l(A) {
        var e;
        if (Array.isArray(A)) {
          e = new Array(A.length);
          for (var t = 0; t < A.length; ++t) B(e, t, A[t]);
        } else for (var r in ((e = {}), A)) B(e, r, A[r]);
        return e;
      }
      var f = n(t, !0);
      return { get: i(l(f)), set: u(f), enumerable: !0, configurable: !0 };
    };
  },
  W2nU: function (A, e) {
    var t,
      r,
      n = (A.exports = {});
    function o() {
      throw new Error('setTimeout has not been defined');
    }
    function i() {
      throw new Error('clearTimeout has not been defined');
    }
    function a(A) {
      if (t === setTimeout) return setTimeout(A, 0);
      if ((t === o || !t) && setTimeout) return ((t = setTimeout), setTimeout(A, 0));
      try {
        return t(A, 0);
      } catch (e) {
        try {
          return t.call(null, A, 0);
        } catch (e) {
          return t.call(this, A, 0);
        }
      }
    }
    !(function () {
      try {
        t = 'function' == typeof setTimeout ? setTimeout : o;
      } catch (A) {
        t = o;
      }
      try {
        r = 'function' == typeof clearTimeout ? clearTimeout : i;
      } catch (A) {
        r = i;
      }
    })();
    var s,
      c = [],
      u = !1,
      B = -1;
    function l() {
      u && s && ((u = !1), s.length ? (c = s.concat(c)) : (B = -1), c.length && f());
    }
    function f() {
      if (!u) {
        var A = a(l);
        u = !0;
        for (var e = c.length; e; ) {
          for (s = c, c = []; ++B < e; ) s && s[B].run();
          ((B = -1), (e = c.length));
        }
        ((s = null),
          (u = !1),
          (function (A) {
            if (r === clearTimeout) return clearTimeout(A);
            if ((r === i || !r) && clearTimeout) return ((r = clearTimeout), clearTimeout(A));
            try {
              r(A);
            } catch (e) {
              try {
                return r.call(null, A);
              } catch (e) {
                return r.call(this, A);
              }
            }
          })(A));
      }
    }
    function h(A, e) {
      ((this.fun = A), (this.array = e));
    }
    function g() {}
    ((n.nextTick = function (A) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
      (c.push(new h(A, e)), 1 !== c.length || u || a(f));
    }),
      (h.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
      (n.title = 'browser'),
      (n.browser = !0),
      (n.env = {}),
      (n.argv = []),
      (n.version = ''),
      (n.versions = {}),
      (n.on = g),
      (n.addListener = g),
      (n.once = g),
      (n.off = g),
      (n.removeListener = g),
      (n.removeAllListeners = g),
      (n.emit = g),
      (n.prependListener = g),
      (n.prependOnceListener = g),
      (n.listeners = function (A) {
        return [];
      }),
      (n.binding = function (A) {
        throw new Error('process.binding is not supported');
      }),
      (n.cwd = function () {
        return '/';
      }),
      (n.chdir = function (A) {
        throw new Error('process.chdir is not supported');
      }),
      (n.umask = function () {
        return 0;
      }));
  },
  XiR9: function (A, e, t) {
    var r = t('Gd3S');
    A.exports = function (A, e, t) {
      ((e = 'number' == typeof e ? e : 1), (t = t || ': '));
      var n = A.split(/\r?\n/),
        o = String(n.length + e - 1).length;
      return n
        .map(function (A, n) {
          var i = n + e,
            a = String(i).length,
            s = r(i, o - a);
          return s + t + A;
        })
        .join('\n');
    };
  },
  Xyi1: function (A, e, t) {
    var r = t('Rl1y');
    ((r = r.slice().filter(function (A) {
      return !/^(gl\_|texture)/.test(A);
    })),
      (A.exports = r.concat([
        'gl_VertexID',
        'gl_InstanceID',
        'gl_Position',
        'gl_PointSize',
        'gl_FragCoord',
        'gl_FrontFacing',
        'gl_FragDepth',
        'gl_PointCoord',
        'gl_MaxVertexAttribs',
        'gl_MaxVertexUniformVectors',
        'gl_MaxVertexOutputVectors',
        'gl_MaxFragmentInputVectors',
        'gl_MaxVertexTextureImageUnits',
        'gl_MaxCombinedTextureImageUnits',
        'gl_MaxTextureImageUnits',
        'gl_MaxFragmentUniformVectors',
        'gl_MaxDrawBuffers',
        'gl_MinProgramTexelOffset',
        'gl_MaxProgramTexelOffset',
        'gl_DepthRangeParameters',
        'gl_DepthRange',
        'trunc',
        'round',
        'roundEven',
        'isnan',
        'isinf',
        'floatBitsToInt',
        'floatBitsToUint',
        'intBitsToFloat',
        'uintBitsToFloat',
        'packSnorm2x16',
        'unpackSnorm2x16',
        'packUnorm2x16',
        'unpackUnorm2x16',
        'packHalf2x16',
        'unpackHalf2x16',
        'outerProduct',
        'transpose',
        'determinant',
        'inverse',
        'texture',
        'textureSize',
        'textureProj',
        'textureLod',
        'textureOffset',
        'texelFetch',
        'texelFetchOffset',
        'textureProjOffset',
        'textureLodOffset',
        'textureProjLod',
        'textureProjLodOffset',
        'textureGrad',
        'textureGradOffset',
        'textureProjGrad',
        'textureProjGradOffset',
      ])));
  },
  Y4Gl: function (A, e, t) {
    var r = t('jMr4'),
      n = t('Re3r'),
      o = 'undefined' != typeof Float64Array;
    function i(A, e) {
      return A[0] - e[0];
    }
    function a() {
      var A,
        e = this.stride,
        t = new Array(e.length);
      for (A = 0; A < t.length; ++A) t[A] = [Math.abs(e[A]), A];
      t.sort(i);
      var r = new Array(t.length);
      for (A = 0; A < r.length; ++A) r[A] = t[A][1];
      return r;
    }
    function s(A, e) {
      var t = ['View', e, 'd', A].join('');
      e < 0 && (t = 'View_Nil' + A);
      var n = 'generic' === A;
      if (-1 === e) {
        var o =
          'function ' +
          t +
          '(a){this.data=a;};var proto=' +
          t +
          ".prototype;proto.dtype='" +
          A +
          "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " +
          t +
          '(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_' +
          t +
          '(a){return new ' +
          t +
          '(a);}';
        return new Function(o)();
      }
      if (0 === e) {
        o =
          'function ' +
          t +
          '(a,d) {this.data = a;this.offset = d};var proto=' +
          t +
          ".prototype;proto.dtype='" +
          A +
          "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " +
          t +
          '_copy() {return new ' +
          t +
          '(this.data,this.offset)};proto.pick=function ' +
          t +
          '_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function ' +
          t +
          '_get(){return ' +
          (n ? 'this.data.get(this.offset)' : 'this.data[this.offset]') +
          '};proto.set=function ' +
          t +
          '_set(v){return ' +
          (n ? 'this.data.set(this.offset,v)' : 'this.data[this.offset]=v') +
          '};return function construct_' +
          t +
          '(a,b,c,d){return new ' +
          t +
          '(a,d)}';
        return new Function('TrivialArray', o)(c[A][0]);
      }
      o = ["'use strict'"];
      var i = r(e),
        s = i.map(function (A) {
          return 'i' + A;
        }),
        u =
          'this.offset+' +
          i
            .map(function (A) {
              return 'this.stride[' + A + ']*i' + A;
            })
            .join('+'),
        B = i
          .map(function (A) {
            return 'b' + A;
          })
          .join(','),
        l = i
          .map(function (A) {
            return 'c' + A;
          })
          .join(',');
      (o.push(
        'function ' + t + '(a,' + B + ',' + l + ',d){this.data=a',
        'this.shape=[' + B + ']',
        'this.stride=[' + l + ']',
        'this.offset=d|0}',
        'var proto=' + t + '.prototype',
        "proto.dtype='" + A + "'",
        'proto.dimension=' + e
      ),
        o.push(
          "Object.defineProperty(proto,'size',{get:function " +
            t +
            '_size(){return ' +
            i
              .map(function (A) {
                return 'this.shape[' + A + ']';
              })
              .join('*'),
          '}})'
        ),
        1 === e
          ? o.push('proto.order=[0]')
          : (o.push("Object.defineProperty(proto,'order',{get:"),
            e < 4
              ? (o.push('function ' + t + '_order(){'),
                2 === e
                  ? o.push(
                      'return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})'
                    )
                  : 3 === e &&
                    o.push(
                      'var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})'
                    ))
              : o.push('ORDER})')),
        o.push('proto.set=function ' + t + '_set(' + s.join(',') + ',v){'),
        n ? o.push('return this.data.set(' + u + ',v)}') : o.push('return this.data[' + u + ']=v}'),
        o.push('proto.get=function ' + t + '_get(' + s.join(',') + '){'),
        n ? o.push('return this.data.get(' + u + ')}') : o.push('return this.data[' + u + ']}'),
        o.push('proto.index=function ' + t + '_index(', s.join(), '){return ' + u + '}'),
        o.push(
          'proto.hi=function ' +
            t +
            '_hi(' +
            s.join(',') +
            '){return new ' +
            t +
            '(this.data,' +
            i
              .map(function (A) {
                return [
                  '(typeof i',
                  A,
                  "!=='number'||i",
                  A,
                  '<0)?this.shape[',
                  A,
                  ']:i',
                  A,
                  '|0',
                ].join('');
              })
              .join(',') +
            ',' +
            i
              .map(function (A) {
                return 'this.stride[' + A + ']';
              })
              .join(',') +
            ',this.offset)}'
        ));
      var f = i.map(function (A) {
          return 'a' + A + '=this.shape[' + A + ']';
        }),
        h = i.map(function (A) {
          return 'c' + A + '=this.stride[' + A + ']';
        });
      o.push(
        'proto.lo=function ' +
          t +
          '_lo(' +
          s.join(',') +
          '){var b=this.offset,d=0,' +
          f.join(',') +
          ',' +
          h.join(',')
      );
      for (var g = 0; g < e; ++g)
        o.push(
          'if(typeof i' +
            g +
            "==='number'&&i" +
            g +
            '>=0){d=i' +
            g +
            '|0;b+=c' +
            g +
            '*d;a' +
            g +
            '-=d}'
        );
      (o.push(
        'return new ' +
          t +
          '(this.data,' +
          i
            .map(function (A) {
              return 'a' + A;
            })
            .join(',') +
          ',' +
          i
            .map(function (A) {
              return 'c' + A;
            })
            .join(',') +
          ',b)}'
      ),
        o.push(
          'proto.step=function ' +
            t +
            '_step(' +
            s.join(',') +
            '){var ' +
            i
              .map(function (A) {
                return 'a' + A + '=this.shape[' + A + ']';
              })
              .join(',') +
            ',' +
            i
              .map(function (A) {
                return 'b' + A + '=this.stride[' + A + ']';
              })
              .join(',') +
            ',c=this.offset,d=0,ceil=Math.ceil'
        ));
      for (g = 0; g < e; ++g)
        o.push(
          'if(typeof i' +
            g +
            "==='number'){d=i" +
            g +
            '|0;if(d<0){c+=b' +
            g +
            '*(a' +
            g +
            '-1);a' +
            g +
            '=ceil(-a' +
            g +
            '/d)}else{a' +
            g +
            '=ceil(a' +
            g +
            '/d)}b' +
            g +
            '*=d}'
        );
      o.push(
        'return new ' +
          t +
          '(this.data,' +
          i
            .map(function (A) {
              return 'a' + A;
            })
            .join(',') +
          ',' +
          i
            .map(function (A) {
              return 'b' + A;
            })
            .join(',') +
          ',c)}'
      );
      var w = new Array(e),
        d = new Array(e);
      for (g = 0; g < e; ++g) ((w[g] = 'a[i' + g + ']'), (d[g] = 'b[i' + g + ']'));
      (o.push(
        'proto.transpose=function ' +
          t +
          '_transpose(' +
          s +
          '){' +
          s
            .map(function (A, e) {
              return A + '=(' + A + '===undefined?' + e + ':' + A + '|0)';
            })
            .join(';'),
        'var a=this.shape,b=this.stride;return new ' +
          t +
          '(this.data,' +
          w.join(',') +
          ',' +
          d.join(',') +
          ',this.offset)}'
      ),
        o.push('proto.pick=function ' + t + '_pick(' + s + '){var a=[],b=[],c=this.offset'));
      for (g = 0; g < e; ++g)
        o.push(
          'if(typeof i' +
            g +
            "==='number'&&i" +
            g +
            '>=0){c=(c+this.stride[' +
            g +
            ']*i' +
            g +
            ')|0}else{a.push(this.shape[' +
            g +
            ']);b.push(this.stride[' +
            g +
            '])}'
        );
      return (
        o.push('var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}'),
        o.push(
          'return function construct_' +
            t +
            '(data,shape,stride,offset){return new ' +
            t +
            '(data,' +
            i
              .map(function (A) {
                return 'shape[' + A + ']';
              })
              .join(',') +
            ',' +
            i
              .map(function (A) {
                return 'stride[' + A + ']';
              })
              .join(',') +
            ',offset)}'
        ),
        new Function('CTOR_LIST', 'ORDER', o.join('\n'))(c[A], a)
      );
    }
    var c = {
      float32: [],
      float64: [],
      int8: [],
      int16: [],
      int32: [],
      uint8: [],
      uint16: [],
      uint32: [],
      array: [],
      uint8_clamped: [],
      bigint64: [],
      biguint64: [],
      buffer: [],
      generic: [],
    };
    A.exports = function (A, e, t, r) {
      if (void 0 === A) return (0, c.array[0])([]);
      ('number' == typeof A && (A = [A]), void 0 === e && (e = [A.length]));
      var i = e.length;
      if (void 0 === t) {
        t = new Array(i);
        for (var a = i - 1, u = 1; a >= 0; --a) ((t[a] = u), (u *= e[a]));
      }
      if (void 0 === r) for (r = 0, a = 0; a < i; ++a) t[a] < 0 && (r -= (e[a] - 1) * t[a]);
      for (
        var B = (function (A) {
            if (n(A)) return 'buffer';
            if (o)
              switch (Object.prototype.toString.call(A)) {
                case '[object Float64Array]':
                  return 'float64';
                case '[object Float32Array]':
                  return 'float32';
                case '[object Int8Array]':
                  return 'int8';
                case '[object Int16Array]':
                  return 'int16';
                case '[object Int32Array]':
                  return 'int32';
                case '[object Uint8Array]':
                  return 'uint8';
                case '[object Uint16Array]':
                  return 'uint16';
                case '[object Uint32Array]':
                  return 'uint32';
                case '[object Uint8ClampedArray]':
                  return 'uint8_clamped';
                case '[object BigInt64Array]':
                  return 'bigint64';
                case '[object BigUint64Array]':
                  return 'biguint64';
              }
            return Array.isArray(A) ? 'array' : 'generic';
          })(A),
          l = c[B];
        l.length <= i + 1;

      )
        l.push(s(B, l.length - 1));
      return (0, l[i + 1])(A, e, t, r);
    };
  },
  YrEI: function (A, e, t) {
    'use strict';
    A.exports = function (A, e, t, n) {
      for (var o = {}, s = 0, c = t.length; s < c; ++s) {
        var u = t[s],
          B = u.name,
          l = u.type,
          f = u.locations;
        switch (l) {
          case 'bool':
          case 'int':
          case 'float':
            i(A, e, f[0], n, 1, o, B);
            break;
          default:
            if (l.indexOf('vec') >= 0) {
              var h = l.charCodeAt(l.length - 1) - 48;
              if (h < 2 || h > 4)
                throw new r('', 'Invalid data type for attribute ' + B + ': ' + l);
              i(A, e, f[0], n, h, o, B);
            } else {
              if (!(l.indexOf('mat') >= 0))
                throw new r('', 'Unknown data type for attribute ' + B + ': ' + l);
              var h = l.charCodeAt(l.length - 1) - 48;
              if (h < 2 || h > 4)
                throw new r('', 'Invalid data type for attribute ' + B + ': ' + l);
              a(A, e, f, n, h, o, B);
            }
        }
      }
      return o;
    };
    var r = t('U27o');
    function n(A, e, t, r, n, o) {
      ((this._gl = A),
        (this._wrapper = e),
        (this._index = t),
        (this._locations = r),
        (this._dimension = n),
        (this._constFunc = o));
    }
    var o = n.prototype;
    function i(A, e, t, r, o, i, a) {
      for (var s = ['gl', 'v'], c = [], u = 0; u < o; ++u) (s.push('x' + u), c.push('x' + u));
      s.push(
        'if(x0.length===void 0){return gl.vertexAttrib' +
          o +
          'f(v,' +
          c.join() +
          ')}else{return gl.vertexAttrib' +
          o +
          'fv(v,x0)}'
      );
      var B = Function.apply(null, s),
        l = new n(A, e, t, r, o, B);
      Object.defineProperty(i, a, {
        set: function (e) {
          return (A.disableVertexAttribArray(r[t]), B(A, r[t], e), e);
        },
        get: function () {
          return l;
        },
        enumerable: !0,
      });
    }
    function a(A, e, t, r, n, o, a) {
      for (var s = new Array(n), c = new Array(n), u = 0; u < n; ++u)
        (i(A, e, t[u], r, n, s, u), (c[u] = s[u]));
      (Object.defineProperty(s, 'location', {
        set: function (A) {
          if (Array.isArray(A)) for (var e = 0; e < n; ++e) c[e].location = A[e];
          else for (e = 0; e < n; ++e) c[e].location = A + e;
          return A;
        },
        get: function () {
          for (var A = new Array(n), e = 0; e < n; ++e) A[e] = r[t[e]];
          return A;
        },
        enumerable: !0,
      }),
        (s.pointer = function (e, o, i, a) {
          ((e = e || A.FLOAT), (o = !!o), (i = i || n * n), (a = a || 0));
          for (var s = 0; s < n; ++s) {
            var c = r[t[s]];
            (A.vertexAttribPointer(c, n, e, o, i, a + s * n), A.enableVertexAttribArray(c));
          }
        }));
      var B = new Array(n),
        l = A['vertexAttrib' + n + 'fv'];
      Object.defineProperty(o, a, {
        set: function (e) {
          for (var o = 0; o < n; ++o) {
            var i = r[t[o]];
            if ((A.disableVertexAttribArray(i), Array.isArray(e[0]))) l.call(A, i, e[o]);
            else {
              for (var a = 0; a < n; ++a) B[a] = e[n * o + a];
              l.call(A, i, B);
            }
          }
          return e;
        },
        get: function () {
          return s;
        },
        enumerable: !0,
      });
    }
    ((o.pointer = function (A, e, t, r) {
      var n = this._gl,
        o = this._locations[this._index];
      (n.vertexAttribPointer(o, this._dimension, A || n.FLOAT, !!e, t || 0, r || 0),
        n.enableVertexAttribArray(o));
    }),
      (o.set = function (A, e, t, r) {
        return this._constFunc(this._locations[this._index], A, e, t, r);
      }),
      Object.defineProperty(o, 'location', {
        get: function () {
          return this._locations[this._index];
        },
        set: function (A) {
          return (
            A !== this._locations[this._index] &&
              ((this._locations[this._index] = 0 | A), (this._wrapper.program = null)),
            0 | A
          );
        },
      }));
  },
  aRmZ: function (A, e) {
    A.exports = [
      'precision',
      'highp',
      'mediump',
      'lowp',
      'attribute',
      'const',
      'uniform',
      'varying',
      'break',
      'continue',
      'do',
      'for',
      'while',
      'if',
      'else',
      'in',
      'out',
      'inout',
      'float',
      'int',
      'uint',
      'void',
      'bool',
      'true',
      'false',
      'discard',
      'return',
      'mat2',
      'mat3',
      'mat4',
      'vec2',
      'vec3',
      'vec4',
      'ivec2',
      'ivec3',
      'ivec4',
      'bvec2',
      'bvec3',
      'bvec4',
      'sampler1D',
      'sampler2D',
      'sampler3D',
      'samplerCube',
      'sampler1DShadow',
      'sampler2DShadow',
      'struct',
      'asm',
      'class',
      'union',
      'enum',
      'typedef',
      'template',
      'this',
      'packed',
      'goto',
      'switch',
      'default',
      'inline',
      'noinline',
      'volatile',
      'public',
      'static',
      'extern',
      'external',
      'interface',
      'long',
      'short',
      'double',
      'half',
      'fixed',
      'unsigned',
      'input',
      'output',
      'hvec2',
      'hvec3',
      'hvec4',
      'dvec2',
      'dvec3',
      'dvec4',
      'fvec2',
      'fvec3',
      'fvec4',
      'sampler2DRect',
      'sampler3DRect',
      'sampler2DRectShadow',
      'sizeof',
      'cast',
      'namespace',
      'using',
    ];
  },
  c0mF: function (A, e, t) {
    var r = t('aRmZ');
    A.exports = r
      .slice()
      .concat([
        'layout',
        'centroid',
        'smooth',
        'case',
        'mat2x2',
        'mat2x3',
        'mat2x4',
        'mat3x2',
        'mat3x3',
        'mat3x4',
        'mat4x2',
        'mat4x3',
        'mat4x4',
        'uvec2',
        'uvec3',
        'uvec4',
        'samplerCubeShadow',
        'sampler2DArray',
        'sampler2DArrayShadow',
        'isampler2D',
        'isampler3D',
        'isamplerCube',
        'isampler2DArray',
        'usampler2D',
        'usampler3D',
        'usamplerCube',
        'usampler2DArray',
        'coherent',
        'restrict',
        'readonly',
        'writeonly',
        'resource',
        'atomic_uint',
        'noperspective',
        'patch',
        'sample',
        'subroutine',
        'common',
        'partition',
        'active',
        'filter',
        'image1D',
        'image2D',
        'image3D',
        'imageCube',
        'iimage1D',
        'iimage2D',
        'iimage3D',
        'iimageCube',
        'uimage1D',
        'uimage2D',
        'uimage3D',
        'uimageCube',
        'image1DArray',
        'image2DArray',
        'iimage1DArray',
        'iimage2DArray',
        'uimage1DArray',
        'uimage2DArray',
        'image1DShadow',
        'image2DShadow',
        'image1DArrayShadow',
        'image2DArrayShadow',
        'imageBuffer',
        'iimageBuffer',
        'uimageBuffer',
        'sampler1DArray',
        'sampler1DArrayShadow',
        'isampler1D',
        'isampler1DArray',
        'usampler1D',
        'usampler1DArray',
        'isampler2DRect',
        'usampler2DRect',
        'samplerBuffer',
        'isamplerBuffer',
        'usamplerBuffer',
        'sampler2DMS',
        'isampler2DMS',
        'usampler2DMS',
        'sampler2DMSArray',
        'isampler2DMSArray',
        'usampler2DMSArray',
      ]);
  },
  dVck: function (A, e, t) {
    'use strict';
    var r,
      n = '';
    A.exports = function (A, e) {
      if ('string' != typeof A) throw new TypeError('expected a string');
      if (1 === e) return A;
      if (2 === e) return A + A;
      var t = A.length * e;
      if (r !== A || void 0 === r) ((r = A), (n = ''));
      else if (n.length >= t) return n.substr(0, t);
      for (; t > n.length && e > 1; ) (1 & e && (n += A), (e >>= 1), (A += A));
      return (n = (n += A).substr(0, t));
    };
  },
  eMjc: function (A, e, t) {
    var r,
      n,
      o,
      i =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (A) {
              return typeof A;
            }
          : function (A) {
              return A &&
                'function' == typeof Symbol &&
                A.constructor === Symbol &&
                A !== Symbol.prototype
                ? 'symbol'
                : typeof A;
            };
    ((o = function () {
      'use strict';
      var A = function (e, t) {
        return (A =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (A, e) {
              A.__proto__ = e;
            }) ||
          function (A, e) {
            for (var t in e) e.hasOwnProperty(t) && (A[t] = e[t]);
          })(e, t);
      };
      function e(e, t) {
        function r() {
          this.constructor = e;
        }
        (A(e, t),
          (e.prototype = null === t ? Object.create(t) : ((r.prototype = t.prototype), new r())));
      }
      var t = function () {
        return (t =
          Object.assign ||
          function (A) {
            for (var e, t = 1, r = arguments.length; t < r; t++)
              for (var n in (e = arguments[t]))
                Object.prototype.hasOwnProperty.call(e, n) && (A[n] = e[n]);
            return A;
          }).apply(this, arguments);
      };
      function r(A, e, t, r) {
        return new (t || (t = Promise))(function (n, o) {
          function i(A) {
            try {
              s(r.next(A));
            } catch (A) {
              o(A);
            }
          }
          function a(A) {
            try {
              s(r.throw(A));
            } catch (A) {
              o(A);
            }
          }
          function s(A) {
            A.done
              ? n(A.value)
              : new t(function (e) {
                  e(A.value);
                }).then(i, a);
          }
          s((r = r.apply(A, e || [])).next());
        });
      }
      function n(A, e) {
        var t,
          r,
          n,
          o,
          i = {
            label: 0,
            sent: function () {
              if (1 & n[0]) throw n[1];
              return n[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: a(0), throw: a(1), return: a(2) }),
          'function' == typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function a(o) {
          return function (a) {
            return (function (o) {
              if (t) throw new TypeError('Generator is already executing.');
              for (; i; )
                try {
                  if (
                    ((t = 1),
                    r &&
                      (n =
                        2 & o[0]
                          ? r.return
                          : o[0]
                            ? r.throw || ((n = r.return) && n.call(r), 0)
                            : r.next) &&
                      !(n = n.call(r, o[1])).done)
                  )
                    return n;
                  switch (((r = 0), n && (o = [2 & o[0], n.value]), o[0])) {
                    case 0:
                    case 1:
                      n = o;
                      break;
                    case 4:
                      return (i.label++, { value: o[1], done: !1 });
                    case 5:
                      (i.label++, (r = o[1]), (o = [0]));
                      continue;
                    case 7:
                      ((o = i.ops.pop()), i.trys.pop());
                      continue;
                    default:
                      if (
                        !(n = (n = i.trys).length > 0 && n[n.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        i = 0;
                        continue;
                      }
                      if (3 === o[0] && (!n || (o[1] > n[0] && o[1] < n[3]))) {
                        i.label = o[1];
                        break;
                      }
                      if (6 === o[0] && i.label < n[1]) {
                        ((i.label = n[1]), (n = o));
                        break;
                      }
                      if (n && i.label < n[2]) {
                        ((i.label = n[2]), i.ops.push(o));
                        break;
                      }
                      (n[2] && i.ops.pop(), i.trys.pop());
                      continue;
                  }
                  o = e.call(A, i);
                } catch (A) {
                  ((o = [6, A]), (r = 0));
                } finally {
                  t = n = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, a]);
          };
        }
      }
      for (
        var o = (function () {
            function A(A, e, t, r) {
              ((this.left = A), (this.top = e), (this.width = t), (this.height = r));
            }
            return (
              (A.prototype.add = function (e, t, r, n) {
                return new A(this.left + e, this.top + t, this.width + r, this.height + n);
              }),
              (A.fromClientRect = function (e) {
                return new A(e.left, e.top, e.width, e.height);
              }),
              A
            );
          })(),
          a = function (A) {
            return o.fromClientRect(A.getBoundingClientRect());
          },
          s = function (A) {
            for (var e = [], t = 0, r = A.length; t < r; ) {
              var n = A.charCodeAt(t++);
              if (n >= 55296 && n <= 56319 && t < r) {
                var o = A.charCodeAt(t++);
                56320 == (64512 & o)
                  ? e.push(((1023 & n) << 10) + (1023 & o) + 65536)
                  : (e.push(n), t--);
              } else e.push(n);
            }
            return e;
          },
          c = function () {
            for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
            if (String.fromCodePoint) return String.fromCodePoint.apply(String, A);
            var t = A.length;
            if (!t) return '';
            for (var r = [], n = -1, o = ''; ++n < t; ) {
              var i = A[n];
              (i <= 65535
                ? r.push(i)
                : ((i -= 65536), r.push(55296 + (i >> 10), (i % 1024) + 56320)),
                (n + 1 === t || r.length > 16384) &&
                  ((o += String.fromCharCode.apply(String, r)), (r.length = 0)));
            }
            return o;
          },
          u = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          B = 'undefined' == typeof Uint8Array ? [] : new Uint8Array(256),
          l = 0;
        l < u.length;
        l++
      )
        B[u.charCodeAt(l)] = l;
      var f,
        h = function (A, e, t) {
          return A.slice ? A.slice(e, t) : new Uint16Array(Array.prototype.slice.call(A, e, t));
        },
        g = (function () {
          function A(A, e, t, r, n, o) {
            ((this.initialValue = A),
              (this.errorValue = e),
              (this.highStart = t),
              (this.highValueIndex = r),
              (this.index = n),
              (this.data = o));
          }
          return (
            (A.prototype.get = function (A) {
              var e;
              if (A >= 0) {
                if (A < 55296 || (A > 56319 && A <= 65535))
                  return ((e = ((e = this.index[A >> 5]) << 2) + (31 & A)), this.data[e]);
                if (A <= 65535)
                  return (
                    (e = ((e = this.index[2048 + ((A - 55296) >> 5)]) << 2) + (31 & A)),
                    this.data[e]
                  );
                if (A < this.highStart)
                  return (
                    (e = 2080 + (A >> 11)),
                    (e = this.index[e]),
                    (e += (A >> 5) & 63),
                    (e = ((e = this.index[e]) << 2) + (31 & A)),
                    this.data[e]
                  );
                if (A <= 1114111) return this.data[this.highValueIndex];
              }
              return this.errorValue;
            }),
            A
          );
        })(),
        w = 10,
        d = 13,
        E = 15,
        p = 17,
        Q = 18,
        U = 19,
        C = 20,
        F = 21,
        m = 22,
        _ = 24,
        H = 25,
        T = 26,
        v = 27,
        y = 28,
        N = 30,
        I = 32,
        b = 33,
        R = 34,
        K = 35,
        S = 37,
        L = 38,
        O = 39,
        M = 40,
        D = 42,
        x = '!',
        P = (function (A) {
          var e,
            t,
            r,
            n = (function (A) {
              var e,
                t,
                r,
                n,
                o,
                i = 0.75 * A.length,
                a = A.length,
                s = 0;
              '=' === A[A.length - 1] && (i--, '=' === A[A.length - 2] && i--);
              var c =
                  'undefined' != typeof ArrayBuffer &&
                  'undefined' != typeof Uint8Array &&
                  void 0 !== Uint8Array.prototype.slice
                    ? new ArrayBuffer(i)
                    : new Array(i),
                u = Array.isArray(c) ? c : new Uint8Array(c);
              for (e = 0; e < a; e += 4)
                ((t = B[A.charCodeAt(e)]),
                  (r = B[A.charCodeAt(e + 1)]),
                  (n = B[A.charCodeAt(e + 2)]),
                  (o = B[A.charCodeAt(e + 3)]),
                  (u[s++] = (t << 2) | (r >> 4)),
                  (u[s++] = ((15 & r) << 4) | (n >> 2)),
                  (u[s++] = ((3 & n) << 6) | (63 & o)));
              return c;
            })(A),
            o = Array.isArray(n)
              ? (function (A) {
                  for (var e = A.length, t = [], r = 0; r < e; r += 4)
                    t.push((A[r + 3] << 24) | (A[r + 2] << 16) | (A[r + 1] << 8) | A[r]);
                  return t;
                })(n)
              : new Uint32Array(n),
            i = Array.isArray(n)
              ? (function (A) {
                  for (var e = A.length, t = [], r = 0; r < e; r += 2)
                    t.push((A[r + 1] << 8) | A[r]);
                  return t;
                })(n)
              : new Uint16Array(n),
            a = h(i, 12, o[4] / 2),
            s =
              2 === o[5]
                ? h(i, (24 + o[4]) / 2)
                : ((e = o),
                  (t = Math.ceil((24 + o[4]) / 4)),
                  e.slice ? e.slice(t, r) : new Uint32Array(Array.prototype.slice.call(e, t, r)));
          return new g(o[0], o[1], o[2], o[3], a, s);
        })(
          'KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA'
        ),
        V = [N, 36],
        X = [1, 2, 3, 5],
        z = [w, 8],
        k = [v, T],
        G = X.concat(z),
        J = [L, O, M, R, K],
        Y = [E, d],
        W = function (A, e, t, r) {
          var n = r[t];
          if (Array.isArray(A) ? -1 !== A.indexOf(n) : A === n)
            for (var o = t; o <= r.length; ) {
              if ((s = r[++o]) === e) return !0;
              if (s !== w) break;
            }
          if (n === w)
            for (o = t; o > 0; ) {
              var i = r[--o];
              if (Array.isArray(A) ? -1 !== A.indexOf(i) : A === i)
                for (var a = t; a <= r.length; ) {
                  var s;
                  if ((s = r[++a]) === e) return !0;
                  if (s !== w) break;
                }
              if (i !== w) break;
            }
          return !1;
        },
        j = function (A, e) {
          for (var t = A; t >= 0; ) {
            var r = e[t];
            if (r !== w) return r;
            t--;
          }
          return 0;
        },
        q = function (A, e, t, r, n) {
          if (0 === t[r]) return '×';
          var o = r - 1;
          if (Array.isArray(n) && !0 === n[o]) return '×';
          var i = o - 1,
            a = o + 1,
            s = e[o],
            c = i >= 0 ? e[i] : 0,
            u = e[a];
          if (2 === s && 3 === u) return '×';
          if (-1 !== X.indexOf(s)) return x;
          if (-1 !== X.indexOf(u)) return '×';
          if (-1 !== z.indexOf(u)) return '×';
          if (8 === j(o, e)) return '÷';
          if (11 === P.get(A[o]) && (u === S || u === I || u === b)) return '×';
          if (7 === s || 7 === u) return '×';
          if (9 === s) return '×';
          if (-1 === [w, d, E].indexOf(s) && 9 === u) return '×';
          if (-1 !== [p, Q, U, _, y].indexOf(u)) return '×';
          if (j(o, e) === m) return '×';
          if (W(23, m, o, e)) return '×';
          if (W([p, Q], F, o, e)) return '×';
          if (W(12, 12, o, e)) return '×';
          if (s === w) return '÷';
          if (23 === s || 23 === u) return '×';
          if (16 === u || 16 === s) return '÷';
          if (-1 !== [d, E, F].indexOf(u) || 14 === s) return '×';
          if (36 === c && -1 !== Y.indexOf(s)) return '×';
          if (s === y && 36 === u) return '×';
          if (u === C && -1 !== V.concat(C, U, H, S, I, b).indexOf(s)) return '×';
          if ((-1 !== V.indexOf(u) && s === H) || (-1 !== V.indexOf(s) && u === H)) return '×';
          if ((s === v && -1 !== [S, I, b].indexOf(u)) || (-1 !== [S, I, b].indexOf(s) && u === T))
            return '×';
          if (
            (-1 !== V.indexOf(s) && -1 !== k.indexOf(u)) ||
            (-1 !== k.indexOf(s) && -1 !== V.indexOf(u))
          )
            return '×';
          if (
            (-1 !== [v, T].indexOf(s) &&
              (u === H || (-1 !== [m, E].indexOf(u) && e[a + 1] === H))) ||
            (-1 !== [m, E].indexOf(s) && u === H) ||
            (s === H && -1 !== [H, y, _].indexOf(u))
          )
            return '×';
          if (-1 !== [H, y, _, p, Q].indexOf(u))
            for (var B = o; B >= 0; ) {
              if ((l = e[B]) === H) return '×';
              if (-1 === [y, _].indexOf(l)) break;
              B--;
            }
          if (-1 !== [v, T].indexOf(u))
            for (B = -1 !== [p, Q].indexOf(s) ? i : o; B >= 0; ) {
              var l;
              if ((l = e[B]) === H) return '×';
              if (-1 === [y, _].indexOf(l)) break;
              B--;
            }
          if (
            (L === s && -1 !== [L, O, R, K].indexOf(u)) ||
            (-1 !== [O, R].indexOf(s) && -1 !== [O, M].indexOf(u)) ||
            (-1 !== [M, K].indexOf(s) && u === M)
          )
            return '×';
          if ((-1 !== J.indexOf(s) && -1 !== [C, T].indexOf(u)) || (-1 !== J.indexOf(u) && s === v))
            return '×';
          if (-1 !== V.indexOf(s) && -1 !== V.indexOf(u)) return '×';
          if (s === _ && -1 !== V.indexOf(u)) return '×';
          if (
            (-1 !== V.concat(H).indexOf(s) && u === m) ||
            (-1 !== V.concat(H).indexOf(u) && s === Q)
          )
            return '×';
          if (41 === s && 41 === u) {
            for (var f = t[o], h = 1; f > 0 && 41 === e[--f]; ) h++;
            if (h % 2 != 0) return '×';
          }
          return s === I && u === b ? '×' : '÷';
        },
        Z = function (A, e) {
          e || (e = { lineBreak: 'normal', wordBreak: 'normal' });
          var t = (function (A, e) {
              void 0 === e && (e = 'strict');
              var t = [],
                r = [],
                n = [];
              return (
                A.forEach(function (A, o) {
                  var i = P.get(A);
                  if (
                    (i > 50 ? (n.push(!0), (i -= 50)) : n.push(!1),
                    -1 !== ['normal', 'auto', 'loose'].indexOf(e) &&
                      -1 !== [8208, 8211, 12316, 12448].indexOf(A))
                  )
                    return (r.push(o), t.push(16));
                  if (4 === i || 11 === i) {
                    if (0 === o) return (r.push(o), t.push(N));
                    var a = t[o - 1];
                    return -1 === G.indexOf(a)
                      ? (r.push(r[o - 1]), t.push(a))
                      : (r.push(o), t.push(N));
                  }
                  return (
                    r.push(o),
                    31 === i
                      ? t.push('strict' === e ? F : S)
                      : i === D
                        ? t.push(N)
                        : 29 === i
                          ? t.push(N)
                          : 43 === i
                            ? (A >= 131072 && A <= 196605) || (A >= 196608 && A <= 262141)
                              ? t.push(S)
                              : t.push(N)
                            : void t.push(i)
                  );
                }),
                [r, t, n]
              );
            })(A, e.lineBreak),
            r = t[0],
            n = t[1],
            o = t[2];
          return (
            ('break-all' !== e.wordBreak && 'break-word' !== e.wordBreak) ||
              (n = n.map(function (A) {
                return -1 !== [H, N, D].indexOf(A) ? S : A;
              })),
            [
              r,
              n,
              'keep-all' === e.wordBreak
                ? o.map(function (e, t) {
                    return e && A[t] >= 19968 && A[t] <= 40959;
                  })
                : void 0,
            ]
          );
        },
        $ = (function () {
          function A(A, e, t, r) {
            ((this.codePoints = A), (this.required = e === x), (this.start = t), (this.end = r));
          }
          return (
            (A.prototype.slice = function () {
              return c.apply(void 0, this.codePoints.slice(this.start, this.end));
            }),
            A
          );
        })();
      !(function (A) {
        ((A[(A.STRING_TOKEN = 0)] = 'STRING_TOKEN'),
          (A[(A.BAD_STRING_TOKEN = 1)] = 'BAD_STRING_TOKEN'),
          (A[(A.LEFT_PARENTHESIS_TOKEN = 2)] = 'LEFT_PARENTHESIS_TOKEN'),
          (A[(A.RIGHT_PARENTHESIS_TOKEN = 3)] = 'RIGHT_PARENTHESIS_TOKEN'),
          (A[(A.COMMA_TOKEN = 4)] = 'COMMA_TOKEN'),
          (A[(A.HASH_TOKEN = 5)] = 'HASH_TOKEN'),
          (A[(A.DELIM_TOKEN = 6)] = 'DELIM_TOKEN'),
          (A[(A.AT_KEYWORD_TOKEN = 7)] = 'AT_KEYWORD_TOKEN'),
          (A[(A.PREFIX_MATCH_TOKEN = 8)] = 'PREFIX_MATCH_TOKEN'),
          (A[(A.DASH_MATCH_TOKEN = 9)] = 'DASH_MATCH_TOKEN'),
          (A[(A.INCLUDE_MATCH_TOKEN = 10)] = 'INCLUDE_MATCH_TOKEN'),
          (A[(A.LEFT_CURLY_BRACKET_TOKEN = 11)] = 'LEFT_CURLY_BRACKET_TOKEN'),
          (A[(A.RIGHT_CURLY_BRACKET_TOKEN = 12)] = 'RIGHT_CURLY_BRACKET_TOKEN'),
          (A[(A.SUFFIX_MATCH_TOKEN = 13)] = 'SUFFIX_MATCH_TOKEN'),
          (A[(A.SUBSTRING_MATCH_TOKEN = 14)] = 'SUBSTRING_MATCH_TOKEN'),
          (A[(A.DIMENSION_TOKEN = 15)] = 'DIMENSION_TOKEN'),
          (A[(A.PERCENTAGE_TOKEN = 16)] = 'PERCENTAGE_TOKEN'),
          (A[(A.NUMBER_TOKEN = 17)] = 'NUMBER_TOKEN'),
          (A[(A.FUNCTION = 18)] = 'FUNCTION'),
          (A[(A.FUNCTION_TOKEN = 19)] = 'FUNCTION_TOKEN'),
          (A[(A.IDENT_TOKEN = 20)] = 'IDENT_TOKEN'),
          (A[(A.COLUMN_TOKEN = 21)] = 'COLUMN_TOKEN'),
          (A[(A.URL_TOKEN = 22)] = 'URL_TOKEN'),
          (A[(A.BAD_URL_TOKEN = 23)] = 'BAD_URL_TOKEN'),
          (A[(A.CDC_TOKEN = 24)] = 'CDC_TOKEN'),
          (A[(A.CDO_TOKEN = 25)] = 'CDO_TOKEN'),
          (A[(A.COLON_TOKEN = 26)] = 'COLON_TOKEN'),
          (A[(A.SEMICOLON_TOKEN = 27)] = 'SEMICOLON_TOKEN'),
          (A[(A.LEFT_SQUARE_BRACKET_TOKEN = 28)] = 'LEFT_SQUARE_BRACKET_TOKEN'),
          (A[(A.RIGHT_SQUARE_BRACKET_TOKEN = 29)] = 'RIGHT_SQUARE_BRACKET_TOKEN'),
          (A[(A.UNICODE_RANGE_TOKEN = 30)] = 'UNICODE_RANGE_TOKEN'),
          (A[(A.WHITESPACE_TOKEN = 31)] = 'WHITESPACE_TOKEN'),
          (A[(A.EOF_TOKEN = 32)] = 'EOF_TOKEN'));
      })(f || (f = {}));
      var AA = function (A) {
          return A >= 48 && A <= 57;
        },
        eA = function (A) {
          return AA(A) || (A >= 65 && A <= 70) || (A >= 97 && A <= 102);
        },
        tA = function (A) {
          return 10 === A || 9 === A || 32 === A;
        },
        rA = function (A) {
          return (
            (function (A) {
              return (
                (function (A) {
                  return A >= 97 && A <= 122;
                })(A) ||
                (function (A) {
                  return A >= 65 && A <= 90;
                })(A)
              );
            })(A) ||
            (function (A) {
              return A >= 128;
            })(A) ||
            95 === A
          );
        },
        nA = function (A) {
          return rA(A) || AA(A) || 45 === A;
        },
        oA = function (A) {
          return (A >= 0 && A <= 8) || 11 === A || (A >= 14 && A <= 31) || 127 === A;
        },
        iA = function (A, e) {
          return 92 === A && 10 !== e;
        },
        aA = function (A, e, t) {
          return 45 === A ? rA(e) || iA(e, t) : !!rA(A) || !(92 !== A || !iA(A, e));
        },
        sA = function (A, e, t) {
          return 43 === A || 45 === A ? !!AA(e) || (46 === e && AA(t)) : AA(46 === A ? e : A);
        },
        cA = { type: f.LEFT_PARENTHESIS_TOKEN },
        uA = { type: f.RIGHT_PARENTHESIS_TOKEN },
        BA = { type: f.COMMA_TOKEN },
        lA = { type: f.SUFFIX_MATCH_TOKEN },
        fA = { type: f.PREFIX_MATCH_TOKEN },
        hA = { type: f.COLUMN_TOKEN },
        gA = { type: f.DASH_MATCH_TOKEN },
        wA = { type: f.INCLUDE_MATCH_TOKEN },
        dA = { type: f.LEFT_CURLY_BRACKET_TOKEN },
        EA = { type: f.RIGHT_CURLY_BRACKET_TOKEN },
        pA = { type: f.SUBSTRING_MATCH_TOKEN },
        QA = { type: f.BAD_URL_TOKEN },
        UA = { type: f.BAD_STRING_TOKEN },
        CA = { type: f.CDO_TOKEN },
        FA = { type: f.CDC_TOKEN },
        mA = { type: f.COLON_TOKEN },
        _A = { type: f.SEMICOLON_TOKEN },
        HA = { type: f.LEFT_SQUARE_BRACKET_TOKEN },
        TA = { type: f.RIGHT_SQUARE_BRACKET_TOKEN },
        vA = { type: f.WHITESPACE_TOKEN },
        yA = { type: f.EOF_TOKEN },
        NA = (function () {
          function A() {
            this._value = [];
          }
          return (
            (A.prototype.write = function (A) {
              this._value = this._value.concat(s(A));
            }),
            (A.prototype.read = function () {
              for (var A = [], e = this.consumeToken(); e !== yA; )
                (A.push(e), (e = this.consumeToken()));
              return A;
            }),
            (A.prototype.consumeToken = function () {
              var A = this.consumeCodePoint();
              switch (A) {
                case 34:
                  return this.consumeStringToken(34);
                case 35:
                  var e = this.peekCodePoint(0),
                    t = this.peekCodePoint(1),
                    r = this.peekCodePoint(2);
                  if (nA(e) || iA(t, r)) {
                    var n = aA(e, t, r) ? 2 : 1,
                      o = this.consumeName();
                    return { type: f.HASH_TOKEN, value: o, flags: n };
                  }
                  break;
                case 36:
                  if (61 === this.peekCodePoint(0)) return (this.consumeCodePoint(), lA);
                  break;
                case 39:
                  return this.consumeStringToken(39);
                case 40:
                  return cA;
                case 41:
                  return uA;
                case 42:
                  if (61 === this.peekCodePoint(0)) return (this.consumeCodePoint(), pA);
                  break;
                case 43:
                  if (sA(A, this.peekCodePoint(0), this.peekCodePoint(1)))
                    return (this.reconsumeCodePoint(A), this.consumeNumericToken());
                  break;
                case 44:
                  return BA;
                case 45:
                  var i = A,
                    a = this.peekCodePoint(0),
                    s = this.peekCodePoint(1);
                  if (sA(i, a, s)) return (this.reconsumeCodePoint(A), this.consumeNumericToken());
                  if (aA(i, a, s))
                    return (this.reconsumeCodePoint(A), this.consumeIdentLikeToken());
                  if (45 === a && 62 === s)
                    return (this.consumeCodePoint(), this.consumeCodePoint(), FA);
                  break;
                case 46:
                  if (sA(A, this.peekCodePoint(0), this.peekCodePoint(1)))
                    return (this.reconsumeCodePoint(A), this.consumeNumericToken());
                  break;
                case 47:
                  if (42 === this.peekCodePoint(0))
                    for (this.consumeCodePoint(); ; ) {
                      var u = this.consumeCodePoint();
                      if (42 === u && 47 === (u = this.consumeCodePoint()))
                        return this.consumeToken();
                      if (-1 === u) return this.consumeToken();
                    }
                  break;
                case 58:
                  return mA;
                case 59:
                  return _A;
                case 60:
                  if (
                    33 === this.peekCodePoint(0) &&
                    45 === this.peekCodePoint(1) &&
                    45 === this.peekCodePoint(2)
                  )
                    return (this.consumeCodePoint(), this.consumeCodePoint(), CA);
                  break;
                case 64:
                  var B = this.peekCodePoint(0),
                    l = this.peekCodePoint(1),
                    h = this.peekCodePoint(2);
                  if (aA(B, l, h)) {
                    o = this.consumeName();
                    return { type: f.AT_KEYWORD_TOKEN, value: o };
                  }
                  break;
                case 91:
                  return HA;
                case 92:
                  if (iA(A, this.peekCodePoint(0)))
                    return (this.reconsumeCodePoint(A), this.consumeIdentLikeToken());
                  break;
                case 93:
                  return TA;
                case 61:
                  if (61 === this.peekCodePoint(0)) return (this.consumeCodePoint(), fA);
                  break;
                case 123:
                  return dA;
                case 125:
                  return EA;
                case 117:
                case 85:
                  var g = this.peekCodePoint(0),
                    w = this.peekCodePoint(1);
                  return (
                    43 !== g ||
                      (!eA(w) && 63 !== w) ||
                      (this.consumeCodePoint(), this.consumeUnicodeRangeToken()),
                    this.reconsumeCodePoint(A),
                    this.consumeIdentLikeToken()
                  );
                case 124:
                  if (61 === this.peekCodePoint(0)) return (this.consumeCodePoint(), gA);
                  if (124 === this.peekCodePoint(0)) return (this.consumeCodePoint(), hA);
                  break;
                case 126:
                  if (61 === this.peekCodePoint(0)) return (this.consumeCodePoint(), wA);
                  break;
                case -1:
                  return yA;
              }
              return tA(A)
                ? (this.consumeWhiteSpace(), vA)
                : AA(A)
                  ? (this.reconsumeCodePoint(A), this.consumeNumericToken())
                  : rA(A)
                    ? (this.reconsumeCodePoint(A), this.consumeIdentLikeToken())
                    : { type: f.DELIM_TOKEN, value: c(A) };
            }),
            (A.prototype.consumeCodePoint = function () {
              var A = this._value.shift();
              return void 0 === A ? -1 : A;
            }),
            (A.prototype.reconsumeCodePoint = function (A) {
              this._value.unshift(A);
            }),
            (A.prototype.peekCodePoint = function (A) {
              return A >= this._value.length ? -1 : this._value[A];
            }),
            (A.prototype.consumeUnicodeRangeToken = function () {
              for (var A = [], e = this.consumeCodePoint(); eA(e) && A.length < 6; )
                (A.push(e), (e = this.consumeCodePoint()));
              for (var t = !1; 63 === e && A.length < 6; )
                (A.push(e), (e = this.consumeCodePoint()), (t = !0));
              if (t) {
                var r = parseInt(
                    c.apply(
                      void 0,
                      A.map(function (A) {
                        return 63 === A ? 48 : A;
                      })
                    ),
                    16
                  ),
                  n = parseInt(
                    c.apply(
                      void 0,
                      A.map(function (A) {
                        return 63 === A ? 70 : A;
                      })
                    ),
                    16
                  );
                return { type: f.UNICODE_RANGE_TOKEN, start: r, end: n };
              }
              var o = parseInt(c.apply(void 0, A), 16);
              if (45 === this.peekCodePoint(0) && eA(this.peekCodePoint(1))) {
                (this.consumeCodePoint(), (e = this.consumeCodePoint()));
                for (var i = []; eA(e) && i.length < 6; )
                  (i.push(e), (e = this.consumeCodePoint()));
                n = parseInt(c.apply(void 0, i), 16);
                return { type: f.UNICODE_RANGE_TOKEN, start: o, end: n };
              }
              return { type: f.UNICODE_RANGE_TOKEN, start: o, end: o };
            }),
            (A.prototype.consumeIdentLikeToken = function () {
              var A = this.consumeName();
              return 'url' === A.toLowerCase() && 40 === this.peekCodePoint(0)
                ? (this.consumeCodePoint(), this.consumeUrlToken())
                : 40 === this.peekCodePoint(0)
                  ? (this.consumeCodePoint(), { type: f.FUNCTION_TOKEN, value: A })
                  : { type: f.IDENT_TOKEN, value: A };
            }),
            (A.prototype.consumeUrlToken = function () {
              var A = [];
              if ((this.consumeWhiteSpace(), -1 === this.peekCodePoint(0)))
                return { type: f.URL_TOKEN, value: '' };
              var e = this.peekCodePoint(0);
              if (39 === e || 34 === e) {
                var t = this.consumeStringToken(this.consumeCodePoint());
                return t.type === f.STRING_TOKEN &&
                  (this.consumeWhiteSpace(),
                  -1 === this.peekCodePoint(0) || 41 === this.peekCodePoint(0))
                  ? (this.consumeCodePoint(), { type: f.URL_TOKEN, value: t.value })
                  : (this.consumeBadUrlRemnants(), QA);
              }
              for (;;) {
                var r = this.consumeCodePoint();
                if (-1 === r || 41 === r) return { type: f.URL_TOKEN, value: c.apply(void 0, A) };
                if (tA(r))
                  return (
                    this.consumeWhiteSpace(),
                    -1 === this.peekCodePoint(0) || 41 === this.peekCodePoint(0)
                      ? (this.consumeCodePoint(), { type: f.URL_TOKEN, value: c.apply(void 0, A) })
                      : (this.consumeBadUrlRemnants(), QA)
                  );
                if (34 === r || 39 === r || 40 === r || oA(r))
                  return (this.consumeBadUrlRemnants(), QA);
                if (92 === r) {
                  if (!iA(r, this.peekCodePoint(0))) return (this.consumeBadUrlRemnants(), QA);
                  A.push(this.consumeEscapedCodePoint());
                } else A.push(r);
              }
            }),
            (A.prototype.consumeWhiteSpace = function () {
              for (; tA(this.peekCodePoint(0)); ) this.consumeCodePoint();
            }),
            (A.prototype.consumeBadUrlRemnants = function () {
              for (;;) {
                var A = this.consumeCodePoint();
                if (41 === A || -1 === A) return;
                iA(A, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
              }
            }),
            (A.prototype.consumeStringSlice = function (A) {
              for (var e = ''; A > 0; ) {
                var t = Math.min(6e4, A);
                ((e += c.apply(void 0, this._value.splice(0, t))), (A -= t));
              }
              return (this._value.shift(), e);
            }),
            (A.prototype.consumeStringToken = function (A) {
              for (var e = '', t = 0; ; ) {
                var r = this._value[t];
                if (-1 === r || void 0 === r || r === A)
                  return ((e += this.consumeStringSlice(t)), { type: f.STRING_TOKEN, value: e });
                if (10 === r) return (this._value.splice(0, t), UA);
                if (92 === r) {
                  var n = this._value[t + 1];
                  -1 !== n &&
                    void 0 !== n &&
                    (10 === n
                      ? ((e += this.consumeStringSlice(t)), (t = -1), this._value.shift())
                      : iA(r, n) &&
                        ((e += this.consumeStringSlice(t)),
                        (e += c(this.consumeEscapedCodePoint())),
                        (t = -1)));
                }
                t++;
              }
            }),
            (A.prototype.consumeNumber = function () {
              var A = [],
                e = 4,
                t = this.peekCodePoint(0);
              for (
                (43 !== t && 45 !== t) || A.push(this.consumeCodePoint());
                AA(this.peekCodePoint(0));

              )
                A.push(this.consumeCodePoint());
              t = this.peekCodePoint(0);
              var r = this.peekCodePoint(1);
              if (46 === t && AA(r))
                for (
                  A.push(this.consumeCodePoint(), this.consumeCodePoint()), e = 8;
                  AA(this.peekCodePoint(0));

                )
                  A.push(this.consumeCodePoint());
              ((t = this.peekCodePoint(0)), (r = this.peekCodePoint(1)));
              var n = this.peekCodePoint(2);
              if ((69 === t || 101 === t) && (((43 === r || 45 === r) && AA(n)) || AA(r)))
                for (
                  A.push(this.consumeCodePoint(), this.consumeCodePoint()), e = 8;
                  AA(this.peekCodePoint(0));

                )
                  A.push(this.consumeCodePoint());
              return [
                (function (A) {
                  var e = 0,
                    t = 1;
                  (43 !== A[e] && 45 !== A[e]) || (45 === A[e] && (t = -1), e++);
                  for (var r = []; AA(A[e]); ) r.push(A[e++]);
                  var n = r.length ? parseInt(c.apply(void 0, r), 10) : 0;
                  46 === A[e] && e++;
                  for (var o = []; AA(A[e]); ) o.push(A[e++]);
                  var i = o.length,
                    a = i ? parseInt(c.apply(void 0, o), 10) : 0;
                  (69 !== A[e] && 101 !== A[e]) || e++;
                  var s = 1;
                  (43 !== A[e] && 45 !== A[e]) || (45 === A[e] && (s = -1), e++);
                  for (var u = []; AA(A[e]); ) u.push(A[e++]);
                  var B = u.length ? parseInt(c.apply(void 0, u), 10) : 0;
                  return t * (n + a * Math.pow(10, -i)) * Math.pow(10, s * B);
                })(A),
                e,
              ];
            }),
            (A.prototype.consumeNumericToken = function () {
              var A = this.consumeNumber(),
                e = A[0],
                t = A[1],
                r = this.peekCodePoint(0),
                n = this.peekCodePoint(1),
                o = this.peekCodePoint(2);
              if (aA(r, n, o)) {
                var i = this.consumeName();
                return { type: f.DIMENSION_TOKEN, number: e, flags: t, unit: i };
              }
              return 37 === r
                ? (this.consumeCodePoint(), { type: f.PERCENTAGE_TOKEN, number: e, flags: t })
                : { type: f.NUMBER_TOKEN, number: e, flags: t };
            }),
            (A.prototype.consumeEscapedCodePoint = function () {
              var A = this.consumeCodePoint();
              if (eA(A)) {
                for (var e = c(A); eA(this.peekCodePoint(0)) && e.length < 6; )
                  e += c(this.consumeCodePoint());
                tA(this.peekCodePoint(0)) && this.consumeCodePoint();
                var t = parseInt(e, 16);
                return 0 === t ||
                  (function (A) {
                    return A >= 55296 && A <= 57343;
                  })(t) ||
                  t > 1114111
                  ? 65533
                  : t;
              }
              return -1 === A ? 65533 : A;
            }),
            (A.prototype.consumeName = function () {
              for (var A = ''; ; ) {
                var e = this.consumeCodePoint();
                if (nA(e)) A += c(e);
                else {
                  if (!iA(e, this.peekCodePoint(0))) return (this.reconsumeCodePoint(e), A);
                  A += c(this.consumeEscapedCodePoint());
                }
              }
            }),
            A
          );
        })(),
        IA = (function () {
          function A(A) {
            this._tokens = A;
          }
          return (
            (A.create = function (e) {
              var t = new NA();
              return (t.write(e), new A(t.read()));
            }),
            (A.parseValue = function (e) {
              return A.create(e).parseComponentValue();
            }),
            (A.parseValues = function (e) {
              return A.create(e).parseComponentValues();
            }),
            (A.prototype.parseComponentValue = function () {
              for (var A = this.consumeToken(); A.type === f.WHITESPACE_TOKEN; )
                A = this.consumeToken();
              if (A.type === f.EOF_TOKEN)
                throw new SyntaxError('Error parsing CSS component value, unexpected EOF');
              this.reconsumeToken(A);
              var e = this.consumeComponentValue();
              do {
                A = this.consumeToken();
              } while (A.type === f.WHITESPACE_TOKEN);
              if (A.type === f.EOF_TOKEN) return e;
              throw new SyntaxError(
                'Error parsing CSS component value, multiple values found when expecting only one'
              );
            }),
            (A.prototype.parseComponentValues = function () {
              for (var A = []; ; ) {
                var e = this.consumeComponentValue();
                if (e.type === f.EOF_TOKEN) return A;
                (A.push(e), A.push());
              }
            }),
            (A.prototype.consumeComponentValue = function () {
              var A = this.consumeToken();
              switch (A.type) {
                case f.LEFT_CURLY_BRACKET_TOKEN:
                case f.LEFT_SQUARE_BRACKET_TOKEN:
                case f.LEFT_PARENTHESIS_TOKEN:
                  return this.consumeSimpleBlock(A.type);
                case f.FUNCTION_TOKEN:
                  return this.consumeFunction(A);
              }
              return A;
            }),
            (A.prototype.consumeSimpleBlock = function (A) {
              for (var e = { type: A, values: [] }, t = this.consumeToken(); ; ) {
                if (t.type === f.EOF_TOKEN || xA(t, A)) return e;
                (this.reconsumeToken(t),
                  e.values.push(this.consumeComponentValue()),
                  (t = this.consumeToken()));
              }
            }),
            (A.prototype.consumeFunction = function (A) {
              for (var e = { name: A.value, values: [], type: f.FUNCTION }; ; ) {
                var t = this.consumeToken();
                if (t.type === f.EOF_TOKEN || t.type === f.RIGHT_PARENTHESIS_TOKEN) return e;
                (this.reconsumeToken(t), e.values.push(this.consumeComponentValue()));
              }
            }),
            (A.prototype.consumeToken = function () {
              var A = this._tokens.shift();
              return void 0 === A ? yA : A;
            }),
            (A.prototype.reconsumeToken = function (A) {
              this._tokens.unshift(A);
            }),
            A
          );
        })(),
        bA = function (A) {
          return A.type === f.DIMENSION_TOKEN;
        },
        RA = function (A) {
          return A.type === f.NUMBER_TOKEN;
        },
        KA = function (A) {
          return A.type === f.IDENT_TOKEN;
        },
        SA = function (A) {
          return A.type === f.STRING_TOKEN;
        },
        LA = function (A, e) {
          return KA(A) && A.value === e;
        },
        OA = function (A) {
          return A.type !== f.WHITESPACE_TOKEN;
        },
        MA = function (A) {
          return A.type !== f.WHITESPACE_TOKEN && A.type !== f.COMMA_TOKEN;
        },
        DA = function (A) {
          var e = [],
            t = [];
          return (
            A.forEach(function (A) {
              if (A.type === f.COMMA_TOKEN) {
                if (0 === t.length)
                  throw new Error('Error parsing function args, zero tokens for arg');
                return (e.push(t), void (t = []));
              }
              A.type !== f.WHITESPACE_TOKEN && t.push(A);
            }),
            t.length && e.push(t),
            e
          );
        },
        xA = function (A, e) {
          return (
            (e === f.LEFT_CURLY_BRACKET_TOKEN && A.type === f.RIGHT_CURLY_BRACKET_TOKEN) ||
            (e === f.LEFT_SQUARE_BRACKET_TOKEN && A.type === f.RIGHT_SQUARE_BRACKET_TOKEN) ||
            (e === f.LEFT_PARENTHESIS_TOKEN && A.type === f.RIGHT_PARENTHESIS_TOKEN)
          );
        },
        PA = function (A) {
          return A.type === f.NUMBER_TOKEN || A.type === f.DIMENSION_TOKEN;
        },
        VA = function (A) {
          return A.type === f.PERCENTAGE_TOKEN || PA(A);
        },
        XA = function (A) {
          return A.length > 1 ? [A[0], A[1]] : [A[0]];
        },
        zA = { type: f.NUMBER_TOKEN, number: 0, flags: 4 },
        kA = { type: f.PERCENTAGE_TOKEN, number: 50, flags: 4 },
        GA = { type: f.PERCENTAGE_TOKEN, number: 100, flags: 4 },
        JA = function (A, e, t) {
          var r = A[0],
            n = A[1];
          return [YA(r, e), YA(void 0 !== n ? n : r, t)];
        },
        YA = function (A, e) {
          if (A.type === f.PERCENTAGE_TOKEN) return (A.number / 100) * e;
          if (bA(A))
            switch (A.unit) {
              case 'rem':
              case 'em':
                return 16 * A.number;
              case 'px':
              default:
                return A.number;
            }
          return A.number;
        },
        WA = function (A) {
          if (A.type === f.DIMENSION_TOKEN)
            switch (A.unit) {
              case 'deg':
                return (Math.PI * A.number) / 180;
              case 'grad':
                return (Math.PI / 200) * A.number;
              case 'rad':
                return A.number;
              case 'turn':
                return 2 * Math.PI * A.number;
            }
          throw new Error('Unsupported angle type');
        },
        jA = function (A) {
          return (
            A.type === f.DIMENSION_TOKEN &&
            ('deg' === A.unit || 'grad' === A.unit || 'rad' === A.unit || 'turn' === A.unit)
          );
        },
        qA = function (A) {
          switch (
            A.filter(KA)
              .map(function (A) {
                return A.value;
              })
              .join(' ')
          ) {
            case 'to bottom right':
            case 'to right bottom':
            case 'left top':
            case 'top left':
              return [zA, zA];
            case 'to top':
            case 'bottom':
              return ZA(0);
            case 'to bottom left':
            case 'to left bottom':
            case 'right top':
            case 'top right':
              return [zA, GA];
            case 'to right':
            case 'left':
              return ZA(90);
            case 'to top left':
            case 'to left top':
            case 'right bottom':
            case 'bottom right':
              return [GA, GA];
            case 'to bottom':
            case 'top':
              return ZA(180);
            case 'to top right':
            case 'to right top':
            case 'left bottom':
            case 'bottom left':
              return [GA, zA];
            case 'to left':
            case 'right':
              return ZA(270);
          }
          return 0;
        },
        ZA = function (A) {
          return (Math.PI * A) / 180;
        },
        $A = function (A) {
          if (A.type === f.FUNCTION) {
            var e = ce[A.name];
            if (void 0 === e)
              throw new Error('Attempting to parse an unsupported color function "' + A.name + '"');
            return e(A.values);
          }
          if (A.type === f.HASH_TOKEN) {
            if (3 === A.value.length) {
              var t = A.value.substring(0, 1),
                r = A.value.substring(1, 2),
                n = A.value.substring(2, 3);
              return te(parseInt(t + t, 16), parseInt(r + r, 16), parseInt(n + n, 16), 1);
            }
            if (4 === A.value.length) {
              ((t = A.value.substring(0, 1)),
                (r = A.value.substring(1, 2)),
                (n = A.value.substring(2, 3)));
              var o = A.value.substring(3, 4);
              return te(
                parseInt(t + t, 16),
                parseInt(r + r, 16),
                parseInt(n + n, 16),
                parseInt(o + o, 16) / 255
              );
            }
            if (6 === A.value.length) {
              ((t = A.value.substring(0, 2)),
                (r = A.value.substring(2, 4)),
                (n = A.value.substring(4, 6)));
              return te(parseInt(t, 16), parseInt(r, 16), parseInt(n, 16), 1);
            }
            if (8 === A.value.length) {
              ((t = A.value.substring(0, 2)),
                (r = A.value.substring(2, 4)),
                (n = A.value.substring(4, 6)),
                (o = A.value.substring(6, 8)));
              return te(parseInt(t, 16), parseInt(r, 16), parseInt(n, 16), parseInt(o, 16) / 255);
            }
          }
          if (A.type === f.IDENT_TOKEN) {
            var i = ue[A.value.toUpperCase()];
            if (void 0 !== i) return i;
          }
          return ue.TRANSPARENT;
        },
        Ae = function (A) {
          return 0 == (255 & A);
        },
        ee = function (A) {
          var e = 255 & A,
            t = 255 & (A >> 8),
            r = 255 & (A >> 16),
            n = 255 & (A >> 24);
          return e < 255
            ? 'rgba(' + n + ',' + r + ',' + t + ',' + e / 255 + ')'
            : 'rgb(' + n + ',' + r + ',' + t + ')';
        },
        te = function (A, e, t, r) {
          return ((A << 24) | (e << 16) | (t << 8) | (Math.round(255 * r) << 0)) >>> 0;
        },
        re = function (A, e) {
          if (A.type === f.NUMBER_TOKEN) return A.number;
          if (A.type === f.PERCENTAGE_TOKEN) {
            var t = 3 === e ? 1 : 255;
            return 3 === e ? (A.number / 100) * t : Math.round((A.number / 100) * t);
          }
          return 0;
        },
        ne = function (A) {
          var e = A.filter(MA);
          if (3 === e.length) {
            var t = e.map(re),
              r = t[0],
              n = t[1],
              o = t[2];
            return te(r, n, o, 1);
          }
          if (4 === e.length) {
            var i = e.map(re),
              a = ((r = i[0]), (n = i[1]), (o = i[2]), i[3]);
            return te(r, n, o, a);
          }
          return 0;
        };
      function oe(A, e, t) {
        return (
          t < 0 && (t += 1),
          t >= 1 && (t -= 1),
          t < 1 / 6
            ? (e - A) * t * 6 + A
            : t < 0.5
              ? e
              : t < 2 / 3
                ? 6 * (e - A) * (2 / 3 - t) + A
                : A
        );
      }
      var ie,
        ae,
        se = function (A) {
          var e = A.filter(MA),
            t = e[0],
            r = e[1],
            n = e[2],
            o = e[3],
            i = (t.type === f.NUMBER_TOKEN ? ZA(t.number) : WA(t)) / (2 * Math.PI),
            a = VA(r) ? r.number / 100 : 0,
            s = VA(n) ? n.number / 100 : 0,
            c = void 0 !== o && VA(o) ? YA(o, 1) : 1;
          if (0 === a) return te(255 * s, 255 * s, 255 * s, 1);
          var u = s <= 0.5 ? s * (a + 1) : s + a - s * a,
            B = 2 * s - u,
            l = oe(B, u, i + 1 / 3),
            h = oe(B, u, i),
            g = oe(B, u, i - 1 / 3);
          return te(255 * l, 255 * h, 255 * g, c);
        },
        ce = { hsl: se, hsla: se, rgb: ne, rgba: ne },
        ue = {
          ALICEBLUE: 4042850303,
          ANTIQUEWHITE: 4209760255,
          AQUA: 16777215,
          AQUAMARINE: 2147472639,
          AZURE: 4043309055,
          BEIGE: 4126530815,
          BISQUE: 4293182719,
          BLACK: 255,
          BLANCHEDALMOND: 4293643775,
          BLUE: 65535,
          BLUEVIOLET: 2318131967,
          BROWN: 2771004159,
          BURLYWOOD: 3736635391,
          CADETBLUE: 1604231423,
          CHARTREUSE: 2147418367,
          CHOCOLATE: 3530104575,
          CORAL: 4286533887,
          CORNFLOWERBLUE: 1687547391,
          CORNSILK: 4294499583,
          CRIMSON: 3692313855,
          CYAN: 16777215,
          DARKBLUE: 35839,
          DARKCYAN: 9145343,
          DARKGOLDENROD: 3095837695,
          DARKGRAY: 2846468607,
          DARKGREEN: 6553855,
          DARKGREY: 2846468607,
          DARKKHAKI: 3182914559,
          DARKMAGENTA: 2332068863,
          DARKOLIVEGREEN: 1433087999,
          DARKORANGE: 4287365375,
          DARKORCHID: 2570243327,
          DARKRED: 2332033279,
          DARKSALMON: 3918953215,
          DARKSEAGREEN: 2411499519,
          DARKSLATEBLUE: 1211993087,
          DARKSLATEGRAY: 793726975,
          DARKSLATEGREY: 793726975,
          DARKTURQUOISE: 13554175,
          DARKVIOLET: 2483082239,
          DEEPPINK: 4279538687,
          DEEPSKYBLUE: 12582911,
          DIMGRAY: 1768516095,
          DIMGREY: 1768516095,
          DODGERBLUE: 512819199,
          FIREBRICK: 2988581631,
          FLORALWHITE: 4294635775,
          FORESTGREEN: 579543807,
          FUCHSIA: 4278255615,
          GAINSBORO: 3705462015,
          GHOSTWHITE: 4177068031,
          GOLD: 4292280575,
          GOLDENROD: 3668254975,
          GRAY: 2155905279,
          GREEN: 8388863,
          GREENYELLOW: 2919182335,
          GREY: 2155905279,
          HONEYDEW: 4043305215,
          HOTPINK: 4285117695,
          INDIANRED: 3445382399,
          INDIGO: 1258324735,
          IVORY: 4294963455,
          KHAKI: 4041641215,
          LAVENDER: 3873897215,
          LAVENDERBLUSH: 4293981695,
          LAWNGREEN: 2096890111,
          LEMONCHIFFON: 4294626815,
          LIGHTBLUE: 2916673279,
          LIGHTCORAL: 4034953471,
          LIGHTCYAN: 3774873599,
          LIGHTGOLDENRODYELLOW: 4210742015,
          LIGHTGRAY: 3553874943,
          LIGHTGREEN: 2431553791,
          LIGHTGREY: 3553874943,
          LIGHTPINK: 4290167295,
          LIGHTSALMON: 4288707327,
          LIGHTSEAGREEN: 548580095,
          LIGHTSKYBLUE: 2278488831,
          LIGHTSLATEGRAY: 2005441023,
          LIGHTSLATEGREY: 2005441023,
          LIGHTSTEELBLUE: 2965692159,
          LIGHTYELLOW: 4294959359,
          LIME: 16711935,
          LIMEGREEN: 852308735,
          LINEN: 4210091775,
          MAGENTA: 4278255615,
          MAROON: 2147483903,
          MEDIUMAQUAMARINE: 1724754687,
          MEDIUMBLUE: 52735,
          MEDIUMORCHID: 3126187007,
          MEDIUMPURPLE: 2473647103,
          MEDIUMSEAGREEN: 1018393087,
          MEDIUMSLATEBLUE: 2070474495,
          MEDIUMSPRINGGREEN: 16423679,
          MEDIUMTURQUOISE: 1221709055,
          MEDIUMVIOLETRED: 3340076543,
          MIDNIGHTBLUE: 421097727,
          MINTCREAM: 4127193855,
          MISTYROSE: 4293190143,
          MOCCASIN: 4293178879,
          NAVAJOWHITE: 4292783615,
          NAVY: 33023,
          OLDLACE: 4260751103,
          OLIVE: 2155872511,
          OLIVEDRAB: 1804477439,
          ORANGE: 4289003775,
          ORANGERED: 4282712319,
          ORCHID: 3664828159,
          PALEGOLDENROD: 4008225535,
          PALEGREEN: 2566625535,
          PALETURQUOISE: 2951671551,
          PALEVIOLETRED: 3681588223,
          PAPAYAWHIP: 4293907967,
          PEACHPUFF: 4292524543,
          PERU: 3448061951,
          PINK: 4290825215,
          PLUM: 3718307327,
          POWDERBLUE: 2967529215,
          PURPLE: 2147516671,
          REBECCAPURPLE: 1714657791,
          RED: 4278190335,
          ROSYBROWN: 3163525119,
          ROYALBLUE: 1097458175,
          SADDLEBROWN: 2336560127,
          SALMON: 4202722047,
          SANDYBROWN: 4104413439,
          SEAGREEN: 780883967,
          SEASHELL: 4294307583,
          SIENNA: 2689740287,
          SILVER: 3233857791,
          SKYBLUE: 2278484991,
          SLATEBLUE: 1784335871,
          SLATEGRAY: 1887473919,
          SLATEGREY: 1887473919,
          SNOW: 4294638335,
          SPRINGGREEN: 16744447,
          STEELBLUE: 1182971135,
          TAN: 3535047935,
          TEAL: 8421631,
          THISTLE: 3636451583,
          TOMATO: 4284696575,
          TRANSPARENT: 0,
          TURQUOISE: 1088475391,
          VIOLET: 4001558271,
          WHEAT: 4125012991,
          WHITE: 4294967295,
          WHITESMOKE: 4126537215,
          YELLOW: 4294902015,
          YELLOWGREEN: 2597139199,
        };
      (!(function (A) {
        ((A[(A.VALUE = 0)] = 'VALUE'),
          (A[(A.LIST = 1)] = 'LIST'),
          (A[(A.IDENT_VALUE = 2)] = 'IDENT_VALUE'),
          (A[(A.TYPE_VALUE = 3)] = 'TYPE_VALUE'),
          (A[(A.TOKEN_VALUE = 4)] = 'TOKEN_VALUE'));
      })(ie || (ie = {})),
        (function (A) {
          ((A[(A.BORDER_BOX = 0)] = 'BORDER_BOX'),
            (A[(A.PADDING_BOX = 1)] = 'PADDING_BOX'),
            (A[(A.CONTENT_BOX = 2)] = 'CONTENT_BOX'));
        })(ae || (ae = {})));
      var Be,
        le = {
          name: 'background-clip',
          initialValue: 'border-box',
          prefix: !1,
          type: ie.LIST,
          parse: function (A) {
            return A.map(function (A) {
              if (KA(A))
                switch (A.value) {
                  case 'padding-box':
                    return ae.PADDING_BOX;
                  case 'content-box':
                    return ae.CONTENT_BOX;
                }
              return ae.BORDER_BOX;
            });
          },
        },
        fe = {
          name: 'background-color',
          initialValue: 'transparent',
          prefix: !1,
          type: ie.TYPE_VALUE,
          format: 'color',
        },
        he = function (A) {
          var e = $A(A[0]),
            t = A[1];
          return t && VA(t) ? { color: e, stop: t } : { color: e, stop: null };
        },
        ge = function (A, e) {
          var t = A[0],
            r = A[A.length - 1];
          (null === t.stop && (t.stop = zA), null === r.stop && (r.stop = GA));
          for (var n = [], o = 0, i = 0; i < A.length; i++) {
            var a = A[i].stop;
            if (null !== a) {
              var s = YA(a, e);
              (s > o ? n.push(s) : n.push(o), (o = s));
            } else n.push(null);
          }
          var c = null;
          for (i = 0; i < n.length; i++) {
            var u = n[i];
            if (null === u) null === c && (c = i);
            else if (null !== c) {
              for (var B = i - c, l = (u - n[c - 1]) / (B + 1), f = 1; f <= B; f++)
                n[c + f - 1] = l * f;
              c = null;
            }
          }
          return A.map(function (A, t) {
            return { color: A.color, stop: Math.max(Math.min(1, n[t] / e), 0) };
          });
        },
        we = function (A, e, t) {
          var r =
              'number' == typeof A
                ? A
                : (function (A, e, t) {
                    var r = e / 2,
                      n = t / 2,
                      o = YA(A[0], e) - r,
                      i = n - YA(A[1], t);
                    return (Math.atan2(i, o) + 2 * Math.PI) % (2 * Math.PI);
                  })(A, e, t),
            n = Math.abs(e * Math.sin(r)) + Math.abs(t * Math.cos(r)),
            o = e / 2,
            i = t / 2,
            a = n / 2,
            s = Math.sin(r - Math.PI / 2) * a,
            c = Math.cos(r - Math.PI / 2) * a;
          return [n, o - c, o + c, i - s, i + s];
        },
        de = function (A, e) {
          return Math.sqrt(A * A + e * e);
        },
        Ee = function (A, e, t, r, n) {
          return [
            [0, 0],
            [0, e],
            [A, 0],
            [A, e],
          ].reduce(
            function (A, e) {
              var o = e[0],
                i = e[1],
                a = de(t - o, r - i);
              return (n ? a < A.optimumDistance : a > A.optimumDistance)
                ? { optimumCorner: e, optimumDistance: a }
                : A;
            },
            { optimumDistance: n ? 1 / 0 : -1 / 0, optimumCorner: null }
          ).optimumCorner;
        },
        pe = function (A) {
          var e = ZA(180),
            t = [];
          return (
            DA(A).forEach(function (A, r) {
              if (0 === r) {
                var n = A[0];
                if (
                  n.type === f.IDENT_TOKEN &&
                  -1 !== ['top', 'left', 'right', 'bottom'].indexOf(n.value)
                )
                  return void (e = qA(A));
                if (jA(n)) return void (e = (WA(n) + ZA(270)) % ZA(360));
              }
              var o = he(A);
              t.push(o);
            }),
            { angle: e, stops: t, type: Be.LINEAR_GRADIENT }
          );
        },
        Qe = function (A) {
          return 0 === A[0] && 255 === A[1] && 0 === A[2] && 255 === A[3];
        },
        Ue = function (A, e, t, r, n) {
          var o = 'http://www.w3.org/2000/svg',
            i = document.createElementNS(o, 'svg'),
            a = document.createElementNS(o, 'foreignObject');
          return (
            i.setAttributeNS(null, 'width', A.toString()),
            i.setAttributeNS(null, 'height', e.toString()),
            a.setAttributeNS(null, 'width', '100%'),
            a.setAttributeNS(null, 'height', '100%'),
            a.setAttributeNS(null, 'x', t.toString()),
            a.setAttributeNS(null, 'y', r.toString()),
            a.setAttributeNS(null, 'externalResourcesRequired', 'true'),
            i.appendChild(a),
            a.appendChild(n),
            i
          );
        },
        Ce = function (A) {
          return new Promise(function (e, t) {
            var r = new Image();
            ((r.onload = function () {
              return e(r);
            }),
              (r.onerror = t),
              (r.src =
                'data:image/svg+xml;charset=utf-8,' +
                encodeURIComponent(new XMLSerializer().serializeToString(A))));
          });
        },
        Fe = {
          get SUPPORT_RANGE_BOUNDS() {
            var A = (function (A) {
              if (A.createRange) {
                var e = A.createRange();
                if (e.getBoundingClientRect) {
                  var t = A.createElement('boundtest');
                  ((t.style.height = '123px'),
                    (t.style.display = 'block'),
                    A.body.appendChild(t),
                    e.selectNode(t));
                  var r = e.getBoundingClientRect(),
                    n = Math.round(r.height);
                  if ((A.body.removeChild(t), 123 === n)) return !0;
                }
              }
              return !1;
            })(document);
            return (Object.defineProperty(Fe, 'SUPPORT_RANGE_BOUNDS', { value: A }), A);
          },
          get SUPPORT_SVG_DRAWING() {
            var A = (function (A) {
              var e = new Image(),
                t = A.createElement('canvas'),
                r = t.getContext('2d');
              if (!r) return !1;
              e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
              try {
                (r.drawImage(e, 0, 0), t.toDataURL());
              } catch (A) {
                return !1;
              }
              return !0;
            })(document);
            return (Object.defineProperty(Fe, 'SUPPORT_SVG_DRAWING', { value: A }), A);
          },
          get SUPPORT_FOREIGNOBJECT_DRAWING() {
            var A =
              'function' == typeof Array.from && 'function' == typeof window.fetch
                ? (function (A) {
                    var e = A.createElement('canvas');
                    ((e.width = 100), (e.height = 100));
                    var t = e.getContext('2d');
                    if (!t) return Promise.reject(!1);
                    ((t.fillStyle = 'rgb(0, 255, 0)'), t.fillRect(0, 0, 100, 100));
                    var r = new Image(),
                      n = e.toDataURL();
                    r.src = n;
                    var o = Ue(100, 100, 0, 0, r);
                    return (
                      (t.fillStyle = 'red'),
                      t.fillRect(0, 0, 100, 100),
                      Ce(o)
                        .then(function (e) {
                          t.drawImage(e, 0, 0);
                          var r = t.getImageData(0, 0, 100, 100).data;
                          ((t.fillStyle = 'red'), t.fillRect(0, 0, 100, 100));
                          var o = A.createElement('div');
                          return (
                            (o.style.backgroundImage = 'url(' + n + ')'),
                            (o.style.height = '100px'),
                            Qe(r) ? Ce(Ue(100, 100, 0, 0, o)) : Promise.reject(!1)
                          );
                        })
                        .then(function (A) {
                          return (t.drawImage(A, 0, 0), Qe(t.getImageData(0, 0, 100, 100).data));
                        })
                        .catch(function () {
                          return !1;
                        })
                    );
                  })(document)
                : Promise.resolve(!1);
            return (Object.defineProperty(Fe, 'SUPPORT_FOREIGNOBJECT_DRAWING', { value: A }), A);
          },
          get SUPPORT_CORS_IMAGES() {
            var A = void 0 !== new Image().crossOrigin;
            return (Object.defineProperty(Fe, 'SUPPORT_CORS_IMAGES', { value: A }), A);
          },
          get SUPPORT_RESPONSE_TYPE() {
            var A = 'string' == typeof new XMLHttpRequest().responseType;
            return (Object.defineProperty(Fe, 'SUPPORT_RESPONSE_TYPE', { value: A }), A);
          },
          get SUPPORT_CORS_XHR() {
            var A = 'withCredentials' in new XMLHttpRequest();
            return (Object.defineProperty(Fe, 'SUPPORT_CORS_XHR', { value: A }), A);
          },
        },
        me = (function () {
          function A(A) {
            var e = A.id,
              t = A.enabled;
            ((this.id = e), (this.enabled = t), (this.start = Date.now()));
          }
          return (
            (A.prototype.debug = function () {
              for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
              this.enabled &&
                ('undefined' != typeof window &&
                window.console &&
                'function' == typeof console.debug
                  ? console.debug.apply(console, [this.id, this.getTime() + 'ms'].concat(A))
                  : this.info.apply(this, A));
            }),
            (A.prototype.getTime = function () {
              return Date.now() - this.start;
            }),
            (A.create = function (e) {
              A.instances[e.id] = new A(e);
            }),
            (A.destroy = function (e) {
              delete A.instances[e];
            }),
            (A.getInstance = function (e) {
              var t = A.instances[e];
              if (void 0 === t) throw new Error('No logger instance found with id ' + e);
              return t;
            }),
            (A.prototype.info = function () {
              for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
              this.enabled &&
                'undefined' != typeof window &&
                window.console &&
                'function' == typeof console.info &&
                console.info.apply(console, [this.id, this.getTime() + 'ms'].concat(A));
            }),
            (A.prototype.error = function () {
              for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
              this.enabled &&
                ('undefined' != typeof window &&
                window.console &&
                'function' == typeof console.error
                  ? console.error.apply(console, [this.id, this.getTime() + 'ms'].concat(A))
                  : this.info.apply(this, A));
            }),
            (A.instances = {}),
            A
          );
        })(),
        _e = (function () {
          function A() {}
          return (
            (A.create = function (e, t) {
              return (A._caches[e] = new He(e, t));
            }),
            (A.destroy = function (e) {
              delete A._caches[e];
            }),
            (A.open = function (e) {
              var t = A._caches[e];
              if (void 0 !== t) return t;
              throw new Error('Cache with key "' + e + '" not found');
            }),
            (A.getOrigin = function (e) {
              var t = A._link;
              return t
                ? ((t.href = e), (t.href = t.href), t.protocol + t.hostname + t.port)
                : 'about:blank';
            }),
            (A.isSameOrigin = function (e) {
              return A.getOrigin(e) === A._origin;
            }),
            (A.setContext = function (e) {
              ((A._link = e.document.createElement('a')),
                (A._origin = A.getOrigin(e.location.href)));
            }),
            (A.getInstance = function () {
              var e = A._current;
              if (null === e) throw new Error('No cache instance attached');
              return e;
            }),
            (A.attachInstance = function (e) {
              A._current = e;
            }),
            (A.detachInstance = function () {
              A._current = null;
            }),
            (A._caches = {}),
            (A._origin = 'about:blank'),
            (A._current = null),
            A
          );
        })(),
        He = (function () {
          function A(A, e) {
            ((this.id = A), (this._options = e), (this._cache = {}));
          }
          return (
            (A.prototype.addImage = function (A) {
              var e = Promise.resolve();
              return this.has(A)
                ? e
                : Re(A) || Ne(A)
                  ? ((this._cache[A] = this.loadImage(A)), e)
                  : e;
            }),
            (A.prototype.match = function (A) {
              return this._cache[A];
            }),
            (A.prototype.loadImage = function (A) {
              return r(this, void 0, void 0, function () {
                var e,
                  t,
                  r,
                  o,
                  i = this;
                return n(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        (e = _e.isSameOrigin(A)),
                        (t =
                          !Ie(A) && !0 === this._options.useCORS && Fe.SUPPORT_CORS_IMAGES && !e),
                        (r =
                          !Ie(A) &&
                          !e &&
                          'string' == typeof this._options.proxy &&
                          Fe.SUPPORT_CORS_XHR &&
                          !t),
                        e || !1 !== this._options.allowTaint || Ie(A) || r || t
                          ? ((o = A), r ? [4, this.proxy(o)] : [3, 2])
                          : [2]
                      );
                    case 1:
                      ((o = n.sent()), (n.label = 2));
                    case 2:
                      return (
                        me.getInstance(this.id).debug('Added image ' + A.substring(0, 256)),
                        [
                          4,
                          new Promise(function (A, e) {
                            var r = new Image();
                            ((r.onload = function () {
                              return A(r);
                            }),
                              (r.onerror = e),
                              (be(o) || t) && (r.crossOrigin = 'anonymous'),
                              (r.src = o),
                              !0 === r.complete &&
                                setTimeout(function () {
                                  return A(r);
                                }, 500),
                              i._options.imageTimeout > 0 &&
                                setTimeout(function () {
                                  return e(
                                    'Timed out (' + i._options.imageTimeout + 'ms) loading image'
                                  );
                                }, i._options.imageTimeout));
                          }),
                        ]
                      );
                    case 3:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (A.prototype.has = function (A) {
              return void 0 !== this._cache[A];
            }),
            (A.prototype.keys = function () {
              return Promise.resolve(Object.keys(this._cache));
            }),
            (A.prototype.proxy = function (A) {
              var e = this,
                t = this._options.proxy;
              if (!t) throw new Error('No proxy defined');
              var r = A.substring(0, 256);
              return new Promise(function (n, o) {
                var i = Fe.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text',
                  a = new XMLHttpRequest();
                if (
                  ((a.onload = function () {
                    if (200 === a.status)
                      if ('text' === i) n(a.response);
                      else {
                        var A = new FileReader();
                        (A.addEventListener(
                          'load',
                          function () {
                            return n(A.result);
                          },
                          !1
                        ),
                          A.addEventListener(
                            'error',
                            function (A) {
                              return o(A);
                            },
                            !1
                          ),
                          A.readAsDataURL(a.response));
                      }
                    else o('Failed to proxy resource ' + r + ' with status code ' + a.status);
                  }),
                  (a.onerror = o),
                  a.open('GET', t + '?url=' + encodeURIComponent(A) + '&responseType=' + i),
                  'text' !== i && a instanceof XMLHttpRequest && (a.responseType = i),
                  e._options.imageTimeout)
                ) {
                  var s = e._options.imageTimeout;
                  ((a.timeout = s),
                    (a.ontimeout = function () {
                      return o('Timed out (' + s + 'ms) proxying ' + r);
                    }));
                }
                a.send();
              });
            }),
            A
          );
        })(),
        Te = /^data:image\/svg\+xml/i,
        ve = /^data:image\/.*;base64,/i,
        ye = /^data:image\/.*/i,
        Ne = function (A) {
          return Fe.SUPPORT_SVG_DRAWING || !Ke(A);
        },
        Ie = function (A) {
          return ye.test(A);
        },
        be = function (A) {
          return ve.test(A);
        },
        Re = function (A) {
          return 'blob' === A.substr(0, 4);
        },
        Ke = function (A) {
          return 'svg' === A.substr(-3).toLowerCase() || Te.test(A);
        },
        Se = function (A) {
          var e = Le.CIRCLE,
            t = Oe.FARTHEST_CORNER,
            r = [],
            n = [];
          return (
            DA(A).forEach(function (A, o) {
              var i = !0;
              if (
                (0 === o
                  ? (i = A.reduce(function (A, e) {
                      if (KA(e))
                        switch (e.value) {
                          case 'center':
                            return (n.push(kA), !1);
                          case 'top':
                          case 'left':
                            return (n.push(zA), !1);
                          case 'right':
                          case 'bottom':
                            return (n.push(GA), !1);
                        }
                      else if (VA(e) || PA(e)) return (n.push(e), !1);
                      return A;
                    }, i))
                  : 1 === o &&
                    (i = A.reduce(function (A, r) {
                      if (KA(r))
                        switch (r.value) {
                          case 'circle':
                            return ((e = Le.CIRCLE), !1);
                          case 'ellipse':
                            return ((e = Le.ELLIPSE), !1);
                          case 'contain':
                          case 'closest-side':
                            return ((t = Oe.CLOSEST_SIDE), !1);
                          case 'farthest-side':
                            return ((t = Oe.FARTHEST_SIDE), !1);
                          case 'closest-corner':
                            return ((t = Oe.CLOSEST_CORNER), !1);
                          case 'cover':
                          case 'farthest-corner':
                            return ((t = Oe.FARTHEST_CORNER), !1);
                        }
                      else if (PA(r) || VA(r)) return (Array.isArray(t) || (t = []), t.push(r), !1);
                      return A;
                    }, i)),
                i)
              ) {
                var a = he(A);
                r.push(a);
              }
            }),
            { size: t, shape: e, stops: r, position: n, type: Be.RADIAL_GRADIENT }
          );
        };
      !(function (A) {
        ((A[(A.URL = 0)] = 'URL'),
          (A[(A.LINEAR_GRADIENT = 1)] = 'LINEAR_GRADIENT'),
          (A[(A.RADIAL_GRADIENT = 2)] = 'RADIAL_GRADIENT'));
      })(Be || (Be = {}));
      var Le, Oe;
      (!(function (A) {
        ((A[(A.CIRCLE = 0)] = 'CIRCLE'), (A[(A.ELLIPSE = 1)] = 'ELLIPSE'));
      })(Le || (Le = {})),
        (function (A) {
          ((A[(A.CLOSEST_SIDE = 0)] = 'CLOSEST_SIDE'),
            (A[(A.FARTHEST_SIDE = 1)] = 'FARTHEST_SIDE'),
            (A[(A.CLOSEST_CORNER = 2)] = 'CLOSEST_CORNER'),
            (A[(A.FARTHEST_CORNER = 3)] = 'FARTHEST_CORNER'));
        })(Oe || (Oe = {})));
      var Me = function (A) {
        if (A.type === f.URL_TOKEN) {
          var e = { url: A.value, type: Be.URL };
          return (_e.getInstance().addImage(A.value), e);
        }
        if (A.type === f.FUNCTION) {
          var t = xe[A.name];
          if (void 0 === t)
            throw new Error('Attempting to parse an unsupported image function "' + A.name + '"');
          return t(A.values);
        }
        throw new Error('Unsupported image type');
      };
      var De,
        xe = {
          'linear-gradient': function (A) {
            var e = ZA(180),
              t = [];
            return (
              DA(A).forEach(function (A, r) {
                if (0 === r) {
                  var n = A[0];
                  if (n.type === f.IDENT_TOKEN && 'to' === n.value) return void (e = qA(A));
                  if (jA(n)) return void (e = WA(n));
                }
                var o = he(A);
                t.push(o);
              }),
              { angle: e, stops: t, type: Be.LINEAR_GRADIENT }
            );
          },
          '-moz-linear-gradient': pe,
          '-ms-linear-gradient': pe,
          '-o-linear-gradient': pe,
          '-webkit-linear-gradient': pe,
          'radial-gradient': function (A) {
            var e = Le.CIRCLE,
              t = Oe.FARTHEST_CORNER,
              r = [],
              n = [];
            return (
              DA(A).forEach(function (A, o) {
                var i = !0;
                if (0 === o) {
                  var a = !1;
                  i = A.reduce(function (A, r) {
                    if (a)
                      if (KA(r))
                        switch (r.value) {
                          case 'center':
                            return (n.push(kA), A);
                          case 'top':
                          case 'left':
                            return (n.push(zA), A);
                          case 'right':
                          case 'bottom':
                            return (n.push(GA), A);
                        }
                      else (VA(r) || PA(r)) && n.push(r);
                    else if (KA(r))
                      switch (r.value) {
                        case 'circle':
                          return ((e = Le.CIRCLE), !1);
                        case 'ellipse':
                          return ((e = Le.ELLIPSE), !1);
                        case 'at':
                          return ((a = !0), !1);
                        case 'closest-side':
                          return ((t = Oe.CLOSEST_SIDE), !1);
                        case 'cover':
                        case 'farthest-side':
                          return ((t = Oe.FARTHEST_SIDE), !1);
                        case 'contain':
                        case 'closest-corner':
                          return ((t = Oe.CLOSEST_CORNER), !1);
                        case 'farthest-corner':
                          return ((t = Oe.FARTHEST_CORNER), !1);
                      }
                    else if (PA(r) || VA(r)) return (Array.isArray(t) || (t = []), t.push(r), !1);
                    return A;
                  }, i);
                }
                if (i) {
                  var s = he(A);
                  r.push(s);
                }
              }),
              { size: t, shape: e, stops: r, position: n, type: Be.RADIAL_GRADIENT }
            );
          },
          '-moz-radial-gradient': Se,
          '-ms-radial-gradient': Se,
          '-o-radial-gradient': Se,
          '-webkit-radial-gradient': Se,
          '-webkit-gradient': function (A) {
            var e = ZA(180),
              t = [],
              r = Be.LINEAR_GRADIENT,
              n = Le.CIRCLE,
              o = Oe.FARTHEST_CORNER;
            return (
              DA(A).forEach(function (A, e) {
                var n = A[0];
                if (0 === e) {
                  if (KA(n) && 'linear' === n.value) return void (r = Be.LINEAR_GRADIENT);
                  if (KA(n) && 'radial' === n.value) return void (r = Be.RADIAL_GRADIENT);
                }
                if (n.type === f.FUNCTION)
                  if ('from' === n.name) {
                    var o = $A(n.values[0]);
                    t.push({ stop: zA, color: o });
                  } else if ('to' === n.name)
                    ((o = $A(n.values[0])), t.push({ stop: GA, color: o }));
                  else if ('color-stop' === n.name) {
                    var i = n.values.filter(MA);
                    if (2 === i.length) {
                      o = $A(i[1]);
                      var a = i[0];
                      RA(a) &&
                        t.push({
                          stop: {
                            type: f.PERCENTAGE_TOKEN,
                            number: 100 * a.number,
                            flags: a.flags,
                          },
                          color: o,
                        });
                    }
                  }
              }),
              r === Be.LINEAR_GRADIENT
                ? { angle: (e + ZA(180)) % ZA(360), stops: t, type: r }
                : { size: o, shape: n, stops: t, position: [], type: r }
            );
          },
        },
        Pe = {
          name: 'background-image',
          initialValue: 'none',
          type: ie.LIST,
          prefix: !1,
          parse: function (A) {
            if (0 === A.length) return [];
            var e = A[0];
            return e.type === f.IDENT_TOKEN && 'none' === e.value
              ? []
              : A.filter(function (A) {
                  return (
                    MA(A) &&
                    (function (A) {
                      return A.type !== f.FUNCTION || xe[A.name];
                    })(A)
                  );
                }).map(Me);
          },
        },
        Ve = {
          name: 'background-origin',
          initialValue: 'border-box',
          prefix: !1,
          type: ie.LIST,
          parse: function (A) {
            return A.map(function (A) {
              if (KA(A))
                switch (A.value) {
                  case 'padding-box':
                    return 1;
                  case 'content-box':
                    return 2;
                }
              return 0;
            });
          },
        },
        Xe = {
          name: 'background-position',
          initialValue: '0% 0%',
          type: ie.LIST,
          prefix: !1,
          parse: function (A) {
            return DA(A)
              .map(function (A) {
                return A.filter(VA);
              })
              .map(XA);
          },
        };
      !(function (A) {
        ((A[(A.REPEAT = 0)] = 'REPEAT'),
          (A[(A.NO_REPEAT = 1)] = 'NO_REPEAT'),
          (A[(A.REPEAT_X = 2)] = 'REPEAT_X'),
          (A[(A.REPEAT_Y = 3)] = 'REPEAT_Y'));
      })(De || (De = {}));
      var ze,
        ke = {
          name: 'background-repeat',
          initialValue: 'repeat',
          prefix: !1,
          type: ie.LIST,
          parse: function (A) {
            return DA(A)
              .map(function (A) {
                return A.filter(KA)
                  .map(function (A) {
                    return A.value;
                  })
                  .join(' ');
              })
              .map(Ge);
          },
        },
        Ge = function (A) {
          switch (A) {
            case 'no-repeat':
              return De.NO_REPEAT;
            case 'repeat-x':
            case 'repeat no-repeat':
              return De.REPEAT_X;
            case 'repeat-y':
            case 'no-repeat repeat':
              return De.REPEAT_Y;
            case 'repeat':
            default:
              return De.REPEAT;
          }
        };
      !(function (A) {
        ((A.AUTO = 'auto'), (A.CONTAIN = 'contain'), (A.COVER = 'cover'));
      })(ze || (ze = {}));
      var Je,
        Ye = {
          name: 'background-size',
          initialValue: '0',
          prefix: !1,
          type: ie.LIST,
          parse: function (A) {
            return DA(A).map(function (A) {
              return A.filter(We);
            });
          },
        },
        We = function (A) {
          return KA(A) || VA(A);
        },
        je = function (A) {
          return {
            name: 'border-' + A + '-color',
            initialValue: 'transparent',
            prefix: !1,
            type: ie.TYPE_VALUE,
            format: 'color',
          };
        },
        qe = je('top'),
        Ze = je('right'),
        $e = je('bottom'),
        At = je('left'),
        et = function (A) {
          return {
            name: 'border-radius-' + A,
            initialValue: '0 0',
            prefix: !1,
            type: ie.LIST,
            parse: function (A) {
              return XA(A.filter(VA));
            },
          };
        },
        tt = et('top-left'),
        rt = et('top-right'),
        nt = et('bottom-right'),
        ot = et('bottom-left');
      !(function (A) {
        ((A[(A.NONE = 0)] = 'NONE'), (A[(A.SOLID = 1)] = 'SOLID'));
      })(Je || (Je = {}));
      var it,
        at = function (A) {
          return {
            name: 'border-' + A + '-style',
            initialValue: 'solid',
            prefix: !1,
            type: ie.IDENT_VALUE,
            parse: function (A) {
              switch (A) {
                case 'none':
                  return Je.NONE;
              }
              return Je.SOLID;
            },
          };
        },
        st = at('top'),
        ct = at('right'),
        ut = at('bottom'),
        Bt = at('left'),
        lt = function (A) {
          return {
            name: 'border-' + A + '-width',
            initialValue: '0',
            type: ie.VALUE,
            prefix: !1,
            parse: function (A) {
              return bA(A) ? A.number : 0;
            },
          };
        },
        ft = lt('top'),
        ht = lt('right'),
        gt = lt('bottom'),
        wt = lt('left'),
        dt = {
          name: 'color',
          initialValue: 'transparent',
          prefix: !1,
          type: ie.TYPE_VALUE,
          format: 'color',
        },
        Et = {
          name: 'display',
          initialValue: 'inline-block',
          prefix: !1,
          type: ie.LIST,
          parse: function (A) {
            return A.filter(KA).reduce(function (A, e) {
              return A | pt(e.value);
            }, 0);
          },
        },
        pt = function (A) {
          switch (A) {
            case 'block':
              return 2;
            case 'inline':
              return 4;
            case 'run-in':
              return 8;
            case 'flow':
              return 16;
            case 'flow-root':
              return 32;
            case 'table':
              return 64;
            case 'flex':
            case '-webkit-flex':
              return 128;
            case 'grid':
            case '-ms-grid':
              return 256;
            case 'ruby':
              return 512;
            case 'subgrid':
              return 1024;
            case 'list-item':
              return 2048;
            case 'table-row-group':
              return 4096;
            case 'table-header-group':
              return 8192;
            case 'table-footer-group':
              return 16384;
            case 'table-row':
              return 32768;
            case 'table-cell':
              return 65536;
            case 'table-column-group':
              return 131072;
            case 'table-column':
              return 262144;
            case 'table-caption':
              return 524288;
            case 'ruby-base':
              return 1048576;
            case 'ruby-text':
              return 2097152;
            case 'ruby-base-container':
              return 4194304;
            case 'ruby-text-container':
              return 8388608;
            case 'contents':
              return 16777216;
            case 'inline-block':
              return 33554432;
            case 'inline-list-item':
              return 67108864;
            case 'inline-table':
              return 134217728;
            case 'inline-flex':
              return 268435456;
            case 'inline-grid':
              return 536870912;
          }
          return 0;
        };
      !(function (A) {
        ((A[(A.NONE = 0)] = 'NONE'),
          (A[(A.LEFT = 1)] = 'LEFT'),
          (A[(A.RIGHT = 2)] = 'RIGHT'),
          (A[(A.INLINE_START = 3)] = 'INLINE_START'),
          (A[(A.INLINE_END = 4)] = 'INLINE_END'));
      })(it || (it = {}));
      var Qt,
        Ut = {
          name: 'float',
          initialValue: 'none',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'left':
                return it.LEFT;
              case 'right':
                return it.RIGHT;
              case 'inline-start':
                return it.INLINE_START;
              case 'inline-end':
                return it.INLINE_END;
            }
            return it.NONE;
          },
        },
        Ct = {
          name: 'letter-spacing',
          initialValue: '0',
          prefix: !1,
          type: ie.VALUE,
          parse: function (A) {
            return A.type === f.IDENT_TOKEN && 'normal' === A.value
              ? 0
              : A.type === f.NUMBER_TOKEN
                ? A.number
                : A.type === f.DIMENSION_TOKEN
                  ? A.number
                  : 0;
          },
        };
      !(function (A) {
        ((A.NORMAL = 'normal'), (A.STRICT = 'strict'));
      })(Qt || (Qt = {}));
      var Ft,
        mt = {
          name: 'line-break',
          initialValue: 'normal',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'strict':
                return Qt.STRICT;
              case 'normal':
              default:
                return Qt.NORMAL;
            }
          },
        },
        _t = { name: 'line-height', initialValue: 'normal', prefix: !1, type: ie.TOKEN_VALUE },
        Ht = {
          name: 'list-style-image',
          initialValue: 'none',
          type: ie.VALUE,
          prefix: !1,
          parse: function (A) {
            return A.type === f.IDENT_TOKEN && 'none' === A.value ? null : Me(A);
          },
        };
      !(function (A) {
        ((A[(A.INSIDE = 0)] = 'INSIDE'), (A[(A.OUTSIDE = 1)] = 'OUTSIDE'));
      })(Ft || (Ft = {}));
      var Tt,
        vt = {
          name: 'list-style-position',
          initialValue: 'outside',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'inside':
                return Ft.INSIDE;
              case 'outside':
              default:
                return Ft.OUTSIDE;
            }
          },
        };
      !(function (A) {
        ((A[(A.NONE = -1)] = 'NONE'),
          (A[(A.DISC = 0)] = 'DISC'),
          (A[(A.CIRCLE = 1)] = 'CIRCLE'),
          (A[(A.SQUARE = 2)] = 'SQUARE'),
          (A[(A.DECIMAL = 3)] = 'DECIMAL'),
          (A[(A.CJK_DECIMAL = 4)] = 'CJK_DECIMAL'),
          (A[(A.DECIMAL_LEADING_ZERO = 5)] = 'DECIMAL_LEADING_ZERO'),
          (A[(A.LOWER_ROMAN = 6)] = 'LOWER_ROMAN'),
          (A[(A.UPPER_ROMAN = 7)] = 'UPPER_ROMAN'),
          (A[(A.LOWER_GREEK = 8)] = 'LOWER_GREEK'),
          (A[(A.LOWER_ALPHA = 9)] = 'LOWER_ALPHA'),
          (A[(A.UPPER_ALPHA = 10)] = 'UPPER_ALPHA'),
          (A[(A.ARABIC_INDIC = 11)] = 'ARABIC_INDIC'),
          (A[(A.ARMENIAN = 12)] = 'ARMENIAN'),
          (A[(A.BENGALI = 13)] = 'BENGALI'),
          (A[(A.CAMBODIAN = 14)] = 'CAMBODIAN'),
          (A[(A.CJK_EARTHLY_BRANCH = 15)] = 'CJK_EARTHLY_BRANCH'),
          (A[(A.CJK_HEAVENLY_STEM = 16)] = 'CJK_HEAVENLY_STEM'),
          (A[(A.CJK_IDEOGRAPHIC = 17)] = 'CJK_IDEOGRAPHIC'),
          (A[(A.DEVANAGARI = 18)] = 'DEVANAGARI'),
          (A[(A.ETHIOPIC_NUMERIC = 19)] = 'ETHIOPIC_NUMERIC'),
          (A[(A.GEORGIAN = 20)] = 'GEORGIAN'),
          (A[(A.GUJARATI = 21)] = 'GUJARATI'),
          (A[(A.GURMUKHI = 22)] = 'GURMUKHI'),
          (A[(A.HEBREW = 22)] = 'HEBREW'),
          (A[(A.HIRAGANA = 23)] = 'HIRAGANA'),
          (A[(A.HIRAGANA_IROHA = 24)] = 'HIRAGANA_IROHA'),
          (A[(A.JAPANESE_FORMAL = 25)] = 'JAPANESE_FORMAL'),
          (A[(A.JAPANESE_INFORMAL = 26)] = 'JAPANESE_INFORMAL'),
          (A[(A.KANNADA = 27)] = 'KANNADA'),
          (A[(A.KATAKANA = 28)] = 'KATAKANA'),
          (A[(A.KATAKANA_IROHA = 29)] = 'KATAKANA_IROHA'),
          (A[(A.KHMER = 30)] = 'KHMER'),
          (A[(A.KOREAN_HANGUL_FORMAL = 31)] = 'KOREAN_HANGUL_FORMAL'),
          (A[(A.KOREAN_HANJA_FORMAL = 32)] = 'KOREAN_HANJA_FORMAL'),
          (A[(A.KOREAN_HANJA_INFORMAL = 33)] = 'KOREAN_HANJA_INFORMAL'),
          (A[(A.LAO = 34)] = 'LAO'),
          (A[(A.LOWER_ARMENIAN = 35)] = 'LOWER_ARMENIAN'),
          (A[(A.MALAYALAM = 36)] = 'MALAYALAM'),
          (A[(A.MONGOLIAN = 37)] = 'MONGOLIAN'),
          (A[(A.MYANMAR = 38)] = 'MYANMAR'),
          (A[(A.ORIYA = 39)] = 'ORIYA'),
          (A[(A.PERSIAN = 40)] = 'PERSIAN'),
          (A[(A.SIMP_CHINESE_FORMAL = 41)] = 'SIMP_CHINESE_FORMAL'),
          (A[(A.SIMP_CHINESE_INFORMAL = 42)] = 'SIMP_CHINESE_INFORMAL'),
          (A[(A.TAMIL = 43)] = 'TAMIL'),
          (A[(A.TELUGU = 44)] = 'TELUGU'),
          (A[(A.THAI = 45)] = 'THAI'),
          (A[(A.TIBETAN = 46)] = 'TIBETAN'),
          (A[(A.TRAD_CHINESE_FORMAL = 47)] = 'TRAD_CHINESE_FORMAL'),
          (A[(A.TRAD_CHINESE_INFORMAL = 48)] = 'TRAD_CHINESE_INFORMAL'),
          (A[(A.UPPER_ARMENIAN = 49)] = 'UPPER_ARMENIAN'),
          (A[(A.DISCLOSURE_OPEN = 50)] = 'DISCLOSURE_OPEN'),
          (A[(A.DISCLOSURE_CLOSED = 51)] = 'DISCLOSURE_CLOSED'));
      })(Tt || (Tt = {}));
      var yt,
        Nt = {
          name: 'list-style-type',
          initialValue: 'none',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'disc':
                return Tt.DISC;
              case 'circle':
                return Tt.CIRCLE;
              case 'square':
                return Tt.SQUARE;
              case 'decimal':
                return Tt.DECIMAL;
              case 'cjk-decimal':
                return Tt.CJK_DECIMAL;
              case 'decimal-leading-zero':
                return Tt.DECIMAL_LEADING_ZERO;
              case 'lower-roman':
                return Tt.LOWER_ROMAN;
              case 'upper-roman':
                return Tt.UPPER_ROMAN;
              case 'lower-greek':
                return Tt.LOWER_GREEK;
              case 'lower-alpha':
                return Tt.LOWER_ALPHA;
              case 'upper-alpha':
                return Tt.UPPER_ALPHA;
              case 'arabic-indic':
                return Tt.ARABIC_INDIC;
              case 'armenian':
                return Tt.ARMENIAN;
              case 'bengali':
                return Tt.BENGALI;
              case 'cambodian':
                return Tt.CAMBODIAN;
              case 'cjk-earthly-branch':
                return Tt.CJK_EARTHLY_BRANCH;
              case 'cjk-heavenly-stem':
                return Tt.CJK_HEAVENLY_STEM;
              case 'cjk-ideographic':
                return Tt.CJK_IDEOGRAPHIC;
              case 'devanagari':
                return Tt.DEVANAGARI;
              case 'ethiopic-numeric':
                return Tt.ETHIOPIC_NUMERIC;
              case 'georgian':
                return Tt.GEORGIAN;
              case 'gujarati':
                return Tt.GUJARATI;
              case 'gurmukhi':
                return Tt.GURMUKHI;
              case 'hebrew':
                return Tt.HEBREW;
              case 'hiragana':
                return Tt.HIRAGANA;
              case 'hiragana-iroha':
                return Tt.HIRAGANA_IROHA;
              case 'japanese-formal':
                return Tt.JAPANESE_FORMAL;
              case 'japanese-informal':
                return Tt.JAPANESE_INFORMAL;
              case 'kannada':
                return Tt.KANNADA;
              case 'katakana':
                return Tt.KATAKANA;
              case 'katakana-iroha':
                return Tt.KATAKANA_IROHA;
              case 'khmer':
                return Tt.KHMER;
              case 'korean-hangul-formal':
                return Tt.KOREAN_HANGUL_FORMAL;
              case 'korean-hanja-formal':
                return Tt.KOREAN_HANJA_FORMAL;
              case 'korean-hanja-informal':
                return Tt.KOREAN_HANJA_INFORMAL;
              case 'lao':
                return Tt.LAO;
              case 'lower-armenian':
                return Tt.LOWER_ARMENIAN;
              case 'malayalam':
                return Tt.MALAYALAM;
              case 'mongolian':
                return Tt.MONGOLIAN;
              case 'myanmar':
                return Tt.MYANMAR;
              case 'oriya':
                return Tt.ORIYA;
              case 'persian':
                return Tt.PERSIAN;
              case 'simp-chinese-formal':
                return Tt.SIMP_CHINESE_FORMAL;
              case 'simp-chinese-informal':
                return Tt.SIMP_CHINESE_INFORMAL;
              case 'tamil':
                return Tt.TAMIL;
              case 'telugu':
                return Tt.TELUGU;
              case 'thai':
                return Tt.THAI;
              case 'tibetan':
                return Tt.TIBETAN;
              case 'trad-chinese-formal':
                return Tt.TRAD_CHINESE_FORMAL;
              case 'trad-chinese-informal':
                return Tt.TRAD_CHINESE_INFORMAL;
              case 'upper-armenian':
                return Tt.UPPER_ARMENIAN;
              case 'disclosure-open':
                return Tt.DISCLOSURE_OPEN;
              case 'disclosure-closed':
                return Tt.DISCLOSURE_CLOSED;
              case 'none':
              default:
                return Tt.NONE;
            }
          },
        },
        It = function (A) {
          return { name: 'margin-' + A, initialValue: '0', prefix: !1, type: ie.TOKEN_VALUE };
        },
        bt = It('top'),
        Rt = It('right'),
        Kt = It('bottom'),
        St = It('left');
      !(function (A) {
        ((A[(A.VISIBLE = 0)] = 'VISIBLE'),
          (A[(A.HIDDEN = 1)] = 'HIDDEN'),
          (A[(A.SCROLL = 2)] = 'SCROLL'),
          (A[(A.AUTO = 3)] = 'AUTO'));
      })(yt || (yt = {}));
      var Lt,
        Ot = {
          name: 'overflow',
          initialValue: 'visible',
          prefix: !1,
          type: ie.LIST,
          parse: function (A) {
            return A.filter(KA).map(function (A) {
              switch (A.value) {
                case 'hidden':
                  return yt.HIDDEN;
                case 'scroll':
                  return yt.SCROLL;
                case 'auto':
                  return yt.AUTO;
                case 'visible':
                default:
                  return yt.VISIBLE;
              }
            });
          },
        };
      !(function (A) {
        ((A.NORMAL = 'normal'), (A.BREAK_WORD = 'break-word'));
      })(Lt || (Lt = {}));
      var Mt,
        Dt = {
          name: 'overflow-wrap',
          initialValue: 'normal',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'break-word':
                return Lt.BREAK_WORD;
              case 'normal':
              default:
                return Lt.NORMAL;
            }
          },
        },
        xt = function (A) {
          return {
            name: 'padding-' + A,
            initialValue: '0',
            prefix: !1,
            type: ie.TYPE_VALUE,
            format: 'length-percentage',
          };
        },
        Pt = xt('top'),
        Vt = xt('right'),
        Xt = xt('bottom'),
        zt = xt('left');
      !(function (A) {
        ((A[(A.LEFT = 0)] = 'LEFT'), (A[(A.CENTER = 1)] = 'CENTER'), (A[(A.RIGHT = 2)] = 'RIGHT'));
      })(Mt || (Mt = {}));
      var kt,
        Gt = {
          name: 'text-align',
          initialValue: 'left',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'right':
                return Mt.RIGHT;
              case 'center':
              case 'justify':
                return Mt.CENTER;
              case 'left':
              default:
                return Mt.LEFT;
            }
          },
        };
      !(function (A) {
        ((A[(A.STATIC = 0)] = 'STATIC'),
          (A[(A.RELATIVE = 1)] = 'RELATIVE'),
          (A[(A.ABSOLUTE = 2)] = 'ABSOLUTE'),
          (A[(A.FIXED = 3)] = 'FIXED'),
          (A[(A.STICKY = 4)] = 'STICKY'));
      })(kt || (kt = {}));
      var Jt,
        Yt = {
          name: 'position',
          initialValue: 'static',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'relative':
                return kt.RELATIVE;
              case 'absolute':
                return kt.ABSOLUTE;
              case 'fixed':
                return kt.FIXED;
              case 'sticky':
                return kt.STICKY;
            }
            return kt.STATIC;
          },
        },
        Wt = {
          name: 'text-shadow',
          initialValue: 'none',
          type: ie.LIST,
          prefix: !1,
          parse: function (A) {
            return 1 === A.length && LA(A[0], 'none')
              ? []
              : DA(A).map(function (A) {
                  for (
                    var e = { color: ue.TRANSPARENT, offsetX: zA, offsetY: zA, blur: zA },
                      t = 0,
                      r = 0;
                    r < A.length;
                    r++
                  ) {
                    var n = A[r];
                    PA(n)
                      ? (0 === t ? (e.offsetX = n) : 1 === t ? (e.offsetY = n) : (e.blur = n), t++)
                      : (e.color = $A(n));
                  }
                  return e;
                });
          },
        };
      !(function (A) {
        ((A[(A.NONE = 0)] = 'NONE'),
          (A[(A.LOWERCASE = 1)] = 'LOWERCASE'),
          (A[(A.UPPERCASE = 2)] = 'UPPERCASE'),
          (A[(A.CAPITALIZE = 3)] = 'CAPITALIZE'));
      })(Jt || (Jt = {}));
      var jt,
        qt = {
          name: 'text-transform',
          initialValue: 'none',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'uppercase':
                return Jt.UPPERCASE;
              case 'lowercase':
                return Jt.LOWERCASE;
              case 'capitalize':
                return Jt.CAPITALIZE;
            }
            return Jt.NONE;
          },
        },
        Zt = {
          name: 'transform',
          initialValue: 'none',
          prefix: !0,
          type: ie.VALUE,
          parse: function (A) {
            if (A.type === f.IDENT_TOKEN && 'none' === A.value) return null;
            if (A.type === f.FUNCTION) {
              var e = $t[A.name];
              if (void 0 === e)
                throw new Error(
                  'Attempting to parse an unsupported transform function "' + A.name + '"'
                );
              return e(A.values);
            }
            return null;
          },
        },
        $t = {
          matrix: function (A) {
            var e = A.filter(function (A) {
              return A.type === f.NUMBER_TOKEN;
            }).map(function (A) {
              return A.number;
            });
            return 6 === e.length ? e : null;
          },
          matrix3d: function (A) {
            var e = A.filter(function (A) {
                return A.type === f.NUMBER_TOKEN;
              }).map(function (A) {
                return A.number;
              }),
              t = e[0],
              r = e[1],
              n = (e[2], e[3], e[4]),
              o = e[5],
              i = (e[6], e[7], e[8], e[9], e[10], e[11], e[12]),
              a = e[13];
            (e[14], e[15]);
            return 16 === e.length ? [t, r, n, o, i, a] : null;
          },
        },
        Ar = { type: f.PERCENTAGE_TOKEN, number: 50, flags: 4 },
        er = [Ar, Ar],
        tr = {
          name: 'transform-origin',
          initialValue: '50% 50%',
          prefix: !0,
          type: ie.LIST,
          parse: function (A) {
            var e = A.filter(VA);
            return 2 !== e.length ? er : [e[0], e[1]];
          },
        };
      !(function (A) {
        ((A[(A.VISIBLE = 0)] = 'VISIBLE'),
          (A[(A.HIDDEN = 1)] = 'HIDDEN'),
          (A[(A.COLLAPSE = 2)] = 'COLLAPSE'));
      })(jt || (jt = {}));
      var rr,
        nr = {
          name: 'visible',
          initialValue: 'none',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'hidden':
                return jt.HIDDEN;
              case 'collapse':
                return jt.COLLAPSE;
              case 'visible':
              default:
                return jt.VISIBLE;
            }
          },
        };
      !(function (A) {
        ((A.NORMAL = 'normal'), (A.BREAK_ALL = 'break-all'), (A.KEEP_ALL = 'keep-all'));
      })(rr || (rr = {}));
      var or,
        ir = {
          name: 'word-break',
          initialValue: 'normal',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'break-all':
                return rr.BREAK_ALL;
              case 'keep-all':
                return rr.KEEP_ALL;
              case 'normal':
              default:
                return rr.NORMAL;
            }
          },
        },
        ar = {
          name: 'z-index',
          initialValue: 'auto',
          prefix: !1,
          type: ie.VALUE,
          parse: function (A) {
            if (A.type === f.IDENT_TOKEN) return { auto: !0, order: 0 };
            if (RA(A)) return { auto: !1, order: A.number };
            throw new Error('Invalid z-index number parsed');
          },
        },
        sr = {
          name: 'opacity',
          initialValue: '1',
          type: ie.VALUE,
          prefix: !1,
          parse: function (A) {
            return RA(A) ? A.number : 1;
          },
        },
        cr = {
          name: 'text-decoration-color',
          initialValue: 'transparent',
          prefix: !1,
          type: ie.TYPE_VALUE,
          format: 'color',
        },
        ur = {
          name: 'text-decoration-line',
          initialValue: 'none',
          prefix: !1,
          type: ie.LIST,
          parse: function (A) {
            return A.filter(KA)
              .map(function (A) {
                switch (A.value) {
                  case 'underline':
                    return 1;
                  case 'overline':
                    return 2;
                  case 'line-through':
                    return 3;
                  case 'none':
                    return 4;
                }
                return 0;
              })
              .filter(function (A) {
                return 0 !== A;
              });
          },
        },
        Br = {
          name: 'font-family',
          initialValue: '',
          prefix: !1,
          type: ie.LIST,
          parse: function (A) {
            var e = [],
              t = [];
            return (
              A.forEach(function (A) {
                switch (A.type) {
                  case f.IDENT_TOKEN:
                  case f.STRING_TOKEN:
                    e.push(A.value);
                    break;
                  case f.NUMBER_TOKEN:
                    e.push(A.number.toString());
                    break;
                  case f.COMMA_TOKEN:
                    (t.push(e.join(' ')), (e.length = 0));
                }
              }),
              e.length && t.push(e.join(' ')),
              t.map(function (A) {
                return -1 === A.indexOf(' ') ? A : "'" + A + "'";
              })
            );
          },
        },
        lr = {
          name: 'font-size',
          initialValue: '0',
          prefix: !1,
          type: ie.TYPE_VALUE,
          format: 'length',
        },
        fr = {
          name: 'font-weight',
          initialValue: 'normal',
          type: ie.VALUE,
          prefix: !1,
          parse: function (A) {
            if (RA(A)) return A.number;
            if (KA(A))
              switch (A.value) {
                case 'bold':
                  return 700;
                case 'normal':
                default:
                  return 400;
              }
            return 400;
          },
        },
        hr = {
          name: 'font-variant',
          initialValue: 'none',
          type: ie.LIST,
          prefix: !1,
          parse: function (A) {
            return A.filter(KA).map(function (A) {
              return A.value;
            });
          },
        };
      !(function (A) {
        ((A.NORMAL = 'normal'), (A.ITALIC = 'italic'), (A.OBLIQUE = 'oblique'));
      })(or || (or = {}));
      var gr,
        wr = {
          name: 'font-style',
          initialValue: 'normal',
          prefix: !1,
          type: ie.IDENT_VALUE,
          parse: function (A) {
            switch (A) {
              case 'oblique':
                return or.OBLIQUE;
              case 'italic':
                return or.ITALIC;
              case 'normal':
              default:
                return or.NORMAL;
            }
          },
        },
        dr = function (A, e) {
          return 0 != (A & e);
        },
        Er = {
          name: 'content',
          initialValue: 'none',
          type: ie.LIST,
          prefix: !1,
          parse: function (A) {
            if (0 === A.length) return [];
            var e = A[0];
            return e.type === f.IDENT_TOKEN && 'none' === e.value ? [] : A;
          },
        },
        pr = {
          name: 'counter-increment',
          initialValue: 'none',
          prefix: !0,
          type: ie.LIST,
          parse: function (A) {
            if (0 === A.length) return null;
            var e = A[0];
            if (e.type === f.IDENT_TOKEN && 'none' === e.value) return null;
            for (var t = [], r = A.filter(OA), n = 0; n < r.length; n++) {
              var o = r[n],
                i = r[n + 1];
              if (o.type === f.IDENT_TOKEN) {
                var a = i && RA(i) ? i.number : 1;
                t.push({ counter: o.value, increment: a });
              }
            }
            return t;
          },
        },
        Qr = {
          name: 'counter-reset',
          initialValue: 'none',
          prefix: !0,
          type: ie.LIST,
          parse: function (A) {
            if (0 === A.length) return [];
            for (var e = [], t = A.filter(OA), r = 0; r < t.length; r++) {
              var n = t[r],
                o = t[r + 1];
              if (KA(n) && 'none' !== n.value) {
                var i = o && RA(o) ? o.number : 0;
                e.push({ counter: n.value, reset: i });
              }
            }
            return e;
          },
        },
        Ur = {
          name: 'quotes',
          initialValue: 'none',
          prefix: !0,
          type: ie.LIST,
          parse: function (A) {
            if (0 === A.length) return null;
            var e = A[0];
            if (e.type === f.IDENT_TOKEN && 'none' === e.value) return null;
            var t = [],
              r = A.filter(SA);
            if (r.length % 2 != 0) return null;
            for (var n = 0; n < r.length; n += 2) {
              var o = r[n].value,
                i = r[n + 1].value;
              t.push({ open: o, close: i });
            }
            return t;
          },
        },
        Cr = function (A, e, t) {
          if (!A) return '';
          var r = A[Math.min(e, A.length - 1)];
          return r ? (t ? r.open : r.close) : '';
        },
        Fr = {
          name: 'box-shadow',
          initialValue: 'none',
          type: ie.LIST,
          prefix: !1,
          parse: function (A) {
            return 1 === A.length && LA(A[0], 'none')
              ? []
              : DA(A).map(function (A) {
                  for (
                    var e = {
                        color: 255,
                        offsetX: zA,
                        offsetY: zA,
                        blur: zA,
                        spread: zA,
                        inset: !1,
                      },
                      t = 0,
                      r = 0;
                    r < A.length;
                    r++
                  ) {
                    var n = A[r];
                    LA(n, 'inset')
                      ? (e.inset = !0)
                      : PA(n)
                        ? (0 === t
                            ? (e.offsetX = n)
                            : 1 === t
                              ? (e.offsetY = n)
                              : 2 === t
                                ? (e.blur = n)
                                : (e.spread = n),
                          t++)
                        : (e.color = $A(n));
                  }
                  return e;
                });
          },
        },
        mr = (function () {
          function A(A) {
            ((this.backgroundClip = Tr(le, A.backgroundClip)),
              (this.backgroundColor = Tr(fe, A.backgroundColor)),
              (this.backgroundImage = Tr(Pe, A.backgroundImage)),
              (this.backgroundOrigin = Tr(Ve, A.backgroundOrigin)),
              (this.backgroundPosition = Tr(Xe, A.backgroundPosition)),
              (this.backgroundRepeat = Tr(ke, A.backgroundRepeat)),
              (this.backgroundSize = Tr(Ye, A.backgroundSize)),
              (this.borderTopColor = Tr(qe, A.borderTopColor)),
              (this.borderRightColor = Tr(Ze, A.borderRightColor)),
              (this.borderBottomColor = Tr($e, A.borderBottomColor)),
              (this.borderLeftColor = Tr(At, A.borderLeftColor)),
              (this.borderTopLeftRadius = Tr(tt, A.borderTopLeftRadius)),
              (this.borderTopRightRadius = Tr(rt, A.borderTopRightRadius)),
              (this.borderBottomRightRadius = Tr(nt, A.borderBottomRightRadius)),
              (this.borderBottomLeftRadius = Tr(ot, A.borderBottomLeftRadius)),
              (this.borderTopStyle = Tr(st, A.borderTopStyle)),
              (this.borderRightStyle = Tr(ct, A.borderRightStyle)),
              (this.borderBottomStyle = Tr(ut, A.borderBottomStyle)),
              (this.borderLeftStyle = Tr(Bt, A.borderLeftStyle)),
              (this.borderTopWidth = Tr(ft, A.borderTopWidth)),
              (this.borderRightWidth = Tr(ht, A.borderRightWidth)),
              (this.borderBottomWidth = Tr(gt, A.borderBottomWidth)),
              (this.borderLeftWidth = Tr(wt, A.borderLeftWidth)),
              (this.boxShadow = Tr(Fr, A.boxShadow)),
              (this.color = Tr(dt, A.color)),
              (this.display = Tr(Et, A.display)),
              (this.float = Tr(Ut, A.cssFloat)),
              (this.fontFamily = Tr(Br, A.fontFamily)),
              (this.fontSize = Tr(lr, A.fontSize)),
              (this.fontStyle = Tr(wr, A.fontStyle)),
              (this.fontVariant = Tr(hr, A.fontVariant)),
              (this.fontWeight = Tr(fr, A.fontWeight)),
              (this.letterSpacing = Tr(Ct, A.letterSpacing)),
              (this.lineBreak = Tr(mt, A.lineBreak)),
              (this.lineHeight = Tr(_t, A.lineHeight)),
              (this.listStyleImage = Tr(Ht, A.listStyleImage)),
              (this.listStylePosition = Tr(vt, A.listStylePosition)),
              (this.listStyleType = Tr(Nt, A.listStyleType)),
              (this.marginTop = Tr(bt, A.marginTop)),
              (this.marginRight = Tr(Rt, A.marginRight)),
              (this.marginBottom = Tr(Kt, A.marginBottom)),
              (this.marginLeft = Tr(St, A.marginLeft)),
              (this.opacity = Tr(sr, A.opacity)));
            var e = Tr(Ot, A.overflow);
            ((this.overflowX = e[0]),
              (this.overflowY = e[e.length > 1 ? 1 : 0]),
              (this.overflowWrap = Tr(Dt, A.overflowWrap)),
              (this.paddingTop = Tr(Pt, A.paddingTop)),
              (this.paddingRight = Tr(Vt, A.paddingRight)),
              (this.paddingBottom = Tr(Xt, A.paddingBottom)),
              (this.paddingLeft = Tr(zt, A.paddingLeft)),
              (this.position = Tr(Yt, A.position)),
              (this.textAlign = Tr(Gt, A.textAlign)),
              (this.textDecorationColor = Tr(cr, A.textDecorationColor || A.color)),
              (this.textDecorationLine = Tr(ur, A.textDecorationLine)),
              (this.textShadow = Tr(Wt, A.textShadow)),
              (this.textTransform = Tr(qt, A.textTransform)),
              (this.transform = Tr(Zt, A.transform)),
              (this.transformOrigin = Tr(tr, A.transformOrigin)),
              (this.visibility = Tr(nr, A.visibility)),
              (this.wordBreak = Tr(ir, A.wordBreak)),
              (this.zIndex = Tr(ar, A.zIndex)));
          }
          return (
            (A.prototype.isVisible = function () {
              return this.display > 0 && this.opacity > 0 && this.visibility === jt.VISIBLE;
            }),
            (A.prototype.isTransparent = function () {
              return Ae(this.backgroundColor);
            }),
            (A.prototype.isTransformed = function () {
              return null !== this.transform;
            }),
            (A.prototype.isPositioned = function () {
              return this.position !== kt.STATIC;
            }),
            (A.prototype.isPositionedWithZIndex = function () {
              return this.isPositioned() && !this.zIndex.auto;
            }),
            (A.prototype.isFloating = function () {
              return this.float !== it.NONE;
            }),
            (A.prototype.isInlineLevel = function () {
              return (
                dr(this.display, 4) ||
                dr(this.display, 33554432) ||
                dr(this.display, 268435456) ||
                dr(this.display, 536870912) ||
                dr(this.display, 67108864) ||
                dr(this.display, 134217728)
              );
            }),
            A
          );
        })(),
        _r = (function () {
          return function (A) {
            ((this.content = Tr(Er, A.content)), (this.quotes = Tr(Ur, A.quotes)));
          };
        })(),
        Hr = (function () {
          return function (A) {
            ((this.counterIncrement = Tr(pr, A.counterIncrement)),
              (this.counterReset = Tr(Qr, A.counterReset)));
          };
        })(),
        Tr = function (A, e) {
          var t = new NA(),
            r = null !== e && void 0 !== e ? e.toString() : A.initialValue;
          t.write(r);
          var n = new IA(t.read());
          switch (A.type) {
            case ie.IDENT_VALUE:
              var o = n.parseComponentValue();
              return A.parse(KA(o) ? o.value : A.initialValue);
            case ie.VALUE:
              return A.parse(n.parseComponentValue());
            case ie.LIST:
              return A.parse(n.parseComponentValues());
            case ie.TOKEN_VALUE:
              return n.parseComponentValue();
            case ie.TYPE_VALUE:
              switch (A.format) {
                case 'angle':
                  return WA(n.parseComponentValue());
                case 'color':
                  return $A(n.parseComponentValue());
                case 'image':
                  return Me(n.parseComponentValue());
                case 'length':
                  var i = n.parseComponentValue();
                  return PA(i) ? i : zA;
                case 'length-percentage':
                  var a = n.parseComponentValue();
                  return VA(a) ? a : zA;
              }
          }
          throw new Error('Attempting to parse unsupported css format type ' + A.format);
        },
        vr = (function () {
          return function (A) {
            ((this.styles = new mr(window.getComputedStyle(A, null))),
              (this.textNodes = []),
              (this.elements = []),
              null !== this.styles.transform && un(A) && (A.style.transform = 'none'),
              (this.bounds = a(A)),
              (this.flags = 0));
          };
        })(),
        yr = (function () {
          return function (A, e) {
            ((this.text = A), (this.bounds = e));
          };
        })(),
        Nr = function (A, e, t) {
          var r = [],
            n = 0;
          return (
            Rr(A, e).forEach(function (A) {
              if (e.textDecorationLine.length || A.trim().length > 0)
                if (Fe.SUPPORT_RANGE_BOUNDS) r.push(new yr(A, br(t, n, A.length)));
                else {
                  var o = t.splitText(A.length);
                  (r.push(new yr(A, Ir(t))), (t = o));
                }
              else Fe.SUPPORT_RANGE_BOUNDS || (t = t.splitText(A.length));
              n += A.length;
            }),
            r
          );
        },
        Ir = function (A) {
          var e = A.ownerDocument;
          if (e) {
            var t = e.createElement('html2canvaswrapper');
            t.appendChild(A.cloneNode(!0));
            var r = A.parentNode;
            if (r) {
              r.replaceChild(t, A);
              var n = a(t);
              return (t.firstChild && r.replaceChild(t.firstChild, t), n);
            }
          }
          return new o(0, 0, 0, 0);
        },
        br = function (A, e, t) {
          var r = A.ownerDocument;
          if (!r) throw new Error('Node has no owner document');
          var n = r.createRange();
          return (
            n.setStart(A, e),
            n.setEnd(A, e + t),
            o.fromClientRect(n.getBoundingClientRect())
          );
        },
        Rr = function (A, e) {
          return 0 !== e.letterSpacing
            ? s(A).map(function (A) {
                return c(A);
              })
            : Kr(A, e);
        },
        Kr = function (A, e) {
          for (
            var t,
              r = (function (A, e) {
                var t = s(A),
                  r = Z(t, e),
                  n = r[0],
                  o = r[1],
                  i = r[2],
                  a = t.length,
                  c = 0,
                  u = 0;
                return {
                  next: function () {
                    if (u >= a) return { done: !0, value: null };
                    for (var A = '×'; u < a && '×' === (A = q(t, o, n, ++u, i)); );
                    if ('×' !== A || u === a) {
                      var e = new $(t, A, c, u);
                      return ((c = u), { value: e, done: !1 });
                    }
                    return { done: !0, value: null };
                  },
                };
              })(A, {
                lineBreak: e.lineBreak,
                wordBreak: e.overflowWrap === Lt.BREAK_WORD ? 'break-word' : e.wordBreak,
              }),
              n = [];
            !(t = r.next()).done;

          )
            t.value && n.push(t.value.slice());
          return n;
        },
        Sr = (function () {
          return function (A, e) {
            ((this.text = Lr(A.data, e.textTransform)), (this.textBounds = Nr(this.text, e, A)));
          };
        })(),
        Lr = function (A, e) {
          switch (e) {
            case Jt.LOWERCASE:
              return A.toLowerCase();
            case Jt.CAPITALIZE:
              return A.replace(Or, Mr);
            case Jt.UPPERCASE:
              return A.toUpperCase();
            default:
              return A;
          }
        },
        Or = /(^|\s|:|-|\(|\))([a-z])/g,
        Mr = function (A, e, t) {
          return A.length > 0 ? e + t.toUpperCase() : A;
        },
        Dr = (function (A) {
          function t(e) {
            var t = A.call(this, e) || this;
            return (
              (t.src = e.currentSrc || e.src),
              (t.intrinsicWidth = e.naturalWidth),
              (t.intrinsicHeight = e.naturalHeight),
              _e.getInstance().addImage(t.src),
              t
            );
          }
          return (e(t, A), t);
        })(vr),
        xr = (function (A) {
          function t(e) {
            var t = A.call(this, e) || this;
            return (
              (t.canvas = e),
              (t.intrinsicWidth = e.width),
              (t.intrinsicHeight = e.height),
              t
            );
          }
          return (e(t, A), t);
        })(vr),
        Pr = (function (A) {
          function t(e) {
            var t = A.call(this, e) || this,
              r = new XMLSerializer();
            return (
              (t.svg = 'data:image/svg+xml,' + encodeURIComponent(r.serializeToString(e))),
              (t.intrinsicWidth = e.width.baseVal.value),
              (t.intrinsicHeight = e.height.baseVal.value),
              _e.getInstance().addImage(t.svg),
              t
            );
          }
          return (e(t, A), t);
        })(vr),
        Vr = (function (A) {
          function t(e) {
            var t = A.call(this, e) || this;
            return ((t.value = e.value), t);
          }
          return (e(t, A), t);
        })(vr),
        Xr = (function (A) {
          function t(e) {
            var t = A.call(this, e) || this;
            return (
              (t.start = e.start),
              (t.reversed = 'boolean' == typeof e.reversed && !0 === e.reversed),
              t
            );
          }
          return (e(t, A), t);
        })(vr),
        zr = [{ type: f.DIMENSION_TOKEN, flags: 0, unit: 'px', number: 3 }],
        kr = [{ type: f.PERCENTAGE_TOKEN, flags: 0, number: 50 }],
        Gr = function (A) {
          return A.width > A.height
            ? new o(A.left + (A.width - A.height) / 2, A.top, A.height, A.height)
            : A.width < A.height
              ? new o(A.left, A.top + (A.height - A.width) / 2, A.width, A.width)
              : A;
        },
        Jr = function (A) {
          var e = A.type === jr ? new Array(A.value.length + 1).join('•') : A.value;
          return 0 === e.length ? A.placeholder || '' : e;
        },
        Yr = 'checkbox',
        Wr = 'radio',
        jr = 'password',
        qr = (function (A) {
          function t(e) {
            var t = A.call(this, e) || this;
            switch (
              ((t.type = e.type.toLowerCase()),
              (t.checked = e.checked),
              (t.value = Jr(e)),
              (t.type !== Yr && t.type !== Wr) ||
                ((t.styles.backgroundColor = 3739148031),
                (t.styles.borderTopColor =
                  t.styles.borderRightColor =
                  t.styles.borderBottomColor =
                  t.styles.borderLeftColor =
                    2779096575),
                (t.styles.borderTopWidth =
                  t.styles.borderRightWidth =
                  t.styles.borderBottomWidth =
                  t.styles.borderLeftWidth =
                    1),
                (t.styles.borderTopStyle =
                  t.styles.borderRightStyle =
                  t.styles.borderBottomStyle =
                  t.styles.borderLeftStyle =
                    Je.SOLID),
                (t.styles.backgroundClip = [ae.BORDER_BOX]),
                (t.styles.backgroundOrigin = [0]),
                (t.bounds = Gr(t.bounds))),
              t.type)
            ) {
              case Yr:
                t.styles.borderTopRightRadius =
                  t.styles.borderTopLeftRadius =
                  t.styles.borderBottomRightRadius =
                  t.styles.borderBottomLeftRadius =
                    zr;
                break;
              case Wr:
                t.styles.borderTopRightRadius =
                  t.styles.borderTopLeftRadius =
                  t.styles.borderBottomRightRadius =
                  t.styles.borderBottomLeftRadius =
                    kr;
            }
            return t;
          }
          return (e(t, A), t);
        })(vr),
        Zr = (function (A) {
          function t(e) {
            var t = A.call(this, e) || this,
              r = e.options[e.selectedIndex || 0];
            return ((t.value = (r && r.text) || ''), t);
          }
          return (e(t, A), t);
        })(vr),
        $r = (function (A) {
          function t(e) {
            var t = A.call(this, e) || this;
            return ((t.value = e.value), t);
          }
          return (e(t, A), t);
        })(vr),
        An = function (A) {
          return $A(IA.create(A).parseComponentValue());
        },
        en = (function (A) {
          function t(e) {
            var t = A.call(this, e) || this;
            ((t.src = e.src),
              (t.width = parseInt(e.width, 10) || 0),
              (t.height = parseInt(e.height, 10) || 0),
              (t.backgroundColor = t.styles.backgroundColor));
            try {
              if (
                e.contentWindow &&
                e.contentWindow.document &&
                e.contentWindow.document.documentElement
              ) {
                t.tree = nn(e.contentWindow.document.documentElement);
                var r = e.contentWindow.document.documentElement
                    ? An(getComputedStyle(e.contentWindow.document.documentElement).backgroundColor)
                    : ue.TRANSPARENT,
                  n = e.contentWindow.document.body
                    ? An(getComputedStyle(e.contentWindow.document.body).backgroundColor)
                    : ue.TRANSPARENT;
                t.backgroundColor = Ae(r) ? (Ae(n) ? t.styles.backgroundColor : n) : r;
              }
            } catch (A) {}
            return t;
          }
          return (e(t, A), t);
        })(vr),
        tn = ['OL', 'UL', 'MENU'],
        rn = function (A) {
          return En(A)
            ? new Dr(A)
            : dn(A)
              ? new xr(A)
              : gn(A)
                ? new Pr(A)
                : ln(A)
                  ? new Vr(A)
                  : fn(A)
                    ? new Xr(A)
                    : hn(A)
                      ? new qr(A)
                      : Fn(A)
                        ? new Zr(A)
                        : Cn(A)
                          ? new $r(A)
                          : pn(A)
                            ? new en(A)
                            : new vr(A);
        },
        nn = function (A) {
          var e = rn(A);
          return (
            (e.flags |= 4),
            (function A(e, t, r) {
              for (var n = e.firstChild, o = void 0; n; n = o)
                if (((o = n.nextSibling), sn(n) && n.data.trim().length > 0))
                  t.textNodes.push(new Sr(n, t.styles));
                else if (cn(n)) {
                  var i = rn(n);
                  i.styles.isVisible() &&
                    (on(n, i, r) ? (i.flags |= 4) : an(i.styles) && (i.flags |= 2),
                    -1 !== tn.indexOf(n.tagName) && (i.flags |= 8),
                    t.elements.push(i),
                    Cn(n) || gn(n) || Fn(n) || A(n, i, r));
                }
            })(A, e, e),
            e
          );
        },
        on = function (A, e, t) {
          return (
            e.styles.isPositionedWithZIndex() ||
            e.styles.opacity < 1 ||
            e.styles.isTransformed() ||
            (wn(A) && t.styles.isTransparent())
          );
        },
        an = function (A) {
          return A.isPositioned() || A.isFloating();
        },
        sn = function (A) {
          return A.nodeType === Node.TEXT_NODE;
        },
        cn = function (A) {
          return A.nodeType === Node.ELEMENT_NODE;
        },
        un = function (A) {
          return cn(A) && void 0 !== A.style && !Bn(A);
        },
        Bn = function (A) {
          return 'object' === i(A.className);
        },
        ln = function (A) {
          return 'LI' === A.tagName;
        },
        fn = function (A) {
          return 'OL' === A.tagName;
        },
        hn = function (A) {
          return 'INPUT' === A.tagName;
        },
        gn = function (A) {
          return 'svg' === A.tagName;
        },
        wn = function (A) {
          return 'BODY' === A.tagName;
        },
        dn = function (A) {
          return 'CANVAS' === A.tagName;
        },
        En = function (A) {
          return 'IMG' === A.tagName;
        },
        pn = function (A) {
          return 'IFRAME' === A.tagName;
        },
        Qn = function (A) {
          return 'STYLE' === A.tagName;
        },
        Un = function (A) {
          return 'SCRIPT' === A.tagName;
        },
        Cn = function (A) {
          return 'TEXTAREA' === A.tagName;
        },
        Fn = function (A) {
          return 'SELECT' === A.tagName;
        },
        mn = (function () {
          function A() {
            this.counters = {};
          }
          return (
            (A.prototype.getCounterValue = function (A) {
              var e = this.counters[A];
              return e && e.length ? e[e.length - 1] : 1;
            }),
            (A.prototype.getCounterValues = function (A) {
              var e = this.counters[A];
              return e || [];
            }),
            (A.prototype.pop = function (A) {
              var e = this;
              A.forEach(function (A) {
                return e.counters[A].pop();
              });
            }),
            (A.prototype.parse = function (A) {
              var e = this,
                t = A.counterIncrement,
                r = A.counterReset,
                n = !0;
              null !== t &&
                t.forEach(function (A) {
                  var t = e.counters[A.counter];
                  t &&
                    0 !== A.increment &&
                    ((n = !1), (t[Math.max(0, t.length - 1)] += A.increment));
                });
              var o = [];
              return (
                n &&
                  r.forEach(function (A) {
                    var t = e.counters[A.counter];
                    (o.push(A.counter), t || (t = e.counters[A.counter] = []), t.push(A.reset));
                  }),
                o
              );
            }),
            A
          );
        })(),
        _n = {
          integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
          values: ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'],
        },
        Hn = {
          integers: [
            9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200,
            100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
          ],
          values: [
            'Ք',
            'Փ',
            'Ւ',
            'Ց',
            'Ր',
            'Տ',
            'Վ',
            'Ս',
            'Ռ',
            'Ջ',
            'Պ',
            'Չ',
            'Ո',
            'Շ',
            'Ն',
            'Յ',
            'Մ',
            'Ճ',
            'Ղ',
            'Ձ',
            'Հ',
            'Կ',
            'Ծ',
            'Խ',
            'Լ',
            'Ի',
            'Ժ',
            'Թ',
            'Ը',
            'Է',
            'Զ',
            'Ե',
            'Դ',
            'Գ',
            'Բ',
            'Ա',
          ],
        },
        Tn = {
          integers: [
            1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200, 100, 90, 80, 70, 60,
            50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
          ],
          values: [
            'י׳',
            'ט׳',
            'ח׳',
            'ז׳',
            'ו׳',
            'ה׳',
            'ד׳',
            'ג׳',
            'ב׳',
            'א׳',
            'ת',
            'ש',
            'ר',
            'ק',
            'צ',
            'פ',
            'ע',
            'ס',
            'נ',
            'מ',
            'ל',
            'כ',
            'יט',
            'יח',
            'יז',
            'טז',
            'טו',
            'י',
            'ט',
            'ח',
            'ז',
            'ו',
            'ה',
            'ד',
            'ג',
            'ב',
            'א',
          ],
        },
        vn = {
          integers: [
            1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300,
            200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
          ],
          values: [
            'ჵ',
            'ჰ',
            'ჯ',
            'ჴ',
            'ხ',
            'ჭ',
            'წ',
            'ძ',
            'ც',
            'ჩ',
            'შ',
            'ყ',
            'ღ',
            'ქ',
            'ფ',
            'ჳ',
            'ტ',
            'ს',
            'რ',
            'ჟ',
            'პ',
            'ო',
            'ჲ',
            'ნ',
            'მ',
            'ლ',
            'კ',
            'ი',
            'თ',
            'ჱ',
            'ზ',
            'ვ',
            'ე',
            'დ',
            'გ',
            'ბ',
            'ა',
          ],
        },
        yn = function (A, e, t, r, n, o) {
          return A < e || A > t
            ? Kn(A, n, o.length > 0)
            : r.integers.reduce(function (e, t, n) {
                for (; A >= t; ) ((A -= t), (e += r.values[n]));
                return e;
              }, '') + o;
        },
        Nn = function (A, e, t, r) {
          var n = '';
          do {
            (t || A--, (n = r(A) + n), (A /= e));
          } while (A * e >= e);
          return n;
        },
        In = function (A, e, t, r, n) {
          var o = t - e + 1;
          return (
            (A < 0 ? '-' : '') +
            (Nn(Math.abs(A), o, r, function (A) {
              return c(Math.floor(A % o) + e);
            }) +
              n)
          );
        },
        bn = function (A, e, t) {
          void 0 === t && (t = '. ');
          var r = e.length;
          return (
            Nn(Math.abs(A), r, !1, function (A) {
              return e[Math.floor(A % r)];
            }) + t
          );
        },
        Rn = function (A, e, t, r, n, o) {
          if (A < -9999 || A > 9999) return Kn(A, Tt.CJK_DECIMAL, n.length > 0);
          var i = Math.abs(A),
            a = n;
          if (0 === i) return e[0] + a;
          for (var s = 0; i > 0 && s <= 4; s++) {
            var c = i % 10;
            (0 === c && dr(o, 1) && '' !== a
              ? (a = e[c] + a)
              : c > 1 ||
                  (1 === c && 0 === s) ||
                  (1 === c && 1 === s && dr(o, 2)) ||
                  (1 === c && 1 === s && dr(o, 4) && A > 100) ||
                  (1 === c && s > 1 && dr(o, 8))
                ? (a = e[c] + (s > 0 ? t[s - 1] : '') + a)
                : 1 === c && s > 0 && (a = t[s - 1] + a),
              (i = Math.floor(i / 10)));
          }
          return (A < 0 ? r : '') + a;
        },
        Kn = function (A, e, t) {
          var r = t ? '. ' : '',
            n = t ? '、' : '',
            o = t ? ', ' : '',
            i = t ? ' ' : '';
          switch (e) {
            case Tt.DISC:
              return '•' + i;
            case Tt.CIRCLE:
              return '◦' + i;
            case Tt.SQUARE:
              return '◾' + i;
            case Tt.DECIMAL_LEADING_ZERO:
              var a = In(A, 48, 57, !0, r);
              return a.length < 4 ? '0' + a : a;
            case Tt.CJK_DECIMAL:
              return bn(A, '〇一二三四五六七八九', n);
            case Tt.LOWER_ROMAN:
              return yn(A, 1, 3999, _n, Tt.DECIMAL, r).toLowerCase();
            case Tt.UPPER_ROMAN:
              return yn(A, 1, 3999, _n, Tt.DECIMAL, r);
            case Tt.LOWER_GREEK:
              return In(A, 945, 969, !1, r);
            case Tt.LOWER_ALPHA:
              return In(A, 97, 122, !1, r);
            case Tt.UPPER_ALPHA:
              return In(A, 65, 90, !1, r);
            case Tt.ARABIC_INDIC:
              return In(A, 1632, 1641, !0, r);
            case Tt.ARMENIAN:
            case Tt.UPPER_ARMENIAN:
              return yn(A, 1, 9999, Hn, Tt.DECIMAL, r);
            case Tt.LOWER_ARMENIAN:
              return yn(A, 1, 9999, Hn, Tt.DECIMAL, r).toLowerCase();
            case Tt.BENGALI:
              return In(A, 2534, 2543, !0, r);
            case Tt.CAMBODIAN:
            case Tt.KHMER:
              return In(A, 6112, 6121, !0, r);
            case Tt.CJK_EARTHLY_BRANCH:
              return bn(A, '子丑寅卯辰巳午未申酉戌亥', n);
            case Tt.CJK_HEAVENLY_STEM:
              return bn(A, '甲乙丙丁戊己庚辛壬癸', n);
            case Tt.CJK_IDEOGRAPHIC:
            case Tt.TRAD_CHINESE_INFORMAL:
              return Rn(A, '零一二三四五六七八九', '十百千萬', '負', n, 14);
            case Tt.TRAD_CHINESE_FORMAL:
              return Rn(A, '零壹貳參肆伍陸柒捌玖', '拾佰仟萬', '負', n, 15);
            case Tt.SIMP_CHINESE_INFORMAL:
              return Rn(A, '零一二三四五六七八九', '十百千萬', '负', n, 14);
            case Tt.SIMP_CHINESE_FORMAL:
              return Rn(A, '零壹贰叁肆伍陆柒捌玖', '拾佰仟萬', '负', n, 15);
            case Tt.JAPANESE_INFORMAL:
              return Rn(A, '〇一二三四五六七八九', '十百千万', 'マイナス', n, 0);
            case Tt.JAPANESE_FORMAL:
              return Rn(A, '零壱弐参四伍六七八九', '拾百千万', 'マイナス', n, 7);
            case Tt.KOREAN_HANGUL_FORMAL:
              return Rn(A, '영일이삼사오육칠팔구', '십백천만', '마이너스', o, 7);
            case Tt.KOREAN_HANJA_INFORMAL:
              return Rn(A, '零一二三四五六七八九', '十百千萬', '마이너스', o, 0);
            case Tt.KOREAN_HANJA_FORMAL:
              return Rn(A, '零壹貳參四五六七八九', '拾百千', '마이너스', o, 7);
            case Tt.DEVANAGARI:
              return In(A, 2406, 2415, !0, r);
            case Tt.GEORGIAN:
              return yn(A, 1, 19999, vn, Tt.DECIMAL, r);
            case Tt.GUJARATI:
              return In(A, 2790, 2799, !0, r);
            case Tt.GURMUKHI:
              return In(A, 2662, 2671, !0, r);
            case Tt.HEBREW:
              return yn(A, 1, 10999, Tn, Tt.DECIMAL, r);
            case Tt.HIRAGANA:
              return bn(
                A,
                'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん'
              );
            case Tt.HIRAGANA_IROHA:
              return bn(
                A,
                'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす'
              );
            case Tt.KANNADA:
              return In(A, 3302, 3311, !0, r);
            case Tt.KATAKANA:
              return bn(
                A,
                'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン',
                n
              );
            case Tt.KATAKANA_IROHA:
              return bn(
                A,
                'イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス',
                n
              );
            case Tt.LAO:
              return In(A, 3792, 3801, !0, r);
            case Tt.MONGOLIAN:
              return In(A, 6160, 6169, !0, r);
            case Tt.MYANMAR:
              return In(A, 4160, 4169, !0, r);
            case Tt.ORIYA:
              return In(A, 2918, 2927, !0, r);
            case Tt.PERSIAN:
              return In(A, 1776, 1785, !0, r);
            case Tt.TAMIL:
              return In(A, 3046, 3055, !0, r);
            case Tt.TELUGU:
              return In(A, 3174, 3183, !0, r);
            case Tt.THAI:
              return In(A, 3664, 3673, !0, r);
            case Tt.TIBETAN:
              return In(A, 3872, 3881, !0, r);
            case Tt.DECIMAL:
            default:
              return In(A, 48, 57, !0, r);
          }
        },
        Sn = (function () {
          function A(A, e) {
            if (
              ((this.options = e),
              (this.scrolledElements = []),
              (this.referenceElement = A),
              (this.counters = new mn()),
              (this.quoteDepth = 0),
              !A.ownerDocument)
            )
              throw new Error('Cloned element does not have an owner document');
            this.documentElement = this.cloneNode(A.ownerDocument.documentElement);
          }
          return (
            (A.prototype.toIFrame = function (A, e) {
              var t = this,
                o = On(A, e);
              if (!o.contentWindow) return Promise.reject('Unable to find iframe window');
              var i = A.defaultView.pageXOffset,
                a = A.defaultView.pageYOffset,
                s = o.contentWindow,
                c = s.document,
                u = Mn(o).then(function () {
                  return r(t, void 0, void 0, function () {
                    var A;
                    return n(this, function (t) {
                      switch (t.label) {
                        case 0:
                          return (
                            this.scrolledElements.forEach(Vn),
                            s &&
                              (s.scrollTo(e.left, e.top),
                              !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) ||
                                (s.scrollY === e.top && s.scrollX === e.left) ||
                                ((c.documentElement.style.top = -e.top + 'px'),
                                (c.documentElement.style.left = -e.left + 'px'),
                                (c.documentElement.style.position = 'absolute'))),
                            (A = this.options.onclone),
                            void 0 === this.clonedReferenceElement
                              ? [
                                  2,
                                  Promise.reject(
                                    'Error finding the ' +
                                      this.referenceElement.nodeName +
                                      ' in the cloned document'
                                  ),
                                ]
                              : c.fonts && c.fonts.ready
                                ? [4, c.fonts.ready]
                                : [3, 2]
                          );
                        case 1:
                          (t.sent(), (t.label = 2));
                        case 2:
                          return 'function' == typeof A
                            ? [
                                2,
                                Promise.resolve()
                                  .then(function () {
                                    return A(c);
                                  })
                                  .then(function () {
                                    return o;
                                  }),
                              ]
                            : [2, o];
                      }
                    });
                  });
                });
              return (
                c.open(),
                c.write(xn(document.doctype) + '<html></html>'),
                Pn(this.referenceElement.ownerDocument, i, a),
                c.replaceChild(c.adoptNode(this.documentElement), c.documentElement),
                c.close(),
                u
              );
            }),
            (A.prototype.createElementClone = function (A) {
              if (dn(A)) return this.createCanvasClone(A);
              if (Qn(A)) return this.createStyleClone(A);
              var e = A.cloneNode(!1);
              return (En(e) && 'lazy' === e.loading && (e.loading = 'eager'), e);
            }),
            (A.prototype.createStyleClone = function (A) {
              try {
                var e = A.sheet;
                if (e && e.cssRules) {
                  var t = [].slice.call(e.cssRules, 0).reduce(function (A, e) {
                      return e && 'string' == typeof e.cssText ? A + e.cssText : A;
                    }, ''),
                    r = A.cloneNode(!1);
                  return ((r.textContent = t), r);
                }
              } catch (A) {
                if (
                  (me.getInstance(this.options.id).error('Unable to access cssRules property', A),
                  'SecurityError' !== A.name)
                )
                  throw A;
              }
              return A.cloneNode(!1);
            }),
            (A.prototype.createCanvasClone = function (A) {
              if (this.options.inlineImages && A.ownerDocument) {
                var e = A.ownerDocument.createElement('img');
                try {
                  return ((e.src = A.toDataURL()), e);
                } catch (A) {
                  me.getInstance(this.options.id).info(
                    'Unable to clone canvas contents, canvas is tainted'
                  );
                }
              }
              var t = A.cloneNode(!1);
              try {
                ((t.width = A.width), (t.height = A.height));
                var r = A.getContext('2d'),
                  n = t.getContext('2d');
                return (
                  n &&
                    (r
                      ? n.putImageData(r.getImageData(0, 0, A.width, A.height), 0, 0)
                      : n.drawImage(A, 0, 0)),
                  t
                );
              } catch (A) {}
              return t;
            }),
            (A.prototype.cloneNode = function (A) {
              if (sn(A)) return document.createTextNode(A.data);
              if (!A.ownerDocument) return A.cloneNode(!1);
              var e = A.ownerDocument.defaultView;
              if (e && cn(A) && (un(A) || Bn(A))) {
                var t = this.createElementClone(A),
                  r = e.getComputedStyle(A),
                  n = e.getComputedStyle(A, ':before'),
                  o = e.getComputedStyle(A, ':after');
                (this.referenceElement === A && un(t) && (this.clonedReferenceElement = t),
                  wn(t) && kn(t));
                for (
                  var i = this.counters.parse(new Hr(r)),
                    a = this.resolvePseudoContent(A, t, n, gr.BEFORE),
                    s = A.firstChild;
                  s;
                  s = s.nextSibling
                )
                  (cn(s) &&
                    (Un(s) ||
                      s.hasAttribute('data-html2canvas-ignore') ||
                      ('function' == typeof this.options.ignoreElements &&
                        this.options.ignoreElements(s)))) ||
                    (this.options.copyStyles && cn(s) && Qn(s)) ||
                    t.appendChild(this.cloneNode(s));
                a && t.insertBefore(a, t.firstChild);
                var c = this.resolvePseudoContent(A, t, o, gr.AFTER);
                return (
                  c && t.appendChild(c),
                  this.counters.pop(i),
                  r && (this.options.copyStyles || Bn(A)) && !pn(A) && Dn(r, t),
                  (0 === A.scrollTop && 0 === A.scrollLeft) ||
                    this.scrolledElements.push([t, A.scrollLeft, A.scrollTop]),
                  (Cn(A) || Fn(A)) && (Cn(t) || Fn(t)) && (t.value = A.value),
                  t
                );
              }
              return A.cloneNode(!1);
            }),
            (A.prototype.resolvePseudoContent = function (A, e, t, r) {
              var n = this;
              if (t) {
                var o = t.content,
                  i = e.ownerDocument;
                if (i && o && 'none' !== o && '-moz-alt-content' !== o && 'none' !== t.display) {
                  this.counters.parse(new Hr(t));
                  var a = new _r(t),
                    s = i.createElement('html2canvaspseudoelement');
                  (Dn(t, s),
                    a.content.forEach(function (e) {
                      if (e.type === f.STRING_TOKEN) s.appendChild(i.createTextNode(e.value));
                      else if (e.type === f.URL_TOKEN) {
                        var t = i.createElement('img');
                        ((t.src = e.value), (t.style.opacity = '1'), s.appendChild(t));
                      } else if (e.type === f.FUNCTION) {
                        if ('attr' === e.name) {
                          var r = e.values.filter(KA);
                          r.length &&
                            s.appendChild(i.createTextNode(A.getAttribute(r[0].value) || ''));
                        } else if ('counter' === e.name) {
                          var o = e.values.filter(MA),
                            c = o[0],
                            u = o[1];
                          if (c && KA(c)) {
                            var B = n.counters.getCounterValue(c.value),
                              l = u && KA(u) ? Nt.parse(u.value) : Tt.DECIMAL;
                            s.appendChild(i.createTextNode(Kn(B, l, !1)));
                          }
                        } else if ('counters' === e.name) {
                          var h = e.values.filter(MA),
                            g = ((c = h[0]), h[1]);
                          u = h[2];
                          if (c && KA(c)) {
                            var w = n.counters.getCounterValues(c.value),
                              d = u && KA(u) ? Nt.parse(u.value) : Tt.DECIMAL,
                              E = g && g.type === f.STRING_TOKEN ? g.value : '',
                              p = w
                                .map(function (A) {
                                  return Kn(A, d, !1);
                                })
                                .join(E);
                            s.appendChild(i.createTextNode(p));
                          }
                        }
                      } else if (e.type === f.IDENT_TOKEN)
                        switch (e.value) {
                          case 'open-quote':
                            s.appendChild(i.createTextNode(Cr(a.quotes, n.quoteDepth++, !0)));
                            break;
                          case 'close-quote':
                            s.appendChild(i.createTextNode(Cr(a.quotes, --n.quoteDepth, !1)));
                            break;
                          default:
                            s.appendChild(i.createTextNode(e.value));
                        }
                    }),
                    (s.className = Xn + ' ' + zn));
                  var c = r === gr.BEFORE ? ' ' + Xn : ' ' + zn;
                  return (Bn(e) ? (e.className.baseValue += c) : (e.className += c), s);
                }
              }
            }),
            (A.destroy = function (A) {
              return !!A.parentNode && (A.parentNode.removeChild(A), !0);
            }),
            A
          );
        })();
      !(function (A) {
        ((A[(A.BEFORE = 0)] = 'BEFORE'), (A[(A.AFTER = 1)] = 'AFTER'));
      })(gr || (gr = {}));
      var Ln,
        On = function (A, e) {
          var t = A.createElement('iframe');
          return (
            (t.className = 'html2canvas-container'),
            (t.style.visibility = 'hidden'),
            (t.style.position = 'fixed'),
            (t.style.left = '-10000px'),
            (t.style.top = '0px'),
            (t.style.border = '0'),
            (t.width = e.width.toString()),
            (t.height = e.height.toString()),
            (t.scrolling = 'no'),
            t.setAttribute('data-html2canvas-ignore', 'true'),
            A.body.appendChild(t),
            t
          );
        },
        Mn = function (A) {
          return new Promise(function (e, t) {
            var r = A.contentWindow;
            if (!r) return t('No window assigned for iframe');
            var n = r.document;
            r.onload =
              A.onload =
              n.onreadystatechange =
                function () {
                  r.onload = A.onload = n.onreadystatechange = null;
                  var t = setInterval(function () {
                    n.body.childNodes.length > 0 &&
                      'complete' === n.readyState &&
                      (clearInterval(t), e(A));
                  }, 50);
                };
          });
        },
        Dn = function (A, e) {
          for (var t = A.length - 1; t >= 0; t--) {
            var r = A.item(t);
            'content' !== r && e.style.setProperty(r, A.getPropertyValue(r));
          }
          return e;
        },
        xn = function (A) {
          var e = '';
          return (
            A &&
              ((e += '<!DOCTYPE '),
              A.name && (e += A.name),
              A.internalSubset && (e += A.internalSubset),
              A.publicId && (e += '"' + A.publicId + '"'),
              A.systemId && (e += '"' + A.systemId + '"'),
              (e += '>')),
            e
          );
        },
        Pn = function (A, e, t) {
          A &&
            A.defaultView &&
            (e !== A.defaultView.pageXOffset || t !== A.defaultView.pageYOffset) &&
            A.defaultView.scrollTo(e, t);
        },
        Vn = function (A) {
          var e = A[0],
            t = A[1],
            r = A[2];
          ((e.scrollLeft = t), (e.scrollTop = r));
        },
        Xn = '___html2canvas___pseudoelement_before',
        zn = '___html2canvas___pseudoelement_after',
        kn = function (A) {
          Gn(
            A,
            '.' +
              Xn +
              ':before{\n    content: "" !important;\n    display: none !important;\n}\n         .' +
              zn +
              ':after{\n    content: "" !important;\n    display: none !important;\n}'
          );
        },
        Gn = function (A, e) {
          var t = A.ownerDocument;
          if (t) {
            var r = t.createElement('style');
            ((r.textContent = e), A.appendChild(r));
          }
        };
      !(function (A) {
        ((A[(A.VECTOR = 0)] = 'VECTOR'), (A[(A.BEZIER_CURVE = 1)] = 'BEZIER_CURVE'));
      })(Ln || (Ln = {}));
      var Jn,
        Yn = function (A, e) {
          return (
            A.length === e.length &&
            A.some(function (A, t) {
              return A === e[t];
            })
          );
        },
        Wn = (function () {
          function A(A, e) {
            ((this.type = Ln.VECTOR), (this.x = A), (this.y = e));
          }
          return (
            (A.prototype.add = function (e, t) {
              return new A(this.x + e, this.y + t);
            }),
            A
          );
        })(),
        jn = function (A, e, t) {
          return new Wn(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t);
        },
        qn = (function () {
          function A(A, e, t, r) {
            ((this.type = Ln.BEZIER_CURVE),
              (this.start = A),
              (this.startControl = e),
              (this.endControl = t),
              (this.end = r));
          }
          return (
            (A.prototype.subdivide = function (e, t) {
              var r = jn(this.start, this.startControl, e),
                n = jn(this.startControl, this.endControl, e),
                o = jn(this.endControl, this.end, e),
                i = jn(r, n, e),
                a = jn(n, o, e),
                s = jn(i, a, e);
              return t ? new A(this.start, r, i, s) : new A(s, a, o, this.end);
            }),
            (A.prototype.add = function (e, t) {
              return new A(
                this.start.add(e, t),
                this.startControl.add(e, t),
                this.endControl.add(e, t),
                this.end.add(e, t)
              );
            }),
            (A.prototype.reverse = function () {
              return new A(this.end, this.endControl, this.startControl, this.start);
            }),
            A
          );
        })(),
        Zn = function (A) {
          return A.type === Ln.BEZIER_CURVE;
        },
        $n = (function () {
          return function (A) {
            var e = A.styles,
              t = A.bounds,
              r = JA(e.borderTopLeftRadius, t.width, t.height),
              n = r[0],
              o = r[1],
              i = JA(e.borderTopRightRadius, t.width, t.height),
              a = i[0],
              s = i[1],
              c = JA(e.borderBottomRightRadius, t.width, t.height),
              u = c[0],
              B = c[1],
              l = JA(e.borderBottomLeftRadius, t.width, t.height),
              f = l[0],
              h = l[1],
              g = [];
            (g.push((n + a) / t.width),
              g.push((f + u) / t.width),
              g.push((o + h) / t.height),
              g.push((s + B) / t.height));
            var w = Math.max.apply(Math, g);
            w > 1 &&
              ((n /= w), (o /= w), (a /= w), (s /= w), (u /= w), (B /= w), (f /= w), (h /= w));
            var d = t.width - a,
              E = t.height - B,
              p = t.width - u,
              Q = t.height - h,
              U = e.borderTopWidth,
              C = e.borderRightWidth,
              F = e.borderBottomWidth,
              m = e.borderLeftWidth,
              _ = YA(e.paddingTop, A.bounds.width),
              H = YA(e.paddingRight, A.bounds.width),
              T = YA(e.paddingBottom, A.bounds.width),
              v = YA(e.paddingLeft, A.bounds.width);
            ((this.topLeftBorderBox =
              n > 0 || o > 0 ? Ao(t.left, t.top, n, o, Jn.TOP_LEFT) : new Wn(t.left, t.top)),
              (this.topRightBorderBox =
                a > 0 || s > 0
                  ? Ao(t.left + d, t.top, a, s, Jn.TOP_RIGHT)
                  : new Wn(t.left + t.width, t.top)),
              (this.bottomRightBorderBox =
                u > 0 || B > 0
                  ? Ao(t.left + p, t.top + E, u, B, Jn.BOTTOM_RIGHT)
                  : new Wn(t.left + t.width, t.top + t.height)),
              (this.bottomLeftBorderBox =
                f > 0 || h > 0
                  ? Ao(t.left, t.top + Q, f, h, Jn.BOTTOM_LEFT)
                  : new Wn(t.left, t.top + t.height)),
              (this.topLeftPaddingBox =
                n > 0 || o > 0
                  ? Ao(t.left + m, t.top + U, Math.max(0, n - m), Math.max(0, o - U), Jn.TOP_LEFT)
                  : new Wn(t.left + m, t.top + U)),
              (this.topRightPaddingBox =
                a > 0 || s > 0
                  ? Ao(
                      t.left + Math.min(d, t.width + m),
                      t.top + U,
                      d > t.width + m ? 0 : a - m,
                      s - U,
                      Jn.TOP_RIGHT
                    )
                  : new Wn(t.left + t.width - C, t.top + U)),
              (this.bottomRightPaddingBox =
                u > 0 || B > 0
                  ? Ao(
                      t.left + Math.min(p, t.width - m),
                      t.top + Math.min(E, t.height + U),
                      Math.max(0, u - C),
                      B - F,
                      Jn.BOTTOM_RIGHT
                    )
                  : new Wn(t.left + t.width - C, t.top + t.height - F)),
              (this.bottomLeftPaddingBox =
                f > 0 || h > 0
                  ? Ao(t.left + m, t.top + Q, Math.max(0, f - m), h - F, Jn.BOTTOM_LEFT)
                  : new Wn(t.left + m, t.top + t.height - F)),
              (this.topLeftContentBox =
                n > 0 || o > 0
                  ? Ao(
                      t.left + m + v,
                      t.top + U + _,
                      Math.max(0, n - (m + v)),
                      Math.max(0, o - (U + _)),
                      Jn.TOP_LEFT
                    )
                  : new Wn(t.left + m + v, t.top + U + _)),
              (this.topRightContentBox =
                a > 0 || s > 0
                  ? Ao(
                      t.left + Math.min(d, t.width + m + v),
                      t.top + U + _,
                      d > t.width + m + v ? 0 : a - m + v,
                      s - (U + _),
                      Jn.TOP_RIGHT
                    )
                  : new Wn(t.left + t.width - (C + H), t.top + U + _)),
              (this.bottomRightContentBox =
                u > 0 || B > 0
                  ? Ao(
                      t.left + Math.min(p, t.width - (m + v)),
                      t.top + Math.min(E, t.height + U + _),
                      Math.max(0, u - (C + H)),
                      B - (F + T),
                      Jn.BOTTOM_RIGHT
                    )
                  : new Wn(t.left + t.width - (C + H), t.top + t.height - (F + T))),
              (this.bottomLeftContentBox =
                f > 0 || h > 0
                  ? Ao(
                      t.left + m + v,
                      t.top + Q,
                      Math.max(0, f - (m + v)),
                      h - (F + T),
                      Jn.BOTTOM_LEFT
                    )
                  : new Wn(t.left + m + v, t.top + t.height - (F + T))));
          };
        })();
      !(function (A) {
        ((A[(A.TOP_LEFT = 0)] = 'TOP_LEFT'),
          (A[(A.TOP_RIGHT = 1)] = 'TOP_RIGHT'),
          (A[(A.BOTTOM_RIGHT = 2)] = 'BOTTOM_RIGHT'),
          (A[(A.BOTTOM_LEFT = 3)] = 'BOTTOM_LEFT'));
      })(Jn || (Jn = {}));
      var Ao = function (A, e, t, r, n) {
          var o = ((Math.sqrt(2) - 1) / 3) * 4,
            i = t * o,
            a = r * o,
            s = A + t,
            c = e + r;
          switch (n) {
            case Jn.TOP_LEFT:
              return new qn(new Wn(A, c), new Wn(A, c - a), new Wn(s - i, e), new Wn(s, e));
            case Jn.TOP_RIGHT:
              return new qn(new Wn(A, e), new Wn(A + i, e), new Wn(s, c - a), new Wn(s, c));
            case Jn.BOTTOM_RIGHT:
              return new qn(new Wn(s, e), new Wn(s, e + a), new Wn(A + i, c), new Wn(A, c));
            case Jn.BOTTOM_LEFT:
            default:
              return new qn(new Wn(s, c), new Wn(s - i, c), new Wn(A, e + a), new Wn(A, e));
          }
        },
        eo = function (A) {
          return [
            A.topLeftBorderBox,
            A.topRightBorderBox,
            A.bottomRightBorderBox,
            A.bottomLeftBorderBox,
          ];
        },
        to = function (A) {
          return [
            A.topLeftPaddingBox,
            A.topRightPaddingBox,
            A.bottomRightPaddingBox,
            A.bottomLeftPaddingBox,
          ];
        },
        ro = (function () {
          return function (A, e, t) {
            ((this.type = 0),
              (this.offsetX = A),
              (this.offsetY = e),
              (this.matrix = t),
              (this.target = 6));
          };
        })(),
        no = (function () {
          return function (A, e) {
            ((this.type = 1), (this.target = e), (this.path = A));
          };
        })(),
        oo = (function () {
          return function (A) {
            ((this.element = A),
              (this.inlineLevel = []),
              (this.nonInlineLevel = []),
              (this.negativeZIndex = []),
              (this.zeroOrAutoZIndexOrTransformedOrOpacity = []),
              (this.positiveZIndex = []),
              (this.nonPositionedFloats = []),
              (this.nonPositionedInlineLevel = []));
          };
        })(),
        io = (function () {
          function A(A, e) {
            if (
              ((this.container = A),
              (this.effects = e.slice(0)),
              (this.curves = new $n(A)),
              null !== A.styles.transform)
            ) {
              var t = A.bounds.left + A.styles.transformOrigin[0].number,
                r = A.bounds.top + A.styles.transformOrigin[1].number,
                n = A.styles.transform;
              this.effects.push(new ro(t, r, n));
            }
            if (A.styles.overflowX !== yt.VISIBLE) {
              var o = eo(this.curves),
                i = to(this.curves);
              Yn(o, i)
                ? this.effects.push(new no(o, 6))
                : (this.effects.push(new no(o, 2)), this.effects.push(new no(i, 4)));
            }
          }
          return (
            (A.prototype.getParentEffects = function () {
              var A = this.effects.slice(0);
              if (this.container.styles.overflowX !== yt.VISIBLE) {
                var e = eo(this.curves),
                  t = to(this.curves);
                Yn(e, t) || A.push(new no(t, 6));
              }
              return A;
            }),
            A
          );
        })(),
        ao = function (A, e) {
          for (
            var t = A instanceof Xr ? A.start : 1, r = A instanceof Xr && A.reversed, n = 0;
            n < e.length;
            n++
          ) {
            var o = e[n];
            (o.container instanceof Vr &&
              'number' == typeof o.container.value &&
              0 !== o.container.value &&
              (t = o.container.value),
              (o.listValue = Kn(t, o.container.styles.listStyleType, !0)),
              (t += r ? -1 : 1));
          }
        },
        so = function (A) {
          var e = new io(A, []),
            t = new oo(e),
            r = [];
          return (
            (function A(e, t, r, n) {
              e.container.elements.forEach(function (o) {
                var i = dr(o.flags, 4),
                  a = dr(o.flags, 2),
                  s = new io(o, e.getParentEffects());
                dr(o.styles.display, 2048) && n.push(s);
                var c = dr(o.flags, 8) ? [] : n;
                if (i || a) {
                  var u = i || o.styles.isPositioned() ? r : t,
                    B = new oo(s);
                  if (o.styles.isPositioned() || o.styles.opacity < 1 || o.styles.isTransformed()) {
                    var l = o.styles.zIndex.order;
                    if (l < 0) {
                      var f = 0;
                      (u.negativeZIndex.some(function (A, e) {
                        return l > A.element.container.styles.zIndex.order ? ((f = e), !1) : f > 0;
                      }),
                        u.negativeZIndex.splice(f, 0, B));
                    } else if (l > 0) {
                      var h = 0;
                      (u.positiveZIndex.some(function (A, e) {
                        return l >= A.element.container.styles.zIndex.order
                          ? ((h = e + 1), !1)
                          : h > 0;
                      }),
                        u.positiveZIndex.splice(h, 0, B));
                    } else u.zeroOrAutoZIndexOrTransformedOrOpacity.push(B);
                  } else
                    o.styles.isFloating()
                      ? u.nonPositionedFloats.push(B)
                      : u.nonPositionedInlineLevel.push(B);
                  A(s, B, i ? B : r, c);
                } else
                  (o.styles.isInlineLevel() ? t.inlineLevel.push(s) : t.nonInlineLevel.push(s),
                    A(s, t, r, c));
                dr(o.flags, 8) && ao(o, c);
              });
            })(e, t, t, r),
            ao(e.container, r),
            t
          );
        },
        co = function (A, e, t, r) {
          var n = [];
          return (
            Zn(A) ? n.push(A.subdivide(0.5, !1)) : n.push(A),
            Zn(t) ? n.push(t.subdivide(0.5, !0)) : n.push(t),
            Zn(r) ? n.push(r.subdivide(0.5, !0).reverse()) : n.push(r),
            Zn(e) ? n.push(e.subdivide(0.5, !1).reverse()) : n.push(e),
            n
          );
        },
        uo = function (A) {
          var e = A.bounds,
            t = A.styles;
          return e.add(
            t.borderLeftWidth,
            t.borderTopWidth,
            -(t.borderRightWidth + t.borderLeftWidth),
            -(t.borderTopWidth + t.borderBottomWidth)
          );
        },
        Bo = function (A) {
          var e = A.styles,
            t = A.bounds,
            r = YA(e.paddingLeft, t.width),
            n = YA(e.paddingRight, t.width),
            o = YA(e.paddingTop, t.width),
            i = YA(e.paddingBottom, t.width);
          return t.add(
            r + e.borderLeftWidth,
            o + e.borderTopWidth,
            -(e.borderRightWidth + e.borderLeftWidth + r + n),
            -(e.borderTopWidth + e.borderBottomWidth + o + i)
          );
        },
        lo = function (A, e, t) {
          var r,
            n,
            o =
              ((r = wo(A.styles.backgroundOrigin, e)),
              (n = A),
              0 === r ? n.bounds : 2 === r ? Bo(n) : uo(n)),
            i = (function (A, e) {
              return A === ae.BORDER_BOX ? e.bounds : A === ae.CONTENT_BOX ? Bo(e) : uo(e);
            })(wo(A.styles.backgroundClip, e), A),
            a = go(wo(A.styles.backgroundSize, e), t, o),
            s = a[0],
            c = a[1],
            u = JA(wo(A.styles.backgroundPosition, e), o.width - s, o.height - c);
          return [
            Eo(wo(A.styles.backgroundRepeat, e), u, a, o, i),
            Math.round(o.left + u[0]),
            Math.round(o.top + u[1]),
            s,
            c,
          ];
        },
        fo = function (A) {
          return KA(A) && A.value === ze.AUTO;
        },
        ho = function (A) {
          return 'number' == typeof A;
        },
        go = function (A, e, t) {
          var r = e[0],
            n = e[1],
            o = e[2],
            i = A[0],
            a = A[1];
          if (VA(i) && a && VA(a)) return [YA(i, t.width), YA(a, t.height)];
          var s = ho(o);
          if (KA(i) && (i.value === ze.CONTAIN || i.value === ze.COVER))
            return ho(o)
              ? t.width / t.height < o != (i.value === ze.COVER)
                ? [t.width, t.width / o]
                : [t.height * o, t.height]
              : [t.width, t.height];
          var c = ho(r),
            u = ho(n),
            B = c || u;
          if (fo(i) && (!a || fo(a)))
            return c && u
              ? [r, n]
              : s || B
                ? B && s
                  ? [c ? r : n * o, u ? n : r / o]
                  : [c ? r : t.width, u ? n : t.height]
                : [t.width, t.height];
          if (s) {
            var l = 0,
              f = 0;
            return (
              VA(i) ? (l = YA(i, t.width)) : VA(a) && (f = YA(a, t.height)),
              fo(i) ? (l = f * o) : (a && !fo(a)) || (f = l / o),
              [l, f]
            );
          }
          var h = null,
            g = null;
          if (
            (VA(i) ? (h = YA(i, t.width)) : a && VA(a) && (g = YA(a, t.height)),
            null === h || (a && !fo(a)) || (g = c && u ? (h / r) * n : t.height),
            null !== g && fo(i) && (h = c && u ? (g / n) * r : t.width),
            null !== h && null !== g)
          )
            return [h, g];
          throw new Error('Unable to calculate background-size for element');
        },
        wo = function (A, e) {
          var t = A[e];
          return void 0 === t ? A[0] : t;
        },
        Eo = function (A, e, t, r, n) {
          var o = e[0],
            i = e[1],
            a = t[0],
            s = t[1];
          switch (A) {
            case De.REPEAT_X:
              return [
                new Wn(Math.round(r.left), Math.round(r.top + i)),
                new Wn(Math.round(r.left + r.width), Math.round(r.top + i)),
                new Wn(Math.round(r.left + r.width), Math.round(s + r.top + i)),
                new Wn(Math.round(r.left), Math.round(s + r.top + i)),
              ];
            case De.REPEAT_Y:
              return [
                new Wn(Math.round(r.left + o), Math.round(r.top)),
                new Wn(Math.round(r.left + o + a), Math.round(r.top)),
                new Wn(Math.round(r.left + o + a), Math.round(r.height + r.top)),
                new Wn(Math.round(r.left + o), Math.round(r.height + r.top)),
              ];
            case De.NO_REPEAT:
              return [
                new Wn(Math.round(r.left + o), Math.round(r.top + i)),
                new Wn(Math.round(r.left + o + a), Math.round(r.top + i)),
                new Wn(Math.round(r.left + o + a), Math.round(r.top + i + s)),
                new Wn(Math.round(r.left + o), Math.round(r.top + i + s)),
              ];
            default:
              return [
                new Wn(Math.round(n.left), Math.round(n.top)),
                new Wn(Math.round(n.left + n.width), Math.round(n.top)),
                new Wn(Math.round(n.left + n.width), Math.round(n.height + n.top)),
                new Wn(Math.round(n.left), Math.round(n.height + n.top)),
              ];
          }
        },
        po = (function () {
          function A(A) {
            ((this._data = {}), (this._document = A));
          }
          return (
            (A.prototype.parseMetrics = function (A, e) {
              var t = this._document.createElement('div'),
                r = this._document.createElement('img'),
                n = this._document.createElement('span'),
                o = this._document.body;
              ((t.style.visibility = 'hidden'),
                (t.style.fontFamily = A),
                (t.style.fontSize = e),
                (t.style.margin = '0'),
                (t.style.padding = '0'),
                o.appendChild(t),
                (r.src =
                  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'),
                (r.width = 1),
                (r.height = 1),
                (r.style.margin = '0'),
                (r.style.padding = '0'),
                (r.style.verticalAlign = 'baseline'),
                (n.style.fontFamily = A),
                (n.style.fontSize = e),
                (n.style.margin = '0'),
                (n.style.padding = '0'),
                n.appendChild(this._document.createTextNode('Hidden Text')),
                t.appendChild(n),
                t.appendChild(r));
              var i = r.offsetTop - n.offsetTop + 2;
              (t.removeChild(n),
                t.appendChild(this._document.createTextNode('Hidden Text')),
                (t.style.lineHeight = 'normal'),
                (r.style.verticalAlign = 'super'));
              var a = r.offsetTop - t.offsetTop + 2;
              return (o.removeChild(t), { baseline: i, middle: a });
            }),
            (A.prototype.getMetrics = function (A, e) {
              var t = A + ' ' + e;
              return (
                void 0 === this._data[t] && (this._data[t] = this.parseMetrics(A, e)),
                this._data[t]
              );
            }),
            A
          );
        })(),
        Qo = (function () {
          function A(A) {
            ((this._activeEffects = []),
              (this.canvas = A.canvas ? A.canvas : document.createElement('canvas')),
              (this.ctx = this.canvas.getContext('2d')),
              (this.options = A),
              A.canvas ||
                ((this.canvas.width = Math.floor(A.width * A.scale)),
                (this.canvas.height = Math.floor(A.height * A.scale)),
                (this.canvas.style.width = A.width + 'px'),
                (this.canvas.style.height = A.height + 'px')),
              (this.fontMetrics = new po(document)),
              this.ctx.scale(this.options.scale, this.options.scale),
              this.ctx.translate(-A.x + A.scrollX, -A.y + A.scrollY),
              (this.ctx.textBaseline = 'bottom'),
              (this._activeEffects = []),
              me
                .getInstance(A.id)
                .debug(
                  'Canvas renderer initialized (' +
                    A.width +
                    'x' +
                    A.height +
                    ' at ' +
                    A.x +
                    ',' +
                    A.y +
                    ') with scale ' +
                    A.scale
                ));
          }
          return (
            (A.prototype.applyEffects = function (A, e) {
              for (var t = this; this._activeEffects.length; ) this.popEffect();
              A.filter(function (A) {
                return dr(A.target, e);
              }).forEach(function (A) {
                return t.applyEffect(A);
              });
            }),
            (A.prototype.applyEffect = function (A) {
              (this.ctx.save(),
                (function (A) {
                  return 0 === A.type;
                })(A) &&
                  (this.ctx.translate(A.offsetX, A.offsetY),
                  this.ctx.transform(
                    A.matrix[0],
                    A.matrix[1],
                    A.matrix[2],
                    A.matrix[3],
                    A.matrix[4],
                    A.matrix[5]
                  ),
                  this.ctx.translate(-A.offsetX, -A.offsetY)),
                (function (A) {
                  return 1 === A.type;
                })(A) && (this.path(A.path), this.ctx.clip()),
                this._activeEffects.push(A));
            }),
            (A.prototype.popEffect = function () {
              (this._activeEffects.pop(), this.ctx.restore());
            }),
            (A.prototype.renderStack = function (A) {
              return r(this, void 0, void 0, function () {
                var e;
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return (e = A.element.container.styles).isVisible()
                        ? ((this.ctx.globalAlpha = e.opacity), [4, this.renderStackContent(A)])
                        : [3, 2];
                    case 1:
                      (t.sent(), (t.label = 2));
                    case 2:
                      return [2];
                  }
                });
              });
            }),
            (A.prototype.renderNode = function (A) {
              return r(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return A.container.styles.isVisible()
                        ? [4, this.renderNodeBackgroundAndBorders(A)]
                        : [3, 3];
                    case 1:
                      return (e.sent(), [4, this.renderNodeContent(A)]);
                    case 2:
                      (e.sent(), (e.label = 3));
                    case 3:
                      return [2];
                  }
                });
              });
            }),
            (A.prototype.renderTextWithLetterSpacing = function (A, e) {
              var t = this;
              0 === e
                ? this.ctx.fillText(A.text, A.bounds.left, A.bounds.top + A.bounds.height)
                : s(A.text)
                    .map(function (A) {
                      return c(A);
                    })
                    .reduce(function (e, r) {
                      return (
                        t.ctx.fillText(r, e, A.bounds.top + A.bounds.height),
                        e + t.ctx.measureText(r).width
                      );
                    }, A.bounds.left);
            }),
            (A.prototype.createFontStyle = function (A) {
              var e = A.fontVariant
                  .filter(function (A) {
                    return 'normal' === A || 'small-caps' === A;
                  })
                  .join(''),
                t = A.fontFamily.join(', '),
                r = bA(A.fontSize)
                  ? '' + A.fontSize.number + A.fontSize.unit
                  : A.fontSize.number + 'px';
              return [[A.fontStyle, e, A.fontWeight, r, t].join(' '), t, r];
            }),
            (A.prototype.renderTextNode = function (A, e) {
              return r(this, void 0, void 0, function () {
                var t,
                  r,
                  o,
                  i,
                  a = this;
                return n(this, function (n) {
                  return (
                    (t = this.createFontStyle(e)),
                    (r = t[0]),
                    (o = t[1]),
                    (i = t[2]),
                    (this.ctx.font = r),
                    A.textBounds.forEach(function (A) {
                      ((a.ctx.fillStyle = ee(e.color)),
                        a.renderTextWithLetterSpacing(A, e.letterSpacing));
                      var t = e.textShadow;
                      (t.length &&
                        A.text.trim().length &&
                        (t
                          .slice(0)
                          .reverse()
                          .forEach(function (e) {
                            ((a.ctx.shadowColor = ee(e.color)),
                              (a.ctx.shadowOffsetX = e.offsetX.number * a.options.scale),
                              (a.ctx.shadowOffsetY = e.offsetY.number * a.options.scale),
                              (a.ctx.shadowBlur = e.blur.number),
                              a.ctx.fillText(
                                A.text,
                                A.bounds.left,
                                A.bounds.top + A.bounds.height
                              ));
                          }),
                        (a.ctx.shadowColor = ''),
                        (a.ctx.shadowOffsetX = 0),
                        (a.ctx.shadowOffsetY = 0),
                        (a.ctx.shadowBlur = 0)),
                        e.textDecorationLine.length &&
                          ((a.ctx.fillStyle = ee(e.textDecorationColor || e.color)),
                          e.textDecorationLine.forEach(function (e) {
                            switch (e) {
                              case 1:
                                var t = a.fontMetrics.getMetrics(o, i).baseline;
                                a.ctx.fillRect(
                                  A.bounds.left,
                                  Math.round(A.bounds.top + t),
                                  A.bounds.width,
                                  1
                                );
                                break;
                              case 2:
                                a.ctx.fillRect(
                                  A.bounds.left,
                                  Math.round(A.bounds.top),
                                  A.bounds.width,
                                  1
                                );
                                break;
                              case 3:
                                var r = a.fontMetrics.getMetrics(o, i).middle;
                                a.ctx.fillRect(
                                  A.bounds.left,
                                  Math.ceil(A.bounds.top + r),
                                  A.bounds.width,
                                  1
                                );
                            }
                          })));
                    }),
                    [2]
                  );
                });
              });
            }),
            (A.prototype.renderReplacedElement = function (A, e, t) {
              if (t && A.intrinsicWidth > 0 && A.intrinsicHeight > 0) {
                var r = Bo(A),
                  n = to(e);
                (this.path(n),
                  this.ctx.save(),
                  this.ctx.clip(),
                  this.ctx.drawImage(
                    t,
                    0,
                    0,
                    A.intrinsicWidth,
                    A.intrinsicHeight,
                    r.left,
                    r.top,
                    r.width,
                    r.height
                  ),
                  this.ctx.restore());
              }
            }),
            (A.prototype.renderNodeContent = function (e) {
              return r(this, void 0, void 0, function () {
                var t, r, i, a, s, c, u, B, l, h, g, w, d, E;
                return n(this, function (n) {
                  switch (n.label) {
                    case 0:
                      (this.applyEffects(e.effects, 4),
                        (t = e.container),
                        (r = e.curves),
                        (i = t.styles),
                        (a = 0),
                        (s = t.textNodes),
                        (n.label = 1));
                    case 1:
                      return a < s.length ? ((c = s[a]), [4, this.renderTextNode(c, i)]) : [3, 4];
                    case 2:
                      (n.sent(), (n.label = 3));
                    case 3:
                      return (a++, [3, 1]);
                    case 4:
                      if (!(t instanceof Dr)) return [3, 8];
                      n.label = 5;
                    case 5:
                      return (n.trys.push([5, 7, , 8]), [4, this.options.cache.match(t.src)]);
                    case 6:
                      return ((w = n.sent()), this.renderReplacedElement(t, r, w), [3, 8]);
                    case 7:
                      return (
                        n.sent(),
                        me.getInstance(this.options.id).error('Error loading image ' + t.src),
                        [3, 8]
                      );
                    case 8:
                      if (
                        (t instanceof xr && this.renderReplacedElement(t, r, t.canvas),
                        !(t instanceof Pr))
                      )
                        return [3, 12];
                      n.label = 9;
                    case 9:
                      return (n.trys.push([9, 11, , 12]), [4, this.options.cache.match(t.svg)]);
                    case 10:
                      return ((w = n.sent()), this.renderReplacedElement(t, r, w), [3, 12]);
                    case 11:
                      return (
                        n.sent(),
                        me
                          .getInstance(this.options.id)
                          .error('Error loading svg ' + t.svg.substring(0, 255)),
                        [3, 12]
                      );
                    case 12:
                      return t instanceof en && t.tree
                        ? [
                            4,
                            new A({
                              id: this.options.id,
                              scale: this.options.scale,
                              backgroundColor: t.backgroundColor,
                              x: 0,
                              y: 0,
                              scrollX: 0,
                              scrollY: 0,
                              width: t.width,
                              height: t.height,
                              cache: this.options.cache,
                              windowWidth: t.width,
                              windowHeight: t.height,
                            }).render(t.tree),
                          ]
                        : [3, 14];
                    case 13:
                      ((u = n.sent()),
                        t.width &&
                          t.height &&
                          this.ctx.drawImage(
                            u,
                            0,
                            0,
                            t.width,
                            t.height,
                            t.bounds.left,
                            t.bounds.top,
                            t.bounds.width,
                            t.bounds.height
                          ),
                        (n.label = 14));
                    case 14:
                      if (
                        (t instanceof qr &&
                          ((B = Math.min(t.bounds.width, t.bounds.height)),
                          t.type === Yr
                            ? t.checked &&
                              (this.ctx.save(),
                              this.path([
                                new Wn(t.bounds.left + 0.39363 * B, t.bounds.top + 0.79 * B),
                                new Wn(t.bounds.left + 0.16 * B, t.bounds.top + 0.5549 * B),
                                new Wn(t.bounds.left + 0.27347 * B, t.bounds.top + 0.44071 * B),
                                new Wn(t.bounds.left + 0.39694 * B, t.bounds.top + 0.5649 * B),
                                new Wn(t.bounds.left + 0.72983 * B, t.bounds.top + 0.23 * B),
                                new Wn(t.bounds.left + 0.84 * B, t.bounds.top + 0.34085 * B),
                                new Wn(t.bounds.left + 0.39363 * B, t.bounds.top + 0.79 * B),
                              ]),
                              (this.ctx.fillStyle = ee(707406591)),
                              this.ctx.fill(),
                              this.ctx.restore())
                            : t.type === Wr &&
                              t.checked &&
                              (this.ctx.save(),
                              this.ctx.beginPath(),
                              this.ctx.arc(
                                t.bounds.left + B / 2,
                                t.bounds.top + B / 2,
                                B / 4,
                                0,
                                2 * Math.PI,
                                !0
                              ),
                              (this.ctx.fillStyle = ee(707406591)),
                              this.ctx.fill(),
                              this.ctx.restore())),
                        Uo(t) && t.value.length)
                      ) {
                        switch (
                          ((this.ctx.font = this.createFontStyle(i)[0]),
                          (this.ctx.fillStyle = ee(i.color)),
                          (this.ctx.textBaseline = 'middle'),
                          (this.ctx.textAlign = Fo(t.styles.textAlign)),
                          (E = Bo(t)),
                          (l = 0),
                          t.styles.textAlign)
                        ) {
                          case Mt.CENTER:
                            l += E.width / 2;
                            break;
                          case Mt.RIGHT:
                            l += E.width;
                        }
                        ((h = E.add(l, 0, 0, -E.height / 2 + 1)),
                          this.ctx.save(),
                          this.path([
                            new Wn(E.left, E.top),
                            new Wn(E.left + E.width, E.top),
                            new Wn(E.left + E.width, E.top + E.height),
                            new Wn(E.left, E.top + E.height),
                          ]),
                          this.ctx.clip(),
                          this.renderTextWithLetterSpacing(new yr(t.value, h), i.letterSpacing),
                          this.ctx.restore(),
                          (this.ctx.textBaseline = 'bottom'),
                          (this.ctx.textAlign = 'left'));
                      }
                      if (!dr(t.styles.display, 2048)) return [3, 20];
                      if (null === t.styles.listStyleImage) return [3, 19];
                      if ((g = t.styles.listStyleImage).type !== Be.URL) return [3, 18];
                      ((w = void 0), (d = g.url), (n.label = 15));
                    case 15:
                      return (n.trys.push([15, 17, , 18]), [4, this.options.cache.match(d)]);
                    case 16:
                      return (
                        (w = n.sent()),
                        this.ctx.drawImage(w, t.bounds.left - (w.width + 10), t.bounds.top),
                        [3, 18]
                      );
                    case 17:
                      return (
                        n.sent(),
                        me
                          .getInstance(this.options.id)
                          .error('Error loading list-style-image ' + d),
                        [3, 18]
                      );
                    case 18:
                      return [3, 20];
                    case 19:
                      (e.listValue &&
                        t.styles.listStyleType !== Tt.NONE &&
                        ((this.ctx.font = this.createFontStyle(i)[0]),
                        (this.ctx.fillStyle = ee(i.color)),
                        (this.ctx.textBaseline = 'middle'),
                        (this.ctx.textAlign = 'right'),
                        (E = new o(
                          t.bounds.left,
                          t.bounds.top + YA(t.styles.paddingTop, t.bounds.width),
                          t.bounds.width,
                          ((p = i.lineHeight),
                          (Q = i.fontSize.number),
                          (KA(p) && 'normal' === p.value
                            ? 1.2 * Q
                            : p.type === f.NUMBER_TOKEN
                              ? Q * p.number
                              : VA(p)
                                ? YA(p, Q)
                                : Q) /
                            2 +
                            1)
                        )),
                        this.renderTextWithLetterSpacing(new yr(e.listValue, E), i.letterSpacing),
                        (this.ctx.textBaseline = 'bottom'),
                        (this.ctx.textAlign = 'left')),
                        (n.label = 20));
                    case 20:
                      return [2];
                  }
                  var p, Q;
                });
              });
            }),
            (A.prototype.renderStackContent = function (A) {
              return r(this, void 0, void 0, function () {
                var e, t, r, o, i, a, s, c, u, B, l, f, h, g, w;
                return n(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return [4, this.renderNodeBackgroundAndBorders(A.element)];
                    case 1:
                      (n.sent(), (e = 0), (t = A.negativeZIndex), (n.label = 2));
                    case 2:
                      return e < t.length ? ((w = t[e]), [4, this.renderStack(w)]) : [3, 5];
                    case 3:
                      (n.sent(), (n.label = 4));
                    case 4:
                      return (e++, [3, 2]);
                    case 5:
                      return [4, this.renderNodeContent(A.element)];
                    case 6:
                      (n.sent(), (r = 0), (o = A.nonInlineLevel), (n.label = 7));
                    case 7:
                      return r < o.length ? ((w = o[r]), [4, this.renderNode(w)]) : [3, 10];
                    case 8:
                      (n.sent(), (n.label = 9));
                    case 9:
                      return (r++, [3, 7]);
                    case 10:
                      ((i = 0), (a = A.nonPositionedFloats), (n.label = 11));
                    case 11:
                      return i < a.length ? ((w = a[i]), [4, this.renderStack(w)]) : [3, 14];
                    case 12:
                      (n.sent(), (n.label = 13));
                    case 13:
                      return (i++, [3, 11]);
                    case 14:
                      ((s = 0), (c = A.nonPositionedInlineLevel), (n.label = 15));
                    case 15:
                      return s < c.length ? ((w = c[s]), [4, this.renderStack(w)]) : [3, 18];
                    case 16:
                      (n.sent(), (n.label = 17));
                    case 17:
                      return (s++, [3, 15]);
                    case 18:
                      ((u = 0), (B = A.inlineLevel), (n.label = 19));
                    case 19:
                      return u < B.length ? ((w = B[u]), [4, this.renderNode(w)]) : [3, 22];
                    case 20:
                      (n.sent(), (n.label = 21));
                    case 21:
                      return (u++, [3, 19]);
                    case 22:
                      ((l = 0), (f = A.zeroOrAutoZIndexOrTransformedOrOpacity), (n.label = 23));
                    case 23:
                      return l < f.length ? ((w = f[l]), [4, this.renderStack(w)]) : [3, 26];
                    case 24:
                      (n.sent(), (n.label = 25));
                    case 25:
                      return (l++, [3, 23]);
                    case 26:
                      ((h = 0), (g = A.positiveZIndex), (n.label = 27));
                    case 27:
                      return h < g.length ? ((w = g[h]), [4, this.renderStack(w)]) : [3, 30];
                    case 28:
                      (n.sent(), (n.label = 29));
                    case 29:
                      return (h++, [3, 27]);
                    case 30:
                      return [2];
                  }
                });
              });
            }),
            (A.prototype.mask = function (A) {
              (this.ctx.beginPath(),
                this.ctx.moveTo(0, 0),
                this.ctx.lineTo(this.canvas.width, 0),
                this.ctx.lineTo(this.canvas.width, this.canvas.height),
                this.ctx.lineTo(0, this.canvas.height),
                this.ctx.lineTo(0, 0),
                this.formatPath(A.slice(0).reverse()),
                this.ctx.closePath());
            }),
            (A.prototype.path = function (A) {
              (this.ctx.beginPath(), this.formatPath(A), this.ctx.closePath());
            }),
            (A.prototype.formatPath = function (A) {
              var e = this;
              A.forEach(function (A, t) {
                var r = Zn(A) ? A.start : A;
                (0 === t ? e.ctx.moveTo(r.x, r.y) : e.ctx.lineTo(r.x, r.y),
                  Zn(A) &&
                    e.ctx.bezierCurveTo(
                      A.startControl.x,
                      A.startControl.y,
                      A.endControl.x,
                      A.endControl.y,
                      A.end.x,
                      A.end.y
                    ));
              });
            }),
            (A.prototype.renderRepeat = function (A, e, t, r) {
              (this.path(A),
                (this.ctx.fillStyle = e),
                this.ctx.translate(t, r),
                this.ctx.fill(),
                this.ctx.translate(-t, -r));
            }),
            (A.prototype.resizeImage = function (A, e, t) {
              if (A.width === e && A.height === t) return A;
              var r = this.canvas.ownerDocument.createElement('canvas');
              return (
                (r.width = e),
                (r.height = t),
                r.getContext('2d').drawImage(A, 0, 0, A.width, A.height, 0, 0, e, t),
                r
              );
            }),
            (A.prototype.renderBackgroundImage = function (A) {
              return r(this, void 0, void 0, function () {
                var e, t, r, o, i, a;
                return n(this, function (s) {
                  switch (s.label) {
                    case 0:
                      ((e = A.styles.backgroundImage.length - 1),
                        (t = function (t) {
                          var o,
                            i,
                            a,
                            s,
                            c,
                            u,
                            B,
                            l,
                            f,
                            h,
                            g,
                            w,
                            d,
                            E,
                            p,
                            Q,
                            U,
                            C,
                            F,
                            m,
                            _,
                            H,
                            T,
                            v,
                            y,
                            N,
                            I,
                            b,
                            R,
                            K,
                            S;
                          return n(this, function (n) {
                            switch (n.label) {
                              case 0:
                                if (t.type !== Be.URL) return [3, 5];
                                ((o = void 0), (i = t.url), (n.label = 1));
                              case 1:
                                return (n.trys.push([1, 3, , 4]), [4, r.options.cache.match(i)]);
                              case 2:
                                return ((o = n.sent()), [3, 4]);
                              case 3:
                                return (
                                  n.sent(),
                                  me
                                    .getInstance(r.options.id)
                                    .error('Error loading background-image ' + i),
                                  [3, 4]
                                );
                              case 4:
                                return (
                                  o &&
                                    ((a = lo(A, e, [o.width, o.height, o.width / o.height])),
                                    (Q = a[0]),
                                    (H = a[1]),
                                    (T = a[2]),
                                    (F = a[3]),
                                    (m = a[4]),
                                    (E = r.ctx.createPattern(r.resizeImage(o, F, m), 'repeat')),
                                    r.renderRepeat(Q, E, H, T)),
                                  [3, 6]
                                );
                              case 5:
                                (t.type === Be.LINEAR_GRADIENT
                                  ? ((s = lo(A, e, [null, null, null])),
                                    (Q = s[0]),
                                    (H = s[1]),
                                    (T = s[2]),
                                    (F = s[3]),
                                    (m = s[4]),
                                    (c = we(t.angle, F, m)),
                                    (u = c[0]),
                                    (B = c[1]),
                                    (l = c[2]),
                                    (f = c[3]),
                                    (h = c[4]),
                                    ((g = document.createElement('canvas')).width = F),
                                    (g.height = m),
                                    (w = g.getContext('2d')),
                                    (d = w.createLinearGradient(B, f, l, h)),
                                    ge(t.stops, u).forEach(function (A) {
                                      return d.addColorStop(A.stop, ee(A.color));
                                    }),
                                    (w.fillStyle = d),
                                    w.fillRect(0, 0, F, m),
                                    F > 0 &&
                                      m > 0 &&
                                      ((E = r.ctx.createPattern(g, 'repeat')),
                                      r.renderRepeat(Q, E, H, T)))
                                  : (function (A) {
                                      return A.type === Be.RADIAL_GRADIENT;
                                    })(t) &&
                                    ((p = lo(A, e, [null, null, null])),
                                    (Q = p[0]),
                                    (U = p[1]),
                                    (C = p[2]),
                                    (F = p[3]),
                                    (m = p[4]),
                                    (_ = 0 === t.position.length ? [kA] : t.position),
                                    (H = YA(_[0], F)),
                                    (T = YA(_[_.length - 1], m)),
                                    (v = (function (A, e, t, r, n) {
                                      var o = 0,
                                        i = 0;
                                      switch (A.size) {
                                        case Oe.CLOSEST_SIDE:
                                          A.shape === Le.CIRCLE
                                            ? (o = i =
                                                Math.min(
                                                  Math.abs(e),
                                                  Math.abs(e - r),
                                                  Math.abs(t),
                                                  Math.abs(t - n)
                                                ))
                                            : A.shape === Le.ELLIPSE &&
                                              ((o = Math.min(Math.abs(e), Math.abs(e - r))),
                                              (i = Math.min(Math.abs(t), Math.abs(t - n))));
                                          break;
                                        case Oe.CLOSEST_CORNER:
                                          if (A.shape === Le.CIRCLE)
                                            o = i = Math.min(
                                              de(e, t),
                                              de(e, t - n),
                                              de(e - r, t),
                                              de(e - r, t - n)
                                            );
                                          else if (A.shape === Le.ELLIPSE) {
                                            var a =
                                                Math.min(Math.abs(t), Math.abs(t - n)) /
                                                Math.min(Math.abs(e), Math.abs(e - r)),
                                              s = Ee(r, n, e, t, !0),
                                              c = s[0],
                                              u = s[1];
                                            i = a * (o = de(c - e, (u - t) / a));
                                          }
                                          break;
                                        case Oe.FARTHEST_SIDE:
                                          A.shape === Le.CIRCLE
                                            ? (o = i =
                                                Math.max(
                                                  Math.abs(e),
                                                  Math.abs(e - r),
                                                  Math.abs(t),
                                                  Math.abs(t - n)
                                                ))
                                            : A.shape === Le.ELLIPSE &&
                                              ((o = Math.max(Math.abs(e), Math.abs(e - r))),
                                              (i = Math.max(Math.abs(t), Math.abs(t - n))));
                                          break;
                                        case Oe.FARTHEST_CORNER:
                                          if (A.shape === Le.CIRCLE)
                                            o = i = Math.max(
                                              de(e, t),
                                              de(e, t - n),
                                              de(e - r, t),
                                              de(e - r, t - n)
                                            );
                                          else if (A.shape === Le.ELLIPSE) {
                                            a =
                                              Math.max(Math.abs(t), Math.abs(t - n)) /
                                              Math.max(Math.abs(e), Math.abs(e - r));
                                            var B = Ee(r, n, e, t, !1);
                                            ((c = B[0]),
                                              (u = B[1]),
                                              (i = a * (o = de(c - e, (u - t) / a))));
                                          }
                                      }
                                      return (
                                        Array.isArray(A.size) &&
                                          ((o = YA(A.size[0], r)),
                                          (i = 2 === A.size.length ? YA(A.size[1], n) : o)),
                                        [o, i]
                                      );
                                    })(t, H, T, F, m)),
                                    (y = v[0]),
                                    (N = v[1]),
                                    y > 0 &&
                                      y > 0 &&
                                      ((I = r.ctx.createRadialGradient(
                                        U + H,
                                        C + T,
                                        0,
                                        U + H,
                                        C + T,
                                        y
                                      )),
                                      ge(t.stops, 2 * y).forEach(function (A) {
                                        return I.addColorStop(A.stop, ee(A.color));
                                      }),
                                      r.path(Q),
                                      (r.ctx.fillStyle = I),
                                      y !== N
                                        ? ((b = A.bounds.left + 0.5 * A.bounds.width),
                                          (R = A.bounds.top + 0.5 * A.bounds.height),
                                          (S = 1 / (K = N / y)),
                                          r.ctx.save(),
                                          r.ctx.translate(b, R),
                                          r.ctx.transform(1, 0, 0, K, 0, 0),
                                          r.ctx.translate(-b, -R),
                                          r.ctx.fillRect(U, S * (C - R) + R, F, m * S),
                                          r.ctx.restore())
                                        : r.ctx.fill())),
                                  (n.label = 6));
                              case 6:
                                return (e--, [2]);
                            }
                          });
                        }),
                        (r = this),
                        (o = 0),
                        (i = A.styles.backgroundImage.slice(0).reverse()),
                        (s.label = 1));
                    case 1:
                      return o < i.length ? ((a = i[o]), [5, t(a)]) : [3, 4];
                    case 2:
                      (s.sent(), (s.label = 3));
                    case 3:
                      return (o++, [3, 1]);
                    case 4:
                      return [2];
                  }
                });
              });
            }),
            (A.prototype.renderBorder = function (A, e, t) {
              return r(this, void 0, void 0, function () {
                return n(this, function (r) {
                  return (
                    this.path(
                      (function (A, e) {
                        switch (e) {
                          case 0:
                            return co(
                              A.topLeftBorderBox,
                              A.topLeftPaddingBox,
                              A.topRightBorderBox,
                              A.topRightPaddingBox
                            );
                          case 1:
                            return co(
                              A.topRightBorderBox,
                              A.topRightPaddingBox,
                              A.bottomRightBorderBox,
                              A.bottomRightPaddingBox
                            );
                          case 2:
                            return co(
                              A.bottomRightBorderBox,
                              A.bottomRightPaddingBox,
                              A.bottomLeftBorderBox,
                              A.bottomLeftPaddingBox
                            );
                          case 3:
                          default:
                            return co(
                              A.bottomLeftBorderBox,
                              A.bottomLeftPaddingBox,
                              A.topLeftBorderBox,
                              A.topLeftPaddingBox
                            );
                        }
                      })(t, e)
                    ),
                    (this.ctx.fillStyle = ee(A)),
                    this.ctx.fill(),
                    [2]
                  );
                });
              });
            }),
            (A.prototype.renderNodeBackgroundAndBorders = function (A) {
              return r(this, void 0, void 0, function () {
                var e,
                  t,
                  r,
                  o,
                  i,
                  a,
                  s,
                  c,
                  u = this;
                return n(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        this.applyEffects(A.effects, 2),
                        (e = A.container.styles),
                        (t = !Ae(e.backgroundColor) || e.backgroundImage.length),
                        (r = [
                          { style: e.borderTopStyle, color: e.borderTopColor },
                          { style: e.borderRightStyle, color: e.borderRightColor },
                          { style: e.borderBottomStyle, color: e.borderBottomColor },
                          { style: e.borderLeftStyle, color: e.borderLeftColor },
                        ]),
                        (o = Co(wo(e.backgroundClip, 0), A.curves)),
                        t || e.boxShadow.length
                          ? (this.ctx.save(),
                            this.path(o),
                            this.ctx.clip(),
                            Ae(e.backgroundColor) ||
                              ((this.ctx.fillStyle = ee(e.backgroundColor)), this.ctx.fill()),
                            [4, this.renderBackgroundImage(A.container)])
                          : [3, 2]
                      );
                    case 1:
                      (n.sent(),
                        this.ctx.restore(),
                        e.boxShadow
                          .slice(0)
                          .reverse()
                          .forEach(function (e) {
                            u.ctx.save();
                            var t,
                              r,
                              n,
                              o,
                              i,
                              a = eo(A.curves),
                              s = e.inset ? 0 : 1e4,
                              c =
                                ((t = a),
                                (r = -s + (e.inset ? 1 : -1) * e.spread.number),
                                (n = (e.inset ? 1 : -1) * e.spread.number),
                                (o = e.spread.number * (e.inset ? -2 : 2)),
                                (i = e.spread.number * (e.inset ? -2 : 2)),
                                t.map(function (A, e) {
                                  switch (e) {
                                    case 0:
                                      return A.add(r, n);
                                    case 1:
                                      return A.add(r + o, n);
                                    case 2:
                                      return A.add(r + o, n + i);
                                    case 3:
                                      return A.add(r, n + i);
                                  }
                                  return A;
                                }));
                            (e.inset
                              ? (u.path(a), u.ctx.clip(), u.mask(c))
                              : (u.mask(a), u.ctx.clip(), u.path(c)),
                              (u.ctx.shadowOffsetX = e.offsetX.number + s),
                              (u.ctx.shadowOffsetY = e.offsetY.number),
                              (u.ctx.shadowColor = ee(e.color)),
                              (u.ctx.shadowBlur = e.blur.number),
                              (u.ctx.fillStyle = e.inset ? ee(e.color) : 'rgba(0,0,0,1)'),
                              u.ctx.fill(),
                              u.ctx.restore());
                          }),
                        (n.label = 2));
                    case 2:
                      ((i = 0), (a = 0), (s = r), (n.label = 3));
                    case 3:
                      return a < s.length
                        ? (c = s[a]).style === Je.NONE || Ae(c.color)
                          ? [3, 5]
                          : [4, this.renderBorder(c.color, i, A.curves)]
                        : [3, 7];
                    case 4:
                      (n.sent(), (n.label = 5));
                    case 5:
                      (i++, (n.label = 6));
                    case 6:
                      return (a++, [3, 3]);
                    case 7:
                      return [2];
                  }
                });
              });
            }),
            (A.prototype.render = function (A) {
              return r(this, void 0, void 0, function () {
                var e;
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return (
                        this.options.backgroundColor &&
                          ((this.ctx.fillStyle = ee(this.options.backgroundColor)),
                          this.ctx.fillRect(
                            this.options.x - this.options.scrollX,
                            this.options.y - this.options.scrollY,
                            this.options.width,
                            this.options.height
                          )),
                        (e = so(A)),
                        [4, this.renderStack(e)]
                      );
                    case 1:
                      return (t.sent(), this.applyEffects([], 2), [2, this.canvas]);
                  }
                });
              });
            }),
            A
          );
        })(),
        Uo = function (A) {
          return (
            A instanceof $r ||
            A instanceof Zr ||
            (A instanceof qr && A.type !== Wr && A.type !== Yr)
          );
        },
        Co = function (A, e) {
          switch (A) {
            case ae.BORDER_BOX:
              return eo(e);
            case ae.CONTENT_BOX:
              return (function (A) {
                return [
                  A.topLeftContentBox,
                  A.topRightContentBox,
                  A.bottomRightContentBox,
                  A.bottomLeftContentBox,
                ];
              })(e);
            case ae.PADDING_BOX:
            default:
              return to(e);
          }
        },
        Fo = function (A) {
          switch (A) {
            case Mt.CENTER:
              return 'center';
            case Mt.RIGHT:
              return 'right';
            case Mt.LEFT:
            default:
              return 'left';
          }
        },
        mo = (function () {
          function A(A) {
            ((this.canvas = A.canvas ? A.canvas : document.createElement('canvas')),
              (this.ctx = this.canvas.getContext('2d')),
              (this.options = A),
              (this.canvas.width = Math.floor(A.width * A.scale)),
              (this.canvas.height = Math.floor(A.height * A.scale)),
              (this.canvas.style.width = A.width + 'px'),
              (this.canvas.style.height = A.height + 'px'),
              this.ctx.scale(this.options.scale, this.options.scale),
              this.ctx.translate(-A.x + A.scrollX, -A.y + A.scrollY),
              me
                .getInstance(A.id)
                .debug(
                  'EXPERIMENTAL ForeignObject renderer initialized (' +
                    A.width +
                    'x' +
                    A.height +
                    ' at ' +
                    A.x +
                    ',' +
                    A.y +
                    ') with scale ' +
                    A.scale
                ));
          }
          return (
            (A.prototype.render = function (A) {
              return r(this, void 0, void 0, function () {
                var e, t;
                return n(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        (e = Ue(
                          Math.max(this.options.windowWidth, this.options.width) *
                            this.options.scale,
                          Math.max(this.options.windowHeight, this.options.height) *
                            this.options.scale,
                          this.options.scrollX * this.options.scale,
                          this.options.scrollY * this.options.scale,
                          A
                        )),
                        [4, _o(e)]
                      );
                    case 1:
                      return (
                        (t = r.sent()),
                        this.options.backgroundColor &&
                          ((this.ctx.fillStyle = ee(this.options.backgroundColor)),
                          this.ctx.fillRect(
                            0,
                            0,
                            this.options.width * this.options.scale,
                            this.options.height * this.options.scale
                          )),
                        this.ctx.drawImage(
                          t,
                          -this.options.x * this.options.scale,
                          -this.options.y * this.options.scale
                        ),
                        [2, this.canvas]
                      );
                  }
                });
              });
            }),
            A
          );
        })(),
        _o = function (A) {
          return new Promise(function (e, t) {
            var r = new Image();
            ((r.onload = function () {
              e(r);
            }),
              (r.onerror = t),
              (r.src =
                'data:image/svg+xml;charset=utf-8,' +
                encodeURIComponent(new XMLSerializer().serializeToString(A))));
          });
        },
        Ho = function (A) {
          return $A(IA.create(A).parseComponentValue());
        };
      'undefined' != typeof window && _e.setContext(window);
      var To = function (A, e) {
        return r(void 0, void 0, void 0, function () {
          var r, i, s, c, u, B, l, f, h, g, w, d, E, p, Q, U, C, F, m, _, H, T, v;
          return n(this, function (n) {
            switch (n.label) {
              case 0:
                if (!(r = A.ownerDocument))
                  throw new Error('Element is not attached to a Document');
                if (!(i = r.defaultView)) throw new Error('Document is not attached to a Window');
                return (
                  (s = (Math.round(1e3 * Math.random()) + Date.now()).toString(16)),
                  (c =
                    wn(A) || 'HTML' === A.tagName
                      ? (function (A) {
                          var e = A.body,
                            t = A.documentElement;
                          if (!e || !t) throw new Error('Unable to get document size');
                          var r = Math.max(
                              Math.max(e.scrollWidth, t.scrollWidth),
                              Math.max(e.offsetWidth, t.offsetWidth),
                              Math.max(e.clientWidth, t.clientWidth)
                            ),
                            n = Math.max(
                              Math.max(e.scrollHeight, t.scrollHeight),
                              Math.max(e.offsetHeight, t.offsetHeight),
                              Math.max(e.clientHeight, t.clientHeight)
                            );
                          return new o(0, 0, r, n);
                        })(r)
                      : a(A)),
                  (u = c.width),
                  (B = c.height),
                  (l = c.left),
                  (f = c.top),
                  (h = t(
                    {},
                    { allowTaint: !1, imageTimeout: 15e3, proxy: void 0, useCORS: !1 },
                    e
                  )),
                  (g = {
                    backgroundColor: '#ffffff',
                    cache: e.cache ? e.cache : _e.create(s, h),
                    logging: !0,
                    removeContainer: !0,
                    foreignObjectRendering: !1,
                    scale: i.devicePixelRatio || 1,
                    windowWidth: i.innerWidth,
                    windowHeight: i.innerHeight,
                    scrollX: i.pageXOffset,
                    scrollY: i.pageYOffset,
                    x: l,
                    y: f,
                    width: Math.ceil(u),
                    height: Math.ceil(B),
                    id: s,
                  }),
                  (w = t({}, g, h, e)),
                  (d = new o(w.scrollX, w.scrollY, w.windowWidth, w.windowHeight)),
                  me.create({ id: s, enabled: w.logging }),
                  me.getInstance(s).debug('Starting document clone'),
                  (E = new Sn(A, {
                    id: s,
                    onclone: w.onclone,
                    ignoreElements: w.ignoreElements,
                    inlineImages: w.foreignObjectRendering,
                    copyStyles: w.foreignObjectRendering,
                  })),
                  (p = E.clonedReferenceElement)
                    ? [4, E.toIFrame(r, d)]
                    : [2, Promise.reject('Unable to find element in cloned iframe')]
                );
              case 1:
                return (
                  (Q = n.sent()),
                  (U = r.documentElement
                    ? Ho(getComputedStyle(r.documentElement).backgroundColor)
                    : ue.TRANSPARENT),
                  (C = r.body ? Ho(getComputedStyle(r.body).backgroundColor) : ue.TRANSPARENT),
                  (F = e.backgroundColor),
                  (m = 'string' == typeof F ? Ho(F) : null === F ? ue.TRANSPARENT : 4294967295),
                  (_ = A === r.documentElement ? (Ae(U) ? (Ae(C) ? m : C) : U) : m),
                  (H = {
                    id: s,
                    cache: w.cache,
                    canvas: w.canvas,
                    backgroundColor: _,
                    scale: w.scale,
                    x: w.x,
                    y: w.y,
                    scrollX: w.scrollX,
                    scrollY: w.scrollY,
                    width: w.width,
                    height: w.height,
                    windowWidth: w.windowWidth,
                    windowHeight: w.windowHeight,
                  }),
                  w.foreignObjectRendering
                    ? (me.getInstance(s).debug('Document cloned, using foreign object rendering'),
                      [4, new mo(H).render(p)])
                    : [3, 3]
                );
              case 2:
                return ((T = n.sent()), [3, 5]);
              case 3:
                return (
                  me.getInstance(s).debug('Document cloned, using computed rendering'),
                  _e.attachInstance(w.cache),
                  me.getInstance(s).debug('Starting DOM parsing'),
                  (v = nn(p)),
                  _e.detachInstance(),
                  _ === v.styles.backgroundColor && (v.styles.backgroundColor = ue.TRANSPARENT),
                  me.getInstance(s).debug('Starting renderer'),
                  [4, new Qo(H).render(v)]
                );
              case 4:
                ((T = n.sent()), (n.label = 5));
              case 5:
                return (
                  !0 === w.removeContainer &&
                    (Sn.destroy(Q) ||
                      me
                        .getInstance(s)
                        .error('Cannot detach cloned iframe as it is not in the DOM anymore')),
                  me.getInstance(s).debug('Finished rendering'),
                  me.destroy(s),
                  _e.destroy(s),
                  [2, T]
                );
            }
          });
        });
      };
      return function (A, e) {
        return (void 0 === e && (e = {}), To(A, e));
      };
    }),
      'object' === i(e) && void 0 !== A
        ? (A.exports = o())
        : void 0 === (n = 'function' == typeof (r = o) ? r.call(e, t, e, A) : r) ||
          (A.exports = n));
  },
  eWjs: function (A, e, t) {
    'use strict';
    'use restrict';
    function r(A) {
      var e = 32;
      return (
        (A &= -A) && e--,
        65535 & A && (e -= 16),
        16711935 & A && (e -= 8),
        252645135 & A && (e -= 4),
        858993459 & A && (e -= 2),
        1431655765 & A && (e -= 1),
        e
      );
    }
    ((e.INT_BITS = 32),
      (e.INT_MAX = 2147483647),
      (e.INT_MIN = -1 << 31),
      (e.sign = function (A) {
        return (A > 0) - (A < 0);
      }),
      (e.abs = function (A) {
        var e = A >> 31;
        return (A ^ e) - e;
      }),
      (e.min = function (A, e) {
        return e ^ ((A ^ e) & -(A < e));
      }),
      (e.max = function (A, e) {
        return A ^ ((A ^ e) & -(A < e));
      }),
      (e.isPow2 = function (A) {
        return !(A & (A - 1) || !A);
      }),
      (e.log2 = function (A) {
        var e, t;
        return (
          (e = (A > 65535) << 4),
          (e |= t = ((A >>>= e) > 255) << 3),
          (e |= t = ((A >>>= t) > 15) << 2),
          (e |= t = ((A >>>= t) > 3) << 1) | ((A >>>= t) >> 1)
        );
      }),
      (e.log10 = function (A) {
        return A >= 1e9
          ? 9
          : A >= 1e8
            ? 8
            : A >= 1e7
              ? 7
              : A >= 1e6
                ? 6
                : A >= 1e5
                  ? 5
                  : A >= 1e4
                    ? 4
                    : A >= 1e3
                      ? 3
                      : A >= 100
                        ? 2
                        : A >= 10
                          ? 1
                          : 0;
      }),
      (e.popCount = function (A) {
        return (
          (16843009 *
            (((A = (858993459 & (A -= (A >>> 1) & 1431655765)) + ((A >>> 2) & 858993459)) +
              (A >>> 4)) &
              252645135)) >>>
          24
        );
      }),
      (e.countTrailingZeros = r),
      (e.nextPow2 = function (A) {
        return (
          (A += 0 === A),
          --A,
          (A |= A >>> 1),
          (A |= A >>> 2),
          (A |= A >>> 4),
          (A |= A >>> 8),
          (A |= A >>> 16) + 1
        );
      }),
      (e.prevPow2 = function (A) {
        return (
          (A |= A >>> 1),
          (A |= A >>> 2),
          (A |= A >>> 4),
          (A |= A >>> 8),
          (A |= A >>> 16) - (A >>> 1)
        );
      }),
      (e.parity = function (A) {
        return ((A ^= A >>> 16), (A ^= A >>> 8), (A ^= A >>> 4), (27030 >>> (A &= 15)) & 1);
      }));
    var n = new Array(256);
    (!(function (A) {
      for (var e = 0; e < 256; ++e) {
        var t = e,
          r = e,
          n = 7;
        for (t >>>= 1; t; t >>>= 1) ((r <<= 1), (r |= 1 & t), --n);
        A[e] = (r << n) & 255;
      }
    })(n),
      (e.reverse = function (A) {
        return (
          (n[255 & A] << 24) |
          (n[(A >>> 8) & 255] << 16) |
          (n[(A >>> 16) & 255] << 8) |
          n[(A >>> 24) & 255]
        );
      }),
      (e.interleave2 = function (A, e) {
        return (
          (A =
            1431655765 &
            ((A =
              858993459 &
              ((A = 252645135 & ((A = 16711935 & ((A &= 65535) | (A << 8))) | (A << 4))) |
                (A << 2))) |
              (A << 1))) |
          ((e =
            1431655765 &
            ((e =
              858993459 &
              ((e = 252645135 & ((e = 16711935 & ((e &= 65535) | (e << 8))) | (e << 4))) |
                (e << 2))) |
              (e << 1))) <<
            1)
        );
      }),
      (e.deinterleave2 = function (A, e) {
        return (
          ((A =
            65535 &
            ((A =
              16711935 &
              ((A =
                252645135 &
                ((A = 858993459 & ((A = (A >>> e) & 1431655765) | (A >>> 1))) | (A >>> 2))) |
                (A >>> 4))) |
              (A >>> 16))) <<
            16) >>
          16
        );
      }),
      (e.interleave3 = function (A, e, t) {
        return (
          (A =
            1227133513 &
            ((A =
              3272356035 &
              ((A = 251719695 & ((A = 4278190335 & ((A &= 1023) | (A << 16))) | (A << 8))) |
                (A << 4))) |
              (A << 2))),
          (A |=
            (e =
              1227133513 &
              ((e =
                3272356035 &
                ((e = 251719695 & ((e = 4278190335 & ((e &= 1023) | (e << 16))) | (e << 8))) |
                  (e << 4))) |
                (e << 2))) << 1) |
            ((t =
              1227133513 &
              ((t =
                3272356035 &
                ((t = 251719695 & ((t = 4278190335 & ((t &= 1023) | (t << 16))) | (t << 8))) |
                  (t << 4))) |
                (t << 2))) <<
              2)
        );
      }),
      (e.deinterleave3 = function (A, e) {
        return (
          ((A =
            1023 &
            ((A =
              4278190335 &
              ((A =
                251719695 &
                ((A = 3272356035 & ((A = (A >>> e) & 1227133513) | (A >>> 2))) | (A >>> 4))) |
                (A >>> 8))) |
              (A >>> 16))) <<
            22) >>
          22
        );
      }),
      (e.nextCombination = function (A) {
        var e = A | (A - 1);
        return (e + 1) | (((~e & -~e) - 1) >>> (r(A) + 1));
      }));
  },
  f0ZI: function (A, e, t) {
    'use strict';
    var r = t('QINn');
    function n(A, e, t) {
      var r,
        n,
        o = A.length,
        i = e.arrayArgs.length,
        a = e.indexArgs.length > 0,
        s = [],
        c = [],
        u = 0,
        B = 0;
      for (r = 0; r < o; ++r) c.push(['i', r, '=0'].join(''));
      for (n = 0; n < i; ++n)
        for (r = 0; r < o; ++r)
          ((B = u),
            (u = A[r]),
            0 === r
              ? c.push(['d', n, 's', r, '=t', n, 'p', u].join(''))
              : c.push(['d', n, 's', r, '=(t', n, 'p', u, '-s', B, '*t', n, 'p', B, ')'].join('')));
      for (c.length > 0 && s.push('var ' + c.join(',')), r = o - 1; r >= 0; --r)
        ((u = A[r]), s.push(['for(i', r, '=0;i', r, '<s', u, ';++i', r, '){'].join('')));
      for (s.push(t), r = 0; r < o; ++r) {
        for (B = u, u = A[r], n = 0; n < i; ++n) s.push(['p', n, '+=d', n, 's', r].join(''));
        (a &&
          (r > 0 && s.push(['index[', B, ']-=s', B].join('')),
          s.push(['++index[', u, ']'].join(''))),
          s.push('}'));
      }
      return s.join('\n');
    }
    function o(A, e, t) {
      for (var r = A.body, n = [], o = [], i = 0; i < A.args.length; ++i) {
        var a = A.args[i];
        if (!(a.count <= 0)) {
          var s = new RegExp(a.name, 'g'),
            c = '',
            u = e.arrayArgs.indexOf(i);
          switch (e.argTypes[i]) {
            case 'offset':
              var B = e.offsetArgIndex.indexOf(i);
              ((u = e.offsetArgs[B].array), (c = '+q' + B));
            case 'array':
              c = 'p' + u + c;
              var l = 'l' + i,
                f = 'a' + u;
              if (0 === e.arrayBlockIndices[u])
                1 === a.count
                  ? 'generic' === t[u]
                    ? a.lvalue
                      ? (n.push(['var ', l, '=', f, '.get(', c, ')'].join('')),
                        (r = r.replace(s, l)),
                        o.push([f, '.set(', c, ',', l, ')'].join('')))
                      : (r = r.replace(s, [f, '.get(', c, ')'].join('')))
                    : (r = r.replace(s, [f, '[', c, ']'].join('')))
                  : 'generic' === t[u]
                    ? (n.push(['var ', l, '=', f, '.get(', c, ')'].join('')),
                      (r = r.replace(s, l)),
                      a.lvalue && o.push([f, '.set(', c, ',', l, ')'].join('')))
                    : (n.push(['var ', l, '=', f, '[', c, ']'].join('')),
                      (r = r.replace(s, l)),
                      a.lvalue && o.push([f, '[', c, ']=', l].join('')));
              else {
                for (var h = [a.name], g = [c], w = 0; w < Math.abs(e.arrayBlockIndices[u]); w++)
                  (h.push('\\s*\\[([^\\]]+)\\]'), g.push('$' + (w + 1) + '*t' + u + 'b' + w));
                if (((s = new RegExp(h.join(''), 'g')), (c = g.join('+')), 'generic' === t[u]))
                  throw new Error(
                    'cwise: Generic arrays not supported in combination with blocks!'
                  );
                r = r.replace(s, [f, '[', c, ']'].join(''));
              }
              break;
            case 'scalar':
              r = r.replace(s, 'Y' + e.scalarArgs.indexOf(i));
              break;
            case 'index':
              r = r.replace(s, 'index');
              break;
            case 'shape':
              r = r.replace(s, 'shape');
          }
        }
      }
      return [n.join('\n'), r, o.join('\n')].join('\n').trim();
    }
    A.exports = function (A, e) {
      for (
        var t = (e[1].length - Math.abs(A.arrayBlockIndices[0])) | 0,
          i = new Array(A.arrayArgs.length),
          a = new Array(A.arrayArgs.length),
          s = 0;
        s < A.arrayArgs.length;
        ++s
      )
        ((a[s] = e[2 * s]), (i[s] = e[2 * s + 1]));
      var c = [],
        u = [],
        B = [],
        l = [],
        f = [];
      for (s = 0; s < A.arrayArgs.length; ++s) {
        A.arrayBlockIndices[s] < 0
          ? (B.push(0), l.push(t), c.push(t), u.push(t + A.arrayBlockIndices[s]))
          : (B.push(A.arrayBlockIndices[s]),
            l.push(A.arrayBlockIndices[s] + t),
            c.push(0),
            u.push(A.arrayBlockIndices[s]));
        for (var h = [], g = 0; g < i[s].length; g++)
          B[s] <= i[s][g] && i[s][g] < l[s] && h.push(i[s][g] - B[s]);
        f.push(h);
      }
      var w = ['SS'],
        d = ["'use strict'"],
        E = [];
      for (g = 0; g < t; ++g) E.push(['s', g, '=SS[', g, ']'].join(''));
      for (s = 0; s < A.arrayArgs.length; ++s) {
        for (w.push('a' + s), w.push('t' + s), w.push('p' + s), g = 0; g < t; ++g)
          E.push(['t', s, 'p', g, '=t', s, '[', B[s] + g, ']'].join(''));
        for (g = 0; g < Math.abs(A.arrayBlockIndices[s]); ++g)
          E.push(['t', s, 'b', g, '=t', s, '[', c[s] + g, ']'].join(''));
      }
      for (s = 0; s < A.scalarArgs.length; ++s) w.push('Y' + s);
      if ((A.shapeArgs.length > 0 && E.push('shape=SS.slice(0)'), A.indexArgs.length > 0)) {
        var p = new Array(t);
        for (s = 0; s < t; ++s) p[s] = '0';
        E.push(['index=[', p.join(','), ']'].join(''));
      }
      for (s = 0; s < A.offsetArgs.length; ++s) {
        var Q = A.offsetArgs[s],
          U = [];
        for (g = 0; g < Q.offset.length; ++g)
          0 !== Q.offset[g] &&
            (1 === Q.offset[g]
              ? U.push(['t', Q.array, 'p', g].join(''))
              : U.push([Q.offset[g], '*t', Q.array, 'p', g].join('')));
        0 === U.length ? E.push('q' + s + '=0') : E.push(['q', s, '=', U.join('+')].join(''));
      }
      var C = r([].concat(A.pre.thisVars).concat(A.body.thisVars).concat(A.post.thisVars));
      for (
        (E = E.concat(C)).length > 0 && d.push('var ' + E.join(',')), s = 0;
        s < A.arrayArgs.length;
        ++s
      )
        d.push('p' + s + '|=0');
      A.pre.body.length > 3 && d.push(o(A.pre, A, a));
      var F = o(A.body, A, a),
        m = (function (A) {
          for (var e = 0, t = A[0].length; e < t; ) {
            for (var r = 1; r < A.length; ++r) if (A[r][e] !== A[0][e]) return e;
            ++e;
          }
          return e;
        })(f);
      (m < t
        ? d.push(
            (function (A, e, t, r) {
              for (
                var o = e.length,
                  i = t.arrayArgs.length,
                  a = t.blockSize,
                  s = t.indexArgs.length > 0,
                  c = [],
                  u = 0;
                u < i;
                ++u
              )
                c.push(['var offset', u, '=p', u].join(''));
              for (u = A; u < o; ++u)
                (c.push(['for(var j' + u + '=SS[', e[u], ']|0;j', u, '>0;){'].join('')),
                  c.push(['if(j', u, '<', a, '){'].join('')),
                  c.push(['s', e[u], '=j', u].join('')),
                  c.push(['j', u, '=0'].join('')),
                  c.push(['}else{s', e[u], '=', a].join('')),
                  c.push(['j', u, '-=', a, '}'].join('')),
                  s && c.push(['index[', e[u], ']=j', u].join('')));
              for (u = 0; u < i; ++u) {
                for (var B = ['offset' + u], l = A; l < o; ++l)
                  B.push(['j', l, '*t', u, 'p', e[l]].join(''));
                c.push(['p', u, '=(', B.join('+'), ')'].join(''));
              }
              for (c.push(n(e, t, r)), u = A; u < o; ++u) c.push('}');
              return c.join('\n');
            })(m, f[0], A, F)
          )
        : d.push(n(f[0], A, F)),
        A.post.body.length > 3 && d.push(o(A.post, A, a)),
        A.debug &&
          console.log(
            '-----Generated cwise routine for ',
            e,
            ':\n' + d.join('\n') + '\n----------'
          ));
      var _ = [
        A.funcName || 'unnamed',
        '_cwise_loop_',
        i[0].join('s'),
        'm',
        m,
        (function (A) {
          for (var e = new Array(A.length), t = !0, r = 0; r < A.length; ++r) {
            var n = A[r],
              o = n.match(/\d+/);
            ((o = o ? o[0] : ''),
              0 === n.charAt(0) ? (e[r] = 'u' + n.charAt(1) + o) : (e[r] = n.charAt(0) + o),
              r > 0 && (t = t && e[r] === e[r - 1]));
          }
          return t ? e[0] : e.join('');
        })(a),
      ].join('');
      return new Function(
        ['function ', _, '(', w.join(','), '){', d.join('\n'), '} return ', _].join('')
      )();
    };
  },
  gNNp: function (A, e, t) {
    var r = t('0XFg').sprintf,
      n = t('UD6v'),
      o = t('l3QW'),
      i = t('XiR9');
    A.exports = function (A, e, t) {
      'use strict';
      var a = o(e) || 'of unknown name (see npm glsl-shader-name)',
        s = 'unknown type';
      void 0 !== t && (s = t === n.FRAGMENT_SHADER ? 'fragment' : 'vertex');
      for (
        var c = r('Error compiling %s shader %s:\n', s, a),
          u = r('%s%s', c, A),
          B = A.split('\n'),
          l = {},
          f = 0;
        f < B.length;
        f++
      ) {
        var h = B[f];
        if ('' !== h && '\0' !== h) {
          var g = parseInt(h.split(':')[2]);
          if (isNaN(g)) throw new Error(r('Could not parse error: %s', h));
          l[g] = h;
        }
      }
      for (var w = i(e).split('\n'), f = 0; f < w.length; f++)
        if (l[f + 3] || l[f + 2] || l[f + 1]) {
          var d = w[f];
          if (((c += d + '\n'), l[f + 1])) {
            var E = l[f + 1];
            ((E = E.substr(E.split(':', 3).join(':').length + 1).trim()),
              (c += r('^^^ %s\n\n', E)));
          }
        }
      return { long: c.trim(), short: u.trim() };
    };
  },
  hKoQ: function (A, e, t) {
    (function (r, n) {
      var o,
        i,
        a,
        s =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (A) {
                return typeof A;
              }
            : function (A) {
                return A &&
                  'function' == typeof Symbol &&
                  A.constructor === Symbol &&
                  A !== Symbol.prototype
                  ? 'symbol'
                  : typeof A;
              };
      ((a = function () {
        'use strict';
        function A(A) {
          return 'function' == typeof A;
        }
        var e = Array.isArray
            ? Array.isArray
            : function (A) {
                return '[object Array]' === Object.prototype.toString.call(A);
              },
          t = 0,
          o = void 0,
          i = void 0,
          a = function (A, e) {
            ((g[t] = A), (g[t + 1] = e), 2 === (t += 2) && (i ? i(w) : U()));
          };
        var c = 'undefined' != typeof window ? window : void 0,
          u = c || {},
          B = u.MutationObserver || u.WebKitMutationObserver,
          l =
            'undefined' == typeof self &&
            void 0 !== r &&
            '[object process]' === {}.toString.call(r),
          f =
            'undefined' != typeof Uint8ClampedArray &&
            'undefined' != typeof importScripts &&
            'undefined' != typeof MessageChannel;
        function h() {
          var A = setTimeout;
          return function () {
            return A(w, 1);
          };
        }
        var g = new Array(1e3);
        function w() {
          for (var A = 0; A < t; A += 2) {
            ((0, g[A])(g[A + 1]), (g[A] = void 0), (g[A + 1] = void 0));
          }
          t = 0;
        }
        var d,
          E,
          p,
          Q,
          U = void 0;
        function C(A, e) {
          var t = this,
            r = new this.constructor(_);
          void 0 === r[m] && M(r);
          var n = t._state;
          if (n) {
            var o = arguments[n - 1];
            a(function () {
              return L(n, r, o, t._result);
            });
          } else K(t, r, A, e);
          return r;
        }
        function F(A) {
          if (A && 'object' === (void 0 === A ? 'undefined' : s(A)) && A.constructor === this)
            return A;
          var e = new this(_);
          return (N(e, A), e);
        }
        l
          ? (U = function () {
              return r.nextTick(w);
            })
          : B
            ? ((E = 0),
              (p = new B(w)),
              (Q = document.createTextNode('')),
              p.observe(Q, { characterData: !0 }),
              (U = function () {
                Q.data = E = ++E % 2;
              }))
            : f
              ? (((d = new MessageChannel()).port1.onmessage = w),
                (U = function () {
                  return d.port2.postMessage(0);
                }))
              : (U =
                  void 0 === c
                    ? (function () {
                        try {
                          var A = Function('return this')().require('vertx');
                          return void 0 !== (o = A.runOnLoop || A.runOnContext)
                            ? function () {
                                o(w);
                              }
                            : h();
                        } catch (A) {
                          return h();
                        }
                      })()
                    : h());
        var m = Math.random().toString(36).substring(2);
        function _() {}
        var H = void 0,
          T = 1,
          v = 2;
        function y(e, t, r) {
          t.constructor === e.constructor && r === C && t.constructor.resolve === F
            ? (function (A, e) {
                e._state === T
                  ? b(A, e._result)
                  : e._state === v
                    ? R(A, e._result)
                    : K(
                        e,
                        void 0,
                        function (e) {
                          return N(A, e);
                        },
                        function (e) {
                          return R(A, e);
                        }
                      );
              })(e, t)
            : void 0 === r
              ? b(e, t)
              : A(r)
                ? (function (A, e, t) {
                    a(function (A) {
                      var r = !1,
                        n = (function (A, e, t, r) {
                          try {
                            A.call(e, t, r);
                          } catch (A) {
                            return A;
                          }
                        })(
                          t,
                          e,
                          function (t) {
                            r || ((r = !0), e !== t ? N(A, t) : b(A, t));
                          },
                          function (e) {
                            r || ((r = !0), R(A, e));
                          },
                          A._label
                        );
                      !r && n && ((r = !0), R(A, n));
                    }, A);
                  })(e, t, r)
                : b(e, t);
        }
        function N(A, e) {
          if (A === e) R(A, new TypeError('You cannot resolve a promise with itself'));
          else if (
            ((n = void 0 === (r = e) ? 'undefined' : s(r)),
            null === r || ('object' !== n && 'function' !== n))
          )
            b(A, e);
          else {
            var t = void 0;
            try {
              t = e.then;
            } catch (e) {
              return void R(A, e);
            }
            y(A, e, t);
          }
          var r, n;
        }
        function I(A) {
          (A._onerror && A._onerror(A._result), S(A));
        }
        function b(A, e) {
          A._state === H &&
            ((A._result = e), (A._state = T), 0 !== A._subscribers.length && a(S, A));
        }
        function R(A, e) {
          A._state === H && ((A._state = v), (A._result = e), a(I, A));
        }
        function K(A, e, t, r) {
          var n = A._subscribers,
            o = n.length;
          ((A._onerror = null),
            (n[o] = e),
            (n[o + T] = t),
            (n[o + v] = r),
            0 === o && A._state && a(S, A));
        }
        function S(A) {
          var e = A._subscribers,
            t = A._state;
          if (0 !== e.length) {
            for (var r = void 0, n = void 0, o = A._result, i = 0; i < e.length; i += 3)
              ((r = e[i]), (n = e[i + t]), r ? L(t, r, n, o) : n(o));
            A._subscribers.length = 0;
          }
        }
        function L(e, t, r, n) {
          var o = A(r),
            i = void 0,
            a = void 0,
            s = !0;
          if (o) {
            try {
              i = r(n);
            } catch (A) {
              ((s = !1), (a = A));
            }
            if (t === i)
              return void R(
                t,
                new TypeError('A promises callback cannot return that same promise.')
              );
          } else i = n;
          t._state !== H ||
            (o && s ? N(t, i) : !1 === s ? R(t, a) : e === T ? b(t, i) : e === v && R(t, i));
        }
        var O = 0;
        function M(A) {
          ((A[m] = O++), (A._state = void 0), (A._result = void 0), (A._subscribers = []));
        }
        var D = (function () {
          function A(A, t) {
            ((this._instanceConstructor = A),
              (this.promise = new A(_)),
              this.promise[m] || M(this.promise),
              e(t)
                ? ((this.length = t.length),
                  (this._remaining = t.length),
                  (this._result = new Array(this.length)),
                  0 === this.length
                    ? b(this.promise, this._result)
                    : ((this.length = this.length || 0),
                      this._enumerate(t),
                      0 === this._remaining && b(this.promise, this._result)))
                : R(this.promise, new Error('Array Methods must be provided an Array')));
          }
          return (
            (A.prototype._enumerate = function (A) {
              for (var e = 0; this._state === H && e < A.length; e++) this._eachEntry(A[e], e);
            }),
            (A.prototype._eachEntry = function (A, e) {
              var t = this._instanceConstructor,
                r = t.resolve;
              if (r === F) {
                var n = void 0,
                  o = void 0,
                  i = !1;
                try {
                  n = A.then;
                } catch (A) {
                  ((i = !0), (o = A));
                }
                if (n === C && A._state !== H) this._settledAt(A._state, e, A._result);
                else if ('function' != typeof n) (this._remaining--, (this._result[e] = A));
                else if (t === x) {
                  var a = new t(_);
                  (i ? R(a, o) : y(a, A, n), this._willSettleAt(a, e));
                } else
                  this._willSettleAt(
                    new t(function (e) {
                      return e(A);
                    }),
                    e
                  );
              } else this._willSettleAt(r(A), e);
            }),
            (A.prototype._settledAt = function (A, e, t) {
              var r = this.promise;
              (r._state === H && (this._remaining--, A === v ? R(r, t) : (this._result[e] = t)),
                0 === this._remaining && b(r, this._result));
            }),
            (A.prototype._willSettleAt = function (A, e) {
              var t = this;
              K(
                A,
                void 0,
                function (A) {
                  return t._settledAt(T, e, A);
                },
                function (A) {
                  return t._settledAt(v, e, A);
                }
              );
            }),
            A
          );
        })();
        var x = (function () {
          function e(A) {
            ((this[m] = O++),
              (this._result = this._state = void 0),
              (this._subscribers = []),
              _ !== A &&
                ('function' != typeof A &&
                  (function () {
                    throw new TypeError(
                      'You must pass a resolver function as the first argument to the promise constructor'
                    );
                  })(),
                this instanceof e
                  ? (function (A, e) {
                      try {
                        e(
                          function (e) {
                            N(A, e);
                          },
                          function (e) {
                            R(A, e);
                          }
                        );
                      } catch (e) {
                        R(A, e);
                      }
                    })(this, A)
                  : (function () {
                      throw new TypeError(
                        "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                      );
                    })()));
          }
          return (
            (e.prototype.catch = function (A) {
              return this.then(null, A);
            }),
            (e.prototype.finally = function (e) {
              var t = this.constructor;
              return A(e)
                ? this.then(
                    function (A) {
                      return t.resolve(e()).then(function () {
                        return A;
                      });
                    },
                    function (A) {
                      return t.resolve(e()).then(function () {
                        throw A;
                      });
                    }
                  )
                : this.then(e, e);
            }),
            e
          );
        })();
        return (
          (x.prototype.then = C),
          (x.all = function (A) {
            return new D(this, A).promise;
          }),
          (x.race = function (A) {
            var t = this;
            return e(A)
              ? new t(function (e, r) {
                  for (var n = A.length, o = 0; o < n; o++) t.resolve(A[o]).then(e, r);
                })
              : new t(function (A, e) {
                  return e(new TypeError('You must pass an array to race.'));
                });
          }),
          (x.resolve = F),
          (x.reject = function (A) {
            var e = new this(_);
            return (R(e, A), e);
          }),
          (x._setScheduler = function (A) {
            i = A;
          }),
          (x._setAsap = function (A) {
            a = A;
          }),
          (x._asap = a),
          (x.polyfill = function () {
            var A = void 0;
            if (void 0 !== n) A = n;
            else if ('undefined' != typeof self) A = self;
            else
              try {
                A = Function('return this')();
              } catch (A) {
                throw new Error(
                  'polyfill failed because global object is unavailable in this environment'
                );
              }
            var e = A.Promise;
            if (e) {
              var t = null;
              try {
                t = Object.prototype.toString.call(e.resolve());
              } catch (A) {}
              if ('[object Promise]' === t && !e.cast) return;
            }
            A.Promise = x;
          }),
          (x.Promise = x),
          x
        );
      }),
        'object' === s(e) && void 0 !== A
          ? (A.exports = a())
          : void 0 === (i = 'function' == typeof (o = a) ? o.call(e, t, e, A) : o) ||
            (A.exports = i));
    }).call(e, t('W2nU'), t('DuR2'));
  },
  hWCG: function (A, e, t) {
    'use strict';
    ((e.shader = function (A, e, t) {
      return u(A).getShaderReference(e, t);
    }),
      (e.program = function (A, e, t, r, n) {
        return u(A).getProgram(e, t, r, n);
      }));
    var r = t('U27o'),
      n = t('gNNp'),
      o = new ('undefined' == typeof WeakMap ? t('P6hE') : WeakMap)(),
      i = 0;
    function a(A, e, t, r, n, o, i) {
      ((this.id = A),
        (this.src = e),
        (this.type = t),
        (this.shader = r),
        (this.count = o),
        (this.programs = []),
        (this.cache = i));
    }
    function s(A) {
      ((this.gl = A), (this.shaders = [{}, {}]), (this.programs = {}));
    }
    a.prototype.dispose = function () {
      if (0 == --this.count) {
        for (var A = this.cache, e = A.gl, t = this.programs, r = 0, n = t.length; r < n; ++r) {
          var o = A.programs[t[r]];
          o && (delete A.programs[r], e.deleteProgram(o));
        }
        (e.deleteShader(this.shader),
          delete A.shaders[(this.type === e.FRAGMENT_SHADER) | 0][this.src]);
      }
    };
    var c = s.prototype;
    function u(A) {
      var e = o.get(A);
      return (e || ((e = new s(A)), o.set(A, e)), e);
    }
    ((c.getShaderReference = function (A, e) {
      var t = this.gl,
        o = this.shaders[(A === t.FRAGMENT_SHADER) | 0],
        s = o[e];
      if (s && t.isShader(s.shader)) s.count += 1;
      else {
        var c = (function (A, e, t) {
          var o = A.createShader(e);
          if (
            (A.shaderSource(o, t), A.compileShader(o), !A.getShaderParameter(o, A.COMPILE_STATUS))
          ) {
            var i = A.getShaderInfoLog(o);
            try {
              var a = n(i, t, e);
            } catch (A) {
              throw (
                console.warn('Failed to format compiler error: ' + A),
                new r(i, 'Error compiling shader:\n' + i)
              );
            }
            throw new r(i, a.short, a.long);
          }
          return o;
        })(t, A, e);
        s = o[e] = new a(i++, e, A, c, [], 1, this);
      }
      return s;
    }),
      (c.getProgram = function (A, e, t, n) {
        var o = [A.id, e.id, t.join(':'), n.join(':')].join('@'),
          i = this.programs[o];
        return (
          (i && this.gl.isProgram(i)) ||
            ((this.programs[o] = i =
              (function (A, e, t, n, o) {
                var i = A.createProgram();
                (A.attachShader(i, e), A.attachShader(i, t));
                for (var a = 0; a < n.length; ++a) A.bindAttribLocation(i, o[a], n[a]);
                if ((A.linkProgram(i), !A.getProgramParameter(i, A.LINK_STATUS))) {
                  var s = A.getProgramInfoLog(i);
                  throw new r(s, 'Error linking program: ' + s);
                }
                return i;
              })(this.gl, A.shader, e.shader, t, n)),
            A.programs.push(o),
            e.programs.push(o)),
          i
        );
      }));
  },
  i85B: function (A, e, t) {
    A.exports = function (A) {
      var e,
        t,
        F,
        m = 0,
        _ = 0,
        H = s,
        T = [],
        v = [],
        y = 1,
        N = 0,
        I = 0,
        b = !1,
        R = !1,
        K = '',
        S = o,
        L = r;
      '300 es' === (A = A || {}).version && ((S = a), (L = i));
      for (var O = {}, M = {}, m = 0; m < S.length; m++) O[S[m]] = !0;
      for (var m = 0; m < L.length; m++) M[L[m]] = !0;
      return function (A) {
        return (
          (v = []),
          null !== A
            ? (function (A) {
                ((m = 0), A.toString && (A = A.toString()));
                var t;
                ((K += A.replace(/\r\n/g, '\n')), (F = K.length));
                for (; (e = K[m]), m < F; ) {
                  switch (((t = m), H)) {
                    case u:
                      m = X();
                      break;
                    case B:
                    case l:
                      m = V();
                      break;
                    case f:
                      m = z();
                      break;
                    case h:
                      m = J();
                      break;
                    case U:
                      m = G();
                      break;
                    case g:
                      m = Y();
                      break;
                    case c:
                      m = W();
                      break;
                    case p:
                      m = P();
                      break;
                    case s:
                      m = x();
                  }
                  if (t !== m)
                    switch (K[t]) {
                      case '\n':
                        ((N = 0), ++y);
                        break;
                      default:
                        ++N;
                    }
                }
                return ((_ += m), (K = K.slice(m)), v);
              })(A)
            : (function (A) {
                T.length && D(T.join(''));
                return ((H = Q), D('(eof)'), v);
              })()
        );
      };
      function D(A) {
        A.length && v.push({ type: C[H], data: A, position: I, line: y, column: N });
      }
      function x() {
        return (
          (T = T.length ? [] : T),
          '/' === t && '*' === e
            ? ((I = _ + m - 1), (H = u), (t = e), m + 1)
            : '/' === t && '/' === e
              ? ((I = _ + m - 1), (H = B), (t = e), m + 1)
              : '#' === e
                ? ((H = l), (I = _ + m), m)
                : /\s/.test(e)
                  ? ((H = p), (I = _ + m), m)
                  : ((b = /\d/.test(e)),
                    (R = /[^\w_]/.test(e)),
                    (I = _ + m),
                    (H = b ? h : R ? f : c),
                    m)
        );
      }
      function P() {
        return /[^\s]/g.test(e) ? (D(T.join('')), (H = s), m) : (T.push(e), (t = e), m + 1);
      }
      function V() {
        return ('\r' !== e && '\n' !== e) || '\\' === t
          ? (T.push(e), (t = e), m + 1)
          : (D(T.join('')), (H = s), m);
      }
      function X() {
        return '/' === e && '*' === t
          ? (T.push(e), D(T.join('')), (H = s), m + 1)
          : (T.push(e), (t = e), m + 1);
      }
      function z() {
        if ('.' === t && /\d/.test(e)) return ((H = g), m);
        if ('/' === t && '*' === e) return ((H = u), m);
        if ('/' === t && '/' === e) return ((H = B), m);
        if ('.' === e && T.length) {
          for (; k(T); );
          return ((H = g), m);
        }
        if (';' === e || ')' === e || '(' === e) {
          if (T.length) for (; k(T); );
          return (D(e), (H = s), m + 1);
        }
        var A = 2 === T.length && '=' !== e;
        if (/[\w_\d\s]/.test(e) || A) {
          for (; k(T); );
          return ((H = s), m);
        }
        return (T.push(e), (t = e), m + 1);
      }
      function k(A) {
        for (var e, t, r = 0; ; ) {
          if (((e = n.indexOf(A.slice(0, A.length + r).join(''))), (t = n[e]), -1 === e)) {
            if (r-- + A.length > 0) continue;
            t = A.slice(0, 1).join('');
          }
          return (D(t), (I += t.length), (T = T.slice(t.length)).length);
        }
      }
      function G() {
        return /[^a-fA-F0-9]/.test(e) ? (D(T.join('')), (H = s), m) : (T.push(e), (t = e), m + 1);
      }
      function J() {
        return '.' === e
          ? (T.push(e), (H = g), (t = e), m + 1)
          : /[eE]/.test(e)
            ? (T.push(e), (H = g), (t = e), m + 1)
            : 'x' === e && 1 === T.length && '0' === T[0]
              ? ((H = U), T.push(e), (t = e), m + 1)
              : /[^\d]/.test(e)
                ? (D(T.join('')), (H = s), m)
                : (T.push(e), (t = e), m + 1);
      }
      function Y() {
        return (
          'f' === e && (T.push(e), (t = e), (m += 1)),
          /[eE]/.test(e)
            ? (T.push(e), (t = e), m + 1)
            : (('-' !== e && '+' !== e) || !/[eE]/.test(t)) && /[^\d]/.test(e)
              ? (D(T.join('')), (H = s), m)
              : (T.push(e), (t = e), m + 1)
        );
      }
      function W() {
        if (/[^\d\w_]/.test(e)) {
          var A = T.join('');
          return ((H = M[A] ? E : O[A] ? d : w), D(T.join('')), (H = s), m);
        }
        return (T.push(e), (t = e), m + 1);
      }
    };
    var r = t('aRmZ'),
      n = t('zlmr'),
      o = t('Rl1y'),
      i = t('c0mF'),
      a = t('Xyi1'),
      s = 999,
      c = 9999,
      u = 0,
      B = 1,
      l = 2,
      f = 3,
      h = 4,
      g = 5,
      w = 6,
      d = 7,
      E = 8,
      p = 9,
      Q = 10,
      U = 11,
      C = [
        'block-comment',
        'line-comment',
        'preprocessor',
        'operator',
        'integer',
        'float',
        'ident',
        'builtin',
        'keyword',
        'whitespace',
        'eof',
        'integer',
      ];
  },
  jMr4: function (A, e, t) {
    'use strict';
    A.exports = function (A) {
      for (var e = new Array(A), t = 0; t < A; ++t) e[t] = t;
      return e;
    };
  },
  l3QW: function (A, e, t) {
    var r = t('t+gq'),
      n = t('NdPJ');
    A.exports = function (A) {
      for (var e = Array.isArray(A) ? A : r(A), t = 0; t < e.length; t++) {
        var o = e[t];
        if ('preprocessor' === o.type) {
          var i = o.data.match(/\#define\s+SHADER_NAME(_B64)?\s+(.+)$/);
          if (i && i[2]) {
            var a = i[1],
              s = i[2];
            return (a ? n(s) : s).trim();
          }
        }
      }
    };
  },
  pcrw: function (A, e, t) {
    'use strict';
    var r = t('V0SU'),
      n = t('YrEI'),
      o = t('NRIt'),
      i = t('hWCG'),
      a = t('OVux'),
      s = t('U27o');
    function c(A) {
      ((this.gl = A),
        (this.gl.lastAttribCount = 0),
        (this._vref =
          this._fref =
          this._relink =
          this.vertShader =
          this.fragShader =
          this.program =
          this.attributes =
          this.uniforms =
          this.types =
            null));
    }
    var u = c.prototype;
    function B(A, e) {
      return A.name < e.name ? -1 : 1;
    }
    ((u.bind = function () {
      var A;
      this.program || this._relink();
      var e = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES),
        t = this.gl.lastAttribCount;
      if (e > t) for (A = t; A < e; A++) this.gl.enableVertexAttribArray(A);
      else if (t > e) for (A = e; A < t; A++) this.gl.disableVertexAttribArray(A);
      ((this.gl.lastAttribCount = e), this.gl.useProgram(this.program));
    }),
      (u.dispose = function () {
        for (var A = this.gl.lastAttribCount, e = 0; e < A; e++)
          this.gl.disableVertexAttribArray(e);
        ((this.gl.lastAttribCount = 0),
          this._fref && this._fref.dispose(),
          this._vref && this._vref.dispose(),
          (this.attributes =
            this.types =
            this.vertShader =
            this.fragShader =
            this.program =
            this._relink =
            this._fref =
            this._vref =
              null));
      }),
      (u.update = function (A, e, t, c) {
        if (!e || 1 === arguments.length) {
          var u = A;
          ((A = u.vertex), (e = u.fragment), (t = u.uniforms), (c = u.attributes));
        }
        var l = this,
          f = l.gl,
          h = l._vref;
        ((l._vref = i.shader(f, f.VERTEX_SHADER, A)),
          h && h.dispose(),
          (l.vertShader = l._vref.shader));
        var g = this._fref;
        if (
          ((l._fref = i.shader(f, f.FRAGMENT_SHADER, e)),
          g && g.dispose(),
          (l.fragShader = l._fref.shader),
          !t || !c)
        ) {
          var w = f.createProgram();
          if (
            (f.attachShader(w, l.fragShader),
            f.attachShader(w, l.vertShader),
            f.linkProgram(w),
            !f.getProgramParameter(w, f.LINK_STATUS))
          ) {
            var d = f.getProgramInfoLog(w);
            throw new s(d, 'Error linking program:' + d);
          }
          ((t = t || a.uniforms(f, w)), (c = c || a.attributes(f, w)), f.deleteProgram(w));
        }
        (c = c.slice()).sort(B);
        var E,
          p = [],
          Q = [],
          U = [];
        for (E = 0; E < c.length; ++E) {
          var C = c[E];
          if (C.type.indexOf('mat') >= 0) {
            for (var F = 0 | C.type.charAt(C.type.length - 1), m = new Array(F), _ = 0; _ < F; ++_)
              ((m[_] = U.length),
                Q.push(C.name + '[' + _ + ']'),
                'number' == typeof C.location
                  ? U.push(C.location + _)
                  : Array.isArray(C.location) &&
                      C.location.length === F &&
                      'number' == typeof C.location[_]
                    ? U.push(0 | C.location[_])
                    : U.push(-1));
            p.push({ name: C.name, type: C.type, locations: m });
          } else
            (p.push({ name: C.name, type: C.type, locations: [U.length] }),
              Q.push(C.name),
              'number' == typeof C.location ? U.push(0 | C.location) : U.push(-1));
        }
        var H = 0;
        for (E = 0; E < U.length; ++E)
          if (U[E] < 0) {
            for (; U.indexOf(H) >= 0; ) H += 1;
            U[E] = H;
          }
        var T = new Array(t.length);
        function v() {
          l.program = i.program(f, l._vref, l._fref, Q, U);
          for (var A = 0; A < t.length; ++A) T[A] = f.getUniformLocation(l.program, t[A].name);
        }
        (v(),
          (l._relink = v),
          (l.types = { uniforms: o(t), attributes: o(c) }),
          (l.attributes = n(f, l, p, U)),
          Object.defineProperty(l, 'uniforms', r(f, l, t, T)));
      }),
      (A.exports = function (A, e, t, r, n) {
        var o = new c(A);
        return (o.update(e, t, r, n), o);
      }));
  },
  sOR5: function (A, e) {
    var t = {}.toString;
    A.exports =
      Array.isArray ||
      function (A) {
        return '[object Array]' == t.call(A);
      };
  },
  't+gq': function (A, e, t) {
    var r = t('i85B');
    A.exports = function (A, e) {
      var t = r(e),
        n = [];
      return (n = (n = n.concat(t(A))).concat(t(null)));
    };
  },
  ujcs: function (A, e) {
    ((e.read = function (A, e, t, r, n) {
      var o,
        i,
        a = 8 * n - r - 1,
        s = (1 << a) - 1,
        c = s >> 1,
        u = -7,
        B = t ? n - 1 : 0,
        l = t ? -1 : 1,
        f = A[e + B];
      for (
        B += l, o = f & ((1 << -u) - 1), f >>= -u, u += a;
        u > 0;
        o = 256 * o + A[e + B], B += l, u -= 8
      );
      for (
        i = o & ((1 << -u) - 1), o >>= -u, u += r;
        u > 0;
        i = 256 * i + A[e + B], B += l, u -= 8
      );
      if (0 === o) o = 1 - c;
      else {
        if (o === s) return i ? NaN : (1 / 0) * (f ? -1 : 1);
        ((i += Math.pow(2, r)), (o -= c));
      }
      return (f ? -1 : 1) * i * Math.pow(2, o - r);
    }),
      (e.write = function (A, e, t, r, n, o) {
        var i,
          a,
          s,
          c = 8 * o - n - 1,
          u = (1 << c) - 1,
          B = u >> 1,
          l = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          f = r ? 0 : o - 1,
          h = r ? 1 : -1,
          g = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
        for (
          e = Math.abs(e),
            isNaN(e) || e === 1 / 0
              ? ((a = isNaN(e) ? 1 : 0), (i = u))
              : ((i = Math.floor(Math.log(e) / Math.LN2)),
                e * (s = Math.pow(2, -i)) < 1 && (i--, (s *= 2)),
                (e += i + B >= 1 ? l / s : l * Math.pow(2, 1 - B)) * s >= 2 && (i++, (s /= 2)),
                i + B >= u
                  ? ((a = 0), (i = u))
                  : i + B >= 1
                    ? ((a = (e * s - 1) * Math.pow(2, n)), (i += B))
                    : ((a = e * Math.pow(2, B - 1) * Math.pow(2, n)), (i = 0)));
          n >= 8;
          A[t + f] = 255 & a, f += h, a /= 256, n -= 8
        );
        for (i = (i << n) | a, c += n; c > 0; A[t + f] = 255 & i, f += h, i /= 256, c -= 8);
        A[t + f - h] |= 128 * g;
      }));
  },
  vjK3: function (A, e) {
    A.exports = function (A, e) {
      var t = { identity: e },
        r = A.valueOf;
      return (
        Object.defineProperty(A, 'valueOf', {
          value: function (A) {
            return A !== e ? r.apply(this, arguments) : t;
          },
          writable: !0,
        }),
        t
      );
    };
  },
  zlmr: function (A, e) {
    A.exports = [
      '<<=',
      '>>=',
      '++',
      '--',
      '<<',
      '>>',
      '<=',
      '>=',
      '==',
      '!=',
      '&&',
      '||',
      '+=',
      '-=',
      '*=',
      '/=',
      '%=',
      '&=',
      '^^',
      '^=',
      '|=',
      '(',
      ')',
      '[',
      ']',
      '.',
      '!',
      '~',
      '*',
      '/',
      '%',
      '+',
      '-',
      '<',
      '>',
      '&',
      '^',
      '|',
      '?',
      ':',
      '=',
      ',',
      ';',
      '{',
      '}',
    ];
  },
});
//# sourceMappingURL=switchToArtwork.js.map
