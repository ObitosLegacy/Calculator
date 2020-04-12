$(document).ready(function(){
	
	let input = [];
	let num = [];
	let dataCount;
	let data = [];
	let equation = [];
	let anwser = 0;
	let mod=false;
	let modOn = false;
	let numMod = false;
	let modCount = 0;
	let left;
	
	const calculator = {
		reset(){
			for(let i = 0; i<data.length;i++){
				data[i]=data[i].replace("[", "");
				data[i]=data[i].replace("]", "");
			}
			anwser=0;
			data=[];
		},
		selectLeft(key){
			if(modOn===false){
				this.initInput(key);
			}
			data[dataCount] = '[' + data[dataCount] + ']';
			console.log(dataCount);
			dataCount--;
			if(dataCount < 0){
				dataCount = data.length-1;
			}
			mod=true;
			modCount=0;
			numMod=false;
			$('#screen').html(data);
		},
		initInput(key){
			if(key==='L'){
				dataCount = data.length-1;
			}else if(key==='R'){
				dataCount = 0;
			}
			modOn = true;
			mod=false;
			numMod=false;
			modCount=0;
			$('#screen').html(equation);
		},
		saveInput(key){
			if(key === '+' || key === '-' || key === '/' || key === '*'){
				input.push(key);
			}else if(key != "="){
				input.push(key);
			}
			$('#screen').append(key);
		},
		correctNum(){
			let count = 0;
			for(let i=0; i<input.length;i++){
				if(input[i]!="+"){
					data[count]+=input[i];
				}
				if(input[i]==="+"){
					data.push('+');
					count=count+2;
				}
			}
		},
		result(){
			for(let i=0;i<data.length;i++){
				if(i === 0){
					anwser += Number(data[i]);
				}
				switch(data[i]){
					case '+':
						anwser += Number(data[i+1]);
					break;
				}
			}
			$('#screen').html(anwser);
			data=[];
			mod=false;
			numMod=false;
			modCount=0;
		},
		cleanupUndefined(){
			for(let i=0; i<data.length;i++){
				data[i]=data[i].replace("undefined", "");
			}			
		},
		modifyInput(key){
			let newCount = dataCount+1;
			let countDataOp = 0;
			let countInOp = 0;
			let start=0;
			if(newCount===data.length){
				newCount=0;
			}
			for(let i=0;i<newCount;i++){
				if(data[i]==="+"){
					countDataOp++;
				}
			}
			for(let i=0;i<input.length;i++){
				if(input[i]==="+"){
					countInOp++;
				}
				if(countDataOp==countInOp){
					start=i;
					start=start-data[newCount].length+1;
				}
			}
			if(numMod===false){
				input.splice(start,data[newCount].length,key);
				numMod=true;
			}else{
				modCount++;
				input.splice(start+modCount,0,key);
			}
			$('#screen').html(input);
		}
	}
	
	//get value of key in string format
	$('.c-keys').click(function(){
		const key = this.id.replace('c-key', '');
		calculator.correctNum();
		calculator.cleanupUndefined();
		equation = data;
		if(key === 'In'){
			calculator.initInput(key);
		}else if(key === 'L'){
			calculator.selectLeft(key);
		}else if(key === '='){
			calculator.result();
		}else if(mod === true){
			calculator.modifyInput(key);
		}else{
			calculator.saveInput(key);
		}
		calculator.reset();
	});
	
});
