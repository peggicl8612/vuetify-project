import{_,u as y,G as S,a as U,av as $,aw as z,ax as B,ay as C,K as m,r as D,o as M,b as T,w as l,d as a,ai as v,aj as d,E as j,z as I,az as N,aA as R,j as s,ak as c,e as P,f as q,V as E,C as b,I as G}from"./index-dC918I1j.js";const g={__name:"memberData",setup(K){const{t:p}=y(),f=S(),{apiAuth:x}=G(),r=U(),w=$({phone:z().matches(/^[0-9]{10}$/,"請輸入正確的手機號碼").required("此欄位為必填")}),{handleSubmit:h,isSubmitting:A}=B({validationSchema:w,initialValues:{phone:r.phone}}),i=C("phone"),F=m(null),n=m([]),V=m([]),k=h(async u=>{var e;if(!((e=n.value[0])!=null&&e.error)){n.value.length>0&&new FormData().append("photo",n.value[0].file);try{const t=new FormData;t.append("phone",u.phone),n.value.length>0&&t.append("image",n.value[0].file),console.log(t),await x.patch("/user/"+r.id,t),f({text:p("save.success"),snackbarProps:{color:"rgb(117, 117, 117)"}})}catch(t){console.error("保存資料失敗:",t),f({text:p("save.failed"),snackbarProps:{color:"rgb(117, 117, 117)"}})}}});return(u,e)=>{const t=D("VueFileAgent");return M(),T(E,{class:"container"},{default:l(()=>[a(v,null,{default:l(()=>[a(d,{cols:"12",class:"text-center"},{default:l(()=>[e[5]||(e[5]=j("h1",{class:"title"},"會員資料",-1)),a(I,{class:"text-left ml-3"})]),_:1})]),_:1}),a(N,{class:"form-box",onSubmit:R(s(k),["prevent"])},{default:l(()=>[a(v,null,{default:l(()=>[a(d,{cols:"12",md:"8"},{default:l(()=>[a(c,{modelValue:s(r).account,"onUpdate:modelValue":e[0]||(e[0]=o=>s(r).account=o),label:"使用者帳號",outlined:"",disabled:"",class:"rounded"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12",md:"8"},{default:l(()=>[a(c,{modelValue:s(r).email,"onUpdate:modelValue":e[1]||(e[1]=o=>s(r).email=o),label:"電子郵件",outlined:"",disabled:"",class:"rounded"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12",md:"6"},{default:l(()=>[a(c,{modelValue:s(i).value.value,"onUpdate:modelValue":e[2]||(e[2]=o=>s(i).value.value=o),label:"電話","error-messages":s(i).errorMessage.value,outlined:"",class:"rounded"},null,8,["modelValue","error-messages"])]),_:1}),a(t,{ref_key:"fileAgent",ref:F,modelValue:n.value,"onUpdate:modelValue":e[3]||(e[3]=o=>n.value=o),"raw-model-value":V.value,"onUpdate:rawModelValue":e[4]||(e[4]=o=>V.value=o),accept:"image/jpeg,image/png",deletable:"","max-size":"1MB","help-text":u.$t("fileAgent.helpText"),"error-text":{type:u.$t("fileAgent.errorType"),size:u.$t("fileAgent.errorSize")}},null,8,["modelValue","raw-model-value","help-text","error-text"]),a(d,{cols:"12",class:"text-center"},{default:l(()=>[a(P,{type:"submit",color:"pink",class:"cute-btn",loading:s(A)},{default:l(()=>e[6]||(e[6]=[q("💾 保存")])),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})}}};typeof b=="function"&&b(g);const J=_(g,[["__scopeId","data-v-7dcc6a66"]]);export{J as default};
