var debug = false;
var container;
var camera, scene, renderer,scene2, renderer2,controls,stats;
var objects = [];
var json;

var yearLength = 1000,
opDuration = 30000;

var wpXLength = 200,
yLength = 100,
yRamdom = 50,
fps = 60;

var now = new Date();

var yearStart = (now.getFullYear() -2003) * yearLength;
var cameraInitPosition = yearStart + 500;

var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

var parent,parent2;

var mode = 'auto';

var start = -yearStart -1000,
goal = yearLength * 2 + 300,
distance = goal - start,
duration = 30000

console.log(goal)

var speed = distance / (duration / 1000 * 60);

var linePositionY = -20;

var count;
//var countUrl = 'https://wordpress.org/download/counter/?ajaxupdate=1';
var countUrl = 'https://wordpress.org/download/counter/?json=1';



