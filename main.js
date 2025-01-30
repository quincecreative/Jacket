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

  camera.setTarget(BABYLON.Vector3.Zero());

  camera.attachControl(canvas, true);

  const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "003.env",
    scene
  );

  scene.environmentIntensity = 2.3;

  scene.environmentTexture = hdrTexture;

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
  let frameAndText = document.getElementById("frameAndText");
  let arc = document.getElementById("arc");

  ///ovo ispod je da se ucitaju sve slike i da se stylovi nameste za boje na hover i slicno

  for (let i = 0; i < colorChoice.length; i++) {
    colorChoice[i].style.display = "none";
  }

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

  ////texture za senke

  let shadowTextureLine = new BABYLON.Texture(
    "img/Shadows10(Linije)2k.jpg",
    scene
  );

  shadowTextureLine.uOffset = 0;
  shadowTextureLine.vOffset = 0;
  shadowTextureLine.uScale = 1;
  shadowTextureLine.vScale = -1;

  let shadowTextureKnit = new BABYLON.Texture(
    "img/Shadows10(Textile)2k.jpg",
    scene
  );

  shadowTextureKnit.uOffset = 0;
  shadowTextureKnit.vOffset = 0;
  shadowTextureKnit.uScale = 1;
  shadowTextureKnit.vScale = -1;

  const textMat = new BABYLON.StandardMaterial("textMat");
  textMat.diffuseColor = new BABYLON.Color3.FromHexString("#E9FF46");

  ///ovo je samo da se dodaju tacke i resetuju na loading screen
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
  ////animacija za rotiranje jakne kad promenis boju
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
  easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  rotateJacked.setEasingFunction(easingFunction);
  let animating = false;
  let progressInterval;
  let estimatedProgress = 1;
  let video1 = document.getElementById("video1");

  ///lodovnje videa i pustanje
  video1.load();
  video1.play();

  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "",
    "Jakna Camera 3.glb",
    scene,
    (evt) => {
      if (evt.lengthComputable) {
        estimatedProgress = ((evt.loaded / evt.total) * 100).toFixed();
      } else if (!progressInterval) {
        ///githab nevraca velicinu fajla pa zbog nekog razloga pa ovo sluzi da fejka loading
        estimatedProgress = Math.min(estimatedProgress + 5, 95);
        document.getElementById(
          "loadingPercentages"
        ).innerText = `${estimatedProgress}`;
        document.getElementById(
          "loadingLine"
        ).style.width = `${estimatedProgress}%`;
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

    estimatedProgress = 100;
    document.getElementById("loadingPercentages").innerText = `100`;
    document.getElementById("loadingLine").style.width = `100%`;
    document.getElementById("loadingText").innerText = "Loaded";

    let jakna = result.meshes[0];
    console.log(result);

    let xStarting = result.meshes[2].rotation.x;

    for (let i = 1; i < result.meshes.length; i++) {
      result.meshes[i].material.ambientTexture = shadowTextureLine;

      result.meshes[i].material.metallicF0Factor = 0.5;
      result.meshes[i].animations.push(rotateJacked);
    }
    function animationRotateF() {
      ///davanje animacije meshevima s afunkcijom da updejta xStarting kad rotiras sam misem mesh sluzi za vracanje u prvobitnu poziciju
      //  pa ako se neupdejta odma posle animacije ce se vratiti nazad
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

    scene.activeCamera = scene.cameras[1];

    scene.activeCamera.attachControl(canvas, true);

    console.log(scene.animationGroups.find((a) => a.name === "CameraAction"));

    console.log(camera);
    console.log(scene.cameras[1]);

    scene.animationGroups.find((a) => a.name === "CameraAction").play(true);

    let lineBumpTexture = result.meshes[3].material.bumpTexture;

    let knitBumpTexture = new BABYLON.Texture(
      "img/fabric_129_normal-2K.jpg",
      scene
    );
    knitBumpTexture.uOffset = 0;
    knitBumpTexture.vOffset = 0;
    knitBumpTexture.uScale = 20;
    knitBumpTexture.vScale = 20;

    // samo 3 i 4 meshevima menjam texture pa ovde menjam malo materijal da izgleda ok kad se menja materijal
    result.meshes[3].material._metallicTexture = null;
    result.meshes[4].material._metallicTexture = null;
    result.meshes[3].material.bumpTexture.level = 1;
    result.meshes[4].material.bumpTexture.level = 1;
    result.meshes[3].material.ambientTexture.level = 1.2;
    result.meshes[4].material.ambientTexture.level = 1.2;

    ///ovo je za menjanje boja i textura
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

            for (let i = 1; i < result.meshes.length; i++) {
              result.meshes[i].material.ambientTexture = shadowTextureKnit;
            }
          } else if (textilePicked == "Linije") {
            result.meshes[3].material.bumpTexture = lineBumpTexture;
            result.meshes[4].material.bumpTexture = lineBumpTexture;
            for (let i = 1; i < result.meshes.length; i++) {
              result.meshes[i].material.ambientTexture = shadowTextureLine;
              console.log(result.meshes[i].material);
            }
          }
        });
      }
    }

    var frame = 0;
    let oldValue = 0;
    let newValue = 0;

    let cover = document.getElementById("cover");

    let bigText = document.getElementsByClassName("BigText");
    let newPosition;
    let lastPosition;
    //mora da cloniram kameru jer mutira vrednost ako je samo uznem
    setTimeout(function () {
      newPosition = scene.activeCamera.globalPosition.clone();
      lastPosition = scene.activeCamera.globalPosition.clone();
    }, 1000);
    canvas.style.backgroundSize = screen.width + "px";

    let rotateFlag = true;

    let lastPointerX;
    ///ovo dole je za rotaciju mesha misom
    function onPointerMove() {
      let angle = result.meshes[2].rotation.y / (2 * Math.PI);
      while (angle > 1) {
        angle -= 1;
      }

      if (!rotateFlag) {
        let diffX = scene.pointerX - lastPointerX;

        for (let i = 1; i < result.meshes.length; i++) {
          result.meshes[i].rotation.y += diffX * 0.003;
        }

        lastPointerX = scene.pointerX;
      }
    }
    let clicked = false;

    function onPointerDown() {
      lastPointerX = scene.pointerX;
      rotateFlag = false;

      clicked = true;
      arc.style.display = "flex";

      scene.activeCamera.detachControl();
    }

    function onPointerUp() {
      rotateFlag = true;
      clicked = false;

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

    scene.registerBeforeRender(function () {
      ///ovo je da se elipsa pojavi dok rotiras misom i bude providna kolko ostali text
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
      ///za vracanje u prvobitnu poziciju posle rotiranja misom
      if (rotateFlag && !animating) {
        if (result.meshes[2].rotation.y < xStarting) {
          for (let i = 1; i < result.meshes.length; i++) {
            result.meshes[i].rotation.y += 0.08;
          }
        }
        if (result.meshes[2].rotation.y > xStarting) {
          for (let i = 1; i < result.meshes.length; i++) {
            result.meshes[i].rotation.y -= 0.08;
          }
        }
      }
    });

    let positionBackground = screen.width;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      newValue = window.pageYOffset;

      //ovo je koliko moras da skrolas da se pojave boje i da nestane cover sa videom

      for (let i = 0; i < colorChoice.length; i++) {
        if (currentScroll <= 300) {
          colorsUp.style.opacity = currentScroll / 300;
          colorsDown.style.opacity = currentScroll / 300;

          cover.style.opacity = 1 - currentScroll / 300;
          if (cover.style.opacity > 0) {
            cover.style.display = "flex";
          }
        } else {
          colorsDown.style.opacity = 1;
          colorsUp.style.opacity = 1;

          cover.style.opacity = 0;
          if (cover.style.opacity == 0) {
            cover.style.display = "none";
          }
        }
      }

      newPosition = scene.cameras[1].globalPosition.clone();

      ///ovo je da pozadina se uvelicava kad kamera prilazi meshu da fejka zoom
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

      ///ovo je kad da nestanu stvari dok skrolas onaj veliki text , elipsa i slicno

      if (currentScroll > 500 && currentScroll < 800) {
        frameAndText.style.opacity = 1 - (currentScroll - 500) / 300;
        arc.style.opacity = 1 - (currentScroll - 500) / 300;
      } else if (currentScroll > 800) {
        frameAndText.style.opacity = 0;
        arc.style.opacity = 0;
      } else if (currentScroll <= 300) {
        frameAndText.style.opacity = currentScroll / 300;
        arc.style.opacity = currentScroll / 300;
      } else if (currentScroll > 300 && currentScroll < 500) {
        frameAndText.style.opacity = 1;
        arc.style.opacity = 1;
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
        }
      };
    });
  });

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

window.addEventListener("resize", function () {
  engine.resize();
});

SmoothScroll({
  animationTime: 2000,
  stepSize: 100,

  accelerationDelta: 50,
  accelerationMax: 3,

  keyboardSupport: true,
  arrowScroll: 50,

  pulseAlgorithm: true,
  pulseScale: 4,
  pulseNormalize: 1,

  touchpadSupport: false,
  fixedBackground: true,
  excluded: "",
});
