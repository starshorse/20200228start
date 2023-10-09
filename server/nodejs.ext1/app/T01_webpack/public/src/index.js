import { groupBy }  from "lodash-es"
import people from "./people.json"


console.log( people )
const last_nameGrp = groupBy( people, "last_name" )
console.log( last_nameGrp )
console.log('test')

const people_html = document.createElement('div')
people_html.innerHTML = `<pre>${ JSON.stringify( last_nameGrp ) }</pre>`
document.body.appendChild( people_html )

const root = document.createElement('div')
root.innerHTML ='<p>HelloWeback</p>'
document.body.appendChild( root) 
