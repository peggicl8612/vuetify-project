import{R as y,ad as V,G as h,c as g,Y as n,$ as v,X as s,L as o,aw as d,ai as l,W as u,_ as b,O as w,am as x}from"./index-CAGvYAAm.js";import{V as p,a as A,b as m}from"./route-block-Bac2utIF.js";import{V as D}from"./VDivider-DmAa7viA.js";import{V as B}from"./VDataTable-BU6C8Chi.js";import{V as O}from"./VContainer-BayWPqO1.js";import"./VPagination-DJ1FWsNz.js";import"./VList-BKogflBu.js";import"./VMenu-tAHJtBh4.js";const C={class:"text-center"},L={__name:"orders",setup(S){const{apiAuth:_}=x(),{t:a}=y(),f=V(),i=h([]),k=g(()=>[{title:"ID",key:"_id"},{title:a("order.account"),key:"user.account"},{title:a("order.createdAt"),key:"createdAt",value:t=>new Date(t.createdAt).toLocaleString()},{title:a("order.cart"),key:"cart",sortable:!1},{title:a("order.price"),key:"price",value:t=>t.cart.reduce((r,e)=>r+e.product.price*e.quantity,0)}]);return(async()=>{var t,r;try{const{data:e}=await _.get("/order/all");i.value=e.result}catch(e){console.log(e),f({text:a("api."+(((r=(t=e==null?void 0:e.response)==null?void 0:t.data)==null?void 0:r.message)||"unknownError")),snackbarProps:{color:"red"}})}})(),(t,r)=>(n(),v(O,null,{default:s(()=>[o(A,null,{default:s(()=>[o(p,{cols:"12"},{default:s(()=>[d("h1",C,l(t.$t("nav.adminOrders")),1)]),_:1}),o(D),o(p,{cols:"12"},{default:s(()=>[o(B,{items:i.value,headers:k.value},{"item.cart":s(e=>[d("ul",null,[(n(!0),u(w,null,b(e.item.cart,c=>(n(),u("li",{key:c._id},l(c.product.name)+" x "+l(c.quantity),1))),128))])]),_:2},1032,["items","headers"])]),_:1})]),_:1})]),_:1}))}};typeof m=="function"&&m(L);export{L as default};
