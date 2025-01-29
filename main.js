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

  console.log(screen.availWidth);

  // scene.debugLayer.show({
  //   embedMode: true,
  // });

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
  //   "https://assets.babylonjs.com/environments/environmentSpecular.env",
  //   scene
  // );
  const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "003.env",
    scene
  );
  // hdrTexture.rotationY = -0.2;

  scene.environmentIntensity = 2.3;

  scene.environmentTexture = hdrTexture;

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  let light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0;

  let lightHL = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

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
  let frameAndText = document.getElementById("frameAndText");
  let arc = document.getElementById("arc");

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

  let shadowTextureLine = new BABYLON.Texture(
    "img/Shadows10(Linije)2k.jpg",
    scene
  );

  shadowTextureLine.uOffset = 0;
  shadowTextureLine.vOffset = 0;
  shadowTextureLine.uScale = 1;
  shadowTextureLine.vScale = -1;

  // shadowTextureLine.uAng = 10;
  let shadowTextureKnit = new BABYLON.Texture(
    "img/Shadows10(Textile)2k.jpg",
    scene
  );

  shadowTextureKnit.uOffset = 0;
  shadowTextureKnit.vOffset = 0;
  shadowTextureKnit.uScale = 1;
  shadowTextureKnit.vScale = -1;

  // shadowTextureKnit.uAng = Math.PI;

  const textMat = new BABYLON.StandardMaterial("textMat");
  textMat.diffuseColor = new BABYLON.Color3.FromHexString("#E9FF46");

  async function makeText() {
    let fontData = await (await fetch("Nunito_Regular.json")).json();
    let myText = BABYLON.MeshBuilder.CreateText(
      "myText",
      "P R O D U C E R S",
      fontData,
      {
        size: 0.4,
        resolution: 64,
        depth: 0.01,
      }
    );

    myText.position = new BABYLON.Vector3(-4, -2, 1);
    myText.rotation = new BABYLON.Vector3(0.4, Math.PI, 0);

    let myText1 = BABYLON.MeshBuilder.CreateText(
      "myText",
      "W E ' R E  C R E A T O R S",
      fontData,
      {
        size: 0.2,
        resolution: 64,
        depth: 0.01,
      }
    );

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
  let br = 0;
  let loadinginterval = setInterval(function () {
    document.getElementById("loadingText").innerText += ".";
    br++;
    if (br == 4) {
      document.getElementById("loadingText").innerText =
        "Loading one stitch at a time";
      br = 0;
    }
  }, 1000);

  //////////

  let rotateJacked = new BABYLON.Animation(
    "rotateJacked",
    "rotation.y",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  let keyFrames = [];

  keyFrames.push({
    frame: 0,
    value: 0,
  });

  keyFrames.push({
    frame: 60,
    value: 2 * Math.PI,
  });
  rotateJacked.setKeys(keyFrames);

  const easingFunction = new BABYLON.CircleEase();

  // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
  easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

  // Adding the easing function to the animation
  rotateJacked.setEasingFunction(easingFunction);

  let animating = false;

  /////////////

  let progressInterval;
  let estimatedProgress = 1;

  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "",
    "Jakna Camera 3.glb",
    scene,
    (evt) => {
      console.log("prolazi");
      if (evt.lengthComputable) {
        // If the total size is known, use real progress
        estimatedProgress = ((evt.loaded / evt.total) * 100).toFixed();
      } else if (!progressInterval) {
        console.log("baga");
        // If total size is unknown, start a progress simulation
        // progressInterval = setInterval(() => {
        estimatedProgress = Math.min(estimatedProgress + 5, 95); // Prevent going over 95%
        document.getElementById(
          "loadingPercentages"
        ).innerText = `${estimatedProgress}`;
        document.getElementById(
          "loadingLine"
        ).style.width = `${estimatedProgress}%`;
        // }, 500);
      }

      document.getElementById(
        "loadingPercentages"
      ).innerText = `${estimatedProgress}`;
      document.getElementById(
        "loadingLine"
      ).style.width = `${estimatedProgress}%`;
    }
  ).then((result) => {
    clearInterval(loadinginterval);
    // clearInterval(progressInterval); // Stop simulation when loading completes
    estimatedProgress = 100;
    document.getElementById("loadingPercentages").innerText = `100`;
    document.getElementById("loadingLine").style.width = `100%`;
    document.getElementById("loadingText").innerText = "Loaded";

    let jakna = result.meshes[0];
    console.log(result);
    let jakna1 = result.meshes[3]._parentNode;

    let xStarting = result.meshes[2].rotation.x;

    // jakna.scaling = new BABYLON.Vector3(-4, 4, 4);
    // jakna.position = new BABYLON.Vector3(1, -5, 0);
    // jakna.rotation = new BABYLON.Vector3(-0.4, 0.2, 0.2);

    for (let i = 1; i < result.meshes.length; i++) {
      result.meshes[i].material.ambientTexture = shadowTextureLine;

      lightHL.excludedMeshes.push(result.meshes[i]);
      result.meshes[i].material.metallicF0Factor = 0.5;

      result.meshes[i].animations.push(rotateJacked);
      // setTimeout(function () {
      //   animating = true;
      //   console.log(result.meshes[i].animations);
      //   scene.beginAnimation(result.meshes[i], 0, 60, false, 1, function () {
      //     xStarting = result.meshes[2].rotation.y;
      //     console.log(xStarting);
      //     animating = false;
      //   });
      // }, 4000);
    }
    function animationRotateF() {
      for (let i = 1; i < result.meshes.length; i++) {
        animating = true;
        console.log(result.meshes[i].animations);
        scene.beginAnimation(result.meshes[i], 0, 60, false, 1, function () {
          xStarting = result.meshes[2].rotation.y;

          animating = false;
        });
      }
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

    let knitBumpTexture = new BABYLON.Texture(
      "img/fabric_129_normal-2K.jpg",
      scene
    );

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
          animationRotateF();

          result.meshes[4].material.albedoColor =
            new BABYLON.Color3.FromHexString(colorChoice[i].ariaValueText);
        });
      } else if (colorChoice[i].classList[1] == "firstColor") {
        colorChoice[i].addEventListener("click", function () {
          animationRotateF();
          firstColorPicked = colorChoice[i].ariaValueText;
          result.meshes[3].material.albedoColor =
            new BABYLON.Color3.FromHexString(colorChoice[i].ariaValueText);
        });
      } else {
        colorChoice[i].addEventListener("click", function () {
          animationRotateF();
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
    let newPosition;
    let lastPosition;
    setTimeout(function () {
      newPosition = scene.activeCamera.globalPosition.clone();
      lastPosition = scene.activeCamera.globalPosition.clone();
    }, 1000);
    canvas.style.backgroundSize = screen.width + "px";
    console.log(
      Number(
        canvas.style.backgroundSize.slice(
          0,
          canvas.style.backgroundSize.indexOf("p")
        )
      )
    );

    let rotating = false;
    let beislineX = jakna1._rotationQuaternion.x;
    let beislineY = jakna1._rotationQuaternion.y;
    let beislineZ = jakna1._rotationQuaternion.z;
    let beislineW = jakna1._rotationQuaternion.w;
    ////////////////////////////////
    let rotateFlag = true;

    let cubeRotationSpeed = 0.005;

    let lastPointerX, lastPointerY;

    let yStarting = result.meshes[2].rotation.y;
    let zStarting = result.meshes[2].rotation.z;

    function onPointerMove() {
      let angle = result.meshes[2].rotation.y / (2 * Math.PI);
      while (angle > 1) {
        angle -= 1;
      }

      if (!rotateFlag) {
        let diffX = scene.pointerX - lastPointerX;
        let diffY = scene.pointerY - lastPointerY;
        // result.meshes[2].rotation.y -= diffX * 0.003;
        for (let i = 1; i < result.meshes.length; i++) {
          result.meshes[i].rotation.y += diffX * 0.003;
        }

        // if (
        //   (angle > 0.25 && angle < 0.75) ||
        //   (angle < -0.25 && angle > -0.75)
        // ) {
        //   result.meshes[2].rotation.x -= diffY * 0.00025;
        // } else {
        //   result.meshes[2].rotation.x += diffY * 0.00025;
        // }

        lastPointerX = scene.pointerX;
        lastPointerY = scene.pointerY;
      }
    }
    let clicked = false;

    function onPointerDown() {
      lastPointerX = scene.pointerX;
      lastPointerY = scene.pointerY;
      rotateFlag = false;
      // arc.style.opacity = 1;
      clicked = true;
      arc.style.display = "flex";

      scene.activeCamera.detachControl();
    }

    function onPointerUp() {
      rotateFlag = true;
      clicked = false;
      // arc.style.opacity = 0;
      arc.style.display = "none";
      scene.activeCamera.attachControl();
    }

    canvas.addEventListener("pointermove", onPointerMove, false);
    canvas.addEventListener("pointerdown", onPointerDown, false);
    canvas.addEventListener("pointerup", onPointerUp, false);

    scene.onDispose = function () {
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown, false);
      canvas.removeEventListener("pointerup", onPointerUp, false);
    };
    let opacity = 0;
    arc.style.opacity = opacity;
    arc.style.display = "none";
    let opacityZone = false;
    scene.registerBeforeRender(function () {
      if (animating) {
        // console.log(result.meshes[3].animations);
      }

      if (clicked) {
        if (arc.style.opacity < frameAndText.style.opacity) {
          opacity += 0.1;
        }
        if (opacity > frameAndText.style.opacity) {
          opacity = frameAndText.style.opacity;
        }
      } else {
        if (arc.style.opacity > 0) {
          opacity -= 0.1;
        }
        if (opacity < 0) {
          opacity = 0;
        }
      }
      arc.style.opacity = opacity;

      if (rotateFlag && !animating) {
        if (result.meshes[2].rotation.y < xStarting) {
          // result.meshes[2].rotation.y += 0.02;
          for (let i = 1; i < result.meshes.length; i++) {
            result.meshes[i].rotation.y += 0.08;
          }
        }
        if (result.meshes[2].rotation.y > xStarting) {
          // result.meshes[2].rotation.y -= 0.02;
          for (let i = 1; i < result.meshes.length; i++) {
            result.meshes[i].rotation.y -= 0.08;
          }
        }
      }
    });

    ////////////////////////////////
    // scene.onBeforeRenderObservable.add(() => {
    //   if (!rotating) {
    //     arc.style.display = "none";
    //     if (jakna1._rotationQuaternion.x > beislineX) {
    //       jakna1._rotationQuaternion.x -= 0.001;
    //     } else if (jakna1._rotationQuaternion.x < beislineX) {
    //       jakna1._rotationQuaternion.x += 0.001;
    //     }
    //     if (jakna1._rotationQuaternion.y > beislineY) {
    //       jakna1._rotationQuaternion.y -= 0.001;
    //     } else if (jakna1._rotationQuaternion.y < beislineY) {
    //       jakna1._rotationQuaternion.y += 0.001;
    //     }
    //     if (jakna1._rotationQuaternion.z > beislineZ) {
    //       jakna1._rotationQuaternion.z -= 0.001;
    //     } else if (jakna1._rotationQuaternion.z < beislineZ) {
    //       jakna1._rotationQuaternion.z += 0.001;
    //     }
    //     if (jakna1._rotationQuaternion.w > beislineW) {
    //       jakna1._rotationQuaternion.w -= 0.001;
    //     } else if (jakna1._rotationQuaternion.w < beislineW) {
    //       jakna1._rotationQuaternion.w += 0.001;
    //     }
    //   }
    // });

    ///////////////////////////////

    const rightDir = new BABYLON.Vector3();
    const upDir = new BABYLON.Vector3();
    const sensitivity = 0.002;
    // arc.style.display = "none";

    // scene.onPointerObservable.add((pointerInfo) => {
    //   if (pointerInfo.type === 1) {
    //     scene.activeCamera.detachControl();
    //     if (pointerInfo.pickInfo.pickedMesh._parentNode.id === "Default") {
    //       if (pointerInfo.type === 1) {
    //         rotating = true;
    //         arc.style.display = "flex";
    //       }
    //     }
    //   } else if (pointerInfo.type === 2 && rotating) {
    //     rotating = false;
    //     scene.activeCamera.attachControl();
    //   } else if (pointerInfo.type === 4 && rotating) {
    //     const matrix = scene.activeCamera.getWorldMatrix();

    //     rightDir.copyFromFloats(matrix.m[0], matrix.m[1], matrix.m[2]);
    //     upDir.copyFromFloats(matrix.m[4], matrix.m[5], matrix.m[6]);

    //     // jakna1.rotateAround(
    //     //   jakna1.position,
    //     //   rightDir,
    //     //   pointerInfo.event.movementY * -1 * sensitivity
    //     // );
    //     // let movment = pointerInfo.event.movementX * 1 * sensitivity;
    //     // console.log(movment);
    //     jakna1.rotateAround(
    //       jakna1.position,
    //       upDir,
    //       pointerInfo.event.movementX * 1 * sensitivity
    //     );
    //   }
    // });

    //////////////////////
    let positionBackground = screen.width;
    let positionBackgroundY = 0;
    let positionBackgroundX = 0;

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
          if (cover.style.opacity > 0) {
            cover.style.display = "flex";
          }
        } else {
          // colorChoice[i].style.opacity = 1;
          colorsDown.style.opacity = 1;
          colorsUp.style.opacity = 1;

          cover.style.opacity = 0;
          if (cover.style.opacity == 0) {
            cover.style.display = "none";
          }
        }
      }

      // if (currentScroll % 4 == 0) {

      newPosition = scene.cameras[1].globalPosition.clone();

      if (newPosition.z > lastPosition.z) {
        positionBackground += (newPosition.z - lastPosition.z) * 50;
        if (positionBackground < screen.width) {
          positionBackground = screen.width;
        }
        canvas.style.backgroundSize = positionBackground + "px";
      } else if (newPosition.z < lastPosition.z) {
        positionBackground += (newPosition.z - lastPosition.z) * 50;
        if (positionBackground < screen.width) {
          positionBackground = screen.width;
        }
        canvas.style.backgroundSize = positionBackground + "px";
      }

      // if (newPosition.y > lastPosition.y) {
      //   positionBackgroundX += newPosition.y - lastPosition.y;
      //   console.log(positionBackgroundX);
      //   canvas.style.backgroundPositionX = positionBackgroundX + "px";
      // } else if (newPosition.y < lastPosition.y) {
      //   positionBackgroundX -= lastPosition.y - newPosition.y;
      //   canvas.style.backgroundPositionX = positionBackgroundX + "px";
      //   console.log(positionBackgroundX);
      // }

      // if (newPosition.z > lastPosition.z) {
      //   positionBackgroundY += newPosition.z - lastPosition.z;
      //   console.log(positionBackgroundY);
      //   canvas.style.backgroundPositionY = positionBackgroundY + "px";
      // } else if (newPosition.z < lastPosition.z) {
      //   positionBackgroundY -= lastPosition.z - newPosition.z;
      //   canvas.style.backgroundPositionY = positionBackgroundY + "px";
      //   console.log(positionBackgroundY);
      // }

      if (currentScroll > 500 && currentScroll < 800) {
        opacityZone = true;
        frameAndText.style.opacity = 1 - (currentScroll - 500) / 300;
        arc.style.opacity = 1 - (currentScroll - 500) / 300;
      } else if (currentScroll > 800) {
        frameAndText.style.opacity = 0;
        arc.style.opacity = 0;
        opacityZone = false;
      } else if (currentScroll <= 300) {
        frameAndText.style.opacity = currentScroll / 300;
        arc.style.opacity = currentScroll / 300;
        opacityZone = false;
      } else if (currentScroll > 300 && currentScroll < 500) {
        frameAndText.style.opacity = 1;
        arc.style.opacity = 1;
        opacityZone = false;
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
      lastPosition = newPosition;

      // if (currentScroll > 800 && currentScroll < 8000) {
      //   canvas.style.backgroundSize = 1920 + (currentScroll - 800) / 3 + "px";
      //   canvas.style.backgroundPositionX =
      //     -((currentScroll - 800) / 6) + "px";
      //   canvas.style.backgroundPositionY =
      //     -((currentScroll - 800) / 6) + "px";
      // } else if (currentScroll > 8000 && currentScroll < 12960) {
      //   canvas.style.backgroundSize =
      //     4320 - (currentScroll - 8000) / 3 + "px";
      //   canvas.style.backgroundPositionX =
      //     -1200 + (currentScroll - 8000) / 6 + "px";
      //   canvas.style.backgroundPositionY =
      //     -1200 + (currentScroll - 8000) / 6 + "px";
      // }

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
          scene.animationGroups
            .find((a) => a.name === "CameraAction")
            .play(true);
          scene.animationGroups
            .find((a) => a.name === "CameraAction")
            .goToFrame(frame);
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
