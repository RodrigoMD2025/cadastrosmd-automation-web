const ma=()=>{};var js={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=function(i){const e=[];let t=0;for(let s=0;s<i.length;s++){let o=i.charCodeAt(s);o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):(o&64512)===55296&&s+1<i.length&&(i.charCodeAt(s+1)&64512)===56320?(o=65536+((o&1023)<<10)+(i.charCodeAt(++s)&1023),e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},_a=function(i){const e=[];let t=0,s=0;for(;t<i.length;){const o=i[t++];if(o<128)e[s++]=String.fromCharCode(o);else if(o>191&&o<224){const c=i[t++];e[s++]=String.fromCharCode((o&31)<<6|c&63)}else if(o>239&&o<365){const c=i[t++],h=i[t++],_=i[t++],w=((o&7)<<18|(c&63)<<12|(h&63)<<6|_&63)-65536;e[s++]=String.fromCharCode(55296+(w>>10)),e[s++]=String.fromCharCode(56320+(w&1023))}else{const c=i[t++],h=i[t++];e[s++]=String.fromCharCode((o&15)<<12|(c&63)<<6|h&63)}}return e.join("")},Ur={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let o=0;o<i.length;o+=3){const c=i[o],h=o+1<i.length,_=h?i[o+1]:0,w=o+2<i.length,v=w?i[o+2]:0,b=c>>2,S=(c&3)<<4|_>>4;let A=(_&15)<<2|v>>6,x=v&63;w||(x=64,h||(A=64)),s.push(t[b],t[S],t[A],t[x])}return s.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(Mr(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):_a(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let o=0;o<i.length;){const c=t[i.charAt(o++)],_=o<i.length?t[i.charAt(o)]:0;++o;const v=o<i.length?t[i.charAt(o)]:64;++o;const S=o<i.length?t[i.charAt(o)]:64;if(++o,c==null||_==null||v==null||S==null)throw new ya;const A=c<<2|_>>4;if(s.push(A),v!==64){const x=_<<4&240|v>>2;if(s.push(x),S!==64){const L=v<<6&192|S;s.push(L)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class ya extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ia=function(i){const e=Mr(i);return Ur.encodeByteArray(e,!0)},_n=function(i){return Ia(i).replace(/\./g,"")},xr=function(i){try{return Ur.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wa(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea=()=>wa().__FIREBASE_DEFAULTS__,va=()=>{if(typeof process>"u"||typeof js>"u")return;const i=js.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},Ta=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&xr(i[1]);return e&&JSON.parse(e)},vi=()=>{try{return ma()||Ea()||va()||Ta()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},Fr=i=>{var e,t;return(t=(e=vi())==null?void 0:e.emulatorHosts)==null?void 0:t[i]},Vr=i=>{const e=Fr(i);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},jr=()=>{var i;return(i=vi())==null?void 0:i.config},Br=i=>{var e;return(e=vi())==null?void 0:e[`_${i}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(i){try{return(i.startsWith("http://")||i.startsWith("https://")?new URL(i).hostname:i).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ti(i){return(await fetch(i,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(i,e){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",o=i.iat||0,c=i.sub||i.user_id;if(!c)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h={iss:`https://securetoken.google.com/${s}`,aud:s,iat:o,exp:o+3600,auth_time:o,sub:c,user_id:c,firebase:{sign_in_provider:"custom",identities:{}},...i};return[_n(JSON.stringify(t)),_n(JSON.stringify(h)),""].join(".")}const Dt={};function ba(){const i={prod:[],emulator:[]};for(const e of Object.keys(Dt))Dt[e]?i.emulator.push(e):i.prod.push(e);return i}function Ca(i){let e=document.getElementById(i),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",i),t=!0),{created:t,element:e}}let Bs=!1;function Ai(i,e){if(typeof window>"u"||typeof document>"u"||!dt(window.location.host)||Dt[i]===e||Dt[i]||Bs)return;Dt[i]=e;function t(A){return`__firebase__banner__${A}`}const s="__firebase__banner",c=ba().prod.length>0;function h(){const A=document.getElementById(s);A&&A.remove()}function _(A){A.style.display="flex",A.style.background="#7faaf0",A.style.position="fixed",A.style.bottom="5px",A.style.left="5px",A.style.padding=".5em",A.style.borderRadius="5px",A.style.alignItems="center"}function w(A,x){A.setAttribute("width","24"),A.setAttribute("id",x),A.setAttribute("height","24"),A.setAttribute("viewBox","0 0 24 24"),A.setAttribute("fill","none"),A.style.marginLeft="-6px"}function v(){const A=document.createElement("span");return A.style.cursor="pointer",A.style.marginLeft="16px",A.style.fontSize="24px",A.innerHTML=" &times;",A.onclick=()=>{Bs=!0,h()},A}function b(A,x){A.setAttribute("id",x),A.innerText="Learn more",A.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",A.setAttribute("target","__blank"),A.style.paddingLeft="5px",A.style.textDecoration="underline"}function S(){const A=Ca(s),x=t("text"),L=document.getElementById(x)||document.createElement("span"),V=t("learnmore"),U=document.getElementById(V)||document.createElement("a"),J=t("preprendIcon"),X=document.getElementById(J)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(A.created){const Q=A.element;_(Q),b(U,V);const Ee=v();w(X,J),Q.append(X,L,U,Ee),document.body.appendChild(Q)}c?(L.innerText="Preview backend disconnected.",X.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(X.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,L.innerText="Preview backend running in this workspace."),L.setAttribute("id",x)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",S):S()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Pa(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(q())}function Ra(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ka(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function Na(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Oa(){const i=q();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function Da(){try{return typeof indexedDB=="object"}catch{return!1}}function La(){return new Promise((i,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(s);o.onsuccess=()=>{o.result.close(),t||self.indexedDB.deleteDatabase(s),i(!0)},o.onupgradeneeded=()=>{t=!1},o.onerror=()=>{var c;e(((c=o.error)==null?void 0:c.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma="FirebaseError";class we extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Ma,Object.setPrototypeOf(this,we.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ht.prototype.create)}}class Ht{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},o=`${this.service}/${e}`,c=this.errors[e],h=c?Ua(c,s):"Error",_=`${this.serviceName}: ${h} (${o}).`;return new we(o,_,s)}}function Ua(i,e){return i.replace(xa,(t,s)=>{const o=e[s];return o!=null?String(o):`<${s}?>`})}const xa=/\{\$([^}]+)}/g;function Fa(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function Xe(i,e){if(i===e)return!0;const t=Object.keys(i),s=Object.keys(e);for(const o of t){if(!s.includes(o))return!1;const c=i[o],h=e[o];if(Hs(c)&&Hs(h)){if(!Xe(c,h))return!1}else if(c!==h)return!1}for(const o of s)if(!t.includes(o))return!1;return!0}function Hs(i){return i!==null&&typeof i=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(i){const e=[];for(const[t,s]of Object.entries(i))Array.isArray(s)?s.forEach(o=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Nt(i){const e={};return i.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[o,c]=s.split("=");e[decodeURIComponent(o)]=decodeURIComponent(c)}}),e}function Ot(i){const e=i.indexOf("?");if(!e)return"";const t=i.indexOf("#",e);return i.substring(e,t>0?t:void 0)}function Va(i,e){const t=new ja(i,e);return t.subscribe.bind(t)}class ja{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let o;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");Ba(e,["next","error","complete"])?o=e:o={next:e,error:t,complete:s},o.next===void 0&&(o.next=ni),o.error===void 0&&(o.error=ni),o.complete===void 0&&(o.complete=ni);const c=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),c}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ba(i,e){if(typeof i!="object"||i===null)return!1;for(const t of e)if(t in i&&typeof i[t]=="function")return!0;return!1}function ni(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function re(i){return i&&i._delegate?i._delegate:i}class Ue{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ge="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Aa;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:t});o&&s.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Wa(e))try{this.getOrInitializeService({instanceIdentifier:Ge})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(t);try{const c=this.getOrInitializeService({instanceIdentifier:o});s.resolve(c)}catch{}}}}clearInstance(e=Ge){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ge){return this.instances.has(e)}getOptions(e=Ge){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[c,h]of this.instancesDeferred.entries()){const _=this.normalizeInstanceIdentifier(c);s===_&&h.resolve(o)}return o}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),o=this.onInitCallbacks.get(s)??new Set;o.add(e),this.onInitCallbacks.set(s,o);const c=this.instances.get(s);return c&&e(c,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const o of s)try{o(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:$a(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Ge){return this.component?this.component.multipleInstances?e:Ge:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function $a(i){return i===Ge?void 0:i}function Wa(i){return i.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ha(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(O||(O={}));const za={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},qa=O.INFO,Ka={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},Ja=(i,e,...t)=>{if(e<i.logLevel)return;const s=new Date().toISOString(),o=Ka[e];if(o)console[o](`[${s}]  ${i.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Si{constructor(e){this.name=e,this._logLevel=qa,this._logHandler=Ja,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?za[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}}const Xa=(i,e)=>e.some(t=>i instanceof t);let $s,Ws;function Ya(){return $s||($s=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Qa(){return Ws||(Ws=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Hr=new WeakMap,ui=new WeakMap,$r=new WeakMap,ii=new WeakMap,bi=new WeakMap;function Za(i){const e=new Promise((t,s)=>{const o=()=>{i.removeEventListener("success",c),i.removeEventListener("error",h)},c=()=>{t(Le(i.result)),o()},h=()=>{s(i.error),o()};i.addEventListener("success",c),i.addEventListener("error",h)});return e.then(t=>{t instanceof IDBCursor&&Hr.set(t,i)}).catch(()=>{}),bi.set(e,i),e}function ec(i){if(ui.has(i))return;const e=new Promise((t,s)=>{const o=()=>{i.removeEventListener("complete",c),i.removeEventListener("error",h),i.removeEventListener("abort",h)},c=()=>{t(),o()},h=()=>{s(i.error||new DOMException("AbortError","AbortError")),o()};i.addEventListener("complete",c),i.addEventListener("error",h),i.addEventListener("abort",h)});ui.set(i,e)}let di={get(i,e,t){if(i instanceof IDBTransaction){if(e==="done")return ui.get(i);if(e==="objectStoreNames")return i.objectStoreNames||$r.get(i);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Le(i[e])},set(i,e,t){return i[e]=t,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function tc(i){di=i(di)}function nc(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=i.call(si(this),e,...t);return $r.set(s,e.sort?e.sort():[e]),Le(s)}:Qa().includes(i)?function(...e){return i.apply(si(this),e),Le(Hr.get(this))}:function(...e){return Le(i.apply(si(this),e))}}function ic(i){return typeof i=="function"?nc(i):(i instanceof IDBTransaction&&ec(i),Xa(i,Ya())?new Proxy(i,di):i)}function Le(i){if(i instanceof IDBRequest)return Za(i);if(ii.has(i))return ii.get(i);const e=ic(i);return e!==i&&(ii.set(i,e),bi.set(e,i)),e}const si=i=>bi.get(i);function sc(i,e,{blocked:t,upgrade:s,blocking:o,terminated:c}={}){const h=indexedDB.open(i,e),_=Le(h);return s&&h.addEventListener("upgradeneeded",w=>{s(Le(h.result),w.oldVersion,w.newVersion,Le(h.transaction),w)}),t&&h.addEventListener("blocked",w=>t(w.oldVersion,w.newVersion,w)),_.then(w=>{c&&w.addEventListener("close",()=>c()),o&&w.addEventListener("versionchange",v=>o(v.oldVersion,v.newVersion,v))}).catch(()=>{}),_}const rc=["get","getKey","getAll","getAllKeys","count"],oc=["put","add","delete","clear"],ri=new Map;function Gs(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(ri.get(e))return ri.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,o=oc.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(o||rc.includes(t)))return;const c=async function(h,..._){const w=this.transaction(h,o?"readwrite":"readonly");let v=w.store;return s&&(v=v.index(_.shift())),(await Promise.all([v[t](..._),o&&w.done]))[0]};return ri.set(e,c),c}tc(i=>({...i,get:(e,t,s)=>Gs(e,t)||i.get(e,t,s),has:(e,t)=>!!Gs(e,t)||i.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(cc(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function cc(i){const e=i.getComponent();return(e==null?void 0:e.type)==="VERSION"}const fi="@firebase/app",zs="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye=new Si("@firebase/app"),hc="@firebase/app-compat",lc="@firebase/analytics-compat",uc="@firebase/analytics",dc="@firebase/app-check-compat",fc="@firebase/app-check",pc="@firebase/auth",gc="@firebase/auth-compat",mc="@firebase/database",_c="@firebase/data-connect",yc="@firebase/database-compat",Ic="@firebase/functions",wc="@firebase/functions-compat",Ec="@firebase/installations",vc="@firebase/installations-compat",Tc="@firebase/messaging",Ac="@firebase/messaging-compat",Sc="@firebase/performance",bc="@firebase/performance-compat",Cc="@firebase/remote-config",Pc="@firebase/remote-config-compat",Rc="@firebase/storage",kc="@firebase/storage-compat",Nc="@firebase/firestore",Oc="@firebase/ai",Dc="@firebase/firestore-compat",Lc="firebase",Mc="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi="[DEFAULT]",Uc={[fi]:"fire-core",[hc]:"fire-core-compat",[uc]:"fire-analytics",[lc]:"fire-analytics-compat",[fc]:"fire-app-check",[dc]:"fire-app-check-compat",[pc]:"fire-auth",[gc]:"fire-auth-compat",[mc]:"fire-rtdb",[_c]:"fire-data-connect",[yc]:"fire-rtdb-compat",[Ic]:"fire-fn",[wc]:"fire-fn-compat",[Ec]:"fire-iid",[vc]:"fire-iid-compat",[Tc]:"fire-fcm",[Ac]:"fire-fcm-compat",[Sc]:"fire-perf",[bc]:"fire-perf-compat",[Cc]:"fire-rc",[Pc]:"fire-rc-compat",[Rc]:"fire-gcs",[kc]:"fire-gcs-compat",[Nc]:"fire-fst",[Dc]:"fire-fst-compat",[Oc]:"fire-vertex","fire-js":"fire-js",[Lc]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=new Map,xc=new Map,gi=new Map;function qs(i,e){try{i.container.addComponent(e)}catch(t){ye.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,t)}}function Ye(i){const e=i.name;if(gi.has(e))return ye.debug(`There were multiple attempts to register component ${e}.`),!1;gi.set(e,i);for(const t of yn.values())qs(t,i);for(const t of xc.values())qs(t,i);return!0}function bn(i,e){const t=i.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),i.container.getProvider(e)}function Y(i){return i==null?!1:i.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Me=new Ht("app","Firebase",Fc);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ue("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Me.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft=Mc;function jc(i,e={}){let t=i;typeof e!="object"&&(e={name:e});const s={name:pi,automaticDataCollectionEnabled:!0,...e},o=s.name;if(typeof o!="string"||!o)throw Me.create("bad-app-name",{appName:String(o)});if(t||(t=jr()),!t)throw Me.create("no-options");const c=yn.get(o);if(c){if(Xe(t,c.options)&&Xe(s,c.config))return c;throw Me.create("duplicate-app",{appName:o})}const h=new Ga(o);for(const w of gi.values())h.addComponent(w);const _=new Vc(t,s,h);return yn.set(o,_),_}function Ci(i=pi){const e=yn.get(i);if(!e&&i===pi&&jr())return jc();if(!e)throw Me.create("no-app",{appName:i});return e}function ue(i,e,t){let s=Uc[i]??i;t&&(s+=`-${t}`);const o=s.match(/\s|\//),c=e.match(/\s|\//);if(o||c){const h=[`Unable to register library "${s}" with version "${e}":`];o&&h.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&c&&h.push("and"),c&&h.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ye.warn(h.join(" "));return}Ye(new Ue(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc="firebase-heartbeat-database",Hc=1,Ft="firebase-heartbeat-store";let oi=null;function Wr(){return oi||(oi=sc(Bc,Hc,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(Ft)}catch(t){console.warn(t)}}}}).catch(i=>{throw Me.create("idb-open",{originalErrorMessage:i.message})})),oi}async function $c(i){try{const t=(await Wr()).transaction(Ft),s=await t.objectStore(Ft).get(Gr(i));return await t.done,s}catch(e){if(e instanceof we)ye.warn(e.message);else{const t=Me.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ye.warn(t.message)}}}async function Ks(i,e){try{const s=(await Wr()).transaction(Ft,"readwrite");await s.objectStore(Ft).put(e,Gr(i)),await s.done}catch(t){if(t instanceof we)ye.warn(t.message);else{const s=Me.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ye.warn(s.message)}}}function Gr(i){return`${i.name}!${i.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc=1024,Gc=30;class zc{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Kc(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),c=Js();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===c||this._heartbeatsCache.heartbeats.some(h=>h.date===c))return;if(this._heartbeatsCache.heartbeats.push({date:c,agent:o}),this._heartbeatsCache.heartbeats.length>Gc){const h=Jc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(h,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){ye.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Js(),{heartbeatsToSend:s,unsentEntries:o}=qc(this._heartbeatsCache.heartbeats),c=_n(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),c}catch(t){return ye.warn(t),""}}}function Js(){return new Date().toISOString().substring(0,10)}function qc(i,e=Wc){const t=[];let s=i.slice();for(const o of i){const c=t.find(h=>h.agent===o.agent);if(c){if(c.dates.push(o.date),Xs(t)>e){c.dates.pop();break}}else if(t.push({agent:o.agent,dates:[o.date]}),Xs(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Kc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Da()?La().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await $c(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ks(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ks(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Xs(i){return _n(JSON.stringify({version:2,heartbeats:i})).length}function Jc(i){if(i.length===0)return-1;let e=0,t=i[0].date;for(let s=1;s<i.length;s++)i[s].date<t&&(t=i[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xc(i){Ye(new Ue("platform-logger",e=>new ac(e),"PRIVATE")),Ye(new Ue("heartbeat",e=>new zc(e),"PRIVATE")),ue(fi,zs,i),ue(fi,zs,"esm2020"),ue("fire-js","")}Xc("");var Yc="firebase",Qc="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ue(Yc,Qc,"app");function zr(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Zc=zr,qr=new Ht("auth","Firebase",zr());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In=new Si("@firebase/auth");function eh(i,...e){In.logLevel<=O.WARN&&In.warn(`Auth (${ft}): ${i}`,...e)}function dn(i,...e){In.logLevel<=O.ERROR&&In.error(`Auth (${ft}): ${i}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(i,...e){throw Pi(i,...e)}function de(i,...e){return Pi(i,...e)}function Kr(i,e,t){const s={...Zc(),[e]:t};return new Ht("auth","Firebase",s).create(e,{appName:i.name})}function _e(i){return Kr(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Pi(i,...e){if(typeof i!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=i.name),i._errorFactory.create(t,...s)}return qr.create(i,...e)}function C(i,e,...t){if(!i)throw Pi(e,...t)}function ge(i){const e="INTERNAL ASSERTION FAILED: "+i;throw dn(e),new Error(e)}function Ie(i,e){i||ge(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(){var i;return typeof self<"u"&&((i=self.location)==null?void 0:i.href)||""}function th(){return Ys()==="http:"||Ys()==="https:"}function Ys(){var i;return typeof self<"u"&&((i=self.location)==null?void 0:i.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nh(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(th()||ka()||"connection"in navigator)?navigator.onLine:!0}function ih(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ie(t>e,"Short delay should be less than long delay!"),this.isMobile=Pa()||Na()}get(){return nh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ri(i,e){Ie(i.emulator,"Emulator should always be set here");const{url:t}=i.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ge("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ge("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ge("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sh={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],oh=new Wt(3e4,6e4);function Fe(i,e){return i.tenantId&&!e.tenantId?{...e,tenantId:i.tenantId}:e}async function Ve(i,e,t,s,o={}){return Xr(i,o,async()=>{let c={},h={};s&&(e==="GET"?h=s:c={body:JSON.stringify(s)});const _=$t({key:i.config.apiKey,...h}).slice(1),w=await i._getAdditionalHeaders();w["Content-Type"]="application/json",i.languageCode&&(w["X-Firebase-Locale"]=i.languageCode);const v={method:e,headers:w,...c};return Ra()||(v.referrerPolicy="no-referrer"),i.emulatorConfig&&dt(i.emulatorConfig.host)&&(v.credentials="include"),Jr.fetch()(await Yr(i,i.config.apiHost,t,_),v)})}async function Xr(i,e,t){i._canInitEmulator=!1;const s={...sh,...e};try{const o=new ch(i),c=await Promise.race([t(),o.promise]);o.clearNetworkTimeout();const h=await c.json();if("needConfirmation"in h)throw hn(i,"account-exists-with-different-credential",h);if(c.ok&&!("errorMessage"in h))return h;{const _=c.ok?h.errorMessage:h.error.message,[w,v]=_.split(" : ");if(w==="FEDERATED_USER_ID_ALREADY_LINKED")throw hn(i,"credential-already-in-use",h);if(w==="EMAIL_EXISTS")throw hn(i,"email-already-in-use",h);if(w==="USER_DISABLED")throw hn(i,"user-disabled",h);const b=s[w]||w.toLowerCase().replace(/[_\s]+/g,"-");if(v)throw Kr(i,b,v);se(i,b)}}catch(o){if(o instanceof we)throw o;se(i,"network-request-failed",{message:String(o)})}}async function Gt(i,e,t,s,o={}){const c=await Ve(i,e,t,s,o);return"mfaPendingCredential"in c&&se(i,"multi-factor-auth-required",{_serverResponse:c}),c}async function Yr(i,e,t,s){const o=`${e}${t}?${s}`,c=i,h=c.config.emulator?Ri(i.config,o):`${i.config.apiScheme}://${o}`;return rh.includes(t)&&(await c._persistenceManagerAvailable,c._getPersistenceType()==="COOKIE")?c._getPersistence()._getFinalTarget(h).toString():h}function ah(i){switch(i){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ch{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(de(this.auth,"network-request-failed")),oh.get())})}}function hn(i,e,t){const s={appName:i.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const o=de(i,e,s);return o.customData._tokenResponse=t,o}function Qs(i){return i!==void 0&&i.enterprise!==void 0}class hh{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return ah(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function lh(i,e){return Ve(i,"GET","/v2/recaptchaConfig",Fe(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uh(i,e){return Ve(i,"POST","/v1/accounts:delete",e)}async function wn(i,e){return Ve(i,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function dh(i,e=!1){const t=re(i),s=await t.getIdToken(e),o=ki(s);C(o&&o.exp&&o.auth_time&&o.iat,t.auth,"internal-error");const c=typeof o.firebase=="object"?o.firebase:void 0,h=c==null?void 0:c.sign_in_provider;return{claims:o,token:s,authTime:Lt(ai(o.auth_time)),issuedAtTime:Lt(ai(o.iat)),expirationTime:Lt(ai(o.exp)),signInProvider:h||null,signInSecondFactor:(c==null?void 0:c.sign_in_second_factor)||null}}function ai(i){return Number(i)*1e3}function ki(i){const[e,t,s]=i.split(".");if(e===void 0||t===void 0||s===void 0)return dn("JWT malformed, contained fewer than 3 sections"),null;try{const o=xr(t);return o?JSON.parse(o):(dn("Failed to decode base64 JWT payload"),null)}catch(o){return dn("Caught error parsing JWT payload as JSON",o==null?void 0:o.toString()),null}}function Zs(i){const e=ki(i);return C(e,"internal-error"),C(typeof e.exp<"u","internal-error"),C(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vt(i,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof we&&fh(s)&&i.auth.currentUser===i&&await i.auth.signOut(),s}}function fh({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Lt(this.lastLoginAt),this.creationTime=Lt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function En(i){var S;const e=i.auth,t=await i.getIdToken(),s=await Vt(i,wn(e,{idToken:t}));C(s==null?void 0:s.users.length,e,"internal-error");const o=s.users[0];i._notifyReloadListener(o);const c=(S=o.providerUserInfo)!=null&&S.length?Qr(o.providerUserInfo):[],h=mh(i.providerData,c),_=i.isAnonymous,w=!(i.email&&o.passwordHash)&&!(h!=null&&h.length),v=_?w:!1,b={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:h,metadata:new _i(o.createdAt,o.lastLoginAt),isAnonymous:v};Object.assign(i,b)}async function gh(i){const e=re(i);await En(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function mh(i,e){return[...i.filter(s=>!e.some(o=>o.providerId===s.providerId)),...e]}function Qr(i){return i.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _h(i,e){const t=await Xr(i,{},async()=>{const s=$t({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:c}=i.config,h=await Yr(i,o,"/v1/token",`key=${c}`),_=await i._getAdditionalHeaders();_["Content-Type"]="application/x-www-form-urlencoded";const w={method:"POST",headers:_,body:s};return i.emulatorConfig&&dt(i.emulatorConfig.host)&&(w.credentials="include"),Jr.fetch()(h,w)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function yh(i,e){return Ve(i,"POST","/v2/accounts:revokeToken",Fe(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){C(e.idToken,"internal-error"),C(typeof e.idToken<"u","internal-error"),C(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Zs(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){C(e.length!==0,"internal-error");const t=Zs(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(C(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:o,expiresIn:c}=await _h(e,t);this.updateTokensAndExpiration(s,o,Number(c))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:o,expirationTime:c}=t,h=new at;return s&&(C(typeof s=="string","internal-error",{appName:e}),h.refreshToken=s),o&&(C(typeof o=="string","internal-error",{appName:e}),h.accessToken=o),c&&(C(typeof c=="number","internal-error",{appName:e}),h.expirationTime=c),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new at,this.toJSON())}_performRefresh(){return ge("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(i,e){C(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class ne{constructor({uid:e,auth:t,stsTokenManager:s,...o}){this.providerId="firebase",this.proactiveRefresh=new ph(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new _i(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Vt(this,this.stsTokenManager.getToken(this.auth,e));return C(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return dh(this,e)}reload(){return gh(this)}_assign(e){this!==e&&(C(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ne({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){C(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await En(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Y(this.auth.app))return Promise.reject(_e(this.auth));const e=await this.getIdToken();return await Vt(this,uh(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,o=t.email??void 0,c=t.phoneNumber??void 0,h=t.photoURL??void 0,_=t.tenantId??void 0,w=t._redirectEventId??void 0,v=t.createdAt??void 0,b=t.lastLoginAt??void 0,{uid:S,emailVerified:A,isAnonymous:x,providerData:L,stsTokenManager:V}=t;C(S&&V,e,"internal-error");const U=at.fromJSON(this.name,V);C(typeof S=="string",e,"internal-error"),Re(s,e.name),Re(o,e.name),C(typeof A=="boolean",e,"internal-error"),C(typeof x=="boolean",e,"internal-error"),Re(c,e.name),Re(h,e.name),Re(_,e.name),Re(w,e.name),Re(v,e.name),Re(b,e.name);const J=new ne({uid:S,auth:e,email:o,emailVerified:A,displayName:s,isAnonymous:x,photoURL:h,phoneNumber:c,tenantId:_,stsTokenManager:U,createdAt:v,lastLoginAt:b});return L&&Array.isArray(L)&&(J.providerData=L.map(X=>({...X}))),w&&(J._redirectEventId=w),J}static async _fromIdTokenResponse(e,t,s=!1){const o=new at;o.updateFromServerResponse(t);const c=new ne({uid:t.localId,auth:e,stsTokenManager:o,isAnonymous:s});return await En(c),c}static async _fromGetAccountInfoResponse(e,t,s){const o=t.users[0];C(o.localId!==void 0,"internal-error");const c=o.providerUserInfo!==void 0?Qr(o.providerUserInfo):[],h=!(o.email&&o.passwordHash)&&!(c!=null&&c.length),_=new at;_.updateFromIdToken(s);const w=new ne({uid:o.localId,auth:e,stsTokenManager:_,isAnonymous:h}),v={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new _i(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!(c!=null&&c.length)};return Object.assign(w,v),w}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er=new Map;function me(i){Ie(i instanceof Function,"Expected a class definition");let e=er.get(i);return e?(Ie(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,er.set(i,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Zr.type="NONE";const tr=Zr;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(i,e,t){return`firebase:${i}:${e}:${t}`}class ct{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:o,name:c}=this.auth;this.fullUserKey=fn(this.userKey,o.apiKey,c),this.fullPersistenceKey=fn("persistence",o.apiKey,c),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await wn(this.auth,{idToken:e}).catch(()=>{});return t?ne._fromGetAccountInfoResponse(this.auth,t,e):null}return ne._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new ct(me(tr),e,s);const o=(await Promise.all(t.map(async v=>{if(await v._isAvailable())return v}))).filter(v=>v);let c=o[0]||me(tr);const h=fn(s,e.config.apiKey,e.name);let _=null;for(const v of t)try{const b=await v._get(h);if(b){let S;if(typeof b=="string"){const A=await wn(e,{idToken:b}).catch(()=>{});if(!A)break;S=await ne._fromGetAccountInfoResponse(e,A,b)}else S=ne._fromJSON(e,b);v!==c&&(_=S),c=v;break}}catch{}const w=o.filter(v=>v._shouldAllowMigration);return!c._shouldAllowMigration||!w.length?new ct(c,e,s):(c=w[0],_&&await c._set(h,_.toJSON()),await Promise.all(t.map(async v=>{if(v!==c)try{await v._remove(h)}catch{}})),new ct(c,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nr(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(io(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(eo(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ro(e))return"Blackberry";if(oo(e))return"Webos";if(to(e))return"Safari";if((e.includes("chrome/")||no(e))&&!e.includes("edge/"))return"Chrome";if(so(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=i.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function eo(i=q()){return/firefox\//i.test(i)}function to(i=q()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function no(i=q()){return/crios\//i.test(i)}function io(i=q()){return/iemobile/i.test(i)}function so(i=q()){return/android/i.test(i)}function ro(i=q()){return/blackberry/i.test(i)}function oo(i=q()){return/webos/i.test(i)}function Ni(i=q()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function Ih(i=q()){var e;return Ni(i)&&!!((e=window.navigator)!=null&&e.standalone)}function wh(){return Oa()&&document.documentMode===10}function ao(i=q()){return Ni(i)||so(i)||oo(i)||ro(i)||/windows phone/i.test(i)||io(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function co(i,e=[]){let t;switch(i){case"Browser":t=nr(q());break;case"Worker":t=`${nr(q())}-${i}`;break;default:t=i}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ft}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eh{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=c=>new Promise((h,_)=>{try{const w=e(c);h(w)}catch(w){_(w)}});s.onAbort=t,this.queue.push(s);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const o of t)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vh(i,e={}){return Ve(i,"GET","/v2/passwordPolicy",Fe(i,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th=6;class Ah{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Th,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),o&&(t.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let o=0;o<e.length;o++)s=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,o,c){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{constructor(e,t,s,o){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ir(this),this.idTokenSubscription=new ir(this),this.beforeStateQueue=new Eh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=qr,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(c=>this._resolvePersistenceManagerAvailable=c)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=me(t)),this._initializationPromise=this.queue(async()=>{var s,o,c;if(!this._deleted&&(this.persistenceManager=await ct.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((o=this._popupRedirectResolver)!=null&&o._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((c=this.currentUser)==null?void 0:c.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await wn(this,{idToken:e}),s=await ne._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var c;if(Y(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(_=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(_,_))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(c=this.redirectUser)==null?void 0:c._redirectEventId,_=s==null?void 0:s._redirectEventId,w=await this.tryRedirectSignIn(e);(!h||h===_)&&(w!=null&&w.user)&&(s=w.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(h){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return C(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await En(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ih()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Y(this.app))return Promise.reject(_e(this));const t=e?re(e):null;return t&&C(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&C(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Y(this.app)?Promise.reject(_e(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Y(this.app)?Promise.reject(_e(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(me(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await vh(this),t=new Ah(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ht("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await yh(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&me(e)||this._popupRedirectResolver;C(t,this,"argument-error"),this.redirectPersistenceManager=await ct.create(this,[me(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,o){if(this._deleted)return()=>{};const c=typeof t=="function"?t:t.next.bind(t);let h=!1;const _=this._isInitialized?Promise.resolve():this._initializationPromise;if(C(_,this,"internal-error"),_.then(()=>{h||c(this.currentUser)}),typeof t=="function"){const w=e.addObserver(t,s,o);return()=>{h=!0,w()}}else{const w=e.addObserver(t);return()=>{h=!0,w()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return C(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=co(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var o;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((o=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:o.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(Y(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&eh(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function tt(i){return re(i)}class ir{constructor(e){this.auth=e,this.observer=null,this.addObserver=Va(t=>this.observer=t)}get next(){return C(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function bh(i){Cn=i}function ho(i){return Cn.loadJS(i)}function Ch(){return Cn.recaptchaEnterpriseScript}function Ph(){return Cn.gapiScript}function Rh(i){return`__${i}${Math.floor(Math.random()*1e6)}`}class kh{constructor(){this.enterprise=new Nh}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Nh{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Oh="recaptcha-enterprise",lo="NO_RECAPTCHA";class Dh{constructor(e){this.type=Oh,this.auth=tt(e)}async verify(e="verify",t=!1){async function s(c){if(!t){if(c.tenantId==null&&c._agentRecaptchaConfig!=null)return c._agentRecaptchaConfig.siteKey;if(c.tenantId!=null&&c._tenantRecaptchaConfigs[c.tenantId]!==void 0)return c._tenantRecaptchaConfigs[c.tenantId].siteKey}return new Promise(async(h,_)=>{lh(c,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(w=>{if(w.recaptchaKey===void 0)_(new Error("recaptcha Enterprise site key undefined"));else{const v=new hh(w);return c.tenantId==null?c._agentRecaptchaConfig=v:c._tenantRecaptchaConfigs[c.tenantId]=v,h(v.siteKey)}}).catch(w=>{_(w)})})}function o(c,h,_){const w=window.grecaptcha;Qs(w)?w.enterprise.ready(()=>{w.enterprise.execute(c,{action:e}).then(v=>{h(v)}).catch(()=>{h(lo)})}):_(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new kh().execute("siteKey",{action:"verify"}):new Promise((c,h)=>{s(this.auth).then(_=>{if(!t&&Qs(window.grecaptcha))o(_,c,h);else{if(typeof window>"u"){h(new Error("RecaptchaVerifier is only supported in browser"));return}let w=Ch();w.length!==0&&(w+=_),ho(w).then(()=>{o(_,c,h)}).catch(v=>{h(v)})}}).catch(_=>{h(_)})})}}async function sr(i,e,t,s=!1,o=!1){const c=new Dh(i);let h;if(o)h=lo;else try{h=await c.verify(t)}catch{h=await c.verify(t,!0)}const _={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in _){const w=_.phoneEnrollmentInfo.phoneNumber,v=_.phoneEnrollmentInfo.recaptchaToken;Object.assign(_,{phoneEnrollmentInfo:{phoneNumber:w,recaptchaToken:v,captchaResponse:h,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in _){const w=_.phoneSignInInfo.recaptchaToken;Object.assign(_,{phoneSignInInfo:{recaptchaToken:w,captchaResponse:h,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return _}return s?Object.assign(_,{captchaResp:h}):Object.assign(_,{captchaResponse:h}),Object.assign(_,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(_,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),_}async function yi(i,e,t,s,o){var c;if((c=i._getRecaptchaConfig())!=null&&c.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const h=await sr(i,e,t,t==="getOobCode");return s(i,h)}else return s(i,e).catch(async h=>{if(h.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const _=await sr(i,e,t,t==="getOobCode");return s(i,_)}else return Promise.reject(h)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(i,e){const t=bn(i,"auth");if(t.isInitialized()){const o=t.getImmediate(),c=t.getOptions();if(Xe(c,e??{}))return o;se(o,"already-initialized")}return t.initialize({options:e})}function Mh(i,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(me);e!=null&&e.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function Uh(i,e,t){const s=tt(i);C(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const o=!1,c=uo(e),{host:h,port:_}=xh(e),w=_===null?"":`:${_}`,v={url:`${c}//${h}${w}/`},b=Object.freeze({host:h,port:_,protocol:c.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!s._canInitEmulator){C(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),C(Xe(v,s.config.emulator)&&Xe(b,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=v,s.emulatorConfig=b,s.settings.appVerificationDisabledForTesting=!0,dt(h)?(Ti(`${c}//${h}${w}`),Ai("Auth",!0)):Fh()}function uo(i){const e=i.indexOf(":");return e<0?"":i.substr(0,e+1)}function xh(i){const e=uo(i),t=/(\/\/)?([^?#/]+)/.exec(i.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(s);if(o){const c=o[1];return{host:c,port:rr(s.substr(c.length+1))}}else{const[c,h]=s.split(":");return{host:c,port:rr(h)}}}function rr(i){if(!i)return null;const e=Number(i);return isNaN(e)?null:e}function Fh(){function i(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ge("not implemented")}_getIdTokenResponse(e){return ge("not implemented")}_linkToIdToken(e,t){return ge("not implemented")}_getReauthenticationResolver(e){return ge("not implemented")}}async function Vh(i,e){return Ve(i,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jh(i,e){return Gt(i,"POST","/v1/accounts:signInWithPassword",Fe(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bh(i,e){return Gt(i,"POST","/v1/accounts:signInWithEmailLink",Fe(i,e))}async function Hh(i,e){return Gt(i,"POST","/v1/accounts:signInWithEmailLink",Fe(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt extends Oi{constructor(e,t,s,o=null){super("password",s),this._email=e,this._password=t,this._tenantId=o}static _fromEmailAndPassword(e,t){return new jt(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new jt(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return yi(e,t,"signInWithPassword",jh);case"emailLink":return Bh(e,{email:this._email,oobCode:this._password});default:se(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return yi(e,s,"signUpPassword",Vh);case"emailLink":return Hh(e,{idToken:t,email:this._email,oobCode:this._password});default:se(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ht(i,e){return Gt(i,"POST","/v1/accounts:signInWithIdp",Fe(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h="http://localhost";class Qe extends Oi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Qe(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):se("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:o,...c}=t;if(!s||!o)return null;const h=new Qe(s,o);return h.idToken=c.idToken||void 0,h.accessToken=c.accessToken||void 0,h.secret=c.secret,h.nonce=c.nonce,h.pendingToken=c.pendingToken||null,h}_getIdTokenResponse(e){const t=this.buildRequest();return ht(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,ht(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ht(e,t)}buildRequest(){const e={requestUri:$h,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=$t(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wh(i){switch(i){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Gh(i){const e=Nt(Ot(i)).link,t=e?Nt(Ot(e)).deep_link_id:null,s=Nt(Ot(i)).deep_link_id;return(s?Nt(Ot(s)).link:null)||s||t||e||i}class Di{constructor(e){const t=Nt(Ot(e)),s=t.apiKey??null,o=t.oobCode??null,c=Wh(t.mode??null);C(s&&o&&c,"argument-error"),this.apiKey=s,this.operation=c,this.code=o,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Gh(e);try{return new Di(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(){this.providerId=pt.PROVIDER_ID}static credential(e,t){return jt._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=Di.parseLink(t);return C(s,"argument-error"),jt._fromEmailAndCode(e,s.code,s.tenantId)}}pt.PROVIDER_ID="password";pt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";pt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt extends fo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke extends zt{constructor(){super("facebook.com")}static credential(e){return Qe._fromParams({providerId:ke.PROVIDER_ID,signInMethod:ke.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ke.credentialFromTaggedObject(e)}static credentialFromError(e){return ke.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ke.credential(e.oauthAccessToken)}catch{return null}}}ke.FACEBOOK_SIGN_IN_METHOD="facebook.com";ke.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne extends zt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Qe._fromParams({providerId:Ne.PROVIDER_ID,signInMethod:Ne.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ne.credentialFromTaggedObject(e)}static credentialFromError(e){return Ne.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return Ne.credential(t,s)}catch{return null}}}Ne.GOOGLE_SIGN_IN_METHOD="google.com";Ne.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe extends zt{constructor(){super("github.com")}static credential(e){return Qe._fromParams({providerId:Oe.PROVIDER_ID,signInMethod:Oe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Oe.credentialFromTaggedObject(e)}static credentialFromError(e){return Oe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Oe.credential(e.oauthAccessToken)}catch{return null}}}Oe.GITHUB_SIGN_IN_METHOD="github.com";Oe.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De extends zt{constructor(){super("twitter.com")}static credential(e,t){return Qe._fromParams({providerId:De.PROVIDER_ID,signInMethod:De.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return De.credentialFromTaggedObject(e)}static credentialFromError(e){return De.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return De.credential(t,s)}catch{return null}}}De.TWITTER_SIGN_IN_METHOD="twitter.com";De.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zh(i,e){return Gt(i,"POST","/v1/accounts:signUp",Fe(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,o=!1){const c=await ne._fromIdTokenResponse(e,s,o),h=or(s);return new Ze({user:c,providerId:h,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const o=or(s);return new Ze({user:e,providerId:o,_tokenResponse:s,operationType:t})}}function or(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn extends we{constructor(e,t,s,o){super(t.code,t.message),this.operationType=s,this.user=o,Object.setPrototypeOf(this,vn.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,o){return new vn(e,t,s,o)}}function po(i,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(i):t._getIdTokenResponse(i)).catch(c=>{throw c.code==="auth/multi-factor-auth-required"?vn._fromErrorAndOperation(i,c,e,s):c})}async function qh(i,e,t=!1){const s=await Vt(i,e._linkToIdToken(i.auth,await i.getIdToken()),t);return Ze._forOperation(i,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kh(i,e,t=!1){const{auth:s}=i;if(Y(s.app))return Promise.reject(_e(s));const o="reauthenticate";try{const c=await Vt(i,po(s,o,e,i),t);C(c.idToken,s,"internal-error");const h=ki(c.idToken);C(h,s,"internal-error");const{sub:_}=h;return C(i.uid===_,s,"user-mismatch"),Ze._forOperation(i,o,c)}catch(c){throw(c==null?void 0:c.code)==="auth/user-not-found"&&se(s,"user-mismatch"),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function go(i,e,t=!1){if(Y(i.app))return Promise.reject(_e(i));const s="signIn",o=await po(i,s,e),c=await Ze._fromIdTokenResponse(i,s,o);return t||await i._updateCurrentUser(c.user),c}async function Jh(i,e){return go(tt(i),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mo(i){const e=tt(i);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Ku(i,e,t){if(Y(i.app))return Promise.reject(_e(i));const s=tt(i),h=await yi(s,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",zh).catch(w=>{throw w.code==="auth/password-does-not-meet-requirements"&&mo(i),w}),_=await Ze._fromIdTokenResponse(s,"signIn",h);return await s._updateCurrentUser(_.user),_}function Ju(i,e,t){return Y(i.app)?Promise.reject(_e(i)):Jh(re(i),pt.credential(e,t)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&mo(i),s})}function Xh(i,e,t,s){return re(i).onIdTokenChanged(e,t,s)}function Yh(i,e,t){return re(i).beforeAuthStateChanged(e,t)}function Xu(i,e,t,s){return re(i).onAuthStateChanged(e,t,s)}function Yu(i){return re(i).signOut()}const Tn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Tn,"1"),this.storage.removeItem(Tn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh=1e3,Zh=10;class yo extends _o{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ao(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),o=this.localCache[t];s!==o&&e(t,o,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((h,_,w)=>{this.notifyListeners(h,w)});return}const s=e.key;t?this.detachListener():this.stopPolling();const o=()=>{const h=this.storage.getItem(s);!t&&this.localCache[s]===h||this.notifyListeners(s,h)},c=this.storage.getItem(s);wh()&&c!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,Zh):o()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},Qh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}yo.type="LOCAL";const el=yo;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io extends _o{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Io.type="SESSION";const wo=Io;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(i){return Promise.all(i.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(o=>o.isListeningto(e));if(t)return t;const s=new Pn(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:o,data:c}=t.data,h=this.handlersMap[o];if(!(h!=null&&h.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:o});const _=Array.from(h).map(async v=>v(t.origin,c)),w=await tl(_);t.ports[0].postMessage({status:"done",eventId:s,eventType:o,response:w})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Pn.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Li(i="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return i+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let c,h;return new Promise((_,w)=>{const v=Li("",20);o.port1.start();const b=setTimeout(()=>{w(new Error("unsupported_event"))},s);h={messageChannel:o,onMessage(S){const A=S;if(A.data.eventId===v)switch(A.data.status){case"ack":clearTimeout(b),c=setTimeout(()=>{w(new Error("timeout"))},3e3);break;case"done":clearTimeout(c),_(A.data.response);break;default:clearTimeout(b),clearTimeout(c),w(new Error("invalid_response"));break}}},this.handlers.add(h),o.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:v,data:t},[o.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(){return window}function il(i){fe().location.href=i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo(){return typeof fe().WorkerGlobalScope<"u"&&typeof fe().importScripts=="function"}async function sl(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function rl(){var i;return((i=navigator==null?void 0:navigator.serviceWorker)==null?void 0:i.controller)||null}function ol(){return Eo()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo="firebaseLocalStorageDb",al=1,An="firebaseLocalStorage",To="fbase_key";class qt{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Rn(i,e){return i.transaction([An],e?"readwrite":"readonly").objectStore(An)}function cl(){const i=indexedDB.deleteDatabase(vo);return new qt(i).toPromise()}function Ii(){const i=indexedDB.open(vo,al);return new Promise((e,t)=>{i.addEventListener("error",()=>{t(i.error)}),i.addEventListener("upgradeneeded",()=>{const s=i.result;try{s.createObjectStore(An,{keyPath:To})}catch(o){t(o)}}),i.addEventListener("success",async()=>{const s=i.result;s.objectStoreNames.contains(An)?e(s):(s.close(),await cl(),e(await Ii()))})})}async function ar(i,e,t){const s=Rn(i,!0).put({[To]:e,value:t});return new qt(s).toPromise()}async function hl(i,e){const t=Rn(i,!1).get(e),s=await new qt(t).toPromise();return s===void 0?null:s.value}function cr(i,e){const t=Rn(i,!0).delete(e);return new qt(t).toPromise()}const ll=800,ul=3;class Ao{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ii(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>ul)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Eo()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Pn._getInstance(ol()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,s;if(this.activeServiceWorker=await sl(),!this.activeServiceWorker)return;this.sender=new nl(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||rl()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ii();return await ar(e,Tn,"1"),await cr(e,Tn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>ar(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>hl(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>cr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const c=Rn(o,!1).getAll();return new qt(c).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:o,value:c}of e)s.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(c)&&(this.notifyListeners(o,c),t.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!s.has(o)&&(this.notifyListeners(o,null),t.push(o));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ll)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ao.type="LOCAL";const dl=Ao;new Wt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fl(i,e){return e?me(e):(C(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi extends Oi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ht(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ht(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ht(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function pl(i){return go(i.auth,new Mi(i),i.bypassAuthState)}function gl(i){const{auth:e,user:t}=i;return C(t,e,"internal-error"),Kh(t,new Mi(i),i.bypassAuthState)}async function ml(i){const{auth:e,user:t}=i;return C(t,e,"internal-error"),qh(t,new Mi(i),i.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,t,s,o,c=!1){this.auth=e,this.resolver=s,this.user=o,this.bypassAuthState=c,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:o,tenantId:c,error:h,type:_}=e;if(h){this.reject(h);return}const w={auth:this.auth,requestUri:t,sessionId:s,tenantId:c||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(_)(w))}catch(v){this.reject(v)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return pl;case"linkViaPopup":case"linkViaRedirect":return ml;case"reauthViaPopup":case"reauthViaRedirect":return gl;default:se(this.auth,"internal-error")}}resolve(e){Ie(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ie(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _l=new Wt(2e3,1e4);class ot extends So{constructor(e,t,s,o,c){super(e,t,o,c),this.provider=s,this.authWindow=null,this.pollId=null,ot.currentPopupAction&&ot.currentPopupAction.cancel(),ot.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return C(e,this.auth,"internal-error"),e}async onExecution(){Ie(this.filter.length===1,"Popup operations only handle one event");const e=Li();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(de(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(de(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ot.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(de(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,_l.get())};e()}}ot.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl="pendingRedirect",pn=new Map;class Il extends So{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=pn.get(this.auth._key());if(!e){try{const s=await wl(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}pn.set(this.auth._key(),e)}return this.bypassAuthState||pn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function wl(i,e){const t=Tl(e),s=vl(i);if(!await s._isAvailable())return!1;const o=await s._get(t)==="true";return await s._remove(t),o}function El(i,e){pn.set(i._key(),e)}function vl(i){return me(i._redirectPersistence)}function Tl(i){return fn(yl,i.config.apiKey,i.name)}async function Al(i,e,t=!1){if(Y(i.app))return Promise.reject(_e(i));const s=tt(i),o=fl(s,e),h=await new Il(s,o,t).execute();return h&&!t&&(delete h.user._redirectEventId,await s._persistUserIfCurrent(h.user),await s._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl=10*60*1e3;class bl{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Cl(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!bo(e)){const o=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(de(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Sl&&this.cachedEventUids.clear(),this.cachedEventUids.has(hr(e))}saveEventToCache(e){this.cachedEventUids.add(hr(e)),this.lastProcessedEventTime=Date.now()}}function hr(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function bo({type:i,error:e}){return i==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Cl(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return bo(i);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pl(i,e={}){return Ve(i,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kl=/^https?/;async function Nl(i){if(i.config.emulator)return;const{authorizedDomains:e}=await Pl(i);for(const t of e)try{if(Ol(t))return}catch{}se(i,"unauthorized-domain")}function Ol(i){const e=mi(),{protocol:t,hostname:s}=new URL(e);if(i.startsWith("chrome-extension://")){const h=new URL(i);return h.hostname===""&&s===""?t==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&h.hostname===s}if(!kl.test(t))return!1;if(Rl.test(i))return s===i;const o=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl=new Wt(3e4,6e4);function lr(){const i=fe().___jsl;if(i!=null&&i.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let t=0;t<i.CP.length;t++)i.CP[t]=null}}function Ll(i){return new Promise((e,t)=>{var o,c,h;function s(){lr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{lr(),t(de(i,"network-request-failed"))},timeout:Dl.get()})}if((c=(o=fe().gapi)==null?void 0:o.iframes)!=null&&c.Iframe)e(gapi.iframes.getContext());else if((h=fe().gapi)!=null&&h.load)s();else{const _=Rh("iframefcb");return fe()[_]=()=>{gapi.load?s():t(de(i,"network-request-failed"))},ho(`${Ph()}?onload=${_}`).catch(w=>t(w))}}).catch(e=>{throw gn=null,e})}let gn=null;function Ml(i){return gn=gn||Ll(i),gn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul=new Wt(5e3,15e3),xl="__/auth/iframe",Fl="emulator/auth/iframe",Vl={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},jl=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Bl(i){const e=i.config;C(e.authDomain,i,"auth-domain-config-required");const t=e.emulator?Ri(e,Fl):`https://${i.config.authDomain}/${xl}`,s={apiKey:e.apiKey,appName:i.name,v:ft},o=jl.get(i.config.apiHost);o&&(s.eid=o);const c=i._getFrameworks();return c.length&&(s.fw=c.join(",")),`${t}?${$t(s).slice(1)}`}async function Hl(i){const e=await Ml(i),t=fe().gapi;return C(t,i,"internal-error"),e.open({where:document.body,url:Bl(i),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Vl,dontclear:!0},s=>new Promise(async(o,c)=>{await s.restyle({setHideOnLeave:!1});const h=de(i,"network-request-failed"),_=fe().setTimeout(()=>{c(h)},Ul.get());function w(){fe().clearTimeout(_),o(s)}s.ping(w).then(w,()=>{c(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $l={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Wl=500,Gl=600,zl="_blank",ql="http://localhost";class ur{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Kl(i,e,t,s=Wl,o=Gl){const c=Math.max((window.screen.availHeight-o)/2,0).toString(),h=Math.max((window.screen.availWidth-s)/2,0).toString();let _="";const w={...$l,width:s.toString(),height:o.toString(),top:c,left:h},v=q().toLowerCase();t&&(_=no(v)?zl:t),eo(v)&&(e=e||ql,w.scrollbars="yes");const b=Object.entries(w).reduce((A,[x,L])=>`${A}${x}=${L},`,"");if(Ih(v)&&_!=="_self")return Jl(e||"",_),new ur(null);const S=window.open(e||"",_,b);C(S,i,"popup-blocked");try{S.focus()}catch{}return new ur(S)}function Jl(i,e){const t=document.createElement("a");t.href=i,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl="__/auth/handler",Yl="emulator/auth/handler",Ql=encodeURIComponent("fac");async function dr(i,e,t,s,o,c){C(i.config.authDomain,i,"auth-domain-config-required"),C(i.config.apiKey,i,"invalid-api-key");const h={apiKey:i.config.apiKey,appName:i.name,authType:t,redirectUrl:s,v:ft,eventId:o};if(e instanceof fo){e.setDefaultLanguage(i.languageCode),h.providerId=e.providerId||"",Fa(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[b,S]of Object.entries({}))h[b]=S}if(e instanceof zt){const b=e.getScopes().filter(S=>S!=="");b.length>0&&(h.scopes=b.join(","))}i.tenantId&&(h.tid=i.tenantId);const _=h;for(const b of Object.keys(_))_[b]===void 0&&delete _[b];const w=await i._getAppCheckToken(),v=w?`#${Ql}=${encodeURIComponent(w)}`:"";return`${Zl(i)}?${$t(_).slice(1)}${v}`}function Zl({config:i}){return i.emulator?Ri(i,Yl):`https://${i.authDomain}/${Xl}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci="webStorageSupport";class eu{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=wo,this._completeRedirectFn=Al,this._overrideRedirectResult=El}async _openPopup(e,t,s,o){var h;Ie((h=this.eventManagers[e._key()])==null?void 0:h.manager,"_initialize() not called before _openPopup()");const c=await dr(e,t,s,mi(),o);return Kl(e,c,Li())}async _openRedirect(e,t,s,o){await this._originValidation(e);const c=await dr(e,t,s,mi(),o);return il(c),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:o,promise:c}=this.eventManagers[t];return o?Promise.resolve(o):(Ie(c,"If manager is not set, promise should be"),c)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await Hl(e),s=new bl(e);return t.register("authEvent",o=>(C(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:s.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ci,{type:ci},o=>{var h;const c=(h=o==null?void 0:o[0])==null?void 0:h[ci];c!==void 0&&t(!!c),se(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Nl(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ao()||to()||Ni()}}const tu=eu;var fr="@firebase/auth",pr="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){C(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iu(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function su(i){Ye(new Ue("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),c=e.getProvider("app-check-internal"),{apiKey:h,authDomain:_}=s.options;C(h&&!h.includes(":"),"invalid-api-key",{appName:s.name});const w={apiKey:h,authDomain:_,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:co(i)},v=new Sh(s,o,c,w);return Mh(v,t),v},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),Ye(new Ue("auth-internal",e=>{const t=tt(e.getProvider("auth").getImmediate());return(s=>new nu(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ue(fr,pr,iu(i)),ue(fr,pr,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru=5*60,ou=Br("authIdTokenMaxAge")||ru;let gr=null;const au=i=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>ou)return;const o=t==null?void 0:t.token;gr!==o&&(gr=o,await fetch(i,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function Qu(i=Ci()){const e=bn(i,"auth");if(e.isInitialized())return e.getImmediate();const t=Lh(i,{popupRedirectResolver:tu,persistence:[dl,el,wo]}),s=Br("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const c=new URL(s,location.origin);if(location.origin===c.origin){const h=au(c.toString());Yh(t,h,()=>h(t.currentUser)),Xh(t,_=>h(_))}}const o=Fr("auth");return o&&Uh(t,`http://${o}`),t}function cu(){var i;return((i=document.getElementsByTagName("head"))==null?void 0:i[0])??document}bh({loadJS(i){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",i),s.onload=e,s.onerror=o=>{const c=de("internal-error");c.customData=o,t(c)},s.type="text/javascript",s.charset="UTF-8",cu().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});su("Browser");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Co="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(e,t,s,o){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,Y(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=t.getImmediate({optional:!0}),this.messaging=s.getImmediate({optional:!0}),this.auth||t.get().then(c=>this.auth=c,()=>{}),this.messaging||s.get().then(c=>this.messaging=c,()=>{}),this.appCheck||o==null||o.get().then(c=>this.appCheck=c,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),s=await this.getMessagingToken(),o=await this.getAppCheckToken(e);return{authToken:t,messagingToken:s,appCheckToken:o}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wi="us-central1";class lu{constructor(e,t,s,o,c=wi,h=(..._)=>fetch(..._)){this.app=e,this.fetchImpl=h,this.emulatorOrigin=null,this.contextProvider=new hu(e,t,s,o),this.cancelAllRequests=new Promise(_=>{this.deleteService=()=>Promise.resolve(_())});try{const _=new URL(c);this.customDomain=_.origin+(_.pathname==="/"?"":_.pathname),this.region=wi}catch{this.customDomain=null,this.region=c}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function uu(i,e,t){const s=dt(e);i.emulatorOrigin=`http${s?"s":""}://${e}:${t}`,s&&(Ti(i.emulatorOrigin+"/backends"),Ai("Functions",!0))}const mr="@firebase/functions",_r="0.13.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du="auth-internal",fu="app-check-internal",pu="messaging-internal";function gu(i){const e=(t,{instanceIdentifier:s})=>{const o=t.getProvider("app").getImmediate(),c=t.getProvider(du),h=t.getProvider(pu),_=t.getProvider(fu);return new lu(o,c,h,_,s)};Ye(new Ue(Co,e,"PUBLIC").setMultipleInstances(!0)),ue(mr,_r,i),ue(mr,_r,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zu(i=Ci(),e=wi){const s=bn(re(i),Co).getImmediate({identifier:e}),o=Vr("functions");return o&&mu(s,...o),s}function mu(i,e,t){uu(re(i),e,t)}gu();var yr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ui;(function(){var i;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(g,u){function f(){}f.prototype=u.prototype,g.F=u.prototype,g.prototype=new f,g.prototype.constructor=g,g.D=function(m,p,I){for(var d=Array(arguments.length-2),K=2;K<arguments.length;K++)d[K-2]=arguments[K];return u.prototype[p].apply(m,d)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,t),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(g,u,f){f||(f=0);const m=Array(16);if(typeof u=="string")for(var p=0;p<16;++p)m[p]=u.charCodeAt(f++)|u.charCodeAt(f++)<<8|u.charCodeAt(f++)<<16|u.charCodeAt(f++)<<24;else for(p=0;p<16;++p)m[p]=u[f++]|u[f++]<<8|u[f++]<<16|u[f++]<<24;u=g.g[0],f=g.g[1],p=g.g[2];let I=g.g[3],d;d=u+(I^f&(p^I))+m[0]+3614090360&4294967295,u=f+(d<<7&4294967295|d>>>25),d=I+(p^u&(f^p))+m[1]+3905402710&4294967295,I=u+(d<<12&4294967295|d>>>20),d=p+(f^I&(u^f))+m[2]+606105819&4294967295,p=I+(d<<17&4294967295|d>>>15),d=f+(u^p&(I^u))+m[3]+3250441966&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(I^f&(p^I))+m[4]+4118548399&4294967295,u=f+(d<<7&4294967295|d>>>25),d=I+(p^u&(f^p))+m[5]+1200080426&4294967295,I=u+(d<<12&4294967295|d>>>20),d=p+(f^I&(u^f))+m[6]+2821735955&4294967295,p=I+(d<<17&4294967295|d>>>15),d=f+(u^p&(I^u))+m[7]+4249261313&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(I^f&(p^I))+m[8]+1770035416&4294967295,u=f+(d<<7&4294967295|d>>>25),d=I+(p^u&(f^p))+m[9]+2336552879&4294967295,I=u+(d<<12&4294967295|d>>>20),d=p+(f^I&(u^f))+m[10]+4294925233&4294967295,p=I+(d<<17&4294967295|d>>>15),d=f+(u^p&(I^u))+m[11]+2304563134&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(I^f&(p^I))+m[12]+1804603682&4294967295,u=f+(d<<7&4294967295|d>>>25),d=I+(p^u&(f^p))+m[13]+4254626195&4294967295,I=u+(d<<12&4294967295|d>>>20),d=p+(f^I&(u^f))+m[14]+2792965006&4294967295,p=I+(d<<17&4294967295|d>>>15),d=f+(u^p&(I^u))+m[15]+1236535329&4294967295,f=p+(d<<22&4294967295|d>>>10),d=u+(p^I&(f^p))+m[1]+4129170786&4294967295,u=f+(d<<5&4294967295|d>>>27),d=I+(f^p&(u^f))+m[6]+3225465664&4294967295,I=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(I^u))+m[11]+643717713&4294967295,p=I+(d<<14&4294967295|d>>>18),d=f+(I^u&(p^I))+m[0]+3921069994&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(p^I&(f^p))+m[5]+3593408605&4294967295,u=f+(d<<5&4294967295|d>>>27),d=I+(f^p&(u^f))+m[10]+38016083&4294967295,I=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(I^u))+m[15]+3634488961&4294967295,p=I+(d<<14&4294967295|d>>>18),d=f+(I^u&(p^I))+m[4]+3889429448&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(p^I&(f^p))+m[9]+568446438&4294967295,u=f+(d<<5&4294967295|d>>>27),d=I+(f^p&(u^f))+m[14]+3275163606&4294967295,I=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(I^u))+m[3]+4107603335&4294967295,p=I+(d<<14&4294967295|d>>>18),d=f+(I^u&(p^I))+m[8]+1163531501&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(p^I&(f^p))+m[13]+2850285829&4294967295,u=f+(d<<5&4294967295|d>>>27),d=I+(f^p&(u^f))+m[2]+4243563512&4294967295,I=u+(d<<9&4294967295|d>>>23),d=p+(u^f&(I^u))+m[7]+1735328473&4294967295,p=I+(d<<14&4294967295|d>>>18),d=f+(I^u&(p^I))+m[12]+2368359562&4294967295,f=p+(d<<20&4294967295|d>>>12),d=u+(f^p^I)+m[5]+4294588738&4294967295,u=f+(d<<4&4294967295|d>>>28),d=I+(u^f^p)+m[8]+2272392833&4294967295,I=u+(d<<11&4294967295|d>>>21),d=p+(I^u^f)+m[11]+1839030562&4294967295,p=I+(d<<16&4294967295|d>>>16),d=f+(p^I^u)+m[14]+4259657740&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(f^p^I)+m[1]+2763975236&4294967295,u=f+(d<<4&4294967295|d>>>28),d=I+(u^f^p)+m[4]+1272893353&4294967295,I=u+(d<<11&4294967295|d>>>21),d=p+(I^u^f)+m[7]+4139469664&4294967295,p=I+(d<<16&4294967295|d>>>16),d=f+(p^I^u)+m[10]+3200236656&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(f^p^I)+m[13]+681279174&4294967295,u=f+(d<<4&4294967295|d>>>28),d=I+(u^f^p)+m[0]+3936430074&4294967295,I=u+(d<<11&4294967295|d>>>21),d=p+(I^u^f)+m[3]+3572445317&4294967295,p=I+(d<<16&4294967295|d>>>16),d=f+(p^I^u)+m[6]+76029189&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(f^p^I)+m[9]+3654602809&4294967295,u=f+(d<<4&4294967295|d>>>28),d=I+(u^f^p)+m[12]+3873151461&4294967295,I=u+(d<<11&4294967295|d>>>21),d=p+(I^u^f)+m[15]+530742520&4294967295,p=I+(d<<16&4294967295|d>>>16),d=f+(p^I^u)+m[2]+3299628645&4294967295,f=p+(d<<23&4294967295|d>>>9),d=u+(p^(f|~I))+m[0]+4096336452&4294967295,u=f+(d<<6&4294967295|d>>>26),d=I+(f^(u|~p))+m[7]+1126891415&4294967295,I=u+(d<<10&4294967295|d>>>22),d=p+(u^(I|~f))+m[14]+2878612391&4294967295,p=I+(d<<15&4294967295|d>>>17),d=f+(I^(p|~u))+m[5]+4237533241&4294967295,f=p+(d<<21&4294967295|d>>>11),d=u+(p^(f|~I))+m[12]+1700485571&4294967295,u=f+(d<<6&4294967295|d>>>26),d=I+(f^(u|~p))+m[3]+2399980690&4294967295,I=u+(d<<10&4294967295|d>>>22),d=p+(u^(I|~f))+m[10]+4293915773&4294967295,p=I+(d<<15&4294967295|d>>>17),d=f+(I^(p|~u))+m[1]+2240044497&4294967295,f=p+(d<<21&4294967295|d>>>11),d=u+(p^(f|~I))+m[8]+1873313359&4294967295,u=f+(d<<6&4294967295|d>>>26),d=I+(f^(u|~p))+m[15]+4264355552&4294967295,I=u+(d<<10&4294967295|d>>>22),d=p+(u^(I|~f))+m[6]+2734768916&4294967295,p=I+(d<<15&4294967295|d>>>17),d=f+(I^(p|~u))+m[13]+1309151649&4294967295,f=p+(d<<21&4294967295|d>>>11),d=u+(p^(f|~I))+m[4]+4149444226&4294967295,u=f+(d<<6&4294967295|d>>>26),d=I+(f^(u|~p))+m[11]+3174756917&4294967295,I=u+(d<<10&4294967295|d>>>22),d=p+(u^(I|~f))+m[2]+718787259&4294967295,p=I+(d<<15&4294967295|d>>>17),d=f+(I^(p|~u))+m[9]+3951481745&4294967295,g.g[0]=g.g[0]+u&4294967295,g.g[1]=g.g[1]+(p+(d<<21&4294967295|d>>>11))&4294967295,g.g[2]=g.g[2]+p&4294967295,g.g[3]=g.g[3]+I&4294967295}s.prototype.v=function(g,u){u===void 0&&(u=g.length);const f=u-this.blockSize,m=this.C;let p=this.h,I=0;for(;I<u;){if(p==0)for(;I<=f;)o(this,g,I),I+=this.blockSize;if(typeof g=="string"){for(;I<u;)if(m[p++]=g.charCodeAt(I++),p==this.blockSize){o(this,m),p=0;break}}else for(;I<u;)if(m[p++]=g[I++],p==this.blockSize){o(this,m),p=0;break}}this.h=p,this.o+=u},s.prototype.A=function(){var g=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);g[0]=128;for(var u=1;u<g.length-8;++u)g[u]=0;u=this.o*8;for(var f=g.length-8;f<g.length;++f)g[f]=u&255,u/=256;for(this.v(g),g=Array(16),u=0,f=0;f<4;++f)for(let m=0;m<32;m+=8)g[u++]=this.g[f]>>>m&255;return g};function c(g,u){var f=_;return Object.prototype.hasOwnProperty.call(f,g)?f[g]:f[g]=u(g)}function h(g,u){this.h=u;const f=[];let m=!0;for(let p=g.length-1;p>=0;p--){const I=g[p]|0;m&&I==u||(f[p]=I,m=!1)}this.g=f}var _={};function w(g){return-128<=g&&g<128?c(g,function(u){return new h([u|0],u<0?-1:0)}):new h([g|0],g<0?-1:0)}function v(g){if(isNaN(g)||!isFinite(g))return S;if(g<0)return U(v(-g));const u=[];let f=1;for(let m=0;g>=f;m++)u[m]=g/f|0,f*=4294967296;return new h(u,0)}function b(g,u){if(g.length==0)throw Error("number format error: empty string");if(u=u||10,u<2||36<u)throw Error("radix out of range: "+u);if(g.charAt(0)=="-")return U(b(g.substring(1),u));if(g.indexOf("-")>=0)throw Error('number format error: interior "-" character');const f=v(Math.pow(u,8));let m=S;for(let I=0;I<g.length;I+=8){var p=Math.min(8,g.length-I);const d=parseInt(g.substring(I,I+p),u);p<8?(p=v(Math.pow(u,p)),m=m.j(p).add(v(d))):(m=m.j(f),m=m.add(v(d)))}return m}var S=w(0),A=w(1),x=w(16777216);i=h.prototype,i.m=function(){if(V(this))return-U(this).m();let g=0,u=1;for(let f=0;f<this.g.length;f++){const m=this.i(f);g+=(m>=0?m:4294967296+m)*u,u*=4294967296}return g},i.toString=function(g){if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(L(this))return"0";if(V(this))return"-"+U(this).toString(g);const u=v(Math.pow(g,6));var f=this;let m="";for(;;){const p=Ee(f,u).g;f=J(f,p.j(u));let I=((f.g.length>0?f.g[0]:f.h)>>>0).toString(g);if(f=p,L(f))return I+m;for(;I.length<6;)I="0"+I;m=I+m}},i.i=function(g){return g<0?0:g<this.g.length?this.g[g]:this.h};function L(g){if(g.h!=0)return!1;for(let u=0;u<g.g.length;u++)if(g.g[u]!=0)return!1;return!0}function V(g){return g.h==-1}i.l=function(g){return g=J(this,g),V(g)?-1:L(g)?0:1};function U(g){const u=g.g.length,f=[];for(let m=0;m<u;m++)f[m]=~g.g[m];return new h(f,~g.h).add(A)}i.abs=function(){return V(this)?U(this):this},i.add=function(g){const u=Math.max(this.g.length,g.g.length),f=[];let m=0;for(let p=0;p<=u;p++){let I=m+(this.i(p)&65535)+(g.i(p)&65535),d=(I>>>16)+(this.i(p)>>>16)+(g.i(p)>>>16);m=d>>>16,I&=65535,d&=65535,f[p]=d<<16|I}return new h(f,f[f.length-1]&-2147483648?-1:0)};function J(g,u){return g.add(U(u))}i.j=function(g){if(L(this)||L(g))return S;if(V(this))return V(g)?U(this).j(U(g)):U(U(this).j(g));if(V(g))return U(this.j(U(g)));if(this.l(x)<0&&g.l(x)<0)return v(this.m()*g.m());const u=this.g.length+g.g.length,f=[];for(var m=0;m<2*u;m++)f[m]=0;for(m=0;m<this.g.length;m++)for(let p=0;p<g.g.length;p++){const I=this.i(m)>>>16,d=this.i(m)&65535,K=g.i(p)>>>16,je=g.i(p)&65535;f[2*m+2*p]+=d*je,X(f,2*m+2*p),f[2*m+2*p+1]+=I*je,X(f,2*m+2*p+1),f[2*m+2*p+1]+=d*K,X(f,2*m+2*p+1),f[2*m+2*p+2]+=I*K,X(f,2*m+2*p+2)}for(g=0;g<u;g++)f[g]=f[2*g+1]<<16|f[2*g];for(g=u;g<2*u;g++)f[g]=0;return new h(f,0)};function X(g,u){for(;(g[u]&65535)!=g[u];)g[u+1]+=g[u]>>>16,g[u]&=65535,u++}function Q(g,u){this.g=g,this.h=u}function Ee(g,u){if(L(u))throw Error("division by zero");if(L(g))return new Q(S,S);if(V(g))return u=Ee(U(g),u),new Q(U(u.g),U(u.h));if(V(u))return u=Ee(g,U(u)),new Q(U(u.g),u.h);if(g.g.length>30){if(V(g)||V(u))throw Error("slowDivide_ only works with positive integers.");for(var f=A,m=u;m.l(g)<=0;)f=ve(f),m=ve(m);var p=Z(f,1),I=Z(m,1);for(m=Z(m,2),f=Z(f,2);!L(m);){var d=I.add(m);d.l(g)<=0&&(p=p.add(f),I=d),m=Z(m,1),f=Z(f,1)}return u=J(g,p.j(u)),new Q(p,u)}for(p=S;g.l(u)>=0;){for(f=Math.max(1,Math.floor(g.m()/u.m())),m=Math.ceil(Math.log(f)/Math.LN2),m=m<=48?1:Math.pow(2,m-48),I=v(f),d=I.j(u);V(d)||d.l(g)>0;)f-=m,I=v(f),d=I.j(u);L(I)&&(I=A),p=p.add(I),g=J(g,d)}return new Q(p,g)}i.B=function(g){return Ee(this,g).h},i.and=function(g){const u=Math.max(this.g.length,g.g.length),f=[];for(let m=0;m<u;m++)f[m]=this.i(m)&g.i(m);return new h(f,this.h&g.h)},i.or=function(g){const u=Math.max(this.g.length,g.g.length),f=[];for(let m=0;m<u;m++)f[m]=this.i(m)|g.i(m);return new h(f,this.h|g.h)},i.xor=function(g){const u=Math.max(this.g.length,g.g.length),f=[];for(let m=0;m<u;m++)f[m]=this.i(m)^g.i(m);return new h(f,this.h^g.h)};function ve(g){const u=g.g.length+1,f=[];for(let m=0;m<u;m++)f[m]=g.i(m)<<1|g.i(m-1)>>>31;return new h(f,g.h)}function Z(g,u){const f=u>>5;u%=32;const m=g.g.length-f,p=[];for(let I=0;I<m;I++)p[I]=u>0?g.i(I+f)>>>u|g.i(I+f+1)<<32-u:g.i(I+f);return new h(p,g.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.B,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=v,h.fromString=b,Ui=h}).apply(typeof yr<"u"?yr:typeof self<"u"?self:typeof window<"u"?window:{});var ln=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var i,e=Object.defineProperty;function t(n){n=[typeof globalThis=="object"&&globalThis,n,typeof window=="object"&&window,typeof self=="object"&&self,typeof ln=="object"&&ln];for(var r=0;r<n.length;++r){var a=n[r];if(a&&a.Math==Math)return a}throw Error("Cannot find global object")}var s=t(this);function o(n,r){if(r)e:{var a=s;n=n.split(".");for(var l=0;l<n.length-1;l++){var y=n[l];if(!(y in a))break e;a=a[y]}n=n[n.length-1],l=a[n],r=r(l),r!=l&&r!=null&&e(a,n,{configurable:!0,writable:!0,value:r})}}o("Symbol.dispose",function(n){return n||Symbol("Symbol.dispose")}),o("Array.prototype.values",function(n){return n||function(){return this[Symbol.iterator]()}}),o("Object.entries",function(n){return n||function(r){var a=[],l;for(l in r)Object.prototype.hasOwnProperty.call(r,l)&&a.push([l,r[l]]);return a}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var c=c||{},h=this||self;function _(n){var r=typeof n;return r=="object"&&n!=null||r=="function"}function w(n,r,a){return n.call.apply(n.bind,arguments)}function v(n,r,a){return v=w,v.apply(null,arguments)}function b(n,r){var a=Array.prototype.slice.call(arguments,1);return function(){var l=a.slice();return l.push.apply(l,arguments),n.apply(this,l)}}function S(n,r){function a(){}a.prototype=r.prototype,n.Z=r.prototype,n.prototype=new a,n.prototype.constructor=n,n.Ob=function(l,y,E){for(var T=Array(arguments.length-2),P=2;P<arguments.length;P++)T[P-2]=arguments[P];return r.prototype[y].apply(l,T)}}var A=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?n=>n&&AsyncContext.Snapshot.wrap(n):n=>n;function x(n){const r=n.length;if(r>0){const a=Array(r);for(let l=0;l<r;l++)a[l]=n[l];return a}return[]}function L(n,r){for(let l=1;l<arguments.length;l++){const y=arguments[l];var a=typeof y;if(a=a!="object"?a:y?Array.isArray(y)?"array":a:"null",a=="array"||a=="object"&&typeof y.length=="number"){a=n.length||0;const E=y.length||0;n.length=a+E;for(let T=0;T<E;T++)n[a+T]=y[T]}else n.push(y)}}class V{constructor(r,a){this.i=r,this.j=a,this.h=0,this.g=null}get(){let r;return this.h>0?(this.h--,r=this.g,this.g=r.next,r.next=null):r=this.i(),r}}function U(n){h.setTimeout(()=>{throw n},0)}function J(){var n=g;let r=null;return n.g&&(r=n.g,n.g=n.g.next,n.g||(n.h=null),r.next=null),r}class X{constructor(){this.h=this.g=null}add(r,a){const l=Q.get();l.set(r,a),this.h?this.h.next=l:this.g=l,this.h=l}}var Q=new V(()=>new Ee,n=>n.reset());class Ee{constructor(){this.next=this.g=this.h=null}set(r,a){this.h=r,this.g=a,this.next=null}reset(){this.next=this.g=this.h=null}}let ve,Z=!1,g=new X,u=()=>{const n=Promise.resolve(void 0);ve=()=>{n.then(f)}};function f(){for(var n;n=J();){try{n.h.call(n.g)}catch(a){U(a)}var r=Q;r.j(n),r.h<100&&(r.h++,n.next=r.g,r.g=n)}Z=!1}function m(){this.u=this.u,this.C=this.C}m.prototype.u=!1,m.prototype.dispose=function(){this.u||(this.u=!0,this.N())},m.prototype[Symbol.dispose]=function(){this.dispose()},m.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function p(n,r){this.type=n,this.g=this.target=r,this.defaultPrevented=!1}p.prototype.h=function(){this.defaultPrevented=!0};var I=function(){if(!h.addEventListener||!Object.defineProperty)return!1;var n=!1,r=Object.defineProperty({},"passive",{get:function(){n=!0}});try{const a=()=>{};h.addEventListener("test",a,r),h.removeEventListener("test",a,r)}catch{}return n}();function d(n){return/^[\s\xa0]*$/.test(n)}function K(n,r){p.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n&&this.init(n,r)}S(K,p),K.prototype.init=function(n,r){const a=this.type=n.type,l=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;this.target=n.target||n.srcElement,this.g=r,r=n.relatedTarget,r||(a=="mouseover"?r=n.fromElement:a=="mouseout"&&(r=n.toElement)),this.relatedTarget=r,l?(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=n.pointerType,this.state=n.state,this.i=n,n.defaultPrevented&&K.Z.h.call(this)},K.prototype.h=function(){K.Z.h.call(this);const n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var je="closure_listenable_"+(Math.random()*1e6|0),Uo=0;function xo(n,r,a,l,y){this.listener=n,this.proxy=null,this.src=r,this.type=a,this.capture=!!l,this.ha=y,this.key=++Uo,this.da=this.fa=!1}function Xt(n){n.da=!0,n.listener=null,n.proxy=null,n.src=null,n.ha=null}function Yt(n,r,a){for(const l in n)r.call(a,n[l],l,n)}function Fo(n,r){for(const a in n)r.call(void 0,n[a],a,n)}function Bi(n){const r={};for(const a in n)r[a]=n[a];return r}const Hi="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function $i(n,r){let a,l;for(let y=1;y<arguments.length;y++){l=arguments[y];for(a in l)n[a]=l[a];for(let E=0;E<Hi.length;E++)a=Hi[E],Object.prototype.hasOwnProperty.call(l,a)&&(n[a]=l[a])}}function Qt(n){this.src=n,this.g={},this.h=0}Qt.prototype.add=function(n,r,a,l,y){const E=n.toString();n=this.g[E],n||(n=this.g[E]=[],this.h++);const T=Nn(n,r,l,y);return T>-1?(r=n[T],a||(r.fa=!1)):(r=new xo(r,this.src,E,!!l,y),r.fa=a,n.push(r)),r};function kn(n,r){const a=r.type;if(a in n.g){var l=n.g[a],y=Array.prototype.indexOf.call(l,r,void 0),E;(E=y>=0)&&Array.prototype.splice.call(l,y,1),E&&(Xt(r),n.g[a].length==0&&(delete n.g[a],n.h--))}}function Nn(n,r,a,l){for(let y=0;y<n.length;++y){const E=n[y];if(!E.da&&E.listener==r&&E.capture==!!a&&E.ha==l)return y}return-1}var On="closure_lm_"+(Math.random()*1e6|0),Dn={};function Wi(n,r,a,l,y){if(Array.isArray(r)){for(let E=0;E<r.length;E++)Wi(n,r[E],a,l,y);return null}return a=qi(a),n&&n[je]?n.J(r,a,_(l)?!!l.capture:!1,y):Vo(n,r,a,!1,l,y)}function Vo(n,r,a,l,y,E){if(!r)throw Error("Invalid event type");const T=_(y)?!!y.capture:!!y;let P=Mn(n);if(P||(n[On]=P=new Qt(n)),a=P.add(r,a,l,T,E),a.proxy)return a;if(l=jo(),a.proxy=l,l.src=n,l.listener=a,n.addEventListener)I||(y=T),y===void 0&&(y=!1),n.addEventListener(r.toString(),l,y);else if(n.attachEvent)n.attachEvent(zi(r.toString()),l);else if(n.addListener&&n.removeListener)n.addListener(l);else throw Error("addEventListener and attachEvent are unavailable.");return a}function jo(){function n(a){return r.call(n.src,n.listener,a)}const r=Bo;return n}function Gi(n,r,a,l,y){if(Array.isArray(r))for(var E=0;E<r.length;E++)Gi(n,r[E],a,l,y);else l=_(l)?!!l.capture:!!l,a=qi(a),n&&n[je]?(n=n.i,E=String(r).toString(),E in n.g&&(r=n.g[E],a=Nn(r,a,l,y),a>-1&&(Xt(r[a]),Array.prototype.splice.call(r,a,1),r.length==0&&(delete n.g[E],n.h--)))):n&&(n=Mn(n))&&(r=n.g[r.toString()],n=-1,r&&(n=Nn(r,a,l,y)),(a=n>-1?r[n]:null)&&Ln(a))}function Ln(n){if(typeof n!="number"&&n&&!n.da){var r=n.src;if(r&&r[je])kn(r.i,n);else{var a=n.type,l=n.proxy;r.removeEventListener?r.removeEventListener(a,l,n.capture):r.detachEvent?r.detachEvent(zi(a),l):r.addListener&&r.removeListener&&r.removeListener(l),(a=Mn(r))?(kn(a,n),a.h==0&&(a.src=null,r[On]=null)):Xt(n)}}}function zi(n){return n in Dn?Dn[n]:Dn[n]="on"+n}function Bo(n,r){if(n.da)n=!0;else{r=new K(r,this);const a=n.listener,l=n.ha||n.src;n.fa&&Ln(n),n=a.call(l,r)}return n}function Mn(n){return n=n[On],n instanceof Qt?n:null}var Un="__closure_events_fn_"+(Math.random()*1e9>>>0);function qi(n){return typeof n=="function"?n:(n[Un]||(n[Un]=function(r){return n.handleEvent(r)}),n[Un])}function $(){m.call(this),this.i=new Qt(this),this.M=this,this.G=null}S($,m),$.prototype[je]=!0,$.prototype.removeEventListener=function(n,r,a,l){Gi(this,n,r,a,l)};function W(n,r){var a,l=n.G;if(l)for(a=[];l;l=l.G)a.push(l);if(n=n.M,l=r.type||r,typeof r=="string")r=new p(r,n);else if(r instanceof p)r.target=r.target||n;else{var y=r;r=new p(l,n),$i(r,y)}y=!0;let E,T;if(a)for(T=a.length-1;T>=0;T--)E=r.g=a[T],y=Zt(E,l,!0,r)&&y;if(E=r.g=n,y=Zt(E,l,!0,r)&&y,y=Zt(E,l,!1,r)&&y,a)for(T=0;T<a.length;T++)E=r.g=a[T],y=Zt(E,l,!1,r)&&y}$.prototype.N=function(){if($.Z.N.call(this),this.i){var n=this.i;for(const r in n.g){const a=n.g[r];for(let l=0;l<a.length;l++)Xt(a[l]);delete n.g[r],n.h--}}this.G=null},$.prototype.J=function(n,r,a,l){return this.i.add(String(n),r,!1,a,l)},$.prototype.K=function(n,r,a,l){return this.i.add(String(n),r,!0,a,l)};function Zt(n,r,a,l){if(r=n.i.g[String(r)],!r)return!0;r=r.concat();let y=!0;for(let E=0;E<r.length;++E){const T=r[E];if(T&&!T.da&&T.capture==a){const P=T.listener,B=T.ha||T.src;T.fa&&kn(n.i,T),y=P.call(B,l)!==!1&&y}}return y&&!l.defaultPrevented}function Ho(n,r){if(typeof n!="function")if(n&&typeof n.handleEvent=="function")n=v(n.handleEvent,n);else throw Error("Invalid listener argument");return Number(r)>2147483647?-1:h.setTimeout(n,r||0)}function Ki(n){n.g=Ho(()=>{n.g=null,n.i&&(n.i=!1,Ki(n))},n.l);const r=n.h;n.h=null,n.m.apply(null,r)}class $o extends m{constructor(r,a){super(),this.m=r,this.l=a,this.h=null,this.i=!1,this.g=null}j(r){this.h=arguments,this.g?this.i=!0:Ki(this)}N(){super.N(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function gt(n){m.call(this),this.h=n,this.g={}}S(gt,m);var Ji=[];function Xi(n){Yt(n.g,function(r,a){this.g.hasOwnProperty(a)&&Ln(r)},n),n.g={}}gt.prototype.N=function(){gt.Z.N.call(this),Xi(this)},gt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var xn=h.JSON.stringify,Wo=h.JSON.parse,Go=class{stringify(n){return h.JSON.stringify(n,void 0)}parse(n){return h.JSON.parse(n,void 0)}};function Yi(){}function zo(){}var mt={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Fn(){p.call(this,"d")}S(Fn,p);function Vn(){p.call(this,"c")}S(Vn,p);var nt={},Qi=null;function jn(){return Qi=Qi||new $}nt.Ia="serverreachability";function Zi(n){p.call(this,nt.Ia,n)}S(Zi,p);function _t(n){const r=jn();W(r,new Zi(r))}nt.STAT_EVENT="statevent";function es(n,r){p.call(this,nt.STAT_EVENT,n),this.stat=r}S(es,p);function G(n){const r=jn();W(r,new es(r,n))}nt.Ja="timingevent";function ts(n,r){p.call(this,nt.Ja,n),this.size=r}S(ts,p);function yt(n,r){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return h.setTimeout(function(){n()},r)}function It(){this.g=!0}It.prototype.ua=function(){this.g=!1};function qo(n,r,a,l,y,E){n.info(function(){if(n.g)if(E){var T="",P=E.split("&");for(let D=0;D<P.length;D++){var B=P[D].split("=");if(B.length>1){const H=B[0];B=B[1];const ae=H.split("_");T=ae.length>=2&&ae[1]=="type"?T+(H+"="+B+"&"):T+(H+"=redacted&")}}}else T=null;else T=E;return"XMLHTTP REQ ("+l+") [attempt "+y+"]: "+r+`
`+a+`
`+T})}function Ko(n,r,a,l,y,E,T){n.info(function(){return"XMLHTTP RESP ("+l+") [ attempt "+y+"]: "+r+`
`+a+`
`+E+" "+T})}function it(n,r,a,l){n.info(function(){return"XMLHTTP TEXT ("+r+"): "+Xo(n,a)+(l?" "+l:"")})}function Jo(n,r){n.info(function(){return"TIMEOUT: "+r})}It.prototype.info=function(){};function Xo(n,r){if(!n.g)return r;if(!r)return null;try{const E=JSON.parse(r);if(E){for(n=0;n<E.length;n++)if(Array.isArray(E[n])){var a=E[n];if(!(a.length<2)){var l=a[1];if(Array.isArray(l)&&!(l.length<1)){var y=l[0];if(y!="noop"&&y!="stop"&&y!="close")for(let T=1;T<l.length;T++)l[T]=""}}}}return xn(E)}catch{return r}}var Bn={NO_ERROR:0,TIMEOUT:8},Yo={},ns;function Hn(){}S(Hn,Yi),Hn.prototype.g=function(){return new XMLHttpRequest},ns=new Hn;function wt(n){return encodeURIComponent(String(n))}function Qo(n){var r=1;n=n.split(":");const a=[];for(;r>0&&n.length;)a.push(n.shift()),r--;return n.length&&a.push(n.join(":")),a}function Te(n,r,a,l){this.j=n,this.i=r,this.l=a,this.S=l||1,this.V=new gt(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new is}function is(){this.i=null,this.g="",this.h=!1}var ss={},$n={};function Wn(n,r,a){n.M=1,n.A=tn(oe(r)),n.u=a,n.R=!0,rs(n,null)}function rs(n,r){n.F=Date.now(),en(n),n.B=oe(n.A);var a=n.B,l=n.S;Array.isArray(l)||(l=[String(l)]),ys(a.i,"t",l),n.C=0,a=n.j.L,n.h=new is,n.g=Us(n.j,a?r:null,!n.u),n.P>0&&(n.O=new $o(v(n.Y,n,n.g),n.P)),r=n.V,a=n.g,l=n.ba;var y="readystatechange";Array.isArray(y)||(y&&(Ji[0]=y.toString()),y=Ji);for(let E=0;E<y.length;E++){const T=Wi(a,y[E],l||r.handleEvent,!1,r.h||r);if(!T)break;r.g[T.key]=T}r=n.J?Bi(n.J):{},n.u?(n.v||(n.v="POST"),r["Content-Type"]="application/x-www-form-urlencoded",n.g.ea(n.B,n.v,n.u,r)):(n.v="GET",n.g.ea(n.B,n.v,null,r)),_t(),qo(n.i,n.v,n.B,n.l,n.S,n.u)}Te.prototype.ba=function(n){n=n.target;const r=this.O;r&&be(n)==3?r.j():this.Y(n)},Te.prototype.Y=function(n){try{if(n==this.g)e:{const P=be(this.g),B=this.g.ya(),D=this.g.ca();if(!(P<3)&&(P!=3||this.g&&(this.h.h||this.g.la()||Ss(this.g)))){this.K||P!=4||B==7||(B==8||D<=0?_t(3):_t(2)),Gn(this);var r=this.g.ca();this.X=r;var a=Zo(this);if(this.o=r==200,Ko(this.i,this.v,this.B,this.l,this.S,P,r),this.o){if(this.U&&!this.L){t:{if(this.g){var l,y=this.g;if((l=y.g?y.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!d(l)){var E=l;break t}}E=null}if(n=E)it(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,zn(this,n);else{this.o=!1,this.m=3,G(12),Be(this),Et(this);break e}}if(this.R){n=!0;let H;for(;!this.K&&this.C<a.length;)if(H=ea(this,a),H==$n){P==4&&(this.m=4,G(14),n=!1),it(this.i,this.l,null,"[Incomplete Response]");break}else if(H==ss){this.m=4,G(15),it(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}else it(this.i,this.l,H,null),zn(this,H);if(os(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),P!=4||a.length!=0||this.h.h||(this.m=1,G(16),n=!1),this.o=this.o&&n,!n)it(this.i,this.l,a,"[Invalid Chunked Response]"),Be(this),Et(this);else if(a.length>0&&!this.W){this.W=!0;var T=this.j;T.g==this&&T.aa&&!T.P&&(T.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),ei(T),T.P=!0,G(11))}}else it(this.i,this.l,a,null),zn(this,a);P==4&&Be(this),this.o&&!this.K&&(P==4?Os(this.j,this):(this.o=!1,en(this)))}else pa(this.g),r==400&&a.indexOf("Unknown SID")>0?(this.m=3,G(12)):(this.m=0,G(13)),Be(this),Et(this)}}}catch{}finally{}};function Zo(n){if(!os(n))return n.g.la();const r=Ss(n.g);if(r==="")return"";let a="";const l=r.length,y=be(n.g)==4;if(!n.h.i){if(typeof TextDecoder>"u")return Be(n),Et(n),"";n.h.i=new h.TextDecoder}for(let E=0;E<l;E++)n.h.h=!0,a+=n.h.i.decode(r[E],{stream:!(y&&E==l-1)});return r.length=0,n.h.g+=a,n.C=0,n.h.g}function os(n){return n.g?n.v=="GET"&&n.M!=2&&n.j.Aa:!1}function ea(n,r){var a=n.C,l=r.indexOf(`
`,a);return l==-1?$n:(a=Number(r.substring(a,l)),isNaN(a)?ss:(l+=1,l+a>r.length?$n:(r=r.slice(l,l+a),n.C=l+a,r)))}Te.prototype.cancel=function(){this.K=!0,Be(this)};function en(n){n.T=Date.now()+n.H,as(n,n.H)}function as(n,r){if(n.D!=null)throw Error("WatchDog timer not null");n.D=yt(v(n.aa,n),r)}function Gn(n){n.D&&(h.clearTimeout(n.D),n.D=null)}Te.prototype.aa=function(){this.D=null;const n=Date.now();n-this.T>=0?(Jo(this.i,this.B),this.M!=2&&(_t(),G(17)),Be(this),this.m=2,Et(this)):as(this,this.T-n)};function Et(n){n.j.I==0||n.K||Os(n.j,n)}function Be(n){Gn(n);var r=n.O;r&&typeof r.dispose=="function"&&r.dispose(),n.O=null,Xi(n.V),n.g&&(r=n.g,n.g=null,r.abort(),r.dispose())}function zn(n,r){try{var a=n.j;if(a.I!=0&&(a.g==n||qn(a.h,n))){if(!n.L&&qn(a.h,n)&&a.I==3){try{var l=a.Ba.g.parse(r)}catch{l=null}if(Array.isArray(l)&&l.length==3){var y=l;if(y[0]==0){e:if(!a.v){if(a.g)if(a.g.F+3e3<n.F)an(a),rn(a);else break e;Zn(a),G(18)}}else a.xa=y[1],0<a.xa-a.K&&y[2]<37500&&a.F&&a.A==0&&!a.C&&(a.C=yt(v(a.Va,a),6e3));ls(a.h)<=1&&a.ta&&(a.ta=void 0)}else $e(a,11)}else if((n.L||a.g==n)&&an(a),!d(r))for(y=a.Ba.g.parse(r),r=0;r<y.length;r++){let D=y[r];const H=D[0];if(!(H<=a.K))if(a.K=H,D=D[1],a.I==2)if(D[0]=="c"){a.M=D[1],a.ba=D[2];const ae=D[3];ae!=null&&(a.ka=ae,a.j.info("VER="+a.ka));const We=D[4];We!=null&&(a.za=We,a.j.info("SVER="+a.za));const Ce=D[5];Ce!=null&&typeof Ce=="number"&&Ce>0&&(l=1.5*Ce,a.O=l,a.j.info("backChannelRequestTimeoutMs_="+l)),l=a;const Pe=n.g;if(Pe){const cn=Pe.g?Pe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(cn){var E=l.h;E.g||cn.indexOf("spdy")==-1&&cn.indexOf("quic")==-1&&cn.indexOf("h2")==-1||(E.j=E.l,E.g=new Set,E.h&&(Kn(E,E.h),E.h=null))}if(l.G){const ti=Pe.g?Pe.g.getResponseHeader("X-HTTP-Session-Id"):null;ti&&(l.wa=ti,M(l.J,l.G,ti))}}a.I=3,a.l&&a.l.ra(),a.aa&&(a.T=Date.now()-n.F,a.j.info("Handshake RTT: "+a.T+"ms")),l=a;var T=n;if(l.na=Ms(l,l.L?l.ba:null,l.W),T.L){us(l.h,T);var P=T,B=l.O;B&&(P.H=B),P.D&&(Gn(P),en(P)),l.g=T}else ks(l);a.i.length>0&&on(a)}else D[0]!="stop"&&D[0]!="close"||$e(a,7);else a.I==3&&(D[0]=="stop"||D[0]=="close"?D[0]=="stop"?$e(a,7):Qn(a):D[0]!="noop"&&a.l&&a.l.qa(D),a.A=0)}}_t(4)}catch{}}var ta=class{constructor(n,r){this.g=n,this.map=r}};function cs(n){this.l=n||10,h.PerformanceNavigationTiming?(n=h.performance.getEntriesByType("navigation"),n=n.length>0&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(h.chrome&&h.chrome.loadTimes&&h.chrome.loadTimes()&&h.chrome.loadTimes().wasFetchedViaSpdy),this.j=n?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function hs(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function ls(n){return n.h?1:n.g?n.g.size:0}function qn(n,r){return n.h?n.h==r:n.g?n.g.has(r):!1}function Kn(n,r){n.g?n.g.add(r):n.h=r}function us(n,r){n.h&&n.h==r?n.h=null:n.g&&n.g.has(r)&&n.g.delete(r)}cs.prototype.cancel=function(){if(this.i=ds(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const n of this.g.values())n.cancel();this.g.clear()}};function ds(n){if(n.h!=null)return n.i.concat(n.h.G);if(n.g!=null&&n.g.size!==0){let r=n.i;for(const a of n.g.values())r=r.concat(a.G);return r}return x(n.i)}var fs=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function na(n,r){if(n){n=n.split("&");for(let a=0;a<n.length;a++){const l=n[a].indexOf("=");let y,E=null;l>=0?(y=n[a].substring(0,l),E=n[a].substring(l+1)):y=n[a],r(y,E?decodeURIComponent(E.replace(/\+/g," ")):"")}}}function Ae(n){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let r;n instanceof Ae?(this.l=n.l,vt(this,n.j),this.o=n.o,this.g=n.g,Tt(this,n.u),this.h=n.h,Jn(this,Is(n.i)),this.m=n.m):n&&(r=String(n).match(fs))?(this.l=!1,vt(this,r[1]||"",!0),this.o=At(r[2]||""),this.g=At(r[3]||"",!0),Tt(this,r[4]),this.h=At(r[5]||"",!0),Jn(this,r[6]||"",!0),this.m=At(r[7]||"")):(this.l=!1,this.i=new bt(null,this.l))}Ae.prototype.toString=function(){const n=[];var r=this.j;r&&n.push(St(r,ps,!0),":");var a=this.g;return(a||r=="file")&&(n.push("//"),(r=this.o)&&n.push(St(r,ps,!0),"@"),n.push(wt(a).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a=this.u,a!=null&&n.push(":",String(a))),(a=this.h)&&(this.g&&a.charAt(0)!="/"&&n.push("/"),n.push(St(a,a.charAt(0)=="/"?ra:sa,!0))),(a=this.i.toString())&&n.push("?",a),(a=this.m)&&n.push("#",St(a,aa)),n.join("")},Ae.prototype.resolve=function(n){const r=oe(this);let a=!!n.j;a?vt(r,n.j):a=!!n.o,a?r.o=n.o:a=!!n.g,a?r.g=n.g:a=n.u!=null;var l=n.h;if(a)Tt(r,n.u);else if(a=!!n.h){if(l.charAt(0)!="/")if(this.g&&!this.h)l="/"+l;else{var y=r.h.lastIndexOf("/");y!=-1&&(l=r.h.slice(0,y+1)+l)}if(y=l,y==".."||y==".")l="";else if(y.indexOf("./")!=-1||y.indexOf("/.")!=-1){l=y.lastIndexOf("/",0)==0,y=y.split("/");const E=[];for(let T=0;T<y.length;){const P=y[T++];P=="."?l&&T==y.length&&E.push(""):P==".."?((E.length>1||E.length==1&&E[0]!="")&&E.pop(),l&&T==y.length&&E.push("")):(E.push(P),l=!0)}l=E.join("/")}else l=y}return a?r.h=l:a=n.i.toString()!=="",a?Jn(r,Is(n.i)):a=!!n.m,a&&(r.m=n.m),r};function oe(n){return new Ae(n)}function vt(n,r,a){n.j=a?At(r,!0):r,n.j&&(n.j=n.j.replace(/:$/,""))}function Tt(n,r){if(r){if(r=Number(r),isNaN(r)||r<0)throw Error("Bad port number "+r);n.u=r}else n.u=null}function Jn(n,r,a){r instanceof bt?(n.i=r,ca(n.i,n.l)):(a||(r=St(r,oa)),n.i=new bt(r,n.l))}function M(n,r,a){n.i.set(r,a)}function tn(n){return M(n,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),n}function At(n,r){return n?r?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function St(n,r,a){return typeof n=="string"?(n=encodeURI(n).replace(r,ia),a&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function ia(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var ps=/[#\/\?@]/g,sa=/[#\?:]/g,ra=/[#\?]/g,oa=/[#\?@]/g,aa=/#/g;function bt(n,r){this.h=this.g=null,this.i=n||null,this.j=!!r}function He(n){n.g||(n.g=new Map,n.h=0,n.i&&na(n.i,function(r,a){n.add(decodeURIComponent(r.replace(/\+/g," ")),a)}))}i=bt.prototype,i.add=function(n,r){He(this),this.i=null,n=st(this,n);let a=this.g.get(n);return a||this.g.set(n,a=[]),a.push(r),this.h+=1,this};function gs(n,r){He(n),r=st(n,r),n.g.has(r)&&(n.i=null,n.h-=n.g.get(r).length,n.g.delete(r))}function ms(n,r){return He(n),r=st(n,r),n.g.has(r)}i.forEach=function(n,r){He(this),this.g.forEach(function(a,l){a.forEach(function(y){n.call(r,y,l,this)},this)},this)};function _s(n,r){He(n);let a=[];if(typeof r=="string")ms(n,r)&&(a=a.concat(n.g.get(st(n,r))));else for(n=Array.from(n.g.values()),r=0;r<n.length;r++)a=a.concat(n[r]);return a}i.set=function(n,r){return He(this),this.i=null,n=st(this,n),ms(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[r]),this.h+=1,this},i.get=function(n,r){return n?(n=_s(this,n),n.length>0?String(n[0]):r):r};function ys(n,r,a){gs(n,r),a.length>0&&(n.i=null,n.g.set(st(n,r),x(a)),n.h+=a.length)}i.toString=function(){if(this.i)return this.i;if(!this.g)return"";const n=[],r=Array.from(this.g.keys());for(let l=0;l<r.length;l++){var a=r[l];const y=wt(a);a=_s(this,a);for(let E=0;E<a.length;E++){let T=y;a[E]!==""&&(T+="="+wt(a[E])),n.push(T)}}return this.i=n.join("&")};function Is(n){const r=new bt;return r.i=n.i,n.g&&(r.g=new Map(n.g),r.h=n.h),r}function st(n,r){return r=String(r),n.j&&(r=r.toLowerCase()),r}function ca(n,r){r&&!n.j&&(He(n),n.i=null,n.g.forEach(function(a,l){const y=l.toLowerCase();l!=y&&(gs(this,l),ys(this,y,a))},n)),n.j=r}function ha(n,r){const a=new It;if(h.Image){const l=new Image;l.onload=b(Se,a,"TestLoadImage: loaded",!0,r,l),l.onerror=b(Se,a,"TestLoadImage: error",!1,r,l),l.onabort=b(Se,a,"TestLoadImage: abort",!1,r,l),l.ontimeout=b(Se,a,"TestLoadImage: timeout",!1,r,l),h.setTimeout(function(){l.ontimeout&&l.ontimeout()},1e4),l.src=n}else r(!1)}function la(n,r){const a=new It,l=new AbortController,y=setTimeout(()=>{l.abort(),Se(a,"TestPingServer: timeout",!1,r)},1e4);fetch(n,{signal:l.signal}).then(E=>{clearTimeout(y),E.ok?Se(a,"TestPingServer: ok",!0,r):Se(a,"TestPingServer: server error",!1,r)}).catch(()=>{clearTimeout(y),Se(a,"TestPingServer: error",!1,r)})}function Se(n,r,a,l,y){try{y&&(y.onload=null,y.onerror=null,y.onabort=null,y.ontimeout=null),l(a)}catch{}}function ua(){this.g=new Go}function Xn(n){this.i=n.Sb||null,this.h=n.ab||!1}S(Xn,Yi),Xn.prototype.g=function(){return new nn(this.i,this.h)};function nn(n,r){$.call(this),this.H=n,this.o=r,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}S(nn,$),i=nn.prototype,i.open=function(n,r){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=n,this.D=r,this.readyState=1,Pt(this)},i.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const r={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};n&&(r.body=n),(this.H||h).fetch(new Request(this.D,r)).then(this.Pa.bind(this),this.ga.bind(this))},i.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ct(this)),this.readyState=0},i.Pa=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,Pt(this)),this.g&&(this.readyState=3,Pt(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof h.ReadableStream<"u"&&"body"in n){if(this.j=n.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ws(this)}else n.text().then(this.Oa.bind(this),this.ga.bind(this))};function ws(n){n.j.read().then(n.Ma.bind(n)).catch(n.ga.bind(n))}i.Ma=function(n){if(this.g){if(this.o&&n.value)this.response.push(n.value);else if(!this.o){var r=n.value?n.value:new Uint8Array(0);(r=this.B.decode(r,{stream:!n.done}))&&(this.response=this.responseText+=r)}n.done?Ct(this):Pt(this),this.readyState==3&&ws(this)}},i.Oa=function(n){this.g&&(this.response=this.responseText=n,Ct(this))},i.Na=function(n){this.g&&(this.response=n,Ct(this))},i.ga=function(){this.g&&Ct(this)};function Ct(n){n.readyState=4,n.l=null,n.j=null,n.B=null,Pt(n)}i.setRequestHeader=function(n,r){this.A.append(n,r)},i.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""},i.getAllResponseHeaders=function(){if(!this.h)return"";const n=[],r=this.h.entries();for(var a=r.next();!a.done;)a=a.value,n.push(a[0]+": "+a[1]),a=r.next();return n.join(`\r
`)};function Pt(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(nn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});function Es(n){let r="";return Yt(n,function(a,l){r+=l,r+=":",r+=a,r+=`\r
`}),r}function Yn(n,r,a){e:{for(l in a){var l=!1;break e}l=!0}l||(a=Es(a),typeof n=="string"?a!=null&&wt(a):M(n,r,a))}function F(n){$.call(this),this.headers=new Map,this.L=n||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}S(F,$);var da=/^https?$/i,fa=["POST","PUT"];i=F.prototype,i.Fa=function(n){this.H=n},i.ea=function(n,r,a,l){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+n);r=r?r.toUpperCase():"GET",this.D=n,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ns.g(),this.g.onreadystatechange=A(v(this.Ca,this));try{this.B=!0,this.g.open(r,String(n),!0),this.B=!1}catch(E){vs(this,E);return}if(n=a||"",a=new Map(this.headers),l)if(Object.getPrototypeOf(l)===Object.prototype)for(var y in l)a.set(y,l[y]);else if(typeof l.keys=="function"&&typeof l.get=="function")for(const E of l.keys())a.set(E,l.get(E));else throw Error("Unknown input type for opt_headers: "+String(l));l=Array.from(a.keys()).find(E=>E.toLowerCase()=="content-type"),y=h.FormData&&n instanceof h.FormData,!(Array.prototype.indexOf.call(fa,r,void 0)>=0)||l||y||a.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[E,T]of a)this.g.setRequestHeader(E,T);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(n),this.v=!1}catch(E){vs(this,E)}};function vs(n,r){n.h=!1,n.g&&(n.j=!0,n.g.abort(),n.j=!1),n.l=r,n.o=5,Ts(n),sn(n)}function Ts(n){n.A||(n.A=!0,W(n,"complete"),W(n,"error"))}i.abort=function(n){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=n||7,W(this,"complete"),W(this,"abort"),sn(this))},i.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),sn(this,!0)),F.Z.N.call(this)},i.Ca=function(){this.u||(this.B||this.v||this.j?As(this):this.Xa())},i.Xa=function(){As(this)};function As(n){if(n.h&&typeof c<"u"){if(n.v&&be(n)==4)setTimeout(n.Ca.bind(n),0);else if(W(n,"readystatechange"),be(n)==4){n.h=!1;try{const E=n.ca();e:switch(E){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var r=!0;break e;default:r=!1}var a;if(!(a=r)){var l;if(l=E===0){let T=String(n.D).match(fs)[1]||null;!T&&h.self&&h.self.location&&(T=h.self.location.protocol.slice(0,-1)),l=!da.test(T?T.toLowerCase():"")}a=l}if(a)W(n,"complete"),W(n,"success");else{n.o=6;try{var y=be(n)>2?n.g.statusText:""}catch{y=""}n.l=y+" ["+n.ca()+"]",Ts(n)}}finally{sn(n)}}}}function sn(n,r){if(n.g){n.m&&(clearTimeout(n.m),n.m=null);const a=n.g;n.g=null,r||W(n,"ready");try{a.onreadystatechange=null}catch{}}}i.isActive=function(){return!!this.g};function be(n){return n.g?n.g.readyState:0}i.ca=function(){try{return be(this)>2?this.g.status:-1}catch{return-1}},i.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},i.La=function(n){if(this.g){var r=this.g.responseText;return n&&r.indexOf(n)==0&&(r=r.substring(n.length)),Wo(r)}};function Ss(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.F){case"":case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}function pa(n){const r={};n=(n.g&&be(n)>=2&&n.g.getAllResponseHeaders()||"").split(`\r
`);for(let l=0;l<n.length;l++){if(d(n[l]))continue;var a=Qo(n[l]);const y=a[0];if(a=a[1],typeof a!="string")continue;a=a.trim();const E=r[y]||[];r[y]=E,E.push(a)}Fo(r,function(l){return l.join(", ")})}i.ya=function(){return this.o},i.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Rt(n,r,a){return a&&a.internalChannelParams&&a.internalChannelParams[n]||r}function bs(n){this.za=0,this.i=[],this.j=new It,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Rt("failFast",!1,n),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Rt("baseRetryDelayMs",5e3,n),this.Za=Rt("retryDelaySeedMs",1e4,n),this.Ta=Rt("forwardChannelMaxRetries",2,n),this.va=Rt("forwardChannelRequestTimeoutMs",2e4,n),this.ma=n&&n.xmlHttpFactory||void 0,this.Ua=n&&n.Rb||void 0,this.Aa=n&&n.useFetchStreams||!1,this.O=void 0,this.L=n&&n.supportsCrossDomainXhr||!1,this.M="",this.h=new cs(n&&n.concurrentRequestLimit),this.Ba=new ua,this.S=n&&n.fastHandshake||!1,this.R=n&&n.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=n&&n.Pb||!1,n&&n.ua&&this.j.ua(),n&&n.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&n&&n.detectBufferingProxy||!1,this.ia=void 0,n&&n.longPollingTimeout&&n.longPollingTimeout>0&&(this.ia=n.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}i=bs.prototype,i.ka=8,i.I=1,i.connect=function(n,r,a,l){G(0),this.W=n,this.H=r||{},a&&l!==void 0&&(this.H.OSID=a,this.H.OAID=l),this.F=this.X,this.J=Ms(this,null,this.W),on(this)};function Qn(n){if(Cs(n),n.I==3){var r=n.V++,a=oe(n.J);if(M(a,"SID",n.M),M(a,"RID",r),M(a,"TYPE","terminate"),kt(n,a),r=new Te(n,n.j,r),r.M=2,r.A=tn(oe(a)),a=!1,h.navigator&&h.navigator.sendBeacon)try{a=h.navigator.sendBeacon(r.A.toString(),"")}catch{}!a&&h.Image&&(new Image().src=r.A,a=!0),a||(r.g=Us(r.j,null),r.g.ea(r.A)),r.F=Date.now(),en(r)}Ls(n)}function rn(n){n.g&&(ei(n),n.g.cancel(),n.g=null)}function Cs(n){rn(n),n.v&&(h.clearTimeout(n.v),n.v=null),an(n),n.h.cancel(),n.m&&(typeof n.m=="number"&&h.clearTimeout(n.m),n.m=null)}function on(n){if(!hs(n.h)&&!n.m){n.m=!0;var r=n.Ea;ve||u(),Z||(ve(),Z=!0),g.add(r,n),n.D=0}}function ga(n,r){return ls(n.h)>=n.h.j-(n.m?1:0)?!1:n.m?(n.i=r.G.concat(n.i),!0):n.I==1||n.I==2||n.D>=(n.Sa?0:n.Ta)?!1:(n.m=yt(v(n.Ea,n,r),Ds(n,n.D)),n.D++,!0)}i.Ea=function(n){if(this.m)if(this.m=null,this.I==1){if(!n){this.V=Math.floor(Math.random()*1e5),n=this.V++;const y=new Te(this,this.j,n);let E=this.o;if(this.U&&(E?(E=Bi(E),$i(E,this.U)):E=this.U),this.u!==null||this.R||(y.J=E,E=null),this.S)e:{for(var r=0,a=0;a<this.i.length;a++){t:{var l=this.i[a];if("__data__"in l.map&&(l=l.map.__data__,typeof l=="string")){l=l.length;break t}l=void 0}if(l===void 0)break;if(r+=l,r>4096){r=a;break e}if(r===4096||a===this.i.length-1){r=a+1;break e}}r=1e3}else r=1e3;r=Rs(this,y,r),a=oe(this.J),M(a,"RID",n),M(a,"CVER",22),this.G&&M(a,"X-HTTP-Session-Id",this.G),kt(this,a),E&&(this.R?r="headers="+wt(Es(E))+"&"+r:this.u&&Yn(a,this.u,E)),Kn(this.h,y),this.Ra&&M(a,"TYPE","init"),this.S?(M(a,"$req",r),M(a,"SID","null"),y.U=!0,Wn(y,a,null)):Wn(y,a,r),this.I=2}}else this.I==3&&(n?Ps(this,n):this.i.length==0||hs(this.h)||Ps(this))};function Ps(n,r){var a;r?a=r.l:a=n.V++;const l=oe(n.J);M(l,"SID",n.M),M(l,"RID",a),M(l,"AID",n.K),kt(n,l),n.u&&n.o&&Yn(l,n.u,n.o),a=new Te(n,n.j,a,n.D+1),n.u===null&&(a.J=n.o),r&&(n.i=r.G.concat(n.i)),r=Rs(n,a,1e3),a.H=Math.round(n.va*.5)+Math.round(n.va*.5*Math.random()),Kn(n.h,a),Wn(a,l,r)}function kt(n,r){n.H&&Yt(n.H,function(a,l){M(r,l,a)}),n.l&&Yt({},function(a,l){M(r,l,a)})}function Rs(n,r,a){a=Math.min(n.i.length,a);const l=n.l?v(n.l.Ka,n.l,n):null;e:{var y=n.i;let P=-1;for(;;){const B=["count="+a];P==-1?a>0?(P=y[0].g,B.push("ofs="+P)):P=0:B.push("ofs="+P);let D=!0;for(let H=0;H<a;H++){var E=y[H].g;const ae=y[H].map;if(E-=P,E<0)P=Math.max(0,y[H].g-100),D=!1;else try{E="req"+E+"_"||"";try{var T=ae instanceof Map?ae:Object.entries(ae);for(const[We,Ce]of T){let Pe=Ce;_(Ce)&&(Pe=xn(Ce)),B.push(E+We+"="+encodeURIComponent(Pe))}}catch(We){throw B.push(E+"type="+encodeURIComponent("_badmap")),We}}catch{l&&l(ae)}}if(D){T=B.join("&");break e}}T=void 0}return n=n.i.splice(0,a),r.G=n,T}function ks(n){if(!n.g&&!n.v){n.Y=1;var r=n.Da;ve||u(),Z||(ve(),Z=!0),g.add(r,n),n.A=0}}function Zn(n){return n.g||n.v||n.A>=3?!1:(n.Y++,n.v=yt(v(n.Da,n),Ds(n,n.A)),n.A++,!0)}i.Da=function(){if(this.v=null,Ns(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var n=4*this.T;this.j.info("BP detection timer enabled: "+n),this.B=yt(v(this.Wa,this),n)}},i.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,G(10),rn(this),Ns(this))};function ei(n){n.B!=null&&(h.clearTimeout(n.B),n.B=null)}function Ns(n){n.g=new Te(n,n.j,"rpc",n.Y),n.u===null&&(n.g.J=n.o),n.g.P=0;var r=oe(n.na);M(r,"RID","rpc"),M(r,"SID",n.M),M(r,"AID",n.K),M(r,"CI",n.F?"0":"1"),!n.F&&n.ia&&M(r,"TO",n.ia),M(r,"TYPE","xmlhttp"),kt(n,r),n.u&&n.o&&Yn(r,n.u,n.o),n.O&&(n.g.H=n.O);var a=n.g;n=n.ba,a.M=1,a.A=tn(oe(r)),a.u=null,a.R=!0,rs(a,n)}i.Va=function(){this.C!=null&&(this.C=null,rn(this),Zn(this),G(19))};function an(n){n.C!=null&&(h.clearTimeout(n.C),n.C=null)}function Os(n,r){var a=null;if(n.g==r){an(n),ei(n),n.g=null;var l=2}else if(qn(n.h,r))a=r.G,us(n.h,r),l=1;else return;if(n.I!=0){if(r.o)if(l==1){a=r.u?r.u.length:0,r=Date.now()-r.F;var y=n.D;l=jn(),W(l,new ts(l,a)),on(n)}else ks(n);else if(y=r.m,y==3||y==0&&r.X>0||!(l==1&&ga(n,r)||l==2&&Zn(n)))switch(a&&a.length>0&&(r=n.h,r.i=r.i.concat(a)),y){case 1:$e(n,5);break;case 4:$e(n,10);break;case 3:$e(n,6);break;default:$e(n,2)}}}function Ds(n,r){let a=n.Qa+Math.floor(Math.random()*n.Za);return n.isActive()||(a*=2),a*r}function $e(n,r){if(n.j.info("Error code "+r),r==2){var a=v(n.bb,n),l=n.Ua;const y=!l;l=new Ae(l||"//www.google.com/images/cleardot.gif"),h.location&&h.location.protocol=="http"||vt(l,"https"),tn(l),y?ha(l.toString(),a):la(l.toString(),a)}else G(2);n.I=0,n.l&&n.l.pa(r),Ls(n),Cs(n)}i.bb=function(n){n?(this.j.info("Successfully pinged google.com"),G(2)):(this.j.info("Failed to ping google.com"),G(1))};function Ls(n){if(n.I=0,n.ja=[],n.l){const r=ds(n.h);(r.length!=0||n.i.length!=0)&&(L(n.ja,r),L(n.ja,n.i),n.h.i.length=0,x(n.i),n.i.length=0),n.l.oa()}}function Ms(n,r,a){var l=a instanceof Ae?oe(a):new Ae(a);if(l.g!="")r&&(l.g=r+"."+l.g),Tt(l,l.u);else{var y=h.location;l=y.protocol,r=r?r+"."+y.hostname:y.hostname,y=+y.port;const E=new Ae(null);l&&vt(E,l),r&&(E.g=r),y&&Tt(E,y),a&&(E.h=a),l=E}return a=n.G,r=n.wa,a&&r&&M(l,a,r),M(l,"VER",n.ka),kt(n,l),l}function Us(n,r,a){if(r&&!n.L)throw Error("Can't create secondary domain capable XhrIo object.");return r=n.Aa&&!n.ma?new F(new Xn({ab:a})):new F(n.ma),r.Fa(n.L),r}i.isActive=function(){return!!this.l&&this.l.isActive(this)};function xs(){}i=xs.prototype,i.ra=function(){},i.qa=function(){},i.pa=function(){},i.oa=function(){},i.isActive=function(){return!0},i.Ka=function(){};function ee(n,r){$.call(this),this.g=new bs(r),this.l=n,this.h=r&&r.messageUrlParams||null,n=r&&r.messageHeaders||null,r&&r.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.o=n,n=r&&r.initMessageHeaders||null,r&&r.messageContentType&&(n?n["X-WebChannel-Content-Type"]=r.messageContentType:n={"X-WebChannel-Content-Type":r.messageContentType}),r&&r.sa&&(n?n["X-WebChannel-Client-Profile"]=r.sa:n={"X-WebChannel-Client-Profile":r.sa}),this.g.U=n,(n=r&&r.Qb)&&!d(n)&&(this.g.u=n),this.A=r&&r.supportsCrossDomainXhr||!1,this.v=r&&r.sendRawJson||!1,(r=r&&r.httpSessionIdParam)&&!d(r)&&(this.g.G=r,n=this.h,n!==null&&r in n&&(n=this.h,r in n&&delete n[r])),this.j=new rt(this)}S(ee,$),ee.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ee.prototype.close=function(){Qn(this.g)},ee.prototype.o=function(n){var r=this.g;if(typeof n=="string"){var a={};a.__data__=n,n=a}else this.v&&(a={},a.__data__=xn(n),n=a);r.i.push(new ta(r.Ya++,n)),r.I==3&&on(r)},ee.prototype.N=function(){this.g.l=null,delete this.j,Qn(this.g),delete this.g,ee.Z.N.call(this)};function Fs(n){Fn.call(this),n.__headers__&&(this.headers=n.__headers__,this.statusCode=n.__status__,delete n.__headers__,delete n.__status__);var r=n.__sm__;if(r){e:{for(const a in r){n=a;break e}n=void 0}(this.i=n)&&(n=this.i,r=r!==null&&n in r?r[n]:void 0),this.data=r}else this.data=n}S(Fs,Fn);function Vs(){Vn.call(this),this.status=1}S(Vs,Vn);function rt(n){this.g=n}S(rt,xs),rt.prototype.ra=function(){W(this.g,"a")},rt.prototype.qa=function(n){W(this.g,new Fs(n))},rt.prototype.pa=function(n){W(this.g,new Vs)},rt.prototype.oa=function(){W(this.g,"b")},ee.prototype.send=ee.prototype.o,ee.prototype.open=ee.prototype.m,ee.prototype.close=ee.prototype.close,Bn.NO_ERROR=0,Bn.TIMEOUT=8,Bn.HTTP_ERROR=6,Yo.COMPLETE="complete",zo.EventType=mt,mt.OPEN="a",mt.CLOSE="b",mt.ERROR="c",mt.MESSAGE="d",$.prototype.listen=$.prototype.J,F.prototype.listenOnce=F.prototype.K,F.prototype.getLastError=F.prototype.Ha,F.prototype.getLastErrorCode=F.prototype.ya,F.prototype.getStatus=F.prototype.ca,F.prototype.getResponseJson=F.prototype.La,F.prototype.getResponseText=F.prototype.la,F.prototype.send=F.prototype.ea,F.prototype.setWithCredentials=F.prototype.Fa}).apply(typeof ln<"u"?ln:typeof self<"u"?self:typeof window<"u"?window:{});const Ir="@firebase/firestore",wr="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}z.UNAUTHENTICATED=new z(null),z.GOOGLE_CREDENTIALS=new z("google-credentials-uid"),z.FIRST_PARTY=new z("first-party-uid"),z.MOCK_USER=new z("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Kt="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut=new Si("@firebase/firestore");function ie(i,...e){if(ut.logLevel<=O.DEBUG){const t=e.map(xi);ut.debug(`Firestore (${Kt}): ${i}`,...t)}}function Po(i,...e){if(ut.logLevel<=O.ERROR){const t=e.map(xi);ut.error(`Firestore (${Kt}): ${i}`,...t)}}function _u(i,...e){if(ut.logLevel<=O.WARN){const t=e.map(xi);ut.warn(`Firestore (${Kt}): ${i}`,...t)}}function xi(i){if(typeof i=="string")return i;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(i)}catch{return i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(i,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,Ro(i,s,t)}function Ro(i,e,t){let s=`FIRESTORE (${Kt}) INTERNAL ASSERTION FAILED: ${e} (ID: ${i.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw Po(s),new Error(s)}function Mt(i,e,t,s){let o="Unexpected state";typeof t=="string"?o=t:s=t,i||Ro(e,o,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class N extends we{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class yu{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(z.UNAUTHENTICATED))}shutdown(){}}class Iu{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class wu{constructor(e){this.t=e,this.currentUser=z.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Mt(this.o===void 0,42304);let s=this.i;const o=w=>this.i!==s?(s=this.i,t(w)):Promise.resolve();let c=new Ut;this.o=()=>{this.i++,this.currentUser=this.u(),c.resolve(),c=new Ut,e.enqueueRetryable(()=>o(this.currentUser))};const h=()=>{const w=c;e.enqueueRetryable(async()=>{await w.promise,await o(this.currentUser)})},_=w=>{ie("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=w,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit(w=>_(w)),setTimeout(()=>{if(!this.auth){const w=this.t.getImmediate({optional:!0});w?_(w):(ie("FirebaseAuthCredentialsProvider","Auth not yet detected"),c.resolve(),c=new Ut)}},0),h()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(s=>this.i!==e?(ie("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Mt(typeof s.accessToken=="string",31837,{l:s}),new ko(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Mt(e===null||typeof e=="string",2055,{h:e}),new z(e)}}class Eu{constructor(e,t,s){this.P=e,this.T=t,this.I=s,this.type="FirstParty",this.user=z.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class vu{constructor(e,t,s){this.P=e,this.T=t,this.I=s}getToken(){return Promise.resolve(new Eu(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(z.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Er{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Tu{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Y(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Mt(this.o===void 0,3512);const s=c=>{c.error!=null&&ie("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${c.error.message}`);const h=c.token!==this.m;return this.m=c.token,ie("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?t(c.token):Promise.resolve()};this.o=c=>{e.enqueueRetryable(()=>s(c))};const o=c=>{ie("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=c,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(c=>o(c)),setTimeout(()=>{if(!this.appCheck){const c=this.V.getImmediate({optional:!0});c?o(c):ie("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Er(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Mt(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Er(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Au(i){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(i);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<i;s++)t[s]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const o=Au(40);for(let c=0;c<o.length;++c)s.length<20&&o[c]<t&&(s+=e.charAt(o[c]%62))}return s}}function xe(i,e){return i<e?-1:i>e?1:0}function bu(i,e){const t=Math.min(i.length,e.length);for(let s=0;s<t;s++){const o=i.charAt(s),c=e.charAt(s);if(o!==c)return hi(o)===hi(c)?xe(o,c):hi(o)?1:-1}return xe(i.length,e.length)}const Cu=55296,Pu=57343;function hi(i){const e=i.charCodeAt(0);return e>=Cu&&e<=Pu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr="__name__";class ce{constructor(e,t,s){t===void 0?t=0:t>e.length&&Bt(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&Bt(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return ce.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ce?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let o=0;o<s;o++){const c=ce.compareSegments(e.get(o),t.get(o));if(c!==0)return c}return xe(e.length,t.length)}static compareSegments(e,t){const s=ce.isNumericId(e),o=ce.isNumericId(t);return s&&!o?-1:!s&&o?1:s&&o?ce.extractNumericId(e).compare(ce.extractNumericId(t)):bu(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ui.fromString(e.substring(4,e.length-2))}}class te extends ce{construct(e,t,s){return new te(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new N(k.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(o=>o.length>0))}return new te(t)}static emptyPath(){return new te([])}}const Ru=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ze extends ce{construct(e,t,s){return new ze(e,t,s)}static isValidIdentifier(e){return Ru.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ze.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===vr}static keyField(){return new ze([vr])}static fromServerFormat(e){const t=[];let s="",o=0;const c=()=>{if(s.length===0)throw new N(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let h=!1;for(;o<e.length;){const _=e[o];if(_==="\\"){if(o+1===e.length)throw new N(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const w=e[o+1];if(w!=="\\"&&w!=="."&&w!=="`")throw new N(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=w,o+=2}else _==="`"?(h=!h,o++):_!=="."||h?(s+=_,o++):(c(),o++)}if(c(),h)throw new N(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ze(t)}static emptyPath(){return new ze([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this.path=e}static fromPath(e){return new qe(te.fromString(e))}static fromName(e){return new qe(te.fromString(e).popFirst(5))}static empty(){return new qe(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new qe(new te(e.slice()))}}function ku(i,e,t,s){if(e===!0&&s===!0)throw new N(k.INVALID_ARGUMENT,`${i} and ${t} cannot be used together.`)}function Nu(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}function Ou(i){if(i===void 0)return"undefined";if(i===null)return"null";if(typeof i=="string")return i.length>20&&(i=`${i.substring(0,20)}...`),JSON.stringify(i);if(typeof i=="number"||typeof i=="boolean")return""+i;if(typeof i=="object"){if(i instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(i);return e?`a custom ${e} object`:"an object"}}return typeof i=="function"?"a function":Bt(12329,{type:typeof i})}function Du(i,e){if("_delegate"in i&&(i=i._delegate),!(i instanceof e)){if(e.name===i.constructor.name)throw new N(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ou(i);throw new N(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return i}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(i,e){const t={typeString:i};return e&&(t.value=e),t}function Jt(i,e){if(!Nu(i))throw new N(k.INVALID_ARGUMENT,"JSON must be an object");let t;for(const s in e)if(e[s]){const o=e[s].typeString,c="value"in e[s]?{value:e[s].value}:void 0;if(!(s in i)){t=`JSON missing required field: '${s}'`;break}const h=i[s];if(o&&typeof h!==o){t=`JSON field '${s}' must be a ${o}.`;break}if(c!==void 0&&h!==c.value){t=`Expected '${s}' field to equal '${c.value}'`;break}}if(t)throw new N(k.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr=-62135596800,Ar=1e6;class he{static now(){return he.fromMillis(Date.now())}static fromDate(e){return he.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*Ar);return new he(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Tr)throw new N(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ar}_compareTo(e){return this.seconds===e.seconds?xe(this.nanoseconds,e.nanoseconds):xe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:he._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Jt(e,he._jsonSchema))return new he(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Tr;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}he._jsonSchemaVersion="firestore/timestamp/1.0",he._jsonSchema={type:j("string",he._jsonSchemaVersion),seconds:j("number"),nanoseconds:j("number")};function Lu(i){return i.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(o){try{return atob(o)}catch(c){throw typeof DOMException<"u"&&c instanceof DOMException?new Mu("Invalid base64 string: "+c):c}}(e);return new et(t)}static fromUint8Array(e){const t=function(o){let c="";for(let h=0;h<o.length;++h)c+=String.fromCharCode(o[h]);return c}(e);return new et(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let o=0;o<t.length;o++)s[o]=t.charCodeAt(o);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return xe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}et.EMPTY_BYTE_STRING=new et("");const Ei="(default)";class Sn{constructor(e,t){this.projectId=e,this.database=t||Ei}static empty(){return new Sn("","")}get isDefaultDatabase(){return this.database===Ei}isEqual(e){return e instanceof Sn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e,t=null,s=[],o=[],c=null,h="F",_=null,w=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=o,this.limit=c,this.limitType=h,this.startAt=_,this.endAt=w,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function xu(i){return new Uu(i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Sr,R;(R=Sr||(Sr={}))[R.OK=0]="OK",R[R.CANCELLED=1]="CANCELLED",R[R.UNKNOWN=2]="UNKNOWN",R[R.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",R[R.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",R[R.NOT_FOUND=5]="NOT_FOUND",R[R.ALREADY_EXISTS=6]="ALREADY_EXISTS",R[R.PERMISSION_DENIED=7]="PERMISSION_DENIED",R[R.UNAUTHENTICATED=16]="UNAUTHENTICATED",R[R.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",R[R.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",R[R.ABORTED=10]="ABORTED",R[R.OUT_OF_RANGE=11]="OUT_OF_RANGE",R[R.UNIMPLEMENTED=12]="UNIMPLEMENTED",R[R.INTERNAL=13]="INTERNAL",R[R.UNAVAILABLE=14]="UNAVAILABLE",R[R.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Ui([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vu=1048576;function li(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e,t,s=1e3,o=1.5,c=6e4){this.Mi=e,this.timerId=t,this.d_=s,this.A_=o,this.R_=c,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),s=Math.max(0,Date.now()-this.f_),o=Math.max(0,t-s);o>0&&ie("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,o,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e,t,s,o,c){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=o,this.removalCallback=c,this.deferred=new Ut,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(h=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,o,c){const h=Date.now()+s,_=new Fi(e,t,h,o,c);return _.start(s),_}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var br,Cr;(Cr=br||(br={})).Ma="default",Cr.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bu(i){const e={};return i.timeoutSeconds!==void 0&&(e.timeoutSeconds=i.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No="firestore.googleapis.com",Rr=!0;class kr{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new N(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=No,this.ssl=Rr}else this.host=e.host,this.ssl=e.ssl??Rr;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Fu;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Vu)throw new N(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ku("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Bu(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new N(k.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new N(k.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new N(k.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,o){return s.timeoutSeconds===o.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Oo{constructor(e,t,s,o){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new kr({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new kr(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new yu;switch(s.type){case"firstParty":return new vu(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new N(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=Pr.get(t);s&&(ie("ComponentProvider","Removing Datastore"),Pr.delete(t),s.terminate())}(this),Promise.resolve()}}function Hu(i,e,t,s={}){var v;i=Du(i,Oo);const o=dt(e),c=i._getSettings(),h={...c,emulatorOptions:i._getEmulatorOptions()},_=`${e}:${t}`;o&&(Ti(`https://${_}`),Ai("Firestore",!0)),c.host!==No&&c.host!==_&&_u("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const w={...c,host:_,ssl:o,emulatorOptions:s};if(!Xe(w,h)&&(i._setSettings(w),s.mockUserToken)){let b,S;if(typeof s.mockUserToken=="string")b=s.mockUserToken,S=z.MOCK_USER;else{b=Sa(s.mockUserToken,(v=i._app)==null?void 0:v.options.projectId);const A=s.mockUserToken.sub||s.mockUserToken.user_id;if(!A)throw new N(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");S=new z(A)}i._authCredentials=new Iu(new ko(b,S))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Vi(this.firestore,e,this._query)}}class le{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ji(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new le(this.firestore,e,this._key)}toJSON(){return{type:le._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(Jt(t,le._jsonSchema))return new le(e,s||null,new qe(te.fromString(t.referencePath)))}}le._jsonSchemaVersion="firestore/documentReference/1.0",le._jsonSchema={type:j("string",le._jsonSchemaVersion),referencePath:j("string")};class ji extends Vi{constructor(e,t,s){super(e,t,xu(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new le(this.firestore,null,new qe(e))}withConverter(e){return new ji(this.firestore,e,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nr="AsyncQueue";class Or{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ju(this,"async_queue_retry"),this._c=()=>{const s=li();s&&ie(Nr,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const t=li();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=li();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Ut;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Lu(e))throw e;ie(Nr,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(s=>{throw this.nc=s,this.rc=!1,Po("INTERNAL UNHANDLED ERROR: ",Dr(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=t,t}enqueueAfterDelay(e,t,s){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const o=Fi.createAndSchedule(this,e,t,s,c=>this.hc(c));return this.tc.push(o),o}uc(){this.nc&&Bt(47125,{Pc:Dr(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,s)=>t.targetTimeMs-s.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Dr(i){let e=i.message||"";return i.stack&&(e=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),e}class $u extends Oo{constructor(e,t,s,o){super(e,t,s,o),this.type="firestore",this._queue=new Or,this._persistenceKey=(o==null?void 0:o.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Or(e),this._firestoreClient=void 0,await e}}}function ed(i,e){const t=typeof i=="object"?i:Ci(),s=typeof i=="string"?i:Ei,o=bn(t,"firestore").getImmediate({identifier:s});if(!o._initialized){const c=Vr("firestore");c&&Hu(o,...c)}return o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new pe(et.fromBase64String(e))}catch(t){throw new N(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new pe(et.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:pe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Jt(e,pe._jsonSchema))return pe.fromBase64String(e.bytes)}}pe._jsonSchemaVersion="firestore/bytes/1.0",pe._jsonSchema={type:j("string",pe._jsonSchemaVersion),bytes:j("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ze(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return xe(this._lat,e._lat)||xe(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ke._jsonSchemaVersion}}static fromJSON(e){if(Jt(e,Ke._jsonSchema))return new Ke(e.latitude,e.longitude)}}Ke._jsonSchemaVersion="firestore/geoPoint/1.0",Ke._jsonSchema={type:j("string",Ke._jsonSchemaVersion),latitude:j("number"),longitude:j("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,o){if(s.length!==o.length)return!1;for(let c=0;c<s.length;++c)if(s[c]!==o[c])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Je._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Jt(e,Je._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Je(e.vectorValues);throw new N(k.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Je._jsonSchemaVersion="firestore/vectorValue/1.0",Je._jsonSchema={type:j("string",Je._jsonSchemaVersion),vectorValues:j("object")};const Wu=new RegExp("[~\\*/\\[\\]]");function Gu(i,e,t){if(e.search(Wu)>=0)throw Lr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,i);try{return new Do(...e.split("."))._internalPath}catch{throw Lr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,i)}}function Lr(i,e,t,s,o){let c=`Function ${e}() called with invalid data`;c+=". ";let h="";return new N(k.INVALID_ARGUMENT,c+i+h)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{constructor(e,t,s,o,c){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=o,this._converter=c}get id(){return this._key.path.lastSegment()}get ref(){return new le(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new zu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Mo("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class zu extends Lo{data(){return super.data()}}function Mo(i,e){return typeof e=="string"?Gu(i,e):e instanceof Do?e._internalPath:e._delegate._internalPath}class un{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class lt extends Lo{constructor(e,t,s,o,c,h){super(e,t,s,o,h),this._firestore=e,this._firestoreImpl=e,this.metadata=c}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new mn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(Mo("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=lt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}lt._jsonSchemaVersion="firestore/documentSnapshot/1.0",lt._jsonSchema={type:j("string",lt._jsonSchemaVersion),bundleSource:j("string","DocumentSnapshot"),bundleName:j("string"),bundle:j("string")};class mn extends lt{data(e={}){return super.data(e)}}class xt{constructor(e,t,s,o){this._firestore=e,this._userDataWriter=t,this._snapshot=o,this.metadata=new un(o.hasPendingWrites,o.fromCache),this.query=s}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new mn(this._firestore,this._userDataWriter,s.key,s,new un(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(o,c){if(o._snapshot.oldDocs.isEmpty()){let h=0;return o._snapshot.docChanges.map(_=>{const w=new mn(o._firestore,o._userDataWriter,_.doc.key,_.doc,new un(o._snapshot.mutatedKeys.has(_.doc.key),o._snapshot.fromCache),o.query.converter);return _.doc,{type:"added",doc:w,oldIndex:-1,newIndex:h++}})}{let h=o._snapshot.oldDocs;return o._snapshot.docChanges.filter(_=>c||_.type!==3).map(_=>{const w=new mn(o._firestore,o._userDataWriter,_.doc.key,_.doc,new un(o._snapshot.mutatedKeys.has(_.doc.key),o._snapshot.fromCache),o.query.converter);let v=-1,b=-1;return _.type!==0&&(v=h.indexOf(_.doc.key),h=h.delete(_.doc.key)),_.type!==1&&(h=h.add(_.doc),b=h.indexOf(_.doc.key)),{type:qu(_.type),doc:w,oldIndex:v,newIndex:b}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=xt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Su.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],s=[],o=[];return this.docs.forEach(c=>{c._document!==null&&(t.push(c._document),s.push(this._userDataWriter.convertObjectMap(c._document.data.value.mapValue.fields,"previous")),o.push(c.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function qu(i){switch(i){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Bt(61501,{type:i})}}xt._jsonSchemaVersion="firestore/querySnapshot/1.0",xt._jsonSchema={type:j("string",xt._jsonSchemaVersion),bundleSource:j("string","QuerySnapshot"),bundleName:j("string"),bundle:j("string")};(function(e,t=!0){(function(o){Kt=o})(ft),Ye(new Ue("firestore",(s,{instanceIdentifier:o,options:c})=>{const h=s.getProvider("app").getImmediate(),_=new $u(new wu(s.getProvider("auth-internal")),new Tu(h,s.getProvider("app-check-internal")),function(v,b){if(!Object.prototype.hasOwnProperty.apply(v.options,["projectId"]))throw new N(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Sn(v.options.projectId,b)}(h,o),h);return c={useFetchStreams:t,...c},_._setSettings(c),_},"PUBLIC").setMultipleInstances(!0)),ue(Ir,wr,e),ue(Ir,wr,"esm2020")})();export{Zu as a,ed as b,Ju as c,Ku as d,Qu as g,jc as i,Xu as o,Yu as s};
//# sourceMappingURL=firebase-DMVBnuN8.js.map
