import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {recommendPlaces,placeMoods} from '../src/picker.mjs';
const places=JSON.parse(readFileSync(new URL('../src/places.json',import.meta.url))).places;
test('a quick Dubai outing stays local and avoids hikes and outlying day trips',()=>{
 const r=recommendPlaces(places,{start:'Dubai',time:'quick',mood:'all',across:true});
 assert.equal(r.picks.length,3);
 assert.ok(r.picks.every(({place:p})=>p.emirate==='Dubai'&&!['al-qudra-lakes-area','al-rabi-hiking-trail'].includes(p.id)));
});
test('indoor picks respect the mood and do not add outdoor fillers to reach three',()=>{
 const r=recommendPlaces(places,{start:'Dubai',time:'half',mood:'indoor'});
 assert.equal(r.picks.length,2);
 assert.deepEqual(new Set(r.picks.map(x=>x.place.id)),new Set(['mohammed-bin-rashid-library','etihad-museum']));
});
test('a sparse or empty region/mood combination is left empty',()=>{
 assert.equal(recommendPlaces(places,{start:'Umm Al Quwain',time:'quick',mood:'indoor'}).picks.length,0);
});
test('full-day cross-emirate discovery broadens results, but local mode stays within starting emirate',()=>{
 const local=recommendPlaces(places,{start:'Ajman',time:'full',mood:'culture'});
 assert.ok(local.picks.every(x=>x.place.emirate==='Ajman'));
 const broad=recommendPlaces(places,{start:'Ajman',time:'full',mood:'culture',across:true});
 assert.ok(broad.total>local.total);assert.ok(broad.picks.some(x=>x.place.emirate!=='Ajman'));
});
test('changing picks returns valid unique alternatives and never claims live data',()=>{
 const a={start:'Dubai',time:'half',mood:'all'};const first=recommendPlaces(places,a);const next=recommendPlaces(places,a,3);
 assert.notDeepEqual(first.picks.map(x=>x.place.id),next.picks.map(x=>x.place.id));
 assert.equal(new Set(next.picks.map(x=>x.place.id)).size,next.picks.length);
 assert.ok(next.picks.every(x=>!/(minutes|free entry|open now|AED)/i.test(x.reason)));
});
test('all supported combinations respect hard location and mood boundaries',()=>{
 for(const start of new Set(places.map(p=>p.emirate)))for(const time of ['quick','half','full'])for(const mood of ['all','coast','nature','culture','indoor']){
  const r=recommendPlaces(places,{start,time,mood});
  assert.ok(r.picks.length<=3);assert.ok(r.picks.every(x=>x.place.emirate===start));
  assert.ok(r.picks.every(x=>mood==='all'||placeMoods(x.place).includes(mood)));
  assert.ok(r.picks.every(x=>!['mountain-extreme','kefi','dreamland-aqua-park','ajman-heritage-district'].includes(x.place.id)));
 }
});
