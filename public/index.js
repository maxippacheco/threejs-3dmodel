import * as THREE from './threejs/three.module.js';
import {STLLoader} from './threejs/STLLoader.js';
import {OrbitControls} from './threejs/OrbitControls.js';

let scene, camera, renderer, object;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );

    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(object);

    let control = new OrbitControls(camera, renderer.domElement);

    let light = new THREE.DirectionalLight(0xffffff);
    let light2 = new THREE.DirectionalLight(0xffffff);

    light.position.set(0, 0, 10);
    light.position.set(0, 0, -10);
    
    scene.add(light);
    scene.add(light2);

    animate();
}

const animate = () => {
    requestAnimationFrame(animate);  

    object.rotation.z += 0.01;

    renderer.render(scene, camera);
}


let loader = new STLLoader();

loader.load('./3dmodels/liberty2_fixed.stl', (model) => {
    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({color: 'purple'})
    );

    object.scale.set(0.1, 0.1, 0.1);
    object.position.set(0,-5,0);
    object.rotation.x = - Math.PI / 2;

    init();
});

