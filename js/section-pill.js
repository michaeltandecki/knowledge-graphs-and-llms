(function () {
  const pill = document.getElementById('section-pill');
  if (!pill) return;

  function getSectionLabel(slide) {
    let el = slide;
    while (el) {
      if (el.dataset && el.dataset.section) return el.dataset.section;
      el = el.parentElement;
    }
    return '';
  }

  function update() {
    const slide = Reveal.getCurrentSlide();
    if (!slide) return;
    const label = getSectionLabel(slide);
    if (label) {
      pill.textContent = label;
      pill.hidden = false;
    } else {
      pill.hidden = true;
    }
  }

  Reveal.on('ready', update);
  Reveal.on('slidechanged', update);
})();
