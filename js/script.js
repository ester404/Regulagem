document.querySelectorAll('.ref-shot img').forEach(function(img){
    img.addEventListener('click', function(e){
      e.stopPropagation();
      var lb = document.getElementById('lightbox');
      document.getElementById('lightbox-img').src = img.src;
      document.getElementById('lightbox-caption').textContent = img.alt || '';
      lb.classList.add('open');
    });
  });
  function closeLightbox(){ document.getElementById('lightbox').classList.remove('open'); }
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLightbox(); });

  // checklist
  (function(){
    var STORAGE_KEY = 'cartilha-checklist-v1';
    var state = {};
    try{ state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }catch(e){ state = {}; }
    function save(){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){} }

    document.querySelectorAll('.item').forEach(function(card){
      var cardId = card.id;
      var stepLis = card.querySelectorAll('.steps li');
      if(stepLis.length === 0) return;
      stepLis.forEach(function(li, idx){
        var key = cardId + '-' + idx;
        if(state[key]){ li.classList.add('done'); }
        li.addEventListener('click', function(){
          li.classList.toggle('done');
          state[key] = li.classList.contains('done');
          save();
        });
      });
      var reset = document.createElement('div');
      reset.className = 'checklist-reset';
      reset.textContent = 'Limpar marcações deste item';
      reset.addEventListener('click', function(e){
        e.stopPropagation();
        stepLis.forEach(function(li, idx){ li.classList.remove('done'); delete state[cardId+'-'+idx]; });
        save();
      });
      var allSteps = card.querySelectorAll('.steps');
      var lastSteps = allSteps[allSteps.length-1];
      lastSteps.insertAdjacentElement('afterend', reset);
    });
  })();

  // back to top + sidebar active highlight
  window.addEventListener('scroll', function(){
    document.getElementById('backtop').classList.toggle('show', window.scrollY > 500);
  });

  var sbLinks = document.querySelectorAll('.sb-item');
  var itemEls = document.querySelectorAll('.item');
  function updateActive(){
    var pos = window.scrollY + 120;
    var current = null;
    itemEls.forEach(function(el){ if(el.offsetTop <= pos) current = el.id; });
    sbLinks.forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActive);
  updateActive();

  // o menu já nasce fechado (é o padrão no CSS); fecha de novo depois de clicar num link
  sbLinks.forEach(function(a){
    a.addEventListener('click', function(){
      document.body.classList.remove('sidebar-open');
    });
  });