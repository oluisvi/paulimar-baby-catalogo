(() => {
  const phone='5527997148456';
  const categories=['Jogos de quarto 2025','Berços de madeira','Banheiras','Berço portátil','Cadeirinhas para carro','Carrinhos','Bebê reborn'];
  const products=[
    {name:'Mini Berço com colchão',category:'Berços de madeira',image:'images/mini-berco.jpg',alt:'Mini berço com colchão, imagem do catálogo da PaulimarBaby',detail:'Produto e imagem conforme o catálogo compartilhado pela loja. Consulte medidas, acabamento e disponibilidade.'},
    {name:'Banheira Infantil Acqua Premium',category:'Banheiras',image:'images/banheira-acqua.jpg',alt:'Banheira infantil Acqua Premium, imagem do catálogo da PaulimarBaby',detail:'O catálogo apresenta a banheira com suporte e redutor. Confirme modelo, detalhes e disponibilidade com a equipe.'},
    {name:'Bebê conforto Galzerano',category:'Cadeirinhas para carro',image:'images/bebe-conforto.jpg',alt:'Bebê conforto Galzerano, imagem do catálogo da PaulimarBaby',detail:'Marca e imagem conforme o catálogo. Consulte modelo, variações e compatibilidade antes de escolher.'},
    {name:'Carrinho com Bebê conforto Burigotto',category:'Carrinhos',image:'images/carrinho-burigotto.jpg',alt:'Carrinho com bebê conforto Burigotto, imagem do catálogo da PaulimarBaby',detail:'A descrição do catálogo menciona cabo reversível, capota regulável/removível e cinto de 5 pontos. Confirme a versão atual.'}
  ];
  let currentStyle=Math.min(2,Math.max(0,Number(new URLSearchParams(location.search).get('design'))||0));
  let activeCategory='Todas as categorias';
  let searchTerm='';
  const designs=['Casa','Ninho','Rotina'];
  const $=(selector,root=document)=>root.querySelector(selector);
  const message=(product)=>'Oi! Vi a prévia da PaulimarBaby e gostaria de saber mais sobre '+(product||'um produto')+'.';
  const wa=(product)=>'https://wa.me/'+phone+'?text='+encodeURIComponent(message(product));
  const normalize=(value)=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();

  function renderHero(){
    if(currentStyle===1){
      return '<div class="hero-copy"><p class="eyebrow">CATEGORIAS PARA DIFERENTES MOMENTOS</p><h1 id="hero-title">Escolhas de cuidado, <em>em um só lugar.</em></h1><p>Explore as categorias do catálogo e encontre uma referência para conversar com a equipe.</p><div class="hero-actions"><a class="button" href="#categorias">Descobrir categorias ↓</a><a class="text-link linktree-link" href="https://linktr.ee/paulimarbaby" target="_blank" rel="noopener noreferrer">Atendimento por região ↗</a></div><p class="hero-note">Esta página é uma prévia de organização. Confirme produto, variação e disponibilidade com a loja.</p></div><div class="hero-photo"><img src="images/carrinho-burigotto.jpg" alt="Carrinho com bebê conforto Burigotto, imagem do catálogo compartilhado pela loja" width="1100" height="900" fetchpriority="high"><span class="photo-caption">IMAGEM DO CATÁLOGO DA LOJA</span></div>';
    }
    if(currentStyle===2){
      return '<div class="hero-copy"><p class="eyebrow">PAULIMARBABY · PRODUTOS INFANTIS</p><h1 id="hero-title">Tudo começa com uma <em>boa escolha.</em></h1><p>Uma prévia clara para percorrer categorias, descobrir produtos e perguntar à loja sobre os detalhes.</p><div class="hero-actions"><a class="button" href="#catalogo">Ver exemplos do catálogo ↓</a><a class="text-link whatsapp-link" href="'+wa('um produto')+'" target="_blank" rel="noopener noreferrer">Falar com a equipe ↗</a></div><p class="hero-note">Exemplos do catálogo compartilhado. Valores atuais não foram incluídos nesta prévia.</p></div><div class="hero-photo"><img src="images/mini-berco.jpg" alt="Mini berço com colchão do catálogo da PaulimarBaby" width="800" height="800" fetchpriority="high"><span class="photo-caption">CATEGORIA · BERÇOS</span></div>';
    }
    return '<div class="hero-copy"><p class="eyebrow">PAULIMARBABY · CATÁLOGO</p><h1 id="hero-title">Um cantinho para cada <em>fase.</em></h1><p>Veja categorias e produtos selecionados do catálogo compartilhado pela loja. Se surgir uma dúvida, continue a conversa direto com a equipe.</p><div class="hero-actions"><a class="button" href="#catalogo">Explorar produtos ↓</a><a class="text-link linktree-link" href="https://linktr.ee/paulimarbaby" target="_blank" rel="noopener noreferrer">Canais por região ↗</a></div><p class="hero-note">Os exemplos desta página ajudam a encontrar o item e perguntar sobre ele pelo WhatsApp.</p></div><div class="hero-photo"><img src="images/banheira-acqua.jpg" alt="Banheira infantil Acqua Premium do catálogo da PaulimarBaby" width="850" height="750" fetchpriority="high"><span class="photo-caption">IMAGEM DO CATÁLOGO DA LOJA</span></div>';
  }

  function updateDesign(){
    document.body.dataset.style=String(currentStyle);
    document.querySelectorAll('.design-switch button[data-style]').forEach((button)=>button.setAttribute('aria-pressed',String(Number(button.dataset.style)===currentStyle)));
    const next=new URL(location.href);next.searchParams.set('design',String(currentStyle));history.replaceState({},'',next);
    $('#hero').innerHTML=renderHero();
  }

  function renderCategories(){
    const options=['Todas as categorias',...categories];
    $('#category-grid').innerHTML=options.map((category,index)=>'<button class="category-button" type="button" data-category="'+category+'" aria-pressed="'+String(activeCategory===category)+'"><span>'+(index===0?'Ver tudo':category)+'</span><span aria-hidden="true">'+(index===0?'↗':'0'+String(index).padStart(2,'0'))+'</span></button>').join('');
  }

  function renderProducts(){
    const query=normalize(searchTerm);
    const filtered=products.filter((product)=>(activeCategory==='Todas as categorias'||product.category===activeCategory)&&(!query||normalize(product.name+' '+product.category+' '+product.detail).includes(query)));
    $('#result-status').textContent=filtered.length+' '+(filtered.length===1?'exemplo':'exemplos')+(activeCategory==='Todas as categorias'?'':' · '+activeCategory);
    if(filtered.length){
      $('#product-grid').innerHTML=filtered.map((product)=>'<article class="product-card"><div class="product-media"><img src="'+product.image+'" alt="'+product.alt+'" width="900" height="680" loading="lazy" decoding="async"><span class="photo-caption">'+product.category.toUpperCase()+'</span></div><div class="product-body"><p class="product-category">'+product.category.toUpperCase()+'</p><h3>'+product.name+'</h3><p>'+product.detail+'</p><div class="product-actions"><a href="'+wa(product.name)+'" target="_blank" rel="noopener noreferrer">Perguntar sobre este item ↗</a></div></div></article>').join('');
    }else if(activeCategory!=='Todas as categorias'&&!query){
      $('#product-grid').innerHTML='<p class="note-state"><strong>'+activeCategory+'</strong> aparece no catálogo compartilhado pela loja, mas os produtos dessa seção não estão ilustrados nesta prévia. Acesse os canais da loja para consultar os itens atuais.</p>';
    }else{
      $('#product-grid').innerHTML='<p class="empty-state">Não encontramos itens com essa busca. Tente outro nome ou limpe a categoria.</p>';
    }
  }

  document.addEventListener('click',(event)=>{
    const design=event.target.closest('.design-switch button[data-style]');
    if(design){currentStyle=Number(design.dataset.style);updateDesign();design.focus({preventScroll:true});return;}
    const category=event.target.closest('[data-category]');
    if(category){activeCategory=category.dataset.category;renderCategories();renderProducts();$('#catalogo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});return;}
  });
  $('#search').addEventListener('input',(event)=>{searchTerm=event.target.value;renderProducts();});
  $('#clear-filter').addEventListener('click',()=>{activeCategory='Todas as categorias';searchTerm='';$('#search').value='';renderCategories();renderProducts();$('#categorias').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
  window.addEventListener('popstate',()=>{currentStyle=Math.min(2,Math.max(0,Number(new URLSearchParams(location.search).get('design'))||0));updateDesign();});
  document.querySelectorAll('.whatsapp-link').forEach((link)=>{link.href=wa('um produto');});
  updateDesign();renderCategories();renderProducts();
})();
