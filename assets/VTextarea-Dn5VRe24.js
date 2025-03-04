import{J as p,aF as ee,aG as te,S as ae,aH as ne,T as le,aI as oe,c as y,K as v,L as ue,a0 as ie,O as re,N as x,P as se,Z as ce,aJ as de,aK as G,aL as fe,d as l,aM as ve,D as k,F as S,ag as _,aN as xe,aO as me,aP as ge,aQ as he,aR as b,aS as we,aT as Ve,M as ye}from"./index-BMmdH_M1.js";const Fe=p({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...ee(),...te()},"VTextarea"),Ce=ae()({name:"VTextarea",directives:{Intersect:ne},inheritAttrs:!1,props:Fe(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,D){let{attrs:F,emit:M,slots:i}=D;const o=le(e,"modelValue"),{isFocused:f,focus:E,blur:O}=oe(e),U=y(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value||"").toString().length),J=y(()=>{if(F.maxlength)return F.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function K(t,n){var a,u;!e.autofocus||!t||(u=(a=n[0].target)==null?void 0:a.focus)==null||u.call(a)}const N=v(),m=v(),H=ue(""),g=v(),L=y(()=>e.persistentPlaceholder||f.value||e.active);function P(){var t;g.value!==document.activeElement&&((t=g.value)==null||t.focus()),f.value||E()}function $(t){P(),M("click:control",t)}function j(t){M("mousedown:control",t)}function Q(t){t.stopPropagation(),P(),b(()=>{o.value="",we(e["onClick:clear"],t)})}function Z(t){var a;const n=t.target;if(o.value=n.value,(a=e.modelModifiers)!=null&&a.trim){const u=[n.selectionStart,n.selectionEnd];b(()=>{n.selectionStart=u[0],n.selectionEnd=u[1]})}}const c=v(),h=v(+e.rows),C=y(()=>["plain","underlined"].includes(e.variant));ie(()=>{e.autoGrow||(h.value=+e.rows)});function d(){e.autoGrow&&b(()=>{if(!c.value||!m.value)return;const t=getComputedStyle(c.value),n=getComputedStyle(m.value.$el),a=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),u=c.value.scrollHeight,w=parseFloat(t.lineHeight),I=Math.max(parseFloat(e.rows)*w+a,parseFloat(n.getPropertyValue("--v-input-control-height"))),R=parseFloat(e.maxRows)*w+a||1/0,s=ye(u??0,I,R);h.value=Math.floor((s-a)/w),H.value=Ve(s)})}re(d),x(o,d),x(()=>e.rows,d),x(()=>e.maxRows,d),x(()=>e.density,d);let r;return x(c,t=>{t?(r=new ResizeObserver(d),r.observe(c.value)):r==null||r.disconnect()}),se(()=>{r==null||r.disconnect()}),ce(()=>{const t=!!(i.counter||e.counter||e.counterValue),n=!!(t||i.details),[a,u]=de(F),{modelValue:w,...I}=G.filterProps(e),R=fe(e);return l(G,k({ref:N,modelValue:o.value,"onUpdate:modelValue":s=>o.value=s,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-input--plain-underlined":C.value},e.class],style:e.style},a,I,{centerAffix:h.value===1&&!C.value,focused:f.value}),{...i,default:s=>{let{id:V,isDisabled:T,isDirty:B,isReadonly:q,isValid:W}=s;return l(ve,k({ref:m,style:{"--v-textarea-control-height":H.value},onClick:$,onMousedown:j,"onClick:clear":Q,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},R,{id:V.value,active:L.value||B.value,centerAffix:h.value===1&&!C.value,dirty:B.value||e.dirty,disabled:T.value,focused:f.value,error:W.value===!1}),{...i,default:X=>{let{props:{class:z,...A}}=X;return l(S,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[e.prefix]),_(l("textarea",k({ref:g,class:z,value:o.value,onInput:Z,autofocus:e.autofocus,readonly:q.value,disabled:T.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:P,onBlur:O},A,u),null),[[xe("intersect"),{handler:K},null,{once:!0}]]),e.autoGrow&&_(l("textarea",{class:[z,"v-textarea__sizer"],id:`${A.id}-sizer`,"onUpdate:modelValue":Y=>o.value=Y,ref:c,readonly:!0,"aria-hidden":"true"},null),[[me,o.value]]),e.suffix&&l("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:n?s=>{var V;return l(S,null,[(V=i.details)==null?void 0:V.call(i,s),t&&l(S,null,[l("span",null,null),l(ge,{active:e.persistentCounter||f.value,value:U.value,max:J.value,disabled:e.disabled},i.counter)])])}:void 0})}),he({},N,m,g)}});export{Ce as V};
