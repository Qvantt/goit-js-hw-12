import{a as y,S as L,i as m}from"./assets/vendor-b11e2a50.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&u(f)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const b="44792549-8b3a4a2cfb17648b3cdad98bf",v="https://pixabay.com/api/";async function h(s,e,o){return(await y.get(v,{params:{key:b,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:o}})).data}function p(s){return s.map(e=>`
        <div class="photo-card">
          <a href="${e.largeImageURL}">
            <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
          </a>
          <div class="stats">
            <p class="stats-item">
              <b>Likes:</b> ${e.likes}
            </p>
            <p class="stats-item">
              <b>Views:</b> ${e.views}
            </p>
            <p class="stats-item">
              <b>Comments:</b> ${e.comments}
            </p>
            <p class="stats-item">
              <b>Downloads:</b> ${e.downloads}
            </p>
          </div>
        </div>`).join("")}let c="",i=1;const d=15,w=document.querySelector("#search-form"),l=document.querySelector(".gallery"),n=document.querySelector(".load-more"),a=document.querySelector(".loader");let g=new L(".gallery a");w.addEventListener("submit",async s=>{if(s.preventDefault(),c=s.target.elements.searchQuery.value.trim(),!!c){i=1,l.innerHTML="",n.classList.add("hidden"),a.classList.remove("hidden");try{const e=await h(c,i,d),o=p(e.hits);l.innerHTML=o,g.refresh(),e.totalHits>d&&n.classList.remove("hidden"),a.classList.add("hidden")}catch(e){console.error("Error fetching images:",e),m.error({title:"Error",message:"Failed to fetch images. Please try again later."}),a.classList.add("hidden")}}});n.addEventListener("click",async()=>{i+=1,a.classList.remove("hidden");try{const s=await h(c,i,d),e=p(s.hits);if(l.insertAdjacentHTML("beforeend",e),g.refresh(),i*d>=s.totalHits)n.classList.add("hidden"),m.info({title:"Info",message:"We're sorry, but you've reached the end of search results."});else{const{height:o}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}a.classList.add("hidden")}catch(s){console.error("Error fetching images:",s),m.error({title:"Error",message:"Failed to fetch images. Please try again later."}),a.classList.add("hidden")}});document.addEventListener("DOMContentLoaded",()=>{n.classList.add("hidden"),a.classList.add("hidden")});
//# sourceMappingURL=commonHelpers.js.map
