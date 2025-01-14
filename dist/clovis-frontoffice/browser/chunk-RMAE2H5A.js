import{b as V}from"./chunk-IN3GSI2U.js";import"./chunk-FWA4ZV65.js";import{$a as b,E as p,Eb as N,Fb as x,Hb as j,J as c,Qb as w,Wb as F,Xb as T,Y as o,Ya as S,Za as v,_a as a,aa as n,bb as y,cc as k,db as C,ec as R,fb as P,ga as e,gb as g,ha as t,ia as r,ka as f,kb as I,qb as h,ra as l,va as d,zb as E}from"./chunk-J4QSXUO7.js";import"./chunk-GCD5ODGY.js";import"./chunk-7N27NNS6.js";import"./chunk-NUA2LQHF.js";import"./chunk-FXHXDGTP.js";import"./chunk-G3CV3VGG.js";import"./chunk-OOOHFHRH.js";import"./chunk-XDG22ATE.js";import"./chunk-H5GYM6DM.js";import"./chunk-4WFVMWDK.js";import"./chunk-52SVZWMH.js";import"./chunk-NMYJD6OP.js";import"./chunk-B43CU5JX.js";import"./chunk-TQEIIVVC.js";import"./chunk-LF5XB4YN.js";import"./chunk-KZZABCGY.js";var H=(()=>{class m{constructor(){this.userApplication=p(V),this.professionalSituation=p(P).group({professionnalStatus:new a(""),job:new a(""),socioProfessionalCategory:new a(""),industrySector:new a(""),isPolitical:new a(!1),anyRelativeIsPolitical:new a(!1)})}ngOnInit(){let s=this.userApplication.customer();if(s&&s.professionalSituation){let i=s.professionalSituation;this.professionalSituation.patchValue({professionnalStatus:i.professionnalStatus,job:i.job,socioProfessionalCategory:i.socioProfessionalCategory,industrySector:i.industrySector,isPolitical:i.isPolitical,anyRelativeIsPolitical:i.anyRelativeIsPolitical})}}submitToSave(){this.userApplication.updateProfessionalSituation(this.professionalSituation.value)}get isValid(){return this.professionalSituation.valid}static{this.\u0275fac=function(i){return new(i||m)}}static{this.\u0275cmp=c({type:m,selectors:[["clovis-professional-situation"]],standalone:!0,features:[d],decls:30,vars:7,consts:[["collapse","fade"],["text","","slot","start","defaultHref","/home"],[1,"ion-padding","settings",3,"fullscreen"],[3,"submit","formGroup"],["fill","solid","label","Situation professionnelle","formControlName","professionnalStatus","labelPlacement","floating"],["fill","solid","formControlName","job","label","Profession","labelPlacement","floating"],["fill","solid","formControlName","socioProfessionalCategory","label","Cat\xE9gorie-socio professionnelle","labelPlacement","floating"],["fill","solid","formControlName","industrySector","label","Secteur d'activit\xE9","labelPlacement","floating"],["justify","start","label","Exercice d'une fonction politique","interface","popover","label-placement","stacked","formControlName","isPolitical","placeholder","Choisir"],[3,"value"],["justify","start","label","Proche exerce une fonction politique","interface","popover","label-placement","stacked","formControlName","anyRelativeIsPolitical","placeholder","Choisir"],["type","submit","expand","block",1,"clovis",3,"disabled"]],template:function(i,u){i&1&&(e(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),l(3,"Situation professionnelle"),t(),r(4,"ion-back-button",1),t()(),e(5,"ion-content",2)(6,"form",3),f("submit",function(){return u.submitToSave()}),e(7,"ion-list")(8,"ion-item"),r(9,"ion-input",4),t(),e(10,"ion-item"),r(11,"ion-input",5),t(),e(12,"ion-item"),r(13,"ion-input",6),t(),e(14,"ion-item"),r(15,"ion-input",7),t(),e(16,"ion-item")(17,"ion-select",8)(18,"ion-select-option",9),l(19,"Oui"),t(),e(20,"ion-select-option",9),l(21,"Non"),t()()(),e(22,"ion-item")(23,"ion-select",10)(24,"ion-select-option",9),l(25,"Oui"),t(),e(26,"ion-select-option",9),l(27,"Non"),t()()()(),e(28,"ion-button",11),l(29,"Valider"),t()()()),i&2&&(o(5),n("fullscreen",!0),o(),n("formGroup",u.professionalSituation),o(12),n("value",!0),o(2),n("value",!1),o(4),n("value",!0),o(2),n("value",!1),o(2),n("disabled",!u.isValid))},dependencies:[N,T,F,E,I,k,j,x,h,g,b,S,v,y,C,R,w]})}}return m})();export{H as ProfessionalSituationComponent};
