(function(){
  'use strict';
  var config={checkoutUrls:{online:'https://payfast.greenn.com.br/8fj8dnw?ch_id=142923',complete:'https://payfast.greenn.com.br/j2kvwk2?ch_id=142923'}};
  window.FERNANDA_CONSULTING=Object.freeze(config);
  document.querySelectorAll('.js-consulting-checkout').forEach(function(button){button.addEventListener('click',function(){var url=config.checkoutUrls[button.dataset.plan];if(url){location.assign(url);return;}var status=document.querySelector('[data-consulting-status]');if(status)status.textContent='Checkout em preparação.';});});
  var nodes=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion:reduce)').matches){nodes.forEach(function(node){node.classList.add('in');});return;}
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target);}});},{threshold:.08});
  nodes.forEach(function(node){observer.observe(node);});
})();
