const $=s=>document.querySelector(s),R=a=>a[Math.floor(Math.random()*a.length)];
const mk=(id,o,r,h,w,n,E,col)=>({id,col,ox:{f:o[0],q:o[1],k:o[2]||1},red:{f:r[0],q:r[1],k:r[2]||1},h,w,n,E});
const C=[mk('mno4',['MnO4',-1],['Mn',2],8,4,5,1.51,['#C2338F','#E08BC0']),mk('cr2o7',['Cr2O7',-2],['Cr',3,2],14,7,6,1.33,['#E8780F','#F2AE6A']),mk('fe3',['Fe',3],['Fe',2],0,0,1,.77,['#6DB52A','#8C8F3C']),mk('cu2',['Cu',2],['Cu',0],0,0,2,.34,['#12A394','#6CCFC3']),mk('zn2',['Zn',2],['Zn',0],0,0,2,-.76,['#7D8AA3','#B3BCCB']),mk('i2',['I2',0],['I',-1,2],0,0,2,.54,['#7A4BC0','#AE96DC']),mk('cl2',['Cl2',0],['Cl',-1,2],0,0,2,1.36,['#22A86C','#7FD4AE']),mk('no3',['NO3',-1],['NO',0],4,2,3,.96,['#A4622F','#CF9A6E']),mk('h2o2',['H2O2',0],['H2O',0,2],2,0,2,1.78,['#E8689B','#F5B3CF']),mk('al3',['Al',3],['Al',0],0,0,3,-1.66,['#4F8497','#9BC1CD']),mk('ag',['Ag',1],['Ag',0],0,0,1,.8,['#C6952A','#E4C87E'])];
const F=(f,q)=>f=='e'?'e⁻':f.replace(/(\d+)/g,'<sub>$1</sub>')+(q?'<sup>'+(Math.abs(q)>1?Math.abs(q):'')+(q>0?'+':'−')+'</sup>':'');
const nm=c=>F(c.ox.f,c.ox.q)+'/'+F(c.red.f,c.red.q);
const it=(f,q,c,min,ext,col,sp)=>({f,q,c,min,ext,col,sp});
const Hp=()=>it('H',1,0,0,1,0,'ph'),El=()=>it('e',-1,0,0,1,0,'pe'),Wa=()=>it('H2O',0,0,0,1,0,'pw');
let S={},sess={},forced=null,tm=null;
const gcd=(a,b)=>b?gcd(b,a%b):a,lcm=(a,b)=>a*b/gcd(a,b),cp=id=>C.find(c=>c.id==id);
const pc=x=>'pill '+(x.sp||'')+'" '+(x.col?'style="background:'+x.col+'"':'');
const st=x=>'<span class="'+pc(x)+'>'+(x.c>1?x.c+' ':'')+F(x.f,x.q)+'</span>';
const join=L=>L.filter(x=>x.c>0).map(st).join('<span class="op">+</span>');
const row=(L,r,op)=>'<span class="side">'+join(L)+'</span><span class="op">'+op+'</span><span class="side">'+join(r)+'</span>';
function tk(c,m,u){const o=(f,q,k,col,sp)=>({f,q,c:k*m,col,sp}),L=[o(c.ox.f,c.ox.q,c.ox.k,c.col[0])],r=[o(c.red.f,c.red.q,c.red.k,c.col[1])];if(u>=2)r.push(o('H2O',0,c.w,0,'pw'));if(u>=3)L.push(o('H',1,c.h,0,'ph'));if(u>=4)L.push(o('e',-1,c.n,0,'pe'));return[L,r]}
function bil(h,l){const L=lcm(h.n,l.n),a=L/h.n,b=L/l.n,H=a*h.h-b*l.h,W=b*l.w-a*h.w,o=(f,q,c,col,sp)=>({f,q,c,col,sp});return{a,b,L:[o(h.ox.f,h.ox.q,a*h.ox.k,h.col[0]),o(l.red.f,l.red.q,b*l.red.k,l.col[1]),o('H',1,Math.max(H,0),0,'ph'),o('H2O',0,Math.max(W,0),0,'pw')],R:[o(h.red.f,h.red.q,a*h.red.k,h.col[1]),o(l.ox.f,l.ox.q,b*l.ox.k,l.col[0]),o('H',1,Math.max(-H,0),0,'ph'),o('H2O',0,Math.max(-W,0),0,'pw')]}}
function count(L){const e={};let q=0;L.forEach(x=>{q+=x.q*x.c;if(x.f=='e')return;(x.f.match(/[A-Z][a-z]?\d*/g)||[]).forEach(m=>{const k=m.match(/[A-Z][a-z]?/)[0],n=+(m.slice(k.length)||1);e[k]=(e[k]||0)+n*x.c})});return{e,q}}
function rows(){const a=count(S.L),b=count(S.R),ks=[...new Set([...Object.keys(a.e),...Object.keys(b.e)])],r=ks.map(k=>[k,a.e[k]||0,b.e[k]||0]);r.push(['charge',a.q,b.q]);return r}
const TU=[{a:'mno4',b:'fe3'},{a:'no3',b:'cu2'}];
function newEx(){clearTimeout(tm);const A=forced||R(C),B=R(C.filter(x=>x!=A&&Math.abs(x.E-A.E)>=.3));S={cp:A.E>B.E?[A,B]:[B,A]};const ids=S.cp.map(c=>c.id),ov=t=>[TU[t].a,TU[t].b].filter(i=>ids.includes(i)).length;if(sess.t==null)sess.t=Math.floor(Math.random()*2);if(ov(sess.t)>ov(1-sess.t))sess.t=1-sess.t;setStep(1)}
function setStep(n){S.step=n;const[h,l]=S.cp;
if(n<3){const c=S.cp[n-1];S.L=[it(c.ox.f,c.ox.q,1,1,0,c.col[0]),Hp(),El()];S.R=[it(c.red.f,c.red.q,1,1,0,c.col[1]),Wa()]}
if(n==3){S.a=1;S.b=1}
if(n==4){const f=x=>it(x.f,x.q,1,1,0,x.col);S.L=[f(h.ox.f?{f:h.ox.f,q:h.ox.q,col:h.col[0]}:0),f({f:l.red.f,q:l.red.q,col:l.col[1]}),Hp(),Wa()];S.R=[f({f:h.red.f,q:h.red.q,col:h.col[1]}),f({f:l.ox.f,q:l.ox.q,col:l.col[0]}),Hp(),Wa()];const b=bil(h,l),hr=(c,m)=>{const[x,y]=tk(c,m,4);return'<div class="hrow"><span class="pill mul">×'+m+'</span>'+row(x,y,'=')+'</div>'};$('#ref').innerHTML=hr(h,b.a)+hr(l,b.b)}
$('#ref').style.display=n==4?'block':'none';$('#tools').style.display=n==1?'':'none';
$('#goal').innerHTML='<b>Étape '+n+'/4</b> — '+['Équilibre la première demi-équation.','Équilibre la seconde demi-équation.','Détermine le multiplicateur à appliquer à chaque demi-équation.','Écris l\'équation bilan complète de la réaction d\'oxydoréduction.'][n-1];
$('#fb').textContent='';$('#fb').className='ex-feedback';$('#b-ok').style.display='';$('#b-next').style.display='none';render()}
function ent(x,s,i){return'<div class="ent"><button data-s="'+s+'" data-i="'+i+'" data-d="1">+</button><div class="'+pc(x)+'>'+(x.c>1?x.c+' ':'')+F(x.f,x.q)+'</div><button data-s="'+s+'" data-i="'+i+'" data-d="-1">−</button></div>'}
function side(s){const L=S[s];return'<div class="side">'+L.map((x,i)=>[x,i]).filter(([x])=>x.c>0).map(([x,i])=>ent(x,s,i)).join('<span class="op">+</span>')+'</div><div class="adds">'+L.map((x,i)=>x.ext&&x.c==0?'<button data-s="'+s+'" data-i="'+i+'" data-d="1">Ajouter '+F(x.f,x.q)+'</button>':'').join('')+'</div>'}
function render(){const n=S.step,E=$('#eq'),T=$('#tbl');
if(n==3){const hr=(c,k)=>{const[l,r]=tk(c,S[k],4);return'<div class="hrow"><div class="ent"><button data-m="'+k+'" data-d="1">+</button><div class="pill mul">×'+S[k]+'</div><button data-m="'+k+'" data-d="-1">−</button></div>'+row(l,r,'=')+'</div>'};E.innerHTML='<div class="col">'+hr(S.cp[0],'a')+hr(S.cp[1],'b')+'</div>';T.innerHTML='';return}
E.innerHTML=side('L')+'<span class="op">'+(n==4?'→':'=')+'</span>'+side('R');
T.innerHTML='<table><tr><th></th><th>gauche</th><th>droite</th></tr>'+rows().map(r=>'<tr class="'+(r[1]==r[2]?'ok':'ko')+'"><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>').join('')+'</table>'}
const eq=c=>{const w=(k,f,q)=>(k>1?k+' ':'')+F(f,q);return w(c.ox.k,c.ox.f,c.ox.q)+(c.h?' + '+c.h+' H⁺':'')+' + '+c.n+' e⁻ = '+w(c.red.k,c.red.f,c.red.q)+(c.w?' + '+c.w+' H₂O':'')};
function check(){const n=S.step,say=(t,c)=>{$('#fb').textContent=t;$('#fb').className='ex-feedback '+c;return c=='success'?1:0},[h,l]=S.cp,b=bil(h,l),r=rows();
if(n==3)return S.a==b.a&&S.b==b.b?say('Bravo ! Les '+lcm(h.n,l.n)+' e⁻ se compensent.','success'):say('Les électrons ne sont pas égaux, ou le multiplicateur n\'est pas le plus petit possible.','error');
if(n<3){const c=S.cp[n-1],g=S.L.map(x=>x.c);if(g[0]==c.ox.k&&g[1]==c.h&&g[2]==c.n&&S.R[0].c==c.red.k&&S.R[1].c==c.w)return say('Bravo ! Demi-équation correcte.','success');return say(r.slice(0,-1).some(x=>x[1]!=x[2])?'Les atomes ne sont pas conservés (voir le tableau).':r.at(-1)[1]!=r.at(-1)[2]?'Les charges ne sont pas conservées : ajuste les e⁻.':'Équilibrée, mais vérifie les coefficients du couple.','error')}
if(S.L.every((x,i)=>x.c==b.L[i].c)&&S.R.every((x,i)=>x.c==b.R[i].c))return say('Bravo ! Équation bilan correcte 🎉','success');return say(r.at(-1)[1]!=r.at(-1)[2]?'Les charges ne sont pas conservées.':r.some(x=>x[1]!=x[2])?'Les atomes ne sont pas conservés.':'Équilibrée, mais simplifie les H⁺ et H₂O présents des deux côtés.','error')}
document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;
if(t.dataset.go){clearTimeout(tm);go(t.dataset.go)}
else if(t.dataset.m){const k=t.dataset.m;S[k]=Math.min(10,Math.max(1,S[k]+ +t.dataset.d));render()}
else if(t.dataset.s){const x=S[t.dataset.s][t.dataset.i];x.c=Math.max(x.min,x.c+ +t.dataset.d);render()}
else if(t.dataset.p){forced=cp(t.dataset.p);$('#ov').classList.remove('on');newEx()}});
function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id==id))}
function ov(t,b){$('#ov-t').textContent=t;$('#ov-b').innerHTML=b;$('#ov').classList.add('on')}
$('#ov-x').onclick=()=>$('#ov').classList.remove('on');
$('#go-bilan').onclick=()=>{go('work');sess={};forced=null;newEx();if(innerWidth<700&&innerHeight>innerWidth){$('#rot').classList.add('on');setTimeout(hideRot,3000)}};
const hideRot=()=>$('#rot').classList.remove('on');$('#rot').onclick=hideRot;addEventListener('orientationchange',hideRot);
$('#b-ok').onclick=()=>{if(check()){$('#b-ok').style.display='none';if(S.step==4)$('#b-next').style.display='';else tm=setTimeout(()=>setStep(S.step+1),2000)}};
$('#b-next').onclick=()=>newEx();
$('#b-couples').onclick=()=>ov('Les couples',S.cp.map(c=>'<p>'+nm(c)+' — E° = '+c.E+' V<br>'+eq(c)+'</p>').join(''));
$('#b-choose').onclick=()=>ov('Choisir un couple',C.map(c=>'<button class="cp" data-p="'+c.id+'"><span>'+nm(c)+'</span><span>'+c.E+' V</span></button>').join(''));
function tuto(step){const t=TU[sess.t||0],a=cp(t.a),b=cp(t.b),B=bil(a,b),ex='<p>Exemple avec '+nm(a)+' et '+nm(b)+' :</p>';
if(step<3){const tx=['On écrit l\'oxydant à gauche et le réducteur à droite, puis on vérifie que l\'élément principal est conservé.','On équilibre l\'oxygène en ajoutant des H₂O du côté qui en manque.','On équilibre l\'hydrogène en ajoutant des H⁺ du côté qui en manque.','On équilibre les charges avec des e⁻ : la charge totale doit être identique des deux côtés.'];return'<p>Méthode, sur le couple '+nm(a)+' :</p>'+tx.map((s,i)=>{const[l,r]=tk(a,1,i+1);return'<div class="shot">'+row(l,r,'=')+'</div><p><b>'+(i+1)+'.</b> '+s+'</p>'}).join('')}
const hs='<div class="shot"><div class="col">'+[[a,B.a],[b,B.b]].map(([c,m])=>{const[l,r]=tk(c,m,4);return'<div class="hrow"><span class="pill mul">×'+m+'</span>'+row(l,r,'=')+'</div>'}).join('')+'</div></div>';
if(step==3)return ex+hs+'<p>'+a.n+' e⁻ échangés pour le premier couple, '+b.n+' pour le second. Le plus petit multiple commun est '+lcm(a.n,b.n)+' : on multiplie la première demi-équation par '+B.a+' et la seconde par '+B.b+'. Chacune contient alors '+lcm(a.n,b.n)+' e⁻, qui s\'élimineront à l\'addition.</p>';
return ex+hs+'<p>On additionne les deux demi-équations, en écrivant la seconde dans le sens de la réaction (le réducteur à gauche). Les e⁻ disparaissent, puis on simplifie les H⁺ et H₂O présents des deux côtés :</p><div class="shot">'+row(B.L,B.R,'→')+'</div>'}
$('#b-tuto').onclick=()=>ov('Tuto',tuto(S.step));
