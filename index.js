import{a as x,S as v,i as n}from"./assets/vendor-CrlV4O_2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function c(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=c(r);fetch(r.href,o)}})();async function m(e,t=1){const c="50678696-ed6f097088bf5690dd98584b9",i="https://pixabay.com/api/",o={key:c,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};try{return(await x.get(i,{params:o})).data}catch(a){throw console.error("Error fetching images:",a),new Error("Failed to fetch images from Pixabay.")}}const L=new v(".gallery a",{captionsData:"alt",captionDelay:250});function p(e){const t=document.querySelector(".gallery");if(!t){console.error("Gallery container not found.");return}const c=e.map(i=>`
        <li class="gallery-item">
            <a href="${i.largeImageURL}">
                <img class="gallery-image" src="${i.webformatURL}" alt="${i.tags}">
                <div class="image-info">
                    <div class="info-item">
                        <b>Likes</b>
                        <p>${i.likes}</p>
                    </div>
                    <div class="info-item">
                        <b>Views</b>
                        <p>${i.views}</p>
                    </div>
                    <div class="info-item">
                        <b>Comments</b>
                        <p>${i.comments}</p>
                    </div>
                    <div class="info-item">
                        <b>Downloads</b>
                        <p>${i.downloads}</p>
                    </div>
                </div>
            </a>
        </li>
    `).join("");t.insertAdjacentHTML("beforeend",c),L.refresh()}function w(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function h(){const e=document.querySelector(".loader");e&&e.classList.remove("hidden")}function f(){const e=document.querySelector(".loader");e&&e.classList.add("hidden")}function y(){const e=document.querySelector(".load-more-button");e&&e.classList.remove("hidden")}function l(){const e=document.querySelector(".load-more-button");e&&e.classList.add("hidden")}function P(){const e=document.querySelector(".gallery-item");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}const g=document.querySelector(".form"),S=g.elements["search-text"],q=document.querySelector(".load-more-button");let s=1,d="",u=0;const b=15;l();f();g.addEventListener("submit",async e=>{if(e.preventDefault(),d=S.value.trim(),!d){n.warning({message:"Please enter a search query.",position:"topRight",backgroundColor:"rgba(255, 193, 7, 0.8)",maxWidth:"432px",minHeight:"88px",padding:"20px"});return}s=1,u=0,w(),l(),h();try{const t=await m(d,s);u=t.totalHits,t.hits.length===0?n.error({message:"Sorry, there are no images matching your search query.<br>Please try again!",position:"topRight",backgroundColor:"rgba(239, 64, 64, 0.8)",maxWidth:"432px",minHeight:"88px",padding:"20px",html:!0}):(p(t.hits),u>s*b?y():(n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"rgba(76, 175, 80, 0.8)",maxWidth:"432px",minHeight:"88px",padding:"20px",color:"#ffffff",html:!0}),l()))}catch(t){n.error({title:"Error",message:t.message||"An error occurred while fetching images. Please try again later.",position:"topRight",backgroundColor:"rgba(239, 64, 64, 0.8)",maxWidth:"432px",minHeight:"88px",padding:"20px"})}finally{f(),g.reset()}});q.addEventListener("click",async()=>{s+=1,l(),h();try{const e=await m(d,s);p(e.hits),P(),u>s*b?y():(n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"rgba(76, 175, 80, 0.8)",maxWidth:"432px",minHeight:"88px",padding:"20px",color:"#ffffff",html:!0}),l())}catch(e){n.error({title:"Error",message:e.message||"An error occurred while loading more images. Please try again later.",position:"topRight",backgroundColor:"rgba(239, 64, 64, 0.8)",maxWidth:"432px",minHeight:"88px",padding:"20px"})}finally{f()}});
//# sourceMappingURL=index.js.map
