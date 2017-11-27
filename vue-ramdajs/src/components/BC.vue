<template>
	<div>Demo</div>
</template>
<script>
	import * as R from 'ramda'
	export default {
		data(){
			return {

			}
		},
		methods:{
			bind(){//绑定一个上下文
				console.log('----------bind----------')
				var log = R.bind(console.log, console);
				//R.pipe,串联的函数从左向右执行
				//R.tap,Runs the given function with the supplied object, then returns the object.
				let r = R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
				console.log(r);
			},
			both(){
				console.log('----------both----------')
				let gt10 = R.gt(R.__, 10);
				let lt20 = R.lt(R.__, 20);
				let f = R.both(gt10,lt20);
				let r1 = f(15);
				let r2 = f(30);
				console.log(r1,r2);
			},
			call(){
				console.log('----------call----------')
				let r1 = R.call(R.add, 1, 2); //=> 3
				var indentN = R.pipe(R.repeat(' '),
				                     R.join(''),
				                     R.replace(/^(?!$)/gm));

				var format = R.converge(R.call, [
				                            R.pipe(R.prop('indent'), indentN),
				                            R.prop('value')
				                        ]);
				format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
			},
			chain(){//maps a function over a list and concatenates the results
				console.log('----------chain----------')
				let dulplicate = n => [n, n];
				let r1 = R.chain(dulplicate)([1,2,3]);
				let r2 = R.chain(R.append,R.head)([1,2,3]);
				console.log(r1,r2);
			},
			clone () {//深拷贝,包括嵌套对象
				console.log('----------clone----------')
				var objects = [{}, {}, {}];
				var objectsClone = R.clone(objects);
				let r1 = objects === objectsClone; //=> false
				let r2 = objects[0] === objectsClone[0]; //=> false
				console.log(r1,r2);
			},
			comparator () {//比较器,还挺有用
				console.log('----------comparator----------')
				let byAge = R.comparator((a,b)=>a.age > b.age);
				var people = [
				  {
				  	age:12,
				  	name:'xiaosan'
				  },
				  {
				  	age:18,
				  	name:'xiaosi'
				  },
				  {
				  	age:15,
				  	name:'hehe'
				  }
				];
				let r = R.sort(byAge,people);
				console.log(r);
			},
			complement () {//结果取反
				//isNil:Checks if the input value is null or undefined.
				var isNotNil = R.complement(R.isNil);
				isNil(null); //=> true
				isNotNil(null); //=> false
				isNil(7); //=> false
				isNotNil(7); //=> true
			},
			compose () {//由多个函数组成一个函数,从右向左执行
				console.log('----------compose----------')
				var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
				var yellGreeting = R.compose(R.toUpper, classyGreeting);
				let r1 = yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
				let r2 = R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
			},
			composeP () {//Performs right-to-left composition of one or more Promise-returning functions.适合多个ajax嵌套
				console.log('----------composeP----------')
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
			},
			concat () {//类型需要一样
				console.log('----------concat----------')
				R.concat('ABC', 'DEF'); // 'ABCDEF'
				R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
				R.concat([], []); //=> []
				//console.log(R.concat([4, 5, 6], 3)) // TypeError: 3 is not an array
			},
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
			construct () {
				// Constructor function
				function Animal(kind) {
				  this.kind = kind;
				};
				Animal.prototype.sighting = function() {
				  return "It's a " + this.kind + "!";
				}

				var AnimalConstructor = R.construct(Animal)

				// Notice we no longer need the 'new' keyword:
				let r1 = AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
				var animalTypes = ["Lion", "Tiger", "Bear"];
				var animalSighting = R.invoker(0, 'sighting');
				var sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
				R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
			},
			contains () {//Returns true if the specified value is equal
				R.contains(3, [1, 2, 3]); //=> true
				R.contains(4, [1, 2, 3]); //=> false
				R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
				R.contains([42], [[42]]); //=> true
			},
			converge () {//收敛聚合
				console.log('----------converge----------')
				//Accepts a converging function and a list of branching functions and returns a new function. When invoked, this new function is applied to some arguments, each branching function is applied to those same arguments. The results of each branching function are passed as arguments to the converging function to produce the return value.
				var average = R.converge(R.divide, [R.sum, R.length])
				average([1, 2, 3, 4, 5, 6, 7]) //=> 4
				var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
				strangeConcat("Yodel") //=> "YODELyodel"
				console.log(R.divide(8)(2));
			},
			countBy () {
				//Counts the elements of a list according to how many match each value of a key generated by the supplied function. Returns an object mapping the keys produced by fn to the number of occurrences in the list. Note that all keys are coerced to strings because of how JavaScript objects work.
				console.log('----------countBy----------')
				var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];				
				R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}

				var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
				R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
				var arr = [1,2,3,4,5,6,7,8,9,10];
				var isOdd = (a)=> a % 2 === 0
				let r1 = R.countBy(isOdd)(arr)
				console.log(r1);
			},
			curry () {
				console.log('----------curry----------')
			},
		},
		mounted(){
			this.bind();
			this.both();
			this.call();
			this.converge();
			this.chain();
			this.clone();
			this.comparator();
			// this.composeP();
			this.concat();
			this.cond();
			this.construct();
			this.converge();
			this.countBy();
		}
	}
</script>

<style scoped lang="scss">
	
</style>