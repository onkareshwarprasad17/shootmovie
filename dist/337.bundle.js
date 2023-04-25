"use strict";(self.webpackChunkshootmovie=self.webpackChunkshootmovie||[]).push([[337],{337:(e,s,a)=>{a.r(s),a.d(s,{default:()=>b});var i=a(294),t=a(724),l=a(812),r=a(515),c=a(3),d=a(998),n=a(655),o=a(893);const m=()=>{const{url:e}=(0,d.v9)((e=>e.app)),{data:s}=(0,r.Z)("/movie/popular"),a=(0,i.useRef)(null),[m,h]=(0,i.useState)(null),[v,x]=(0,i.useState)(0);return(0,i.useEffect)((()=>{s?.results&&h(s?.results?.slice(0,5))}),[s]),(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:"heroCarousel",children:[m?.map(((s,a)=>a===v&&(0,o.jsx)("img",{src:e.backdrop+s?.backdrop_path,alt:`movie-${s?.id}`,"data-testid":"backdrop-image"},a))),(0,o.jsx)("div",{className:"left-arrow",children:(0,o.jsx)("span",{children:(0,o.jsx)(t.Z,{onClick:()=>{const e=a.current,s=e.children[0].offsetWidth;let i=v;0==v?(i=m?.length-1,e.scrollLeft=s*m?.length):(i-=1,e.scrollLeft=e.scrollLeft-s+10),x(i)},"data-testid":"left-arrow"})})}),(0,o.jsx)("div",{className:"right-arrow",children:(0,o.jsx)("span",{children:(0,o.jsx)(l.Z,{onClick:()=>{const e=a.current,s=e.children[0].offsetWidth;let i=v;v==m?.length-1?(i=0,e.scrollLeft=0):(i+=1,e.scrollLeft=e.scrollLeft+s+20),x(i)},"data-testid":"right-arrow"})})}),(0,o.jsx)("div",{className:"carousel-items",ref:a,children:m?.map(((s,a)=>(0,o.jsxs)(n.rU,{to:`/movie/${s.id}`,className:"carousel-card"+(a===v?" active":""),"data-testid":"heroCarousel-card",children:[(0,o.jsx)("img",{src:e.backdrop+s?.backdrop_path,alt:`movie-${s?.id}`,"data-testid":"card-image"}),(0,o.jsx)("div",{className:"progress-bar-svg",children:(0,o.jsx)(c.Z,{rating:s?.vote_average,currentSlide:s})}),(0,o.jsxs)("div",{className:"carousel-text",children:[(0,o.jsx)("div",{className:"carousel-title",children:s?.original_title}),(0,o.jsx)("div",{className:"carousel-overview",children:s?.overview})]})]},a)))}),(0,o.jsx)("div",{className:"dots-container",children:m?.map(((e,s)=>(0,o.jsx)("div",{className:"dot"+(s===v?" active":""),"data-testid":`dot-${s}`},`dot-${s}`)))})]})})},h=i.memo(m);var v=a(494);const x=()=>{const[e,s]=(0,i.useState)("movie"),{data:a}=(0,r.Z)(`/trending/${e}/week`),[t,l]=(0,i.useState)(null),c=e=>{s(e)};return(0,i.useEffect)((()=>{l(a?.results)}),[a]),(0,o.jsxs)("div",{className:"trending",children:[(0,o.jsxs)("div",{className:"heading",children:[(0,o.jsx)("div",{className:"title",children:"Trending"}),(0,o.jsxs)("div",{className:"media-types",children:[(0,o.jsx)("span",{className:`movie${"movie"===e&&" active"}`,onClick:()=>c("movie"),children:"Movies"}),(0,o.jsx)("span",{className:`tv${"tv"===e&&" active"}`,onClick:()=>c("tv"),children:"TV Shows"})]})]}),(0,o.jsx)(v.Z,{data:t,type:"detail"})]})},j=(0,i.memo)(x),u=()=>{const{url:e}=(0,d.v9)((e=>e.app)),{data:s}=(0,r.Z)("/movie/upcoming"),[a,t]=(0,i.useState)(null);return(0,i.useEffect)((()=>{t(s?.results?.slice(0,5))}),[s]),(0,o.jsx)("div",{className:"upcoming-carousel",children:(0,o.jsx)("div",{className:"carousel-items",children:a?.map((s=>(0,o.jsxs)(n.rU,{className:"carousel-item",to:`/movie/${s.id}`,children:[(0,o.jsx)("img",{src:e.backdrop+s.backdrop_path,alt:""}),(0,o.jsx)("span",{className:"text",children:s.original_title}),(0,o.jsx)("div",{className:"opacity-layer"})]},s.id)))})})},p=(0,i.memo)(u),N=()=>(0,o.jsxs)("div",{className:"upcoming",children:[(0,o.jsxs)("div",{className:"text-container",children:[(0,o.jsxs)("div",{className:"heading",children:[(0,o.jsx)("span",{className:"first-letter",children:"W"}),"orth waiting for"]}),(0,o.jsx)("div",{className:"overview",children:"Watch trailer of the upcoming movies!"})]}),(0,o.jsx)(p,{}),(0,o.jsx)("div",{className:"background-ellipse"})]}),g=()=>{const{data:e}=(0,r.Z)("/movie/top_rated"),[s,a]=(0,i.useState)(null);return(0,i.useEffect)((()=>{const s=e?.results?.map((e=>({...e,media_type:"movie"})));a(s?.slice(0,10))}),[e]),(0,o.jsx)(o.Fragment,{children:s&&(0,o.jsxs)("div",{className:"topRated",children:[(0,o.jsxs)("div",{className:"heading",children:[(0,o.jsx)("div",{className:"title",children:"Top Rated Movies"}),(0,o.jsx)("div",{className:"more",children:"More"})]}),(0,o.jsx)(v.Z,{data:s,type:"detail"})]})})},f=()=>{const{genres:e}=(0,d.v9)((e=>e.app));return(0,o.jsx)(o.Fragment,{children:e.length&&(0,o.jsxs)("div",{className:"explore",children:[(0,o.jsxs)("div",{className:"heading",children:[(0,o.jsx)("div",{className:"title",children:"Explore by Genres"}),(0,o.jsx)("div",{className:"more",children:"More"})]}),(0,o.jsx)(v.Z,{data:e,type:"genre"})]})})},k=()=>(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("section",{className:"home",children:[(0,o.jsx)(h,{}),(0,o.jsx)(j,{}),(0,o.jsx)(N,{}),(0,o.jsx)(g,{}),(0,o.jsx)(f,{})]})}),b=(0,i.memo)(k)}}]);