
var Engine = Matter.Engine,
//Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

var engine;
var world;
var boxy;
var Render = Matter.Render,
Runner = Matter.Runner,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Vertices = Matter.Vertices,
Svg = Matter.Svg;
var ground;
var options = {
    isStatic: true
}
var loadSvg;

function setup(){
    createCanvas (400, 400);
    engine = Engine.create();
    world = engine.world;
    boxy = Bodies.rectangle(200, 100, 80, 80);
    Engine.run(engine);
    World.add(world,boxy);
    console.log(boxy);
    ground = Bodies.rectangle(200, height, width, 78, options);
    World.add(world, ground);
    
}

function draw() {
    background(51);
    console.log(boxy.position.x);
    rect (boxy.position.x, boxy.position.y, 80, 80);

}


    if (typeof fetch !== 'undefined') {
        var select = function(root, selector) {
            return Array.prototype.slice.call(root.querySelectorAll(selector));
        };

        var loadSvg = function(url) {
            return fetch(url)
                .then(function(response) { return response.text(); })
                .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
        };

        ([
            './svg/svg.svg'
        ]).forEach(function(path, i) { 
            loadSvg(path).then(function(root) {
                var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);

                var vertexSets = select(root, 'path')
                    .map(function(path) { return Vertices.scale(Svg.pathToVertices(path, 30), 0.4, 0.4); });

                World.add(world, Bodies.fromVertices(100 + i * 150, 200 + i * 50, vertexSets, {
                    render: {
                        fillStyle: color,
                        strokeStyle: color,
                        lineWidth: 1
                    }
                }, true));
            });
        });

        loadSvg('./svg/svg.svg').then(function(root) {
            var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
            
            var vertexSets = select(root, 'path')
                .map(function(path) { return Svg.pathToVertices(path, 30); });

            World.add(world, Bodies.fromVertices(400, 80, vertexSets, {
                render: {
                    fillStyle: color,
                    strokeStyle: color,
                    lineWidth: 1
                }
            }, true));
        });
    } else {
        Common.warn('Fetch is not available. Could not load SVG.');
    }
