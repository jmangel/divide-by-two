if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return r[e]||(i=new Promise((async i=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},i=(i,r)=>{Promise.all(i.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(i)};self.define=(i,c,s)=>{r[i]||(r[i]=Promise.resolve().then((()=>{let r={};const a={uri:location.origin+i.slice(1)};return Promise.all(c.map((i=>{switch(i){case"exports":return r;case"module":return a;default:return e(i)}}))).then((e=>{const i=s(...e);return r.default||(r.default=i),r}))})))}}define("./service-worker.js",["./workbox-15dd0bab"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"1.js",revision:"2ee04cbeb4faf9a959dc2dc15cb4cc79"},{url:"MetronomeWebWorker.worker.js",revision:"2053b5e554675d03a426b39826303c31"},{url:"index.html",revision:"f4cf1ca31648f30b015c7da00d7c1fa9"},{url:"main.js",revision:"b9c5319af39baa36fc80d5f767f243b2"},{url:"src/styles/Global.css",revision:"5f87e556b7af100d5f09cd047127b73d"},{url:"static/AudioClips/high_click.mp3",revision:"e9f7661ad252d35d38c620d174cda043"},{url:"static/AudioClips/low_click.mp3",revision:"9a2cc094bc17451563eafd7e1ad9d160"},{url:"static/img/circle-resized-192.png",revision:"9841461e6677e50ba3a3143e5daf2d9a"},{url:"static/img/circle-resized-512.png",revision:"b627d4bcce220eecd9aac80b1700c526"},{url:"static/img/icon-192px.png",revision:"c75cf71bbdcccbc19d41e8c49cbb9753"},{url:"static/img/icon-512px.png",revision:"39d71ce57eab09cbd80268770a99a02b"},{url:"static/img/maskable_icon.png",revision:"7f967c140e69fd341f3446809da1b3bd"},{url:"static/img/maskable_icon_x512.png",revision:"a26f7e09d83eb34f33a0034318033090"},{url:"static/manifest.json",revision:"a375434bea185ad2bef4f6941c29d770"}],{ignoreURLParametersMatching:[/.*/]})}));
