!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n,r,o,a,u,i=!1,c=0;const l=()=>6e4/a*(4/s()),s=()=>c<0?r[-c-1]:o[c%o.length],f=()=>{i&&(Date.now()>n&&(self.postMessage("tick"),c+=1,n,n+=l()),u=setTimeout(f,n-Date.now()))};self.addEventListener("message",(function(e){switch(e.data.message){case"start":u&&clearInterval(u),i=!0,a=e.data.bpm,o=e.data.rotatedClickSubdivisions,r=e.data.countInClickSubdivisions,c=-r.length,n=Date.now()+l(),f();break;case"update":a=e.data.bpm;break;case"stop":u&&clearInterval(u),i=!1,c=0}}),!1)}]);