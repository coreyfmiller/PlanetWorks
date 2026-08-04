module.exports = [
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/loaders/DRACOLoader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DRACOLoader",
    ()=>DRACOLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
;
const _taskCache = /* @__PURE__ */ new WeakMap();
class DRACOLoader extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Loader"] {
    constructor(manager){
        super(manager);
        this.decoderPath = "";
        this.decoderConfig = {};
        this.decoderBinary = null;
        this.decoderPending = null;
        this.workerLimit = 4;
        this.workerPool = [];
        this.workerNextTaskID = 1;
        this.workerSourceURL = "";
        this.defaultAttributeIDs = {
            position: "POSITION",
            normal: "NORMAL",
            color: "COLOR",
            uv: "TEX_COORD"
        };
        this.defaultAttributeTypes = {
            position: "Float32Array",
            normal: "Float32Array",
            color: "Float32Array",
            uv: "Float32Array"
        };
    }
    setDecoderPath(path) {
        this.decoderPath = path;
        return this;
    }
    setDecoderConfig(config) {
        this.decoderConfig = config;
        return this;
    }
    setWorkerLimit(workerLimit) {
        this.workerLimit = workerLimit;
        return this;
    }
    load(url, onLoad, onProgress, onError) {
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
        loader.setPath(this.path);
        loader.setResponseType("arraybuffer");
        loader.setRequestHeader(this.requestHeader);
        loader.setWithCredentials(this.withCredentials);
        loader.load(url, (buffer)=>{
            const taskConfig = {
                attributeIDs: this.defaultAttributeIDs,
                attributeTypes: this.defaultAttributeTypes,
                useUniqueIDs: false
            };
            this.decodeGeometry(buffer, taskConfig).then(onLoad).catch(onError);
        }, onProgress, onError);
    }
    /** @deprecated Kept for backward-compatibility with previous DRACOLoader versions. */ decodeDracoFile(buffer, callback, attributeIDs, attributeTypes) {
        const taskConfig = {
            attributeIDs: attributeIDs || this.defaultAttributeIDs,
            attributeTypes: attributeTypes || this.defaultAttributeTypes,
            useUniqueIDs: !!attributeIDs
        };
        this.decodeGeometry(buffer, taskConfig).then(callback);
    }
    decodeGeometry(buffer, taskConfig) {
        for(const attribute in taskConfig.attributeTypes){
            const type = taskConfig.attributeTypes[attribute];
            if (type.BYTES_PER_ELEMENT !== void 0) {
                taskConfig.attributeTypes[attribute] = type.name;
            }
        }
        const taskKey = JSON.stringify(taskConfig);
        if (_taskCache.has(buffer)) {
            const cachedTask = _taskCache.get(buffer);
            if (cachedTask.key === taskKey) {
                return cachedTask.promise;
            } else if (buffer.byteLength === 0) {
                throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
            }
        }
        let worker;
        const taskID = this.workerNextTaskID++;
        const taskCost = buffer.byteLength;
        const geometryPending = this._getWorker(taskID, taskCost).then((_worker)=>{
            worker = _worker;
            return new Promise((resolve, reject)=>{
                worker._callbacks[taskID] = {
                    resolve,
                    reject
                };
                worker.postMessage({
                    type: "decode",
                    id: taskID,
                    taskConfig,
                    buffer
                }, [
                    buffer
                ]);
            });
        }).then((message)=>this._createGeometry(message.geometry));
        geometryPending.catch(()=>true).then(()=>{
            if (worker && taskID) {
                this._releaseTask(worker, taskID);
            }
        });
        _taskCache.set(buffer, {
            key: taskKey,
            promise: geometryPending
        });
        return geometryPending;
    }
    _createGeometry(geometryData) {
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        if (geometryData.index) {
            geometry.setIndex(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](geometryData.index.array, 1));
        }
        for(let i = 0; i < geometryData.attributes.length; i++){
            const attribute = geometryData.attributes[i];
            const name = attribute.name;
            const array = attribute.array;
            const itemSize = attribute.itemSize;
            geometry.setAttribute(name, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](array, itemSize));
        }
        return geometry;
    }
    _loadLibrary(url, responseType) {
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
        loader.setPath(this.decoderPath);
        loader.setResponseType(responseType);
        loader.setWithCredentials(this.withCredentials);
        return new Promise((resolve, reject)=>{
            loader.load(url, resolve, void 0, reject);
        });
    }
    preload() {
        this._initDecoder();
        return this;
    }
    _initDecoder() {
        if (this.decoderPending) return this.decoderPending;
        const useJS = typeof WebAssembly !== "object" || this.decoderConfig.type === "js";
        const librariesPending = [];
        if (useJS) {
            librariesPending.push(this._loadLibrary("draco_decoder.js", "text"));
        } else {
            librariesPending.push(this._loadLibrary("draco_wasm_wrapper.js", "text"));
            librariesPending.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"));
        }
        this.decoderPending = Promise.all(librariesPending).then((libraries)=>{
            const jsContent = libraries[0];
            if (!useJS) {
                this.decoderConfig.wasmBinary = libraries[1];
            }
            const fn = DRACOWorker.toString();
            const body = [
                "/* draco decoder */",
                jsContent,
                "",
                "/* worker */",
                fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"))
            ].join("\n");
            this.workerSourceURL = URL.createObjectURL(new Blob([
                body
            ]));
        });
        return this.decoderPending;
    }
    _getWorker(taskID, taskCost) {
        return this._initDecoder().then(()=>{
            if (this.workerPool.length < this.workerLimit) {
                const worker2 = new Worker(this.workerSourceURL);
                worker2._callbacks = {};
                worker2._taskCosts = {};
                worker2._taskLoad = 0;
                worker2.postMessage({
                    type: "init",
                    decoderConfig: this.decoderConfig
                });
                worker2.onmessage = function(e) {
                    const message = e.data;
                    switch(message.type){
                        case "decode":
                            worker2._callbacks[message.id].resolve(message);
                            break;
                        case "error":
                            worker2._callbacks[message.id].reject(message);
                            break;
                        default:
                            console.error('THREE.DRACOLoader: Unexpected message, "' + message.type + '"');
                    }
                };
                this.workerPool.push(worker2);
            } else {
                this.workerPool.sort(function(a, b) {
                    return a._taskLoad > b._taskLoad ? -1 : 1;
                });
            }
            const worker = this.workerPool[this.workerPool.length - 1];
            worker._taskCosts[taskID] = taskCost;
            worker._taskLoad += taskCost;
            return worker;
        });
    }
    _releaseTask(worker, taskID) {
        worker._taskLoad -= worker._taskCosts[taskID];
        delete worker._callbacks[taskID];
        delete worker._taskCosts[taskID];
    }
    debug() {
        console.log("Task load: ", this.workerPool.map((worker)=>worker._taskLoad));
    }
    dispose() {
        for(let i = 0; i < this.workerPool.length; ++i){
            this.workerPool[i].terminate();
        }
        this.workerPool.length = 0;
        return this;
    }
}
function DRACOWorker() {
    let decoderConfig;
    let decoderPending;
    onmessage = function(e) {
        const message = e.data;
        switch(message.type){
            case "init":
                decoderConfig = message.decoderConfig;
                decoderPending = new Promise(function(resolve) {
                    decoderConfig.onModuleLoaded = function(draco) {
                        resolve({
                            draco
                        });
                    };
                    DracoDecoderModule(decoderConfig);
                });
                break;
            case "decode":
                const buffer = message.buffer;
                const taskConfig = message.taskConfig;
                decoderPending.then((module)=>{
                    const draco = module.draco;
                    const decoder = new draco.Decoder();
                    const decoderBuffer = new draco.DecoderBuffer();
                    decoderBuffer.Init(new Int8Array(buffer), buffer.byteLength);
                    try {
                        const geometry = decodeGeometry(draco, decoder, decoderBuffer, taskConfig);
                        const buffers = geometry.attributes.map((attr)=>attr.array.buffer);
                        if (geometry.index) buffers.push(geometry.index.array.buffer);
                        self.postMessage({
                            type: "decode",
                            id: message.id,
                            geometry
                        }, buffers);
                    } catch (error) {
                        console.error(error);
                        self.postMessage({
                            type: "error",
                            id: message.id,
                            error: error.message
                        });
                    } finally{
                        draco.destroy(decoderBuffer);
                        draco.destroy(decoder);
                    }
                });
                break;
        }
    };
    function decodeGeometry(draco, decoder, decoderBuffer, taskConfig) {
        const attributeIDs = taskConfig.attributeIDs;
        const attributeTypes = taskConfig.attributeTypes;
        let dracoGeometry;
        let decodingStatus;
        const geometryType = decoder.GetEncodedGeometryType(decoderBuffer);
        if (geometryType === draco.TRIANGULAR_MESH) {
            dracoGeometry = new draco.Mesh();
            decodingStatus = decoder.DecodeBufferToMesh(decoderBuffer, dracoGeometry);
        } else if (geometryType === draco.POINT_CLOUD) {
            dracoGeometry = new draco.PointCloud();
            decodingStatus = decoder.DecodeBufferToPointCloud(decoderBuffer, dracoGeometry);
        } else {
            throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
        }
        if (!decodingStatus.ok() || dracoGeometry.ptr === 0) {
            throw new Error("THREE.DRACOLoader: Decoding failed: " + decodingStatus.error_msg());
        }
        const geometry = {
            index: null,
            attributes: []
        };
        for(const attributeName in attributeIDs){
            const attributeType = self[attributeTypes[attributeName]];
            let attribute;
            let attributeID;
            if (taskConfig.useUniqueIDs) {
                attributeID = attributeIDs[attributeName];
                attribute = decoder.GetAttributeByUniqueId(dracoGeometry, attributeID);
            } else {
                attributeID = decoder.GetAttributeId(dracoGeometry, draco[attributeIDs[attributeName]]);
                if (attributeID === -1) continue;
                attribute = decoder.GetAttribute(dracoGeometry, attributeID);
            }
            geometry.attributes.push(decodeAttribute(draco, decoder, dracoGeometry, attributeName, attributeType, attribute));
        }
        if (geometryType === draco.TRIANGULAR_MESH) {
            geometry.index = decodeIndex(draco, decoder, dracoGeometry);
        }
        draco.destroy(dracoGeometry);
        return geometry;
    }
    function decodeIndex(draco, decoder, dracoGeometry) {
        const numFaces = dracoGeometry.num_faces();
        const numIndices = numFaces * 3;
        const byteLength = numIndices * 4;
        const ptr = draco._malloc(byteLength);
        decoder.GetTrianglesUInt32Array(dracoGeometry, byteLength, ptr);
        const index = new Uint32Array(draco.HEAPF32.buffer, ptr, numIndices).slice();
        draco._free(ptr);
        return {
            array: index,
            itemSize: 1
        };
    }
    function decodeAttribute(draco, decoder, dracoGeometry, attributeName, attributeType, attribute) {
        const numComponents = attribute.num_components();
        const numPoints = dracoGeometry.num_points();
        const numValues = numPoints * numComponents;
        const byteLength = numValues * attributeType.BYTES_PER_ELEMENT;
        const dataType = getDracoDataType(draco, attributeType);
        const ptr = draco._malloc(byteLength);
        decoder.GetAttributeDataArrayForAllPoints(dracoGeometry, attribute, dataType, byteLength, ptr);
        const array = new attributeType(draco.HEAPF32.buffer, ptr, numValues).slice();
        draco._free(ptr);
        return {
            name: attributeName,
            array,
            itemSize: numComponents
        };
    }
    function getDracoDataType(draco, attributeType) {
        switch(attributeType){
            case Float32Array:
                return draco.DT_FLOAT32;
            case Int8Array:
                return draco.DT_INT8;
            case Int16Array:
                return draco.DT_INT16;
            case Int32Array:
                return draco.DT_INT32;
            case Uint8Array:
                return draco.DT_UINT8;
            case Uint16Array:
                return draco.DT_UINT16;
            case Uint32Array:
                return draco.DT_UINT32;
        }
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/loaders/EXRLoader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EXRLoader",
    ()=>EXRLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fflate$40$0$2e$6$2e$11$2f$node_modules$2f$fflate$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/fflate@0.6.11/node_modules/fflate/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/constants.js [app-ssr] (ecmascript)");
;
;
;
const hasColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["version"] >= 152;
class EXRLoader extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataTextureLoader"] {
    constructor(manager){
        super(manager);
        this.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"];
    }
    parse(buffer) {
        const USHORT_RANGE = 1 << 16;
        const BITMAP_SIZE = USHORT_RANGE >> 3;
        const HUF_ENCBITS = 16;
        const HUF_DECBITS = 14;
        const HUF_ENCSIZE = (1 << HUF_ENCBITS) + 1;
        const HUF_DECSIZE = 1 << HUF_DECBITS;
        const HUF_DECMASK = HUF_DECSIZE - 1;
        const NBITS = 16;
        const A_OFFSET = 1 << NBITS - 1;
        const MOD_MASK = (1 << NBITS) - 1;
        const SHORT_ZEROCODE_RUN = 59;
        const LONG_ZEROCODE_RUN = 63;
        const SHORTEST_LONG_RUN = 2 + LONG_ZEROCODE_RUN - SHORT_ZEROCODE_RUN;
        const ULONG_SIZE = 8;
        const FLOAT32_SIZE = 4;
        const INT32_SIZE = 4;
        const INT16_SIZE = 2;
        const INT8_SIZE = 1;
        const STATIC_HUFFMAN = 0;
        const DEFLATE = 1;
        const UNKNOWN = 0;
        const LOSSY_DCT = 1;
        const RLE = 2;
        const logBase = Math.pow(2.7182818, 2.2);
        function reverseLutFromBitmap(bitmap, lut) {
            var k = 0;
            for(var i = 0; i < USHORT_RANGE; ++i){
                if (i == 0 || bitmap[i >> 3] & 1 << (i & 7)) {
                    lut[k++] = i;
                }
            }
            var n = k - 1;
            while(k < USHORT_RANGE)lut[k++] = 0;
            return n;
        }
        function hufClearDecTable(hdec) {
            for(var i = 0; i < HUF_DECSIZE; i++){
                hdec[i] = {};
                hdec[i].len = 0;
                hdec[i].lit = 0;
                hdec[i].p = null;
            }
        }
        const getBitsReturn = {
            l: 0,
            c: 0,
            lc: 0
        };
        function getBits(nBits, c, lc, uInt8Array2, inOffset) {
            while(lc < nBits){
                c = c << 8 | parseUint8Array(uInt8Array2, inOffset);
                lc += 8;
            }
            lc -= nBits;
            getBitsReturn.l = c >> lc & (1 << nBits) - 1;
            getBitsReturn.c = c;
            getBitsReturn.lc = lc;
        }
        const hufTableBuffer = new Array(59);
        function hufCanonicalCodeTable(hcode) {
            for(var i = 0; i <= 58; ++i)hufTableBuffer[i] = 0;
            for(var i = 0; i < HUF_ENCSIZE; ++i)hufTableBuffer[hcode[i]] += 1;
            var c = 0;
            for(var i = 58; i > 0; --i){
                var nc = c + hufTableBuffer[i] >> 1;
                hufTableBuffer[i] = c;
                c = nc;
            }
            for(var i = 0; i < HUF_ENCSIZE; ++i){
                var l = hcode[i];
                if (l > 0) hcode[i] = l | hufTableBuffer[l]++ << 6;
            }
        }
        function hufUnpackEncTable(uInt8Array2, inDataView, inOffset, ni, im, iM, hcode) {
            var p = inOffset;
            var c = 0;
            var lc = 0;
            for(; im <= iM; im++){
                if (p.value - inOffset.value > ni) return false;
                getBits(6, c, lc, uInt8Array2, p);
                var l = getBitsReturn.l;
                c = getBitsReturn.c;
                lc = getBitsReturn.lc;
                hcode[im] = l;
                if (l == LONG_ZEROCODE_RUN) {
                    if (p.value - inOffset.value > ni) {
                        throw "Something wrong with hufUnpackEncTable";
                    }
                    getBits(8, c, lc, uInt8Array2, p);
                    var zerun = getBitsReturn.l + SHORTEST_LONG_RUN;
                    c = getBitsReturn.c;
                    lc = getBitsReturn.lc;
                    if (im + zerun > iM + 1) {
                        throw "Something wrong with hufUnpackEncTable";
                    }
                    while(zerun--)hcode[im++] = 0;
                    im--;
                } else if (l >= SHORT_ZEROCODE_RUN) {
                    var zerun = l - SHORT_ZEROCODE_RUN + 2;
                    if (im + zerun > iM + 1) {
                        throw "Something wrong with hufUnpackEncTable";
                    }
                    while(zerun--)hcode[im++] = 0;
                    im--;
                }
            }
            hufCanonicalCodeTable(hcode);
        }
        function hufLength(code) {
            return code & 63;
        }
        function hufCode(code) {
            return code >> 6;
        }
        function hufBuildDecTable(hcode, im, iM, hdecod) {
            for(; im <= iM; im++){
                var c = hufCode(hcode[im]);
                var l = hufLength(hcode[im]);
                if (c >> l) {
                    throw "Invalid table entry";
                }
                if (l > HUF_DECBITS) {
                    var pl = hdecod[c >> l - HUF_DECBITS];
                    if (pl.len) {
                        throw "Invalid table entry";
                    }
                    pl.lit++;
                    if (pl.p) {
                        var p = pl.p;
                        pl.p = new Array(pl.lit);
                        for(var i = 0; i < pl.lit - 1; ++i){
                            pl.p[i] = p[i];
                        }
                    } else {
                        pl.p = new Array(1);
                    }
                    pl.p[pl.lit - 1] = im;
                } else if (l) {
                    var plOffset = 0;
                    for(var i = 1 << HUF_DECBITS - l; i > 0; i--){
                        var pl = hdecod[(c << HUF_DECBITS - l) + plOffset];
                        if (pl.len || pl.p) {
                            throw "Invalid table entry";
                        }
                        pl.len = l;
                        pl.lit = im;
                        plOffset++;
                    }
                }
            }
            return true;
        }
        const getCharReturn = {
            c: 0,
            lc: 0
        };
        function getChar(c, lc, uInt8Array2, inOffset) {
            c = c << 8 | parseUint8Array(uInt8Array2, inOffset);
            lc += 8;
            getCharReturn.c = c;
            getCharReturn.lc = lc;
        }
        const getCodeReturn = {
            c: 0,
            lc: 0
        };
        function getCode(po, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outBufferOffset, outBufferEndOffset) {
            if (po == rlc) {
                if (lc < 8) {
                    getChar(c, lc, uInt8Array2, inOffset);
                    c = getCharReturn.c;
                    lc = getCharReturn.lc;
                }
                lc -= 8;
                var cs = c >> lc;
                var cs = new Uint8Array([
                    cs
                ])[0];
                if (outBufferOffset.value + cs > outBufferEndOffset) {
                    return false;
                }
                var s = outBuffer[outBufferOffset.value - 1];
                while(cs-- > 0){
                    outBuffer[outBufferOffset.value++] = s;
                }
            } else if (outBufferOffset.value < outBufferEndOffset) {
                outBuffer[outBufferOffset.value++] = po;
            } else {
                return false;
            }
            getCodeReturn.c = c;
            getCodeReturn.lc = lc;
        }
        function UInt16(value) {
            return value & 65535;
        }
        function Int16(value) {
            var ref = UInt16(value);
            return ref > 32767 ? ref - 65536 : ref;
        }
        const wdec14Return = {
            a: 0,
            b: 0
        };
        function wdec14(l, h) {
            var ls = Int16(l);
            var hs = Int16(h);
            var hi = hs;
            var ai = ls + (hi & 1) + (hi >> 1);
            var as = ai;
            var bs = ai - hi;
            wdec14Return.a = as;
            wdec14Return.b = bs;
        }
        function wdec16(l, h) {
            var m = UInt16(l);
            var d = UInt16(h);
            var bb = m - (d >> 1) & MOD_MASK;
            var aa = d + bb - A_OFFSET & MOD_MASK;
            wdec14Return.a = aa;
            wdec14Return.b = bb;
        }
        function wav2Decode(buffer2, j, nx, ox, ny, oy, mx) {
            var w14 = mx < 1 << 14;
            var n = nx > ny ? ny : nx;
            var p = 1;
            var p2;
            while(p <= n)p <<= 1;
            p >>= 1;
            p2 = p;
            p >>= 1;
            while(p >= 1){
                var py = 0;
                var ey = py + oy * (ny - p2);
                var oy1 = oy * p;
                var oy2 = oy * p2;
                var ox1 = ox * p;
                var ox2 = ox * p2;
                var i00, i01, i10, i11;
                for(; py <= ey; py += oy2){
                    var px = py;
                    var ex = py + ox * (nx - p2);
                    for(; px <= ex; px += ox2){
                        var p01 = px + ox1;
                        var p10 = px + oy1;
                        var p11 = p10 + ox1;
                        if (w14) {
                            wdec14(buffer2[px + j], buffer2[p10 + j]);
                            i00 = wdec14Return.a;
                            i10 = wdec14Return.b;
                            wdec14(buffer2[p01 + j], buffer2[p11 + j]);
                            i01 = wdec14Return.a;
                            i11 = wdec14Return.b;
                            wdec14(i00, i01);
                            buffer2[px + j] = wdec14Return.a;
                            buffer2[p01 + j] = wdec14Return.b;
                            wdec14(i10, i11);
                            buffer2[p10 + j] = wdec14Return.a;
                            buffer2[p11 + j] = wdec14Return.b;
                        } else {
                            wdec16(buffer2[px + j], buffer2[p10 + j]);
                            i00 = wdec14Return.a;
                            i10 = wdec14Return.b;
                            wdec16(buffer2[p01 + j], buffer2[p11 + j]);
                            i01 = wdec14Return.a;
                            i11 = wdec14Return.b;
                            wdec16(i00, i01);
                            buffer2[px + j] = wdec14Return.a;
                            buffer2[p01 + j] = wdec14Return.b;
                            wdec16(i10, i11);
                            buffer2[p10 + j] = wdec14Return.a;
                            buffer2[p11 + j] = wdec14Return.b;
                        }
                    }
                    if (nx & p) {
                        var p10 = px + oy1;
                        if (w14) wdec14(buffer2[px + j], buffer2[p10 + j]);
                        else wdec16(buffer2[px + j], buffer2[p10 + j]);
                        i00 = wdec14Return.a;
                        buffer2[p10 + j] = wdec14Return.b;
                        buffer2[px + j] = i00;
                    }
                }
                if (ny & p) {
                    var px = py;
                    var ex = py + ox * (nx - p2);
                    for(; px <= ex; px += ox2){
                        var p01 = px + ox1;
                        if (w14) wdec14(buffer2[px + j], buffer2[p01 + j]);
                        else wdec16(buffer2[px + j], buffer2[p01 + j]);
                        i00 = wdec14Return.a;
                        buffer2[p01 + j] = wdec14Return.b;
                        buffer2[px + j] = i00;
                    }
                }
                p2 = p;
                p >>= 1;
            }
            return py;
        }
        function hufDecode(encodingTable, decodingTable, uInt8Array2, inDataView, inOffset, ni, rlc, no, outBuffer, outOffset) {
            var c = 0;
            var lc = 0;
            var outBufferEndOffset = no;
            var inOffsetEnd = Math.trunc(inOffset.value + (ni + 7) / 8);
            while(inOffset.value < inOffsetEnd){
                getChar(c, lc, uInt8Array2, inOffset);
                c = getCharReturn.c;
                lc = getCharReturn.lc;
                while(lc >= HUF_DECBITS){
                    var index = c >> lc - HUF_DECBITS & HUF_DECMASK;
                    var pl = decodingTable[index];
                    if (pl.len) {
                        lc -= pl.len;
                        getCode(pl.lit, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
                        c = getCodeReturn.c;
                        lc = getCodeReturn.lc;
                    } else {
                        if (!pl.p) {
                            throw "hufDecode issues";
                        }
                        var j;
                        for(j = 0; j < pl.lit; j++){
                            var l = hufLength(encodingTable[pl.p[j]]);
                            while(lc < l && inOffset.value < inOffsetEnd){
                                getChar(c, lc, uInt8Array2, inOffset);
                                c = getCharReturn.c;
                                lc = getCharReturn.lc;
                            }
                            if (lc >= l) {
                                if (hufCode(encodingTable[pl.p[j]]) == (c >> lc - l & (1 << l) - 1)) {
                                    lc -= l;
                                    getCode(pl.p[j], rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
                                    c = getCodeReturn.c;
                                    lc = getCodeReturn.lc;
                                    break;
                                }
                            }
                        }
                        if (j == pl.lit) {
                            throw "hufDecode issues";
                        }
                    }
                }
            }
            var i = 8 - ni & 7;
            c >>= i;
            lc -= i;
            while(lc > 0){
                var pl = decodingTable[c << HUF_DECBITS - lc & HUF_DECMASK];
                if (pl.len) {
                    lc -= pl.len;
                    getCode(pl.lit, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
                    c = getCodeReturn.c;
                    lc = getCodeReturn.lc;
                } else {
                    throw "hufDecode issues";
                }
            }
            return true;
        }
        function hufUncompress(uInt8Array2, inDataView, inOffset, nCompressed, outBuffer, nRaw) {
            var outOffset = {
                value: 0
            };
            var initialInOffset = inOffset.value;
            var im = parseUint32(inDataView, inOffset);
            var iM = parseUint32(inDataView, inOffset);
            inOffset.value += 4;
            var nBits = parseUint32(inDataView, inOffset);
            inOffset.value += 4;
            if (im < 0 || im >= HUF_ENCSIZE || iM < 0 || iM >= HUF_ENCSIZE) {
                throw "Something wrong with HUF_ENCSIZE";
            }
            var freq = new Array(HUF_ENCSIZE);
            var hdec = new Array(HUF_DECSIZE);
            hufClearDecTable(hdec);
            var ni = nCompressed - (inOffset.value - initialInOffset);
            hufUnpackEncTable(uInt8Array2, inDataView, inOffset, ni, im, iM, freq);
            if (nBits > 8 * (nCompressed - (inOffset.value - initialInOffset))) {
                throw "Something wrong with hufUncompress";
            }
            hufBuildDecTable(freq, im, iM, hdec);
            hufDecode(freq, hdec, uInt8Array2, inDataView, inOffset, nBits, iM, nRaw, outBuffer, outOffset);
        }
        function applyLut(lut, data, nData) {
            for(var i = 0; i < nData; ++i){
                data[i] = lut[data[i]];
            }
        }
        function predictor(source) {
            for(var t = 1; t < source.length; t++){
                var d = source[t - 1] + source[t] - 128;
                source[t] = d;
            }
        }
        function interleaveScalar(source, out) {
            var t1 = 0;
            var t2 = Math.floor((source.length + 1) / 2);
            var s = 0;
            var stop = source.length - 1;
            while(true){
                if (s > stop) break;
                out[s++] = source[t1++];
                if (s > stop) break;
                out[s++] = source[t2++];
            }
        }
        function decodeRunLength(source) {
            var size = source.byteLength;
            var out = new Array();
            var p = 0;
            var reader = new DataView(source);
            while(size > 0){
                var l = reader.getInt8(p++);
                if (l < 0) {
                    var count = -l;
                    size -= count + 1;
                    for(var i = 0; i < count; i++){
                        out.push(reader.getUint8(p++));
                    }
                } else {
                    var count = l;
                    size -= 2;
                    var value = reader.getUint8(p++);
                    for(var i = 0; i < count + 1; i++){
                        out.push(value);
                    }
                }
            }
            return out;
        }
        function lossyDctDecode(cscSet, rowPtrs, channelData, acBuffer, dcBuffer, outBuffer) {
            var dataView = new DataView(outBuffer.buffer);
            var width = channelData[cscSet.idx[0]].width;
            var height = channelData[cscSet.idx[0]].height;
            var numComp = 3;
            var numFullBlocksX = Math.floor(width / 8);
            var numBlocksX = Math.ceil(width / 8);
            var numBlocksY = Math.ceil(height / 8);
            var leftoverX = width - (numBlocksX - 1) * 8;
            var leftoverY = height - (numBlocksY - 1) * 8;
            var currAcComp = {
                value: 0
            };
            var currDcComp = new Array(numComp);
            var dctData = new Array(numComp);
            var halfZigBlock = new Array(numComp);
            var rowBlock = new Array(numComp);
            var rowOffsets = new Array(numComp);
            for(let comp2 = 0; comp2 < numComp; ++comp2){
                rowOffsets[comp2] = rowPtrs[cscSet.idx[comp2]];
                currDcComp[comp2] = comp2 < 1 ? 0 : currDcComp[comp2 - 1] + numBlocksX * numBlocksY;
                dctData[comp2] = new Float32Array(64);
                halfZigBlock[comp2] = new Uint16Array(64);
                rowBlock[comp2] = new Uint16Array(numBlocksX * 64);
            }
            for(let blocky = 0; blocky < numBlocksY; ++blocky){
                var maxY = 8;
                if (blocky == numBlocksY - 1) maxY = leftoverY;
                var maxX = 8;
                for(let blockx = 0; blockx < numBlocksX; ++blockx){
                    if (blockx == numBlocksX - 1) maxX = leftoverX;
                    for(let comp2 = 0; comp2 < numComp; ++comp2){
                        halfZigBlock[comp2].fill(0);
                        halfZigBlock[comp2][0] = dcBuffer[currDcComp[comp2]++];
                        unRleAC(currAcComp, acBuffer, halfZigBlock[comp2]);
                        unZigZag(halfZigBlock[comp2], dctData[comp2]);
                        dctInverse(dctData[comp2]);
                    }
                    {
                        csc709Inverse(dctData);
                    }
                    for(let comp2 = 0; comp2 < numComp; ++comp2){
                        convertToHalf(dctData[comp2], rowBlock[comp2], blockx * 64);
                    }
                }
                let offset2 = 0;
                for(let comp2 = 0; comp2 < numComp; ++comp2){
                    const type2 = channelData[cscSet.idx[comp2]].type;
                    for(let y2 = 8 * blocky; y2 < 8 * blocky + maxY; ++y2){
                        offset2 = rowOffsets[comp2][y2];
                        for(let blockx = 0; blockx < numFullBlocksX; ++blockx){
                            const src = blockx * 64 + (y2 & 7) * 8;
                            dataView.setUint16(offset2 + 0 * INT16_SIZE * type2, rowBlock[comp2][src + 0], true);
                            dataView.setUint16(offset2 + 1 * INT16_SIZE * type2, rowBlock[comp2][src + 1], true);
                            dataView.setUint16(offset2 + 2 * INT16_SIZE * type2, rowBlock[comp2][src + 2], true);
                            dataView.setUint16(offset2 + 3 * INT16_SIZE * type2, rowBlock[comp2][src + 3], true);
                            dataView.setUint16(offset2 + 4 * INT16_SIZE * type2, rowBlock[comp2][src + 4], true);
                            dataView.setUint16(offset2 + 5 * INT16_SIZE * type2, rowBlock[comp2][src + 5], true);
                            dataView.setUint16(offset2 + 6 * INT16_SIZE * type2, rowBlock[comp2][src + 6], true);
                            dataView.setUint16(offset2 + 7 * INT16_SIZE * type2, rowBlock[comp2][src + 7], true);
                            offset2 += 8 * INT16_SIZE * type2;
                        }
                    }
                    if (numFullBlocksX != numBlocksX) {
                        for(let y2 = 8 * blocky; y2 < 8 * blocky + maxY; ++y2){
                            const offset3 = rowOffsets[comp2][y2] + 8 * numFullBlocksX * INT16_SIZE * type2;
                            const src = numFullBlocksX * 64 + (y2 & 7) * 8;
                            for(let x2 = 0; x2 < maxX; ++x2){
                                dataView.setUint16(offset3 + x2 * INT16_SIZE * type2, rowBlock[comp2][src + x2], true);
                            }
                        }
                    }
                }
            }
            var halfRow = new Uint16Array(width);
            var dataView = new DataView(outBuffer.buffer);
            for(var comp = 0; comp < numComp; ++comp){
                channelData[cscSet.idx[comp]].decoded = true;
                var type = channelData[cscSet.idx[comp]].type;
                if (channelData[comp].type != 2) continue;
                for(var y = 0; y < height; ++y){
                    const offset2 = rowOffsets[comp][y];
                    for(var x = 0; x < width; ++x){
                        halfRow[x] = dataView.getUint16(offset2 + x * INT16_SIZE * type, true);
                    }
                    for(var x = 0; x < width; ++x){
                        dataView.setFloat32(offset2 + x * INT16_SIZE * type, decodeFloat16(halfRow[x]), true);
                    }
                }
            }
        }
        function unRleAC(currAcComp, acBuffer, halfZigBlock) {
            var acValue;
            var dctComp = 1;
            while(dctComp < 64){
                acValue = acBuffer[currAcComp.value];
                if (acValue == 65280) {
                    dctComp = 64;
                } else if (acValue >> 8 == 255) {
                    dctComp += acValue & 255;
                } else {
                    halfZigBlock[dctComp] = acValue;
                    dctComp++;
                }
                currAcComp.value++;
            }
        }
        function unZigZag(src, dst) {
            dst[0] = decodeFloat16(src[0]);
            dst[1] = decodeFloat16(src[1]);
            dst[2] = decodeFloat16(src[5]);
            dst[3] = decodeFloat16(src[6]);
            dst[4] = decodeFloat16(src[14]);
            dst[5] = decodeFloat16(src[15]);
            dst[6] = decodeFloat16(src[27]);
            dst[7] = decodeFloat16(src[28]);
            dst[8] = decodeFloat16(src[2]);
            dst[9] = decodeFloat16(src[4]);
            dst[10] = decodeFloat16(src[7]);
            dst[11] = decodeFloat16(src[13]);
            dst[12] = decodeFloat16(src[16]);
            dst[13] = decodeFloat16(src[26]);
            dst[14] = decodeFloat16(src[29]);
            dst[15] = decodeFloat16(src[42]);
            dst[16] = decodeFloat16(src[3]);
            dst[17] = decodeFloat16(src[8]);
            dst[18] = decodeFloat16(src[12]);
            dst[19] = decodeFloat16(src[17]);
            dst[20] = decodeFloat16(src[25]);
            dst[21] = decodeFloat16(src[30]);
            dst[22] = decodeFloat16(src[41]);
            dst[23] = decodeFloat16(src[43]);
            dst[24] = decodeFloat16(src[9]);
            dst[25] = decodeFloat16(src[11]);
            dst[26] = decodeFloat16(src[18]);
            dst[27] = decodeFloat16(src[24]);
            dst[28] = decodeFloat16(src[31]);
            dst[29] = decodeFloat16(src[40]);
            dst[30] = decodeFloat16(src[44]);
            dst[31] = decodeFloat16(src[53]);
            dst[32] = decodeFloat16(src[10]);
            dst[33] = decodeFloat16(src[19]);
            dst[34] = decodeFloat16(src[23]);
            dst[35] = decodeFloat16(src[32]);
            dst[36] = decodeFloat16(src[39]);
            dst[37] = decodeFloat16(src[45]);
            dst[38] = decodeFloat16(src[52]);
            dst[39] = decodeFloat16(src[54]);
            dst[40] = decodeFloat16(src[20]);
            dst[41] = decodeFloat16(src[22]);
            dst[42] = decodeFloat16(src[33]);
            dst[43] = decodeFloat16(src[38]);
            dst[44] = decodeFloat16(src[46]);
            dst[45] = decodeFloat16(src[51]);
            dst[46] = decodeFloat16(src[55]);
            dst[47] = decodeFloat16(src[60]);
            dst[48] = decodeFloat16(src[21]);
            dst[49] = decodeFloat16(src[34]);
            dst[50] = decodeFloat16(src[37]);
            dst[51] = decodeFloat16(src[47]);
            dst[52] = decodeFloat16(src[50]);
            dst[53] = decodeFloat16(src[56]);
            dst[54] = decodeFloat16(src[59]);
            dst[55] = decodeFloat16(src[61]);
            dst[56] = decodeFloat16(src[35]);
            dst[57] = decodeFloat16(src[36]);
            dst[58] = decodeFloat16(src[48]);
            dst[59] = decodeFloat16(src[49]);
            dst[60] = decodeFloat16(src[57]);
            dst[61] = decodeFloat16(src[58]);
            dst[62] = decodeFloat16(src[62]);
            dst[63] = decodeFloat16(src[63]);
        }
        function dctInverse(data) {
            const a = 0.5 * Math.cos(3.14159 / 4);
            const b = 0.5 * Math.cos(3.14159 / 16);
            const c = 0.5 * Math.cos(3.14159 / 8);
            const d = 0.5 * Math.cos(3 * 3.14159 / 16);
            const e = 0.5 * Math.cos(5 * 3.14159 / 16);
            const f = 0.5 * Math.cos(3 * 3.14159 / 8);
            const g = 0.5 * Math.cos(7 * 3.14159 / 16);
            var alpha = new Array(4);
            var beta = new Array(4);
            var theta = new Array(4);
            var gamma = new Array(4);
            for(var row = 0; row < 8; ++row){
                var rowPtr = row * 8;
                alpha[0] = c * data[rowPtr + 2];
                alpha[1] = f * data[rowPtr + 2];
                alpha[2] = c * data[rowPtr + 6];
                alpha[3] = f * data[rowPtr + 6];
                beta[0] = b * data[rowPtr + 1] + d * data[rowPtr + 3] + e * data[rowPtr + 5] + g * data[rowPtr + 7];
                beta[1] = d * data[rowPtr + 1] - g * data[rowPtr + 3] - b * data[rowPtr + 5] - e * data[rowPtr + 7];
                beta[2] = e * data[rowPtr + 1] - b * data[rowPtr + 3] + g * data[rowPtr + 5] + d * data[rowPtr + 7];
                beta[3] = g * data[rowPtr + 1] - e * data[rowPtr + 3] + d * data[rowPtr + 5] - b * data[rowPtr + 7];
                theta[0] = a * (data[rowPtr + 0] + data[rowPtr + 4]);
                theta[3] = a * (data[rowPtr + 0] - data[rowPtr + 4]);
                theta[1] = alpha[0] + alpha[3];
                theta[2] = alpha[1] - alpha[2];
                gamma[0] = theta[0] + theta[1];
                gamma[1] = theta[3] + theta[2];
                gamma[2] = theta[3] - theta[2];
                gamma[3] = theta[0] - theta[1];
                data[rowPtr + 0] = gamma[0] + beta[0];
                data[rowPtr + 1] = gamma[1] + beta[1];
                data[rowPtr + 2] = gamma[2] + beta[2];
                data[rowPtr + 3] = gamma[3] + beta[3];
                data[rowPtr + 4] = gamma[3] - beta[3];
                data[rowPtr + 5] = gamma[2] - beta[2];
                data[rowPtr + 6] = gamma[1] - beta[1];
                data[rowPtr + 7] = gamma[0] - beta[0];
            }
            for(var column = 0; column < 8; ++column){
                alpha[0] = c * data[16 + column];
                alpha[1] = f * data[16 + column];
                alpha[2] = c * data[48 + column];
                alpha[3] = f * data[48 + column];
                beta[0] = b * data[8 + column] + d * data[24 + column] + e * data[40 + column] + g * data[56 + column];
                beta[1] = d * data[8 + column] - g * data[24 + column] - b * data[40 + column] - e * data[56 + column];
                beta[2] = e * data[8 + column] - b * data[24 + column] + g * data[40 + column] + d * data[56 + column];
                beta[3] = g * data[8 + column] - e * data[24 + column] + d * data[40 + column] - b * data[56 + column];
                theta[0] = a * (data[column] + data[32 + column]);
                theta[3] = a * (data[column] - data[32 + column]);
                theta[1] = alpha[0] + alpha[3];
                theta[2] = alpha[1] - alpha[2];
                gamma[0] = theta[0] + theta[1];
                gamma[1] = theta[3] + theta[2];
                gamma[2] = theta[3] - theta[2];
                gamma[3] = theta[0] - theta[1];
                data[0 + column] = gamma[0] + beta[0];
                data[8 + column] = gamma[1] + beta[1];
                data[16 + column] = gamma[2] + beta[2];
                data[24 + column] = gamma[3] + beta[3];
                data[32 + column] = gamma[3] - beta[3];
                data[40 + column] = gamma[2] - beta[2];
                data[48 + column] = gamma[1] - beta[1];
                data[56 + column] = gamma[0] - beta[0];
            }
        }
        function csc709Inverse(data) {
            for(var i = 0; i < 64; ++i){
                var y = data[0][i];
                var cb = data[1][i];
                var cr = data[2][i];
                data[0][i] = y + 1.5747 * cr;
                data[1][i] = y - 0.1873 * cb - 0.4682 * cr;
                data[2][i] = y + 1.8556 * cb;
            }
        }
        function convertToHalf(src, dst, idx) {
            for(var i = 0; i < 64; ++i){
                dst[idx + i] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(toLinear(src[i]));
            }
        }
        function toLinear(float) {
            if (float <= 1) {
                return Math.sign(float) * Math.pow(Math.abs(float), 2.2);
            } else {
                return Math.sign(float) * Math.pow(logBase, Math.abs(float) - 1);
            }
        }
        function uncompressRAW(info) {
            return new DataView(info.array.buffer, info.offset.value, info.size);
        }
        function uncompressRLE(info) {
            var compressed = info.viewer.buffer.slice(info.offset.value, info.offset.value + info.size);
            var rawBuffer = new Uint8Array(decodeRunLength(compressed));
            var tmpBuffer = new Uint8Array(rawBuffer.length);
            predictor(rawBuffer);
            interleaveScalar(rawBuffer, tmpBuffer);
            return new DataView(tmpBuffer.buffer);
        }
        function uncompressZIP(info) {
            var compressed = info.array.slice(info.offset.value, info.offset.value + info.size);
            var rawBuffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fflate$40$0$2e$6$2e$11$2f$node_modules$2f$fflate$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unzlibSync"])(compressed);
            var tmpBuffer = new Uint8Array(rawBuffer.length);
            predictor(rawBuffer);
            interleaveScalar(rawBuffer, tmpBuffer);
            return new DataView(tmpBuffer.buffer);
        }
        function uncompressPIZ(info) {
            var inDataView = info.viewer;
            var inOffset = {
                value: info.offset.value
            };
            var outBuffer = new Uint16Array(info.width * info.scanlineBlockSize * (info.channels * info.type));
            var bitmap = new Uint8Array(BITMAP_SIZE);
            var outBufferEnd = 0;
            var pizChannelData = new Array(info.channels);
            for(var i = 0; i < info.channels; i++){
                pizChannelData[i] = {};
                pizChannelData[i]["start"] = outBufferEnd;
                pizChannelData[i]["end"] = pizChannelData[i]["start"];
                pizChannelData[i]["nx"] = info.width;
                pizChannelData[i]["ny"] = info.lines;
                pizChannelData[i]["size"] = info.type;
                outBufferEnd += pizChannelData[i].nx * pizChannelData[i].ny * pizChannelData[i].size;
            }
            var minNonZero = parseUint16(inDataView, inOffset);
            var maxNonZero = parseUint16(inDataView, inOffset);
            if (maxNonZero >= BITMAP_SIZE) {
                throw "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";
            }
            if (minNonZero <= maxNonZero) {
                for(var i = 0; i < maxNonZero - minNonZero + 1; i++){
                    bitmap[i + minNonZero] = parseUint8(inDataView, inOffset);
                }
            }
            var lut = new Uint16Array(USHORT_RANGE);
            var maxValue = reverseLutFromBitmap(bitmap, lut);
            var length = parseUint32(inDataView, inOffset);
            hufUncompress(info.array, inDataView, inOffset, length, outBuffer, outBufferEnd);
            for(var i = 0; i < info.channels; ++i){
                var cd = pizChannelData[i];
                for(var j = 0; j < pizChannelData[i].size; ++j){
                    wav2Decode(outBuffer, cd.start + j, cd.nx, cd.size, cd.ny, cd.nx * cd.size, maxValue);
                }
            }
            applyLut(lut, outBuffer, outBufferEnd);
            var tmpOffset2 = 0;
            var tmpBuffer = new Uint8Array(outBuffer.buffer.byteLength);
            for(var y = 0; y < info.lines; y++){
                for(var c = 0; c < info.channels; c++){
                    var cd = pizChannelData[c];
                    var n = cd.nx * cd.size;
                    var cp = new Uint8Array(outBuffer.buffer, cd.end * INT16_SIZE, n * INT16_SIZE);
                    tmpBuffer.set(cp, tmpOffset2);
                    tmpOffset2 += n * INT16_SIZE;
                    cd.end += n;
                }
            }
            return new DataView(tmpBuffer.buffer);
        }
        function uncompressPXR(info) {
            var compressed = info.array.slice(info.offset.value, info.offset.value + info.size);
            var rawBuffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fflate$40$0$2e$6$2e$11$2f$node_modules$2f$fflate$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unzlibSync"])(compressed);
            const sz = info.lines * info.channels * info.width;
            const tmpBuffer = info.type == 1 ? new Uint16Array(sz) : new Uint32Array(sz);
            let tmpBufferEnd = 0;
            let writePtr = 0;
            const ptr = new Array(4);
            for(let y = 0; y < info.lines; y++){
                for(let c = 0; c < info.channels; c++){
                    let pixel = 0;
                    switch(info.type){
                        case 1:
                            ptr[0] = tmpBufferEnd;
                            ptr[1] = ptr[0] + info.width;
                            tmpBufferEnd = ptr[1] + info.width;
                            for(let j = 0; j < info.width; ++j){
                                const diff = rawBuffer[ptr[0]++] << 8 | rawBuffer[ptr[1]++];
                                pixel += diff;
                                tmpBuffer[writePtr] = pixel;
                                writePtr++;
                            }
                            break;
                        case 2:
                            ptr[0] = tmpBufferEnd;
                            ptr[1] = ptr[0] + info.width;
                            ptr[2] = ptr[1] + info.width;
                            tmpBufferEnd = ptr[2] + info.width;
                            for(let j = 0; j < info.width; ++j){
                                const diff = rawBuffer[ptr[0]++] << 24 | rawBuffer[ptr[1]++] << 16 | rawBuffer[ptr[2]++] << 8;
                                pixel += diff;
                                tmpBuffer[writePtr] = pixel;
                                writePtr++;
                            }
                            break;
                    }
                }
            }
            return new DataView(tmpBuffer.buffer);
        }
        function uncompressDWA(info) {
            var inDataView = info.viewer;
            var inOffset = {
                value: info.offset.value
            };
            var outBuffer = new Uint8Array(info.width * info.lines * (info.channels * info.type * INT16_SIZE));
            var dwaHeader = {
                version: parseInt64(inDataView, inOffset),
                unknownUncompressedSize: parseInt64(inDataView, inOffset),
                unknownCompressedSize: parseInt64(inDataView, inOffset),
                acCompressedSize: parseInt64(inDataView, inOffset),
                dcCompressedSize: parseInt64(inDataView, inOffset),
                rleCompressedSize: parseInt64(inDataView, inOffset),
                rleUncompressedSize: parseInt64(inDataView, inOffset),
                rleRawSize: parseInt64(inDataView, inOffset),
                totalAcUncompressedCount: parseInt64(inDataView, inOffset),
                totalDcUncompressedCount: parseInt64(inDataView, inOffset),
                acCompression: parseInt64(inDataView, inOffset)
            };
            if (dwaHeader.version < 2) {
                throw "EXRLoader.parse: " + EXRHeader.compression + " version " + dwaHeader.version + " is unsupported";
            }
            var channelRules = new Array();
            var ruleSize = parseUint16(inDataView, inOffset) - INT16_SIZE;
            while(ruleSize > 0){
                var name = parseNullTerminatedString(inDataView.buffer, inOffset);
                var value = parseUint8(inDataView, inOffset);
                var compression = value >> 2 & 3;
                var csc = (value >> 4) - 1;
                var index = new Int8Array([
                    csc
                ])[0];
                var type = parseUint8(inDataView, inOffset);
                channelRules.push({
                    name,
                    index,
                    type,
                    compression
                });
                ruleSize -= name.length + 3;
            }
            var channels = EXRHeader.channels;
            var channelData = new Array(info.channels);
            for(var i = 0; i < info.channels; ++i){
                var cd = channelData[i] = {};
                var channel = channels[i];
                cd.name = channel.name;
                cd.compression = UNKNOWN;
                cd.decoded = false;
                cd.type = channel.pixelType;
                cd.pLinear = channel.pLinear;
                cd.width = info.width;
                cd.height = info.lines;
            }
            var cscSet = {
                idx: new Array(3)
            };
            for(var offset2 = 0; offset2 < info.channels; ++offset2){
                var cd = channelData[offset2];
                for(var i = 0; i < channelRules.length; ++i){
                    var rule = channelRules[i];
                    if (cd.name == rule.name) {
                        cd.compression = rule.compression;
                        if (rule.index >= 0) {
                            cscSet.idx[rule.index] = offset2;
                        }
                        cd.offset = offset2;
                    }
                }
            }
            if (dwaHeader.acCompressedSize > 0) {
                switch(dwaHeader.acCompression){
                    case STATIC_HUFFMAN:
                        var acBuffer = new Uint16Array(dwaHeader.totalAcUncompressedCount);
                        hufUncompress(info.array, inDataView, inOffset, dwaHeader.acCompressedSize, acBuffer, dwaHeader.totalAcUncompressedCount);
                        break;
                    case DEFLATE:
                        var compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.totalAcUncompressedCount);
                        var data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fflate$40$0$2e$6$2e$11$2f$node_modules$2f$fflate$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unzlibSync"])(compressed);
                        var acBuffer = new Uint16Array(data.buffer);
                        inOffset.value += dwaHeader.totalAcUncompressedCount;
                        break;
                }
            }
            if (dwaHeader.dcCompressedSize > 0) {
                var zlibInfo = {
                    array: info.array,
                    offset: inOffset,
                    size: dwaHeader.dcCompressedSize
                };
                var dcBuffer = new Uint16Array(uncompressZIP(zlibInfo).buffer);
                inOffset.value += dwaHeader.dcCompressedSize;
            }
            if (dwaHeader.rleRawSize > 0) {
                var compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.rleCompressedSize);
                var data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fflate$40$0$2e$6$2e$11$2f$node_modules$2f$fflate$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unzlibSync"])(compressed);
                var rleBuffer = decodeRunLength(data.buffer);
                inOffset.value += dwaHeader.rleCompressedSize;
            }
            var outBufferEnd = 0;
            var rowOffsets = new Array(channelData.length);
            for(var i = 0; i < rowOffsets.length; ++i){
                rowOffsets[i] = new Array();
            }
            for(var y = 0; y < info.lines; ++y){
                for(var chan = 0; chan < channelData.length; ++chan){
                    rowOffsets[chan].push(outBufferEnd);
                    outBufferEnd += channelData[chan].width * info.type * INT16_SIZE;
                }
            }
            lossyDctDecode(cscSet, rowOffsets, channelData, acBuffer, dcBuffer, outBuffer);
            for(var i = 0; i < channelData.length; ++i){
                var cd = channelData[i];
                if (cd.decoded) continue;
                switch(cd.compression){
                    case RLE:
                        var row = 0;
                        var rleOffset = 0;
                        for(var y = 0; y < info.lines; ++y){
                            var rowOffsetBytes = rowOffsets[i][row];
                            for(var x = 0; x < cd.width; ++x){
                                for(var byte = 0; byte < INT16_SIZE * cd.type; ++byte){
                                    outBuffer[rowOffsetBytes++] = rleBuffer[rleOffset + byte * cd.width * cd.height];
                                }
                                rleOffset++;
                            }
                            row++;
                        }
                        break;
                    case LOSSY_DCT:
                    default:
                        throw "EXRLoader.parse: unsupported channel compression";
                }
            }
            return new DataView(outBuffer.buffer);
        }
        function parseNullTerminatedString(buffer2, offset2) {
            var uintBuffer = new Uint8Array(buffer2);
            var endOffset = 0;
            while(uintBuffer[offset2.value + endOffset] != 0){
                endOffset += 1;
            }
            var stringValue = new TextDecoder().decode(uintBuffer.slice(offset2.value, offset2.value + endOffset));
            offset2.value = offset2.value + endOffset + 1;
            return stringValue;
        }
        function parseFixedLengthString(buffer2, offset2, size) {
            var stringValue = new TextDecoder().decode(new Uint8Array(buffer2).slice(offset2.value, offset2.value + size));
            offset2.value = offset2.value + size;
            return stringValue;
        }
        function parseRational(dataView, offset2) {
            var x = parseInt32(dataView, offset2);
            var y = parseUint32(dataView, offset2);
            return [
                x,
                y
            ];
        }
        function parseTimecode(dataView, offset2) {
            var x = parseUint32(dataView, offset2);
            var y = parseUint32(dataView, offset2);
            return [
                x,
                y
            ];
        }
        function parseInt32(dataView, offset2) {
            var Int32 = dataView.getInt32(offset2.value, true);
            offset2.value = offset2.value + INT32_SIZE;
            return Int32;
        }
        function parseUint32(dataView, offset2) {
            var Uint32 = dataView.getUint32(offset2.value, true);
            offset2.value = offset2.value + INT32_SIZE;
            return Uint32;
        }
        function parseUint8Array(uInt8Array2, offset2) {
            var Uint8 = uInt8Array2[offset2.value];
            offset2.value = offset2.value + INT8_SIZE;
            return Uint8;
        }
        function parseUint8(dataView, offset2) {
            var Uint8 = dataView.getUint8(offset2.value);
            offset2.value = offset2.value + INT8_SIZE;
            return Uint8;
        }
        const parseInt64 = function(dataView, offset2) {
            let int;
            if ("getBigInt64" in DataView.prototype) {
                int = Number(dataView.getBigInt64(offset2.value, true));
            } else {
                int = dataView.getUint32(offset2.value + 4, true) + Number(dataView.getUint32(offset2.value, true) << 32);
            }
            offset2.value += ULONG_SIZE;
            return int;
        };
        function parseFloat32(dataView, offset2) {
            var float = dataView.getFloat32(offset2.value, true);
            offset2.value += FLOAT32_SIZE;
            return float;
        }
        function decodeFloat32(dataView, offset2) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(parseFloat32(dataView, offset2));
        }
        function decodeFloat16(binary) {
            var exponent = (binary & 31744) >> 10, fraction = binary & 1023;
            return (binary >> 15 ? -1 : 1) * (exponent ? exponent === 31 ? fraction ? NaN : Infinity : Math.pow(2, exponent - 15) * (1 + fraction / 1024) : 6103515625e-14 * (fraction / 1024));
        }
        function parseUint16(dataView, offset2) {
            var Uint16 = dataView.getUint16(offset2.value, true);
            offset2.value += INT16_SIZE;
            return Uint16;
        }
        function parseFloat16(buffer2, offset2) {
            return decodeFloat16(parseUint16(buffer2, offset2));
        }
        function parseChlist(dataView, buffer2, offset2, size) {
            var startOffset = offset2.value;
            var channels = [];
            while(offset2.value < startOffset + size - 1){
                var name = parseNullTerminatedString(buffer2, offset2);
                var pixelType = parseInt32(dataView, offset2);
                var pLinear = parseUint8(dataView, offset2);
                offset2.value += 3;
                var xSampling = parseInt32(dataView, offset2);
                var ySampling = parseInt32(dataView, offset2);
                channels.push({
                    name,
                    pixelType,
                    pLinear,
                    xSampling,
                    ySampling
                });
            }
            offset2.value += 1;
            return channels;
        }
        function parseChromaticities(dataView, offset2) {
            var redX = parseFloat32(dataView, offset2);
            var redY = parseFloat32(dataView, offset2);
            var greenX = parseFloat32(dataView, offset2);
            var greenY = parseFloat32(dataView, offset2);
            var blueX = parseFloat32(dataView, offset2);
            var blueY = parseFloat32(dataView, offset2);
            var whiteX = parseFloat32(dataView, offset2);
            var whiteY = parseFloat32(dataView, offset2);
            return {
                redX,
                redY,
                greenX,
                greenY,
                blueX,
                blueY,
                whiteX,
                whiteY
            };
        }
        function parseCompression(dataView, offset2) {
            var compressionCodes = [
                "NO_COMPRESSION",
                "RLE_COMPRESSION",
                "ZIPS_COMPRESSION",
                "ZIP_COMPRESSION",
                "PIZ_COMPRESSION",
                "PXR24_COMPRESSION",
                "B44_COMPRESSION",
                "B44A_COMPRESSION",
                "DWAA_COMPRESSION",
                "DWAB_COMPRESSION"
            ];
            var compression = parseUint8(dataView, offset2);
            return compressionCodes[compression];
        }
        function parseBox2i(dataView, offset2) {
            var xMin = parseUint32(dataView, offset2);
            var yMin = parseUint32(dataView, offset2);
            var xMax = parseUint32(dataView, offset2);
            var yMax = parseUint32(dataView, offset2);
            return {
                xMin,
                yMin,
                xMax,
                yMax
            };
        }
        function parseLineOrder(dataView, offset2) {
            var lineOrders = [
                "INCREASING_Y"
            ];
            var lineOrder = parseUint8(dataView, offset2);
            return lineOrders[lineOrder];
        }
        function parseV2f(dataView, offset2) {
            var x = parseFloat32(dataView, offset2);
            var y = parseFloat32(dataView, offset2);
            return [
                x,
                y
            ];
        }
        function parseV3f(dataView, offset2) {
            var x = parseFloat32(dataView, offset2);
            var y = parseFloat32(dataView, offset2);
            var z = parseFloat32(dataView, offset2);
            return [
                x,
                y,
                z
            ];
        }
        function parseValue(dataView, buffer2, offset2, type, size) {
            if (type === "string" || type === "stringvector" || type === "iccProfile") {
                return parseFixedLengthString(buffer2, offset2, size);
            } else if (type === "chlist") {
                return parseChlist(dataView, buffer2, offset2, size);
            } else if (type === "chromaticities") {
                return parseChromaticities(dataView, offset2);
            } else if (type === "compression") {
                return parseCompression(dataView, offset2);
            } else if (type === "box2i") {
                return parseBox2i(dataView, offset2);
            } else if (type === "lineOrder") {
                return parseLineOrder(dataView, offset2);
            } else if (type === "float") {
                return parseFloat32(dataView, offset2);
            } else if (type === "v2f") {
                return parseV2f(dataView, offset2);
            } else if (type === "v3f") {
                return parseV3f(dataView, offset2);
            } else if (type === "int") {
                return parseInt32(dataView, offset2);
            } else if (type === "rational") {
                return parseRational(dataView, offset2);
            } else if (type === "timecode") {
                return parseTimecode(dataView, offset2);
            } else if (type === "preview") {
                offset2.value += size;
                return "skipped";
            } else {
                offset2.value += size;
                return void 0;
            }
        }
        function parseHeader(dataView, buffer2, offset2) {
            const EXRHeader2 = {};
            if (dataView.getUint32(0, true) != 20000630) {
                throw "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";
            }
            EXRHeader2.version = dataView.getUint8(4);
            const spec = dataView.getUint8(5);
            EXRHeader2.spec = {
                singleTile: !!(spec & 2),
                longName: !!(spec & 4),
                deepFormat: !!(spec & 8),
                multiPart: !!(spec & 16)
            };
            offset2.value = 8;
            var keepReading = true;
            while(keepReading){
                var attributeName = parseNullTerminatedString(buffer2, offset2);
                if (attributeName == 0) {
                    keepReading = false;
                } else {
                    var attributeType = parseNullTerminatedString(buffer2, offset2);
                    var attributeSize = parseUint32(dataView, offset2);
                    var attributeValue = parseValue(dataView, buffer2, offset2, attributeType, attributeSize);
                    if (attributeValue === void 0) {
                        console.warn(`EXRLoader.parse: skipped unknown header attribute type '${attributeType}'.`);
                    } else {
                        EXRHeader2[attributeName] = attributeValue;
                    }
                }
            }
            if ((spec & ~4) != 0) {
                console.error("EXRHeader:", EXRHeader2);
                throw "THREE.EXRLoader: provided file is currently unsupported.";
            }
            return EXRHeader2;
        }
        function setupDecoder(EXRHeader2, dataView, uInt8Array2, offset2, outputType) {
            const EXRDecoder2 = {
                size: 0,
                viewer: dataView,
                array: uInt8Array2,
                offset: offset2,
                width: EXRHeader2.dataWindow.xMax - EXRHeader2.dataWindow.xMin + 1,
                height: EXRHeader2.dataWindow.yMax - EXRHeader2.dataWindow.yMin + 1,
                channels: EXRHeader2.channels.length,
                bytesPerLine: null,
                lines: null,
                inputSize: null,
                type: EXRHeader2.channels[0].pixelType,
                uncompress: null,
                getter: null,
                format: null,
                [hasColorSpace ? "colorSpace" : "encoding"]: null
            };
            switch(EXRHeader2.compression){
                case "NO_COMPRESSION":
                    EXRDecoder2.lines = 1;
                    EXRDecoder2.uncompress = uncompressRAW;
                    break;
                case "RLE_COMPRESSION":
                    EXRDecoder2.lines = 1;
                    EXRDecoder2.uncompress = uncompressRLE;
                    break;
                case "ZIPS_COMPRESSION":
                    EXRDecoder2.lines = 1;
                    EXRDecoder2.uncompress = uncompressZIP;
                    break;
                case "ZIP_COMPRESSION":
                    EXRDecoder2.lines = 16;
                    EXRDecoder2.uncompress = uncompressZIP;
                    break;
                case "PIZ_COMPRESSION":
                    EXRDecoder2.lines = 32;
                    EXRDecoder2.uncompress = uncompressPIZ;
                    break;
                case "PXR24_COMPRESSION":
                    EXRDecoder2.lines = 16;
                    EXRDecoder2.uncompress = uncompressPXR;
                    break;
                case "DWAA_COMPRESSION":
                    EXRDecoder2.lines = 32;
                    EXRDecoder2.uncompress = uncompressDWA;
                    break;
                case "DWAB_COMPRESSION":
                    EXRDecoder2.lines = 256;
                    EXRDecoder2.uncompress = uncompressDWA;
                    break;
                default:
                    throw "EXRLoader.parse: " + EXRHeader2.compression + " is unsupported";
            }
            EXRDecoder2.scanlineBlockSize = EXRDecoder2.lines;
            if (EXRDecoder2.type == 1) {
                switch(outputType){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatType"]:
                        EXRDecoder2.getter = parseFloat16;
                        EXRDecoder2.inputSize = INT16_SIZE;
                        break;
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                        EXRDecoder2.getter = parseUint16;
                        EXRDecoder2.inputSize = INT16_SIZE;
                        break;
                }
            } else if (EXRDecoder2.type == 2) {
                switch(outputType){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatType"]:
                        EXRDecoder2.getter = parseFloat32;
                        EXRDecoder2.inputSize = FLOAT32_SIZE;
                        break;
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                        EXRDecoder2.getter = decodeFloat32;
                        EXRDecoder2.inputSize = FLOAT32_SIZE;
                }
            } else {
                throw "EXRLoader.parse: unsupported pixelType " + EXRDecoder2.type + " for " + EXRHeader2.compression + ".";
            }
            EXRDecoder2.blockCount = (EXRHeader2.dataWindow.yMax + 1) / EXRDecoder2.scanlineBlockSize;
            for(var i = 0; i < EXRDecoder2.blockCount; i++)parseInt64(dataView, offset2);
            EXRDecoder2.outputChannels = EXRDecoder2.channels == 3 ? 4 : EXRDecoder2.channels;
            const size = EXRDecoder2.width * EXRDecoder2.height * EXRDecoder2.outputChannels;
            switch(outputType){
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatType"]:
                    EXRDecoder2.byteArray = new Float32Array(size);
                    if (EXRDecoder2.channels < EXRDecoder2.outputChannels) EXRDecoder2.byteArray.fill(1, 0, size);
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                    EXRDecoder2.byteArray = new Uint16Array(size);
                    if (EXRDecoder2.channels < EXRDecoder2.outputChannels) EXRDecoder2.byteArray.fill(15360, 0, size);
                    break;
                default:
                    console.error("THREE.EXRLoader: unsupported type: ", outputType);
                    break;
            }
            EXRDecoder2.bytesPerLine = EXRDecoder2.width * EXRDecoder2.inputSize * EXRDecoder2.channels;
            if (EXRDecoder2.outputChannels == 4) EXRDecoder2.format = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBAFormat"];
            else EXRDecoder2.format = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RedFormat"];
            if (hasColorSpace) EXRDecoder2.colorSpace = "srgb-linear";
            else EXRDecoder2.encoding = 3e3;
            return EXRDecoder2;
        }
        const bufferDataView = new DataView(buffer);
        const uInt8Array = new Uint8Array(buffer);
        const offset = {
            value: 0
        };
        const EXRHeader = parseHeader(bufferDataView, buffer, offset);
        const EXRDecoder = setupDecoder(EXRHeader, bufferDataView, uInt8Array, offset, this.type);
        const tmpOffset = {
            value: 0
        };
        const channelOffsets = {
            R: 0,
            G: 1,
            B: 2,
            A: 3,
            Y: 0
        };
        for(let scanlineBlockIdx = 0; scanlineBlockIdx < EXRDecoder.height / EXRDecoder.scanlineBlockSize; scanlineBlockIdx++){
            const line = parseUint32(bufferDataView, offset);
            EXRDecoder.size = parseUint32(bufferDataView, offset);
            EXRDecoder.lines = line + EXRDecoder.scanlineBlockSize > EXRDecoder.height ? EXRDecoder.height - line : EXRDecoder.scanlineBlockSize;
            const isCompressed = EXRDecoder.size < EXRDecoder.lines * EXRDecoder.bytesPerLine;
            const viewer = isCompressed ? EXRDecoder.uncompress(EXRDecoder) : uncompressRAW(EXRDecoder);
            offset.value += EXRDecoder.size;
            for(let line_y = 0; line_y < EXRDecoder.scanlineBlockSize; line_y++){
                const true_y = line_y + scanlineBlockIdx * EXRDecoder.scanlineBlockSize;
                if (true_y >= EXRDecoder.height) break;
                for(let channelID = 0; channelID < EXRDecoder.channels; channelID++){
                    const cOff = channelOffsets[EXRHeader.channels[channelID].name];
                    for(let x = 0; x < EXRDecoder.width; x++){
                        tmpOffset.value = (line_y * (EXRDecoder.channels * EXRDecoder.width) + channelID * EXRDecoder.width + x) * EXRDecoder.inputSize;
                        const outIndex = (EXRDecoder.height - 1 - true_y) * (EXRDecoder.width * EXRDecoder.outputChannels) + x * EXRDecoder.outputChannels + cOff;
                        EXRDecoder.byteArray[outIndex] = EXRDecoder.getter(viewer, tmpOffset);
                    }
                }
            }
        }
        return {
            header: EXRHeader,
            width: EXRDecoder.width,
            height: EXRDecoder.height,
            data: EXRDecoder.byteArray,
            format: EXRDecoder.format,
            [hasColorSpace ? "colorSpace" : "encoding"]: EXRDecoder[hasColorSpace ? "colorSpace" : "encoding"],
            type: this.type
        };
    }
    setDataType(value) {
        this.type = value;
        return this;
    }
    load(url, onLoad, onProgress, onError) {
        function onLoadCallback(texture, texData) {
            if (hasColorSpace) texture.colorSpace = texData.colorSpace;
            else texture.encoding = texData.encoding;
            texture.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearFilter"];
            texture.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearFilter"];
            texture.generateMipmaps = false;
            texture.flipY = false;
            if (onLoad) onLoad(texture, texData);
        }
        return super.load(url, onLoadCallback, onProgress, onError);
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/loaders/FBXLoader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FBXLoader",
    ()=>FBXLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fflate$40$0$2e$6$2e$11$2f$node_modules$2f$fflate$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/fflate@0.6.11/node_modules/fflate/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSCurve$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/curves/NURBSCurve.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/LoaderUtils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$uv1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/uv1.js [app-ssr] (ecmascript)");
;
;
;
;
;
let fbxTree;
let connections;
let sceneGraph;
class FBXLoader extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Loader"] {
    constructor(manager){
        super(manager);
    }
    load(url, onLoad, onProgress, onError) {
        const scope = this;
        const path = scope.path === "" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoaderUtils"].extractUrlBase(url) : scope.path;
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
        loader.setPath(scope.path);
        loader.setResponseType("arraybuffer");
        loader.setRequestHeader(scope.requestHeader);
        loader.setWithCredentials(scope.withCredentials);
        loader.load(url, function(buffer) {
            try {
                onLoad(scope.parse(buffer, path));
            } catch (e) {
                if (onError) {
                    onError(e);
                } else {
                    console.error(e);
                }
                scope.manager.itemError(url);
            }
        }, onProgress, onError);
    }
    parse(FBXBuffer, path) {
        if (isFbxFormatBinary(FBXBuffer)) {
            fbxTree = new BinaryParser().parse(FBXBuffer);
        } else {
            const FBXText = convertArrayBufferToString(FBXBuffer);
            if (!isFbxFormatASCII(FBXText)) {
                throw new Error("THREE.FBXLoader: Unknown format.");
            }
            if (getFbxVersion(FBXText) < 7e3) {
                throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + getFbxVersion(FBXText));
            }
            fbxTree = new TextParser().parse(FBXText);
        }
        const textureLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextureLoader"](this.manager).setPath(this.resourcePath || path).setCrossOrigin(this.crossOrigin);
        return new FBXTreeParser(textureLoader, this.manager).parse(fbxTree);
    }
}
class FBXTreeParser {
    constructor(textureLoader, manager){
        this.textureLoader = textureLoader;
        this.manager = manager;
    }
    parse() {
        connections = this.parseConnections();
        const images = this.parseImages();
        const textures = this.parseTextures(images);
        const materials = this.parseMaterials(textures);
        const deformers = this.parseDeformers();
        const geometryMap = new GeometryParser().parse(deformers);
        this.parseScene(deformers, geometryMap, materials);
        return sceneGraph;
    }
    // Parses FBXTree.Connections which holds parent-child connections between objects (e.g. material -> texture, model->geometry )
    // and details the connection type
    parseConnections() {
        const connectionMap = /* @__PURE__ */ new Map();
        if ("Connections" in fbxTree) {
            const rawConnections = fbxTree.Connections.connections;
            rawConnections.forEach(function(rawConnection) {
                const fromID = rawConnection[0];
                const toID = rawConnection[1];
                const relationship = rawConnection[2];
                if (!connectionMap.has(fromID)) {
                    connectionMap.set(fromID, {
                        parents: [],
                        children: []
                    });
                }
                const parentRelationship = {
                    ID: toID,
                    relationship
                };
                connectionMap.get(fromID).parents.push(parentRelationship);
                if (!connectionMap.has(toID)) {
                    connectionMap.set(toID, {
                        parents: [],
                        children: []
                    });
                }
                const childRelationship = {
                    ID: fromID,
                    relationship
                };
                connectionMap.get(toID).children.push(childRelationship);
            });
        }
        return connectionMap;
    }
    // Parse FBXTree.Objects.Video for embedded image data
    // These images are connected to textures in FBXTree.Objects.Textures
    // via FBXTree.Connections.
    parseImages() {
        const images = {};
        const blobs = {};
        if ("Video" in fbxTree.Objects) {
            const videoNodes = fbxTree.Objects.Video;
            for(const nodeID in videoNodes){
                const videoNode = videoNodes[nodeID];
                const id = parseInt(nodeID);
                images[id] = videoNode.RelativeFilename || videoNode.Filename;
                if ("Content" in videoNode) {
                    const arrayBufferContent = videoNode.Content instanceof ArrayBuffer && videoNode.Content.byteLength > 0;
                    const base64Content = typeof videoNode.Content === "string" && videoNode.Content !== "";
                    if (arrayBufferContent || base64Content) {
                        const image = this.parseImage(videoNodes[nodeID]);
                        blobs[videoNode.RelativeFilename || videoNode.Filename] = image;
                    }
                }
            }
        }
        for(const id in images){
            const filename = images[id];
            if (blobs[filename] !== void 0) images[id] = blobs[filename];
            else images[id] = images[id].split("\\").pop();
        }
        return images;
    }
    // Parse embedded image data in FBXTree.Video.Content
    parseImage(videoNode) {
        const content = videoNode.Content;
        const fileName = videoNode.RelativeFilename || videoNode.Filename;
        const extension = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
        let type;
        switch(extension){
            case "bmp":
                type = "image/bmp";
                break;
            case "jpg":
            case "jpeg":
                type = "image/jpeg";
                break;
            case "png":
                type = "image/png";
                break;
            case "tif":
                type = "image/tiff";
                break;
            case "tga":
                if (this.manager.getHandler(".tga") === null) {
                    console.warn("FBXLoader: TGA loader not found, skipping ", fileName);
                }
                type = "image/tga";
                break;
            default:
                console.warn('FBXLoader: Image type "' + extension + '" is not supported.');
                return;
        }
        if (typeof content === "string") {
            return "data:" + type + ";base64," + content;
        } else {
            const array = new Uint8Array(content);
            return window.URL.createObjectURL(new Blob([
                array
            ], {
                type
            }));
        }
    }
    // Parse nodes in FBXTree.Objects.Texture
    // These contain details such as UV scaling, cropping, rotation etc and are connected
    // to images in FBXTree.Objects.Video
    parseTextures(images) {
        const textureMap = /* @__PURE__ */ new Map();
        if ("Texture" in fbxTree.Objects) {
            const textureNodes = fbxTree.Objects.Texture;
            for(const nodeID in textureNodes){
                const texture = this.parseTexture(textureNodes[nodeID], images);
                textureMap.set(parseInt(nodeID), texture);
            }
        }
        return textureMap;
    }
    // Parse individual node in FBXTree.Objects.Texture
    parseTexture(textureNode, images) {
        const texture = this.loadTexture(textureNode, images);
        texture.ID = textureNode.id;
        texture.name = textureNode.attrName;
        const wrapModeU = textureNode.WrapModeU;
        const wrapModeV = textureNode.WrapModeV;
        const valueU = wrapModeU !== void 0 ? wrapModeU.value : 0;
        const valueV = wrapModeV !== void 0 ? wrapModeV.value : 0;
        texture.wrapS = valueU === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
        texture.wrapT = valueV === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
        if ("Scaling" in textureNode) {
            const values = textureNode.Scaling.value;
            texture.repeat.x = values[0];
            texture.repeat.y = values[1];
        }
        return texture;
    }
    // load a texture specified as a blob or data URI, or via an external URL using TextureLoader
    loadTexture(textureNode, images) {
        let fileName;
        const currentPath = this.textureLoader.path;
        const children = connections.get(textureNode.id).children;
        if (children !== void 0 && children.length > 0 && images[children[0].ID] !== void 0) {
            fileName = images[children[0].ID];
            if (fileName.indexOf("blob:") === 0 || fileName.indexOf("data:") === 0) {
                this.textureLoader.setPath(void 0);
            }
        }
        let texture;
        const extension = textureNode.FileName.slice(-3).toLowerCase();
        if (extension === "tga") {
            const loader = this.manager.getHandler(".tga");
            if (loader === null) {
                console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", textureNode.RelativeFilename);
                texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Texture"]();
            } else {
                loader.setPath(this.textureLoader.path);
                texture = loader.load(fileName);
            }
        } else if (extension === "psd") {
            console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for", textureNode.RelativeFilename);
            texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Texture"]();
        } else {
            texture = this.textureLoader.load(fileName);
        }
        this.textureLoader.setPath(currentPath);
        return texture;
    }
    // Parse nodes in FBXTree.Objects.Material
    parseMaterials(textureMap) {
        const materialMap = /* @__PURE__ */ new Map();
        if ("Material" in fbxTree.Objects) {
            const materialNodes = fbxTree.Objects.Material;
            for(const nodeID in materialNodes){
                const material = this.parseMaterial(materialNodes[nodeID], textureMap);
                if (material !== null) materialMap.set(parseInt(nodeID), material);
            }
        }
        return materialMap;
    }
    // Parse single node in FBXTree.Objects.Material
    // Materials are connected to texture maps in FBXTree.Objects.Textures
    // FBX format currently only supports Lambert and Phong shading models
    parseMaterial(materialNode, textureMap) {
        const ID = materialNode.id;
        const name = materialNode.attrName;
        let type = materialNode.ShadingModel;
        if (typeof type === "object") {
            type = type.value;
        }
        if (!connections.has(ID)) return null;
        const parameters = this.parseParameters(materialNode, textureMap, ID);
        let material;
        switch(type.toLowerCase()){
            case "phong":
                material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]();
                break;
            case "lambert":
                material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]();
                break;
            default:
                console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', type);
                material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]();
                break;
        }
        material.setValues(parameters);
        material.name = name;
        return material;
    }
    // Parse FBX material and return parameters suitable for a three.js material
    // Also parse the texture map and return any textures associated with the material
    parseParameters(materialNode, textureMap, ID) {
        const parameters = {};
        if (materialNode.BumpFactor) {
            parameters.bumpScale = materialNode.BumpFactor.value;
        }
        if (materialNode.Diffuse) {
            parameters.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.Diffuse.value);
        } else if (materialNode.DiffuseColor && (materialNode.DiffuseColor.type === "Color" || materialNode.DiffuseColor.type === "ColorRGB")) {
            parameters.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.DiffuseColor.value);
        }
        if (materialNode.DisplacementFactor) {
            parameters.displacementScale = materialNode.DisplacementFactor.value;
        }
        if (materialNode.Emissive) {
            parameters.emissive = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.Emissive.value);
        } else if (materialNode.EmissiveColor && (materialNode.EmissiveColor.type === "Color" || materialNode.EmissiveColor.type === "ColorRGB")) {
            parameters.emissive = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.EmissiveColor.value);
        }
        if (materialNode.EmissiveFactor) {
            parameters.emissiveIntensity = parseFloat(materialNode.EmissiveFactor.value);
        }
        if (materialNode.Opacity) {
            parameters.opacity = parseFloat(materialNode.Opacity.value);
        }
        if (parameters.opacity < 1) {
            parameters.transparent = true;
        }
        if (materialNode.ReflectionFactor) {
            parameters.reflectivity = materialNode.ReflectionFactor.value;
        }
        if (materialNode.Shininess) {
            parameters.shininess = materialNode.Shininess.value;
        }
        if (materialNode.Specular) {
            parameters.specular = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.Specular.value);
        } else if (materialNode.SpecularColor && materialNode.SpecularColor.type === "Color") {
            parameters.specular = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.SpecularColor.value);
        }
        const scope = this;
        connections.get(ID).children.forEach(function(child) {
            const type = child.relationship;
            switch(type){
                case "Bump":
                    parameters.bumpMap = scope.getTexture(textureMap, child.ID);
                    break;
                case "Maya|TEX_ao_map":
                    parameters.aoMap = scope.getTexture(textureMap, child.ID);
                    break;
                case "DiffuseColor":
                case "Maya|TEX_color_map":
                    parameters.map = scope.getTexture(textureMap, child.ID);
                    if (parameters.map !== void 0) {
                        if ("colorSpace" in parameters.map) parameters.map.colorSpace = "srgb";
                        else parameters.map.encoding = 3001;
                    }
                    break;
                case "DisplacementColor":
                    parameters.displacementMap = scope.getTexture(textureMap, child.ID);
                    break;
                case "EmissiveColor":
                    parameters.emissiveMap = scope.getTexture(textureMap, child.ID);
                    if (parameters.emissiveMap !== void 0) {
                        if ("colorSpace" in parameters.emissiveMap) parameters.emissiveMap.colorSpace = "srgb";
                        else parameters.emissiveMap.encoding = 3001;
                    }
                    break;
                case "NormalMap":
                case "Maya|TEX_normal_map":
                    parameters.normalMap = scope.getTexture(textureMap, child.ID);
                    break;
                case "ReflectionColor":
                    parameters.envMap = scope.getTexture(textureMap, child.ID);
                    if (parameters.envMap !== void 0) {
                        parameters.envMap.mapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquirectangularReflectionMapping"];
                        if ("colorSpace" in parameters.envMap) parameters.envMap.colorSpace = "srgb";
                        else parameters.envMap.encoding = 3001;
                    }
                    break;
                case "SpecularColor":
                    parameters.specularMap = scope.getTexture(textureMap, child.ID);
                    if (parameters.specularMap !== void 0) {
                        if ("colorSpace" in parameters.specularMap) parameters.specularMap.colorSpace = "srgb";
                        else parameters.specularMap.encoding = 3001;
                    }
                    break;
                case "TransparentColor":
                case "TransparencyFactor":
                    parameters.alphaMap = scope.getTexture(textureMap, child.ID);
                    parameters.transparent = true;
                    break;
                case "AmbientColor":
                case "ShininessExponent":
                case "SpecularFactor":
                case "VectorDisplacementColor":
                default:
                    console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", type);
                    break;
            }
        });
        return parameters;
    }
    // get a texture from the textureMap for use by a material.
    getTexture(textureMap, id) {
        if ("LayeredTexture" in fbxTree.Objects && id in fbxTree.Objects.LayeredTexture) {
            console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer.");
            id = connections.get(id).children[0].ID;
        }
        return textureMap.get(id);
    }
    // Parse nodes in FBXTree.Objects.Deformer
    // Deformer node can contain skinning or Vertex Cache animation data, however only skinning is supported here
    // Generates map of Skeleton-like objects for use later when generating and binding skeletons.
    parseDeformers() {
        const skeletons = {};
        const morphTargets = {};
        if ("Deformer" in fbxTree.Objects) {
            const DeformerNodes = fbxTree.Objects.Deformer;
            for(const nodeID in DeformerNodes){
                const deformerNode = DeformerNodes[nodeID];
                const relationships = connections.get(parseInt(nodeID));
                if (deformerNode.attrType === "Skin") {
                    const skeleton = this.parseSkeleton(relationships, DeformerNodes);
                    skeleton.ID = nodeID;
                    if (relationships.parents.length > 1) {
                        console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported.");
                    }
                    skeleton.geometryID = relationships.parents[0].ID;
                    skeletons[nodeID] = skeleton;
                } else if (deformerNode.attrType === "BlendShape") {
                    const morphTarget = {
                        id: nodeID
                    };
                    morphTarget.rawTargets = this.parseMorphTargets(relationships, DeformerNodes);
                    morphTarget.id = nodeID;
                    if (relationships.parents.length > 1) {
                        console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported.");
                    }
                    morphTargets[nodeID] = morphTarget;
                }
            }
        }
        return {
            skeletons,
            morphTargets
        };
    }
    // Parse single nodes in FBXTree.Objects.Deformer
    // The top level skeleton node has type 'Skin' and sub nodes have type 'Cluster'
    // Each skin node represents a skeleton and each cluster node represents a bone
    parseSkeleton(relationships, deformerNodes) {
        const rawBones = [];
        relationships.children.forEach(function(child) {
            const boneNode = deformerNodes[child.ID];
            if (boneNode.attrType !== "Cluster") return;
            const rawBone = {
                ID: child.ID,
                indices: [],
                weights: [],
                transformLink: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]().fromArray(boneNode.TransformLink.a)
            };
            if ("Indexes" in boneNode) {
                rawBone.indices = boneNode.Indexes.a;
                rawBone.weights = boneNode.Weights.a;
            }
            rawBones.push(rawBone);
        });
        return {
            rawBones,
            bones: []
        };
    }
    // The top level morph deformer node has type "BlendShape" and sub nodes have type "BlendShapeChannel"
    parseMorphTargets(relationships, deformerNodes) {
        const rawMorphTargets = [];
        for(let i = 0; i < relationships.children.length; i++){
            const child = relationships.children[i];
            const morphTargetNode = deformerNodes[child.ID];
            const rawMorphTarget = {
                name: morphTargetNode.attrName,
                initialWeight: morphTargetNode.DeformPercent,
                id: morphTargetNode.id,
                fullWeights: morphTargetNode.FullWeights.a
            };
            if (morphTargetNode.attrType !== "BlendShapeChannel") return;
            rawMorphTarget.geoID = connections.get(parseInt(child.ID)).children.filter(function(child2) {
                return child2.relationship === void 0;
            })[0].ID;
            rawMorphTargets.push(rawMorphTarget);
        }
        return rawMorphTargets;
    }
    // create the main Group() to be returned by the loader
    parseScene(deformers, geometryMap, materialMap) {
        sceneGraph = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        const modelMap = this.parseModels(deformers.skeletons, geometryMap, materialMap);
        const modelNodes = fbxTree.Objects.Model;
        const scope = this;
        modelMap.forEach(function(model) {
            const modelNode = modelNodes[model.ID];
            scope.setLookAtProperties(model, modelNode);
            const parentConnections = connections.get(model.ID).parents;
            parentConnections.forEach(function(connection) {
                const parent = modelMap.get(connection.ID);
                if (parent !== void 0) parent.add(model);
            });
            if (model.parent === null) {
                sceneGraph.add(model);
            }
        });
        this.bindSkeleton(deformers.skeletons, geometryMap, modelMap);
        this.createAmbientLight();
        sceneGraph.traverse(function(node) {
            if (node.userData.transformData) {
                if (node.parent) {
                    node.userData.transformData.parentMatrix = node.parent.matrix;
                    node.userData.transformData.parentMatrixWorld = node.parent.matrixWorld;
                }
                const transform = generateTransform(node.userData.transformData);
                node.applyMatrix4(transform);
                node.updateWorldMatrix();
            }
        });
        const animations = new AnimationParser().parse();
        if (sceneGraph.children.length === 1 && sceneGraph.children[0].isGroup) {
            sceneGraph.children[0].animations = animations;
            sceneGraph = sceneGraph.children[0];
        }
        sceneGraph.animations = animations;
    }
    // parse nodes in FBXTree.Objects.Model
    parseModels(skeletons, geometryMap, materialMap) {
        const modelMap = /* @__PURE__ */ new Map();
        const modelNodes = fbxTree.Objects.Model;
        for(const nodeID in modelNodes){
            const id = parseInt(nodeID);
            const node = modelNodes[nodeID];
            const relationships = connections.get(id);
            let model = this.buildSkeleton(relationships, skeletons, id, node.attrName);
            if (!model) {
                switch(node.attrType){
                    case "Camera":
                        model = this.createCamera(relationships);
                        break;
                    case "Light":
                        model = this.createLight(relationships);
                        break;
                    case "Mesh":
                        model = this.createMesh(relationships, geometryMap, materialMap);
                        break;
                    case "NurbsCurve":
                        model = this.createCurve(relationships, geometryMap);
                        break;
                    case "LimbNode":
                    case "Root":
                        model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bone"]();
                        break;
                    case "Null":
                    default:
                        model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
                        break;
                }
                model.name = node.attrName ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PropertyBinding"].sanitizeNodeName(node.attrName) : "";
                model.ID = id;
            }
            this.getTransformData(model, node);
            modelMap.set(id, model);
        }
        return modelMap;
    }
    buildSkeleton(relationships, skeletons, id, name) {
        let bone = null;
        relationships.parents.forEach(function(parent) {
            for(const ID in skeletons){
                const skeleton = skeletons[ID];
                skeleton.rawBones.forEach(function(rawBone, i) {
                    if (rawBone.ID === parent.ID) {
                        const subBone = bone;
                        bone = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bone"]();
                        bone.matrixWorld.copy(rawBone.transformLink);
                        bone.name = name ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PropertyBinding"].sanitizeNodeName(name) : "";
                        bone.ID = id;
                        skeleton.bones[i] = bone;
                        if (subBone !== null) {
                            bone.add(subBone);
                        }
                    }
                });
            }
        });
        return bone;
    }
    // create a PerspectiveCamera or OrthographicCamera
    createCamera(relationships) {
        let model;
        let cameraAttribute;
        relationships.children.forEach(function(child) {
            const attr = fbxTree.Objects.NodeAttribute[child.ID];
            if (attr !== void 0) {
                cameraAttribute = attr;
            }
        });
        if (cameraAttribute === void 0) {
            model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Object3D"]();
        } else {
            let type = 0;
            if (cameraAttribute.CameraProjectionType !== void 0 && cameraAttribute.CameraProjectionType.value === 1) {
                type = 1;
            }
            let nearClippingPlane = 1;
            if (cameraAttribute.NearPlane !== void 0) {
                nearClippingPlane = cameraAttribute.NearPlane.value / 1e3;
            }
            let farClippingPlane = 1e3;
            if (cameraAttribute.FarPlane !== void 0) {
                farClippingPlane = cameraAttribute.FarPlane.value / 1e3;
            }
            let width = window.innerWidth;
            let height = window.innerHeight;
            if (cameraAttribute.AspectWidth !== void 0 && cameraAttribute.AspectHeight !== void 0) {
                width = cameraAttribute.AspectWidth.value;
                height = cameraAttribute.AspectHeight.value;
            }
            const aspect = width / height;
            let fov = 45;
            if (cameraAttribute.FieldOfView !== void 0) {
                fov = cameraAttribute.FieldOfView.value;
            }
            const focalLength = cameraAttribute.FocalLength ? cameraAttribute.FocalLength.value : null;
            switch(type){
                case 0:
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](fov, aspect, nearClippingPlane, farClippingPlane);
                    if (focalLength !== null) model.setFocalLength(focalLength);
                    break;
                case 1:
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrthographicCamera"](-width / 2, width / 2, height / 2, -height / 2, nearClippingPlane, farClippingPlane);
                    break;
                default:
                    console.warn("THREE.FBXLoader: Unknown camera type " + type + ".");
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Object3D"]();
                    break;
            }
        }
        return model;
    }
    // Create a DirectionalLight, PointLight or SpotLight
    createLight(relationships) {
        let model;
        let lightAttribute;
        relationships.children.forEach(function(child) {
            const attr = fbxTree.Objects.NodeAttribute[child.ID];
            if (attr !== void 0) {
                lightAttribute = attr;
            }
        });
        if (lightAttribute === void 0) {
            model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Object3D"]();
        } else {
            let type;
            if (lightAttribute.LightType === void 0) {
                type = 0;
            } else {
                type = lightAttribute.LightType.value;
            }
            let color = 16777215;
            if (lightAttribute.Color !== void 0) {
                color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().fromArray(lightAttribute.Color.value);
            }
            let intensity = lightAttribute.Intensity === void 0 ? 1 : lightAttribute.Intensity.value / 100;
            if (lightAttribute.CastLightOnObject !== void 0 && lightAttribute.CastLightOnObject.value === 0) {
                intensity = 0;
            }
            let distance = 0;
            if (lightAttribute.FarAttenuationEnd !== void 0) {
                if (lightAttribute.EnableFarAttenuation !== void 0 && lightAttribute.EnableFarAttenuation.value === 0) {
                    distance = 0;
                } else {
                    distance = lightAttribute.FarAttenuationEnd.value;
                }
            }
            const decay = 1;
            switch(type){
                case 0:
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](color, intensity, distance, decay);
                    break;
                case 1:
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](color, intensity);
                    break;
                case 2:
                    let angle = Math.PI / 3;
                    if (lightAttribute.InnerAngle !== void 0) {
                        angle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(lightAttribute.InnerAngle.value);
                    }
                    let penumbra = 0;
                    if (lightAttribute.OuterAngle !== void 0) {
                        penumbra = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(lightAttribute.OuterAngle.value);
                        penumbra = Math.max(penumbra, 1);
                    }
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpotLight"](color, intensity, distance, angle, penumbra, decay);
                    break;
                default:
                    console.warn("THREE.FBXLoader: Unknown light type " + lightAttribute.LightType.value + ", defaulting to a PointLight.");
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](color, intensity);
                    break;
            }
            if (lightAttribute.CastShadows !== void 0 && lightAttribute.CastShadows.value === 1) {
                model.castShadow = true;
            }
        }
        return model;
    }
    createMesh(relationships, geometryMap, materialMap) {
        let model;
        let geometry = null;
        let material = null;
        const materials = [];
        relationships.children.forEach(function(child) {
            if (geometryMap.has(child.ID)) {
                geometry = geometryMap.get(child.ID);
            }
            if (materialMap.has(child.ID)) {
                materials.push(materialMap.get(child.ID));
            }
        });
        if (materials.length > 1) {
            material = materials;
        } else if (materials.length > 0) {
            material = materials[0];
        } else {
            material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]({
                color: 13421772
            });
            materials.push(material);
        }
        if ("color" in geometry.attributes) {
            materials.forEach(function(material2) {
                material2.vertexColors = true;
            });
        }
        if (geometry.FBX_Deformer) {
            model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SkinnedMesh"](geometry, material);
            model.normalizeSkinWeights();
        } else {
            model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
        }
        return model;
    }
    createCurve(relationships, geometryMap) {
        const geometry = relationships.children.reduce(function(geo, child) {
            if (geometryMap.has(child.ID)) geo = geometryMap.get(child.ID);
            return geo;
        }, null);
        const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: 3342591,
            linewidth: 1
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"](geometry, material);
    }
    // parse the model node for transform data
    getTransformData(model, modelNode) {
        const transformData = {};
        if ("InheritType" in modelNode) transformData.inheritType = parseInt(modelNode.InheritType.value);
        if ("RotationOrder" in modelNode) transformData.eulerOrder = getEulerOrder(modelNode.RotationOrder.value);
        else transformData.eulerOrder = "ZYX";
        if ("Lcl_Translation" in modelNode) transformData.translation = modelNode.Lcl_Translation.value;
        if ("PreRotation" in modelNode) transformData.preRotation = modelNode.PreRotation.value;
        if ("Lcl_Rotation" in modelNode) transformData.rotation = modelNode.Lcl_Rotation.value;
        if ("PostRotation" in modelNode) transformData.postRotation = modelNode.PostRotation.value;
        if ("Lcl_Scaling" in modelNode) transformData.scale = modelNode.Lcl_Scaling.value;
        if ("ScalingOffset" in modelNode) transformData.scalingOffset = modelNode.ScalingOffset.value;
        if ("ScalingPivot" in modelNode) transformData.scalingPivot = modelNode.ScalingPivot.value;
        if ("RotationOffset" in modelNode) transformData.rotationOffset = modelNode.RotationOffset.value;
        if ("RotationPivot" in modelNode) transformData.rotationPivot = modelNode.RotationPivot.value;
        model.userData.transformData = transformData;
    }
    setLookAtProperties(model, modelNode) {
        if ("LookAtProperty" in modelNode) {
            const children = connections.get(model.ID).children;
            children.forEach(function(child) {
                if (child.relationship === "LookAtProperty") {
                    const lookAtTarget = fbxTree.Objects.Model[child.ID];
                    if ("Lcl_Translation" in lookAtTarget) {
                        const pos = lookAtTarget.Lcl_Translation.value;
                        if (model.target !== void 0) {
                            model.target.position.fromArray(pos);
                            sceneGraph.add(model.target);
                        } else {
                            model.lookAt(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]().fromArray(pos));
                        }
                    }
                }
            });
        }
    }
    bindSkeleton(skeletons, geometryMap, modelMap) {
        const bindMatrices = this.parsePoseNodes();
        for(const ID in skeletons){
            const skeleton = skeletons[ID];
            const parents = connections.get(parseInt(skeleton.ID)).parents;
            parents.forEach(function(parent) {
                if (geometryMap.has(parent.ID)) {
                    const geoID = parent.ID;
                    const geoRelationships = connections.get(geoID);
                    geoRelationships.parents.forEach(function(geoConnParent) {
                        if (modelMap.has(geoConnParent.ID)) {
                            const model = modelMap.get(geoConnParent.ID);
                            model.bind(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"](skeleton.bones), bindMatrices[geoConnParent.ID]);
                        }
                    });
                }
            });
        }
    }
    parsePoseNodes() {
        const bindMatrices = {};
        if ("Pose" in fbxTree.Objects) {
            const BindPoseNode = fbxTree.Objects.Pose;
            for(const nodeID in BindPoseNode){
                if (BindPoseNode[nodeID].attrType === "BindPose" && BindPoseNode[nodeID].NbPoseNodes > 0) {
                    const poseNodes = BindPoseNode[nodeID].PoseNode;
                    if (Array.isArray(poseNodes)) {
                        poseNodes.forEach(function(poseNode) {
                            bindMatrices[poseNode.Node] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]().fromArray(poseNode.Matrix.a);
                        });
                    } else {
                        bindMatrices[poseNodes.Node] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]().fromArray(poseNodes.Matrix.a);
                    }
                }
            }
        }
        return bindMatrices;
    }
    // Parse ambient color in FBXTree.GlobalSettings - if it's not set to black (default), create an ambient light
    createAmbientLight() {
        if ("GlobalSettings" in fbxTree && "AmbientColor" in fbxTree.GlobalSettings) {
            const ambientColor = fbxTree.GlobalSettings.AmbientColor.value;
            const r = ambientColor[0];
            const g = ambientColor[1];
            const b = ambientColor[2];
            if (r !== 0 || g !== 0 || b !== 0) {
                const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](r, g, b);
                sceneGraph.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AmbientLight"](color, 1));
            }
        }
    }
}
class GeometryParser {
    // Parse nodes in FBXTree.Objects.Geometry
    parse(deformers) {
        const geometryMap = /* @__PURE__ */ new Map();
        if ("Geometry" in fbxTree.Objects) {
            const geoNodes = fbxTree.Objects.Geometry;
            for(const nodeID in geoNodes){
                const relationships = connections.get(parseInt(nodeID));
                const geo = this.parseGeometry(relationships, geoNodes[nodeID], deformers);
                geometryMap.set(parseInt(nodeID), geo);
            }
        }
        return geometryMap;
    }
    // Parse single node in FBXTree.Objects.Geometry
    parseGeometry(relationships, geoNode, deformers) {
        switch(geoNode.attrType){
            case "Mesh":
                return this.parseMeshGeometry(relationships, geoNode, deformers);
            case "NurbsCurve":
                return this.parseNurbsGeometry(geoNode);
        }
    }
    // Parse single node mesh geometry in FBXTree.Objects.Geometry
    parseMeshGeometry(relationships, geoNode, deformers) {
        const skeletons = deformers.skeletons;
        const morphTargets = [];
        const modelNodes = relationships.parents.map(function(parent) {
            return fbxTree.Objects.Model[parent.ID];
        });
        if (modelNodes.length === 0) return;
        const skeleton = relationships.children.reduce(function(skeleton2, child) {
            if (skeletons[child.ID] !== void 0) skeleton2 = skeletons[child.ID];
            return skeleton2;
        }, null);
        relationships.children.forEach(function(child) {
            if (deformers.morphTargets[child.ID] !== void 0) {
                morphTargets.push(deformers.morphTargets[child.ID]);
            }
        });
        const modelNode = modelNodes[0];
        const transformData = {};
        if ("RotationOrder" in modelNode) transformData.eulerOrder = getEulerOrder(modelNode.RotationOrder.value);
        if ("InheritType" in modelNode) transformData.inheritType = parseInt(modelNode.InheritType.value);
        if ("GeometricTranslation" in modelNode) transformData.translation = modelNode.GeometricTranslation.value;
        if ("GeometricRotation" in modelNode) transformData.rotation = modelNode.GeometricRotation.value;
        if ("GeometricScaling" in modelNode) transformData.scale = modelNode.GeometricScaling.value;
        const transform = generateTransform(transformData);
        return this.genGeometry(geoNode, skeleton, morphTargets, transform);
    }
    // Generate a BufferGeometry from a node in FBXTree.Objects.Geometry
    genGeometry(geoNode, skeleton, morphTargets, preTransform) {
        const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        if (geoNode.attrName) geo.name = geoNode.attrName;
        const geoInfo = this.parseGeoNode(geoNode, skeleton);
        const buffers = this.genBuffers(geoInfo);
        const positionAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](buffers.vertex, 3);
        positionAttribute.applyMatrix4(preTransform);
        geo.setAttribute("position", positionAttribute);
        if (buffers.colors.length > 0) {
            geo.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](buffers.colors, 3));
        }
        if (skeleton) {
            geo.setAttribute("skinIndex", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Uint16BufferAttribute"](buffers.weightsIndices, 4));
            geo.setAttribute("skinWeight", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](buffers.vertexWeights, 4));
            geo.FBX_Deformer = skeleton;
        }
        if (buffers.normal.length > 0) {
            const normalMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix3"]().getNormalMatrix(preTransform);
            const normalAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](buffers.normal, 3);
            normalAttribute.applyNormalMatrix(normalMatrix);
            geo.setAttribute("normal", normalAttribute);
        }
        buffers.uvs.forEach(function(uvBuffer, i) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$uv1$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UV1"] === "uv2") i++;
            const name = i === 0 ? "uv" : `uv${i}`;
            geo.setAttribute(name, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](buffers.uvs[i], 2));
        });
        if (geoInfo.material && geoInfo.material.mappingType !== "AllSame") {
            let prevMaterialIndex = buffers.materialIndex[0];
            let startIndex = 0;
            buffers.materialIndex.forEach(function(currentIndex, i) {
                if (currentIndex !== prevMaterialIndex) {
                    geo.addGroup(startIndex, i - startIndex, prevMaterialIndex);
                    prevMaterialIndex = currentIndex;
                    startIndex = i;
                }
            });
            if (geo.groups.length > 0) {
                const lastGroup = geo.groups[geo.groups.length - 1];
                const lastIndex = lastGroup.start + lastGroup.count;
                if (lastIndex !== buffers.materialIndex.length) {
                    geo.addGroup(lastIndex, buffers.materialIndex.length - lastIndex, prevMaterialIndex);
                }
            }
            if (geo.groups.length === 0) {
                geo.addGroup(0, buffers.materialIndex.length, buffers.materialIndex[0]);
            }
        }
        this.addMorphTargets(geo, geoNode, morphTargets, preTransform);
        return geo;
    }
    parseGeoNode(geoNode, skeleton) {
        const geoInfo = {};
        geoInfo.vertexPositions = geoNode.Vertices !== void 0 ? geoNode.Vertices.a : [];
        geoInfo.vertexIndices = geoNode.PolygonVertexIndex !== void 0 ? geoNode.PolygonVertexIndex.a : [];
        if (geoNode.LayerElementColor) {
            geoInfo.color = this.parseVertexColors(geoNode.LayerElementColor[0]);
        }
        if (geoNode.LayerElementMaterial) {
            geoInfo.material = this.parseMaterialIndices(geoNode.LayerElementMaterial[0]);
        }
        if (geoNode.LayerElementNormal) {
            geoInfo.normal = this.parseNormals(geoNode.LayerElementNormal[0]);
        }
        if (geoNode.LayerElementUV) {
            geoInfo.uv = [];
            let i = 0;
            while(geoNode.LayerElementUV[i]){
                if (geoNode.LayerElementUV[i].UV) {
                    geoInfo.uv.push(this.parseUVs(geoNode.LayerElementUV[i]));
                }
                i++;
            }
        }
        geoInfo.weightTable = {};
        if (skeleton !== null) {
            geoInfo.skeleton = skeleton;
            skeleton.rawBones.forEach(function(rawBone, i) {
                rawBone.indices.forEach(function(index, j) {
                    if (geoInfo.weightTable[index] === void 0) geoInfo.weightTable[index] = [];
                    geoInfo.weightTable[index].push({
                        id: i,
                        weight: rawBone.weights[j]
                    });
                });
            });
        }
        return geoInfo;
    }
    genBuffers(geoInfo) {
        const buffers = {
            vertex: [],
            normal: [],
            colors: [],
            uvs: [],
            materialIndex: [],
            vertexWeights: [],
            weightsIndices: []
        };
        let polygonIndex = 0;
        let faceLength = 0;
        let displayedWeightsWarning = false;
        let facePositionIndexes = [];
        let faceNormals = [];
        let faceColors = [];
        let faceUVs = [];
        let faceWeights = [];
        let faceWeightIndices = [];
        const scope = this;
        geoInfo.vertexIndices.forEach(function(vertexIndex, polygonVertexIndex) {
            let materialIndex;
            let endOfFace = false;
            if (vertexIndex < 0) {
                vertexIndex = vertexIndex ^ -1;
                endOfFace = true;
            }
            let weightIndices = [];
            let weights = [];
            facePositionIndexes.push(vertexIndex * 3, vertexIndex * 3 + 1, vertexIndex * 3 + 2);
            if (geoInfo.color) {
                const data = getData(polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.color);
                faceColors.push(data[0], data[1], data[2]);
            }
            if (geoInfo.skeleton) {
                if (geoInfo.weightTable[vertexIndex] !== void 0) {
                    geoInfo.weightTable[vertexIndex].forEach(function(wt) {
                        weights.push(wt.weight);
                        weightIndices.push(wt.id);
                    });
                }
                if (weights.length > 4) {
                    if (!displayedWeightsWarning) {
                        console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights.");
                        displayedWeightsWarning = true;
                    }
                    const wIndex = [
                        0,
                        0,
                        0,
                        0
                    ];
                    const Weight = [
                        0,
                        0,
                        0,
                        0
                    ];
                    weights.forEach(function(weight, weightIndex) {
                        let currentWeight = weight;
                        let currentIndex = weightIndices[weightIndex];
                        Weight.forEach(function(comparedWeight, comparedWeightIndex, comparedWeightArray) {
                            if (currentWeight > comparedWeight) {
                                comparedWeightArray[comparedWeightIndex] = currentWeight;
                                currentWeight = comparedWeight;
                                const tmp = wIndex[comparedWeightIndex];
                                wIndex[comparedWeightIndex] = currentIndex;
                                currentIndex = tmp;
                            }
                        });
                    });
                    weightIndices = wIndex;
                    weights = Weight;
                }
                while(weights.length < 4){
                    weights.push(0);
                    weightIndices.push(0);
                }
                for(let i = 0; i < 4; ++i){
                    faceWeights.push(weights[i]);
                    faceWeightIndices.push(weightIndices[i]);
                }
            }
            if (geoInfo.normal) {
                const data = getData(polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.normal);
                faceNormals.push(data[0], data[1], data[2]);
            }
            if (geoInfo.material && geoInfo.material.mappingType !== "AllSame") {
                materialIndex = getData(polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.material)[0];
            }
            if (geoInfo.uv) {
                geoInfo.uv.forEach(function(uv, i) {
                    const data = getData(polygonVertexIndex, polygonIndex, vertexIndex, uv);
                    if (faceUVs[i] === void 0) {
                        faceUVs[i] = [];
                    }
                    faceUVs[i].push(data[0]);
                    faceUVs[i].push(data[1]);
                });
            }
            faceLength++;
            if (endOfFace) {
                scope.genFace(buffers, geoInfo, facePositionIndexes, materialIndex, faceNormals, faceColors, faceUVs, faceWeights, faceWeightIndices, faceLength);
                polygonIndex++;
                faceLength = 0;
                facePositionIndexes = [];
                faceNormals = [];
                faceColors = [];
                faceUVs = [];
                faceWeights = [];
                faceWeightIndices = [];
            }
        });
        return buffers;
    }
    // Generate data for a single face in a geometry. If the face is a quad then split it into 2 tris
    genFace(buffers, geoInfo, facePositionIndexes, materialIndex, faceNormals, faceColors, faceUVs, faceWeights, faceWeightIndices, faceLength) {
        for(let i = 2; i < faceLength; i++){
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[0]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[1]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[2]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[(i - 1) * 3]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[(i - 1) * 3 + 1]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[(i - 1) * 3 + 2]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[i * 3]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[i * 3 + 1]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[i * 3 + 2]]);
            if (geoInfo.skeleton) {
                buffers.vertexWeights.push(faceWeights[0]);
                buffers.vertexWeights.push(faceWeights[1]);
                buffers.vertexWeights.push(faceWeights[2]);
                buffers.vertexWeights.push(faceWeights[3]);
                buffers.vertexWeights.push(faceWeights[(i - 1) * 4]);
                buffers.vertexWeights.push(faceWeights[(i - 1) * 4 + 1]);
                buffers.vertexWeights.push(faceWeights[(i - 1) * 4 + 2]);
                buffers.vertexWeights.push(faceWeights[(i - 1) * 4 + 3]);
                buffers.vertexWeights.push(faceWeights[i * 4]);
                buffers.vertexWeights.push(faceWeights[i * 4 + 1]);
                buffers.vertexWeights.push(faceWeights[i * 4 + 2]);
                buffers.vertexWeights.push(faceWeights[i * 4 + 3]);
                buffers.weightsIndices.push(faceWeightIndices[0]);
                buffers.weightsIndices.push(faceWeightIndices[1]);
                buffers.weightsIndices.push(faceWeightIndices[2]);
                buffers.weightsIndices.push(faceWeightIndices[3]);
                buffers.weightsIndices.push(faceWeightIndices[(i - 1) * 4]);
                buffers.weightsIndices.push(faceWeightIndices[(i - 1) * 4 + 1]);
                buffers.weightsIndices.push(faceWeightIndices[(i - 1) * 4 + 2]);
                buffers.weightsIndices.push(faceWeightIndices[(i - 1) * 4 + 3]);
                buffers.weightsIndices.push(faceWeightIndices[i * 4]);
                buffers.weightsIndices.push(faceWeightIndices[i * 4 + 1]);
                buffers.weightsIndices.push(faceWeightIndices[i * 4 + 2]);
                buffers.weightsIndices.push(faceWeightIndices[i * 4 + 3]);
            }
            if (geoInfo.color) {
                buffers.colors.push(faceColors[0]);
                buffers.colors.push(faceColors[1]);
                buffers.colors.push(faceColors[2]);
                buffers.colors.push(faceColors[(i - 1) * 3]);
                buffers.colors.push(faceColors[(i - 1) * 3 + 1]);
                buffers.colors.push(faceColors[(i - 1) * 3 + 2]);
                buffers.colors.push(faceColors[i * 3]);
                buffers.colors.push(faceColors[i * 3 + 1]);
                buffers.colors.push(faceColors[i * 3 + 2]);
            }
            if (geoInfo.material && geoInfo.material.mappingType !== "AllSame") {
                buffers.materialIndex.push(materialIndex);
                buffers.materialIndex.push(materialIndex);
                buffers.materialIndex.push(materialIndex);
            }
            if (geoInfo.normal) {
                buffers.normal.push(faceNormals[0]);
                buffers.normal.push(faceNormals[1]);
                buffers.normal.push(faceNormals[2]);
                buffers.normal.push(faceNormals[(i - 1) * 3]);
                buffers.normal.push(faceNormals[(i - 1) * 3 + 1]);
                buffers.normal.push(faceNormals[(i - 1) * 3 + 2]);
                buffers.normal.push(faceNormals[i * 3]);
                buffers.normal.push(faceNormals[i * 3 + 1]);
                buffers.normal.push(faceNormals[i * 3 + 2]);
            }
            if (geoInfo.uv) {
                geoInfo.uv.forEach(function(uv, j) {
                    if (buffers.uvs[j] === void 0) buffers.uvs[j] = [];
                    buffers.uvs[j].push(faceUVs[j][0]);
                    buffers.uvs[j].push(faceUVs[j][1]);
                    buffers.uvs[j].push(faceUVs[j][(i - 1) * 2]);
                    buffers.uvs[j].push(faceUVs[j][(i - 1) * 2 + 1]);
                    buffers.uvs[j].push(faceUVs[j][i * 2]);
                    buffers.uvs[j].push(faceUVs[j][i * 2 + 1]);
                });
            }
        }
    }
    addMorphTargets(parentGeo, parentGeoNode, morphTargets, preTransform) {
        if (morphTargets.length === 0) return;
        parentGeo.morphTargetsRelative = true;
        parentGeo.morphAttributes.position = [];
        const scope = this;
        morphTargets.forEach(function(morphTarget) {
            morphTarget.rawTargets.forEach(function(rawTarget) {
                const morphGeoNode = fbxTree.Objects.Geometry[rawTarget.geoID];
                if (morphGeoNode !== void 0) {
                    scope.genMorphGeometry(parentGeo, parentGeoNode, morphGeoNode, preTransform, rawTarget.name);
                }
            });
        });
    }
    // a morph geometry node is similar to a standard  node, and the node is also contained
    // in FBXTree.Objects.Geometry, however it can only have attributes for position, normal
    // and a special attribute Index defining which vertices of the original geometry are affected
    // Normal and position attributes only have data for the vertices that are affected by the morph
    genMorphGeometry(parentGeo, parentGeoNode, morphGeoNode, preTransform, name) {
        const vertexIndices = parentGeoNode.PolygonVertexIndex !== void 0 ? parentGeoNode.PolygonVertexIndex.a : [];
        const morphPositionsSparse = morphGeoNode.Vertices !== void 0 ? morphGeoNode.Vertices.a : [];
        const indices = morphGeoNode.Indexes !== void 0 ? morphGeoNode.Indexes.a : [];
        const length = parentGeo.attributes.position.count * 3;
        const morphPositions = new Float32Array(length);
        for(let i = 0; i < indices.length; i++){
            const morphIndex = indices[i] * 3;
            morphPositions[morphIndex] = morphPositionsSparse[i * 3];
            morphPositions[morphIndex + 1] = morphPositionsSparse[i * 3 + 1];
            morphPositions[morphIndex + 2] = morphPositionsSparse[i * 3 + 2];
        }
        const morphGeoInfo = {
            vertexIndices,
            vertexPositions: morphPositions
        };
        const morphBuffers = this.genBuffers(morphGeoInfo);
        const positionAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](morphBuffers.vertex, 3);
        positionAttribute.name = name || morphGeoNode.attrName;
        positionAttribute.applyMatrix4(preTransform);
        parentGeo.morphAttributes.position.push(positionAttribute);
    }
    // Parse normal from FBXTree.Objects.Geometry.LayerElementNormal if it exists
    parseNormals(NormalNode) {
        const mappingType = NormalNode.MappingInformationType;
        const referenceType = NormalNode.ReferenceInformationType;
        const buffer = NormalNode.Normals.a;
        let indexBuffer = [];
        if (referenceType === "IndexToDirect") {
            if ("NormalIndex" in NormalNode) {
                indexBuffer = NormalNode.NormalIndex.a;
            } else if ("NormalsIndex" in NormalNode) {
                indexBuffer = NormalNode.NormalsIndex.a;
            }
        }
        return {
            dataSize: 3,
            buffer,
            indices: indexBuffer,
            mappingType,
            referenceType
        };
    }
    // Parse UVs from FBXTree.Objects.Geometry.LayerElementUV if it exists
    parseUVs(UVNode) {
        const mappingType = UVNode.MappingInformationType;
        const referenceType = UVNode.ReferenceInformationType;
        const buffer = UVNode.UV.a;
        let indexBuffer = [];
        if (referenceType === "IndexToDirect") {
            indexBuffer = UVNode.UVIndex.a;
        }
        return {
            dataSize: 2,
            buffer,
            indices: indexBuffer,
            mappingType,
            referenceType
        };
    }
    // Parse Vertex Colors from FBXTree.Objects.Geometry.LayerElementColor if it exists
    parseVertexColors(ColorNode) {
        const mappingType = ColorNode.MappingInformationType;
        const referenceType = ColorNode.ReferenceInformationType;
        const buffer = ColorNode.Colors.a;
        let indexBuffer = [];
        if (referenceType === "IndexToDirect") {
            indexBuffer = ColorNode.ColorIndex.a;
        }
        return {
            dataSize: 4,
            buffer,
            indices: indexBuffer,
            mappingType,
            referenceType
        };
    }
    // Parse mapping and material data in FBXTree.Objects.Geometry.LayerElementMaterial if it exists
    parseMaterialIndices(MaterialNode) {
        const mappingType = MaterialNode.MappingInformationType;
        const referenceType = MaterialNode.ReferenceInformationType;
        if (mappingType === "NoMappingInformation") {
            return {
                dataSize: 1,
                buffer: [
                    0
                ],
                indices: [
                    0
                ],
                mappingType: "AllSame",
                referenceType
            };
        }
        const materialIndexBuffer = MaterialNode.Materials.a;
        const materialIndices = [];
        for(let i = 0; i < materialIndexBuffer.length; ++i){
            materialIndices.push(i);
        }
        return {
            dataSize: 1,
            buffer: materialIndexBuffer,
            indices: materialIndices,
            mappingType,
            referenceType
        };
    }
    // Generate a NurbGeometry from a node in FBXTree.Objects.Geometry
    parseNurbsGeometry(geoNode) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSCurve$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NURBSCurve"] === void 0) {
            console.error("THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry.");
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        }
        const order = parseInt(geoNode.Order);
        if (isNaN(order)) {
            console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", geoNode.Order, geoNode.id);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        }
        const degree = order - 1;
        const knots = geoNode.KnotVector.a;
        const controlPoints = [];
        const pointsValues = geoNode.Points.a;
        for(let i = 0, l = pointsValues.length; i < l; i += 4){
            controlPoints.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector4"]().fromArray(pointsValues, i));
        }
        let startKnot, endKnot;
        if (geoNode.Form === "Closed") {
            controlPoints.push(controlPoints[0]);
        } else if (geoNode.Form === "Periodic") {
            startKnot = degree;
            endKnot = knots.length - 1 - startKnot;
            for(let i = 0; i < degree; ++i){
                controlPoints.push(controlPoints[i]);
            }
        }
        const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSCurve$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NURBSCurve"](degree, knots, controlPoints, startKnot, endKnot);
        const points = curve.getPoints(controlPoints.length * 12);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
    }
}
class AnimationParser {
    // take raw animation clips and turn them into three.js animation clips
    parse() {
        const animationClips = [];
        const rawClips = this.parseClips();
        if (rawClips !== void 0) {
            for(const key in rawClips){
                const rawClip = rawClips[key];
                const clip = this.addClip(rawClip);
                animationClips.push(clip);
            }
        }
        return animationClips;
    }
    parseClips() {
        if (fbxTree.Objects.AnimationCurve === void 0) return void 0;
        const curveNodesMap = this.parseAnimationCurveNodes();
        this.parseAnimationCurves(curveNodesMap);
        const layersMap = this.parseAnimationLayers(curveNodesMap);
        const rawClips = this.parseAnimStacks(layersMap);
        return rawClips;
    }
    // parse nodes in FBXTree.Objects.AnimationCurveNode
    // each AnimationCurveNode holds data for an animation transform for a model (e.g. left arm rotation )
    // and is referenced by an AnimationLayer
    parseAnimationCurveNodes() {
        const rawCurveNodes = fbxTree.Objects.AnimationCurveNode;
        const curveNodesMap = /* @__PURE__ */ new Map();
        for(const nodeID in rawCurveNodes){
            const rawCurveNode = rawCurveNodes[nodeID];
            if (rawCurveNode.attrName.match(/S|R|T|DeformPercent/) !== null) {
                const curveNode = {
                    id: rawCurveNode.id,
                    attr: rawCurveNode.attrName,
                    curves: {}
                };
                curveNodesMap.set(curveNode.id, curveNode);
            }
        }
        return curveNodesMap;
    }
    // parse nodes in FBXTree.Objects.AnimationCurve and connect them up to
    // previously parsed AnimationCurveNodes. Each AnimationCurve holds data for a single animated
    // axis ( e.g. times and values of x rotation)
    parseAnimationCurves(curveNodesMap) {
        const rawCurves = fbxTree.Objects.AnimationCurve;
        for(const nodeID in rawCurves){
            const animationCurve = {
                id: rawCurves[nodeID].id,
                times: rawCurves[nodeID].KeyTime.a.map(convertFBXTimeToSeconds),
                values: rawCurves[nodeID].KeyValueFloat.a
            };
            const relationships = connections.get(animationCurve.id);
            if (relationships !== void 0) {
                const animationCurveID = relationships.parents[0].ID;
                const animationCurveRelationship = relationships.parents[0].relationship;
                if (animationCurveRelationship.match(/X/)) {
                    curveNodesMap.get(animationCurveID).curves["x"] = animationCurve;
                } else if (animationCurveRelationship.match(/Y/)) {
                    curveNodesMap.get(animationCurveID).curves["y"] = animationCurve;
                } else if (animationCurveRelationship.match(/Z/)) {
                    curveNodesMap.get(animationCurveID).curves["z"] = animationCurve;
                } else if (animationCurveRelationship.match(/d|DeformPercent/) && curveNodesMap.has(animationCurveID)) {
                    curveNodesMap.get(animationCurveID).curves["morph"] = animationCurve;
                }
            }
        }
    }
    // parse nodes in FBXTree.Objects.AnimationLayer. Each layers holds references
    // to various AnimationCurveNodes and is referenced by an AnimationStack node
    // note: theoretically a stack can have multiple layers, however in practice there always seems to be one per stack
    parseAnimationLayers(curveNodesMap) {
        const rawLayers = fbxTree.Objects.AnimationLayer;
        const layersMap = /* @__PURE__ */ new Map();
        for(const nodeID in rawLayers){
            const layerCurveNodes = [];
            const connection = connections.get(parseInt(nodeID));
            if (connection !== void 0) {
                const children = connection.children;
                children.forEach(function(child, i) {
                    if (curveNodesMap.has(child.ID)) {
                        const curveNode = curveNodesMap.get(child.ID);
                        if (curveNode.curves.x !== void 0 || curveNode.curves.y !== void 0 || curveNode.curves.z !== void 0) {
                            if (layerCurveNodes[i] === void 0) {
                                const modelID = connections.get(child.ID).parents.filter(function(parent) {
                                    return parent.relationship !== void 0;
                                })[0].ID;
                                if (modelID !== void 0) {
                                    const rawModel = fbxTree.Objects.Model[modelID.toString()];
                                    if (rawModel === void 0) {
                                        console.warn("THREE.FBXLoader: Encountered a unused curve.", child);
                                        return;
                                    }
                                    const node = {
                                        modelName: rawModel.attrName ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PropertyBinding"].sanitizeNodeName(rawModel.attrName) : "",
                                        ID: rawModel.id,
                                        initialPosition: [
                                            0,
                                            0,
                                            0
                                        ],
                                        initialRotation: [
                                            0,
                                            0,
                                            0
                                        ],
                                        initialScale: [
                                            1,
                                            1,
                                            1
                                        ]
                                    };
                                    sceneGraph.traverse(function(child2) {
                                        if (child2.ID === rawModel.id) {
                                            node.transform = child2.matrix;
                                            if (child2.userData.transformData) node.eulerOrder = child2.userData.transformData.eulerOrder;
                                        }
                                    });
                                    if (!node.transform) node.transform = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
                                    if ("PreRotation" in rawModel) node.preRotation = rawModel.PreRotation.value;
                                    if ("PostRotation" in rawModel) node.postRotation = rawModel.PostRotation.value;
                                    layerCurveNodes[i] = node;
                                }
                            }
                            if (layerCurveNodes[i]) layerCurveNodes[i][curveNode.attr] = curveNode;
                        } else if (curveNode.curves.morph !== void 0) {
                            if (layerCurveNodes[i] === void 0) {
                                const deformerID = connections.get(child.ID).parents.filter(function(parent) {
                                    return parent.relationship !== void 0;
                                })[0].ID;
                                const morpherID = connections.get(deformerID).parents[0].ID;
                                const geoID = connections.get(morpherID).parents[0].ID;
                                const modelID = connections.get(geoID).parents[0].ID;
                                const rawModel = fbxTree.Objects.Model[modelID];
                                const node = {
                                    modelName: rawModel.attrName ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PropertyBinding"].sanitizeNodeName(rawModel.attrName) : "",
                                    morphName: fbxTree.Objects.Deformer[deformerID].attrName
                                };
                                layerCurveNodes[i] = node;
                            }
                            layerCurveNodes[i][curveNode.attr] = curveNode;
                        }
                    }
                });
                layersMap.set(parseInt(nodeID), layerCurveNodes);
            }
        }
        return layersMap;
    }
    // parse nodes in FBXTree.Objects.AnimationStack. These are the top level node in the animation
    // hierarchy. Each Stack node will be used to create a AnimationClip
    parseAnimStacks(layersMap) {
        const rawStacks = fbxTree.Objects.AnimationStack;
        const rawClips = {};
        for(const nodeID in rawStacks){
            const children = connections.get(parseInt(nodeID)).children;
            if (children.length > 1) {
                console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
            }
            const layer = layersMap.get(children[0].ID);
            rawClips[nodeID] = {
                name: rawStacks[nodeID].attrName,
                layer
            };
        }
        return rawClips;
    }
    addClip(rawClip) {
        let tracks = [];
        const scope = this;
        rawClip.layer.forEach(function(rawTracks) {
            tracks = tracks.concat(scope.generateTracks(rawTracks));
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationClip"](rawClip.name, -1, tracks);
    }
    generateTracks(rawTracks) {
        const tracks = [];
        let initialPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        let initialRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]();
        let initialScale = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        if (rawTracks.transform) rawTracks.transform.decompose(initialPosition, initialRotation, initialScale);
        initialPosition = initialPosition.toArray();
        initialRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Euler"]().setFromQuaternion(initialRotation, rawTracks.eulerOrder).toArray();
        initialScale = initialScale.toArray();
        if (rawTracks.T !== void 0 && Object.keys(rawTracks.T.curves).length > 0) {
            const positionTrack = this.generateVectorTrack(rawTracks.modelName, rawTracks.T.curves, initialPosition, "position");
            if (positionTrack !== void 0) tracks.push(positionTrack);
        }
        if (rawTracks.R !== void 0 && Object.keys(rawTracks.R.curves).length > 0) {
            const rotationTrack = this.generateRotationTrack(rawTracks.modelName, rawTracks.R.curves, initialRotation, rawTracks.preRotation, rawTracks.postRotation, rawTracks.eulerOrder);
            if (rotationTrack !== void 0) tracks.push(rotationTrack);
        }
        if (rawTracks.S !== void 0 && Object.keys(rawTracks.S.curves).length > 0) {
            const scaleTrack = this.generateVectorTrack(rawTracks.modelName, rawTracks.S.curves, initialScale, "scale");
            if (scaleTrack !== void 0) tracks.push(scaleTrack);
        }
        if (rawTracks.DeformPercent !== void 0) {
            const morphTrack = this.generateMorphTrack(rawTracks);
            if (morphTrack !== void 0) tracks.push(morphTrack);
        }
        return tracks;
    }
    generateVectorTrack(modelName, curves, initialValue, type) {
        const times = this.getTimesForAllAxes(curves);
        const values = this.getKeyframeTrackValues(times, curves, initialValue);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VectorKeyframeTrack"](modelName + "." + type, times, values);
    }
    generateRotationTrack(modelName, curves, initialValue, preRotation, postRotation, eulerOrder) {
        if (curves.x !== void 0) {
            this.interpolateRotations(curves.x);
            curves.x.values = curves.x.values.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        }
        if (curves.y !== void 0) {
            this.interpolateRotations(curves.y);
            curves.y.values = curves.y.values.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        }
        if (curves.z !== void 0) {
            this.interpolateRotations(curves.z);
            curves.z.values = curves.z.values.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        }
        const times = this.getTimesForAllAxes(curves);
        const values = this.getKeyframeTrackValues(times, curves, initialValue);
        if (preRotation !== void 0) {
            preRotation = preRotation.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
            preRotation.push(eulerOrder);
            preRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Euler"]().fromArray(preRotation);
            preRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]().setFromEuler(preRotation);
        }
        if (postRotation !== void 0) {
            postRotation = postRotation.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
            postRotation.push(eulerOrder);
            postRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Euler"]().fromArray(postRotation);
            postRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]().setFromEuler(postRotation).invert();
        }
        const quaternion = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]();
        const euler = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Euler"]();
        const quaternionValues = [];
        for(let i = 0; i < values.length; i += 3){
            euler.set(values[i], values[i + 1], values[i + 2], eulerOrder);
            quaternion.setFromEuler(euler);
            if (preRotation !== void 0) quaternion.premultiply(preRotation);
            if (postRotation !== void 0) quaternion.multiply(postRotation);
            quaternion.toArray(quaternionValues, i / 3 * 4);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuaternionKeyframeTrack"](modelName + ".quaternion", times, quaternionValues);
    }
    generateMorphTrack(rawTracks) {
        const curves = rawTracks.DeformPercent.curves.morph;
        const values = curves.values.map(function(val) {
            return val / 100;
        });
        const morphNum = sceneGraph.getObjectByName(rawTracks.modelName).morphTargetDictionary[rawTracks.morphName];
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NumberKeyframeTrack"](rawTracks.modelName + ".morphTargetInfluences[" + morphNum + "]", curves.times, values);
    }
    // For all animated objects, times are defined separately for each axis
    // Here we'll combine the times into one sorted array without duplicates
    getTimesForAllAxes(curves) {
        let times = [];
        if (curves.x !== void 0) times = times.concat(curves.x.times);
        if (curves.y !== void 0) times = times.concat(curves.y.times);
        if (curves.z !== void 0) times = times.concat(curves.z.times);
        times = times.sort(function(a, b) {
            return a - b;
        });
        if (times.length > 1) {
            let targetIndex = 1;
            let lastValue = times[0];
            for(let i = 1; i < times.length; i++){
                const currentValue = times[i];
                if (currentValue !== lastValue) {
                    times[targetIndex] = currentValue;
                    lastValue = currentValue;
                    targetIndex++;
                }
            }
            times = times.slice(0, targetIndex);
        }
        return times;
    }
    getKeyframeTrackValues(times, curves, initialValue) {
        const prevValue = initialValue;
        const values = [];
        let xIndex = -1;
        let yIndex = -1;
        let zIndex = -1;
        times.forEach(function(time) {
            if (curves.x) xIndex = curves.x.times.indexOf(time);
            if (curves.y) yIndex = curves.y.times.indexOf(time);
            if (curves.z) zIndex = curves.z.times.indexOf(time);
            if (xIndex !== -1) {
                const xValue = curves.x.values[xIndex];
                values.push(xValue);
                prevValue[0] = xValue;
            } else {
                values.push(prevValue[0]);
            }
            if (yIndex !== -1) {
                const yValue = curves.y.values[yIndex];
                values.push(yValue);
                prevValue[1] = yValue;
            } else {
                values.push(prevValue[1]);
            }
            if (zIndex !== -1) {
                const zValue = curves.z.values[zIndex];
                values.push(zValue);
                prevValue[2] = zValue;
            } else {
                values.push(prevValue[2]);
            }
        });
        return values;
    }
    // Rotations are defined as Euler angles which can have values  of any size
    // These will be converted to quaternions which don't support values greater than
    // PI, so we'll interpolate large rotations
    interpolateRotations(curve) {
        for(let i = 1; i < curve.values.length; i++){
            const initialValue = curve.values[i - 1];
            const valuesSpan = curve.values[i] - initialValue;
            const absoluteSpan = Math.abs(valuesSpan);
            if (absoluteSpan >= 180) {
                const numSubIntervals = absoluteSpan / 180;
                const step = valuesSpan / numSubIntervals;
                let nextValue = initialValue + step;
                const initialTime = curve.times[i - 1];
                const timeSpan = curve.times[i] - initialTime;
                const interval = timeSpan / numSubIntervals;
                let nextTime = initialTime + interval;
                const interpolatedTimes = [];
                const interpolatedValues = [];
                while(nextTime < curve.times[i]){
                    interpolatedTimes.push(nextTime);
                    nextTime += interval;
                    interpolatedValues.push(nextValue);
                    nextValue += step;
                }
                curve.times = inject(curve.times, i, interpolatedTimes);
                curve.values = inject(curve.values, i, interpolatedValues);
            }
        }
    }
}
class TextParser {
    getPrevNode() {
        return this.nodeStack[this.currentIndent - 2];
    }
    getCurrentNode() {
        return this.nodeStack[this.currentIndent - 1];
    }
    getCurrentProp() {
        return this.currentProp;
    }
    pushStack(node) {
        this.nodeStack.push(node);
        this.currentIndent += 1;
    }
    popStack() {
        this.nodeStack.pop();
        this.currentIndent -= 1;
    }
    setCurrentProp(val, name) {
        this.currentProp = val;
        this.currentPropName = name;
    }
    parse(text) {
        this.currentIndent = 0;
        this.allNodes = new FBXTree();
        this.nodeStack = [];
        this.currentProp = [];
        this.currentPropName = "";
        const scope = this;
        const split = text.split(/[\r\n]+/);
        split.forEach(function(line, i) {
            const matchComment = line.match(/^[\s\t]*;/);
            const matchEmpty = line.match(/^[\s\t]*$/);
            if (matchComment || matchEmpty) return;
            const matchBeginning = line.match("^\\t{" + scope.currentIndent + "}(\\w+):(.*){", "");
            const matchProperty = line.match("^\\t{" + scope.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)");
            const matchEnd = line.match("^\\t{" + (scope.currentIndent - 1) + "}}");
            if (matchBeginning) {
                scope.parseNodeBegin(line, matchBeginning);
            } else if (matchProperty) {
                scope.parseNodeProperty(line, matchProperty, split[++i]);
            } else if (matchEnd) {
                scope.popStack();
            } else if (line.match(/^[^\s\t}]/)) {
                scope.parseNodePropertyContinued(line);
            }
        });
        return this.allNodes;
    }
    parseNodeBegin(line, property) {
        const nodeName = property[1].trim().replace(/^"/, "").replace(/"$/, "");
        const nodeAttrs = property[2].split(",").map(function(attr) {
            return attr.trim().replace(/^"/, "").replace(/"$/, "");
        });
        const node = {
            name: nodeName
        };
        const attrs = this.parseNodeAttr(nodeAttrs);
        const currentNode = this.getCurrentNode();
        if (this.currentIndent === 0) {
            this.allNodes.add(nodeName, node);
        } else {
            if (nodeName in currentNode) {
                if (nodeName === "PoseNode") {
                    currentNode.PoseNode.push(node);
                } else if (currentNode[nodeName].id !== void 0) {
                    currentNode[nodeName] = {};
                    currentNode[nodeName][currentNode[nodeName].id] = currentNode[nodeName];
                }
                if (attrs.id !== "") currentNode[nodeName][attrs.id] = node;
            } else if (typeof attrs.id === "number") {
                currentNode[nodeName] = {};
                currentNode[nodeName][attrs.id] = node;
            } else if (nodeName !== "Properties70") {
                if (nodeName === "PoseNode") currentNode[nodeName] = [
                    node
                ];
                else currentNode[nodeName] = node;
            }
        }
        if (typeof attrs.id === "number") node.id = attrs.id;
        if (attrs.name !== "") node.attrName = attrs.name;
        if (attrs.type !== "") node.attrType = attrs.type;
        this.pushStack(node);
    }
    parseNodeAttr(attrs) {
        let id = attrs[0];
        if (attrs[0] !== "") {
            id = parseInt(attrs[0]);
            if (isNaN(id)) {
                id = attrs[0];
            }
        }
        let name = "", type = "";
        if (attrs.length > 1) {
            name = attrs[1].replace(/^(\w+)::/, "");
            type = attrs[2];
        }
        return {
            id,
            name,
            type
        };
    }
    parseNodeProperty(line, property, contentLine) {
        let propName = property[1].replace(/^"/, "").replace(/"$/, "").trim();
        let propValue = property[2].replace(/^"/, "").replace(/"$/, "").trim();
        if (propName === "Content" && propValue === ",") {
            propValue = contentLine.replace(/"/g, "").replace(/,$/, "").trim();
        }
        const currentNode = this.getCurrentNode();
        const parentName = currentNode.name;
        if (parentName === "Properties70") {
            this.parseNodeSpecialProperty(line, propName, propValue);
            return;
        }
        if (propName === "C") {
            const connProps = propValue.split(",").slice(1);
            const from = parseInt(connProps[0]);
            const to = parseInt(connProps[1]);
            let rest = propValue.split(",").slice(3);
            rest = rest.map(function(elem) {
                return elem.trim().replace(/^"/, "");
            });
            propName = "connections";
            propValue = [
                from,
                to
            ];
            append(propValue, rest);
            if (currentNode[propName] === void 0) {
                currentNode[propName] = [];
            }
        }
        if (propName === "Node") currentNode.id = propValue;
        if (propName in currentNode && Array.isArray(currentNode[propName])) {
            currentNode[propName].push(propValue);
        } else {
            if (propName !== "a") currentNode[propName] = propValue;
            else currentNode.a = propValue;
        }
        this.setCurrentProp(currentNode, propName);
        if (propName === "a" && propValue.slice(-1) !== ",") {
            currentNode.a = parseNumberArray(propValue);
        }
    }
    parseNodePropertyContinued(line) {
        const currentNode = this.getCurrentNode();
        currentNode.a += line;
        if (line.slice(-1) !== ",") {
            currentNode.a = parseNumberArray(currentNode.a);
        }
    }
    // parse "Property70"
    parseNodeSpecialProperty(line, propName, propValue) {
        const props = propValue.split('",').map(function(prop) {
            return prop.trim().replace(/^\"/, "").replace(/\s/, "_");
        });
        const innerPropName = props[0];
        const innerPropType1 = props[1];
        const innerPropType2 = props[2];
        const innerPropFlag = props[3];
        let innerPropValue = props[4];
        switch(innerPropType1){
            case "int":
            case "enum":
            case "bool":
            case "ULongLong":
            case "double":
            case "Number":
            case "FieldOfView":
                innerPropValue = parseFloat(innerPropValue);
                break;
            case "Color":
            case "ColorRGB":
            case "Vector3D":
            case "Lcl_Translation":
            case "Lcl_Rotation":
            case "Lcl_Scaling":
                innerPropValue = parseNumberArray(innerPropValue);
                break;
        }
        this.getPrevNode()[innerPropName] = {
            type: innerPropType1,
            type2: innerPropType2,
            flag: innerPropFlag,
            value: innerPropValue
        };
        this.setCurrentProp(this.getPrevNode(), innerPropName);
    }
}
class BinaryParser {
    parse(buffer) {
        const reader = new BinaryReader(buffer);
        reader.skip(23);
        const version = reader.getUint32();
        if (version < 6400) {
            throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + version);
        }
        const allNodes = new FBXTree();
        while(!this.endOfContent(reader)){
            const node = this.parseNode(reader, version);
            if (node !== null) allNodes.add(node.name, node);
        }
        return allNodes;
    }
    // Check if reader has reached the end of content.
    endOfContent(reader) {
        if (reader.size() % 16 === 0) {
            return (reader.getOffset() + 160 + 16 & ~15) >= reader.size();
        } else {
            return reader.getOffset() + 160 + 16 >= reader.size();
        }
    }
    // recursively parse nodes until the end of the file is reached
    parseNode(reader, version) {
        const node = {};
        const endOffset = version >= 7500 ? reader.getUint64() : reader.getUint32();
        const numProperties = version >= 7500 ? reader.getUint64() : reader.getUint32();
        version >= 7500 ? reader.getUint64() : reader.getUint32();
        const nameLen = reader.getUint8();
        const name = reader.getString(nameLen);
        if (endOffset === 0) return null;
        const propertyList = [];
        for(let i = 0; i < numProperties; i++){
            propertyList.push(this.parseProperty(reader));
        }
        const id = propertyList.length > 0 ? propertyList[0] : "";
        const attrName = propertyList.length > 1 ? propertyList[1] : "";
        const attrType = propertyList.length > 2 ? propertyList[2] : "";
        node.singleProperty = numProperties === 1 && reader.getOffset() === endOffset ? true : false;
        while(endOffset > reader.getOffset()){
            const subNode = this.parseNode(reader, version);
            if (subNode !== null) this.parseSubNode(name, node, subNode);
        }
        node.propertyList = propertyList;
        if (typeof id === "number") node.id = id;
        if (attrName !== "") node.attrName = attrName;
        if (attrType !== "") node.attrType = attrType;
        if (name !== "") node.name = name;
        return node;
    }
    parseSubNode(name, node, subNode) {
        if (subNode.singleProperty === true) {
            const value = subNode.propertyList[0];
            if (Array.isArray(value)) {
                node[subNode.name] = subNode;
                subNode.a = value;
            } else {
                node[subNode.name] = value;
            }
        } else if (name === "Connections" && subNode.name === "C") {
            const array = [];
            subNode.propertyList.forEach(function(property, i) {
                if (i !== 0) array.push(property);
            });
            if (node.connections === void 0) {
                node.connections = [];
            }
            node.connections.push(array);
        } else if (subNode.name === "Properties70") {
            const keys = Object.keys(subNode);
            keys.forEach(function(key) {
                node[key] = subNode[key];
            });
        } else if (name === "Properties70" && subNode.name === "P") {
            let innerPropName = subNode.propertyList[0];
            let innerPropType1 = subNode.propertyList[1];
            const innerPropType2 = subNode.propertyList[2];
            const innerPropFlag = subNode.propertyList[3];
            let innerPropValue;
            if (innerPropName.indexOf("Lcl ") === 0) innerPropName = innerPropName.replace("Lcl ", "Lcl_");
            if (innerPropType1.indexOf("Lcl ") === 0) innerPropType1 = innerPropType1.replace("Lcl ", "Lcl_");
            if (innerPropType1 === "Color" || innerPropType1 === "ColorRGB" || innerPropType1 === "Vector" || innerPropType1 === "Vector3D" || innerPropType1.indexOf("Lcl_") === 0) {
                innerPropValue = [
                    subNode.propertyList[4],
                    subNode.propertyList[5],
                    subNode.propertyList[6]
                ];
            } else {
                innerPropValue = subNode.propertyList[4];
            }
            node[innerPropName] = {
                type: innerPropType1,
                type2: innerPropType2,
                flag: innerPropFlag,
                value: innerPropValue
            };
        } else if (node[subNode.name] === void 0) {
            if (typeof subNode.id === "number") {
                node[subNode.name] = {};
                node[subNode.name][subNode.id] = subNode;
            } else {
                node[subNode.name] = subNode;
            }
        } else {
            if (subNode.name === "PoseNode") {
                if (!Array.isArray(node[subNode.name])) {
                    node[subNode.name] = [
                        node[subNode.name]
                    ];
                }
                node[subNode.name].push(subNode);
            } else if (node[subNode.name][subNode.id] === void 0) {
                node[subNode.name][subNode.id] = subNode;
            }
        }
    }
    parseProperty(reader) {
        const type = reader.getString(1);
        let length;
        switch(type){
            case "C":
                return reader.getBoolean();
            case "D":
                return reader.getFloat64();
            case "F":
                return reader.getFloat32();
            case "I":
                return reader.getInt32();
            case "L":
                return reader.getInt64();
            case "R":
                length = reader.getUint32();
                return reader.getArrayBuffer(length);
            case "S":
                length = reader.getUint32();
                return reader.getString(length);
            case "Y":
                return reader.getInt16();
            case "b":
            case "c":
            case "d":
            case "f":
            case "i":
            case "l":
                const arrayLength = reader.getUint32();
                const encoding = reader.getUint32();
                const compressedLength = reader.getUint32();
                if (encoding === 0) {
                    switch(type){
                        case "b":
                        case "c":
                            return reader.getBooleanArray(arrayLength);
                        case "d":
                            return reader.getFloat64Array(arrayLength);
                        case "f":
                            return reader.getFloat32Array(arrayLength);
                        case "i":
                            return reader.getInt32Array(arrayLength);
                        case "l":
                            return reader.getInt64Array(arrayLength);
                    }
                }
                const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fflate$40$0$2e$6$2e$11$2f$node_modules$2f$fflate$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unzlibSync"])(new Uint8Array(reader.getArrayBuffer(compressedLength)));
                const reader2 = new BinaryReader(data.buffer);
                switch(type){
                    case "b":
                    case "c":
                        return reader2.getBooleanArray(arrayLength);
                    case "d":
                        return reader2.getFloat64Array(arrayLength);
                    case "f":
                        return reader2.getFloat32Array(arrayLength);
                    case "i":
                        return reader2.getInt32Array(arrayLength);
                    case "l":
                        return reader2.getInt64Array(arrayLength);
                }
            default:
                throw new Error("THREE.FBXLoader: Unknown property type " + type);
        }
    }
}
class BinaryReader {
    constructor(buffer, littleEndian){
        this.dv = new DataView(buffer);
        this.offset = 0;
        this.littleEndian = littleEndian !== void 0 ? littleEndian : true;
    }
    getOffset() {
        return this.offset;
    }
    size() {
        return this.dv.buffer.byteLength;
    }
    skip(length) {
        this.offset += length;
    }
    // seems like true/false representation depends on exporter.
    // true: 1 or 'Y'(=0x59), false: 0 or 'T'(=0x54)
    // then sees LSB.
    getBoolean() {
        return (this.getUint8() & 1) === 1;
    }
    getBooleanArray(size) {
        const a = [];
        for(let i = 0; i < size; i++){
            a.push(this.getBoolean());
        }
        return a;
    }
    getUint8() {
        const value = this.dv.getUint8(this.offset);
        this.offset += 1;
        return value;
    }
    getInt16() {
        const value = this.dv.getInt16(this.offset, this.littleEndian);
        this.offset += 2;
        return value;
    }
    getInt32() {
        const value = this.dv.getInt32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    }
    getInt32Array(size) {
        const a = [];
        for(let i = 0; i < size; i++){
            a.push(this.getInt32());
        }
        return a;
    }
    getUint32() {
        const value = this.dv.getUint32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    }
    // JavaScript doesn't support 64-bit integer so calculate this here
    // 1 << 32 will return 1 so using multiply operation instead here.
    // There's a possibility that this method returns wrong value if the value
    // is out of the range between Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.
    // TODO: safely handle 64-bit integer
    getInt64() {
        let low, high;
        if (this.littleEndian) {
            low = this.getUint32();
            high = this.getUint32();
        } else {
            high = this.getUint32();
            low = this.getUint32();
        }
        if (high & 2147483648) {
            high = ~high & 4294967295;
            low = ~low & 4294967295;
            if (low === 4294967295) high = high + 1 & 4294967295;
            low = low + 1 & 4294967295;
            return -(high * 4294967296 + low);
        }
        return high * 4294967296 + low;
    }
    getInt64Array(size) {
        const a = [];
        for(let i = 0; i < size; i++){
            a.push(this.getInt64());
        }
        return a;
    }
    // Note: see getInt64() comment
    getUint64() {
        let low, high;
        if (this.littleEndian) {
            low = this.getUint32();
            high = this.getUint32();
        } else {
            high = this.getUint32();
            low = this.getUint32();
        }
        return high * 4294967296 + low;
    }
    getFloat32() {
        const value = this.dv.getFloat32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    }
    getFloat32Array(size) {
        const a = [];
        for(let i = 0; i < size; i++){
            a.push(this.getFloat32());
        }
        return a;
    }
    getFloat64() {
        const value = this.dv.getFloat64(this.offset, this.littleEndian);
        this.offset += 8;
        return value;
    }
    getFloat64Array(size) {
        const a = [];
        for(let i = 0; i < size; i++){
            a.push(this.getFloat64());
        }
        return a;
    }
    getArrayBuffer(size) {
        const value = this.dv.buffer.slice(this.offset, this.offset + size);
        this.offset += size;
        return value;
    }
    getString(size) {
        let a = [];
        for(let i = 0; i < size; i++){
            a[i] = this.getUint8();
        }
        const nullByte = a.indexOf(0);
        if (nullByte >= 0) a = a.slice(0, nullByte);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeText"])(new Uint8Array(a));
    }
}
class FBXTree {
    add(key, val) {
        this[key] = val;
    }
}
function isFbxFormatBinary(buffer) {
    const CORRECT = "Kaydara FBX Binary  \0";
    return buffer.byteLength >= CORRECT.length && CORRECT === convertArrayBufferToString(buffer, 0, CORRECT.length);
}
function isFbxFormatASCII(text) {
    const CORRECT = [
        "K",
        "a",
        "y",
        "d",
        "a",
        "r",
        "a",
        "\\",
        "F",
        "B",
        "X",
        "\\",
        "B",
        "i",
        "n",
        "a",
        "r",
        "y",
        "\\",
        "\\"
    ];
    let cursor = 0;
    function read(offset) {
        const result = text[offset - 1];
        text = text.slice(cursor + offset);
        cursor++;
        return result;
    }
    for(let i = 0; i < CORRECT.length; ++i){
        const num = read(1);
        if (num === CORRECT[i]) {
            return false;
        }
    }
    return true;
}
function getFbxVersion(text) {
    const versionRegExp = /FBXVersion: (\d+)/;
    const match = text.match(versionRegExp);
    if (match) {
        const version = parseInt(match[1]);
        return version;
    }
    throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.");
}
function convertFBXTimeToSeconds(time) {
    return time / 46186158e3;
}
const dataArray = [];
function getData(polygonVertexIndex, polygonIndex, vertexIndex, infoObject) {
    let index;
    switch(infoObject.mappingType){
        case "ByPolygonVertex":
            index = polygonVertexIndex;
            break;
        case "ByPolygon":
            index = polygonIndex;
            break;
        case "ByVertice":
            index = vertexIndex;
            break;
        case "AllSame":
            index = infoObject.indices[0];
            break;
        default:
            console.warn("THREE.FBXLoader: unknown attribute mapping type " + infoObject.mappingType);
    }
    if (infoObject.referenceType === "IndexToDirect") index = infoObject.indices[index];
    const from = index * infoObject.dataSize;
    const to = from + infoObject.dataSize;
    return slice(dataArray, infoObject.buffer, from, to);
}
const tempEuler = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Euler"]();
const tempVec = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
function generateTransform(transformData) {
    const lTranslationM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lPreRotationM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lRotationM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lPostRotationM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lScalingM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lScalingPivotM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lScalingOffsetM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lRotationOffsetM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lRotationPivotM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lParentGX = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lParentLX = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lGlobalT = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    const inheritType = transformData.inheritType ? transformData.inheritType : 0;
    if (transformData.translation) lTranslationM.setPosition(tempVec.fromArray(transformData.translation));
    if (transformData.preRotation) {
        const array = transformData.preRotation.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        array.push(transformData.eulerOrder);
        lPreRotationM.makeRotationFromEuler(tempEuler.fromArray(array));
    }
    if (transformData.rotation) {
        const array = transformData.rotation.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        array.push(transformData.eulerOrder);
        lRotationM.makeRotationFromEuler(tempEuler.fromArray(array));
    }
    if (transformData.postRotation) {
        const array = transformData.postRotation.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        array.push(transformData.eulerOrder);
        lPostRotationM.makeRotationFromEuler(tempEuler.fromArray(array));
        lPostRotationM.invert();
    }
    if (transformData.scale) lScalingM.scale(tempVec.fromArray(transformData.scale));
    if (transformData.scalingOffset) lScalingOffsetM.setPosition(tempVec.fromArray(transformData.scalingOffset));
    if (transformData.scalingPivot) lScalingPivotM.setPosition(tempVec.fromArray(transformData.scalingPivot));
    if (transformData.rotationOffset) lRotationOffsetM.setPosition(tempVec.fromArray(transformData.rotationOffset));
    if (transformData.rotationPivot) lRotationPivotM.setPosition(tempVec.fromArray(transformData.rotationPivot));
    if (transformData.parentMatrixWorld) {
        lParentLX.copy(transformData.parentMatrix);
        lParentGX.copy(transformData.parentMatrixWorld);
    }
    const lLRM = lPreRotationM.clone().multiply(lRotationM).multiply(lPostRotationM);
    const lParentGRM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    lParentGRM.extractRotation(lParentGX);
    const lParentTM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    lParentTM.copyPosition(lParentGX);
    const lParentGRSM = lParentTM.clone().invert().multiply(lParentGX);
    const lParentGSM = lParentGRM.clone().invert().multiply(lParentGRSM);
    const lLSM = lScalingM;
    const lGlobalRS = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
    if (inheritType === 0) {
        lGlobalRS.copy(lParentGRM).multiply(lLRM).multiply(lParentGSM).multiply(lLSM);
    } else if (inheritType === 1) {
        lGlobalRS.copy(lParentGRM).multiply(lParentGSM).multiply(lLRM).multiply(lLSM);
    } else {
        const lParentLSM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]().scale(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]().setFromMatrixScale(lParentLX));
        const lParentLSM_inv = lParentLSM.clone().invert();
        const lParentGSM_noLocal = lParentGSM.clone().multiply(lParentLSM_inv);
        lGlobalRS.copy(lParentGRM).multiply(lLRM).multiply(lParentGSM_noLocal).multiply(lLSM);
    }
    const lRotationPivotM_inv = lRotationPivotM.clone().invert();
    const lScalingPivotM_inv = lScalingPivotM.clone().invert();
    let lTransform = lTranslationM.clone().multiply(lRotationOffsetM).multiply(lRotationPivotM).multiply(lPreRotationM).multiply(lRotationM).multiply(lPostRotationM).multiply(lRotationPivotM_inv).multiply(lScalingOffsetM).multiply(lScalingPivotM).multiply(lScalingM).multiply(lScalingPivotM_inv);
    const lLocalTWithAllPivotAndOffsetInfo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]().copyPosition(lTransform);
    const lGlobalTranslation = lParentGX.clone().multiply(lLocalTWithAllPivotAndOffsetInfo);
    lGlobalT.copyPosition(lGlobalTranslation);
    lTransform = lGlobalT.clone().multiply(lGlobalRS);
    lTransform.premultiply(lParentGX.invert());
    return lTransform;
}
function getEulerOrder(order) {
    order = order || 0;
    const enums = [
        "ZYX",
        // -> XYZ extrinsic
        "YZX",
        // -> XZY extrinsic
        "XZY",
        // -> YZX extrinsic
        "ZXY",
        // -> YXZ extrinsic
        "YXZ",
        // -> ZXY extrinsic
        "XYZ"
    ];
    if (order === 6) {
        console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect.");
        return enums[0];
    }
    return enums[order];
}
function parseNumberArray(value) {
    const array = value.split(",").map(function(val) {
        return parseFloat(val);
    });
    return array;
}
function convertArrayBufferToString(buffer, from, to) {
    if (from === void 0) from = 0;
    if (to === void 0) to = buffer.byteLength;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeText"])(new Uint8Array(buffer, from, to));
}
function append(a, b) {
    for(let i = 0, j = a.length, l = b.length; i < l; i++, j++){
        a[j] = b[i];
    }
}
function slice(a, b, from, to) {
    for(let i = from, j = 0; i < to; i++, j++){
        a[j] = b[i];
    }
    return a;
}
function inject(a1, index, a2) {
    return a1.slice(0, index).concat(a2).concat(a1.slice(index));
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/loaders/FontLoader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Font",
    ()=>Font,
    "FontLoader",
    ()=>FontLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
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
class FontLoader extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Loader"] {
    constructor(manager){
        super(manager);
    }
    load(url, onLoad, onProgress, onError) {
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
        loader.setPath(this.path);
        loader.setRequestHeader(this.requestHeader);
        loader.setWithCredentials(this.withCredentials);
        loader.load(url, (response)=>{
            if (typeof response !== "string") throw new Error("unsupported data type");
            const json = JSON.parse(response);
            const font = this.parse(json);
            if (onLoad) onLoad(font);
        }, onProgress, onError);
    }
    loadAsync(url, onProgress) {
        return super.loadAsync(url, onProgress);
    }
    parse(json) {
        return new Font(json);
    }
}
class Font {
    constructor(data){
        __publicField(this, "data");
        __publicField(this, "isFont", true);
        __publicField(this, "type", "Font");
        this.data = data;
    }
    generateShapes(text, size = 100, _options) {
        const shapes = [];
        const options = {
            letterSpacing: 0,
            lineHeight: 1,
            ..._options
        };
        const paths = createPaths(text, size, this.data, options);
        for(let p = 0, pl = paths.length; p < pl; p++){
            Array.prototype.push.apply(shapes, paths[p].toShapes(false));
        }
        return shapes;
    }
}
function createPaths(text, size, data, options) {
    const chars = Array.from(text);
    const scale = size / data.resolution;
    const line_height = (data.boundingBox.yMax - data.boundingBox.yMin + data.underlineThickness) * scale;
    const paths = [];
    let offsetX = 0, offsetY = 0;
    for(let i = 0; i < chars.length; i++){
        const char = chars[i];
        if (char === "\n") {
            offsetX = 0;
            offsetY -= line_height * options.lineHeight;
        } else {
            const ret = createPath(char, scale, offsetX, offsetY, data);
            if (ret) {
                offsetX += ret.offsetX + options.letterSpacing;
                paths.push(ret.path);
            }
        }
    }
    return paths;
}
function createPath(char, scale, offsetX, offsetY, data) {
    const glyph = data.glyphs[char] || data.glyphs["?"];
    if (!glyph) {
        console.error('THREE.Font: character "' + char + '" does not exists in font family ' + data.familyName + ".");
        return;
    }
    const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapePath"]();
    let x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2;
    if (glyph.o) {
        const outline = glyph._cachedOutline || (glyph._cachedOutline = glyph.o.split(" "));
        for(let i = 0, l = outline.length; i < l;){
            const action = outline[i++];
            switch(action){
                case "m":
                    x = parseInt(outline[i++]) * scale + offsetX;
                    y = parseInt(outline[i++]) * scale + offsetY;
                    path.moveTo(x, y);
                    break;
                case "l":
                    x = parseInt(outline[i++]) * scale + offsetX;
                    y = parseInt(outline[i++]) * scale + offsetY;
                    path.lineTo(x, y);
                    break;
                case "q":
                    cpx = parseInt(outline[i++]) * scale + offsetX;
                    cpy = parseInt(outline[i++]) * scale + offsetY;
                    cpx1 = parseInt(outline[i++]) * scale + offsetX;
                    cpy1 = parseInt(outline[i++]) * scale + offsetY;
                    path.quadraticCurveTo(cpx1, cpy1, cpx, cpy);
                    break;
                case "b":
                    cpx = parseInt(outline[i++]) * scale + offsetX;
                    cpy = parseInt(outline[i++]) * scale + offsetY;
                    cpx1 = parseInt(outline[i++]) * scale + offsetX;
                    cpy1 = parseInt(outline[i++]) * scale + offsetY;
                    cpx2 = parseInt(outline[i++]) * scale + offsetX;
                    cpy2 = parseInt(outline[i++]) * scale + offsetY;
                    path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, cpx, cpy);
                    break;
            }
        }
    }
    return {
        offsetX: glyph.ha * scale,
        path
    };
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/loaders/GLTFLoader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GLTFLoader",
    ()=>GLTFLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/utils/BufferGeometryUtils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/LoaderUtils.js [app-ssr] (ecmascript)");
;
;
;
;
const SRGBColorSpace = "srgb";
const LinearSRGBColorSpace = "srgb-linear";
const sRGBEncoding = 3001;
const LinearEncoding = 3e3;
class GLTFLoader extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Loader"] {
    constructor(manager){
        super(manager);
        this.dracoLoader = null;
        this.ktx2Loader = null;
        this.meshoptDecoder = null;
        this.pluginCallbacks = [];
        this.register(function(parser) {
            return new GLTFMaterialsClearcoatExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsDispersionExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFTextureBasisUExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFTextureWebPExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFTextureAVIFExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsSheenExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsTransmissionExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsVolumeExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsIorExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsEmissiveStrengthExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsSpecularExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsIridescenceExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsAnisotropyExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMaterialsBumpExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFLightsExtension(parser);
        });
        this.register(function(parser) {
            return new GLTFMeshoptCompression(parser);
        });
        this.register(function(parser) {
            return new GLTFMeshGpuInstancing(parser);
        });
    }
    load(url, onLoad, onProgress, onError) {
        const scope = this;
        let resourcePath;
        if (this.resourcePath !== "") {
            resourcePath = this.resourcePath;
        } else if (this.path !== "") {
            const relativeUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoaderUtils"].extractUrlBase(url);
            resourcePath = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoaderUtils"].resolveURL(relativeUrl, this.path);
        } else {
            resourcePath = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoaderUtils"].extractUrlBase(url);
        }
        this.manager.itemStart(url);
        const _onError = function(e) {
            if (onError) {
                onError(e);
            } else {
                console.error(e);
            }
            scope.manager.itemError(url);
            scope.manager.itemEnd(url);
        };
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
        loader.setPath(this.path);
        loader.setResponseType("arraybuffer");
        loader.setRequestHeader(this.requestHeader);
        loader.setWithCredentials(this.withCredentials);
        loader.load(url, function(data) {
            try {
                scope.parse(data, resourcePath, function(gltf) {
                    onLoad(gltf);
                    scope.manager.itemEnd(url);
                }, _onError);
            } catch (e) {
                _onError(e);
            }
        }, onProgress, _onError);
    }
    setDRACOLoader(dracoLoader) {
        this.dracoLoader = dracoLoader;
        return this;
    }
    setDDSLoader() {
        throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".');
    }
    setKTX2Loader(ktx2Loader) {
        this.ktx2Loader = ktx2Loader;
        return this;
    }
    setMeshoptDecoder(meshoptDecoder) {
        this.meshoptDecoder = meshoptDecoder;
        return this;
    }
    register(callback) {
        if (this.pluginCallbacks.indexOf(callback) === -1) {
            this.pluginCallbacks.push(callback);
        }
        return this;
    }
    unregister(callback) {
        if (this.pluginCallbacks.indexOf(callback) !== -1) {
            this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(callback), 1);
        }
        return this;
    }
    parse(data, path, onLoad, onError) {
        let json;
        const extensions = {};
        const plugins = {};
        if (typeof data === "string") {
            json = JSON.parse(data);
        } else if (data instanceof ArrayBuffer) {
            const magic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeText"])(new Uint8Array(data.slice(0, 4)));
            if (magic === BINARY_EXTENSION_HEADER_MAGIC) {
                try {
                    extensions[EXTENSIONS.KHR_BINARY_GLTF] = new GLTFBinaryExtension(data);
                } catch (error) {
                    if (onError) onError(error);
                    return;
                }
                json = JSON.parse(extensions[EXTENSIONS.KHR_BINARY_GLTF].content);
            } else {
                json = JSON.parse((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeText"])(new Uint8Array(data)));
            }
        } else {
            json = data;
        }
        if (json.asset === void 0 || json.asset.version[0] < 2) {
            if (onError) onError(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
            return;
        }
        const parser = new GLTFParser(json, {
            path: path || this.resourcePath || "",
            crossOrigin: this.crossOrigin,
            requestHeader: this.requestHeader,
            manager: this.manager,
            ktx2Loader: this.ktx2Loader,
            meshoptDecoder: this.meshoptDecoder
        });
        parser.fileLoader.setRequestHeader(this.requestHeader);
        for(let i = 0; i < this.pluginCallbacks.length; i++){
            const plugin = this.pluginCallbacks[i](parser);
            if (!plugin.name) console.error("THREE.GLTFLoader: Invalid plugin found: missing name");
            plugins[plugin.name] = plugin;
            extensions[plugin.name] = true;
        }
        if (json.extensionsUsed) {
            for(let i = 0; i < json.extensionsUsed.length; ++i){
                const extensionName = json.extensionsUsed[i];
                const extensionsRequired = json.extensionsRequired || [];
                switch(extensionName){
                    case EXTENSIONS.KHR_MATERIALS_UNLIT:
                        extensions[extensionName] = new GLTFMaterialsUnlitExtension();
                        break;
                    case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
                        extensions[extensionName] = new GLTFDracoMeshCompressionExtension(json, this.dracoLoader);
                        break;
                    case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
                        extensions[extensionName] = new GLTFTextureTransformExtension();
                        break;
                    case EXTENSIONS.KHR_MESH_QUANTIZATION:
                        extensions[extensionName] = new GLTFMeshQuantizationExtension();
                        break;
                    default:
                        if (extensionsRequired.indexOf(extensionName) >= 0 && plugins[extensionName] === void 0) {
                            console.warn('THREE.GLTFLoader: Unknown extension "' + extensionName + '".');
                        }
                }
            }
        }
        parser.setExtensions(extensions);
        parser.setPlugins(plugins);
        parser.parse(onLoad, onError);
    }
    parseAsync(data, path) {
        const scope = this;
        return new Promise(function(resolve, reject) {
            scope.parse(data, path, resolve, reject);
        });
    }
}
function GLTFRegistry() {
    let objects = {};
    return {
        get: function(key) {
            return objects[key];
        },
        add: function(key, object) {
            objects[key] = object;
        },
        remove: function(key) {
            delete objects[key];
        },
        removeAll: function() {
            objects = {};
        }
    };
}
const EXTENSIONS = {
    KHR_BINARY_GLTF: "KHR_binary_glTF",
    KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
    KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
    KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
    KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
    KHR_MATERIALS_IOR: "KHR_materials_ior",
    KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
    KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
    KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
    KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
    KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
    KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
    KHR_MATERIALS_VOLUME: "KHR_materials_volume",
    KHR_TEXTURE_BASISU: "KHR_texture_basisu",
    KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
    KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
    KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
    EXT_MATERIALS_BUMP: "EXT_materials_bump",
    EXT_TEXTURE_WEBP: "EXT_texture_webp",
    EXT_TEXTURE_AVIF: "EXT_texture_avif",
    EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
    EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class GLTFLightsExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;
        this.cache = {
            refs: {},
            uses: {}
        };
    }
    _markDefs() {
        const parser = this.parser;
        const nodeDefs = this.parser.json.nodes || [];
        for(let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++){
            const nodeDef = nodeDefs[nodeIndex];
            if (nodeDef.extensions && nodeDef.extensions[this.name] && nodeDef.extensions[this.name].light !== void 0) {
                parser._addNodeRef(this.cache, nodeDef.extensions[this.name].light);
            }
        }
    }
    _loadLight(lightIndex) {
        const parser = this.parser;
        const cacheKey = "light:" + lightIndex;
        let dependency = parser.cache.get(cacheKey);
        if (dependency) return dependency;
        const json = parser.json;
        const extensions = json.extensions && json.extensions[this.name] || {};
        const lightDefs = extensions.lights || [];
        const lightDef = lightDefs[lightIndex];
        let lightNode;
        const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](16777215);
        if (lightDef.color !== void 0) color.setRGB(lightDef.color[0], lightDef.color[1], lightDef.color[2], LinearSRGBColorSpace);
        const range = lightDef.range !== void 0 ? lightDef.range : 0;
        switch(lightDef.type){
            case "directional":
                lightNode = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](color);
                lightNode.target.position.set(0, 0, -1);
                lightNode.add(lightNode.target);
                break;
            case "point":
                lightNode = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](color);
                lightNode.distance = range;
                break;
            case "spot":
                lightNode = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpotLight"](color);
                lightNode.distance = range;
                lightDef.spot = lightDef.spot || {};
                lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== void 0 ? lightDef.spot.innerConeAngle : 0;
                lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== void 0 ? lightDef.spot.outerConeAngle : Math.PI / 4;
                lightNode.angle = lightDef.spot.outerConeAngle;
                lightNode.penumbra = 1 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
                lightNode.target.position.set(0, 0, -1);
                lightNode.add(lightNode.target);
                break;
            default:
                throw new Error("THREE.GLTFLoader: Unexpected light type: " + lightDef.type);
        }
        lightNode.position.set(0, 0, 0);
        lightNode.decay = 2;
        assignExtrasToUserData(lightNode, lightDef);
        if (lightDef.intensity !== void 0) lightNode.intensity = lightDef.intensity;
        lightNode.name = parser.createUniqueName(lightDef.name || "light_" + lightIndex);
        dependency = Promise.resolve(lightNode);
        parser.cache.add(cacheKey, dependency);
        return dependency;
    }
    getDependency(type, index) {
        if (type !== "light") return;
        return this._loadLight(index);
    }
    createNodeAttachment(nodeIndex) {
        const self2 = this;
        const parser = this.parser;
        const json = parser.json;
        const nodeDef = json.nodes[nodeIndex];
        const lightDef = nodeDef.extensions && nodeDef.extensions[this.name] || {};
        const lightIndex = lightDef.light;
        if (lightIndex === void 0) return null;
        return this._loadLight(lightIndex).then(function(light) {
            return parser._getNodeRef(self2.cache, lightIndex, light);
        });
    }
}
class GLTFMaterialsUnlitExtension {
    constructor(){
        this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;
    }
    getMaterialType() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"];
    }
    extendParams(materialParams, materialDef, parser) {
        const pending = [];
        materialParams.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](1, 1, 1);
        materialParams.opacity = 1;
        const metallicRoughness = materialDef.pbrMetallicRoughness;
        if (metallicRoughness) {
            if (Array.isArray(metallicRoughness.baseColorFactor)) {
                const array = metallicRoughness.baseColorFactor;
                materialParams.color.setRGB(array[0], array[1], array[2], LinearSRGBColorSpace);
                materialParams.opacity = array[3];
            }
            if (metallicRoughness.baseColorTexture !== void 0) {
                pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, SRGBColorSpace));
            }
        }
        return Promise.all(pending);
    }
}
class GLTFMaterialsEmissiveStrengthExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH;
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const emissiveStrength = materialDef.extensions[this.name].emissiveStrength;
        if (emissiveStrength !== void 0) {
            materialParams.emissiveIntensity = emissiveStrength;
        }
        return Promise.resolve();
    }
}
class GLTFMaterialsClearcoatExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;
    }
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        if (extension.clearcoatFactor !== void 0) {
            materialParams.clearcoat = extension.clearcoatFactor;
        }
        if (extension.clearcoatTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "clearcoatMap", extension.clearcoatTexture));
        }
        if (extension.clearcoatRoughnessFactor !== void 0) {
            materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;
        }
        if (extension.clearcoatRoughnessTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "clearcoatRoughnessMap", extension.clearcoatRoughnessTexture));
        }
        if (extension.clearcoatNormalTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "clearcoatNormalMap", extension.clearcoatNormalTexture));
            if (extension.clearcoatNormalTexture.scale !== void 0) {
                const scale = extension.clearcoatNormalTexture.scale;
                materialParams.clearcoatNormalScale = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](scale, scale);
            }
        }
        return Promise.all(pending);
    }
}
class GLTFMaterialsDispersionExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_DISPERSION;
    }
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const extension = materialDef.extensions[this.name];
        materialParams.dispersion = extension.dispersion !== void 0 ? extension.dispersion : 0;
        return Promise.resolve();
    }
}
class GLTFMaterialsIridescenceExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE;
    }
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        if (extension.iridescenceFactor !== void 0) {
            materialParams.iridescence = extension.iridescenceFactor;
        }
        if (extension.iridescenceTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "iridescenceMap", extension.iridescenceTexture));
        }
        if (extension.iridescenceIor !== void 0) {
            materialParams.iridescenceIOR = extension.iridescenceIor;
        }
        if (materialParams.iridescenceThicknessRange === void 0) {
            materialParams.iridescenceThicknessRange = [
                100,
                400
            ];
        }
        if (extension.iridescenceThicknessMinimum !== void 0) {
            materialParams.iridescenceThicknessRange[0] = extension.iridescenceThicknessMinimum;
        }
        if (extension.iridescenceThicknessMaximum !== void 0) {
            materialParams.iridescenceThicknessRange[1] = extension.iridescenceThicknessMaximum;
        }
        if (extension.iridescenceThicknessTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "iridescenceThicknessMap", extension.iridescenceThicknessTexture));
        }
        return Promise.all(pending);
    }
}
class GLTFMaterialsSheenExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_SHEEN;
    }
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        materialParams.sheenColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0, 0, 0);
        materialParams.sheenRoughness = 0;
        materialParams.sheen = 1;
        const extension = materialDef.extensions[this.name];
        if (extension.sheenColorFactor !== void 0) {
            const colorFactor = extension.sheenColorFactor;
            materialParams.sheenColor.setRGB(colorFactor[0], colorFactor[1], colorFactor[2], LinearSRGBColorSpace);
        }
        if (extension.sheenRoughnessFactor !== void 0) {
            materialParams.sheenRoughness = extension.sheenRoughnessFactor;
        }
        if (extension.sheenColorTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "sheenColorMap", extension.sheenColorTexture, SRGBColorSpace));
        }
        if (extension.sheenRoughnessTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "sheenRoughnessMap", extension.sheenRoughnessTexture));
        }
        return Promise.all(pending);
    }
}
class GLTFMaterialsTransmissionExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;
    }
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        if (extension.transmissionFactor !== void 0) {
            materialParams.transmission = extension.transmissionFactor;
        }
        if (extension.transmissionTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "transmissionMap", extension.transmissionTexture));
        }
        return Promise.all(pending);
    }
}
class GLTFMaterialsVolumeExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_VOLUME;
    }
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        materialParams.thickness = extension.thicknessFactor !== void 0 ? extension.thicknessFactor : 0;
        if (extension.thicknessTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "thicknessMap", extension.thicknessTexture));
        }
        materialParams.attenuationDistance = extension.attenuationDistance || Infinity;
        const colorArray = extension.attenuationColor || [
            1,
            1,
            1
        ];
        materialParams.attenuationColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setRGB(colorArray[0], colorArray[1], colorArray[2], LinearSRGBColorSpace);
        return Promise.all(pending);
    }
}
class GLTFMaterialsIorExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_IOR;
    }
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const extension = materialDef.extensions[this.name];
        materialParams.ior = extension.ior !== void 0 ? extension.ior : 1.5;
        return Promise.resolve();
    }
}
class GLTFMaterialsSpecularExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR;
    }
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        materialParams.specularIntensity = extension.specularFactor !== void 0 ? extension.specularFactor : 1;
        if (extension.specularTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "specularIntensityMap", extension.specularTexture));
        }
        const colorArray = extension.specularColorFactor || [
            1,
            1,
            1
        ];
        materialParams.specularColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setRGB(colorArray[0], colorArray[1], colorArray[2], LinearSRGBColorSpace);
        if (extension.specularColorTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "specularColorMap", extension.specularColorTexture, SRGBColorSpace));
        }
        return Promise.all(pending);
    }
}
class GLTFMaterialsBumpExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.EXT_MATERIALS_BUMP;
    }
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        materialParams.bumpScale = extension.bumpFactor !== void 0 ? extension.bumpFactor : 1;
        if (extension.bumpTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "bumpMap", extension.bumpTexture));
        }
        return Promise.all(pending);
    }
}
class GLTFMaterialsAnisotropyExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_MATERIALS_ANISOTROPY;
    }
    getMaterialType(materialIndex) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshPhysicalMaterial"];
    }
    extendMaterialParams(materialIndex, materialParams) {
        const parser = this.parser;
        const materialDef = parser.json.materials[materialIndex];
        if (!materialDef.extensions || !materialDef.extensions[this.name]) {
            return Promise.resolve();
        }
        const pending = [];
        const extension = materialDef.extensions[this.name];
        if (extension.anisotropyStrength !== void 0) {
            materialParams.anisotropy = extension.anisotropyStrength;
        }
        if (extension.anisotropyRotation !== void 0) {
            materialParams.anisotropyRotation = extension.anisotropyRotation;
        }
        if (extension.anisotropyTexture !== void 0) {
            pending.push(parser.assignTexture(materialParams, "anisotropyMap", extension.anisotropyTexture));
        }
        return Promise.all(pending);
    }
}
class GLTFTextureBasisUExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.KHR_TEXTURE_BASISU;
    }
    loadTexture(textureIndex) {
        const parser = this.parser;
        const json = parser.json;
        const textureDef = json.textures[textureIndex];
        if (!textureDef.extensions || !textureDef.extensions[this.name]) {
            return null;
        }
        const extension = textureDef.extensions[this.name];
        const loader = parser.options.ktx2Loader;
        if (!loader) {
            if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
                throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
            } else {
                return null;
            }
        }
        return parser.loadTextureImage(textureIndex, extension.source, loader);
    }
}
class GLTFTextureWebPExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.EXT_TEXTURE_WEBP;
        this.isSupported = null;
    }
    loadTexture(textureIndex) {
        const name = this.name;
        const parser = this.parser;
        const json = parser.json;
        const textureDef = json.textures[textureIndex];
        if (!textureDef.extensions || !textureDef.extensions[name]) {
            return null;
        }
        const extension = textureDef.extensions[name];
        const source = json.images[extension.source];
        let loader = parser.textureLoader;
        if (source.uri) {
            const handler = parser.options.manager.getHandler(source.uri);
            if (handler !== null) loader = handler;
        }
        return this.detectSupport().then(function(isSupported) {
            if (isSupported) return parser.loadTextureImage(textureIndex, extension.source, loader);
            if (json.extensionsRequired && json.extensionsRequired.indexOf(name) >= 0) {
                throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
            }
            return parser.loadTexture(textureIndex);
        });
    }
    detectSupport() {
        if (!this.isSupported) {
            this.isSupported = new Promise(function(resolve) {
                const image = new Image();
                image.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
                image.onload = image.onerror = function() {
                    resolve(image.height === 1);
                };
            });
        }
        return this.isSupported;
    }
}
class GLTFTextureAVIFExtension {
    constructor(parser){
        this.parser = parser;
        this.name = EXTENSIONS.EXT_TEXTURE_AVIF;
        this.isSupported = null;
    }
    loadTexture(textureIndex) {
        const name = this.name;
        const parser = this.parser;
        const json = parser.json;
        const textureDef = json.textures[textureIndex];
        if (!textureDef.extensions || !textureDef.extensions[name]) {
            return null;
        }
        const extension = textureDef.extensions[name];
        const source = json.images[extension.source];
        let loader = parser.textureLoader;
        if (source.uri) {
            const handler = parser.options.manager.getHandler(source.uri);
            if (handler !== null) loader = handler;
        }
        return this.detectSupport().then(function(isSupported) {
            if (isSupported) return parser.loadTextureImage(textureIndex, extension.source, loader);
            if (json.extensionsRequired && json.extensionsRequired.indexOf(name) >= 0) {
                throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
            }
            return parser.loadTexture(textureIndex);
        });
    }
    detectSupport() {
        if (!this.isSupported) {
            this.isSupported = new Promise(function(resolve) {
                const image = new Image();
                image.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=";
                image.onload = image.onerror = function() {
                    resolve(image.height === 1);
                };
            });
        }
        return this.isSupported;
    }
}
class GLTFMeshoptCompression {
    constructor(parser){
        this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION;
        this.parser = parser;
    }
    loadBufferView(index) {
        const json = this.parser.json;
        const bufferView = json.bufferViews[index];
        if (bufferView.extensions && bufferView.extensions[this.name]) {
            const extensionDef = bufferView.extensions[this.name];
            const buffer = this.parser.getDependency("buffer", extensionDef.buffer);
            const decoder = this.parser.options.meshoptDecoder;
            if (!decoder || !decoder.supported) {
                if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
                    throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
                } else {
                    return null;
                }
            }
            return buffer.then(function(res) {
                const byteOffset = extensionDef.byteOffset || 0;
                const byteLength = extensionDef.byteLength || 0;
                const count = extensionDef.count;
                const stride = extensionDef.byteStride;
                const source = new Uint8Array(res, byteOffset, byteLength);
                if (decoder.decodeGltfBufferAsync) {
                    return decoder.decodeGltfBufferAsync(count, stride, source, extensionDef.mode, extensionDef.filter).then(function(res2) {
                        return res2.buffer;
                    });
                } else {
                    return decoder.ready.then(function() {
                        const result = new ArrayBuffer(count * stride);
                        decoder.decodeGltfBuffer(new Uint8Array(result), count, stride, source, extensionDef.mode, extensionDef.filter);
                        return result;
                    });
                }
            });
        } else {
            return null;
        }
    }
}
class GLTFMeshGpuInstancing {
    constructor(parser){
        this.name = EXTENSIONS.EXT_MESH_GPU_INSTANCING;
        this.parser = parser;
    }
    createNodeMesh(nodeIndex) {
        const json = this.parser.json;
        const nodeDef = json.nodes[nodeIndex];
        if (!nodeDef.extensions || !nodeDef.extensions[this.name] || nodeDef.mesh === void 0) {
            return null;
        }
        const meshDef = json.meshes[nodeDef.mesh];
        for (const primitive of meshDef.primitives){
            if (primitive.mode !== WEBGL_CONSTANTS.TRIANGLES && primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_STRIP && primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_FAN && primitive.mode !== void 0) {
                return null;
            }
        }
        const extensionDef = nodeDef.extensions[this.name];
        const attributesDef = extensionDef.attributes;
        const pending = [];
        const attributes = {};
        for(const key in attributesDef){
            pending.push(this.parser.getDependency("accessor", attributesDef[key]).then((accessor)=>{
                attributes[key] = accessor;
                return attributes[key];
            }));
        }
        if (pending.length < 1) {
            return null;
        }
        pending.push(this.parser.createNodeMesh(nodeIndex));
        return Promise.all(pending).then((results)=>{
            const nodeObject = results.pop();
            const meshes = nodeObject.isGroup ? nodeObject.children : [
                nodeObject
            ];
            const count = results[0].count;
            const instancedMeshes = [];
            for (const mesh of meshes){
                const m = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
                const p = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
                const q = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]();
                const s = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1);
                const instancedMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InstancedMesh"](mesh.geometry, mesh.material, count);
                for(let i = 0; i < count; i++){
                    if (attributes.TRANSLATION) {
                        p.fromBufferAttribute(attributes.TRANSLATION, i);
                    }
                    if (attributes.ROTATION) {
                        q.fromBufferAttribute(attributes.ROTATION, i);
                    }
                    if (attributes.SCALE) {
                        s.fromBufferAttribute(attributes.SCALE, i);
                    }
                    instancedMesh.setMatrixAt(i, m.compose(p, q, s));
                }
                for(const attributeName in attributes){
                    if (attributeName === "_COLOR_0") {
                        const attr = attributes[attributeName];
                        instancedMesh.instanceColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InstancedBufferAttribute"](attr.array, attr.itemSize, attr.normalized);
                    } else if (attributeName !== "TRANSLATION" && attributeName !== "ROTATION" && attributeName !== "SCALE") {
                        mesh.geometry.setAttribute(attributeName, attributes[attributeName]);
                    }
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Object3D"].prototype.copy.call(instancedMesh, mesh);
                this.parser.assignFinalMaterial(instancedMesh);
                instancedMeshes.push(instancedMesh);
            }
            if (nodeObject.isGroup) {
                nodeObject.clear();
                nodeObject.add(...instancedMeshes);
                return nodeObject;
            }
            return instancedMeshes[0];
        });
    }
}
const BINARY_EXTENSION_HEADER_MAGIC = "glTF";
const BINARY_EXTENSION_HEADER_LENGTH = 12;
const BINARY_EXTENSION_CHUNK_TYPES = {
    JSON: 1313821514,
    BIN: 5130562
};
class GLTFBinaryExtension {
    constructor(data){
        this.name = EXTENSIONS.KHR_BINARY_GLTF;
        this.content = null;
        this.body = null;
        const headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);
        this.header = {
            magic: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeText"])(new Uint8Array(data.slice(0, 4))),
            version: headerView.getUint32(4, true),
            length: headerView.getUint32(8, true)
        };
        if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {
            throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
        } else if (this.header.version < 2) {
            throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
        }
        const chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
        const chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
        let chunkIndex = 0;
        while(chunkIndex < chunkContentsLength){
            const chunkLength = chunkView.getUint32(chunkIndex, true);
            chunkIndex += 4;
            const chunkType = chunkView.getUint32(chunkIndex, true);
            chunkIndex += 4;
            if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {
                const contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
                this.content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeText"])(contentArray);
            } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {
                const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
                this.body = data.slice(byteOffset, byteOffset + chunkLength);
            }
            chunkIndex += chunkLength;
        }
        if (this.content === null) {
            throw new Error("THREE.GLTFLoader: JSON content not found.");
        }
    }
}
class GLTFDracoMeshCompressionExtension {
    constructor(json, dracoLoader){
        if (!dracoLoader) {
            throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
        }
        this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
        this.json = json;
        this.dracoLoader = dracoLoader;
        this.dracoLoader.preload();
    }
    decodePrimitive(primitive, parser) {
        const json = this.json;
        const dracoLoader = this.dracoLoader;
        const bufferViewIndex = primitive.extensions[this.name].bufferView;
        const gltfAttributeMap = primitive.extensions[this.name].attributes;
        const threeAttributeMap = {};
        const attributeNormalizedMap = {};
        const attributeTypeMap = {};
        for(const attributeName in gltfAttributeMap){
            const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
            threeAttributeMap[threeAttributeName] = gltfAttributeMap[attributeName];
        }
        for(const attributeName in primitive.attributes){
            const threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
            if (gltfAttributeMap[attributeName] !== void 0) {
                const accessorDef = json.accessors[primitive.attributes[attributeName]];
                const componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
                attributeTypeMap[threeAttributeName] = componentType.name;
                attributeNormalizedMap[threeAttributeName] = accessorDef.normalized === true;
            }
        }
        return parser.getDependency("bufferView", bufferViewIndex).then(function(bufferView) {
            return new Promise(function(resolve, reject) {
                dracoLoader.decodeDracoFile(bufferView, function(geometry) {
                    for(const attributeName in geometry.attributes){
                        const attribute = geometry.attributes[attributeName];
                        const normalized = attributeNormalizedMap[attributeName];
                        if (normalized !== void 0) attribute.normalized = normalized;
                    }
                    resolve(geometry);
                }, threeAttributeMap, attributeTypeMap, LinearSRGBColorSpace, reject);
            });
        });
    }
}
class GLTFTextureTransformExtension {
    constructor(){
        this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;
    }
    extendTexture(texture, transform) {
        if ((transform.texCoord === void 0 || transform.texCoord === texture.channel) && transform.offset === void 0 && transform.rotation === void 0 && transform.scale === void 0) {
            return texture;
        }
        texture = texture.clone();
        if (transform.texCoord !== void 0) {
            texture.channel = transform.texCoord;
        }
        if (transform.offset !== void 0) {
            texture.offset.fromArray(transform.offset);
        }
        if (transform.rotation !== void 0) {
            texture.rotation = transform.rotation;
        }
        if (transform.scale !== void 0) {
            texture.repeat.fromArray(transform.scale);
        }
        texture.needsUpdate = true;
        return texture;
    }
}
class GLTFMeshQuantizationExtension {
    constructor(){
        this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;
    }
}
class GLTFCubicSplineInterpolant extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Interpolant"] {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer){
        super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
    copySampleValue_(index) {
        const result = this.resultBuffer, values = this.sampleValues, valueSize = this.valueSize, offset = index * valueSize * 3 + valueSize;
        for(let i = 0; i !== valueSize; i++){
            result[i] = values[offset + i];
        }
        return result;
    }
    interpolate_(i1, t0, t, t1) {
        const result = this.resultBuffer;
        const values = this.sampleValues;
        const stride = this.valueSize;
        const stride2 = stride * 2;
        const stride3 = stride * 3;
        const td = t1 - t0;
        const p = (t - t0) / td;
        const pp = p * p;
        const ppp = pp * p;
        const offset1 = i1 * stride3;
        const offset0 = offset1 - stride3;
        const s2 = -2 * ppp + 3 * pp;
        const s3 = ppp - pp;
        const s0 = 1 - s2;
        const s1 = s3 - pp + p;
        for(let i = 0; i !== stride; i++){
            const p0 = values[offset0 + i + stride];
            const m0 = values[offset0 + i + stride2] * td;
            const p1 = values[offset1 + i + stride];
            const m1 = values[offset1 + i] * td;
            result[i] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;
        }
        return result;
    }
}
const _q = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]();
class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {
    interpolate_(i1, t0, t, t1) {
        const result = super.interpolate_(i1, t0, t, t1);
        _q.fromArray(result).normalize().toArray(result);
        return result;
    }
}
const WEBGL_CONSTANTS = {
    FLOAT: 5126,
    //FLOAT_MAT2: 35674,
    FLOAT_MAT3: 35675,
    FLOAT_MAT4: 35676,
    FLOAT_VEC2: 35664,
    FLOAT_VEC3: 35665,
    FLOAT_VEC4: 35666,
    LINEAR: 9729,
    REPEAT: 10497,
    SAMPLER_2D: 35678,
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
    UNSIGNED_BYTE: 5121,
    UNSIGNED_SHORT: 5123
};
const WEBGL_COMPONENT_TYPES = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
};
const WEBGL_FILTERS = {
    9728: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NearestFilter"],
    9729: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearFilter"],
    9984: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NearestMipmapNearestFilter"],
    9985: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearMipmapNearestFilter"],
    9986: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NearestMipmapLinearFilter"],
    9987: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearMipmapLinearFilter"]
};
const WEBGL_WRAPPINGS = {
    33071: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"],
    33648: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MirroredRepeatWrapping"],
    10497: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"]
};
const WEBGL_TYPE_SIZES = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
};
const ATTRIBUTES = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    // uv => uv1, 4 uv channels
    // https://github.com/mrdoob/three.js/pull/25943
    // https://github.com/mrdoob/three.js/pull/25788
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["version"] >= 152 ? {
        TEXCOORD_0: "uv",
        TEXCOORD_1: "uv1",
        TEXCOORD_2: "uv2",
        TEXCOORD_3: "uv3"
    } : {
        TEXCOORD_0: "uv",
        TEXCOORD_1: "uv2"
    },
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex"
};
const PATH_PROPERTIES = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences"
};
const INTERPOLATION = {
    CUBICSPLINE: void 0,
    // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
    // keyframe track will be initialized with a default interpolation type, then modified.
    LINEAR: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InterpolateLinear"],
    STEP: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InterpolateDiscrete"]
};
const ALPHA_MODES = {
    OPAQUE: "OPAQUE",
    MASK: "MASK",
    BLEND: "BLEND"
};
function createDefaultMaterial(cache) {
    if (cache["DefaultMaterial"] === void 0) {
        cache["DefaultMaterial"] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: 16777215,
            emissive: 0,
            metalness: 1,
            roughness: 1,
            transparent: false,
            depthTest: true,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FrontSide"]
        });
    }
    return cache["DefaultMaterial"];
}
function addUnknownExtensionsToUserData(knownExtensions, object, objectDef) {
    for(const name in objectDef.extensions){
        if (knownExtensions[name] === void 0) {
            object.userData.gltfExtensions = object.userData.gltfExtensions || {};
            object.userData.gltfExtensions[name] = objectDef.extensions[name];
        }
    }
}
function assignExtrasToUserData(object, gltfDef) {
    if (gltfDef.extras !== void 0) {
        if (typeof gltfDef.extras === "object") {
            Object.assign(object.userData, gltfDef.extras);
        } else {
            console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + gltfDef.extras);
        }
    }
}
function addMorphTargets(geometry, targets, parser) {
    let hasMorphPosition = false;
    let hasMorphNormal = false;
    let hasMorphColor = false;
    for(let i = 0, il = targets.length; i < il; i++){
        const target = targets[i];
        if (target.POSITION !== void 0) hasMorphPosition = true;
        if (target.NORMAL !== void 0) hasMorphNormal = true;
        if (target.COLOR_0 !== void 0) hasMorphColor = true;
        if (hasMorphPosition && hasMorphNormal && hasMorphColor) break;
    }
    if (!hasMorphPosition && !hasMorphNormal && !hasMorphColor) return Promise.resolve(geometry);
    const pendingPositionAccessors = [];
    const pendingNormalAccessors = [];
    const pendingColorAccessors = [];
    for(let i = 0, il = targets.length; i < il; i++){
        const target = targets[i];
        if (hasMorphPosition) {
            const pendingAccessor = target.POSITION !== void 0 ? parser.getDependency("accessor", target.POSITION) : geometry.attributes.position;
            pendingPositionAccessors.push(pendingAccessor);
        }
        if (hasMorphNormal) {
            const pendingAccessor = target.NORMAL !== void 0 ? parser.getDependency("accessor", target.NORMAL) : geometry.attributes.normal;
            pendingNormalAccessors.push(pendingAccessor);
        }
        if (hasMorphColor) {
            const pendingAccessor = target.COLOR_0 !== void 0 ? parser.getDependency("accessor", target.COLOR_0) : geometry.attributes.color;
            pendingColorAccessors.push(pendingAccessor);
        }
    }
    return Promise.all([
        Promise.all(pendingPositionAccessors),
        Promise.all(pendingNormalAccessors),
        Promise.all(pendingColorAccessors)
    ]).then(function(accessors) {
        const morphPositions = accessors[0];
        const morphNormals = accessors[1];
        const morphColors = accessors[2];
        if (hasMorphPosition) geometry.morphAttributes.position = morphPositions;
        if (hasMorphNormal) geometry.morphAttributes.normal = morphNormals;
        if (hasMorphColor) geometry.morphAttributes.color = morphColors;
        geometry.morphTargetsRelative = true;
        return geometry;
    });
}
function updateMorphTargets(mesh, meshDef) {
    mesh.updateMorphTargets();
    if (meshDef.weights !== void 0) {
        for(let i = 0, il = meshDef.weights.length; i < il; i++){
            mesh.morphTargetInfluences[i] = meshDef.weights[i];
        }
    }
    if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {
        const targetNames = meshDef.extras.targetNames;
        if (mesh.morphTargetInfluences.length === targetNames.length) {
            mesh.morphTargetDictionary = {};
            for(let i = 0, il = targetNames.length; i < il; i++){
                mesh.morphTargetDictionary[targetNames[i]] = i;
            }
        } else {
            console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
        }
    }
}
function createPrimitiveKey(primitiveDef) {
    let geometryKey;
    const dracoExtension = primitiveDef.extensions && primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
    if (dracoExtension) {
        geometryKey = "draco:" + dracoExtension.bufferView + ":" + dracoExtension.indices + ":" + createAttributesKey(dracoExtension.attributes);
    } else {
        geometryKey = primitiveDef.indices + ":" + createAttributesKey(primitiveDef.attributes) + ":" + primitiveDef.mode;
    }
    if (primitiveDef.targets !== void 0) {
        for(let i = 0, il = primitiveDef.targets.length; i < il; i++){
            geometryKey += ":" + createAttributesKey(primitiveDef.targets[i]);
        }
    }
    return geometryKey;
}
function createAttributesKey(attributes) {
    let attributesKey = "";
    const keys = Object.keys(attributes).sort();
    for(let i = 0, il = keys.length; i < il; i++){
        attributesKey += keys[i] + ":" + attributes[keys[i]] + ";";
    }
    return attributesKey;
}
function getNormalizedComponentScale(constructor) {
    switch(constructor){
        case Int8Array:
            return 1 / 127;
        case Uint8Array:
            return 1 / 255;
        case Int16Array:
            return 1 / 32767;
        case Uint16Array:
            return 1 / 65535;
        default:
            throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
    }
}
function getImageURIMimeType(uri) {
    if (uri.search(/\.jpe?g($|\?)/i) > 0 || uri.search(/^data\:image\/jpeg/) === 0) return "image/jpeg";
    if (uri.search(/\.webp($|\?)/i) > 0 || uri.search(/^data\:image\/webp/) === 0) return "image/webp";
    return "image/png";
}
const _identityMatrix = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
class GLTFParser {
    constructor(json = {}, options = {}){
        this.json = json;
        this.extensions = {};
        this.plugins = {};
        this.options = options;
        this.cache = new GLTFRegistry();
        this.associations = /* @__PURE__ */ new Map();
        this.primitiveCache = {};
        this.nodeCache = {};
        this.meshCache = {
            refs: {},
            uses: {}
        };
        this.cameraCache = {
            refs: {},
            uses: {}
        };
        this.lightCache = {
            refs: {},
            uses: {}
        };
        this.sourceCache = {};
        this.textureCache = {};
        this.nodeNamesUsed = {};
        let isSafari = false;
        let isFirefox = false;
        let firefoxVersion = -1;
        if (typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined") {
            isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === true;
            isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
            firefoxVersion = isFirefox ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1;
        }
        if (typeof createImageBitmap === "undefined" || isSafari || isFirefox && firefoxVersion < 98) {
            this.textureLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextureLoader"](this.options.manager);
        } else {
            this.textureLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImageBitmapLoader"](this.options.manager);
        }
        this.textureLoader.setCrossOrigin(this.options.crossOrigin);
        this.textureLoader.setRequestHeader(this.options.requestHeader);
        this.fileLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileLoader"](this.options.manager);
        this.fileLoader.setResponseType("arraybuffer");
        if (this.options.crossOrigin === "use-credentials") {
            this.fileLoader.setWithCredentials(true);
        }
    }
    setExtensions(extensions) {
        this.extensions = extensions;
    }
    setPlugins(plugins) {
        this.plugins = plugins;
    }
    parse(onLoad, onError) {
        const parser = this;
        const json = this.json;
        const extensions = this.extensions;
        this.cache.removeAll();
        this.nodeCache = {};
        this._invokeAll(function(ext) {
            return ext._markDefs && ext._markDefs();
        });
        Promise.all(this._invokeAll(function(ext) {
            return ext.beforeRoot && ext.beforeRoot();
        })).then(function() {
            return Promise.all([
                parser.getDependencies("scene"),
                parser.getDependencies("animation"),
                parser.getDependencies("camera")
            ]);
        }).then(function(dependencies) {
            const result = {
                scene: dependencies[0][json.scene || 0],
                scenes: dependencies[0],
                animations: dependencies[1],
                cameras: dependencies[2],
                asset: json.asset,
                parser,
                userData: {}
            };
            addUnknownExtensionsToUserData(extensions, result, json);
            assignExtrasToUserData(result, json);
            return Promise.all(parser._invokeAll(function(ext) {
                return ext.afterRoot && ext.afterRoot(result);
            })).then(function() {
                for (const scene of result.scenes){
                    scene.updateMatrixWorld();
                }
                onLoad(result);
            });
        }).catch(onError);
    }
    /**
   * Marks the special nodes/meshes in json for efficient parse.
   */ _markDefs() {
        const nodeDefs = this.json.nodes || [];
        const skinDefs = this.json.skins || [];
        const meshDefs = this.json.meshes || [];
        for(let skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex++){
            const joints = skinDefs[skinIndex].joints;
            for(let i = 0, il = joints.length; i < il; i++){
                nodeDefs[joints[i]].isBone = true;
            }
        }
        for(let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++){
            const nodeDef = nodeDefs[nodeIndex];
            if (nodeDef.mesh !== void 0) {
                this._addNodeRef(this.meshCache, nodeDef.mesh);
                if (nodeDef.skin !== void 0) {
                    meshDefs[nodeDef.mesh].isSkinnedMesh = true;
                }
            }
            if (nodeDef.camera !== void 0) {
                this._addNodeRef(this.cameraCache, nodeDef.camera);
            }
        }
    }
    /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */ _addNodeRef(cache, index) {
        if (index === void 0) return;
        if (cache.refs[index] === void 0) {
            cache.refs[index] = cache.uses[index] = 0;
        }
        cache.refs[index]++;
    }
    /** Returns a reference to a shared resource, cloning it if necessary. */ _getNodeRef(cache, index, object) {
        if (cache.refs[index] <= 1) return object;
        const ref = object.clone();
        const updateMappings = (original, clone)=>{
            const mappings = this.associations.get(original);
            if (mappings != null) {
                this.associations.set(clone, mappings);
            }
            for (const [i, child] of original.children.entries()){
                updateMappings(child, clone.children[i]);
            }
        };
        updateMappings(object, ref);
        ref.name += "_instance_" + cache.uses[index]++;
        return ref;
    }
    _invokeOne(func) {
        const extensions = Object.values(this.plugins);
        extensions.push(this);
        for(let i = 0; i < extensions.length; i++){
            const result = func(extensions[i]);
            if (result) return result;
        }
        return null;
    }
    _invokeAll(func) {
        const extensions = Object.values(this.plugins);
        extensions.unshift(this);
        const pending = [];
        for(let i = 0; i < extensions.length; i++){
            const result = func(extensions[i]);
            if (result) pending.push(result);
        }
        return pending;
    }
    /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */ getDependency(type, index) {
        const cacheKey = type + ":" + index;
        let dependency = this.cache.get(cacheKey);
        if (!dependency) {
            switch(type){
                case "scene":
                    dependency = this.loadScene(index);
                    break;
                case "node":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadNode && ext.loadNode(index);
                    });
                    break;
                case "mesh":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadMesh && ext.loadMesh(index);
                    });
                    break;
                case "accessor":
                    dependency = this.loadAccessor(index);
                    break;
                case "bufferView":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadBufferView && ext.loadBufferView(index);
                    });
                    break;
                case "buffer":
                    dependency = this.loadBuffer(index);
                    break;
                case "material":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadMaterial && ext.loadMaterial(index);
                    });
                    break;
                case "texture":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadTexture && ext.loadTexture(index);
                    });
                    break;
                case "skin":
                    dependency = this.loadSkin(index);
                    break;
                case "animation":
                    dependency = this._invokeOne(function(ext) {
                        return ext.loadAnimation && ext.loadAnimation(index);
                    });
                    break;
                case "camera":
                    dependency = this.loadCamera(index);
                    break;
                default:
                    dependency = this._invokeOne(function(ext) {
                        return ext != this && ext.getDependency && ext.getDependency(type, index);
                    });
                    if (!dependency) {
                        throw new Error("Unknown type: " + type);
                    }
                    break;
            }
            this.cache.add(cacheKey, dependency);
        }
        return dependency;
    }
    /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */ getDependencies(type) {
        let dependencies = this.cache.get(type);
        if (!dependencies) {
            const parser = this;
            const defs = this.json[type + (type === "mesh" ? "es" : "s")] || [];
            dependencies = Promise.all(defs.map(function(def, index) {
                return parser.getDependency(type, index);
            }));
            this.cache.add(type, dependencies);
        }
        return dependencies;
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */ loadBuffer(bufferIndex) {
        const bufferDef = this.json.buffers[bufferIndex];
        const loader = this.fileLoader;
        if (bufferDef.type && bufferDef.type !== "arraybuffer") {
            throw new Error("THREE.GLTFLoader: " + bufferDef.type + " buffer type is not supported.");
        }
        if (bufferDef.uri === void 0 && bufferIndex === 0) {
            return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);
        }
        const options = this.options;
        return new Promise(function(resolve, reject) {
            loader.load(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoaderUtils"].resolveURL(bufferDef.uri, options.path), resolve, void 0, function() {
                reject(new Error('THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".'));
            });
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */ loadBufferView(bufferViewIndex) {
        const bufferViewDef = this.json.bufferViews[bufferViewIndex];
        return this.getDependency("buffer", bufferViewDef.buffer).then(function(buffer) {
            const byteLength = bufferViewDef.byteLength || 0;
            const byteOffset = bufferViewDef.byteOffset || 0;
            return buffer.slice(byteOffset, byteOffset + byteLength);
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */ loadAccessor(accessorIndex) {
        const parser = this;
        const json = this.json;
        const accessorDef = this.json.accessors[accessorIndex];
        if (accessorDef.bufferView === void 0 && accessorDef.sparse === void 0) {
            const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
            const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
            const normalized = accessorDef.normalized === true;
            const array = new TypedArray(accessorDef.count * itemSize);
            return Promise.resolve(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](array, itemSize, normalized));
        }
        const pendingBufferViews = [];
        if (accessorDef.bufferView !== void 0) {
            pendingBufferViews.push(this.getDependency("bufferView", accessorDef.bufferView));
        } else {
            pendingBufferViews.push(null);
        }
        if (accessorDef.sparse !== void 0) {
            pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.indices.bufferView));
            pendingBufferViews.push(this.getDependency("bufferView", accessorDef.sparse.values.bufferView));
        }
        return Promise.all(pendingBufferViews).then(function(bufferViews) {
            const bufferView = bufferViews[0];
            const itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
            const TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
            const elementBytes = TypedArray.BYTES_PER_ELEMENT;
            const itemBytes = elementBytes * itemSize;
            const byteOffset = accessorDef.byteOffset || 0;
            const byteStride = accessorDef.bufferView !== void 0 ? json.bufferViews[accessorDef.bufferView].byteStride : void 0;
            const normalized = accessorDef.normalized === true;
            let array, bufferAttribute;
            if (byteStride && byteStride !== itemBytes) {
                const ibSlice = Math.floor(byteOffset / byteStride);
                const ibCacheKey = "InterleavedBuffer:" + accessorDef.bufferView + ":" + accessorDef.componentType + ":" + ibSlice + ":" + accessorDef.count;
                let ib = parser.cache.get(ibCacheKey);
                if (!ib) {
                    array = new TypedArray(bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes);
                    ib = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InterleavedBuffer"](array, byteStride / elementBytes);
                    parser.cache.add(ibCacheKey, ib);
                }
                bufferAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](ib, itemSize, byteOffset % byteStride / elementBytes, normalized);
            } else {
                if (bufferView === null) {
                    array = new TypedArray(accessorDef.count * itemSize);
                } else {
                    array = new TypedArray(bufferView, byteOffset, accessorDef.count * itemSize);
                }
                bufferAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](array, itemSize, normalized);
            }
            if (accessorDef.sparse !== void 0) {
                const itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
                const TypedArrayIndices = WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType];
                const byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
                const byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;
                const sparseIndices = new TypedArrayIndices(bufferViews[1], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices);
                const sparseValues = new TypedArray(bufferViews[2], byteOffsetValues, accessorDef.sparse.count * itemSize);
                if (bufferView !== null) {
                    bufferAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized);
                }
                for(let i = 0, il = sparseIndices.length; i < il; i++){
                    const index = sparseIndices[i];
                    bufferAttribute.setX(index, sparseValues[i * itemSize]);
                    if (itemSize >= 2) bufferAttribute.setY(index, sparseValues[i * itemSize + 1]);
                    if (itemSize >= 3) bufferAttribute.setZ(index, sparseValues[i * itemSize + 2]);
                    if (itemSize >= 4) bufferAttribute.setW(index, sparseValues[i * itemSize + 3]);
                    if (itemSize >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
                }
            }
            return bufferAttribute;
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */ loadTexture(textureIndex) {
        const json = this.json;
        const options = this.options;
        const textureDef = json.textures[textureIndex];
        const sourceIndex = textureDef.source;
        const sourceDef = json.images[sourceIndex];
        let loader = this.textureLoader;
        if (sourceDef.uri) {
            const handler = options.manager.getHandler(sourceDef.uri);
            if (handler !== null) loader = handler;
        }
        return this.loadTextureImage(textureIndex, sourceIndex, loader);
    }
    loadTextureImage(textureIndex, sourceIndex, loader) {
        const parser = this;
        const json = this.json;
        const textureDef = json.textures[textureIndex];
        const sourceDef = json.images[sourceIndex];
        const cacheKey = (sourceDef.uri || sourceDef.bufferView) + ":" + textureDef.sampler;
        if (this.textureCache[cacheKey]) {
            return this.textureCache[cacheKey];
        }
        const promise = this.loadImageSource(sourceIndex, loader).then(function(texture) {
            texture.flipY = false;
            texture.name = textureDef.name || sourceDef.name || "";
            if (texture.name === "" && typeof sourceDef.uri === "string" && sourceDef.uri.startsWith("data:image/") === false) {
                texture.name = sourceDef.uri;
            }
            const samplers = json.samplers || {};
            const sampler = samplers[textureDef.sampler] || {};
            texture.magFilter = WEBGL_FILTERS[sampler.magFilter] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearFilter"];
            texture.minFilter = WEBGL_FILTERS[sampler.minFilter] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearMipmapLinearFilter"];
            texture.wrapS = WEBGL_WRAPPINGS[sampler.wrapS] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            texture.wrapT = WEBGL_WRAPPINGS[sampler.wrapT] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            parser.associations.set(texture, {
                textures: textureIndex
            });
            return texture;
        }).catch(function() {
            return null;
        });
        this.textureCache[cacheKey] = promise;
        return promise;
    }
    loadImageSource(sourceIndex, loader) {
        const parser = this;
        const json = this.json;
        const options = this.options;
        if (this.sourceCache[sourceIndex] !== void 0) {
            return this.sourceCache[sourceIndex].then((texture)=>texture.clone());
        }
        const sourceDef = json.images[sourceIndex];
        const URL = self.URL || self.webkitURL;
        let sourceURI = sourceDef.uri || "";
        let isObjectURL = false;
        if (sourceDef.bufferView !== void 0) {
            sourceURI = parser.getDependency("bufferView", sourceDef.bufferView).then(function(bufferView) {
                isObjectURL = true;
                const blob = new Blob([
                    bufferView
                ], {
                    type: sourceDef.mimeType
                });
                sourceURI = URL.createObjectURL(blob);
                return sourceURI;
            });
        } else if (sourceDef.uri === void 0) {
            throw new Error("THREE.GLTFLoader: Image " + sourceIndex + " is missing URI and bufferView");
        }
        const promise = Promise.resolve(sourceURI).then(function(sourceURI2) {
            return new Promise(function(resolve, reject) {
                let onLoad = resolve;
                if (loader.isImageBitmapLoader === true) {
                    onLoad = function(imageBitmap) {
                        const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Texture"](imageBitmap);
                        texture.needsUpdate = true;
                        resolve(texture);
                    };
                }
                loader.load(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoaderUtils"].resolveURL(sourceURI2, options.path), onLoad, void 0, reject);
            });
        }).then(function(texture) {
            if (isObjectURL === true) {
                URL.revokeObjectURL(sourceURI);
            }
            assignExtrasToUserData(texture, sourceDef);
            texture.userData.mimeType = sourceDef.mimeType || getImageURIMimeType(sourceDef.uri);
            return texture;
        }).catch(function(error) {
            console.error("THREE.GLTFLoader: Couldn't load texture", sourceURI);
            throw error;
        });
        this.sourceCache[sourceIndex] = promise;
        return promise;
    }
    /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */ assignTexture(materialParams, mapName, mapDef, colorSpace) {
        const parser = this;
        return this.getDependency("texture", mapDef.index).then(function(texture) {
            if (!texture) return null;
            if (mapDef.texCoord !== void 0 && mapDef.texCoord > 0) {
                texture = texture.clone();
                texture.channel = mapDef.texCoord;
            }
            if (parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {
                const transform = mapDef.extensions !== void 0 ? mapDef.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] : void 0;
                if (transform) {
                    const gltfReference = parser.associations.get(texture);
                    texture = parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(texture, transform);
                    parser.associations.set(texture, gltfReference);
                }
            }
            if (colorSpace !== void 0) {
                if (typeof colorSpace === "number") colorSpace = colorSpace === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace;
                if ("colorSpace" in texture) texture.colorSpace = colorSpace;
                else texture.encoding = colorSpace === SRGBColorSpace ? sRGBEncoding : LinearEncoding;
            }
            materialParams[mapName] = texture;
            return texture;
        });
    }
    /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */ assignFinalMaterial(mesh) {
        const geometry = mesh.geometry;
        let material = mesh.material;
        const useDerivativeTangents = geometry.attributes.tangent === void 0;
        const useVertexColors = geometry.attributes.color !== void 0;
        const useFlatShading = geometry.attributes.normal === void 0;
        if (mesh.isPoints) {
            const cacheKey = "PointsMaterial:" + material.uuid;
            let pointsMaterial = this.cache.get(cacheKey);
            if (!pointsMaterial) {
                pointsMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Material"].prototype.copy.call(pointsMaterial, material);
                pointsMaterial.color.copy(material.color);
                pointsMaterial.map = material.map;
                pointsMaterial.sizeAttenuation = false;
                this.cache.add(cacheKey, pointsMaterial);
            }
            material = pointsMaterial;
        } else if (mesh.isLine) {
            const cacheKey = "LineBasicMaterial:" + material.uuid;
            let lineMaterial = this.cache.get(cacheKey);
            if (!lineMaterial) {
                lineMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Material"].prototype.copy.call(lineMaterial, material);
                lineMaterial.color.copy(material.color);
                lineMaterial.map = material.map;
                this.cache.add(cacheKey, lineMaterial);
            }
            material = lineMaterial;
        }
        if (useDerivativeTangents || useVertexColors || useFlatShading) {
            let cacheKey = "ClonedMaterial:" + material.uuid + ":";
            if (useDerivativeTangents) cacheKey += "derivative-tangents:";
            if (useVertexColors) cacheKey += "vertex-colors:";
            if (useFlatShading) cacheKey += "flat-shading:";
            let cachedMaterial = this.cache.get(cacheKey);
            if (!cachedMaterial) {
                cachedMaterial = material.clone();
                if (useVertexColors) cachedMaterial.vertexColors = true;
                if (useFlatShading) cachedMaterial.flatShading = true;
                if (useDerivativeTangents) {
                    if (cachedMaterial.normalScale) cachedMaterial.normalScale.y *= -1;
                    if (cachedMaterial.clearcoatNormalScale) cachedMaterial.clearcoatNormalScale.y *= -1;
                }
                this.cache.add(cacheKey, cachedMaterial);
                this.associations.set(cachedMaterial, this.associations.get(material));
            }
            material = cachedMaterial;
        }
        mesh.material = material;
    }
    getMaterialType() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"];
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */ loadMaterial(materialIndex) {
        const parser = this;
        const json = this.json;
        const extensions = this.extensions;
        const materialDef = json.materials[materialIndex];
        let materialType;
        const materialParams = {};
        const materialExtensions = materialDef.extensions || {};
        const pending = [];
        if (materialExtensions[EXTENSIONS.KHR_MATERIALS_UNLIT]) {
            const kmuExtension = extensions[EXTENSIONS.KHR_MATERIALS_UNLIT];
            materialType = kmuExtension.getMaterialType();
            pending.push(kmuExtension.extendParams(materialParams, materialDef, parser));
        } else {
            const metallicRoughness = materialDef.pbrMetallicRoughness || {};
            materialParams.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](1, 1, 1);
            materialParams.opacity = 1;
            if (Array.isArray(metallicRoughness.baseColorFactor)) {
                const array = metallicRoughness.baseColorFactor;
                materialParams.color.setRGB(array[0], array[1], array[2], LinearSRGBColorSpace);
                materialParams.opacity = array[3];
            }
            if (metallicRoughness.baseColorTexture !== void 0) {
                pending.push(parser.assignTexture(materialParams, "map", metallicRoughness.baseColorTexture, SRGBColorSpace));
            }
            materialParams.metalness = metallicRoughness.metallicFactor !== void 0 ? metallicRoughness.metallicFactor : 1;
            materialParams.roughness = metallicRoughness.roughnessFactor !== void 0 ? metallicRoughness.roughnessFactor : 1;
            if (metallicRoughness.metallicRoughnessTexture !== void 0) {
                pending.push(parser.assignTexture(materialParams, "metalnessMap", metallicRoughness.metallicRoughnessTexture));
                pending.push(parser.assignTexture(materialParams, "roughnessMap", metallicRoughness.metallicRoughnessTexture));
            }
            materialType = this._invokeOne(function(ext) {
                return ext.getMaterialType && ext.getMaterialType(materialIndex);
            });
            pending.push(Promise.all(this._invokeAll(function(ext) {
                return ext.extendMaterialParams && ext.extendMaterialParams(materialIndex, materialParams);
            })));
        }
        if (materialDef.doubleSided === true) {
            materialParams.side = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"];
        }
        const alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;
        if (alphaMode === ALPHA_MODES.BLEND) {
            materialParams.transparent = true;
            materialParams.depthWrite = false;
        } else {
            materialParams.transparent = false;
            if (alphaMode === ALPHA_MODES.MASK) {
                materialParams.alphaTest = materialDef.alphaCutoff !== void 0 ? materialDef.alphaCutoff : 0.5;
            }
        }
        if (materialDef.normalTexture !== void 0 && materialType !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]) {
            pending.push(parser.assignTexture(materialParams, "normalMap", materialDef.normalTexture));
            materialParams.normalScale = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](1, 1);
            if (materialDef.normalTexture.scale !== void 0) {
                const scale = materialDef.normalTexture.scale;
                materialParams.normalScale.set(scale, scale);
            }
        }
        if (materialDef.occlusionTexture !== void 0 && materialType !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]) {
            pending.push(parser.assignTexture(materialParams, "aoMap", materialDef.occlusionTexture));
            if (materialDef.occlusionTexture.strength !== void 0) {
                materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;
            }
        }
        if (materialDef.emissiveFactor !== void 0 && materialType !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]) {
            const emissiveFactor = materialDef.emissiveFactor;
            materialParams.emissive = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setRGB(emissiveFactor[0], emissiveFactor[1], emissiveFactor[2], LinearSRGBColorSpace);
        }
        if (materialDef.emissiveTexture !== void 0 && materialType !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]) {
            pending.push(parser.assignTexture(materialParams, "emissiveMap", materialDef.emissiveTexture, SRGBColorSpace));
        }
        return Promise.all(pending).then(function() {
            const material = new materialType(materialParams);
            if (materialDef.name) material.name = materialDef.name;
            assignExtrasToUserData(material, materialDef);
            parser.associations.set(material, {
                materials: materialIndex
            });
            if (materialDef.extensions) addUnknownExtensionsToUserData(extensions, material, materialDef);
            return material;
        });
    }
    /** When Object3D instances are targeted by animation, they need unique names. */ createUniqueName(originalName) {
        const sanitizedName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PropertyBinding"].sanitizeNodeName(originalName || "");
        if (sanitizedName in this.nodeNamesUsed) {
            return sanitizedName + "_" + ++this.nodeNamesUsed[sanitizedName];
        } else {
            this.nodeNamesUsed[sanitizedName] = 0;
            return sanitizedName;
        }
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */ loadGeometries(primitives) {
        const parser = this;
        const extensions = this.extensions;
        const cache = this.primitiveCache;
        function createDracoPrimitive(primitive) {
            return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(primitive, parser).then(function(geometry) {
                return addPrimitiveAttributes(geometry, primitive, parser);
            });
        }
        const pending = [];
        for(let i = 0, il = primitives.length; i < il; i++){
            const primitive = primitives[i];
            const cacheKey = createPrimitiveKey(primitive);
            const cached = cache[cacheKey];
            if (cached) {
                pending.push(cached.promise);
            } else {
                let geometryPromise;
                if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) {
                    geometryPromise = createDracoPrimitive(primitive);
                } else {
                    geometryPromise = addPrimitiveAttributes(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"](), primitive, parser);
                }
                cache[cacheKey] = {
                    primitive,
                    promise: geometryPromise
                };
                pending.push(geometryPromise);
            }
        }
        return Promise.all(pending);
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */ loadMesh(meshIndex) {
        const parser = this;
        const json = this.json;
        const extensions = this.extensions;
        const meshDef = json.meshes[meshIndex];
        const primitives = meshDef.primitives;
        const pending = [];
        for(let i = 0, il = primitives.length; i < il; i++){
            const material = primitives[i].material === void 0 ? createDefaultMaterial(this.cache) : this.getDependency("material", primitives[i].material);
            pending.push(material);
        }
        pending.push(parser.loadGeometries(primitives));
        return Promise.all(pending).then(function(results) {
            const materials = results.slice(0, results.length - 1);
            const geometries = results[results.length - 1];
            const meshes = [];
            for(let i = 0, il = geometries.length; i < il; i++){
                const geometry = geometries[i];
                const primitive = primitives[i];
                let mesh;
                const material = materials[i];
                if (primitive.mode === WEBGL_CONSTANTS.TRIANGLES || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN || primitive.mode === void 0) {
                    mesh = meshDef.isSkinnedMesh === true ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SkinnedMesh"](geometry, material) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
                    if (mesh.isSkinnedMesh === true) {
                        mesh.normalizeSkinWeights();
                    }
                    if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {
                        mesh.geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTrianglesDrawMode"])(mesh.geometry, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TriangleStripDrawMode"]);
                    } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {
                        mesh.geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$BufferGeometryUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toTrianglesDrawMode"])(mesh.geometry, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TriangleFanDrawMode"]);
                    }
                } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineSegments"](geometry, material);
                } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"](geometry, material);
                } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineLoop"](geometry, material);
                } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {
                    mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](geometry, material);
                } else {
                    throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + primitive.mode);
                }
                if (Object.keys(mesh.geometry.morphAttributes).length > 0) {
                    updateMorphTargets(mesh, meshDef);
                }
                mesh.name = parser.createUniqueName(meshDef.name || "mesh_" + meshIndex);
                assignExtrasToUserData(mesh, meshDef);
                if (primitive.extensions) addUnknownExtensionsToUserData(extensions, mesh, primitive);
                parser.assignFinalMaterial(mesh);
                meshes.push(mesh);
            }
            for(let i = 0, il = meshes.length; i < il; i++){
                parser.associations.set(meshes[i], {
                    meshes: meshIndex,
                    primitives: i
                });
            }
            if (meshes.length === 1) {
                if (meshDef.extensions) addUnknownExtensionsToUserData(extensions, meshes[0], meshDef);
                return meshes[0];
            }
            const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
            if (meshDef.extensions) addUnknownExtensionsToUserData(extensions, group, meshDef);
            parser.associations.set(group, {
                meshes: meshIndex
            });
            for(let i = 0, il = meshes.length; i < il; i++){
                group.add(meshes[i]);
            }
            return group;
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */ loadCamera(cameraIndex) {
        let camera;
        const cameraDef = this.json.cameras[cameraIndex];
        const params = cameraDef[cameraDef.type];
        if (!params) {
            console.warn("THREE.GLTFLoader: Missing camera parameters.");
            return;
        }
        if (cameraDef.type === "perspective") {
            camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].radToDeg(params.yfov), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6);
        } else if (cameraDef.type === "orthographic") {
            camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrthographicCamera"](-params.xmag, params.xmag, params.ymag, -params.ymag, params.znear, params.zfar);
        }
        if (cameraDef.name) camera.name = this.createUniqueName(cameraDef.name);
        assignExtrasToUserData(camera, cameraDef);
        return Promise.resolve(camera);
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */ loadSkin(skinIndex) {
        const skinDef = this.json.skins[skinIndex];
        const pending = [];
        for(let i = 0, il = skinDef.joints.length; i < il; i++){
            pending.push(this._loadNodeShallow(skinDef.joints[i]));
        }
        if (skinDef.inverseBindMatrices !== void 0) {
            pending.push(this.getDependency("accessor", skinDef.inverseBindMatrices));
        } else {
            pending.push(null);
        }
        return Promise.all(pending).then(function(results) {
            const inverseBindMatrices = results.pop();
            const jointNodes = results;
            const bones = [];
            const boneInverses = [];
            for(let i = 0, il = jointNodes.length; i < il; i++){
                const jointNode = jointNodes[i];
                if (jointNode) {
                    bones.push(jointNode);
                    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
                    if (inverseBindMatrices !== null) {
                        mat.fromArray(inverseBindMatrices.array, i * 16);
                    }
                    boneInverses.push(mat);
                } else {
                    console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', skinDef.joints[i]);
                }
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"](bones, boneInverses);
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */ loadAnimation(animationIndex) {
        const json = this.json;
        const parser = this;
        const animationDef = json.animations[animationIndex];
        const animationName = animationDef.name ? animationDef.name : "animation_" + animationIndex;
        const pendingNodes = [];
        const pendingInputAccessors = [];
        const pendingOutputAccessors = [];
        const pendingSamplers = [];
        const pendingTargets = [];
        for(let i = 0, il = animationDef.channels.length; i < il; i++){
            const channel = animationDef.channels[i];
            const sampler = animationDef.samplers[channel.sampler];
            const target = channel.target;
            const name = target.node;
            const input = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.input] : sampler.input;
            const output = animationDef.parameters !== void 0 ? animationDef.parameters[sampler.output] : sampler.output;
            if (target.node === void 0) continue;
            pendingNodes.push(this.getDependency("node", name));
            pendingInputAccessors.push(this.getDependency("accessor", input));
            pendingOutputAccessors.push(this.getDependency("accessor", output));
            pendingSamplers.push(sampler);
            pendingTargets.push(target);
        }
        return Promise.all([
            Promise.all(pendingNodes),
            Promise.all(pendingInputAccessors),
            Promise.all(pendingOutputAccessors),
            Promise.all(pendingSamplers),
            Promise.all(pendingTargets)
        ]).then(function(dependencies) {
            const nodes = dependencies[0];
            const inputAccessors = dependencies[1];
            const outputAccessors = dependencies[2];
            const samplers = dependencies[3];
            const targets = dependencies[4];
            const tracks = [];
            for(let i = 0, il = nodes.length; i < il; i++){
                const node = nodes[i];
                const inputAccessor = inputAccessors[i];
                const outputAccessor = outputAccessors[i];
                const sampler = samplers[i];
                const target = targets[i];
                if (node === void 0) continue;
                if (node.updateMatrix) {
                    node.updateMatrix();
                }
                const createdTracks = parser._createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target);
                if (createdTracks) {
                    for(let k = 0; k < createdTracks.length; k++){
                        tracks.push(createdTracks[k]);
                    }
                }
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationClip"](animationName, void 0, tracks);
        });
    }
    createNodeMesh(nodeIndex) {
        const json = this.json;
        const parser = this;
        const nodeDef = json.nodes[nodeIndex];
        if (nodeDef.mesh === void 0) return null;
        return parser.getDependency("mesh", nodeDef.mesh).then(function(mesh) {
            const node = parser._getNodeRef(parser.meshCache, nodeDef.mesh, mesh);
            if (nodeDef.weights !== void 0) {
                node.traverse(function(o) {
                    if (!o.isMesh) return;
                    for(let i = 0, il = nodeDef.weights.length; i < il; i++){
                        o.morphTargetInfluences[i] = nodeDef.weights[i];
                    }
                });
            }
            return node;
        });
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */ loadNode(nodeIndex) {
        const json = this.json;
        const parser = this;
        const nodeDef = json.nodes[nodeIndex];
        const nodePending = parser._loadNodeShallow(nodeIndex);
        const childPending = [];
        const childrenDef = nodeDef.children || [];
        for(let i = 0, il = childrenDef.length; i < il; i++){
            childPending.push(parser.getDependency("node", childrenDef[i]));
        }
        const skeletonPending = nodeDef.skin === void 0 ? Promise.resolve(null) : parser.getDependency("skin", nodeDef.skin);
        return Promise.all([
            nodePending,
            Promise.all(childPending),
            skeletonPending
        ]).then(function(results) {
            const node = results[0];
            const children = results[1];
            const skeleton = results[2];
            if (skeleton !== null) {
                node.traverse(function(mesh) {
                    if (!mesh.isSkinnedMesh) return;
                    mesh.bind(skeleton, _identityMatrix);
                });
            }
            for(let i = 0, il = children.length; i < il; i++){
                node.add(children[i]);
            }
            return node;
        });
    }
    // ._loadNodeShallow() parses a single node.
    // skin and child nodes are created and added in .loadNode() (no '_' prefix).
    _loadNodeShallow(nodeIndex) {
        const json = this.json;
        const extensions = this.extensions;
        const parser = this;
        if (this.nodeCache[nodeIndex] !== void 0) {
            return this.nodeCache[nodeIndex];
        }
        const nodeDef = json.nodes[nodeIndex];
        const nodeName = nodeDef.name ? parser.createUniqueName(nodeDef.name) : "";
        const pending = [];
        const meshPromise = parser._invokeOne(function(ext) {
            return ext.createNodeMesh && ext.createNodeMesh(nodeIndex);
        });
        if (meshPromise) {
            pending.push(meshPromise);
        }
        if (nodeDef.camera !== void 0) {
            pending.push(parser.getDependency("camera", nodeDef.camera).then(function(camera) {
                return parser._getNodeRef(parser.cameraCache, nodeDef.camera, camera);
            }));
        }
        parser._invokeAll(function(ext) {
            return ext.createNodeAttachment && ext.createNodeAttachment(nodeIndex);
        }).forEach(function(promise) {
            pending.push(promise);
        });
        this.nodeCache[nodeIndex] = Promise.all(pending).then(function(objects) {
            let node;
            if (nodeDef.isBone === true) {
                node = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bone"]();
            } else if (objects.length > 1) {
                node = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
            } else if (objects.length === 1) {
                node = objects[0];
            } else {
                node = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Object3D"]();
            }
            if (node !== objects[0]) {
                for(let i = 0, il = objects.length; i < il; i++){
                    node.add(objects[i]);
                }
            }
            if (nodeDef.name) {
                node.userData.name = nodeDef.name;
                node.name = nodeName;
            }
            assignExtrasToUserData(node, nodeDef);
            if (nodeDef.extensions) addUnknownExtensionsToUserData(extensions, node, nodeDef);
            if (nodeDef.matrix !== void 0) {
                const matrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]();
                matrix.fromArray(nodeDef.matrix);
                node.applyMatrix4(matrix);
            } else {
                if (nodeDef.translation !== void 0) {
                    node.position.fromArray(nodeDef.translation);
                }
                if (nodeDef.rotation !== void 0) {
                    node.quaternion.fromArray(nodeDef.rotation);
                }
                if (nodeDef.scale !== void 0) {
                    node.scale.fromArray(nodeDef.scale);
                }
            }
            if (!parser.associations.has(node)) {
                parser.associations.set(node, {});
            }
            parser.associations.get(node).nodes = nodeIndex;
            return node;
        });
        return this.nodeCache[nodeIndex];
    }
    /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */ loadScene(sceneIndex) {
        const extensions = this.extensions;
        const sceneDef = this.json.scenes[sceneIndex];
        const parser = this;
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        if (sceneDef.name) scene.name = parser.createUniqueName(sceneDef.name);
        assignExtrasToUserData(scene, sceneDef);
        if (sceneDef.extensions) addUnknownExtensionsToUserData(extensions, scene, sceneDef);
        const nodeIds = sceneDef.nodes || [];
        const pending = [];
        for(let i = 0, il = nodeIds.length; i < il; i++){
            pending.push(parser.getDependency("node", nodeIds[i]));
        }
        return Promise.all(pending).then(function(nodes) {
            for(let i = 0, il = nodes.length; i < il; i++){
                scene.add(nodes[i]);
            }
            const reduceAssociations = (node)=>{
                const reducedAssociations = /* @__PURE__ */ new Map();
                for (const [key, value] of parser.associations){
                    if (key instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Material"] || key instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Texture"]) {
                        reducedAssociations.set(key, value);
                    }
                }
                node.traverse((node2)=>{
                    const mappings = parser.associations.get(node2);
                    if (mappings != null) {
                        reducedAssociations.set(node2, mappings);
                    }
                });
                return reducedAssociations;
            };
            parser.associations = reduceAssociations(scene);
            return scene;
        });
    }
    _createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target) {
        const tracks = [];
        const targetName = node.name ? node.name : node.uuid;
        const targetNames = [];
        if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {
            node.traverse(function(object) {
                if (object.morphTargetInfluences) {
                    targetNames.push(object.name ? object.name : object.uuid);
                }
            });
        } else {
            targetNames.push(targetName);
        }
        let TypedKeyframeTrack;
        switch(PATH_PROPERTIES[target.path]){
            case PATH_PROPERTIES.weights:
                TypedKeyframeTrack = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NumberKeyframeTrack"];
                break;
            case PATH_PROPERTIES.rotation:
                TypedKeyframeTrack = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuaternionKeyframeTrack"];
                break;
            case PATH_PROPERTIES.position:
            case PATH_PROPERTIES.scale:
                TypedKeyframeTrack = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VectorKeyframeTrack"];
                break;
            default:
                switch(outputAccessor.itemSize){
                    case 1:
                        TypedKeyframeTrack = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NumberKeyframeTrack"];
                        break;
                    case 2:
                    case 3:
                    default:
                        TypedKeyframeTrack = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VectorKeyframeTrack"];
                        break;
                }
                break;
        }
        const interpolation = sampler.interpolation !== void 0 ? INTERPOLATION[sampler.interpolation] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InterpolateLinear"];
        const outputArray = this._getArrayFromAccessor(outputAccessor);
        for(let j = 0, jl = targetNames.length; j < jl; j++){
            const track = new TypedKeyframeTrack(targetNames[j] + "." + PATH_PROPERTIES[target.path], inputAccessor.array, outputArray, interpolation);
            if (sampler.interpolation === "CUBICSPLINE") {
                this._createCubicSplineTrackInterpolant(track);
            }
            tracks.push(track);
        }
        return tracks;
    }
    _getArrayFromAccessor(accessor) {
        let outputArray = accessor.array;
        if (accessor.normalized) {
            const scale = getNormalizedComponentScale(outputArray.constructor);
            const scaled = new Float32Array(outputArray.length);
            for(let j = 0, jl = outputArray.length; j < jl; j++){
                scaled[j] = outputArray[j] * scale;
            }
            outputArray = scaled;
        }
        return outputArray;
    }
    _createCubicSplineTrackInterpolant(track) {
        track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(result) {
            const interpolantType = this instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuaternionKeyframeTrack"] ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant;
            return new interpolantType(this.times, this.values, this.getValueSize() / 3, result);
        };
        track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
    }
}
function computeBounds(geometry, primitiveDef, parser) {
    const attributes = primitiveDef.attributes;
    const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]();
    if (attributes.POSITION !== void 0) {
        const accessor = parser.json.accessors[attributes.POSITION];
        const min = accessor.min;
        const max = accessor.max;
        if (min !== void 0 && max !== void 0) {
            box.set(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](min[0], min[1], min[2]), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](max[0], max[1], max[2]));
            if (accessor.normalized) {
                const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
                box.min.multiplyScalar(boxScale);
                box.max.multiplyScalar(boxScale);
            }
        } else {
            console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
            return;
        }
    } else {
        return;
    }
    const targets = primitiveDef.targets;
    if (targets !== void 0) {
        const maxDisplacement = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        const vector = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        for(let i = 0, il = targets.length; i < il; i++){
            const target = targets[i];
            if (target.POSITION !== void 0) {
                const accessor = parser.json.accessors[target.POSITION];
                const min = accessor.min;
                const max = accessor.max;
                if (min !== void 0 && max !== void 0) {
                    vector.setX(Math.max(Math.abs(min[0]), Math.abs(max[0])));
                    vector.setY(Math.max(Math.abs(min[1]), Math.abs(max[1])));
                    vector.setZ(Math.max(Math.abs(min[2]), Math.abs(max[2])));
                    if (accessor.normalized) {
                        const boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
                        vector.multiplyScalar(boxScale);
                    }
                    maxDisplacement.max(vector);
                } else {
                    console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
                }
            }
        }
        box.expandByVector(maxDisplacement);
    }
    geometry.boundingBox = box;
    const sphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sphere"]();
    box.getCenter(sphere.center);
    sphere.radius = box.min.distanceTo(box.max) / 2;
    geometry.boundingSphere = sphere;
}
function addPrimitiveAttributes(geometry, primitiveDef, parser) {
    const attributes = primitiveDef.attributes;
    const pending = [];
    function assignAttributeAccessor(accessorIndex, attributeName) {
        return parser.getDependency("accessor", accessorIndex).then(function(accessor) {
            geometry.setAttribute(attributeName, accessor);
        });
    }
    for(const gltfAttributeName in attributes){
        const threeAttributeName = ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase();
        if (threeAttributeName in geometry.attributes) continue;
        pending.push(assignAttributeAccessor(attributes[gltfAttributeName], threeAttributeName));
    }
    if (primitiveDef.indices !== void 0 && !geometry.index) {
        const accessor = parser.getDependency("accessor", primitiveDef.indices).then(function(accessor2) {
            geometry.setIndex(accessor2);
        });
        pending.push(accessor);
    }
    assignExtrasToUserData(geometry, primitiveDef);
    computeBounds(geometry, primitiveDef, parser);
    return Promise.all(pending).then(function() {
        return primitiveDef.targets !== void 0 ? addMorphTargets(geometry, primitiveDef.targets, parser) : geometry;
    });
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/loaders/KTX2Loader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KTX2Loader",
    ()=>KTX2Loader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$WorkerPool$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/utils/WorkerPool.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/libs/ktx-parse.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$zstddec$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/libs/zstddec.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$CompressedCubeTexture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/CompressedCubeTexture.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$CompressedArrayTexture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/CompressedArrayTexture.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$Data3DTexture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/_polyfill/Data3DTexture.js [app-ssr] (ecmascript)");
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
;
;
;
const LinearEncoding = 3e3;
const sRGBEncoding = 3001;
const NoColorSpace = "";
const DisplayP3ColorSpace = "display-p3";
const LinearDisplayP3ColorSpace = "display-p3-linear";
const LinearSRGBColorSpace = "srgb-linear";
const SRGBColorSpace = "srgb";
const _taskCache = /* @__PURE__ */ new WeakMap();
let _activeLoaders = 0;
let _zstd;
const KTX2Loader = /* @__PURE__ */ (()=>{
    const _KTX2Loader = class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Loader"] {
        constructor(manager){
            super(manager);
            this.transcoderPath = "";
            this.transcoderBinary = null;
            this.transcoderPending = null;
            this.workerPool = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$WorkerPool$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WorkerPool"]();
            this.workerSourceURL = "";
            this.workerConfig = null;
            if (typeof MSC_TRANSCODER !== "undefined") {
                console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.');
            }
        }
        setTranscoderPath(path) {
            this.transcoderPath = path;
            return this;
        }
        setWorkerLimit(num) {
            this.workerPool.setWorkerLimit(num);
            return this;
        }
        detectSupport(renderer) {
            this.workerConfig = {
                astcSupported: renderer.extensions.has("WEBGL_compressed_texture_astc"),
                etc1Supported: renderer.extensions.has("WEBGL_compressed_texture_etc1"),
                etc2Supported: renderer.extensions.has("WEBGL_compressed_texture_etc"),
                dxtSupported: renderer.extensions.has("WEBGL_compressed_texture_s3tc"),
                bptcSupported: renderer.extensions.has("EXT_texture_compression_bptc"),
                pvrtcSupported: renderer.extensions.has("WEBGL_compressed_texture_pvrtc") || renderer.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
            };
            if (renderer.capabilities.isWebGL2) {
                this.workerConfig.etc1Supported = false;
            }
            return this;
        }
        init() {
            if (!this.transcoderPending) {
                const jsLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
                jsLoader.setPath(this.transcoderPath);
                jsLoader.setWithCredentials(this.withCredentials);
                const jsContent = jsLoader.loadAsync("basis_transcoder.js");
                const binaryLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
                binaryLoader.setPath(this.transcoderPath);
                binaryLoader.setResponseType("arraybuffer");
                binaryLoader.setWithCredentials(this.withCredentials);
                const binaryContent = binaryLoader.loadAsync("basis_transcoder.wasm");
                this.transcoderPending = Promise.all([
                    jsContent,
                    binaryContent
                ]).then(([jsContent2, binaryContent2])=>{
                    const fn = _KTX2Loader.BasisWorker.toString();
                    const body = [
                        "/* constants */",
                        "let _EngineFormat = " + JSON.stringify(_KTX2Loader.EngineFormat),
                        "let _TranscoderFormat = " + JSON.stringify(_KTX2Loader.TranscoderFormat),
                        "let _BasisFormat = " + JSON.stringify(_KTX2Loader.BasisFormat),
                        "/* basis_transcoder.js */",
                        jsContent2,
                        "/* worker */",
                        fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"))
                    ].join("\n");
                    this.workerSourceURL = URL.createObjectURL(new Blob([
                        body
                    ]));
                    this.transcoderBinary = binaryContent2;
                    this.workerPool.setWorkerCreator(()=>{
                        const worker = new Worker(this.workerSourceURL);
                        const transcoderBinary = this.transcoderBinary.slice(0);
                        worker.postMessage({
                            type: "init",
                            config: this.workerConfig,
                            transcoderBinary
                        }, [
                            transcoderBinary
                        ]);
                        return worker;
                    });
                });
                if (_activeLoaders > 0) {
                    console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances.");
                }
                _activeLoaders++;
            }
            return this.transcoderPending;
        }
        load(url, onLoad, onProgress, onError) {
            if (this.workerConfig === null) {
                throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
            }
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
            loader.setResponseType("arraybuffer");
            loader.setWithCredentials(this.withCredentials);
            loader.load(url, (buffer)=>{
                if (_taskCache.has(buffer)) {
                    const cachedTask = _taskCache.get(buffer);
                    return cachedTask.promise.then(onLoad).catch(onError);
                }
                this._createTexture(buffer).then((texture)=>onLoad ? onLoad(texture) : null).catch(onError);
            }, onProgress, onError);
        }
        _createTextureFrom(transcodeResult, container) {
            const { faces, width, height, format, type, error, dfdFlags } = transcodeResult;
            if (type === "error") return Promise.reject(error);
            let texture;
            if (container.faceCount === 6) {
                texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$CompressedCubeTexture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompressedCubeTexture"](faces, format, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"]);
            } else {
                const mipmaps = faces[0].mipmaps;
                texture = container.layerCount > 1 ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$CompressedArrayTexture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompressedArrayTexture"](mipmaps, width, height, container.layerCount, format, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"]) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompressedTexture"](mipmaps, width, height, format, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"]);
            }
            texture.minFilter = faces[0].mipmaps.length === 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearFilter"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearMipmapLinearFilter"];
            texture.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearFilter"];
            texture.generateMipmaps = false;
            texture.needsUpdate = true;
            const colorSpace = parseColorSpace(container);
            if ("colorSpace" in texture) texture.colorSpace = colorSpace;
            else texture.encoding = colorSpace === SRGBColorSpace ? sRGBEncoding : LinearEncoding;
            texture.premultiplyAlpha = !!(dfdFlags & __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KHR_DF_FLAG_ALPHA_PREMULTIPLIED"]);
            return texture;
        }
        /**
     * @param {ArrayBuffer} buffer
     * @param {object?} config
     * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
     */ async _createTexture(buffer, config = {}) {
            const container = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["read"])(new Uint8Array(buffer));
            if (container.vkFormat !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_UNDEFINED"]) {
                return createRawTexture(container);
            }
            const taskConfig = config;
            const texturePending = this.init().then(()=>{
                return this.workerPool.postMessage({
                    type: "transcode",
                    buffer,
                    taskConfig
                }, [
                    buffer
                ]);
            }).then((e)=>this._createTextureFrom(e.data, container));
            _taskCache.set(buffer, {
                promise: texturePending
            });
            return texturePending;
        }
        dispose() {
            this.workerPool.dispose();
            if (this.workerSourceURL) URL.revokeObjectURL(this.workerSourceURL);
            _activeLoaders--;
            return this;
        }
    };
    let KTX2Loader2 = _KTX2Loader;
    /* CONSTANTS */ __publicField(KTX2Loader2, "BasisFormat", {
        ETC1S: 0,
        UASTC_4x4: 1
    });
    __publicField(KTX2Loader2, "TranscoderFormat", {
        ETC1: 0,
        ETC2: 1,
        BC1: 2,
        BC3: 3,
        BC4: 4,
        BC5: 5,
        BC7_M6_OPAQUE_ONLY: 6,
        BC7_M5: 7,
        PVRTC1_4_RGB: 8,
        PVRTC1_4_RGBA: 9,
        ASTC_4x4: 10,
        ATC_RGB: 11,
        ATC_RGBA_INTERPOLATED_ALPHA: 12,
        RGBA32: 13,
        RGB565: 14,
        BGR565: 15,
        RGBA4444: 16
    });
    __publicField(KTX2Loader2, "EngineFormat", {
        RGBAFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBAFormat"],
        RGBA_ASTC_4x4_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBA_ASTC_4x4_Format"],
        RGBA_BPTC_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBA_BPTC_Format"],
        RGBA_ETC2_EAC_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBA_ETC2_EAC_Format"],
        RGBA_PVRTC_4BPPV1_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBA_PVRTC_4BPPV1_Format"],
        RGBA_S3TC_DXT5_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBA_S3TC_DXT5_Format"],
        RGB_ETC1_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGB_ETC1_Format"],
        RGB_ETC2_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGB_ETC2_Format"],
        RGB_PVRTC_4BPPV1_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGB_PVRTC_4BPPV1_Format"],
        RGB_S3TC_DXT1_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGB_S3TC_DXT1_Format"]
    });
    /* WEB WORKER */ __publicField(KTX2Loader2, "BasisWorker", function() {
        let config;
        let transcoderPending;
        let BasisModule;
        const EngineFormat = _EngineFormat;
        const TranscoderFormat = _TranscoderFormat;
        const BasisFormat = _BasisFormat;
        self.addEventListener("message", function(e) {
            const message = e.data;
            switch(message.type){
                case "init":
                    config = message.config;
                    init(message.transcoderBinary);
                    break;
                case "transcode":
                    transcoderPending.then(()=>{
                        try {
                            const { faces, buffers, width, height, hasAlpha, format, dfdFlags } = transcode(message.buffer);
                            self.postMessage({
                                type: "transcode",
                                id: message.id,
                                faces,
                                width,
                                height,
                                hasAlpha,
                                format,
                                dfdFlags
                            }, buffers);
                        } catch (error) {
                            console.error(error);
                            self.postMessage({
                                type: "error",
                                id: message.id,
                                error: error.message
                            });
                        }
                    });
                    break;
            }
        });
        function init(wasmBinary) {
            transcoderPending = new Promise((resolve)=>{
                BasisModule = {
                    wasmBinary,
                    onRuntimeInitialized: resolve
                };
                BASIS(BasisModule);
            }).then(()=>{
                BasisModule.initializeBasis();
                if (BasisModule.KTX2File === void 0) {
                    console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
                }
            });
        }
        function transcode(buffer) {
            const ktx2File = new BasisModule.KTX2File(new Uint8Array(buffer));
            function cleanup() {
                ktx2File.close();
                ktx2File.delete();
            }
            if (!ktx2File.isValid()) {
                cleanup();
                throw new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
            }
            const basisFormat = ktx2File.isUASTC() ? BasisFormat.UASTC_4x4 : BasisFormat.ETC1S;
            const width = ktx2File.getWidth();
            const height = ktx2File.getHeight();
            const layerCount = ktx2File.getLayers() || 1;
            const levelCount = ktx2File.getLevels();
            const faceCount = ktx2File.getFaces();
            const hasAlpha = ktx2File.getHasAlpha();
            const dfdFlags = ktx2File.getDFDFlags();
            const { transcoderFormat, engineFormat } = getTranscoderFormat(basisFormat, width, height, hasAlpha);
            if (!width || !height || !levelCount) {
                cleanup();
                throw new Error("THREE.KTX2Loader:	Invalid texture");
            }
            if (!ktx2File.startTranscoding()) {
                cleanup();
                throw new Error("THREE.KTX2Loader: .startTranscoding failed");
            }
            const faces = [];
            const buffers = [];
            for(let face = 0; face < faceCount; face++){
                const mipmaps = [];
                for(let mip = 0; mip < levelCount; mip++){
                    const layerMips = [];
                    let mipWidth, mipHeight;
                    for(let layer = 0; layer < layerCount; layer++){
                        const levelInfo = ktx2File.getImageLevelInfo(mip, layer, face);
                        if (face === 0 && mip === 0 && layer === 0 && (levelInfo.origWidth % 4 !== 0 || levelInfo.origHeight % 4 !== 0)) {
                            console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions.");
                        }
                        if (levelCount > 1) {
                            mipWidth = levelInfo.origWidth;
                            mipHeight = levelInfo.origHeight;
                        } else {
                            mipWidth = levelInfo.width;
                            mipHeight = levelInfo.height;
                        }
                        const dst = new Uint8Array(ktx2File.getImageTranscodedSizeInBytes(mip, layer, 0, transcoderFormat));
                        const status = ktx2File.transcodeImage(dst, mip, layer, face, transcoderFormat, 0, -1, -1);
                        if (!status) {
                            cleanup();
                            throw new Error("THREE.KTX2Loader: .transcodeImage failed.");
                        }
                        layerMips.push(dst);
                    }
                    const mipData = concat(layerMips);
                    mipmaps.push({
                        data: mipData,
                        width: mipWidth,
                        height: mipHeight
                    });
                    buffers.push(mipData.buffer);
                }
                faces.push({
                    mipmaps,
                    width,
                    height,
                    format: engineFormat
                });
            }
            cleanup();
            return {
                faces,
                buffers,
                width,
                height,
                hasAlpha,
                format: engineFormat,
                dfdFlags
            };
        }
        const FORMAT_OPTIONS = [
            {
                if: "astcSupported",
                basisFormat: [
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.ASTC_4x4,
                    TranscoderFormat.ASTC_4x4
                ],
                engineFormat: [
                    EngineFormat.RGBA_ASTC_4x4_Format,
                    EngineFormat.RGBA_ASTC_4x4_Format
                ],
                priorityETC1S: Infinity,
                priorityUASTC: 1,
                needsPowerOfTwo: false
            },
            {
                if: "bptcSupported",
                basisFormat: [
                    BasisFormat.ETC1S,
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.BC7_M5,
                    TranscoderFormat.BC7_M5
                ],
                engineFormat: [
                    EngineFormat.RGBA_BPTC_Format,
                    EngineFormat.RGBA_BPTC_Format
                ],
                priorityETC1S: 3,
                priorityUASTC: 2,
                needsPowerOfTwo: false
            },
            {
                if: "dxtSupported",
                basisFormat: [
                    BasisFormat.ETC1S,
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.BC1,
                    TranscoderFormat.BC3
                ],
                engineFormat: [
                    EngineFormat.RGB_S3TC_DXT1_Format,
                    EngineFormat.RGBA_S3TC_DXT5_Format
                ],
                priorityETC1S: 4,
                priorityUASTC: 5,
                needsPowerOfTwo: false
            },
            {
                if: "etc2Supported",
                basisFormat: [
                    BasisFormat.ETC1S,
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.ETC1,
                    TranscoderFormat.ETC2
                ],
                engineFormat: [
                    EngineFormat.RGB_ETC2_Format,
                    EngineFormat.RGBA_ETC2_EAC_Format
                ],
                priorityETC1S: 1,
                priorityUASTC: 3,
                needsPowerOfTwo: false
            },
            {
                if: "etc1Supported",
                basisFormat: [
                    BasisFormat.ETC1S,
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.ETC1
                ],
                engineFormat: [
                    EngineFormat.RGB_ETC1_Format
                ],
                priorityETC1S: 2,
                priorityUASTC: 4,
                needsPowerOfTwo: false
            },
            {
                if: "pvrtcSupported",
                basisFormat: [
                    BasisFormat.ETC1S,
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.PVRTC1_4_RGB,
                    TranscoderFormat.PVRTC1_4_RGBA
                ],
                engineFormat: [
                    EngineFormat.RGB_PVRTC_4BPPV1_Format,
                    EngineFormat.RGBA_PVRTC_4BPPV1_Format
                ],
                priorityETC1S: 5,
                priorityUASTC: 6,
                needsPowerOfTwo: true
            }
        ];
        const ETC1S_OPTIONS = FORMAT_OPTIONS.sort(function(a, b) {
            return a.priorityETC1S - b.priorityETC1S;
        });
        const UASTC_OPTIONS = FORMAT_OPTIONS.sort(function(a, b) {
            return a.priorityUASTC - b.priorityUASTC;
        });
        function getTranscoderFormat(basisFormat, width, height, hasAlpha) {
            let transcoderFormat;
            let engineFormat;
            const options = basisFormat === BasisFormat.ETC1S ? ETC1S_OPTIONS : UASTC_OPTIONS;
            for(let i = 0; i < options.length; i++){
                const opt = options[i];
                if (!config[opt.if]) continue;
                if (!opt.basisFormat.includes(basisFormat)) continue;
                if (hasAlpha && opt.transcoderFormat.length < 2) continue;
                if (opt.needsPowerOfTwo && !(isPowerOfTwo(width) && isPowerOfTwo(height))) continue;
                transcoderFormat = opt.transcoderFormat[hasAlpha ? 1 : 0];
                engineFormat = opt.engineFormat[hasAlpha ? 1 : 0];
                return {
                    transcoderFormat,
                    engineFormat
                };
            }
            console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32.");
            transcoderFormat = TranscoderFormat.RGBA32;
            engineFormat = EngineFormat.RGBAFormat;
            return {
                transcoderFormat,
                engineFormat
            };
        }
        function isPowerOfTwo(value) {
            if (value <= 2) return true;
            return (value & value - 1) === 0 && value !== 0;
        }
        function concat(arrays) {
            if (arrays.length === 1) return arrays[0];
            let totalByteLength = 0;
            for(let i = 0; i < arrays.length; i++){
                const array = arrays[i];
                totalByteLength += array.byteLength;
            }
            const result = new Uint8Array(totalByteLength);
            let byteOffset = 0;
            for(let i = 0; i < arrays.length; i++){
                const array = arrays[i];
                result.set(array, byteOffset);
                byteOffset += array.byteLength;
            }
            return result;
        }
    });
    return KTX2Loader2;
})();
const UNCOMPRESSED_FORMATS = /* @__PURE__ */ new Set([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBAFormat"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGFormat"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RedFormat"]
]);
const FORMAT_MAP = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R32G32B32A32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBAFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R16G16B16A16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBAFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8B8A8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBAFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8B8A8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBAFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R32G32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R16G16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RedFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RedFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RedFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RedFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_ASTC_6x6_SRGB_BLOCK"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBA_ASTC_6x6_Format"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_ASTC_6x6_UNORM_BLOCK"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBA_ASTC_6x6_Format"]
};
const TYPE_MAP = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R32G32B32A32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R16G16B16A16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8B8A8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8B8A8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R32G32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R16G16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_R8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_ASTC_6x6_SRGB_BLOCK"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VK_FORMAT_ASTC_6x6_UNORM_BLOCK"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnsignedByteType"]
};
async function createRawTexture(container) {
    const { vkFormat } = container;
    if (FORMAT_MAP[vkFormat] === void 0) {
        throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
    }
    let zstd;
    if (container.supercompressionScheme === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KHR_SUPERCOMPRESSION_ZSTD"]) {
        if (!_zstd) {
            _zstd = new Promise(async (resolve)=>{
                const zstd2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$zstddec$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZSTDDecoder"]();
                await zstd2.init();
                resolve(zstd2);
            });
        }
        zstd = await _zstd;
    }
    const mipmaps = [];
    for(let levelIndex = 0; levelIndex < container.levels.length; levelIndex++){
        const levelWidth = Math.max(1, container.pixelWidth >> levelIndex);
        const levelHeight = Math.max(1, container.pixelHeight >> levelIndex);
        const levelDepth = container.pixelDepth ? Math.max(1, container.pixelDepth >> levelIndex) : 0;
        const level = container.levels[levelIndex];
        let levelData;
        if (container.supercompressionScheme === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KHR_SUPERCOMPRESSION_NONE"]) {
            levelData = level.levelData;
        } else if (container.supercompressionScheme === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KHR_SUPERCOMPRESSION_ZSTD"]) {
            levelData = zstd.decode(level.levelData, level.uncompressedByteLength);
        } else {
            throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
        }
        let data;
        if (TYPE_MAP[vkFormat] === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatType"]) {
            data = new Float32Array(levelData.buffer, levelData.byteOffset, levelData.byteLength / Float32Array.BYTES_PER_ELEMENT);
        } else if (TYPE_MAP[vkFormat] === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"]) {
            data = new Uint16Array(levelData.buffer, levelData.byteOffset, levelData.byteLength / Uint16Array.BYTES_PER_ELEMENT);
        } else {
            data = levelData;
        }
        mipmaps.push({
            data,
            width: levelWidth,
            height: levelHeight,
            depth: levelDepth
        });
    }
    let texture;
    if (UNCOMPRESSED_FORMATS.has(FORMAT_MAP[vkFormat])) {
        texture = container.pixelDepth === 0 ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataTexture"](mipmaps[0].data, container.pixelWidth, container.pixelHeight) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$Data3DTexture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Data3DTexture"](mipmaps[0].data, container.pixelWidth, container.pixelHeight, container.pixelDepth);
    } else {
        if (container.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
        texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompressedTexture"](mipmaps, container.pixelWidth, container.pixelHeight);
    }
    texture.mipmaps = mipmaps;
    texture.type = TYPE_MAP[vkFormat];
    texture.format = FORMAT_MAP[vkFormat];
    texture.needsUpdate = true;
    const colorSpace = parseColorSpace(container);
    if ("colorSpace" in texture) texture.colorSpace = colorSpace;
    else texture.encoding = colorSpace === SRGBColorSpace ? sRGBEncoding : LinearEncoding;
    return Promise.resolve(texture);
}
function parseColorSpace(container) {
    const dfd = container.dataFormatDescriptor[0];
    if (dfd.colorPrimaries === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KHR_DF_PRIMARIES_BT709"]) {
        return dfd.transferFunction === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KHR_DF_TRANSFER_SRGB"] ? SRGBColorSpace : LinearSRGBColorSpace;
    } else if (dfd.colorPrimaries === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KHR_DF_PRIMARIES_DISPLAYP3"]) {
        return dfd.transferFunction === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KHR_DF_TRANSFER_SRGB"] ? DisplayP3ColorSpace : LinearDisplayP3ColorSpace;
    } else if (dfd.colorPrimaries === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KHR_DF_PRIMARIES_UNSPECIFIED"]) {
        return NoColorSpace;
    } else {
        console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${dfd.colorPrimaries}"`);
        return NoColorSpace;
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/loaders/RGBELoader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RGBELoader",
    ()=>RGBELoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
;
class RGBELoader extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataTextureLoader"] {
    constructor(manager){
        super(manager);
        this.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"];
    }
    // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
    parse(buffer) {
        const rgbe_read_error = 1, rgbe_write_error = 2, rgbe_format_error = 3, rgbe_memory_error = 4, rgbe_error = function(rgbe_error_code, msg) {
            switch(rgbe_error_code){
                case rgbe_read_error:
                    throw new Error("THREE.RGBELoader: Read Error: " + (msg || ""));
                case rgbe_write_error:
                    throw new Error("THREE.RGBELoader: Write Error: " + (msg || ""));
                case rgbe_format_error:
                    throw new Error("THREE.RGBELoader: Bad File Format: " + (msg || ""));
                default:
                case rgbe_memory_error:
                    throw new Error("THREE.RGBELoader: Memory Error: " + (msg || ""));
            }
        }, RGBE_VALID_PROGRAMTYPE = 1, RGBE_VALID_FORMAT = 2, RGBE_VALID_DIMENSIONS = 4, NEWLINE = "\n", fgets = function(buffer2, lineLimit, consume) {
            const chunkSize = 128;
            lineLimit = !lineLimit ? 1024 : lineLimit;
            let p = buffer2.pos, i = -1, len = 0, s = "", chunk = String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
            while(0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer2.byteLength){
                s += chunk;
                len += chunk.length;
                p += chunkSize;
                chunk += String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
            }
            if (-1 < i) {
                if (false !== consume) buffer2.pos += len + i + 1;
                return s + chunk.slice(0, i);
            }
            return false;
        }, RGBE_ReadHeader = function(buffer2) {
            const magic_token_re = /^#\?(\S+)/, gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, format_re = /^\s*FORMAT=(\S+)\s*$/, dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, header = {
                valid: 0,
                string: "",
                comments: "",
                programtype: "RGBE",
                format: "",
                gamma: 1,
                exposure: 1,
                width: 0,
                height: 0
            };
            let line, match;
            if (buffer2.pos >= buffer2.byteLength || !(line = fgets(buffer2))) {
                rgbe_error(rgbe_read_error, "no header found");
            }
            if (!(match = line.match(magic_token_re))) {
                rgbe_error(rgbe_format_error, "bad initial token");
            }
            header.valid |= RGBE_VALID_PROGRAMTYPE;
            header.programtype = match[1];
            header.string += line + "\n";
            while(true){
                line = fgets(buffer2);
                if (false === line) break;
                header.string += line + "\n";
                if ("#" === line.charAt(0)) {
                    header.comments += line + "\n";
                    continue;
                }
                if (match = line.match(gamma_re)) {
                    header.gamma = parseFloat(match[1]);
                }
                if (match = line.match(exposure_re)) {
                    header.exposure = parseFloat(match[1]);
                }
                if (match = line.match(format_re)) {
                    header.valid |= RGBE_VALID_FORMAT;
                    header.format = match[1];
                }
                if (match = line.match(dimensions_re)) {
                    header.valid |= RGBE_VALID_DIMENSIONS;
                    header.height = parseInt(match[1], 10);
                    header.width = parseInt(match[2], 10);
                }
                if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;
            }
            if (!(header.valid & RGBE_VALID_FORMAT)) {
                rgbe_error(rgbe_format_error, "missing format specifier");
            }
            if (!(header.valid & RGBE_VALID_DIMENSIONS)) {
                rgbe_error(rgbe_format_error, "missing image size specifier");
            }
            return header;
        }, RGBE_ReadPixels_RLE = function(buffer2, w2, h2) {
            const scanline_width = w2;
            if (// run length encoding is not allowed so read flat
            scanline_width < 8 || scanline_width > 32767 || // this file is not run length encoded
            2 !== buffer2[0] || 2 !== buffer2[1] || buffer2[2] & 128) {
                return new Uint8Array(buffer2);
            }
            if (scanline_width !== (buffer2[2] << 8 | buffer2[3])) {
                rgbe_error(rgbe_format_error, "wrong scanline width");
            }
            const data_rgba = new Uint8Array(4 * w2 * h2);
            if (!data_rgba.length) {
                rgbe_error(rgbe_memory_error, "unable to allocate buffer space");
            }
            let offset = 0, pos = 0;
            const ptr_end = 4 * scanline_width;
            const rgbeStart = new Uint8Array(4);
            const scanline_buffer = new Uint8Array(ptr_end);
            let num_scanlines = h2;
            while(num_scanlines > 0 && pos < buffer2.byteLength){
                if (pos + 4 > buffer2.byteLength) {
                    rgbe_error(rgbe_read_error);
                }
                rgbeStart[0] = buffer2[pos++];
                rgbeStart[1] = buffer2[pos++];
                rgbeStart[2] = buffer2[pos++];
                rgbeStart[3] = buffer2[pos++];
                if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) {
                    rgbe_error(rgbe_format_error, "bad rgbe scanline format");
                }
                let ptr = 0, count;
                while(ptr < ptr_end && pos < buffer2.byteLength){
                    count = buffer2[pos++];
                    const isEncodedRun = count > 128;
                    if (isEncodedRun) count -= 128;
                    if (0 === count || ptr + count > ptr_end) {
                        rgbe_error(rgbe_format_error, "bad scanline data");
                    }
                    if (isEncodedRun) {
                        const byteValue = buffer2[pos++];
                        for(let i = 0; i < count; i++){
                            scanline_buffer[ptr++] = byteValue;
                        }
                    } else {
                        scanline_buffer.set(buffer2.subarray(pos, pos + count), ptr);
                        ptr += count;
                        pos += count;
                    }
                }
                const l = scanline_width;
                for(let i = 0; i < l; i++){
                    let off = 0;
                    data_rgba[offset] = scanline_buffer[i + off];
                    off += scanline_width;
                    data_rgba[offset + 1] = scanline_buffer[i + off];
                    off += scanline_width;
                    data_rgba[offset + 2] = scanline_buffer[i + off];
                    off += scanline_width;
                    data_rgba[offset + 3] = scanline_buffer[i + off];
                    offset += 4;
                }
                num_scanlines--;
            }
            return data_rgba;
        };
        const RGBEByteToRGBFloat = function(sourceArray, sourceOffset, destArray, destOffset) {
            const e = sourceArray[sourceOffset + 3];
            const scale = Math.pow(2, e - 128) / 255;
            destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;
            destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;
            destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;
            destArray[destOffset + 3] = 1;
        };
        const RGBEByteToRGBHalf = function(sourceArray, sourceOffset, destArray, destOffset) {
            const e = sourceArray[sourceOffset + 3];
            const scale = Math.pow(2, e - 128) / 255;
            destArray[destOffset + 0] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(Math.min(sourceArray[sourceOffset + 0] * scale, 65504));
            destArray[destOffset + 1] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(Math.min(sourceArray[sourceOffset + 1] * scale, 65504));
            destArray[destOffset + 2] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(Math.min(sourceArray[sourceOffset + 2] * scale, 65504));
            destArray[destOffset + 3] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataUtils"].toHalfFloat(1);
        };
        const byteArray = new Uint8Array(buffer);
        byteArray.pos = 0;
        const rgbe_header_info = RGBE_ReadHeader(byteArray);
        const w = rgbe_header_info.width, h = rgbe_header_info.height, image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);
        let data, type;
        let numElements;
        switch(this.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatType"]:
                numElements = image_rgba_data.length / 4;
                const floatArray = new Float32Array(numElements * 4);
                for(let j = 0; j < numElements; j++){
                    RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 4);
                }
                data = floatArray;
                type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatType"];
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                numElements = image_rgba_data.length / 4;
                const halfArray = new Uint16Array(numElements * 4);
                for(let j = 0; j < numElements; j++){
                    RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 4);
                }
                data = halfArray;
                type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"];
                break;
            default:
                throw new Error("THREE.RGBELoader: Unsupported type: " + this.type);
        }
        return {
            width: w,
            height: h,
            data,
            header: rgbe_header_info.string,
            gamma: rgbe_header_info.gamma,
            exposure: rgbe_header_info.exposure,
            type
        };
    }
    setDataType(value) {
        this.type = value;
        return this;
    }
    load(url, onLoad, onProgress, onError) {
        function onLoadCallback(texture, texData) {
            switch(texture.type){
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatType"]:
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HalfFloatType"]:
                    if ("colorSpace" in texture) texture.colorSpace = "srgb-linear";
                    else texture.encoding = 3e3;
                    texture.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearFilter"];
                    texture.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinearFilter"];
                    texture.generateMipmaps = false;
                    texture.flipY = true;
                    break;
            }
            if (onLoad) onLoad(texture, texData);
        }
        return super.load(url, onLoadCallback, onProgress, onError);
    }
}
;
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.172.0/node_modules/three-stdlib/loaders/SVGLoader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SVGLoader",
    ()=>SVGLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.172.0/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
;
const COLOR_SPACE_SVG = "srgb";
const SVGLoader = /* @__PURE__ */ (()=>{
    class SVGLoader2 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Loader"] {
        constructor(manager){
            super(manager);
            this.defaultDPI = 90;
            this.defaultUnit = "px";
        }
        load(url, onLoad, onProgress, onError) {
            const scope = this;
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileLoader"](scope.manager);
            loader.setPath(scope.path);
            loader.setRequestHeader(scope.requestHeader);
            loader.setWithCredentials(scope.withCredentials);
            loader.load(url, function(text) {
                try {
                    onLoad(scope.parse(text));
                } catch (e) {
                    if (onError) {
                        onError(e);
                    } else {
                        console.error(e);
                    }
                    scope.manager.itemError(url);
                }
            }, onProgress, onError);
        }
        parse(text) {
            const scope = this;
            function parseNode(node, style) {
                if (node.nodeType !== 1) return;
                const transform = getNodeTransform(node);
                let isDefsNode = false;
                let path = null;
                switch(node.nodeName){
                    case "svg":
                        style = parseStyle(node, style);
                        break;
                    case "style":
                        parseCSSStylesheet(node);
                        break;
                    case "g":
                        style = parseStyle(node, style);
                        break;
                    case "path":
                        style = parseStyle(node, style);
                        if (node.hasAttribute("d")) path = parsePathNode(node);
                        break;
                    case "rect":
                        style = parseStyle(node, style);
                        path = parseRectNode(node);
                        break;
                    case "polygon":
                        style = parseStyle(node, style);
                        path = parsePolygonNode(node);
                        break;
                    case "polyline":
                        style = parseStyle(node, style);
                        path = parsePolylineNode(node);
                        break;
                    case "circle":
                        style = parseStyle(node, style);
                        path = parseCircleNode(node);
                        break;
                    case "ellipse":
                        style = parseStyle(node, style);
                        path = parseEllipseNode(node);
                        break;
                    case "line":
                        style = parseStyle(node, style);
                        path = parseLineNode(node);
                        break;
                    case "defs":
                        isDefsNode = true;
                        break;
                    case "use":
                        style = parseStyle(node, style);
                        const href = node.getAttributeNS("http://www.w3.org/1999/xlink", "href") || "";
                        const usedNodeId = href.substring(1);
                        const usedNode = node.viewportElement.getElementById(usedNodeId);
                        if (usedNode) {
                            parseNode(usedNode, style);
                        } else {
                            console.warn("SVGLoader: 'use node' references non-existent node id: " + usedNodeId);
                        }
                        break;
                }
                if (path) {
                    if (style.fill !== void 0 && style.fill !== "none") {
                        path.color.setStyle(style.fill, COLOR_SPACE_SVG);
                    }
                    transformPath(path, currentTransform);
                    paths.push(path);
                    path.userData = {
                        node,
                        style
                    };
                }
                const childNodes = node.childNodes;
                for(let i = 0; i < childNodes.length; i++){
                    const node2 = childNodes[i];
                    if (isDefsNode && node2.nodeName !== "style" && node2.nodeName !== "defs") {
                        continue;
                    }
                    parseNode(node2, style);
                }
                if (transform) {
                    transformStack.pop();
                    if (transformStack.length > 0) {
                        currentTransform.copy(transformStack[transformStack.length - 1]);
                    } else {
                        currentTransform.identity();
                    }
                }
            }
            function parsePathNode(node) {
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapePath"]();
                const point = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
                const control = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
                const firstPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
                let isFirstPoint = true;
                let doSetFirstPoint = false;
                const d = node.getAttribute("d");
                if (d === "" || d === "none") return null;
                const commands = d.match(/[a-df-z][^a-df-z]*/gi);
                for(let i = 0, l = commands.length; i < l; i++){
                    const command = commands[i];
                    const type = command.charAt(0);
                    const data2 = command.slice(1).trim();
                    if (isFirstPoint === true) {
                        doSetFirstPoint = true;
                        isFirstPoint = false;
                    }
                    let numbers;
                    switch(type){
                        case "M":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                point.x = numbers[j + 0];
                                point.y = numbers[j + 1];
                                control.x = point.x;
                                control.y = point.y;
                                if (j === 0) {
                                    path.moveTo(point.x, point.y);
                                } else {
                                    path.lineTo(point.x, point.y);
                                }
                                if (j === 0) firstPoint.copy(point);
                            }
                            break;
                        case "H":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j++){
                                point.x = numbers[j];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "V":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j++){
                                point.y = numbers[j];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "L":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                point.x = numbers[j + 0];
                                point.y = numbers[j + 1];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "C":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 6){
                                path.bezierCurveTo(numbers[j + 0], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], numbers[j + 5]);
                                control.x = numbers[j + 2];
                                control.y = numbers[j + 3];
                                point.x = numbers[j + 4];
                                point.y = numbers[j + 5];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "S":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 4){
                                path.bezierCurveTo(getReflection(point.x, control.x), getReflection(point.y, control.y), numbers[j + 0], numbers[j + 1], numbers[j + 2], numbers[j + 3]);
                                control.x = numbers[j + 0];
                                control.y = numbers[j + 1];
                                point.x = numbers[j + 2];
                                point.y = numbers[j + 3];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "Q":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 4){
                                path.quadraticCurveTo(numbers[j + 0], numbers[j + 1], numbers[j + 2], numbers[j + 3]);
                                control.x = numbers[j + 0];
                                control.y = numbers[j + 1];
                                point.x = numbers[j + 2];
                                point.y = numbers[j + 3];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "T":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                const rx = getReflection(point.x, control.x);
                                const ry = getReflection(point.y, control.y);
                                path.quadraticCurveTo(rx, ry, numbers[j + 0], numbers[j + 1]);
                                control.x = rx;
                                control.y = ry;
                                point.x = numbers[j + 0];
                                point.y = numbers[j + 1];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "A":
                            numbers = parseFloats(data2, [
                                3,
                                4
                            ], 7);
                            for(let j = 0, jl = numbers.length; j < jl; j += 7){
                                if (numbers[j + 5] == point.x && numbers[j + 6] == point.y) continue;
                                const start = point.clone();
                                point.x = numbers[j + 5];
                                point.y = numbers[j + 6];
                                control.x = point.x;
                                control.y = point.y;
                                parseArcCommand(path, numbers[j], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], start, point);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "m":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                point.x += numbers[j + 0];
                                point.y += numbers[j + 1];
                                control.x = point.x;
                                control.y = point.y;
                                if (j === 0) {
                                    path.moveTo(point.x, point.y);
                                } else {
                                    path.lineTo(point.x, point.y);
                                }
                                if (j === 0) firstPoint.copy(point);
                            }
                            break;
                        case "h":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j++){
                                point.x += numbers[j];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "v":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j++){
                                point.y += numbers[j];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "l":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                point.x += numbers[j + 0];
                                point.y += numbers[j + 1];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "c":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 6){
                                path.bezierCurveTo(point.x + numbers[j + 0], point.y + numbers[j + 1], point.x + numbers[j + 2], point.y + numbers[j + 3], point.x + numbers[j + 4], point.y + numbers[j + 5]);
                                control.x = point.x + numbers[j + 2];
                                control.y = point.y + numbers[j + 3];
                                point.x += numbers[j + 4];
                                point.y += numbers[j + 5];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "s":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 4){
                                path.bezierCurveTo(getReflection(point.x, control.x), getReflection(point.y, control.y), point.x + numbers[j + 0], point.y + numbers[j + 1], point.x + numbers[j + 2], point.y + numbers[j + 3]);
                                control.x = point.x + numbers[j + 0];
                                control.y = point.y + numbers[j + 1];
                                point.x += numbers[j + 2];
                                point.y += numbers[j + 3];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "q":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 4){
                                path.quadraticCurveTo(point.x + numbers[j + 0], point.y + numbers[j + 1], point.x + numbers[j + 2], point.y + numbers[j + 3]);
                                control.x = point.x + numbers[j + 0];
                                control.y = point.y + numbers[j + 1];
                                point.x += numbers[j + 2];
                                point.y += numbers[j + 3];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "t":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                const rx = getReflection(point.x, control.x);
                                const ry = getReflection(point.y, control.y);
                                path.quadraticCurveTo(rx, ry, point.x + numbers[j + 0], point.y + numbers[j + 1]);
                                control.x = rx;
                                control.y = ry;
                                point.x = point.x + numbers[j + 0];
                                point.y = point.y + numbers[j + 1];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "a":
                            numbers = parseFloats(data2, [
                                3,
                                4
                            ], 7);
                            for(let j = 0, jl = numbers.length; j < jl; j += 7){
                                if (numbers[j + 5] == 0 && numbers[j + 6] == 0) continue;
                                const start = point.clone();
                                point.x += numbers[j + 5];
                                point.y += numbers[j + 6];
                                control.x = point.x;
                                control.y = point.y;
                                parseArcCommand(path, numbers[j], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], start, point);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "Z":
                        case "z":
                            path.currentPath.autoClose = true;
                            if (path.currentPath.curves.length > 0) {
                                point.copy(firstPoint);
                                path.currentPath.currentPoint.copy(point);
                                isFirstPoint = true;
                            }
                            break;
                        default:
                            console.warn(command);
                    }
                    doSetFirstPoint = false;
                }
                return path;
            }
            function parseCSSStylesheet(node) {
                if (!node.sheet || !node.sheet.cssRules || !node.sheet.cssRules.length) return;
                for(let i = 0; i < node.sheet.cssRules.length; i++){
                    const stylesheet = node.sheet.cssRules[i];
                    if (stylesheet.type !== 1) continue;
                    const selectorList = stylesheet.selectorText.split(/,/gm).filter(Boolean).map((i2)=>i2.trim());
                    for(let j = 0; j < selectorList.length; j++){
                        const definitions = Object.fromEntries(Object.entries(stylesheet.style).filter(([, v])=>v !== ""));
                        stylesheets[selectorList[j]] = Object.assign(stylesheets[selectorList[j]] || {}, definitions);
                    }
                }
            }
            function parseArcCommand(path, rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, start, end) {
                if (rx == 0 || ry == 0) {
                    path.lineTo(end.x, end.y);
                    return;
                }
                x_axis_rotation = x_axis_rotation * Math.PI / 180;
                rx = Math.abs(rx);
                ry = Math.abs(ry);
                const dx2 = (start.x - end.x) / 2;
                const dy2 = (start.y - end.y) / 2;
                const x1p = Math.cos(x_axis_rotation) * dx2 + Math.sin(x_axis_rotation) * dy2;
                const y1p = -Math.sin(x_axis_rotation) * dx2 + Math.cos(x_axis_rotation) * dy2;
                let rxs = rx * rx;
                let rys = ry * ry;
                const x1ps = x1p * x1p;
                const y1ps = y1p * y1p;
                const cr = x1ps / rxs + y1ps / rys;
                if (cr > 1) {
                    const s = Math.sqrt(cr);
                    rx = s * rx;
                    ry = s * ry;
                    rxs = rx * rx;
                    rys = ry * ry;
                }
                const dq = rxs * y1ps + rys * x1ps;
                const pq = (rxs * rys - dq) / dq;
                let q = Math.sqrt(Math.max(0, pq));
                if (large_arc_flag === sweep_flag) q = -q;
                const cxp = q * rx * y1p / ry;
                const cyp = -q * ry * x1p / rx;
                const cx = Math.cos(x_axis_rotation) * cxp - Math.sin(x_axis_rotation) * cyp + (start.x + end.x) / 2;
                const cy = Math.sin(x_axis_rotation) * cxp + Math.cos(x_axis_rotation) * cyp + (start.y + end.y) / 2;
                const theta = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
                const delta = svgAngle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry) % (Math.PI * 2);
                path.currentPath.absellipse(cx, cy, rx, ry, theta, theta + delta, sweep_flag === 0, x_axis_rotation);
            }
            function svgAngle(ux, uy, vx, vy) {
                const dot = ux * vx + uy * vy;
                const len = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
                let ang = Math.acos(Math.max(-1, Math.min(1, dot / len)));
                if (ux * vy - uy * vx < 0) ang = -ang;
                return ang;
            }
            function parseRectNode(node) {
                const x = parseFloatWithUnits(node.getAttribute("x") || 0);
                const y = parseFloatWithUnits(node.getAttribute("y") || 0);
                const rx = parseFloatWithUnits(node.getAttribute("rx") || node.getAttribute("ry") || 0);
                const ry = parseFloatWithUnits(node.getAttribute("ry") || node.getAttribute("rx") || 0);
                const w = parseFloatWithUnits(node.getAttribute("width"));
                const h = parseFloatWithUnits(node.getAttribute("height"));
                const bci = 1 - 0.551915024494;
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapePath"]();
                path.moveTo(x + rx, y);
                path.lineTo(x + w - rx, y);
                if (rx !== 0 || ry !== 0) {
                    path.bezierCurveTo(x + w - rx * bci, y, x + w, y + ry * bci, x + w, y + ry);
                }
                path.lineTo(x + w, y + h - ry);
                if (rx !== 0 || ry !== 0) {
                    path.bezierCurveTo(x + w, y + h - ry * bci, x + w - rx * bci, y + h, x + w - rx, y + h);
                }
                path.lineTo(x + rx, y + h);
                if (rx !== 0 || ry !== 0) {
                    path.bezierCurveTo(x + rx * bci, y + h, x, y + h - ry * bci, x, y + h - ry);
                }
                path.lineTo(x, y + ry);
                if (rx !== 0 || ry !== 0) {
                    path.bezierCurveTo(x, y + ry * bci, x + rx * bci, y, x + rx, y);
                }
                return path;
            }
            function parsePolygonNode(node) {
                function iterator(match, a, b) {
                    const x = parseFloatWithUnits(a);
                    const y = parseFloatWithUnits(b);
                    if (index === 0) {
                        path.moveTo(x, y);
                    } else {
                        path.lineTo(x, y);
                    }
                    index++;
                }
                const regex = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g;
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapePath"]();
                let index = 0;
                node.getAttribute("points").replace(regex, iterator);
                path.currentPath.autoClose = true;
                return path;
            }
            function parsePolylineNode(node) {
                function iterator(match, a, b) {
                    const x = parseFloatWithUnits(a);
                    const y = parseFloatWithUnits(b);
                    if (index === 0) {
                        path.moveTo(x, y);
                    } else {
                        path.lineTo(x, y);
                    }
                    index++;
                }
                const regex = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g;
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapePath"]();
                let index = 0;
                node.getAttribute("points").replace(regex, iterator);
                path.currentPath.autoClose = false;
                return path;
            }
            function parseCircleNode(node) {
                const x = parseFloatWithUnits(node.getAttribute("cx") || 0);
                const y = parseFloatWithUnits(node.getAttribute("cy") || 0);
                const r = parseFloatWithUnits(node.getAttribute("r") || 0);
                const subpath = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Path"]();
                subpath.absarc(x, y, r, 0, Math.PI * 2);
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapePath"]();
                path.subPaths.push(subpath);
                return path;
            }
            function parseEllipseNode(node) {
                const x = parseFloatWithUnits(node.getAttribute("cx") || 0);
                const y = parseFloatWithUnits(node.getAttribute("cy") || 0);
                const rx = parseFloatWithUnits(node.getAttribute("rx") || 0);
                const ry = parseFloatWithUnits(node.getAttribute("ry") || 0);
                const subpath = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Path"]();
                subpath.absellipse(x, y, rx, ry, 0, Math.PI * 2);
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapePath"]();
                path.subPaths.push(subpath);
                return path;
            }
            function parseLineNode(node) {
                const x1 = parseFloatWithUnits(node.getAttribute("x1") || 0);
                const y1 = parseFloatWithUnits(node.getAttribute("y1") || 0);
                const x2 = parseFloatWithUnits(node.getAttribute("x2") || 0);
                const y2 = parseFloatWithUnits(node.getAttribute("y2") || 0);
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapePath"]();
                path.moveTo(x1, y1);
                path.lineTo(x2, y2);
                path.currentPath.autoClose = false;
                return path;
            }
            function parseStyle(node, style) {
                style = Object.assign({}, style);
                let stylesheetStyles = {};
                if (node.hasAttribute("class")) {
                    const classSelectors = node.getAttribute("class").split(/\s/).filter(Boolean).map((i)=>i.trim());
                    for(let i = 0; i < classSelectors.length; i++){
                        stylesheetStyles = Object.assign(stylesheetStyles, stylesheets["." + classSelectors[i]]);
                    }
                }
                if (node.hasAttribute("id")) {
                    stylesheetStyles = Object.assign(stylesheetStyles, stylesheets["#" + node.getAttribute("id")]);
                }
                function addStyle(svgName, jsName, adjustFunction) {
                    if (adjustFunction === void 0) adjustFunction = function copy(v) {
                        if (v.startsWith("url")) console.warn("SVGLoader: url access in attributes is not implemented.");
                        return v;
                    };
                    if (node.hasAttribute(svgName)) style[jsName] = adjustFunction(node.getAttribute(svgName));
                    if (stylesheetStyles[svgName]) style[jsName] = adjustFunction(stylesheetStyles[svgName]);
                    if (node.style && node.style[svgName] !== "") style[jsName] = adjustFunction(node.style[svgName]);
                }
                function clamp(v) {
                    return Math.max(0, Math.min(1, parseFloatWithUnits(v)));
                }
                function positive(v) {
                    return Math.max(0, parseFloatWithUnits(v));
                }
                addStyle("fill", "fill");
                addStyle("fill-opacity", "fillOpacity", clamp);
                addStyle("fill-rule", "fillRule");
                addStyle("opacity", "opacity", clamp);
                addStyle("stroke", "stroke");
                addStyle("stroke-opacity", "strokeOpacity", clamp);
                addStyle("stroke-width", "strokeWidth", positive);
                addStyle("stroke-linejoin", "strokeLineJoin");
                addStyle("stroke-linecap", "strokeLineCap");
                addStyle("stroke-miterlimit", "strokeMiterLimit", positive);
                addStyle("visibility", "visibility");
                return style;
            }
            function getReflection(a, b) {
                return a - (b - a);
            }
            function parseFloats(input, flags, stride) {
                if (typeof input !== "string") {
                    throw new TypeError("Invalid input: " + typeof input);
                }
                const RE = {
                    SEPARATOR: /[ \t\r\n\,.\-+]/,
                    WHITESPACE: /[ \t\r\n]/,
                    DIGIT: /[\d]/,
                    SIGN: /[-+]/,
                    POINT: /\./,
                    COMMA: /,/,
                    EXP: /e/i,
                    FLAGS: /[01]/
                };
                const SEP = 0;
                const INT = 1;
                const FLOAT = 2;
                const EXP = 3;
                let state = SEP;
                let seenComma = true;
                let number = "", exponent = "";
                const result = [];
                function throwSyntaxError(current2, i, partial) {
                    const error = new SyntaxError('Unexpected character "' + current2 + '" at index ' + i + ".");
                    error.partial = partial;
                    throw error;
                }
                function newNumber() {
                    if (number !== "") {
                        if (exponent === "") result.push(Number(number));
                        else result.push(Number(number) * Math.pow(10, Number(exponent)));
                    }
                    number = "";
                    exponent = "";
                }
                let current;
                const length = input.length;
                for(let i = 0; i < length; i++){
                    current = input[i];
                    if (Array.isArray(flags) && flags.includes(result.length % stride) && RE.FLAGS.test(current)) {
                        state = INT;
                        number = current;
                        newNumber();
                        continue;
                    }
                    if (state === SEP) {
                        if (RE.WHITESPACE.test(current)) {
                            continue;
                        }
                        if (RE.DIGIT.test(current) || RE.SIGN.test(current)) {
                            state = INT;
                            number = current;
                            continue;
                        }
                        if (RE.POINT.test(current)) {
                            state = FLOAT;
                            number = current;
                            continue;
                        }
                        if (RE.COMMA.test(current)) {
                            if (seenComma) {
                                throwSyntaxError(current, i, result);
                            }
                            seenComma = true;
                        }
                    }
                    if (state === INT) {
                        if (RE.DIGIT.test(current)) {
                            number += current;
                            continue;
                        }
                        if (RE.POINT.test(current)) {
                            number += current;
                            state = FLOAT;
                            continue;
                        }
                        if (RE.EXP.test(current)) {
                            state = EXP;
                            continue;
                        }
                        if (RE.SIGN.test(current) && number.length === 1 && RE.SIGN.test(number[0])) {
                            throwSyntaxError(current, i, result);
                        }
                    }
                    if (state === FLOAT) {
                        if (RE.DIGIT.test(current)) {
                            number += current;
                            continue;
                        }
                        if (RE.EXP.test(current)) {
                            state = EXP;
                            continue;
                        }
                        if (RE.POINT.test(current) && number[number.length - 1] === ".") {
                            throwSyntaxError(current, i, result);
                        }
                    }
                    if (state === EXP) {
                        if (RE.DIGIT.test(current)) {
                            exponent += current;
                            continue;
                        }
                        if (RE.SIGN.test(current)) {
                            if (exponent === "") {
                                exponent += current;
                                continue;
                            }
                            if (exponent.length === 1 && RE.SIGN.test(exponent)) {
                                throwSyntaxError(current, i, result);
                            }
                        }
                    }
                    if (RE.WHITESPACE.test(current)) {
                        newNumber();
                        state = SEP;
                        seenComma = false;
                    } else if (RE.COMMA.test(current)) {
                        newNumber();
                        state = SEP;
                        seenComma = true;
                    } else if (RE.SIGN.test(current)) {
                        newNumber();
                        state = INT;
                        number = current;
                    } else if (RE.POINT.test(current)) {
                        newNumber();
                        state = FLOAT;
                        number = current;
                    } else {
                        throwSyntaxError(current, i, result);
                    }
                }
                newNumber();
                return result;
            }
            const units = [
                "mm",
                "cm",
                "in",
                "pt",
                "pc",
                "px"
            ];
            const unitConversion = {
                mm: {
                    mm: 1,
                    cm: 0.1,
                    in: 1 / 25.4,
                    pt: 72 / 25.4,
                    pc: 6 / 25.4,
                    px: -1
                },
                cm: {
                    mm: 10,
                    cm: 1,
                    in: 1 / 2.54,
                    pt: 72 / 2.54,
                    pc: 6 / 2.54,
                    px: -1
                },
                in: {
                    mm: 25.4,
                    cm: 2.54,
                    in: 1,
                    pt: 72,
                    pc: 6,
                    px: -1
                },
                pt: {
                    mm: 25.4 / 72,
                    cm: 2.54 / 72,
                    in: 1 / 72,
                    pt: 1,
                    pc: 6 / 72,
                    px: -1
                },
                pc: {
                    mm: 25.4 / 6,
                    cm: 2.54 / 6,
                    in: 1 / 6,
                    pt: 72 / 6,
                    pc: 1,
                    px: -1
                },
                px: {
                    px: 1
                }
            };
            function parseFloatWithUnits(string) {
                let theUnit = "px";
                if (typeof string === "string" || string instanceof String) {
                    for(let i = 0, n = units.length; i < n; i++){
                        const u = units[i];
                        if (string.endsWith(u)) {
                            theUnit = u;
                            string = string.substring(0, string.length - u.length);
                            break;
                        }
                    }
                }
                let scale = void 0;
                if (theUnit === "px" && scope.defaultUnit !== "px") {
                    scale = unitConversion["in"][scope.defaultUnit] / scope.defaultDPI;
                } else {
                    scale = unitConversion[theUnit][scope.defaultUnit];
                    if (scale < 0) {
                        scale = unitConversion[theUnit]["in"] * scope.defaultDPI;
                    }
                }
                return scale * parseFloat(string);
            }
            function getNodeTransform(node) {
                if (!(node.hasAttribute("transform") || node.nodeName === "use" && (node.hasAttribute("x") || node.hasAttribute("y")))) {
                    return null;
                }
                const transform = parseNodeTransform(node);
                if (transformStack.length > 0) {
                    transform.premultiply(transformStack[transformStack.length - 1]);
                }
                currentTransform.copy(transform);
                transformStack.push(transform);
                return transform;
            }
            function parseNodeTransform(node) {
                const transform = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix3"]();
                const currentTransform2 = tempTransform0;
                if (node.nodeName === "use" && (node.hasAttribute("x") || node.hasAttribute("y"))) {
                    const tx = parseFloatWithUnits(node.getAttribute("x"));
                    const ty = parseFloatWithUnits(node.getAttribute("y"));
                    transform.translate(tx, ty);
                }
                if (node.hasAttribute("transform")) {
                    const transformsTexts = node.getAttribute("transform").split(")");
                    for(let tIndex = transformsTexts.length - 1; tIndex >= 0; tIndex--){
                        const transformText = transformsTexts[tIndex].trim();
                        if (transformText === "") continue;
                        const openParPos = transformText.indexOf("(");
                        const closeParPos = transformText.length;
                        if (openParPos > 0 && openParPos < closeParPos) {
                            const transformType = transformText.slice(0, openParPos);
                            const array = parseFloats(transformText.slice(openParPos + 1));
                            currentTransform2.identity();
                            switch(transformType){
                                case "translate":
                                    if (array.length >= 1) {
                                        const tx = array[0];
                                        let ty = 0;
                                        if (array.length >= 2) {
                                            ty = array[1];
                                        }
                                        currentTransform2.translate(tx, ty);
                                    }
                                    break;
                                case "rotate":
                                    if (array.length >= 1) {
                                        let angle = 0;
                                        let cx = 0;
                                        let cy = 0;
                                        angle = array[0] * Math.PI / 180;
                                        if (array.length >= 3) {
                                            cx = array[1];
                                            cy = array[2];
                                        }
                                        tempTransform1.makeTranslation(-cx, -cy);
                                        tempTransform2.makeRotation(angle);
                                        tempTransform3.multiplyMatrices(tempTransform2, tempTransform1);
                                        tempTransform1.makeTranslation(cx, cy);
                                        currentTransform2.multiplyMatrices(tempTransform1, tempTransform3);
                                    }
                                    break;
                                case "scale":
                                    if (array.length >= 1) {
                                        const scaleX = array[0];
                                        let scaleY = scaleX;
                                        if (array.length >= 2) {
                                            scaleY = array[1];
                                        }
                                        currentTransform2.scale(scaleX, scaleY);
                                    }
                                    break;
                                case "skewX":
                                    if (array.length === 1) {
                                        currentTransform2.set(1, Math.tan(array[0] * Math.PI / 180), 0, 0, 1, 0, 0, 0, 1);
                                    }
                                    break;
                                case "skewY":
                                    if (array.length === 1) {
                                        currentTransform2.set(1, 0, 0, Math.tan(array[0] * Math.PI / 180), 1, 0, 0, 0, 1);
                                    }
                                    break;
                                case "matrix":
                                    if (array.length === 6) {
                                        currentTransform2.set(array[0], array[2], array[4], array[1], array[3], array[5], 0, 0, 1);
                                    }
                                    break;
                            }
                        }
                        transform.premultiply(currentTransform2);
                    }
                }
                return transform;
            }
            function transformPath(path, m) {
                function transfVec2(v2) {
                    tempV3.set(v2.x, v2.y, 1).applyMatrix3(m);
                    v2.set(tempV3.x, tempV3.y);
                }
                function transfEllipseGeneric(curve) {
                    const a = curve.xRadius;
                    const b = curve.yRadius;
                    const cosTheta = Math.cos(curve.aRotation);
                    const sinTheta = Math.sin(curve.aRotation);
                    const v1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](a * cosTheta, a * sinTheta, 0);
                    const v2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-b * sinTheta, b * cosTheta, 0);
                    const f1 = v1.applyMatrix3(m);
                    const f2 = v2.applyMatrix3(m);
                    const mF = tempTransform0.set(f1.x, f2.x, 0, f1.y, f2.y, 0, 0, 0, 1);
                    const mFInv = tempTransform1.copy(mF).invert();
                    const mFInvT = tempTransform2.copy(mFInv).transpose();
                    const mQ = mFInvT.multiply(mFInv);
                    const mQe = mQ.elements;
                    const ed = eigenDecomposition(mQe[0], mQe[1], mQe[4]);
                    const rt1sqrt = Math.sqrt(ed.rt1);
                    const rt2sqrt = Math.sqrt(ed.rt2);
                    curve.xRadius = 1 / rt1sqrt;
                    curve.yRadius = 1 / rt2sqrt;
                    curve.aRotation = Math.atan2(ed.sn, ed.cs);
                    const isFullEllipse = (curve.aEndAngle - curve.aStartAngle) % (2 * Math.PI) < Number.EPSILON;
                    if (!isFullEllipse) {
                        const mDsqrt = tempTransform1.set(rt1sqrt, 0, 0, 0, rt2sqrt, 0, 0, 0, 1);
                        const mRT = tempTransform2.set(ed.cs, ed.sn, 0, -ed.sn, ed.cs, 0, 0, 0, 1);
                        const mDRF = mDsqrt.multiply(mRT).multiply(mF);
                        const transformAngle = (phi)=>{
                            const { x: cosR, y: sinR } = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](Math.cos(phi), Math.sin(phi), 0).applyMatrix3(mDRF);
                            return Math.atan2(sinR, cosR);
                        };
                        curve.aStartAngle = transformAngle(curve.aStartAngle);
                        curve.aEndAngle = transformAngle(curve.aEndAngle);
                        if (isTransformFlipped(m)) {
                            curve.aClockwise = !curve.aClockwise;
                        }
                    }
                }
                function transfEllipseNoSkew(curve) {
                    const sx = getTransformScaleX(m);
                    const sy = getTransformScaleY(m);
                    curve.xRadius *= sx;
                    curve.yRadius *= sy;
                    const theta = sx > Number.EPSILON ? Math.atan2(m.elements[1], m.elements[0]) : Math.atan2(-m.elements[3], m.elements[4]);
                    curve.aRotation += theta;
                    if (isTransformFlipped(m)) {
                        curve.aStartAngle *= -1;
                        curve.aEndAngle *= -1;
                        curve.aClockwise = !curve.aClockwise;
                    }
                }
                const subPaths = path.subPaths;
                for(let i = 0, n = subPaths.length; i < n; i++){
                    const subPath = subPaths[i];
                    const curves = subPath.curves;
                    for(let j = 0; j < curves.length; j++){
                        const curve = curves[j];
                        if (curve.isLineCurve) {
                            transfVec2(curve.v1);
                            transfVec2(curve.v2);
                        } else if (curve.isCubicBezierCurve) {
                            transfVec2(curve.v0);
                            transfVec2(curve.v1);
                            transfVec2(curve.v2);
                            transfVec2(curve.v3);
                        } else if (curve.isQuadraticBezierCurve) {
                            transfVec2(curve.v0);
                            transfVec2(curve.v1);
                            transfVec2(curve.v2);
                        } else if (curve.isEllipseCurve) {
                            tempV2.set(curve.aX, curve.aY);
                            transfVec2(tempV2);
                            curve.aX = tempV2.x;
                            curve.aY = tempV2.y;
                            if (isTransformSkewed(m)) {
                                transfEllipseGeneric(curve);
                            } else {
                                transfEllipseNoSkew(curve);
                            }
                        }
                    }
                }
            }
            function isTransformFlipped(m) {
                const te = m.elements;
                return te[0] * te[4] - te[1] * te[3] < 0;
            }
            function isTransformSkewed(m) {
                const te = m.elements;
                const basisDot = te[0] * te[3] + te[1] * te[4];
                if (basisDot === 0) return false;
                const sx = getTransformScaleX(m);
                const sy = getTransformScaleY(m);
                return Math.abs(basisDot / (sx * sy)) > Number.EPSILON;
            }
            function getTransformScaleX(m) {
                const te = m.elements;
                return Math.sqrt(te[0] * te[0] + te[1] * te[1]);
            }
            function getTransformScaleY(m) {
                const te = m.elements;
                return Math.sqrt(te[3] * te[3] + te[4] * te[4]);
            }
            function eigenDecomposition(A, B, C) {
                let rt1, rt2, cs, sn, t;
                const sm = A + C;
                const df = A - C;
                const rt = Math.sqrt(df * df + 4 * B * B);
                if (sm > 0) {
                    rt1 = 0.5 * (sm + rt);
                    t = 1 / rt1;
                    rt2 = A * t * C - B * t * B;
                } else if (sm < 0) {
                    rt2 = 0.5 * (sm - rt);
                } else {
                    rt1 = 0.5 * rt;
                    rt2 = -0.5 * rt;
                }
                if (df > 0) {
                    cs = df + rt;
                } else {
                    cs = df - rt;
                }
                if (Math.abs(cs) > 2 * Math.abs(B)) {
                    t = -2 * B / cs;
                    sn = 1 / Math.sqrt(1 + t * t);
                    cs = t * sn;
                } else if (Math.abs(B) === 0) {
                    cs = 1;
                    sn = 0;
                } else {
                    t = -0.5 * cs / B;
                    cs = 1 / Math.sqrt(1 + t * t);
                    sn = t * cs;
                }
                if (df > 0) {
                    t = cs;
                    cs = -sn;
                    sn = t;
                }
                return {
                    rt1,
                    rt2,
                    cs,
                    sn
                };
            }
            const paths = [];
            const stylesheets = {};
            const transformStack = [];
            const tempTransform0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix3"]();
            const tempTransform1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix3"]();
            const tempTransform2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix3"]();
            const tempTransform3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix3"]();
            const tempV2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
            const currentTransform = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix3"]();
            const xml = new DOMParser().parseFromString(text, "image/svg+xml");
            parseNode(xml.documentElement, {
                fill: "#000",
                fillOpacity: 1,
                strokeOpacity: 1,
                strokeWidth: 1,
                strokeLineJoin: "miter",
                strokeLineCap: "butt",
                strokeMiterLimit: 4
            });
            const data = {
                paths,
                xml: xml.documentElement
            };
            return data;
        }
        static createShapes(shapePath) {
            const BIGNUMBER = 999999999;
            const IntersectionLocationType = {
                ORIGIN: 0,
                DESTINATION: 1,
                BETWEEN: 2,
                LEFT: 3,
                RIGHT: 4,
                BEHIND: 5,
                BEYOND: 6
            };
            const classifyResult = {
                loc: IntersectionLocationType.ORIGIN,
                t: 0
            };
            function findEdgeIntersection(a0, a1, b0, b1) {
                const x1 = a0.x;
                const x2 = a1.x;
                const x3 = b0.x;
                const x4 = b1.x;
                const y1 = a0.y;
                const y2 = a1.y;
                const y3 = b0.y;
                const y4 = b1.y;
                const nom1 = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
                const nom2 = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
                const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
                const t1 = nom1 / denom;
                const t2 = nom2 / denom;
                if (denom === 0 && nom1 !== 0 || t1 <= 0 || t1 >= 1 || t2 < 0 || t2 > 1) {
                    return null;
                } else if (nom1 === 0 && denom === 0) {
                    for(let i = 0; i < 2; i++){
                        classifyPoint(i === 0 ? b0 : b1, a0, a1);
                        if (classifyResult.loc == IntersectionLocationType.ORIGIN) {
                            const point = i === 0 ? b0 : b1;
                            return {
                                x: point.x,
                                y: point.y,
                                t: classifyResult.t
                            };
                        } else if (classifyResult.loc == IntersectionLocationType.BETWEEN) {
                            const x = +(x1 + classifyResult.t * (x2 - x1)).toPrecision(10);
                            const y = +(y1 + classifyResult.t * (y2 - y1)).toPrecision(10);
                            return {
                                x,
                                y,
                                t: classifyResult.t
                            };
                        }
                    }
                    return null;
                } else {
                    for(let i = 0; i < 2; i++){
                        classifyPoint(i === 0 ? b0 : b1, a0, a1);
                        if (classifyResult.loc == IntersectionLocationType.ORIGIN) {
                            const point = i === 0 ? b0 : b1;
                            return {
                                x: point.x,
                                y: point.y,
                                t: classifyResult.t
                            };
                        }
                    }
                    const x = +(x1 + t1 * (x2 - x1)).toPrecision(10);
                    const y = +(y1 + t1 * (y2 - y1)).toPrecision(10);
                    return {
                        x,
                        y,
                        t: t1
                    };
                }
            }
            function classifyPoint(p, edgeStart, edgeEnd) {
                const ax = edgeEnd.x - edgeStart.x;
                const ay = edgeEnd.y - edgeStart.y;
                const bx = p.x - edgeStart.x;
                const by = p.y - edgeStart.y;
                const sa = ax * by - bx * ay;
                if (p.x === edgeStart.x && p.y === edgeStart.y) {
                    classifyResult.loc = IntersectionLocationType.ORIGIN;
                    classifyResult.t = 0;
                    return;
                }
                if (p.x === edgeEnd.x && p.y === edgeEnd.y) {
                    classifyResult.loc = IntersectionLocationType.DESTINATION;
                    classifyResult.t = 1;
                    return;
                }
                if (sa < -Number.EPSILON) {
                    classifyResult.loc = IntersectionLocationType.LEFT;
                    return;
                }
                if (sa > Number.EPSILON) {
                    classifyResult.loc = IntersectionLocationType.RIGHT;
                    return;
                }
                if (ax * bx < 0 || ay * by < 0) {
                    classifyResult.loc = IntersectionLocationType.BEHIND;
                    return;
                }
                if (Math.sqrt(ax * ax + ay * ay) < Math.sqrt(bx * bx + by * by)) {
                    classifyResult.loc = IntersectionLocationType.BEYOND;
                    return;
                }
                let t;
                if (ax !== 0) {
                    t = bx / ax;
                } else {
                    t = by / ay;
                }
                classifyResult.loc = IntersectionLocationType.BETWEEN;
                classifyResult.t = t;
            }
            function getIntersections(path1, path2) {
                const intersectionsRaw = [];
                const intersections = [];
                for(let index = 1; index < path1.length; index++){
                    const path1EdgeStart = path1[index - 1];
                    const path1EdgeEnd = path1[index];
                    for(let index2 = 1; index2 < path2.length; index2++){
                        const path2EdgeStart = path2[index2 - 1];
                        const path2EdgeEnd = path2[index2];
                        const intersection = findEdgeIntersection(path1EdgeStart, path1EdgeEnd, path2EdgeStart, path2EdgeEnd);
                        if (intersection !== null && intersectionsRaw.find((i)=>i.t <= intersection.t + Number.EPSILON && i.t >= intersection.t - Number.EPSILON) === void 0) {
                            intersectionsRaw.push(intersection);
                            intersections.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](intersection.x, intersection.y));
                        }
                    }
                }
                return intersections;
            }
            function getScanlineIntersections(scanline, boundingBox, paths) {
                const center = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
                boundingBox.getCenter(center);
                const allIntersections = [];
                paths.forEach((path)=>{
                    if (path.boundingBox.containsPoint(center)) {
                        const intersections = getIntersections(scanline, path.points);
                        intersections.forEach((p)=>{
                            allIntersections.push({
                                identifier: path.identifier,
                                isCW: path.isCW,
                                point: p
                            });
                        });
                    }
                });
                allIntersections.sort((i1, i2)=>{
                    return i1.point.x - i2.point.x;
                });
                return allIntersections;
            }
            function isHoleTo(simplePath, allPaths, scanlineMinX2, scanlineMaxX2, _fillRule) {
                if (_fillRule === null || _fillRule === void 0 || _fillRule === "") {
                    _fillRule = "nonzero";
                }
                const centerBoundingBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
                simplePath.boundingBox.getCenter(centerBoundingBox);
                const scanline = [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](scanlineMinX2, centerBoundingBox.y),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](scanlineMaxX2, centerBoundingBox.y)
                ];
                const scanlineIntersections = getScanlineIntersections(scanline, simplePath.boundingBox, allPaths);
                scanlineIntersections.sort((i1, i2)=>{
                    return i1.point.x - i2.point.x;
                });
                const baseIntersections = [];
                const otherIntersections = [];
                scanlineIntersections.forEach((i2)=>{
                    if (i2.identifier === simplePath.identifier) {
                        baseIntersections.push(i2);
                    } else {
                        otherIntersections.push(i2);
                    }
                });
                const firstXOfPath = baseIntersections[0].point.x;
                const stack = [];
                let i = 0;
                while(i < otherIntersections.length && otherIntersections[i].point.x < firstXOfPath){
                    if (stack.length > 0 && stack[stack.length - 1] === otherIntersections[i].identifier) {
                        stack.pop();
                    } else {
                        stack.push(otherIntersections[i].identifier);
                    }
                    i++;
                }
                stack.push(simplePath.identifier);
                if (_fillRule === "evenodd") {
                    const isHole = stack.length % 2 === 0 ? true : false;
                    const isHoleFor = stack[stack.length - 2];
                    return {
                        identifier: simplePath.identifier,
                        isHole,
                        for: isHoleFor
                    };
                } else if (_fillRule === "nonzero") {
                    let isHole = true;
                    let isHoleFor = null;
                    let lastCWValue = null;
                    for(let i2 = 0; i2 < stack.length; i2++){
                        const identifier = stack[i2];
                        if (isHole) {
                            lastCWValue = allPaths[identifier].isCW;
                            isHole = false;
                            isHoleFor = identifier;
                        } else if (lastCWValue !== allPaths[identifier].isCW) {
                            lastCWValue = allPaths[identifier].isCW;
                            isHole = true;
                        }
                    }
                    return {
                        identifier: simplePath.identifier,
                        isHole,
                        for: isHoleFor
                    };
                } else {
                    console.warn('fill-rule: "' + _fillRule + '" is currently not implemented.');
                }
            }
            let scanlineMinX = BIGNUMBER;
            let scanlineMaxX = -BIGNUMBER;
            let simplePaths = shapePath.subPaths.map((p)=>{
                const points = p.getPoints();
                let maxY = -BIGNUMBER;
                let minY = BIGNUMBER;
                let maxX = -BIGNUMBER;
                let minX = BIGNUMBER;
                for(let i = 0; i < points.length; i++){
                    const p2 = points[i];
                    if (p2.y > maxY) {
                        maxY = p2.y;
                    }
                    if (p2.y < minY) {
                        minY = p2.y;
                    }
                    if (p2.x > maxX) {
                        maxX = p2.x;
                    }
                    if (p2.x < minX) {
                        minX = p2.x;
                    }
                }
                if (scanlineMaxX <= maxX) {
                    scanlineMaxX = maxX + 1;
                }
                if (scanlineMinX >= minX) {
                    scanlineMinX = minX - 1;
                }
                return {
                    curves: p.curves,
                    points,
                    isCW: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapeUtils"].isClockWise(points),
                    identifier: -1,
                    boundingBox: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box2"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](minX, minY), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](maxX, maxY))
                };
            });
            simplePaths = simplePaths.filter((sp)=>sp.points.length > 1);
            for(let identifier = 0; identifier < simplePaths.length; identifier++){
                simplePaths[identifier].identifier = identifier;
            }
            const isAHole = simplePaths.map((p)=>isHoleTo(p, simplePaths, scanlineMinX, scanlineMaxX, shapePath.userData ? shapePath.userData.style.fillRule : void 0));
            const shapesToReturn = [];
            simplePaths.forEach((p)=>{
                const amIAHole = isAHole[p.identifier];
                if (!amIAHole.isHole) {
                    const shape = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Shape"]();
                    shape.curves = p.curves;
                    const holes = isAHole.filter((h)=>h.isHole && h.for === p.identifier);
                    holes.forEach((h)=>{
                        const hole = simplePaths[h.identifier];
                        const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Path"]();
                        path.curves = hole.curves;
                        shape.holes.push(path);
                    });
                    shapesToReturn.push(shape);
                }
            });
            return shapesToReturn;
        }
        static getStrokeStyle(width, color, lineJoin, lineCap, miterLimit) {
            width = width !== void 0 ? width : 1;
            color = color !== void 0 ? color : "#000";
            lineJoin = lineJoin !== void 0 ? lineJoin : "miter";
            lineCap = lineCap !== void 0 ? lineCap : "butt";
            miterLimit = miterLimit !== void 0 ? miterLimit : 4;
            return {
                strokeColor: color,
                strokeWidth: width,
                strokeLineJoin: lineJoin,
                strokeLineCap: lineCap,
                strokeMiterLimit: miterLimit
            };
        }
        static pointsToStroke(points, style, arcDivisions, minDistance) {
            const vertices = [];
            const normals = [];
            const uvs = [];
            if (SVGLoader2.pointsToStrokeWithBuffers(points, style, arcDivisions, minDistance, vertices, normals, uvs) === 0) {
                return null;
            }
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](vertices, 3));
            geometry.setAttribute("normal", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](normals, 3));
            geometry.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](uvs, 2));
            return geometry;
        }
        static pointsToStrokeWithBuffers(points, style, arcDivisions, minDistance, vertices, normals, uvs, vertexOffset) {
            const tempV2_1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_4 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_5 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_6 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_7 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const lastPointL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const lastPointR = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const point0L = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const point0R = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const currentPointL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const currentPointR = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const nextPointL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const nextPointR = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const innerPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            const outerPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$172$2e$0$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            arcDivisions = arcDivisions !== void 0 ? arcDivisions : 12;
            minDistance = minDistance !== void 0 ? minDistance : 1e-3;
            vertexOffset = vertexOffset !== void 0 ? vertexOffset : 0;
            points = removeDuplicatedPoints(points);
            const numPoints = points.length;
            if (numPoints < 2) return 0;
            const isClosed = points[0].equals(points[numPoints - 1]);
            let currentPoint;
            let previousPoint = points[0];
            let nextPoint;
            const strokeWidth2 = style.strokeWidth / 2;
            const deltaU = 1 / (numPoints - 1);
            let u0 = 0, u1;
            let innerSideModified;
            let joinIsOnLeftSide;
            let isMiter;
            let initialJoinIsOnLeftSide = false;
            let numVertices = 0;
            let currentCoordinate = vertexOffset * 3;
            let currentCoordinateUV = vertexOffset * 2;
            getNormal(points[0], points[1], tempV2_1).multiplyScalar(strokeWidth2);
            lastPointL.copy(points[0]).sub(tempV2_1);
            lastPointR.copy(points[0]).add(tempV2_1);
            point0L.copy(lastPointL);
            point0R.copy(lastPointR);
            for(let iPoint = 1; iPoint < numPoints; iPoint++){
                currentPoint = points[iPoint];
                if (iPoint === numPoints - 1) {
                    if (isClosed) {
                        nextPoint = points[1];
                    } else nextPoint = void 0;
                } else {
                    nextPoint = points[iPoint + 1];
                }
                const normal1 = tempV2_1;
                getNormal(previousPoint, currentPoint, normal1);
                tempV2_3.copy(normal1).multiplyScalar(strokeWidth2);
                currentPointL.copy(currentPoint).sub(tempV2_3);
                currentPointR.copy(currentPoint).add(tempV2_3);
                u1 = u0 + deltaU;
                innerSideModified = false;
                if (nextPoint !== void 0) {
                    getNormal(currentPoint, nextPoint, tempV2_2);
                    tempV2_3.copy(tempV2_2).multiplyScalar(strokeWidth2);
                    nextPointL.copy(currentPoint).sub(tempV2_3);
                    nextPointR.copy(currentPoint).add(tempV2_3);
                    joinIsOnLeftSide = true;
                    tempV2_3.subVectors(nextPoint, previousPoint);
                    if (normal1.dot(tempV2_3) < 0) {
                        joinIsOnLeftSide = false;
                    }
                    if (iPoint === 1) initialJoinIsOnLeftSide = joinIsOnLeftSide;
                    tempV2_3.subVectors(nextPoint, currentPoint);
                    tempV2_3.normalize();
                    const dot = Math.abs(normal1.dot(tempV2_3));
                    if (dot > Number.EPSILON) {
                        const miterSide = strokeWidth2 / dot;
                        tempV2_3.multiplyScalar(-miterSide);
                        tempV2_4.subVectors(currentPoint, previousPoint);
                        tempV2_5.copy(tempV2_4).setLength(miterSide).add(tempV2_3);
                        innerPoint.copy(tempV2_5).negate();
                        const miterLength2 = tempV2_5.length();
                        const segmentLengthPrev = tempV2_4.length();
                        tempV2_4.divideScalar(segmentLengthPrev);
                        tempV2_6.subVectors(nextPoint, currentPoint);
                        const segmentLengthNext = tempV2_6.length();
                        tempV2_6.divideScalar(segmentLengthNext);
                        if (tempV2_4.dot(innerPoint) < segmentLengthPrev && tempV2_6.dot(innerPoint) < segmentLengthNext) {
                            innerSideModified = true;
                        }
                        outerPoint.copy(tempV2_5).add(currentPoint);
                        innerPoint.add(currentPoint);
                        isMiter = false;
                        if (innerSideModified) {
                            if (joinIsOnLeftSide) {
                                nextPointR.copy(innerPoint);
                                currentPointR.copy(innerPoint);
                            } else {
                                nextPointL.copy(innerPoint);
                                currentPointL.copy(innerPoint);
                            }
                        } else {
                            makeSegmentTriangles();
                        }
                        switch(style.strokeLineJoin){
                            case "bevel":
                                makeSegmentWithBevelJoin(joinIsOnLeftSide, innerSideModified, u1);
                                break;
                            case "round":
                                createSegmentTrianglesWithMiddleSection(joinIsOnLeftSide, innerSideModified);
                                if (joinIsOnLeftSide) {
                                    makeCircularSector(currentPoint, currentPointL, nextPointL, u1, 0);
                                } else {
                                    makeCircularSector(currentPoint, nextPointR, currentPointR, u1, 1);
                                }
                                break;
                            case "miter":
                            case "miter-clip":
                            default:
                                const miterFraction = strokeWidth2 * style.strokeMiterLimit / miterLength2;
                                if (miterFraction < 1) {
                                    if (style.strokeLineJoin !== "miter-clip") {
                                        makeSegmentWithBevelJoin(joinIsOnLeftSide, innerSideModified, u1);
                                        break;
                                    } else {
                                        createSegmentTrianglesWithMiddleSection(joinIsOnLeftSide, innerSideModified);
                                        if (joinIsOnLeftSide) {
                                            tempV2_6.subVectors(outerPoint, currentPointL).multiplyScalar(miterFraction).add(currentPointL);
                                            tempV2_7.subVectors(outerPoint, nextPointL).multiplyScalar(miterFraction).add(nextPointL);
                                            addVertex(currentPointL, u1, 0);
                                            addVertex(tempV2_6, u1, 0);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(tempV2_6, u1, 0);
                                            addVertex(tempV2_7, u1, 0);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(tempV2_7, u1, 0);
                                            addVertex(nextPointL, u1, 0);
                                        } else {
                                            tempV2_6.subVectors(outerPoint, currentPointR).multiplyScalar(miterFraction).add(currentPointR);
                                            tempV2_7.subVectors(outerPoint, nextPointR).multiplyScalar(miterFraction).add(nextPointR);
                                            addVertex(currentPointR, u1, 1);
                                            addVertex(tempV2_6, u1, 1);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(tempV2_6, u1, 1);
                                            addVertex(tempV2_7, u1, 1);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(tempV2_7, u1, 1);
                                            addVertex(nextPointR, u1, 1);
                                        }
                                    }
                                } else {
                                    if (innerSideModified) {
                                        if (joinIsOnLeftSide) {
                                            addVertex(lastPointR, u0, 1);
                                            addVertex(lastPointL, u0, 0);
                                            addVertex(outerPoint, u1, 0);
                                            addVertex(lastPointR, u0, 1);
                                            addVertex(outerPoint, u1, 0);
                                            addVertex(innerPoint, u1, 1);
                                        } else {
                                            addVertex(lastPointR, u0, 1);
                                            addVertex(lastPointL, u0, 0);
                                            addVertex(outerPoint, u1, 1);
                                            addVertex(lastPointL, u0, 0);
                                            addVertex(innerPoint, u1, 0);
                                            addVertex(outerPoint, u1, 1);
                                        }
                                        if (joinIsOnLeftSide) {
                                            nextPointL.copy(outerPoint);
                                        } else {
                                            nextPointR.copy(outerPoint);
                                        }
                                    } else {
                                        if (joinIsOnLeftSide) {
                                            addVertex(currentPointL, u1, 0);
                                            addVertex(outerPoint, u1, 0);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(outerPoint, u1, 0);
                                            addVertex(nextPointL, u1, 0);
                                        } else {
                                            addVertex(currentPointR, u1, 1);
                                            addVertex(outerPoint, u1, 1);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(outerPoint, u1, 1);
                                            addVertex(nextPointR, u1, 1);
                                        }
                                    }
                                    isMiter = true;
                                }
                                break;
                        }
                    } else {
                        makeSegmentTriangles();
                    }
                } else {
                    makeSegmentTriangles();
                }
                if (!isClosed && iPoint === numPoints - 1) {
                    addCapGeometry(points[0], point0L, point0R, joinIsOnLeftSide, true, u0);
                }
                u0 = u1;
                previousPoint = currentPoint;
                lastPointL.copy(nextPointL);
                lastPointR.copy(nextPointR);
            }
            if (!isClosed) {
                addCapGeometry(currentPoint, currentPointL, currentPointR, joinIsOnLeftSide, false, u1);
            } else if (innerSideModified && vertices) {
                let lastOuter = outerPoint;
                let lastInner = innerPoint;
                if (initialJoinIsOnLeftSide !== joinIsOnLeftSide) {
                    lastOuter = innerPoint;
                    lastInner = outerPoint;
                }
                if (joinIsOnLeftSide) {
                    if (isMiter || initialJoinIsOnLeftSide) {
                        lastInner.toArray(vertices, 0 * 3);
                        lastInner.toArray(vertices, 3 * 3);
                        if (isMiter) {
                            lastOuter.toArray(vertices, 1 * 3);
                        }
                    }
                } else {
                    if (isMiter || !initialJoinIsOnLeftSide) {
                        lastInner.toArray(vertices, 1 * 3);
                        lastInner.toArray(vertices, 3 * 3);
                        if (isMiter) {
                            lastOuter.toArray(vertices, 0 * 3);
                        }
                    }
                }
            }
            return numVertices;
            //TURBOPACK unreachable
            ;
            function getNormal(p1, p2, result) {
                result.subVectors(p2, p1);
                return result.set(-result.y, result.x).normalize();
            }
            function addVertex(position, u, v) {
                if (vertices) {
                    vertices[currentCoordinate] = position.x;
                    vertices[currentCoordinate + 1] = position.y;
                    vertices[currentCoordinate + 2] = 0;
                    if (normals) {
                        normals[currentCoordinate] = 0;
                        normals[currentCoordinate + 1] = 0;
                        normals[currentCoordinate + 2] = 1;
                    }
                    currentCoordinate += 3;
                    if (uvs) {
                        uvs[currentCoordinateUV] = u;
                        uvs[currentCoordinateUV + 1] = v;
                        currentCoordinateUV += 2;
                    }
                }
                numVertices += 3;
            }
            function makeCircularSector(center, p1, p2, u, v) {
                tempV2_1.copy(p1).sub(center).normalize();
                tempV2_2.copy(p2).sub(center).normalize();
                let angle = Math.PI;
                const dot = tempV2_1.dot(tempV2_2);
                if (Math.abs(dot) < 1) angle = Math.abs(Math.acos(dot));
                angle /= arcDivisions;
                tempV2_3.copy(p1);
                for(let i = 0, il = arcDivisions - 1; i < il; i++){
                    tempV2_4.copy(tempV2_3).rotateAround(center, angle);
                    addVertex(tempV2_3, u, v);
                    addVertex(tempV2_4, u, v);
                    addVertex(center, u, 0.5);
                    tempV2_3.copy(tempV2_4);
                }
                addVertex(tempV2_4, u, v);
                addVertex(p2, u, v);
                addVertex(center, u, 0.5);
            }
            function makeSegmentTriangles() {
                addVertex(lastPointR, u0, 1);
                addVertex(lastPointL, u0, 0);
                addVertex(currentPointL, u1, 0);
                addVertex(lastPointR, u0, 1);
                addVertex(currentPointL, u1, 0);
                addVertex(currentPointR, u1, 1);
            }
            function makeSegmentWithBevelJoin(joinIsOnLeftSide2, innerSideModified2, u) {
                if (innerSideModified2) {
                    if (joinIsOnLeftSide2) {
                        addVertex(lastPointR, u0, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(currentPointL, u1, 0);
                        addVertex(lastPointR, u0, 1);
                        addVertex(currentPointL, u1, 0);
                        addVertex(innerPoint, u1, 1);
                        addVertex(currentPointL, u, 0);
                        addVertex(nextPointL, u, 0);
                        addVertex(innerPoint, u, 0.5);
                    } else {
                        addVertex(lastPointR, u0, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(currentPointR, u1, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(innerPoint, u1, 0);
                        addVertex(currentPointR, u1, 1);
                        addVertex(currentPointR, u, 1);
                        addVertex(innerPoint, u, 0);
                        addVertex(nextPointR, u, 1);
                    }
                } else {
                    if (joinIsOnLeftSide2) {
                        addVertex(currentPointL, u, 0);
                        addVertex(nextPointL, u, 0);
                        addVertex(currentPoint, u, 0.5);
                    } else {
                        addVertex(currentPointR, u, 1);
                        addVertex(nextPointR, u, 0);
                        addVertex(currentPoint, u, 0.5);
                    }
                }
            }
            function createSegmentTrianglesWithMiddleSection(joinIsOnLeftSide2, innerSideModified2) {
                if (innerSideModified2) {
                    if (joinIsOnLeftSide2) {
                        addVertex(lastPointR, u0, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(currentPointL, u1, 0);
                        addVertex(lastPointR, u0, 1);
                        addVertex(currentPointL, u1, 0);
                        addVertex(innerPoint, u1, 1);
                        addVertex(currentPointL, u0, 0);
                        addVertex(currentPoint, u1, 0.5);
                        addVertex(innerPoint, u1, 1);
                        addVertex(currentPoint, u1, 0.5);
                        addVertex(nextPointL, u0, 0);
                        addVertex(innerPoint, u1, 1);
                    } else {
                        addVertex(lastPointR, u0, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(currentPointR, u1, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(innerPoint, u1, 0);
                        addVertex(currentPointR, u1, 1);
                        addVertex(currentPointR, u0, 1);
                        addVertex(innerPoint, u1, 0);
                        addVertex(currentPoint, u1, 0.5);
                        addVertex(currentPoint, u1, 0.5);
                        addVertex(innerPoint, u1, 0);
                        addVertex(nextPointR, u0, 1);
                    }
                }
            }
            function addCapGeometry(center, p1, p2, joinIsOnLeftSide2, start, u) {
                switch(style.strokeLineCap){
                    case "round":
                        if (start) {
                            makeCircularSector(center, p2, p1, u, 0.5);
                        } else {
                            makeCircularSector(center, p1, p2, u, 0.5);
                        }
                        break;
                    case "square":
                        if (start) {
                            tempV2_1.subVectors(p1, center);
                            tempV2_2.set(tempV2_1.y, -tempV2_1.x);
                            tempV2_3.addVectors(tempV2_1, tempV2_2).add(center);
                            tempV2_4.subVectors(tempV2_2, tempV2_1).add(center);
                            if (joinIsOnLeftSide2) {
                                tempV2_3.toArray(vertices, 1 * 3);
                                tempV2_4.toArray(vertices, 0 * 3);
                                tempV2_4.toArray(vertices, 3 * 3);
                            } else {
                                tempV2_3.toArray(vertices, 1 * 3);
                                uvs[3 * 2 + 1] === 1 ? tempV2_4.toArray(vertices, 3 * 3) : tempV2_3.toArray(vertices, 3 * 3);
                                tempV2_4.toArray(vertices, 0 * 3);
                            }
                        } else {
                            tempV2_1.subVectors(p2, center);
                            tempV2_2.set(tempV2_1.y, -tempV2_1.x);
                            tempV2_3.addVectors(tempV2_1, tempV2_2).add(center);
                            tempV2_4.subVectors(tempV2_2, tempV2_1).add(center);
                            const vl = vertices.length;
                            if (joinIsOnLeftSide2) {
                                tempV2_3.toArray(vertices, vl - 1 * 3);
                                tempV2_4.toArray(vertices, vl - 2 * 3);
                                tempV2_4.toArray(vertices, vl - 4 * 3);
                            } else {
                                tempV2_4.toArray(vertices, vl - 2 * 3);
                                tempV2_3.toArray(vertices, vl - 1 * 3);
                                tempV2_4.toArray(vertices, vl - 4 * 3);
                            }
                        }
                        break;
                }
            }
            function removeDuplicatedPoints(points2) {
                let dupPoints = false;
                for(let i = 1, n = points2.length - 1; i < n; i++){
                    if (points2[i].distanceTo(points2[i + 1]) < minDistance) {
                        dupPoints = true;
                        break;
                    }
                }
                if (!dupPoints) return points2;
                const newPoints = [];
                newPoints.push(points2[0]);
                for(let i = 1, n = points2.length - 1; i < n; i++){
                    if (points2[i].distanceTo(points2[i + 1]) >= minDistance) {
                        newPoints.push(points2[i]);
                    }
                }
                newPoints.push(points2[points2.length - 1]);
                return newPoints;
            }
        }
    }
    return SVGLoader2;
})();
;
}),
];

//# sourceMappingURL=1w7z_three-stdlib_loaders_1mben53._.js.map