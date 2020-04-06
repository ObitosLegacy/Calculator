$(document).ready(function(){
	
	let input = [];
	let num = [];
	let inMod;
	let inputOn = false;
	
	const calculator = {
		reset(){
			for(let i = 0; i<input.length;i++){
				input[i] = input[i].replace('[', '');
				input[i] = input[i].replace(']', '');
			}
		},
		selectNum(){
			input[inMod] = '[' + input[inMod] + ']';
			inMod--;
			if(inMod < 0){
				this.initInput();
			}
		},
		initInput(){
			inputOn = true;
			inMod = input.length-1;
		},
		showInput(key){
			if(key === 'In' || key === 'L'){
				$('#screen').html(input);
			}else if(key != '=' && key != 'In' && key != 'L' && inputOn === false){
				$('#screen').append(key);
			}else if(key != '=' && key != 'In' && key != 'L' && inputOn === true){
				$('#screen').html(input);
			}else {
				$('#screen').html(this.result(input));
			}
		},
		saveInput(key){
			 if(key === '+' || key === '-' || key === '/' || key === '*'){
				 input.push(key);
			 }else if(key != "="){
				 input.push(key);
			 }
		},
		result(input){
			let anwser = 0;
			for(let i = 0; i < input.length; i++){
				let val = Number(input[i+1]);
				if(i === 0){
					anwser =Number(input[i]);
				}
				switch(input[i]){
					case '+':
						anwser += val;
					break;     
					case '-':     
						anwser -= val;
					break;      
					case '/':    
						anwser /= val;
					break;       
					case '*':    
						anwser *= val;
					break;
				}
			}
			return anwser;
		}
	};
	
	//get value of key in string format
	$('.c-keys').click(function(){
		const key = this.id.replace('c-key', '');
		if(key === 'In'){
			calculator.initInput();
		}else if(key === 'L'){
			calculator.selectNum();
		}else{
			calculator.saveInput(key);
			calculator.result(key);
		}
		calculator.showInput(key);
		calculator.reset();
	});
	
});
