import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function announceHero3DSettled() {
  document.dispatchEvent(new Event('hero3d:settled'));
}

function initHero3D() {
  var container = document.getElementById('hero-3d');
  if (!container) {
    announceHero3DSettled();
    return;
  }

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (error) {
    container.hidden = true;
    announceHero3DSettled();
    return;
  }

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  var VIEW_DIR = new THREE.Vector3(0, 0.13, 1).normalize();
  var fitHalfWidth = 1.3;
  var fitHalfHeight = 1.3;

  scene.add(new THREE.AmbientLight(0xffffff, 1.1));
  var keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  function render() {
    renderer.render(scene, camera);
  }

  function resize() {
    var rect = container.getBoundingClientRect();
    var width = rect.width || 280;
    var height = rect.height || 280;
    renderer.setSize(width, height);

    var aspect = width / height;
    camera.aspect = aspect;

    var vHalf = THREE.MathUtils.degToRad(camera.fov / 2);
    var hHalf = Math.atan(Math.tan(vHalf) * aspect);
    var margin = 1.02;
    var distance = Math.max(fitHalfHeight / Math.sin(vHalf), fitHalfWidth / Math.sin(hHalf)) * margin;
    camera.position.copy(VIEW_DIR).multiplyScalar(distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    render();
  }
  window.addEventListener('resize', resize);
  resize();

  new GLTFLoader().load(
    'assets/my_computer.glb',
    function (gltf) {
      var model = gltf.scene;

      var box = new THREE.Box3().setFromObject(model);
      var size = new THREE.Vector3();
      var center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      var fitScale = 1.6 / Math.max(size.x, size.y, size.z, 0.0001);
      model.position.set(-center.x * fitScale, -center.y * fitScale, -center.z * fitScale);

      var BASE_ROTATION_X = -0.08;
      var BASE_ROTATION_Y = -0.55;
      var START_SCALE = fitScale * 1.4;
      var END_SCALE = fitScale * 1.0;
      var EXTRA_ROTATION = 1.1;

      model.rotation.set(BASE_ROTATION_X, BASE_ROTATION_Y, 0);
      model.scale.setScalar(START_SCALE);

      scene.add(model);

      // Le modèle ne tourne qu'autour de Y : l'étendue horizontale max pendant
      // la rotation est le rayon du cylindre XZ (invariant en Y), l'étendue
      // verticale ne bouge pas.
      var halfX = (size.x / 2) * START_SCALE;
      var halfY = (size.y / 2) * START_SCALE;
      var halfZ = (size.z / 2) * START_SCALE;
      fitHalfWidth = Math.sqrt(halfX * halfX + halfZ * halfZ);
      fitHalfHeight = halfY;
      resize();

      var reducedMotion = window.PortfolioUtils && window.PortfolioUtils.prefersReducedMotion();
      if (reducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        announceHero3DSettled();
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      // Sous 901px, le Hero (texte + modèle empilés) dépasse largement la
      // hauteur d'un écran de téléphone : épingler la section masquerait le
      // modèle sous le bas de l'écran pendant toute la durée du pin, sans
      // jamais pouvoir le faire défiler jusqu'à la vue. On garde la rotation
      // pilotée par le scroll mais sans figer la page sur mobile.
      var canPin = window.matchMedia('(min-width: 901px)').matches;
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: '+=80%',
        pin: canPin,
        scrub: true,
        onUpdate: function (self) {
          var p = self.progress;
          model.rotation.y = BASE_ROTATION_Y + p * EXTRA_ROTATION;
          model.scale.setScalar(START_SCALE + (END_SCALE - START_SCALE) * p);
          render();
        }
      });
      announceHero3DSettled();
    },
    undefined,
    function (error) {
      console.error('Impossible de charger le modèle 3D :', error);
      container.hidden = true;
      announceHero3DSettled();
    }
  );
}

document.addEventListener('DOMContentLoaded', initHero3D);
