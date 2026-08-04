(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/CompressedArrayTexture.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompressedArrayTexture",
    ()=>CompressedArrayTexture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class CompressedArrayTexture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompressedTexture"] {
    constructor(mipmaps, width, height, depth, format, type){
        super(mipmaps, width, height, format, type);
        this.isCompressedArrayTexture = true;
        this.image.depth = depth;
        this.wrapR = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/CompressedCubeTexture.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompressedCubeTexture",
    ()=>CompressedCubeTexture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class CompressedCubeTexture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompressedTexture"] {
    constructor(images, format, type){
        super(void 0, images[0].width, images[0].height, format, type, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CubeReflectionMapping"]);
        this.isCompressedCubeTexture = true;
        this.isCubeTexture = true;
        this.image = images;
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/Data3DTexture.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Data3DTexture",
    ()=>Data3DTexture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class Data3DTexture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"] {
    constructor(data = null, width = 1, height = 1, depth = 1){
        super(null);
        this.isData3DTexture = true;
        this.image = {
            data,
            width,
            height,
            depth
        };
        this.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestFilter"];
        this.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestFilter"];
        this.wrapR = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
        this.generateMipmaps = false;
        this.flipY = false;
        this.unpackAlignment = 1;
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/LoaderUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeText",
    ()=>decodeText
]);
function decodeText(array) {
    if (typeof TextDecoder !== "undefined") {
        return new TextDecoder().decode(array);
    }
    let s = "";
    for(let i = 0, il = array.length; i < il; i++){
        s += String.fromCharCode(array[i]);
    }
    try {
        return decodeURIComponent(escape(s));
    } catch (e) {
        return s;
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const version = /* @__PURE__ */ (()=>parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REVISION"].replace(/\D+/g, "")))();
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/uv1.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UV1",
    ()=>UV1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)");
;
const UV1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"] >= 125 ? "uv1" : "uv2";
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/curves/NURBSCurve.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NURBSCurve",
    ()=>NURBSCurve
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/curves/NURBSUtils.js [app-client] (ecmascript)");
;
;
class NURBSCurve extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Curve"] {
    constructor(degree, knots, controlPoints, startKnot, endKnot){
        super();
        this.degree = degree;
        this.knots = knots;
        this.controlPoints = [];
        this.startKnot = startKnot || 0;
        this.endKnot = endKnot || this.knots.length - 1;
        for(let i = 0; i < controlPoints.length; ++i){
            const point = controlPoints[i];
            this.controlPoints[i] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](point.x, point.y, point.z, point.w);
        }
    }
    getPoint(t, optionalTarget) {
        const point = optionalTarget || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const u = this.knots[this.startKnot] + t * (this.knots[this.endKnot] - this.knots[this.startKnot]);
        const hpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcBSplinePoint"])(this.degree, this.knots, this.controlPoints, u);
        if (hpoint.w != 1) {
            hpoint.divideScalar(hpoint.w);
        }
        return point.set(hpoint.x, hpoint.y, hpoint.z);
    }
    getTangent(t, optionalTarget) {
        const tangent = optionalTarget || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const u = this.knots[0] + t * (this.knots[this.knots.length - 1] - this.knots[0]);
        const ders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcNURBSDerivatives"])(this.degree, this.knots, this.controlPoints, u, 1);
        tangent.copy(ders[1]).normalize();
        return tangent;
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/curves/NURBSUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calcBSplineDerivatives",
    ()=>calcBSplineDerivatives,
    "calcBSplinePoint",
    ()=>calcBSplinePoint,
    "calcBasisFunctionDerivatives",
    ()=>calcBasisFunctionDerivatives,
    "calcBasisFunctions",
    ()=>calcBasisFunctions,
    "calcKoverI",
    ()=>calcKoverI,
    "calcNURBSDerivatives",
    ()=>calcNURBSDerivatives,
    "calcRationalCurveDerivatives",
    ()=>calcRationalCurveDerivatives,
    "calcSurfacePoint",
    ()=>calcSurfacePoint,
    "findSpan",
    ()=>findSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
function findSpan(p, u, U) {
    const n = U.length - p - 1;
    if (u >= U[n]) {
        return n - 1;
    }
    if (u <= U[p]) {
        return p;
    }
    let low = p;
    let high = n;
    let mid = Math.floor((low + high) / 2);
    while(u < U[mid] || u >= U[mid + 1]){
        if (u < U[mid]) {
            high = mid;
        } else {
            low = mid;
        }
        mid = Math.floor((low + high) / 2);
    }
    return mid;
}
function calcBasisFunctions(span, u, p, U) {
    const N = [];
    const left = [];
    const right = [];
    N[0] = 1;
    for(let j = 1; j <= p; ++j){
        left[j] = u - U[span + 1 - j];
        right[j] = U[span + j] - u;
        let saved = 0;
        for(let r = 0; r < j; ++r){
            const rv = right[r + 1];
            const lv = left[j - r];
            const temp = N[r] / (rv + lv);
            N[r] = saved + rv * temp;
            saved = lv * temp;
        }
        N[j] = saved;
    }
    return N;
}
function calcBSplinePoint(p, U, P, u) {
    const span = findSpan(p, u, U);
    const N = calcBasisFunctions(span, u, p, U);
    const C = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](0, 0, 0, 0);
    for(let j = 0; j <= p; ++j){
        const point = P[span - p + j];
        const Nj = N[j];
        const wNj = point.w * Nj;
        C.x += point.x * wNj;
        C.y += point.y * wNj;
        C.z += point.z * wNj;
        C.w += point.w * Nj;
    }
    return C;
}
function calcBasisFunctionDerivatives(span, u, p, n, U) {
    const zeroArr = [];
    for(let i = 0; i <= p; ++i)zeroArr[i] = 0;
    const ders = [];
    for(let i = 0; i <= n; ++i)ders[i] = zeroArr.slice(0);
    const ndu = [];
    for(let i = 0; i <= p; ++i)ndu[i] = zeroArr.slice(0);
    ndu[0][0] = 1;
    const left = zeroArr.slice(0);
    const right = zeroArr.slice(0);
    for(let j = 1; j <= p; ++j){
        left[j] = u - U[span + 1 - j];
        right[j] = U[span + j] - u;
        let saved = 0;
        for(let r2 = 0; r2 < j; ++r2){
            const rv = right[r2 + 1];
            const lv = left[j - r2];
            ndu[j][r2] = rv + lv;
            const temp = ndu[r2][j - 1] / ndu[j][r2];
            ndu[r2][j] = saved + rv * temp;
            saved = lv * temp;
        }
        ndu[j][j] = saved;
    }
    for(let j = 0; j <= p; ++j){
        ders[0][j] = ndu[j][p];
    }
    for(let r2 = 0; r2 <= p; ++r2){
        let s1 = 0;
        let s2 = 1;
        const a = [];
        for(let i = 0; i <= p; ++i){
            a[i] = zeroArr.slice(0);
        }
        a[0][0] = 1;
        for(let k = 1; k <= n; ++k){
            let d = 0;
            const rk = r2 - k;
            const pk = p - k;
            if (r2 >= k) {
                a[s2][0] = a[s1][0] / ndu[pk + 1][rk];
                d = a[s2][0] * ndu[rk][pk];
            }
            const j1 = rk >= -1 ? 1 : -rk;
            const j2 = r2 - 1 <= pk ? k - 1 : p - r2;
            for(let j3 = j1; j3 <= j2; ++j3){
                a[s2][j3] = (a[s1][j3] - a[s1][j3 - 1]) / ndu[pk + 1][rk + j3];
                d += a[s2][j3] * ndu[rk + j3][pk];
            }
            if (r2 <= pk) {
                a[s2][k] = -a[s1][k - 1] / ndu[pk + 1][r2];
                d += a[s2][k] * ndu[r2][pk];
            }
            ders[k][r2] = d;
            const j = s1;
            s1 = s2;
            s2 = j;
        }
    }
    let r = p;
    for(let k = 1; k <= n; ++k){
        for(let j = 0; j <= p; ++j){
            ders[k][j] *= r;
        }
        r *= p - k;
    }
    return ders;
}
function calcBSplineDerivatives(p, U, P, u, nd) {
    const du = nd < p ? nd : p;
    const CK = [];
    const span = findSpan(p, u, U);
    const nders = calcBasisFunctionDerivatives(span, u, p, du, U);
    const Pw = [];
    for(let i = 0; i < P.length; ++i){
        const point = P[i].clone();
        const w = point.w;
        point.x *= w;
        point.y *= w;
        point.z *= w;
        Pw[i] = point;
    }
    for(let k = 0; k <= du; ++k){
        const point = Pw[span - p].clone().multiplyScalar(nders[k][0]);
        for(let j = 1; j <= p; ++j){
            point.add(Pw[span - p + j].clone().multiplyScalar(nders[k][j]));
        }
        CK[k] = point;
    }
    for(let k = du + 1; k <= nd + 1; ++k){
        CK[k] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](0, 0, 0);
    }
    return CK;
}
function calcKoverI(k, i) {
    let nom = 1;
    for(let j = 2; j <= k; ++j){
        nom *= j;
    }
    let denom = 1;
    for(let j = 2; j <= i; ++j){
        denom *= j;
    }
    for(let j = 2; j <= k - i; ++j){
        denom *= j;
    }
    return nom / denom;
}
function calcRationalCurveDerivatives(Pders) {
    const nd = Pders.length;
    const Aders = [];
    const wders = [];
    for(let i = 0; i < nd; ++i){
        const point = Pders[i];
        Aders[i] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](point.x, point.y, point.z);
        wders[i] = point.w;
    }
    const CK = [];
    for(let k = 0; k < nd; ++k){
        const v = Aders[k].clone();
        for(let i = 1; i <= k; ++i){
            v.sub(CK[k - i].clone().multiplyScalar(calcKoverI(k, i) * wders[i]));
        }
        CK[k] = v.divideScalar(wders[0]);
    }
    return CK;
}
function calcNURBSDerivatives(p, U, P, u, nd) {
    const Pders = calcBSplineDerivatives(p, U, P, u, nd);
    return calcRationalCurveDerivatives(Pders);
}
function calcSurfacePoint(p, q, U, V, P, u, v, target) {
    const uspan = findSpan(p, u, U);
    const vspan = findSpan(q, v, V);
    const Nu = calcBasisFunctions(uspan, u, p, U);
    const Nv = calcBasisFunctions(vspan, v, q, V);
    const temp = [];
    for(let l = 0; l <= q; ++l){
        temp[l] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](0, 0, 0, 0);
        for(let k = 0; k <= p; ++k){
            const point = P[uspan - p + k][vspan - q + l].clone();
            const w = point.w;
            point.x *= w;
            point.y *= w;
            point.z *= w;
            temp[l].add(point.multiplyScalar(Nu[k]));
        }
    }
    const Sw = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](0, 0, 0, 0);
    for(let l = 0; l <= q; ++l){
        Sw.add(temp[l].multiplyScalar(Nv[l]));
    }
    Sw.divideScalar(Sw.w);
    target.set(Sw.x, Sw.y, Sw.z);
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/effects/AsciiEffect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsciiEffect",
    ()=>AsciiEffect
]);
class AsciiEffect {
    constructor(renderer, charSet = " .:-=+*#%@", options = {}){
        const fResolution = options["resolution"] || 0.15;
        const iScale = options["scale"] || 1;
        const bColor = options["color"] || false;
        const bAlpha = options["alpha"] || false;
        const bBlock = options["block"] || false;
        const bInvert = options["invert"] || false;
        const strResolution = options["strResolution"] || "low";
        let width, height;
        const domElement = document.createElement("div");
        domElement.style.cursor = "default";
        const oAscii = document.createElement("table");
        domElement.appendChild(oAscii);
        let iWidth, iHeight;
        let oImg;
        this.setSize = function(w, h) {
            width = w;
            height = h;
            renderer.setSize(w, h);
            initAsciiSize();
        };
        this.render = function(scene, camera) {
            renderer.render(scene, camera);
            asciifyImage(oAscii);
        };
        this.domElement = domElement;
        function initAsciiSize() {
            iWidth = Math.floor(width * fResolution);
            iHeight = Math.floor(height * fResolution);
            oCanvas.width = iWidth;
            oCanvas.height = iHeight;
            oImg = renderer.domElement;
            if (oImg.style.backgroundColor) {
                oAscii.rows[0].cells[0].style.backgroundColor = oImg.style.backgroundColor;
                oAscii.rows[0].cells[0].style.color = oImg.style.color;
            }
            oAscii.cellSpacing = 0;
            oAscii.cellPadding = 0;
            const oStyle = oAscii.style;
            oStyle.whiteSpace = "pre";
            oStyle.margin = "0px";
            oStyle.padding = "0px";
            oStyle.letterSpacing = fLetterSpacing + "px";
            oStyle.fontFamily = strFont;
            oStyle.fontSize = fFontSize + "px";
            oStyle.lineHeight = fLineHeight + "px";
            oStyle.textAlign = "left";
            oStyle.textDecoration = "none";
        }
        const aDefaultCharList = " .,:;i1tfLCG08@".split("");
        const aDefaultColorCharList = " CGO08@".split("");
        const strFont = "courier new, monospace";
        const oCanvasImg = renderer.domElement;
        const oCanvas = document.createElement("canvas");
        if (!oCanvas.getContext) {
            return;
        }
        const oCtx = oCanvas.getContext("2d");
        if (!oCtx.getImageData) {
            return;
        }
        let aCharList = bColor ? aDefaultColorCharList : aDefaultCharList;
        if (charSet) aCharList = charSet;
        const fFontSize = 2 / fResolution * iScale;
        const fLineHeight = 2 / fResolution * iScale;
        let fLetterSpacing = 0;
        if (strResolution == "low") {
            switch(iScale){
                case 1:
                    fLetterSpacing = -1;
                    break;
                case 2:
                case 3:
                    fLetterSpacing = -2.1;
                    break;
                case 4:
                    fLetterSpacing = -3.1;
                    break;
                case 5:
                    fLetterSpacing = -4.15;
                    break;
            }
        }
        if (strResolution == "medium") {
            switch(iScale){
                case 1:
                    fLetterSpacing = 0;
                    break;
                case 2:
                    fLetterSpacing = -1;
                    break;
                case 3:
                    fLetterSpacing = -1.04;
                    break;
                case 4:
                case 5:
                    fLetterSpacing = -2.1;
                    break;
            }
        }
        if (strResolution == "high") {
            switch(iScale){
                case 1:
                case 2:
                    fLetterSpacing = 0;
                    break;
                case 3:
                case 4:
                case 5:
                    fLetterSpacing = -1;
                    break;
            }
        }
        function asciifyImage(oAscii2) {
            oCtx.clearRect(0, 0, iWidth, iHeight);
            oCtx.drawImage(oCanvasImg, 0, 0, iWidth, iHeight);
            const oImgData = oCtx.getImageData(0, 0, iWidth, iHeight).data;
            let strChars = "";
            for(let y = 0; y < iHeight; y += 2){
                for(let x = 0; x < iWidth; x++){
                    const iOffset = (y * iWidth + x) * 4;
                    const iRed = oImgData[iOffset];
                    const iGreen = oImgData[iOffset + 1];
                    const iBlue = oImgData[iOffset + 2];
                    const iAlpha = oImgData[iOffset + 3];
                    let iCharIdx;
                    let fBrightness;
                    fBrightness = (0.3 * iRed + 0.59 * iGreen + 0.11 * iBlue) / 255;
                    if (iAlpha == 0) {
                        fBrightness = 1;
                    }
                    iCharIdx = Math.floor((1 - fBrightness) * (aCharList.length - 1));
                    if (bInvert) {
                        iCharIdx = aCharList.length - iCharIdx - 1;
                    }
                    let strThisChar = aCharList[iCharIdx];
                    if (strThisChar === void 0 || strThisChar == " ") strThisChar = "&nbsp;";
                    if (bColor) {
                        strChars += "<span style='color:rgb(" + iRed + "," + iGreen + "," + iBlue + ");" + (bBlock ? "background-color:rgb(" + iRed + "," + iGreen + "," + iBlue + ");" : "") + (bAlpha ? "opacity:" + iAlpha / 255 + ";" : "") + "'>" + strThisChar + "</span>";
                    } else {
                        strChars += strThisChar;
                    }
                }
                strChars += "<br/>";
            }
            oAscii2.innerHTML = `<tr><td style="display:block;width:${width}px;height:${height}px;overflow:hidden">${strChars}</td></tr>`;
        }
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/geometries/DecalGeometry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DecalGeometry",
    ()=>DecalGeometry,
    "DecalVertex",
    ()=>DecalVertex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class DecalGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"] {
    constructor(mesh, position, orientation, size){
        super();
        const vertices = [];
        const normals = [];
        const uvs = [];
        const plane = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const projectorMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        projectorMatrix.makeRotationFromEuler(orientation);
        projectorMatrix.setPosition(position);
        const projectorMatrixInverse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        projectorMatrixInverse.copy(projectorMatrix).invert();
        generate();
        this.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](vertices, 3));
        this.setAttribute("normal", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](normals, 3));
        this.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](uvs, 2));
        function generate() {
            let i;
            let decalVertices = [];
            const vertex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const normal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            if (mesh.geometry.isGeometry === true) {
                console.error("THREE.DecalGeometry no longer supports THREE.Geometry. Use BufferGeometry instead.");
                return;
            }
            const geometry = mesh.geometry;
            const positionAttribute = geometry.attributes.position;
            const normalAttribute = geometry.attributes.normal;
            if (geometry.index !== null) {
                const index = geometry.index;
                for(i = 0; i < index.count; i++){
                    vertex.fromBufferAttribute(positionAttribute, index.getX(i));
                    normal.fromBufferAttribute(normalAttribute, index.getX(i));
                    pushDecalVertex(decalVertices, vertex, normal);
                }
            } else {
                for(i = 0; i < positionAttribute.count; i++){
                    vertex.fromBufferAttribute(positionAttribute, i);
                    normal.fromBufferAttribute(normalAttribute, i);
                    pushDecalVertex(decalVertices, vertex, normal);
                }
            }
            decalVertices = clipGeometry(decalVertices, plane.set(1, 0, 0));
            decalVertices = clipGeometry(decalVertices, plane.set(-1, 0, 0));
            decalVertices = clipGeometry(decalVertices, plane.set(0, 1, 0));
            decalVertices = clipGeometry(decalVertices, plane.set(0, -1, 0));
            decalVertices = clipGeometry(decalVertices, plane.set(0, 0, 1));
            decalVertices = clipGeometry(decalVertices, plane.set(0, 0, -1));
            for(i = 0; i < decalVertices.length; i++){
                const decalVertex = decalVertices[i];
                uvs.push(0.5 + decalVertex.position.x / size.x, 0.5 + decalVertex.position.y / size.y);
                decalVertex.position.applyMatrix4(projectorMatrix);
                vertices.push(decalVertex.position.x, decalVertex.position.y, decalVertex.position.z);
                normals.push(decalVertex.normal.x, decalVertex.normal.y, decalVertex.normal.z);
            }
        }
        function pushDecalVertex(decalVertices, vertex, normal) {
            vertex.applyMatrix4(mesh.matrixWorld);
            vertex.applyMatrix4(projectorMatrixInverse);
            normal.transformDirection(mesh.matrixWorld);
            decalVertices.push(new DecalVertex(vertex.clone(), normal.clone()));
        }
        function clipGeometry(inVertices, plane2) {
            const outVertices = [];
            const s = 0.5 * Math.abs(size.dot(plane2));
            for(let i = 0; i < inVertices.length; i += 3){
                let v1Out, v2Out, v3Out, total = 0;
                let nV1, nV2, nV3, nV4;
                const d1 = inVertices[i + 0].position.dot(plane2) - s;
                const d2 = inVertices[i + 1].position.dot(plane2) - s;
                const d3 = inVertices[i + 2].position.dot(plane2) - s;
                v1Out = d1 > 0;
                v2Out = d2 > 0;
                v3Out = d3 > 0;
                total = (v1Out ? 1 : 0) + (v2Out ? 1 : 0) + (v3Out ? 1 : 0);
                switch(total){
                    case 0:
                        {
                            outVertices.push(inVertices[i]);
                            outVertices.push(inVertices[i + 1]);
                            outVertices.push(inVertices[i + 2]);
                            break;
                        }
                    case 1:
                        {
                            if (v1Out) {
                                nV1 = inVertices[i + 1];
                                nV2 = inVertices[i + 2];
                                nV3 = clip(inVertices[i], nV1, plane2, s);
                                nV4 = clip(inVertices[i], nV2, plane2, s);
                            }
                            if (v2Out) {
                                nV1 = inVertices[i];
                                nV2 = inVertices[i + 2];
                                nV3 = clip(inVertices[i + 1], nV1, plane2, s);
                                nV4 = clip(inVertices[i + 1], nV2, plane2, s);
                                outVertices.push(nV3);
                                outVertices.push(nV2.clone());
                                outVertices.push(nV1.clone());
                                outVertices.push(nV2.clone());
                                outVertices.push(nV3.clone());
                                outVertices.push(nV4);
                                break;
                            }
                            if (v3Out) {
                                nV1 = inVertices[i];
                                nV2 = inVertices[i + 1];
                                nV3 = clip(inVertices[i + 2], nV1, plane2, s);
                                nV4 = clip(inVertices[i + 2], nV2, plane2, s);
                            }
                            outVertices.push(nV1.clone());
                            outVertices.push(nV2.clone());
                            outVertices.push(nV3);
                            outVertices.push(nV4);
                            outVertices.push(nV3.clone());
                            outVertices.push(nV2.clone());
                            break;
                        }
                    case 2:
                        {
                            if (!v1Out) {
                                nV1 = inVertices[i].clone();
                                nV2 = clip(nV1, inVertices[i + 1], plane2, s);
                                nV3 = clip(nV1, inVertices[i + 2], plane2, s);
                                outVertices.push(nV1);
                                outVertices.push(nV2);
                                outVertices.push(nV3);
                            }
                            if (!v2Out) {
                                nV1 = inVertices[i + 1].clone();
                                nV2 = clip(nV1, inVertices[i + 2], plane2, s);
                                nV3 = clip(nV1, inVertices[i], plane2, s);
                                outVertices.push(nV1);
                                outVertices.push(nV2);
                                outVertices.push(nV3);
                            }
                            if (!v3Out) {
                                nV1 = inVertices[i + 2].clone();
                                nV2 = clip(nV1, inVertices[i], plane2, s);
                                nV3 = clip(nV1, inVertices[i + 1], plane2, s);
                                outVertices.push(nV1);
                                outVertices.push(nV2);
                                outVertices.push(nV3);
                            }
                            break;
                        }
                }
            }
            return outVertices;
        }
        function clip(v0, v1, p, s) {
            const d0 = v0.position.dot(p) - s;
            const d1 = v1.position.dot(p) - s;
            const s0 = d0 / (d0 - d1);
            const v = new DecalVertex(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](v0.position.x + s0 * (v1.position.x - v0.position.x), v0.position.y + s0 * (v1.position.y - v0.position.y), v0.position.z + s0 * (v1.position.z - v0.position.z)), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](v0.normal.x + s0 * (v1.normal.x - v0.normal.x), v0.normal.y + s0 * (v1.normal.y - v0.normal.y), v0.normal.z + s0 * (v1.normal.z - v0.normal.z)));
            return v;
        }
    }
}
class DecalVertex {
    constructor(position, normal){
        this.position = position;
        this.normal = normal;
    }
    clone() {
        return new this.constructor(this.position.clone(), this.normal.clone());
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/geometries/TextGeometry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextBufferGeometry",
    ()=>TextGeometry,
    "TextGeometry",
    ()=>TextGeometry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class TextGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtrudeGeometry"] {
    constructor(text, parameters = {}){
        const { bevelEnabled = false, bevelSize = 8, bevelThickness = 10, font, height = 50, size = 100, lineHeight = 1, letterSpacing = 0, ...rest } = parameters;
        if (font === void 0) {
            super();
        } else {
            const shapes = font.generateShapes(text, size, {
                lineHeight,
                letterSpacing
            });
            super(shapes, {
                ...rest,
                bevelEnabled,
                bevelSize,
                bevelThickness,
                depth: height
            });
        }
        this.type = "TextGeometry";
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/interactive/SelectionBox.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectionBox",
    ()=>SelectionBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const frustum = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Frustum"]();
const center = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const tmpPoint = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecNear = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecTopLeft = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecTopRight = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecDownRight = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecDownLeft = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecFarTopLeft = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecFarTopRight = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecFarDownRight = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecFarDownLeft = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vectemp1 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vectemp2 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vectemp3 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
class SelectionBox {
    constructor(camera, scene, deep){
        this.camera = camera;
        this.scene = scene;
        this.startPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this.endPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this.collection = [];
        this.deep = deep || Number.MAX_VALUE;
    }
    select(startPoint, endPoint) {
        this.startPoint = startPoint || this.startPoint;
        this.endPoint = endPoint || this.endPoint;
        this.collection = [];
        this.updateFrustum(this.startPoint, this.endPoint);
        this.searchChildInFrustum(frustum, this.scene);
        return this.collection;
    }
    updateFrustum(startPoint, endPoint) {
        startPoint = startPoint || this.startPoint;
        endPoint = endPoint || this.endPoint;
        if (startPoint.x === endPoint.x) {
            endPoint.x += Number.EPSILON;
        }
        if (startPoint.y === endPoint.y) {
            endPoint.y += Number.EPSILON;
        }
        this.camera.updateProjectionMatrix();
        this.camera.updateMatrixWorld();
        if (this.camera.isPerspectiveCamera) {
            tmpPoint.copy(startPoint);
            tmpPoint.x = Math.min(startPoint.x, endPoint.x);
            tmpPoint.y = Math.max(startPoint.y, endPoint.y);
            endPoint.x = Math.max(startPoint.x, endPoint.x);
            endPoint.y = Math.min(startPoint.y, endPoint.y);
            vecNear.setFromMatrixPosition(this.camera.matrixWorld);
            vecTopLeft.copy(tmpPoint);
            vecTopRight.set(endPoint.x, tmpPoint.y, 0);
            vecDownRight.copy(endPoint);
            vecDownLeft.set(tmpPoint.x, endPoint.y, 0);
            vecTopLeft.unproject(this.camera);
            vecTopRight.unproject(this.camera);
            vecDownRight.unproject(this.camera);
            vecDownLeft.unproject(this.camera);
            vectemp1.copy(vecTopLeft).sub(vecNear);
            vectemp2.copy(vecTopRight).sub(vecNear);
            vectemp3.copy(vecDownRight).sub(vecNear);
            vectemp1.normalize();
            vectemp2.normalize();
            vectemp3.normalize();
            vectemp1.multiplyScalar(this.deep);
            vectemp2.multiplyScalar(this.deep);
            vectemp3.multiplyScalar(this.deep);
            vectemp1.add(vecNear);
            vectemp2.add(vecNear);
            vectemp3.add(vecNear);
            var planes = frustum.planes;
            planes[0].setFromCoplanarPoints(vecNear, vecTopLeft, vecTopRight);
            planes[1].setFromCoplanarPoints(vecNear, vecTopRight, vecDownRight);
            planes[2].setFromCoplanarPoints(vecDownRight, vecDownLeft, vecNear);
            planes[3].setFromCoplanarPoints(vecDownLeft, vecTopLeft, vecNear);
            planes[4].setFromCoplanarPoints(vecTopRight, vecDownRight, vecDownLeft);
            planes[5].setFromCoplanarPoints(vectemp3, vectemp2, vectemp1);
            planes[5].normal.multiplyScalar(-1);
        } else if (this.camera.isOrthographicCamera) {
            const left = Math.min(startPoint.x, endPoint.x);
            const top = Math.max(startPoint.y, endPoint.y);
            const right = Math.max(startPoint.x, endPoint.x);
            const down = Math.min(startPoint.y, endPoint.y);
            vecTopLeft.set(left, top, -1);
            vecTopRight.set(right, top, -1);
            vecDownRight.set(right, down, -1);
            vecDownLeft.set(left, down, -1);
            vecFarTopLeft.set(left, top, 1);
            vecFarTopRight.set(right, top, 1);
            vecFarDownRight.set(right, down, 1);
            vecFarDownLeft.set(left, down, 1);
            vecTopLeft.unproject(this.camera);
            vecTopRight.unproject(this.camera);
            vecDownRight.unproject(this.camera);
            vecDownLeft.unproject(this.camera);
            vecFarTopLeft.unproject(this.camera);
            vecFarTopRight.unproject(this.camera);
            vecFarDownRight.unproject(this.camera);
            vecFarDownLeft.unproject(this.camera);
            var planes = frustum.planes;
            planes[0].setFromCoplanarPoints(vecTopLeft, vecFarTopLeft, vecFarTopRight);
            planes[1].setFromCoplanarPoints(vecTopRight, vecFarTopRight, vecFarDownRight);
            planes[2].setFromCoplanarPoints(vecFarDownRight, vecFarDownLeft, vecDownLeft);
            planes[3].setFromCoplanarPoints(vecFarDownLeft, vecFarTopLeft, vecTopLeft);
            planes[4].setFromCoplanarPoints(vecTopRight, vecDownRight, vecDownLeft);
            planes[5].setFromCoplanarPoints(vecFarDownRight, vecFarTopRight, vecFarTopLeft);
            planes[5].normal.multiplyScalar(-1);
        } else {
            console.error("THREE.SelectionBox: Unsupported camera type.");
        }
    }
    searchChildInFrustum(frustum2, object) {
        if (object.isMesh || object.isLine || object.isPoints) {
            if (object.material !== void 0) {
                if (object.geometry.boundingSphere === null) object.geometry.computeBoundingSphere();
                center.copy(object.geometry.boundingSphere.center);
                center.applyMatrix4(object.matrixWorld);
                if (frustum2.containsPoint(center)) {
                    this.collection.push(object);
                }
            }
        }
        if (object.children.length > 0) {
            for(let x = 0; x < object.children.length; x++){
                this.searchChildInFrustum(frustum2, object.children[x]);
            }
        }
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/libs/MeshoptDecoder.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MeshoptDecoder",
    ()=>MeshoptDecoder
]);
let generated;
const MeshoptDecoder = ()=>{
    if (generated) return generated;
    const wasm_base = "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";
    const wasm_simd = "B9h9z9tFBBBFiI9gBB9gLaaaaaFa9gEaaaB9gFaFaEMcBBFBFFGGGEILF9wFFFLEFBFKNFaFCx/aFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBG8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBIy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBKi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBOn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBNI9z9iqlBVc+N9IcIBTEM9+FLa8jUUUUBCTlRBCBRFEXCBRGCBREEXABCNJAGJAECUaAFAGrCFZHIy86BBAEAIJREAGCFJHGCN9HQBMAFCx+YUUBJAE86BBAFCEWCxkUUBJAB8pEN83EBAFCFJHFCUG9HQBMMk8lLbaE97F9+FaL978jUUUUBCU/KBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAG/8cBBCUoBAG9uC/wgBZHKCUGAKCUG9JyRNAECFJRKCBRVGXEXAVAF9PQFANAFAVlAVANJAF9JyRcGXGXAG9FQBAcCbJHIC9wZHMCE9sRSAMCFWRQAICIrCEJCGrRfCBRbEXAKRTCBRtGXEXGXAOATlAf9PQBCBRKSLMALCU/CBJAtAM9sJRmATAfJRKCBREGXAMCoB9JQBAOAKlC/gB9JQBCBRIEXAmAIJREGXGXGXGXGXATAICKrJ2BBHYCEZfIBFGEBMAECBDtDMIBSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMIBAKCTJRKMGXGXGXGXGXAYCGrCEZfIBFGEBMAECBDtDMITSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMITAKCTJRKMGXGXGXGXGXAYCIrCEZfIBFGEBMAECBDtDMIASEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAEAKDBBBDMIAAKCTJRKMGXGXGXGXGXAYCKrfIBFGEBMAECBDtDMI8wSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCIJAeDeBJAYCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCNJAeDeBJAYCx+YUUBJ2BBJRKSFMAEAKDBBBDMI8wAKCTJRKMAICoBJREAICUFJAM9LQFAERIAOAKlC/fB9LQBMMGXAEAM9PQBAECErRIEXGXAOAKlCi9PQBCBRKSOMAmAEJRYGXGXGXGXGXATAECKrJ2BBAICKZrCEZfIBFGEBMAYCBDtDMIBSEMAYAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAeDeBJAiCx+YUUBJ2BBJRKSGMAYAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPAPDQBFGENVcMILKOSQfbHeD8dBh+BsxoxoUwN0AeD8dFhxoUwkwk+gUa0sHnhTkAnsHnhNkAnsHn7CgFZHiCEWCxkUUBJDBEBAiCx+YUUBJDBBBHeAeDQBBBBBBBBBBBBBBBBAnhAk7CgFZHiCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAeDeBJAiCx+YUUBJ2BBJRKSFMAYAKDBBBDMIBAKCTJRKMAICGJRIAECTJHEAM9JQBMMGXAK9FQBAKRTAtCFJHtCI6QGSFMMCBRKSEMGXAM9FQBALCUGJAbJREALAbJDBGBReCBRYEXAEALCU/CBJAYJHIDBIBHdCFD9tAdCFDbHPD9OD9hD9RHdAIAMJDBIBH8ZCFD9tA8ZAPD9OD9hD9RH8ZDQBTFtGmEYIPLdKeOnHpAIAQJDBIBHyCFD9tAyAPD9OD9hD9RHyAIASJDBIBH8cCFD9tA8cAPD9OD9hD9RH8cDQBTFtGmEYIPLdKeOnH8dDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGEAeD9uHeDyBjGBAEAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeApA8dDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeAdA8ZDQNiV8ZcpMyS8cQ8df8eb8fHdAyA8cDQNiV8ZcpMyS8cQ8df8eb8fH8ZDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJHIAeAdA8ZDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHeDyBjGBAIAGJHIAeAPAPDQILKOILKOILKOILKOD9uHeDyBjGBAIAGJHIAeAPAPDQNVcMNVcMNVcMNVcMD9uHeDyBjGBAIAGJHIAeAPAPDQSQfbSQfbSQfbSQfbD9uHeDyBjGBAIAGJREAYCTJHYAM9JQBMMAbCIJHbAG9JQBMMABAVAG9sJALCUGJAcAG9s/8cBBALALCUGJAcCaJAG9sJAG/8cBBMAcCBAKyAVJRVAKQBMC9+RKSFMCBC99AOAKlAGCAAGCA9Ly6yRKMALCU/KBJ8kUUUUBAKMNBT+BUUUBM+KmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUF/8MBALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM/dLEK97FaF97GXGXAGCI9HQBAF9FQFCBRGEXABABDBBBHECiD+rFCiD+sFD/6FHIAECND+rFCiD+sFD/6FAID/gFAECTD+rFCiD+sFD/6FHLD/gFD/kFD/lFHKCBDtD+2FHOAICUUUU94DtHND9OD9RD/kFHI9DBB/+hDYAIAID/mFAKAKD/mFALAOALAND9OD9RD/kFHIAID/mFD/kFD/kFD/jFD/nFHLD/mF9DBBX9LDYHOD/kFCgFDtD9OAECUUU94DtD9OD9QAIALD/mFAOD/kFCND+rFCU/+EDtD9OD9QAKALD/mFAOD/kFCTD+rFCUU/8ODtD9OD9QDMBBABCTJRBAGCIJHGAF9JQBSGMMAF9FQBCBRGEXABCTJHVAVDBBBHECBDtHOCUU98D8cFCUU98D8cEHND9OABDBBBHKAEDQILKOSQfbPden8c8d8e8fCggFDtD9OD/6FAKAEDQBFGENVcMTtmYi8ZpyHECTD+sFD/6FHID/gFAECTD+rFCTD+sFD/6FHLD/gFD/kFD/lFHE9DB/+g6DYALAEAOD+2FHOALCUUUU94DtHcD9OD9RD/kFHLALD/mFAEAED/mFAIAOAIAcD9OD9RD/kFHEAED/mFD/kFD/kFD/jFD/nFHID/mF9DBBX9LDYHOD/kFCTD+rFALAID/mFAOD/kFCggEDtD9OD9QHLAEAID/mFAOD/kFCaDbCBDnGCBDnECBDnKCBDnOCBDncCBDnMCBDnfCBDnbD9OHEDQNVi8ZcMpySQ8c8dfb8e8fD9QDMBBABAKAND9OALAEDQBFTtGEmYILPdKOenD9QDMBBABCAJRBAGCIJHGAF9JQBMMM/hEIGaF97FaL978jUUUUBCTlREGXAF9FQBCBRIEXAEABDBBBHLABCTJHKDBBBHODQILKOSQfbPden8c8d8e8fHNCTD+sFHVCID+rFDMIBAB9DBBU8/DY9D/zI818/DYAVCEDtD9QD/6FD/nFHVALAODQBFGENVcMTtmYi8ZpyHLCTD+rFCTD+sFD/6FD/mFHOAOD/mFAVALCTD+sFD/6FD/mFHcAcD/mFAVANCTD+rFCTD+sFD/6FD/mFHNAND/mFD/kFD/kFD/lFCBDtD+4FD/jF9DB/+g6DYHVD/mF9DBBX9LDYHLD/kFCggEDtHMD9OAcAVD/mFALD/kFCTD+rFD9QHcANAVD/mFALD/kFCTD+rFAOAVD/mFALD/kFAMD9OD9QHVDQBFTtGEmYILPdKOenHLD8dBAEDBIBDyB+t+J83EBABCNJALD8dFAEDBIBDyF+t+J83EBAKAcAVDQNVi8ZcMpySQ8c8dfb8e8fHVD8dBAEDBIBDyG+t+J83EBABCiJAVD8dFAEDBIBDyE+t+J83EBABCAJRBAICIJHIAF9JQBMMM9jFF97GXAGCGrAF9sHG9FQBCBRFEXABABDBBBHECND+rFCND+sFD/6FAECiD+sFCnD+rFCUUU/8EDtD+uFD/mFDMBBABCTJRBAFCIJHFAG9JQBMMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEMMMFBCUNMIT9tBB";
    const detector = new Uint8Array([
        0,
        97,
        115,
        109,
        1,
        0,
        0,
        0,
        1,
        4,
        1,
        96,
        0,
        0,
        3,
        3,
        2,
        0,
        0,
        5,
        3,
        1,
        0,
        1,
        12,
        1,
        0,
        10,
        22,
        2,
        12,
        0,
        65,
        0,
        65,
        0,
        65,
        0,
        252,
        10,
        0,
        0,
        11,
        7,
        0,
        65,
        0,
        253,
        15,
        26,
        11
    ]);
    const wasmpack = new Uint8Array([
        32,
        0,
        65,
        253,
        3,
        1,
        2,
        34,
        4,
        106,
        6,
        5,
        11,
        8,
        7,
        20,
        13,
        33,
        12,
        16,
        128,
        9,
        116,
        64,
        19,
        113,
        127,
        15,
        10,
        21,
        22,
        14,
        255,
        66,
        24,
        54,
        136,
        107,
        18,
        23,
        192,
        26,
        114,
        118,
        132,
        17,
        77,
        101,
        130,
        144,
        27,
        87,
        131,
        44,
        45,
        74,
        156,
        154,
        70,
        167
    ]);
    if (typeof WebAssembly !== "object") {
        return {
            supported: false
        };
    }
    let wasm = wasm_base;
    if (WebAssembly.validate(detector)) {
        wasm = wasm_simd;
    }
    let instance;
    const promise = WebAssembly.instantiate(unpack(wasm), {}).then((result)=>{
        instance = result.instance;
        instance.exports.__wasm_call_ctors();
    });
    function unpack(data) {
        const result = new Uint8Array(data.length);
        for(let i = 0; i < data.length; ++i){
            const ch = data.charCodeAt(i);
            result[i] = ch > 96 ? ch - 71 : ch > 64 ? ch - 65 : ch > 47 ? ch + 4 : ch > 46 ? 63 : 62;
        }
        let write = 0;
        for(let i = 0; i < data.length; ++i){
            result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
        }
        return result.buffer.slice(0, write);
    }
    function decode(fun, target, count, size, source, filter) {
        const sbrk = instance.exports.sbrk;
        const count4 = count + 3 & ~3;
        const tp = sbrk(count4 * size);
        const sp = sbrk(source.length);
        const heap = new Uint8Array(instance.exports.memory.buffer);
        heap.set(source, sp);
        const res = fun(tp, count, size, sp, source.length);
        if (res === 0 && filter) {
            filter(tp, count4, size);
        }
        target.set(heap.subarray(tp, tp + count * size));
        sbrk(tp - sbrk(0));
        if (res !== 0) {
            throw new Error(`Malformed buffer data: ${res}`);
        }
    }
    const filters = {
        // legacy index-based enums for glTF
        0: "",
        1: "meshopt_decodeFilterOct",
        2: "meshopt_decodeFilterQuat",
        3: "meshopt_decodeFilterExp",
        // string-based enums for glTF
        NONE: "",
        OCTAHEDRAL: "meshopt_decodeFilterOct",
        QUATERNION: "meshopt_decodeFilterQuat",
        EXPONENTIAL: "meshopt_decodeFilterExp"
    };
    const decoders = {
        // legacy index-based enums for glTF
        0: "meshopt_decodeVertexBuffer",
        1: "meshopt_decodeIndexBuffer",
        2: "meshopt_decodeIndexSequence",
        // string-based enums for glTF
        ATTRIBUTES: "meshopt_decodeVertexBuffer",
        TRIANGLES: "meshopt_decodeIndexBuffer",
        INDICES: "meshopt_decodeIndexSequence"
    };
    generated = {
        ready: promise,
        supported: true,
        decodeVertexBuffer (target, count, size, source, filter) {
            decode(instance.exports.meshopt_decodeVertexBuffer, target, count, size, source, instance.exports[filters[filter]]);
        },
        decodeIndexBuffer (target, count, size, source) {
            decode(instance.exports.meshopt_decodeIndexBuffer, target, count, size, source);
        },
        decodeIndexSequence (target, count, size, source) {
            decode(instance.exports.meshopt_decodeIndexSequence, target, count, size, source);
        },
        decodeGltfBuffer (target, count, size, source, mode, filter) {
            decode(instance.exports[decoders[mode]], target, count, size, source, instance.exports[filters[filter]]);
        }
    };
    return generated;
};
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/libs/ktx-parse.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KHR_DF_FLAG_ALPHA_PREMULTIPLIED",
    ()=>KHR_DF_FLAG_ALPHA_PREMULTIPLIED,
    "KHR_DF_FLAG_ALPHA_STRAIGHT",
    ()=>KHR_DF_FLAG_ALPHA_STRAIGHT,
    "KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT",
    ()=>KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT,
    "KHR_DF_MODEL_UNSPECIFIED",
    ()=>KHR_DF_MODEL_UNSPECIFIED,
    "KHR_DF_PRIMARIES_BT709",
    ()=>KHR_DF_PRIMARIES_BT709,
    "KHR_DF_PRIMARIES_DISPLAYP3",
    ()=>KHR_DF_PRIMARIES_DISPLAYP3,
    "KHR_DF_PRIMARIES_UNSPECIFIED",
    ()=>KHR_DF_PRIMARIES_UNSPECIFIED,
    "KHR_DF_SAMPLE_DATATYPE_SIGNED",
    ()=>KHR_DF_SAMPLE_DATATYPE_SIGNED,
    "KHR_DF_TRANSFER_SRGB",
    ()=>KHR_DF_TRANSFER_SRGB,
    "KHR_DF_VENDORID_KHRONOS",
    ()=>KHR_DF_VENDORID_KHRONOS,
    "KHR_DF_VERSION",
    ()=>KHR_DF_VERSION,
    "KHR_SUPERCOMPRESSION_NONE",
    ()=>KHR_SUPERCOMPRESSION_NONE,
    "KHR_SUPERCOMPRESSION_ZSTD",
    ()=>KHR_SUPERCOMPRESSION_ZSTD,
    "KTX2Container",
    ()=>KTX2Container,
    "VK_FORMAT_ASTC_6x6_SRGB_BLOCK",
    ()=>VK_FORMAT_ASTC_6x6_SRGB_BLOCK,
    "VK_FORMAT_ASTC_6x6_UNORM_BLOCK",
    ()=>VK_FORMAT_ASTC_6x6_UNORM_BLOCK,
    "VK_FORMAT_R16G16B16A16_SFLOAT",
    ()=>VK_FORMAT_R16G16B16A16_SFLOAT,
    "VK_FORMAT_R16G16_SFLOAT",
    ()=>VK_FORMAT_R16G16_SFLOAT,
    "VK_FORMAT_R16_SFLOAT",
    ()=>VK_FORMAT_R16_SFLOAT,
    "VK_FORMAT_R32G32B32A32_SFLOAT",
    ()=>VK_FORMAT_R32G32B32A32_SFLOAT,
    "VK_FORMAT_R32G32_SFLOAT",
    ()=>VK_FORMAT_R32G32_SFLOAT,
    "VK_FORMAT_R32_SFLOAT",
    ()=>VK_FORMAT_R32_SFLOAT,
    "VK_FORMAT_R8G8B8A8_SRGB",
    ()=>VK_FORMAT_R8G8B8A8_SRGB,
    "VK_FORMAT_R8G8B8A8_UNORM",
    ()=>VK_FORMAT_R8G8B8A8_UNORM,
    "VK_FORMAT_R8G8_SRGB",
    ()=>VK_FORMAT_R8G8_SRGB,
    "VK_FORMAT_R8G8_UNORM",
    ()=>VK_FORMAT_R8G8_UNORM,
    "VK_FORMAT_R8_SRGB",
    ()=>VK_FORMAT_R8_SRGB,
    "VK_FORMAT_R8_UNORM",
    ()=>VK_FORMAT_R8_UNORM,
    "VK_FORMAT_UNDEFINED",
    ()=>VK_FORMAT_UNDEFINED,
    "read",
    ()=>read
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$types$2b$node$40$24$2e$_b6663641b762618a1a66d4436962a7a1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.0_@types+node@24._b6663641b762618a1a66d4436962a7a1/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
const KHR_SUPERCOMPRESSION_NONE = 0;
const KHR_SUPERCOMPRESSION_ZSTD = 2;
const KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT = 0;
const KHR_DF_VENDORID_KHRONOS = 0;
const KHR_DF_VERSION = 2;
const KHR_DF_MODEL_UNSPECIFIED = 0;
const KHR_DF_FLAG_ALPHA_STRAIGHT = 0;
const KHR_DF_FLAG_ALPHA_PREMULTIPLIED = 1;
const KHR_DF_TRANSFER_SRGB = 2;
const KHR_DF_PRIMARIES_UNSPECIFIED = 0;
const KHR_DF_PRIMARIES_BT709 = 1;
const KHR_DF_PRIMARIES_DISPLAYP3 = 10;
const KHR_DF_SAMPLE_DATATYPE_SIGNED = 64;
const VK_FORMAT_UNDEFINED = 0;
const VK_FORMAT_R8_UNORM = 9;
const VK_FORMAT_R8_SRGB = 15;
const VK_FORMAT_R8G8_UNORM = 16;
const VK_FORMAT_R8G8_SRGB = 22;
const VK_FORMAT_R8G8B8A8_UNORM = 37;
const VK_FORMAT_R8G8B8A8_SRGB = 43;
const VK_FORMAT_R16_SFLOAT = 76;
const VK_FORMAT_R16G16_SFLOAT = 83;
const VK_FORMAT_R16G16B16A16_SFLOAT = 97;
const VK_FORMAT_R32_SFLOAT = 100;
const VK_FORMAT_R32G32_SFLOAT = 103;
const VK_FORMAT_R32G32B32A32_SFLOAT = 109;
const VK_FORMAT_ASTC_6x6_UNORM_BLOCK = 165;
const VK_FORMAT_ASTC_6x6_SRGB_BLOCK = 166;
class KTX2Container {
    constructor(){
        this.vkFormat = VK_FORMAT_UNDEFINED;
        this.typeSize = 1;
        this.pixelWidth = 0;
        this.pixelHeight = 0;
        this.pixelDepth = 0;
        this.layerCount = 0;
        this.faceCount = 1;
        this.supercompressionScheme = KHR_SUPERCOMPRESSION_NONE;
        this.levels = [];
        this.dataFormatDescriptor = [
            {
                vendorId: KHR_DF_VENDORID_KHRONOS,
                descriptorType: KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT,
                descriptorBlockSize: 0,
                versionNumber: KHR_DF_VERSION,
                colorModel: KHR_DF_MODEL_UNSPECIFIED,
                colorPrimaries: KHR_DF_PRIMARIES_BT709,
                transferFunction: KHR_DF_TRANSFER_SRGB,
                flags: KHR_DF_FLAG_ALPHA_STRAIGHT,
                texelBlockDimension: [
                    0,
                    0,
                    0,
                    0
                ],
                bytesPlane: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                samples: []
            }
        ];
        this.keyValue = {};
        this.globalData = null;
    }
}
class BufferReader {
    constructor(data, byteOffset, byteLength, littleEndian){
        this._dataView = void 0;
        this._littleEndian = void 0;
        this._offset = void 0;
        this._dataView = new DataView(data.buffer, data.byteOffset + byteOffset, byteLength);
        this._littleEndian = littleEndian;
        this._offset = 0;
    }
    _nextUint8() {
        const value = this._dataView.getUint8(this._offset);
        this._offset += 1;
        return value;
    }
    _nextUint16() {
        const value = this._dataView.getUint16(this._offset, this._littleEndian);
        this._offset += 2;
        return value;
    }
    _nextUint32() {
        const value = this._dataView.getUint32(this._offset, this._littleEndian);
        this._offset += 4;
        return value;
    }
    _nextUint64() {
        const left = this._dataView.getUint32(this._offset, this._littleEndian);
        const right = this._dataView.getUint32(this._offset + 4, this._littleEndian);
        const value = left + 2 ** 32 * right;
        this._offset += 8;
        return value;
    }
    _nextInt32() {
        const value = this._dataView.getInt32(this._offset, this._littleEndian);
        this._offset += 4;
        return value;
    }
    _nextUint8Array(len) {
        const value = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._offset, len);
        this._offset += len;
        return value;
    }
    _skip(bytes) {
        this._offset += bytes;
        return this;
    }
    _scan(maxByteLength, term) {
        if (term === void 0) {
            term = 0;
        }
        const byteOffset = this._offset;
        let byteLength = 0;
        while(this._dataView.getUint8(this._offset) !== term && byteLength < maxByteLength){
            byteLength++;
            this._offset++;
        }
        if (byteLength < maxByteLength) this._offset++;
        return new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + byteOffset, byteLength);
    }
}
const KTX2_ID = [
    // '´', 'K', 'T', 'X', '2', '0', 'ª', '\r', '\n', '\x1A', '\n'
    171,
    75,
    84,
    88,
    32,
    50,
    48,
    187,
    13,
    10,
    26,
    10
];
function decodeText(buffer) {
    if (typeof TextDecoder !== "undefined") {
        return new TextDecoder().decode(buffer);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$types$2b$node$40$24$2e$_b6663641b762618a1a66d4436962a7a1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(buffer).toString("utf8");
}
function read(data) {
    const id = new Uint8Array(data.buffer, data.byteOffset, KTX2_ID.length);
    if (id[0] !== KTX2_ID[0] || // '´'
    id[1] !== KTX2_ID[1] || // 'K'
    id[2] !== KTX2_ID[2] || // 'T'
    id[3] !== KTX2_ID[3] || // 'X'
    id[4] !== KTX2_ID[4] || // ' '
    id[5] !== KTX2_ID[5] || // '2'
    id[6] !== KTX2_ID[6] || // '0'
    id[7] !== KTX2_ID[7] || // 'ª'
    id[8] !== KTX2_ID[8] || // '\r'
    id[9] !== KTX2_ID[9] || // '\n'
    id[10] !== KTX2_ID[10] || // '\x1A'
    id[11] !== KTX2_ID[11]) {
        throw new Error("Missing KTX 2.0 identifier.");
    }
    const container = new KTX2Container();
    const headerByteLength = 17 * Uint32Array.BYTES_PER_ELEMENT;
    const headerReader = new BufferReader(data, KTX2_ID.length, headerByteLength, true);
    container.vkFormat = headerReader._nextUint32();
    container.typeSize = headerReader._nextUint32();
    container.pixelWidth = headerReader._nextUint32();
    container.pixelHeight = headerReader._nextUint32();
    container.pixelDepth = headerReader._nextUint32();
    container.layerCount = headerReader._nextUint32();
    container.faceCount = headerReader._nextUint32();
    const levelCount = headerReader._nextUint32();
    container.supercompressionScheme = headerReader._nextUint32();
    const dfdByteOffset = headerReader._nextUint32();
    const dfdByteLength = headerReader._nextUint32();
    const kvdByteOffset = headerReader._nextUint32();
    const kvdByteLength = headerReader._nextUint32();
    const sgdByteOffset = headerReader._nextUint64();
    const sgdByteLength = headerReader._nextUint64();
    const levelByteLength = levelCount * 3 * 8;
    const levelReader = new BufferReader(data, KTX2_ID.length + headerByteLength, levelByteLength, true);
    for(let i = 0; i < levelCount; i++){
        container.levels.push({
            levelData: new Uint8Array(data.buffer, data.byteOffset + levelReader._nextUint64(), levelReader._nextUint64()),
            uncompressedByteLength: levelReader._nextUint64()
        });
    }
    const dfdReader = new BufferReader(data, dfdByteOffset, dfdByteLength, true);
    const dfd = {
        vendorId: dfdReader._skip(4)._nextUint16(),
        descriptorType: dfdReader._nextUint16(),
        versionNumber: dfdReader._nextUint16(),
        descriptorBlockSize: dfdReader._nextUint16(),
        colorModel: dfdReader._nextUint8(),
        colorPrimaries: dfdReader._nextUint8(),
        transferFunction: dfdReader._nextUint8(),
        flags: dfdReader._nextUint8(),
        texelBlockDimension: [
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8()
        ],
        bytesPlane: [
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8()
        ],
        samples: []
    };
    const sampleStart = 6;
    const sampleWords = 4;
    const numSamples = (dfd.descriptorBlockSize / 4 - sampleStart) / sampleWords;
    for(let i = 0; i < numSamples; i++){
        const sample = {
            bitOffset: dfdReader._nextUint16(),
            bitLength: dfdReader._nextUint8(),
            channelType: dfdReader._nextUint8(),
            samplePosition: [
                dfdReader._nextUint8(),
                dfdReader._nextUint8(),
                dfdReader._nextUint8(),
                dfdReader._nextUint8()
            ],
            sampleLower: -Infinity,
            sampleUpper: Infinity
        };
        if (sample.channelType & KHR_DF_SAMPLE_DATATYPE_SIGNED) {
            sample.sampleLower = dfdReader._nextInt32();
            sample.sampleUpper = dfdReader._nextInt32();
        } else {
            sample.sampleLower = dfdReader._nextUint32();
            sample.sampleUpper = dfdReader._nextUint32();
        }
        dfd.samples[i] = sample;
    }
    container.dataFormatDescriptor.length = 0;
    container.dataFormatDescriptor.push(dfd);
    const kvdReader = new BufferReader(data, kvdByteOffset, kvdByteLength, true);
    while(kvdReader._offset < kvdByteLength){
        const keyValueByteLength = kvdReader._nextUint32();
        const keyData = kvdReader._scan(keyValueByteLength);
        const key = decodeText(keyData);
        container.keyValue[key] = kvdReader._nextUint8Array(keyValueByteLength - keyData.byteLength - 1);
        if (key.match(/^ktx/i)) {
            const text = decodeText(container.keyValue[key]);
            container.keyValue[key] = text.substring(0, text.lastIndexOf("\0"));
        }
        const kvPadding = keyValueByteLength % 4 ? 4 - keyValueByteLength % 4 : 0;
        kvdReader._skip(kvPadding);
    }
    if (sgdByteLength <= 0) return container;
    const sgdReader = new BufferReader(data, sgdByteOffset, sgdByteLength, true);
    const endpointCount = sgdReader._nextUint16();
    const selectorCount = sgdReader._nextUint16();
    const endpointsByteLength = sgdReader._nextUint32();
    const selectorsByteLength = sgdReader._nextUint32();
    const tablesByteLength = sgdReader._nextUint32();
    const extendedByteLength = sgdReader._nextUint32();
    const imageDescs = [];
    for(let i = 0; i < levelCount; i++){
        imageDescs.push({
            imageFlags: sgdReader._nextUint32(),
            rgbSliceByteOffset: sgdReader._nextUint32(),
            rgbSliceByteLength: sgdReader._nextUint32(),
            alphaSliceByteOffset: sgdReader._nextUint32(),
            alphaSliceByteLength: sgdReader._nextUint32()
        });
    }
    const endpointsByteOffset = sgdByteOffset + sgdReader._offset;
    const selectorsByteOffset = endpointsByteOffset + endpointsByteLength;
    const tablesByteOffset = selectorsByteOffset + selectorsByteLength;
    const extendedByteOffset = tablesByteOffset + tablesByteLength;
    const endpointsData = new Uint8Array(data.buffer, data.byteOffset + endpointsByteOffset, endpointsByteLength);
    const selectorsData = new Uint8Array(data.buffer, data.byteOffset + selectorsByteOffset, selectorsByteLength);
    const tablesData = new Uint8Array(data.buffer, data.byteOffset + tablesByteOffset, tablesByteLength);
    const extendedData = new Uint8Array(data.buffer, data.byteOffset + extendedByteOffset, extendedByteLength);
    container.globalData = {
        endpointCount,
        selectorCount,
        imageDescs,
        endpointsData,
        selectorsData,
        tablesData,
        extendedData
    };
    return container;
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/libs/zstddec.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZSTDDecoder",
    ()=>ZSTDDecoder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$types$2b$node$40$24$2e$_b6663641b762618a1a66d4436962a7a1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.0_@types+node@24._b6663641b762618a1a66d4436962a7a1/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
let init;
let instance;
let heap;
const IMPORT_OBJECT = {
    env: {
        emscripten_notify_memory_growth: function(index) {
            heap = new Uint8Array(instance.exports.memory.buffer);
        }
    }
};
class ZSTDDecoder {
    init() {
        if (init) return init;
        if (typeof fetch !== "undefined") {
            init = fetch("data:application/wasm;base64," + wasm).then((response)=>response.arrayBuffer()).then((arrayBuffer)=>WebAssembly.instantiate(arrayBuffer, IMPORT_OBJECT)).then(this._init);
        } else {
            init = WebAssembly.instantiate(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$0_$40$types$2b$node$40$24$2e$_b6663641b762618a1a66d4436962a7a1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(wasm, "base64"), IMPORT_OBJECT).then(this._init);
        }
        return init;
    }
    _init(result) {
        instance = result.instance;
        IMPORT_OBJECT.env.emscripten_notify_memory_growth(0);
    }
    decode(array, uncompressedSize = 0) {
        if (!instance) throw new Error(`ZSTDDecoder: Await .init() before decoding.`);
        const compressedSize = array.byteLength;
        const compressedPtr = instance.exports.malloc(compressedSize);
        heap.set(array, compressedPtr);
        uncompressedSize = uncompressedSize || Number(instance.exports.ZSTD_findDecompressedSize(compressedPtr, compressedSize));
        const uncompressedPtr = instance.exports.malloc(uncompressedSize);
        const actualSize = instance.exports.ZSTD_decompress(uncompressedPtr, uncompressedSize, compressedPtr, compressedSize);
        const dec = heap.slice(uncompressedPtr, uncompressedPtr + actualSize);
        instance.exports.free(compressedPtr);
        instance.exports.free(uncompressedPtr);
        return dec;
    }
}
const wasm = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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";
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/Line2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Line2",
    ()=>Line2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegments2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/LineSegments2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/LineGeometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/LineMaterial.js [app-client] (ecmascript)");
;
;
;
class Line2 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegments2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegments2"] {
    constructor(geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineGeometry"](), material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineMaterial"]({
        color: Math.random() * 16777215
    })){
        super(geometry, material);
        this.isLine2 = true;
        this.type = "Line2";
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/LineGeometry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineGeometry",
    ()=>LineGeometry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegmentsGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/LineSegmentsGeometry.js [app-client] (ecmascript)");
;
class LineGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegmentsGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegmentsGeometry"] {
    constructor(){
        super();
        this.isLineGeometry = true;
        this.type = "LineGeometry";
    }
    setPositions(array) {
        const length = array.length - 3;
        const points = new Float32Array(2 * length);
        for(let i = 0; i < length; i += 3){
            points[2 * i] = array[i];
            points[2 * i + 1] = array[i + 1];
            points[2 * i + 2] = array[i + 2];
            points[2 * i + 3] = array[i + 3];
            points[2 * i + 4] = array[i + 4];
            points[2 * i + 5] = array[i + 5];
        }
        super.setPositions(points);
        return this;
    }
    setColors(array, itemSize = 3) {
        const length = array.length - itemSize;
        const colors = new Float32Array(2 * length);
        if (itemSize === 3) {
            for(let i = 0; i < length; i += itemSize){
                colors[2 * i] = array[i];
                colors[2 * i + 1] = array[i + 1];
                colors[2 * i + 2] = array[i + 2];
                colors[2 * i + 3] = array[i + 3];
                colors[2 * i + 4] = array[i + 4];
                colors[2 * i + 5] = array[i + 5];
            }
        } else {
            for(let i = 0; i < length; i += itemSize){
                colors[2 * i] = array[i];
                colors[2 * i + 1] = array[i + 1];
                colors[2 * i + 2] = array[i + 2];
                colors[2 * i + 3] = array[i + 3];
                colors[2 * i + 4] = array[i + 4];
                colors[2 * i + 5] = array[i + 5];
                colors[2 * i + 6] = array[i + 6];
                colors[2 * i + 7] = array[i + 7];
            }
        }
        super.setColors(colors, itemSize);
        return this;
    }
    fromLine(line) {
        const geometry = line.geometry;
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/LineMaterial.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineMaterial",
    ()=>LineMaterial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)");
;
;
class LineMaterial extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"] {
    constructor(parameters){
        super({
            type: "LineMaterial",
            uniforms: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].merge([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UniformsLib"].common,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UniformsLib"].fog,
                {
                    worldUnits: {
                        value: 1
                    },
                    linewidth: {
                        value: 1
                    },
                    resolution: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](1, 1)
                    },
                    dashOffset: {
                        value: 0
                    },
                    dashScale: {
                        value: 1
                    },
                    dashSize: {
                        value: 1
                    },
                    gapSize: {
                        value: 1
                    }
                }
            ])),
            vertexShader: /* glsl */ `
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,
            fragmentShader: /* glsl */ `
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"] >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,
            clipping: true
        });
        this.isLineMaterial = true;
        this.onBeforeCompile = function() {
            if (this.transparent) {
                this.defines.USE_LINE_COLOR_ALPHA = "1";
            } else {
                delete this.defines.USE_LINE_COLOR_ALPHA;
            }
        };
        Object.defineProperties(this, {
            color: {
                enumerable: true,
                get: function() {
                    return this.uniforms.diffuse.value;
                },
                set: function(value) {
                    this.uniforms.diffuse.value = value;
                }
            },
            worldUnits: {
                enumerable: true,
                get: function() {
                    return "WORLD_UNITS" in this.defines;
                },
                set: function(value) {
                    if (value === true) {
                        this.defines.WORLD_UNITS = "";
                    } else {
                        delete this.defines.WORLD_UNITS;
                    }
                }
            },
            linewidth: {
                enumerable: true,
                get: function() {
                    return this.uniforms.linewidth.value;
                },
                set: function(value) {
                    this.uniforms.linewidth.value = value;
                }
            },
            dashed: {
                enumerable: true,
                get: function() {
                    return Boolean("USE_DASH" in this.defines);
                },
                set (value) {
                    if (Boolean(value) !== Boolean("USE_DASH" in this.defines)) {
                        this.needsUpdate = true;
                    }
                    if (value === true) {
                        this.defines.USE_DASH = "";
                    } else {
                        delete this.defines.USE_DASH;
                    }
                }
            },
            dashScale: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashScale.value;
                },
                set: function(value) {
                    this.uniforms.dashScale.value = value;
                }
            },
            dashSize: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashSize.value;
                },
                set: function(value) {
                    this.uniforms.dashSize.value = value;
                }
            },
            dashOffset: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashOffset.value;
                },
                set: function(value) {
                    this.uniforms.dashOffset.value = value;
                }
            },
            gapSize: {
                enumerable: true,
                get: function() {
                    return this.uniforms.gapSize.value;
                },
                set: function(value) {
                    this.uniforms.gapSize.value = value;
                }
            },
            opacity: {
                enumerable: true,
                get: function() {
                    return this.uniforms.opacity.value;
                },
                set: function(value) {
                    this.uniforms.opacity.value = value;
                }
            },
            resolution: {
                enumerable: true,
                get: function() {
                    return this.uniforms.resolution.value;
                },
                set: function(value) {
                    this.uniforms.resolution.value.copy(value);
                }
            },
            alphaToCoverage: {
                enumerable: true,
                get: function() {
                    return Boolean("USE_ALPHA_TO_COVERAGE" in this.defines);
                },
                set: function(value) {
                    if (Boolean(value) !== Boolean("USE_ALPHA_TO_COVERAGE" in this.defines)) {
                        this.needsUpdate = true;
                    }
                    if (value === true) {
                        this.defines.USE_ALPHA_TO_COVERAGE = "";
                        this.extensions.derivatives = true;
                    } else {
                        delete this.defines.USE_ALPHA_TO_COVERAGE;
                        this.extensions.derivatives = false;
                    }
                }
            }
        });
        this.setValues(parameters);
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/LineSegments2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineSegments2",
    ()=>LineSegments2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegmentsGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/LineSegmentsGeometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/LineMaterial.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$uv1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/uv1.js [app-client] (ecmascript)");
;
;
;
;
const _viewport = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]();
const _start = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _end = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _start4 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]();
const _end4 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]();
const _ssOrigin = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]();
const _ssOrigin3 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _mvMatrix = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
const _line = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line3"]();
const _closestPoint = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _box = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
const _sphere = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"]();
const _clipToWorldVector = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]();
let _ray, _lineWidth;
function getWorldSpaceHalfWidth(camera, distance, resolution) {
    _clipToWorldVector.set(0, 0, -distance, 1).applyMatrix4(camera.projectionMatrix);
    _clipToWorldVector.multiplyScalar(1 / _clipToWorldVector.w);
    _clipToWorldVector.x = _lineWidth / resolution.width;
    _clipToWorldVector.y = _lineWidth / resolution.height;
    _clipToWorldVector.applyMatrix4(camera.projectionMatrixInverse);
    _clipToWorldVector.multiplyScalar(1 / _clipToWorldVector.w);
    return Math.abs(Math.max(_clipToWorldVector.x, _clipToWorldVector.y));
}
function raycastWorldUnits(lineSegments, intersects) {
    const matrixWorld = lineSegments.matrixWorld;
    const geometry = lineSegments.geometry;
    const instanceStart = geometry.attributes.instanceStart;
    const instanceEnd = geometry.attributes.instanceEnd;
    const segmentCount = Math.min(geometry.instanceCount, instanceStart.count);
    for(let i = 0, l = segmentCount; i < l; i++){
        _line.start.fromBufferAttribute(instanceStart, i);
        _line.end.fromBufferAttribute(instanceEnd, i);
        _line.applyMatrix4(matrixWorld);
        const pointOnLine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const point = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        _ray.distanceSqToSegment(_line.start, _line.end, point, pointOnLine);
        const isInside = point.distanceTo(pointOnLine) < _lineWidth * 0.5;
        if (isInside) {
            intersects.push({
                point,
                pointOnLine,
                distance: _ray.origin.distanceTo(point),
                object: lineSegments,
                face: null,
                faceIndex: i,
                uv: null,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$uv1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UV1"]]: null
            });
        }
    }
}
function raycastScreenSpace(lineSegments, camera, intersects) {
    const projectionMatrix = camera.projectionMatrix;
    const material = lineSegments.material;
    const resolution = material.resolution;
    const matrixWorld = lineSegments.matrixWorld;
    const geometry = lineSegments.geometry;
    const instanceStart = geometry.attributes.instanceStart;
    const instanceEnd = geometry.attributes.instanceEnd;
    const segmentCount = Math.min(geometry.instanceCount, instanceStart.count);
    const near = -camera.near;
    _ray.at(1, _ssOrigin);
    _ssOrigin.w = 1;
    _ssOrigin.applyMatrix4(camera.matrixWorldInverse);
    _ssOrigin.applyMatrix4(projectionMatrix);
    _ssOrigin.multiplyScalar(1 / _ssOrigin.w);
    _ssOrigin.x *= resolution.x / 2;
    _ssOrigin.y *= resolution.y / 2;
    _ssOrigin.z = 0;
    _ssOrigin3.copy(_ssOrigin);
    _mvMatrix.multiplyMatrices(camera.matrixWorldInverse, matrixWorld);
    for(let i = 0, l = segmentCount; i < l; i++){
        _start4.fromBufferAttribute(instanceStart, i);
        _end4.fromBufferAttribute(instanceEnd, i);
        _start4.w = 1;
        _end4.w = 1;
        _start4.applyMatrix4(_mvMatrix);
        _end4.applyMatrix4(_mvMatrix);
        const isBehindCameraNear = _start4.z > near && _end4.z > near;
        if (isBehindCameraNear) {
            continue;
        }
        if (_start4.z > near) {
            const deltaDist = _start4.z - _end4.z;
            const t = (_start4.z - near) / deltaDist;
            _start4.lerp(_end4, t);
        } else if (_end4.z > near) {
            const deltaDist = _end4.z - _start4.z;
            const t = (_end4.z - near) / deltaDist;
            _end4.lerp(_start4, t);
        }
        _start4.applyMatrix4(projectionMatrix);
        _end4.applyMatrix4(projectionMatrix);
        _start4.multiplyScalar(1 / _start4.w);
        _end4.multiplyScalar(1 / _end4.w);
        _start4.x *= resolution.x / 2;
        _start4.y *= resolution.y / 2;
        _end4.x *= resolution.x / 2;
        _end4.y *= resolution.y / 2;
        _line.start.copy(_start4);
        _line.start.z = 0;
        _line.end.copy(_end4);
        _line.end.z = 0;
        const param = _line.closestPointToPointParameter(_ssOrigin3, true);
        _line.at(param, _closestPoint);
        const zPos = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(_start4.z, _end4.z, param);
        const isInClipSpace = zPos >= -1 && zPos <= 1;
        const isInside = _ssOrigin3.distanceTo(_closestPoint) < _lineWidth * 0.5;
        if (isInClipSpace && isInside) {
            _line.start.fromBufferAttribute(instanceStart, i);
            _line.end.fromBufferAttribute(instanceEnd, i);
            _line.start.applyMatrix4(matrixWorld);
            _line.end.applyMatrix4(matrixWorld);
            const pointOnLine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const point = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            _ray.distanceSqToSegment(_line.start, _line.end, point, pointOnLine);
            intersects.push({
                point,
                pointOnLine,
                distance: _ray.origin.distanceTo(point),
                object: lineSegments,
                face: null,
                faceIndex: i,
                uv: null,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$uv1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UV1"]]: null
            });
        }
    }
}
class LineSegments2 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] {
    constructor(geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegmentsGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegmentsGeometry"](), material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineMaterial"]({
        color: Math.random() * 16777215
    })){
        super(geometry, material);
        this.isLineSegments2 = true;
        this.type = "LineSegments2";
    }
    // for backwards-compatibility, but could be a method of LineSegmentsGeometry...
    computeLineDistances() {
        const geometry = this.geometry;
        const instanceStart = geometry.attributes.instanceStart;
        const instanceEnd = geometry.attributes.instanceEnd;
        const lineDistances = new Float32Array(2 * instanceStart.count);
        for(let i = 0, j = 0, l = instanceStart.count; i < l; i++, j += 2){
            _start.fromBufferAttribute(instanceStart, i);
            _end.fromBufferAttribute(instanceEnd, i);
            lineDistances[j] = j === 0 ? 0 : lineDistances[j - 1];
            lineDistances[j + 1] = lineDistances[j] + _start.distanceTo(_end);
        }
        const instanceDistanceBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedInterleavedBuffer"](lineDistances, 2, 1);
        geometry.setAttribute("instanceDistanceStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceDistanceBuffer, 1, 0));
        geometry.setAttribute("instanceDistanceEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceDistanceBuffer, 1, 1));
        return this;
    }
    raycast(raycaster, intersects) {
        const worldUnits = this.material.worldUnits;
        const camera = raycaster.camera;
        if (camera === null && !worldUnits) {
            console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');
        }
        const threshold = raycaster.params.Line2 !== void 0 ? raycaster.params.Line2.threshold || 0 : 0;
        _ray = raycaster.ray;
        const matrixWorld = this.matrixWorld;
        const geometry = this.geometry;
        const material = this.material;
        _lineWidth = material.linewidth + threshold;
        if (geometry.boundingSphere === null) {
            geometry.computeBoundingSphere();
        }
        _sphere.copy(geometry.boundingSphere).applyMatrix4(matrixWorld);
        let sphereMargin;
        if (worldUnits) {
            sphereMargin = _lineWidth * 0.5;
        } else {
            const distanceToSphere = Math.max(camera.near, _sphere.distanceToPoint(_ray.origin));
            sphereMargin = getWorldSpaceHalfWidth(camera, distanceToSphere, material.resolution);
        }
        _sphere.radius += sphereMargin;
        if (_ray.intersectsSphere(_sphere) === false) {
            return;
        }
        if (geometry.boundingBox === null) {
            geometry.computeBoundingBox();
        }
        _box.copy(geometry.boundingBox).applyMatrix4(matrixWorld);
        let boxMargin;
        if (worldUnits) {
            boxMargin = _lineWidth * 0.5;
        } else {
            const distanceToBox = Math.max(camera.near, _box.distanceToPoint(_ray.origin));
            boxMargin = getWorldSpaceHalfWidth(camera, distanceToBox, material.resolution);
        }
        _box.expandByScalar(boxMargin);
        if (_ray.intersectsBox(_box) === false) {
            return;
        }
        if (worldUnits) {
            raycastWorldUnits(this, intersects);
        } else {
            raycastScreenSpace(this, camera, intersects);
        }
    }
    onBeforeRender(renderer) {
        const uniforms = this.material.uniforms;
        if (uniforms && uniforms.resolution) {
            renderer.getViewport(_viewport);
            this.material.uniforms.resolution.value.set(_viewport.z, _viewport.w);
        }
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/lines/LineSegmentsGeometry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineSegmentsGeometry",
    ()=>LineSegmentsGeometry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const _box = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
const _vector = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
class LineSegmentsGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedBufferGeometry"] {
    constructor(){
        super();
        this.isLineSegmentsGeometry = true;
        this.type = "LineSegmentsGeometry";
        const positions = [
            -1,
            2,
            0,
            1,
            2,
            0,
            -1,
            1,
            0,
            1,
            1,
            0,
            -1,
            0,
            0,
            1,
            0,
            0,
            -1,
            -1,
            0,
            1,
            -1,
            0
        ];
        const uvs = [
            -1,
            2,
            1,
            2,
            -1,
            1,
            1,
            1,
            -1,
            -1,
            1,
            -1,
            -1,
            -2,
            1,
            -2
        ];
        const index = [
            0,
            2,
            1,
            2,
            3,
            1,
            2,
            4,
            3,
            4,
            5,
            3,
            4,
            6,
            5,
            6,
            7,
            5
        ];
        this.setIndex(index);
        this.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](positions, 3));
        this.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](uvs, 2));
    }
    applyMatrix4(matrix) {
        const start = this.attributes.instanceStart;
        const end = this.attributes.instanceEnd;
        if (start !== void 0) {
            start.applyMatrix4(matrix);
            end.applyMatrix4(matrix);
            start.needsUpdate = true;
        }
        if (this.boundingBox !== null) {
            this.computeBoundingBox();
        }
        if (this.boundingSphere !== null) {
            this.computeBoundingSphere();
        }
        return this;
    }
    setPositions(array) {
        let lineSegments;
        if (array instanceof Float32Array) {
            lineSegments = array;
        } else if (Array.isArray(array)) {
            lineSegments = new Float32Array(array);
        }
        const instanceBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedInterleavedBuffer"](lineSegments, 6, 1);
        this.setAttribute("instanceStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceBuffer, 3, 0));
        this.setAttribute("instanceEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceBuffer, 3, 3));
        this.computeBoundingBox();
        this.computeBoundingSphere();
        return this;
    }
    setColors(array, itemSize = 3) {
        let colors;
        if (array instanceof Float32Array) {
            colors = array;
        } else if (Array.isArray(array)) {
            colors = new Float32Array(array);
        }
        const instanceColorBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedInterleavedBuffer"](colors, itemSize * 2, 1);
        this.setAttribute("instanceColorStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceColorBuffer, itemSize, 0));
        this.setAttribute("instanceColorEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceColorBuffer, itemSize, itemSize));
        return this;
    }
    fromWireframeGeometry(geometry) {
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
    fromEdgesGeometry(geometry) {
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
    fromMesh(mesh) {
        this.fromWireframeGeometry(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WireframeGeometry"](mesh.geometry));
        return this;
    }
    fromLineSegments(lineSegments) {
        const geometry = lineSegments.geometry;
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
    computeBoundingBox() {
        if (this.boundingBox === null) {
            this.boundingBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
        }
        const start = this.attributes.instanceStart;
        const end = this.attributes.instanceEnd;
        if (start !== void 0 && end !== void 0) {
            this.boundingBox.setFromBufferAttribute(start);
            _box.setFromBufferAttribute(end);
            this.boundingBox.union(_box);
        }
    }
    computeBoundingSphere() {
        if (this.boundingSphere === null) {
            this.boundingSphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"]();
        }
        if (this.boundingBox === null) {
            this.computeBoundingBox();
        }
        const start = this.attributes.instanceStart;
        const end = this.attributes.instanceEnd;
        if (start !== void 0 && end !== void 0) {
            const center = this.boundingSphere.center;
            this.boundingBox.getCenter(center);
            let maxRadiusSq = 0;
            for(let i = 0, il = start.count; i < il; i++){
                _vector.fromBufferAttribute(start, i);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector));
                _vector.fromBufferAttribute(end, i);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector));
            }
            this.boundingSphere.radius = Math.sqrt(maxRadiusSq);
            if (isNaN(this.boundingSphere.radius)) {
                console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
            }
        }
    }
    toJSON() {}
    applyMatrix(matrix) {
        console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().");
        return this.applyMatrix4(matrix);
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/math/MeshSurfaceSampler.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MeshSurfaceSampler",
    ()=>MeshSurfaceSampler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const _face = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Triangle"]();
const _color = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
class MeshSurfaceSampler {
    constructor(mesh){
        let geometry = mesh.geometry;
        if (geometry.index) {
            console.warn("THREE.MeshSurfaceSampler: Converting geometry to non-indexed BufferGeometry.");
            geometry = geometry.toNonIndexed();
        }
        this.geometry = geometry;
        this.randomFunction = Math.random;
        this.positionAttribute = this.geometry.getAttribute("position");
        this.colorAttribute = this.geometry.getAttribute("color");
        this.weightAttribute = null;
        this.distribution = null;
    }
    setWeightAttribute(name) {
        this.weightAttribute = name ? this.geometry.getAttribute(name) : null;
        return this;
    }
    build() {
        const positionAttribute = this.positionAttribute;
        const weightAttribute = this.weightAttribute;
        const faceWeights = new Float32Array(positionAttribute.count / 3);
        for(let i = 0; i < positionAttribute.count; i += 3){
            let faceWeight = 1;
            if (weightAttribute) {
                faceWeight = weightAttribute.getX(i) + weightAttribute.getX(i + 1) + weightAttribute.getX(i + 2);
            }
            _face.a.fromBufferAttribute(positionAttribute, i);
            _face.b.fromBufferAttribute(positionAttribute, i + 1);
            _face.c.fromBufferAttribute(positionAttribute, i + 2);
            faceWeight *= _face.getArea();
            faceWeights[i / 3] = faceWeight;
        }
        this.distribution = new Float32Array(positionAttribute.count / 3);
        let cumulativeTotal = 0;
        for(let i = 0; i < faceWeights.length; i++){
            cumulativeTotal += faceWeights[i];
            this.distribution[i] = cumulativeTotal;
        }
        return this;
    }
    setRandomGenerator(randomFunction) {
        this.randomFunction = randomFunction;
        return this;
    }
    sample(targetPosition, targetNormal, targetColor) {
        const faceIndex = this.sampleFaceIndex();
        return this.sampleFace(faceIndex, targetPosition, targetNormal, targetColor);
    }
    sampleFaceIndex() {
        const cumulativeTotal = this.distribution[this.distribution.length - 1];
        return this.binarySearch(this.randomFunction() * cumulativeTotal);
    }
    binarySearch(x) {
        const dist = this.distribution;
        let start = 0;
        let end = dist.length - 1;
        let index = -1;
        while(start <= end){
            const mid = Math.ceil((start + end) / 2);
            if (mid === 0 || dist[mid - 1] <= x && dist[mid] > x) {
                index = mid;
                break;
            } else if (x < dist[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return index;
    }
    sampleFace(faceIndex, targetPosition, targetNormal, targetColor) {
        let u = this.randomFunction();
        let v = this.randomFunction();
        if (u + v > 1) {
            u = 1 - u;
            v = 1 - v;
        }
        _face.a.fromBufferAttribute(this.positionAttribute, faceIndex * 3);
        _face.b.fromBufferAttribute(this.positionAttribute, faceIndex * 3 + 1);
        _face.c.fromBufferAttribute(this.positionAttribute, faceIndex * 3 + 2);
        targetPosition.set(0, 0, 0).addScaledVector(_face.a, u).addScaledVector(_face.b, v).addScaledVector(_face.c, 1 - (u + v));
        if (targetNormal !== void 0) {
            _face.getNormal(targetNormal);
        }
        if (targetColor !== void 0 && this.colorAttribute !== void 0) {
            _face.a.fromBufferAttribute(this.colorAttribute, faceIndex * 3);
            _face.b.fromBufferAttribute(this.colorAttribute, faceIndex * 3 + 1);
            _face.c.fromBufferAttribute(this.colorAttribute, faceIndex * 3 + 2);
            _color.set(0, 0, 0).addScaledVector(_face.a, u).addScaledVector(_face.b, v).addScaledVector(_face.c, 1 - (u + v));
            targetColor.r = _color.x;
            targetColor.g = _color.y;
            targetColor.b = _color.z;
        }
        return this;
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/math/SimplexNoise.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SimplexNoise",
    ()=>SimplexNoise
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
class SimplexNoise {
    /**
   * You can pass in a random number generator object if you like.
   * It is assumed to have a random() method.
   */ constructor(r = Math){
        __publicField(this, "grad3", [
            [
                1,
                1,
                0
            ],
            [
                -1,
                1,
                0
            ],
            [
                1,
                -1,
                0
            ],
            [
                -1,
                -1,
                0
            ],
            [
                1,
                0,
                1
            ],
            [
                -1,
                0,
                1
            ],
            [
                1,
                0,
                -1
            ],
            [
                -1,
                0,
                -1
            ],
            [
                0,
                1,
                1
            ],
            [
                0,
                -1,
                1
            ],
            [
                0,
                1,
                -1
            ],
            [
                0,
                -1,
                -1
            ]
        ]);
        __publicField(this, "grad4", [
            [
                0,
                1,
                1,
                1
            ],
            [
                0,
                1,
                1,
                -1
            ],
            [
                0,
                1,
                -1,
                1
            ],
            [
                0,
                1,
                -1,
                -1
            ],
            [
                0,
                -1,
                1,
                1
            ],
            [
                0,
                -1,
                1,
                -1
            ],
            [
                0,
                -1,
                -1,
                1
            ],
            [
                0,
                -1,
                -1,
                -1
            ],
            [
                1,
                0,
                1,
                1
            ],
            [
                1,
                0,
                1,
                -1
            ],
            [
                1,
                0,
                -1,
                1
            ],
            [
                1,
                0,
                -1,
                -1
            ],
            [
                -1,
                0,
                1,
                1
            ],
            [
                -1,
                0,
                1,
                -1
            ],
            [
                -1,
                0,
                -1,
                1
            ],
            [
                -1,
                0,
                -1,
                -1
            ],
            [
                1,
                1,
                0,
                1
            ],
            [
                1,
                1,
                0,
                -1
            ],
            [
                1,
                -1,
                0,
                1
            ],
            [
                1,
                -1,
                0,
                -1
            ],
            [
                -1,
                1,
                0,
                1
            ],
            [
                -1,
                1,
                0,
                -1
            ],
            [
                -1,
                -1,
                0,
                1
            ],
            [
                -1,
                -1,
                0,
                -1
            ],
            [
                1,
                1,
                1,
                0
            ],
            [
                1,
                1,
                -1,
                0
            ],
            [
                1,
                -1,
                1,
                0
            ],
            [
                1,
                -1,
                -1,
                0
            ],
            [
                -1,
                1,
                1,
                0
            ],
            [
                -1,
                1,
                -1,
                0
            ],
            [
                -1,
                -1,
                1,
                0
            ],
            [
                -1,
                -1,
                -1,
                0
            ]
        ]);
        __publicField(this, "p", []);
        // To remove the need for index wrapping, double the permutation table length
        __publicField(this, "perm", []);
        // A lookup table to traverse the simplex around a given point in 4D.
        // Details can be found where this table is used, in the 4D noise method.
        __publicField(this, "simplex", [
            [
                0,
                1,
                2,
                3
            ],
            [
                0,
                1,
                3,
                2
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                2,
                3,
                1
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                1,
                2,
                3,
                0
            ],
            [
                0,
                2,
                1,
                3
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                3,
                1,
                2
            ],
            [
                0,
                3,
                2,
                1
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                1,
                3,
                2,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                1,
                2,
                0,
                3
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                1,
                3,
                0,
                2
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                2,
                3,
                0,
                1
            ],
            [
                2,
                3,
                1,
                0
            ],
            [
                1,
                0,
                2,
                3
            ],
            [
                1,
                0,
                3,
                2
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                2,
                0,
                3,
                1
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                2,
                1,
                3,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                2,
                0,
                1,
                3
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                3,
                0,
                1,
                2
            ],
            [
                3,
                0,
                2,
                1
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                3,
                1,
                2,
                0
            ],
            [
                2,
                1,
                0,
                3
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                3,
                1,
                0,
                2
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                3,
                2,
                0,
                1
            ],
            [
                3,
                2,
                1,
                0
            ]
        ]);
        __publicField(this, "dot", (g, x, y)=>{
            return g[0] * x + g[1] * y;
        });
        __publicField(this, "dot3", (g, x, y, z)=>{
            return g[0] * x + g[1] * y + g[2] * z;
        });
        __publicField(this, "dot4", (g, x, y, z, w)=>{
            return g[0] * x + g[1] * y + g[2] * z + g[3] * w;
        });
        __publicField(this, "noise", (xin, yin)=>{
            let n0;
            let n1;
            let n2;
            const F2 = 0.5 * (Math.sqrt(3) - 1);
            const s = (xin + yin) * F2;
            const i = Math.floor(xin + s);
            const j = Math.floor(yin + s);
            const G2 = (3 - Math.sqrt(3)) / 6;
            const t = (i + j) * G2;
            const X0 = i - t;
            const Y0 = j - t;
            const x0 = xin - X0;
            const y0 = yin - Y0;
            let i1 = 0;
            let j1 = 1;
            if (x0 > y0) {
                i1 = 1;
                j1 = 0;
            }
            const x1 = x0 - i1 + G2;
            const y1 = y0 - j1 + G2;
            const x2 = x0 - 1 + 2 * G2;
            const y2 = y0 - 1 + 2 * G2;
            const ii = i & 255;
            const jj = j & 255;
            const gi0 = this.perm[ii + this.perm[jj]] % 12;
            const gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
            const gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
            let t0 = 0.5 - x0 * x0 - y0 * y0;
            if (t0 < 0) {
                n0 = 0;
            } else {
                t0 *= t0;
                n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);
            }
            let t1 = 0.5 - x1 * x1 - y1 * y1;
            if (t1 < 0) {
                n1 = 0;
            } else {
                t1 *= t1;
                n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
            }
            let t2 = 0.5 - x2 * x2 - y2 * y2;
            if (t2 < 0) {
                n2 = 0;
            } else {
                t2 *= t2;
                n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
            }
            return 70 * (n0 + n1 + n2);
        });
        // 3D simplex noise
        __publicField(this, "noise3d", (xin, yin, zin)=>{
            let n0;
            let n1;
            let n2;
            let n3;
            const F3 = 1 / 3;
            const s = (xin + yin + zin) * F3;
            const i = Math.floor(xin + s);
            const j = Math.floor(yin + s);
            const k = Math.floor(zin + s);
            const G3 = 1 / 6;
            const t = (i + j + k) * G3;
            const X0 = i - t;
            const Y0 = j - t;
            const Z0 = k - t;
            const x0 = xin - X0;
            const y0 = yin - Y0;
            const z0 = zin - Z0;
            let i1;
            let j1;
            let k1;
            let i2;
            let j2;
            let k2;
            if (x0 >= y0) {
                if (y0 >= z0) {
                    i1 = 1;
                    j1 = 0;
                    k1 = 0;
                    i2 = 1;
                    j2 = 1;
                    k2 = 0;
                } else if (x0 >= z0) {
                    i1 = 1;
                    j1 = 0;
                    k1 = 0;
                    i2 = 1;
                    j2 = 0;
                    k2 = 1;
                } else {
                    i1 = 0;
                    j1 = 0;
                    k1 = 1;
                    i2 = 1;
                    j2 = 0;
                    k2 = 1;
                }
            } else {
                if (y0 < z0) {
                    i1 = 0;
                    j1 = 0;
                    k1 = 1;
                    i2 = 0;
                    j2 = 1;
                    k2 = 1;
                } else if (x0 < z0) {
                    i1 = 0;
                    j1 = 1;
                    k1 = 0;
                    i2 = 0;
                    j2 = 1;
                    k2 = 1;
                } else {
                    i1 = 0;
                    j1 = 1;
                    k1 = 0;
                    i2 = 1;
                    j2 = 1;
                    k2 = 0;
                }
            }
            const x1 = x0 - i1 + G3;
            const y1 = y0 - j1 + G3;
            const z1 = z0 - k1 + G3;
            const x2 = x0 - i2 + 2 * G3;
            const y2 = y0 - j2 + 2 * G3;
            const z2 = z0 - k2 + 2 * G3;
            const x3 = x0 - 1 + 3 * G3;
            const y3 = y0 - 1 + 3 * G3;
            const z3 = z0 - 1 + 3 * G3;
            const ii = i & 255;
            const jj = j & 255;
            const kk = k & 255;
            const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
            const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
            const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
            const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;
            let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
            if (t0 < 0) {
                n0 = 0;
            } else {
                t0 *= t0;
                n0 = t0 * t0 * this.dot3(this.grad3[gi0], x0, y0, z0);
            }
            let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
            if (t1 < 0) {
                n1 = 0;
            } else {
                t1 *= t1;
                n1 = t1 * t1 * this.dot3(this.grad3[gi1], x1, y1, z1);
            }
            let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
            if (t2 < 0) {
                n2 = 0;
            } else {
                t2 *= t2;
                n2 = t2 * t2 * this.dot3(this.grad3[gi2], x2, y2, z2);
            }
            let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
            if (t3 < 0) {
                n3 = 0;
            } else {
                t3 *= t3;
                n3 = t3 * t3 * this.dot3(this.grad3[gi3], x3, y3, z3);
            }
            return 32 * (n0 + n1 + n2 + n3);
        });
        // 4D simplex noise
        __publicField(this, "noise4d", (x, y, z, w)=>{
            const grad4 = this.grad4;
            const simplex = this.simplex;
            const perm = this.perm;
            const F4 = (Math.sqrt(5) - 1) / 4;
            const G4 = (5 - Math.sqrt(5)) / 20;
            let n0;
            let n1;
            let n2;
            let n3;
            let n4;
            const s = (x + y + z + w) * F4;
            const i = Math.floor(x + s);
            const j = Math.floor(y + s);
            const k = Math.floor(z + s);
            const l = Math.floor(w + s);
            const t = (i + j + k + l) * G4;
            const X0 = i - t;
            const Y0 = j - t;
            const Z0 = k - t;
            const W0 = l - t;
            const x0 = x - X0;
            const y0 = y - Y0;
            const z0 = z - Z0;
            const w0 = w - W0;
            const c1 = x0 > y0 ? 32 : 0;
            const c2 = x0 > z0 ? 16 : 0;
            const c3 = y0 > z0 ? 8 : 0;
            const c4 = x0 > w0 ? 4 : 0;
            const c5 = y0 > w0 ? 2 : 0;
            const c6 = z0 > w0 ? 1 : 0;
            const c = c1 + c2 + c3 + c4 + c5 + c6;
            let i1;
            let j1;
            let k1;
            let l1;
            let i2;
            let j2;
            let k2;
            let l2;
            let i3;
            let j3;
            let k3;
            let l3;
            i1 = simplex[c][0] >= 3 ? 1 : 0;
            j1 = simplex[c][1] >= 3 ? 1 : 0;
            k1 = simplex[c][2] >= 3 ? 1 : 0;
            l1 = simplex[c][3] >= 3 ? 1 : 0;
            i2 = simplex[c][0] >= 2 ? 1 : 0;
            j2 = simplex[c][1] >= 2 ? 1 : 0;
            k2 = simplex[c][2] >= 2 ? 1 : 0;
            l2 = simplex[c][3] >= 2 ? 1 : 0;
            i3 = simplex[c][0] >= 1 ? 1 : 0;
            j3 = simplex[c][1] >= 1 ? 1 : 0;
            k3 = simplex[c][2] >= 1 ? 1 : 0;
            l3 = simplex[c][3] >= 1 ? 1 : 0;
            const x1 = x0 - i1 + G4;
            const y1 = y0 - j1 + G4;
            const z1 = z0 - k1 + G4;
            const w1 = w0 - l1 + G4;
            const x2 = x0 - i2 + 2 * G4;
            const y2 = y0 - j2 + 2 * G4;
            const z2 = z0 - k2 + 2 * G4;
            const w2 = w0 - l2 + 2 * G4;
            const x3 = x0 - i3 + 3 * G4;
            const y3 = y0 - j3 + 3 * G4;
            const z3 = z0 - k3 + 3 * G4;
            const w3 = w0 - l3 + 3 * G4;
            const x4 = x0 - 1 + 4 * G4;
            const y4 = y0 - 1 + 4 * G4;
            const z4 = z0 - 1 + 4 * G4;
            const w4 = w0 - 1 + 4 * G4;
            const ii = i & 255;
            const jj = j & 255;
            const kk = k & 255;
            const ll = l & 255;
            const gi0 = perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32;
            const gi1 = perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32;
            const gi2 = perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32;
            const gi3 = perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32;
            const gi4 = perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32;
            let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
            if (t0 < 0) {
                n0 = 0;
            } else {
                t0 *= t0;
                n0 = t0 * t0 * this.dot4(grad4[gi0], x0, y0, z0, w0);
            }
            let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
            if (t1 < 0) {
                n1 = 0;
            } else {
                t1 *= t1;
                n1 = t1 * t1 * this.dot4(grad4[gi1], x1, y1, z1, w1);
            }
            let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
            if (t2 < 0) {
                n2 = 0;
            } else {
                t2 *= t2;
                n2 = t2 * t2 * this.dot4(grad4[gi2], x2, y2, z2, w2);
            }
            let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
            if (t3 < 0) {
                n3 = 0;
            } else {
                t3 *= t3;
                n3 = t3 * t3 * this.dot4(grad4[gi3], x3, y3, z3, w3);
            }
            let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
            if (t4 < 0) {
                n4 = 0;
            } else {
                t4 *= t4;
                n4 = t4 * t4 * this.dot4(grad4[gi4], x4, y4, z4, w4);
            }
            return 27 * (n0 + n1 + n2 + n3 + n4);
        });
        for(let i = 0; i < 256; i++){
            this.p[i] = Math.floor(r.random() * 256);
        }
        for(let i = 0; i < 512; i++){
            this.perm[i] = this.p[i & 255];
        }
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/modifiers/CurveModifier.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Flow",
    ()=>Flow,
    "InstancedFlow",
    ()=>InstancedFlow,
    "getUniforms",
    ()=>getUniforms,
    "initSplineTexture",
    ()=>initSplineTexture,
    "modifyShader",
    ()=>modifyShader,
    "updateSplineTexture",
    ()=>updateSplineTexture
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
const CHANNELS = 4;
const TEXTURE_WIDTH = 1024;
const TEXTURE_HEIGHT = 4;
const initSplineTexture = (numberOfCurves = 1)=>{
    const dataArray = new Float32Array(TEXTURE_WIDTH * TEXTURE_HEIGHT * numberOfCurves * CHANNELS);
    const dataTexture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTexture"](dataArray, TEXTURE_WIDTH, TEXTURE_HEIGHT * numberOfCurves, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"]);
    dataTexture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    dataTexture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    dataTexture.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestFilter"];
    dataTexture.needsUpdate = true;
    return dataTexture;
};
const updateSplineTexture = (texture, splineCurve, offset = 0)=>{
    const numberOfPoints = Math.floor(TEXTURE_WIDTH * (TEXTURE_HEIGHT / 4));
    splineCurve.arcLengthDivisions = numberOfPoints / 2;
    splineCurve.updateArcLengths();
    const points = splineCurve.getSpacedPoints(numberOfPoints);
    const frenetFrames = splineCurve.computeFrenetFrames(numberOfPoints, true);
    for(let i = 0; i < numberOfPoints; i++){
        const rowOffset = Math.floor(i / TEXTURE_WIDTH);
        const rowIndex = i % TEXTURE_WIDTH;
        let pt = points[i];
        setTextureValue(texture, rowIndex, pt.x, pt.y, pt.z, 0 + rowOffset + TEXTURE_HEIGHT * offset);
        pt = frenetFrames.tangents[i];
        setTextureValue(texture, rowIndex, pt.x, pt.y, pt.z, 1 + rowOffset + TEXTURE_HEIGHT * offset);
        pt = frenetFrames.normals[i];
        setTextureValue(texture, rowIndex, pt.x, pt.y, pt.z, 2 + rowOffset + TEXTURE_HEIGHT * offset);
        pt = frenetFrames.binormals[i];
        setTextureValue(texture, rowIndex, pt.x, pt.y, pt.z, 3 + rowOffset + TEXTURE_HEIGHT * offset);
    }
    texture.needsUpdate = true;
};
const setTextureValue = (texture, index, x, y, z, o)=>{
    const image = texture.image;
    const { data } = image;
    const i = CHANNELS * TEXTURE_WIDTH * o;
    data[index * CHANNELS + i + 0] = x;
    data[index * CHANNELS + i + 1] = y;
    data[index * CHANNELS + i + 2] = z;
    data[index * CHANNELS + i + 3] = 1;
};
const getUniforms = (splineTexture)=>({
        spineTexture: {
            value: splineTexture
        },
        pathOffset: {
            type: "f",
            value: 0
        },
        // time of path curve
        pathSegment: {
            type: "f",
            value: 1
        },
        // fractional length of path
        spineOffset: {
            type: "f",
            value: 161
        },
        spineLength: {
            type: "f",
            value: 400
        },
        flow: {
            type: "i",
            value: 1
        }
    });
function modifyShader(material, uniforms, numberOfCurves = 1) {
    if (material.__ok) return;
    material.__ok = true;
    material.onBeforeCompile = (shader)=>{
        if (shader.__modified) return;
        shader.__modified = true;
        Object.assign(shader.uniforms, uniforms);
        const vertexShader = /* glsl */ `
		uniform sampler2D spineTexture;
		uniform float pathOffset;
		uniform float pathSegment;
		uniform float spineOffset;
		uniform float spineLength;
		uniform int flow;

		float textureLayers = ${TEXTURE_HEIGHT * numberOfCurves}.;
		float textureStacks = ${TEXTURE_HEIGHT / 4}.;

		${shader.vertexShader}
		`.replace("#include <beginnormal_vertex>", "").replace("#include <defaultnormal_vertex>", "").replace("#include <begin_vertex>", "").replace(/void\s*main\s*\(\)\s*\{/, /* glsl */ `
        void main() {
        #include <beginnormal_vertex>

        vec4 worldPos = modelMatrix * vec4(position, 1.);

        bool bend = flow > 0;
        float xWeight = bend ? 0. : 1.;

        #ifdef USE_INSTANCING
        float pathOffsetFromInstanceMatrix = instanceMatrix[3][2];
        float spineLengthFromInstanceMatrix = instanceMatrix[3][0];
        float spinePortion = bend ? (worldPos.x + spineOffset) / spineLengthFromInstanceMatrix : 0.;
        float mt = (spinePortion * pathSegment + pathOffset + pathOffsetFromInstanceMatrix)*textureStacks;
        #else
        float spinePortion = bend ? (worldPos.x + spineOffset) / spineLength : 0.;
        float mt = (spinePortion * pathSegment + pathOffset)*textureStacks;
        #endif

        mt = mod(mt, textureStacks);
        float rowOffset = floor(mt);

        #ifdef USE_INSTANCING
        rowOffset += instanceMatrix[3][1] * ${TEXTURE_HEIGHT}.;
        #endif

        vec3 spinePos = texture2D(spineTexture, vec2(mt, (0. + rowOffset + 0.5) / textureLayers)).xyz;
        vec3 a =        texture2D(spineTexture, vec2(mt, (1. + rowOffset + 0.5) / textureLayers)).xyz;
        vec3 b =        texture2D(spineTexture, vec2(mt, (2. + rowOffset + 0.5) / textureLayers)).xyz;
        vec3 c =        texture2D(spineTexture, vec2(mt, (3. + rowOffset + 0.5) / textureLayers)).xyz;
        mat3 basis = mat3(a, b, c);

        vec3 transformed = basis
          * vec3(worldPos.x * xWeight, worldPos.y * 1., worldPos.z * 1.)
          + spinePos;

        vec3 transformedNormal = normalMatrix * (basis * objectNormal);
			`).replace("#include <project_vertex>", /* glsl */ `vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
				gl_Position = projectionMatrix * mvPosition;`);
        shader.vertexShader = vertexShader;
    };
}
class Flow {
    /**
   * @param {Mesh} mesh The mesh to clone and modify to bend around the curve
   * @param {number} numberOfCurves The amount of space that should preallocated for additional curves
   */ constructor(mesh, numberOfCurves = 1){
        __publicField(this, "curveArray");
        __publicField(this, "curveLengthArray");
        __publicField(this, "object3D");
        __publicField(this, "splineTexure");
        __publicField(this, "uniforms");
        const obj3D = mesh.clone();
        const splineTexure = initSplineTexture(numberOfCurves);
        const uniforms = getUniforms(splineTexure);
        obj3D.traverse((child)=>{
            if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] || child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"]) {
                child.material = child.material.clone();
                modifyShader(child.material, uniforms, numberOfCurves);
            }
        });
        this.curveArray = new Array(numberOfCurves);
        this.curveLengthArray = new Array(numberOfCurves);
        this.object3D = obj3D;
        this.splineTexure = splineTexure;
        this.uniforms = uniforms;
    }
    updateCurve(index, curve) {
        if (index >= this.curveArray.length) throw Error("Index out of range for Flow");
        const curveLength = curve.getLength();
        this.uniforms.spineLength.value = curveLength;
        this.curveLengthArray[index] = curveLength;
        this.curveArray[index] = curve;
        updateSplineTexture(this.splineTexure, curve, index);
    }
    moveAlongCurve(amount) {
        this.uniforms.pathOffset.value += amount;
    }
}
const matrix = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
class InstancedFlow extends Flow {
    /**
   *
   * @param {number} count The number of instanced elements
   * @param {number} curveCount The number of curves to preallocate for
   * @param {Geometry} geometry The geometry to use for the instanced mesh
   * @param {Material} material The material to use for the instanced mesh
   */ constructor(count, curveCount, geometry, material){
        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](geometry, material, count);
        mesh.instanceMatrix.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
        mesh.frustumCulled = false;
        super(mesh, curveCount);
        __publicField(this, "offsets");
        __publicField(this, "whichCurve");
        this.offsets = new Array(count).fill(0);
        this.whichCurve = new Array(count).fill(0);
    }
    /**
   * The extra information about which curve and curve position is stored in the translation components of the matrix for the instanced objects
   * This writes that information to the matrix and marks it as needing update.
   *
   * @param {number} index of the instanced element to update
   */ writeChanges(index) {
        matrix.makeTranslation(this.curveLengthArray[this.whichCurve[index]], this.whichCurve[index], this.offsets[index]);
        this.object3D.setMatrixAt(index, matrix);
        this.object3D.instanceMatrix.needsUpdate = true;
    }
    /**
   * Move an individual element along the curve by a specific amount
   *
   * @param {number} index Which element to update
   * @param {number} offset Move by how much
   */ moveIndividualAlongCurve(index, offset) {
        this.offsets[index] += offset;
        this.writeChanges(index);
    }
    /**
   * Select which curve to use for an element
   *
   * @param {number} index the index of the instanced element to update
   * @param {number} curveNo the index of the curve it should use
   */ setCurve(index, curveNo) {
        if (isNaN(curveNo)) throw Error("curve index being set is Not a Number (NaN)");
        this.whichCurve[index] = curveNo;
        this.writeChanges(index);
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/objects/GroundProjectedEnv.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GroundProjectedEnv",
    ()=>GroundProjectedEnv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)");
;
;
const isCubeTexture = (def)=>def && def.isCubeTexture;
class GroundProjectedEnv extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] {
    constructor(texture, options){
        var _a, _b;
        const isCubeMap = isCubeTexture(texture);
        const w = (_b = isCubeMap ? (_a = texture.image[0]) == null ? void 0 : _a.width : texture.image.width) != null ? _b : 1024;
        const cubeSize = w / 4;
        const _lodMax = Math.floor(Math.log2(cubeSize));
        const _cubeSize = Math.pow(2, _lodMax);
        const width = 3 * Math.max(_cubeSize, 16 * 7);
        const height = 4 * _cubeSize;
        const defines = [
            isCubeMap ? "#define ENVMAP_TYPE_CUBE" : "",
            `#define CUBEUV_TEXEL_WIDTH ${1 / width}`,
            `#define CUBEUV_TEXEL_HEIGHT ${1 / height}`,
            `#define CUBEUV_MAX_MIP ${_lodMax}.0`
        ];
        const vertexShader = /* glsl */ `
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `;
        const fragmentShader = defines.join("\n") + /* glsl */ `
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"] >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
        }
        `;
        const uniforms = {
            map: {
                value: texture
            },
            height: {
                value: (options == null ? void 0 : options.height) || 15
            },
            radius: {
                value: (options == null ? void 0 : options.radius) || 100
            }
        };
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](1, 16);
        const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
            uniforms,
            fragmentShader,
            vertexShader,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        super(geometry, material);
    }
    set radius(radius) {
        this.material.uniforms.radius.value = radius;
    }
    get radius() {
        return this.material.uniforms.radius.value;
    }
    set height(height) {
        this.material.uniforms.height.value = height;
    }
    get height() {
        return this.material.uniforms.height.value;
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/objects/MarchingCubes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarchingCubes",
    ()=>MarchingCubes,
    "edgeTable",
    ()=>edgeTable,
    "triTable",
    ()=>triTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class MarchingCubes extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] {
    constructor(resolution, material, enableUvs = false, enableColors = false, maxPolyCount = 1e4){
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        super(geometry, material);
        this.isMarchingCubes = true;
        const scope = this;
        const vlist = new Float32Array(12 * 3);
        const nlist = new Float32Array(12 * 3);
        const clist = new Float32Array(12 * 3);
        this.enableUvs = enableUvs;
        this.enableColors = enableColors;
        this.init = function(resolution2) {
            this.resolution = resolution2;
            this.isolation = 80;
            this.size = resolution2;
            this.size2 = this.size * this.size;
            this.size3 = this.size2 * this.size;
            this.halfsize = this.size / 2;
            this.delta = 2 / this.size;
            this.yd = this.size;
            this.zd = this.size2;
            this.field = new Float32Array(this.size3);
            this.normal_cache = new Float32Array(this.size3 * 3);
            this.palette = new Float32Array(this.size3 * 3);
            this.count = 0;
            const maxVertexCount = maxPolyCount * 3;
            this.positionArray = new Float32Array(maxVertexCount * 3);
            const positionAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](this.positionArray, 3);
            positionAttribute.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
            geometry.setAttribute("position", positionAttribute);
            this.normalArray = new Float32Array(maxVertexCount * 3);
            const normalAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](this.normalArray, 3);
            normalAttribute.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
            geometry.setAttribute("normal", normalAttribute);
            if (this.enableUvs) {
                this.uvArray = new Float32Array(maxVertexCount * 2);
                const uvAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](this.uvArray, 2);
                uvAttribute.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
                geometry.setAttribute("uv", uvAttribute);
            }
            if (this.enableColors) {
                this.colorArray = new Float32Array(maxVertexCount * 3);
                const colorAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](this.colorArray, 3);
                colorAttribute.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
                geometry.setAttribute("color", colorAttribute);
            }
            geometry.boundingSphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](), 1);
        };
        function lerp(a, b, t) {
            return a + (b - a) * t;
        }
        function VIntX(q, offset, isol, x, y, z, valp1, valp2, c_offset1, c_offset2) {
            const mu = (isol - valp1) / (valp2 - valp1), nc = scope.normal_cache;
            vlist[offset + 0] = x + mu * scope.delta;
            vlist[offset + 1] = y;
            vlist[offset + 2] = z;
            nlist[offset + 0] = lerp(nc[q + 0], nc[q + 3], mu);
            nlist[offset + 1] = lerp(nc[q + 1], nc[q + 4], mu);
            nlist[offset + 2] = lerp(nc[q + 2], nc[q + 5], mu);
            clist[offset + 0] = lerp(scope.palette[c_offset1 * 3 + 0], scope.palette[c_offset2 * 3 + 0], mu);
            clist[offset + 1] = lerp(scope.palette[c_offset1 * 3 + 1], scope.palette[c_offset2 * 3 + 1], mu);
            clist[offset + 2] = lerp(scope.palette[c_offset1 * 3 + 2], scope.palette[c_offset2 * 3 + 2], mu);
        }
        function VIntY(q, offset, isol, x, y, z, valp1, valp2, c_offset1, c_offset2) {
            const mu = (isol - valp1) / (valp2 - valp1), nc = scope.normal_cache;
            vlist[offset + 0] = x;
            vlist[offset + 1] = y + mu * scope.delta;
            vlist[offset + 2] = z;
            const q2 = q + scope.yd * 3;
            nlist[offset + 0] = lerp(nc[q + 0], nc[q2 + 0], mu);
            nlist[offset + 1] = lerp(nc[q + 1], nc[q2 + 1], mu);
            nlist[offset + 2] = lerp(nc[q + 2], nc[q2 + 2], mu);
            clist[offset + 0] = lerp(scope.palette[c_offset1 * 3 + 0], scope.palette[c_offset2 * 3 + 0], mu);
            clist[offset + 1] = lerp(scope.palette[c_offset1 * 3 + 1], scope.palette[c_offset2 * 3 + 1], mu);
            clist[offset + 2] = lerp(scope.palette[c_offset1 * 3 + 2], scope.palette[c_offset2 * 3 + 2], mu);
        }
        function VIntZ(q, offset, isol, x, y, z, valp1, valp2, c_offset1, c_offset2) {
            const mu = (isol - valp1) / (valp2 - valp1), nc = scope.normal_cache;
            vlist[offset + 0] = x;
            vlist[offset + 1] = y;
            vlist[offset + 2] = z + mu * scope.delta;
            const q2 = q + scope.zd * 3;
            nlist[offset + 0] = lerp(nc[q + 0], nc[q2 + 0], mu);
            nlist[offset + 1] = lerp(nc[q + 1], nc[q2 + 1], mu);
            nlist[offset + 2] = lerp(nc[q + 2], nc[q2 + 2], mu);
            clist[offset + 0] = lerp(scope.palette[c_offset1 * 3 + 0], scope.palette[c_offset2 * 3 + 0], mu);
            clist[offset + 1] = lerp(scope.palette[c_offset1 * 3 + 1], scope.palette[c_offset2 * 3 + 1], mu);
            clist[offset + 2] = lerp(scope.palette[c_offset1 * 3 + 2], scope.palette[c_offset2 * 3 + 2], mu);
        }
        function compNorm(q) {
            const q3 = q * 3;
            if (scope.normal_cache[q3] === 0) {
                scope.normal_cache[q3 + 0] = scope.field[q - 1] - scope.field[q + 1];
                scope.normal_cache[q3 + 1] = scope.field[q - scope.yd] - scope.field[q + scope.yd];
                scope.normal_cache[q3 + 2] = scope.field[q - scope.zd] - scope.field[q + scope.zd];
            }
        }
        function polygonize(fx, fy, fz, q, isol) {
            const q1 = q + 1, qy = q + scope.yd, qz = q + scope.zd, q1y = q1 + scope.yd, q1z = q1 + scope.zd, qyz = q + scope.yd + scope.zd, q1yz = q1 + scope.yd + scope.zd;
            let cubeindex = 0;
            const field0 = scope.field[q], field1 = scope.field[q1], field2 = scope.field[qy], field3 = scope.field[q1y], field4 = scope.field[qz], field5 = scope.field[q1z], field6 = scope.field[qyz], field7 = scope.field[q1yz];
            if (field0 < isol) cubeindex |= 1;
            if (field1 < isol) cubeindex |= 2;
            if (field2 < isol) cubeindex |= 8;
            if (field3 < isol) cubeindex |= 4;
            if (field4 < isol) cubeindex |= 16;
            if (field5 < isol) cubeindex |= 32;
            if (field6 < isol) cubeindex |= 128;
            if (field7 < isol) cubeindex |= 64;
            const bits = edgeTable[cubeindex];
            if (bits === 0) return 0;
            const d = scope.delta, fx2 = fx + d, fy2 = fy + d, fz2 = fz + d;
            if (bits & 1) {
                compNorm(q);
                compNorm(q1);
                VIntX(q * 3, 0, isol, fx, fy, fz, field0, field1, q, q1);
            }
            if (bits & 2) {
                compNorm(q1);
                compNorm(q1y);
                VIntY(q1 * 3, 3, isol, fx2, fy, fz, field1, field3, q1, q1y);
            }
            if (bits & 4) {
                compNorm(qy);
                compNorm(q1y);
                VIntX(qy * 3, 6, isol, fx, fy2, fz, field2, field3, qy, q1y);
            }
            if (bits & 8) {
                compNorm(q);
                compNorm(qy);
                VIntY(q * 3, 9, isol, fx, fy, fz, field0, field2, q, qy);
            }
            if (bits & 16) {
                compNorm(qz);
                compNorm(q1z);
                VIntX(qz * 3, 12, isol, fx, fy, fz2, field4, field5, qz, q1z);
            }
            if (bits & 32) {
                compNorm(q1z);
                compNorm(q1yz);
                VIntY(q1z * 3, 15, isol, fx2, fy, fz2, field5, field7, q1z, q1yz);
            }
            if (bits & 64) {
                compNorm(qyz);
                compNorm(q1yz);
                VIntX(qyz * 3, 18, isol, fx, fy2, fz2, field6, field7, qyz, q1yz);
            }
            if (bits & 128) {
                compNorm(qz);
                compNorm(qyz);
                VIntY(qz * 3, 21, isol, fx, fy, fz2, field4, field6, qz, qyz);
            }
            if (bits & 256) {
                compNorm(q);
                compNorm(qz);
                VIntZ(q * 3, 24, isol, fx, fy, fz, field0, field4, q, qz);
            }
            if (bits & 512) {
                compNorm(q1);
                compNorm(q1z);
                VIntZ(q1 * 3, 27, isol, fx2, fy, fz, field1, field5, q1, q1z);
            }
            if (bits & 1024) {
                compNorm(q1y);
                compNorm(q1yz);
                VIntZ(q1y * 3, 30, isol, fx2, fy2, fz, field3, field7, q1y, q1yz);
            }
            if (bits & 2048) {
                compNorm(qy);
                compNorm(qyz);
                VIntZ(qy * 3, 33, isol, fx, fy2, fz, field2, field6, qy, qyz);
            }
            cubeindex <<= 4;
            let o1, o2, o3, numtris = 0, i = 0;
            while(triTable[cubeindex + i] != -1){
                o1 = cubeindex + i;
                o2 = o1 + 1;
                o3 = o1 + 2;
                posnormtriv(vlist, nlist, clist, 3 * triTable[o1], 3 * triTable[o2], 3 * triTable[o3]);
                i += 3;
                numtris++;
            }
            return numtris;
        }
        function posnormtriv(pos, norm, colors, o1, o2, o3) {
            const c = scope.count * 3;
            scope.positionArray[c + 0] = pos[o1];
            scope.positionArray[c + 1] = pos[o1 + 1];
            scope.positionArray[c + 2] = pos[o1 + 2];
            scope.positionArray[c + 3] = pos[o2];
            scope.positionArray[c + 4] = pos[o2 + 1];
            scope.positionArray[c + 5] = pos[o2 + 2];
            scope.positionArray[c + 6] = pos[o3];
            scope.positionArray[c + 7] = pos[o3 + 1];
            scope.positionArray[c + 8] = pos[o3 + 2];
            if (scope.material.flatShading === true) {
                const nx = (norm[o1 + 0] + norm[o2 + 0] + norm[o3 + 0]) / 3;
                const ny = (norm[o1 + 1] + norm[o2 + 1] + norm[o3 + 1]) / 3;
                const nz = (norm[o1 + 2] + norm[o2 + 2] + norm[o3 + 2]) / 3;
                scope.normalArray[c + 0] = nx;
                scope.normalArray[c + 1] = ny;
                scope.normalArray[c + 2] = nz;
                scope.normalArray[c + 3] = nx;
                scope.normalArray[c + 4] = ny;
                scope.normalArray[c + 5] = nz;
                scope.normalArray[c + 6] = nx;
                scope.normalArray[c + 7] = ny;
                scope.normalArray[c + 8] = nz;
            } else {
                scope.normalArray[c + 0] = norm[o1 + 0];
                scope.normalArray[c + 1] = norm[o1 + 1];
                scope.normalArray[c + 2] = norm[o1 + 2];
                scope.normalArray[c + 3] = norm[o2 + 0];
                scope.normalArray[c + 4] = norm[o2 + 1];
                scope.normalArray[c + 5] = norm[o2 + 2];
                scope.normalArray[c + 6] = norm[o3 + 0];
                scope.normalArray[c + 7] = norm[o3 + 1];
                scope.normalArray[c + 8] = norm[o3 + 2];
            }
            if (scope.enableUvs) {
                const d = scope.count * 2;
                scope.uvArray[d + 0] = pos[o1 + 0];
                scope.uvArray[d + 1] = pos[o1 + 2];
                scope.uvArray[d + 2] = pos[o2 + 0];
                scope.uvArray[d + 3] = pos[o2 + 2];
                scope.uvArray[d + 4] = pos[o3 + 0];
                scope.uvArray[d + 5] = pos[o3 + 2];
            }
            if (scope.enableColors) {
                scope.colorArray[c + 0] = colors[o1 + 0];
                scope.colorArray[c + 1] = colors[o1 + 1];
                scope.colorArray[c + 2] = colors[o1 + 2];
                scope.colorArray[c + 3] = colors[o2 + 0];
                scope.colorArray[c + 4] = colors[o2 + 1];
                scope.colorArray[c + 5] = colors[o2 + 2];
                scope.colorArray[c + 6] = colors[o3 + 0];
                scope.colorArray[c + 7] = colors[o3 + 1];
                scope.colorArray[c + 8] = colors[o3 + 2];
            }
            scope.count += 3;
        }
        this.addBall = function(ballx, bally, ballz, strength, subtract, colors) {
            const sign = Math.sign(strength);
            strength = Math.abs(strength);
            const userDefineColor = !(colors === void 0 || colors === null);
            let ballColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](ballx, bally, ballz);
            if (userDefineColor) {
                try {
                    ballColor = colors instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"] ? colors : Array.isArray(colors) ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](Math.min(Math.abs(colors[0]), 1), Math.min(Math.abs(colors[1]), 1), Math.min(Math.abs(colors[2]), 1)) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](colors);
                } catch (err) {
                    ballColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](ballx, bally, ballz);
                }
            }
            const radius = this.size * Math.sqrt(strength / subtract), zs = ballz * this.size, ys = bally * this.size, xs = ballx * this.size;
            let min_z = Math.floor(zs - radius);
            if (min_z < 1) min_z = 1;
            let max_z = Math.floor(zs + radius);
            if (max_z > this.size - 1) max_z = this.size - 1;
            let min_y = Math.floor(ys - radius);
            if (min_y < 1) min_y = 1;
            let max_y = Math.floor(ys + radius);
            if (max_y > this.size - 1) max_y = this.size - 1;
            let min_x = Math.floor(xs - radius);
            if (min_x < 1) min_x = 1;
            let max_x = Math.floor(xs + radius);
            if (max_x > this.size - 1) max_x = this.size - 1;
            let x, y, z, y_offset, z_offset, fx, fy, fz, fz2, fy2, val;
            for(z = min_z; z < max_z; z++){
                z_offset = this.size2 * z;
                fz = z / this.size - ballz;
                fz2 = fz * fz;
                for(y = min_y; y < max_y; y++){
                    y_offset = z_offset + this.size * y;
                    fy = y / this.size - bally;
                    fy2 = fy * fy;
                    for(x = min_x; x < max_x; x++){
                        fx = x / this.size - ballx;
                        val = strength / (1e-6 + fx * fx + fy2 + fz2) - subtract;
                        if (val > 0) {
                            this.field[y_offset + x] += val * sign;
                            const ratio = Math.sqrt((x - xs) * (x - xs) + (y - ys) * (y - ys) + (z - zs) * (z - zs)) / radius;
                            const contrib = 1 - ratio * ratio * ratio * (ratio * (ratio * 6 - 15) + 10);
                            this.palette[(y_offset + x) * 3 + 0] += ballColor.r * contrib;
                            this.palette[(y_offset + x) * 3 + 1] += ballColor.g * contrib;
                            this.palette[(y_offset + x) * 3 + 2] += ballColor.b * contrib;
                        }
                    }
                }
            }
        };
        this.addPlaneX = function(strength, subtract) {
            const size = this.size, yd = this.yd, zd = this.zd, field = this.field;
            let x, y, z, xx, val, xdiv, cxy, dist = size * Math.sqrt(strength / subtract);
            if (dist > size) dist = size;
            for(x = 0; x < dist; x++){
                xdiv = x / size;
                xx = xdiv * xdiv;
                val = strength / (1e-4 + xx) - subtract;
                if (val > 0) {
                    for(y = 0; y < size; y++){
                        cxy = x + y * yd;
                        for(z = 0; z < size; z++){
                            field[zd * z + cxy] += val;
                        }
                    }
                }
            }
        };
        this.addPlaneY = function(strength, subtract) {
            const size = this.size, yd = this.yd, zd = this.zd, field = this.field;
            let x, y, z, yy, val, ydiv, cy, cxy, dist = size * Math.sqrt(strength / subtract);
            if (dist > size) dist = size;
            for(y = 0; y < dist; y++){
                ydiv = y / size;
                yy = ydiv * ydiv;
                val = strength / (1e-4 + yy) - subtract;
                if (val > 0) {
                    cy = y * yd;
                    for(x = 0; x < size; x++){
                        cxy = cy + x;
                        for(z = 0; z < size; z++)field[zd * z + cxy] += val;
                    }
                }
            }
        };
        this.addPlaneZ = function(strength, subtract) {
            const size = this.size, yd = this.yd, zd = this.zd, field = this.field;
            let x, y, z, zz, val, zdiv, cz, cyz, dist = size * Math.sqrt(strength / subtract);
            if (dist > size) dist = size;
            for(z = 0; z < dist; z++){
                zdiv = z / size;
                zz = zdiv * zdiv;
                val = strength / (1e-4 + zz) - subtract;
                if (val > 0) {
                    cz = zd * z;
                    for(y = 0; y < size; y++){
                        cyz = cz + y * yd;
                        for(x = 0; x < size; x++)field[cyz + x] += val;
                    }
                }
            }
        };
        this.setCell = function(x, y, z, value) {
            const index = this.size2 * z + this.size * y + x;
            this.field[index] = value;
        };
        this.getCell = function(x, y, z) {
            const index = this.size2 * z + this.size * y + x;
            return this.field[index];
        };
        this.blur = function(intensity = 1) {
            const field = this.field;
            const fieldCopy = field.slice();
            const size = this.size;
            const size2 = this.size2;
            for(let x = 0; x < size; x++){
                for(let y = 0; y < size; y++){
                    for(let z = 0; z < size; z++){
                        const index = size2 * z + size * y + x;
                        let val = fieldCopy[index];
                        let count = 1;
                        for(let x2 = -1; x2 <= 1; x2 += 2){
                            const x3 = x2 + x;
                            if (x3 < 0 || x3 >= size) continue;
                            for(let y2 = -1; y2 <= 1; y2 += 2){
                                const y3 = y2 + y;
                                if (y3 < 0 || y3 >= size) continue;
                                for(let z2 = -1; z2 <= 1; z2 += 2){
                                    const z3 = z2 + z;
                                    if (z3 < 0 || z3 >= size) continue;
                                    const index2 = size2 * z3 + size * y3 + x3;
                                    const val2 = fieldCopy[index2];
                                    count++;
                                    val += intensity * (val2 - val) / count;
                                }
                            }
                        }
                        field[index] = val;
                    }
                }
            }
        };
        this.reset = function() {
            for(let i = 0; i < this.size3; i++){
                this.normal_cache[i * 3] = 0;
                this.field[i] = 0;
                this.palette[i * 3] = this.palette[i * 3 + 1] = this.palette[i * 3 + 2] = 0;
            }
        };
        this.update = function() {
            this.count = 0;
            const smin2 = this.size - 2;
            for(let z = 1; z < smin2; z++){
                const z_offset = this.size2 * z;
                const fz = (z - this.halfsize) / this.halfsize;
                for(let y = 1; y < smin2; y++){
                    const y_offset = z_offset + this.size * y;
                    const fy = (y - this.halfsize) / this.halfsize;
                    for(let x = 1; x < smin2; x++){
                        const fx = (x - this.halfsize) / this.halfsize;
                        const q = y_offset + x;
                        polygonize(fx, fy, fz, q, this.isolation);
                    }
                }
            }
            this.geometry.setDrawRange(0, this.count);
            geometry.getAttribute("position").needsUpdate = true;
            geometry.getAttribute("normal").needsUpdate = true;
            if (this.enableUvs) geometry.getAttribute("uv").needsUpdate = true;
            if (this.enableColors) geometry.getAttribute("color").needsUpdate = true;
            if (this.count / 3 > maxPolyCount) console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.");
        };
        this.init(resolution);
    }
}
const edgeTable = new Int32Array([
    0,
    265,
    515,
    778,
    1030,
    1295,
    1541,
    1804,
    2060,
    2309,
    2575,
    2822,
    3082,
    3331,
    3593,
    3840,
    400,
    153,
    915,
    666,
    1430,
    1183,
    1941,
    1692,
    2460,
    2197,
    2975,
    2710,
    3482,
    3219,
    3993,
    3728,
    560,
    825,
    51,
    314,
    1590,
    1855,
    1077,
    1340,
    2620,
    2869,
    2111,
    2358,
    3642,
    3891,
    3129,
    3376,
    928,
    681,
    419,
    170,
    1958,
    1711,
    1445,
    1196,
    2988,
    2725,
    2479,
    2214,
    4010,
    3747,
    3497,
    3232,
    1120,
    1385,
    1635,
    1898,
    102,
    367,
    613,
    876,
    3180,
    3429,
    3695,
    3942,
    2154,
    2403,
    2665,
    2912,
    1520,
    1273,
    2035,
    1786,
    502,
    255,
    1013,
    764,
    3580,
    3317,
    4095,
    3830,
    2554,
    2291,
    3065,
    2800,
    1616,
    1881,
    1107,
    1370,
    598,
    863,
    85,
    348,
    3676,
    3925,
    3167,
    3414,
    2650,
    2899,
    2137,
    2384,
    1984,
    1737,
    1475,
    1226,
    966,
    719,
    453,
    204,
    4044,
    3781,
    3535,
    3270,
    3018,
    2755,
    2505,
    2240,
    2240,
    2505,
    2755,
    3018,
    3270,
    3535,
    3781,
    4044,
    204,
    453,
    719,
    966,
    1226,
    1475,
    1737,
    1984,
    2384,
    2137,
    2899,
    2650,
    3414,
    3167,
    3925,
    3676,
    348,
    85,
    863,
    598,
    1370,
    1107,
    1881,
    1616,
    2800,
    3065,
    2291,
    2554,
    3830,
    4095,
    3317,
    3580,
    764,
    1013,
    255,
    502,
    1786,
    2035,
    1273,
    1520,
    2912,
    2665,
    2403,
    2154,
    3942,
    3695,
    3429,
    3180,
    876,
    613,
    367,
    102,
    1898,
    1635,
    1385,
    1120,
    3232,
    3497,
    3747,
    4010,
    2214,
    2479,
    2725,
    2988,
    1196,
    1445,
    1711,
    1958,
    170,
    419,
    681,
    928,
    3376,
    3129,
    3891,
    3642,
    2358,
    2111,
    2869,
    2620,
    1340,
    1077,
    1855,
    1590,
    314,
    51,
    825,
    560,
    3728,
    3993,
    3219,
    3482,
    2710,
    2975,
    2197,
    2460,
    1692,
    1941,
    1183,
    1430,
    666,
    915,
    153,
    400,
    3840,
    3593,
    3331,
    3082,
    2822,
    2575,
    2309,
    2060,
    1804,
    1541,
    1295,
    1030,
    778,
    515,
    265,
    0
]);
const triTable = new Int32Array([
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    8,
    3,
    9,
    8,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    1,
    2,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    2,
    10,
    0,
    2,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    8,
    3,
    2,
    10,
    8,
    10,
    9,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    11,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    11,
    2,
    8,
    11,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    9,
    0,
    2,
    3,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    11,
    2,
    1,
    9,
    11,
    9,
    8,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    10,
    1,
    11,
    10,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    10,
    1,
    0,
    8,
    10,
    8,
    11,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    9,
    0,
    3,
    11,
    9,
    11,
    10,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    8,
    10,
    10,
    8,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    7,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    3,
    0,
    7,
    3,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    8,
    4,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    1,
    9,
    4,
    7,
    1,
    7,
    3,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    8,
    4,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    4,
    7,
    3,
    0,
    4,
    1,
    2,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    2,
    10,
    9,
    0,
    2,
    8,
    4,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    10,
    9,
    2,
    9,
    7,
    2,
    7,
    3,
    7,
    9,
    4,
    -1,
    -1,
    -1,
    -1,
    8,
    4,
    7,
    3,
    11,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    4,
    7,
    11,
    2,
    4,
    2,
    0,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    0,
    1,
    8,
    4,
    7,
    2,
    3,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    7,
    11,
    9,
    4,
    11,
    9,
    11,
    2,
    9,
    2,
    1,
    -1,
    -1,
    -1,
    -1,
    3,
    10,
    1,
    3,
    11,
    10,
    7,
    8,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    11,
    10,
    1,
    4,
    11,
    1,
    0,
    4,
    7,
    11,
    4,
    -1,
    -1,
    -1,
    -1,
    4,
    7,
    8,
    9,
    0,
    11,
    9,
    11,
    10,
    11,
    0,
    3,
    -1,
    -1,
    -1,
    -1,
    4,
    7,
    11,
    4,
    11,
    9,
    9,
    11,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    4,
    0,
    8,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    5,
    4,
    1,
    5,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    5,
    4,
    8,
    3,
    5,
    3,
    1,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    9,
    5,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    0,
    8,
    1,
    2,
    10,
    4,
    9,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    2,
    10,
    5,
    4,
    2,
    4,
    0,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    10,
    5,
    3,
    2,
    5,
    3,
    5,
    4,
    3,
    4,
    8,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    4,
    2,
    3,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    11,
    2,
    0,
    8,
    11,
    4,
    9,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    5,
    4,
    0,
    1,
    5,
    2,
    3,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    1,
    5,
    2,
    5,
    8,
    2,
    8,
    11,
    4,
    8,
    5,
    -1,
    -1,
    -1,
    -1,
    10,
    3,
    11,
    10,
    1,
    3,
    9,
    5,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    9,
    5,
    0,
    8,
    1,
    8,
    10,
    1,
    8,
    11,
    10,
    -1,
    -1,
    -1,
    -1,
    5,
    4,
    0,
    5,
    0,
    11,
    5,
    11,
    10,
    11,
    0,
    3,
    -1,
    -1,
    -1,
    -1,
    5,
    4,
    8,
    5,
    8,
    10,
    10,
    8,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    7,
    8,
    5,
    7,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    3,
    0,
    9,
    5,
    3,
    5,
    7,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    7,
    8,
    0,
    1,
    7,
    1,
    5,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    5,
    3,
    3,
    5,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    7,
    8,
    9,
    5,
    7,
    10,
    1,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    1,
    2,
    9,
    5,
    0,
    5,
    3,
    0,
    5,
    7,
    3,
    -1,
    -1,
    -1,
    -1,
    8,
    0,
    2,
    8,
    2,
    5,
    8,
    5,
    7,
    10,
    5,
    2,
    -1,
    -1,
    -1,
    -1,
    2,
    10,
    5,
    2,
    5,
    3,
    3,
    5,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    9,
    5,
    7,
    8,
    9,
    3,
    11,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    7,
    9,
    7,
    2,
    9,
    2,
    0,
    2,
    7,
    11,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    11,
    0,
    1,
    8,
    1,
    7,
    8,
    1,
    5,
    7,
    -1,
    -1,
    -1,
    -1,
    11,
    2,
    1,
    11,
    1,
    7,
    7,
    1,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    8,
    8,
    5,
    7,
    10,
    1,
    3,
    10,
    3,
    11,
    -1,
    -1,
    -1,
    -1,
    5,
    7,
    0,
    5,
    0,
    9,
    7,
    11,
    0,
    1,
    0,
    10,
    11,
    10,
    0,
    -1,
    11,
    10,
    0,
    11,
    0,
    3,
    10,
    5,
    0,
    8,
    0,
    7,
    5,
    7,
    0,
    -1,
    11,
    10,
    5,
    7,
    11,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    6,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    5,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    0,
    1,
    5,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    8,
    3,
    1,
    9,
    8,
    5,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    6,
    5,
    2,
    6,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    6,
    5,
    1,
    2,
    6,
    3,
    0,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    6,
    5,
    9,
    0,
    6,
    0,
    2,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    9,
    8,
    5,
    8,
    2,
    5,
    2,
    6,
    3,
    2,
    8,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    11,
    10,
    6,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    0,
    8,
    11,
    2,
    0,
    10,
    6,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    2,
    3,
    11,
    5,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    10,
    6,
    1,
    9,
    2,
    9,
    11,
    2,
    9,
    8,
    11,
    -1,
    -1,
    -1,
    -1,
    6,
    3,
    11,
    6,
    5,
    3,
    5,
    1,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    11,
    0,
    11,
    5,
    0,
    5,
    1,
    5,
    11,
    6,
    -1,
    -1,
    -1,
    -1,
    3,
    11,
    6,
    0,
    3,
    6,
    0,
    6,
    5,
    0,
    5,
    9,
    -1,
    -1,
    -1,
    -1,
    6,
    5,
    9,
    6,
    9,
    11,
    11,
    9,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    10,
    6,
    4,
    7,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    3,
    0,
    4,
    7,
    3,
    6,
    5,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    9,
    0,
    5,
    10,
    6,
    8,
    4,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    6,
    5,
    1,
    9,
    7,
    1,
    7,
    3,
    7,
    9,
    4,
    -1,
    -1,
    -1,
    -1,
    6,
    1,
    2,
    6,
    5,
    1,
    4,
    7,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    5,
    5,
    2,
    6,
    3,
    0,
    4,
    3,
    4,
    7,
    -1,
    -1,
    -1,
    -1,
    8,
    4,
    7,
    9,
    0,
    5,
    0,
    6,
    5,
    0,
    2,
    6,
    -1,
    -1,
    -1,
    -1,
    7,
    3,
    9,
    7,
    9,
    4,
    3,
    2,
    9,
    5,
    9,
    6,
    2,
    6,
    9,
    -1,
    3,
    11,
    2,
    7,
    8,
    4,
    10,
    6,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    10,
    6,
    4,
    7,
    2,
    4,
    2,
    0,
    2,
    7,
    11,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    4,
    7,
    8,
    2,
    3,
    11,
    5,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    9,
    2,
    1,
    9,
    11,
    2,
    9,
    4,
    11,
    7,
    11,
    4,
    5,
    10,
    6,
    -1,
    8,
    4,
    7,
    3,
    11,
    5,
    3,
    5,
    1,
    5,
    11,
    6,
    -1,
    -1,
    -1,
    -1,
    5,
    1,
    11,
    5,
    11,
    6,
    1,
    0,
    11,
    7,
    11,
    4,
    0,
    4,
    11,
    -1,
    0,
    5,
    9,
    0,
    6,
    5,
    0,
    3,
    6,
    11,
    6,
    3,
    8,
    4,
    7,
    -1,
    6,
    5,
    9,
    6,
    9,
    11,
    4,
    7,
    9,
    7,
    11,
    9,
    -1,
    -1,
    -1,
    -1,
    10,
    4,
    9,
    6,
    4,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    10,
    6,
    4,
    9,
    10,
    0,
    8,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    0,
    1,
    10,
    6,
    0,
    6,
    4,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    3,
    1,
    8,
    1,
    6,
    8,
    6,
    4,
    6,
    1,
    10,
    -1,
    -1,
    -1,
    -1,
    1,
    4,
    9,
    1,
    2,
    4,
    2,
    6,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    0,
    8,
    1,
    2,
    9,
    2,
    4,
    9,
    2,
    6,
    4,
    -1,
    -1,
    -1,
    -1,
    0,
    2,
    4,
    4,
    2,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    3,
    2,
    8,
    2,
    4,
    4,
    2,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    4,
    9,
    10,
    6,
    4,
    11,
    2,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    2,
    2,
    8,
    11,
    4,
    9,
    10,
    4,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    3,
    11,
    2,
    0,
    1,
    6,
    0,
    6,
    4,
    6,
    1,
    10,
    -1,
    -1,
    -1,
    -1,
    6,
    4,
    1,
    6,
    1,
    10,
    4,
    8,
    1,
    2,
    1,
    11,
    8,
    11,
    1,
    -1,
    9,
    6,
    4,
    9,
    3,
    6,
    9,
    1,
    3,
    11,
    6,
    3,
    -1,
    -1,
    -1,
    -1,
    8,
    11,
    1,
    8,
    1,
    0,
    11,
    6,
    1,
    9,
    1,
    4,
    6,
    4,
    1,
    -1,
    3,
    11,
    6,
    3,
    6,
    0,
    0,
    6,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6,
    4,
    8,
    11,
    6,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    10,
    6,
    7,
    8,
    10,
    8,
    9,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    7,
    3,
    0,
    10,
    7,
    0,
    9,
    10,
    6,
    7,
    10,
    -1,
    -1,
    -1,
    -1,
    10,
    6,
    7,
    1,
    10,
    7,
    1,
    7,
    8,
    1,
    8,
    0,
    -1,
    -1,
    -1,
    -1,
    10,
    6,
    7,
    10,
    7,
    1,
    1,
    7,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    6,
    1,
    6,
    8,
    1,
    8,
    9,
    8,
    6,
    7,
    -1,
    -1,
    -1,
    -1,
    2,
    6,
    9,
    2,
    9,
    1,
    6,
    7,
    9,
    0,
    9,
    3,
    7,
    3,
    9,
    -1,
    7,
    8,
    0,
    7,
    0,
    6,
    6,
    0,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    3,
    2,
    6,
    7,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    11,
    10,
    6,
    8,
    10,
    8,
    9,
    8,
    6,
    7,
    -1,
    -1,
    -1,
    -1,
    2,
    0,
    7,
    2,
    7,
    11,
    0,
    9,
    7,
    6,
    7,
    10,
    9,
    10,
    7,
    -1,
    1,
    8,
    0,
    1,
    7,
    8,
    1,
    10,
    7,
    6,
    7,
    10,
    2,
    3,
    11,
    -1,
    11,
    2,
    1,
    11,
    1,
    7,
    10,
    6,
    1,
    6,
    7,
    1,
    -1,
    -1,
    -1,
    -1,
    8,
    9,
    6,
    8,
    6,
    7,
    9,
    1,
    6,
    11,
    6,
    3,
    1,
    3,
    6,
    -1,
    0,
    9,
    1,
    11,
    6,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    8,
    0,
    7,
    0,
    6,
    3,
    11,
    0,
    11,
    6,
    0,
    -1,
    -1,
    -1,
    -1,
    7,
    11,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    6,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    0,
    8,
    11,
    7,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    11,
    7,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    1,
    9,
    8,
    3,
    1,
    11,
    7,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    1,
    2,
    6,
    11,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    3,
    0,
    8,
    6,
    11,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    9,
    0,
    2,
    10,
    9,
    6,
    11,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6,
    11,
    7,
    2,
    10,
    3,
    10,
    8,
    3,
    10,
    9,
    8,
    -1,
    -1,
    -1,
    -1,
    7,
    2,
    3,
    6,
    2,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    0,
    8,
    7,
    6,
    0,
    6,
    2,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    7,
    6,
    2,
    3,
    7,
    0,
    1,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    6,
    2,
    1,
    8,
    6,
    1,
    9,
    8,
    8,
    7,
    6,
    -1,
    -1,
    -1,
    -1,
    10,
    7,
    6,
    10,
    1,
    7,
    1,
    3,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    7,
    6,
    1,
    7,
    10,
    1,
    8,
    7,
    1,
    0,
    8,
    -1,
    -1,
    -1,
    -1,
    0,
    3,
    7,
    0,
    7,
    10,
    0,
    10,
    9,
    6,
    10,
    7,
    -1,
    -1,
    -1,
    -1,
    7,
    6,
    10,
    7,
    10,
    8,
    8,
    10,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6,
    8,
    4,
    11,
    8,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    6,
    11,
    3,
    0,
    6,
    0,
    4,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    6,
    11,
    8,
    4,
    6,
    9,
    0,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    4,
    6,
    9,
    6,
    3,
    9,
    3,
    1,
    11,
    3,
    6,
    -1,
    -1,
    -1,
    -1,
    6,
    8,
    4,
    6,
    11,
    8,
    2,
    10,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    3,
    0,
    11,
    0,
    6,
    11,
    0,
    4,
    6,
    -1,
    -1,
    -1,
    -1,
    4,
    11,
    8,
    4,
    6,
    11,
    0,
    2,
    9,
    2,
    10,
    9,
    -1,
    -1,
    -1,
    -1,
    10,
    9,
    3,
    10,
    3,
    2,
    9,
    4,
    3,
    11,
    3,
    6,
    4,
    6,
    3,
    -1,
    8,
    2,
    3,
    8,
    4,
    2,
    4,
    6,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    4,
    2,
    4,
    6,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    9,
    0,
    2,
    3,
    4,
    2,
    4,
    6,
    4,
    3,
    8,
    -1,
    -1,
    -1,
    -1,
    1,
    9,
    4,
    1,
    4,
    2,
    2,
    4,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    1,
    3,
    8,
    6,
    1,
    8,
    4,
    6,
    6,
    10,
    1,
    -1,
    -1,
    -1,
    -1,
    10,
    1,
    0,
    10,
    0,
    6,
    6,
    0,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    6,
    3,
    4,
    3,
    8,
    6,
    10,
    3,
    0,
    3,
    9,
    10,
    9,
    3,
    -1,
    10,
    9,
    4,
    6,
    10,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    9,
    5,
    7,
    6,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    4,
    9,
    5,
    11,
    7,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    0,
    1,
    5,
    4,
    0,
    7,
    6,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    7,
    6,
    8,
    3,
    4,
    3,
    5,
    4,
    3,
    1,
    5,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    4,
    10,
    1,
    2,
    7,
    6,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6,
    11,
    7,
    1,
    2,
    10,
    0,
    8,
    3,
    4,
    9,
    5,
    -1,
    -1,
    -1,
    -1,
    7,
    6,
    11,
    5,
    4,
    10,
    4,
    2,
    10,
    4,
    0,
    2,
    -1,
    -1,
    -1,
    -1,
    3,
    4,
    8,
    3,
    5,
    4,
    3,
    2,
    5,
    10,
    5,
    2,
    11,
    7,
    6,
    -1,
    7,
    2,
    3,
    7,
    6,
    2,
    5,
    4,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    4,
    0,
    8,
    6,
    0,
    6,
    2,
    6,
    8,
    7,
    -1,
    -1,
    -1,
    -1,
    3,
    6,
    2,
    3,
    7,
    6,
    1,
    5,
    0,
    5,
    4,
    0,
    -1,
    -1,
    -1,
    -1,
    6,
    2,
    8,
    6,
    8,
    7,
    2,
    1,
    8,
    4,
    8,
    5,
    1,
    5,
    8,
    -1,
    9,
    5,
    4,
    10,
    1,
    6,
    1,
    7,
    6,
    1,
    3,
    7,
    -1,
    -1,
    -1,
    -1,
    1,
    6,
    10,
    1,
    7,
    6,
    1,
    0,
    7,
    8,
    7,
    0,
    9,
    5,
    4,
    -1,
    4,
    0,
    10,
    4,
    10,
    5,
    0,
    3,
    10,
    6,
    10,
    7,
    3,
    7,
    10,
    -1,
    7,
    6,
    10,
    7,
    10,
    8,
    5,
    4,
    10,
    4,
    8,
    10,
    -1,
    -1,
    -1,
    -1,
    6,
    9,
    5,
    6,
    11,
    9,
    11,
    8,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    6,
    11,
    0,
    6,
    3,
    0,
    5,
    6,
    0,
    9,
    5,
    -1,
    -1,
    -1,
    -1,
    0,
    11,
    8,
    0,
    5,
    11,
    0,
    1,
    5,
    5,
    6,
    11,
    -1,
    -1,
    -1,
    -1,
    6,
    11,
    3,
    6,
    3,
    5,
    5,
    3,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    9,
    5,
    11,
    9,
    11,
    8,
    11,
    5,
    6,
    -1,
    -1,
    -1,
    -1,
    0,
    11,
    3,
    0,
    6,
    11,
    0,
    9,
    6,
    5,
    6,
    9,
    1,
    2,
    10,
    -1,
    11,
    8,
    5,
    11,
    5,
    6,
    8,
    0,
    5,
    10,
    5,
    2,
    0,
    2,
    5,
    -1,
    6,
    11,
    3,
    6,
    3,
    5,
    2,
    10,
    3,
    10,
    5,
    3,
    -1,
    -1,
    -1,
    -1,
    5,
    8,
    9,
    5,
    2,
    8,
    5,
    6,
    2,
    3,
    8,
    2,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    6,
    9,
    6,
    0,
    0,
    6,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    5,
    8,
    1,
    8,
    0,
    5,
    6,
    8,
    3,
    8,
    2,
    6,
    2,
    8,
    -1,
    1,
    5,
    6,
    2,
    1,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    3,
    6,
    1,
    6,
    10,
    3,
    8,
    6,
    5,
    6,
    9,
    8,
    9,
    6,
    -1,
    10,
    1,
    0,
    10,
    0,
    6,
    9,
    5,
    0,
    5,
    6,
    0,
    -1,
    -1,
    -1,
    -1,
    0,
    3,
    8,
    5,
    6,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    5,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    5,
    10,
    7,
    5,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    5,
    10,
    11,
    7,
    5,
    8,
    3,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    11,
    7,
    5,
    10,
    11,
    1,
    9,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    7,
    5,
    10,
    11,
    7,
    9,
    8,
    1,
    8,
    3,
    1,
    -1,
    -1,
    -1,
    -1,
    11,
    1,
    2,
    11,
    7,
    1,
    7,
    5,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    1,
    2,
    7,
    1,
    7,
    5,
    7,
    2,
    11,
    -1,
    -1,
    -1,
    -1,
    9,
    7,
    5,
    9,
    2,
    7,
    9,
    0,
    2,
    2,
    11,
    7,
    -1,
    -1,
    -1,
    -1,
    7,
    5,
    2,
    7,
    2,
    11,
    5,
    9,
    2,
    3,
    2,
    8,
    9,
    8,
    2,
    -1,
    2,
    5,
    10,
    2,
    3,
    5,
    3,
    7,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    2,
    0,
    8,
    5,
    2,
    8,
    7,
    5,
    10,
    2,
    5,
    -1,
    -1,
    -1,
    -1,
    9,
    0,
    1,
    5,
    10,
    3,
    5,
    3,
    7,
    3,
    10,
    2,
    -1,
    -1,
    -1,
    -1,
    9,
    8,
    2,
    9,
    2,
    1,
    8,
    7,
    2,
    10,
    2,
    5,
    7,
    5,
    2,
    -1,
    1,
    3,
    5,
    3,
    7,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    7,
    0,
    7,
    1,
    1,
    7,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    0,
    3,
    9,
    3,
    5,
    5,
    3,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    8,
    7,
    5,
    9,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    8,
    4,
    5,
    10,
    8,
    10,
    11,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    0,
    4,
    5,
    11,
    0,
    5,
    10,
    11,
    11,
    3,
    0,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    8,
    4,
    10,
    8,
    10,
    11,
    10,
    4,
    5,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    4,
    10,
    4,
    5,
    11,
    3,
    4,
    9,
    4,
    1,
    3,
    1,
    4,
    -1,
    2,
    5,
    1,
    2,
    8,
    5,
    2,
    11,
    8,
    4,
    5,
    8,
    -1,
    -1,
    -1,
    -1,
    0,
    4,
    11,
    0,
    11,
    3,
    4,
    5,
    11,
    2,
    11,
    1,
    5,
    1,
    11,
    -1,
    0,
    2,
    5,
    0,
    5,
    9,
    2,
    11,
    5,
    4,
    5,
    8,
    11,
    8,
    5,
    -1,
    9,
    4,
    5,
    2,
    11,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    5,
    10,
    3,
    5,
    2,
    3,
    4,
    5,
    3,
    8,
    4,
    -1,
    -1,
    -1,
    -1,
    5,
    10,
    2,
    5,
    2,
    4,
    4,
    2,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    10,
    2,
    3,
    5,
    10,
    3,
    8,
    5,
    4,
    5,
    8,
    0,
    1,
    9,
    -1,
    5,
    10,
    2,
    5,
    2,
    4,
    1,
    9,
    2,
    9,
    4,
    2,
    -1,
    -1,
    -1,
    -1,
    8,
    4,
    5,
    8,
    5,
    3,
    3,
    5,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    4,
    5,
    1,
    0,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    4,
    5,
    8,
    5,
    3,
    9,
    0,
    5,
    0,
    3,
    5,
    -1,
    -1,
    -1,
    -1,
    9,
    4,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    11,
    7,
    4,
    9,
    11,
    9,
    10,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    4,
    9,
    7,
    9,
    11,
    7,
    9,
    10,
    11,
    -1,
    -1,
    -1,
    -1,
    1,
    10,
    11,
    1,
    11,
    4,
    1,
    4,
    0,
    7,
    4,
    11,
    -1,
    -1,
    -1,
    -1,
    3,
    1,
    4,
    3,
    4,
    8,
    1,
    10,
    4,
    7,
    4,
    11,
    10,
    11,
    4,
    -1,
    4,
    11,
    7,
    9,
    11,
    4,
    9,
    2,
    11,
    9,
    1,
    2,
    -1,
    -1,
    -1,
    -1,
    9,
    7,
    4,
    9,
    11,
    7,
    9,
    1,
    11,
    2,
    11,
    1,
    0,
    8,
    3,
    -1,
    11,
    7,
    4,
    11,
    4,
    2,
    2,
    4,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    7,
    4,
    11,
    4,
    2,
    8,
    3,
    4,
    3,
    2,
    4,
    -1,
    -1,
    -1,
    -1,
    2,
    9,
    10,
    2,
    7,
    9,
    2,
    3,
    7,
    7,
    4,
    9,
    -1,
    -1,
    -1,
    -1,
    9,
    10,
    7,
    9,
    7,
    4,
    10,
    2,
    7,
    8,
    7,
    0,
    2,
    0,
    7,
    -1,
    3,
    7,
    10,
    3,
    10,
    2,
    7,
    4,
    10,
    1,
    10,
    0,
    4,
    0,
    10,
    -1,
    1,
    10,
    2,
    8,
    7,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    9,
    1,
    4,
    1,
    7,
    7,
    1,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    9,
    1,
    4,
    1,
    7,
    0,
    8,
    1,
    8,
    7,
    1,
    -1,
    -1,
    -1,
    -1,
    4,
    0,
    3,
    7,
    4,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    8,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    10,
    8,
    10,
    11,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    0,
    9,
    3,
    9,
    11,
    11,
    9,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    10,
    0,
    10,
    8,
    8,
    10,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    1,
    10,
    11,
    3,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    11,
    1,
    11,
    9,
    9,
    11,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    0,
    9,
    3,
    9,
    11,
    1,
    2,
    9,
    2,
    11,
    9,
    -1,
    -1,
    -1,
    -1,
    0,
    2,
    11,
    8,
    0,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    2,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    8,
    2,
    8,
    10,
    10,
    8,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    10,
    2,
    0,
    9,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    8,
    2,
    8,
    10,
    0,
    1,
    8,
    1,
    10,
    8,
    -1,
    -1,
    -1,
    -1,
    1,
    10,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    3,
    8,
    9,
    1,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    9,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    3,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
]);
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/objects/Sky.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sky",
    ()=>Sky
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)");
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
const Sky = /* @__PURE__ */ (()=>{
    const SkyShader = {
        uniforms: {
            turbidity: {
                value: 2
            },
            rayleigh: {
                value: 1
            },
            mieCoefficient: {
                value: 5e-3
            },
            mieDirectionalG: {
                value: 0.8
            },
            sunPosition: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
            },
            up: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0)
            }
        },
        vertexShader: /* glsl */ `
      uniform vec3 sunPosition;
      uniform float rayleigh;
      uniform float turbidity;
      uniform float mieCoefficient;
      uniform vec3 up;

      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      // constants for atmospheric scattering
      const float e = 2.71828182845904523536028747135266249775724709369995957;
      const float pi = 3.141592653589793238462643383279502884197169;

      // wavelength of used primaries, according to preetham
      const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
      // this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
      // (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
      const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

      // mie stuff
      // K coefficient for the primaries
      const float v = 4.0;
      const vec3 K = vec3( 0.686, 0.678, 0.666 );
      // MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
      const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

      // earth shadow hack
      // cutoffAngle = pi / 1.95;
      const float cutoffAngle = 1.6110731556870734;
      const float steepness = 1.5;
      const float EE = 1000.0;

      float sunIntensity( float zenithAngleCos ) {
        zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
        return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
      }

      vec3 totalMie( float T ) {
        float c = ( 0.2 * T ) * 10E-18;
        return 0.434 * c * MieConst;
      }

      void main() {

        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position.z = gl_Position.w; // set z to camera.far

        vSunDirection = normalize( sunPosition );

        vSunE = sunIntensity( dot( vSunDirection, up ) );

        vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

        float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

      // extinction (absorbtion + out scattering)
      // rayleigh coefficients
        vBetaR = totalRayleigh * rayleighCoefficient;

      // mie coefficients
        vBetaM = totalMie( turbidity ) * mieCoefficient;

      }
    `,
        fragmentShader: /* glsl */ `
      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      uniform float mieDirectionalG;
      uniform vec3 up;

      const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

      // constants for atmospheric scattering
      const float pi = 3.141592653589793238462643383279502884197169;

      const float n = 1.0003; // refractive index of air
      const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

      // optical length at zenith for molecules
      const float rayleighZenithLength = 8.4E3;
      const float mieZenithLength = 1.25E3;
      // 66 arc seconds -> degrees, and the cosine of that
      const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

      // 3.0 / ( 16.0 * pi )
      const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
      // 1.0 / ( 4.0 * pi )
      const float ONE_OVER_FOURPI = 0.07957747154594767;

      float rayleighPhase( float cosTheta ) {
        return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
      }

      float hgPhase( float cosTheta, float g ) {
        float g2 = pow( g, 2.0 );
        float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
        return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
      }

      void main() {

        vec3 direction = normalize( vWorldPosition - cameraPos );

      // optical length
      // cutoff angle at 90 to avoid singularity in next formula.
        float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
        float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
        float sR = rayleighZenithLength * inverse;
        float sM = mieZenithLength * inverse;

      // combined extinction factor
        vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

      // in scattering
        float cosTheta = dot( direction, vSunDirection );

        float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
        vec3 betaRTheta = vBetaR * rPhase;

        float mPhase = hgPhase( cosTheta, mieDirectionalG );
        vec3 betaMTheta = vBetaM * mPhase;

        vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
        Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

      // nightsky
        float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
        float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
        vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
        vec3 L0 = vec3( 0.1 ) * Fex;

      // composition + solar disc
        float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
        L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

        vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

        vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

        gl_FragColor = vec4( retColor, 1.0 );

      #include <tonemapping_fragment>
      #include <${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"] >= 154 ? "colorspace_fragment" : "encodings_fragment"}>

      }
    `
    };
    const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
        name: "SkyShader",
        fragmentShader: SkyShader.fragmentShader,
        vertexShader: SkyShader.vertexShader,
        uniforms: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(SkyShader.uniforms),
        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"],
        depthWrite: false
    });
    class Sky2 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] {
        constructor(){
            super(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1, 1, 1), material);
        }
    }
    __publicField(Sky2, "SkyShader", SkyShader);
    __publicField(Sky2, "material", material);
    return Sky2;
})();
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/postprocessing/EffectComposer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EffectComposer",
    ()=>EffectComposer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/shaders/CopyShader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/postprocessing/ShaderPass.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/postprocessing/MaskPass.js [app-client] (ecmascript)");
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
;
;
class EffectComposer {
    constructor(renderer, renderTarget){
        __publicField(this, "renderer");
        __publicField(this, "_pixelRatio");
        __publicField(this, "_width");
        __publicField(this, "_height");
        __publicField(this, "renderTarget1");
        __publicField(this, "renderTarget2");
        __publicField(this, "writeBuffer");
        __publicField(this, "readBuffer");
        __publicField(this, "renderToScreen");
        __publicField(this, "passes", []);
        __publicField(this, "copyPass");
        __publicField(this, "clock");
        this.renderer = renderer;
        if (renderTarget === void 0) {
            const parameters = {
                minFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"],
                magFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"],
                format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"]
            };
            const size = renderer.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
            this._pixelRatio = renderer.getPixelRatio();
            this._width = size.width;
            this._height = size.height;
            renderTarget = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLRenderTarget"](this._width * this._pixelRatio, this._height * this._pixelRatio, parameters);
            renderTarget.texture.name = "EffectComposer.rt1";
        } else {
            this._pixelRatio = 1;
            this._width = renderTarget.width;
            this._height = renderTarget.height;
        }
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.renderTarget2.texture.name = "EffectComposer.rt2";
        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;
        this.renderToScreen = true;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyShader"] === void 0) {
            console.error("THREE.EffectComposer relies on CopyShader");
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderPass"] === void 0) {
            console.error("THREE.EffectComposer relies on ShaderPass");
        }
        this.copyPass = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderPass"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyShader"]);
        this.copyPass.material.blending = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoBlending"];
        this.clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]();
    }
    swapBuffers() {
        const tmp = this.readBuffer;
        this.readBuffer = this.writeBuffer;
        this.writeBuffer = tmp;
    }
    addPass(pass) {
        this.passes.push(pass);
        pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    insertPass(pass, index) {
        this.passes.splice(index, 0, pass);
        pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    removePass(pass) {
        const index = this.passes.indexOf(pass);
        if (index !== -1) {
            this.passes.splice(index, 1);
        }
    }
    isLastEnabledPass(passIndex) {
        for(let i = passIndex + 1; i < this.passes.length; i++){
            if (this.passes[i].enabled) {
                return false;
            }
        }
        return true;
    }
    render(deltaTime) {
        if (deltaTime === void 0) {
            deltaTime = this.clock.getDelta();
        }
        const currentRenderTarget = this.renderer.getRenderTarget();
        let maskActive = false;
        const il = this.passes.length;
        for(let i = 0; i < il; i++){
            const pass = this.passes[i];
            if (pass.enabled === false) continue;
            pass.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i);
            pass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive);
            if (pass.needsSwap) {
                if (maskActive) {
                    const context = this.renderer.getContext();
                    const stencil = this.renderer.state.buffers.stencil;
                    stencil.setFunc(context.NOTEQUAL, 1, 4294967295);
                    this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime);
                    stencil.setFunc(context.EQUAL, 1, 4294967295);
                }
                this.swapBuffers();
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MaskPass"] !== void 0) {
                if (pass instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MaskPass"]) {
                    maskActive = true;
                } else if (pass instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClearMaskPass"]) {
                    maskActive = false;
                }
            }
        }
        this.renderer.setRenderTarget(currentRenderTarget);
    }
    reset(renderTarget) {
        if (renderTarget === void 0) {
            const size = this.renderer.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
            this._pixelRatio = this.renderer.getPixelRatio();
            this._width = size.width;
            this._height = size.height;
            renderTarget = this.renderTarget1.clone();
            renderTarget.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
        }
        this.renderTarget1.dispose();
        this.renderTarget2.dispose();
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;
    }
    setSize(width, height) {
        this._width = width;
        this._height = height;
        const effectiveWidth = this._width * this._pixelRatio;
        const effectiveHeight = this._height * this._pixelRatio;
        this.renderTarget1.setSize(effectiveWidth, effectiveHeight);
        this.renderTarget2.setSize(effectiveWidth, effectiveHeight);
        for(let i = 0; i < this.passes.length; i++){
            this.passes[i].setSize(effectiveWidth, effectiveHeight);
        }
    }
    setPixelRatio(pixelRatio) {
        this._pixelRatio = pixelRatio;
        this.setSize(this._width, this._height);
    }
    dispose() {
        this.renderTarget1.dispose();
        this.renderTarget2.dispose();
        this.copyPass.dispose();
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/postprocessing/MaskPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClearMaskPass",
    ()=>ClearMaskPass,
    "MaskPass",
    ()=>MaskPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/postprocessing/Pass.js [app-client] (ecmascript)");
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
class MaskPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    constructor(scene, camera){
        super();
        __publicField(this, "scene");
        __publicField(this, "camera");
        __publicField(this, "inverse");
        this.scene = scene;
        this.camera = camera;
        this.clear = true;
        this.needsSwap = false;
        this.inverse = false;
    }
    render(renderer, writeBuffer, readBuffer) {
        const context = renderer.getContext();
        const state = renderer.state;
        state.buffers.color.setMask(false);
        state.buffers.depth.setMask(false);
        state.buffers.color.setLocked(true);
        state.buffers.depth.setLocked(true);
        let writeValue, clearValue;
        if (this.inverse) {
            writeValue = 0;
            clearValue = 1;
        } else {
            writeValue = 1;
            clearValue = 0;
        }
        state.buffers.stencil.setTest(true);
        state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
        state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 4294967295);
        state.buffers.stencil.setClear(clearValue);
        state.buffers.stencil.setLocked(true);
        renderer.setRenderTarget(readBuffer);
        if (this.clear) renderer.clear();
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear();
        renderer.render(this.scene, this.camera);
        state.buffers.color.setLocked(false);
        state.buffers.depth.setLocked(false);
        state.buffers.stencil.setLocked(false);
        state.buffers.stencil.setFunc(context.EQUAL, 1, 4294967295);
        state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
        state.buffers.stencil.setLocked(true);
    }
}
class ClearMaskPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    constructor(){
        super();
        this.needsSwap = false;
    }
    render(renderer) {
        renderer.state.buffers.stencil.setLocked(false);
        renderer.state.buffers.stencil.setTest(false);
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/postprocessing/Pass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FullScreenQuad",
    ()=>FullScreenQuad,
    "Pass",
    ()=>Pass
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
class Pass {
    constructor(){
        // if set to true, the pass is processed by the composer
        __publicField(this, "enabled", true);
        // if set to true, the pass indicates to swap read and write buffer after rendering
        __publicField(this, "needsSwap", true);
        // if set to true, the pass clears its buffer before rendering
        __publicField(this, "clear", false);
        // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
        __publicField(this, "renderToScreen", false);
    }
    setSize(width, height) {}
    render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
        console.error("THREE.Pass: .render() must be implemented in derived pass.");
    }
    dispose() {}
}
class FullScreenQuad {
    constructor(material){
        __publicField(this, "camera", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"](-1, 1, 1, -1, 0, 1));
        __publicField(this, "geometry", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](2, 2));
        __publicField(this, "mesh");
        this.mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](this.geometry, material);
    }
    get material() {
        return this.mesh.material;
    }
    set material(value) {
        this.mesh.material = value;
    }
    dispose() {
        this.mesh.geometry.dispose();
    }
    render(renderer) {
        renderer.render(this.mesh, this.camera);
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/postprocessing/RenderPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RenderPass",
    ()=>RenderPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/postprocessing/Pass.js [app-client] (ecmascript)");
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
class RenderPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    constructor(scene, camera, overrideMaterial, clearColor, clearAlpha = 0){
        super();
        __publicField(this, "scene");
        __publicField(this, "camera");
        __publicField(this, "overrideMaterial");
        __publicField(this, "clearColor");
        __publicField(this, "clearAlpha");
        __publicField(this, "clearDepth", false);
        __publicField(this, "_oldClearColor", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]());
        this.scene = scene;
        this.camera = camera;
        this.overrideMaterial = overrideMaterial;
        this.clearColor = clearColor;
        this.clearAlpha = clearAlpha;
        this.clear = true;
        this.needsSwap = false;
    }
    render(renderer, writeBuffer, readBuffer) {
        let oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;
        let oldClearAlpha;
        let oldOverrideMaterial = null;
        if (this.overrideMaterial !== void 0) {
            oldOverrideMaterial = this.scene.overrideMaterial;
            this.scene.overrideMaterial = this.overrideMaterial;
        }
        if (this.clearColor) {
            renderer.getClearColor(this._oldClearColor);
            oldClearAlpha = renderer.getClearAlpha();
            renderer.setClearColor(this.clearColor, this.clearAlpha);
        }
        if (this.clearDepth) {
            renderer.clearDepth();
        }
        renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
        if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        renderer.render(this.scene, this.camera);
        if (this.clearColor) {
            renderer.setClearColor(this._oldClearColor, oldClearAlpha);
        }
        if (this.overrideMaterial !== void 0) {
            this.scene.overrideMaterial = oldOverrideMaterial;
        }
        renderer.autoClear = oldAutoClear;
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/postprocessing/ShaderPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShaderPass",
    ()=>ShaderPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/postprocessing/Pass.js [app-client] (ecmascript)");
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
class ShaderPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    constructor(shader, textureID = "tDiffuse"){
        super();
        __publicField(this, "textureID");
        __publicField(this, "uniforms");
        __publicField(this, "material");
        __publicField(this, "fsQuad");
        this.textureID = textureID;
        if (shader instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]) {
            this.uniforms = shader.uniforms;
            this.material = shader;
        } else {
            this.uniforms = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(shader.uniforms);
            this.material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                defines: Object.assign({}, shader.defines),
                uniforms: this.uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader
            });
        }
        this.fsQuad = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FullScreenQuad"](this.material);
    }
    render(renderer, writeBuffer, readBuffer) {
        if (this.uniforms[this.textureID]) {
            this.uniforms[this.textureID].value = readBuffer.texture;
        }
        this.fsQuad.material = this.material;
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        } else {
            renderer.setRenderTarget(writeBuffer);
            if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
            this.fsQuad.render(renderer);
        }
    }
    dispose() {
        this.fsQuad.dispose();
        this.material.dispose();
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/shaders/CopyShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopyShader",
    ()=>CopyShader
]);
const CopyShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        opacity: {
            value: 1
        }
    },
    vertexShader: /* glsl */ `
    varying vec2 vUv;

    void main() {

    	vUv = uv;
    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,
    fragmentShader: /* glsl */ `
    uniform float opacity;

    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {

    	vec4 texel = texture2D( tDiffuse, vUv );
    	gl_FragColor = opacity * texel;

    }
  `
};
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/shaders/GammaCorrectionShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GammaCorrectionShader",
    ()=>GammaCorrectionShader
]);
const GammaCorrectionShader = {
    uniforms: {
        tDiffuse: {
            value: null
        }
    },
    vertexShader: /* glsl */ `
    varying vec2 vUv;

    void main() {

    	vUv = uv;
    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,
    fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {

    	vec4 tex = texture2D( tDiffuse, vUv );

    	#ifdef LinearTosRGB
    		gl_FragColor = LinearTosRGB( tex );
    	#else
    		gl_FragColor = sRGBTransferOETF( tex );
    	#endif

    }
  `
};
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/shaders/HorizontalBlurShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HorizontalBlurShader",
    ()=>HorizontalBlurShader
]);
const HorizontalBlurShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        h: {
            value: 1 / 512
        }
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,
    fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `
};
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/shaders/VerticalBlurShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VerticalBlurShader",
    ()=>VerticalBlurShader
]);
const VerticalBlurShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        v: {
            value: 1 / 512
        }
    },
    vertexShader: /* glsl */ `
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,
    fragmentShader: /* glsl */ `

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `
};
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/types/helpers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWithKey",
    ()=>getWithKey
]);
const getWithKey = (obj, key)=>obj[key];
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/utils/BufferGeometryUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeMorphedAttributes",
    ()=>computeMorphedAttributes,
    "estimateBytesUsed",
    ()=>estimateBytesUsed,
    "interleaveAttributes",
    ()=>interleaveAttributes,
    "mergeBufferAttributes",
    ()=>mergeBufferAttributes,
    "mergeBufferGeometries",
    ()=>mergeBufferGeometries,
    "mergeVertices",
    ()=>mergeVertices,
    "toCreasedNormals",
    ()=>toCreasedNormals,
    "toTrianglesDrawMode",
    ()=>toTrianglesDrawMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$types$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/types/helpers.js [app-client] (ecmascript)");
;
;
const mergeBufferGeometries = (geometries, useGroups)=>{
    const isIndexed = geometries[0].index !== null;
    const attributesUsed = new Set(Object.keys(geometries[0].attributes));
    const morphAttributesUsed = new Set(Object.keys(geometries[0].morphAttributes));
    const attributes = {};
    const morphAttributes = {};
    const morphTargetsRelative = geometries[0].morphTargetsRelative;
    const mergedGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    let offset = 0;
    geometries.forEach((geom, i)=>{
        let attributesCount = 0;
        if (isIndexed !== (geom.index !== null)) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");
            return null;
        }
        for(let name in geom.attributes){
            if (!attributesUsed.has(name)) {
                console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.');
                return null;
            }
            if (attributes[name] === void 0) {
                attributes[name] = [];
            }
            attributes[name].push(geom.attributes[name]);
            attributesCount++;
        }
        if (attributesCount !== attributesUsed.size) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + ". Make sure all geometries have the same number of attributes.");
            return null;
        }
        if (morphTargetsRelative !== geom.morphTargetsRelative) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + ". .morphTargetsRelative must be consistent throughout all geometries.");
            return null;
        }
        for(let name in geom.morphAttributes){
            if (!morphAttributesUsed.has(name)) {
                console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + ".  .morphAttributes must be consistent throughout all geometries.");
                return null;
            }
            if (morphAttributes[name] === void 0) morphAttributes[name] = [];
            morphAttributes[name].push(geom.morphAttributes[name]);
        }
        mergedGeometry.userData.mergedUserData = mergedGeometry.userData.mergedUserData || [];
        mergedGeometry.userData.mergedUserData.push(geom.userData);
        if (useGroups) {
            let count;
            if (geom.index) {
                count = geom.index.count;
            } else if (geom.attributes.position !== void 0) {
                count = geom.attributes.position.count;
            } else {
                console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index " + i + ". The geometry must have either an index or a position attribute");
                return null;
            }
            mergedGeometry.addGroup(offset, count, i);
            offset += count;
        }
    });
    if (isIndexed) {
        let indexOffset = 0;
        const mergedIndex = [];
        geometries.forEach((geom)=>{
            const index = geom.index;
            for(let j = 0; j < index.count; ++j){
                mergedIndex.push(index.getX(j) + indexOffset);
            }
            indexOffset += geom.attributes.position.count;
        });
        mergedGeometry.setIndex(mergedIndex);
    }
    for(let name in attributes){
        const mergedAttribute = mergeBufferAttributes(attributes[name]);
        if (!mergedAttribute) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the " + name + " attribute.");
            return null;
        }
        mergedGeometry.setAttribute(name, mergedAttribute);
    }
    for(let name in morphAttributes){
        const numMorphTargets = morphAttributes[name][0].length;
        if (numMorphTargets === 0) break;
        mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
        mergedGeometry.morphAttributes[name] = [];
        for(let i = 0; i < numMorphTargets; ++i){
            const morphAttributesToMerge = [];
            for(let j = 0; j < morphAttributes[name].length; ++j){
                morphAttributesToMerge.push(morphAttributes[name][j][i]);
            }
            const mergedMorphAttribute = mergeBufferAttributes(morphAttributesToMerge);
            if (!mergedMorphAttribute) {
                console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the " + name + " morphAttribute.");
                return null;
            }
            mergedGeometry.morphAttributes[name].push(mergedMorphAttribute);
        }
    }
    return mergedGeometry;
};
const mergeBufferAttributes = (attributes)=>{
    let TypedArray = void 0;
    let itemSize = void 0;
    let normalized = void 0;
    let arrayLength = 0;
    attributes.forEach((attr)=>{
        if (TypedArray === void 0) {
            TypedArray = attr.array.constructor;
        }
        if (TypedArray !== attr.array.constructor) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.");
            return null;
        }
        if (itemSize === void 0) itemSize = attr.itemSize;
        if (itemSize !== attr.itemSize) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.");
            return null;
        }
        if (normalized === void 0) normalized = attr.normalized;
        if (normalized !== attr.normalized) {
            console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.");
            return null;
        }
        arrayLength += attr.array.length;
    });
    if (TypedArray && itemSize) {
        const array = new TypedArray(arrayLength);
        let offset = 0;
        attributes.forEach((attr)=>{
            array.set(attr.array, offset);
            offset += attr.array.length;
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](array, itemSize, normalized);
    }
};
const interleaveAttributes = (attributes)=>{
    let TypedArray = void 0;
    let arrayLength = 0;
    let stride = 0;
    for(let i = 0, l = attributes.length; i < l; ++i){
        const attribute = attributes[i];
        if (TypedArray === void 0) TypedArray = attribute.array.constructor;
        if (TypedArray !== attribute.array.constructor) {
            console.error("AttributeBuffers of different types cannot be interleaved");
            return null;
        }
        arrayLength += attribute.array.length;
        stride += attribute.itemSize;
    }
    const interleavedBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBuffer"](new TypedArray(arrayLength), stride);
    let offset = 0;
    const res = [];
    const getters = [
        "getX",
        "getY",
        "getZ",
        "getW"
    ];
    const setters = [
        "setX",
        "setY",
        "setZ",
        "setW"
    ];
    for(let j = 0, l = attributes.length; j < l; j++){
        const attribute = attributes[j];
        const itemSize = attribute.itemSize;
        const count = attribute.count;
        const iba = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](interleavedBuffer, itemSize, offset, attribute.normalized);
        res.push(iba);
        offset += itemSize;
        for(let c = 0; c < count; c++){
            for(let k = 0; k < itemSize; k++){
                const set = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$types$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWithKey"])(iba, setters[k]);
                const get = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$types$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWithKey"])(attribute, getters[k]);
                set(c, get(c));
            }
        }
    }
    return res;
};
function estimateBytesUsed(geometry) {
    let mem = 0;
    for(let name in geometry.attributes){
        const attr = geometry.getAttribute(name);
        mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;
    }
    const indices = geometry.getIndex();
    mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
    return mem;
}
function mergeVertices(geometry, tolerance = 1e-4) {
    tolerance = Math.max(tolerance, Number.EPSILON);
    const hashToIndex = {};
    const indices = geometry.getIndex();
    const positions = geometry.getAttribute("position");
    const vertexCount = indices ? indices.count : positions.count;
    let nextIndex = 0;
    const attributeNames = Object.keys(geometry.attributes);
    const attrArrays = {};
    const morphAttrsArrays = {};
    const newIndices = [];
    const getters = [
        "getX",
        "getY",
        "getZ",
        "getW"
    ];
    for(let i = 0, l = attributeNames.length; i < l; i++){
        const name = attributeNames[i];
        attrArrays[name] = [];
        const morphAttr = geometry.morphAttributes[name];
        if (morphAttr) {
            morphAttrsArrays[name] = new Array(morphAttr.length).fill(0).map(()=>[]);
        }
    }
    const decimalShift = Math.log10(1 / tolerance);
    const shiftMultiplier = Math.pow(10, decimalShift);
    for(let i = 0; i < vertexCount; i++){
        const index = indices ? indices.getX(i) : i;
        let hash = "";
        for(let j = 0, l = attributeNames.length; j < l; j++){
            const name = attributeNames[j];
            const attribute = geometry.getAttribute(name);
            const itemSize = attribute.itemSize;
            for(let k = 0; k < itemSize; k++){
                hash += `${~~(attribute[getters[k]](index) * shiftMultiplier)},`;
            }
        }
        if (hash in hashToIndex) {
            newIndices.push(hashToIndex[hash]);
        } else {
            for(let j = 0, l = attributeNames.length; j < l; j++){
                const name = attributeNames[j];
                const attribute = geometry.getAttribute(name);
                const morphAttr = geometry.morphAttributes[name];
                const itemSize = attribute.itemSize;
                const newarray = attrArrays[name];
                const newMorphArrays = morphAttrsArrays[name];
                for(let k = 0; k < itemSize; k++){
                    const getterFunc = getters[k];
                    newarray.push(attribute[getterFunc](index));
                    if (morphAttr) {
                        for(let m = 0, ml = morphAttr.length; m < ml; m++){
                            newMorphArrays[m].push(morphAttr[m][getterFunc](index));
                        }
                    }
                }
            }
            hashToIndex[hash] = nextIndex;
            newIndices.push(nextIndex);
            nextIndex++;
        }
    }
    const result = geometry.clone();
    for(let i = 0, l = attributeNames.length; i < l; i++){
        const name = attributeNames[i];
        const oldAttribute = geometry.getAttribute(name);
        const buffer = new oldAttribute.array.constructor(attrArrays[name]);
        const attribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](buffer, oldAttribute.itemSize, oldAttribute.normalized);
        result.setAttribute(name, attribute);
        if (name in morphAttrsArrays) {
            for(let j = 0; j < morphAttrsArrays[name].length; j++){
                const oldMorphAttribute = geometry.morphAttributes[name][j];
                const buffer2 = new oldMorphAttribute.array.constructor(morphAttrsArrays[name][j]);
                const morphAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](buffer2, oldMorphAttribute.itemSize, oldMorphAttribute.normalized);
                result.morphAttributes[name][j] = morphAttribute;
            }
        }
    }
    result.setIndex(newIndices);
    return result;
}
function toTrianglesDrawMode(geometry, drawMode) {
    if (drawMode === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrianglesDrawMode"]) {
        console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.");
        return geometry;
    }
    if (drawMode === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TriangleFanDrawMode"] || drawMode === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TriangleStripDrawMode"]) {
        let index = geometry.getIndex();
        if (index === null) {
            const indices = [];
            const position = geometry.getAttribute("position");
            if (position !== void 0) {
                for(let i = 0; i < position.count; i++){
                    indices.push(i);
                }
                geometry.setIndex(indices);
                index = geometry.getIndex();
            } else {
                console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.");
                return geometry;
            }
        }
        const numberOfTriangles = index.count - 2;
        const newIndices = [];
        if (index) {
            if (drawMode === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TriangleFanDrawMode"]) {
                for(let i = 1; i <= numberOfTriangles; i++){
                    newIndices.push(index.getX(0));
                    newIndices.push(index.getX(i));
                    newIndices.push(index.getX(i + 1));
                }
            } else {
                for(let i = 0; i < numberOfTriangles; i++){
                    if (i % 2 === 0) {
                        newIndices.push(index.getX(i));
                        newIndices.push(index.getX(i + 1));
                        newIndices.push(index.getX(i + 2));
                    } else {
                        newIndices.push(index.getX(i + 2));
                        newIndices.push(index.getX(i + 1));
                        newIndices.push(index.getX(i));
                    }
                }
            }
        }
        if (newIndices.length / 3 !== numberOfTriangles) {
            console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
        }
        const newGeometry = geometry.clone();
        newGeometry.setIndex(newIndices);
        newGeometry.clearGroups();
        return newGeometry;
    } else {
        console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", drawMode);
        return geometry;
    }
}
function computeMorphedAttributes(object) {
    if (object.geometry.isBufferGeometry !== true) {
        console.error("THREE.BufferGeometryUtils: Geometry is not of type BufferGeometry.");
        return null;
    }
    const _vA = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _vB = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _vC = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _tempA = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _tempB = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _tempC = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _morphA = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _morphB = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const _morphC = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    function _calculateMorphedAttributeData(object2, material2, attribute, morphAttribute, morphTargetsRelative2, a2, b2, c2, modifiedAttributeArray) {
        _vA.fromBufferAttribute(attribute, a2);
        _vB.fromBufferAttribute(attribute, b2);
        _vC.fromBufferAttribute(attribute, c2);
        const morphInfluences = object2.morphTargetInfluences;
        if (// @ts-ignore
        material2.morphTargets && morphAttribute && morphInfluences) {
            _morphA.set(0, 0, 0);
            _morphB.set(0, 0, 0);
            _morphC.set(0, 0, 0);
            for(let i2 = 0, il2 = morphAttribute.length; i2 < il2; i2++){
                const influence = morphInfluences[i2];
                const morph = morphAttribute[i2];
                if (influence === 0) continue;
                _tempA.fromBufferAttribute(morph, a2);
                _tempB.fromBufferAttribute(morph, b2);
                _tempC.fromBufferAttribute(morph, c2);
                if (morphTargetsRelative2) {
                    _morphA.addScaledVector(_tempA, influence);
                    _morphB.addScaledVector(_tempB, influence);
                    _morphC.addScaledVector(_tempC, influence);
                } else {
                    _morphA.addScaledVector(_tempA.sub(_vA), influence);
                    _morphB.addScaledVector(_tempB.sub(_vB), influence);
                    _morphC.addScaledVector(_tempC.sub(_vC), influence);
                }
            }
            _vA.add(_morphA);
            _vB.add(_morphB);
            _vC.add(_morphC);
        }
        if (object2.isSkinnedMesh) {
            object2.boneTransform(a2, _vA);
            object2.boneTransform(b2, _vB);
            object2.boneTransform(c2, _vC);
        }
        modifiedAttributeArray[a2 * 3 + 0] = _vA.x;
        modifiedAttributeArray[a2 * 3 + 1] = _vA.y;
        modifiedAttributeArray[a2 * 3 + 2] = _vA.z;
        modifiedAttributeArray[b2 * 3 + 0] = _vB.x;
        modifiedAttributeArray[b2 * 3 + 1] = _vB.y;
        modifiedAttributeArray[b2 * 3 + 2] = _vB.z;
        modifiedAttributeArray[c2 * 3 + 0] = _vC.x;
        modifiedAttributeArray[c2 * 3 + 1] = _vC.y;
        modifiedAttributeArray[c2 * 3 + 2] = _vC.z;
    }
    const geometry = object.geometry;
    const material = object.material;
    let a, b, c;
    const index = geometry.index;
    const positionAttribute = geometry.attributes.position;
    const morphPosition = geometry.morphAttributes.position;
    const morphTargetsRelative = geometry.morphTargetsRelative;
    const normalAttribute = geometry.attributes.normal;
    const morphNormal = geometry.morphAttributes.position;
    const groups = geometry.groups;
    const drawRange = geometry.drawRange;
    let i, j, il, jl;
    let group, groupMaterial;
    let start, end;
    const modifiedPosition = new Float32Array(positionAttribute.count * positionAttribute.itemSize);
    const modifiedNormal = new Float32Array(normalAttribute.count * normalAttribute.itemSize);
    if (index !== null) {
        if (Array.isArray(material)) {
            for(i = 0, il = groups.length; i < il; i++){
                group = groups[i];
                groupMaterial = material[group.materialIndex];
                start = Math.max(group.start, drawRange.start);
                end = Math.min(group.start + group.count, drawRange.start + drawRange.count);
                for(j = start, jl = end; j < jl; j += 3){
                    a = index.getX(j);
                    b = index.getX(j + 1);
                    c = index.getX(j + 2);
                    _calculateMorphedAttributeData(object, groupMaterial, positionAttribute, morphPosition, morphTargetsRelative, a, b, c, modifiedPosition);
                    _calculateMorphedAttributeData(object, groupMaterial, normalAttribute, morphNormal, morphTargetsRelative, a, b, c, modifiedNormal);
                }
            }
        } else {
            start = Math.max(0, drawRange.start);
            end = Math.min(index.count, drawRange.start + drawRange.count);
            for(i = start, il = end; i < il; i += 3){
                a = index.getX(i);
                b = index.getX(i + 1);
                c = index.getX(i + 2);
                _calculateMorphedAttributeData(object, material, positionAttribute, morphPosition, morphTargetsRelative, a, b, c, modifiedPosition);
                _calculateMorphedAttributeData(object, material, normalAttribute, morphNormal, morphTargetsRelative, a, b, c, modifiedNormal);
            }
        }
    } else if (positionAttribute !== void 0) {
        if (Array.isArray(material)) {
            for(i = 0, il = groups.length; i < il; i++){
                group = groups[i];
                groupMaterial = material[group.materialIndex];
                start = Math.max(group.start, drawRange.start);
                end = Math.min(group.start + group.count, drawRange.start + drawRange.count);
                for(j = start, jl = end; j < jl; j += 3){
                    a = j;
                    b = j + 1;
                    c = j + 2;
                    _calculateMorphedAttributeData(object, groupMaterial, positionAttribute, morphPosition, morphTargetsRelative, a, b, c, modifiedPosition);
                    _calculateMorphedAttributeData(object, groupMaterial, normalAttribute, morphNormal, morphTargetsRelative, a, b, c, modifiedNormal);
                }
            }
        } else {
            start = Math.max(0, drawRange.start);
            end = Math.min(positionAttribute.count, drawRange.start + drawRange.count);
            for(i = start, il = end; i < il; i += 3){
                a = i;
                b = i + 1;
                c = i + 2;
                _calculateMorphedAttributeData(object, material, positionAttribute, morphPosition, morphTargetsRelative, a, b, c, modifiedPosition);
                _calculateMorphedAttributeData(object, material, normalAttribute, morphNormal, morphTargetsRelative, a, b, c, modifiedNormal);
            }
        }
    }
    const morphedPositionAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](modifiedPosition, 3);
    const morphedNormalAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](modifiedNormal, 3);
    return {
        positionAttribute,
        normalAttribute,
        morphedPositionAttribute,
        morphedNormalAttribute
    };
}
function toCreasedNormals(geometry, creaseAngle = Math.PI / 3) {
    const creaseDot = Math.cos(creaseAngle);
    const hashMultiplier = (1 + 1e-10) * 100;
    const verts = [
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
    ];
    const tempVec1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const tempVec2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const tempNorm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    const tempNorm2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
    function hashVertex(v) {
        const x = ~~(v.x * hashMultiplier);
        const y = ~~(v.y * hashMultiplier);
        const z = ~~(v.z * hashMultiplier);
        return `${x},${y},${z}`;
    }
    const resultGeometry = geometry.index ? geometry.toNonIndexed() : geometry;
    const posAttr = resultGeometry.attributes.position;
    const vertexMap = {};
    for(let i = 0, l = posAttr.count / 3; i < l; i++){
        const i3 = 3 * i;
        const a = verts[0].fromBufferAttribute(posAttr, i3 + 0);
        const b = verts[1].fromBufferAttribute(posAttr, i3 + 1);
        const c = verts[2].fromBufferAttribute(posAttr, i3 + 2);
        tempVec1.subVectors(c, b);
        tempVec2.subVectors(a, b);
        const normal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(tempVec1, tempVec2).normalize();
        for(let n = 0; n < 3; n++){
            const vert = verts[n];
            const hash = hashVertex(vert);
            if (!(hash in vertexMap)) {
                vertexMap[hash] = [];
            }
            vertexMap[hash].push(normal);
        }
    }
    const normalArray = new Float32Array(posAttr.count * 3);
    const normAttr = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](normalArray, 3, false);
    for(let i = 0, l = posAttr.count / 3; i < l; i++){
        const i3 = 3 * i;
        const a = verts[0].fromBufferAttribute(posAttr, i3 + 0);
        const b = verts[1].fromBufferAttribute(posAttr, i3 + 1);
        const c = verts[2].fromBufferAttribute(posAttr, i3 + 2);
        tempVec1.subVectors(c, b);
        tempVec2.subVectors(a, b);
        tempNorm.crossVectors(tempVec1, tempVec2).normalize();
        for(let n = 0; n < 3; n++){
            const vert = verts[n];
            const hash = hashVertex(vert);
            const otherNormals = vertexMap[hash];
            tempNorm2.set(0, 0, 0);
            for(let k = 0, lk = otherNormals.length; k < lk; k++){
                const otherNorm = otherNormals[k];
                if (tempNorm.dot(otherNorm) > creaseDot) {
                    tempNorm2.add(otherNorm);
                }
            }
            tempNorm2.normalize();
            normAttr.setXYZ(i3 + n, tempNorm2.x, tempNorm2.y, tempNorm2.z);
        }
    }
    resultGeometry.setAttribute("normal", normAttr);
    return resultGeometry;
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/utils/SkeletonUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SkeletonUtils",
    ()=>SkeletonUtils
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
function retarget(target, source, options = {}) {
    const pos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](), quat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](), scale = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](), bindBoneMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"](), relativeMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"](), globalMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    options.preserveMatrix = options.preserveMatrix !== void 0 ? options.preserveMatrix : true;
    options.preservePosition = options.preservePosition !== void 0 ? options.preservePosition : true;
    options.preserveHipPosition = options.preserveHipPosition !== void 0 ? options.preserveHipPosition : false;
    options.useTargetMatrix = options.useTargetMatrix !== void 0 ? options.useTargetMatrix : false;
    options.hip = options.hip !== void 0 ? options.hip : "hip";
    options.names = options.names || {};
    const sourceBones = source.isObject3D ? source.skeleton.bones : getBones(source), bones = target.isObject3D ? target.skeleton.bones : getBones(target);
    let bindBones, bone, name, boneTo, bonesPosition;
    if (target.isObject3D) {
        target.skeleton.pose();
    } else {
        options.useTargetMatrix = true;
        options.preserveMatrix = false;
    }
    if (options.preservePosition) {
        bonesPosition = [];
        for(let i = 0; i < bones.length; i++){
            bonesPosition.push(bones[i].position.clone());
        }
    }
    if (options.preserveMatrix) {
        target.updateMatrixWorld();
        target.matrixWorld.identity();
        for(let i = 0; i < target.children.length; ++i){
            target.children[i].updateMatrixWorld(true);
        }
    }
    if (options.offsets) {
        bindBones = [];
        for(let i = 0; i < bones.length; ++i){
            bone = bones[i];
            name = options.names[bone.name] || bone.name;
            if (options.offsets[name]) {
                bone.matrix.multiply(options.offsets[name]);
                bone.matrix.decompose(bone.position, bone.quaternion, bone.scale);
                bone.updateMatrixWorld();
            }
            bindBones.push(bone.matrixWorld.clone());
        }
    }
    for(let i = 0; i < bones.length; ++i){
        bone = bones[i];
        name = options.names[bone.name] || bone.name;
        boneTo = getBoneByName(name, sourceBones);
        globalMatrix.copy(bone.matrixWorld);
        if (boneTo) {
            boneTo.updateMatrixWorld();
            if (options.useTargetMatrix) {
                relativeMatrix.copy(boneTo.matrixWorld);
            } else {
                relativeMatrix.copy(target.matrixWorld).invert();
                relativeMatrix.multiply(boneTo.matrixWorld);
            }
            scale.setFromMatrixScale(relativeMatrix);
            relativeMatrix.scale(scale.set(1 / scale.x, 1 / scale.y, 1 / scale.z));
            globalMatrix.makeRotationFromQuaternion(quat.setFromRotationMatrix(relativeMatrix));
            if (target.isObject3D) {
                const boneIndex = bones.indexOf(bone), wBindMatrix = bindBones ? bindBones[boneIndex] : bindBoneMatrix.copy(target.skeleton.boneInverses[boneIndex]).invert();
                globalMatrix.multiply(wBindMatrix);
            }
            globalMatrix.copyPosition(relativeMatrix);
        }
        if (bone.parent && bone.parent.isBone) {
            bone.matrix.copy(bone.parent.matrixWorld).invert();
            bone.matrix.multiply(globalMatrix);
        } else {
            bone.matrix.copy(globalMatrix);
        }
        if (options.preserveHipPosition && name === options.hip) {
            bone.matrix.setPosition(pos.set(0, bone.position.y, 0));
        }
        bone.matrix.decompose(bone.position, bone.quaternion, bone.scale);
        bone.updateMatrixWorld();
    }
    if (options.preservePosition) {
        for(let i = 0; i < bones.length; ++i){
            bone = bones[i];
            name = options.names[bone.name] || bone.name;
            if (name !== options.hip) {
                bone.position.copy(bonesPosition[i]);
            }
        }
    }
    if (options.preserveMatrix) {
        target.updateMatrixWorld(true);
    }
}
function retargetClip(target, source, clip, options = {}) {
    options.useFirstFramePosition = options.useFirstFramePosition !== void 0 ? options.useFirstFramePosition : false;
    options.fps = options.fps !== void 0 ? options.fps : 30;
    options.names = options.names || [];
    if (!source.isObject3D) {
        source = getHelperFromSkeleton(source);
    }
    const numFrames = Math.round(clip.duration * (options.fps / 1e3) * 1e3), delta = 1 / options.fps, convertedTracks = [], mixer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationMixer"](source), bones = getBones(target.skeleton), boneDatas = [];
    let positionOffset, bone, boneTo, boneData, name;
    mixer.clipAction(clip).play();
    mixer.update(0);
    source.updateMatrixWorld();
    for(let i = 0; i < numFrames; ++i){
        const time = i * delta;
        retarget(target, source, options);
        for(let j = 0; j < bones.length; ++j){
            name = options.names[bones[j].name] || bones[j].name;
            boneTo = getBoneByName(name, source.skeleton);
            if (boneTo) {
                bone = bones[j];
                boneData = boneDatas[j] = boneDatas[j] || {
                    bone
                };
                if (options.hip === name) {
                    if (!boneData.pos) {
                        boneData.pos = {
                            times: new Float32Array(numFrames),
                            values: new Float32Array(numFrames * 3)
                        };
                    }
                    if (options.useFirstFramePosition) {
                        if (i === 0) {
                            positionOffset = bone.position.clone();
                        }
                        bone.position.sub(positionOffset);
                    }
                    boneData.pos.times[i] = time;
                    bone.position.toArray(boneData.pos.values, i * 3);
                }
                if (!boneData.quat) {
                    boneData.quat = {
                        times: new Float32Array(numFrames),
                        values: new Float32Array(numFrames * 4)
                    };
                }
                boneData.quat.times[i] = time;
                bone.quaternion.toArray(boneData.quat.values, i * 4);
            }
        }
        mixer.update(delta);
        source.updateMatrixWorld();
    }
    for(let i = 0; i < boneDatas.length; ++i){
        boneData = boneDatas[i];
        if (boneData) {
            if (boneData.pos) {
                convertedTracks.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VectorKeyframeTrack"](".bones[" + boneData.bone.name + "].position", boneData.pos.times, boneData.pos.values));
            }
            convertedTracks.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuaternionKeyframeTrack"](".bones[" + boneData.bone.name + "].quaternion", boneData.quat.times, boneData.quat.values));
        }
    }
    mixer.uncacheAction(clip);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationClip"](clip.name, -1, convertedTracks);
}
function clone(source) {
    const sourceLookup = /* @__PURE__ */ new Map();
    const cloneLookup = /* @__PURE__ */ new Map();
    const clone2 = source.clone();
    parallelTraverse(source, clone2, function(sourceNode, clonedNode) {
        sourceLookup.set(clonedNode, sourceNode);
        cloneLookup.set(sourceNode, clonedNode);
    });
    clone2.traverse(function(node) {
        if (!node.isSkinnedMesh) return;
        const clonedMesh = node;
        const sourceMesh = sourceLookup.get(node);
        const sourceBones = sourceMesh.skeleton.bones;
        clonedMesh.skeleton = sourceMesh.skeleton.clone();
        clonedMesh.bindMatrix.copy(sourceMesh.bindMatrix);
        clonedMesh.skeleton.bones = sourceBones.map(function(bone) {
            return cloneLookup.get(bone);
        });
        clonedMesh.bind(clonedMesh.skeleton, clonedMesh.bindMatrix);
    });
    return clone2;
}
function getBoneByName(name, skeleton) {
    for(let i = 0, bones = getBones(skeleton); i < bones.length; i++){
        if (name === bones[i].name) return bones[i];
    }
}
function getBones(skeleton) {
    return Array.isArray(skeleton) ? skeleton : skeleton.bones;
}
function getHelperFromSkeleton(skeleton) {
    const source = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonHelper"](skeleton.bones[0]);
    source.skeleton = skeleton;
    return source;
}
function parallelTraverse(a, b, callback) {
    callback(a, b);
    for(let i = 0; i < a.children.length; i++){
        parallelTraverse(a.children[i], b.children[i], callback);
    }
}
const SkeletonUtils = {
    retarget,
    retargetClip,
    clone
};
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/utils/WorkerPool.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WorkerPool",
    ()=>WorkerPool
]);
class WorkerPool {
    constructor(pool = 4){
        this.pool = pool;
        this.queue = [];
        this.workers = [];
        this.workersResolve = [];
        this.workerStatus = 0;
    }
    _initWorker(workerId) {
        if (!this.workers[workerId]) {
            const worker = this.workerCreator();
            worker.addEventListener("message", this._onMessage.bind(this, workerId));
            this.workers[workerId] = worker;
        }
    }
    _getIdleWorker() {
        for(let i = 0; i < this.pool; i++)if (!(this.workerStatus & 1 << i)) return i;
        return -1;
    }
    _onMessage(workerId, msg) {
        const resolve = this.workersResolve[workerId];
        resolve && resolve(msg);
        if (this.queue.length) {
            const { resolve: resolve2, msg: msg2, transfer } = this.queue.shift();
            this.workersResolve[workerId] = resolve2;
            this.workers[workerId].postMessage(msg2, transfer);
        } else {
            this.workerStatus ^= 1 << workerId;
        }
    }
    setWorkerCreator(workerCreator) {
        this.workerCreator = workerCreator;
    }
    setWorkerLimit(pool) {
        this.pool = pool;
    }
    postMessage(msg, transfer) {
        return new Promise((resolve)=>{
            const workerId = this._getIdleWorker();
            if (workerId !== -1) {
                this._initWorker(workerId);
                this.workerStatus |= 1 << workerId;
                this.workersResolve[workerId] = resolve;
                this.workers[workerId].postMessage(msg, transfer);
            } else {
                this.queue.push({
                    resolve,
                    msg,
                    transfer
                });
            }
        });
    }
    dispose() {
        this.workers.forEach((worker)=>worker.terminate());
        this.workersResolve.length = 0;
        this.workers.length = 0;
        this.queue.length = 0;
        this.workerStatus = 0;
    }
}
;
}),
]);

//# sourceMappingURL=1w7z_three-stdlib_1ownl2d._.js.map