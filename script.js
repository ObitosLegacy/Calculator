$(document).ready(function(){
	
	let input = [];
	let num = [];
	
	const calculator = {
		showInput(key){
			if(key != '=' && key != 'In'){
				$('#screen').append(key);
			}else if(key === 'In'){
				$('#screen').html(input);
			}else{
				$('#screen').html(this.result(input));
			}
		},
		saveInput(key){
			 if(key === '+' || key === '-' || key === '/' || key === '*'){
				 input.push(num.join(''));
				 input.push(key);
				 num = [];
			 }else if(key === '='){
				 input.push(num.join(''));
				 num = [];
			 }else if(key != 'In'){
				 num.push(key);
			 }
		},
		precedence(input){
			
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
		calculator.saveInput(key);
		calculator.showInput(key);
	});
	
});
