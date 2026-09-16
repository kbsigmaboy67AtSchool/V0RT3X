<!DOCTYPE html>
<html lang="en" id="thishtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>&ZeroWidthSpace;</title>
  <link rel="shortcut icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' />">
  <script>
/* Immediately create a blob URL of the current HTML and navigate to it,
   unless the page is already inside an iframe or already a blob URL. */
(function () {
  if (window.self !== window.top) return;      // **do nothing if in an iframe**
  if (location.protocol === 'blob:') return;   // avoid infinite reload loop

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>V0RT3X Chat</title>
   <link rel="shortcut icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' />">
  <style>
    body {
      margin: 0;
      background: #000;
      color: #fff;
      font-family: system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    #s { opacity: 0.6; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div id="s">Loading V0RT3X…</div>
  <script>
    // Short loader — always loads the official client
    // Host this file anywhere. Update the GitHub client → everyone gets it.
    (async () => {
      const URLS = [
        "https://kbsigmaboy67atschool.github.io/V0RT3X-C0D3S/index.html",
        "https://raw.githubusercontent.com/kbsigmaboy67AtSchool/V0RT3X-C0D3S/main/index.html",
        "https://cdn.jsdelivr.net/gh/kbsigmaboy67AtSchool/V0RT3X-C0D3S@main/index.html",
      ];
      const status = document.getElementById("s");
      for (const url of URLS) {
        try {
          status.textContent = "Fetching…";
          const res = await fetch(url + "?t=" + Date.now(), { cache: "no-store" });
          if (!res.ok) throw new Error(res.status);
          const html = await res.text();
          document.open();
          document.write(html);
          document.close();
          return;
        } catch (e) {
          console.warn("Failed", url, e);
        }
      }
      status.textContent = "Could not load V0RT3X. Check network / repo.";
    })();
  <\/script>
<\/body>
<\/html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const blobUrl = URL.createObjectURL(blob);

  // Replace current document with the Blob URL (no back entry)
  location.replace(blobUrl);
})();
</script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=mic,mic_off,attach_file,folder_open,send,lock,person" />
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js"></script>
  <style>
    :root {
      --bg:#000; --surface:#0d0d0d; --surface2:#161616; --text:#fff;
      --muted:#a8a8a8; --border:#fff; --hover:#1c1c1c;
      --own:#1a1a1a; --other:#111; --danger:#ff4d6a; --success:#2fce56;
      --voice:#5b8def; --radius:14px;
      --font:"Ubuntu","Segoe UI",system-ui,sans-serif;
      --ease:cubic-bezier(0.22,1,0.36,1);
    }
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:var(--font);background:var(--bg);color:var(--text);height:100vh;display:flex;flex-direction:column;overflow:hidden}
    .material-symbols-outlined{font-variation-settings:"FILL" 0,"wght" 400,"GRAD" 0,"opsz" 24;font-size:18px;vertical-align:middle;user-select:none}
    
    .tabbar{display:flex;gap:6px;padding:8px 12px;border-bottom:2px solid #333;background:#0a0a0a;overflow-x:auto;flex-shrink:0;align-items:center}
    .tab{padding:6px 12px;border:2px solid #333;border-radius:999px;background:#111;color:#ccc;cursor:pointer;font-size:0.78rem;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis}
    .tab.on{border-color:#fff;color:#fff;box-shadow:0 0 8px rgba(255,255,255,0.2)}
    .tab .x{margin-left:6px;opacity:0.5}
    .pub-list{display:flex;flex-direction:column;gap:6px;max-height:160px;overflow-y:auto}
    .pub-item{padding:8px;border:1px solid #333;border-radius:10px;cursor:pointer;font-size:0.78rem;background:#111}
    .pub-item:hover{border-color:#fff}
    .pub-item .t{font-weight:600;color:#fff}
    .pub-item .n{color:#888;font-size:0.72rem;margin-top:2px}
    #idbModal,#newChatModal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:70;align-items:center;justify-content:center}
    #idbModal.on,#newChatModal.on{display:flex}
    .modal-box{background:#111;border:2px solid #fff;border-radius:16px;padding:18px;width:min(440px,94%);max-height:85vh;overflow:auto;display:flex;flex-direction:column;gap:10px}
    .saved-relay{display:flex;gap:6px;align-items:center;font-size:0.78rem}

    header{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;border-bottom:2px solid var(--border);flex-shrink:0}
    .logo{font-weight:700;font-size:1.45rem;letter-spacing:.1em;text-shadow:0 0 8px rgba(255,255,255,.35),0 0 18px rgba(255,255,255,.15)}
    .logo span{opacity:.55;font-weight:400;font-size:.8em;text-shadow:none}
    .status{display:flex;align-items:center;gap:10px;font-size:.78rem;color:var(--muted)}
    .dot{width:8px;height:8px;border-radius:50%;background:#555;transition:.3s}
    .dot.on{background:var(--success);box-shadow:0 0 10px var(--success)}
    .dot.enc{background:#fff;box-shadow:0 0 10px rgba(255,255,255,.6)}
    .dot.voice{background:var(--voice);box-shadow:0 0 10px var(--voice)}
    main{flex:1;display:flex;min-height:0}
    .panel{width:320px;background:var(--surface);border-right:2px solid var(--border);padding:14px;display:flex;flex-direction:column;gap:11px;overflow-y:auto;flex-shrink:0}
    .panel h2{font-size:.7rem;text-transform:uppercase;letter-spacing:.14em;color:var(--muted);margin-bottom:2px}
    label{display:block;font-size:.75rem;color:var(--muted);margin-bottom:4px}
    input,button,textarea{font-family:var(--font);font-size:.88rem}
    input,textarea{width:100%;padding:9px 12px;background:var(--surface2);border:2px solid #333;border-radius:var(--radius);color:var(--text);outline:none;transition:border-color .2s,background .2s}
    input:focus,textarea:focus{border-color:var(--border);background:var(--hover)}
    textarea{min-height:70px;resize:vertical;font-size:.78rem}
    .btn{padding:9px 12px;border:2px solid var(--border);border-radius:var(--radius);cursor:pointer;font-weight:600;background:var(--bg);color:var(--text);transition:background .2s,transform .15s,opacity .2s;display:inline-flex;align-items:center;justify-content:center;gap:6px}
    .btn:hover:not(:disabled){background:var(--hover)}
    .btn:active:not(:disabled){transform:scale(.97)}
    .btn:disabled{opacity:.4;cursor:not-allowed}
    .btn-danger{border-color:var(--danger);color:var(--danger);background:transparent}
    .btn-danger:hover:not(:disabled){background:rgba(255,77,106,.12)}
    .btn-voice{border-color:var(--voice);color:var(--voice);background:transparent}
    .btn-voice:hover:not(:disabled){background:rgba(91,141,239,.12)}
    .btn-voice.active{background:rgba(91,141,239,.2);box-shadow:0 0 12px rgba(91,141,239,.35)}
    .btn-icon{padding:9px;min-width:40px}
    .row{display:flex;gap:8px}.row .btn{flex:1}
    .hint{font-size:.7rem;color:var(--muted);line-height:1.4}
    .id-line{font-size:.68rem;color:#666;letter-spacing:.04em;margin-top:2px}
    .voice-bar{display:flex;flex-wrap:wrap;gap:8px;padding:10px;background:var(--surface2);border:2px solid #333;border-radius:var(--radius)}
    .voice-bar.on{border-color:var(--voice)}
    .voice-bar .label{width:100%;font-size:.7rem;color:var(--muted)}
    .voice-peers{width:100%;font-size:.75rem;min-height:1.4em;display:flex;flex-wrap:wrap;gap:6px}
    .voice-peer{display:inline-flex;align-items:center;gap:4px;padding:3px 10px 3px 6px;background:rgba(91,141,239,.12);border-radius:999px;color:#b8d0ff;border:1px solid transparent}
    .voice-peer .mic-icon{font-size:16px;color:var(--voice)}
    .voice-peer.talking .mic-icon{color:#7eb6ff;text-shadow:0 0 6px #5b8def,0 0 14px #5b8def}
    .voice-peer.muted .mic-icon{color:#666;text-shadow:none}
    .settings-box,.acl-box{padding:10px;background:var(--surface2);border:2px solid #333;border-radius:var(--radius);display:flex;flex-direction:column;gap:8px}
    .settings-box label.chk,.acl-box label.chk{display:flex;align-items:center;gap:8px;font-size:.8rem;color:var(--text);cursor:pointer;margin:0}
    input[type=checkbox]{width:auto;accent-color:var(--voice)}
    .credit{margin-top:auto;padding-top:10px;border-top:1px solid #2a2a2a;font-size:.68rem;color:#666;text-align:center;line-height:1.4}
    .chat{flex:1;display:flex;flex-direction:column;min-width:0;background:var(--bg)}
    .messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:8px}
    .msg{max-width:78%;padding:9px 13px;border-radius:var(--radius);line-height:1.45;font-size:.9rem;word-break:break-word;border:1.5px solid #333;animation:msgIn .28s var(--ease)}
    .msg[data-mid]{cursor:pointer}
    @keyframes msgIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    .msg.own{align-self:flex-end;background:var(--own);border-color:#444;border-bottom-right-radius:4px}
    .msg.other{align-self:flex-start;background:var(--other);border-bottom-left-radius:4px}
    .msg.system{align-self:center;background:transparent;color:var(--muted);font-size:.78rem;border:none;padding:3px 8px;animation:none}
    .msg .meta{font-size:.68rem;color:var(--muted);margin-bottom:2px;display:flex;gap:8px;flex-wrap:wrap}
    .msg.own .meta{justify-content:flex-end}
    .msg .user{color:var(--text);font-weight:600;text-shadow:0 0 6px rgba(255,255,255,.25)}
    .msg .ipid{font-size:.62rem;color:#555}
    .msg .reads{font-size:.65rem;color:#666;margin-top:4px}
    .msg .file-card{margin-top:6px;padding:8px 10px;background:rgba(255,255,255,.06);border-radius:10px;border:1px solid #333;display:flex;align-items:center;gap:10px}
    .msg .file-card img{max-width:220px;max-height:180px;border-radius:8px;display:block}
    .msg .file-card a{color:#7eb6ff;text-decoration:none;font-size:.85rem}

    .msg .md-body{line-height:1.5}
    .msg .md-body p{margin:0.25em 0}
    .msg .md-body p:first-child{margin-top:0}
    .msg .md-body p:last-child{margin-bottom:0}
    .msg .md-body h1,.msg .md-body h2,.msg .md-body h3,.msg .md-body h4{margin:0.4em 0 0.2em;font-weight:700;text-shadow:0 0 6px rgba(255,255,255,0.2)}
    .msg .md-body h1{font-size:1.25em}.msg .md-body h2{font-size:1.12em}.msg .md-body h3{font-size:1.02em}
    .msg .md-body ul,.msg .md-body ol{margin:0.3em 0 0.3em 1.2em}
    .msg .md-body code{background:#1a1a1a;border:1px solid #333;border-radius:5px;padding:1px 5px;font-size:0.85em}
    .msg .md-body pre{background:#0a0a0a;border:1px solid #333;border-radius:10px;padding:10px;overflow-x:auto;margin:0.4em 0}
    .msg .md-body pre code{background:none;border:none;padding:0}
    .msg .md-body blockquote{border-left:3px solid #555;margin:0.4em 0;padding:0.2em 0.8em;color:#aaa}
    .msg .md-body a{color:#7eb6ff}
    .msg .md-body img{max-width:100%;border-radius:8px;margin:0.3em 0}
    .msg .md-body table{border-collapse:collapse;margin:0.4em 0;font-size:0.88em}
    .msg .md-body th,.msg .md-body td{border:1px solid #444;padding:4px 8px}
    .msg .md-body hr{border:none;border-top:1px solid #333;margin:0.6em 0}
    .msg .md-body .md2{display:inline}
    .compose{padding:12px 16px;border-top:2px solid var(--border);background:var(--surface);display:flex;gap:8px;align-items:center}
    .compose input[type=text]{flex:1;padding:11px 13px}
    .compose .btn{padding:11px 14px;white-space:nowrap}

    .compose{flex-wrap:wrap;align-items:flex-end}
    .compose-tools{display:flex;gap:6px;align-items:center;width:100%;order:-1;margin-bottom:4px}
    #msgInput{flex:1;min-height:42px;max-height:140px;resize:vertical;padding:10px 12px;line-height:1.35}
    #monacoHost{display:none;flex:1;height:160px;border:2px solid #333;border-radius:var(--radius);overflow:hidden}
    #monacoHost.on{display:block}
    #msgInput.html-hidden{display:none}
    .emoji-panel{display:none;position:absolute;bottom:70px;left:12px;right:12px;max-width:420px;max-height:220px;overflow:auto;background:#111;border:2px solid #fff;border-radius:14px;padding:10px;z-index:30;flex-wrap:wrap;gap:4px}
    .emoji-panel.on{display:flex}
    .emoji-panel button{background:transparent;border:none;font-size:1.35rem;cursor:pointer;padding:4px;border-radius:8px;line-height:1}
    .emoji-panel button:hover{background:#222}
    .msg .html-frame{width:100%;min-height:120px;max-height:360px;border:1px solid #333;border-radius:10px;background:#0a0a0a;margin-top:6px}
    .mode-tag{font-size:.68rem;color:var(--voice);padding:2px 8px;border:1px solid var(--voice);border-radius:999px}

    #fileInput,#folderInput{display:none}
    
    .msg.deleted-local{opacity:0.35;font-style:italic}
    .msg .edited-tag{font-size:0.62rem;color:#666;margin-left:6px}
    #msgMenu{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:60;align-items:center;justify-content:center}
    #msgMenu.on{display:flex}
    #msgMenuBox{background:#111;border:2px solid #fff;border-radius:16px;padding:16px 18px;width:min(360px,92%);max-height:85vh;overflow:auto;display:flex;flex-direction:column;gap:8px}
    #msgMenuBox h3{font-size:0.95rem;margin-bottom:4px}
    #msgMenuBox .menu-actions{display:flex;flex-direction:column;gap:6px}
    #msgMenuBox .menu-actions .btn{width:100%;justify-content:flex-start}
    #msgPreview{background:#0a0a0a;border:1px solid #333;border-radius:12px;padding:12px;max-height:40vh;overflow:auto;font-size:0.9rem;margin:6px 0}
    #msgPreview.large{font-size:1.25rem;max-height:60vh}
    #editArea{display:none;flex-direction:column;gap:8px}
    #editArea.on{display:flex}
    #editArea textarea{min-height:90px}

    #receiptModal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:50;align-items:center;justify-content:center}
    #receiptModal.on{display:flex}
    #receiptBox{background:#111;border:2px solid #fff;border-radius:16px;padding:18px 20px;max-width:90%;width:320px;max-height:70vh;overflow:auto}
    #receiptBox h3{font-size:.95rem;margin-bottom:10px}
    #receiptBox li{font-size:.82rem;color:var(--muted);margin:6px 0;list-style:none}
    #receiptBox button{margin-top:12px;width:100%}
    #loginGate{display:none;position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:40;align-items:center;justify-content:center}
    #loginGate.on{display:flex}
    #loginBox{background:#111;border:2px solid #fff;border-radius:16px;padding:20px;width:min(360px,92%);display:flex;flex-direction:column;gap:10px}
    #loginBox h3{font-size:1rem}
    @media(max-width:720px){main{flex-direction:column}.panel{width:100%;border-right:none;border-bottom:2px solid var(--border);max-height:42vh}}
  </style>
</head>
<body>
  <header>
    <div class="logo">V0RT3X <span>Chat</span></div>
    <div class="status">
      <span id="statusText">disconnected</span>
      <div class="dot" id="connDot"></div>
      <div class="dot" id="encDot"></div>
      <div class="dot" id="voiceDot"></div>
    </div>
  </header>
  <div class="tabbar" id="tabbar">
    <button class="tab on" data-tab="main" type="button">Main</button>
    <button class="btn btn-icon" id="newTabBtn" title="New tab" type="button" style="border-radius:999px;padding:6px 10px">+</button>
  </div>
  <main>
    <aside class="panel">

      <div>
        <h2>Quick start</h2>
        <div class="row">
          <button class="btn" id="openNewChatBtn" type="button" style="flex:1">New chat</button>
          <button class="btn" id="openIdbBtn" type="button" style="flex:1">Saved data</button>
        </div>
        <p class="hint" style="margin-top:5px">Multi-tab · multi-relay · public list</p>
      </div>
      <div>
        <h2>Public rooms</h2>
        <div class="row">
          <button class="btn" id="refreshPublicBtn" type="button" style="flex:1" disabled>Refresh</button>
          <button class="btn" id="publishRoomBtn" type="button" style="flex:1" disabled>Publish</button>
          <button class="btn btn-danger" id="unpublishRoomBtn" type="button" style="flex:1" disabled>Unpublish</button>
        </div>
        <div class="pub-list" id="publicList"><p class="hint">Connect to a relay, then refresh.</p></div>
      </div>
      <div>
        <h2>Saved WebSockets</h2>
        <div id="savedRelays" class="pub-list"></div>
        <button class="btn" id="saveRelayBtn" type="button" style="width:100%;margin-top:6px" disabled>Save current WSS</button>
      </div>

      <div>
        <h2>Identity</h2>
        <label for="username">Username</label>
        <input id="username" placeholder="anon" maxlength="24" />
        <div class="id-line" id="myIdLine">hash: —</div>
      </div>
      <div>
        <h2>Room = WSS Link</h2>
        <label for="relay">WebSocket URL</label>
        <input id="relay" placeholder="wss://relay.example/r/my-room" />
        <p class="hint" style="margin-top:5px">Not saved. One IP-hash per room.</p>
      </div>
      <div>
        <h2>Encryption</h2>
        <label for="passphrase">Shared passphrase</label>
        <input id="passphrase" type="password" placeholder="strong secret" autocomplete="off" />
      </div>
      <div class="row">
        <button class="btn" id="connectBtn">Connect</button>
        <button class="btn btn-danger" id="disconnectBtn" disabled>Leave</button>
      </div>
      <div>
        <h2>Room settings</h2>
        <div class="settings-box">
          <label class="chk"><input type="checkbox" id="setText" checked /> Text chat</label>
          <label class="chk"><input type="checkbox" id="setVoice" checked /> Voice chat</label>
          <label class="chk"><input type="checkbox" id="setFiles" checked /> File / image send</label>
          <button class="btn" id="applySettingsBtn" disabled style="width:100%">Apply settings</button>
        </div>
      </div>
      <div>
        <h2>Accounts (optional)</h2>
        <div class="acl-box">
          <label class="chk"><input type="checkbox" id="aclEnabled" /> Require accounts</label>
          <label class="chk"><input type="checkbox" id="aclGuests" checked /> Allow guests</label>
          <p class="hint">One account per line:<br><code>user:pass:read,write,voice,files</code></p>
          <textarea id="aclText" placeholder="alice:secret:read,write,voice,files&#10;bob:hunter2:read,write"></textarea>
          <button class="btn" id="applyAclBtn" disabled style="width:100%">Apply account list</button>
          <p class="hint">Honest clients only. Not real server ACL.</p>
        </div>
      </div>
      <div>
        <h2>Voice</h2>
        <div class="voice-bar" id="voiceBar">
          <div class="label">P2P · mic glow · one hash</div>
          <button class="btn btn-voice" id="voiceJoinBtn" disabled><span class="material-symbols-outlined">mic</span> Join</button>
          <button class="btn btn-voice" id="voiceMuteBtn" disabled><span class="material-symbols-outlined">mic_off</span> Mute</button>
          <button class="btn btn-danger" id="voiceLeaveBtn" disabled>Leave VC</button>
          <div class="voice-peers" id="voicePeers"></div>
        </div>
      </div>
      <div class="credit">made by Xclounkit234X got bored.<br>V0RT3X Chat · seraph-inspired</div>
    </aside>
    <section class="chat">
      <div class="messages" id="messages"></div>
      <div class="compose" style="position:relative">
        <div class="compose-tools">
          <button class="btn btn-icon" id="attachBtn" disabled title="Upload file"><span class="material-symbols-outlined">attach_file</span></button>
          <button class="btn btn-icon" id="folderBtn" disabled title="Upload folder"><span class="material-symbols-outlined">folder_open</span></button>
          <button class="btn btn-icon" id="emojiBtn" disabled title="Emoji">😀</button>
          <span class="mode-tag" id="modeTag">text</span>
          <input type="file" id="fileInput" multiple />
          <input type="file" id="folderInput" webkitdirectory multiple />
        </div>
        <div id="emojiPanel" class="emoji-panel"></div>
        <textarea id="msgInput" placeholder="Message… Enter send · Shift+Enter newline · starts with &lt; = HTML" disabled autocomplete="off" rows="2"></textarea>
        <div id="monacoHost"></div>
        <button class="btn" id="sendBtn" disabled><span class="material-symbols-outlined">send</span></button>
      </div>
    </section>
  </main>
  
  
  <div id="newChatModal"><div class="modal-box">
    <h3>Start chat</h3>
    <label class="chk"><input type="checkbox" id="ncEncrypted" checked /> Encrypted (AES)</label>
    <label class="chk"><input type="checkbox" id="ncPublic" /> List as public room</label>
    <label>Room title (public)</label>
    <input id="ncTitle" placeholder="Lobby" />
    <label>Note (optional — can include key if you want)</label>
    <input id="ncNote" placeholder="key=secret still encrypts traffic" />
    <label>WebSocket URL</label>
    <input id="ncRelay" placeholder="wss://…" />
    <label>Passphrase (if encrypted)</label>
    <input id="ncPass" type="password" placeholder="empty only if unencrypted" />
    <button class="btn" id="ncStartBtn" style="width:100%">Open in new tab</button>
    <button class="btn btn-danger" id="ncCancelBtn" style="width:100%">Cancel</button>
  </div></div>
  <div id="idbModal"><div class="modal-box">
    <h3>Device storage (IndexedDB)</h3>
    <p class="hint">Conversations encrypted at rest with room key. Load+broadcast = simulated cloud history.</p>
    <button class="btn" id="idbSaveConvBtn" style="width:100%">Save current conversation</button>
    <div id="idbList" class="pub-list"></div>
    <button class="btn btn-danger" id="idbCloseBtn" style="width:100%">Close</button>
  </div></div>

  <div id="msgMenu"><div id="msgMenuBox">
    <h3>Message</h3>
    <div id="msgPreview"></div>
    <div class="menu-actions" id="msgMenuActions"></div>
    <div id="editArea">
      <textarea id="editInput" placeholder="Edit message…"></textarea>
      <button class="btn" id="editSaveBtn">Save edit</button>
      <button class="btn btn-danger" id="editCancelBtn">Cancel edit</button>
    </div>
    <button class="btn" id="msgMenuClose" style="width:100%;margin-top:4px">Close</button>
  </div></div>

  <div id="receiptModal"><div id="receiptBox">
    <h3>Read by</h3>
    <ul id="receiptList"></ul>
    <button class="btn" id="receiptClose">Close</button>
  </div></div>
  <div id="loginGate"><div id="loginBox">
    <h3><span class="material-symbols-outlined">lock</span> Room login</h3>
    <p class="hint" id="loginHint">This room requires an account (or guest).</p>
    <label>Account username</label>
    <input id="loginUser" placeholder="username or blank for guest" />
    <label>Password</label>
    <input id="loginPass" type="password" placeholder="password" autocomplete="off" />
    <button class="btn" id="loginBtn" style="width:100%">Enter room</button>
    <button class="btn btn-danger" id="loginCancel" style="width:100%">Cancel</button>
  </div></div>
<script>
function uuid(){if(crypto.randomUUID)try{return crypto.randomUUID();}catch(_){}
  const b=new Uint8Array(16);(crypto.getRandomValues||function(a){for(let i=0;i<a.length;i++)a[i]=Math.random()*256|0;})(b);
  b[6]=(b[6]&0x0f)|0x40;b[8]=(b[8]&0x3f)|0x80;return [...b].map(x=>x.toString(16).padStart(2,"0")).join("");}
const $=id=>document.getElementById(id);
const els={
  username:$("username"),relay:$("relay"),passphrase:$("passphrase"),
  connectBtn:$("connectBtn"),disconnectBtn:$("disconnectBtn"),
  msgInput:$("msgInput"),sendBtn:$("sendBtn"),messages:$("messages"),
  statusText:$("statusText"),connDot:$("connDot"),encDot:$("encDot"),voiceDot:$("voiceDot"),
  voiceBar:$("voiceBar"),voiceJoinBtn:$("voiceJoinBtn"),voiceMuteBtn:$("voiceMuteBtn"),
  voiceLeaveBtn:$("voiceLeaveBtn"),voicePeers:$("voicePeers"),myIdLine:$("myIdLine"),
  setText:$("setText"),setVoice:$("setVoice"),setFiles:$("setFiles"),applySettingsBtn:$("applySettingsBtn"),
  aclEnabled:$("aclEnabled"),aclGuests:$("aclGuests"),aclText:$("aclText"),applyAclBtn:$("applyAclBtn"),
  attachBtn:$("attachBtn"),folderBtn:$("folderBtn"),fileInput:$("fileInput"),folderInput:$("folderInput"),
  emojiBtn:$("emojiBtn"),emojiPanel:$("emojiPanel"),modeTag:$("modeTag"),monacoHost:$("monacoHost"),
  receiptModal:$("receiptModal"),receiptList:$("receiptList"),receiptClose:$("receiptClose"),
  msgMenu:$("msgMenu"),msgMenuBox:$("msgMenuBox"),msgPreview:$("msgPreview"),msgMenuActions:$("msgMenuActions"),msgMenuClose:$("msgMenuClose"),
  editArea:$("editArea"),editInput:$("editInput"),editSaveBtn:$("editSaveBtn"),editCancelBtn:$("editCancelBtn"),
  loginGate:$("loginGate"),loginUser:$("loginUser"),loginPass:$("loginPass"),
  loginBtn:$("loginBtn"),loginCancel:$("loginCancel"),loginHint:$("loginHint"),
};
const MAX_FILE=1.5*1024*1024;
let ws=null,aesKey=null,connected=false,authed=false;
let myId=crypto.randomUUID().slice(0,8),myIpId=null,mySid=null;
let currentRoomKey="",myName="user";
let roomSettings={text:true,voice:true,files:true};
let roomCreatorId=null; // only this id may change settings/ACL
let htmlMode=false;
let monacoEditor=null;
let monacoLoading=false;

let acl={enabled:false,guests:true,accounts:{},guestPerms:{read:true,write:false,voice:false,files:false}};
let myPerms={read:true,write:true,voice:true,files:true},accountName=null;
const online=new Map(),receipts=new Map();
const msgStore=new Map();
let _sendingMsg=false;
const UNSEND_MS=5*60*1000;
let inVoice=false,muted=false,localStream=null;
const peers=new Map();
const rtcConfig={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]};
let localAnalyser=null,localAudioCtx=null,volRaf=null;
(function(){const u=localStorage.getItem("v0rt3x_username");els.username.value=u||"user";})();
els.username.addEventListener("change",()=>{localStorage.setItem("v0rt3x_username",(els.username.value.trim()||"user").slice(0,24));});

async function deriveKey(pass,roomKey){
  const enc=new TextEncoder();
  const km=await crypto.subtle.importKey("raw",enc.encode(pass),"PBKDF2",false,["deriveKey"]);
  return crypto.subtle.deriveKey({name:"PBKDF2",salt:enc.encode("V0RT3X-v2|"+roomKey),iterations:100000,hash:"SHA-256"},km,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);
}
async function encryptBytes(buf){
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const c=await crypto.subtle.encrypt({name:"AES-GCM",iv},aesKey,buf);
  const p=new Uint8Array(12+c.byteLength);p.set(iv,0);p.set(new Uint8Array(c),12);return p;
}
async function decryptBytes(p){return new Uint8Array(await crypto.subtle.decrypt({name:"AES-GCM",iv:p.slice(0,12)},aesKey,p.slice(12)));}
function b64enc(u8){let s="";for(let i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode(...u8.subarray(i,i+0x8000));return btoa(s);}
function b64dec(b64){const b=atob(b64);const u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
async function encryptText(t){return b64enc(await encryptBytes(new TextEncoder().encode(t)));}
async function decryptText(b64){try{return new TextDecoder().decode(await decryptBytes(b64dec(b64)));}catch{return null;}}

function setStatus(t,c,e,v){els.statusText.textContent=t;els.connDot.classList.toggle("on",!!c);els.encDot.classList.toggle("enc",!!e);els.voiceDot.classList.toggle("voice",!!v);}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function nowTime(){return new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});}
function roomKeyFromUrl(url){try{const u=new URL(url);return(u.host+u.pathname).replace(/\/+$/,"")||u.host;}catch{return url;}}
function ipTaken(ipId,exceptId){if(!ipId)return false;for(const[id,o]of online)if(o.ipId===ipId&&id!==exceptId)return true;return false;}
function claimUsername(wanted){const taken=new Set([...online.values()].map(x=>x.u.toLowerCase()));let name=(wanted||"anon").slice(0,24);if(!taken.has(name.toLowerCase()))return name;for(let i=2;i<100;i++){const n=(wanted+i).slice(0,24);if(!taken.has(n.toLowerCase()))return n;}return name+"-"+myId.slice(0,4);}
function can(action){if(!acl.enabled)return true;return!!myPerms[action];}


// ── Markdown 2.0 ─────────────────────────────────────────────
const SAFE_CSS_PROPS = new Set([
  "color","background","background-color","font-size","font-weight","font-style",
  "text-decoration","text-shadow","letter-spacing","opacity","border","border-radius",
  "padding","margin","display","filter","transform"
]);
function sanitizeCssDecl(decl){
  const out=[];
  for(const part of String(decl).split(";")){
    const i=part.indexOf(":");
    if(i<0) continue;
    const prop=part.slice(0,i).trim().toLowerCase();
    let val=part.slice(i+1).trim();
    if(!SAFE_CSS_PROPS.has(prop)) continue;
    if(/expression|url\s*\(|@import|javascript:/i.test(val)) continue;
    out.push(prop+":"+val);
  }
  return out.join(";");
}
function parseMd2(raw){
  const styles={}; // id -> css
  let body=String(raw||"");
  // [css:X] prop:val; ...
  body=body.replace(/^\[css:([A-Za-z0-9])\]\s*(.+)$/gm,(_,id,css)=>{
    styles[id]=sanitizeCssDecl(css);
    return "";
  });
  // @css X { ... }
  body=body.replace(/^@css\s+([A-Za-z0-9])\s*\{([^}]*)\}/gm,(_,id,css)=>{
    styles[id]=sanitizeCssDecl(css);
    return "";
  });
  return {body:body.trim(), styles};
}
function renderMarkdown(raw){
  const {body, styles}=parseMd2(raw);
  const parts=[];
  let i=0;
  // Custom: [;(id)(markdown content):]
  const replaced=body.replace(/\[;\(([A-Za-z0-9])\)\(([\s\S]*?)\):\]/g,(_,id,inner)=>{
    const key="%%MD2"+i+"%%";
    parts.push({key,id,inner});
    i++;
    return key;
  });
  let html;
  try{
    if(typeof marked!=="undefined"){
      marked.setOptions({gfm:true,breaks:true});
      html=marked.parse(replaced);
    } else {
      html=esc(replaced).replace(/\n/g,"<br>");
    }
  }catch(e){
    html=esc(replaced).replace(/\n/g,"<br>");
  }
  for(const part of parts){
    let innerHtml;
    try{
      innerHtml=(typeof marked!=="undefined")?marked.parseInline(part.inner):esc(part.inner);
    }catch(_){ innerHtml=esc(part.inner); }
    const css=styles[part.id]||"";
    const span='<span class="md2 md2-'+esc(part.id)+'" style="'+css+'">'+innerHtml+'</span>';
    html=html.split(part.key).join(span);
  }
  if(typeof DOMPurify!=="undefined"){
    html=DOMPurify.sanitize(html,{
      USE_PROFILES:{html:true},
      ADD_ATTR:["style","class","target","rel"],
    });
  }
  return html;
}


function addMessage({type="other",user,ipid,text,time,fileHtml,mid,isHtml,senderId,ts}){
  if(mid&&msgStore.has(mid)&&type!=="system")return msgStore.get(mid).el;
  const div=document.createElement("div");div.className="msg "+type;if(mid)div.dataset.mid=mid;
  if(type==="system"){ div.textContent=text; }
  else{
    const meta=document.createElement("div");meta.className="meta";
    meta.innerHTML=`<span class="user">${esc(user||"?")}</span>${ipid?`<span class="ipid">${esc(ipid)}</span>`:""}<span>${time||""}</span><span class="edited-tag" data-edited style="display:none">(edited)</span>`;
    div.appendChild(meta);
    const bodyWrap=document.createElement("div");
    bodyWrap.className="msg-body-wrap";
    if(text){
      const htmlMsg=!!isHtml || (typeof text==="string" && text.trimStart().startsWith("<"));
      if(htmlMsg){
        const iframe=document.createElement("iframe");
        iframe.className="html-frame";
        iframe.setAttribute("sandbox","allow-scripts allow-forms allow-pointer-lock allow-popups allow-modals allow-fullscreen allow-presentation");
        iframe.setAttribute("allow","fullscreen");
        iframe.srcdoc=text;
        bodyWrap.appendChild(iframe);
      } else {
        const b=document.createElement("div");
        b.className="md-body";
        b.innerHTML=typeof renderMarkdown==="function"?renderMarkdown(text):esc(text);
        bodyWrap.appendChild(b);
      }
    }
    if(fileHtml){const w=document.createElement("div");w.innerHTML=fileHtml;bodyWrap.appendChild(w);}
    div.appendChild(bodyWrap);
    if(mid){
      const r=document.createElement("div");r.className="reads";r.dataset.mid=mid;div.appendChild(r);
      div.addEventListener("click",e=>{
        if(e.target.closest("a,button,input,textarea")) return;
        openMsgMenu(mid);
      });
      const sid=senderId||(type==="own"?myId:null);
      msgStore.set(mid,{
        text:text||"", isHtml:!!isHtml, senderId:sid, senderName:user||"?",
        ts:ts||Date.now(), history:[], el:div, fileHtml:fileHtml||null, type
      });
    }
  }
  els.messages.appendChild(div);els.messages.scrollTop=els.messages.scrollHeight;
  return div;
}
function renderMsgBody(el, text, isHtml){
  const wrap=el.querySelector(".msg-body-wrap");
  if(!wrap) return;
  wrap.innerHTML="";
  if(isHtml || (text||"").trimStart().startsWith("<")){
    const iframe=document.createElement("iframe");
    iframe.className="html-frame";
    iframe.setAttribute("sandbox","allow-scripts allow-forms allow-pointer-lock allow-popups allow-modals allow-fullscreen allow-presentation");
    iframe.setAttribute("allow","fullscreen");
    iframe.srcdoc=text;
    wrap.appendChild(iframe);
  } else {
    const b=document.createElement("div");
    b.className="md-body";
    b.innerHTML=typeof renderMarkdown==="function"?renderMarkdown(text):esc(text);
    wrap.appendChild(b);
  }
}
function openMsgMenu(mid){
  const m=msgStore.get(mid);
  if(!m || !m.el || m.el.classList.contains("deleted-local")) return;
  window._menuMid=mid;
  els.editArea.classList.remove("on");
  els.msgPreview.classList.remove("large");
  // preview
  if(m.isHtml || (m.text||"").trimStart().startsWith("<")){
    els.msgPreview.innerHTML="";
    const ifr=document.createElement("iframe");
    ifr.className="html-frame";
    ifr.style.minHeight="80px";
    ifr.setAttribute("sandbox","allow-scripts allow-forms allow-fullscreen");
    ifr.srcdoc=m.text;
    els.msgPreview.appendChild(ifr);
  } else {
    els.msgPreview.innerHTML=typeof renderMarkdown==="function"?renderMarkdown(m.text):esc(m.text);
  }
  const mine=m.senderId===myId;
  const recent=mine && (Date.now()-(m.ts||0) < UNSEND_MS);
  const acts=[];
  acts.push({label:"View larger", fn:"enlarge"});
  acts.push({label:"Read receipts", fn:"receipts"});
  if(m.history && m.history.length) acts.push({label:"Edit history ("+m.history.length+")", fn:"history"});
  acts.push({label:"Delete for me", fn:"deleteLocal"});
  if(mine && recent){
    acts.push({label:"Edit message", fn:"edit"});
    acts.push({label:"Unsend for everyone", fn:"unsend"});
  } else if(mine){
    acts.push({label:"Edit window expired", fn:"noop", disabled:true});
  }
  els.msgMenuActions.innerHTML="";
  for(const a of acts){
    const b=document.createElement("button");
    b.className="btn"+(a.fn==="unsend"||a.fn==="deleteLocal"?" btn-danger":"");
    b.textContent=a.label;
    if(a.disabled) b.disabled=true;
    b.onclick=()=>msgMenuAction(a.fn);
    els.msgMenuActions.appendChild(b);
  }
  els.msgMenu.classList.add("on");
}
function msgMenuAction(fn){
  const mid=window._menuMid;
  const m=msgStore.get(mid);
  if(!m) return;
  if(fn==="enlarge"){
    els.msgPreview.classList.toggle("large");
    return;
  }
  if(fn==="receipts"){
    showReceipts(mid);
    return;
  }
  if(fn==="history"){
    const lines=(m.history||[]).map((h,i)=>`<li>#${i+1} · ${new Date(h.ts).toLocaleString()}<br>${esc(h.text).slice(0,200)}</li>`).join("")||"<li>No edits</li>";
    els.msgPreview.innerHTML="<strong>Edit history</strong><ul style='margin-top:8px'>"+lines+"</ul>";
    return;
  }
  if(fn==="deleteLocal"){
    deleteLocal(mid);
    els.msgMenu.classList.remove("on");
    return;
  }
  if(fn==="unsend"){
    unsendMessage(mid);
    els.msgMenu.classList.remove("on");
    return;
  }
  if(fn==="edit"){
    els.editArea.classList.add("on");
    els.editInput.value=m.text;
    els.editInput.focus();
    return;
  }
}
function deleteLocal(mid){
  const m=msgStore.get(mid);
  if(!m||!m.el) return;
  m.el.classList.add("deleted-local");
  const wrap=m.el.querySelector(".msg-body-wrap");
  if(wrap) wrap.innerHTML="<em style='color:#666'>Deleted for you</em>";
  m.localDeleted=true;
}
async function unsendMessage(mid){
  const m=msgStore.get(mid);
  if(!m||m.senderId!==myId) return;
  if(Date.now()-(m.ts||0) > UNSEND_MS){ addMessage({type:"system",text:"Unsend window expired (5 min)."}); return; }
  sendRaw({t:"unsend",mid,id:myId,u:myName});
  applyUnsend(mid, myName);
}
function applyUnsend(mid, by){
  const m=msgStore.get(mid);
  if(!m||!m.el) return;
  m.text=""; m.unsent=true;
  const wrap=m.el.querySelector(".msg-body-wrap");
  if(wrap) wrap.innerHTML="<em style='color:#666'>"+esc(by||"Someone")+" unsent a message</em>";
  const tag=m.el.querySelector("[data-edited]");
  if(tag){ tag.style.display=""; tag.textContent="(unsent)"; }
}
async function saveEdit(){
  const mid=window._menuMid;
  const m=msgStore.get(mid);
  if(!m||m.senderId!==myId) return;
  if(Date.now()-(m.ts||0) > UNSEND_MS){ addMessage({type:"system",text:"Edit window expired (5 min)."}); return; }
  const newText=els.editInput.value;
  if(newText===m.text) return;
  m.history.push({text:m.text, ts:Date.now()});
  const isHtml=newText.trimStart().startsWith("<");
  const cipher=await encryptText(newText);
  sendRaw({t:"edit",mid,id:myId,u:myName,c:cipher,html:!!isHtml,ts:Date.now()});
  applyEdit(mid, newText, isHtml, true);
  els.editArea.classList.remove("on");
  els.msgMenu.classList.remove("on");
}
function applyEdit(mid, newText, isHtml, fromSelf){
  const m=msgStore.get(mid);
  if(!m||!m.el) return;
  if(!fromSelf && m.text) m.history.push({text:m.text, ts:Date.now()});
  m.text=newText; m.isHtml=!!isHtml;
  renderMsgBody(m.el, newText, isHtml);
  const tag=m.el.querySelector("[data-edited]");
  if(tag){ tag.style.display=""; tag.textContent="(edited)"; }
}

function updateReadLabel(mid){const list=receipts.get(mid)||[];const el=els.messages.querySelector(`.reads[data-mid="${mid}"]`);if(el)el.textContent=list.length?`Read by ${list.length}`:"";}
function showReceipts(mid){const list=receipts.get(mid)||[];els.receiptList.innerHTML=list.length?list.map(r=>`<li><strong>${esc(r.u)}</strong> · ${new Date(r.ts).toLocaleString()}</li>`).join(""):"<li>No receipts yet</li>";els.receiptModal.classList.add("on");}
els.receiptClose.onclick=()=>els.receiptModal.classList.remove("on");
if(els.msgMenuClose) els.msgMenuClose.onclick=()=>els.msgMenu.classList.remove("on");
if(els.msgMenu) els.msgMenu.onclick=e=>{ if(e.target===els.msgMenu) els.msgMenu.classList.remove("on"); };
if(els.editSaveBtn) els.editSaveBtn.onclick=()=>saveEdit();
if(els.editCancelBtn) els.editCancelBtn.onclick=()=>els.editArea.classList.remove("on");


function updateVoicePeersUI(){
  const frag=document.createDocumentFragment();
  const add=(id,name,isMuted)=>{const el=document.createElement("span");el.className="voice-peer"+(isMuted?" muted":"");el.dataset.id=id;el.innerHTML=`<span class="material-symbols-outlined mic-icon">mic</span>${esc(name)}`;frag.appendChild(el);};
  if(inVoice)add(myId,myName+(muted?" (you, muted)":" (you)"),muted);
  for(const[id,p]of peers)add(id,p.name||id,false);
  els.voicePeers.innerHTML="";els.voicePeers.appendChild(frag);
}
function setPeerTalking(id,level){
  const el=els.voicePeers.querySelector(`[data-id="${id}"]`);if(!el)return;
  if(level>0.04){el.classList.add("talking");const g=Math.min(1,level*3);el.style.boxShadow=`0 0 ${6+g*14}px rgba(91,141,239,${0.25+g*.55})`;}
  else{el.classList.remove("talking");el.style.boxShadow="";}
}
function setVoiceUI(){
  const ok=roomSettings.voice&&can("voice");
  els.voiceBar.classList.toggle("on",inVoice);
  els.voiceJoinBtn.disabled=!connected||!authed||inVoice||!ok;
  els.voiceMuteBtn.disabled=!inVoice;els.voiceLeaveBtn.disabled=!inVoice;
  els.voiceMuteBtn.classList.toggle("active",muted);updateVoicePeersUI();
  setStatus(connected?(inVoice?"connected · voice on":"connected · encrypted"):"disconnected",connected,!!aesKey,inVoice);
}
function isRoomCreator(){ return !!roomCreatorId && roomCreatorId===myId; }
function applySettingsToUI(){
  els.setText.checked=roomSettings.text;els.setVoice.checked=roomSettings.voice;els.setFiles.checked=roomSettings.files;
  const canText=connected&&authed&&roomSettings.text&&can("write");
  const canFiles=connected&&authed&&roomSettings.files&&can("files");
  els.msgInput.disabled=!canText;els.sendBtn.disabled=!canText;
  els.attachBtn.disabled=!canFiles;els.folderBtn.disabled=!canFiles;
  if(els.emojiBtn) els.emojiBtn.disabled=!canText;
  const creatorOk=connected&&authed&&isRoomCreator();
  els.applySettingsBtn.disabled=!creatorOk;
  els.applyAclBtn.disabled=!creatorOk;
  els.setText.disabled=!creatorOk;els.setVoice.disabled=!creatorOk;els.setFiles.disabled=!creatorOk;
  els.aclEnabled.disabled=!creatorOk;els.aclGuests.disabled=!creatorOk;els.aclText.disabled=!creatorOk;
  if(!(roomSettings.voice&&can("voice"))&&inVoice)leaveVoice(false);
  setVoiceUI();
}
function startLocalVolume(){if(!localStream)return;try{localAudioCtx=new(window.AudioContext||window.webkitAudioContext)();const src=localAudioCtx.createMediaStreamSource(localStream);localAnalyser=localAudioCtx.createAnalyser();localAnalyser.fftSize=256;src.connect(localAnalyser);}catch(_){}}
function startRemoteVolume(entry){if(!entry.audio?.srcObject)return;try{const ctx=new(window.AudioContext||window.webkitAudioContext)();const src=ctx.createMediaStreamSource(entry.audio.srcObject);const an=ctx.createAnalyser();an.fftSize=256;src.connect(an);entry.analyser=an;entry.audioCtx=ctx;}catch(_){}}
function volumeLoop(){
  const data=new Uint8Array(128);
  if(inVoice&&localAnalyser&&!muted){localAnalyser.getByteFrequencyData(data);let s=0;for(let i=0;i<data.length;i++)s+=data[i];setPeerTalking(myId,(s/data.length)/255);}
  else if(inVoice)setPeerTalking(myId,0);
  for(const[id,p]of peers){if(p.analyser){p.analyser.getByteFrequencyData(data);let s=0;for(let i=0;i<data.length;i++)s+=data[i];setPeerTalking(id,(s/data.length)/255);}}
  volRaf=requestAnimationFrame(volumeLoop);
}
function sendRaw(o){if(ws&&ws.readyState===1)ws.send(JSON.stringify(o));}

function parseAclText(text){
  const accounts={};
  for(const line of text.split("\n")){
    const t=line.trim();if(!t||t.startsWith("#"))continue;
    const parts=t.split(":");if(parts.length<2)continue;
    const u=parts[0].trim(),p=parts[1].trim();
    const permsRaw=(parts[2]||"read,write").split(",").map(x=>x.trim().toLowerCase());
    accounts[u.toLowerCase()]={user:u,pass:p,perms:{
      read:permsRaw.includes("read")||permsRaw.includes("all"),
      write:permsRaw.includes("write")||permsRaw.includes("all"),
      voice:permsRaw.includes("voice")||permsRaw.includes("all"),
      files:permsRaw.includes("files")||permsRaw.includes("all"),
    }};
  }
  return accounts;
}
async function finishAuth(){
  authed=true;els.loginGate.classList.remove("on");
  online.set(myId,{u:myName,ipId:myIpId});
  if(!roomCreatorId){
    roomCreatorId=myId;
    sendRaw({t:"creator",id:myId});
    addMessage({type:"system",text:"You are the room creator (settings locked to you)."});
  }
  applySettingsToUI();
  addMessage({type:"system",text:"Joined as "+(accountName||myName)+(myIpId?" · "+myIpId:"")});
  sendRaw({t:"join",u:myName,id:myId,ipId:myIpId,account:accountName});
  if(isRoomCreator()){
    sendRaw({t:"settings",id:myId,settings:roomSettings});
    if(acl.enabled) sendRaw({t:"acl",id:myId,acl});
  }
}
async function tryLogin(){
  const user=(els.loginUser.value||"").trim(),pass=els.loginPass.value||"";
  if(!acl.enabled){accountName=null;myPerms={read:true,write:true,voice:true,files:true};await finishAuth();return;}
  if(!user){
    if(!acl.guests){els.loginHint.textContent="Guests not allowed.";return;}
    accountName="guest";myPerms={...acl.guestPerms};
    myName=claimUsername((els.username.value.trim()||"guest").slice(0,24));await finishAuth();return;
  }
  const acct=acl.accounts[user.toLowerCase()];
  if(!acct||acct.pass!==pass){els.loginHint.textContent="Wrong username or password.";return;}
  accountName=acct.user;myPerms={...acct.perms};
  myName=claimUsername(acct.user.slice(0,24));els.username.value=myName;await finishAuth();
}
function openLoginGate(){
  if(!acl.enabled){accountName=null;myPerms={read:true,write:true,voice:true,files:true};finishAuth();return;}
  els.loginHint.textContent=acl.guests?"Account or blank for guest.":"Account required.";
  els.loginGate.classList.add("on");els.loginUser.value="";els.loginPass.value="";
}


// === Multi-tab · saved relays · public · IndexedDB ===
const DIR_SUFFIX="/r/__public_directory";
let activeTabId="main";
const tabs=new Map();
const sessions=new Map();
let publicDirWs=null;
let publicRooms=[];

function tabLabel(id){if(id==="main")return"Main";const s=tabs.get(id);return(s&&s.title)||id.slice(0,8);}
function renderTabBar(){
  const bar=$("tabbar");if(!bar)return;
  const addBtn=bar.querySelector("#newTabBtn");
  bar.querySelectorAll(".tab").forEach(x=>x.remove());
  const all=new Set(["main",...tabs.keys()]);
  for(const id of all){
    const b=document.createElement("button");
    b.type="button";b.className="tab"+(id===activeTabId?" on":"");
    b.innerHTML=esc(tabLabel(id))+(id!=="main"?' <span class="x" data-close="'+id+'">×</span>':"");
    b.onclick=e=>{if(e.target.dataset.close){closeTab(e.target.dataset.close);return;}switchTab(id);};
    bar.insertBefore(b,addBtn);
  }
}
function switchTab(id){
  if(id===activeTabId)return;
  activeTabId=id;
  const s=tabs.get(id);
  if(s){els.relay.value=s.relay||"";els.passphrase.value=s.pass||"";if(s.myName)els.username.value=s.myName;}
  renderTabBar();
  addMessage({type:"system",text:"Tab: "+tabLabel(id)});
}
function closeTab(id){
  if(id==="main")return;
  const sess=sessions.get(id);
  if(sess&&publishedUrl&&sess.relay===publishedUrl){try{unpublishCurrentRoom();}catch(_){}}
  if(sess&&sess.ws)try{sess.ws.close();}catch(_){}
  sessions.delete(id);tabs.delete(id);
  if(activeTabId===id)activeTabId="main";
  renderTabBar();
}
if($("newTabBtn"))$("newTabBtn").onclick=()=>{
  const id="t"+(typeof uuid==="function"?uuid():Math.random().toString(16).slice(2)).slice(0,6);
  tabs.set(id,{title:"New",relay:"",pass:"",encrypted:true});
  activeTabId=id;renderTabBar();
};

function loadSavedRelays(){try{return JSON.parse(localStorage.getItem("v0rt3x_relays")||"[]");}catch{return[];}}
function saveSavedRelays(list){localStorage.setItem("v0rt3x_relays",JSON.stringify(list.slice(0,30)));renderSavedRelays();}
function renderSavedRelays(){
  const box=$("savedRelays");if(!box)return;
  const list=loadSavedRelays();
  if(!list.length){box.innerHTML='<p class="hint">None saved yet.</p>';return;}
  box.innerHTML=list.map((u,i)=>'<div class="saved-relay"><span style="flex:1;overflow:hidden;text-overflow:ellipsis">'+esc(u)+'</span><button class="btn btn-icon" data-use="'+i+'" type="button">→</button><button class="btn btn-icon btn-danger" data-del="'+i+'" type="button">×</button></div>').join("");
  box.querySelectorAll("[data-use]").forEach(b=>b.onclick=()=>{els.relay.value=list[+b.dataset.use];});
  box.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{const L=loadSavedRelays();L.splice(+b.dataset.del,1);saveSavedRelays(L);});
}
if($("saveRelayBtn"))$("saveRelayBtn").onclick=()=>{
  const u=els.relay.value.trim();if(!u)return;
  const L=loadSavedRelays();if(!L.includes(u))L.unshift(u);saveSavedRelays(L);
  addMessage({type:"system",text:"Saved WebSocket"});
};

const IDB_NAME="v0rt3x_db",IDB_VER=1;
function idbOpen(){return new Promise((res,rej)=>{const r=indexedDB.open(IDB_NAME,IDB_VER);r.onupgradeneeded=()=>{const db=r.result;if(!db.objectStoreNames.contains("conversations")){db.createObjectStore("conversations",{keyPath:"id"}).createIndex("updated","updated");}};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
async function idbPutConv(rec){const db=await idbOpen();return new Promise((res,rej)=>{const tx=db.transaction("conversations","readwrite");tx.objectStore("conversations").put(rec);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});}
async function idbAllConvs(){const db=await idbOpen();return new Promise((res,rej)=>{const q=db.transaction("conversations","readonly").objectStore("conversations").getAll();q.onsuccess=()=>res(q.result||[]);q.onerror=()=>rej(q.error);});}
async function idbDelConv(id){const db=await idbOpen();return new Promise((res,rej)=>{const tx=db.transaction("conversations","readwrite");tx.objectStore("conversations").delete(id);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});}
async function saveCurrentConversation(){
  if(!connected){addMessage({type:"system",text:"Connect first"});return;}
  const lines=[];
  for(const[mid,m]of msgStore){if(m.localDeleted||m.unsent)continue;lines.push({mid,u:m.senderName,id:m.senderId,text:m.text,isHtml:m.isHtml,ts:m.ts});}
  const payload=JSON.stringify({room:currentRoomKey,lines,savedAt:Date.now()});
  let cipher;if(aesKey)cipher=await encryptText(payload);else cipher=btoa(unescape(encodeURIComponent(payload)));
  await idbPutConv({id:(typeof uuid==="function"?uuid():String(Date.now())),title:(els.relay.value||currentRoomKey||"chat").slice(0,80),roomKey:currentRoomKey,relay:els.relay.value,encrypted:!!aesKey,updated:Date.now(),cipher});
  addMessage({type:"system",text:"Saved "+lines.length+" messages on device"});
  renderIdbList();
}
async function loadConversationToRoom(id,broadcast){
  const all=await idbAllConvs();const rec=all.find(x=>x.id===id);if(!rec)return;
  let plain;try{if(rec.encrypted&&aesKey)plain=await decryptText(rec.cipher);else plain=decodeURIComponent(escape(atob(rec.cipher)));}catch(e){addMessage({type:"system",text:"Decrypt failed (wrong key?)"});return;}
  let data;try{data=JSON.parse(plain);}catch{addMessage({type:"system",text:"Corrupt save"});return;}
  for(const line of(data.lines||[])){addMessage({type:line.id===myId?"own":"other",user:line.u||"?",text:line.text,isHtml:line.isHtml,mid:line.mid||(typeof uuid==="function"?uuid():String(Math.random())).slice(0,12),senderId:line.id,ts:line.ts,time:line.ts?new Date(line.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""});}
  if(broadcast&&connected&&aesKey){const pack=await encryptText(JSON.stringify({lines:data.lines||[]}));sendRaw({t:"history",id:myId,u:myName,c:pack});addMessage({type:"system",text:"Broadcast history to room"});}
  else addMessage({type:"system",text:"Loaded "+(data.lines||[]).length+" messages"});
}
async function renderIdbList(){
  const box=$("idbList");if(!box)return;
  const all=await idbAllConvs();all.sort((a,b)=>b.updated-a.updated);
  if(!all.length){box.innerHTML='<p class="hint">No saved conversations.</p>';return;}
  box.innerHTML=all.map(r=>'<div class="pub-item"><div class="t">'+esc(r.title)+'</div><div class="n">'+new Date(r.updated).toLocaleString()+' · '+(r.encrypted?"encrypted":"open")+'</div><div class="row" style="margin-top:6px"><button class="btn" data-load="'+r.id+'" type="button">Load</button><button class="btn" data-bcast="'+r.id+'" type="button">Load+broadcast</button><button class="btn btn-danger" data-rm="'+r.id+'" type="button">Delete</button></div></div>').join("");
  box.querySelectorAll("[data-load]").forEach(b=>b.onclick=()=>loadConversationToRoom(b.dataset.load,false));
  box.querySelectorAll("[data-bcast]").forEach(b=>b.onclick=()=>loadConversationToRoom(b.dataset.bcast,true));
  box.querySelectorAll("[data-rm]").forEach(b=>b.onclick=async()=>{await idbDelConv(b.dataset.rm);renderIdbList();});
}

function directoryUrlFromRelay(wsUrl){
  try{
    const u=new URL(wsUrl);
    // Always same host + fixed directory path (not nested under current room)
    return u.protocol+"//"+u.host+"/r/__public_directory";
  }catch{return null;}
}
function renderPublicList(){
  const box=$("publicList");if(!box)return;
  const now=Date.now();
  publicRooms=(publicRooms||[]).filter(r=>r&&r.url&&(!r.expires||r.expires>now));
  if(!publicRooms.length){box.innerHTML='<p class="hint">No live public rooms.</p>';return;}
  box.innerHTML=publicRooms.map((r,i)=>'<div class="pub-item" data-pub="'+i+'"><div class="t">'+esc(r.title||"Room")+(r.encrypted?" 🔒":"")+'</div><div class="n">'+esc(r.note||"")+'</div><div class="n" style="opacity:0.7">'+esc(r.url||"")+'</div></div>').join("");
  box.querySelectorAll("[data-pub]").forEach(b=>b.onclick=()=>joinPublicRoom(publicRooms[+b.dataset.pub]));
}
function joinPublicRoom(r){
  if(!r||!r.url)return;
  els.relay.value=r.url;
  if(r.keyInNote&&r.note){
    const m=r.note.match(/key[=:]\s*(\S+)/i);
    if(m) els.passphrase.value=m[1];
  } else if(!r.encrypted){
    els.passphrase.value="";
    window._forceUnencrypted=true;
  }
  addMessage({type:"system",text:"Joining public room: "+(r.title||r.url)});
  // Auto-connect
  try{ connect(); }catch(e){ console.warn(e); }
}
let publishedUrl=null;
let publishHeartbeat=null;
function stopPublishHeartbeat(){
  if(publishHeartbeat){ clearInterval(publishHeartbeat); publishHeartbeat=null; }
}
function unpublishCurrentRoom(){
  if(!publishedUrl)return;
  const url=publishedUrl;
  publishedUrl=null;
  stopPublishHeartbeat();
  if(publicDirWs&&publicDirWs.readyState===1){
    publicDirWs.send(JSON.stringify({t:"public-unpublish",url}));
  }
  publicRooms=publicRooms.filter(r=>r.url!==url);
  renderPublicList();
  addMessage({type:"system",text:"Unpublished public room"});
}
function connectPublicDirectory(baseWs){
  const dir=directoryUrlFromRelay(baseWs);if(!dir)return;
  // already connected to same dir?
  if(publicDirWs&&publicDirWs.readyState===1&&publicDirWs._dir===dir){
    publicDirWs.send(JSON.stringify({t:"public-sync"}));
    return;
  }
  try{if(publicDirWs)publicDirWs.close();}catch(_){}
  try{
    publicDirWs=new WebSocket(dir);
    publicDirWs._dir=dir;
    publicDirWs.onopen=()=>{
      publicDirWs.send(JSON.stringify({t:"public-sync"}));
      if($("refreshPublicBtn"))$("refreshPublicBtn").disabled=false;
      if($("publishRoomBtn"))$("publishRoomBtn").disabled=!connected;
      if($("unpublishRoomBtn"))$("unpublishRoomBtn").disabled=!publishedUrl;
    };
    publicDirWs.onmessage=ev=>{
      let d;try{d=JSON.parse(ev.data);}catch{return;}
      if(d.t==="hello")return; // ignore room hello on directory
      if(d.t==="public-list"&&Array.isArray(d.rooms)){
        publicRooms=d.rooms;renderPublicList();
      }
      if(d.t==="public-announce"&&d.room){
        const i=publicRooms.findIndex(x=>x.url===d.room.url);
        if(i>=0)publicRooms[i]=d.room;else publicRooms.push(d.room);
        renderPublicList();
      }
      if(d.t==="public-unpublish"&&d.url){
        publicRooms=publicRooms.filter(r=>r.url!==d.url);
        renderPublicList();
      }
    };
    publicDirWs.onclose=()=>{
      // directory dropped — local list may be stale; clear optional
    };
  }catch(e){console.warn(e);}
}
function publishCurrentRoom(){
  if(!connected){addMessage({type:"system",text:"Connect to a room first"});return;}
  if(!publicDirWs||publicDirWs.readyState!==1){
    connectPublicDirectory(els.relay.value);
    addMessage({type:"system",text:"Connecting public directory… try Publish again in 1s"});
    setTimeout(()=>{ if(publicDirWs&&publicDirWs.readyState===1) publishCurrentRoom(); },1000);
    return;
  }
  const title=prompt("Public title?","Chat")||"Chat";
  const note=prompt("Note (optional, e.g. key=secret)","")||"";
  const room={
    url:els.relay.value.trim(),
    title,note,
    encrypted:!!aesKey,
    keyInNote:/key[=:]/i.test(note),
    owner:myId,
    expires:Date.now()+10*60*1000,
    ts:Date.now(),
  };
  publicDirWs.send(JSON.stringify({t:"public-announce",room}));
  publishedUrl=room.url;
  const i=publicRooms.findIndex(x=>x.url===room.url);
  if(i>=0)publicRooms[i]=room;else publicRooms.push(room);
  renderPublicList();
  if($("unpublishRoomBtn"))$("unpublishRoomBtn").disabled=false;
  stopPublishHeartbeat();
  // heartbeat refreshes TTL every 3 min
  publishHeartbeat=setInterval(()=>{
    if(!publicDirWs||publicDirWs.readyState!==1||!publishedUrl){stopPublishHeartbeat();return;}
    room.expires=Date.now()+10*60*1000;
    room.ts=Date.now();
    publicDirWs.send(JSON.stringify({t:"public-announce",room}));
  },3*60*1000);
  addMessage({type:"system",text:"Published \""+title+"\" (auto-expires ~10 min, unpublish on leave)"});
}

if($("openNewChatBtn"))$("openNewChatBtn").onclick=()=>{$("ncRelay").value=els.relay.value;$("newChatModal").classList.add("on");};
if($("ncCancelBtn"))$("ncCancelBtn").onclick=()=>$("newChatModal").classList.remove("on");
if($("ncStartBtn"))$("ncStartBtn").onclick=()=>{
  const enc=$("ncEncrypted").checked;const relay=$("ncRelay").value.trim();const pass=$("ncPass").value;
  if(!relay){alert("Need WSS URL");return;}
  if(enc&&(!pass||pass.length<4)){alert("Encrypted needs passphrase ≥4");return;}
  const id="t"+(typeof uuid==="function"?uuid():Math.random().toString(16).slice(2)).slice(0,6);
  tabs.set(id,{title:$("ncTitle").value||relay.split("/").pop(),relay,pass:enc?pass:"",encrypted:enc});
  activeTabId=id;els.relay.value=relay;els.passphrase.value=enc?pass:"";
  window._forceUnencrypted=!enc;
  $("newChatModal").classList.remove("on");renderTabBar();
  if($("ncPublic").checked)window._publishAfterConnect={title:$("ncTitle").value,note:$("ncNote").value};
  connect();
};
if($("openIdbBtn"))$("openIdbBtn").onclick=()=>{$("idbModal").classList.add("on");renderIdbList();};
if($("idbCloseBtn"))$("idbCloseBtn").onclick=()=>$("idbModal").classList.remove("on");
if($("idbSaveConvBtn"))$("idbSaveConvBtn").onclick=()=>saveCurrentConversation();
if($("refreshPublicBtn"))$("refreshPublicBtn").onclick=()=>{if(publicDirWs&&publicDirWs.readyState===1)publicDirWs.send(JSON.stringify({t:"public-sync"}));else if(els.relay.value)connectPublicDirectory(els.relay.value);};
if($("publishRoomBtn"))$("publishRoomBtn").onclick=()=>publishCurrentRoom();
if($("unpublishRoomBtn"))$("unpublishRoomBtn").onclick=()=>unpublishCurrentRoom();
renderSavedRelays();renderTabBar();

function connect(){
  const url=els.relay.value.trim(),pass=els.passphrase.value;
  myName=claimUsername((els.username.value.trim()||"user").slice(0,24));
  els.username.value=myName;localStorage.setItem("v0rt3x_username",myName);
  if(!url||(!url.startsWith("wss://")&&!url.startsWith("ws://"))){addMessage({type:"system",text:"Enter a valid ws:// or wss:// URL."});return;}
  const unenc=!!window._forceUnencrypted||pass==="";
  if(!unenc&&(!pass||pass.length<4)){addMessage({type:"system",text:"Passphrase must be at least 4 characters."});return;}
  window._forceUnencrypted=false;
  currentRoomKey=roomKeyFromUrl(url);els.connectBtn.disabled=true;setStatus("connecting…",false,false,false);
  online.clear();authed=false;
  const _start=key=>{
    aesKey=key;ws=new WebSocket(url);
    ws.onmessage=async ev=>{
      let data;try{data=JSON.parse(ev.data);}catch{return;}if(!data)return;
      if(data.t==="hello"){
        myIpId=data.ipId||null;mySid=data.sid||myId;
        els.myIdLine.textContent=myIpId?("hash: "+myIpId):"hash: (update worker for IP lock)";
        if(myIpId&&ipTaken(myIpId,myId)){addMessage({type:"system",text:"Network hash already in room. Blocked."});ws.close();return;}
        connected=true;els.disconnectBtn.disabled=false;els.applySettingsBtn.disabled=false;els.applyAclBtn.disabled=false;
        if($("saveRelayBtn"))$("saveRelayBtn").disabled=false;
        if($("publishRoomBtn"))$("publishRoomBtn").disabled=false;
        connectPublicDirectory(url);
        sessions.set(activeTabId,{ws,relay:url,encrypted:!!aesKey,roomKey:currentRoomKey});
        if(window._publishAfterConnect){const p=window._publishAfterConnect;window._publishAfterConnect=null;setTimeout(()=>{const room={url,title:p.title||"Chat",note:p.note||"",encrypted:!!aesKey,keyInNote:/key[=:]/i.test(p.note||""),ts:Date.now()};if(publicDirWs&&publicDirWs.readyState===1)publicDirWs.send(JSON.stringify({t:"public-announce",room}));publicRooms.push(room);renderPublicList();},800);}
        setTimeout(()=>openLoginGate(),400);return;
      }
      if(data.t==="acl"&&data.acl&&data.id!==myId){
        if(roomCreatorId && data.id!==roomCreatorId) return;
        if(!roomCreatorId) roomCreatorId=data.id;
        acl={...acl,...data.acl};if(data.acl.accounts)acl.accounts=data.acl.accounts;
        els.aclEnabled.checked=!!acl.enabled;els.aclGuests.checked=!!acl.guests;
        if(!authed&&connected)openLoginGate();return;
      }
      if(!authed&&data.t!=="hello"&&data.t!=="acl")return;
      if(data.t==="join"&&data.id!==myId){
        online.set(data.id,{u:data.u||"?",ipId:data.ipId||null});
        addMessage({type:"system",text:(data.u||"someone")+" joined"});
        if(inVoice&&data.id)ensurePeer(data.id,data.u||"?",true);
        if(isRoomCreator()){
          sendRaw({t:"creator",id:myId});
          sendRaw({t:"settings",id:myId,settings:roomSettings});
          if(acl.enabled) sendRaw({t:"acl",id:myId,acl});
        }
        return;
      }
      if(data.t==="creator"&&data.id){
        if(!roomCreatorId) roomCreatorId=data.id;
        // first wins; later claims ignored
        applySettingsToUI();
        return;
      }
      if(data.t==="settings"&&data.settings&&data.id!==myId){
        if(roomCreatorId && data.id!==roomCreatorId) return; // ignore non-creator
        if(!roomCreatorId) roomCreatorId=data.id;
        roomSettings={...roomSettings,...data.settings};applySettingsToUI();
        addMessage({type:"system",text:"Room settings updated by creator"});return;
      }
      if(data.t==="msg"&&data.c){
        if(!roomSettings.text||!can("read"))return;
        const mid=data.mid||null;
        // Dedupe: already shown (our optimistic send) or echo from relay
        if(mid&&msgStore.has(mid))return;
        if(data.id===myId)return;
        let plain;if(data.plain||!aesKey)plain=data.c;else{plain=await decryptText(data.c);if(plain===null)return;}
        addMessage({type:"other",user:data.u||"?",ipid:data.ipId||"",text:plain,time:data.ts?new Date(data.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):nowTime(),mid,isHtml:!!data.html||plain.trimStart().startsWith("<"),senderId:data.id,ts:data.ts||Date.now()});
        if(mid&&can("read"))sendRaw({t:"read",mid,id:myId,u:myName,ts:Date.now()});return;
      }
      if(data.t==="read"&&data.mid&&data.id!==myId){
        if(!receipts.has(data.mid))receipts.set(data.mid,[]);
        const arr=receipts.get(data.mid);if(!arr.some(x=>x.id===data.id)){arr.push({u:data.u,id:data.id,ts:data.ts||Date.now()});updateReadLabel(data.mid);}return;
      }
      if(data.t==="file"&&data.c&&data.id!==myId){
        if(!roomSettings.files||!can("read"))return;
        try{const plain=await decryptText(data.c);if(!plain)return;const obj=JSON.parse(plain);showFile(data.u||"?",obj.name,obj.mime,b64dec(obj.b64),false,data.ipId);}catch(e){console.warn(e);}return;
      }
      if(data.t==="history"&&data.c&&data.id!==myId){
        try{const plain=await decryptText(data.c);if(!plain)return;const pack=JSON.parse(plain);
          for(const line of(pack.lines||[])){if(line.mid&&msgStore.has(line.mid))continue;
            addMessage({type:line.id===myId?"own":"other",user:line.u||"?",text:line.text,isHtml:line.isHtml,mid:line.mid||uuid().slice(0,12),senderId:line.id,ts:line.ts,time:line.ts?new Date(line.ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""});}
          addMessage({type:"system",text:"History from "+(data.u||"peer")});}catch(e){console.warn(e);}return;}
      if(data.t==="unsend"&&data.mid){
        if(data.id!==myId) applyUnsend(data.mid, data.u||"Someone");
        return;
      }
      if(data.t==="edit"&&data.mid&&data.c&&data.id!==myId){
        const plain=await decryptText(data.c);
        if(plain===null) return;
        applyEdit(data.mid, plain, !!data.html || plain.trimStart().startsWith("<"), false);
        return;
      }
      if(data.t==="signal"&&data.id!==myId){handleSignal(data);return;}
      if(data.t==="voice-leave"&&data.id!==myId){removePeer(data.id);return;}
      if(data.t==="voice-join"&&data.id!==myId){if(inVoice)ensurePeer(data.id,data.u||"?",true);}
    };
    ws.onclose=()=>{
      connected=false;authed=false;leaveVoice(true);aesKey=null;myIpId=null;roomCreatorId=null;online.clear();
      els.connectBtn.disabled=false;els.disconnectBtn.disabled=true;els.applySettingsBtn.disabled=true;els.applyAclBtn.disabled=true;
      els.loginGate.classList.remove("on");els.myIdLine.textContent="hash: —";applySettingsToUI();setStatus("disconnected",false,false,false);
      addMessage({type:"system",text:"Disconnected"});
    };
    ws.onerror=()=>addMessage({type:"system",text:"WebSocket error"});
    setTimeout(()=>{
      if(!connected&&ws&&ws.readyState===1){
        connected=true;els.disconnectBtn.disabled=false;els.applySettingsBtn.disabled=false;els.applyAclBtn.disabled=false;
        addMessage({type:"system",text:"Joined (no IP hash — update worker for lock)"});openLoginGate();
      }
    },1500);
  };
if(unenc) _start(null); else deriveKey(pass,currentRoomKey).then(_start).catch(err=>{console.error(err);els.connectBtn.disabled=false;setStatus("key error",false,false,false);});
}
function disconnect(){
  try{ unpublishCurrentRoom(); }catch(_){}
leaveVoice(true);if(ws){ws.close();ws=null;}}

async function sendMessage(){
  if(_sendingMsg)return;
  if(!can("write")||!roomSettings.text||!connected||!authed)return;
  if(!aesKey&&!window._allowPlain){ /* unencrypted rooms set aesKey null intentionally */ }
  const text=(typeof getComposerText==="function"?getComposerText():els.msgInput.value).trim();
  if(!text)return;
  _sendingMsg=true;
  try{
    const mid=(typeof uuid==="function"?uuid():String(Date.now()+Math.random())).slice(0,12);
    if(msgStore.has(mid))return;
    const isHtml=text.trimStart().startsWith("<");
    const payload=aesKey?await encryptText(text):text;
    sendRaw({t:"msg",mid,u:myName,id:myId,ipId:myIpId,ts:Date.now(),c:payload,html:!!isHtml,plain:!aesKey});
    addMessage({type:"own",user:myName,ipid:myIpId||"",text,time:nowTime(),mid,isHtml,senderId:myId,ts:Date.now()});
    receipts.set(mid,[]);
    if(typeof setComposerText==="function")setComposerText("");
    else{els.msgInput.value="";}
    if(typeof htmlMode!=="undefined"&&htmlMode&&typeof exitHtmlMode==="function")exitHtmlMode();
    els.msgInput.focus();
  }finally{ _sendingMsg=false; }
}
function showFile(user,name,mime,bytes,isOwn,ipid){
  const blob=new Blob([bytes],{type:mime||"application/octet-stream"});const url=URL.createObjectURL(blob);
  let fileHtml;(mime||"").startsWith("image/")
    ?fileHtml=`<div class="file-card"><img src="${url}" alt="${esc(name)}" /></div>`
    :fileHtml=`<div class="file-card"><span class="material-symbols-outlined">attach_file</span><a href="${url}" download="${esc(name)}">${esc(name)}</a></div>`;
  addMessage({type:isOwn?"own":"other",user,ipid:ipid||"",time:nowTime(),fileHtml});
}
function assertFileSize(file){
  if(!file||typeof file.size!=="number")return"Invalid file";
  if(file.size<=0)return"Empty file: "+(file.name||"");
  if(file.size>MAX_FILE)return`Too large (max ${Math.round(MAX_FILE/1024/1024*10)/10} MB): ${file.name} (${Math.round(file.size/1024)} KB)`;
  return null;
}
async function sendFile(file){
  if(!can("files")||!roomSettings.files||!aesKey||!connected||!authed)return;
  const err=assertFileSize(file);if(err){addMessage({type:"system",text:err});return;}
  const ab=await file.arrayBuffer();
  if(ab.byteLength>MAX_FILE){addMessage({type:"system",text:"Blocked after read (size): "+file.name});return;}
  const payload={name:file.name||"file",mime:file.type||"application/octet-stream",b64:b64enc(new Uint8Array(ab))};
  if(payload.b64.length>MAX_FILE*1.6){addMessage({type:"system",text:"Encoded too large: "+file.name});return;}
  const cipher=await encryptText(JSON.stringify(payload));
  if(cipher.length>950000){addMessage({type:"system",text:"Encrypted payload too big: "+file.name});return;}
  sendRaw({t:"file",id:myId,u:myName,ipId:myIpId,c:cipher});
  showFile(myName,payload.name,payload.mime,new Uint8Array(ab),true,myIpId);
}
async function handleFiles(list){
  let blocked=0;
  for(const f of [...list]){
    const err=assertFileSize(f);
    if(err){addMessage({type:"system",text:err});blocked++;continue;}
    await sendFile(f);
  }
  if(blocked)addMessage({type:"system",text:blocked+" file(s) blocked by size limit."});
}

async function joinVoice(){
  if(!connected||!authed||inVoice||!roomSettings.voice||!can("voice"))return;
  try{localStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true},video:false});}
  catch{addMessage({type:"system",text:"Mic permission denied"});return;}
  inVoice=true;muted=false;startLocalVolume();if(!volRaf)volRaf=requestAnimationFrame(volumeLoop);
  setVoiceUI();addMessage({type:"system",text:"Joined voice"});sendRaw({t:"voice-join",u:myName,id:myId,ipId:myIpId});
}
function leaveVoice(silent){
  if(!inVoice&&!localStream)return;inVoice=false;muted=false;
  for(const[id]of peers)removePeer(id);peers.clear();
  if(localStream){localStream.getTracks().forEach(t=>t.stop());localStream=null;}
  if(localAudioCtx){try{localAudioCtx.close();}catch(_){}localAudioCtx=null;localAnalyser=null;}
  if(!silent&&connected){sendRaw({t:"voice-leave",id:myId});addMessage({type:"system",text:"Left voice"});}
  setVoiceUI();
}
function toggleMute(){if(!localStream)return;muted=!muted;localStream.getAudioTracks().forEach(t=>{t.enabled=!muted;});setVoiceUI();}
function ensurePeer(id,name,initiator){
  if(id===myId||peers.has(id)||!inVoice||!localStream)return;
  const pc=new RTCPeerConnection(rtcConfig);
  // Perfect negotiation: lower id is polite
  const polite=myId<id;
  const entry={pc,name:name||id,audio:null,analyser:null,polite,makingOffer:false,ignoreOffer:false};
  peers.set(id,entry);updateVoicePeersUI();
  localStream.getTracks().forEach(t=>{try{pc.addTrack(t,localStream);}catch(_){}});
  pc.onicecandidate=ev=>{
    if(ev.candidate) sendRaw({t:"signal",id:myId,to:id,u:myName,kind:"ice",payload:ev.candidate});
  };
  pc.ontrack=ev=>{
    const stream=ev.streams[0]||new MediaStream([ev.track]);
    let audio=entry.audio;
    if(!audio){
      audio=document.createElement("audio");
      audio.autoplay=true; audio.playsInline=true;
      document.body.appendChild(audio);
      entry.audio=audio;
    }
    audio.srcObject=stream;
    audio.play().catch(()=>{});
    startRemoteVolume(entry);
  };
  pc.onconnectionstatechange=()=>{
    if(pc.connectionState==="failed"||pc.connectionState==="closed"||pc.connectionState==="disconnected"){
      if(pc.connectionState==="failed") removePeer(id);
    }
  };
  pc.onnegotiationneeded=async()=>{
    try{
      entry.makingOffer=true;
      await pc.setLocalDescription(await pc.createOffer());
      sendRaw({t:"signal",id:myId,to:id,u:myName,kind:"offer",payload:pc.localDescription});
    }catch(e){console.warn("nego",e);}
    finally{entry.makingOffer=false;}
  };
  if(initiator){
    // kick negotiation
    pc.createOffer().then(o=>pc.setLocalDescription(o)).then(()=>{
      sendRaw({t:"signal",id:myId,to:id,u:myName,kind:"offer",payload:pc.localDescription});
    }).catch(console.error);
  }
}
async function handleSignal(data){
  if(!inVoice||!localStream)return;
  if(data.to&&data.to!==myId)return;
  const from=data.id;if(!from||from===myId)return;
  if(!peers.has(from)) ensurePeer(from, data.u||"?", false);
  const entry=peers.get(from);if(!entry)return;
  const pc=entry.pc;
  try{
    if(data.kind==="offer"){
      const offerCollision=(entry.makingOffer||pc.signalingState!=="stable");
      entry.ignoreOffer=!entry.polite && offerCollision;
      if(entry.ignoreOffer) return;
      await pc.setRemoteDescription(data.payload);
      const answer=await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sendRaw({t:"signal",id:myId,to:from,u:myName,kind:"answer",payload:pc.localDescription});
    } else if(data.kind==="answer"){
      await pc.setRemoteDescription(data.payload);
    } else if(data.kind==="ice"&&data.payload){
      try{ await pc.addIceCandidate(data.payload); }catch(e){ if(!entry.ignoreOffer) console.warn(e); }
    }
  }catch(e){ console.warn("signal",e); }
}
function removePeer(id){
  const entry=peers.get(id);if(!entry)return;try{entry.pc.close();}catch(_){}
  if(entry.audioCtx)try{entry.audioCtx.close();}catch(_){}
  if(entry.audio){entry.audio.srcObject=null;entry.audio.remove();}
  peers.delete(id);updateVoicePeersUI();
}


// ── Emoji (Unicode only — no Chrome picker / license issues) ──
const EMOJIS="😀😁😂🤣😃😄😅😆😉😊😋😎😍😘🥰😗🙂🤗🤩🤔🤨😐😑😶🙄😏😣😥😮🤐😯😪😫🥱😴😌😛😜😝🤤😒😓😔😕🙃🤑😲🙁😖😞😟😤😢😭😦😧😨😩🤯😬😰😱🥵🥶😳🤪😵😠😡🤬😷🤒🤕🤢🤮🤧😇🥳🥺🤡🤠😈💀👻👽🤖💩🔥✨⭐🌟💯🎉👍👎👏🙌👋🤝✌️🤞🤟💪❤️🧡💛💚💙💜🖤🤍💔💕💖💗💘".split(/(?:)/u).filter(x=>x.trim());
function buildEmojiPanel(){
  if(!els.emojiPanel||els.emojiPanel.childNodes.length) return;
  for(const em of EMOJIS){
    const b=document.createElement("button");
    b.type="button"; b.textContent=em;
    b.onclick=()=>{
      if(htmlMode&&monacoEditor){
        const sel=monacoEditor.getSelection();
        monacoEditor.executeEdits("",[{range:sel,text:em,forceMoveMarkers:true}]);
        monacoEditor.focus();
      } else {
        const ta=els.msgInput;
        const start=ta.selectionStart, end=ta.selectionEnd;
        ta.value=ta.value.slice(0,start)+em+ta.value.slice(end);
        ta.selectionStart=ta.selectionEnd=start+em.length;
        ta.focus(); onComposerInput();
      }
      els.emojiPanel.classList.remove("on");
    };
    els.emojiPanel.appendChild(b);
  }
}
if(els.emojiBtn){
  els.emojiBtn.onclick=()=>{
    buildEmojiPanel();
    els.emojiPanel.classList.toggle("on");
  };
  document.addEventListener("click",e=>{
    if(!els.emojiPanel.contains(e.target)&&e.target!==els.emojiBtn) els.emojiPanel.classList.remove("on");
  });
}

function getComposerText(){
  if(htmlMode&&monacoEditor) return monacoEditor.getValue();
  return els.msgInput.value;
}
function setComposerText(v){
  els.msgInput.value=v;
  if(monacoEditor) monacoEditor.setValue(v);
}
function onComposerInput(){
  const v=els.msgInput.value;
  const wantHtml=v.trimStart().startsWith("<");
  if(wantHtml&&!htmlMode) enterHtmlMode();
  else if(!wantHtml&&htmlMode) exitHtmlMode();
}
function enterHtmlMode(){
  htmlMode=true;
  if(els.modeTag) els.modeTag.textContent="HTML";
  els.msgInput.classList.add("html-hidden");
  els.monacoHost.classList.add("on");
  loadMonaco().then(()=>{
    if(!monacoEditor){
      monacoEditor=monaco.editor.create(els.monacoHost,{
        value:els.msgInput.value,
        language:"html",
        theme:"vs-dark",
        minimap:{enabled:false},
        fontSize:13,
        wordWrap:"on",
        automaticLayout:true,
        lineNumbers:"off",
      });
      monacoEditor.onDidChangeModelContent(()=>{
        const v=monacoEditor.getValue();
        els.msgInput.value=v;
        if(!v.trimStart().startsWith("<")) exitHtmlMode();
      });
    } else {
      monacoEditor.setValue(els.msgInput.value);
    }
    monacoEditor.focus();
  }).catch(err=>{
    console.warn("Monaco failed, staying on textarea", err);
    // keep textarea visible as fallback
    els.msgInput.classList.remove("html-hidden");
    els.monacoHost.classList.remove("on");
    if(els.modeTag) els.modeTag.textContent="HTML (plain)";
  });
}
function exitHtmlMode(){
  htmlMode=false;
  if(els.modeTag) els.modeTag.textContent="text";
  if(monacoEditor) els.msgInput.value=monacoEditor.getValue();
  els.msgInput.classList.remove("html-hidden");
  els.monacoHost.classList.remove("on");
  els.msgInput.focus();
}
function loadMonaco(){
  if(window.monaco) return Promise.resolve();
  if(monacoLoading) return monacoLoading;
  monacoLoading=new Promise((resolve,reject)=>{
    const loader=document.createElement("script");
    loader.src="https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/loader.js";
    loader.onload=()=>{
      require.config({paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"}});
      require(["vs/editor/editor.main"],()=>resolve(),reject);
    };
    loader.onerror=reject;
    document.head.appendChild(loader);
  });
  return monacoLoading;
}

// patch sendMessage to use getComposerText + HTML flag
const _sendMessageOrig=typeof sendMessage==="function"?sendMessage:null;

els.connectBtn.onclick=connect;els.disconnectBtn.onclick=disconnect;
els.sendBtn.onclick=sendMessage;
els.msgInput.onkeydown=e=>{
  if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); sendMessage(); }
};
els.msgInput.addEventListener("input", onComposerInput);

els.voiceJoinBtn.onclick=joinVoice;els.voiceLeaveBtn.onclick=()=>leaveVoice(false);els.voiceMuteBtn.onclick=toggleMute;
els.applySettingsBtn.onclick=()=>{if(!isRoomCreator()){addMessage({type:"system",text:"Only the room creator can change settings."});return;}roomSettings={text:els.setText.checked,voice:els.setVoice.checked,files:els.setFiles.checked};sendRaw({t:"settings",id:myId,settings:roomSettings});applySettingsToUI();addMessage({type:"system",text:"Settings applied"});};
els.applyAclBtn.onclick=()=>{
  if(!isRoomCreator()){addMessage({type:"system",text:"Only the room creator can change accounts."});return;}
  const accounts=parseAclText(els.aclText.value);
  acl={enabled:els.aclEnabled.checked,guests:els.aclGuests.checked,accounts,guestPerms:{read:true,write:false,voice:false,files:false}};
  sendRaw({t:"acl",id:myId,acl});
  addMessage({type:"system",text:acl.enabled?("ACL on · "+Object.keys(accounts).length+" accounts"):"ACL off"});
};
els.attachBtn.onclick=()=>els.fileInput.click();els.folderBtn.onclick=()=>els.folderInput.click();
els.fileInput.onchange=()=>{if(els.fileInput.files?.length)handleFiles(els.fileInput.files);els.fileInput.value="";};
els.folderInput.onchange=()=>{if(els.folderInput.files?.length)handleFiles(els.folderInput.files);els.folderInput.value="";};
document.addEventListener("paste",e=>{
  if(!connected||!authed||!roomSettings.files||!can("files"))return;
  const files=[];for(const it of e.clipboardData?.items||[]){if(it.kind==="file"){const f=it.getAsFile();if(f)files.push(f);}}
  if(files.length){e.preventDefault();handleFiles(files);}
});
els.loginBtn.onclick=tryLogin;els.loginCancel.onclick=()=>{els.loginGate.classList.remove("on");disconnect();};
els.loginPass.onkeydown=e=>{if(e.key==="Enter")tryLogin();};
(function(){const hash=location.hash.slice(1);if(!hash)return;const parts=hash.split("|");if(parts[0]&&(parts[0].startsWith("ws://")||parts[0].startsWith("wss://")))els.relay.value=decodeURIComponent(parts[0]);if(parts[1])els.passphrase.value=decodeURIComponent(parts[1]);})();
addMessage({type:"system",text:"V0RT3X — full markdown + [;(id)(text):] + [css:id] styles. Voice improved."});
setVoiceUI();
</script>
</body>
</html>
