import{_ as B,u as D,a as F,c as I,r as S,o as a,b as f,w as t,d as e,V as b,e as c,f as l,g as N,h as V,i as C,F as y,j as _,t as g,k,l as v,n as M,m as P,p as x,q as p,s as i,v as q,x as J,y as r,z as j,A as E,B as R,C as $,D as w}from"./index-BMmdH_M1.js";import{V as U,a as G}from"./VBadge-M-bxagUp.js";const A={__name:"account",setup(H){const{t:m}=D(),d=F(),T=I(()=>[{to:"/home",text:m("nav.home"),icon:"mdi-home",show:!0},{to:"null",text:m("nav.about"),show:!1,isAbout:!0},{to:"null",text:m("nav.info"),show:!1,isInfo:!0},{to:"null",text:m("nav.adopt"),show:d.isLoggedIn,isAdopt:!0},{to:"/account",text:m("nav.account"),icon:"mdi-account",show:!0},{to:"/register",text:m("nav.register"),icon:"mdi-account-plus",show:!d.isLoggedIn},{to:"/login",text:m("nav.login"),icon:"mdi-account-arrow-left",show:!d.isLoggedIn},{to:"/admin",text:m("nav.admin"),icon:"mdi-cog",show:d.isLoggedIn&&d.isAdmin}]),L=I(()=>[{text:"會員資料",icon:"mdi-account",to:"/account/memberData"},{text:"收藏列表",icon:"mdi-heart",to:"/account/favorites"},{text:"送養列表",icon:"mdi-note",to:"/account/rehomeForm"},{text:"首頁",icon:"mdi-home",to:"/home"}]);return(s,o)=>{const z=S("router-view");return a(),f(b,{fluid:""},{default:t(()=>[e(U,{style:{backgroundColor:"#D4878D",color:"white",fontSize:"36px",fontFamily:"Junge"}},{default:t(()=>[e(b,{class:"d-flex align-center"},{default:t(()=>[e(c,{to:"/home",active:!1,style:{fontSize:"28px",fontFamily:"Junge"}},{default:t(()=>o[8]||(o[8]=[l(" 咪凹屋 ")])),_:1}),e(N),(a(!0),V(y,null,C(T.value,n=>(a(),V(y,{key:n.to},[!n.isMenu&&n.show&&!n.isAbout&&!n.isInfo&&!n.isAdopt?(a(),f(c,{key:0,to:n.to,"prepend-icon":n.icon},{default:t(()=>[l(g(n.text)+" ",1),n.to==="/cart"?(a(),f(G,{key:0,content:_(d).cart,floating:"",color:"red"},null,8,["content"])):k("",!0)]),_:2},1032,["to","prepend-icon"])):k("",!0),n.isAbout?(a(),f(v,{key:1,"offset-y":"","close-on-content-click":!0},{activator:t(({props:u})=>[e(c,w({ref_for:!0},u),{default:t(()=>[e(x,{icon:"mdi-information-box-outline"}),l(" "+g(n.text),1)]),_:2},1040)]),default:t(()=>[e(p,null,{default:t(()=>[e(i,{onClick:o[0]||(o[0]=u=>s.goTo("about-us"))},{default:t(()=>[e(r,null,{default:t(()=>o[9]||(o[9]=[l("關於我們")])),_:1})]),_:1}),e(i,{onClick:o[1]||(o[1]=u=>s.goTo("faq"))},{default:t(()=>[e(r,null,{default:t(()=>o[10]||(o[10]=[l("常見問答")])),_:1})]),_:1})]),_:1})]),_:2},1024)):k("",!0),n.isInfo?(a(),f(v,{key:2,"offset-y":"","close-on-content-click":!0},{activator:t(({props:u})=>[e(c,w({ref_for:!0},u),{default:t(()=>[e(x,{icon:"mdi-note-search-outline"}),l(" "+g(n.text),1)]),_:2},1040)]),default:t(()=>[e(p,null,{default:t(()=>[e(i,{link:""},{append:t(()=>[e(x,{icon:"mdi-menu-right",size:"x-small"})]),default:t(()=>[e(r,null,{default:t(()=>o[11]||(o[11]=[l("飲食知識")])),_:1}),e(v,{"open-on-focus":!1,activator:"parent","open-on-hover":"",submenu:""},{default:t(()=>[e(p,null,{default:t(()=>[e(i,{onClick:o[2]||(o[2]=u=>s.goTo("kitten"))},{default:t(()=>[e(r,null,{default:t(()=>o[12]||(o[12]=[l("幼貓飼養")])),_:1})]),_:1}),e(i,{onClick:o[3]||(o[3]=u=>s.goTo("adult"))},{default:t(()=>[e(r,null,{default:t(()=>o[13]||(o[13]=[l("成貓飼養")])),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(i,{link:"",onClick:o[4]||(o[4]=u=>s.goTo("disease"))},{default:t(()=>[e(r,null,{default:t(()=>o[14]||(o[14]=[l("疾病資訊")])),_:1})]),_:1})]),_:1})]),_:2},1024)):k("",!0),n.isAdopt?(a(),f(v,{key:3,"offset-y":"","close-on-content-click":!0},{activator:t(({props:u})=>[e(c,w({ref_for:!0},u),{default:t(()=>[e(x,{icon:"mdi-home-heart"}),l(" "+g(n.text),1)]),_:2},1040)]),default:t(()=>[e(p,null,{default:t(()=>[e(i,{link:""},{append:t(()=>[e(x,{icon:"mdi-menu-right",size:"x-small"})]),default:t(()=>[e(r,null,{default:t(()=>o[15]||(o[15]=[l("領養專區")])),_:1}),e(v,{"open-on-focus":!1,activator:"parent","open-on-hover":"",submenu:""},{default:t(()=>[e(p,null,{default:t(()=>[e(i,{onClick:o[5]||(o[5]=u=>s.goTo("adopting"))},{default:t(()=>[e(r,null,{default:t(()=>o[16]||(o[16]=[l("待領養專區")])),_:1})]),_:1}),e(i,{onClick:o[6]||(o[6]=u=>s.goTo("agree"))},{default:t(()=>[e(r,null,{default:t(()=>o[17]||(o[17]=[l("下載同意書")])),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(i,{onClick:o[7]||(o[7]=u=>s.goTo("rehome"))},{default:t(()=>[e(r,null,{default:t(()=>o[18]||(o[18]=[l("送養專區")])),_:1})]),_:1})]),_:1})]),_:2},1024)):k("",!0)],64))),128)),_(d).isLoggedIn?(a(),f(c,{key:0,"prepend-icon":"mdi-account-arrow-right",onClick:s.logout},{default:t(()=>[l(g(s.$t("nav.logout")),1)]),_:1},8,["onClick"])):k("",!0),e(v,null,{activator:t(({props:n})=>[e(c,M(P(n)),{default:t(()=>[e(x,{icon:"mdi-translate"})]),_:2},1040)]),default:t(()=>[e(p,null,{default:t(()=>[(a(!0),V(y,null,C(s.langs,n=>(a(),f(i,{key:n.value,onClick:u=>s.$i18n.locale=n.value},{default:t(()=>[l(g(n.text),1)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})]),_:1})]),_:1}),e(E,{permanent:"",class:"drawer"},{default:t(()=>[e(p,null,{default:t(()=>[e(i,{class:"d-flex flex-column align-center"},{default:t(()=>[e(q,{size:"100"},{default:t(()=>[e(J,{class:"image",src:_(d).image},null,8,["src"])]),_:1}),e(r,{class:"account-title"},{default:t(()=>[l(g(_(d).account),1)]),_:1})]),_:1})]),_:1}),e(j),e(p,null,{default:t(()=>[(a(!0),V(y,null,C(L.value,n=>(a(),f(i,{key:n.to,"prepend-icon":n.icon,title:n.text,to:n.to},null,8,["prepend-icon","title","to"]))),128))]),_:1})]),_:1}),e(R,null,{default:t(()=>[e(z)]),_:1})]),_:1})}}};typeof $=="function"&&$(A);const Q=B(A,[["__scopeId","data-v-b93f804c"]]);export{Q as default};
