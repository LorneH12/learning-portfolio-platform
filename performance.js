export function performancePractice({document,course,lesson,key,storage}){
 const value=course.designNotes?.performanceTask;if(!value)return null;
 const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=String(text);return e};
 function render(v){if(v===null||typeof v!=='object')return el('p',v??'');if(Array.isArray(v)){const ul=el('ul');for(const x of v){const li=el('li');li.append(render(x));ul.append(li)}return ul}const dl=el('dl');for(const[k,x]of Object.entries(v)){dl.append(el('dt',k.replace(/([A-Z])/g,' $1')));const dd=el('dd');dd.append(render(x));dl.append(dd)}return dl}
 const section=el('section');section.className='callout';section.setAttribute('aria-labelledby','performance-heading');
 const h=el('h2','Writing practice and review rubric');h.id='performance-heading';section.append(h,render(value));
 const label=el('label','Your practice notes (not scored or sent to the learning record)');const input=el('textarea');input.id='performance-response';label.htmlFor=input.id;
 input.value=storage.getItem(key+'-writing-'+lesson.id)||'';input.oninput=()=>storage.setItem(key+'-writing-'+lesson.id,input.value);section.append(label,input);return section;
}
