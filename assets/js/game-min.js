const gameModule=(()=>{"use strict";const e=document.querySelector("#btnNewGame"),t=document.querySelector("#btnRequestCard"),l=document.querySelector("#btnStop"),s=document.querySelectorAll("small"),r=document.querySelectorAll(".playersCards");let n=[];const o=["C","D","H","S"],d=["A","J","Q","K"];let a=[];t.disabled=!0,l.disabled=!0;const c=(e=2)=>{a=[];for(let t=0;t<e;t++)a.push(0);s.forEach(e=>e.innerText="0"),r.forEach(e=>e.innerHTML=""),t.disabled=!1,l.disabled=!1},i=()=>0===n.length?alert("No cards"):n.pop(),u=(e,t)=>(a[e]+=(e=>{const t=e.slice(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(t),s[e].innerText=a[e],a[e]),m=e=>{let t=0;do{const e=i();t=u(a.length-1,e),b(e,r.length-1)}while(t<e&&e<=21);(()=>{const[e,t]=a;setTimeout(()=>{t===e?alert("Tied game"):e>21?alert("Computer Won!"):t>21?alert("Player Won!"):alert("Computer Won")},500)})()};t.addEventListener("click",()=>{f()}),l.addEventListener("click",()=>{t.disabled=!0,m(a[0]),l.disabled=!0}),e.addEventListener("click",()=>{p(),(()=>{n=[];for(let e=2;e<=10;e++)for(let t of o)n.push(`${e}${t}`);for(let e of o)for(let t of d)n.push(`${t}${e}`);n=_.shuffle(n)})()});const b=(e,t)=>{const l=document.createElement("img");l.classList.add("card"),l.src=`./assets/cartas/${e}.png`,r[t].append(l)},f=()=>{const e=i(),s=u(0,e);b(e,0),(e=>{e>21?(t.disabled=!0,l.disabled=!0,m(e)):21===e&&(setTimeout(()=>{alert("Nice, you make 21!!")},500),t.disabled=!0,l.disabled=!0,m(e))})(s)},p=()=>{c()};return{newGame:c}})();