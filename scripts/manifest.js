var manifest = {
  'Global': [
    '=自定义扩展=',
    'Global.typeOf',
    'Global.execScript',
    'Global.getNamespace',
    '=模块化=',
    'Global.declareModule',
    'Global.runApplication',
    '=执行代码块=',
    'Global.execute'
  ],
  'Object': [
    '=ES5=',
    'Object.keys',
    '=自定义扩展=',
    'Object.forEach',
    'Object.clone',
    'Object.mixin'
  ],
  'Function': [
    '=ES5=',
    'Function#bind'
  ],
  'Array': [
    '=ES5=',
    'Array.isArray',
    'Array#indexOf',
    'Array#lastIndexOf',
    'Array#every',
    'Array#some',
    'Array#forEach',
    'Array#map',
    'Array#filter',
//    'Array#reduce',
//    'Array#reduceRight',
    '=自定义扩展=',
    'Array.from',
    'Array#contains',
    'Array#remove',
    'Array#getFirst',
    'Array#getLast'
  ],
  'String': [
    '=ES5=',
    'String#trim',
    'String#toJSON',
    '=ES6=',
    'String#repeat',
    'String#startsWith',
    'String#endsWith',
    'String#contains',
    'String#toArray',
    '=自定义扩展=',
    'String#clean',
    'String#camelize',
    'String#dasherize'
  ],
  'Boolean': [
    '=ES5=',
    'Boolean#toJSON'
  ],
  'Number': [
    '=ES5=',
    'Number#toJSON',
    '=ES6=',
    'Number.isFinite',
    'Number.isNaN',
    'Number.isInteger',
    'Number.toInteger',
    '=自定义扩展=',
    'Number#padZero'
  ],
  'Math': [
    '=自定义扩展=',
    'Math.limit',
    'Math.randomRange'
  ],
  'Date': [
    '=ES5=',
    'Date.now',
    'Date#toJSON',
    '=自定义扩展=',
    'Date.from',
    'Date#format'
  ],
  'RegExp': [
    '=自定义扩展=',
    'RegExp.escape'
  ],
  'JSON': [
    '=ES5=',
    'JSON.parse',
    'JSON.stringify'
  ],
  'navigator': [
    '=从 UA 中得到的结果(仅供参考)=',
    'navigator.userAgentInfo.engine',
    'navigator.userAgentInfo.name',
    'navigator.userAgentInfo.version',
    '=特性判断得到的结果(准确)=',
    'navigator.inStandardsMode',
    'navigator.isIE10',
    'navigator.isIElt10',
    'navigator.isIE9',
    'navigator.isIElt9',
    'navigator.isIE8',
    'navigator.isIElt8',
    'navigator.isIE7',
    'navigator.isIE6',
    'navigator.isFirefox',
    'navigator.isChrome',
    'navigator.isSafari',
    'navigator.isOpera'
  ],
  'location': [
    '=自定义扩展=',
    'location.parameters'
  ],
  'cookie': [
    '=自定义扩展=',
    'cookie.getItem',
    'cookie.setItem',
    'cookie.removeItem'
  ],
  'localStorage': [
    '=HTML5=',
    'localStorage.getItem',
    'localStorage.setItem',
    'localStorage.removeItem',
    'localStorage.clear'
  ],
  'window': [
    '=获取和创建元素=',
    'window.$',
    '=获取视口信息=',
    'window.getClientSize',
    'window.getScrollSize',
    'window.getPageOffset',
    '=处理事件=',
    'window.on',
    'window.off',
    'window.fire'
  ],
  'document': [
    '=HTML5=',
    'document.head',
    '=获取和创建元素=',
    'document.$',
    '=处理事件=',
    'document.on',
    'document.off',
    'document.fire',
    '=自定义扩展=',
    'document.addStyleRules',
    'document.loadScript',
    'document.preloadImages'
  ],
  'Element': [
    '=处理类=',
    'Element#hasClass',
    'Element#addClass',
    'Element#removeClass',
    'Element#toggleClass',
    '=处理样式=',
    'Element#getStyle',
    'Element#getStyles',
    'Element#setStyle',
    'Element#setStyles',
    '=处理自定义数据=',
    'Element#getData',
    'Element#setData',
    'Element#removeData',
    '=获取坐标信息=',
    'Element#getClientRect',
    '=比较位置关系=',
    'Element#compareDocumentPosition',
    'Element#contains',
    '=获取相关元素=',
    'Element#find',
    'Element#getParent',
    'Element#getPreviousSibling',
    'Element#getNextSibling',
    'Element#getFirstChild',
    'Element#getLastChild',
    'Element#getChildren',
    'Element#getChildCount',
    '=克隆元素=',
    'Element#clone',
    '=修改内容或位置=',
    'Element#innerHTML',
    'Element#outerHTML',
    'Element#innerText',
    'Element#outerText',
    'Element#insertAdjacentHTML',
    'Element#insertAdjacentText',
    'Element#insertAdjacentElement',
    'Element#insertTo',
    'Element#swap',
    'Element#replace',
    'Element#remove',
    'Element#empty',
    '=处理事件=',
    'Element#on',
    'Element#off',
    'Element#fire',
    '=动画效果=',
    'Element#morph',
    'Element#highlight',
    'Element#fade',
    'Element#cancelAnimation'
  ],
  'HTMLFormElement': [
    '=自定义扩展=',
    'HTMLFormElement#getFieldValue',
    'HTMLFormElement#setValidationRules'
  ],
  'Event': [
    '=自定义扩展=',
    'Event#originalEvent',
    'Event#type',
    'Event#isMouseEvent',
    'Event#isKeyboardEvent',
    'Event#bubbles',
    'Event#target',
    'Event#relatedTarget',
    'Event#timeStamp',
    'Event#ctrlKey',
    'Event#altKey',
    'Event#shiftKey',
    'Event#metaKey',
    'Event#clientX',
    'Event#clientY',
    'Event#screenX',
    'Event#screenY',
    'Event#pageX',
    'Event#pageY',
    'Event#offsetX',
    'Event#offsetY',
    'Event#leftButton',
    'Event#middleButton',
    'Event#rightButton',
    'Event#wheelUp',
    'Event#wheelDown',
    'Event#which',
    '=DOM3=',
    'Event#isPropagationStopped',
    'Event#isDefaultPrevented',
    'Event#isImmediatePropagationStopped',
    'Event#stopPropagation',
    'Event#preventDefault',
    'Event#stopImmediatePropagation'
  ],
  'Configurable': [
    '=可配置的=',
    'Configurable',
    '=将此特性应用到目标对象=',
    'Configurable.applyTo',
    '=具备此特性的对象即具备更改配置的能力=',
    'Configurable#setConfig'
  ],
  'Observable': [
    '=可观察的=',
    'Observable',
    '=将此特性应用到目标对象=',
    'Observable.applyTo',
    '=具备此特性的对象即具备处理事件的能力=',
    'Observable#on',
    'Observable#off',
    'Observable#fire'
  ],
  'Component': [
    '=组件构造器=',
    'Component'
  ],
  'Animation': [
    'Animation',
    'Animation#addClip',
    'Animation#play',
    'Animation#reverse',
    'Animation#pause',
    'Animation#stop',
    'Animation.createBasicRenderer',
    'Animation.createStyleRenderer'
  ],
  'Request': [
    'Request',
    'Request.config',
    'Request#send',
    'Request#abort'
  ],
  'Switcher': [
    'Switcher',
    'Switcher#spliceItems',
    'Switcher#activate'
  ],
  'Widget': [
    'Widget.register',
    'Widget.parse'
  ],
  '多页标签面板': [
    'TabPanel',
    'TabPanel#tabs',
    'TabPanel#panels',
    'TabPanel#activeTab',
    'TabPanel#activePanel',
    'TabPanel#activate'
  ],
  'Slideshow': [
    'Slideshow',
    'Slideshow.config',
    'Slideshow#show'
  ],
  '模态对话框': [
    'Dialog',
    'Dialog#isOpen',
    'Dialog#open',
    'Dialog#close',
    'Dialog#reposition'
  ],
  '分页导航条': [
    'Paginator',
    'Paginator#totalPage',
    'Paginator#currentPage',
    'Paginator#turn',
    'Paginator#render'
  ],
  'Calendar': [
    'Calendar',
    'Calendar.config',
    'Calendar#getElement',
    'Calendar#render'
  ]
};
