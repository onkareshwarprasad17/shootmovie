"use strict";(self.webpackChunkshootmovie=self.webpackChunkshootmovie||[]).push([[361],{753:(e,s,a)=>{a.r(s),a.d(s,{default:()=>C});var t=a(294),i=a(515),r=a(335),l=a(893);const d=(0,t.createContext)(),n=e=>{let{children:s}=e;const{mediaType:a,id:t}=(0,r.UO)(),{data:n,loading:c}=(0,i.Z)(`/${a}/${t}/videos`),o=n?.results?.filter((e=>e?.name?.match(/trailer/gi))),h={videos:o,videoIsLoading:c,mediaType:a,id:t};return(0,l.jsx)(d.Provider,{value:h,children:s})};var c=a(998),o=a(413);const h={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M690 405h-46.9c-10.2 0-19.9 4.9-25.9 13.2L512 563.6 406.8 418.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246c3.2 4.4 9.7 4.4 12.9 0l178-246c3.9-5.3.1-12.7-6.4-12.7z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"down-circle",theme:"outlined"};var m=a(747),x=function(e,s){return t.createElement(m.Z,(0,o.Z)((0,o.Z)({},e),{},{ref:s,icon:h}))};x.displayName="DownCircleOutlined";const g=t.forwardRef(x);var v=a(3),p=a(20);const j=()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("section",{className:"skeleton-detail-banner left",children:[(0,l.jsx)(p.Z,{type:"title"}),(0,l.jsx)(p.Z,{type:"text"}),(0,l.jsx)(p.Z,{type:"text"}),(0,l.jsx)(p.Z,{type:"text"}),(0,l.jsx)(p.Z,{type:"text"}),(0,l.jsxs)("div",{className:"genres-list",children:[(0,l.jsx)(p.Z,{type:"genre"}),(0,l.jsx)(p.Z,{type:"genre"})]})]}),(0,l.jsx)("section",{className:"right",children:(0,l.jsx)("div",{className:"skeleton-poster",children:(0,l.jsx)("div",{className:"progress-bar-svg",children:(0,l.jsx)(v.Z,{currentSlide:null})})})})]}),u=a.p+"cc63bbf8a9ad9fa3887b.png",N=()=>{const{url:e}=(0,c.v9)((e=>e.app)),{mediaType:s,id:a}=(0,t.useContext)(d),{data:r,loading:n}=(0,i.Z)(`/${s}/${a}`),[o,h]=(0,t.useState)(null),[m,x]=(0,t.useState)(!1),[p,N]=(0,t.useState)("");return(0,t.useEffect)((()=>{h({...o,backdropImg:r?.backdrop_path,posterImg:r?.poster_path,title:r?.original_title||r?.original_name,overview:r?.overview,year:new Date(r?.release_date||r?.first_air_date).getFullYear(),genres:r?.genres,vote_average:r?.vote_average?.toFixed(1)}),r?.overview?.length>250?(N((e=>r.overview.slice(0,250))),x(!0)):(N(r?.overview),x(!1))}),[r]),(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:"details-banner","data-testid":"details-banner",children:[(0,l.jsx)("div",{className:"backdrop-image",children:o?.backdropImg&&(0,l.jsx)("img",{src:e.backdrop+o?.backdropImg,alt:""})}),(0,l.jsx)("div",{className:"opacity-layer"}),(0,l.jsx)("div",{className:"content-wrapper",children:(0,l.jsxs)("div",{className:"content",children:[!n&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("section",{className:"left",children:[(0,l.jsxs)("div",{className:"heading",children:[o?.title,(0,l.jsx)("span",{className:"sub-heading",children:o?.year})]}),(0,l.jsxs)("div",{className:"overview","data-testid":"overview",children:[p,!!m&&(0,l.jsx)("span",{className:"ellipsis","data-testid":"ellipsis",onClick:()=>(x(!1),void N(o?.overview)),children:"..."})]}),(0,l.jsx)("div",{className:"genres-list",children:o?.genres?.map((e=>(0,l.jsx)("div",{className:"genre","data-testid":"genre-badge",children:e.name},e.id)))}),(0,l.jsxs)("div",{className:"show-more",onClick:()=>{document.querySelector("#more-details").scrollIntoView({behavior:"smooth"})},children:["More Details",(0,l.jsx)("span",{children:(0,l.jsx)(g,{})})]})]}),(0,l.jsxs)("section",{className:"right",children:[(0,l.jsx)("img",{src:`${e?.poster+o?.posterImg}`,onError:e=>{e.target.src=`${u}`},alt:"","data-testid":"poster"}),(0,l.jsx)("div",{className:"progress-bar-svg",children:(0,l.jsx)(v.Z,{rating:o?.vote_average,currentSlide:o})})]})]}),n&&(0,l.jsx)(j,{})]})})]})})};var y=a(230);const w=()=>{const{mediaType:e,id:s}=(0,t.useContext)(d),{data:a,loading:r}=(0,i.Z)(`/${e}/${s}/credits`),[n,c]=(0,t.useState)(null);return(0,t.useEffect)((()=>{c(a?.cast?.slice(0,10))}),[a]),(0,l.jsx)(l.Fragment,{children:!(!r&&!n?.length)&&(0,l.jsxs)("div",{className:"cast",children:[n?.length&&(0,l.jsx)("div",{className:"heading",children:(0,l.jsx)("div",{className:"title",children:"Cast"})}),(0,l.jsx)(y.Z,{data:n,type:"cast",isLoading:r})]})})},f=()=>{const{videos:e,videoIsLoading:s}=(0,t.useContext)(d);return(0,l.jsx)(l.Fragment,{children:!(!s&&!e?.length)&&(0,l.jsxs)("div",{className:"trailers",children:[e?.length&&(0,l.jsx)("div",{className:"heading",role:"heading",children:(0,l.jsx)("div",{className:"title",children:"Official Videos"})}),(0,l.jsx)(y.Z,{data:e,type:"trailers",isLoading:s})]})})},Z=()=>{const{mediaType:e,id:s}=(0,t.useContext)(d);let{data:a,loading:r}=(0,i.Z)(`/${e}/${s}/similar`);const n=a?.results?.map((s=>s.hasOwnProperty("media_type")?s:{...s,media_type:e}))?.slice(0,10);return(0,l.jsx)(l.Fragment,{children:!(!r&&!n?.length)&&(0,l.jsxs)("div",{className:"similar",children:[n?.length&&(0,l.jsx)("div",{className:"heading",role:"heading",children:(0,l.jsx)("div",{className:"title",children:`Similar ${"tv"===e?e.toUpperCase()+" Show":e.slice(0,1).toUpperCase()+e.slice(1).toLowerCase()}${a?.results?.length>=2?"s":""}`})}),(0,l.jsx)(y.Z,{data:n,type:"detail",isLoading:r})]})})},b=()=>{const{mediaType:e,id:s}=(0,t.useContext)(d),{data:a,loading:r}=(0,i.Z)(`/${e}/${s}/recommendations`),n=a?.results?.map((s=>s.hasOwnProperty("media_type")?s:{...s,media_type:e}))?.slice(0,10);return(0,l.jsx)(l.Fragment,{children:!(!r&&!n?.length)&&(0,l.jsxs)("div",{className:"recommendations",children:[n?.length&&(0,l.jsx)("div",{className:"heading",role:"heading",children:(0,l.jsxs)("div",{className:"title",children:["Recommended"," ","tv"===e?e.toUpperCase()+" Show":e.slice(0,1).toUpperCase()+e.slice(1).toLowerCase(),a?.results?.length>=2&&"s"]})}),(0,l.jsx)(y.Z,{data:n,type:"detail",isLoading:r})]})})},C=()=>(0,l.jsx)(n,{children:(0,l.jsxs)("div",{className:"details",children:[(0,l.jsx)(N,{}),(0,l.jsxs)("div",{id:"more-details",children:[(0,l.jsx)(w,{}),(0,l.jsx)(f,{}),(0,l.jsx)(Z,{}),(0,l.jsx)(b,{})]})]})})}}]);