(() => {
  'use strict';
  const lab = window.AICreativeLab;
  const root = document.querySelector('#recentWork');
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
  const recent = lab.read(lab.recentKey, []);
  const urls = { Character: 'character-builder.html', Scene: 'scene-builder.html', Prompt: 'prompt-builder.html', Unity: 'unity-builder.html' };
  const icons = { Character: '👤', Scene: '🏞️', Prompt: '✨', Unity: '🎮' };
  root.innerHTML = recent.length ? recent.map(item => `<a class="recent-card" href="${urls[item.type] || 'index.html'}${item.id ? `?load=${encodeURIComponent(item.id)}` : ''}"><span>${icons[item.type] || '✦'}</span><div><small>${escapeHtml(item.type || 'Work')}</small><strong>${escapeHtml(item.name || 'Untitled')}</strong><time>${new Date(item.savedAt).toLocaleString('th-TH')}</time></div><b>→</b></a>`).join('') : `<div class="recent-empty"><span>🎮</span><strong>ยังไม่มีเซฟเกม</strong><p>เลือกภารกิจแรกเพื่อเริ่มสร้างงาน</p><div class="recent-empty-actions"><a href="prompt-builder.html">✨ Prompt Builder</a><a href="character-builder.html">👤 Character</a><a href="scene-builder.html">🏞️ Scene</a><a href="unity-builder.html">🎮 Unity AI Helper</a></div></div>`;
})();
