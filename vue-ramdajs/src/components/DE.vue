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
			dec () {
				let r = R.dec(42);
				console.log(r);
			},
			descend () {
				//Makes a descending comparator function out of a function that returns a value that can be compared with < and >.
				let  byAge = R.descend(R.prop('age'));
				let people = [
					{
						name:'xia',
						age:11
					},
					{
						name:'xiasi',
						age:150
					},
					{
						name:'xiasy',
						age:20
					}
				];
				let r = R.sort(byAge,people);
			},
			difference () { //返回存在于第一个参数,但是不存在于第二个参数中的所有值
				R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
				R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
				R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
			},
			drop () {//从前往后删
				R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
				R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
				R.drop(3, ['foo', 'bar', 'baz']); //=> []
				R.drop(4, ['foo', 'bar', 'baz']); //=> []
				R.drop(3, 'ramda');               //=> 'da'
			},
			dropLast () {//从后往前删,按个数删
				R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
				R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
				R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
				R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
				R.dropLast(3, 'ramda');               //=> 'ra'       //=> 'da'
			},
			dropLastWhile () {//从后往前删,按条件删,满足条件就不删啦
				var lteThree = x => x <= 3;
				R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
				let r = R.dropLastWhile(x => x !== 'd' , 'Radmda'); //=> 'Ramd'
			},
			dropRepeats () {
				let r1 = R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
				let arr = [{a:1},{a:1},{b:2},{a:1,b:2}];
				let r2 = R.dropRepeats(arr)
				console.log(r2);
			},
			dropRepeatsWith () {
				var arr = [{a:1},{a:1,b:2},{b:2},{c:3}];
				var dropBySameA = R.comparator((a,b) =>a.a === b.a)
				let r = R.dropRepeatsWith(dropBySameA)(arr)
				console.log(r);
			},
			evolve () {//改变对象,很有用呀
				var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
				var transformations = {
				  firstName: R.trim,
				  lastName: R.trim, // Will not get invoked.
				  data: {elapsed: R.add(1), remaining: R.add(-1)}
				};
				R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
			},
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
		},
		mounted(){
			this.dec();
			this.descend();
			this.dropRepeats();
			this.dropRepeatsWith();
			this.evolve();
			this.find();
			this.findIndex();
			var o = [{A:1},{A:1}];
			console.log(R.uniq(o))
		}
	}
</script>

<style scoped lang="scss">
	
</style>