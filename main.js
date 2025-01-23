window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

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
var createScene = function () {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  var camera = new BABYLON.ArcRotateCamera(
    "camera",
    BABYLON.Tools.ToRadians(90),
    BABYLON.Tools.ToRadians(65),
    10,
    BABYLON.Vector3.Zero(),
    scene
  );
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  // scene.debugLayer.show({
  //   embedMode: true,
  // });

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "https://assets.babylonjs.com/environments/environmentSpecular.env",
    scene
  );
  // hdrTexture.rotationY = -0.2;

  scene.environmentIntensity = 2;

  scene.environmentTexture = hdrTexture;

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0;

  let lightHL = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // // Default intensity is 1. Let's dim the light a small amount
  lightHL.intensity = 2;
  /////////////////////

  let lightUp = new BABYLON.DirectionalLight(
    "DirectionalLight",
    new BABYLON.Vector3(0, -2, 0),
    scene
  );
  lightUp.position = new BABYLON.Vector3(0, 5, -2);
  lightUp.intensity = 0;

  //fountain to be emmietr for clouds-particles

  /////////////////
  let colorChoice = document.getElementsByClassName("colorChoice");
  let firstColor = document.getElementsByClassName("firstColor");
  let secundColor = document.getElementsByClassName("secundColor");
  let textilePick = document.getElementsByClassName("textilePick");
  let colorLeft = document.getElementById("colorLeft");
  let colorRight = document.getElementById("colorRight");
  let textile = document.getElementById("textile");
  let colorsDown = document.getElementById("colorsDown");
  let colorsUp = document.getElementById("colorsUp");
  let firstColorPicked = "#896309";
  let secundColorPicked = "#8e8a76";
  let textilePicked = "Linije";
  let video = document.getElementById("video1");

  for (let i = 0; i < colorChoice.length; i++) {
    colorChoice[i].style.display = "none";
  }
  //////

  colorLeft.style.height = "100%";
  for (let i = 0; i < firstColor.length; i++) {
    firstColor[i].style.display = "flex";
    firstColor[i].style.transition = "all 0.2s ease-in-out";
  }
  setTimeout(function () {
    colorLeft.style.height = "35%";
    for (let i = 0; i < firstColor.length; i++) {
      if (firstColor[i].ariaValueText == firstColorPicked) {
        firstColor[i].style.display = "flex";
        firstColor[i].style.height = "8dvh";
      } else {
        firstColor[i].style.display = "none";
      }
    }
  }, 1000);

  colorRight.style.height = "100%";
  for (let i = 0; i < secundColor.length; i++) {
    secundColor[i].style.display = "flex";
  }
  setTimeout(function () {
    colorRight.style.height = "35%";
    for (let i = 0; i < secundColor.length; i++) {
      if (secundColor[i].ariaValueText == secundColorPicked) {
        secundColor[i].style.display = "flex";
      } else {
        secundColor[i].style.display = "none";
      }
    }
  }, 1000);

  textile.style.height = "60%";
  for (let i = 0; i < textilePick.length; i++) {
    textilePick[i].style.display = "flex";
  }
  setTimeout(function () {
    textile.style.height = "35%";
    for (let i = 0; i < textilePick.length; i++) {
      if (textilePick[i].ariaValueText == textilePicked) {
        textilePick[i].style.display = "flex";
      } else {
        textilePick[i].style.display = "none";
      }
    }
  }, 1000);

  /////////////

  colorLeft.addEventListener("mouseover", function () {
    colorLeft.style.height = "100%";
    for (let i = 0; i < firstColor.length; i++) {
      firstColor[i].style.display = "flex";
      firstColor[i].style.transition = "all 0.2s ease-in-out";
    }
  });

  colorLeft.addEventListener("mouseout", function () {
    colorLeft.style.height = "35%";
    for (let i = 0; i < firstColor.length; i++) {
      if (firstColor[i].ariaValueText == firstColorPicked) {
        firstColor[i].style.display = "flex";
        firstColor[i].style.height = "8dvh";
      } else {
        firstColor[i].style.display = "none";
      }
    }
  });

  colorRight.addEventListener("mouseover", function () {
    colorRight.style.height = "100%";
    for (let i = 0; i < secundColor.length; i++) {
      secundColor[i].style.display = "flex";
    }
  });

  colorRight.addEventListener("mouseout", function () {
    colorRight.style.height = "35%";
    for (let i = 0; i < secundColor.length; i++) {
      if (secundColor[i].ariaValueText == secundColorPicked) {
        secundColor[i].style.display = "flex";
      } else {
        secundColor[i].style.display = "none";
      }
    }
  });

  textile.addEventListener("mouseover", function () {
    textile.style.height = "60%";
    for (let i = 0; i < textilePick.length; i++) {
      textilePick[i].style.display = "flex";
    }
  });

  textile.addEventListener("mouseout", function () {
    textile.style.height = "35%";
    for (let i = 0; i < textilePick.length; i++) {
      if (textilePick[i].ariaValueText == textilePicked) {
        textilePick[i].style.display = "flex";
      } else {
        textilePick[i].style.display = "none";
      }
    }
  });

  for (let i = 0; i < firstColor.length; i++) {
    if (firstColor[i].ariaValueText == firstColorPicked) {
      firstColor[i].style.display = "flex";
    } else {
      firstColor[i].style.display = "none";
    }
  }

  for (let i = 0; i < secundColor.length; i++) {
    if (secundColor[i].ariaValueText == secundColorPicked) {
      secundColor[i].style.display = "flex";
    } else {
      secundColor[i].style.display = "none";
    }
  }

  for (let i = 0; i < textilePick.length; i++) {
    if (textilePick[i].ariaValueText == textilePicked) {
      textilePick[i].style.display = "flex";
    } else {
      textilePick[i].style.display = "none";
    }
  }

  let shadowTextureLine = new BABYLON.Texture("img/Shadows10(Linije)2k.jpg", scene);

  shadowTextureLine.uOffset = 0;
  shadowTextureLine.vOffset = 0;
  shadowTextureLine.uScale = 1;
  shadowTextureLine.vScale = -1;

  // shadowTextureLine.uAng = 10;
  let shadowTextureKnit = new BABYLON.Texture("img/Shadows10(Textile)2k.jpg", scene);

  shadowTextureKnit.uOffset = 0;
  shadowTextureKnit.vOffset = 0;
  shadowTextureKnit.uScale = 1;
  shadowTextureKnit.vScale = -1;

  // shadowTextureKnit.uAng = Math.PI;

  const textMat = new BABYLON.StandardMaterial("textMat");
  textMat.diffuseColor = new BABYLON.Color3.FromHexString("#E9FF46");

  async function makeText() {
    let fontData = await (await fetch("Nunito_Regular.json")).json();
    let myText = BABYLON.MeshBuilder.CreateText("myText", "P R O D U C E R S", fontData, {
      size: 0.4,
      resolution: 64,
      depth: 0.01,
    });

    myText.position = new BABYLON.Vector3(-4, -2, 1);
    myText.rotation = new BABYLON.Vector3(0.4, Math.PI, 0);

    let myText1 = BABYLON.MeshBuilder.CreateText("myText", "W E ' R E  C R E A T O R S", fontData, {
      size: 0.2,
      resolution: 64,
      depth: 0.01,
    });

    myText1.position = new BABYLON.Vector3(4, 1, 2);
    myText1.rotation = new BABYLON.Vector3(0.4, Math.PI, 0);

    myText.material = textMat;

    myText1.material = textMat;
    lightUp.excludedMeshes.push(myText);
    lightUp.excludedMeshes.push(myText1);
    // myText.visibility = 0.6;
    // myText1.material.alpha = 0.6;
  }
  // makeText();

  BABYLON.SceneLoader.ImportMeshAsync("", "", "Jakna Camera 3.glb").then((result) => {
    let jakna = result.meshes[0];
    console.log(result);

    jakna.scaling = new BABYLON.Vector3(-4, 4, 4);
    jakna.position = new BABYLON.Vector3(1, -5, 0);
    jakna.rotation = new BABYLON.Vector3(-0.4, 0.2, 0.2);

    for (let i = 1; i < result.meshes.length; i++) {
      result.meshes[i].material.ambientTexture = shadowTextureLine;

      lightHL.excludedMeshes.push(result.meshes[i]);
      result.meshes[i].material.metallicF0Factor = 0.5;
    }

    jakna.rotationQuaternion = null;
    if (window.innerWidth > window.innerHeight) {
      scene.activeCamera = scene.cameras[1];
    } else {
      scene.activeCamera = scene.cameras[1];
      // scene.activeCamera.position.z = 0.3;
      // scene.activeCamera.position.y = 0.01;
    }

    scene.activeCamera.attachControl(canvas, true);

    // scene.animationGroups.find((a) => a.name === "CameraAction").play(true);
    // scene.animationGroups.find((a) => a.name === "CameraAction").scene = scene;
    // console.log(scene.animationGroups.find((a) => a.name === "CameraAction"));
    // for (
    //   let i = 0;
    //   i < scene.animationGroups.find((a) => a.name === "CameraAction")._targetedAnimations.length;
    //   i++
    // ) {
    //   scene.animationGroups.find((a) => a.name === "CameraAction")._targetedAnimations[i].target =
    //     camera;
    // }
    console.log(scene.animationGroups.find((a) => a.name === "CameraAction"));

    console.log(camera);
    console.log(scene.cameras[1]);

    scene.animationGroups.find((a) => a.name === "CameraAction").play(true);

    // let lineBumpTexture = new BABYLON.Texture("img/InnerColor(Stripes) (Normal).png", scene);

    // lineBumpTexture.uOffset = 0;
    // lineBumpTexture.vOffset = 0;
    // lineBumpTexture.uScale = 3;
    // lineBumpTexture.vScale = 3;
    let lineBumpTexture = result.meshes[3].material.bumpTexture;

    let knitBumpTexture = new BABYLON.Texture("img/fabric_129_normal-2K.jpg", scene);

    knitBumpTexture.uOffset = 0;
    knitBumpTexture.vOffset = 0;
    knitBumpTexture.uScale = 20;
    knitBumpTexture.vScale = 20;
    console.log(result.meshes[3].material);
    result.meshes[3].material._metallicTexture = null;
    result.meshes[4].material._metallicTexture = null;

    result.meshes[3].material.bumpTexture.level = 1;
    result.meshes[4].material.bumpTexture.level = 1;
    result.meshes[3].material.ambientTexture.level = 1.2;
    result.meshes[4].material.ambientTexture.level = 1.2;

    for (let i = 0; i < colorChoice.length; i++) {
      if (colorChoice[i].classList[1] == "secundColor") {
        colorChoice[i].addEventListener("click", function () {
          secundColorPicked = colorChoice[i].ariaValueText;

          result.meshes[4].material.albedoColor = new BABYLON.Color3.FromHexString(
            colorChoice[i].ariaValueText
          );
        });
      } else if (colorChoice[i].classList[1] == "firstColor") {
        colorChoice[i].addEventListener("click", function () {
          firstColorPicked = colorChoice[i].ariaValueText;
          result.meshes[3].material.albedoColor = new BABYLON.Color3.FromHexString(
            colorChoice[i].ariaValueText
          );
        });
      } else {
        colorChoice[i].addEventListener("click", function () {
          textilePicked = colorChoice[i].ariaValueText;

          if (textilePicked == "Tekstil") {
            result.meshes[3].material.bumpTexture = knitBumpTexture;
            result.meshes[4].material.bumpTexture = knitBumpTexture;
            // result.meshes[3].material._metallicTexture = knitBumpTexture;
            // result.meshes[4].material._metallicTexture = knitBumpTexture;
            // result.meshes[3].material._metallicTexture.level = 0.01;
            // result.meshes[4].material._metallicTexture.level = 0.01;
            for (let i = 1; i < result.meshes.length; i++) {
              result.meshes[i].material.ambientTexture = shadowTextureKnit;
              // result.meshes[i].material._useLightmapAsShadowmap = true;
              // light.excludedMeshes.push(result.meshes[i]);
            }
          } else if (textilePicked == "Linije") {
            result.meshes[3].material.bumpTexture = lineBumpTexture;
            result.meshes[4].material.bumpTexture = lineBumpTexture;
            for (let i = 1; i < result.meshes.length; i++) {
              result.meshes[i].material.ambientTexture = shadowTextureLine;
              console.log(result.meshes[i].material);
              // result.meshes[i].material._useLightmapAsShadowmap = true;
              // light.excludedMeshes.push(result.meshes[i]);
            }
          }
        });
      }
    }

    var frame = 0;
    let oldValue = 0;
    let newValue = 0;
    var scrollDiv = document.getElementById("scrollDiv");

    let cover = document.getElementById("cover");

    let bigText = document.getElementsByClassName("BigText");

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      newValue = window.pageYOffset;

      for (let i = 0; i < colorChoice.length; i++) {
        if (currentScroll <= 300) {
          // colorChoice[i].style.opacity = currentScroll / 300;
          colorsUp.style.opacity = currentScroll / 300;
          colorsDown.style.opacity = currentScroll / 300;

          // if (colorChoice[i].style.opacity < 0.3) {
          //   colorChoice[i].style.display = "none";
          // } else {
          //   colorChoice[i].style.display = "flex";
          // }
          cover.style.opacity = 1 - currentScroll / 300;
        } else {
          // colorChoice[i].style.opacity = 1;
          colorsDown.style.opacity = 1;
          colorsUp.style.opacity = 1;

          cover.style.opacity = 0;
        }
      }

      for (let i = 0; i < bigText.length; i++) {
        if (currentScroll > 500 && currentScroll < 800) {
          bigText[i].style.opacity = 1 - (currentScroll - 500) / 300;
        } else if (currentScroll > 800) {
          bigText[i].style.opacity = 0;
        } else if (currentScroll <= 300) {
          bigText[i].style.opacity = currentScroll / 300;
        } else if (currentScroll > 300 && currentScroll < 500) {
          bigText[i].style.opacity = 1;
        }
      }

      if (currentScroll > 800 && currentScroll < 8000) {
        canvas.style.backgroundSize = 1920 + (currentScroll - 800) / 3 + "px";
        canvas.style.backgroundPositionX = -((currentScroll - 800) / 6) + "px";
        canvas.style.backgroundPositionY = -((currentScroll - 800) / 6) + "px";
      } else if (currentScroll > 8000 && currentScroll < 12960) {
        canvas.style.backgroundSize = 4320 - (currentScroll - 8000) / 3 + "px";
        canvas.style.backgroundPositionX = -1200 + (currentScroll - 8000) / 6 + "px";
        canvas.style.backgroundPositionY = -1200 + (currentScroll - 8000) / 6 + "px";
      }

      scene.beforeRender = function () {
        if (
          window.innerWidth < window.innerHeight &&
          currentScroll < 7100 &&
          currentScroll > 3000
        ) {
          scene.activeCamera.position.z = currentScroll / 10000;
        }
        if (oldValue < newValue) {
          frame = currentScroll / 15.88;
          jakna.position.y = -(currentScroll * 0.0001);
          // if (currentScroll < 100) {
          //   scene.animationGroups.find((a) => a.name === "teloAction.001").start(false, 1, 0);
          // }
        } else if (oldValue > newValue) {
          frame = currentScroll / 15.88;
          jakna.position.y = -(currentScroll * 0.0001);
        }
        oldValue = newValue;
        if (window.innerWidth > window.innerHeight) {
          scene.animationGroups.find((a) => a.name === "CameraAction").play(true);
          scene.animationGroups.find((a) => a.name === "CameraAction").goToFrame(frame);
          scene.animationGroups.find((a) => a.name === "CameraAction").pause();
        } else {
          // scene.animationGroups.find((a) => a.name === "CameraAction.002").play(true);
          // scene.animationGroups.find((a) => a.name === "CameraAction.002").goToFrame(frame);
          // scene.animationGroups.find((a) => a.name === "CameraAction.002").pause();
        }
      };
    });
  });

  // let defaultRendering = new BABYLON.DefaultRenderingPipeline("defRend", true, scene);

  // defaultRendering.fxaaEnabled = true;
  // defaultRendering.samples = 20;

  // console.log(defaultRendering);

  // Our built-in 'ground' shape.

  return scene;
};
window.initFunction = async function () {
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

SmoothScroll({
  // Scrolling Core
  animationTime: 2000, // [ms]
  stepSize: 100, // [px]

  // Acceleration
  accelerationDelta: 50, // 50
  accelerationMax: 3, // 3

  // Keyboard Settings
  keyboardSupport: true, // option
  arrowScroll: 50, // [px]

  // Pulse (less tweakable)
  // ratio of "tail" to "acceleration"
  pulseAlgorithm: true,
  pulseScale: 4,
  pulseNormalize: 1,

  // Other
  touchpadSupport: false, // ignore touchpad by default
  fixedBackground: true,
  excluded: "",
});
