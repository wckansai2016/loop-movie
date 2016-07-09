// JavaScript Document
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer2.setSize( window.innerWidth, window.innerHeight );
	render();
}