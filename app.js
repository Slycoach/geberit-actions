(function(){
const PAGES=[["index","Accueil"],["priorites","Priorités"],["axes","Axes"],["actions","Actions"],["calendrier","Calendrier"],["gouvernance","Gouvernance"],["pilotage","Pilotage et KPI"]];
const NW=31, BASE=new Date(2026,10,30);
const MOIS=["janv.","févr.","mars","avril","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
const wDate=(w,d=1)=>{const x=new Date(BASE);x.setDate(x.getDate()+w*7+d);return x};
const fmt=x=>x.getDate()+" "+MOIS[x.getMonth()];
const axe=id=>AXES.find(a=>a.id===id);
const axCol=a=>a.c==="#21DEB2"?"#0B7F69":a.c==="#9599BD"?"#464A6B":a.c;
const QUADS=[
 {id:"amorce",t:"Amorces",q:"Rapide et stratégique",d:"À lancer en premier : elles produisent vite et touchent les signaux faibles.",f:a=>a.R>=3&&a.S>=4},
 {id:"fond",t:"Chantiers de fond",q:"Stratégique mais long",d:"À démarrer tôt pour qu'ils produisent avant la remesure de juin.",f:a=>a.R<3&&a.S>=4},
 {id:"rapide",t:"Gains rapides",q:"Rapide, moins stratégique",d:"Faciles à faire en appui des amorces.",f:a=>a.R>=3&&a.S<4},
 {id:"differer",t:"À différer",q:"Ni rapide ni décisif aujourd'hui",d:"À reconsidérer après la remesure de juin.",f:a=>a.R<3&&a.S<4}
];
const quadOf=a=>QUADS.find(q=>q.f(a));

// state
const KEY="geberit-plan-v3";
let st=null;
try{st=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!st||!st.sel){st={sel:{},start:{},inst:{strat:1,copil:1,rkpi:1,remes:1},filter:"all"};ACT.filter(QUADS[0].f).forEach(a=>st.sel[a.id]=1)}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const startOf=a=>st.start[a.id]!=null?st.start[a.id]:a.s;
const endOf=a=>Math.min(NW,startOf(a)+a.w);
const chosen=()=>ACT.filter(a=>st.sel[a.id]);
const loadW=w=>chosen().filter(a=>startOf(a)<=w&&w<endOf(a)).length;

const page=document.body.dataset.page;
const icon='<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>';

function header(){
 return `<header class="head"><div class="wrap"><div class="brand">GEBERIT · <span>PLAN D'AUTORITÉ</span></div><nav class="menu" aria-label="Menu">${PAGES.map(([id,l])=>`<a href="${id}.html" class="${id===page?"on":""}">${l}</a>`).join("")}</nav><div class="tools"><button class="btn ghost" data-print>${icon}PDF de la page</button><a class="btn" href="complet.html?print=1">${icon}PDF complet</a></div></div></header>`;
}
function footer(){return `<footer><div class="wrap"><span>Geberit · Plan d'autorité · novembre 2026</span><span>authority-builders.fr</span></div></footer>`}
function ptitle(lab,h,sub,extra=""){return `<div class="printhead"><span>Geberit · Plan d'autorité</span><span>${lab}</span></div><div class="ptitle"><span class="lab">${lab}</span><h1 style="margin-top:6px">${h}</h1>${sub?`<p class="sub">${sub}</p>`:""}${extra}</div>`}
const counter=()=>`<div class="counter noprint"><b>${chosen().length}</b> actions retenues sur 25</div>`;

/* ACCUEIL */
function pAccueil(){
 const items=[["priorites","Priorités","Par où commencer : les actions classées selon deux questions simples."],["axes","Axes","Les cinq axes stratégiques, chacun justifié en six questions."],["actions","Actions","Les vingt cinq actions, pourquoi et comment, à cocher."],["calendrier","Calendrier","Le planning de décembre à juin, construit avec vos choix."],["gouvernance","Gouvernance","Les quatre instances qui décident, pilotent et mesurent."],["pilotage","Pilotage et KPI","Les indicateurs de réalisation et d'effet."]];
 return ptitle("Accueil","Geberit · <em>plan d'autorité</em>","Faire confirmer par d'autres ce que Geberit dit déjà très bien. Décembre 2026 à juin 2027.",counter())+
 `<div class="grid g3 mt"><div class="card"><span class="lab">Point de départ · septembre 2026</span><div style="display:flex;gap:18px;align-items:center;margin-top:14px"><div class="ring"><svg width="150" height="150" viewBox="0 0 150 150"><circle cx="75" cy="75" r="63" stroke="#E9E6FA" stroke-width="12" fill="none"/><circle id="arc" cx="75" cy="75" r="63" stroke="#6A5AE0" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="395.8" stroke-dashoffset="186"/></svg><div class="val"><span class="num" id="score">53</span><span>/ 100</span></div></div><p style="font-size:14px"><b>Établie.</b> En tête sur six territoires, mais confirmée par ses seules pages.</p></div></div>
 <div class="card nuit"><span class="lab m">Le constat</span><p class="num" style="font-size:52px;margin-top:14px">51 %</p><p style="color:rgba(255,255,255,.85);font-size:14px;margin-top:8px">des citations viennent du site de Geberit. Presse, institutionnel et emploi réunis : <b>0,9 %</b>.</p></div>
 <div class="card fort"><span class="lab" style="color:#fff;opacity:.85">Le cap</span><p style="font-size:20px;font-weight:600;line-height:1.4;margin-top:14px">Donner un visage et une preuve, les faire circuler, puis les faire confirmer par des tiers.</p></div></div>
 <h2 class="mt2">Le plan en <em>six pages</em></h2>
 <div class="grid g3 mt">${items.map((x,i)=>`<a class="card mcard" href="${x[0]}.html"><span class="n">${i+1}</span><h3>${x[1]}</h3><p class="muted" style="font-size:14px">${x[2]}</p></a>`).join("")}</div>
 <div class="card mp mt noprint" style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap"><div><h3>Télécharger le plan</h3><p class="muted" style="font-size:14px">Le PDF complet reprend vos choix actuels. La version de référence part de la sélection recommandée.</p></div><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="complet.html?print=1">${icon}PDF avec vos choix</a><a class="btn ghost" href="pdf/geberit-plan-autorite.pdf" download>${icon}Version de référence</a></div></div>`;
}

/* PRIORITES */
function pPriorites(){
 return ptitle("Priorités","Par où <em>commencer</em> ?","Chaque action est classée selon deux questions : est elle rapide à mettre en place ? Est elle stratégique pour les signaux faibles du diagnostic ? Cochez celles que vous retenez.",counter())+
 `<div class="noprint" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><button class="btn" data-amorces>Retenir les amorces seulement</button><button class="btn ghost" data-none>Tout décocher</button></div>
 <div class="grid g2 mt">${QUADS.map(q=>{const l=ACT.filter(q.f);return `<div class="card quad ${q.id==="amorce"?"amorce":""}"><div class="qtop"><h2 style="font-size:20px">${q.t}</h2><span class="tag2">${q.q}</span></div><p class="muted" style="font-size:14px">${q.d}</p>${l.map(a=>{const ax=axe(a.a),on=!!st.sel[a.id];return `<label class="pick ${on?"on":""}"><input type="checkbox" data-id="${a.id}" ${on?"checked":""}><span><span class="t">${a.t}</span><br><span class="s"><span class="dot" style="background:${ax.c}"></span>Axe ${ax.id} · ${a.p}</span></span></label>`}).join("")}</div>`}).join("")}</div>
 <div class="axes-legend">${AXES.map(a=>`<span><span class="dot" style="background:${a.c}"></span>Axe ${a.id} · ${a.t}</span>`).join("")}</div>`;
}

/* AXES */
function axeBlock(ax){
 const Q=[["Pourquoi ?",ax.why],["Pour quoi ?",ax.forwhat],["Comment ?",ax.how],["Avec qui ?",ax.who]];
 return `<section class="card axesec ${ax.id===1?"first":""}" id="axe-${ax.id}"><div class="axehd"><div class="l"><span class="axen" style="background:${ax.c};color:${ax.tx}">${ax.id}</span><div><span class="lab">Axe ${ax.id}</span><h2>${ax.t}</h2></div></div><div class="kfig"><p class="num" style="color:${axCol(ax)}">${ax.v}</p><p class="muted" style="font-size:12px;max-width:240px">${ax.sig} : ${ax.k}</p></div></div>
 <p class="intro">${ax.intro}</p>
 <div class="q6">${Q.map(q=>`<div class="qb"><p class="qq">${q[0]}</p><p>${q[1]}</p></div>`).join("")}<div class="qb imp"><p class="qq">Quel impact ?</p><p>${ax.impact}</p></div><div class="qb"><p class="qq">Les cinq actions</p><ol class="alist">${ACT.filter(a=>a.a===ax.id).map(a=>`<li>${a.t}${st.sel[a.id]?" <b style=\"color:var(--violet)\">· retenue</b>":""}</li>`).join("")}</ol></div><div class="qb plus"><p class="qq">En plus · point de vigilance</p><p>${ax.risk}</p></div><div class="qb plus"><p class="qq">En plus · premier signe de réussite</p><p>${ax.first}</p></div></div></section>`;
}
function pAxes(){
 return ptitle("Axes","Cinq axes, <em>chacun justifié</em>","Chaque axe répond à six questions : introduction, pourquoi, pour quoi, comment, avec qui, quel impact. Deux repères complètent : le point de vigilance et le premier signe de réussite.")+
 `<div class="axenav noprint">${AXES.map(a=>`<a href="#axe-${a.id}"><span class="dot" style="background:${a.c}"></span>${a.id} · ${a.t}</a>`).join("")}</div>`+AXES.map(axeBlock).join("");
}

/* ACTIONS */
function actionCard(a,hideUnsel){
 const on=!!st.sel[a.id],s=startOf(a),q=quadOf(a);
 return `<div class="card acard ${on?"on":""} ${hideUnsel&&!on?"hidden":""}"><input type="checkbox" data-id="${a.id}" ${on?"checked":""} aria-label="Retenir ${a.t}"><div><p class="at">${a.id} · ${a.t}</p><p class="meta">${a.p} · ${a.w} semaines</p><div class="tags"><span class="tag ${q.id==="amorce"?"g":q.id==="differer"?"n":""}">${q.t}</span>${a.sig.map(x=>`<span class="tag n">${x}</span>`).join("")}</div>
 <div class="rows"><span class="k">Pourquoi</span><span class="v">${a.j}</span><span class="k">Comment</span><span class="v">${a.h}</span><span class="k">Pour qui</span><span class="v">Personas : ${a.per}. Territoires : ${a.ter}.</span><span class="k">Preuve</span><span class="v">${a.kpi}</span></div></div>
 <div class="side"><label for="st-${a.id}">Démarrage</label><select id="st-${a.id}" data-start="${a.id}" ${on?"":"disabled"}>${STARTS.map(([w,l])=>`<option value="${w}" ${w===s?"selected":""}>${l}</option>`).join("")}${STARTS.some(x=>x[0]===s)?"":`<option value="${s}" selected>${fmt(wDate(s))}</option>`}</select><span class="end">${on?"Fin le "+fmt(wDate(endOf(a),-3)):"Non retenue"}</span></div></div>`;
}
function pActions(){
 const f=st.filter||"all";
 return ptitle("Actions","Vingt cinq actions, <em>pourquoi et comment</em>","Pour chaque action : la raison tirée du diagnostic, la façon de la mener, la preuve qu'elle est faite. Cochez pour la retenir, choisissez son mois de démarrage.",counter())+
 `<div class="filt noprint"><button data-filter="all" class="${f==="all"?"on":""}">Toutes</button><button data-filter="sel" class="${f==="sel"?"on":""}">Retenues seulement</button></div>`+
 AXES.map(ax=>{const l=ACT.filter(a=>a.a===ax.id);const vis=f==="sel"?l.filter(a=>st.sel[a.id]):l;return `<div class="agroup ${vis.length?"":"noprint"}" ${vis.length?"":'style="display:none"'}><h2><span class="axen" style="width:34px;height:34px;font-size:15px;background:${ax.c};color:${ax.tx}">${ax.id}</span>${ax.t}</h2>${l.map(a=>actionCard(a,f==="sel")).join("")}</div>`}).join("");
}

/* CALENDRIER */
function gantt(){
 let h=`<div class="grow" style="border:0;min-height:24px"><div></div>`;let cur=-1,span=0,cells=[];
 for(let w=0;w<NW;w++){const m=wDate(w,3).getMonth();if(m!==cur){if(span)cells.push([cur,span]);cur=m;span=1}else span++}cells.push([cur,span]);
 h+=cells.map(([m,s])=>`<div class="mh" style="grid-column:span ${s}">${["Janv","Févr","Mars","Avril","Mai","Juin","Juil","Août","Sept","Oct","Nov","Déc"][m]}</div>`).join("")+`</div>`;
 h+=`<div class="grow" style="min-height:20px"><div class="gl muted" style="font-weight:400;font-size:11px">Semaine du</div>${Array.from({length:NW},(_,w)=>`<div class="wk">${wDate(w,0).getDate()}</div>`).join("")}</div>`;
 const ins=INST.filter(i=>st.inst[i.id]);
 if(ins.length){h+=`<div class="grow" style="border:0"><div class="gsec" style="color:#0B7F69">Instances</div></div>`;
  for(const i of ins){h+=`<div class="grow"><div class="gl">${i.t}<small>${i.rythme}</small></div>`;
   if(i.id==="remes")h+=`<div style="grid-column:${2+i.w[0]} / span 2"><div class="gbar" style="background:${i.c}"></div></div>`;
   else{const set=new Set(i.w);for(let w=0;w<NW;w++)if(set.has(w))h+=`<div style="grid-column:${2+w}"><div class="dia" style="background:${i.c}" title="${fmt(wDate(w))}"></div></div>`}
   h+=`</div>`}}
 const ch=chosen();
 if(!ch.length)h+=`<p class="muted" style="padding:18px 0">Aucune action retenue : cochez des actions dans les pages Priorités ou Actions.</p>`;
 for(const ax of AXES){const acts=ch.filter(a=>a.a===ax.id).sort((x,y)=>startOf(x)-startOf(y));if(!acts.length)continue;
  h+=`<div class="grow" style="border:0"><div class="gsec" style="color:${axCol(ax)}">Axe ${ax.id} · ${ax.t}</div></div>`;
  acts.forEach(a=>{const s=startOf(a),e=endOf(a);h+=`<div class="grow"><div class="gl">${a.t}<small>${a.p} · ${fmt(wDate(s))} au ${fmt(wDate(e,-3))}</small></div><div style="grid-column:${2+s} / ${2+e}"><div class="gbar" style="background:${ax.c}"></div></div></div>`})}
 if(ch.length)h+=`<div class="grow" style="border:0;margin-top:8px"><div class="gl">Charge<small>actions en cours</small></div>${Array.from({length:NW},(_,w)=>{const n=loadW(w);const bg=n>8?"#F4B9B6":n>5?"#8B7FF6":n>0?"#E9E6FA":"transparent";return `<div class="cell" style="background:${bg}">${n||""}</div>`}).join("")}</div>`;
 return `<div class="gwrap"><div class="gantt">${h}</div></div>`;
}
function pCalendrier(){
 let pk=0;for(let w=0;w<NW;w++)pk=Math.max(pk,loadW(w));
 return ptitle("Calendrier","Décembre à juin, <em>avec vos choix</em>","Les actions retenues se placent à leur mois de démarrage, modifiable dans la page Actions. Les instances retenues dans la page Gouvernance apparaissent en tête.",counter())+
 `<div class="card mt">${gantt()}${pk>8?`<p class="alert">Jusqu'à ${pk} actions en parallèle certaines semaines : décalez un démarrage dans la page Actions plutôt que d'ajouter des porteurs.</p>`:""}</div>`;
}

/* GOUVERNANCE */
function pGouvernance(){
 const cls={strat:"nuit",copil:"fort",rkpi:"sar",remes:""};
 return ptitle("Gouvernance","Quatre instances, <em>trois niveaux de décision</em>","Une instance décide du cap, une pilote l'avancement, une suit les chiffres, la remesure tranche. Désactivez une instance pour la retirer du calendrier.")+
 `<div class="grid g2 mt">${INST.map(i=>`<div class="card inst ${cls[i.id]}"><div class="ih"><span class="lab ${cls[i.id]?"m":""}" style="${i.id==="copil"?"color:#fff;opacity:.85":""}">${i.lvl}</span><label class="sw noprint"><input type="checkbox" data-inst="${i.id}" ${st.inst[i.id]?"checked":""} aria-label="Inscrire ${i.t} au calendrier"><span></span></label></div><h2 style="font-size:20px;margin-top:6px;${cls[i.id]?"color:#fff":""}">${i.t}</h2><dl><dt>Qui</dt><dd>${i.who}</dd><dt>Rythme</dt><dd>${i.rythme}</dd><dt>Décide</dt><dd>${i.dec}</dd><dt>Regarde</dt><dd>${i.kpi}</dd><dt>Dates</dt><dd>${i.id==="remes"?"Du 1er au 12 juin, restitution le 15 juin":i.w.map(w=>fmt(wDate(w))).join(", ")}</dd></dl></div>`).join("")}</div>
 <div class="grid g2 mt"><div class="card"><span class="lab">Comité de pilotage</span><h3 style="margin-top:4px">L'ordre du jour type</h3><ol class="odj"><li>Avancement des actions, preuve à l'appui<span>20 min</span></li><li>Ce que disent les IA depuis la dernière séance<span>10 min</span></li><li>Décisions et arbitrages du sponsor<span>20 min</span></li><li>Prochaine étape : trois actions, trois noms, trois dates<span>10 min</span></li></ol></div>
 <div class="card"><span class="lab">Règles de décision</span><h3 style="margin-top:4px">Quatre règles simples</h3><ol class="odj"><li>Une action entre au plan quand un porteur nommé l'accepte en comité.</li><li>Toute allégation santé, environnementale ou de garantie passe par le juridique avant publication.</li><li>Le cap ne change pas entre deux mesures, seuls les moyens s'ajustent.</li><li>Ce qui n'est pas tranché en séance remonte au sponsor sous huit jours.</li></ol></div></div>`;
}

/* PILOTAGE */
function pPilotage(){
 const ch=chosen(),n=ch.length,por={};ch.forEach(a=>por[a.p]=(por[a.p]||0)+a.w);
 const top=Object.entries(por).sort((x,y)=>y[1]-x[1])[0];
 let pk=0,pw=0;for(let w=0;w<NW;w++){const l=loadW(w);if(l>pk){pk=l;pw=w}}
 const before=n?Math.round(ch.filter(a=>endOf(a)<=26).length/n*100):0;
 const cov={};ch.forEach(a=>a.sig.forEach(s=>cov[s]=(cov[s]||0)+1));
 const miss=SIG.filter(([s,v])=>v<60&&!cov[s]).map(x=>x[0]);
 return ptitle("Pilotage et KPI","Ce qu'on mesure, <em>et ce qu'on vise</em>","Les indicateurs d'effort se suivent en comité de pilotage, les indicateurs d'effet en revue KPI mensuelle.",counter())+
 `<div class="grid g4 mt"><div class="card"><span class="lab">Actions retenues</span><p class="num kbig">${n}</p><p class="muted" style="font-size:13px">sur 25</p></div><div class="card"><span class="lab">Porteurs mobilisés</span><p class="num kbig">${Object.keys(por).length}</p><p class="muted" style="font-size:13px">le plus chargé : <b>${top?top[0]:"aucun"}</b></p></div><div class="card"><span class="lab">Pic de charge</span><p class="num kbig">${pk}</p><p class="muted" style="font-size:13px">actions en parallèle${pk?", semaine du "+fmt(wDate(pw,0)):""}</p></div><div class="card"><span class="lab">Livrées avant la remesure</span><p class="num kbig">${before} %</p><p class="muted" style="font-size:13px">des actions retenues</p></div></div>
 <div class="grid g2 mt"><div class="card"><span class="lab">Couverture des six signaux</span><h3 style="margin-top:4px">Nombre d'actions retenues par signal</h3><div class="mt">${SIG.map(([s,v])=>`<div class="sig ${v<60&&!cov[s]?"al":""}"><span class="n"><b>${s}</b></span><div class="rail"><i style="width:${v}%;background:${v<55?"#141B45":"#6A5AE0"}"></i></div><span class="num" style="font-size:15px">${v}</span><span class="cov"><b>${cov[s]||0}</b> action${(cov[s]||0)>1?"s":""}</span></div>`).join("")}</div>${miss.length&&n?`<p class="alert">Signal bas sans action retenue : ${miss.join(", ")}.</p>`:""}</div>
 <div class="card"><span class="lab">Indicateurs d'effet · revue KPI</span><h3 style="margin-top:4px">Base de septembre 2026, cible de juin 2027</h3><table class="tbl mt"><thead><tr><th>Indicateur</th><th style="text-align:right">Base</th><th style="text-align:right">Cible</th></tr></thead><tbody>${EFF.map(r=>`<tr><td class="t">${r[0]}</td><td class="r">${r[1]}</td><td class="c">${r[2]}</td></tr>`).join("")}</tbody></table><p class="muted" style="font-size:12px;margin-top:10px">Cibles proposées, à valider en comité stratégique.</p></div></div>
 <div class="card mt"><span class="lab">Indicateurs d'effort · comité de pilotage</span><h3 style="margin-top:4px">Une preuve de réalisation par action retenue</h3><table class="tbl mt"><thead><tr><th>Action</th><th>Porteur</th><th>Preuve de réalisation</th><th>Échéance</th></tr></thead><tbody>${n?[...ch].sort((x,y)=>endOf(x)-endOf(y)).map(a=>`<tr><td class="t">${a.t}</td><td>${a.p}</td><td>${a.kpi}</td><td style="white-space:nowrap">${fmt(wDate(endOf(a),-3))}</td></tr>`).join(""):`<tr><td colspan="4">Aucune action retenue.</td></tr>`}</tbody></table></div>`;
}

/* COMPLET */
function pComplet(){
 const savedF=st.filter;st.filter="sel";
 const parts=[["Priorités",pPriorites()],["Axes",pAxes()],["Actions retenues",pActions()],["Calendrier",pCalendrier()],["Gouvernance",pGouvernance()],["Pilotage et KPI",pPilotage()]];
 st.filter=savedF;
 return `<div class="ptitle noprint"><span class="lab">Version complète</span><h1 style="margin-top:6px">Le plan <em>en un seul document</em></h1><p class="sub">Toutes les pages réunies, avec vos choix actuels. Utilisez le bouton pour l'enregistrer en PDF.</p><button class="btn mt" data-print>${icon}Enregistrer en PDF</button></div>
 <section class="chapt first"><div class="ptitle"><span class="lab">Plan d'autorité · novembre 2026</span><h1 style="margin-top:6px;font-size:44px">Geberit · <em>plan d'autorité</em></h1><p class="sub">Faire confirmer par d'autres ce que Geberit dit déjà très bien. ${chosen().length} actions retenues, cinq axes, quatre instances, de décembre 2026 à juin 2027.</p></div>
 <div class="grid g3 mt"><div class="card"><span class="lab">Authority Score</span><p class="num" style="font-size:56px;margin-top:10px">53</p><p class="muted">Établie, septembre 2026</p></div><div class="card nuit"><span class="lab m">Le constat</span><p class="num" style="font-size:56px;margin-top:10px">51 %</p><p style="color:rgba(255,255,255,.85)">des citations viennent du site ; 0,9 % de la presse, de l'institutionnel et de l'emploi.</p></div><div class="card fort"><span class="lab" style="color:#fff;opacity:.85">Le cap</span><p style="font-size:19px;font-weight:600;margin-top:10px">Donner un visage et une preuve, les faire circuler, puis les faire confirmer par des tiers.</p></div></div>
 <div class="card mt"><span class="lab">Sommaire</span><ol class="odj">${parts.map(p=>`<li>${p[0]}</li>`).join("")}</ol></div></section>`+
 parts.map(p=>`<section class="chapt">${p[1]}</section>`).join("");
}

const RENDER={index:pAccueil,priorites:pPriorites,axes:pAxes,actions:pActions,calendrier:pCalendrier,gouvernance:pGouvernance,pilotage:pPilotage,complet:pComplet};
function render(){
 const y=window.scrollY;
 document.getElementById("app").innerHTML=header()+`<main><div class="wrap">${RENDER[page]()}</div></main>`+footer();
 window.scrollTo(0,y);
}
document.addEventListener("change",e=>{const t=e.target;
 if(t.dataset.id){if(t.checked)st.sel[t.dataset.id]=1;else delete st.sel[t.dataset.id];save();render()}
 else if(t.dataset.start){st.start[t.dataset.start]=+t.value;save();render()}
 else if(t.dataset.inst){st.inst[t.dataset.inst]=t.checked?1:0;save();render()}
});
document.addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;
 if(t.hasAttribute("data-print")){try{window.print()}catch(err){}}
 else if(t.hasAttribute("data-amorces")){st.sel={};ACT.filter(QUADS[0].f).forEach(a=>st.sel[a.id]=1);save();render()}
 else if(t.hasAttribute("data-none")){st.sel={};save();render()}
 else if(t.dataset.filter){st.filter=t.dataset.filter;save();render()}
});
render();
if(page==="index"){const sc=document.getElementById("score"),arc=document.getElementById("arc"),T=53,L=395.8;
 if(matchMedia("(prefers-reduced-motion: reduce)").matches){arc.style.strokeDashoffset=L*(1-T/100)}
 else{const t0=performance.now();(function f(n){const k=Math.min((n-t0)/1200,1),e=1-Math.pow(1-k,3);sc.textContent=Math.round(e*T);arc.style.strokeDashoffset=L*(1-e*T/100);if(k<1)requestAnimationFrame(f)})(t0)}}
if(page==="complet"&&/print=1/.test(location.search)){setTimeout(()=>{try{window.print()}catch(e){}},700)}
})();
