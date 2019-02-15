/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "b1a08d0c7bff5a8e9c2a";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "server";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3334/static/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/paths.js":
/*!*************************!*\
  !*** ./config/paths.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var path = __webpack_require__(/*! path */ \"path\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar appDirectory = fs.realpathSync(process.cwd());\n\nvar resolveApp = function resolveApp(relativePath) {\n  return path.resolve(appDirectory, relativePath);\n};\n\nvar paths = {\n  appHtml: resolveApp(\"config/webpack.config.js/template.html\"),\n  clientBuild: resolveApp(\"build/client\"),\n  serverBuild: resolveApp(\"build/server\"),\n  dotenv: resolveApp(\".env\"),\n  src: resolveApp(\"src\"),\n  srcClient: resolveApp(\"src/client\"),\n  srcServer: resolveApp(\"src/server\"),\n  srcShared: resolveApp(\"src/shared\"),\n  publicPath: \"/static/\"\n};\npaths.resolveModules = [paths.srcClient, paths.srcServer, paths.srcShared, paths.src, \"node_modules\"];\nmodule.exports = paths;\n\n//# sourceURL=webpack:///./config/paths.js?");

/***/ }),

/***/ "./node_modules/@babel/polyfill/lib/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@babel/polyfill/lib/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! core-js/es6 */ \"core-js/es6\");\n\n__webpack_require__(/*! core-js/fn/array/includes */ \"core-js/fn/array/includes\");\n\n__webpack_require__(/*! core-js/fn/string/pad-start */ \"core-js/fn/string/pad-start\");\n\n__webpack_require__(/*! core-js/fn/string/pad-end */ \"core-js/fn/string/pad-end\");\n\n__webpack_require__(/*! core-js/fn/symbol/async-iterator */ \"core-js/fn/symbol/async-iterator\");\n\n__webpack_require__(/*! core-js/fn/object/get-own-property-descriptors */ \"core-js/fn/object/get-own-property-descriptors\");\n\n__webpack_require__(/*! core-js/fn/object/values */ \"core-js/fn/object/values\");\n\n__webpack_require__(/*! core-js/fn/object/entries */ \"core-js/fn/object/entries\");\n\n__webpack_require__(/*! core-js/fn/promise/finally */ \"core-js/fn/promise/finally\");\n\n__webpack_require__(/*! core-js/web */ \"core-js/web\");\n\n__webpack_require__(/*! regenerator-runtime/runtime */ \"regenerator-runtime/runtime\");\n\nif (global._babelPolyfill && typeof console !== \"undefined\" && console.warn) {\n  console.warn(\"@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended \" + \"and may have consequences if different versions of the polyfills are applied sequentially. \" + \"If you do need to load the polyfill more than once, use @babel/polyfill/noConflict \" + \"instead to bypass the warning.\");\n}\n\nglobal._babelPolyfill = true;\n\n//# sourceURL=webpack:///./node_modules/@babel/polyfill/lib/index.js?");

/***/ }),

/***/ "./node_modules/@svgr/webpack/lib/index.js?-prettier,-svgo!./src/shared/assets/react.svg":
/*!**************************************************************************************!*\
  !*** ./node_modules/@svgr/webpack/lib?-prettier,-svgo!./src/shared/assets/react.svg ***!
  \**************************************************************************************/
/*! exports provided: default, ReactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ReactComponent\", function() { return SvgReact; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\nvar _ref =\n/*#__PURE__*/\nreact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"g\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\", {\n  d: \"M210.483381,73.8236374 C207.827698,72.9095503 205.075867,72.0446761 202.24247,71.2267368 C202.708172,69.3261098 203.135596,67.4500894 203.515631,65.6059664 C209.753843,35.3248922 205.675082,10.9302478 191.747328,2.89849283 C178.392359,-4.80289661 156.551327,3.22703567 134.492936,22.4237776 C132.371761,24.2697233 130.244662,26.2241201 128.118477,28.2723861 C126.701777,26.917204 125.287358,25.6075897 123.876584,24.3549348 C100.758745,3.82852863 77.5866802,-4.82157937 63.6725966,3.23341515 C50.3303869,10.9571328 46.3792156,33.8904224 51.9945178,62.5880206 C52.5367729,65.3599011 53.1706189,68.1905639 53.8873982,71.068617 C50.6078941,71.9995641 47.4418534,72.9920277 44.4125156,74.0478303 C17.3093297,83.497195 0,98.3066828 0,113.667995 C0,129.533287 18.5815786,145.446423 46.8116526,155.095373 C49.0394553,155.856809 51.3511025,156.576778 53.7333796,157.260293 C52.9600965,160.37302 52.2875179,163.423318 51.7229345,166.398431 C46.3687351,194.597975 50.5500231,216.989464 63.8566899,224.664425 C77.6012619,232.590464 100.66852,224.443422 123.130185,204.809231 C124.905501,203.257196 126.687196,201.611293 128.472081,199.886102 C130.785552,202.113904 133.095375,204.222319 135.392897,206.199955 C157.14963,224.922338 178.637969,232.482469 191.932332,224.786092 C205.663234,216.837268 210.125675,192.78347 204.332202,163.5181 C203.88974,161.283006 203.374826,158.99961 202.796573,156.675661 C204.416503,156.196743 206.006814,155.702335 207.557482,155.188332 C236.905331,145.46465 256,129.745175 256,113.667995 C256,98.2510906 238.132466,83.3418093 210.483381,73.8236374 L210.483381,73.8236374 Z M204.118035,144.807565 C202.718197,145.270987 201.281904,145.718918 199.818271,146.153177 C196.578411,135.896354 192.205739,124.989735 186.854729,113.72131 C191.961041,102.721277 196.164656,91.9540963 199.313837,81.7638014 C201.93261,82.5215915 204.474374,83.3208483 206.923636,84.1643056 C230.613348,92.3195488 245.063763,104.377206 245.063763,113.667995 C245.063763,123.564379 229.457753,136.411268 204.118035,144.807565 L204.118035,144.807565 Z M193.603754,165.642007 C196.165567,178.582766 196.531475,190.282717 194.834536,199.429057 C193.309843,207.64764 190.243595,213.12715 186.452366,215.321689 C178.384612,219.991462 161.131788,213.921395 142.525146,197.909832 C140.392124,196.074366 138.243609,194.114502 136.088259,192.040261 C143.301619,184.151133 150.510878,174.979732 157.54698,164.793993 C169.922699,163.695814 181.614905,161.900447 192.218042,159.449363 C192.740247,161.555956 193.204126,163.621993 193.603754,165.642007 L193.603754,165.642007 Z M87.2761866,214.514686 C79.3938934,217.298414 73.1160375,217.378157 69.3211631,215.189998 C61.2461189,210.532528 57.8891498,192.554265 62.4682434,168.438039 C62.9927272,165.676183 63.6170041,162.839142 64.3365173,159.939216 C74.8234575,162.258154 86.4299951,163.926841 98.8353334,164.932519 C105.918826,174.899534 113.336329,184.06091 120.811247,192.08264 C119.178102,193.65928 117.551336,195.16028 115.933685,196.574699 C106.001303,205.256705 96.0479605,211.41654 87.2761866,214.514686 L87.2761866,214.514686 Z M50.3486141,144.746959 C37.8658105,140.48046 27.5570398,134.935332 20.4908634,128.884403 C14.1414664,123.446815 10.9357817,118.048415 10.9357817,113.667995 C10.9357817,104.34622 24.8334611,92.4562517 48.0123604,84.3748281 C50.8247961,83.3942121 53.7689223,82.4701001 56.8242337,81.6020363 C60.0276398,92.0224477 64.229889,102.917218 69.3011135,113.93411 C64.1642716,125.11459 59.9023288,136.182975 56.6674809,146.725506 C54.489347,146.099407 52.3791089,145.440499 50.3486141,144.746959 L50.3486141,144.746959 Z M62.7270678,60.4878073 C57.9160346,35.9004118 61.1112387,17.3525532 69.1516515,12.6982729 C77.7160924,7.74005624 96.6544653,14.8094222 116.614922,32.5329619 C117.890816,33.6657739 119.171723,34.8514442 120.456275,36.0781256 C113.018267,44.0647686 105.66866,53.1573386 98.6480514,63.0655695 C86.6081646,64.1815215 75.0831931,65.9741531 64.4868907,68.3746571 C63.8206914,65.6948233 63.2305903,63.0619242 62.7270678,60.4878073 L62.7270678,60.4878073 Z M173.153901,87.7550367 C170.620796,83.3796304 168.020249,79.1076627 165.369124,74.9523483 C173.537126,75.9849113 181.362914,77.3555864 188.712066,79.0329319 C186.505679,86.1041206 183.755673,93.4974728 180.518546,101.076741 C178.196419,96.6680702 175.740322,92.2229454 173.153901,87.7550367 L173.153901,87.7550367 Z M128.122121,43.8938899 C133.166461,49.3588189 138.218091,55.4603279 143.186789,62.0803968 C138.179814,61.8439007 133.110868,61.720868 128.000001,61.720868 C122.937434,61.720868 117.905854,61.8411667 112.929865,62.0735617 C117.903575,55.515009 122.99895,49.4217021 128.122121,43.8938899 L128.122121,43.8938899 Z M82.8018984,87.830679 C80.2715265,92.2183886 77.8609975,96.6393627 75.5753239,101.068539 C72.3906004,93.5156998 69.6661103,86.0886276 67.440586,78.9171899 C74.7446255,77.2826781 82.5335049,75.9461789 90.6495601,74.9332099 C87.9610684,79.1268011 85.3391054,83.4302106 82.8018984,87.8297677 L82.8018984,87.830679 L82.8018984,87.830679 Z M90.8833221,153.182899 C82.4979621,152.247395 74.5919739,150.979704 67.289757,149.390303 C69.5508242,142.09082 72.3354636,134.505173 75.5876271,126.789657 C77.8792246,131.215644 80.2993228,135.638441 82.8451877,140.03572 L82.8456433,140.03572 C85.4388987,144.515476 88.1255676,148.90364 90.8833221,153.182899 L90.8833221,153.182899 Z M128.424691,184.213105 C123.24137,178.620587 118.071264,172.434323 113.021912,165.780078 C117.923624,165.972373 122.921029,166.0708 128.000001,166.0708 C133.217953,166.0708 138.376211,165.953235 143.45336,165.727219 C138.468257,172.501308 133.434855,178.697141 128.424691,184.213105 L128.424691,184.213105 Z M180.622896,126.396409 C184.044571,134.195313 186.929004,141.741317 189.219234,148.9164 C181.796719,150.609693 173.782736,151.973534 165.339049,152.986959 C167.996555,148.775595 170.619884,144.430263 173.197646,139.960532 C175.805484,135.438399 178.28163,130.90943 180.622896,126.396409 L180.622896,126.396409 Z M163.724586,134.496971 C159.722835,141.435557 155.614455,148.059271 151.443648,154.311611 C143.847063,154.854776 135.998946,155.134562 128.000001,155.134562 C120.033408,155.134562 112.284171,154.887129 104.822013,154.402745 C100.48306,148.068386 96.285368,141.425078 92.3091341,134.556664 L92.3100455,134.556664 C88.3442923,127.706935 84.6943232,120.799333 81.3870228,113.930466 C84.6934118,107.045648 88.3338117,100.130301 92.276781,93.292874 L92.2758697,93.294241 C96.2293193,86.4385872 100.390102,79.8276317 104.688954,73.5329157 C112.302398,72.9573964 120.109505,72.6571055 127.999545,72.6571055 L128.000001,72.6571055 C135.925583,72.6571055 143.742714,72.9596746 151.353879,73.5402067 C155.587114,79.7888993 159.719645,86.3784378 163.688588,93.2350031 C167.702644,100.168578 171.389978,107.037901 174.724618,113.77508 C171.400003,120.627999 167.720871,127.566587 163.724586,134.496971 L163.724586,134.496971 Z M186.284677,12.3729198 C194.857321,17.3165548 198.191049,37.2542268 192.804953,63.3986692 C192.461372,65.0669011 192.074504,66.7661189 191.654369,68.4881206 C181.03346,66.0374921 169.500286,64.2138746 157.425315,63.0810626 C150.391035,53.0639249 143.101577,43.9572289 135.784778,36.073113 C137.751934,34.1806885 139.716356,32.3762092 141.672575,30.673346 C160.572216,14.2257007 178.236518,7.73185406 186.284677,12.3729198 L186.284677,12.3729198 Z M128.000001,90.8080696 C140.624975,90.8080696 150.859926,101.042565 150.859926,113.667995 C150.859926,126.292969 140.624975,136.527922 128.000001,136.527922 C115.375026,136.527922 105.140075,126.292969 105.140075,113.667995 C105.140075,101.042565 115.375026,90.8080696 128.000001,90.8080696 L128.000001,90.8080696 Z\",\n  fill: \"#00D8FF\"\n}));\n\nvar SvgReact = function SvgReact(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\", _extends({\n    width: \"256px\",\n    height: \"228px\",\n    viewBox: \"0 0 256 228\",\n    preserveAspectRatio: \"xMidYMid\"\n  }, props), _ref);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"assets/react.9a28da9f.svg\");\n\n\n//# sourceURL=webpack:///./src/shared/assets/react.svg?./node_modules/@svgr/webpack/lib?-prettier,-svgo");

/***/ }),

/***/ "./src/server/components/HTML.js":
/*!***************************************!*\
  !*** ./src/server/components/HTML.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return HTML; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ \"react-helmet\");\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* eslint-disable react/no-danger */\n\n\n\nvar HTML =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(HTML, _React$Component);\n\n  function HTML() {\n    _classCallCheck(this, HTML);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(HTML).apply(this, arguments));\n  }\n\n  _createClass(HTML, [{\n    key: \"render\",\n    value: function render() {\n      var head = react_helmet__WEBPACK_IMPORTED_MODULE_1___default.a.renderStatic();\n      var _this$props = this.props,\n          children = _this$props.children,\n          scripts = _this$props.scripts,\n          css = _this$props.css,\n          state = _this$props.state;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"html\", {\n        lang: \"\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"head\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"meta\", {\n        charSet: \"utf-8\"\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"meta\", {\n        name: \"viewport\",\n        content: \"width=device-width, initial-scale=1\"\n      }), head.base.toComponent(), head.title.toComponent(), head.meta.toComponent(), head.link.toComponent(), head.script.toComponent(), css.map(function (href) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"link\", {\n          key: href,\n          rel: \"stylesheet\",\n          href: href\n        });\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"script\", {\n        dangerouslySetInnerHTML: {\n          __html: \"window.__PRELOADED_STATE__ = \".concat(state)\n        }\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"body\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"app\",\n        dangerouslySetInnerHTML: {\n          __html: children\n        }\n      }), scripts.map(function (src) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"script\", {\n          key: src,\n          src: src\n        });\n      })));\n    }\n  }]);\n\n  return HTML;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n_defineProperty(HTML, \"defaultProps\", {\n  css: [],\n  scripts: [],\n  state: '{}'\n});\n\n\n\n//# sourceURL=webpack:///./src/server/components/HTML.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chalk */ \"chalk\");\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _middleware_manifest_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middleware/manifest-helpers */ \"./src/server/middleware/manifest-helpers.js\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _shared_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/store */ \"./src/shared/store/index.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./render */ \"./src/server/render.js\");\n/* harmony import */ var _config_paths__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../config/paths */ \"./config/paths.js\");\n/* harmony import */ var _config_paths__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_config_paths__WEBPACK_IMPORTED_MODULE_8__);\n// import React from 'react';\n\n\n\n // import manifestHelpers from 'express-manifest-helpers';\n\n\n\n\n\n\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()(); // Use Nginx or Apache to serve static assets in production or remove the if() around the following\n// lines to use the express.static middleware to serve assets for production (not recommended!)\n\nif (true) {\n  app.use(_config_paths__WEBPACK_IMPORTED_MODULE_8___default.a.publicPath, express__WEBPACK_IMPORTED_MODULE_0___default.a.static(path__WEBPACK_IMPORTED_MODULE_2___default.a.join(_config_paths__WEBPACK_IMPORTED_MODULE_8___default.a.clientBuild, _config_paths__WEBPACK_IMPORTED_MODULE_8___default.a.publicPath)));\n  app.use('/favicon.ico', function (req, res) {\n    res.send('');\n  });\n}\n\napp.use(cors__WEBPACK_IMPORTED_MODULE_1___default()());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.json());\napp.use(function (req, res, next) {\n  req.store = Object(_shared_store__WEBPACK_IMPORTED_MODULE_6__[\"configureStore\"])();\n  return next();\n});\nvar manifestPath = path__WEBPACK_IMPORTED_MODULE_2___default.a.join(_config_paths__WEBPACK_IMPORTED_MODULE_8___default.a.clientBuild, _config_paths__WEBPACK_IMPORTED_MODULE_8___default.a.publicPath);\napp.use(Object(_middleware_manifest_helpers__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({\n  manifestPath: \"\".concat(manifestPath, \"/manifest.json\")\n}));\napp.use(Object(_render__WEBPACK_IMPORTED_MODULE_7__[\"default\"])()); // eslint-disable-next-line no-unused-vars\n\napp.use(function (err, req, res, next) {\n  return res.status(404).json({\n    status: 'error',\n    message: err.message,\n    stack: // print a nicer stack trace by splitting line breaks and making them array items\n     true && (err.stack || '').split('\\n').map(function (line) {\n      return line.trim();\n    }).map(function (line) {\n      return line.split(path__WEBPACK_IMPORTED_MODULE_2___default.a.sep).join('/');\n    }).map(function (line) {\n      return line.replace(process.cwd().split(path__WEBPACK_IMPORTED_MODULE_2___default.a.sep).join('/'), '.');\n    })\n  });\n});\napp.listen(process.env.PORT || 8500, function () {\n  console.log(\"[\".concat(new Date().toISOString(), \"]\"), chalk__WEBPACK_IMPORTED_MODULE_3___default.a.blue(\"App is running: \\uD83C\\uDF0E \".concat(process.env.HOST || 'http://localhost', \":\").concat(process.env.PORT || 8500)));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/middleware/manifest-helpers.js":
/*!***************************************************!*\
  !*** ./src/server/middleware/manifest-helpers.js ***!
  \***************************************************/
/*! exports provided: lookup, trimTag, getManifest, getSources, getStylesheetSources, getStylesheets, getJavascriptSources, getJavascripts, getImageSources, getImages, assetPath, imageTag, javascriptTag, stylesheetTag, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lookup\", function() { return lookup; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"trimTag\", function() { return trimTag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getManifest\", function() { return getManifest; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSources\", function() { return getSources; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStylesheetSources\", function() { return getStylesheetSources; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStylesheets\", function() { return getStylesheets; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getJavascriptSources\", function() { return getJavascriptSources; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getJavascripts\", function() { return getJavascripts; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getImageSources\", function() { return getImageSources; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getImages\", function() { return getImages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"assetPath\", function() { return assetPath; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"imageTag\", function() { return imageTag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"javascriptTag\", function() { return javascriptTag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stylesheetTag\", function() { return stylesheetTag; });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/*\nThis file is based heavily on https://github.com/danethurber/express-manifest-helpers\nCopied into the project folder because my security fix has been ignored for over 5 months now\nhttps://github.com/danethurber/express-manifest-helpers/pull/4\n\n© Dane Thurber, Licensed under MIT\n*/\n\n/* eslint-disable security/detect-non-literal-fs-filename, security/detect-object-injection, security/detect-unsafe-regex */\n\nvar manifest;\nvar options = {};\n\nvar loadManifest = function loadManifest() {\n  if (manifest && options.cache) return manifest;\n\n  try {\n    return JSON.parse(fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(options.manifestPath, 'utf8'));\n  } catch (err) {\n    throw new Error('Asset Manifest could not be loaded.');\n  }\n};\n\nvar mapAttrs = function mapAttrs(attrs) {\n  return Object.keys(attrs).map(function (key) {\n    return \"\".concat(key, \"=\\\"\").concat(attrs[key], \"\\\"\");\n  }).join(' ');\n};\n\nvar lookup = function lookup(source) {\n  manifest = loadManifest();\n  if (manifest[source]) return options.prependPath + manifest[source];\n  return '';\n};\nvar trimTag = function trimTag(str) {\n  return str // replace double spaces not inside quotes\n  .replace(/ {2,}(?=([^\"\\\\]*(\\\\.|\"([^\"\\\\]*\\\\.)*[^\"\\\\]*\"))*[^\"]*$)/, ' ') // replace extra space in opening tags\n  .replace(/ >/, '>') // replace extra space in self closing tags\n  .replace(/ {2}\\/>/, ' />');\n};\nvar getManifest = function getManifest() {\n  return manifest || loadManifest();\n};\nvar getSources = function getSources() {\n  manifest = manifest || loadManifest();\n  return Object.keys(manifest);\n};\nvar getStylesheetSources = function getStylesheetSources() {\n  return getSources().filter(function (file) {\n    return file.match(/\\.css$/);\n  });\n};\nvar getStylesheets = function getStylesheets() {\n  return getStylesheetSources().map(function (source) {\n    return lookup(source);\n  });\n};\nvar getJavascriptSources = function getJavascriptSources() {\n  return getSources().filter(function (file) {\n    return file.match(/\\.js$/);\n  });\n};\nvar getJavascripts = function getJavascripts() {\n  return getJavascriptSources().map(function (source) {\n    return lookup(source);\n  });\n};\nvar getImageSources = function getImageSources() {\n  return getSources().filter(function (file) {\n    return file.match(/\\.(png|jpe?g|gif|webp|bmp)$/);\n  });\n};\nvar getImages = function getImages() {\n  return getImageSources().map(function (source) {\n    return lookup(source);\n  });\n};\nvar assetPath = function assetPath(source) {\n  return lookup(source);\n};\nvar imageTag = function imageTag(source) {\n  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return trimTag(\"<img src=\\\"\".concat(lookup(source), \"\\\" \").concat(mapAttrs(attrs), \" />\"));\n};\nvar javascriptTag = function javascriptTag(source) {\n  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return trimTag(\"<script src=\\\"\".concat(lookup(source), \"\\\" \").concat(mapAttrs(attrs), \"></script>\"));\n};\nvar stylesheetTag = function stylesheetTag(source) {\n  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return trimTag(\"<link rel=\\\"stylesheet\\\" href=\\\"\".concat(lookup(source), \"\\\" \").concat(mapAttrs(attrs), \" />\"));\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (opts) {\n  var defaults = {\n    cache: true,\n    prependPath: ''\n  };\n  manifest = null;\n  Object.assign(options, defaults, opts);\n  return function (req, res, next) {\n    res.locals.getSources = getSources;\n    res.locals.getStylesheetSources = getStylesheetSources;\n    res.locals.getStylesheets = getStylesheets;\n    res.locals.getJavascriptSources = getJavascriptSources;\n    res.locals.getJavascripts = getJavascripts;\n    res.locals.getImageSources = getImageSources;\n    res.locals.getImages = getImages;\n    res.locals.getManifest = getManifest;\n    res.locals.assetPath = assetPath;\n    res.locals.imageTag = imageTag;\n    res.locals.javascriptTag = javascriptTag;\n    res.locals.stylesheetTag = stylesheetTag;\n    next();\n  };\n});\n\n//# sourceURL=webpack:///./src/server/middleware/manifest-helpers.js?");

/***/ }),

/***/ "./src/server/render.js":
/*!******************************!*\
  !*** ./src/server/render.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _shared_i18n_IntlProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/i18n/IntlProvider */ \"./src/shared/i18n/IntlProvider.js\");\n/* harmony import */ var _components_HTML__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/HTML */ \"./src/server/components/HTML.js\");\n/* harmony import */ var _shared_App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/App */ \"./src/shared/App.js\");\n\n\n\n\n\n\n\n\nvar serverRenderer = function serverRenderer() {\n  return function (req, res) {\n    var content = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_1__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"Provider\"], {\n      store: req.store\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"StaticRouter\"], {\n      location: req.url,\n      context: {}\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_i18n_IntlProvider__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_App__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null)))));\n    var state = JSON.stringify(req.store.getState());\n    return res.send('<!doctype html>' + Object(react_dom_server__WEBPACK_IMPORTED_MODULE_1__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_HTML__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      css: [res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')],\n      scripts: [res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')],\n      state: state\n    }, content)));\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (serverRenderer);\n\n//# sourceURL=webpack:///./src/server/render.js?");

/***/ }),

/***/ "./src/shared/App.js":
/*!***************************!*\
  !*** ./src/shared/App.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ \"react-helmet\");\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ \"react-i18next\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _store_app_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store/app/actions */ \"./src/shared/store/app/actions.js\");\n/* harmony import */ var _svgr_webpack_prettier_svgo_assets_react_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @svgr/webpack?-prettier,-svgo!./assets/react.svg */ \"./node_modules/@svgr/webpack/lib/index.js?-prettier,-svgo!./src/shared/assets/react.svg\");\n/* harmony import */ var _components_Features__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Features */ \"./src/shared/components/Features/index.js\");\n/* harmony import */ var _App_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./App.module.css */ \"./src/shared/App.module.css\");\n/* harmony import */ var _App_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_App_module_css__WEBPACK_IMPORTED_MODULE_7__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\nvar App =\n/*#__PURE__*/\nfunction (_React$PureComponent) {\n  _inherits(App, _React$PureComponent);\n\n  function App() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, App);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(App)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"setLanguage\", function (e) {\n      _this.props.setLocale(e.target.value);\n    });\n\n    return _this;\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      var t = this.props.t;\n      return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", {\n        className: _App_module_css__WEBPACK_IMPORTED_MODULE_7___default.a.wrapper\n      }, react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](react_helmet__WEBPACK_IMPORTED_MODULE_1___default.a, {\n        defaultTitle: \"React SSR Starter\",\n        titleTemplate: \"%s \\u2013 React SSR Starter\"\n      }), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"h1\", null, react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_svgr_webpack_prettier_svgo_assets_react_svg__WEBPACK_IMPORTED_MODULE_5__[\"ReactComponent\"], {\n        className: _App_module_css__WEBPACK_IMPORTED_MODULE_7___default.a.reactLogo\n      }), \" React + Express \\u2013 SSR Starter\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_components_Features__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"h2\", null, t('i18n-example')), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"p\", null, react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"button\", {\n        value: \"de_DE\",\n        onClick: this.setLanguage\n      }, \"Deutsch\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"button\", {\n        value: \"en_US\",\n        onClick: this.setLanguage\n      }, \"English\")));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"PureComponent\"]);\n\nvar mapDispatchToProps = {\n  setLocale: _store_app_actions__WEBPACK_IMPORTED_MODULE_4__[\"setLocale\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(null, mapDispatchToProps)(Object(react_i18next__WEBPACK_IMPORTED_MODULE_3__[\"withNamespaces\"])()(App)));\n\n//# sourceURL=webpack:///./src/shared/App.js?");

/***/ }),

/***/ "./src/shared/App.module.css":
/*!***********************************!*\
  !*** ./src/shared/App.module.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n\t\"wrapper\": \"App_wrapper__1ZWwB\",\n\t\"reactLogo\": \"App_reactLogo__276fk\"\n};\n\n//# sourceURL=webpack:///./src/shared/App.module.css?");

/***/ }),

/***/ "./src/shared/components/Features/Features.module.css":
/*!************************************************************!*\
  !*** ./src/shared/components/Features/Features.module.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n\t\"wrapper\": \"Features_wrapper__2IihV\",\n\t\"hot\": \"Features_hot__2eBHy\",\n\t\"react\": \"Features_react__2if4o\"\n};\n\n//# sourceURL=webpack:///./src/shared/components/Features/Features.module.css?");

/***/ }),

/***/ "./src/shared/components/Features/index.js":
/*!*************************************************!*\
  !*** ./src/shared/components/Features/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ \"react-i18next\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Features_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Features.module.css */ \"./src/shared/components/Features/Features.module.css\");\n/* harmony import */ var _Features_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Features_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nvar Features = function Features(_ref) {\n  var t = _ref.t;\n  return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"h2\", null, t(\"features\")), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"ul\", {\n    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.wrapper\n  }, react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", {\n    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.hot\n  }, \"Webpack 4\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", {\n    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.hot\n  }, \"Babel 7\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", {\n    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.hot\n  }, \"ESLint 5\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", {\n    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.hot\n  }, \"Flow Type\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", {\n    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.hot\n  }, \"Jest 24\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", {\n    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.react\n  }, \"React 16.x (latest), with Hooks!\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, \"React Router 4\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, \"Redux (+ Thunk)\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, \"Immer\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, \"Reselect\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, \"React Helmet\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, \"Express Webserver + Server Side Prerendering\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, t(\"i18n-support\")), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, \"CSS Modules\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, \"PostCSS\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, \"Prettier (incl. precommit-hook via lint-staged + husky)\"), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"li\", null, \"HMR (buggy, see Readme)\")));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_1__[\"withNamespaces\"])()(Features));\n\n//# sourceURL=webpack:///./src/shared/components/Features/index.js?");

/***/ }),

/***/ "./src/shared/i18n/IntlProvider.js":
/*!*****************************************!*\
  !*** ./src/shared/i18n/IntlProvider.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! i18next */ \"i18next\");\n/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ \"react-i18next\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _store_app_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/app/selectors */ \"./src/shared/store/app/selectors.js\");\n/* harmony import */ var _locales_de_DE_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./locales/de_DE.json */ \"./src/shared/i18n/locales/de_DE.json\");\nvar _locales_de_DE_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./locales/de_DE.json */ \"./src/shared/i18n/locales/de_DE.json\", 1);\n/* harmony import */ var _locales_en_US_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./locales/en_US.json */ \"./src/shared/i18n/locales/en_US.json\");\nvar _locales_en_US_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./locales/en_US.json */ \"./src/shared/i18n/locales/en_US.json\", 1);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\n\n\ni18next__WEBPACK_IMPORTED_MODULE_1___default.a.init({\n  fallbackLng: 'en_US',\n  fallbackNS: ['translation'],\n  resources: {\n    de_DE: _locales_de_DE_json__WEBPACK_IMPORTED_MODULE_6__,\n    en_US: _locales_en_US_json__WEBPACK_IMPORTED_MODULE_7__\n  },\n  parseMissingKeyHandler: function parseMissingKeyHandler(missing) {\n    if (true) {\n      console.warn('MISSING TRANSLATION:', missing);\n    }\n\n    return missing;\n  }\n});\n\nvar I18N =\n/*#__PURE__*/\nfunction (_React$PureComponent) {\n  _inherits(I18N, _React$PureComponent);\n\n  function I18N() {\n    _classCallCheck(this, I18N);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(I18N).apply(this, arguments));\n  }\n\n  _createClass(I18N, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      i18next__WEBPACK_IMPORTED_MODULE_1___default.a.changeLanguage(this.props.locale);\n    }\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      var newLocale = this.props.locale;\n      var oldLocale = prevProps.locale;\n\n      if (oldLocale !== newLocale) {\n        i18next__WEBPACK_IMPORTED_MODULE_1___default.a.changeLanguage(newLocale);\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_3__[\"I18nextProvider\"], {\n        i18n: i18next__WEBPACK_IMPORTED_MODULE_1___default.a\n      }, this.props.children);\n    }\n  }]);\n\n  return I18N;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    locale: Object(_store_app_selectors__WEBPACK_IMPORTED_MODULE_5__[\"getLocale\"])(state)\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"withRouter\"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"connect\"])(mapStateToProps, null, null, {\n  pure: false\n})(I18N)));\n\n//# sourceURL=webpack:///./src/shared/i18n/IntlProvider.js?");

/***/ }),

/***/ "./src/shared/i18n/locales/de_DE.json":
/*!********************************************!*\
  !*** ./src/shared/i18n/locales/de_DE.json ***!
  \********************************************/
/*! exports provided: translation, default */
/***/ (function(module) {

eval("module.exports = {\"translation\":{\"features\":\"Funktionen\",\"i18n-example\":\"i18n Beispiel\",\"i18n-support\":\"i18n Unterstützung (durch React i18Next)\"}};\n\n//# sourceURL=webpack:///./src/shared/i18n/locales/de_DE.json?");

/***/ }),

/***/ "./src/shared/i18n/locales/en_US.json":
/*!********************************************!*\
  !*** ./src/shared/i18n/locales/en_US.json ***!
  \********************************************/
/*! exports provided: translation, default */
/***/ (function(module) {

eval("module.exports = {\"translation\":{\"features\":\"Features\",\"i18n-example\":\"i18n Example\",\"i18n-support\":\"i18n support (via React i18Next)\"}};\n\n//# sourceURL=webpack:///./src/shared/i18n/locales/en_US.json?");

/***/ }),

/***/ "./src/shared/store/app/actions.js":
/*!*****************************************!*\
  !*** ./src/shared/store/app/actions.js ***!
  \*****************************************/
/*! exports provided: ActionTypes, setLocale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ActionTypes\", function() { return ActionTypes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setLocale\", function() { return setLocale; });\nvar ActionTypes = {\n  SETLOCALE: 'app/set-locale'\n};\nvar setLocale = function setLocale(locale) {\n  return {\n    type: ActionTypes.SETLOCALE,\n    payload: locale\n  };\n};\n\n//# sourceURL=webpack:///./src/shared/store/app/actions.js?");

/***/ }),

/***/ "./src/shared/store/app/reducer.js":
/*!*****************************************!*\
  !*** ./src/shared/store/app/reducer.js ***!
  \*****************************************/
/*! exports provided: initialState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initialState\", function() { return initialState; });\n/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immer */ \"immer\");\n/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immer__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ \"./src/shared/store/app/actions.js\");\n\n\nvar initialState = Object.freeze({\n  locale: 'en_US'\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n  return Object(immer__WEBPACK_IMPORTED_MODULE_0__[\"produce\"])(state, function (draft) {\n    var type = action.type,\n        payload = action.payload;\n\n    switch (type) {\n      case _actions__WEBPACK_IMPORTED_MODULE_1__[\"ActionTypes\"].SETLOCALE:\n        {\n          draft.locale = payload;\n          return;\n        }\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/shared/store/app/reducer.js?");

/***/ }),

/***/ "./src/shared/store/app/selectors.js":
/*!*******************************************!*\
  !*** ./src/shared/store/app/selectors.js ***!
  \*******************************************/
/*! exports provided: app, getLocale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"app\", function() { return app; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLocale\", function() { return getLocale; });\n/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reselect */ \"reselect\");\n/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reselect__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-disable import/prefer-default-export */\n\nvar app = function app(state) {\n  return state.app;\n};\nvar getLocale = Object(reselect__WEBPACK_IMPORTED_MODULE_0__[\"createSelector\"])([app], function (app) {\n  return app.locale;\n});\n\n//# sourceURL=webpack:///./src/shared/store/app/selectors.js?");

/***/ }),

/***/ "./src/shared/store/history.js":
/*!*************************************!*\
  !*** ./src/shared/store/history.js ***!
  \*************************************/
/*! exports provided: createUniversalHistory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createUniversalHistory\", function() { return createUniversalHistory; });\n/* harmony import */ var history_createMemoryHistory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! history/createMemoryHistory */ \"history/createMemoryHistory\");\n/* harmony import */ var history_createMemoryHistory__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(history_createMemoryHistory__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! history/createBrowserHistory */ \"history/createBrowserHistory\");\n/* harmony import */ var history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(history_createBrowserHistory__WEBPACK_IMPORTED_MODULE_1__);\n\n // import { createBrowserHistory, createMemoryHistory } from 'history';\n\nvar createUniversalHistory = function createUniversalHistory() {\n  if (false) { var history; }\n\n  return history_createMemoryHistory__WEBPACK_IMPORTED_MODULE_0___default()();\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (createUniversalHistory);\n\n//# sourceURL=webpack:///./src/shared/store/history.js?");

/***/ }),

/***/ "./src/shared/store/index.js":
/*!***********************************!*\
  !*** ./src/shared/store/index.js ***!
  \***********************************/
/*! exports provided: configureStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"configureStore\", function() { return configureStore; });\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _rootReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rootReducer */ \"./src/shared/store/rootReducer.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n\n\n\nvar configureStore = function configureStore() {\n  var _ref2;\n\n  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n      initialState = _ref.initialState,\n      _ref$middleware = _ref.middleware,\n      middleware = _ref$middleware === void 0 ? [] : _ref$middleware;\n\n  var devtools = typeof window !== 'undefined' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({\n    actionsBlacklist: []\n  });\n\n  var composeEnhancers = devtools || redux__WEBPACK_IMPORTED_MODULE_1__[\"compose\"];\n  var store = Object(redux__WEBPACK_IMPORTED_MODULE_1__[\"createStore\"])(_rootReducer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], initialState, composeEnhancers(redux__WEBPACK_IMPORTED_MODULE_1__[\"applyMiddleware\"].apply(void 0, _toConsumableArray((_ref2 = [redux_thunk__WEBPACK_IMPORTED_MODULE_0___default.a]).concat.apply(_ref2, _toConsumableArray(middleware))))));\n\n  if (true) {\n    if (true) {\n      module.hot.accept(/*! ./rootReducer */ \"./src/shared/store/rootReducer.js\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _rootReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rootReducer */ \"./src/shared/store/rootReducer.js\");\n(function () {\n        return store.replaceReducer(__webpack_require__(/*! ./rootReducer */ \"./src/shared/store/rootReducer.js\").default);\n      })(__WEBPACK_OUTDATED_DEPENDENCIES__); });\n    }\n  }\n\n  return store;\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (configureStore);\n\n//# sourceURL=webpack:///./src/shared/store/index.js?");

/***/ }),

/***/ "./src/shared/store/rootReducer.js":
/*!*****************************************!*\
  !*** ./src/shared/store/rootReducer.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! connected-react-router */ \"connected-react-router\");\n/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(connected_react_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./history */ \"./src/shared/store/history.js\");\n/* harmony import */ var _app_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/reducer */ \"./src/shared/store/app/reducer.js\");\n\n\n\n\nvar history = Object(_history__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\nvar rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  app: _app_reducer__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  router: Object(connected_react_router__WEBPACK_IMPORTED_MODULE_1__[\"connectRouter\"])(history)\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (rootReducer);\n\n//# sourceURL=webpack:///./src/shared/store/rootReducer.js?");

/***/ }),

/***/ 0:
/*!*******************************************************************************!*\
  !*** multi ./node_modules/@babel/polyfill/lib/index.js ./src/server/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /Volumes/Storage/Coding/JavaScript/React/ReactionUI/node_modules/@babel/polyfill/lib/index.js */\"./node_modules/@babel/polyfill/lib/index.js\");\nmodule.exports = __webpack_require__(/*! /Volumes/Storage/Coding/JavaScript/React/ReactionUI/src/server/index.js */\"./src/server/index.js\");\n\n\n//# sourceURL=webpack:///multi_./node_modules/@babel/polyfill/lib/index.js_./src/server/index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chalk\");\n\n//# sourceURL=webpack:///external_%22chalk%22?");

/***/ }),

/***/ "connected-react-router":
/*!*****************************************!*\
  !*** external "connected-react-router" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connected-react-router\");\n\n//# sourceURL=webpack:///external_%22connected-react-router%22?");

/***/ }),

/***/ "core-js/es6":
/*!******************************!*\
  !*** external "core-js/es6" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/es6\");\n\n//# sourceURL=webpack:///external_%22core-js/es6%22?");

/***/ }),

/***/ "core-js/fn/array/includes":
/*!********************************************!*\
  !*** external "core-js/fn/array/includes" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/array/includes\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/array/includes%22?");

/***/ }),

/***/ "core-js/fn/object/entries":
/*!********************************************!*\
  !*** external "core-js/fn/object/entries" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/object/entries\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/object/entries%22?");

/***/ }),

/***/ "core-js/fn/object/get-own-property-descriptors":
/*!*****************************************************************!*\
  !*** external "core-js/fn/object/get-own-property-descriptors" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/object/get-own-property-descriptors\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/object/get-own-property-descriptors%22?");

/***/ }),

/***/ "core-js/fn/object/values":
/*!*******************************************!*\
  !*** external "core-js/fn/object/values" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/object/values\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/object/values%22?");

/***/ }),

/***/ "core-js/fn/promise/finally":
/*!*********************************************!*\
  !*** external "core-js/fn/promise/finally" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/promise/finally\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/promise/finally%22?");

/***/ }),

/***/ "core-js/fn/string/pad-end":
/*!********************************************!*\
  !*** external "core-js/fn/string/pad-end" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/string/pad-end\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/string/pad-end%22?");

/***/ }),

/***/ "core-js/fn/string/pad-start":
/*!**********************************************!*\
  !*** external "core-js/fn/string/pad-start" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/string/pad-start\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/string/pad-start%22?");

/***/ }),

/***/ "core-js/fn/symbol/async-iterator":
/*!***************************************************!*\
  !*** external "core-js/fn/symbol/async-iterator" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/fn/symbol/async-iterator\");\n\n//# sourceURL=webpack:///external_%22core-js/fn/symbol/async-iterator%22?");

/***/ }),

/***/ "core-js/web":
/*!******************************!*\
  !*** external "core-js/web" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/web\");\n\n//# sourceURL=webpack:///external_%22core-js/web%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "history/createBrowserHistory":
/*!***********************************************!*\
  !*** external "history/createBrowserHistory" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"history/createBrowserHistory\");\n\n//# sourceURL=webpack:///external_%22history/createBrowserHistory%22?");

/***/ }),

/***/ "history/createMemoryHistory":
/*!**********************************************!*\
  !*** external "history/createMemoryHistory" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"history/createMemoryHistory\");\n\n//# sourceURL=webpack:///external_%22history/createMemoryHistory%22?");

/***/ }),

/***/ "i18next":
/*!**************************!*\
  !*** external "i18next" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"i18next\");\n\n//# sourceURL=webpack:///external_%22i18next%22?");

/***/ }),

/***/ "immer":
/*!************************!*\
  !*** external "immer" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"immer\");\n\n//# sourceURL=webpack:///external_%22immer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-helmet\");\n\n//# sourceURL=webpack:///external_%22react-helmet%22?");

/***/ }),

/***/ "react-i18next":
/*!********************************!*\
  !*** external "react-i18next" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-i18next\");\n\n//# sourceURL=webpack:///external_%22react-i18next%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ }),

/***/ "regenerator-runtime/runtime":
/*!**********************************************!*\
  !*** external "regenerator-runtime/runtime" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"regenerator-runtime/runtime\");\n\n//# sourceURL=webpack:///external_%22regenerator-runtime/runtime%22?");

/***/ }),

/***/ "reselect":
/*!***************************!*\
  !*** external "reselect" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"reselect\");\n\n//# sourceURL=webpack:///external_%22reselect%22?");

/***/ })

/******/ });