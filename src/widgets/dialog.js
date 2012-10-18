/**
 * @fileOverview 控件 - 模态对话框。
 * @author sundongguo@gmail.com
 * @version 20120310
 */

(function() {
//==================================================[控件 - 遮盖层]
  /**
   * 遮盖层
   * @name OVERLAY
   * @namespace
   * @private
   * @description
   *   使用 INS[widget=overlay] 元素来表示一个遮盖层。
   *   遮盖层用于遮盖模态对话框下边、其父元素内的其他内容。当其父元素为 BODY 时，将覆盖整个视口。
   *   遮盖层在显示/隐藏时是否使用动画取决于调用它的对话框是否启用了动画。
   *   需要定义其他的样式时，可以通过 CSS 进行修改，或者直接修改遮盖层元素的 style 属性。
   *   Method:
   *     behind 指定要将遮盖层置于哪个对话框元素之下。
   *     参数：
   *       {Element} [$dialog] 要将遮盖层置于其后的对话框元素。如果省略此参数，则隐藏遮盖层。
   *     返回值：
   *       {Element} 本元素。
   *     resize 调整遮盖层尺寸。
   *     返回值：
   *       {Element} 本元素。
   *
   *   问题：
   *     IE6 下当 HTML 元素设置了非正常的背景图片（找不到图片或 about:blank）时，IFRAME 无法一直遮盖 SELECT 元素，窗口滚动后 SELECT 即再次显示在最前，但若此时 position: fixed 的表达式启用则无此问题。
   *     这个问题会在页面有设置了 "display: none; position: fixed;" 的元素，且欲覆盖区域不是 BODY，但其中有 SELECT 元素时出现。
   *     上述情况很少见，因此未处理此问题。
   *     如果需要处理，去掉 IE6 fixed positioned 相关代码中的“启用/禁用表达式”部分即可。
   *   参考：
   *     http://w3help.org/zh-cn/causes/RM8015
   */

//--------------------------------------------------[CSSRules]
  document.addStyleRules([
    'INS[widget=overlay] { display: none; left: 0; top: 0; background-color: black; opacity: 0.2; filter: alpha(opacity=20); }'
  ]);

//--------------------------------------------------[freezeFocusArea]
  // 限定不可聚焦的区域。参数 config 包含 enable 和 disable 两个元素。如果省略此参数，则取消限定。
  var $before;
  var $after;
  var $enabled;
  var $disabled;
  var focusedByUser = true;
  var freezeFocusArea = function(config) {
    if (config) {
      var $enable = $(config.enable);
      var $disable = $(config.disable);
      // 将两个辅助文本框固定定位，以免在切换焦点时发生滚动。
      $before = $before || $('<input type="text" readonly style="position: fixed; top: 0; left: -10000px; -position: absolute;">')
          .on('focus', function() {
            if (focusedByUser) {
              focusedByUser = false;
              $after.focus();
            } else {
              focusedByUser = true;
            }
          })
          .on('keydown', function(event) {
            if (event.which === 9 && event.shiftKey) {
              this.fire('focus');
              return false;
            }
          });
      $after = $after || $('<input type="text" readonly style="position: fixed; top: 0; left: -10000px; -position: absolute;">')
          .on('focus', function() {
            if (focusedByUser) {
              focusedByUser = false;
              $before.focus();
            } else {
              focusedByUser = true;
            }
          })
          .on('keydown', function(event) {
            if (event.which === 9 && !event.shiftKey) {
              this.fire('focus');
              return false;
            }
          });
      if ($enable !== $enabled) {
        if ($disabled) {
          $disabled.off('focusin.freezeFocusArea');
        }
        $disable.on('focusin.freezeFocusArea', function(event) {
          // 要判断 $after 此时是否可见，在点击某元素导致对话框关闭时，对话框是先隐藏，然后才执行到这里。
          if (!$enable.contains(event.target) && $after.offsetWidth) {
            $after.focus();
          }
        });
        $before.insertTo($enable, 'top');
        $after.insertTo($enable, 'bottom').fire('focus');
        $enabled = $enable;
        $disabled = $disable;
      }
    } else {
      if ($disabled) {
        $disabled.off('focusin.freezeFocusArea');
        if ($before) {
          $before.remove(true);
        }
        if ($after) {
          $after.remove(true);
        }
        $enabled = $disabled = null;
      }
    }
  };

//--------------------------------------------------[Widget.parsers.overlay]
  Widget.parsers.overlay = function($element) {
    // 保存属性。
    var $context = $element.context = $element.getParent();
    $element.isVisible = false;

    // 设置样式及内部结构。
    var contextIsBody = $context === document.body;
    $element.setStyles({position: contextIsBody ? 'fixed' : 'absolute'});
    if (navigator.isIE6) {
      // IE6 使用 IFRAME 元素遮盖 SELECT 元素，在其上覆盖一个 DIV 元素是为了避免鼠标在遮盖范围内点击时触发元素在本文档之外。
      $element.innerHTML = '<iframe frameborder="no" scrolling="no" style="display: block; width: 100%; height: 100%; filter: alpha(opacity=0);"></iframe><div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: white; filter: alpha(opacity=0);"></div>';
      $element.iframeOverlay = $element.getFirstChild();
      $element.divOverlay = $element.getLastChild();
      // IE6 BODY 的遮盖层在更改视口尺寸时需要调整尺寸。
      if (contextIsBody) {
        $element.resizeInIE6 = function() {
          $element.resize();
        };
      }
    }

  };

//--------------------------------------------------[Widget.parsers.overlay.methods]
  Widget.parsers.overlay.methods = {
    reposition: function() {
      var $dialog = this.context.dialogs.getLast();
      if ($dialog) {
        this.setStyle('zIndex', $dialog.getStyle('zIndex') - 1);
        if (!this.isVisible) {
          if (this.resizeInIE6) {
            window.attachEvent('onresize', this.resizeInIE6);
          }
          this.fade('in', {duration: 100, timingFunction: 'easeOut'});
          this.isVisible = true;
          this.resize();
        }
        freezeFocusArea({enable: $dialog, disable: this.context});
      } else {
        if (this.isVisible) {
          if (this.resizeInIE6) {
            window.detachEvent('onresize', this.resizeInIE6);
          }
          this.fade('out', {duration: 100, timingFunction: 'easeIn'});
          this.isVisible = false;
        }
        freezeFocusArea();
      }
      return this;
    },
    resize: function() {
      if (this.isVisible) {
        var context = this.context;
        if (context === document.body) {
          // 遮盖 BODY 的情况。
          if (navigator.isIE6) {
            var clientSize = window.getClientSize();
            // 同时修改三个元素的尺寸，以避免两个子元素在纵向改变窗口大小时高度不随父元素的变化而更新。
            this.setStyles({width: clientSize.width, height: clientSize.height});
            this.iframeOverlay.setStyle('height', clientSize.height);
            this.divOverlay.setStyle('height', clientSize.height);
          } else {
            this.setStyles({right: 0, bottom: 0});
          }
        } else {
          // 其他情况。
          this.setStyles({width: context.clientWidth, height: context.clientHeight});
        }
      }
      return this;
    }
  };

})();

(function() {
//==================================================[控件 - 模态对话框]
  /**
   * 模态对话框。
   * @name DIALOG
   * @namespace
   * @description
   *   使用 INS[widget=dialog] 元素来表示一个模态对话框。
   *   当对话框弹出时，为突出对话框内容，将在对话框之下创建遮盖层，以阻止用户对遮盖部分内容的操作。
   *   遮盖层遮盖的范围为其父元素的渲染范围。
   *   如果对话框元素的父元素是 BODY，遮盖层将遮盖整个视口。
   *   对话框元素默认以其父元素为“定位参考元素”进行定位，也可以通过 data-pinned-target 属性来指定一个特定的元素。
   *   当对话框元素的父元素不是 BODY 时，应避免其父元素出现滚动条，以免对话框和遮盖层能随其内容滚动。
   *   当多个对话框有相同的父元素时，则视这些对话框为一组，一组对话框可以重叠显示。
   *   对话框的一些数据保存在其父元素中，因此不要修改对话框元素在文档树中的位置！
   *   <ul>
   *     <li>对话框的默认状态为关闭。因此对话框元素的 display 将被设置为 none。</li>
   *     <li>仅当对话框元素的定位参考元素为 BODY 时，其 position 才可以选择设置 absolute 或 fixed，其余情况均会被重设为 absolute。</li>
   *     <li>对话框元素的 zIndex 值会被自动指定。</li>
   *     <li>如果对话框元素的父元素不是 BODY 且其 position 为 static，将修改其 position 为 relative，以使其创建 stacking context。</li>
   *   </ul>
   *   Attributes：
   *     data-pinned-target (pinnedTarget) 对话框的定位参考元素。默认为父元素，可以指定为其父元素的其他后代元素的 id。
   *     data-offset-x (offsetX) 对话框的左边与其父元素的左边的横向差值。默认为 NaN，此时对话框的中心点在横向将与其父元素的中心点重合。
   *     data-offset-y (offsetY) 对话框的顶边与其父元素的顶边的纵向差值。默认为 NaN，此时对话框的中心点在纵向将与其父元素的中心点重合。
   *     data-animation (animation) 打开和关闭对话框时使用的动画效果，可选项有 'fade' 和 'slide'，默认为 'none'，即关闭动画效果。IE6 本属性无效，始终关闭动画效果。
   *   Properties：
   *     isOpen
   *   Method:
   *     open 打开对话框。如果对话框已经打开，则调用此方法无效。
   *     返回值：
   *       {Element} 本元素。
   *     close 关闭对话框。如果对话框已经关闭，则调用此方法无效。
   *     返回值：
   *       {Element} 本元素。
   *     reposition 重新定位对话框位置。如果对话框已经关闭，则调用此方法无效。
   *     返回值：
   *       {Element} 本元素。
   *   Events：
   *     open 在对话框打开时触发。
   *     close 在对话框关闭后触发。
   *     reposition 成功调用 reposition 方法后触发。
   */

//--------------------------------------------------[CSSRules]
  document.addStyleRules([
    'INS[widget=dialog] { display: none; outline: none; }'
  ]);

//--------------------------------------------------[Widget.parsers.dialog]
  Widget.parsers.dialog = function($element) {
    // 保存属性。
    var $context = $element.context = $element.getParent();
    // pinnedTarget 必须是 context 的后代元素。
    var $pinnedTarget;
    $element.pinnedTarget = ($element.pinnedTarget && ($pinnedTarget = $('#' + $element.pinnedTarget)) && $context.contains($pinnedTarget)) ? $pinnedTarget : $context;
    // IE6 不使用动画。
    if (navigator.isIE6) {
      $element.animation = 'none';
    }
    // 仅当 pinnedTarget 为 BODY 时才允许 position 设置为 fixed。
    $element.isFixedPositioned = $element.pinnedTarget === document.body && $element.getStyle('position') === 'fixed';
    // 默认状态为关闭。
    $element.isOpen = false;

    // 本对话框是 $context 中的第一个对话框。
    if (!$context.dialogs) {
      // 确保 $context 创建 stacking context。
      if ($context !== document.body && $context.getStyle('position') === 'static') {
        $context.setStyle('position', 'relative');
      }
      // 为 $context 添加遮盖层和对话框公用的属性。
      $context.dialogs = [];
      Widget.parse($context.overlay = $('<ins widget="overlay"></ins>').insertTo($context).on('click.overlay', function() {
        $context.dialogs.getLast().focus();
      }));
    }

    // 使本元素可获得焦点。
    $element.tabIndex = 0;
    if (navigator.isIElt8) {
      $element.hideFocus = true;
    }

    // 设置样式。
    // 调节对话框的位置是通过 $element 的 left 和 top 进行的，需要以像素为单位，因此先为其指定一个值，以便稍后计算位置。
    // 从 500000 开始重置 $element 的 zIndex，以供遮盖层参照（如果数字过大 Firefox 12.0 在取值时会有问题）。
    $element.setStyles({position: $element.isFixedPositioned ? 'fixed' : 'absolute', left: 0, top: 0});

  };

//--------------------------------------------------[Widget.parsers.dialog.config]
  Widget.parsers.dialog.config = {
    pinnedTarget: '',
    offsetX: NaN,
    offsetY: NaN,
    animation: 'none'
  };

//--------------------------------------------------[Widget.parsers.dialog.methods]
  Widget.parsers.dialog.methods = {
    open: function() {
      var $dialog = this;
      if (!$dialog.isOpen) {
        $dialog.fade('in', {
          duration: $dialog.animation === 'none' ? 0 : 100,
          timingFunction: 'easeOut',
          onStart: function() {
            var $context = $dialog.context;
            // 更新状态。
            $dialog.isOpen = true;
            // 添加到已打开的对话框组，并修改对话框的位置。
            $dialog.setStyle('zIndex', 500000 + $context.dialogs.push($dialog)).reposition();
            // 重新定位遮盖层。
            $context.overlay.reposition();
            // 仅父元素为 BODY 的对话框需要在改变窗口尺寸时重新调整位置（此处假定其他对话框的父元素尺寸不会变化）。
            if ($context === document.body) {
              window.on('resize.dialog_' + $dialog.uid, navigator.isIE6 ? function() {
                // 避免 IE6 的固定定位计算错误。
                setTimeout(function() {
                  $dialog.reposition();
                }, 0);
              } : function() {
                $dialog.reposition();
              });
            }
            // 触发事件。
            $dialog.fire('open');
          }
        });
        if ($dialog.animation === 'slide') {
          $dialog.setStyle('marginTop', -20).morph({marginTop: 0}, {duration: 100, timingFunction: 'easeOut'});
        }
      }
      return $dialog;
    },
    close: function() {
      var $dialog = this;
      if ($dialog.isOpen) {
        $dialog.fade('out', {
          duration: $dialog.animation === 'none' ? 0 : 100,
          timingFunction: 'easeIn',
          onFinish: function() {
            var $context = $dialog.context;
            // 更新状态。
            $dialog.isOpen = false;
            // 从已打开的对话框组中移除。
            $context.dialogs.pop();
            // 重新定位遮盖层。
            $context.overlay.reposition();
            // 删除事件监听器。
            if ($context === document.body) {
              window.off('resize.dialog_' + $dialog.uid);
            }
            // 触发事件。
            $dialog.fire('close');
          }
        });
        if ($dialog.animation === 'slide') {
          $dialog.morph({marginTop: -20}, {
            duration: 100,
            timingFunction: 'easeIn',
            onFinish: function() {
              this.setStyle('marginTop', 0)
            }
          });
        }
      }
      return $dialog;
    },
    reposition: function() {
      var $dialog = this;
      if ($dialog.isOpen) {
        var isFixedPositioned = $dialog.isFixedPositioned;
        // 获取当前位置。
        var dialogClientRect = $dialog.getClientRect();
        var currentX = dialogClientRect.left;
        var currentY = dialogClientRect.top;
        var currentWidth = dialogClientRect.width;
        var currentHeight = dialogClientRect.height;
        // 计算预期位置。
        var expectedX;
        var expectedY;
        var pinnedTargetClientRect = {};
        if (isFixedPositioned) {
          var viewportClientSize = window.getClientSize();
          pinnedTargetClientRect.left = 0;
          pinnedTargetClientRect.top = 0;
          pinnedTargetClientRect.width = viewportClientSize.width;
          pinnedTargetClientRect.height = viewportClientSize.height;
        } else {
          pinnedTargetClientRect = $dialog.pinnedTarget.getClientRect();
        }
        expectedX = pinnedTargetClientRect.left + (Number.isFinite($dialog.offsetX) ? $dialog.offsetX : (pinnedTargetClientRect.width - currentWidth) / 2);
        expectedY = pinnedTargetClientRect.top + (Number.isFinite($dialog.offsetY) ? $dialog.offsetY : (pinnedTargetClientRect.height - currentHeight) / 2);
        // 确保固定定位的对话框显示在视口内。
        if (isFixedPositioned) {
          var leftLimit = 0;
          var rightLimit = leftLimit + pinnedTargetClientRect.width;
          var topLimit = 0;
          var bottomLimit = topLimit + pinnedTargetClientRect.height;
          // 当视口尺寸不足以容纳对话框时，优先显示右上角（对话框的关闭按钮一般在右上角）。
          if (expectedX < leftLimit) {
            expectedX = leftLimit;
          }
          if (expectedX + currentWidth > rightLimit) {
            expectedX = rightLimit - currentWidth;
          }
          if (expectedY + currentHeight > bottomLimit) {
            expectedY = bottomLimit - currentHeight;
          }
          if (expectedY < topLimit) {
            expectedY = topLimit;
          }
        }
        // 设置最终位置。
        $dialog.setStyles({left: parseInt($dialog.getStyle('left'), 10) + expectedX - currentX, top: parseInt($dialog.getStyle('top'), 10) + expectedY - currentY});
        // 触发事件。
        $dialog.fire('reposition');
      }
      return $dialog;
    }
  };

//--------------------------------------------------[Widget.parsers.dialog.events]
  Widget.parsers.dialog.events = ['open', 'close', 'reposition'];

})();
