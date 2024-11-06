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

const canvas = document.getElementById("webglContainer");
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true, canvas});
renderer.toneMapping = NoToneMapping;
renderer.outputEncoding = sRGBEncoding;
const clock = new Clock(false);

let model;
let eyes;
let oldX;


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new Scene();

window.addEventListener("resize", resize);

loadModel();

function loadModel()
{
    const textureLoader = new TextureLoader();
    const cowTexture = textureLoader.load('textures/cow_astonished.png');
    const material = new MeshBasicMaterial({ map: cowTexture, transparent: true, color: 0xffffff,     opacity: 1 // Adjust the opacity value as needed (1.0 is fully opaque)
    });
    // const material = new MeshBasicMaterial({   uniforms: {
    //         texture: { value: cowTexture }
    //     },
    //     // vertexShader: `
    //     //     varying vec2 vUv;
    //     //     void main() {
    //     //         vUv = uv;
    //     //         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //     //     }
    //     // `,
    // //     fragmentShader: `
    // //     uniform sampler2D texture;
    // //     varying vec2 vUv;
    // //     void main() {
    // //         vec4 color = texture2D(texture, vUv);
    // //         // Make the texture more white
    // //         color.rgb = mix(color.rgb, vec3(1.0), 0.5);
    // //         // Add alpha transparency on black
    // //         if (color.r < 0.5 && color.g < 0.5 && color.b < 0.5) {
    // //             color.a = 0.0;
    // //         }
    // //         gl_FragColor = color;
    // //     }
    // // `,
    //     // transparent: true
    // });
    const geometry = new PlaneGeometry(4, 4); // Adjust size as needed
    const cowPlane = new Mesh(geometry, material);
    cowPlane.position.set(0, 0, 0.1);

// Create the white background material
    const backgroundMaterial = new MeshBasicMaterial({ color: 0xffffff, transparent: false,     opacity: 0  });

// Create the background plane geometry
    const backgroundGeometry = new PlaneGeometry(4.5, 4.5); // Slightly larger than the cow plane
    const backgroundPlane = new Mesh(backgroundGeometry, backgroundMaterial);
    backgroundPlane.position.set(0, 0, 0); // Position it behind the cow plane

// Add the planes to the scene
//     scene.add(backgroundPlane);
//     scene.add(cowPlane);


    // Add googly eyes to the cow
    // eyes = new GooglyEyes(0.15, 0.35);
    // eyes.position.set(0, 0, 0.2); // Adjust position as needed
    // cowPlane.add(eyes);

    // const loader = new GLTFLoader()
    // loader.load("Suzanne.gltf", gltf => {
    //     initModel(gltf);
    //     loadSkybox();
    // });
    initModel({cowModel: cowPlane});
    loadSkybox()
}

function initModel({gltf, cowModel})
{
    camera.position.set(0, 0, 5);
    eyes = new GooglyEyes(0.15, 0.9);
    // eyes.position.set(0.1, 30, 0.2); // Adjust position as needed
    model = cowModel

    console.debug(eyes);
    '{"metadata":{"version":4.5,"type":"Object","generator":"Object3D.toJSON"},"geometries":[{"uuid":"7EB4106B-92E4-47E6-B45F-7257562D601A","type":"SphereGeometry","radius":0.15,"widthSegments":6,"heightSegments":12,"phiStart":3.141592653589793,"phiLength":6.283185307179586,"thetaStart":0,"thetaLength":3.141592653589793},{"uuid":"A7CDC89E-BCCC-47DA-963D-B2AF29187961","type":"SphereGeometry","radius":0.075,"widthSegments":6,"heightSegments":12,"phiStart":0,"phiLength":6.283185307179586,"thetaStart":0,"thetaLength":3.141592653589793},{"uuid":"0DCC85C9-1CFE-42A6-9200-44268578BBC3","type":"SphereGeometry","radius":0.15,"widthSegments":6,"heightSegments":12,"phiStart":0,"phiLength":3.141592653589793,"thetaStart":0,"thetaLength":3.141592653589793}],"materials":[{"uuid":"4550B8C6-94A0-454F-941B-87433DA33692","type":"MeshStandardMaterial","color":16777215,"roughness":0.3,"metalness":0,"emissive":0,"depthFunc":3,"depthTest":true,"depthWrite":true,"colorWrite":true,"stencilWrite":false,"stencilWriteMask":255,"stencilFunc":519,"stencilRef":0,"stencilFuncMask":255,"stencilFail":7680,"stencilZFail":7680,"stencilZPass":7680},{"uuid":"8A600694-F000-497E-96CB-D4612811D18B","type":"MeshStandardMaterial","color":328965,"roughness":0.2,"metalness":0,"emissive":0,"depthFunc":3,"depthTest":true,"depthWrite":true,"colorWrite":true,"stencilWrite":false,"stencilWriteMask":255,"stencilFunc":519,"stencilRef":0,"stencilFuncMask":255,"stencilFail":7680,"stencilZFail":7680,"stencilZPass":7680},{"uuid":"95C1BD20-42C6-428A-8693-3229B9BF287F","type":"MeshStandardMaterial","color":0,"roughness":0.01,"metalness":0,"emissive":0,"blending":2,"transparent":true,"depthFunc":3,"depthTest":true,"depthWrite":true,"colorWrite":true,"stencilWrite":false,"stencilWriteMask":255,"stencilFunc":519,"stencilRef":0,"stencilFuncMask":255,"stencilFail":7680,"stencilZFail":7680,"stencilZPass":7680}],"object":{"uuid":"9073E1C5-1C2D-4EB3-8C31-7290CE63C3C4","type":"Group","layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,0.01,0.5,0.2,1],"children":[{"uuid":"E141EAA6-C543-443A-831E-C1FDC37210A5","type":"Mesh","layers":1,"matrix":[0.9950041652780258,0,-0.09983341664682815,0,0,1,0,0,0.09983341664682815,0,0.9950041652780258,0,-0.325,0,0,1],"geometry":"7EB4106B-92E4-47E6-B45F-7257562D601A","material":"4550B8C6-94A0-454F-941B-87433DA33692","children":[{"uuid":"A9C140BE-BF44-4553-A1BA-E5FC6392CC9E","type":"Mesh","layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,-0.000008247018996216337,-0.07499999954657785,0,1],"geometry":"A7CDC89E-BCCC-47DA-963D-B2AF29187961","material":"8A600694-F000-497E-96CB-D4612811D18B"},{"uuid":"6C10EA92-2EA9-454C-BCAC-0780514BAB65","type":"Mesh","layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"geometry":"0DCC85C9-1CFE-42A6-9200-44268578BBC3","material":"95C1BD20-42C6-428A-8693-3229B9BF287F"}]},{"uuid":"1A8152D5-0DE4-4777-8860-B3E6384CB88D","type":"Mesh","layers":1,"matrix":[0.9950041652780258,0,0.09983341664682815,0,0,1,0,0,-0.09983341664682815,0,0.9950041652780258,0,0.325,0,0,1],"geometry":"7EB4106B-92E4-47E6-B45F-7257562D601A","material":"4550B8C6-94A0-454F-941B-87433DA33692","children":[{"uuid":"0665CDE1-0514-497C-A044-65EDB0CB0749","type":"Mesh","layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,-0.000008518326133571469,-0.07499999951625413,0,1],"geometry":"A7CDC89E-BCCC-47DA-963D-B2AF29187961","material":"8A600694-F000-497E-96CB-D4612811D18B"},{"uuid":"58E678C9-5368-4586-84FE-248E8BD2F2C1","type":"Mesh","layers":1,"matrix":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"geometry":"0DCC85C9-1CFE-42A6-9200-44268578BBC3","material":"95C1BD20-42C6-428A-8693-3229B9BF287F"}]}]}}'
    eyes.gravity = 0.5;
    // model = gltf.scene;
    scene.add(model);

    const light = new DirectionalLight(0xffffff, 1);
    light.position.x = 2.0;
    light.position.z = 2.0;
    light.position.y = 2.0;
    scene.add(light);

    const ambient = new AmbientLight(0xffffff, 0.1);
    scene.add(ambient);

    // eyes.position.y = 0.25;
    // eyes.position.z = 0.9;
    eyes.position.set(0.15, 0.70, 0.2); // Adjusted y position to move the eyes higher
    eyes.rotation.z = -Math.PI / 8; // Adjust the angle as needed

    model.add(eyes);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", () => oldX = undefined);
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchend", () => oldX = undefined);

    clock.start();
    // init position
    resize();
}

// this is taken from the THREE LightProbe example
function loadSkybox() {
    // // envmap
    // const genCubeUrls = function (prefix, postfix) {
    //
    //     return [
    //         prefix + 'px' + postfix, prefix + 'nx' + postfix,
    //         prefix + 'py' + postfix, prefix + 'ny' + postfix,
    //         prefix + 'pz' + postfix, prefix + 'nz' + postfix
    //     ];
    //
    // };

    // const urls = genCubeUrls('textures/cube/pisa/', '.png');

    // new CubeTextureLoader().load(urls, function (cubeTexture) {
    //
    //     cubeTexture.encoding = sRGBEncoding;
    //
    //     scene.background = cubeTexture;
    //
    //     const geometry = new SphereBufferGeometry(5, 64, 32);
    //     //const geometry = new THREE.TorusKnotGeometry( 4, 1.5, 256, 32, 2, 3 );
    //
    //     const material = new MeshStandardMaterial({
    //         color: 0xffffff,
    //         metalness: 0,
    //         roughness: 0,
    //         envMap: cubeTexture,
    //         envMapIntensity: 1.0,
    //     });
    //
    //     // mesh
    //     const mesh = new Mesh(geometry, material);
    //     scene.add(mesh);
    //
    //     scene.traverse(obj => {
    //         if (obj.isMesh) {
    //             obj.material.envMap = cubeTexture;
    //         }
    //     })
    //
    //     render();
    //
    // });
        render()
}

function render()
{
    const dt = clock.getDelta();
    eyes.update(dt);
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}


function resize()
{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function onMouseMove(event)
{
    if (event.buttons & 0x1)
        rotate(event.clientX);

    move(event.clientX, event.clientY);
}

function onTouchMove(event)
{
    if (event.touches.length > 1)
        rotate(event.touches[0].clientX);

    move(event.touches[0].clientX, event.touches[0].clientY);
}

function rotate(x)
{
    if (oldX !== undefined) {
        const dx = oldX - x;
        model.rotation.y -= dx / window.innerWidth * 10.0;
    }

    oldX = x;
}

function move(x, y)
{
    x = x / window.innerWidth * 2.0 - 1.0;
    y = -(y / window.innerHeight * 2.0 - 1.0);
    model.position.set(x, y, 0.96).unproject(camera);
}
