// Injects nav and chat widget into every page
function injectShell(activePage) {
  const nav = `
  <nav>
    <a href="../index.html" class="nav-logo">🎓 Campus<span>Copilot</span></a>
    <ul class="nav-links">
      <li><a href="../pages/college-finder.html" ${activePage==='finder'?'class="active"':''}>College Finder</a></li>
      <li><a href="../pages/compare.html" ${activePage==='compare'?'class="active"':''}>Compare</a></li>
      <li><a href="../pages/reality.html" ${activePage==='reality'?'class="active"':''}>Reality Check</a></li>
      <li><a href="../pages/roadmap.html" ${activePage==='roadmap'?'class="active"':''}>Career Roadmap</a></li>
      <li><a href="../pages/resume.html" ${activePage==='resume'?'class="active"':''}>Resume Review</a></li>
      <li><a href="../pages/interview.html" ${activePage==='interview'?'class="active"':''}>Interview Coach</a></li>
      <li><a href="../pages/admission.html" ${activePage==='admission'?'class="active"':''}>Admission Guide</a></li>
    </ul>
  </nav>`;

  const chatWidget = `
  <button id="chat-fab" title="Ask CampusBot">💬</button>
  <div id="chat-modal">
    <div class="chat-header">
      <div class="chat-header-title">
        <div class="chat-online-dot"></div>
        CampusBot
      </div>
      <button class="chat-close" id="chat-close">✕</button>
    </div>
    <div class="chat-messages" id="chat-messages"></div>
    <div class="chat-input-row">
      <input type="text" id="chat-input" placeholder="Ask anything about colleges…" />
      <button class="chat-send" id="chat-send">➤</button>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', chatWidget);
}

// Index page nav (no ../ prefix)
function injectIndexShell() {
  const nav = `
  <nav>
    <a href="index.html" class="nav-logo">🎓 Campus<span>Copilot</span></a>
    <ul class="nav-links">
      <li><a href="pages/college-finder.html">College Finder</a></li>
      <li><a href="pages/compare.html">Compare</a></li>
      <li><a href="pages/reality.html">Reality Check</a></li>
      <li><a href="pages/roadmap.html">Career Roadmap</a></li>
      <li><a href="pages/resume.html">Resume Review</a></li>
      <li><a href="pages/interview.html">Interview Coach</a></li>
      <li><a href="pages/admission.html">Admission Guide</a></li>
    </ul>
  </nav>`;

  const chatWidget = `
  <button id="chat-fab" title="Ask CampusBot">💬</button>
  <div id="chat-modal">
    <div class="chat-header">
      <div class="chat-header-title">
        <div class="chat-online-dot"></div>
        CampusBot
      </div>
      <button class="chat-close" id="chat-close">✕</button>
    </div>
    <div class="chat-messages" id="chat-messages"></div>
    <div class="chat-input-row">
      <input type="text" id="chat-input" placeholder="Ask anything about colleges…" />
      <button class="chat-send" id="chat-send">➤</button>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', chatWidget);
}
