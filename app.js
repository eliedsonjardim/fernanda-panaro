(function(){
  'use strict';
  var product={productName:'Guia do Sofá · Edição 01',launchPrice:47,referencePrice:97,checkoutUrl:'https://payfast.greenn.com.br/97w8uhr?ch_id=142923',installmentText:'',deliveryText:'Acesso digital após a confirmação da compra.',supportText:'Canal de suporte a definir na configuração da Green.'};
  window.FERNANDA_PRODUCT=Object.freeze(product);
  document.querySelectorAll('[data-installments]').forEach(function(el){if(product.installmentText){el.textContent=product.installmentText;el.hidden=false;}});
  function track(name,details){window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event:name,product_name:product.productName},details||{}));}
  function getCheckout(){if(!product.checkoutUrl)return '';var out=new URL(product.checkoutUrl,location.href);new URLSearchParams(location.search).forEach(function(v,k){if(/^utm_/i.test(k))out.searchParams.set(k,v);});return out.toString();}
  document.querySelectorAll('.js-checkout').forEach(function(button){button.addEventListener('click',function(event){event.preventDefault();track('click_checkout',{checkout_ready:Boolean(product.checkoutUrl)});var url=getCheckout();if(url){location.assign(url);return;}document.querySelectorAll('[data-checkout-status]').forEach(function(s){s.textContent='Compra ainda não liberada nesta prévia. O checkout da Green será conectado aqui.';});var offer=document.getElementById('oferta');if(offer&&!offer.contains(button))offer.scrollIntoView({behavior:'smooth',block:'center'});});});
  var mobileBuy=document.querySelector('.mobile-buy');
  var offerSection=document.getElementById('oferta');
  if(mobileBuy&&offerSection){
    var updateSticky=function(){var passed=window.scrollY>offerSection.offsetTop+offerSection.offsetHeight;if(passed){mobileBuy.classList.add('is-visible');}else{mobileBuy.classList.remove('is-visible');}mobileBuy.setAttribute('aria-hidden',String(!passed));};
    window.addEventListener('scroll',updateSticky,{passive:true});window.addEventListener('resize',updateSticky);updateSticky();
  }
  track('page_view',{page_type:'product_landing'});
  var nodes=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver'in window)||matchMedia('(prefers-reduced-motion:reduce)').matches){nodes.forEach(function(n){n.classList.add('in');});return;}
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target);}});},{threshold:.1});
  nodes.forEach(function(n){observer.observe(n);});
})();
