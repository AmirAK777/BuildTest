import{c as s}from"./chunk-G3CV3VGG.js";import{b as c}from"./chunk-52SVZWMH.js";var T="ION-CONTENT",l="ion-content",i=".ion-content-scroll-host",a=`${l}, ${i}`,n=o=>o.tagName===T,f=async o=>n(o)?(await new Promise(t=>c(o,t)),o.getScrollElement()):o,m=o=>{let t=o.querySelector(i);return t||o.querySelector(a)},E=o=>o.closest(a),O=(o,t)=>n(o)?o.scrollToTop(t):Promise.resolve(o.scrollTo({top:0,left:0,behavior:t>0?"smooth":"auto"})),p=(o,t,r,e)=>n(o)?o.scrollByPoint(t,r,e):Promise.resolve(o.scrollBy({top:r,left:t,behavior:e>0?"smooth":"auto"})),S=o=>s(o,l),_=o=>{if(n(o)){let t=o,r=t.scrollY;return t.scrollY=!1,r}else return o.style.setProperty("overflow","hidden"),!0},y=(o,t)=>{n(o)?o.scrollY=t:o.style.removeProperty("overflow")};export{l as a,i as b,n as c,f as d,m as e,E as f,O as g,p as h,S as i,_ as j,y as k};
