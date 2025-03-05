import{_,u as E,G as M,H as R,K as y,aq as B,ar as d,aZ as F,as as N,at as m,o as U,b as j,w as n,d as o,ai as D,aj as L,an as z,ao as G,f as w,t as C,z as H,au as K,j as e,av as O,ak as c,E as Z,e as J,p as Q,V as W,C as h,I as X}from"./index-Czh_FvLS.js";import{v as x}from"./index-O3nsvjfK.js";const Y={class:"text-center mt-2"},k={__name:"register",setup(ee){const{t:s}=E(),{api:P}=X(),V=M(),S=R(),l=y(!1),i=y(!1),$=()=>{l.value=!l.value},q=()=>{i.value=!i.value},I=B({account:d().required(s("api.userAccountRequired")).min(4,s("api.userAccountTooShort")).max(15,s("api.userAccountTooLong")).test("isAlphanumeric",s("api.userAccountInvalid"),a=>x.isAlphanumeric(a)),email:d().required(s("api.userEmailRequired")).test("isEmail",s("api.userEmailInvalid"),a=>x.isEmail(a)),password:d().required(s("api.userPasswordRequired")).min(4,s("api.userPasswordTooShort")).max(15,s("api.userPasswordTooLong")),passwordConfirm:d().required(s("api.userPasswordConfirm")).oneOf([F("password")],s("api.userPasswordNotMatch"))}),{handleSubmit:A,isSubmitting:b}=N({validationSchema:I}),p=m("account"),g=m("email"),f=m("password"),v=m("passwordConfirm"),T=A(async a=>{var r,t;try{await P.post("/user",{account:a.account,email:a.email,password:a.password}),V({text:s("register.success"),snackbarProps:{color:"rgb(117, 117, 117)"}}),S.push("/login")}catch(u){console.log(u),V({text:s("api."+(((t=(r=u==null?void 0:u.response)==null?void 0:r.data)==null?void 0:t.message)||"unknownError")),snackbarProps:{color:"rgb(212, 135, 141)"}})}});return(a,r)=>(U(),j(W,{class:"register-container"},{default:n(()=>[o(D,{justify:"center"},{default:n(()=>[o(L,{cols:"8",md:"10",lg:"8"},{default:n(()=>[o(z,{class:"pa-5 form-card"},{default:n(()=>[o(G,{class:"text-center text-h4 register"},{default:n(()=>[w(C(a.$t("nav.register")),1)]),_:1}),o(H,{class:"my-3"}),o(K,{disabled:e(b),onSubmit:O(e(T),["prevent"])},{default:n(()=>[o(c,{modelValue:e(p).value.value,"onUpdate:modelValue":r[0]||(r[0]=t=>e(p).value.value=t),"error-messages":e(p).errorMessage.value,label:a.$t("user.account"),"prepend-inner-icon":"mdi-account",minlength:"4",maxlength:"15",counter:""},null,8,["modelValue","error-messages","label"]),o(c,{modelValue:e(g).value.value,"onUpdate:modelValue":r[1]||(r[1]=t=>e(g).value.value=t),"error-messages":e(g).errorMessage.value,label:a.$t("user.email"),"prepend-inner-icon":"mdi-email"},null,8,["modelValue","error-messages","label"]),o(c,{modelValue:e(f).value.value,"onUpdate:modelValue":r[2]||(r[2]=t=>e(f).value.value=t),type:l.value?"text":"password","error-messages":e(f).errorMessage.value,label:a.$t("user.password"),"prepend-inner-icon":"mdi-lock","append-inner-icon":l.value?"mdi-eye-off":"mdi-eye",minlength:"4",maxlength:"15",counter:"",class:"input-field","onClick:appendInner":$},null,8,["modelValue","type","error-messages","label","append-inner-icon"]),o(c,{modelValue:e(v).value.value,"onUpdate:modelValue":r[3]||(r[3]=t=>e(v).value.value=t),type:i.value?"text":"password","error-messages":e(v).errorMessage.value,label:a.$t("user.passwordConfirm"),"prepend-inner-icon":"mdi-check","append-inner-icon":i.value?"mdi-eye-off":"mdi-eye",minlength:"4",maxlength:"15",counter:"","onClick:appendInner":q},null,8,["modelValue","type","error-messages","label","append-inner-icon"]),Z("div",Y,[o(J,{loading:e(b),type:"submit",color:"#a49393"},{default:n(()=>[o(Q,null,{default:n(()=>r[4]||(r[4]=[w("mdi-account-plus")])),_:1}),w(" "+C(a.$t("register.submit")),1)]),_:1},8,["loading"])])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1})]),_:1}))}};typeof h=="function"&&h(k);const re=_(k,[["__scopeId","data-v-a9a78d44"]]);export{re as default};
