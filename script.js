(function () {
  var list = document.getElementById("svc-list");
  if (!list) return;
  var items = [].slice.call(list.querySelectorAll(".svc"));
  var vis = [].slice.call(document.querySelectorAll(".pstage .vis"));
  var pnum = document.getElementById("pnum"),
    pname = document.getElementById("pname");
  var names = [
    "Web Development",
    "AI Automation",
    "Voice Agents",
    "Chat Agents",
  ];
  var cur = 0;
  var prev = document.querySelector(".svc-grid .preview"),
    home = prev ? prev.parentNode : null,
    homeNext = prev ? prev.nextSibling : null;
  var mqm = window.matchMedia("(max-width:739px)");
  function place() {
    if (!prev) return;
    if (mqm.matches) {
      items[cur].insertBefore(prev, items[cur].firstChild);
    } else if (prev.parentNode !== home) {
      home.insertBefore(prev, homeNext);
    }
  }
  place();
  if (mqm.addEventListener) {
    mqm.addEventListener("change", place);
  } else if (mqm.addListener) {
    mqm.addListener(place);
  }
  function set(i) {
    if (i === cur) return;
    cur = i;
    place();
    items.forEach(function (el, k) {
      var on = k === i;
      el.classList.toggle("on", on);
      el.querySelector(".t").setAttribute(
        "aria-expanded",
        on ? "true" : "false",
      );
    });
    vis.forEach(function (v, k) {
      v.classList.toggle("on", k === i);
    });
    pnum.textContent = "0" + (i + 1);
    pname.textContent = names[i];
    [pnum, pname].forEach(function (n) {
      n.classList.remove("swap");
      void n.offsetWidth;
      n.classList.add("swap");
    });
  }
  var pin = document.getElementById("svc-pin"),
    spacer = document.getElementById("svc-spacer");
  var mq = window.matchMedia("(min-width:740px)"),
    tick = false;
  items.forEach(function (el, k) {
    el.querySelector(".t").addEventListener("click", function () {
      if (pin && spacer && mq.matches) {
        var top =
          pin.getBoundingClientRect().top +
          window.pageYOffset -
          20 +
          (spacer.offsetHeight * (k + 0.5)) / 4;
        window.scrollTo({ top: top, behavior: "smooth" });
      } else {
        set(k);
      }
    });
  });
  function upd() {
    tick = false;
    if (!pin || !spacer || !mq.matches) return;
    var sp = spacer.offsetHeight;
    if (sp <= 0) return;
    var p = Math.max(
      0,
      Math.min(0.9999, (20 - pin.getBoundingClientRect().top) / sp),
    );
    set(Math.floor(p * 4));
  }
  function req() {
    if (!tick) {
      tick = true;
      requestAnimationFrame(upd);
    }
  }
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", req);
  upd();
  var g = document.getElementById("vbars");
  if (g) {
    var hs = [
      26, 48, 76, 40, 92, 58, 34, 84, 50, 100, 62, 38, 88, 54, 70, 30, 80, 46,
      96, 42, 66, 28,
    ];
    for (var j = 0; j < hs.length; j++) {
      var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      r.setAttribute("class", "bar");
      r.setAttribute("x", String(84 + j * 14.5));
      r.setAttribute("y", String(176 - hs[j] / 2));
      r.setAttribute("width", "6");
      r.setAttribute("height", String(hs[j]));
      r.setAttribute("rx", "3");
      r.setAttribute("fill", j % 3 === 0 ? "#9bb6ff" : "#ffffff");
      r.style.animationDelay = j * 0.07 + "s";
      r.style.animationDuration = 0.8 + (j % 5) * 0.12 + "s";
      g.appendChild(r);
    }
  }
})();
(function () {
  var tk = document.getElementById("mq-track");
  if (tk) {
    [].slice.call(tk.children).forEach(function (s) {
      var c = s.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      tk.appendChild(c);
    });
  }
  var f = document.getElementById("c-form"),
    st = document.getElementById("c-status");
  if (!f) return;
  var send = f.querySelector(".c-btn");
  var say = function (t) {
    st.textContent = t;
  };
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var n = f.elements.name.value.trim(),
      m = f.elements.email.value.trim(),
      b = f.elements.message.value.trim();
    if (!n || !m || !b) {
      say("Please fill in your full name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) {
      say("Please enter a valid email address.");
      return;
    }
    send.disabled = true;
    say("Sending...");
    fetch(f.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(f),
    })
      .then(function (r) {
        return r.json().then(function (d) {
          return { ok: r.ok, data: d };
        });
      })
      .then(function (res) {
        if (res.ok) {
          say(
            "Thank you, your message has been sent. I will reply within 24 hours.",
          );
          f.reset();
        } else {
          var errs = res.data && res.data.errors;
          say(
            errs && errs.length
              ? errs
                  .map(function (x) {
                    return x.message;
                  })
                  .join(", ")
              : "Something went wrong. Please try again.",
          );
        }
      })
      .catch(function () {
        say("Network error. Please try again or email me directly.");
      })
      .then(function () {
        send.disabled = false;
      });
  });
})();
(function () {
  var g = document.getElementById("f-grid");
  if (!g) return;
  g.addEventListener("click", function (e) {
    var b = e.target;
    while (b && b !== g && !(b.classList && b.classList.contains("fq-q")))
      b = b.parentNode;
    if (!b || b === g) return;
    var item = b.parentNode,
      on = item.classList.toggle("on");
    b.setAttribute("aria-expanded", on ? "true" : "false");
  });
})();
(function () {
  var cs = [].slice.call(document.querySelectorAll(".tc")),
    star = document.getElementById("t-star");
  if (!cs.length) return;
  var still =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    tick = false;
  function upd() {
    tick = false;
    var vh = window.innerHeight;
    cs.forEach(function (c) {
      var t = c.getBoundingClientRect().top,
        e = still ? 1 : Math.max(0, Math.min(1, (vh * 0.95 - t) / (vh * 0.45)));
      c.style.setProperty("--e", String(e));
    });
    if (star && !still)
      star.style.setProperty("--sr", String(window.pageYOffset * 0.04));
  }
  function req() {
    if (!tick) {
      tick = true;
      requestAnimationFrame(upd);
    }
  }
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", req);
  upd();
})();
(function () {
  var tr = document.getElementById("p-track"),
    st = document.getElementById("p-sticky");
  if (!tr || !st) return;
  var still =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    tick = false;
  function upd() {
    tick = false;
    var vh = window.innerHeight,
      r = tr.getBoundingClientRect();
    var e = still
      ? 1
      : Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.85)));
    var k = e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;
    st.style.setProperty("--p", String(k));
  }
  function req() {
    if (!tick) {
      tick = true;
      requestAnimationFrame(upd);
    }
  }
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", req);
  upd();
})();
(function () {
  var sec = document.getElementById("works"),
    stg = document.getElementById("w-stage"),
    sticky = document.getElementById("w-sticky");
  var tile = document.getElementById("tile-c"),
    mosaic = document.getElementById("mosaic"),
    ui = document.getElementById("w-ui");
  if (!sec || !stg || !tile) return;
  var P = [
    {
      name: "Studio A",
      art: "art-1",
      cat: "UI Design / Webflow / CMS",
      desc: "Design and development for Studio A, a creative studio showcasing its portfolio and services.",
      url: "https://studiobya-stage.webflow.io/",
    },
    {
      name: "Slyletica",
      art: "art-2",
      cat: "UI Design / Webflow / Animations",
      desc: "An ecommerce experience for Slyletica, an activewear brand.",
      url: "https://slyletica-stage.webflow.io/",
    },
    {
      name: "Plaza Foods",
      art: "art-3",
      cat: "Webflow / CMS / Animations",
      desc: "A new brand website for Plaza Foods, featuring products and recipes.",
      url: "https://plaza-foods-stage.webflow.io/",
    },
    {
      name: "Houy",
      art: "art-4",
      cat: "UI Design / Webflow / Motion",
      desc: "A product landing page for Houy, with custom interactions and animations.",
      url: "https://houy-stage.webflow.io/",
    },
  ];
  var bgs = [].slice.call(stg.querySelectorAll(".bg")),
    tabs = [].slice.call(stg.querySelectorAll(".tab"));
  var ttl = document.getElementById("w-title"),
    tabsEl = document.getElementById("w-tabs"),
    info = document.getElementById("w-info");
  var thumb = document.getElementById("w-thumb"),
    cat = document.getElementById("w-cat"),
    desc = document.getElementById("w-desc"),
    link = document.getElementById("w-link"),
    num = document.getElementById("w-n");
  var still =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rect = { t: 0, r: 0, b: 0, l: 0 },
    cur = 0,
    ticking = false,
    tm = 0;

  function measure() {
    var sr = sticky.getBoundingClientRect(),
      tr = tile.getBoundingClientRect();
    rect.t = tr.top - sr.top;
    rect.l = tr.left - sr.left;
    rect.r = sr.right - tr.right;
    rect.b = sr.bottom - tr.bottom;
  }
  function setTitle(txt) {
    ttl.textContent = "";
    for (var i = 0; i < txt.length; i++) {
      var s = document.createElement("span");
      s.className = "ch";
      s.style.setProperty("--i", i);
      s.textContent = txt.charAt(i) === " " ? " " : txt.charAt(i);
      ttl.appendChild(s);
    }
    ttl.setAttribute("aria-label", txt);
  }
  function set(i) {
    if (i === cur) return;
    var prev = cur;
    cur = i;
    bgs.forEach(function (b) {
      b.classList.remove("on", "out");
    });
    bgs[prev].classList.add("out");
    bgs[i].classList.add("on");
    clearTimeout(tm);
    tm = setTimeout(function () {
      bgs[prev].classList.remove("out");
    }, 1000);
    tabs.forEach(function (t, k) {
      if (k === i) t.setAttribute("aria-current", "true");
      else t.removeAttribute("aria-current");
    });
    tabsEl.style.setProperty("--i", i);
    info.style.setProperty("--i", i);
    var p = P[i];
    thumb.className = "thumb " + p.art;
    cat.textContent = p.cat;
    desc.textContent = p.desc;
    link.href = p.url;
    num.textContent = "0" + (i + 1);
    info.classList.remove("swap");
    void info.offsetWidth;
    info.classList.add("swap");
    setTitle(p.name);
  }
  function update() {
    ticking = false;
    var vh = window.innerHeight,
      r = sec.getBoundingClientRect(),
      s = -r.top;
    var e = still ? 1 : Math.max(0, Math.min(1, s / (0.9 * vh)));
    var k = e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;
    var f = 1 - k;
    stg.style.clipPath =
      "inset(" +
      rect.t * f +
      "px " +
      rect.r * f +
      "px " +
      rect.b * f +
      "px " +
      rect.l * f +
      "px round " +
      4 * f +
      "px)";
    mosaic.style.opacity = String(1 - k);
    ui.style.opacity = String(Math.max(0, Math.min(1, (e - 0.55) / 0.35)));
    ui.style.visibility = e < 0.6 ? "hidden" : "visible";
    var after = s - 0.9 * vh;
    set(after < 0 ? 0 : Math.min(3, Math.floor(after / (0.7 * vh))));
    tabsEl.style.setProperty(
      "--p",
      String(Math.max(0, Math.min(1, after / (2.8 * vh)))),
    );
  }
  function req() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }
  tabs.forEach(function (t, k) {
    t.addEventListener("click", function () {
      var vh = window.innerHeight,
        top = sec.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: top + (0.9 + k * 0.7 + 0.35) * vh,
        behavior: still ? "auto" : "smooth",
      });
    });
  });
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", function () {
    measure();
    req();
  });
  window.addEventListener("load", function () {
    measure();
    req();
  });
  measure();
  update();
})();
(function () {
  var btn = document.getElementById("menu-btn"),
    links = document.getElementById("nav-links");
  if (btn && links) {
    btn.addEventListener("click", function () {
      var open = links.getAttribute("data-open") === "true";
      links.setAttribute("data-open", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
    links.addEventListener("click", function (e) {
      var t = e.target;
      while (t && t !== links && t.tagName !== "A") t = t.parentNode;
      if (t && t.tagName === "A") {
        links.setAttribute("data-open", "false");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  var hero = document.getElementById("home"),
    cv = document.getElementById("fluid");
  if (!hero || !cv || !cv.getContext) return;
  var ctx = cv.getContext("2d"),
    S = 0.22,
    W = 2,
    H = 2;
  var still =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var blobs = [
    {
      x: 0.1,
      y: 0.22,
      r: 0.46,
      c: "24,40,255",
      a: 0.75,
      sp: 0.00018,
      ph: 0,
      ax: 0.12,
      ay: 0.16,
    },
    {
      x: 0.52,
      y: 0.18,
      r: 0.36,
      c: "20,60,235",
      a: 0.65,
      sp: 0.00022,
      ph: 1.6,
      ax: 0.14,
      ay: 0.12,
    },
    {
      x: 0.86,
      y: 0.4,
      r: 0.46,
      c: "30,150,255",
      a: 0.6,
      sp: 0.00016,
      ph: 3.1,
      ax: 0.1,
      ay: 0.2,
    },
    {
      x: 0.62,
      y: 1.02,
      r: 0.5,
      c: "255,170,160",
      a: 0.55,
      sp: 0.00014,
      ph: 4.4,
      ax: 0.16,
      ay: 0.08,
    },
    {
      x: 0.3,
      y: 0.9,
      r: 0.4,
      c: "10,30,200",
      a: 0.7,
      sp: 0.0002,
      ph: 2.2,
      ax: 0.12,
      ay: 0.1,
    },
  ];
  var mx = 0.5,
    my = 0.5,
    tx = 0.5,
    ty = 0.5,
    running = false,
    t0 = performance.now();
  function size() {
    var r = hero.getBoundingClientRect();
    W = cv.width = Math.max(2, Math.round(r.width * S));
    H = cv.height = Math.max(2, Math.round(r.height * S));
  }
  function draw(now) {
    var t = now - t0,
      m = Math.max(W, H),
      i,
      b,
      x,
      y,
      g;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#02030a";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    for (i = 0; i < blobs.length; i++) {
      b = blobs[i];
      x = (b.x + b.ax * Math.sin(t * b.sp + b.ph)) * W;
      y = (b.y + b.ay * Math.cos(t * b.sp * 1.3 + b.ph)) * H;
      g = ctx.createRadialGradient(x, y, 0, x, y, b.r * m);
      g.addColorStop(0, "rgba(" + b.c + "," + b.a + ")");
      g.addColorStop(1, "rgba(" + b.c + ",0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }
    x = mx * W;
    y = my * H;
    g = ctx.createRadialGradient(x, y, 0, x, y, 0.24 * m);
    g.addColorStop(0, "rgba(120,165,255,.55)");
    g.addColorStop(1, "rgba(120,165,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  var xv = document.getElementById("xh-v"),
    xhh = document.getElementById("xh-h"),
    xd = document.getElementById("xh-dot");
  function place() {
    var w = hero.clientWidth,
      h = hero.clientHeight,
      px = mx * w,
      py = my * h;
    xv.style.transform = "translateX(" + px + "px)";
    xhh.style.transform = "translateY(" + py + "px)";
    xd.style.transform = "translate(" + px + "px," + py + "px)";
  }
  function frame(now) {
    if (!running) return;
    mx += (tx - mx) * 0.08;
    my += (ty - my) * 0.08;
    draw(now);
    place();
    requestAnimationFrame(frame);
  }
  function start() {
    if (running || still) return;
    running = true;
    requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
  }
  hero.addEventListener("mousemove", function (e) {
    var r = hero.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width;
    ty = (e.clientY - r.top) / r.height;
  });
  hero.addEventListener("mouseleave", function () {
    tx = 0.5;
    ty = 0.5;
  });
  window.addEventListener("resize", function () {
    size();
    draw(performance.now());
    place();
  });
  size();
  draw(performance.now());
  place();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      es[0].isIntersecting ? start() : stop();
    }).observe(hero);
  } else {
    start();
  }
})();
(function () {
  var hero = document.getElementById("home"),
    p = document.getElementById("portrait");
  if (!hero || !p) return;
  var still =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tx = 0,
    ty = 0,
    cx = 0,
    cy = 0,
    run = false;
  function frame() {
    cx += (tx - cx) * 0.1;
    cy += (ty - cy) * 0.1;
    p.style.transform = "translate3d(" + cx * 12 + "px," + cy * 6 + "px,0)";
    if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) {
      requestAnimationFrame(frame);
    } else {
      run = false;
    }
  }
  function go() {
    if (!run) {
      run = true;
      requestAnimationFrame(frame);
    }
  }
  if (still) return;
  hero.addEventListener("mousemove", function (e) {
    tx = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth - 0.5) * 2));
    ty = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight - 0.5) * 2));
    go();
  });
  hero.addEventListener("mouseleave", function () {
    tx = 0;
    ty = 0;
    go();
  });
})();
(function () {
  var els = [].slice.call(
    document.querySelectorAll(".stat-card strong[data-to]"),
  );
  if (!els.length) return;
  var still =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still || !("IntersectionObserver" in window)) return;
  function node(el) {
    return el.firstChild;
  }
  function fmt(n) {
    return n < 10 ? "0" + n : String(n);
  }
  els.forEach(function (el) {
    node(el).nodeValue = "00";
  });
  function run(el) {
    var to = +el.getAttribute("data-to"),
      t0 = null,
      dur = 1600;
    function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur),
        e = 1 - Math.pow(1 - k, 3);
      node(el).nodeValue = fmt(Math.round(to * e));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          io.unobserve(en.target);
          run(en.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  els.forEach(function (el) {
    io.observe(el);
  });
})();
(function () {
  var nl = document.querySelector(".nav-links");
  if (!nl) return;
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  var tx = 0,
    ty = 0,
    x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0,
    run = false;
  function frame() {
    x1 += (tx - x1) * 0.22;
    y1 += (ty - y1) * 0.22;
    x2 += (tx - x2) * 0.09;
    y2 += (ty - y2) * 0.09;
    nl.style.setProperty("--x1", x1 + "px");
    nl.style.setProperty("--y1", y1 + "px");
    nl.style.setProperty("--x2", x2 + "px");
    nl.style.setProperty("--y2", y2 + "px");
    if (
      Math.abs(tx - x1) > 0.3 ||
      Math.abs(ty - y1) > 0.3 ||
      Math.abs(tx - x2) > 0.3 ||
      Math.abs(ty - y2) > 0.3
    ) {
      requestAnimationFrame(frame);
    } else {
      run = false;
    }
  }
  function go() {
    if (!run) {
      run = true;
      requestAnimationFrame(frame);
    }
  }
  function pos(e) {
    var r = nl.getBoundingClientRect();
    tx = e.clientX - r.left;
    ty = e.clientY - r.top;
  }
  nl.addEventListener("mouseenter", function (e) {
    pos(e);
    x1 = x2 = tx;
    y1 = y2 = ty;
    nl.classList.add("fx");
    go();
  });
  nl.addEventListener("mousemove", function (e) {
    pos(e);
    go();
  });
  nl.addEventListener("mouseleave", function () {
    nl.classList.remove("fx");
  });
})();
(function () {
  var pl = document.getElementById("preloader"),
    n = document.getElementById("pl-n"),
    fill = document.getElementById("pl-fill");
  var root = document.documentElement;
  if (!pl) {
    root.classList.remove("pl-lock");
    return;
  }
  var still =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MIN = still ? 500 : 2400,
    MAX = 7000,
    t0 = performance.now(),
    loaded = document.readyState === "complete",
    p = 0,
    finished = false;
  window.addEventListener("load", function () {
    loaded = true;
  });
  function done() {
    if (finished) return;
    finished = true;
    pl.classList.add("pl-out");
    setTimeout(
      function () {
        pl.classList.add("pl-done");
        root.classList.remove("pl-lock");
        setTimeout(function () {
          if (pl.parentNode) pl.parentNode.removeChild(pl);
        }, 1200);
      },
      still ? 0 : 450,
    );
  }
  function frame(now) {
    var t = now - t0,
      raw = Math.min(1, t / MIN),
      eased = 1 - Math.pow(1 - raw, 3);
    var ready = (loaded && t >= MIN) || t >= MAX;
    var target = ready ? 100 : Math.min(eased * 100, 92);
    p += (target - p) * 0.12;
    if (ready && p > 99.4) p = 100;
    var v = Math.round(p);
    n.textContent = v;
    fill.style.transform = "scaleX(" + p / 100 + ")";
    pl.setAttribute("aria-valuenow", String(v));
    if (p >= 100) {
      setTimeout(done, still ? 0 : 250);
      return;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
