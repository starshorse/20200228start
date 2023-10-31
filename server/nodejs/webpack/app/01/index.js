import { groupBy , map } from 'lodash-es'
import people from './emp.json' assert { type:'json' }

const managerGroups = groupBy( people, 'manager' );
const emails = map( people, 'email');

console.log( managerGroups , emails ); 






