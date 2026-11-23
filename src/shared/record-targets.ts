import type {FillAction} from './types';
/** A DOM target can never represent two different resume records in one plan. */
export function conflictingRecordTargets(actions:FillAction[],targetOf:(id:string)=>object|undefined):Set<string>{
 const targets=new Map<object,{owner:string;ids:string[]}>();const blocked=new Set<string>();
 for(const a of actions){if(!a.source.recordId)continue;const target=targetOf(a.fieldId);if(!target)continue;
  const owner=a.source.section+'::'+a.source.recordId;const existing=targets.get(target);
  if(!existing){targets.set(target,{owner,ids:[a.fieldId]});continue}
  existing.ids.push(a.fieldId);if(existing.owner!==owner||existing.ids.some(id=>blocked.has(id)))for(const id of existing.ids)blocked.add(id);
 }
 return blocked;
}
