import{b as B}from"./chunk-IN3GSI2U.js";import"./chunk-FWA4ZV65.js";import{$a as g,E as p,Eb as E,Fb as P,Hb as T,J as d,Wb as V,Xa as s,Xb as _,Y as l,Ya as b,Za as v,_a as m,aa as r,bb as I,cc as A,db as C,fb as S,ga as e,gb as w,ha as t,ia as n,ka as f,kb as y,qb as N,ra as c,va as h,zb as F}from"./chunk-J4QSXUO7.js";import"./chunk-GCD5ODGY.js";import"./chunk-7N27NNS6.js";import"./chunk-NUA2LQHF.js";import"./chunk-FXHXDGTP.js";import"./chunk-G3CV3VGG.js";import"./chunk-OOOHFHRH.js";import"./chunk-XDG22ATE.js";import"./chunk-H5GYM6DM.js";import"./chunk-4WFVMWDK.js";import"./chunk-52SVZWMH.js";import"./chunk-NMYJD6OP.js";import"./chunk-B43CU5JX.js";import"./chunk-TQEIIVVC.js";import"./chunk-LF5XB4YN.js";import"./chunk-KZZABCGY.js";var L=(()=>{class o{constructor(){this.userApplication=p(B),this.wealth=p(S).group({financialassets:new m("",[s.required]),realestateassets:new m("",[s.required]),otherassets:new m("",[s.required])})}ngOnInit(){let i=this.userApplication.customer();i&&this.wealth.patchValue({financialassets:i.firstName,realestateassets:i.lastName})}submitToSave(){this.wealth.value.realestateassets&&this.wealth.value.financialassets&&console.log(this.wealth.value)}get isValid(){return this.wealth.valid}static{this.\u0275fac=function(a){return new(a||o)}}static{this.\u0275cmp=d({type:o,selectors:[["clovis-wealth"]],standalone:!0,features:[h],decls:16,vars:3,consts:[["collapse","fade"],["text","","slot","start","defaultHref","/home"],[1,"ion-padding","settings",3,"fullscreen"],[3,"submit","formGroup"],["type","number","fill","solid","formControlName","financialassets","label","Patrimoine financier","labelPlacement","floating"],["type","number","fill","solid","formControlName","realestateassets","label","Patrimoine immobilier","labelPlacement","floating"],["type","number","fill","solid","formControlName","otherassets","label","Autres actifs","labelPlacement","floating"],["type","submit","expand","block",1,"clovis",3,"disabled"]],template:function(a,u){a&1&&(e(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),c(3,"Patrimoine"),t(),n(4,"ion-back-button",1),t()(),e(5,"ion-content",2)(6,"form",3),f("submit",function(){return u.submitToSave()}),e(7,"ion-list")(8,"ion-item"),n(9,"ion-input",4),t(),e(10,"ion-item"),n(11,"ion-input",5),t(),e(12,"ion-item"),n(13,"ion-input",6),t()(),e(14,"ion-button",7),c(15,"Valider"),t()()()),a&2&&(l(5),r("fullscreen",!0),l(),r("formGroup",u.wealth),l(8),r("disabled",!u.isValid))},dependencies:[E,_,V,F,y,A,T,P,N,w,g,b,v,I,C]})}}return o})();export{L as WealthComponent};
