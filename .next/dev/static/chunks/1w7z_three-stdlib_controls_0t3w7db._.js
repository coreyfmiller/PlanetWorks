(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/ArcballControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArcballControls",
    ()=>ArcballControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
const STATE = {
    IDLE: Symbol(),
    ROTATE: Symbol(),
    PAN: Symbol(),
    SCALE: Symbol(),
    FOV: Symbol(),
    FOCUS: Symbol(),
    ZROTATE: Symbol(),
    TOUCH_MULTI: Symbol(),
    ANIMATION_FOCUS: Symbol(),
    ANIMATION_ROTATE: Symbol()
};
const INPUT = {
    NONE: Symbol(),
    ONE_FINGER: Symbol(),
    ONE_FINGER_SWITCHED: Symbol(),
    TWO_FINGER: Symbol(),
    MULT_FINGER: Symbol(),
    CURSOR: Symbol()
};
const _center = {
    x: 0,
    y: 0
};
const _transformation = {
    camera: /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"](),
    gizmos: /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]()
};
const _changeEvent = {
    type: "change"
};
const _startEvent = {
    type: "start"
};
const _endEvent = {
    type: "end"
};
class ArcballControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(camera, domElement = null, scene = null){
        super();
        __publicField(this, "camera");
        __publicField(this, "domElement");
        __publicField(this, "scene");
        __publicField(this, "mouseActions");
        __publicField(this, "_mouseOp");
        __publicField(this, "_v2_1");
        __publicField(this, "_v3_1");
        __publicField(this, "_v3_2");
        __publicField(this, "_m4_1");
        __publicField(this, "_m4_2");
        __publicField(this, "_quat");
        __publicField(this, "_translationMatrix");
        __publicField(this, "_rotationMatrix");
        __publicField(this, "_scaleMatrix");
        __publicField(this, "_rotationAxis");
        __publicField(this, "_cameraMatrixState");
        __publicField(this, "_cameraProjectionState");
        __publicField(this, "_fovState");
        __publicField(this, "_upState");
        __publicField(this, "_zoomState");
        __publicField(this, "_nearPos");
        __publicField(this, "_farPos");
        __publicField(this, "_gizmoMatrixState");
        __publicField(this, "_up0");
        __publicField(this, "_zoom0");
        __publicField(this, "_fov0");
        __publicField(this, "_initialNear");
        __publicField(this, "_nearPos0");
        __publicField(this, "_initialFar");
        __publicField(this, "_farPos0");
        __publicField(this, "_cameraMatrixState0");
        __publicField(this, "_gizmoMatrixState0");
        __publicField(this, "_button");
        __publicField(this, "_touchStart");
        __publicField(this, "_touchCurrent");
        __publicField(this, "_input");
        __publicField(this, "_switchSensibility");
        __publicField(this, "_startFingerDistance");
        __publicField(this, "_currentFingerDistance");
        __publicField(this, "_startFingerRotation");
        __publicField(this, "_currentFingerRotation");
        __publicField(this, "_devPxRatio");
        __publicField(this, "_downValid");
        __publicField(this, "_nclicks");
        __publicField(this, "_downEvents");
        __publicField(this, "_clickStart");
        __publicField(this, "_maxDownTime");
        __publicField(this, "_maxInterval");
        __publicField(this, "_posThreshold");
        __publicField(this, "_movementThreshold");
        __publicField(this, "_currentCursorPosition");
        __publicField(this, "_startCursorPosition");
        __publicField(this, "_grid");
        __publicField(this, "_gridPosition");
        __publicField(this, "_gizmos");
        __publicField(this, "_curvePts");
        __publicField(this, "_timeStart");
        __publicField(this, "_animationId");
        __publicField(this, "focusAnimationTime");
        __publicField(this, "_timePrev");
        __publicField(this, "_timeCurrent");
        __publicField(this, "_anglePrev");
        __publicField(this, "_angleCurrent");
        __publicField(this, "_cursorPosPrev");
        __publicField(this, "_cursorPosCurr");
        __publicField(this, "_wPrev");
        __publicField(this, "_wCurr");
        __publicField(this, "adjustNearFar");
        __publicField(this, "scaleFactor");
        __publicField(this, "dampingFactor");
        __publicField(this, "wMax");
        __publicField(this, "enableAnimations");
        __publicField(this, "enableGrid");
        __publicField(this, "cursorZoom");
        __publicField(this, "minFov");
        __publicField(this, "maxFov");
        __publicField(this, "enabled");
        __publicField(this, "enablePan");
        __publicField(this, "enableRotate");
        __publicField(this, "enableZoom");
        __publicField(this, "minDistance");
        __publicField(this, "maxDistance");
        __publicField(this, "minZoom");
        __publicField(this, "maxZoom");
        __publicField(this, "target");
        __publicField(this, "_currentTarget");
        __publicField(this, "_tbRadius");
        __publicField(this, "_state");
        //listeners
        __publicField(this, "onWindowResize", ()=>{
            const scale = (this._gizmos.scale.x + this._gizmos.scale.y + this._gizmos.scale.z) / 3;
            if (this.camera) {
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
            }
            const newRadius = this._tbRadius / scale;
            const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EllipseCurve"](0, 0, newRadius, newRadius);
            const points = curve.getPoints(this._curvePts);
            const curveGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
            for(const gizmo in this._gizmos.children){
                const child = this._gizmos.children[gizmo];
                child.geometry = curveGeometry;
            }
            this.dispatchEvent(_changeEvent);
        });
        __publicField(this, "onContextMenu", (event)=>{
            if (!this.enabled) {
                return;
            }
            for(let i = 0; i < this.mouseActions.length; i++){
                if (this.mouseActions[i].mouse == 2) {
                    event.preventDefault();
                    break;
                }
            }
        });
        __publicField(this, "onPointerCancel", ()=>{
            this._touchStart.splice(0, this._touchStart.length);
            this._touchCurrent.splice(0, this._touchCurrent.length);
            this._input = INPUT.NONE;
        });
        __publicField(this, "onPointerDown", (event)=>{
            if (event.button == 0 && event.isPrimary) {
                this._downValid = true;
                this._downEvents.push(event);
            } else {
                this._downValid = false;
            }
            if (event.pointerType == "touch" && this._input != INPUT.CURSOR) {
                this._touchStart.push(event);
                this._touchCurrent.push(event);
                switch(this._input){
                    case INPUT.NONE:
                        this._input = INPUT.ONE_FINGER;
                        this.onSinglePanStart(event, "ROTATE");
                        window.addEventListener("pointermove", this.onPointerMove);
                        window.addEventListener("pointerup", this.onPointerUp);
                        break;
                    case INPUT.ONE_FINGER:
                    case INPUT.ONE_FINGER_SWITCHED:
                        this._input = INPUT.TWO_FINGER;
                        this.onRotateStart();
                        this.onPinchStart();
                        this.onDoublePanStart();
                        break;
                    case INPUT.TWO_FINGER:
                        this._input = INPUT.MULT_FINGER;
                        this.onTriplePanStart();
                        break;
                }
            } else if (event.pointerType != "touch" && this._input == INPUT.NONE) {
                let modifier = null;
                if (event.ctrlKey || event.metaKey) {
                    modifier = "CTRL";
                } else if (event.shiftKey) {
                    modifier = "SHIFT";
                }
                this._mouseOp = this.getOpFromAction(event.button, modifier);
                if (this._mouseOp) {
                    window.addEventListener("pointermove", this.onPointerMove);
                    window.addEventListener("pointerup", this.onPointerUp);
                    this._input = INPUT.CURSOR;
                    this._button = event.button;
                    this.onSinglePanStart(event, this._mouseOp);
                }
            }
        });
        __publicField(this, "onPointerMove", (event)=>{
            if (event.pointerType == "touch" && this._input != INPUT.CURSOR) {
                switch(this._input){
                    case INPUT.ONE_FINGER:
                        this.updateTouchEvent(event);
                        this.onSinglePanMove(event, STATE.ROTATE);
                        break;
                    case INPUT.ONE_FINGER_SWITCHED:
                        const movement = this.calculatePointersDistance(this._touchCurrent[0], event) * this._devPxRatio;
                        if (movement >= this._switchSensibility) {
                            this._input = INPUT.ONE_FINGER;
                            this.updateTouchEvent(event);
                            this.onSinglePanStart(event, "ROTATE");
                            break;
                        }
                        break;
                    case INPUT.TWO_FINGER:
                        this.updateTouchEvent(event);
                        this.onRotateMove();
                        this.onPinchMove();
                        this.onDoublePanMove();
                        break;
                    case INPUT.MULT_FINGER:
                        this.updateTouchEvent(event);
                        this.onTriplePanMove();
                        break;
                }
            } else if (event.pointerType != "touch" && this._input == INPUT.CURSOR) {
                let modifier = null;
                if (event.ctrlKey || event.metaKey) {
                    modifier = "CTRL";
                } else if (event.shiftKey) {
                    modifier = "SHIFT";
                }
                const mouseOpState = this.getOpStateFromAction(this._button, modifier);
                if (mouseOpState) {
                    this.onSinglePanMove(event, mouseOpState);
                }
            }
            if (this._downValid) {
                const movement = this.calculatePointersDistance(this._downEvents[this._downEvents.length - 1], event) * this._devPxRatio;
                if (movement > this._movementThreshold) {
                    this._downValid = false;
                }
            }
        });
        __publicField(this, "onPointerUp", (event)=>{
            if (event.pointerType == "touch" && this._input != INPUT.CURSOR) {
                const nTouch = this._touchCurrent.length;
                for(let i = 0; i < nTouch; i++){
                    if (this._touchCurrent[i].pointerId == event.pointerId) {
                        this._touchCurrent.splice(i, 1);
                        this._touchStart.splice(i, 1);
                        break;
                    }
                }
                switch(this._input){
                    case INPUT.ONE_FINGER:
                    case INPUT.ONE_FINGER_SWITCHED:
                        window.removeEventListener("pointermove", this.onPointerMove);
                        window.removeEventListener("pointerup", this.onPointerUp);
                        this._input = INPUT.NONE;
                        this.onSinglePanEnd();
                        break;
                    case INPUT.TWO_FINGER:
                        this.onDoublePanEnd();
                        this.onPinchEnd();
                        this.onRotateEnd();
                        this._input = INPUT.ONE_FINGER_SWITCHED;
                        break;
                    case INPUT.MULT_FINGER:
                        if (this._touchCurrent.length == 0) {
                            window.removeEventListener("pointermove", this.onPointerMove);
                            window.removeEventListener("pointerup", this.onPointerUp);
                            this._input = INPUT.NONE;
                            this.onTriplePanEnd();
                        }
                        break;
                }
            } else if (event.pointerType != "touch" && this._input == INPUT.CURSOR) {
                window.removeEventListener("pointermove", this.onPointerMove);
                window.removeEventListener("pointerup", this.onPointerUp);
                this._input = INPUT.NONE;
                this.onSinglePanEnd();
                this._button = -1;
            }
            if (event.isPrimary) {
                if (this._downValid) {
                    const downTime = event.timeStamp - this._downEvents[this._downEvents.length - 1].timeStamp;
                    if (downTime <= this._maxDownTime) {
                        if (this._nclicks == 0) {
                            this._nclicks = 1;
                            this._clickStart = performance.now();
                        } else {
                            const clickInterval = event.timeStamp - this._clickStart;
                            const movement = this.calculatePointersDistance(this._downEvents[1], this._downEvents[0]) * this._devPxRatio;
                            if (clickInterval <= this._maxInterval && movement <= this._posThreshold) {
                                this._nclicks = 0;
                                this._downEvents.splice(0, this._downEvents.length);
                                this.onDoubleTap(event);
                            } else {
                                this._nclicks = 1;
                                this._downEvents.shift();
                                this._clickStart = performance.now();
                            }
                        }
                    } else {
                        this._downValid = false;
                        this._nclicks = 0;
                        this._downEvents.splice(0, this._downEvents.length);
                    }
                } else {
                    this._nclicks = 0;
                    this._downEvents.splice(0, this._downEvents.length);
                }
            }
        });
        __publicField(this, "onWheel", (event)=>{
            var _a, _b;
            if (this.enabled && this.enableZoom && this.domElement) {
                let modifier = null;
                if (event.ctrlKey || event.metaKey) {
                    modifier = "CTRL";
                } else if (event.shiftKey) {
                    modifier = "SHIFT";
                }
                const mouseOp = this.getOpFromAction("WHEEL", modifier);
                if (mouseOp) {
                    event.preventDefault();
                    this.dispatchEvent(_startEvent);
                    const notchDeltaY = 125;
                    let sgn = event.deltaY / notchDeltaY;
                    let size = 1;
                    if (sgn > 0) {
                        size = 1 / this.scaleFactor;
                    } else if (sgn < 0) {
                        size = this.scaleFactor;
                    }
                    switch(mouseOp){
                        case "ZOOM":
                            this.updateTbState(STATE.SCALE, true);
                            if (sgn > 0) {
                                size = 1 / Math.pow(this.scaleFactor, sgn);
                            } else if (sgn < 0) {
                                size = Math.pow(this.scaleFactor, -sgn);
                            }
                            if (this.cursorZoom && this.enablePan) {
                                let scalePoint;
                                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                                    scalePoint = (_a = this.unprojectOnTbPlane(this.camera, event.clientX, event.clientY, this.domElement)) == null ? void 0 : _a.applyQuaternion(this.camera.quaternion).multiplyScalar(1 / this.camera.zoom).add(this._gizmos.position);
                                }
                                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                                    scalePoint = (_b = this.unprojectOnTbPlane(this.camera, event.clientX, event.clientY, this.domElement)) == null ? void 0 : _b.applyQuaternion(this.camera.quaternion).add(this._gizmos.position);
                                }
                                if (scalePoint !== void 0) this.applyTransformMatrix(this.applyScale(size, scalePoint));
                            } else {
                                this.applyTransformMatrix(this.applyScale(size, this._gizmos.position));
                            }
                            if (this._grid) {
                                this.disposeGrid();
                                this.drawGrid();
                            }
                            this.updateTbState(STATE.IDLE, false);
                            this.dispatchEvent(_changeEvent);
                            this.dispatchEvent(_endEvent);
                            break;
                        case "FOV":
                            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                                this.updateTbState(STATE.FOV, true);
                                if (event.deltaX != 0) {
                                    sgn = event.deltaX / notchDeltaY;
                                    size = 1;
                                    if (sgn > 0) {
                                        size = 1 / Math.pow(this.scaleFactor, sgn);
                                    } else if (sgn < 0) {
                                        size = Math.pow(this.scaleFactor, -sgn);
                                    }
                                }
                                this._v3_1.setFromMatrixPosition(this._cameraMatrixState);
                                const x = this._v3_1.distanceTo(this._gizmos.position);
                                let xNew = x / size;
                                xNew = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(xNew, this.minDistance, this.maxDistance);
                                const y = x * Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * this.camera.fov * 0.5);
                                let newFov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].RAD2DEG * (Math.atan(y / xNew) * 2);
                                if (newFov > this.maxFov) {
                                    newFov = this.maxFov;
                                } else if (newFov < this.minFov) {
                                    newFov = this.minFov;
                                }
                                const newDistance = y / Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * (newFov / 2));
                                size = x / newDistance;
                                this.setFov(newFov);
                                this.applyTransformMatrix(this.applyScale(size, this._gizmos.position, false));
                            }
                            if (this._grid) {
                                this.disposeGrid();
                                this.drawGrid();
                            }
                            this.updateTbState(STATE.IDLE, false);
                            this.dispatchEvent(_changeEvent);
                            this.dispatchEvent(_endEvent);
                            break;
                    }
                }
            }
        });
        __publicField(this, "onSinglePanStart", (event, operation)=>{
            if (this.enabled && this.domElement) {
                this.dispatchEvent(_startEvent);
                this.setCenter(event.clientX, event.clientY);
                switch(operation){
                    case "PAN":
                        if (!this.enablePan) return;
                        if (this._animationId != -1) {
                            cancelAnimationFrame(this._animationId);
                            this._animationId = -1;
                            this._timeStart = -1;
                            this.activateGizmos(false);
                            this.dispatchEvent(_changeEvent);
                        }
                        if (this.camera) {
                            this.updateTbState(STATE.PAN, true);
                            const rayDir = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement);
                            if (rayDir !== void 0) {
                                this._startCursorPosition.copy(rayDir);
                            }
                            if (this.enableGrid) {
                                this.drawGrid();
                                this.dispatchEvent(_changeEvent);
                            }
                        }
                        break;
                    case "ROTATE":
                        if (!this.enableRotate) return;
                        if (this._animationId != -1) {
                            cancelAnimationFrame(this._animationId);
                            this._animationId = -1;
                            this._timeStart = -1;
                        }
                        if (this.camera) {
                            this.updateTbState(STATE.ROTATE, true);
                            const rayDir = this.unprojectOnTbSurface(this.camera, _center.x, _center.y, this.domElement, this._tbRadius);
                            if (rayDir !== void 0) {
                                this._startCursorPosition.copy(rayDir);
                            }
                            this.activateGizmos(true);
                            if (this.enableAnimations) {
                                this._timePrev = this._timeCurrent = performance.now();
                                this._angleCurrent = this._anglePrev = 0;
                                this._cursorPosPrev.copy(this._startCursorPosition);
                                this._cursorPosCurr.copy(this._cursorPosPrev);
                                this._wCurr = 0;
                                this._wPrev = this._wCurr;
                            }
                        }
                        this.dispatchEvent(_changeEvent);
                        break;
                    case "FOV":
                        if (!this.enableZoom) return;
                        if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                            if (this._animationId != -1) {
                                cancelAnimationFrame(this._animationId);
                                this._animationId = -1;
                                this._timeStart = -1;
                                this.activateGizmos(false);
                                this.dispatchEvent(_changeEvent);
                            }
                            this.updateTbState(STATE.FOV, true);
                            this._startCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                            this._currentCursorPosition.copy(this._startCursorPosition);
                        }
                        break;
                    case "ZOOM":
                        if (!this.enableZoom) return;
                        if (this._animationId != -1) {
                            cancelAnimationFrame(this._animationId);
                            this._animationId = -1;
                            this._timeStart = -1;
                            this.activateGizmos(false);
                            this.dispatchEvent(_changeEvent);
                        }
                        this.updateTbState(STATE.SCALE, true);
                        this._startCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                        this._currentCursorPosition.copy(this._startCursorPosition);
                        break;
                }
            }
        });
        __publicField(this, "onSinglePanMove", (event, opState)=>{
            if (this.enabled && this.domElement) {
                const restart = opState != this._state;
                this.setCenter(event.clientX, event.clientY);
                switch(opState){
                    case STATE.PAN:
                        if (this.enablePan && this.camera) {
                            if (restart) {
                                this.dispatchEvent(_endEvent);
                                this.dispatchEvent(_startEvent);
                                this.updateTbState(opState, true);
                                const rayDir = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement);
                                if (rayDir !== void 0) {
                                    this._startCursorPosition.copy(rayDir);
                                }
                                if (this.enableGrid) {
                                    this.drawGrid();
                                }
                                this.activateGizmos(false);
                            } else {
                                const rayDir = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement);
                                if (rayDir !== void 0) {
                                    this._currentCursorPosition.copy(rayDir);
                                }
                                this.applyTransformMatrix(this.pan(this._startCursorPosition, this._currentCursorPosition));
                            }
                        }
                        break;
                    case STATE.ROTATE:
                        if (this.enableRotate && this.camera) {
                            if (restart) {
                                this.dispatchEvent(_endEvent);
                                this.dispatchEvent(_startEvent);
                                this.updateTbState(opState, true);
                                const rayDir = this.unprojectOnTbSurface(this.camera, _center.x, _center.y, this.domElement, this._tbRadius);
                                if (rayDir !== void 0) {
                                    this._startCursorPosition.copy(rayDir);
                                }
                                if (this.enableGrid) {
                                    this.disposeGrid();
                                }
                                this.activateGizmos(true);
                            } else {
                                const rayDir = this.unprojectOnTbSurface(this.camera, _center.x, _center.y, this.domElement, this._tbRadius);
                                if (rayDir !== void 0) {
                                    this._currentCursorPosition.copy(rayDir);
                                }
                                const distance = this._startCursorPosition.distanceTo(this._currentCursorPosition);
                                const angle = this._startCursorPosition.angleTo(this._currentCursorPosition);
                                const amount = Math.max(distance / this._tbRadius, angle);
                                this.applyTransformMatrix(this.rotate(this.calculateRotationAxis(this._startCursorPosition, this._currentCursorPosition), amount));
                                if (this.enableAnimations) {
                                    this._timePrev = this._timeCurrent;
                                    this._timeCurrent = performance.now();
                                    this._anglePrev = this._angleCurrent;
                                    this._angleCurrent = amount;
                                    this._cursorPosPrev.copy(this._cursorPosCurr);
                                    this._cursorPosCurr.copy(this._currentCursorPosition);
                                    this._wPrev = this._wCurr;
                                    this._wCurr = this.calculateAngularSpeed(this._anglePrev, this._angleCurrent, this._timePrev, this._timeCurrent);
                                }
                            }
                        }
                        break;
                    case STATE.SCALE:
                        if (this.enableZoom) {
                            if (restart) {
                                this.dispatchEvent(_endEvent);
                                this.dispatchEvent(_startEvent);
                                this.updateTbState(opState, true);
                                this._startCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                                this._currentCursorPosition.copy(this._startCursorPosition);
                                if (this.enableGrid) {
                                    this.disposeGrid();
                                }
                                this.activateGizmos(false);
                            } else {
                                const screenNotches = 8;
                                this._currentCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                                const movement = this._currentCursorPosition.y - this._startCursorPosition.y;
                                let size = 1;
                                if (movement < 0) {
                                    size = 1 / Math.pow(this.scaleFactor, -movement * screenNotches);
                                } else if (movement > 0) {
                                    size = Math.pow(this.scaleFactor, movement * screenNotches);
                                }
                                this.applyTransformMatrix(this.applyScale(size, this._gizmos.position));
                            }
                        }
                        break;
                    case STATE.FOV:
                        if (this.enableZoom && this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                            if (restart) {
                                this.dispatchEvent(_endEvent);
                                this.dispatchEvent(_startEvent);
                                this.updateTbState(opState, true);
                                this._startCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                                this._currentCursorPosition.copy(this._startCursorPosition);
                                if (this.enableGrid) {
                                    this.disposeGrid();
                                }
                                this.activateGizmos(false);
                            } else {
                                const screenNotches = 8;
                                this._currentCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                                const movement = this._currentCursorPosition.y - this._startCursorPosition.y;
                                let size = 1;
                                if (movement < 0) {
                                    size = 1 / Math.pow(this.scaleFactor, -movement * screenNotches);
                                } else if (movement > 0) {
                                    size = Math.pow(this.scaleFactor, movement * screenNotches);
                                }
                                this._v3_1.setFromMatrixPosition(this._cameraMatrixState);
                                const x = this._v3_1.distanceTo(this._gizmos.position);
                                let xNew = x / size;
                                xNew = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(xNew, this.minDistance, this.maxDistance);
                                const y = x * Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * this._fovState * 0.5);
                                let newFov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].RAD2DEG * (Math.atan(y / xNew) * 2);
                                newFov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(newFov, this.minFov, this.maxFov);
                                const newDistance = y / Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * (newFov / 2));
                                size = x / newDistance;
                                this._v3_2.setFromMatrixPosition(this._gizmoMatrixState);
                                this.setFov(newFov);
                                this.applyTransformMatrix(this.applyScale(size, this._v3_2, false));
                                const direction = this._gizmos.position.clone().sub(this.camera.position).normalize().multiplyScalar(newDistance / x);
                                this._m4_1.makeTranslation(direction.x, direction.y, direction.z);
                            }
                        }
                        break;
                }
                this.dispatchEvent(_changeEvent);
            }
        });
        __publicField(this, "onSinglePanEnd", ()=>{
            if (this._state == STATE.ROTATE) {
                if (!this.enableRotate) {
                    return;
                }
                if (this.enableAnimations) {
                    const deltaTime = performance.now() - this._timeCurrent;
                    if (deltaTime < 120) {
                        const w = Math.abs((this._wPrev + this._wCurr) / 2);
                        const self = this;
                        this._animationId = window.requestAnimationFrame(function(t) {
                            self.updateTbState(STATE.ANIMATION_ROTATE, true);
                            const rotationAxis = self.calculateRotationAxis(self._cursorPosPrev, self._cursorPosCurr);
                            self.onRotationAnim(t, rotationAxis, Math.min(w, self.wMax));
                        });
                    } else {
                        this.updateTbState(STATE.IDLE, false);
                        this.activateGizmos(false);
                        this.dispatchEvent(_changeEvent);
                    }
                } else {
                    this.updateTbState(STATE.IDLE, false);
                    this.activateGizmos(false);
                    this.dispatchEvent(_changeEvent);
                }
            } else if (this._state == STATE.PAN || this._state == STATE.IDLE) {
                this.updateTbState(STATE.IDLE, false);
                if (this.enableGrid) {
                    this.disposeGrid();
                }
                this.activateGizmos(false);
                this.dispatchEvent(_changeEvent);
            }
            this.dispatchEvent(_endEvent);
        });
        __publicField(this, "onDoubleTap", (event)=>{
            if (this.enabled && this.enablePan && this.scene && this.camera && this.domElement) {
                this.dispatchEvent(_startEvent);
                this.setCenter(event.clientX, event.clientY);
                const hitP = this.unprojectOnObj(this.getCursorNDC(_center.x, _center.y, this.domElement), this.camera);
                if (hitP && this.enableAnimations) {
                    const self = this;
                    if (this._animationId != -1) {
                        window.cancelAnimationFrame(this._animationId);
                    }
                    this._timeStart = -1;
                    this._animationId = window.requestAnimationFrame(function(t) {
                        self.updateTbState(STATE.ANIMATION_FOCUS, true);
                        self.onFocusAnim(t, hitP, self._cameraMatrixState, self._gizmoMatrixState);
                    });
                } else if (hitP && !this.enableAnimations) {
                    this.updateTbState(STATE.FOCUS, true);
                    this.focus(hitP, this.scaleFactor);
                    this.updateTbState(STATE.IDLE, false);
                    this.dispatchEvent(_changeEvent);
                }
            }
            this.dispatchEvent(_endEvent);
        });
        __publicField(this, "onDoublePanStart", ()=>{
            if (this.enabled && this.enablePan && this.camera && this.domElement) {
                this.dispatchEvent(_startEvent);
                this.updateTbState(STATE.PAN, true);
                this.setCenter((this._touchCurrent[0].clientX + this._touchCurrent[1].clientX) / 2, (this._touchCurrent[0].clientY + this._touchCurrent[1].clientY) / 2);
                const rayDir = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement, true);
                if (rayDir !== void 0) {
                    this._startCursorPosition.copy(rayDir);
                }
                this._currentCursorPosition.copy(this._startCursorPosition);
                this.activateGizmos(false);
            }
        });
        __publicField(this, "onDoublePanMove", ()=>{
            if (this.enabled && this.enablePan && this.camera && this.domElement) {
                this.setCenter((this._touchCurrent[0].clientX + this._touchCurrent[1].clientX) / 2, (this._touchCurrent[0].clientY + this._touchCurrent[1].clientY) / 2);
                if (this._state != STATE.PAN) {
                    this.updateTbState(STATE.PAN, true);
                    this._startCursorPosition.copy(this._currentCursorPosition);
                }
                const rayDir = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement, true);
                if (rayDir !== void 0) this._currentCursorPosition.copy(rayDir);
                this.applyTransformMatrix(this.pan(this._startCursorPosition, this._currentCursorPosition, true));
                this.dispatchEvent(_changeEvent);
            }
        });
        __publicField(this, "onDoublePanEnd", ()=>{
            this.updateTbState(STATE.IDLE, false);
            this.dispatchEvent(_endEvent);
        });
        __publicField(this, "onRotateStart", ()=>{
            var _a;
            if (this.enabled && this.enableRotate) {
                this.dispatchEvent(_startEvent);
                this.updateTbState(STATE.ZROTATE, true);
                this._startFingerRotation = this.getAngle(this._touchCurrent[1], this._touchCurrent[0]) + this.getAngle(this._touchStart[1], this._touchStart[0]);
                this._currentFingerRotation = this._startFingerRotation;
                (_a = this.camera) == null ? void 0 : _a.getWorldDirection(this._rotationAxis);
                if (!this.enablePan && !this.enableZoom) {
                    this.activateGizmos(true);
                }
            }
        });
        __publicField(this, "onRotateMove", ()=>{
            var _a;
            if (this.enabled && this.enableRotate && this.camera && this.domElement) {
                this.setCenter((this._touchCurrent[0].clientX + this._touchCurrent[1].clientX) / 2, (this._touchCurrent[0].clientY + this._touchCurrent[1].clientY) / 2);
                let rotationPoint;
                if (this._state != STATE.ZROTATE) {
                    this.updateTbState(STATE.ZROTATE, true);
                    this._startFingerRotation = this._currentFingerRotation;
                }
                this._currentFingerRotation = this.getAngle(this._touchCurrent[1], this._touchCurrent[0]) + this.getAngle(this._touchStart[1], this._touchStart[0]);
                if (!this.enablePan) {
                    rotationPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().setFromMatrixPosition(this._gizmoMatrixState);
                } else if (this.camera) {
                    this._v3_2.setFromMatrixPosition(this._gizmoMatrixState);
                    rotationPoint = (_a = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement)) == null ? void 0 : _a.applyQuaternion(this.camera.quaternion).multiplyScalar(1 / this.camera.zoom).add(this._v3_2);
                }
                const amount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * (this._startFingerRotation - this._currentFingerRotation);
                if (rotationPoint !== void 0) {
                    this.applyTransformMatrix(this.zRotate(rotationPoint, amount));
                }
                this.dispatchEvent(_changeEvent);
            }
        });
        __publicField(this, "onRotateEnd", ()=>{
            this.updateTbState(STATE.IDLE, false);
            this.activateGizmos(false);
            this.dispatchEvent(_endEvent);
        });
        __publicField(this, "onPinchStart", ()=>{
            if (this.enabled && this.enableZoom) {
                this.dispatchEvent(_startEvent);
                this.updateTbState(STATE.SCALE, true);
                this._startFingerDistance = this.calculatePointersDistance(this._touchCurrent[0], this._touchCurrent[1]);
                this._currentFingerDistance = this._startFingerDistance;
                this.activateGizmos(false);
            }
        });
        __publicField(this, "onPinchMove", ()=>{
            var _a, _b;
            if (this.enabled && this.enableZoom && this.domElement) {
                this.setCenter((this._touchCurrent[0].clientX + this._touchCurrent[1].clientX) / 2, (this._touchCurrent[0].clientY + this._touchCurrent[1].clientY) / 2);
                const minDistance = 12;
                if (this._state != STATE.SCALE) {
                    this._startFingerDistance = this._currentFingerDistance;
                    this.updateTbState(STATE.SCALE, true);
                }
                this._currentFingerDistance = Math.max(this.calculatePointersDistance(this._touchCurrent[0], this._touchCurrent[1]), minDistance * this._devPxRatio);
                const amount = this._currentFingerDistance / this._startFingerDistance;
                let scalePoint;
                if (!this.enablePan) {
                    scalePoint = this._gizmos.position;
                } else {
                    if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                        scalePoint = (_a = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement)) == null ? void 0 : _a.applyQuaternion(this.camera.quaternion).multiplyScalar(1 / this.camera.zoom).add(this._gizmos.position);
                    } else if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                        scalePoint = (_b = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement)) == null ? void 0 : _b.applyQuaternion(this.camera.quaternion).add(this._gizmos.position);
                    }
                }
                if (scalePoint !== void 0) {
                    this.applyTransformMatrix(this.applyScale(amount, scalePoint));
                }
                this.dispatchEvent(_changeEvent);
            }
        });
        __publicField(this, "onPinchEnd", ()=>{
            this.updateTbState(STATE.IDLE, false);
            this.dispatchEvent(_endEvent);
        });
        __publicField(this, "onTriplePanStart", ()=>{
            if (this.enabled && this.enableZoom && this.domElement) {
                this.dispatchEvent(_startEvent);
                this.updateTbState(STATE.SCALE, true);
                let clientX = 0;
                let clientY = 0;
                const nFingers = this._touchCurrent.length;
                for(let i = 0; i < nFingers; i++){
                    clientX += this._touchCurrent[i].clientX;
                    clientY += this._touchCurrent[i].clientY;
                }
                this.setCenter(clientX / nFingers, clientY / nFingers);
                this._startCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                this._currentCursorPosition.copy(this._startCursorPosition);
            }
        });
        __publicField(this, "onTriplePanMove", ()=>{
            if (this.enabled && this.enableZoom && this.camera && this.domElement) {
                let clientX = 0;
                let clientY = 0;
                const nFingers = this._touchCurrent.length;
                for(let i = 0; i < nFingers; i++){
                    clientX += this._touchCurrent[i].clientX;
                    clientY += this._touchCurrent[i].clientY;
                }
                this.setCenter(clientX / nFingers, clientY / nFingers);
                const screenNotches = 8;
                this._currentCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                const movement = this._currentCursorPosition.y - this._startCursorPosition.y;
                let size = 1;
                if (movement < 0) {
                    size = 1 / Math.pow(this.scaleFactor, -movement * screenNotches);
                } else if (movement > 0) {
                    size = Math.pow(this.scaleFactor, movement * screenNotches);
                }
                this._v3_1.setFromMatrixPosition(this._cameraMatrixState);
                const x = this._v3_1.distanceTo(this._gizmos.position);
                let xNew = x / size;
                xNew = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(xNew, this.minDistance, this.maxDistance);
                const y = x * Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * this._fovState * 0.5);
                let newFov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].RAD2DEG * (Math.atan(y / xNew) * 2);
                newFov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(newFov, this.minFov, this.maxFov);
                const newDistance = y / Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * (newFov / 2));
                size = x / newDistance;
                this._v3_2.setFromMatrixPosition(this._gizmoMatrixState);
                this.setFov(newFov);
                this.applyTransformMatrix(this.applyScale(size, this._v3_2, false));
                const direction = this._gizmos.position.clone().sub(this.camera.position).normalize().multiplyScalar(newDistance / x);
                this._m4_1.makeTranslation(direction.x, direction.y, direction.z);
                this.dispatchEvent(_changeEvent);
            }
        });
        __publicField(this, "onTriplePanEnd", ()=>{
            this.updateTbState(STATE.IDLE, false);
            this.dispatchEvent(_endEvent);
        });
        /**
     * Set _center's x/y coordinates
     * @param {Number} clientX
     * @param {Number} clientY
     */ __publicField(this, "setCenter", (clientX, clientY)=>{
            _center.x = clientX;
            _center.y = clientY;
        });
        /**
     * Set default mouse actions
     */ __publicField(this, "initializeMouseActions", ()=>{
            this.setMouseAction("PAN", 0, "CTRL");
            this.setMouseAction("PAN", 2);
            this.setMouseAction("ROTATE", 0);
            this.setMouseAction("ZOOM", "WHEEL");
            this.setMouseAction("ZOOM", 1);
            this.setMouseAction("FOV", "WHEEL", "SHIFT");
            this.setMouseAction("FOV", 1, "SHIFT");
        });
        /**
     * Set a new mouse action by specifying the operation to be performed and a mouse/key combination. In case of conflict, replaces the existing one
     * @param {String} operation The operation to be performed ('PAN', 'ROTATE', 'ZOOM', 'FOV)
     * @param {*} mouse A mouse button (0, 1, 2) or 'WHEEL' for wheel notches
     * @param {*} key The keyboard modifier ('CTRL', 'SHIFT') or null if key is not needed
     * @returns {Boolean} True if the mouse action has been successfully added, false otherwise
     */ __publicField(this, "setMouseAction", (operation, mouse, key = null)=>{
            const operationInput = [
                "PAN",
                "ROTATE",
                "ZOOM",
                "FOV"
            ];
            const mouseInput = [
                0,
                1,
                2,
                "WHEEL"
            ];
            const keyInput = [
                "CTRL",
                "SHIFT",
                null
            ];
            let state;
            if (!operationInput.includes(operation) || !mouseInput.includes(mouse) || !keyInput.includes(key)) {
                return false;
            }
            if (mouse == "WHEEL") {
                if (operation != "ZOOM" && operation != "FOV") {
                    return false;
                }
            }
            switch(operation){
                case "PAN":
                    state = STATE.PAN;
                    break;
                case "ROTATE":
                    state = STATE.ROTATE;
                    break;
                case "ZOOM":
                    state = STATE.SCALE;
                    break;
                case "FOV":
                    state = STATE.FOV;
                    break;
            }
            const action = {
                operation,
                mouse,
                key,
                state
            };
            for(let i = 0; i < this.mouseActions.length; i++){
                if (this.mouseActions[i].mouse == action.mouse && this.mouseActions[i].key == action.key) {
                    this.mouseActions.splice(i, 1, action);
                    return true;
                }
            }
            this.mouseActions.push(action);
            return true;
        });
        /**
     * Return the operation associated to a mouse/keyboard combination
     * @param {*} mouse A mouse button (0, 1, 2) or 'WHEEL' for wheel notches
     * @param {*} key The keyboard modifier ('CTRL', 'SHIFT') or null if key is not needed
     * @returns The operation if it has been found, null otherwise
     */ __publicField(this, "getOpFromAction", (mouse, key)=>{
            let action;
            for(let i = 0; i < this.mouseActions.length; i++){
                action = this.mouseActions[i];
                if (action.mouse == mouse && action.key == key) {
                    return action.operation;
                }
            }
            if (key) {
                for(let i = 0; i < this.mouseActions.length; i++){
                    action = this.mouseActions[i];
                    if (action.mouse == mouse && action.key == null) {
                        return action.operation;
                    }
                }
            }
            return null;
        });
        /**
     * Get the operation associated to mouse and key combination and returns the corresponding FSA state
     * @param {Number} mouse Mouse button
     * @param {String} key Keyboard modifier
     * @returns The FSA state obtained from the operation associated to mouse/keyboard combination
     */ __publicField(this, "getOpStateFromAction", (mouse, key)=>{
            let action;
            for(let i = 0; i < this.mouseActions.length; i++){
                action = this.mouseActions[i];
                if (action.mouse == mouse && action.key == key) {
                    return action.state;
                }
            }
            if (key) {
                for(let i = 0; i < this.mouseActions.length; i++){
                    action = this.mouseActions[i];
                    if (action.mouse == mouse && action.key == null) {
                        return action.state;
                    }
                }
            }
            return null;
        });
        /**
     * Calculate the angle between two pointers
     * @param {PointerEvent} p1
     * @param {PointerEvent} p2
     * @returns {Number} The angle between two pointers in degrees
     */ __publicField(this, "getAngle", (p1, p2)=>{
            return Math.atan2(p2.clientY - p1.clientY, p2.clientX - p1.clientX) * 180 / Math.PI;
        });
        /**
     * Update a PointerEvent inside current pointerevents array
     * @param {PointerEvent} event
     */ __publicField(this, "updateTouchEvent", (event)=>{
            for(let i = 0; i < this._touchCurrent.length; i++){
                if (this._touchCurrent[i].pointerId == event.pointerId) {
                    this._touchCurrent.splice(i, 1, event);
                    break;
                }
            }
        });
        /**
     * Calculate the angular speed
     * @param {Number} p0 Position at t0
     * @param {Number} p1 Position at t1
     * @param {Number} t0 Initial time in milliseconds
     * @param {Number} t1 Ending time in milliseconds
     */ __publicField(this, "calculateAngularSpeed", (p0, p1, t0, t1)=>{
            const s = p1 - p0;
            const t = (t1 - t0) / 1e3;
            if (t == 0) {
                return 0;
            }
            return s / t;
        });
        /**
     * Calculate the distance between two pointers
     * @param {PointerEvent} p0 The first pointer
     * @param {PointerEvent} p1 The second pointer
     * @returns {number} The distance between the two pointers
     */ __publicField(this, "calculatePointersDistance", (p0, p1)=>{
            return Math.sqrt(Math.pow(p1.clientX - p0.clientX, 2) + Math.pow(p1.clientY - p0.clientY, 2));
        });
        /**
     * Calculate the rotation axis as the vector perpendicular between two vectors
     * @param {Vector3} vec1 The first vector
     * @param {Vector3} vec2 The second vector
     * @returns {Vector3} The normalized rotation axis
     */ __publicField(this, "calculateRotationAxis", (vec1, vec2)=>{
            this._rotationMatrix.extractRotation(this._cameraMatrixState);
            this._quat.setFromRotationMatrix(this._rotationMatrix);
            this._rotationAxis.crossVectors(vec1, vec2).applyQuaternion(this._quat);
            return this._rotationAxis.normalize().clone();
        });
        /**
     * Calculate the trackball radius so that gizmo's diamater will be 2/3 of the minimum side of the camera frustum
     * @param {Camera} camera
     * @returns {Number} The trackball radius
     */ __publicField(this, "calculateTbRadius", (camera)=>{
            const factor = 0.67;
            const distance = camera.position.distanceTo(this._gizmos.position);
            if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                const halfFovV = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * camera.fov * 0.5;
                const halfFovH = Math.atan(camera.aspect * Math.tan(halfFovV));
                return Math.tan(Math.min(halfFovV, halfFovH)) * distance * factor;
            } else if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                return Math.min(camera.top, camera.right) * factor;
            }
        });
        /**
     * Focus operation consist of positioning the point of interest in front of the camera and a slightly zoom in
     * @param {Vector3} point The point of interest
     * @param {Number} size Scale factor
     * @param {Number} amount Amount of operation to be completed (used for focus animations, default is complete full operation)
     */ __publicField(this, "focus", (point, size, amount = 1)=>{
            if (this.camera) {
                const focusPoint = point.clone();
                focusPoint.sub(this._gizmos.position).multiplyScalar(amount);
                this._translationMatrix.makeTranslation(focusPoint.x, focusPoint.y, focusPoint.z);
                const gizmoStateTemp = this._gizmoMatrixState.clone();
                this._gizmoMatrixState.premultiply(this._translationMatrix);
                this._gizmoMatrixState.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
                const cameraStateTemp = this._cameraMatrixState.clone();
                this._cameraMatrixState.premultiply(this._translationMatrix);
                this._cameraMatrixState.decompose(this.camera.position, this.camera.quaternion, this.camera.scale);
                if (this.enableZoom) {
                    this.applyTransformMatrix(this.applyScale(size, this._gizmos.position));
                }
                this._gizmoMatrixState.copy(gizmoStateTemp);
                this._cameraMatrixState.copy(cameraStateTemp);
            }
        });
        /**
     * Draw a grid and add it to the scene
     */ __publicField(this, "drawGrid", ()=>{
            if (this.scene) {
                const color = 8947848;
                const multiplier = 3;
                let size, divisions, maxLength, tick;
                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                    const width = this.camera.right - this.camera.left;
                    const height = this.camera.bottom - this.camera.top;
                    maxLength = Math.max(width, height);
                    tick = maxLength / 20;
                    size = maxLength / this.camera.zoom * multiplier;
                    divisions = size / tick * this.camera.zoom;
                } else if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                    const distance = this.camera.position.distanceTo(this._gizmos.position);
                    const halfFovV = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * this.camera.fov * 0.5;
                    const halfFovH = Math.atan(this.camera.aspect * Math.tan(halfFovV));
                    maxLength = Math.tan(Math.max(halfFovV, halfFovH)) * distance * 2;
                    tick = maxLength / 20;
                    size = maxLength * multiplier;
                    divisions = size / tick;
                }
                if (this._grid == null && this.camera) {
                    this._grid = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GridHelper"](size, divisions, color, color);
                    this._grid.position.copy(this._gizmos.position);
                    this._gridPosition.copy(this._grid.position);
                    this._grid.quaternion.copy(this.camera.quaternion);
                    this._grid.rotateX(Math.PI * 0.5);
                    this.scene.add(this._grid);
                }
            }
        });
        __publicField(this, "connect", (domElement)=>{
            if (domElement === document) {
                console.error('THREE.ArcballControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.');
            }
            this.domElement = domElement;
            this.domElement.style.touchAction = "none";
            this.domElement.addEventListener("contextmenu", this.onContextMenu);
            this.domElement.addEventListener("pointerdown", this.onPointerDown);
            this.domElement.addEventListener("pointercancel", this.onPointerCancel);
            this.domElement.addEventListener("wheel", this.onWheel);
        });
        /**
     * Remove all listeners, stop animations and clean scene
     */ __publicField(this, "dispose", ()=>{
            var _a, _b, _c, _d, _e;
            if (this._animationId != -1) {
                window.cancelAnimationFrame(this._animationId);
            }
            (_a = this.domElement) == null ? void 0 : _a.removeEventListener("pointerdown", this.onPointerDown);
            (_b = this.domElement) == null ? void 0 : _b.removeEventListener("pointercancel", this.onPointerCancel);
            (_c = this.domElement) == null ? void 0 : _c.removeEventListener("wheel", this.onWheel);
            (_d = this.domElement) == null ? void 0 : _d.removeEventListener("contextmenu", this.onContextMenu);
            window.removeEventListener("pointermove", this.onPointerMove);
            window.removeEventListener("pointerup", this.onPointerUp);
            window.removeEventListener("resize", this.onWindowResize);
            (_e = this.scene) == null ? void 0 : _e.remove(this._gizmos);
            this.disposeGrid();
        });
        /**
     * remove the grid from the scene
     */ __publicField(this, "disposeGrid", ()=>{
            if (this._grid && this.scene) {
                this.scene.remove(this._grid);
                this._grid = null;
            }
        });
        /**
     * Compute the easing out cubic function for ease out effect in animation
     * @param {Number} t The absolute progress of the animation in the bound of 0 (beginning of the) and 1 (ending of animation)
     * @returns {Number} Result of easing out cubic at time t
     */ __publicField(this, "easeOutCubic", (t)=>{
            return 1 - Math.pow(1 - t, 3);
        });
        /**
     * Make rotation gizmos more or less visible
     * @param {Boolean} isActive If true, make gizmos more visible
     */ __publicField(this, "activateGizmos", (isActive)=>{
            for (const gizmo of this._gizmos.children){
                gizmo.material.setValues({
                    opacity: isActive ? 1 : 0.6
                });
            }
        });
        /**
     * Calculate the cursor position in NDC
     * @param {number} x Cursor horizontal coordinate within the canvas
     * @param {number} y Cursor vertical coordinate within the canvas
     * @param {HTMLElement} canvas The canvas where the renderer draws its output
     * @returns {Vector2} Cursor normalized position inside the canvas
     */ __publicField(this, "getCursorNDC", (cursorX, cursorY, canvas)=>{
            const canvasRect = canvas.getBoundingClientRect();
            this._v2_1.setX((cursorX - canvasRect.left) / canvasRect.width * 2 - 1);
            this._v2_1.setY((canvasRect.bottom - cursorY) / canvasRect.height * 2 - 1);
            return this._v2_1.clone();
        });
        /**
     * Calculate the cursor position inside the canvas x/y coordinates with the origin being in the center of the canvas
     * @param {Number} x Cursor horizontal coordinate within the canvas
     * @param {Number} y Cursor vertical coordinate within the canvas
     * @param {HTMLElement} canvas The canvas where the renderer draws its output
     * @returns {Vector2} Cursor position inside the canvas
     */ __publicField(this, "getCursorPosition", (cursorX, cursorY, canvas)=>{
            this._v2_1.copy(this.getCursorNDC(cursorX, cursorY, canvas));
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                this._v2_1.x *= (this.camera.right - this.camera.left) * 0.5;
                this._v2_1.y *= (this.camera.top - this.camera.bottom) * 0.5;
            }
            return this._v2_1.clone();
        });
        /**
     * Set the camera to be controlled
     * @param {Camera} camera The virtual camera to be controlled
     */ __publicField(this, "setCamera", (camera)=>{
            if (camera) {
                camera.lookAt(this.target);
                camera.updateMatrix();
                if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                    this._fov0 = camera.fov;
                    this._fovState = camera.fov;
                }
                this._cameraMatrixState0.copy(camera.matrix);
                this._cameraMatrixState.copy(this._cameraMatrixState0);
                this._cameraProjectionState.copy(camera.projectionMatrix);
                this._zoom0 = camera.zoom;
                this._zoomState = this._zoom0;
                this._initialNear = camera.near;
                this._nearPos0 = camera.position.distanceTo(this.target) - camera.near;
                this._nearPos = this._initialNear;
                this._initialFar = camera.far;
                this._farPos0 = camera.position.distanceTo(this.target) - camera.far;
                this._farPos = this._initialFar;
                this._up0.copy(camera.up);
                this._upState.copy(camera.up);
                this.camera = camera;
                this.camera.updateProjectionMatrix();
                const tbRadius = this.calculateTbRadius(camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                this.makeGizmos(this.target, this._tbRadius);
            }
        });
        /**
     * Creates the rotation gizmos matching trackball center and radius
     * @param {Vector3} tbCenter The trackball center
     * @param {number} tbRadius The trackball radius
     */ __publicField(this, "makeGizmos", (tbCenter, tbRadius)=>{
            const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EllipseCurve"](0, 0, tbRadius, tbRadius);
            const points = curve.getPoints(this._curvePts);
            const curveGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
            const curveMaterialX = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: 16744576,
                fog: false,
                transparent: true,
                opacity: 0.6
            });
            const curveMaterialY = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: 8454016,
                fog: false,
                transparent: true,
                opacity: 0.6
            });
            const curveMaterialZ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: 8421631,
                fog: false,
                transparent: true,
                opacity: 0.6
            });
            const gizmoX = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](curveGeometry, curveMaterialX);
            const gizmoY = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](curveGeometry, curveMaterialY);
            const gizmoZ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](curveGeometry, curveMaterialZ);
            const rotation = Math.PI * 0.5;
            gizmoX.rotation.x = rotation;
            gizmoY.rotation.y = rotation;
            this._gizmoMatrixState0.identity().setPosition(tbCenter);
            this._gizmoMatrixState.copy(this._gizmoMatrixState0);
            if (this.camera && this.camera.zoom != 1) {
                const size = 1 / this.camera.zoom;
                this._scaleMatrix.makeScale(size, size, size);
                this._translationMatrix.makeTranslation(-tbCenter.x, -tbCenter.y, -tbCenter.z);
                this._gizmoMatrixState.premultiply(this._translationMatrix).premultiply(this._scaleMatrix);
                this._translationMatrix.makeTranslation(tbCenter.x, tbCenter.y, tbCenter.z);
                this._gizmoMatrixState.premultiply(this._translationMatrix);
            }
            this._gizmoMatrixState.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
            this._gizmos.clear();
            this._gizmos.add(gizmoX);
            this._gizmos.add(gizmoY);
            this._gizmos.add(gizmoZ);
        });
        /**
     * Perform animation for focus operation
     * @param {Number} time Instant in which this function is called as performance.now()
     * @param {Vector3} point Point of interest for focus operation
     * @param {Matrix4} cameraMatrix Camera matrix
     * @param {Matrix4} gizmoMatrix Gizmos matrix
     */ __publicField(this, "onFocusAnim", (time, point, cameraMatrix, gizmoMatrix)=>{
            if (this._timeStart == -1) {
                this._timeStart = time;
            }
            if (this._state == STATE.ANIMATION_FOCUS) {
                const deltaTime = time - this._timeStart;
                const animTime = deltaTime / this.focusAnimationTime;
                this._gizmoMatrixState.copy(gizmoMatrix);
                if (animTime >= 1) {
                    this._gizmoMatrixState.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
                    this.focus(point, this.scaleFactor);
                    this._timeStart = -1;
                    this.updateTbState(STATE.IDLE, false);
                    this.activateGizmos(false);
                    this.dispatchEvent(_changeEvent);
                } else {
                    const amount = this.easeOutCubic(animTime);
                    const size = 1 - amount + this.scaleFactor * amount;
                    this._gizmoMatrixState.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
                    this.focus(point, size, amount);
                    this.dispatchEvent(_changeEvent);
                    const self = this;
                    this._animationId = window.requestAnimationFrame(function(t) {
                        self.onFocusAnim(t, point, cameraMatrix, gizmoMatrix.clone());
                    });
                }
            } else {
                this._animationId = -1;
                this._timeStart = -1;
            }
        });
        /**
     * Perform animation for rotation operation
     * @param {Number} time Instant in which this function is called as performance.now()
     * @param {Vector3} rotationAxis Rotation axis
     * @param {number} w0 Initial angular velocity
     */ __publicField(this, "onRotationAnim", (time, rotationAxis, w0)=>{
            if (this._timeStart == -1) {
                this._anglePrev = 0;
                this._angleCurrent = 0;
                this._timeStart = time;
            }
            if (this._state == STATE.ANIMATION_ROTATE) {
                const deltaTime = (time - this._timeStart) / 1e3;
                const w = w0 + -this.dampingFactor * deltaTime;
                if (w > 0) {
                    this._angleCurrent = 0.5 * -this.dampingFactor * Math.pow(deltaTime, 2) + w0 * deltaTime + 0;
                    this.applyTransformMatrix(this.rotate(rotationAxis, this._angleCurrent));
                    this.dispatchEvent(_changeEvent);
                    const self = this;
                    this._animationId = window.requestAnimationFrame(function(t) {
                        self.onRotationAnim(t, rotationAxis, w0);
                    });
                } else {
                    this._animationId = -1;
                    this._timeStart = -1;
                    this.updateTbState(STATE.IDLE, false);
                    this.activateGizmos(false);
                    this.dispatchEvent(_changeEvent);
                }
            } else {
                this._animationId = -1;
                this._timeStart = -1;
                if (this._state != STATE.ROTATE) {
                    this.activateGizmos(false);
                    this.dispatchEvent(_changeEvent);
                }
            }
        });
        /**
     * Perform pan operation moving camera between two points
     * @param {Vector3} p0 Initial point
     * @param {Vector3} p1 Ending point
     * @param {Boolean} adjust If movement should be adjusted considering camera distance (Perspective only)
     */ __publicField(this, "pan", (p0, p1, adjust = false)=>{
            if (this.camera) {
                const movement = p0.clone().sub(p1);
                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                    movement.multiplyScalar(1 / this.camera.zoom);
                }
                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"] && adjust) {
                    this._v3_1.setFromMatrixPosition(this._cameraMatrixState0);
                    this._v3_2.setFromMatrixPosition(this._gizmoMatrixState0);
                    const distanceFactor = this._v3_1.distanceTo(this._v3_2) / this.camera.position.distanceTo(this._gizmos.position);
                    movement.multiplyScalar(1 / distanceFactor);
                }
                this._v3_1.set(movement.x, movement.y, 0).applyQuaternion(this.camera.quaternion);
                this._m4_1.makeTranslation(this._v3_1.x, this._v3_1.y, this._v3_1.z);
                this.setTransformationMatrices(this._m4_1, this._m4_1);
            }
            return _transformation;
        });
        /**
     * Reset trackball
     */ __publicField(this, "reset", ()=>{
            if (this.camera) {
                this.camera.zoom = this._zoom0;
                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                    this.camera.fov = this._fov0;
                }
                this.camera.near = this._nearPos;
                this.camera.far = this._farPos;
                this._cameraMatrixState.copy(this._cameraMatrixState0);
                this._cameraMatrixState.decompose(this.camera.position, this.camera.quaternion, this.camera.scale);
                this.camera.up.copy(this._up0);
                this.camera.updateMatrix();
                this.camera.updateProjectionMatrix();
                this._gizmoMatrixState.copy(this._gizmoMatrixState0);
                this._gizmoMatrixState0.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
                this._gizmos.updateMatrix();
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                this.makeGizmos(this._gizmos.position, this._tbRadius);
                this.camera.lookAt(this._gizmos.position);
                this.updateTbState(STATE.IDLE, false);
                this.dispatchEvent(_changeEvent);
            }
        });
        /**
     * Rotate the camera around an axis passing by trackball's center
     * @param {Vector3} axis Rotation axis
     * @param {number} angle Angle in radians
     * @returns {Object} Object with 'camera' field containing transformation matrix resulting from the operation to be applied to the camera
     */ __publicField(this, "rotate", (axis, angle)=>{
            const point = this._gizmos.position;
            this._translationMatrix.makeTranslation(-point.x, -point.y, -point.z);
            this._rotationMatrix.makeRotationAxis(axis, -angle);
            this._m4_1.makeTranslation(point.x, point.y, point.z);
            this._m4_1.multiply(this._rotationMatrix);
            this._m4_1.multiply(this._translationMatrix);
            this.setTransformationMatrices(this._m4_1);
            return _transformation;
        });
        __publicField(this, "copyState", ()=>{
            if (this.camera) {
                const state = JSON.stringify(this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"] ? {
                    arcballState: {
                        cameraFar: this.camera.far,
                        cameraMatrix: this.camera.matrix,
                        cameraNear: this.camera.near,
                        cameraUp: this.camera.up,
                        cameraZoom: this.camera.zoom,
                        gizmoMatrix: this._gizmos.matrix
                    }
                } : {
                    arcballState: {
                        cameraFar: this.camera.far,
                        cameraFov: this.camera.fov,
                        cameraMatrix: this.camera.matrix,
                        cameraNear: this.camera.near,
                        cameraUp: this.camera.up,
                        cameraZoom: this.camera.zoom,
                        gizmoMatrix: this._gizmos.matrix
                    }
                });
                navigator.clipboard.writeText(state);
            }
        });
        __publicField(this, "pasteState", ()=>{
            const self = this;
            navigator.clipboard.readText().then(function resolved(value) {
                self.setStateFromJSON(value);
            });
        });
        /**
     * Save the current state of the control. This can later be recovered with .reset
     */ __publicField(this, "saveState", ()=>{
            if (!this.camera) return;
            this._cameraMatrixState0.copy(this.camera.matrix);
            this._gizmoMatrixState0.copy(this._gizmos.matrix);
            this._nearPos = this.camera.near;
            this._farPos = this.camera.far;
            this._zoom0 = this.camera.zoom;
            this._up0.copy(this.camera.up);
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this._fov0 = this.camera.fov;
            }
        });
        /**
     * Perform uniform scale operation around a given point
     * @param {Number} size Scale factor
     * @param {Vector3} point Point around which scale
     * @param {Boolean} scaleGizmos If gizmos should be scaled (Perspective only)
     * @returns {Object} Object with 'camera' and 'gizmo' fields containing transformation matrices resulting from the operation to be applied to the camera and gizmos
     */ __publicField(this, "applyScale", (size, point, scaleGizmos = true)=>{
            if (!this.camera) return;
            const scalePoint = point.clone();
            let sizeInverse = 1 / size;
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                this.camera.zoom = this._zoomState;
                this.camera.zoom *= size;
                if (this.camera.zoom > this.maxZoom) {
                    this.camera.zoom = this.maxZoom;
                    sizeInverse = this._zoomState / this.maxZoom;
                } else if (this.camera.zoom < this.minZoom) {
                    this.camera.zoom = this.minZoom;
                    sizeInverse = this._zoomState / this.minZoom;
                }
                this.camera.updateProjectionMatrix();
                this._v3_1.setFromMatrixPosition(this._gizmoMatrixState);
                this._scaleMatrix.makeScale(sizeInverse, sizeInverse, sizeInverse);
                this._translationMatrix.makeTranslation(-this._v3_1.x, -this._v3_1.y, -this._v3_1.z);
                this._m4_2.makeTranslation(this._v3_1.x, this._v3_1.y, this._v3_1.z).multiply(this._scaleMatrix);
                this._m4_2.multiply(this._translationMatrix);
                scalePoint.sub(this._v3_1);
                const amount = scalePoint.clone().multiplyScalar(sizeInverse);
                scalePoint.sub(amount);
                this._m4_1.makeTranslation(scalePoint.x, scalePoint.y, scalePoint.z);
                this._m4_2.premultiply(this._m4_1);
                this.setTransformationMatrices(this._m4_1, this._m4_2);
                return _transformation;
            }
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this._v3_1.setFromMatrixPosition(this._cameraMatrixState);
                this._v3_2.setFromMatrixPosition(this._gizmoMatrixState);
                let distance = this._v3_1.distanceTo(scalePoint);
                let amount = distance - distance * sizeInverse;
                const newDistance = distance - amount;
                if (newDistance < this.minDistance) {
                    sizeInverse = this.minDistance / distance;
                    amount = distance - distance * sizeInverse;
                } else if (newDistance > this.maxDistance) {
                    sizeInverse = this.maxDistance / distance;
                    amount = distance - distance * sizeInverse;
                }
                let direction = scalePoint.clone().sub(this._v3_1).normalize().multiplyScalar(amount);
                this._m4_1.makeTranslation(direction.x, direction.y, direction.z);
                if (scaleGizmos) {
                    const pos = this._v3_2;
                    distance = pos.distanceTo(scalePoint);
                    amount = distance - distance * sizeInverse;
                    direction = scalePoint.clone().sub(this._v3_2).normalize().multiplyScalar(amount);
                    this._translationMatrix.makeTranslation(pos.x, pos.y, pos.z);
                    this._scaleMatrix.makeScale(sizeInverse, sizeInverse, sizeInverse);
                    this._m4_2.makeTranslation(direction.x, direction.y, direction.z).multiply(this._translationMatrix);
                    this._m4_2.multiply(this._scaleMatrix);
                    this._translationMatrix.makeTranslation(-pos.x, -pos.y, -pos.z);
                    this._m4_2.multiply(this._translationMatrix);
                    this.setTransformationMatrices(this._m4_1, this._m4_2);
                } else {
                    this.setTransformationMatrices(this._m4_1);
                }
                return _transformation;
            }
        });
        /**
     * Set camera fov
     * @param {Number} value fov to be setted
     */ __publicField(this, "setFov", (value)=>{
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this.camera.fov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(value, this.minFov, this.maxFov);
                this.camera.updateProjectionMatrix();
            }
        });
        /**
     * Set the trackball's center point
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @param {Number} z Z coordinate
     */ __publicField(this, "setTarget", (x, y, z)=>{
            if (this.camera) {
                this.target.set(x, y, z);
                this._gizmos.position.set(x, y, z);
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                this.makeGizmos(this.target, this._tbRadius);
                this.camera.lookAt(this.target);
            }
        });
        /**
     * Rotate camera around its direction axis passing by a given point by a given angle
     * @param {Vector3} point The point where the rotation axis is passing trough
     * @param {Number} angle Angle in radians
     * @returns The computed transormation matix
     */ __publicField(this, "zRotate", (point, angle)=>{
            this._rotationMatrix.makeRotationAxis(this._rotationAxis, angle);
            this._translationMatrix.makeTranslation(-point.x, -point.y, -point.z);
            this._m4_1.makeTranslation(point.x, point.y, point.z);
            this._m4_1.multiply(this._rotationMatrix);
            this._m4_1.multiply(this._translationMatrix);
            this._v3_1.setFromMatrixPosition(this._gizmoMatrixState).sub(point);
            this._v3_2.copy(this._v3_1).applyAxisAngle(this._rotationAxis, angle);
            this._v3_2.sub(this._v3_1);
            this._m4_2.makeTranslation(this._v3_2.x, this._v3_2.y, this._v3_2.z);
            this.setTransformationMatrices(this._m4_1, this._m4_2);
            return _transformation;
        });
        /**
     * Unproject the cursor on the 3D object surface
     * @param {Vector2} cursor Cursor coordinates in NDC
     * @param {Camera} camera Virtual camera
     * @returns {Vector3} The point of intersection with the model, if exist, null otherwise
     */ __publicField(this, "unprojectOnObj", (cursor, camera)=>{
            if (!this.scene) return null;
            const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"]();
            raycaster.near = camera.near;
            raycaster.far = camera.far;
            raycaster.setFromCamera(cursor, camera);
            const intersect = raycaster.intersectObjects(this.scene.children, true);
            for(let i = 0; i < intersect.length; i++){
                if (intersect[i].object.uuid != this._gizmos.uuid && intersect[i].face) {
                    return intersect[i].point.clone();
                }
            }
            return null;
        });
        /**
     * Unproject the cursor on the trackball surface
     * @param {Camera} camera The virtual camera
     * @param {Number} cursorX Cursor horizontal coordinate on screen
     * @param {Number} cursorY Cursor vertical coordinate on screen
     * @param {HTMLElement} canvas The canvas where the renderer draws its output
     * @param {number} tbRadius The trackball radius
     * @returns {Vector3} The unprojected point on the trackball surface
     */ __publicField(this, "unprojectOnTbSurface", (camera, cursorX, cursorY, canvas, tbRadius)=>{
            if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                this._v2_1.copy(this.getCursorPosition(cursorX, cursorY, canvas));
                this._v3_1.set(this._v2_1.x, this._v2_1.y, 0);
                const x2 = Math.pow(this._v2_1.x, 2);
                const y2 = Math.pow(this._v2_1.y, 2);
                const r2 = Math.pow(this._tbRadius, 2);
                if (x2 + y2 <= r2 * 0.5) {
                    this._v3_1.setZ(Math.sqrt(r2 - (x2 + y2)));
                } else {
                    this._v3_1.setZ(r2 * 0.5 / Math.sqrt(x2 + y2));
                }
                return this._v3_1;
            }
            if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this._v2_1.copy(this.getCursorNDC(cursorX, cursorY, canvas));
                this._v3_1.set(this._v2_1.x, this._v2_1.y, -1);
                this._v3_1.applyMatrix4(camera.projectionMatrixInverse);
                const rayDir = this._v3_1.clone().normalize();
                const cameraGizmoDistance = camera.position.distanceTo(this._gizmos.position);
                const radius2 = Math.pow(tbRadius, 2);
                const h = this._v3_1.z;
                const l = Math.sqrt(Math.pow(this._v3_1.x, 2) + Math.pow(this._v3_1.y, 2));
                if (l == 0) {
                    rayDir.set(this._v3_1.x, this._v3_1.y, tbRadius);
                    return rayDir;
                }
                const m = h / l;
                const q = cameraGizmoDistance;
                let a = Math.pow(m, 2) + 1;
                let b = 2 * m * q;
                let c = Math.pow(q, 2) - radius2;
                let delta = Math.pow(b, 2) - 4 * a * c;
                if (delta >= 0) {
                    this._v2_1.setX((-b - Math.sqrt(delta)) / (2 * a));
                    this._v2_1.setY(m * this._v2_1.x + q);
                    const angle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].RAD2DEG * this._v2_1.angle();
                    if (angle >= 45) {
                        const rayLength2 = Math.sqrt(Math.pow(this._v2_1.x, 2) + Math.pow(cameraGizmoDistance - this._v2_1.y, 2));
                        rayDir.multiplyScalar(rayLength2);
                        rayDir.z += cameraGizmoDistance;
                        return rayDir;
                    }
                }
                a = m;
                b = q;
                c = -radius2 * 0.5;
                delta = Math.pow(b, 2) - 4 * a * c;
                this._v2_1.setX((-b - Math.sqrt(delta)) / (2 * a));
                this._v2_1.setY(m * this._v2_1.x + q);
                const rayLength = Math.sqrt(Math.pow(this._v2_1.x, 2) + Math.pow(cameraGizmoDistance - this._v2_1.y, 2));
                rayDir.multiplyScalar(rayLength);
                rayDir.z += cameraGizmoDistance;
                return rayDir;
            }
        });
        /**
     * Unproject the cursor on the plane passing through the center of the trackball orthogonal to the camera
     * @param {Camera} camera The virtual camera
     * @param {Number} cursorX Cursor horizontal coordinate on screen
     * @param {Number} cursorY Cursor vertical coordinate on screen
     * @param {HTMLElement} canvas The canvas where the renderer draws its output
     * @param {Boolean} initialDistance If initial distance between camera and gizmos should be used for calculations instead of current (Perspective only)
     * @returns {Vector3} The unprojected point on the trackball plane
     */ __publicField(this, "unprojectOnTbPlane", (camera, cursorX, cursorY, canvas, initialDistance = false)=>{
            if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                this._v2_1.copy(this.getCursorPosition(cursorX, cursorY, canvas));
                this._v3_1.set(this._v2_1.x, this._v2_1.y, 0);
                return this._v3_1.clone();
            }
            if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this._v2_1.copy(this.getCursorNDC(cursorX, cursorY, canvas));
                this._v3_1.set(this._v2_1.x, this._v2_1.y, -1);
                this._v3_1.applyMatrix4(camera.projectionMatrixInverse);
                const rayDir = this._v3_1.clone().normalize();
                const h = this._v3_1.z;
                const l = Math.sqrt(Math.pow(this._v3_1.x, 2) + Math.pow(this._v3_1.y, 2));
                let cameraGizmoDistance;
                if (initialDistance) {
                    cameraGizmoDistance = this._v3_1.setFromMatrixPosition(this._cameraMatrixState0).distanceTo(this._v3_2.setFromMatrixPosition(this._gizmoMatrixState0));
                } else {
                    cameraGizmoDistance = camera.position.distanceTo(this._gizmos.position);
                }
                if (l == 0) {
                    rayDir.set(0, 0, 0);
                    return rayDir;
                }
                const m = h / l;
                const q = cameraGizmoDistance;
                const x = -q / m;
                const rayLength = Math.sqrt(Math.pow(q, 2) + Math.pow(x, 2));
                rayDir.multiplyScalar(rayLength);
                rayDir.z = 0;
                return rayDir;
            }
        });
        /**
     * Update camera and gizmos state
     */ __publicField(this, "updateMatrixState", ()=>{
            if (!this.camera) return;
            this._cameraMatrixState.copy(this.camera.matrix);
            this._gizmoMatrixState.copy(this._gizmos.matrix);
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                this._cameraProjectionState.copy(this.camera.projectionMatrix);
                this.camera.updateProjectionMatrix();
                this._zoomState = this.camera.zoom;
            }
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this._fovState = this.camera.fov;
            }
        });
        /**
     * Update the trackball FSA
     * @param {STATE} newState New state of the FSA
     * @param {Boolean} updateMatrices If matriices state should be updated
     */ __publicField(this, "updateTbState", (newState, updateMatrices)=>{
            this._state = newState;
            if (updateMatrices) {
                this.updateMatrixState();
            }
        });
        __publicField(this, "update", ()=>{
            const EPS = 1e-6;
            if (!this.target.equals(this._currentTarget) && this.camera) {
                this._gizmos.position.set(this.target.x, this.target.y, this.target.z);
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                this.makeGizmos(this.target, this._tbRadius);
                this._currentTarget.copy(this.target);
            }
            if (!this.camera) return;
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                if (this.camera.zoom > this.maxZoom || this.camera.zoom < this.minZoom) {
                    const newZoom = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.camera.zoom, this.minZoom, this.maxZoom);
                    this.applyTransformMatrix(this.applyScale(newZoom / this.camera.zoom, this._gizmos.position, true));
                }
            }
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                const distance = this.camera.position.distanceTo(this._gizmos.position);
                if (distance > this.maxDistance + EPS || distance < this.minDistance - EPS) {
                    const newDistance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(distance, this.minDistance, this.maxDistance);
                    this.applyTransformMatrix(this.applyScale(newDistance / distance, this._gizmos.position));
                    this.updateMatrixState();
                }
                if (this.camera.fov < this.minFov || this.camera.fov > this.maxFov) {
                    this.camera.fov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.camera.fov, this.minFov, this.maxFov);
                    this.camera.updateProjectionMatrix();
                }
                const oldRadius = this._tbRadius;
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                if (oldRadius < this._tbRadius - EPS || oldRadius > this._tbRadius + EPS) {
                    const scale = (this._gizmos.scale.x + this._gizmos.scale.y + this._gizmos.scale.z) / 3;
                    const newRadius = this._tbRadius / scale;
                    const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EllipseCurve"](0, 0, newRadius, newRadius);
                    const points = curve.getPoints(this._curvePts);
                    const curveGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
                    for(const gizmo in this._gizmos.children){
                        const child = this._gizmos.children[gizmo];
                        child.geometry = curveGeometry;
                    }
                }
            }
            this.camera.lookAt(this._gizmos.position);
        });
        __publicField(this, "setStateFromJSON", (json)=>{
            const state = JSON.parse(json);
            if (state.arcballState && this.camera) {
                this._cameraMatrixState.fromArray(state.arcballState.cameraMatrix.elements);
                this._cameraMatrixState.decompose(this.camera.position, this.camera.quaternion, this.camera.scale);
                this.camera.up.copy(state.arcballState.cameraUp);
                this.camera.near = state.arcballState.cameraNear;
                this.camera.far = state.arcballState.cameraFar;
                this.camera.zoom = state.arcballState.cameraZoom;
                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                    this.camera.fov = state.arcballState.cameraFov;
                }
                this._gizmoMatrixState.fromArray(state.arcballState.gizmoMatrix.elements);
                this._gizmoMatrixState.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
                this.camera.updateMatrix();
                this.camera.updateProjectionMatrix();
                this._gizmos.updateMatrix();
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                const gizmoTmp = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().copy(this._gizmoMatrixState0);
                this.makeGizmos(this._gizmos.position, this._tbRadius);
                this._gizmoMatrixState0.copy(gizmoTmp);
                this.camera.lookAt(this._gizmos.position);
                this.updateTbState(STATE.IDLE, false);
                this.dispatchEvent(_changeEvent);
            }
        });
        this.camera = null;
        this.domElement = domElement;
        this.scene = scene;
        this.mouseActions = [];
        this._mouseOp = null;
        this._v2_1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        this._v3_1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._v3_2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._m4_1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._m4_2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._quat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
        this._translationMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._rotationMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._scaleMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._rotationAxis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._cameraMatrixState = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._cameraProjectionState = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._fovState = 1;
        this._upState = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._zoomState = 1;
        this._nearPos = 0;
        this._farPos = 0;
        this._gizmoMatrixState = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._up0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._zoom0 = 1;
        this._fov0 = 0;
        this._initialNear = 0;
        this._nearPos0 = 0;
        this._initialFar = 0;
        this._farPos0 = 0;
        this._cameraMatrixState0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._gizmoMatrixState0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._button = -1;
        this._touchStart = [];
        this._touchCurrent = [];
        this._input = INPUT.NONE;
        this._switchSensibility = 32;
        this._startFingerDistance = 0;
        this._currentFingerDistance = 0;
        this._startFingerRotation = 0;
        this._currentFingerRotation = 0;
        this._devPxRatio = 0;
        this._downValid = true;
        this._nclicks = 0;
        this._downEvents = [];
        this._clickStart = 0;
        this._maxDownTime = 250;
        this._maxInterval = 300;
        this._posThreshold = 24;
        this._movementThreshold = 24;
        this._currentCursorPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._startCursorPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._grid = null;
        this._gridPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._gizmos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        this._curvePts = 128;
        this._timeStart = -1;
        this._animationId = -1;
        this.focusAnimationTime = 500;
        this._timePrev = 0;
        this._timeCurrent = 0;
        this._anglePrev = 0;
        this._angleCurrent = 0;
        this._cursorPosPrev = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._cursorPosCurr = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._wPrev = 0;
        this._wCurr = 0;
        this.adjustNearFar = false;
        this.scaleFactor = 1.1;
        this.dampingFactor = 25;
        this.wMax = 20;
        this.enableAnimations = true;
        this.enableGrid = false;
        this.cursorZoom = false;
        this.minFov = 5;
        this.maxFov = 90;
        this.enabled = true;
        this.enablePan = true;
        this.enableRotate = true;
        this.enableZoom = true;
        this.minDistance = 0;
        this.maxDistance = Infinity;
        this.minZoom = 0;
        this.maxZoom = Infinity;
        this.target = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0);
        this._currentTarget = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0);
        this._tbRadius = 1;
        this._state = STATE.IDLE;
        this.setCamera(camera);
        if (this.scene) {
            this.scene.add(this._gizmos);
        }
        this._devPxRatio = window.devicePixelRatio;
        this.initializeMouseActions();
        if (this.domElement) this.connect(this.domElement);
        window.addEventListener("resize", this.onWindowResize);
    }
    /**
   * Apply a transformation matrix, to the camera and gizmos
   * @param {Object} transformation Object containing matrices to apply to camera and gizmos
   */ applyTransformMatrix(transformation) {
        if ((transformation == null ? void 0 : transformation.camera) && this.camera) {
            this._m4_1.copy(this._cameraMatrixState).premultiply(transformation.camera);
            this._m4_1.decompose(this.camera.position, this.camera.quaternion, this.camera.scale);
            this.camera.updateMatrix();
            if (this._state == STATE.ROTATE || this._state == STATE.ZROTATE || this._state == STATE.ANIMATION_ROTATE) {
                this.camera.up.copy(this._upState).applyQuaternion(this.camera.quaternion);
            }
        }
        if (transformation == null ? void 0 : transformation.gizmos) {
            this._m4_1.copy(this._gizmoMatrixState).premultiply(transformation.gizmos);
            this._m4_1.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
            this._gizmos.updateMatrix();
        }
        if ((this._state == STATE.SCALE || this._state == STATE.FOCUS || this._state == STATE.ANIMATION_FOCUS) && this.camera) {
            const tbRadius = this.calculateTbRadius(this.camera);
            if (tbRadius !== void 0) {
                this._tbRadius = tbRadius;
            }
            if (this.adjustNearFar) {
                const cameraDistance = this.camera.position.distanceTo(this._gizmos.position);
                const bb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
                bb.setFromObject(this._gizmos);
                const sphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"]();
                bb.getBoundingSphere(sphere);
                const adjustedNearPosition = Math.max(this._nearPos0, sphere.radius + sphere.center.length());
                const regularNearPosition = cameraDistance - this._initialNear;
                const minNearPos = Math.min(adjustedNearPosition, regularNearPosition);
                this.camera.near = cameraDistance - minNearPos;
                const adjustedFarPosition = Math.min(this._farPos0, -sphere.radius + sphere.center.length());
                const regularFarPosition = cameraDistance - this._initialFar;
                const minFarPos = Math.min(adjustedFarPosition, regularFarPosition);
                this.camera.far = cameraDistance - minFarPos;
                this.camera.updateProjectionMatrix();
            } else {
                let update = false;
                if (this.camera.near != this._initialNear) {
                    this.camera.near = this._initialNear;
                    update = true;
                }
                if (this.camera.far != this._initialFar) {
                    this.camera.far = this._initialFar;
                    update = true;
                }
                if (update) {
                    this.camera.updateProjectionMatrix();
                }
            }
        }
    }
    /**
   * Set gizmos visibility
   * @param {Boolean} value Value of gizmos visibility
   */ setGizmosVisible(value) {
        this._gizmos.visible = value;
        this.dispatchEvent(_changeEvent);
    }
    /**
   * Set values in transformation object
   * @param {Matrix4} camera Transformation to be applied to the camera
   * @param {Matrix4} gizmos Transformation to be applied to gizmos
   */ setTransformationMatrices(camera = null, gizmos = null) {
        if (camera) {
            if (_transformation.camera) {
                _transformation.camera.copy(camera);
            } else {
                _transformation.camera = camera.clone();
            }
        } else {
            _transformation.camera = null;
        }
        if (gizmos) {
            if (_transformation.gizmos) {
                _transformation.gizmos.copy(gizmos);
            } else {
                _transformation.gizmos = gizmos.clone();
            }
        } else {
            _transformation.gizmos = null;
        }
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/DeviceOrientationControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeviceOrientationControls",
    ()=>DeviceOrientationControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
class DeviceOrientationControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    // radians
    constructor(object){
        super();
        __publicField(this, "object");
        __publicField(this, "changeEvent", {
            type: "change"
        });
        __publicField(this, "EPS", 1e-6);
        __publicField(this, "enabled", true);
        __publicField(this, "deviceOrientation", {
            alpha: 0,
            beta: 0,
            gamma: 0
        });
        __publicField(this, "screenOrientation", 0);
        __publicField(this, "alphaOffset", 0);
        __publicField(this, "onDeviceOrientationChangeEvent", (event)=>{
            this.deviceOrientation = event;
        });
        __publicField(this, "onScreenOrientationChangeEvent", ()=>{
            this.screenOrientation = window.orientation || 0;
        });
        // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''
        __publicField(this, "zee", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1));
        __publicField(this, "euler", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]());
        __publicField(this, "q0", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "q1", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)));
        // - PI/2 around the x-axis
        __publicField(this, "setObjectQuaternion", (quaternion, alpha, beta, gamma, orient)=>{
            this.euler.set(beta, alpha, -gamma, "YXZ");
            quaternion.setFromEuler(this.euler);
            quaternion.multiply(this.q1);
            quaternion.multiply(this.q0.setFromAxisAngle(this.zee, -orient));
        });
        __publicField(this, "connect", ()=>{
            this.onScreenOrientationChangeEvent();
            if (window.DeviceOrientationEvent !== void 0 && // @ts-ignore
            typeof window.DeviceOrientationEvent.requestPermission === "function") {
                window.DeviceOrientationEvent.requestPermission().then((response)=>{
                    if (response == "granted") {
                        window.addEventListener("orientationchange", this.onScreenOrientationChangeEvent);
                        window.addEventListener("deviceorientation", this.onDeviceOrientationChangeEvent);
                    }
                }).catch((error)=>{
                    console.error("THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:", error);
                });
            } else {
                window.addEventListener("orientationchange", this.onScreenOrientationChangeEvent);
                window.addEventListener("deviceorientation", this.onDeviceOrientationChangeEvent);
            }
            this.enabled = true;
        });
        __publicField(this, "disconnect", ()=>{
            window.removeEventListener("orientationchange", this.onScreenOrientationChangeEvent);
            window.removeEventListener("deviceorientation", this.onDeviceOrientationChangeEvent);
            this.enabled = false;
        });
        __publicField(this, "lastQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "update", ()=>{
            if (this.enabled === false) return;
            const device = this.deviceOrientation;
            if (device) {
                const alpha = device.alpha ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(device.alpha) + this.alphaOffset : 0;
                const beta = device.beta ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(device.beta) : 0;
                const gamma = device.gamma ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(device.gamma) : 0;
                const orient = this.screenOrientation ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(this.screenOrientation) : 0;
                this.setObjectQuaternion(this.object.quaternion, alpha, beta, gamma, orient);
                if (8 * (1 - this.lastQuaternion.dot(this.object.quaternion)) > this.EPS) {
                    this.lastQuaternion.copy(this.object.quaternion);
                    this.dispatchEvent(this.changeEvent);
                }
            }
        });
        __publicField(this, "dispose", ()=>this.disconnect());
        this.object = object;
        this.object.rotation.reorder("YXZ");
        this.connect();
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventDispatcher",
    ()=>EventDispatcher
]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
class EventDispatcher {
    constructor(){
        // not defined in @types/three
        __publicField(this, "_listeners");
    }
    /**
   * Adds a listener to an event type.
   * @param type The type of event to listen to.
   * @param listener The function that gets called when the event is fired.
   */ addEventListener(type, listener) {
        if (this._listeners === void 0) this._listeners = {};
        const listeners = this._listeners;
        if (listeners[type] === void 0) {
            listeners[type] = [];
        }
        if (listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    }
    /**
      * Checks if listener is added to an event type.
      * @param type The type of event to listen to.
      * @param listener The function that gets called when the event is fired.
      */ hasEventListener(type, listener) {
        if (this._listeners === void 0) return false;
        const listeners = this._listeners;
        return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
    }
    /**
      * Removes a listener from an event type.
      * @param type The type of the listener that gets removed.
      * @param listener The listener function that gets removed.
      */ removeEventListener(type, listener) {
        if (this._listeners === void 0) return;
        const listeners = this._listeners;
        const listenerArray = listeners[type];
        if (listenerArray !== void 0) {
            const index = listenerArray.indexOf(listener);
            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    }
    /**
      * Fire an event type.
      * @param event The event that gets fired.
      */ dispatchEvent(event) {
        if (this._listeners === void 0) return;
        const listeners = this._listeners;
        const listenerArray = listeners[event.type];
        if (listenerArray !== void 0) {
            event.target = this;
            const array = listenerArray.slice(0);
            for(let i = 0, l = array.length; i < l; i++){
                array[i].call(this, event);
            }
            event.target = null;
        }
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/FirstPersonControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FirstPersonControls",
    ()=>FirstPersonControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
const targetPosition = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
class FirstPersonControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(object, domElement){
        super();
        __publicField(this, "object");
        __publicField(this, "domElement");
        __publicField(this, "enabled", true);
        __publicField(this, "movementSpeed", 1);
        __publicField(this, "lookSpeed", 5e-3);
        __publicField(this, "lookVertical", true);
        __publicField(this, "autoForward", false);
        __publicField(this, "activeLook", true);
        __publicField(this, "heightSpeed", false);
        __publicField(this, "heightCoef", 1);
        __publicField(this, "heightMin", 0);
        __publicField(this, "heightMax", 1);
        __publicField(this, "constrainVertical", false);
        __publicField(this, "verticalMin", 0);
        __publicField(this, "verticalMax", Math.PI);
        __publicField(this, "mouseDragOn", false);
        // internals
        __publicField(this, "autoSpeedFactor", 0);
        __publicField(this, "mouseX", 0);
        __publicField(this, "mouseY", 0);
        __publicField(this, "moveForward", false);
        __publicField(this, "moveBackward", false);
        __publicField(this, "moveLeft", false);
        __publicField(this, "moveRight", false);
        __publicField(this, "moveUp", false);
        __publicField(this, "moveDown", false);
        __publicField(this, "viewHalfX", 0);
        __publicField(this, "viewHalfY", 0);
        __publicField(this, "lat", 0);
        __publicField(this, "lon", 0);
        __publicField(this, "lookDirection", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "spherical", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"]());
        __publicField(this, "target", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "connect", (domElement)=>{
            domElement.setAttribute("tabindex", "-1");
            domElement.style.touchAction = "none";
            domElement.addEventListener("contextmenu", this.contextmenu);
            domElement.addEventListener("mousemove", this.onMouseMove);
            domElement.addEventListener("mousedown", this.onMouseDown);
            domElement.addEventListener("mouseup", this.onMouseUp);
            this.domElement = domElement;
            window.addEventListener("keydown", this.onKeyDown);
            window.addEventListener("keyup", this.onKeyUp);
            this.handleResize();
        });
        __publicField(this, "dispose", ()=>{
            var _a, _b, _c, _d;
            (_a = this.domElement) == null ? void 0 : _a.removeEventListener("contextmenu", this.contextmenu);
            (_b = this.domElement) == null ? void 0 : _b.removeEventListener("mousedown", this.onMouseDown);
            (_c = this.domElement) == null ? void 0 : _c.removeEventListener("mousemove", this.onMouseMove);
            (_d = this.domElement) == null ? void 0 : _d.removeEventListener("mouseup", this.onMouseUp);
            window.removeEventListener("keydown", this.onKeyDown);
            window.removeEventListener("keyup", this.onKeyUp);
        });
        __publicField(this, "handleResize", ()=>{
            if (this.domElement) {
                this.viewHalfX = this.domElement.offsetWidth / 2;
                this.viewHalfY = this.domElement.offsetHeight / 2;
            }
        });
        __publicField(this, "onMouseDown", (event)=>{
            var _a;
            (_a = this.domElement) == null ? void 0 : _a.focus();
            if (this.activeLook) {
                switch(event.button){
                    case 0:
                        this.moveForward = true;
                        break;
                    case 2:
                        this.moveBackward = true;
                        break;
                }
            }
            this.mouseDragOn = true;
        });
        __publicField(this, "onMouseUp", (event)=>{
            if (this.activeLook) {
                switch(event.button){
                    case 0:
                        this.moveForward = false;
                        break;
                    case 2:
                        this.moveBackward = false;
                        break;
                }
            }
            this.mouseDragOn = false;
        });
        __publicField(this, "onMouseMove", (event)=>{
            if (this.domElement) {
                this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
                this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
            }
        });
        __publicField(this, "onKeyDown", (event)=>{
            switch(event.code){
                case "ArrowUp":
                case "KeyW":
                    this.moveForward = true;
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.moveLeft = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.moveBackward = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.moveRight = true;
                    break;
                case "KeyR":
                    this.moveUp = true;
                    break;
                case "KeyF":
                    this.moveDown = true;
                    break;
            }
        });
        __publicField(this, "onKeyUp", (event)=>{
            switch(event.code){
                case "ArrowUp":
                case "KeyW":
                    this.moveForward = false;
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.moveLeft = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.moveBackward = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.moveRight = false;
                    break;
                case "KeyR":
                    this.moveUp = false;
                    break;
                case "KeyF":
                    this.moveDown = false;
                    break;
            }
        });
        __publicField(this, "lookAt", (x, y, z)=>{
            if (x instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]) {
                this.target.copy(x);
            } else if (y && z) {
                this.target.set(x, y, z);
            }
            this.object.lookAt(this.target);
            this.setOrientation();
            return this;
        });
        __publicField(this, "update", (delta)=>{
            if (!this.enabled) return;
            if (this.heightSpeed) {
                const y = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.object.position.y, this.heightMin, this.heightMax);
                const heightDelta = y - this.heightMin;
                this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
            } else {
                this.autoSpeedFactor = 0;
            }
            const actualMoveSpeed = delta * this.movementSpeed;
            if (this.moveForward || this.autoForward && !this.moveBackward) {
                this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
            }
            if (this.moveBackward) this.object.translateZ(actualMoveSpeed);
            if (this.moveLeft) this.object.translateX(-actualMoveSpeed);
            if (this.moveRight) this.object.translateX(actualMoveSpeed);
            if (this.moveUp) this.object.translateY(actualMoveSpeed);
            if (this.moveDown) this.object.translateY(-actualMoveSpeed);
            let actualLookSpeed = delta * this.lookSpeed;
            if (!this.activeLook) {
                actualLookSpeed = 0;
            }
            let verticalLookRatio = 1;
            if (this.constrainVertical) {
                verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
            }
            this.lon -= this.mouseX * actualLookSpeed;
            if (this.lookVertical) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;
            this.lat = Math.max(-85, Math.min(85, this.lat));
            let phi = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(90 - this.lat);
            const theta = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(this.lon);
            if (this.constrainVertical) {
                phi = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].mapLinear(phi, 0, Math.PI, this.verticalMin, this.verticalMax);
            }
            const position = this.object.position;
            targetPosition.setFromSphericalCoords(1, phi, theta).add(position);
            this.object.lookAt(targetPosition);
        });
        __publicField(this, "contextmenu", (event)=>event.preventDefault());
        __publicField(this, "setOrientation", ()=>{
            this.lookDirection.set(0, 0, -1).applyQuaternion(this.object.quaternion);
            this.spherical.setFromVector3(this.lookDirection);
            this.lat = 90 - __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].radToDeg(this.spherical.phi);
            this.lon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].radToDeg(this.spherical.theta);
        });
        this.object = object;
        this.domElement = domElement;
        this.setOrientation();
        if (domElement) this.connect(domElement);
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/FlyControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlyControls",
    ()=>FlyControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
function contextmenu(event) {
    event.preventDefault();
}
class FlyControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(object, domElement){
        super();
        __publicField(this, "object");
        __publicField(this, "domElement", null);
        __publicField(this, "movementSpeed", 1);
        __publicField(this, "rollSpeed", 5e-3);
        __publicField(this, "dragToLook", false);
        __publicField(this, "autoForward", false);
        __publicField(this, "changeEvent", {
            type: "change"
        });
        __publicField(this, "EPS", 1e-6);
        __publicField(this, "tmpQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "mouseStatus", 0);
        __publicField(this, "movementSpeedMultiplier", 1);
        __publicField(this, "moveState", {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            forward: 0,
            back: 0,
            pitchUp: 0,
            pitchDown: 0,
            yawLeft: 0,
            yawRight: 0,
            rollLeft: 0,
            rollRight: 0
        });
        __publicField(this, "moveVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
        __publicField(this, "rotationVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
        __publicField(this, "keydown", (event)=>{
            if (event.altKey) {
                return;
            }
            switch(event.code){
                case "ShiftLeft":
                case "ShiftRight":
                    this.movementSpeedMultiplier = 0.1;
                    break;
                case "KeyW":
                    this.moveState.forward = 1;
                    break;
                case "KeyS":
                    this.moveState.back = 1;
                    break;
                case "KeyA":
                    this.moveState.left = 1;
                    break;
                case "KeyD":
                    this.moveState.right = 1;
                    break;
                case "KeyR":
                    this.moveState.up = 1;
                    break;
                case "KeyF":
                    this.moveState.down = 1;
                    break;
                case "ArrowUp":
                    this.moveState.pitchUp = 1;
                    break;
                case "ArrowDown":
                    this.moveState.pitchDown = 1;
                    break;
                case "ArrowLeft":
                    this.moveState.yawLeft = 1;
                    break;
                case "ArrowRight":
                    this.moveState.yawRight = 1;
                    break;
                case "KeyQ":
                    this.moveState.rollLeft = 1;
                    break;
                case "KeyE":
                    this.moveState.rollRight = 1;
                    break;
            }
            this.updateMovementVector();
            this.updateRotationVector();
        });
        __publicField(this, "keyup", (event)=>{
            switch(event.code){
                case "ShiftLeft":
                case "ShiftRight":
                    this.movementSpeedMultiplier = 1;
                    break;
                case "KeyW":
                    this.moveState.forward = 0;
                    break;
                case "KeyS":
                    this.moveState.back = 0;
                    break;
                case "KeyA":
                    this.moveState.left = 0;
                    break;
                case "KeyD":
                    this.moveState.right = 0;
                    break;
                case "KeyR":
                    this.moveState.up = 0;
                    break;
                case "KeyF":
                    this.moveState.down = 0;
                    break;
                case "ArrowUp":
                    this.moveState.pitchUp = 0;
                    break;
                case "ArrowDown":
                    this.moveState.pitchDown = 0;
                    break;
                case "ArrowLeft":
                    this.moveState.yawLeft = 0;
                    break;
                case "ArrowRight":
                    this.moveState.yawRight = 0;
                    break;
                case "KeyQ":
                    this.moveState.rollLeft = 0;
                    break;
                case "KeyE":
                    this.moveState.rollRight = 0;
                    break;
            }
            this.updateMovementVector();
            this.updateRotationVector();
        });
        __publicField(this, "pointerdown", (event)=>{
            if (this.dragToLook) {
                this.mouseStatus++;
            } else {
                switch(event.button){
                    case 0:
                        this.moveState.forward = 1;
                        break;
                    case 2:
                        this.moveState.back = 1;
                        break;
                }
                this.updateMovementVector();
            }
        });
        __publicField(this, "pointermove", (event)=>{
            if (!this.dragToLook || this.mouseStatus > 0) {
                const container = this.getContainerDimensions();
                const halfWidth = container.size[0] / 2;
                const halfHeight = container.size[1] / 2;
                this.moveState.yawLeft = -(event.pageX - container.offset[0] - halfWidth) / halfWidth;
                this.moveState.pitchDown = (event.pageY - container.offset[1] - halfHeight) / halfHeight;
                this.updateRotationVector();
            }
        });
        __publicField(this, "pointerup", (event)=>{
            if (this.dragToLook) {
                this.mouseStatus--;
                this.moveState.yawLeft = this.moveState.pitchDown = 0;
            } else {
                switch(event.button){
                    case 0:
                        this.moveState.forward = 0;
                        break;
                    case 2:
                        this.moveState.back = 0;
                        break;
                }
                this.updateMovementVector();
            }
            this.updateRotationVector();
        });
        __publicField(this, "lastQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "lastPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "update", (delta)=>{
            const moveMult = delta * this.movementSpeed;
            const rotMult = delta * this.rollSpeed;
            this.object.translateX(this.moveVector.x * moveMult);
            this.object.translateY(this.moveVector.y * moveMult);
            this.object.translateZ(this.moveVector.z * moveMult);
            this.tmpQuaternion.set(this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1).normalize();
            this.object.quaternion.multiply(this.tmpQuaternion);
            if (this.lastPosition.distanceToSquared(this.object.position) > this.EPS || 8 * (1 - this.lastQuaternion.dot(this.object.quaternion)) > this.EPS) {
                this.dispatchEvent(this.changeEvent);
                this.lastQuaternion.copy(this.object.quaternion);
                this.lastPosition.copy(this.object.position);
            }
        });
        __publicField(this, "updateMovementVector", ()=>{
            const forward = this.moveState.forward || this.autoForward && !this.moveState.back ? 1 : 0;
            this.moveVector.x = -this.moveState.left + this.moveState.right;
            this.moveVector.y = -this.moveState.down + this.moveState.up;
            this.moveVector.z = -forward + this.moveState.back;
        });
        __publicField(this, "updateRotationVector", ()=>{
            this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
            this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
            this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft;
        });
        __publicField(this, "getContainerDimensions", ()=>{
            if (this.domElement != document && !(this.domElement instanceof Document)) {
                return {
                    size: [
                        this.domElement.offsetWidth,
                        this.domElement.offsetHeight
                    ],
                    offset: [
                        this.domElement.offsetLeft,
                        this.domElement.offsetTop
                    ]
                };
            } else {
                return {
                    size: [
                        window.innerWidth,
                        window.innerHeight
                    ],
                    offset: [
                        0,
                        0
                    ]
                };
            }
        });
        // https://github.com/mrdoob/three.js/issues/20575
        __publicField(this, "connect", (domElement)=>{
            this.domElement = domElement;
            if (!(domElement instanceof Document)) {
                domElement.setAttribute("tabindex", -1);
            }
            this.domElement.addEventListener("contextmenu", contextmenu);
            this.domElement.addEventListener("pointermove", this.pointermove);
            this.domElement.addEventListener("pointerdown", this.pointerdown);
            this.domElement.addEventListener("pointerup", this.pointerup);
            window.addEventListener("keydown", this.keydown);
            window.addEventListener("keyup", this.keyup);
        });
        __publicField(this, "dispose", ()=>{
            this.domElement.removeEventListener("contextmenu", contextmenu);
            this.domElement.removeEventListener("pointermove", this.pointermove);
            this.domElement.removeEventListener("pointerdown", this.pointerdown);
            this.domElement.removeEventListener("pointerup", this.pointerup);
            window.removeEventListener("keydown", this.keydown);
            window.removeEventListener("keyup", this.keyup);
        });
        this.object = object;
        if (domElement !== void 0) this.connect(domElement);
        this.updateMovementVector();
        this.updateRotationVector();
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/OrbitControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapControls",
    ()=>MapControls,
    "OrbitControls",
    ()=>OrbitControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
const _ray = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Ray"]();
const _plane = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plane"]();
const TILT_LIMIT = Math.cos(70 * (Math.PI / 180));
const moduloWrapAround = (offset, capacity)=>(offset % capacity + capacity) % capacity;
class OrbitControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(object, domElement){
        super();
        __publicField(this, "object");
        __publicField(this, "domElement");
        // Set to false to disable this control
        __publicField(this, "enabled", true);
        // "target" sets the location of focus, where the object orbits around
        __publicField(this, "target", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        // How far you can dolly in and out ( PerspectiveCamera only )
        __publicField(this, "minDistance", 0);
        __publicField(this, "maxDistance", Infinity);
        // How far you can zoom in and out ( OrthographicCamera only )
        __publicField(this, "minZoom", 0);
        __publicField(this, "maxZoom", Infinity);
        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        __publicField(this, "minPolarAngle", 0);
        // radians
        __publicField(this, "maxPolarAngle", Math.PI);
        // radians
        // How far you can orbit horizontally, upper and lower limits.
        // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
        __publicField(this, "minAzimuthAngle", -Infinity);
        // radians
        __publicField(this, "maxAzimuthAngle", Infinity);
        // radians
        // Set to true to enable damping (inertia)
        // If damping is enabled, you must call controls.update() in your animation loop
        __publicField(this, "enableDamping", false);
        __publicField(this, "dampingFactor", 0.05);
        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disable zooming
        __publicField(this, "enableZoom", true);
        __publicField(this, "zoomSpeed", 1);
        // Set to false to disable rotating
        __publicField(this, "enableRotate", true);
        __publicField(this, "rotateSpeed", 1);
        // Set to false to disable panning
        __publicField(this, "enablePan", true);
        __publicField(this, "panSpeed", 1);
        __publicField(this, "screenSpacePanning", true);
        // if false, pan orthogonal to world-space direction camera.up
        __publicField(this, "keyPanSpeed", 7);
        // pixels moved per arrow key push
        __publicField(this, "zoomToCursor", false);
        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        __publicField(this, "autoRotate", false);
        __publicField(this, "autoRotateSpeed", 2);
        // 30 seconds per orbit when fps is 60
        __publicField(this, "reverseOrbit", false);
        // true if you want to reverse the orbit to mouse drag from left to right = orbits left
        __publicField(this, "reverseHorizontalOrbit", false);
        // true if you want to reverse the horizontal orbit direction
        __publicField(this, "reverseVerticalOrbit", false);
        // true if you want to reverse the vertical orbit direction
        // The four arrow keys
        __publicField(this, "keys", {
            LEFT: "ArrowLeft",
            UP: "ArrowUp",
            RIGHT: "ArrowRight",
            BOTTOM: "ArrowDown"
        });
        // Mouse buttons
        __publicField(this, "mouseButtons", {
            LEFT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].ROTATE,
            MIDDLE: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].DOLLY,
            RIGHT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].PAN
        });
        // Touch fingers
        __publicField(this, "touches", {
            ONE: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].ROTATE,
            TWO: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].DOLLY_PAN
        });
        __publicField(this, "target0");
        __publicField(this, "position0");
        __publicField(this, "zoom0");
        // the target DOM element for key events
        __publicField(this, "_domElementKeyEvents", null);
        __publicField(this, "getPolarAngle");
        __publicField(this, "getAzimuthalAngle");
        __publicField(this, "setPolarAngle");
        __publicField(this, "setAzimuthalAngle");
        __publicField(this, "getDistance");
        // Not used in most scenarios, however they can be useful for specific use cases
        __publicField(this, "getZoomScale");
        __publicField(this, "listenToKeyEvents");
        __publicField(this, "stopListenToKeyEvents");
        __publicField(this, "saveState");
        __publicField(this, "reset");
        __publicField(this, "update");
        __publicField(this, "connect");
        __publicField(this, "dispose");
        // Dolly in programmatically
        __publicField(this, "dollyIn");
        // Dolly out programmatically
        __publicField(this, "dollyOut");
        // Get the current scale
        __publicField(this, "getScale");
        // Set the current scale (these are not used in most scenarios, however they can be useful for specific use cases)
        __publicField(this, "setScale");
        this.object = object;
        this.domElement = domElement;
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;
        this.getPolarAngle = ()=>spherical.phi;
        this.getAzimuthalAngle = ()=>spherical.theta;
        this.setPolarAngle = (value)=>{
            let phi = moduloWrapAround(value, 2 * Math.PI);
            let currentPhi = spherical.phi;
            if (currentPhi < 0) currentPhi += 2 * Math.PI;
            if (phi < 0) phi += 2 * Math.PI;
            let phiDist = Math.abs(phi - currentPhi);
            if (2 * Math.PI - phiDist < phiDist) {
                if (phi < currentPhi) {
                    phi += 2 * Math.PI;
                } else {
                    currentPhi += 2 * Math.PI;
                }
            }
            sphericalDelta.phi = phi - currentPhi;
            scope.update();
        };
        this.setAzimuthalAngle = (value)=>{
            let theta = moduloWrapAround(value, 2 * Math.PI);
            let currentTheta = spherical.theta;
            if (currentTheta < 0) currentTheta += 2 * Math.PI;
            if (theta < 0) theta += 2 * Math.PI;
            let thetaDist = Math.abs(theta - currentTheta);
            if (2 * Math.PI - thetaDist < thetaDist) {
                if (theta < currentTheta) {
                    theta += 2 * Math.PI;
                } else {
                    currentTheta += 2 * Math.PI;
                }
            }
            sphericalDelta.theta = theta - currentTheta;
            scope.update();
        };
        this.getDistance = ()=>scope.object.position.distanceTo(scope.target);
        this.listenToKeyEvents = (domElement2)=>{
            domElement2.addEventListener("keydown", onKeyDown);
            this._domElementKeyEvents = domElement2;
        };
        this.stopListenToKeyEvents = ()=>{
            this._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
            this._domElementKeyEvents = null;
        };
        this.saveState = ()=>{
            scope.target0.copy(scope.target);
            scope.position0.copy(scope.object.position);
            scope.zoom0 = scope.object.zoom;
        };
        this.reset = ()=>{
            scope.target.copy(scope.target0);
            scope.object.position.copy(scope.position0);
            scope.object.zoom = scope.zoom0;
            scope.object.updateProjectionMatrix();
            scope.dispatchEvent(changeEvent);
            scope.update();
            state = STATE.NONE;
        };
        this.update = (()=>{
            const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const up = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0);
            const quat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromUnitVectors(object.up, up);
            const quatInverse = quat.clone().invert();
            const lastPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const lastQuaternion = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
            const twoPI = 2 * Math.PI;
            return function update() {
                const position = scope.object.position;
                quat.setFromUnitVectors(object.up, up);
                quatInverse.copy(quat).invert();
                offset.copy(position).sub(scope.target);
                offset.applyQuaternion(quat);
                spherical.setFromVector3(offset);
                if (scope.autoRotate && state === STATE.NONE) {
                    rotateLeft(getAutoRotationAngle());
                }
                if (scope.enableDamping) {
                    spherical.theta += sphericalDelta.theta * scope.dampingFactor;
                    spherical.phi += sphericalDelta.phi * scope.dampingFactor;
                } else {
                    spherical.theta += sphericalDelta.theta;
                    spherical.phi += sphericalDelta.phi;
                }
                let min = scope.minAzimuthAngle;
                let max = scope.maxAzimuthAngle;
                if (isFinite(min) && isFinite(max)) {
                    if (min < -Math.PI) min += twoPI;
                    else if (min > Math.PI) min -= twoPI;
                    if (max < -Math.PI) max += twoPI;
                    else if (max > Math.PI) max -= twoPI;
                    if (min <= max) {
                        spherical.theta = Math.max(min, Math.min(max, spherical.theta));
                    } else {
                        spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
                    }
                }
                spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
                spherical.makeSafe();
                if (scope.enableDamping === true) {
                    scope.target.addScaledVector(panOffset, scope.dampingFactor);
                } else {
                    scope.target.add(panOffset);
                }
                if (scope.zoomToCursor && performCursorZoom || scope.object.isOrthographicCamera) {
                    spherical.radius = clampDistance(spherical.radius);
                } else {
                    spherical.radius = clampDistance(spherical.radius * scale);
                }
                offset.setFromSpherical(spherical);
                offset.applyQuaternion(quatInverse);
                position.copy(scope.target).add(offset);
                if (!scope.object.matrixAutoUpdate) scope.object.updateMatrix();
                scope.object.lookAt(scope.target);
                if (scope.enableDamping === true) {
                    sphericalDelta.theta *= 1 - scope.dampingFactor;
                    sphericalDelta.phi *= 1 - scope.dampingFactor;
                    panOffset.multiplyScalar(1 - scope.dampingFactor);
                } else {
                    sphericalDelta.set(0, 0, 0);
                    panOffset.set(0, 0, 0);
                }
                let zoomChanged = false;
                if (scope.zoomToCursor && performCursorZoom) {
                    let newRadius = null;
                    if (scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"] && scope.object.isPerspectiveCamera) {
                        const prevRadius = offset.length();
                        newRadius = clampDistance(prevRadius * scale);
                        const radiusDelta = prevRadius - newRadius;
                        scope.object.position.addScaledVector(dollyDirection, radiusDelta);
                        scope.object.updateMatrixWorld();
                    } else if (scope.object.isOrthographicCamera) {
                        const mouseBefore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](mouse.x, mouse.y, 0);
                        mouseBefore.unproject(scope.object);
                        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
                        scope.object.updateProjectionMatrix();
                        zoomChanged = true;
                        const mouseAfter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](mouse.x, mouse.y, 0);
                        mouseAfter.unproject(scope.object);
                        scope.object.position.sub(mouseAfter).add(mouseBefore);
                        scope.object.updateMatrixWorld();
                        newRadius = offset.length();
                    } else {
                        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
                        scope.zoomToCursor = false;
                    }
                    if (newRadius !== null) {
                        if (scope.screenSpacePanning) {
                            scope.target.set(0, 0, -1).transformDirection(scope.object.matrix).multiplyScalar(newRadius).add(scope.object.position);
                        } else {
                            _ray.origin.copy(scope.object.position);
                            _ray.direction.set(0, 0, -1).transformDirection(scope.object.matrix);
                            if (Math.abs(scope.object.up.dot(_ray.direction)) < TILT_LIMIT) {
                                object.lookAt(scope.target);
                            } else {
                                _plane.setFromNormalAndCoplanarPoint(scope.object.up, scope.target);
                                _ray.intersectPlane(_plane, scope.target);
                            }
                        }
                    }
                } else if (scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"] && scope.object.isOrthographicCamera) {
                    zoomChanged = scale !== 1;
                    if (zoomChanged) {
                        scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
                        scope.object.updateProjectionMatrix();
                    }
                }
                scale = 1;
                performCursorZoom = false;
                if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
                    scope.dispatchEvent(changeEvent);
                    lastPosition.copy(scope.object.position);
                    lastQuaternion.copy(scope.object.quaternion);
                    zoomChanged = false;
                    return true;
                }
                return false;
            };
        })();
        this.connect = (domElement2)=>{
            scope.domElement = domElement2;
            scope.domElement.style.touchAction = "none";
            scope.domElement.addEventListener("contextmenu", onContextMenu);
            scope.domElement.addEventListener("pointerdown", onPointerDown);
            scope.domElement.addEventListener("pointercancel", onPointerUp);
            scope.domElement.addEventListener("wheel", onMouseWheel);
        };
        this.dispose = ()=>{
            var _a, _b, _c, _d, _e, _f;
            if (scope.domElement) {
                scope.domElement.style.touchAction = "auto";
            }
            (_a = scope.domElement) == null ? void 0 : _a.removeEventListener("contextmenu", onContextMenu);
            (_b = scope.domElement) == null ? void 0 : _b.removeEventListener("pointerdown", onPointerDown);
            (_c = scope.domElement) == null ? void 0 : _c.removeEventListener("pointercancel", onPointerUp);
            (_d = scope.domElement) == null ? void 0 : _d.removeEventListener("wheel", onMouseWheel);
            (_e = scope.domElement) == null ? void 0 : _e.ownerDocument.removeEventListener("pointermove", onPointerMove);
            (_f = scope.domElement) == null ? void 0 : _f.ownerDocument.removeEventListener("pointerup", onPointerUp);
            if (scope._domElementKeyEvents !== null) {
                scope._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
            }
        };
        const scope = this;
        const changeEvent = {
            type: "change"
        };
        const startEvent = {
            type: "start"
        };
        const endEvent = {
            type: "end"
        };
        const STATE = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_PAN: 4,
            TOUCH_DOLLY_PAN: 5,
            TOUCH_DOLLY_ROTATE: 6
        };
        let state = STATE.NONE;
        const EPS = 1e-6;
        const spherical = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"]();
        const sphericalDelta = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"]();
        let scale = 1;
        const panOffset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const rotateStart = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const rotateEnd = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const rotateDelta = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const panStart = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const panEnd = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const panDelta = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const dollyStart = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const dollyEnd = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const dollyDelta = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        const dollyDirection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const mouse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        let performCursorZoom = false;
        const pointers = [];
        const pointerPositions = {};
        function getAutoRotationAngle() {
            return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
        }
        function getZoomScale() {
            return Math.pow(0.95, scope.zoomSpeed);
        }
        function rotateLeft(angle) {
            if (scope.reverseOrbit || scope.reverseHorizontalOrbit) {
                sphericalDelta.theta += angle;
            } else {
                sphericalDelta.theta -= angle;
            }
        }
        function rotateUp(angle) {
            if (scope.reverseOrbit || scope.reverseVerticalOrbit) {
                sphericalDelta.phi += angle;
            } else {
                sphericalDelta.phi -= angle;
            }
        }
        const panLeft = (()=>{
            const v = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            return function panLeft2(distance, objectMatrix) {
                v.setFromMatrixColumn(objectMatrix, 0);
                v.multiplyScalar(-distance);
                panOffset.add(v);
            };
        })();
        const panUp = (()=>{
            const v = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            return function panUp2(distance, objectMatrix) {
                if (scope.screenSpacePanning === true) {
                    v.setFromMatrixColumn(objectMatrix, 1);
                } else {
                    v.setFromMatrixColumn(objectMatrix, 0);
                    v.crossVectors(scope.object.up, v);
                }
                v.multiplyScalar(distance);
                panOffset.add(v);
            };
        })();
        const pan = (()=>{
            const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            return function pan2(deltaX, deltaY) {
                const element = scope.domElement;
                if (element && scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"] && scope.object.isPerspectiveCamera) {
                    const position = scope.object.position;
                    offset.copy(position).sub(scope.target);
                    let targetDistance = offset.length();
                    targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180);
                    panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
                    panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
                } else if (element && scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"] && scope.object.isOrthographicCamera) {
                    panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
                    panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
                } else {
                    console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
                    scope.enablePan = false;
                }
            };
        })();
        function setScale(newScale) {
            if (scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"] && scope.object.isPerspectiveCamera || scope.object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"] && scope.object.isOrthographicCamera) {
                scale = newScale;
            } else {
                console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
                scope.enableZoom = false;
            }
        }
        function dollyOut(dollyScale) {
            setScale(scale / dollyScale);
        }
        function dollyIn(dollyScale) {
            setScale(scale * dollyScale);
        }
        function updateMouseParameters(event) {
            if (!scope.zoomToCursor || !scope.domElement) {
                return;
            }
            performCursorZoom = true;
            const rect = scope.domElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const w = rect.width;
            const h = rect.height;
            mouse.x = x / w * 2 - 1;
            mouse.y = -(y / h) * 2 + 1;
            dollyDirection.set(mouse.x, mouse.y, 1).unproject(scope.object).sub(scope.object.position).normalize();
        }
        function clampDistance(dist) {
            return Math.max(scope.minDistance, Math.min(scope.maxDistance, dist));
        }
        function handleMouseDownRotate(event) {
            rotateStart.set(event.clientX, event.clientY);
        }
        function handleMouseDownDolly(event) {
            updateMouseParameters(event);
            dollyStart.set(event.clientX, event.clientY);
        }
        function handleMouseDownPan(event) {
            panStart.set(event.clientX, event.clientY);
        }
        function handleMouseMoveRotate(event) {
            rotateEnd.set(event.clientX, event.clientY);
            rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
            const element = scope.domElement;
            if (element) {
                rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
                rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
            }
            rotateStart.copy(rotateEnd);
            scope.update();
        }
        function handleMouseMoveDolly(event) {
            dollyEnd.set(event.clientX, event.clientY);
            dollyDelta.subVectors(dollyEnd, dollyStart);
            if (dollyDelta.y > 0) {
                dollyOut(getZoomScale());
            } else if (dollyDelta.y < 0) {
                dollyIn(getZoomScale());
            }
            dollyStart.copy(dollyEnd);
            scope.update();
        }
        function handleMouseMovePan(event) {
            panEnd.set(event.clientX, event.clientY);
            panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
            pan(panDelta.x, panDelta.y);
            panStart.copy(panEnd);
            scope.update();
        }
        function handleMouseWheel(event) {
            updateMouseParameters(event);
            if (event.deltaY < 0) {
                dollyIn(getZoomScale());
            } else if (event.deltaY > 0) {
                dollyOut(getZoomScale());
            }
            scope.update();
        }
        function handleKeyDown(event) {
            let needsUpdate = false;
            switch(event.code){
                case scope.keys.UP:
                    pan(0, scope.keyPanSpeed);
                    needsUpdate = true;
                    break;
                case scope.keys.BOTTOM:
                    pan(0, -scope.keyPanSpeed);
                    needsUpdate = true;
                    break;
                case scope.keys.LEFT:
                    pan(scope.keyPanSpeed, 0);
                    needsUpdate = true;
                    break;
                case scope.keys.RIGHT:
                    pan(-scope.keyPanSpeed, 0);
                    needsUpdate = true;
                    break;
            }
            if (needsUpdate) {
                event.preventDefault();
                scope.update();
            }
        }
        function handleTouchStartRotate() {
            if (pointers.length == 1) {
                rotateStart.set(pointers[0].pageX, pointers[0].pageY);
            } else {
                const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
                const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
                rotateStart.set(x, y);
            }
        }
        function handleTouchStartPan() {
            if (pointers.length == 1) {
                panStart.set(pointers[0].pageX, pointers[0].pageY);
            } else {
                const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
                const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
                panStart.set(x, y);
            }
        }
        function handleTouchStartDolly() {
            const dx = pointers[0].pageX - pointers[1].pageX;
            const dy = pointers[0].pageY - pointers[1].pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            dollyStart.set(0, distance);
        }
        function handleTouchStartDollyPan() {
            if (scope.enableZoom) handleTouchStartDolly();
            if (scope.enablePan) handleTouchStartPan();
        }
        function handleTouchStartDollyRotate() {
            if (scope.enableZoom) handleTouchStartDolly();
            if (scope.enableRotate) handleTouchStartRotate();
        }
        function handleTouchMoveRotate(event) {
            if (pointers.length == 1) {
                rotateEnd.set(event.pageX, event.pageY);
            } else {
                const position = getSecondPointerPosition(event);
                const x = 0.5 * (event.pageX + position.x);
                const y = 0.5 * (event.pageY + position.y);
                rotateEnd.set(x, y);
            }
            rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
            const element = scope.domElement;
            if (element) {
                rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
                rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
            }
            rotateStart.copy(rotateEnd);
        }
        function handleTouchMovePan(event) {
            if (pointers.length == 1) {
                panEnd.set(event.pageX, event.pageY);
            } else {
                const position = getSecondPointerPosition(event);
                const x = 0.5 * (event.pageX + position.x);
                const y = 0.5 * (event.pageY + position.y);
                panEnd.set(x, y);
            }
            panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
            pan(panDelta.x, panDelta.y);
            panStart.copy(panEnd);
        }
        function handleTouchMoveDolly(event) {
            const position = getSecondPointerPosition(event);
            const dx = event.pageX - position.x;
            const dy = event.pageY - position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            dollyEnd.set(0, distance);
            dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
            dollyOut(dollyDelta.y);
            dollyStart.copy(dollyEnd);
        }
        function handleTouchMoveDollyPan(event) {
            if (scope.enableZoom) handleTouchMoveDolly(event);
            if (scope.enablePan) handleTouchMovePan(event);
        }
        function handleTouchMoveDollyRotate(event) {
            if (scope.enableZoom) handleTouchMoveDolly(event);
            if (scope.enableRotate) handleTouchMoveRotate(event);
        }
        function onPointerDown(event) {
            var _a, _b;
            if (scope.enabled === false) return;
            if (pointers.length === 0) {
                (_a = scope.domElement) == null ? void 0 : _a.ownerDocument.addEventListener("pointermove", onPointerMove);
                (_b = scope.domElement) == null ? void 0 : _b.ownerDocument.addEventListener("pointerup", onPointerUp);
            }
            addPointer(event);
            if (event.pointerType === "touch") {
                onTouchStart(event);
            } else {
                onMouseDown(event);
            }
        }
        function onPointerMove(event) {
            if (scope.enabled === false) return;
            if (event.pointerType === "touch") {
                onTouchMove(event);
            } else {
                onMouseMove(event);
            }
        }
        function onPointerUp(event) {
            var _a, _b, _c;
            removePointer(event);
            if (pointers.length === 0) {
                (_a = scope.domElement) == null ? void 0 : _a.releasePointerCapture(event.pointerId);
                (_b = scope.domElement) == null ? void 0 : _b.ownerDocument.removeEventListener("pointermove", onPointerMove);
                (_c = scope.domElement) == null ? void 0 : _c.ownerDocument.removeEventListener("pointerup", onPointerUp);
            }
            scope.dispatchEvent(endEvent);
            state = STATE.NONE;
        }
        function onMouseDown(event) {
            let mouseAction;
            switch(event.button){
                case 0:
                    mouseAction = scope.mouseButtons.LEFT;
                    break;
                case 1:
                    mouseAction = scope.mouseButtons.MIDDLE;
                    break;
                case 2:
                    mouseAction = scope.mouseButtons.RIGHT;
                    break;
                default:
                    mouseAction = -1;
            }
            switch(mouseAction){
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].DOLLY:
                    if (scope.enableZoom === false) return;
                    handleMouseDownDolly(event);
                    state = STATE.DOLLY;
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].ROTATE:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        if (scope.enablePan === false) return;
                        handleMouseDownPan(event);
                        state = STATE.PAN;
                    } else {
                        if (scope.enableRotate === false) return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                    }
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].PAN:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        if (scope.enableRotate === false) return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                    } else {
                        if (scope.enablePan === false) return;
                        handleMouseDownPan(event);
                        state = STATE.PAN;
                    }
                    break;
                default:
                    state = STATE.NONE;
            }
            if (state !== STATE.NONE) {
                scope.dispatchEvent(startEvent);
            }
        }
        function onMouseMove(event) {
            if (scope.enabled === false) return;
            switch(state){
                case STATE.ROTATE:
                    if (scope.enableRotate === false) return;
                    handleMouseMoveRotate(event);
                    break;
                case STATE.DOLLY:
                    if (scope.enableZoom === false) return;
                    handleMouseMoveDolly(event);
                    break;
                case STATE.PAN:
                    if (scope.enablePan === false) return;
                    handleMouseMovePan(event);
                    break;
            }
        }
        function onMouseWheel(event) {
            if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) {
                return;
            }
            event.preventDefault();
            scope.dispatchEvent(startEvent);
            handleMouseWheel(event);
            scope.dispatchEvent(endEvent);
        }
        function onKeyDown(event) {
            if (scope.enabled === false || scope.enablePan === false) return;
            handleKeyDown(event);
        }
        function onTouchStart(event) {
            trackPointer(event);
            switch(pointers.length){
                case 1:
                    switch(scope.touches.ONE){
                        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].ROTATE:
                            if (scope.enableRotate === false) return;
                            handleTouchStartRotate();
                            state = STATE.TOUCH_ROTATE;
                            break;
                        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].PAN:
                            if (scope.enablePan === false) return;
                            handleTouchStartPan();
                            state = STATE.TOUCH_PAN;
                            break;
                        default:
                            state = STATE.NONE;
                    }
                    break;
                case 2:
                    switch(scope.touches.TWO){
                        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].DOLLY_PAN:
                            if (scope.enableZoom === false && scope.enablePan === false) return;
                            handleTouchStartDollyPan();
                            state = STATE.TOUCH_DOLLY_PAN;
                            break;
                        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].DOLLY_ROTATE:
                            if (scope.enableZoom === false && scope.enableRotate === false) return;
                            handleTouchStartDollyRotate();
                            state = STATE.TOUCH_DOLLY_ROTATE;
                            break;
                        default:
                            state = STATE.NONE;
                    }
                    break;
                default:
                    state = STATE.NONE;
            }
            if (state !== STATE.NONE) {
                scope.dispatchEvent(startEvent);
            }
        }
        function onTouchMove(event) {
            trackPointer(event);
            switch(state){
                case STATE.TOUCH_ROTATE:
                    if (scope.enableRotate === false) return;
                    handleTouchMoveRotate(event);
                    scope.update();
                    break;
                case STATE.TOUCH_PAN:
                    if (scope.enablePan === false) return;
                    handleTouchMovePan(event);
                    scope.update();
                    break;
                case STATE.TOUCH_DOLLY_PAN:
                    if (scope.enableZoom === false && scope.enablePan === false) return;
                    handleTouchMoveDollyPan(event);
                    scope.update();
                    break;
                case STATE.TOUCH_DOLLY_ROTATE:
                    if (scope.enableZoom === false && scope.enableRotate === false) return;
                    handleTouchMoveDollyRotate(event);
                    scope.update();
                    break;
                default:
                    state = STATE.NONE;
            }
        }
        function onContextMenu(event) {
            if (scope.enabled === false) return;
            event.preventDefault();
        }
        function addPointer(event) {
            pointers.push(event);
        }
        function removePointer(event) {
            delete pointerPositions[event.pointerId];
            for(let i = 0; i < pointers.length; i++){
                if (pointers[i].pointerId == event.pointerId) {
                    pointers.splice(i, 1);
                    return;
                }
            }
        }
        function trackPointer(event) {
            let position = pointerPositions[event.pointerId];
            if (position === void 0) {
                position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
                pointerPositions[event.pointerId] = position;
            }
            position.set(event.pageX, event.pageY);
        }
        function getSecondPointerPosition(event) {
            const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];
            return pointerPositions[pointer.pointerId];
        }
        this.dollyIn = (dollyScale = getZoomScale())=>{
            dollyIn(dollyScale);
            scope.update();
        };
        this.dollyOut = (dollyScale = getZoomScale())=>{
            dollyOut(dollyScale);
            scope.update();
        };
        this.getScale = ()=>{
            return scale;
        };
        this.setScale = (newScale)=>{
            setScale(newScale);
            scope.update();
        };
        this.getZoomScale = ()=>{
            return getZoomScale();
        };
        if (domElement !== void 0) this.connect(domElement);
        this.update();
    }
}
class MapControls extends OrbitControls {
    constructor(object, domElement){
        super(object, domElement);
        this.screenSpacePanning = false;
        this.mouseButtons.LEFT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].PAN;
        this.mouseButtons.RIGHT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].ROTATE;
        this.touches.ONE = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].PAN;
        this.touches.TWO = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH"].DOLLY_ROTATE;
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/PointerLockControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PointerLockControls",
    ()=>PointerLockControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
const _euler = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](0, 0, 0, "YXZ");
const _vector = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _changeEvent = {
    type: "change"
};
const _lockEvent = {
    type: "lock"
};
const _unlockEvent = {
    type: "unlock"
};
const _MOUSE_SENSITIVITY = 2e-3;
const _PI_2 = Math.PI / 2;
class PointerLockControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(camera, domElement){
        super();
        __publicField(this, "camera");
        __publicField(this, "domElement");
        __publicField(this, "isLocked");
        __publicField(this, "minPolarAngle");
        __publicField(this, "maxPolarAngle");
        __publicField(this, "pointerSpeed");
        __publicField(this, "onMouseMove", (event)=>{
            if (!this.domElement || this.isLocked === false) return;
            _euler.setFromQuaternion(this.camera.quaternion);
            _euler.y -= event.movementX * _MOUSE_SENSITIVITY * this.pointerSpeed;
            _euler.x -= event.movementY * _MOUSE_SENSITIVITY * this.pointerSpeed;
            _euler.x = Math.max(_PI_2 - this.maxPolarAngle, Math.min(_PI_2 - this.minPolarAngle, _euler.x));
            this.camera.quaternion.setFromEuler(_euler);
            this.dispatchEvent(_changeEvent);
        });
        __publicField(this, "onPointerlockChange", ()=>{
            if (!this.domElement) return;
            if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
                this.dispatchEvent(_lockEvent);
                this.isLocked = true;
            } else {
                this.dispatchEvent(_unlockEvent);
                this.isLocked = false;
            }
        });
        __publicField(this, "onPointerlockError", ()=>{
            console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
        });
        __publicField(this, "connect", (domElement)=>{
            this.domElement = domElement || this.domElement;
            if (!this.domElement) return;
            this.domElement.ownerDocument.addEventListener("mousemove", this.onMouseMove);
            this.domElement.ownerDocument.addEventListener("pointerlockchange", this.onPointerlockChange);
            this.domElement.ownerDocument.addEventListener("pointerlockerror", this.onPointerlockError);
        });
        __publicField(this, "disconnect", ()=>{
            if (!this.domElement) return;
            this.domElement.ownerDocument.removeEventListener("mousemove", this.onMouseMove);
            this.domElement.ownerDocument.removeEventListener("pointerlockchange", this.onPointerlockChange);
            this.domElement.ownerDocument.removeEventListener("pointerlockerror", this.onPointerlockError);
        });
        __publicField(this, "dispose", ()=>{
            this.disconnect();
        });
        __publicField(this, "getObject", ()=>{
            return this.camera;
        });
        __publicField(this, "direction", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -1));
        __publicField(this, "getDirection", (v)=>{
            return v.copy(this.direction).applyQuaternion(this.camera.quaternion);
        });
        __publicField(this, "moveForward", (distance)=>{
            _vector.setFromMatrixColumn(this.camera.matrix, 0);
            _vector.crossVectors(this.camera.up, _vector);
            this.camera.position.addScaledVector(_vector, distance);
        });
        __publicField(this, "moveRight", (distance)=>{
            _vector.setFromMatrixColumn(this.camera.matrix, 0);
            this.camera.position.addScaledVector(_vector, distance);
        });
        __publicField(this, "lock", ()=>{
            if (this.domElement) this.domElement.requestPointerLock();
        });
        __publicField(this, "unlock", ()=>{
            if (this.domElement) this.domElement.ownerDocument.exitPointerLock();
        });
        this.camera = camera;
        this.domElement = domElement;
        this.isLocked = false;
        this.minPolarAngle = 0;
        this.maxPolarAngle = Math.PI;
        this.pointerSpeed = 1;
        if (domElement) this.connect(domElement);
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/TrackballControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrackballControls",
    ()=>TrackballControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
class TrackballControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(object, domElement){
        super();
        __publicField(this, "enabled", true);
        __publicField(this, "screen", {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        });
        __publicField(this, "rotateSpeed", 1);
        __publicField(this, "zoomSpeed", 1.2);
        __publicField(this, "panSpeed", 0.3);
        __publicField(this, "noRotate", false);
        __publicField(this, "noZoom", false);
        __publicField(this, "noPan", false);
        __publicField(this, "staticMoving", false);
        __publicField(this, "dynamicDampingFactor", 0.2);
        __publicField(this, "minDistance", 0);
        __publicField(this, "maxDistance", Infinity);
        __publicField(this, "keys", [
            "KeyA",
            "KeyS",
            "KeyD"
        ]);
        __publicField(this, "mouseButtons", {
            LEFT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].ROTATE,
            MIDDLE: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].DOLLY,
            RIGHT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].PAN
        });
        __publicField(this, "object");
        __publicField(this, "domElement");
        __publicField(this, "cursorZoom", false);
        __publicField(this, "target", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "mousePosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        // internals
        __publicField(this, "STATE", {
            NONE: -1,
            ROTATE: 0,
            ZOOM: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_ZOOM_PAN: 4
        });
        __publicField(this, "EPS", 1e-6);
        __publicField(this, "lastZoom", 1);
        __publicField(this, "lastPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "cursorVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "targetVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "_state", this.STATE.NONE);
        __publicField(this, "_keyState", this.STATE.NONE);
        __publicField(this, "_eye", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "_movePrev", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "_moveCurr", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "_lastAxis", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "_lastAngle", 0);
        __publicField(this, "_zoomStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "_zoomEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "_touchZoomDistanceStart", 0);
        __publicField(this, "_touchZoomDistanceEnd", 0);
        __publicField(this, "_panStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "_panEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "target0");
        __publicField(this, "position0");
        __publicField(this, "up0");
        __publicField(this, "zoom0");
        // events
        __publicField(this, "changeEvent", {
            type: "change"
        });
        __publicField(this, "startEvent", {
            type: "start"
        });
        __publicField(this, "endEvent", {
            type: "end"
        });
        __publicField(this, "onScreenVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "getMouseOnScreen", (pageX, pageY)=>{
            this.onScreenVector.set((pageX - this.screen.left) / this.screen.width, (pageY - this.screen.top) / this.screen.height);
            return this.onScreenVector;
        });
        __publicField(this, "onCircleVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "getMouseOnCircle", (pageX, pageY)=>{
            this.onCircleVector.set((pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5), (this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.width);
            return this.onCircleVector;
        });
        __publicField(this, "axis", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "quaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "eyeDirection", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "objectUpDirection", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "objectSidewaysDirection", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "moveDirection", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "angle", 0);
        __publicField(this, "rotateCamera", ()=>{
            this.moveDirection.set(this._moveCurr.x - this._movePrev.x, this._moveCurr.y - this._movePrev.y, 0);
            this.angle = this.moveDirection.length();
            if (this.angle) {
                this._eye.copy(this.object.position).sub(this.target);
                this.eyeDirection.copy(this._eye).normalize();
                this.objectUpDirection.copy(this.object.up).normalize();
                this.objectSidewaysDirection.crossVectors(this.objectUpDirection, this.eyeDirection).normalize();
                this.objectUpDirection.setLength(this._moveCurr.y - this._movePrev.y);
                this.objectSidewaysDirection.setLength(this._moveCurr.x - this._movePrev.x);
                this.moveDirection.copy(this.objectUpDirection.add(this.objectSidewaysDirection));
                this.axis.crossVectors(this.moveDirection, this._eye).normalize();
                this.angle *= this.rotateSpeed;
                this.quaternion.setFromAxisAngle(this.axis, this.angle);
                this._eye.applyQuaternion(this.quaternion);
                this.object.up.applyQuaternion(this.quaternion);
                this._lastAxis.copy(this.axis);
                this._lastAngle = this.angle;
            } else if (!this.staticMoving && this._lastAngle) {
                this._lastAngle *= Math.sqrt(1 - this.dynamicDampingFactor);
                this._eye.copy(this.object.position).sub(this.target);
                this.quaternion.setFromAxisAngle(this._lastAxis, this._lastAngle);
                this._eye.applyQuaternion(this.quaternion);
                this.object.up.applyQuaternion(this.quaternion);
            }
            this._movePrev.copy(this._moveCurr);
        });
        __publicField(this, "zoomCamera", ()=>{
            let factor;
            if (this._state === this.STATE.TOUCH_ZOOM_PAN) {
                factor = this._touchZoomDistanceStart / this._touchZoomDistanceEnd;
                this._touchZoomDistanceStart = this._touchZoomDistanceEnd;
                if (this.object.isPerspectiveCamera) {
                    this._eye.multiplyScalar(factor);
                } else if (this.object.isOrthographicCamera) {
                    this.object.zoom /= factor;
                    this.object.updateProjectionMatrix();
                } else {
                    console.warn("THREE.TrackballControls: Unsupported camera type");
                }
            } else {
                factor = 1 + (this._zoomEnd.y - this._zoomStart.y) * this.zoomSpeed;
                if (Math.abs(factor - 1) > this.EPS && factor > 0) {
                    if (this.object.isPerspectiveCamera) {
                        if (factor > 1 && this._eye.length() >= this.maxDistance - this.EPS) {
                            factor = 1;
                        }
                        this._eye.multiplyScalar(factor);
                    } else if (this.object.isOrthographicCamera) {
                        if (factor > 1 && this.object.zoom < this.maxDistance * this.maxDistance) {
                            factor = 1;
                        }
                        this.object.zoom /= factor;
                    } else {
                        console.warn("THREE.TrackballControls: Unsupported camera type");
                    }
                }
                if (this.staticMoving) {
                    this._zoomStart.copy(this._zoomEnd);
                } else {
                    this._zoomStart.y += (this._zoomEnd.y - this._zoomStart.y) * this.dynamicDampingFactor;
                }
                if (this.cursorZoom) {
                    this.targetVector.copy(this.target).project(this.object);
                    let worldPos = this.cursorVector.set(this.mousePosition.x, this.mousePosition.y, this.targetVector.z).unproject(this.object);
                    this.target.lerpVectors(worldPos, this.target, factor);
                }
                if (this.object.isOrthographicCamera) {
                    this.object.updateProjectionMatrix();
                }
            }
        });
        __publicField(this, "mouseChange", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "objectUp", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "pan", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "panCamera", ()=>{
            if (!this.domElement) return;
            this.mouseChange.copy(this._panEnd).sub(this._panStart);
            if (this.mouseChange.lengthSq() > this.EPS) {
                if (this.object.isOrthographicCamera) {
                    const orthoObject = this.object;
                    const scale_x = (orthoObject.right - orthoObject.left) / this.object.zoom;
                    const scale_y = (orthoObject.top - orthoObject.bottom) / this.object.zoom;
                    this.mouseChange.x *= scale_x;
                    this.mouseChange.y *= scale_y;
                } else {
                    this.mouseChange.multiplyScalar(this._eye.length() * this.panSpeed);
                }
                this.pan.copy(this._eye).cross(this.object.up).setLength(this.mouseChange.x);
                this.pan.add(this.objectUp.copy(this.object.up).setLength(this.mouseChange.y));
                this.object.position.add(this.pan);
                this.target.add(this.pan);
                if (this.staticMoving) {
                    this._panStart.copy(this._panEnd);
                } else {
                    this._panStart.add(this.mouseChange.subVectors(this._panEnd, this._panStart).multiplyScalar(this.dynamicDampingFactor));
                }
            }
        });
        __publicField(this, "checkDistances", ()=>{
            if (!this.noZoom || !this.noPan) {
                if (this._eye.lengthSq() > this.maxDistance * this.maxDistance) {
                    this.object.position.addVectors(this.target, this._eye.setLength(this.maxDistance));
                    this._zoomStart.copy(this._zoomEnd);
                }
                if (this._eye.lengthSq() < this.minDistance * this.minDistance) {
                    this.object.position.addVectors(this.target, this._eye.setLength(this.minDistance));
                    this._zoomStart.copy(this._zoomEnd);
                }
            }
        });
        __publicField(this, "handleResize", ()=>{
            if (!this.domElement) return;
            const box = this.domElement.getBoundingClientRect();
            const d = this.domElement.ownerDocument.documentElement;
            this.screen.left = box.left + window.pageXOffset - d.clientLeft;
            this.screen.top = box.top + window.pageYOffset - d.clientTop;
            this.screen.width = box.width;
            this.screen.height = box.height;
        });
        __publicField(this, "update", ()=>{
            this._eye.subVectors(this.object.position, this.target);
            if (!this.noRotate) {
                this.rotateCamera();
            }
            if (!this.noZoom) {
                this.zoomCamera();
            }
            if (!this.noPan) {
                this.panCamera();
            }
            this.object.position.addVectors(this.target, this._eye);
            if (this.object.isPerspectiveCamera) {
                this.checkDistances();
                this.object.lookAt(this.target);
                if (this.lastPosition.distanceToSquared(this.object.position) > this.EPS) {
                    this.dispatchEvent(this.changeEvent);
                    this.lastPosition.copy(this.object.position);
                }
            } else if (this.object.isOrthographicCamera) {
                this.object.lookAt(this.target);
                if (this.lastPosition.distanceToSquared(this.object.position) > this.EPS || this.lastZoom !== this.object.zoom) {
                    this.dispatchEvent(this.changeEvent);
                    this.lastPosition.copy(this.object.position);
                    this.lastZoom = this.object.zoom;
                }
            } else {
                console.warn("THREE.TrackballControls: Unsupported camera type");
            }
        });
        __publicField(this, "reset", ()=>{
            this._state = this.STATE.NONE;
            this._keyState = this.STATE.NONE;
            this.target.copy(this.target0);
            this.object.position.copy(this.position0);
            this.object.up.copy(this.up0);
            this.object.zoom = this.zoom0;
            this.object.updateProjectionMatrix();
            this._eye.subVectors(this.object.position, this.target);
            this.object.lookAt(this.target);
            this.dispatchEvent(this.changeEvent);
            this.lastPosition.copy(this.object.position);
            this.lastZoom = this.object.zoom;
        });
        __publicField(this, "keydown", (event)=>{
            if (this.enabled === false) return;
            window.removeEventListener("keydown", this.keydown);
            if (this._keyState !== this.STATE.NONE) {
                return;
            } else if (event.code === this.keys[this.STATE.ROTATE] && !this.noRotate) {
                this._keyState = this.STATE.ROTATE;
            } else if (event.code === this.keys[this.STATE.ZOOM] && !this.noZoom) {
                this._keyState = this.STATE.ZOOM;
            } else if (event.code === this.keys[this.STATE.PAN] && !this.noPan) {
                this._keyState = this.STATE.PAN;
            }
        });
        __publicField(this, "onPointerDown", (event)=>{
            if (this.enabled === false) return;
            switch(event.pointerType){
                case "mouse":
                case "pen":
                    this.onMouseDown(event);
                    break;
            }
        });
        __publicField(this, "onPointerMove", (event)=>{
            if (this.enabled === false) return;
            switch(event.pointerType){
                case "mouse":
                case "pen":
                    this.onMouseMove(event);
                    break;
            }
        });
        __publicField(this, "onPointerUp", (event)=>{
            if (this.enabled === false) return;
            switch(event.pointerType){
                case "mouse":
                case "pen":
                    this.onMouseUp();
                    break;
            }
        });
        __publicField(this, "keyup", ()=>{
            if (this.enabled === false) return;
            this._keyState = this.STATE.NONE;
            window.addEventListener("keydown", this.keydown);
        });
        __publicField(this, "onMouseDown", (event)=>{
            if (!this.domElement) return;
            if (this._state === this.STATE.NONE) {
                switch(event.button){
                    case this.mouseButtons.LEFT:
                        this._state = this.STATE.ROTATE;
                        break;
                    case this.mouseButtons.MIDDLE:
                        this._state = this.STATE.ZOOM;
                        break;
                    case this.mouseButtons.RIGHT:
                        this._state = this.STATE.PAN;
                        break;
                }
            }
            const state = this._keyState !== this.STATE.NONE ? this._keyState : this._state;
            if (state === this.STATE.ROTATE && !this.noRotate) {
                this._moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));
                this._movePrev.copy(this._moveCurr);
            } else if (state === this.STATE.ZOOM && !this.noZoom) {
                this._zoomStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
                this._zoomEnd.copy(this._zoomStart);
            } else if (state === this.STATE.PAN && !this.noPan) {
                this._panStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
                this._panEnd.copy(this._panStart);
            }
            this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove);
            this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
            this.dispatchEvent(this.startEvent);
        });
        __publicField(this, "onMouseMove", (event)=>{
            if (this.enabled === false) return;
            const state = this._keyState !== this.STATE.NONE ? this._keyState : this._state;
            if (state === this.STATE.ROTATE && !this.noRotate) {
                this._movePrev.copy(this._moveCurr);
                this._moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));
            } else if (state === this.STATE.ZOOM && !this.noZoom) {
                this._zoomEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
            } else if (state === this.STATE.PAN && !this.noPan) {
                this._panEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
            }
        });
        __publicField(this, "onMouseUp", ()=>{
            if (!this.domElement) return;
            if (this.enabled === false) return;
            this._state = this.STATE.NONE;
            this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove);
            this.domElement.ownerDocument.removeEventListener("pointerup", this.onPointerUp);
            this.dispatchEvent(this.endEvent);
        });
        __publicField(this, "mousewheel", (event)=>{
            if (this.enabled === false) return;
            if (this.noZoom === true) return;
            event.preventDefault();
            switch(event.deltaMode){
                case 2:
                    this._zoomStart.y -= event.deltaY * 0.025;
                    break;
                case 1:
                    this._zoomStart.y -= event.deltaY * 0.01;
                    break;
                default:
                    this._zoomStart.y -= event.deltaY * 25e-5;
                    break;
            }
            this.mousePosition.x = event.offsetX / this.screen.width * 2 - 1;
            this.mousePosition.y = -(event.offsetY / this.screen.height) * 2 + 1;
            this.dispatchEvent(this.startEvent);
            this.dispatchEvent(this.endEvent);
        });
        __publicField(this, "touchstart", (event)=>{
            if (this.enabled === false) return;
            event.preventDefault();
            switch(event.touches.length){
                case 1:
                    this._state = this.STATE.TOUCH_ROTATE;
                    this._moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    this._movePrev.copy(this._moveCurr);
                    break;
                default:
                    this._state = this.STATE.TOUCH_ZOOM_PAN;
                    const dx = event.touches[0].pageX - event.touches[1].pageX;
                    const dy = event.touches[0].pageY - event.touches[1].pageY;
                    this._touchZoomDistanceEnd = this._touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
                    const x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    const y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this._panStart.copy(this.getMouseOnScreen(x, y));
                    this._panEnd.copy(this._panStart);
                    break;
            }
            this.dispatchEvent(this.startEvent);
        });
        __publicField(this, "touchmove", (event)=>{
            if (this.enabled === false) return;
            event.preventDefault();
            switch(event.touches.length){
                case 1:
                    this._movePrev.copy(this._moveCurr);
                    this._moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    break;
                default:
                    const dx = event.touches[0].pageX - event.touches[1].pageX;
                    const dy = event.touches[0].pageY - event.touches[1].pageY;
                    this._touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
                    const x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    const y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this._panEnd.copy(this.getMouseOnScreen(x, y));
                    break;
            }
        });
        __publicField(this, "touchend", (event)=>{
            if (this.enabled === false) return;
            switch(event.touches.length){
                case 0:
                    this._state = this.STATE.NONE;
                    break;
                case 1:
                    this._state = this.STATE.TOUCH_ROTATE;
                    this._moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    this._movePrev.copy(this._moveCurr);
                    break;
            }
            this.dispatchEvent(this.endEvent);
        });
        __publicField(this, "contextmenu", (event)=>{
            if (this.enabled === false) return;
            event.preventDefault();
        });
        // https://github.com/mrdoob/three.js/issues/20575
        __publicField(this, "connect", (domElement)=>{
            if (domElement === document) {
                console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.');
            }
            this.domElement = domElement;
            this.domElement.addEventListener("contextmenu", this.contextmenu);
            this.domElement.addEventListener("pointerdown", this.onPointerDown);
            this.domElement.addEventListener("wheel", this.mousewheel);
            this.domElement.addEventListener("touchstart", this.touchstart);
            this.domElement.addEventListener("touchend", this.touchend);
            this.domElement.addEventListener("touchmove", this.touchmove);
            this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove);
            this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
            window.addEventListener("keydown", this.keydown);
            window.addEventListener("keyup", this.keyup);
            this.handleResize();
        });
        __publicField(this, "dispose", ()=>{
            if (!this.domElement) return;
            this.domElement.removeEventListener("contextmenu", this.contextmenu);
            this.domElement.removeEventListener("pointerdown", this.onPointerDown);
            this.domElement.removeEventListener("wheel", this.mousewheel);
            this.domElement.removeEventListener("touchstart", this.touchstart);
            this.domElement.removeEventListener("touchend", this.touchend);
            this.domElement.removeEventListener("touchmove", this.touchmove);
            this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove);
            this.domElement.ownerDocument.removeEventListener("pointerup", this.onPointerUp);
            window.removeEventListener("keydown", this.keydown);
            window.removeEventListener("keyup", this.keyup);
        });
        this.object = object;
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.up0 = this.object.up.clone();
        this.zoom0 = this.object.zoom;
        if (domElement !== void 0) this.connect(domElement);
        this.update();
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/controls/TransformControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransformControls",
    ()=>TransformControls,
    "TransformControlsGizmo",
    ()=>TransformControlsGizmo,
    "TransformControlsPlane",
    ()=>TransformControlsPlane
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
class TransformControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"] {
    constructor(camera, domElement){
        super();
        __publicField(this, "isTransformControls", true);
        __publicField(this, "visible", false);
        __publicField(this, "domElement");
        __publicField(this, "raycaster", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"]());
        __publicField(this, "gizmo");
        __publicField(this, "plane");
        __publicField(this, "tempVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "tempVector2", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "tempQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "unit", {
            X: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0),
            Y: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0),
            Z: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1)
        });
        __publicField(this, "pointStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "pointEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "offset", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "rotationAxis", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "startNorm", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "endNorm", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "rotationAngle", 0);
        __publicField(this, "cameraPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "cameraQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "cameraScale", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "parentPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "parentQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "parentQuaternionInv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "parentScale", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldPositionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldQuaternionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "worldScaleStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "worldQuaternionInv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "worldScale", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "eye", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "positionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "quaternionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "scaleStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "camera");
        __publicField(this, "object");
        __publicField(this, "enabled", true);
        __publicField(this, "axis", null);
        __publicField(this, "mode", "translate");
        __publicField(this, "translationSnap", null);
        __publicField(this, "rotationSnap", null);
        __publicField(this, "scaleSnap", null);
        __publicField(this, "space", "world");
        __publicField(this, "size", 1);
        __publicField(this, "dragging", false);
        __publicField(this, "showX", true);
        __publicField(this, "showY", true);
        __publicField(this, "showZ", true);
        // events
        __publicField(this, "changeEvent", {
            type: "change"
        });
        __publicField(this, "mouseDownEvent", {
            type: "mouseDown",
            mode: this.mode
        });
        __publicField(this, "mouseUpEvent", {
            type: "mouseUp",
            mode: this.mode
        });
        __publicField(this, "objectChangeEvent", {
            type: "objectChange"
        });
        __publicField(this, "intersectObjectWithRay", (object, raycaster, includeInvisible)=>{
            const allIntersections = raycaster.intersectObject(object, true);
            for(let i = 0; i < allIntersections.length; i++){
                if (allIntersections[i].object.visible || includeInvisible) {
                    return allIntersections[i];
                }
            }
            return false;
        });
        // Set current object
        __publicField(this, "attach", (object)=>{
            this.object = object;
            this.visible = true;
            return this;
        });
        // Detatch from object
        __publicField(this, "detach", ()=>{
            this.object = void 0;
            this.visible = false;
            this.axis = null;
            return this;
        });
        // Reset
        __publicField(this, "reset", ()=>{
            if (!this.enabled) return this;
            if (this.dragging) {
                if (this.object !== void 0) {
                    this.object.position.copy(this.positionStart);
                    this.object.quaternion.copy(this.quaternionStart);
                    this.object.scale.copy(this.scaleStart);
                    this.dispatchEvent(this.changeEvent);
                    this.dispatchEvent(this.objectChangeEvent);
                    this.pointStart.copy(this.pointEnd);
                }
            }
            return this;
        });
        __publicField(this, "updateMatrixWorld", ()=>{
            if (this.object !== void 0) {
                this.object.updateMatrixWorld();
                if (this.object.parent === null) {
                    console.error("TransformControls: The attached 3D object must be a part of the scene graph.");
                } else {
                    this.object.parent.matrixWorld.decompose(this.parentPosition, this.parentQuaternion, this.parentScale);
                }
                this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this.worldScale);
                this.parentQuaternionInv.copy(this.parentQuaternion).invert();
                this.worldQuaternionInv.copy(this.worldQuaternion).invert();
            }
            this.camera.updateMatrixWorld();
            this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this.cameraScale);
            this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize();
            super.updateMatrixWorld();
        });
        __publicField(this, "pointerHover", (pointer)=>{
            if (this.object === void 0 || this.dragging === true) return;
            this.raycaster.setFromCamera(pointer, this.camera);
            const intersect = this.intersectObjectWithRay(this.gizmo.picker[this.mode], this.raycaster);
            if (intersect) {
                this.axis = intersect.object.name;
            } else {
                this.axis = null;
            }
        });
        __publicField(this, "pointerDown", (pointer)=>{
            if (this.object === void 0 || this.dragging === true || pointer.button !== 0) return;
            if (this.axis !== null) {
                this.raycaster.setFromCamera(pointer, this.camera);
                const planeIntersect = this.intersectObjectWithRay(this.plane, this.raycaster, true);
                if (planeIntersect) {
                    let space = this.space;
                    if (this.mode === "scale") {
                        space = "local";
                    } else if (this.axis === "E" || this.axis === "XYZE" || this.axis === "XYZ") {
                        space = "world";
                    }
                    if (space === "local" && this.mode === "rotate") {
                        const snap = this.rotationSnap;
                        if (this.axis === "X" && snap) this.object.rotation.x = Math.round(this.object.rotation.x / snap) * snap;
                        if (this.axis === "Y" && snap) this.object.rotation.y = Math.round(this.object.rotation.y / snap) * snap;
                        if (this.axis === "Z" && snap) this.object.rotation.z = Math.round(this.object.rotation.z / snap) * snap;
                    }
                    this.object.updateMatrixWorld();
                    if (this.object.parent) {
                        this.object.parent.updateMatrixWorld();
                    }
                    this.positionStart.copy(this.object.position);
                    this.quaternionStart.copy(this.object.quaternion);
                    this.scaleStart.copy(this.object.scale);
                    this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this.worldScaleStart);
                    this.pointStart.copy(planeIntersect.point).sub(this.worldPositionStart);
                }
                this.dragging = true;
                this.mouseDownEvent.mode = this.mode;
                this.dispatchEvent(this.mouseDownEvent);
            }
        });
        __publicField(this, "pointerMove", (pointer)=>{
            const axis = this.axis;
            const mode = this.mode;
            const object = this.object;
            let space = this.space;
            if (mode === "scale") {
                space = "local";
            } else if (axis === "E" || axis === "XYZE" || axis === "XYZ") {
                space = "world";
            }
            if (object === void 0 || axis === null || this.dragging === false || pointer.button !== -1) return;
            this.raycaster.setFromCamera(pointer, this.camera);
            const planeIntersect = this.intersectObjectWithRay(this.plane, this.raycaster, true);
            if (!planeIntersect) return;
            this.pointEnd.copy(planeIntersect.point).sub(this.worldPositionStart);
            if (mode === "translate") {
                this.offset.copy(this.pointEnd).sub(this.pointStart);
                if (space === "local" && axis !== "XYZ") {
                    this.offset.applyQuaternion(this.worldQuaternionInv);
                }
                if (axis.indexOf("X") === -1) this.offset.x = 0;
                if (axis.indexOf("Y") === -1) this.offset.y = 0;
                if (axis.indexOf("Z") === -1) this.offset.z = 0;
                if (space === "local" && axis !== "XYZ") {
                    this.offset.applyQuaternion(this.quaternionStart).divide(this.parentScale);
                } else {
                    this.offset.applyQuaternion(this.parentQuaternionInv).divide(this.parentScale);
                }
                object.position.copy(this.offset).add(this.positionStart);
                if (this.translationSnap) {
                    if (space === "local") {
                        object.position.applyQuaternion(this.tempQuaternion.copy(this.quaternionStart).invert());
                        if (axis.search("X") !== -1) {
                            object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
                        }
                        if (axis.search("Y") !== -1) {
                            object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
                        }
                        if (axis.search("Z") !== -1) {
                            object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
                        }
                        object.position.applyQuaternion(this.quaternionStart);
                    }
                    if (space === "world") {
                        if (object.parent) {
                            object.position.add(this.tempVector.setFromMatrixPosition(object.parent.matrixWorld));
                        }
                        if (axis.search("X") !== -1) {
                            object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
                        }
                        if (axis.search("Y") !== -1) {
                            object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
                        }
                        if (axis.search("Z") !== -1) {
                            object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
                        }
                        if (object.parent) {
                            object.position.sub(this.tempVector.setFromMatrixPosition(object.parent.matrixWorld));
                        }
                    }
                }
            } else if (mode === "scale") {
                if (axis.search("XYZ") !== -1) {
                    let d = this.pointEnd.length() / this.pointStart.length();
                    if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;
                    this.tempVector2.set(d, d, d);
                } else {
                    this.tempVector.copy(this.pointStart);
                    this.tempVector2.copy(this.pointEnd);
                    this.tempVector.applyQuaternion(this.worldQuaternionInv);
                    this.tempVector2.applyQuaternion(this.worldQuaternionInv);
                    this.tempVector2.divide(this.tempVector);
                    if (axis.search("X") === -1) {
                        this.tempVector2.x = 1;
                    }
                    if (axis.search("Y") === -1) {
                        this.tempVector2.y = 1;
                    }
                    if (axis.search("Z") === -1) {
                        this.tempVector2.z = 1;
                    }
                }
                object.scale.copy(this.scaleStart).multiply(this.tempVector2);
                if (this.scaleSnap && this.object) {
                    if (axis.search("X") !== -1) {
                        this.object.scale.x = Math.round(object.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
                    }
                    if (axis.search("Y") !== -1) {
                        object.scale.y = Math.round(object.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
                    }
                    if (axis.search("Z") !== -1) {
                        object.scale.z = Math.round(object.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
                    }
                }
            } else if (mode === "rotate") {
                this.offset.copy(this.pointEnd).sub(this.pointStart);
                const ROTATION_SPEED = 20 / this.worldPosition.distanceTo(this.tempVector.setFromMatrixPosition(this.camera.matrixWorld));
                if (axis === "E") {
                    this.rotationAxis.copy(this.eye);
                    this.rotationAngle = this.pointEnd.angleTo(this.pointStart);
                    this.startNorm.copy(this.pointStart).normalize();
                    this.endNorm.copy(this.pointEnd).normalize();
                    this.rotationAngle *= this.endNorm.cross(this.startNorm).dot(this.eye) < 0 ? 1 : -1;
                } else if (axis === "XYZE") {
                    this.rotationAxis.copy(this.offset).cross(this.eye).normalize();
                    this.rotationAngle = this.offset.dot(this.tempVector.copy(this.rotationAxis).cross(this.eye)) * ROTATION_SPEED;
                } else if (axis === "X" || axis === "Y" || axis === "Z") {
                    this.rotationAxis.copy(this.unit[axis]);
                    this.tempVector.copy(this.unit[axis]);
                    if (space === "local") {
                        this.tempVector.applyQuaternion(this.worldQuaternion);
                    }
                    this.rotationAngle = this.offset.dot(this.tempVector.cross(this.eye).normalize()) * ROTATION_SPEED;
                }
                if (this.rotationSnap) {
                    this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap;
                }
                if (space === "local" && axis !== "E" && axis !== "XYZE") {
                    object.quaternion.copy(this.quaternionStart);
                    object.quaternion.multiply(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize();
                } else {
                    this.rotationAxis.applyQuaternion(this.parentQuaternionInv);
                    object.quaternion.copy(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle));
                    object.quaternion.multiply(this.quaternionStart).normalize();
                }
            }
            this.dispatchEvent(this.changeEvent);
            this.dispatchEvent(this.objectChangeEvent);
        });
        __publicField(this, "pointerUp", (pointer)=>{
            if (pointer.button !== 0) return;
            if (this.dragging && this.axis !== null) {
                this.mouseUpEvent.mode = this.mode;
                this.dispatchEvent(this.mouseUpEvent);
            }
            this.dragging = false;
            this.axis = null;
        });
        __publicField(this, "getPointer", (event)=>{
            var _a;
            if (this.domElement && ((_a = this.domElement.ownerDocument) == null ? void 0 : _a.pointerLockElement)) {
                return {
                    x: 0,
                    y: 0,
                    button: event.button
                };
            } else {
                const pointer = event.changedTouches ? event.changedTouches[0] : event;
                const rect = this.domElement.getBoundingClientRect();
                return {
                    x: (pointer.clientX - rect.left) / rect.width * 2 - 1,
                    y: -(pointer.clientY - rect.top) / rect.height * 2 + 1,
                    button: event.button
                };
            }
        });
        __publicField(this, "onPointerHover", (event)=>{
            if (!this.enabled) return;
            switch(event.pointerType){
                case "mouse":
                case "pen":
                    this.pointerHover(this.getPointer(event));
                    break;
            }
        });
        __publicField(this, "onPointerDown", (event)=>{
            if (!this.enabled || !this.domElement) return;
            this.domElement.style.touchAction = "none";
            this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove);
            this.pointerHover(this.getPointer(event));
            this.pointerDown(this.getPointer(event));
        });
        __publicField(this, "onPointerMove", (event)=>{
            if (!this.enabled) return;
            this.pointerMove(this.getPointer(event));
        });
        __publicField(this, "onPointerUp", (event)=>{
            if (!this.enabled || !this.domElement) return;
            this.domElement.style.touchAction = "";
            this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove);
            this.pointerUp(this.getPointer(event));
        });
        __publicField(this, "getMode", ()=>this.mode);
        __publicField(this, "setMode", (mode)=>{
            this.mode = mode;
        });
        __publicField(this, "setTranslationSnap", (translationSnap)=>{
            this.translationSnap = translationSnap;
        });
        __publicField(this, "setRotationSnap", (rotationSnap)=>{
            this.rotationSnap = rotationSnap;
        });
        __publicField(this, "setScaleSnap", (scaleSnap)=>{
            this.scaleSnap = scaleSnap;
        });
        __publicField(this, "setSize", (size)=>{
            this.size = size;
        });
        __publicField(this, "setSpace", (space)=>{
            this.space = space;
        });
        __publicField(this, "update", ()=>{
            console.warn("THREE.TransformControls: update function has no more functionality and therefore has been deprecated.");
        });
        __publicField(this, "connect", (domElement)=>{
            if (domElement === document) {
                console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.');
            }
            this.domElement = domElement;
            this.domElement.addEventListener("pointerdown", this.onPointerDown);
            this.domElement.addEventListener("pointermove", this.onPointerHover);
            this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
        });
        __publicField(this, "dispose", ()=>{
            var _a, _b, _c, _d, _e, _f;
            (_a = this.domElement) == null ? void 0 : _a.removeEventListener("pointerdown", this.onPointerDown);
            (_b = this.domElement) == null ? void 0 : _b.removeEventListener("pointermove", this.onPointerHover);
            (_d = (_c = this.domElement) == null ? void 0 : _c.ownerDocument) == null ? void 0 : _d.removeEventListener("pointermove", this.onPointerMove);
            (_f = (_e = this.domElement) == null ? void 0 : _e.ownerDocument) == null ? void 0 : _f.removeEventListener("pointerup", this.onPointerUp);
            this.traverse((child)=>{
                const mesh = child;
                if (mesh.geometry) {
                    mesh.geometry.dispose();
                }
                if (mesh.material) {
                    mesh.material.dispose();
                }
            });
        });
        this.domElement = domElement;
        this.camera = camera;
        this.gizmo = new TransformControlsGizmo();
        this.add(this.gizmo);
        this.plane = new TransformControlsPlane();
        this.add(this.plane);
        const defineProperty = (propName, defaultValue)=>{
            let propValue = defaultValue;
            Object.defineProperty(this, propName, {
                get: function() {
                    return propValue !== void 0 ? propValue : defaultValue;
                },
                set: function(value) {
                    if (propValue !== value) {
                        propValue = value;
                        this.plane[propName] = value;
                        this.gizmo[propName] = value;
                        this.dispatchEvent({
                            type: propName + "-changed",
                            value
                        });
                        this.dispatchEvent(this.changeEvent);
                    }
                }
            });
            this[propName] = defaultValue;
            this.plane[propName] = defaultValue;
            this.gizmo[propName] = defaultValue;
        };
        defineProperty("camera", this.camera);
        defineProperty("object", this.object);
        defineProperty("enabled", this.enabled);
        defineProperty("axis", this.axis);
        defineProperty("mode", this.mode);
        defineProperty("translationSnap", this.translationSnap);
        defineProperty("rotationSnap", this.rotationSnap);
        defineProperty("scaleSnap", this.scaleSnap);
        defineProperty("space", this.space);
        defineProperty("size", this.size);
        defineProperty("dragging", this.dragging);
        defineProperty("showX", this.showX);
        defineProperty("showY", this.showY);
        defineProperty("showZ", this.showZ);
        defineProperty("worldPosition", this.worldPosition);
        defineProperty("worldPositionStart", this.worldPositionStart);
        defineProperty("worldQuaternion", this.worldQuaternion);
        defineProperty("worldQuaternionStart", this.worldQuaternionStart);
        defineProperty("cameraPosition", this.cameraPosition);
        defineProperty("cameraQuaternion", this.cameraQuaternion);
        defineProperty("pointStart", this.pointStart);
        defineProperty("pointEnd", this.pointEnd);
        defineProperty("rotationAxis", this.rotationAxis);
        defineProperty("rotationAngle", this.rotationAngle);
        defineProperty("eye", this.eye);
        if (domElement !== void 0) this.connect(domElement);
    }
}
class TransformControlsGizmo extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"] {
    constructor(){
        super();
        __publicField(this, "isTransformControlsGizmo", true);
        __publicField(this, "type", "TransformControlsGizmo");
        __publicField(this, "tempVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
        __publicField(this, "tempEuler", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]());
        __publicField(this, "alignVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0));
        __publicField(this, "zeroVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
        __publicField(this, "lookAtMatrix", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]());
        __publicField(this, "tempQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "tempQuaternion2", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "identityQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "unitX", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0));
        __publicField(this, "unitY", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0));
        __publicField(this, "unitZ", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1));
        __publicField(this, "gizmo");
        __publicField(this, "picker");
        __publicField(this, "helper");
        // these are set from parent class TransformControls
        __publicField(this, "rotationAxis", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "cameraPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldPositionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldQuaternionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "worldPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "eye", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "camera", null);
        __publicField(this, "enabled", true);
        __publicField(this, "axis", null);
        __publicField(this, "mode", "translate");
        __publicField(this, "space", "world");
        __publicField(this, "size", 1);
        __publicField(this, "dragging", false);
        __publicField(this, "showX", true);
        __publicField(this, "showY", true);
        __publicField(this, "showZ", true);
        // updateMatrixWorld will update transformations and appearance of individual handles
        __publicField(this, "updateMatrixWorld", ()=>{
            let space = this.space;
            if (this.mode === "scale") {
                space = "local";
            }
            const quaternion = space === "local" ? this.worldQuaternion : this.identityQuaternion;
            this.gizmo["translate"].visible = this.mode === "translate";
            this.gizmo["rotate"].visible = this.mode === "rotate";
            this.gizmo["scale"].visible = this.mode === "scale";
            this.helper["translate"].visible = this.mode === "translate";
            this.helper["rotate"].visible = this.mode === "rotate";
            this.helper["scale"].visible = this.mode === "scale";
            let handles = [];
            handles = handles.concat(this.picker[this.mode].children);
            handles = handles.concat(this.gizmo[this.mode].children);
            handles = handles.concat(this.helper[this.mode].children);
            for(let i = 0; i < handles.length; i++){
                const handle = handles[i];
                handle.visible = true;
                handle.rotation.set(0, 0, 0);
                handle.position.copy(this.worldPosition);
                let factor;
                if (this.camera.isOrthographicCamera) {
                    factor = (this.camera.top - this.camera.bottom) / this.camera.zoom;
                } else {
                    factor = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7);
                }
                handle.scale.set(1, 1, 1).multiplyScalar(factor * this.size / 7);
                if (handle.tag === "helper") {
                    handle.visible = false;
                    if (handle.name === "AXIS") {
                        handle.position.copy(this.worldPositionStart);
                        handle.visible = !!this.axis;
                        if (this.axis === "X") {
                            this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, 0));
                            handle.quaternion.copy(quaternion).multiply(this.tempQuaternion);
                            if (Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                                handle.visible = false;
                            }
                        }
                        if (this.axis === "Y") {
                            this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, Math.PI / 2));
                            handle.quaternion.copy(quaternion).multiply(this.tempQuaternion);
                            if (Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                                handle.visible = false;
                            }
                        }
                        if (this.axis === "Z") {
                            this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0));
                            handle.quaternion.copy(quaternion).multiply(this.tempQuaternion);
                            if (Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                                handle.visible = false;
                            }
                        }
                        if (this.axis === "XYZE") {
                            this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0));
                            this.alignVector.copy(this.rotationAxis);
                            handle.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.zeroVector, this.alignVector, this.unitY));
                            handle.quaternion.multiply(this.tempQuaternion);
                            handle.visible = this.dragging;
                        }
                        if (this.axis === "E") {
                            handle.visible = false;
                        }
                    } else if (handle.name === "START") {
                        handle.position.copy(this.worldPositionStart);
                        handle.visible = this.dragging;
                    } else if (handle.name === "END") {
                        handle.position.copy(this.worldPosition);
                        handle.visible = this.dragging;
                    } else if (handle.name === "DELTA") {
                        handle.position.copy(this.worldPositionStart);
                        handle.quaternion.copy(this.worldQuaternionStart);
                        this.tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1);
                        this.tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert());
                        handle.scale.copy(this.tempVector);
                        handle.visible = this.dragging;
                    } else {
                        handle.quaternion.copy(quaternion);
                        if (this.dragging) {
                            handle.position.copy(this.worldPositionStart);
                        } else {
                            handle.position.copy(this.worldPosition);
                        }
                        if (this.axis) {
                            handle.visible = this.axis.search(handle.name) !== -1;
                        }
                    }
                    continue;
                }
                handle.quaternion.copy(quaternion);
                if (this.mode === "translate" || this.mode === "scale") {
                    const AXIS_HIDE_TRESHOLD = 0.99;
                    const PLANE_HIDE_TRESHOLD = 0.2;
                    const AXIS_FLIP_TRESHOLD = 0;
                    if (handle.name === "X" || handle.name === "XYZX") {
                        if (Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name === "Y" || handle.name === "XYZY") {
                        if (Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name === "Z" || handle.name === "XYZZ") {
                        if (Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name === "XY") {
                        if (Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name === "YZ") {
                        if (Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name === "XZ") {
                        if (Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name.search("X") !== -1) {
                        if (this.alignVector.copy(this.unitX).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
                            if (handle.tag === "fwd") {
                                handle.visible = false;
                            } else {
                                handle.scale.x *= -1;
                            }
                        } else if (handle.tag === "bwd") {
                            handle.visible = false;
                        }
                    }
                    if (handle.name.search("Y") !== -1) {
                        if (this.alignVector.copy(this.unitY).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
                            if (handle.tag === "fwd") {
                                handle.visible = false;
                            } else {
                                handle.scale.y *= -1;
                            }
                        } else if (handle.tag === "bwd") {
                            handle.visible = false;
                        }
                    }
                    if (handle.name.search("Z") !== -1) {
                        if (this.alignVector.copy(this.unitZ).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
                            if (handle.tag === "fwd") {
                                handle.visible = false;
                            } else {
                                handle.scale.z *= -1;
                            }
                        } else if (handle.tag === "bwd") {
                            handle.visible = false;
                        }
                    }
                } else if (this.mode === "rotate") {
                    this.tempQuaternion2.copy(quaternion);
                    this.alignVector.copy(this.eye).applyQuaternion(this.tempQuaternion.copy(quaternion).invert());
                    if (handle.name.search("E") !== -1) {
                        handle.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.eye, this.zeroVector, this.unitY));
                    }
                    if (handle.name === "X") {
                        this.tempQuaternion.setFromAxisAngle(this.unitX, Math.atan2(-this.alignVector.y, this.alignVector.z));
                        this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion);
                        handle.quaternion.copy(this.tempQuaternion);
                    }
                    if (handle.name === "Y") {
                        this.tempQuaternion.setFromAxisAngle(this.unitY, Math.atan2(this.alignVector.x, this.alignVector.z));
                        this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion);
                        handle.quaternion.copy(this.tempQuaternion);
                    }
                    if (handle.name === "Z") {
                        this.tempQuaternion.setFromAxisAngle(this.unitZ, Math.atan2(this.alignVector.y, this.alignVector.x));
                        this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion);
                        handle.quaternion.copy(this.tempQuaternion);
                    }
                }
                handle.visible = handle.visible && (handle.name.indexOf("X") === -1 || this.showX);
                handle.visible = handle.visible && (handle.name.indexOf("Y") === -1 || this.showY);
                handle.visible = handle.visible && (handle.name.indexOf("Z") === -1 || this.showZ);
                handle.visible = handle.visible && (handle.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ);
                handle.material.tempOpacity = handle.material.tempOpacity || handle.material.opacity;
                handle.material.tempColor = handle.material.tempColor || handle.material.color.clone();
                handle.material.color.copy(handle.material.tempColor);
                handle.material.opacity = handle.material.tempOpacity;
                if (!this.enabled) {
                    handle.material.opacity *= 0.5;
                    handle.material.color.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1), 0.5);
                } else if (this.axis) {
                    if (handle.name === this.axis) {
                        handle.material.opacity = 1;
                        handle.material.color.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1), 0.5);
                    } else if (this.axis.split("").some(function(a) {
                        return handle.name === a;
                    })) {
                        handle.material.opacity = 1;
                        handle.material.color.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1), 0.5);
                    } else {
                        handle.material.opacity *= 0.25;
                        handle.material.color.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1), 0.5);
                    }
                }
            }
            super.updateMatrixWorld();
        });
        const gizmoMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            depthTest: false,
            depthWrite: false,
            transparent: true,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            fog: false,
            toneMapped: false
        });
        const gizmoLineMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            depthTest: false,
            depthWrite: false,
            transparent: true,
            linewidth: 1,
            fog: false,
            toneMapped: false
        });
        const matInvisible = gizmoMaterial.clone();
        matInvisible.opacity = 0.15;
        const matHelper = gizmoMaterial.clone();
        matHelper.opacity = 0.33;
        const matRed = gizmoMaterial.clone();
        matRed.color.set(16711680);
        const matGreen = gizmoMaterial.clone();
        matGreen.color.set(65280);
        const matBlue = gizmoMaterial.clone();
        matBlue.color.set(255);
        const matWhiteTransparent = gizmoMaterial.clone();
        matWhiteTransparent.opacity = 0.25;
        const matYellowTransparent = matWhiteTransparent.clone();
        matYellowTransparent.color.set(16776960);
        const matCyanTransparent = matWhiteTransparent.clone();
        matCyanTransparent.color.set(65535);
        const matMagentaTransparent = matWhiteTransparent.clone();
        matMagentaTransparent.color.set(16711935);
        const matYellow = gizmoMaterial.clone();
        matYellow.color.set(16776960);
        const matLineRed = gizmoLineMaterial.clone();
        matLineRed.color.set(16711680);
        const matLineGreen = gizmoLineMaterial.clone();
        matLineGreen.color.set(65280);
        const matLineBlue = gizmoLineMaterial.clone();
        matLineBlue.color.set(255);
        const matLineCyan = gizmoLineMaterial.clone();
        matLineCyan.color.set(65535);
        const matLineMagenta = gizmoLineMaterial.clone();
        matLineMagenta.color.set(16711935);
        const matLineYellow = gizmoLineMaterial.clone();
        matLineYellow.color.set(16776960);
        const matLineGray = gizmoLineMaterial.clone();
        matLineGray.color.set(7895160);
        const matLineYellowTransparent = matLineYellow.clone();
        matLineYellowTransparent.opacity = 0.25;
        const arrowGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0, 0.05, 0.2, 12, 1, false);
        const scaleHandleGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.125, 0.125, 0.125);
        const lineGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        lineGeometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"]([
            0,
            0,
            0,
            1,
            0,
            0
        ], 3));
        const CircleGeometry = (radius, arc)=>{
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const vertices = [];
            for(let i = 0; i <= 64 * arc; ++i){
                vertices.push(0, Math.cos(i / 32 * Math.PI) * radius, Math.sin(i / 32 * Math.PI) * radius);
            }
            geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](vertices, 3));
            return geometry;
        };
        const TranslateHelperGeometry = ()=>{
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"]([
                0,
                0,
                0,
                1,
                1,
                1
            ], 3));
            return geometry;
        };
        const gizmoTranslate = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matRed),
                    [
                        1,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ],
                    null,
                    "fwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matRed),
                    [
                        1,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    null,
                    "bwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineRed)
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matGreen),
                    [
                        0,
                        1,
                        0
                    ],
                    null,
                    null,
                    "fwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matGreen),
                    [
                        0,
                        1,
                        0
                    ],
                    [
                        Math.PI,
                        0,
                        0
                    ],
                    null,
                    "bwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineGreen),
                    null,
                    [
                        0,
                        0,
                        Math.PI / 2
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matBlue),
                    [
                        0,
                        0,
                        1
                    ],
                    [
                        Math.PI / 2,
                        0,
                        0
                    ],
                    null,
                    "fwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matBlue),
                    [
                        0,
                        0,
                        1
                    ],
                    [
                        -Math.PI / 2,
                        0,
                        0
                    ],
                    null,
                    "bwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineBlue),
                    null,
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ]
                ]
            ],
            XYZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.1, 0), matWhiteTransparent.clone()),
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0
                    ]
                ]
            ],
            XY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.295, 0.295), matYellowTransparent.clone()),
                    [
                        0.15,
                        0.15,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineYellow),
                    [
                        0.18,
                        0.3,
                        0
                    ],
                    null,
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineYellow),
                    [
                        0.3,
                        0.18,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ],
            YZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.295, 0.295), matCyanTransparent.clone()),
                    [
                        0,
                        0.15,
                        0.15
                    ],
                    [
                        0,
                        Math.PI / 2,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineCyan),
                    [
                        0,
                        0.18,
                        0.3
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineCyan),
                    [
                        0,
                        0.3,
                        0.18
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ],
            XZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.295, 0.295), matMagentaTransparent.clone()),
                    [
                        0.15,
                        0,
                        0.15
                    ],
                    [
                        -Math.PI / 2,
                        0,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineMagenta),
                    [
                        0.18,
                        0,
                        0.3
                    ],
                    null,
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineMagenta),
                    [
                        0.3,
                        0,
                        0.18
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ]
        };
        const pickerTranslate = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 1, 4, 1, false), matInvisible),
                    [
                        0.6,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ]
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 1, 4, 1, false), matInvisible),
                    [
                        0,
                        0.6,
                        0
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 1, 4, 1, false), matInvisible),
                    [
                        0,
                        0,
                        0.6
                    ],
                    [
                        Math.PI / 2,
                        0,
                        0
                    ]
                ]
            ],
            XYZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.2, 0), matInvisible)
                ]
            ],
            XY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.4, 0.4), matInvisible),
                    [
                        0.2,
                        0.2,
                        0
                    ]
                ]
            ],
            YZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.4, 0.4), matInvisible),
                    [
                        0,
                        0.2,
                        0.2
                    ],
                    [
                        0,
                        Math.PI / 2,
                        0
                    ]
                ]
            ],
            XZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.4, 0.4), matInvisible),
                    [
                        0.2,
                        0,
                        0.2
                    ],
                    [
                        -Math.PI / 2,
                        0,
                        0
                    ]
                ]
            ]
        };
        const helperTranslate = {
            START: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.01, 2), matHelper),
                    null,
                    null,
                    null,
                    "helper"
                ]
            ],
            END: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.01, 2), matHelper),
                    null,
                    null,
                    null,
                    "helper"
                ]
            ],
            DELTA: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](TranslateHelperGeometry(), matHelper),
                    null,
                    null,
                    null,
                    "helper"
                ]
            ],
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        -1e3,
                        0,
                        0
                    ],
                    null,
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        0,
                        -1e3,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        0,
                        0,
                        -1e3
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ]
        };
        const gizmoRotate = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](CircleGeometry(1, 0.5), matLineRed)
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.04, 0), matRed),
                    [
                        0,
                        0,
                        0.99
                    ],
                    null,
                    [
                        1,
                        3,
                        1
                    ]
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](CircleGeometry(1, 0.5), matLineGreen),
                    null,
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.04, 0), matGreen),
                    [
                        0,
                        0,
                        0.99
                    ],
                    null,
                    [
                        3,
                        1,
                        1
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](CircleGeometry(1, 0.5), matLineBlue),
                    null,
                    [
                        0,
                        Math.PI / 2,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.04, 0), matBlue),
                    [
                        0.99,
                        0,
                        0
                    ],
                    null,
                    [
                        1,
                        3,
                        1
                    ]
                ]
            ],
            E: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](CircleGeometry(1.25, 1), matLineYellowTransparent),
                    null,
                    [
                        0,
                        Math.PI / 2,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent),
                    [
                        1.17,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ],
                    [
                        1,
                        1,
                        1e-3
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent),
                    [
                        -1.17,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        1,
                        1,
                        1e-3
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent),
                    [
                        0,
                        -1.17,
                        0
                    ],
                    [
                        Math.PI,
                        0,
                        0
                    ],
                    [
                        1,
                        1,
                        1e-3
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent),
                    [
                        0,
                        1.17,
                        0
                    ],
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        1,
                        1,
                        1e-3
                    ]
                ]
            ],
            XYZE: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](CircleGeometry(1, 1), matLineGray),
                    null,
                    [
                        0,
                        Math.PI / 2,
                        0
                    ]
                ]
            ]
        };
        const helperRotate = {
            AXIS: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        -1e3,
                        0,
                        0
                    ],
                    null,
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ]
        };
        const pickerRotate = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](1, 0.1, 4, 24), matInvisible),
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        -Math.PI / 2
                    ]
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](1, 0.1, 4, 24), matInvisible),
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        Math.PI / 2,
                        0,
                        0
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](1, 0.1, 4, 24), matInvisible),
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ]
                ]
            ],
            E: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](1.25, 0.1, 2, 24), matInvisible)
                ]
            ],
            XYZE: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.7, 10, 8), matInvisible)
                ]
            ]
        };
        const gizmoScale = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matRed),
                    [
                        0.8,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineRed),
                    null,
                    null,
                    [
                        0.8,
                        1,
                        1
                    ]
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matGreen),
                    [
                        0,
                        0.8,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineGreen),
                    null,
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        0.8,
                        1,
                        1
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matBlue),
                    [
                        0,
                        0,
                        0.8
                    ],
                    [
                        Math.PI / 2,
                        0,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineBlue),
                    null,
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        0.8,
                        1,
                        1
                    ]
                ]
            ],
            XY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matYellowTransparent),
                    [
                        0.85,
                        0.85,
                        0
                    ],
                    null,
                    [
                        2,
                        2,
                        0.2
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineYellow),
                    [
                        0.855,
                        0.98,
                        0
                    ],
                    null,
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineYellow),
                    [
                        0.98,
                        0.855,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ],
            YZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matCyanTransparent),
                    [
                        0,
                        0.85,
                        0.85
                    ],
                    null,
                    [
                        0.2,
                        2,
                        2
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineCyan),
                    [
                        0,
                        0.855,
                        0.98
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineCyan),
                    [
                        0,
                        0.98,
                        0.855
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ],
            XZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matMagentaTransparent),
                    [
                        0.85,
                        0,
                        0.85
                    ],
                    null,
                    [
                        2,
                        0.2,
                        2
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineMagenta),
                    [
                        0.855,
                        0,
                        0.98
                    ],
                    null,
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineMagenta),
                    [
                        0.98,
                        0,
                        0.855
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ],
            XYZX: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.125, 0.125, 0.125), matWhiteTransparent.clone()),
                    [
                        1.1,
                        0,
                        0
                    ]
                ]
            ],
            XYZY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.125, 0.125, 0.125), matWhiteTransparent.clone()),
                    [
                        0,
                        1.1,
                        0
                    ]
                ]
            ],
            XYZZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.125, 0.125, 0.125), matWhiteTransparent.clone()),
                    [
                        0,
                        0,
                        1.1
                    ]
                ]
            ]
        };
        const pickerScale = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 0.8, 4, 1, false), matInvisible),
                    [
                        0.5,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ]
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 0.8, 4, 1, false), matInvisible),
                    [
                        0,
                        0.5,
                        0
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 0.8, 4, 1, false), matInvisible),
                    [
                        0,
                        0,
                        0.5
                    ],
                    [
                        Math.PI / 2,
                        0,
                        0
                    ]
                ]
            ],
            XY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matInvisible),
                    [
                        0.85,
                        0.85,
                        0
                    ],
                    null,
                    [
                        3,
                        3,
                        0.2
                    ]
                ]
            ],
            YZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matInvisible),
                    [
                        0,
                        0.85,
                        0.85
                    ],
                    null,
                    [
                        0.2,
                        3,
                        3
                    ]
                ]
            ],
            XZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matInvisible),
                    [
                        0.85,
                        0,
                        0.85
                    ],
                    null,
                    [
                        3,
                        0.2,
                        3
                    ]
                ]
            ],
            XYZX: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.2, 0.2, 0.2), matInvisible),
                    [
                        1.1,
                        0,
                        0
                    ]
                ]
            ],
            XYZY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.2, 0.2, 0.2), matInvisible),
                    [
                        0,
                        1.1,
                        0
                    ]
                ]
            ],
            XYZZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.2, 0.2, 0.2), matInvisible),
                    [
                        0,
                        0,
                        1.1
                    ]
                ]
            ]
        };
        const helperScale = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        -1e3,
                        0,
                        0
                    ],
                    null,
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        0,
                        -1e3,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        0,
                        0,
                        -1e3
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ]
        };
        const setupGizmo = (gizmoMap)=>{
            const gizmo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]();
            for(let name in gizmoMap){
                for(let i = gizmoMap[name].length; i--;){
                    const object = gizmoMap[name][i][0].clone();
                    const position = gizmoMap[name][i][1];
                    const rotation = gizmoMap[name][i][2];
                    const scale = gizmoMap[name][i][3];
                    const tag = gizmoMap[name][i][4];
                    object.name = name;
                    object.tag = tag;
                    if (position) {
                        object.position.set(position[0], position[1], position[2]);
                    }
                    if (rotation) {
                        object.rotation.set(rotation[0], rotation[1], rotation[2]);
                    }
                    if (scale) {
                        object.scale.set(scale[0], scale[1], scale[2]);
                    }
                    object.updateMatrix();
                    const tempGeometry = object.geometry.clone();
                    tempGeometry.applyMatrix4(object.matrix);
                    object.geometry = tempGeometry;
                    object.renderOrder = Infinity;
                    object.position.set(0, 0, 0);
                    object.rotation.set(0, 0, 0);
                    object.scale.set(1, 1, 1);
                    gizmo.add(object);
                }
            }
            return gizmo;
        };
        this.gizmo = {};
        this.picker = {};
        this.helper = {};
        this.add(this.gizmo["translate"] = setupGizmo(gizmoTranslate));
        this.add(this.gizmo["rotate"] = setupGizmo(gizmoRotate));
        this.add(this.gizmo["scale"] = setupGizmo(gizmoScale));
        this.add(this.picker["translate"] = setupGizmo(pickerTranslate));
        this.add(this.picker["rotate"] = setupGizmo(pickerRotate));
        this.add(this.picker["scale"] = setupGizmo(pickerScale));
        this.add(this.helper["translate"] = setupGizmo(helperTranslate));
        this.add(this.helper["rotate"] = setupGizmo(helperRotate));
        this.add(this.helper["scale"] = setupGizmo(helperScale));
        this.picker["translate"].visible = false;
        this.picker["rotate"].visible = false;
        this.picker["scale"].visible = false;
    }
}
class TransformControlsPlane extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] {
    constructor(){
        super(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](1e5, 1e5, 2, 2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            visible: false,
            wireframe: true,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            transparent: true,
            opacity: 0.1,
            toneMapped: false
        }));
        __publicField(this, "isTransformControlsPlane", true);
        __publicField(this, "type", "TransformControlsPlane");
        __publicField(this, "unitX", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0));
        __publicField(this, "unitY", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0));
        __publicField(this, "unitZ", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1));
        __publicField(this, "tempVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "dirVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "alignVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "tempMatrix", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]());
        __publicField(this, "identityQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        // these are set from parent class TransformControls
        __publicField(this, "cameraQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "worldPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "eye", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "axis", null);
        __publicField(this, "mode", "translate");
        __publicField(this, "space", "world");
        __publicField(this, "updateMatrixWorld", ()=>{
            let space = this.space;
            this.position.copy(this.worldPosition);
            if (this.mode === "scale") space = "local";
            this.unitX.set(1, 0, 0).applyQuaternion(space === "local" ? this.worldQuaternion : this.identityQuaternion);
            this.unitY.set(0, 1, 0).applyQuaternion(space === "local" ? this.worldQuaternion : this.identityQuaternion);
            this.unitZ.set(0, 0, 1).applyQuaternion(space === "local" ? this.worldQuaternion : this.identityQuaternion);
            this.alignVector.copy(this.unitY);
            switch(this.mode){
                case "translate":
                case "scale":
                    switch(this.axis){
                        case "X":
                            this.alignVector.copy(this.eye).cross(this.unitX);
                            this.dirVector.copy(this.unitX).cross(this.alignVector);
                            break;
                        case "Y":
                            this.alignVector.copy(this.eye).cross(this.unitY);
                            this.dirVector.copy(this.unitY).cross(this.alignVector);
                            break;
                        case "Z":
                            this.alignVector.copy(this.eye).cross(this.unitZ);
                            this.dirVector.copy(this.unitZ).cross(this.alignVector);
                            break;
                        case "XY":
                            this.dirVector.copy(this.unitZ);
                            break;
                        case "YZ":
                            this.dirVector.copy(this.unitX);
                            break;
                        case "XZ":
                            this.alignVector.copy(this.unitZ);
                            this.dirVector.copy(this.unitY);
                            break;
                        case "XYZ":
                        case "E":
                            this.dirVector.set(0, 0, 0);
                            break;
                    }
                    break;
                case "rotate":
                default:
                    this.dirVector.set(0, 0, 0);
            }
            if (this.dirVector.length() === 0) {
                this.quaternion.copy(this.cameraQuaternion);
            } else {
                this.tempMatrix.lookAt(this.tempVector.set(0, 0, 0), this.dirVector, this.alignVector);
                this.quaternion.setFromRotationMatrix(this.tempMatrix);
            }
            super.updateMatrixWorld();
        });
    }
}
;
}),
]);

//# sourceMappingURL=1w7z_three-stdlib_controls_0t3w7db._.js.map