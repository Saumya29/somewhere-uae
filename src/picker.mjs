// Editorial matching, not live routing or opening-status data.
export const TIME_OPTIONS = [
  {id:'quick', label:'A quick stop', hint:'Something you can keep short.'},
  {id:'half', label:'Half a day', hint:'One place to build an afternoon around.'},
  {id:'full', label:'A full day', hint:'Room for a bigger change of scenery.'},
];
export const PICK_MOODS = [
  {id:'all', label:'Open to anything', icon:'compass'},
  {id:'coast', label:'By the water', icon:'waves'},
  {id:'nature', label:'Fresh air & nature', icon:'leaf'},
  {id:'culture', label:'Art & old streets', icon:'art'},
  {id:'indoor', label:'Stay indoors', icon:'sun'},
];
const HELD = new Set(['mountain-extreme','kefi','dreamland-aqua-park','ajman-heritage-district']);
const OUTLYING = new Set(['Al Ain','Al Wathba','Al Qudra','Mleiha','Kalba','Khor Fakkan','Shees','Jebel Jais','Al Aqah','Al Bidyah','Dhayah']);
const QUICK_CATEGORIES = /beach|waterfront|neighbourhood|reading|art \/ culture|art \/ indoor|park \/ outdoor/i;
const LONG_CATEGORIES = /trail|day trip|experience|water activity|water park/i;
const FEATURED = ['al-fahidi-historical-neighbourhood','kite-beach','house-of-wisdom','jubail-mangrove-park','al-rabi-hiking-trail','louvre-abu-dhabi'];
export function placeMoods(p){
 const c=p.category.toLowerCase();const tags=[];
 if(/beach|waterfront|coast|water activity|water park/.test(c))tags.push('coast');
 if(/nature|outdoor|trail|garden|viewpoint|park/.test(c)&&!c.includes('water park'))tags.push('nature');
 if(/culture|heritage|architecture|art|reading/.test(c))tags.push('culture');
 if(/indoor|museum|reading/.test(c))tags.push('indoor');
 return tags;
}
function longOuting(p){return LONG_CATEGORIES.test(p.category)||OUTLYING.has(p.area)}
function activity(p){
 const c=p.category.toLowerCase();
 if(c.includes('reading'))return 'A reading and architecture visit';
 if(c.includes('trail'))return 'A hiking outing';
 if(c.includes('museum'))return 'A museum visit';
 if(c.includes('beach'))return 'Time by the beach';
 if(c.includes('waterfront'))return 'A waterfront stroll';
 if(c.includes('wildlife'))return 'A wildlife-focused visit';
 if(c.includes('neighbourhood'))return 'A neighbourhood wander';
 if(c.includes('garden')||c.includes('park'))return 'An outdoor visit';
 if(c.includes('viewpoint'))return 'A viewpoint outing';
 if(c.includes('art'))return 'An art-focused visit';
 if(c.includes('heritage'))return 'A heritage visit';
 return p.outing_idea.replace(/\.$/,'');
}
function reasonFor(p,answers){
 const trip=answers.time==='quick'?'Keep it to a single, flexible stop.':answers.time==='half'?'Make this the main stop of your outing.':'An option for a day with fewer time constraints.';
 const location=p.emirate===answers.start?`Within ${answers.start}.`:`In ${p.emirate}, outside your starting emirate.`;
 return `${activity(p)} in ${p.area}. ${location} ${trip}`;
}
export function recommendPlaces(places,answers,offset=0){
 if(!answers || !TIME_OPTIONS.some(x=>x.id===answers.time)||!PICK_MOODS.some(x=>x.id===answers.mood)||!places.some(p=>p.emirate===answers.start))return {picks:[],total:0};
 const across=answers.time==='full'&&answers.across===true;
 const candidates=places.filter(p=>!HELD.has(p.id)&&!p.personal&&(across||p.emirate===answers.start)&&(answers.mood==='all'||placeMoods(p).includes(answers.mood))&&(answers.time!=='quick'||(!longOuting(p)&&QUICK_CATEGORIES.test(p.category)))&&(answers.time!=='half'||!longOuting(p)));
 const scored=candidates.map(p=>({place:p,score:(p.emirate===answers.start?2:0)+(p.evidence_level?.startsWith('official')?2:0)+(FEATURED.includes(p.id)?2:0)+(answers.time==='full'&&longOuting(p)?4:0)})).sort((a,b)=>b.score-a.score||a.place.name.localeCompare(b.place.name));
 // Spread the first choices across areas where possible. No invented distance estimates.
 const ranked=[];
 while(scored.length){let best=0;let bestScore=-Infinity;for(let i=0;i<scored.length;i++){const item=scored[i];const penalty=ranked.slice(-2).filter(p=>p.area===item.place.area&&p.emirate===item.place.emirate).length*3;const value=item.score-penalty;if(value>bestScore){best=i;bestScore=value}}ranked.push(scored.splice(best,1)[0].place)}
 const start=((Math.trunc(offset)||0)%Math.max(1,ranked.length)+ranked.length)%Math.max(1,ranked.length);
 const picks=Array.from({length:Math.min(3,ranked.length)},(_,i)=>ranked[(start+i)%ranked.length]);
 return {picks:picks.map(place=>({place,reason:reasonFor(place,answers),biggerOuting:longOuting(place)})),total:ranked.length};
}
