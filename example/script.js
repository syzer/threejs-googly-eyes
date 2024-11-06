import GooglyEyes from "GooglyEyes";
import {
  AmbientLight,
  Clock,
  CubeTextureLoader,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  NoToneMapping,
  PerspectiveCamera,
  Scene,
  SphereBufferGeometry,
  sRGBEncoding,
  WebGLRenderer,
  TextureLoader,
  MeshBasicMaterial,
  PlaneGeometry
} from "three";
import {GLTFLoader} from "./vendor/GLTFLoader.js";

let startEyesPosition
const canvas = document.getElementById("webglContainer");
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true, canvas});
renderer.toneMapping = NoToneMapping;
renderer.outputEncoding = sRGBEncoding;

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (prefersDarkScheme) {
  renderer.setClearColor(0x000000, 1); // Set the background color to black for dark theme
} else {
  renderer.setClearColor(0xffffff, 1); // Set the background color to white for light theme
}

const shakeThreshold = 20;
if ('Accelerometer' in window) {
  const acl = new Accelerometer({frequency: 60});
  acl.addEventListener("reading", () => {
    if (Math.abs(acl.x) > shakeThreshold || Math.abs(acl.y) > shakeThreshold || Math.abs(acl.z) > shakeThreshold) {
      console.log('Shake android')
      startEyesPosition && onShake();
    }
  })
  acl.start();
} else {
  // damn you safari
  if (DeviceMotionEvent && DeviceMotionEvent.requestPermission) {
    DeviceMotionEvent.requestPermission().then(response => {
      if (response === "granted") {
        // damn you safari!!!
        window.addEventListener('devicemotion', (event) => {
          if (Math.abs(event.acceleration.x) > 20 || Math.abs(event.acceleration.y) > 20 || Math.abs(event.acceleration.z) > 20) {
            console.log('Shake ios')
            startEyesPosition && onShake();
          }
        });
      }
    }).catch(console.error);
  }
}

const clock = new Clock(false);

let model;
let eyes;
let oldX;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new Scene();

window.addEventListener("resize", resize);

loadModel();

function loadModel() {
  const textureLoader = new TextureLoader();
  const cowTexture = textureLoader.load('textures/cow_astonished.png');
  const material = new MeshBasicMaterial({ map: cowTexture, transparent: true,
    color: 0xffffff, // can put rainbow colors here
    opacity: 1 // Adjust the opacity value as needed (1.0 is fully opaque)
  });
  const geometry = new PlaneGeometry(4, 4); // Adjust size as needed
  const cowPlane = new Mesh(geometry, material);
  cowPlane.position.set(0, 0, 0.1);

  // Create the white background material
  // const backgroundMaterial = new MeshBasicMaterial({
  //     color: 0x0000ff,
  //     transparent: false,     opacity: 0.5
  // });

// Create the background plane geometry
//     const backgroundGeometry = new PlaneGeometry(4.5, 4.5); // Slightly larger than the cow plane
//     const backgroundPlane = new Mesh(backgroundGeometry, backgroundMaterial);
//     backgroundPlane.position.set(0, 0, 0); // Position it behind the cow plane
// #33B2EA

  initModel({cowModel: cowPlane});
  render()
}

function initModel({gltf, cowModel}) {
  camera.position.set(0, 0, 5);
  eyes = new GooglyEyes(0.15, 0.9);
  // eyes.position.set(0.1, 30, 0.2); // Adjust position as needed
  model = cowModel

  eyes.gravity = 0.5;
  // model = gltf.scene;
  scene.add(model);

  // Lights for eyes
  const light = new DirectionalLight(0xffffff, 1);
  light.position.x = 2.0;
  light.position.z = 2.0;
  light.position.y = 2.0;
  scene.add(light);

  const ambient = new AmbientLight(0xffffff, 0.1);
  scene.add(ambient);

  eyes.position.set(0.15, 0.70, 0.2); // Adjusted y position to move the eyes higher
  eyes.rotation.z = -Math.PI / 8; // Adjust the angle as needed
  startEyesPosition = eyes.position.clone();
  model.add(eyes);

  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", () => oldX = undefined);
  canvas.addEventListener("touchmove", onMouseMove);
  canvas.addEventListener("touchend", () => oldX = undefined);

  clock.start();
  resize();
}

function render() {
  const dt = clock.getDelta();
  eyes.update(dt);
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function onMouseMove(event) {
  move(event.clientX, event.clientY);
}

function move(x, y) {
  x = x / window.innerWidth * 2.0 - 1.0;
  y = -(y / window.innerHeight * 2.0 - 1.0);
  model.position.set(x, y, 0.96).unproject(camera);
}

function onShake() {
  const plusMinus = Math.random() < 0.5 ? 1 : -1;
  eyes.position.x = startEyesPosition.x + (Math.random() + plusMinus * 0.4) * 0.1;
  eyes.position.y = startEyesPosition.y + (Math.random() + plusMinus * 0.4) * 0.1;
  eyes.position.z = startEyesPosition.z + (Math.random() + plusMinus * 0.4) * 0.1;
  setTimeout(() => {
    eyes.position.copy(startEyesPosition);
  }, 400)
}