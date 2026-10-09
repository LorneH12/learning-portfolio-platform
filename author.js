import{validateCourse}from'./core.js';
const $=s=>document.querySelector(s),msg=s=>$('#message').textContent=s;
const parse=()=>{const c=JSON.parse($('#editor').value);const e=validateCourse(c);if(e.length)throw Error(e.join('; '));return c};
const report=fn=>{try{fn()}catch(e){msg(e.message)}};
const panel=document.createElement('section');panel.setAttribute('aria-label','Visual course editor');$('#editor').before(panel);
function persist(){localStorage.setItem('author-draft',$('#editor').value)}
function field(parent,label,value,change,multiline=false){const wrap=document.createElement('label');wrap.textContent=label;const input=document.createElement(multiline?'textarea':'input');input.value=value??'';input.oninput=()=>{change(input.value);persist()};wrap.append(input);parent.append(wrap);return input}
function visual(){panel.replaceChildren();let c;try{c=parse()}catch{return}const sync=()=>{$('#editor').value=JSON.stringify(c,null,2)};
const h=document.createElement('h2');h.textContent='Edit course content';panel.append(h);
field(panel,'Course title',c.title,v=>{c.title=v;sync()});field(panel,'Summary',c.summary,v=>{c.summary=v;sync()},true);
const theme=document.createElement('label');theme.textContent='Default brand theme';const select=document.createElement('select');for(const[id,name]of[['blue','Midnight'],['garnet','Garnet']]){const o=document.createElement('option');o.value=id;o.textContent=name;select.append(o)}select.value=c.brand?.theme||'blue';select.onchange=()=>{c.brand={...c.brand,theme:select.value};sync();persist()};theme.append(select);panel.append(theme);
for(const[o,i]of(c.objectives||[]).map((o,i)=>[o,i]))field(panel,'Objective '+(i+1),o.text,v=>{o.text=v;sync()},true);
for(const l of c.lessons){const d=document.createElement('details'),s=document.createElement('summary');s.textContent=l.title;d.append(s);field(d,'Lesson title',l.title,v=>{l.title=v;s.textContent=v;sync()});field(d,'Lesson text (Markdown)',l.content,v=>{l.content=v;sync()},true);
if(l.activity?.prompt)field(d,'Activity prompt',l.activity.prompt,v=>{l.activity.prompt=v;sync()},true);
for(const option of l.activity?.options||[]){field(d,'Activity choice '+option.id,option.text,v=>{option.text=v;sync()});field(d,'Feedback for '+option.id,option.feedback,v=>{option.feedback=v;sync()},true)}
panel.append(d)}
for(const[q,i]of c.assessment.questions.map((q,i)=>[q,i])){const d=document.createElement('details'),s=document.createElement('summary');s.textContent='Assessment question '+(i+1);d.append(s);field(d,'Question',q.prompt,v=>{q.prompt=v;sync()},true);for(const o of q.options)field(d,'Choice '+o.id,o.text,v=>{o.text=v;sync()});field(d,'Correct option ID',q.correctOptionId,v=>{q.correctOptionId=v;sync()});field(d,'Explanation',q.rationale,v=>{q.rationale=v;sync()},true);panel.append(d)}
}
function load(text){$('#editor').value=text;persist();visual()}
fetch('courses--index.json').then(r=>r.json()).then(cs=>{for(const c of cs){const o=document.createElement('option');o.value=c.id;o.textContent=c.title;$('#courses').append(o)}}).catch(()=>msg('Course catalog unavailable.'));
load(localStorage.getItem('author-draft')||'');
$('#editor').oninput=()=>{persist();visual()};
$('#courses').onchange=async()=>{if(!$('#courses').value)return;const r=await fetch('courses--'+$('#courses').value+'.json');load(JSON.stringify(await r.json(),null,2));msg('Course loaded and saved as a local draft.')};
$('#import').onchange=async e=>{const f=e.target.files[0];if(!f)return;if(f.size>2000000)return msg('Choose a JSON file below 2 MB.');load(await f.text());report(()=>{parse();msg('Imported draft is valid and saved locally.')})};
$('#validate').onclick=()=>report(()=>{parse();persist();msg('Valid course: all answer references and pass thresholds checked. Draft saved locally.')});
$('#download').onclick=()=>report(()=>{const c=parse();persist();const url=URL.createObjectURL(new Blob([JSON.stringify(c,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=c.id+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);msg('Export created. Store it as the course source before rebuilding.')});
$('#preview').onclick=()=>report(()=>{const c=parse();persist();localStorage.setItem('author-preview',JSON.stringify(c));window.open('./?preview=1','_blank','noopener');msg('Draft preview opened. Export to retain a portable copy.')});
