import{b as x}from"./chunk-IN3GSI2U.js";import"./chunk-FWA4ZV65.js";import{$a as C,E as c,Eb as F,Fb as T,Hb as A,J as d,Wb as V,Xa as o,Xb as _,Y as m,Ya as g,Za as v,_a as l,aa as s,bb as I,cc as q,db as S,fb as h,ga as e,gb as y,ha as t,ia as i,ka as b,kb as N,qb as E,ra as p,va as f,zb as w}from"./chunk-J4QSXUO7.js";import"./chunk-GCD5ODGY.js";import"./chunk-7N27NNS6.js";import"./chunk-NUA2LQHF.js";import"./chunk-FXHXDGTP.js";import"./chunk-G3CV3VGG.js";import"./chunk-OOOHFHRH.js";import"./chunk-XDG22ATE.js";import"./chunk-H5GYM6DM.js";import"./chunk-4WFVMWDK.js";import"./chunk-52SVZWMH.js";import"./chunk-NMYJD6OP.js";import"./chunk-B43CU5JX.js";import"./chunk-TQEIIVVC.js";import"./chunk-LF5XB4YN.js";import"./chunk-KZZABCGY.js";var L=(()=>{class r{constructor(){this.userApplication=c(x),this.abilities=c(h).group({remainingincome:new l("",[o.required]),currentsavings:new l("",[o.required]),borrowingcapacity:new l("",[o.required]),debttoincomeratio:new l("",[o.required])})}ngOnInit(){let n=this.userApplication.customer();n&&this.abilities.patchValue({remainingincome:n.firstName,currentsavings:n.lastName})}submitToSave(){this.abilities.value.currentsavings&&this.abilities.value.debttoincomeratio&&console.log(this.abilities.value)}get isValid(){return this.abilities.valid}static{this.\u0275fac=function(a){return new(a||r)}}static{this.\u0275cmp=d({type:r,selectors:[["clovis-abilities"]],standalone:!0,features:[f],decls:18,vars:3,consts:[["collapse","fade"],["text","","slot","start","defaultHref","/home"],[1,"ion-padding","settings",3,"fullscreen"],[3,"submit","formGroup"],["type","number","fill","solid","formControlName","remainingincome","label","Reste \xE0 vivre","labelPlacement","floating"],["type","number","fill","solid","formControlName","currentsavings","label","\xC9pargne actuelle","labelPlacement","floating"],["type","number","fill","solid","formControlName","borrowingcapacity","label","Capacit\xE9 d'emprunt","labelPlacement","floating"],["type","number","fill","solid","formControlName","debttoincomeratio","label","Taux d'endettement","labelPlacement","floating"],["type","submit","expand","block",1,"clovis",3,"disabled"]],template:function(a,u){a&1&&(e(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),p(3,"Capacit\xE9s"),t(),i(4,"ion-back-button",1),t()(),e(5,"ion-content",2)(6,"form",3),b("submit",function(){return u.submitToSave()}),e(7,"ion-list")(8,"ion-item"),i(9,"ion-input",4),t(),e(10,"ion-item"),i(11,"ion-input",5),t(),e(12,"ion-item"),i(13,"ion-input",6),t(),e(14,"ion-item"),i(15,"ion-input",7),t()(),e(16,"ion-button",8),p(17,"Valider"),t()()()),a&2&&(m(5),s("fullscreen",!0),m(),s("formGroup",u.abilities),m(10),s("disabled",!u.isValid))},dependencies:[F,_,V,w,N,q,A,T,E,y,C,g,v,I,S]})}}return r})();export{L as AbilitiesComponent};