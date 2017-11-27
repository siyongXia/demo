<template>
	<div>
		<h1>总结</h1>
		<p>Ramda的工具方法都是传入一个函数,再返回一个函数</p>
		<p>Ramda的计算方法都是传入一个参数,再得到一个值</p>
	</div>
</template>
<script>
  import * as R from 'ramda'
	export default {
	  data () {
	    return {
	    }
	  },
	  methods: {	  
	  	replce () {//Replace a substring or regex match in a string with a replacement.
	  		console.log('----------replce----------')
	  		let greet = R.replace('{name}', R.__, 'Hello, {name}!');
				let str = greet('Alice'); //=> 'Hello, Alice!'
				console.log(str);
				let str1 = R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
				let str2 = R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
				let str3 = R.replace(/foo/g, 'bar', 'Foo foo foo'); //=> 'bar foo foo'
				let str4 = R.replace(/foo/gi, 'bar', 'Foo foo foo'); //=> 'bar bar bar'
				let str5 = R.replace(/foo/gi)('bar')('Foo foo foo'); //=> 'bar bar bar'
				console.log(str1)
				console.log(str2)
				console.log(str3)
				console.log(str4)
				console.log(str5)
	  	},
	  	add () {//相加
	  		console.log('----------add----------')
	  		let sum1 = R.add(2, 3);       //=>  5
			let sum2 = R.add(7)(10);      //=> 17
			let sum3 = R.add(7)('10');      //=> 17
			console.log(sum1,sum2,sum3);
	  	},
	  	addIndex(){//添加序号(感觉没什么乱用)
	  		console.log('----------addIndex----------')
	  		const mapIndexed = R.addIndex(R.map);
	  		let result = mapIndexed((item,index)=> index + '-' + item)(['a','b','c','d']);
	  		console.log(result);
	  	},
	  	ajust(){//操作数组中的某一项,第一个参数规则,第二个参数数组的第几项,第三个参数是数组的内容
	  		console.log('----------ajust----------')
	  		let equal = R.equals(3);//全等
	  		let arr1 = R.adjust(R.add(10), 1, [1, 2, 3]); //[1,12,3]
	  		let arr2 = R.adjust(R.add(20))(1)([1, 2, 3]);//[1,22,3]
	  		console.log(arr1);
	  		console.log(arr2);
	  	},
	  	all () {//数组中所有的项是否满足某当个条件(定义某个函数)
	  		console.log('----------all----------')
	  		let equal = R.equals(3);//全等
	  		let result1 = R.all(equal,[1,2,3]);
	  		let result2 = R.all(equal)([3,3]);
	  		let result3 = R.all(equal)(['3',3]);
	  		console.log(result1,result2,result3);
	  	},
	  	allPass () {//某个数据是否满足多个条件(定义多个函数)
	  		console.log('----------allPass----------')
	  		console.log(R.propEq('name','xiasy')({'name':'xiasy'}));
	  		const isQueen = R.propEq('rank', 'Q');//判断对象是否含有某个属性
			const isSpade = R.propEq('suit', '♠');
			const isQueenOfSpades = R.allPass([isQueen, isSpade]);
			const r1 = isQueenOfSpades({rank: 'Q', suit: '♣'}); //=> false
			const r2 =  isQueenOfSpades({rank: 'Q', suit: '♠'}); //=> true
			console.log(r1,r2);
	  	},
	  	always () {//设置常量比较管用,牛逼
	  		console.log('----------always----------')
	  		let a = R.always('1');
	  		console.log(a());
	  	},
	  	and () {//Returns true if both arguments are true; false otherwise.跟&&功能一样
	  		console.log('----------and----------')
	  		let a = R.and('1')('2');
	  		let b = R.and('1')(1);
	  		let c = R.and('1')(3 > 5);
	  		let d = R.and(3 < 5)(5 === 5);
	  		console.log(a,b,c,d);
	  	},
	  	any () {//信息量有点大,慢慢看
	  		console.log('----------any----------')
	  		//R.flip,Returns a new function much like the supplied one, except that the first two arguments' order is reversed.
	  		//R.lt(2, 1); //=> false
	  		// var lessThan0 = R.flip(R.lt)(0);
	  		var lessThan0 = R.flip(R.lt)(0);
			var lessThan2 = R.flip(R.lt)(2);
			var r1 = R.any(lessThan0)([1, 2]); //=> false
			// var r1 = R.any(R.lt(0))([1, 2]); //=> false
			var r2 = R.any(lessThan2)([1, 2]); //=> true
			console.log(r1,r2);
			console.log(R.lt(1)(2));
	  	},
	  	anyPass () {//满足一个条件就行
	  		console.log('----------anyPass----------')
	  		var isClub = R.propEq('suit', '♣');
			var isSpade = R.propEq('suit', '♠');
			var isBlackCard = R.anyPass([isClub, isSpade]);
			console.log(isBlackCard({rank: '10', suit: '♣'}))//=> true
			console.log(isBlackCard({rank: 'Q', suit: '♠'}))//=> true
			console.log(isBlackCard({rank: 'Q', suit: '♦'}))//=> false				 
	  	},
	  	ap () {//applies a list of functions to a list of values.返回的值会concat
	  		console.log('----------ap----------')
	  		console.log(R.ap([R.multiply(2), R.add(3)])([1,2,3])); //=> [2, 4, 6, 4, 5, 6]	
	  		//	貌似不使用[]的时候第一个参数只能使用R.concat
	  	    console.log(R.ap(R.concat, R.toUpper)('Ramda')) ; //=> 'RamdaRAMDA'
	  	},
	  	aperture () {//Returns a new list, composed of n-tuples of consecutive elements. If n is greater than the length of the list, an empty list is returned.
	  		console.log('----------aperture----------')
	  		console.log(R.aperture(2, [1, 2, 3, 4, 5]));//=> [[1, 2], [2, 3], [3, 4], [4, 5]]
	  		console.log(R.aperture(2)([1, 2, 3, 4, 5]));//=> [[1, 2], [2, 3], [3, 4], [4, 5]]
	  		console.log(R.aperture(3, [1, 2, 3, 4, 5]));//=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
	  		console.log(R.aperture(7, [1, 2, 3, 4, 5]));//=> []
	  	},
	  	append () {//Returns a new list containing the contents of the given list, followed by the given element.
	  		console.log('----------append----------')
	  		let r1 = R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
			let r2 = R.append('tests', []); //=> ['tests']
			let r3 = R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
			console.log(r1,r2,r3);
	  	},
	  	apply () {//Returns a new list containing the contents of the given list, followed by the given element.
	  		console.log('----------apply----------')
	  		let nums = [1, 2, 3, -99, 42, 6, 7];
			let r = R.apply(Math.max, nums); //=> 42
			console.log(r);	
	  	},
	  	applySpec () {//对同一个数据进行多种操作,对象分别按照指定的方法进行map
	  		console.log('----------applySpec----------')
	  		var getMetrics = R.applySpec({
			  sum: R.add,
			  nested: { mul: R.multiply }
			});
			getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
	  	},
	  	applyTo () {
	  		console.log('----------applyTo----------')
	  		var t42 = R.applyTo(42);
	  		//R.identity,传入什么就返回什么
			let r1 = t42(R.identity); //=> 42
			let r2 = t42(R.add(1)); //=> 43
			console.log(r1,r2);
	  	},
	  	ascend () {//返回一个比较器
	  		console.log('----------ascend----------')
	  		let byAge = R.ascend(R.prop('age'));
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
			var peopleByYoungestFirst = R.sort(byAge, people);
			console.log(peopleByYoungestFirst);
	  	},
	  	assoc () {//o跟o1指向的地址不一样
	  		let o = {c: 1, b: 2};	  		
	  		let o1 = R.assoc('c', 3, o); //=> {a: 1, b: 2, c: 3}
	  		console.log(o1);
	  		console.log(o);
	  		o.b = 1;
	  		console.log(o1);
	  		console.log(o);
	  	}
	  },
	  mounted () {
  		// this.replce();
  		// this.add();
  		// this.addIndex();
  		// this.ajust();
  		// this.all();
  		// this.allPass();
  		// this.always();
  		// this.and();
  		// this.any();
  		// this.anyPass();
  		// this.ap();
  		// this.aperture();
  		// this.append() 
  		// this.apply();
  		// this.applySpec();
  		// this.applyTo();
  		// this.ascend();
  		// this.assoc();
  		// let f = R.converge(R.concat, [R.identity(1), R.toLower])
  		let a = '嘻嘻哈哈';
  		let f = R.pipe(R.prop('img'), R.concat(a))
  		var getMetrics = R.applySpec({
			  image:f,
			  a: R.prop('a')
			});
  		var obj = {
  			img:'asdasdasd',
  			a:1,
  			b:2
  		}
  		let o = getMetrics(obj)
  		console.log(o);
	 //  	var f = (x, y) => {
		//   	return x += 1;
		// };
		// let r = R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
		// console.log(r);

	  }
}
</script>

<style scoped lang="scss">
	
</style>