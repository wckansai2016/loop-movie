// JavaScript Document

$(function(){
	$.getJSON("json/wp_release.json" , function(data) {
		json = data;
		init();
		animate();
	})
});
	
function init() {
	container = document.getElementById( 'container' );
	//console.log(fps)
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, cameraInitPosition );
	camera.position.x = -100;
	camera.position.y = 0;
	camera.position.z = 500;

	scene = new THREE.Scene();
	scene2 = new THREE.Scene();

	parent = new THREE.Object3D;
	parent2 = new THREE.Object3D;
	
	scene.add( parent );
	scene2.add( parent2 );
	
	
	
	//TimeLine
	createline(
		{x:0, y:linePositionY, z:yearStart},
		{x:0, y:linePositionY, z: -yearLength / 12 * 5}
	)
	
	createPoint('l',{x:0, y:linePositionY, z: -yearLength / 12 * 5})
	

	
	//Year 
	var currentYear = now.getFullYear();
	for(var i = 2003; i < currentYear + 1; i++) {
		var src= '<h2 class="year">' + i + '</h2>';
		var element = createElement(src);
		var object = createObject(element, i);
		object.position.x = 0;
		object.position.y = 0;
		
		createPoint('m',{x:0,y:linePositionY,z:getZPosition(i)})
	}

	//WordPress release date
	var wp = $("#wp"), wc = $("#wc");
	var wpData = json.wp, wcData = json.wc
	
	for(var i = 0; i < wpData.length; i++) {
		var date = dateFix(wpData[i].date)
		var src = '<span class="date">' + date + '<span><h2>v' + wpData[i].version + ' ' +wpData[i].codename + '</h2>';
		var element = createElement(src);
		$(element).addClass="wp";
		var object = createObject(element, wpData[i].date);
		object.position.x = wpXLength  * Math.cos(60 * i / 180 * Math.PI) + wpXLength *2 ;
		
		if(i % 2 == 0 ){
			object.position.y = yLength + yRamdom * (Math.random() - 0.5);
		}else{
			object.position.y = -yLength + yRamdom * (Math.random() - 0.5);
		}
		//object.position.y = Math.random() * yRamdom - yRamdom / 2;
		
		createPoint('s',{x:object.position.x,y:object.position.y,z:object.position.z})
		createPoint('s',{x:0,y:linePositionY,z:object.position.z})
		
	

		createline(
			{x:object.position.x - 0,y:object.position.y, z:object.position.z},
			{x:0,y:linePositionY,z:object.position.z}
		)
	}
	
	//WordCamp hold date
	for(var i = 0; i < wcData.length; i++) {
		var date = dateFix(wcData[i].date)
		var src = '<span class="date">' + date + '</span>' +'<h2>' + wcData[i].name + '</h2>'
		if ('wapuu' in wcData[i]) {
			src += '<img src="img/wapuu/'+ wcData[i].wapuu +'" alt="' + wcData[i].name +'" />'
		}
		
		var element = createElement(src);
		$(element).addClass('wc');
		
		var object = createObject(element, wcData[i].date);
		object.position.x = wpXLength  * Math.cos(60 * i / 180 * Math.PI) - wpXLength *2 ;
		if(i % 2 == 0 ){
			object.position.y = yLength + yRamdom * (Math.random() - 0.5);
		}else{
			object.position.y = -yLength + yRamdom * (Math.random() - 0.5);
		}
		//object.position.y = Math.random() * yRamdom - yRamdom / 2;
		
		createPoint('s',{x:object.position.x,y:object.position.y,z:object.position.z})
		createPoint('s',{x:0,y:linePositionY,z:object.position.z})
		
		createline(
			{x:object.position.x,y:object.position.y,z:object.position.z},
			{x:0,y:linePositionY,z:object.position.z}
		)
	}
	
	//WCK Kansai 2016
	var src = '<img class="wapuu wapuu_hover" src="img/wapuu/wapuu_wck_2016_hover.png" />';
	src += '<img class="wapuu wapuu_headset" src="img/wapuu/wapuu_wck_2016_headset.png" />';
	src += '<span class="date">July / 9,10 / 2016</span>';
	src += '<h1 class="logo"><img src="img/wck_2016_logo.svg"></h1>';
	var element = createElement(src);
	$(element).addClass('wck2016');
	var object = createObject(element, '2017');
	
	
	if(debug){
		stats = new Stats();
		container.appendChild( stats.domElement );
	}
	
	renderer = new THREE.CSS3DRenderer({antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute';
	container.appendChild( renderer.domElement );
	
	renderer2 = new THREE.WebGLRenderer();
	renderer2.setClearColor( 0xFFFFFF );
	renderer2.setPixelRatio( window.devicePixelRatio );
	renderer2.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer2.domElement );
	

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed = 2;
	controls.minDistance = 0;
	controls.maxDistance = 3000;
	
	window.addEventListener( 'resize', onWindowResize, false );
	
	
	
	reset()
	render();
}