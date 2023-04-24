import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function init() {
	// Create a new scene
	const scene = new THREE.Scene();

	// Create a new camera and add it to the scene
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 10, 20);
	scene.add(camera);

	// Create a new renderer and add it to the page
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// Create a new cube and add it to the scene
	const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
	const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	scene.add(cube);

	// Create a new wireframe and add it to the scene
	const wireframe = new THREE.WireframeGeometry(cubeGeometry);
	const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
	const wireframeLines = new THREE.LineSegments(wireframe, lineMaterial);
	scene.add(wireframeLines);

	// Create a new light and add it to the scene
	const light = new THREE.PointLight(0xffffff, 1, 100);
	light.position.set(0, 10, 0);
	scene.add(light);

	// Create camera controls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
	controls.screenSpacePanning = false;
	controls.minDistance = 5;
	controls.maxDistance = 50;
	controls.maxPolarAngle = Math.PI / 2;

	// Define the game loop
	function animate() {
		requestAnimationFrame(animate);

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		wireframeLines.rotation.copy(cube.rotation);

		controls.update();

		renderer.render(scene, camera);
	}

	// Add event listeners for keyboard controls
	window.addEventListener('keydown', event => {
		switch (event.key) {
			case 'w':
				camera.position.z -= 0.1;
				break;
			case 'a':
				camera.position.x -= 0.1;
				break;
			case 's':
				camera.position.z += 0.1;
				break;
			case 'd':
				camera.position.x += 0.1;
				break;
			case ' ':
				camera.position.y += 0.1;
				break;
			case 'Shift':
				camera.position.y -= 0.1;
				break;
		}
	});

	// Start the game loop
	animate();
}


// Call the init function when the page has finished loading
window.addEventListener('load', init);
