export function validateCourse(c){
 const errors=[]; const need=(ok,s)=>{if(!ok)errors.push(s)};
 need(c&&typeof c==='object','Course must be an object');if(!c||typeof c!=='object')return errors;
 need(typeof c.id==='string'&&/^[a-z0-9][a-z0-9-]{1,99}$/.test(c.id),'Invalid course id');
 for(const k of ['title','summary','audience','disclaimer'])need(typeof c[k]==='string'&&c[k].trim(),k+' is required');
 need(Array.isArray(c.lessons)&&c.lessons.length>0,'Lessons are required');
 const ids=new Set();const unique=id=>{need(typeof id==='string'&&id&&!ids.has(id),'Missing or duplicate id: '+id);ids.add(id)};
 const question=q=>{unique(q?.id);need(typeof q?.prompt==='string','Question prompt required');need(Array.isArray(q?.options)&&q.options.length>=2,'At least two options required');if(q?.options){const os=q.options.map(o=>o.id);need(new Set(os).size===os.length,'Duplicate option ids');need(os.includes(q.correctOptionId),'Answer key does not match an option')}need(typeof q?.rationale==='string','Rationale required')};
 for(const l of c.lessons||[]){unique(l.id);need(typeof l.title==='string'&&typeof l.content==='string','Lesson text required');if(l.knowledgeCheck)question(l.knowledgeCheck)}
 need(Array.isArray(c.assessment?.questions)&&c.assessment.questions.length>0,'Assessment required');
 for(const q of c.assessment?.questions||[])question(q);
 need(Number.isFinite(c.assessment?.passPercent)&&c.assessment.passPercent>0&&c.assessment.passPercent<=100,'Pass percentage must be 1–100');
 if(c.assessment?.requiredCorrect!==undefined)need(c.assessment.requiredCorrect===Math.ceil(c.assessment.questions.length*c.assessment.passPercent/100),'Required correct count disagrees with pass percentage');
 for(const r of c.resources||[]){try{need(['https:','http:'].includes(new URL(r.url).protocol),'Unsafe resource URL')}catch{errors.push('Invalid resource URL')}}
 return errors;
}
export function grade(c,answers){const qs=c.assessment.questions;const correct=qs.filter(q=>answers[q.id]===q.correctOptionId).length;return {correct,total:qs.length,percent:100*correct/qs.length,passed:correct>=Math.ceil(qs.length*c.assessment.passPercent/100)}}
export function complete(c,state){return c.lessons.every(l=>state.visited.includes(l.id))&&state.result?.passed===true}
export function freshState(){return{position:0,visited:[],answers:{},result:null}}

