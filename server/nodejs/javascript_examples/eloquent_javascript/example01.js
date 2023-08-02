// console.log(range(1,10))
console.log( [1,2,3].toString())


const ranges = [
	{ from: 0 , to: 10 , level:1 },
	{ from: 11 , to: 20 , level:2 },
	{ from: 21 , to: 30 , level:3 }
        ]

let result  = ranges.some(({from,to})=>{
	return  (22 >= from && 22 < to)
})

console.log( result )

let sum = Symbol("name");

// check class extends..
console.log([1] instanceof Array );

let  obj = Object.create(null);
obj['value'] = 5
obj = Object.freeze( obj )
obj.value = 10
console.log( obj )
let a = [1,2,3,4,5]
console.log( a.splice( 2, 1))
console.log( a )
// regEx 

let re1 = new RegExp("abc")
let re2 =/abc/
// 하위 표현식 그룹화 - 한번에 둘이상의 * + 사용하려면 ()사용
let cartoonCrying  =/boo+(hoo+)+/i
console.log( cartoonCrying.test("Boohoooohoohoo"));

function getDate( string ){
	let [_, month, day, year ] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
	return new Date( year, month-1 , day );
}
console.log( getDate("1-30-2003"));
// 단어와 문자열 결제 지정
console.log(/\bcat\b/.test("concatenate"));
// replace 
console.log( "richard choi".replace(/(\w+) (\w+)/g, "$2 $1"))
let s = "the cia and fbi";
console.log( s.replace(/\b(cia|fbi)\b/g, str=>str.toUpperCase())); 





