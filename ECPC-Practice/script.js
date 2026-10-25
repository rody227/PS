/* ECPC Practice — script.js (vanilla JS, works offline from file://) */
(function () {
  "use strict";

  var data = (typeof problems !== "undefined" && Array.isArray(problems)) ? problems : [];

  var KEY = {
    progress: "ecpc.progress.v1",
    notes: "ecpc.notes.v1.",
    last: "ecpc.last.v1",
    theme: "ecpc.theme.v1"
  };
  var STATUS_LABEL = { todo: "Not Started", attempted: "Attempted", solved: "Solved" };
  var HINT_NAMES = ["Hint 1 — Tiny nudge", "Hint 2 — Direction", "Hint 3 — Strong hint"];

  /* ───── safe localStorage ───── */
  var storageOK = true;
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { storageOK = false; return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); return true; } catch (e) { storageOK = false; return false; } }
  };

  /* ───── tiny DOM helpers ───── */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ───── state ───── */
  var progress = {};
  try { progress = JSON.parse(store.get(KEY.progress) || "{}") || {}; } catch (e) { progress = {}; }
  var byId = {};
  data.forEach(function (p) { byId[p.id] = p; });

  var currentId = null;
  var filter = "all";
  var query = "";
  var hintsShown = 0;

  var listEl = $("plist"), mainEl = $("main"), summaryEl = $("summary");

  function statusOf(id) {
    var s = progress[id];
    return (s === "attempted" || s === "solved") ? s : "todo";
  }
  function saveProgress() { store.set(KEY.progress, JSON.stringify(progress)); }

  /* ───── stats ───── */
  function counts() {
    var c = { total: data.length, solved: 0, attempted: 0, todo: 0 };
    data.forEach(function (p) { c[statusOf(p.id)]++; });
    return c;
  }
  function renderStats() {
    var c = counts();
    $("stTotal").textContent = c.total;
    $("stSolved").textContent = c.solved;
    $("stRemaining").textContent = c.total - c.solved;

    var pct = c.total ? Math.round((c.solved / c.total) * 100) : 0;
    summaryEl.textContent = "";
    var top = el("div", "summary-top");
    top.appendChild(el("span", null, "Progress"));
    top.appendChild(el("span", "pct", pct + "%"));
    summaryEl.appendChild(top);
    var bar = el("div", "bar");
    bar.setAttribute("role", "img");
    bar.setAttribute("aria-label", pct + " percent solved");
    var b1 = el("i", "b-solved"); b1.style.width = (c.total ? c.solved / c.total * 100 : 0) + "%";
    var b2 = el("i", "b-attempted"); b2.style.width = (c.total ? c.attempted / c.total * 100 : 0) + "%";
    bar.appendChild(b1); bar.appendChild(b2);
    summaryEl.appendChild(bar);
    var nums = el("div", "summary-nums");
    [["Total Problems", c.total], ["Solved", c.solved], ["Attempted", c.attempted], ["Not Started", c.todo]].forEach(function (r) {
      var s = el("span", null, r[0] + ": ");
      s.appendChild(el("b", null, String(r[1])));
      nums.appendChild(s);
    });
    summaryEl.appendChild(nums);
  }

  /* ───── search + filter ───── */
  function matches(p) {
    if (filter !== "all" && statusOf(p.id) !== filter) return false;
    var q = query.trim().toLowerCase();
    if (!q) return true;
    var letter = p.letter.toLowerCase();
    if (q.length === 1 && /[a-z]/.test(q)) return letter === q;       // a single letter means the problem letter
    q = q.replace(/^problem\s*/, "");
    if (/^\d+$/.test(q)) return String(p.number) === q;                // a number means the problem number
    return p.title.toLowerCase().indexOf(q) !== -1 ||
           letter === q ||
           p.id.toLowerCase().indexOf(q) !== -1;
  }
  function visible() { return data.filter(matches); }

  /* ───── sidebar list ───── */
  function renderList() {
    var vis = visible();
    listEl.textContent = "";
    if (!vis.length) {
      var li = el("li", "empty", "No problems match. Clear the search or choose another filter.");
      listEl.appendChild(li);
      return;
    }
    var frag = document.createDocumentFragment();
    vis.forEach(function (p) {
      var li = document.createElement("li");
      var b = el("button", "item" + (p.id === currentId ? " active" : ""));
      b.type = "button";
      b.setAttribute("data-id", p.id);
      if (p.id === currentId) b.setAttribute("aria-current", "true");
      b.appendChild(el("span", "num", String(p.number)));
      b.appendChild(el("span", "ltr", p.letter));
      b.appendChild(el("span", "ttl", p.title));
      var s = statusOf(p.id);
      var dot = el("span", "dot " + s);
      dot.setAttribute("title", STATUS_LABEL[s]);
      dot.setAttribute("role", "img");
      dot.setAttribute("aria-label", STATUS_LABEL[s]);
      b.appendChild(dot);
      li.appendChild(b);
      frag.appendChild(li);
    });
    listEl.appendChild(frag);
  }

  /* ───── clipboard (Clipboard API with a file:// friendly fallback) ───── */
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
  function copyText(text) {
    return new Promise(function (resolve) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { resolve(true); }, function () { resolve(fallbackCopy(text)); });
      } else {
        resolve(fallbackCopy(text));
      }
    });
  }
  function flash(btn, ok, label) {
    var old = btn.getAttribute("data-label");
    btn.textContent = ok ? "Copied!" : "Press Ctrl+C";
    btn.classList.toggle("done", ok);
    window.setTimeout(function () { btn.textContent = old || label; btn.classList.remove("done"); }, 1400);
  }

  function ioBox(title, text, copyLabel) {
    var box = el("div", "io-box");
    var head = el("div", "io-head");
    head.appendChild(el("span", null, title));
    var btn = el("button", "copy", copyLabel);
    btn.type = "button";
    btn.setAttribute("data-label", copyLabel);
    var pre = el("pre");
    if (text === "") {
      pre.className = "blank";
      pre.textContent = "(empty output)";
      btn.disabled = true;
    } else {
      pre.textContent = text;
      btn.addEventListener("click", function () {
        copyText(text).then(function (ok) {
          if (!ok) {                                  // last resort: select the text so Ctrl+C works
            var r = document.createRange(); r.selectNodeContents(pre);
            var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
          }
          flash(btn, ok, copyLabel);
        });
      });
    }
    head.appendChild(btn);
    box.appendChild(head);
    box.appendChild(pre);
    return box;
  }

  /* ───── problem page ───── */
  function section(title, html, extraClass) {
    var s = el("section", "sec");
    s.appendChild(el("h2", null, title));
    var body = el("div", "prose" + (extraClass ? " " + extraClass : ""));
    if (typeof html === "string") body.innerHTML = html; else body.appendChild(html);
    s.appendChild(body);
    return s;
  }

  function neighbours() {
    var vis = visible();
    var list = vis.some(function (p) { return p.id === currentId; }) ? vis : data;
    var i = list.findIndex(function (p) { return p.id === currentId; });
    return { prev: i > 0 ? list[i - 1] : null, next: i >= 0 && i < list.length - 1 ? list[i + 1] : null };
  }

  function navRow() {
    var row = el("div", "nav-row");
    var n = neighbours();
    var prev = el("button", "btn ghost", "← Previous Problem");
    prev.type = "button"; prev.disabled = !n.prev;
    prev.addEventListener("click", function () { if (n.prev) show(n.prev.id); });
    var back = el("button", "btn ghost", "Back to Problem List");
    back.type = "button";
    back.addEventListener("click", goToList);
    var next = el("button", "btn ghost", "Next Problem →");
    next.type = "button"; next.disabled = !n.next;
    next.addEventListener("click", function () { if (n.next) show(n.next.id); });
    row.appendChild(prev); row.appendChild(back); row.appendChild(next);
    return row;
  }

  function goToList() {
    if (window.matchMedia("(max-width: 900px)").matches) {
      setDrawer(true);
    } else {
      var a = listEl.querySelector(".item.active");
      var target = a || listEl.querySelector(".item");
      if (target) { target.scrollIntoView({ block: "center" }); target.focus(); }
    }
  }
  function setDrawer(open) {
    document.body.classList.toggle("drawer-open", open);
    $("menuBtn").setAttribute("aria-expanded", open ? "true" : "false");
    if (open) { var a = listEl.querySelector(".item.active") || listEl.querySelector(".item"); if (a) a.focus(); }
  }

  function hintBlock(p) {
    var card = el("div", "card");
    var sec = el("section", "sec");
    sec.appendChild(el("h2", null, "Hints"));
    var intro = el("p", "note-hint", "Hints stay hidden until you ask. Each level needs its own click, and none of them gives the full solution.");
    sec.appendChild(intro);
    var list = el("div", "hint-list");
    var actions = el("div", "hint-actions");
    sec.appendChild(list); sec.appendChild(actions);
    hintsShown = 0;

    function draw() {
      list.textContent = "";
      actions.textContent = "";
      for (var i = 0; i < hintsShown; i++) {
        var text = p.hints && p.hints[i];
        var h = el("div", "hint" + (text ? "" : " unavailable"));
        h.appendChild(el("b", null, HINT_NAMES[i]));
        h.appendChild(el("span", null, text || "Hint unavailable for this problem."));
        list.appendChild(h);
      }
      if (hintsShown < 3) {
        var b = el("button", "btn", hintsShown === 0 ? "Show Hint 1" : "Show Hint " + (hintsShown + 1));
        b.type = "button";
        b.addEventListener("click", function () { hintsShown++; draw(); });
        actions.appendChild(b);
      }
      if (hintsShown > 0) {
        var hide = el("button", "btn ghost", "Hide hints");
        hide.type = "button";
        hide.addEventListener("click", function () { hintsShown = 0; draw(); });
        actions.appendChild(hide);
      }
    }
    draw();
    card.appendChild(sec);
    return card;
  }

  function notesBlock(p) {
    var card = el("div", "card");
    var sec = el("section", "sec");
    sec.appendChild(el("h2", null, "My Notes"));
    sec.appendChild(el("p", "note-hint", "Observations, ideas you tried, mistakes, things you learned. Saved automatically in this browser."));
    var ta = el("textarea", "notes");
    ta.setAttribute("aria-label", "Personal notes for " + p.title);
    ta.placeholder = "Write your notes here…";
    ta.value = store.get(KEY.notes + p.id) || "";
    var saved = el("div", "saved");
    saved.setAttribute("aria-live", "polite");
    var timer = null;
    function save() {
      window.clearTimeout(timer);
      var ok = store.set(KEY.notes + p.id, ta.value);
      saved.textContent = ok ? "Saved" : "Could not save in this browser mode";
      if (ok) window.setTimeout(function () { if (saved.textContent === "Saved") saved.textContent = ""; }, 1500);
    }
    ta.addEventListener("input", function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(save, 350);
    });
    ta.addEventListener("blur", function () { if (timer) save(); });
    window.addEventListener("pagehide", function () { if (timer) save(); });
    sec.appendChild(ta); sec.appendChild(saved);
    card.appendChild(sec);
    return card;
  }

  function statusRow(p) {
    var row = el("div", "status-row");
    row.appendChild(el("span", "limits", "Status:"));
    var seg = el("div", "seg");
    seg.setAttribute("role", "group");
    seg.setAttribute("aria-label", "Problem status");
    ["todo", "attempted", "solved"].forEach(function (s) {
      var b = el("button", null, STATUS_LABEL[s]);
      b.type = "button";
      b.setAttribute("data-s", s);
      b.setAttribute("aria-pressed", statusOf(p.id) === s ? "true" : "false");
      b.addEventListener("click", function () {
        if (s === "todo") delete progress[p.id]; else progress[p.id] = s;
        saveProgress();
        Array.prototype.forEach.call(seg.children, function (c) {
          c.setAttribute("aria-pressed", c.getAttribute("data-s") === s ? "true" : "false");
        });
        renderStats();
        renderList();
      });
      seg.appendChild(b);
    });
    row.appendChild(seg);
    return row;
  }

  function show(id) {
    var p = byId[id];
    if (!p) return;
    currentId = id;
    store.set(KEY.last, id);
    mainEl.textContent = "";

    if (!storageOK) {
      mainEl.appendChild(el("div", "storage-warn", "This browser blocks local storage, so progress and notes will not be saved after you close the page."));
    }

    /* header card */
    var head = el("div", "card p-head");
    var h1 = el("h1");
    h1.appendChild(el("span", "letter", p.letter + "."));
    h1.appendChild(document.createTextNode(" " + p.title));
    head.appendChild(h1);
    head.appendChild(el("div", "limits", "Problem " + p.number + " of " + data.length + "  •  " + p.limits.time + "  •  " + p.limits.memory));
    head.appendChild(statusRow(p));
    mainEl.appendChild(head);

    /* extraction notes */
    if (p.warnings && p.warnings.length) {
      var d = el("details", "warn");
      d.appendChild(el("summary", null, "⚠️ Extraction notes (" + p.warnings.length + ")"));
      var ul = el("ul");
      p.warnings.forEach(function (w) { var li = el("li"); li.innerHTML = w; ul.appendChild(li); });
      d.appendChild(ul);
      mainEl.appendChild(d);
    }

    /* statement card */
    var card = el("div", "card");
    card.appendChild(section("Problem Statement", p.statement || "<p>⚠️ Unable to extract accurately from PDF.</p>"));
    if (p.figure) {
      var figBox = el("div", "prose"); figBox.innerHTML = p.figure;
      card.querySelector(".sec").appendChild(figBox);
    }
    card.appendChild(section("Input", p.input || "<p>⚠️ Unable to extract accurately from PDF.</p>"));
    card.appendChild(section("Output", p.output || "<p>⚠️ Unable to extract accurately from PDF.</p>"));
    if (p.constraints) card.appendChild(section("Constraints", p.constraints));

    /* examples */
    var ex = el("div");
    (p.examples || []).forEach(function (e, i) {
      var n = i + 1;
      var wrap = el("div", "example");
      wrap.appendChild(el("h3", null, "Example " + n));
      var io = el("div", "io");
      io.appendChild(ioBox("Sample Input " + n, e.input, "Copy Input"));
      io.appendChild(ioBox("Sample Output " + n, e.output, "Copy Output"));
      wrap.appendChild(io);
      if (e.explanation) {
        var x = el("div", "prose explain"); x.innerHTML = e.explanation; wrap.appendChild(x);
      }
      ex.appendChild(wrap);
    });
    card.appendChild(section("Examples", ex));

    if (p.notes) card.appendChild(section("Notes", p.notes));
    mainEl.appendChild(card);

    mainEl.appendChild(hintBlock(p));
    mainEl.appendChild(notesBlock(p));
    mainEl.appendChild(navRow());

    renderList();
    setDrawer(false);
    window.scrollTo(0, 0);
  }

  /* ───── events ───── */
  listEl.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button[data-id]") : null;
    if (b) show(b.getAttribute("data-id"));
  });

  $("search").addEventListener("input", function (e) { query = e.target.value; renderList(); refreshNav(); });

  $("filters").addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button[data-f]") : null;
    if (!b) return;
    filter = b.getAttribute("data-f");
    Array.prototype.forEach.call($("filters").children, function (c) {
      c.setAttribute("aria-pressed", c === b ? "true" : "false");
    });
    renderList();
    refreshNav();
  });

  function refreshNav() {
    var old = mainEl.querySelector(".nav-row");
    if (old && currentId) mainEl.replaceChild(navRow(), old);
  }

  $("menuBtn").addEventListener("click", function () { setDrawer(!document.body.classList.contains("drawer-open")); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setDrawer(false); });

  /* ───── theme ───── */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var b = $("themeBtn");
    b.textContent = t === "dark" ? "Light" : "Dark";
    b.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  applyTheme(store.get(KEY.theme) === "dark" ? "dark" : "light");
  $("themeBtn").addEventListener("click", function () {
    var t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(t);
    store.set(KEY.theme, t);
  });

  /* ───── start ───── */
  renderStats();
  var last = store.get(KEY.last);
  var startId = (last && byId[last]) ? last : (data[0] && data[0].id);
  if (startId) show(startId); else renderList();
})();
