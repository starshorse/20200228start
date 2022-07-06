Javascript Skill 
=================

## hash function. 
```javascript
class DirectAddressTable {
constructor () {
this.table = [];
}
getValue (value = -1) {
return this.table[value];
}
getTable () {
return this.table;
}
}
const myTable = new DirectAddressTable();
myTable.setValue(3);
myTable.setValue(10);
myTable.setValue(90);
console.log(myTable.getTable());

[ <3 empty items>, 3, <6 empty items>, 10, <79 empty items>, 90 ]

Array(91) [
0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90]

function hashFunction (key) {
return key % 10;
}
console.log(hashFunction(102948)); // 8
console.log(hashFunction(191919191)); // 1

const myTableSize = 5;
const myHashTable = new Array(myTableSize);
function hashFunction (key) {
// 들어온 값을 테이블의 크기로 나눠주고 나머지를 반환하면 된다.
return key % myTableSize;
}
myHashTable[hashFunction(1991)] = 1991;
myHashTable[hashFunction(1234)] = 1234;
myHashTable[hashFunction(5678)] = 5678;

```
### 해시의 충돌(Collision)
### 이중해싱(Double Hashing)
그래서 나온 방법이 바로 이중해싱 이다. 말 그대로 해시 함수 를 이중 으로 사용하는 것이다.
하나는 기존과 마찬가지로 최초 해시를 얻을 때 사용 하고, 다른 하나는 충돌이 났을 경우 탐사 이동폭을 얻기
위해 사용 한다. 이렇게 하면 최초 해시로 같은 값이 나오더라도 다시 다른 해시 함수를 거치면서 다른 탐사 이
동폭이 나올 확률이 높기 때문에 매번 다른 공간에 값이 골고루 저장될 확률도 높아진다.

```javascript
const myTableSize = 23; // 테이블 사이즈가 소수여야 효과가 좋다
const myHashTable = [];
const getSaveHash = value => value % myTableSize;
// 스텝 해시에 사용되는 수는 테이블 사이즈보다 약간 작은 소수를 사용한다.
const getStepHash = value => 17 - (value % 17);
const setValue = value => {
let index = getSaveHash(value);
let targetValue = myHashTable[index];
while (true) {
if (!targetValue) {
myHashTable[index] = value;
console.log(`${index}번 인덱스에 ${value} 저장! `);
return;
}
else if (myHashTable.length >= myTableSize) {
console.log('풀방입니다');
return;
}
else {
console.log(`${index}번 인덱스에 ${value} 저장하려다 충돌 발생!ㅜㅜ`);
index += getStepHash(value);
index = index > myTableSize ? index - myTableSize : index;
targetValue = myHashTable[index];
}
}
}
console.log(setValue(1991));
console.log(setValue(6));
console.log(setValue(13));
console.log(setValue(21));
// 13번 인덱스에 1991 저장!
```
이때 테이블 사이즈와 두번째 해시함수에 사용될 수는 둘 다 소수 를 사용하는 것이 좋다. 둘 중에 하나가 소수
가 아니라면 결국 언젠가 같은 해싱이 반복되기 때문이다. 딱 보기에 뭔가 좀 복잡해보이지만 하나하나 뜯어
보면 별 거 없다. 한번 순서대로 살펴보자.
1. 저장할 인덱스를 getSaveHash 해시 함수로 얻는다.
2. 반복문 시작
3. 거기 비었니?
3-1. 비었어? 오케이 저장!
3-2. 사람 있어? 다음 인덱스 내놔! 다시 3으로…
3-3. 풀방이야? 종료합시다.
위 코드를 브라우저 콘솔이나 NodeJS로 실행시켜보면 출력되는 문자열을 통해 이 과정이 어떤 방식으로 흘
러가는 지 대략적으로 알 수 있다.

아까 선형 탐사법 과 제곱 탐사법 을 사용했다면 모두 해시의 결과가 1 이어서 연쇄적으로 충돌이 발생해야 할
값들이지만 이중 해싱 을 사용함으로써 한번의 충돌만으로 모든 값을 저장할 수 있게 되었다. 위에 코드를 복
붙해서 함수를 선언해놨다면 저 콘솔을 여러 번 돌려보고 저장할 값도 바꿔보면서 어떤 식으로 해쉬테이블에
값들이 저장되는지 살펴볼 수 있다. 테이블이 꽉 차면 풀방입니다 가 출력되니까 그때까진 신나게 돌려봐도 된
다

