/**
 * @fileOverview Widget - 多页标签面板
 * @author sundongguo@gmail.com
 * @version 20121008
 */

(function() {
//==================================================[Widget - 多页标签面板]
//--------------------------------------------------[TabPanel]
  /**
   * 多页标签面板。
   * @name TabPanel
   * @constructor
   * @attribute data-hover-delay
   *   指定以毫秒为单位的“标签”鼠标悬停激活延时。
   *   如果指定本属性，则启用鼠标悬停激活（建议设置为 '200' - '400' 之间的数值）。
   *   如果不指定本属性，则由鼠标点击激活。
   * @fires activate
   *   {Element} activeTab 当前的激活的“标签”。
   *   {Element} activePanel 当前的激活的“面板”。
   *   {Element} inactiveTab 上一个激活的“标签”。
   *   {Element} inactivePanel 上一个激活的“面板”。
   *   成功调用 activate 方法后触发。
   * @description
   *   “标签面板”其实是“标签”和“面板”的配对组合：每一个“标签”都对应唯一一个“面板”。
   *   用户可以通过激活一个“标签”来查看其对应的“面板”中包含的内容。同一时刻只有一组“标签面板”能够被激活，默认是第一组。
   *   <strong>启用方式：</strong>
   *   为元素添加 'widget-tabpanel' 类，即可使该元素成为多页标签面板。
   *   <strong>结构约定：</strong>
   *   多页标签面板的后代元素中，类名包含 'tab' 的为“标签”，类名包含 'panel' 的为“面板”。
   *   “标签”和“面板”必须按顺序一一对应。一个“标签”和一个“面板”组成一组“标签面板”。
   *   <strong>新增行为：</strong>
   *   当一个标签被点击（或在鼠标移入标签范围内到达指定的时间）时，这个“标签”所属的“标签面板”会被激活，被激活的“标签”和“面板”会被自动加入 'active' 类。
   *   <strong>默认样式：</strong>
   *   <pre class="lang-css">
   *   .widget-tabpanel { display: block; }
   *   .widget-tabpanel .panel { display: none; }
   *   .widget-tabpanel .active { display: block; }
   *   </pre>
   */

  /**
   * 包含所有“标签”元素的数组。
   * @name TabPanel#tabs
   * @type Array
   */

  /**
   * 包含所有“面板”元素的数组。
   * @name TabPanel#panels
   * @type Array
   */

  /**
   * 当前被激活的“标签”元素。
   * @name TabPanel#activeTab
   * @type Element
   */

  /**
   * 当前被激活的“面板”元素。
   * @name TabPanel#activePanel
   * @type Element
   */

  /**
   * 激活一组“标签面板”。
   * @name TabPanel#activate
   * @function
   * @param {Element} tab 要激活的“标签面板”中的“标签”元素。
   * @returns {Element} 本元素。
   * @description
   *   如果指定的值不是“标签”元素或者该标签已在激活状态，则调用此方法无效。
   */

  Widget.register('tabpanel', {
    css: [
      '.widget-tabpanel { display: block; }',
      '.widget-tabpanel .panel { display: none; }',
      '.widget-tabpanel .active { display: block; }'
    ],
    config: {
      hoverDelay: NaN
    },
    methods: {
      activate: function(tab) {
        if (tab !== this.activeTab) {
          var index = this.tabs.indexOf(tab);
          if (index !== -1) {
            var inactiveTab = this.activeTab;
            if (inactiveTab) {
              inactiveTab.removeClass('active');
            }
            var inactivePanel = this.activePanel;
            if (inactivePanel) {
              inactivePanel.removeClass('active');
            }
            var activeTab = this.activeTab = tab.addClass('active');
            var activePanel = this.activePanel = this.panels[index].addClass('active');
            this.fire('activate', {
              activeTab: activeTab,
              activePanel: activePanel,
              inactiveTab: inactiveTab,
              inactivePanel: inactivePanel
            });
          }
        }
        return this;
      }
    },
    events: ['activate'],
    initialize: function() {
      var $element = this;

      // 保存属性。
      Object.mixin($element, {
        tabs: $element.find('.tab'),
        panels: $element.find('.panel'),
        activeTab: null,
        activePanel: null
      });

      // 通过点击或指向“标签”激活对应的“标签面板”。
      var timer;
      $element
          .on('click:relay(.tab).tabpanel', function(event) {
            if ($element.tabs.contains(this)) {
              $element.activate(this);
              // 避免在 IE 中触发 beforeunload 事件，以及链接点击成功后可能出现的音效。
              event.preventDefault();
            }
          })
          .on('mouseenter:relay(.tab).tabpanel', function() {
            if (Number.isFinite($element.hoverDelay)) {
              var $tab = this;
              if (!timer) {
                timer = setTimeout(function() {
                  $element.activate($tab);
                }, $element.hoverDelay);
              }
            }
          })
          .on('mouseleave:relay(.tab).tabpanel', function() {
            if (timer) {
              clearTimeout(timer);
              timer = undefined;
            }
          });

      // 默认激活第一组。
      $element.activate($element.tabs.getFirst());

    }
  });

})();
