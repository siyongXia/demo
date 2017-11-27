//juxt
var getRange = R.juxt([Math.min, Math.max]);
getRange(3, 4, 9, -3); //=> [-3, 9]

//--------------------none--------------------'
//none
var isEven = n => n % 2 === 0;
var isOdd = n => n % 2 === 1;

R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false

//--------------------composeP--------------------
composeP () {//Performs right-to-left composition of one or more Promise-returning functions.适合多个ajax嵌套
	
	var db = {
	  users: {
	    JOE: {
	      name: 'Joe',
	      followers: ['STEVE', 'SUZY']
	    }
	  }
	}

	// We'll pretend to do a db lookup which returns a promise
	var lookupUser = (userId) => Promise.resolve(db.users[userId])
	var lookupFollowers = (user) => Promise.resolve(user.followers)
	lookupUser('JOE').then(lookupFollowers).then((data)=>{
		console.log(data);
	});		
	//  followersForUser :: String -> Promise [UserId]
	var followersForUser = R.composeP(lookupFollowers, lookupUser);
	followersForUser('JOE').then(followers => console.log('Followers:', followers))
	// Followers: ["STEVE","SUZY"]
}

//--------------------cond--------------------
cond () {//多重if条件语句
	console.log('----------cond----------')
	let f0 = ()=>{console.log('hehe..')}
	var fn = R.cond([
	  [R.equals(0),   f0],
	  [R.equals(100), R.always('water boils at 100°C')],
	  [R.T,           temp => 'nothing special happens at ' + temp + '°C']
	]);
	let r1 = fn(0); //=> 'water freezes at 0°C'
	let r2 = fn(50); //=> 'nothing special happens at 50°C'
	let r3 = fn(100); //=> 'water boils at 100°C'
	console.log(r1)
	console.log(r2)
	console.log(r3)
},

//--------------------contains--------------------
contains () {//Returns true if the specified value is equal
	R.contains(3, [1, 2, 3]); //=> true
	R.contains(4, [1, 2, 3]); //=> false
	R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
	R.contains([42], [[42]]); //=> true
},

//-------------------- 分割线 --------------------
dropLastWhile () {//从后往前删,按条件删,满足条件就不删啦
	var lteThree = x => x <= 3;
	R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
	let r = R.dropLastWhile(x => x !== 'd' , 'Radmda'); //=> 'Ramd'
},

//-------------------- 分割线 --------------------
dropRepeats () {
	let r1 = R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
	let arr = [{a:1},{a:1},{b:2},{a:1,b:2}];
	let r2 = R.dropRepeats(arr)
	console.log(r2);
},

//-------------------- 分割线 --------------------
evolve () {//改变对象,很有用呀
	var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
	var transformations = {
	  firstName: R.trim,
	  lastName: R.trim, // Will not get invoked.
	  data: {elapsed: R.add(1), remaining: R.add(-1)}
	};
	R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
},

//-------------------- 分割线 --------------------
filter () {//数组,对象都适用
	var isEven = n => n % 2 === 0;
	R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
	R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
},
find () {//按照某一条件查找数组,返回满足条件的第一项,找不到返回undefined
	var xs = [{a: 1}, {a: 2,b:1}, {a: 3},{a:2}];
	let r1 = R.find(R.propEq('a', 2))(xs); //=> {a: 2}
	R.find(R.propEq('a', 4))(xs); //=> undefined
	var arr = [1,2,3,3,4,5,6,7,8,90];
	let r2 = R.find(R.equals(3))(arr);
	console.log(r1,r2);
},
findIndex () {//按照某一条件查找数组,返回满足条件的第一项的序号,找不到返回-1
	var xs = [{a: 1}, {a: 2}, {a: 3}];
	R.findIndex(R.propEq('a', 2))(xs); //=> 1
	R.findIndex(R.propEq('a', 4))(xs); //=> -1
	var arr = [1,2,3,3,4,5,6,7,8,90];
	console.log(R.findIndex(R.equals(3))(arr));
}
//-------------------- 分割线 --------------------
var double = x => x * 2;

R.map(double, [1, 2, 3]); //=> [2, 4, 6]

R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
//-------------------- 分割线 --------------------
//merge,Create a new object with the own properties of the first object merged with the own properties of the second object. 
//If a key exists in both objects, the value from the second object will be used.
R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
//=> { 'name': 'fred', 'age': 40 }
var resetToDefault = R.merge(R.__, {x: 0});
resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
//-------------------- 分割线 --------------------
//pickBy
var isUpperCase = (val, key) => key.toUpperCase() === key;
R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
//-------------------- 分割线 --------------------
//pipe,Performs left-to-right function composition.
var f = R.pipe(Math.pow, R.negate, R.inc);
f(3, 4); // -(3^4) + 1
//-------------------- 分割线 --------------------
//pipeP,Performs left-to-right composition of one or more Promise-returning functions
var followersForUser = R.pipeP(db.getUserById, db.getFollowers);

//-------------------- 分割线 --------------------
//propEq
var abby = {name: 'Abby', age: 7, hair: 'blond'};
var fred = {name: 'Fred', age: 12, hair: 'brown'};
var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
var alois = {name: 'Alois', age: 15, disposition: 'surly'};
var kids = [abby, fred, rusty, alois];
var hasBrownHair = R.propEq('hair', 'brown');
R.filter(hasBrownHair, kids); //=> [fred, rusty]
//-------------------- 分割线 --------------------
//props
R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]

var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
//-------------------- 分割线 --------------------
//propSatisfies,Returns true if the specified object property satisfies the given predicate; 
R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
//-------------------- 分割线 --------------------
//sortBy
var sortByFirstItem = R.sortBy(R.prop(0));
var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
var pairs = [[-1, 1], [-2, 2], [-3, 3]];
sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
var alice = {
  name: 'ALICE',
  age: 101
};
var bob = {
  name: 'Bob',
  age: -10
};
var clara = {
  name: 'clara',
  age: 314.159
};
var people = [clara, bob, alice];
sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
//-------------------- 分割线 --------------------
//splitWhen
R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
//-------------------- 分割线 --------------------
//type
R.type({}); //=> "Object"
R.type(1); //=> "Number"
R.type(false); //=> "Boolean"
R.type('s'); //=> "String"
R.type(null); //=> "Null"
R.type([]); //=> "Array"
R.type(/[A-z]/); //=> "RegExp"
R.type(() => {}); //=> "Function"
R.type(undefined); //=> "Undefined"
//-------------------- 分割线 --------------------
//unionWith
var l1 = [{a: 1}, {a: 2}];
var l2 = [{a: 1}, {a: 4}];
R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]

//-------------------- 分割线 --------------------
//uniq
R.uniq([1, 1, 2, 1]); //=> [1, 2]
R.uniq([1, '1']);     //=> [1, '1']
R.uniq([[42], [42]]); //=> [[42]]
//-------------------- 分割线 --------------------
//when
var truncate = R.when(
  R.propSatisfies(R.gt(R.__, 10), 'length'),
  R.pipe(R.take(10), R.append('…'), R.join(''))
);
truncate('12345');         //=> '12345'
truncate('0123456789ABC'); //=> '0123456789…'

//-------------------- 分割线 --------------------
//where
// pred :: Object -> Boolean
var pred = R.where({
  a: R.equals('foo'),
  b: R.complement(R.equals('bar')),
  x: R.gt(R.__, 10),
  y: R.lt(R.__, 20)
});

pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
//-------------------- 分割线 --------------------

//-------------------- 分割线 --------------------

//-------------------- 分割线 --------------------

//-------------------- 分割线 --------------------

//-------------------- 分割线 --------------------

//-------------------- 分割线 --------------------

//-------------------- 分割线 --------------------

//-------------------- 分割线 --------------------

//-------------------- 分割线 --------------------

//-------------------- 分割线 --------------------

