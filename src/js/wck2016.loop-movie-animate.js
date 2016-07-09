// JavaScript Document
function animate() {
	if(mode =='auto' ){
		if(parent.position.z > goal){
			reset()
		}else{
			parent.position.z = parent.position.z +speed;
			parent2.position.z = parent2.position.z +speed;
		}
		
	}
	requestAnimationFrame( animate );
	TWEEN.update();
	controls.update();
	if(debug){
		stats.update();
	}
	
	render()
}


function reset() {
	$('#container').css('opacity', 0)
	parent.position.z = start;
	parent2.position.z = start;
	$('#container').fadeTo(1000, 1)
}

