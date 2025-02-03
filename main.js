//ROTATE ANIMATION////////////////////////////////////////////////////////////////////////
////animacija za rotiranje jakne kad promenis boju
let rotateY;
function createRotateYAnimation() {
  rotateY = new BABYLON.Animation(
    "rotateY",

    "rotation.y",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  let keyFramesrotateY = [];

  keyFramesrotateY.push({
    frame: 0,
    value: 0,
  });

  keyFramesrotateY.push({
    frame: 60,
    value: 2 * Math.PI,
  });

  // keyFramesrotateY.push({
  //   frame: 60,
  //   value: 0,
  // });
  rotateY.setKeys(keyFramesrotateY);
  const easingFunction = new BABYLON.CircleEase();
  easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  rotateY.setEasingFunction(easingFunction);
}

let slinfShotToPosition;
function createSlingShotToPositionAnimation() {
  slinfShotToPosition = new BABYLON.Animation(
    "slinfShotToPosition",
    "rotation.y",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  let keyFramesrotateToPosition = [];

  keyFramesrotateToPosition.push({
    frame: 0,
    value: 0,
  });

  keyFramesrotateToPosition.push({
    frame: 60,
    value: 0,
  });

  slinfShotToPosition.setKeys(keyFramesrotateToPosition);
  const easingFunction = new BABYLON.ElasticEase();
  easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
  slinfShotToPosition.setEasingFunction(easingFunction);
}

// const easingFunction = new BABYLON.BounceEase();
// easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

// const easingFunction = new BABYLON.ElasticEase();
// easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

//slinjg shot rotate to get beack to original position

//STOP SCROLL UNTIOL LOADED////////////////////////////////////////////////////////////////////////

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

disableScroll(); //call disableScroll function to stop scrollin until scene is laoded

///////////////////////////////////////////////////////////////////////////////////////////

//SCROLL TO TOP WHEN STARTEDG////////////////////////////////////////////////////////////////////////
window.onbeforeunload = function () {
  currentScrollPosition = 0;
  targetScrollPosition = 0;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
};

//BABYLON////////////////////////////////////////////////////////////////////////

//loading screen
const loadingScreen = document.getElementById("customLoadingScreenDiv");
loadingScreen.style.opacity = 1;

var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

//LOADING
BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
  if (document.getElementById("customLoadingScreenDiv")) {
    // Do not add a loading screen if there is already one
    // document.getElementById('customLoadingScreenDiv').style.display = 'initial';
    return;
  }
};
BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function () {
  // loadingPage.remove();
  // document.getElementById('customLoadingScreenDiv').style.display = 'none';
  document.getElementById("scrollTo").style.opacity = 1;
};
//end of loading

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};
var createScene = async function () {
  //loading
  engine.displayLoadingUI();
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  // scene.clearColor = BABYLON.Color3.FromHexString("#ffffff");
  // scene.clearColor = BABYLON.Color3.FromHexString("#1b1b1b");

  //BABYLON CAMERA////////////////////////////////////////////////////////////////////////
  //camera starting position to try to match blender camera
  let satrtingPosX = 0; //0.03
  let satrtingPosY = 1.3; //0.95
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    0,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);
  camera.setPosition(new BABYLON.Vector3(satrtingPosX, satrtingPosY, 4.05));
  camera.lowerBetaLimit = 0.5;

  camera.attachControl(canvas, true);
  camera.minZ = 0.01;
  camera.lowerRadiusLimit = 2;
  camera.upperRadiusLimit = 20;
  camera.wheelDeltaPercentage = 0.01;

  // viewCamera.pinchDeltaPercentage = 100
  camera.useNaturalPinchZoom = true;
  // console.log(viewCamera.useNaturalPinchZoom)

  delete camera.lowerBetaLimit;
  delete camera.upperBetaLimit;

  // viewCamera.upperBetaLimit = 1.8;
  camera.fov = 0.5;
  //   camera.target = scene.getMeshByName("Animator");

  // camera.inputs.attached.keyboard.detachControl();

  // camera.angularSensibilityX = 1000000;
  // camera.angularSensibilityY = 1000000;

  // camera target
  var cameraTarget = new BABYLON.MeshBuilder.CreateBox(
    "cameraTarget",
    { width: 1, height: 1, depth: 1 },
    scene
  );
  cameraTarget.position = new BABYLON.Vector3(satrtingPosX, satrtingPosY, 0);
  camera.target = cameraTarget;
  cameraTarget.isVisible = false;

  //LOAD MESHES////////////////////////////////////////////////////////////////////////
  let loadePercent = 0;
  let result = await Promise.all([
    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "Jakna6(Sa svetlima).glb",
      null,
      scene,
      (evt) => {
        if (evt.lengthComputable) {
          loadePercent = (evt.loaded * 100) / evt.total;
          loadePercent = loadePercent.toFixed();
        } else {
          loadePercent = (evt.loaded * 100) / 2245516;
          loadePercent = loadePercent.toFixed();
        }
        loadingPercentages.innerHTML = `${loadePercent}%`;
        loadingLine.style.width = `${loadePercent * 0.2}%`;
      }
    ),
    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "Kamera1.glb",
      null,
      scene,
      (evt) => { }
    ),
    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "clouds.glb",
      null,
      scene,
      (evt) => { }
    ),
  ]);

  // document.getElementById("testDiv").onclick = () => {
  //   console.log("clicked");
  //   // scene.animationGroups[1].play(false); //rotating animacija
  //   startSlingShotAnimation(jacketRoot);
  // };

  let jacketRoot = result[0].meshes[0];

  //SET MESHES////////////////////////////////////////////////////////////////////////
  jacketRoot.rotationQuaternion = null;
  result[1].meshes[0].rotationQuaternion = null;
  result[2].meshes[0].rotationQuaternion = null;

  //add rotation animation to the jakna
  // jacketRoot.rotation.z = -0.3;
  // jacketRoot.position.x = -0.4;


  createRotateYAnimation();
  const rotateYAnimationGroup = new BABYLON.AnimationGroup(
    "rotateYAnimationGroup"
  );
  rotateYAnimationGroup.addTargetedAnimation(rotateY, jacketRoot);
  rotateYAnimationGroup.speedRatio = 1.3;

  function playRotateYAnimation() {
    scene.animationGroups[1].play(false);
    console.log(jacketRoot.rotation.y);
    setTimeout(() => {
      jacketRoot.rotation.y = 0;
      console.log(jacketRoot.rotation.y);
    }, 800);//get back to 0 when rotation is done
  }



  createSlingShotToPositionAnimation();

  const slingShotToPositionAnimationGroup = new BABYLON.AnimationGroup(
    "slingShotToPositionAnimationGroup"
  );
  slingShotToPositionAnimationGroup.addTargetedAnimation(
    slinfShotToPosition,
    jacketRoot
  );
  slingShotToPositionAnimationGroup.speedRatio =1;

  function startSlingShotAnimation(mesh) {
    console.log(mesh.rotation.y);
    scene.animationGroups[2]._targetedAnimations[0].animation._keys[0].value =
      mesh.rotation.y;
    scene.animationGroups[2].play(false);
  }

  //SET MATERIALS////////////////////////////////////////////////////////////////////////

  for (let i = 1; i < result[0].meshes.length; i++) {
    if (
      result[0].meshes[i].material.name === "InnerColor(Stripes)" ||
      result[0].meshes[i].material.name === "Outer Color(Stripes)" ||
      result[0].meshes[i].material.name === "TextileColor"
    ) {
      result[0].meshes[i].material.lightmapTexture = new BABYLON.Texture(
        // "Shadows10(Linije)4k.png",
        "Shadows10(Linije)2k.jpg",
        scene
      );
      result[0].meshes[i].material.lightmapTexture.uScale = 1; //and/or the following for vScale:
      result[0].meshes[i].material.lightmapTexture.vScale = -1; //(-1.0 or some other value)
      result[0].meshes[i].material.useLightmapAsShadowmap = true;
    }
  }

  //   console.log(result[0].meshes[3].material.bumpTexture.level)
  scene.getMaterialByName("InnerColor(Stripes)").bumpTexture.level = 1;
  scene.getMaterialByName("Outer Color(Stripes)").bumpTexture.level = 1;


  //BLENDER CAMERA////////////////////////////////////////////////////////////////////////
  //.position.clone()
  scene.activeCamera = scene.cameras[1];
  scene.activeCamera.fov = 0.45;
  // scene.activeCamera.attachControl(canvas, true);
  scene.animationGroups[0].pause();

  //ROTATION OF MESH/////////////////////////////////////////////////////////////////

  var clicked = false;
  var currentPosition = { x: 0, y: 0 };
  var currentRotation = { x: 0, y: 0 };
  //variables to set last angle and curr angle in each frame
  //so we can calculate angleDiff and use it for inertia
  var lastAngleDiff = { x: 0, y: 0 };
  var oldAngle = { x: 0, y: 0 };
  var newAngle = { x: 0, y: 0 };
  //variable to check whether mouse is moved or not in each frame
  var mousemov = false;
  //framecount reset and max framecount(secs) for inertia
  var framecount = 0;
  var mxframecount = 120; //4 secs at 60 fps

  // scene.beforeRender = function () {
  //   //set mousemov as false everytime before the rendering a frame
  //   mousemov = false;
  // };

  scene.afterRender = function () {
    updateScroll();
    //set mousemov as false everytime before the rendering a frame
    mousemov = false;
    //we are checking if the mouse is moved after the rendering a frame
    //will return false if the mouse is not moved in the last frame
    //possible drop of 1 frame of animation, which will not be noticed
    //by the user most of the time
    if (!mousemov && framecount < mxframecount) {
      //console.log(lastAngleDiff);
      //divide the lastAngleDiff to slow or ease the animation
      lastAngleDiff.x = lastAngleDiff.x / 1.1;
      lastAngleDiff.y = lastAngleDiff.y / 1.1;
      //apply the rotation
      jacketRoot.rotation.x += lastAngleDiff.x;
      // jacketRoot.rotation.y += lastAngleDiff.y
      //increase the framecount by 1

      //this doesnt make sense right now as it resets
      //after reaching max and continues in the loop
      //thinking of a way to fix it
      framecount++;

      currentRotation.x = jacketRoot.rotation.x;
      // currentRotation.y = jacketRoot.rotation.y;
    } else if (framecount >= mxframecount) {
      framecount = 0;
    }
  };

  canvas.addEventListener("pointerdown", function (evt) {
    scene.animationGroups[2].stop();//stop slinshot animation
    currentPosition.x = evt.clientX;
    // currentPosition.y = evt.clientY;
    currentRotation.x = jacketRoot.rotation.x;
    // currentRotation.y = jacketRoot.rotation.y;
    clicked = true;
  });

  canvas.addEventListener("pointermove", function (evt) {
    if (clicked) {
      //set mousemov as true if the pointer is still down and moved
      mousemov = true;
    }
    if (!clicked) {
      return;
    }
    //set last angle before changing the rotation
    oldAngle.x = jacketRoot.rotation.x;
    // oldAngle.y = jacketRoot.rotation.y;
    //rotate the mesh
    jacketRoot.rotation.y -= (evt.clientX - currentPosition.x) / 300.0;

    //jacketRoot.rotation.x -= (evt.clientY - currentPosition.y) / 300.0;
    //set the current angle after the rotation

    newAngle.x = jacketRoot.rotation.x;
    // newAngle.y = jacketRoot.rotation.y;
    //calculate the anglediff
    lastAngleDiff.x = newAngle.x - oldAngle.x;
    lastAngleDiff.y = newAngle.y - oldAngle.y;
    currentPosition.x = evt.clientX;
    // currentPosition.y = evt.clientY;
  });

  canvas.addEventListener("pointerup", function (evt) {
    clicked = false;
    startSlingShotAnimation(jacketRoot);
  });

  //LIGHTS////////////////////////////////////////////////////////////////////////

  var dirLight = new BABYLON.DirectionalLight(
    "light",
    new BABYLON.Vector3(0, -1, 0),
    scene
  );
  dirLight.position = new BABYLON.Vector3(0, 8, 0);
  dirLight.intensity = 0;

  let light2Pos = new BABYLON.Vector3(-0.07, 2.1, -0.3);//0.07, 2.3, -0.5
  let light2fake = new BABYLON.MeshBuilder.CreateBox(
    "light2fake",
    { width: 0.1, height: 0.1, depth: 0.1 },
    scene
  );
  light2fake.position = light2Pos;
  light2fake.isVisible = false;

  const light2 = new BABYLON.PointLight("light2", light2Pos, scene);
  light2.diffuse = new BABYLON.Color3(1, 0.8, 0.7);
  // light2.diffuse = BABYLON.Color3.FromHexString("#fffece");
  light2.specular = new BABYLON.Color3(1, 0.8, -0.6);
  light2.intensity = 3;//3.9

  // let light3Pos = new BABYLON.Vector3(1, 2.3, 0.3);
  // let light3fake = new BABYLON.MeshBuilder.CreateBox(
  //   "light3fake",
  //   { width: 0.1, height: 0.1, depth: 0.1 },
  //   scene
  // );
  // light3fake.position = light3Pos;
  // light3fake.isVisible = false;

  // const light3 = new BABYLON.PointLight("light3", light3Pos, scene);
  // light3.diffuse = new BABYLON.Color3(1, 1, 1);
  // light3.specular = new BABYLON.Color3(1, 0.8, -0.6);
  // light3.intensity = 1;

  // let light4Pos = new BABYLON.Vector3(-1, 2.3, 0.3);
  // let light4fake = new BABYLON.MeshBuilder.CreateBox(
  //   "light4fake",
  //   { width: 0.1, height: 0.1, depth: 0.1 },
  //   scene
  // );
  // light4fake.position = light4Pos;
  // light4fake.isVisible = false;

  // const light4 = new BABYLON.PointLight("light4", light4Pos, scene);
  // light4.diffuse = new BABYLON.Color3(1, 1, 1);
  // light4.specular = new BABYLON.Color3(1, 0.8, 0.6);
  // light4.intensity = 1;

  //ENVIRONMENT////////////////////////////////////////////////////////////////////////
  scene.environmentTexture = new BABYLON.CubeTexture(
    "studio.env",
    scene
  );

  scene.environmentTexture.rotationY = 0;
  scene.environmentIntensity = 1.5; //1.3.



  //SHADOWS////////////////////////////////////////////////////////////////////////
  var shadowGenerator = new BABYLON.ShadowGenerator(256, dirLight);
  shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.useKernelBlur = true;
  shadowGenerator.blurKernel = 64;
  shadowGenerator.setDarkness(0);

  shadowGenerator.addShadowCaster(jacketRoot, true); //    add shadow caster to the first mesh

  //ENVIORMENT HELPER////////////////////////////////////////////////////////////////////////
  var enviormentHelper = scene.createDefaultEnvironment({
    enableGroundShadow: true,
    // cameraExposure: 0.01
  });
  enviormentHelper.setMainColor(BABYLON.Color3.FromHexString("#738890")); //6f8a94 #738890 #708a93 #517891 #a0d9ef #64707f #080808
  enviormentHelper.ground.position.y = 0.7;

      //CONTRAST AND EXPOSURE////////////////////////////////////////////////////////////////////////
  // console.log(
  //   scene.imageProcessingConfiguration.exposure,
  //   scene.imageProcessingConfiguration.contrast
  // );
  scene.imageProcessingConfiguration.contrast = 1.7;//1.8
  scene.imageProcessingConfiguration.exposure = 1.2;//1.2
  // console.log(
  //   scene.imageProcessingConfiguration.exposure,
  //   scene.imageProcessingConfiguration.contrast
  // );


  //SCROLL SETTINGS////////////////////////////////////////////////////////////////////////
  var frame = 0;
  let oldValue = 0;
  let newValue = 0;

  let currentScrollPosition = 0;
  let targetScrollPosition = 0;
  const smoothFactor = 0.01; // Adjust this value between 0 and 1 (lower = smoother but slower)

  // Helper function for smooth interpolation
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  //scroll event listener
  window.addEventListener(
    "scroll",
    function () {
      targetScrollPosition = window.pageYOffset;
    },
    { passive: true }
  );

  // Create a new animation loop for smooth scrolling
  function updateScroll() {

    // console.log(currentScrollPosition);
    
    currentScrollPosition = lerp(
      currentScrollPosition,
      targetScrollPosition,
      smoothFactor
    );
    // console.log(currentScrollPosition);
    //loading screen
    if (currentScrollPosition > 50) {
      loadingScreen.style.opacity = 0;
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 1200);
    }

    if (scene && scene.animationGroups[0] && currentScrollPosition > 1000) {
      newValue = currentScrollPosition;

      if (oldValue < newValue) {
        frame = (currentScrollPosition - 1000) / 35;//bigger number = slower scroll
      } else if (oldValue > newValue) {
        frame = (currentScrollPosition - 1000) / 35;
      }


      oldValue = newValue;

      if (window.innerWidth > window.innerHeight) {
        scene.animationGroups[0].goToFrame(frame);
      } else {
        scene.animationGroups[0].goToFrame(frame);
      }
    }

    //starting zones
    if (currentScrollPosition > 1000 && currentScrollPosition < 18000) {
      ellipseZone.style.opacity = 0;
      weDesignGreatFabrics.style.opacity = 0;
      weAreCreatorsZone.style.opacity = 0;
      producersZone.style.opacity = 0;
    } else {
      ellipseZone.style.opacity = 1;
      weDesignGreatFabrics.style.opacity = 1;
      weAreCreatorsZone.style.opacity = 0.5;
      producersZone.style.opacity = 0.5;
    }

    //textural variety

    if (currentScrollPosition > 3500 && currentScrollPosition < 5000) {
      texturalVarietyZone.style.opacity = 0.8;
      boldPatternsZone.style.opacity = 0.8;
    } else {
      texturalVarietyZone.style.opacity = 0;
      boldPatternsZone.style.opacity = 0;
    }

    //color exploration


    if (currentScrollPosition > 7000 && currentScrollPosition < 9000) {
      colorExplorationZone.style.opacity = 0.8;
    } else {
      colorExplorationZone.style.opacity = 0;
    }

    //sustainable materials


    if (currentScrollPosition > 10500 && currentScrollPosition < 12500) {
      sustainableMaterialsZone.style.opacity = 0.8;
    } else {
      sustainableMaterialsZone.style.opacity = 0;
    }

    //novel fabric designs


    if (currentScrollPosition > 14000 && currentScrollPosition < 15500) {
      novelFabricDesignsZone.style.opacity = 0.8;
      functionalFabricsZone.style.opacity = 0.8;
    } else {
      novelFabricDesignsZone.style.opacity = 0;
      functionalFabricsZone.style.opacity = 0;
    }
  }
  //call updateScroll function
  // updateScroll();

  // Keep the CSS smooth scroll as a fallback
  document.documentElement.style.scrollBehavior = "smooth";


  //CLOUDS////////////////////////////////////////////////////////////////////////
  // console.log(result[2].meshes);
  let cloud1 = result[2].meshes[1];
  let cloud2 = result[2].meshes[2];
  let cloud3 = result[2].meshes[3];

  cloud1.isVisible = false;
  cloud2.isVisible = false;
  cloud3.isVisible = false;

  // CLONE AND CREATE CLOUDS
  let cloudClone1 = cloud1.clone("cloudClone1");
  cloudClone1.isVisible = true;
  cloudClone1.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  cloudClone1.rotationQuaternion = null;
  cloudClone1.rotation.x = 1.57;
  cloudClone1.position = new BABYLON.Vector3(1, -2, 1);
  cloudClone1.visibility = 0.3;

  let cloudClone2 = cloud2.clone("cloudClone2");
  cloudClone2.isVisible = true;
  cloudClone2.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  cloudClone2.rotationQuaternion = null;
  cloudClone2.rotation.x = 1.57;
  cloudClone2.position = new BABYLON.Vector3(-1, -1.3, 0.5);

  let cloudClone3 = cloud3.clone("cloudClone3");
  cloudClone3.isVisible = true;
  cloudClone3.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  cloudClone3.rotationQuaternion = null;
  cloudClone3.rotation.x = 1.57;
  cloudClone3.position = new BABYLON.Vector3(-1.5, -0.8, 0);

  let cloudClone4 = cloud3.clone("cloudClone4");
  cloudClone4.isVisible = true;
  cloudClone4.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  cloudClone4.rotationQuaternion = null;
  cloudClone4.rotation.x = 1.57;
  cloudClone4.position = new BABYLON.Vector3(1.3, -1.3, 0);

  let cloudClone5 = cloud3.clone("cloudClone5");
  cloudClone5.isVisible = true;
  cloudClone5.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  cloudClone5.rotationQuaternion = null;
  cloudClone5.rotation.x = 1.57;
  cloudClone5.position = new BABYLON.Vector3(-1.7, -1.9, 1);

  let cloudClone6 = cloud2.clone("cloudClone6");
  cloudClone6.isVisible = true;
  cloudClone6.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  cloudClone6.rotationQuaternion = null;
  cloudClone6.rotation.x = 1.57;
  cloudClone6.position = new BABYLON.Vector3(2.4, -2.4, 2);

  let cloudClone7 = cloud2.clone("cloudClone7");
  cloudClone7.isVisible = true;
  cloudClone7.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  cloudClone7.rotationQuaternion = null;
  cloudClone7.rotation.x = 1.57;

  cloudClone7.position = new BABYLON.Vector3(0, -1.6, 1);

  let cloudClone8 = cloud3.clone("cloudClone8");
  cloudClone8.isVisible = true;
  cloudClone8.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  cloudClone8.rotationQuaternion = null;
  cloudClone8.rotation.x = 1.57;

  cloudClone8.position = new BABYLON.Vector3(-2.5, -2, 0);

  let cloudClone9 = cloud1.clone("cloudClone9");
  cloudClone9.isVisible = true;
  cloudClone9.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  cloudClone9.rotationQuaternion = null;
  cloudClone9.rotation.x = 1.57;

  cloudClone9.position = new BABYLON.Vector3(0, -2.5, 1);





  //LENSE SYSTEM////////////////////////////////////////////////////////////////////////
  // const lensEmiter = BABYLON.MeshBuilder.CreateBox("lensEmiter", {
  //   height: 0.1,
  //   width: 0.1,
  //   depth: 0.1,
  // });
  // lensEmiter.position = new BABYLON.Vector3(2, 2.25, 0);
  // lensEmiter.isVisible = false;
  // var lensFlareSystem = new BABYLON.LensFlareSystem(
  //   "lensFlareSystem", //name
  //   lensEmiter, // emitter
  //   scene
  // ); //size of flare,position of flare,color of flare,image of flare,lens flare system
  // var flare00 = new BABYLON.LensFlare(
  //   0.1,
  //   0.6,
  //   new BABYLON.Color3(1, 1, 1),
  //   "flare.png",
  //   lensFlareSystem

  // );
  // var flare01 = new BABYLON.LensFlare(
  //   0.15,
  //   0.8,
  //   new BABYLON.Color3(0.5, 0.5, 1),
  //   "flare.png",
  //   lensFlareSystem
  // );
  // var flare02 = new BABYLON.LensFlare(
  //   0.2,
  //   1,
  //   new BABYLON.Color3(1, 1, 1),
  //   "flare.png",
  //   lensFlareSystem
  // );
  // var flare03 = new BABYLON.LensFlare(
  //   0.25,
  //   1.2,
  //   new BABYLON.Color3(0.5, 0.5, 1),
  //   "flare.png",
  //   lensFlareSystem

  // );
  // var flare04 = new BABYLON.LensFlare(
  //   0.3,
  //   1.4,
  //   new BABYLON.Color3(1, 1, 1),
  //   "flare.png",
  //   lensFlareSystem
  // );


  // var flare05 = new BABYLON.LensFlare(
  //   0.2,
  //   1.0,
  //   new BABYLON.Color3(1, 1, 1),
  //   "flare.png",
  //   lensFlareSystem
  // );

  //MENU////////////////////////////////////////////////////////////////////////
  const menuContainer = document.getElementById("menucontainer");
  const menuContent = document.getElementById("menuContent");
  const outerColorContainer = document.getElementById("outerColorContainer");
  const innerColorContainer = document.getElementById("innerColorContainer");
  const textileContainer = document.getElementById("textileContainer");
  const menuButtons = document.getElementsByClassName("menuButton");

  const outerColorButtonsContainer2 = document.getElementById(
    "outerColorButtonsContainer2"
  );

  function openMenu(container, arrow, openHeight, buttons) {
    container.style.height = openHeight;
    arrow.style.transform = "rotate(225deg)";
    arrow.style.marginTop = "-12px";
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.display = "flex";
    }
  }

  function closeMenu(container, arrow, closeHeight, buttons, activeButton) {
    container.style.height = closeHeight;
    arrow.style.transform = "rotate(45deg)";
    arrow.style.marginTop = "0px";
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.display = "none";
    }
    buttons[activeButton].style.display = "flex";
    buttons[activeButton].firstElementChild.style.border = "3px solid #e1ff00";
  }

  //outer color menu
  const outerColorButtons = document.getElementsByClassName(
    "outerColorButtonContainer"
  );
  let outerColors = ["#896309", "#8e8a76", "#242424", "#020202"];

  for (let i = 0; i < outerColorButtons.length; i++) {
    outerColorButtons[i].addEventListener("click", () => {
      if (activeOuterColor !== i) {
        activeOuterColor = i;
        outerColorButtons[activeOuterColor].firstElementChild.style.border =
          "3px solid #e1ff00";
        for (let j = 0; j < outerColorButtons.length; j++) {
          if (j !== activeOuterColor) {
            outerColorButtons[j].firstElementChild.style.border = "none";
          }
        }
        playRotateYAnimation();
        setTimeout(() => {
          scene.getMaterialByName("Outer Color(Stripes)").albedoColor =
            new BABYLON.Color3.FromHexString(outerColors[activeOuterColor]);
        }, 385);//half of the animation time
      }
    });
  }


  let activeOuterColor = 0;
  outerColorButtons[activeOuterColor].style.display = "flex";
  outerColorButtons[activeOuterColor].firstElementChild.style.border =
    "3px solid #e1ff00";
  let outerMenuOpen = false;

  outerColorArrow.onclick = () => {
    if (outerMenuOpen) {
      closeMenu(
        outerColorButtonsContainer2,
        outerArrowButton,
        "68px",
        outerColorButtons,
        activeOuterColor
      );
      outerMenuOpen = false;
    } else {
      openMenu(
        outerColorButtonsContainer2,
        outerArrowButton,
        "294px",
        outerColorButtons
      );
      outerMenuOpen = true;
    }

    if (innerMenuOpen) {
      closeMenu(
        innerColorButtonsContainer2,
        innerArrowButton,
        "68px",
        innerColorButtons,
        activeInnerColor
      );
      innerMenuOpen = false;
    }

    if (textileMenuOpen) {
      closeMenu(
        textileButtonsContainer2,
        textileArrowButton,
        "68px",
        textileButtons,
        activeTextile
      );
      textileMenuOpen = false;
    }
  };

  //inner color menu
  const innerColorButtons = document.getElementsByClassName(
    "innerColorButtonContainer"
  );

  let innerColors = ["#896309", "#8e8a76", "#242424", "#020202"];

  for (let i = 0; i < innerColorButtons.length; i++) {
    innerColorButtons[i].addEventListener("click", () => {
      if (activeInnerColor !== i) {
        activeInnerColor = i;
        innerColorButtons[activeInnerColor].firstElementChild.style.border =

          "3px solid #e1ff00";
        for (let j = 0; j < innerColorButtons.length; j++) {
          if (j !== activeInnerColor) {
            innerColorButtons[j].firstElementChild.style.border = "none";
          }
        }
        playRotateYAnimation();

        setTimeout(() => {
          scene.getMaterialByName("InnerColor(Stripes)").albedoColor =
            new BABYLON.Color3.FromHexString(innerColors[activeInnerColor]);
        }, 385);//half of the animation time
      }
    });


  }

  let activeInnerColor = 1;
  innerColorButtons[activeInnerColor].style.display = "flex";
  innerColorButtons[activeInnerColor].firstElementChild.style.border =
    "3px solid #e1ff00";
  let innerMenuOpen = false;

  innerColorArrow.onclick = () => {
    if (innerMenuOpen) {
      closeMenu(
        innerColorButtonsContainer2,
        innerArrowButton,
        "68px",
        innerColorButtons,
        activeInnerColor
      );
      innerMenuOpen = false;
    } else {
      openMenu(
        innerColorButtonsContainer2,
        innerArrowButton,
        "294px",
        innerColorButtons
      );

      innerMenuOpen = true;
      if (outerMenuOpen) {
        closeMenu(
          outerColorButtonsContainer2,
          outerArrowButton,
          "68px",
          outerColorButtons,
          activeOuterColor
        );
        outerMenuOpen = false;
      }

      if (textileMenuOpen) {
        closeMenu(
          textileButtonsContainer2,
          textileArrowButton,
          "68px",
          textileButtons,
          activeTextile
        );
        textileMenuOpen = false;
      }
    }
  };

  //textile menu

  let texture1 = scene.getMaterialByName("InnerColor(Stripes)").bumpTexture;
  let texture1Ambient = new BABYLON.Texture(
    "Shadows10(Linije)2k.jpg",
    scene
  );
  texture1Ambient.uOffset = 0;
  texture1Ambient.vOffset = 0;
  texture1Ambient.uScale = 1;
  texture1Ambient.vScale = -1;


  let texture2 = new BABYLON.Texture(
    "fabric_129_normal-2K.jpg",
    scene
  );
  texture2.uOffset = 0;
  texture2.vOffset = 0;
  texture2.uScale = 20;
  texture2.vScale = -20;

  let texture2Ambient = new BABYLON.Texture(
    "Shadows10(Textile)2k.jpg",
    scene
  );
  texture2Ambient.uOffset = 0;
  texture2Ambient.vOffset = 0;
  texture2Ambient.uScale = 1;
  texture2Ambient.vScale = -1;



  const textileButtons = document.getElementsByClassName(
    "textileButtonContainer"
  );

  let textures = [[texture2, texture2Ambient], [texture1, texture1Ambient]]




  for (let i = 0; i < textileButtons.length; i++) {
    textileButtons[i].addEventListener("click", () => {
      if (activeTextile !== i) {
        activeTextile = i;

        textileButtons[activeTextile].firstElementChild.style.border = "3px solid #e1ff00";
        for (let j = 0; j < textileButtons.length; j++) {
          if (j !== activeTextile) {
            textileButtons[j].firstElementChild.style.border = "none";
          }
        }
        playRotateYAnimation();
      setTimeout(() => {
          scene.getMaterialByName("InnerColor(Stripes)").bumpTexture = textures[activeTextile][0];
          scene.getMaterialByName("Outer Color(Stripes)").bumpTexture = textures[activeTextile][0];
          scene.getMaterialByName("InnerColor(Stripes)").lightmapTexture = textures[activeTextile][1];
          scene.getMaterialByName("Outer Color(Stripes)").lightmapTexture = textures[activeTextile][1];
          scene.getMaterialByName("InnerColor(Stripes)").useLightmapAsShadowmap = true;
          scene.getMaterialByName("Outer Color(Stripes)").useLightmapAsShadowmap = true;
        }, 385);//half of the animation time



      }
    });

  }

  let activeTextile = 1;
  textileButtons[activeTextile].style.display = "flex";
  textileButtons[activeTextile].firstElementChild.style.border =
    "3px solid #e1ff00";
  let textileMenuOpen = false;

  textileArrow.onclick = () => {
    if (textileMenuOpen) {
      closeMenu(
        textileButtonsContainer2,
        textileArrowButton,
        "68px",
        textileButtons,
        activeTextile
      );
      textileMenuOpen = false;
    } else {
      openMenu(
        textileButtonsContainer2,
        textileArrowButton,
        "145px",
        textileButtons
      );

      textileMenuOpen = true;
      if (outerMenuOpen) {
        closeMenu(
          outerColorButtonsContainer2,
          outerArrowButton,
          "68px",
          outerColorButtons,
          activeOuterColor
        );
        outerMenuOpen = false;
      }

      if (innerMenuOpen) {
        closeMenu(
          innerColorButtonsContainer2,
          innerArrowButton,
          "68px",
          innerColorButtons,
          activeInnerColor
        );
        innerMenuOpen = false;
      }
    }
  };

  //END OF SCENE////////////////////////////////////////////////////////////////////////
  scene.executeWhenReady(() => {
    setTimeout(() => {
      engine.hideLoadingUI(); //hide loading screen
      enableScroll(); //call enableScroll function to enable scrolling after scene is loaded
    }, 10);
    loadingScreen.style.transition = "opacity 1s ease-in-out";
    engine.runRenderLoop(() => {
      //mobile to look nice
      engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
      engine.adaptToDeviceRatio = true;
      scene.render();
    });
  });

  return scene;
};

window.initFunction = async function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });

  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  window.engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";
  startRenderLoop(engine, canvas);
  window.scene = createScene();
};
initFunction().then(() => {
  sceneToRender = scene;
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
