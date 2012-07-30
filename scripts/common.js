//==================================================[页头页脚]
execute(function($) {
  // 菜单数据。
  var menuData = [
    {
      text: '简介',
      url: '/OurJS/intro/'
    },
    {
      text: '入门指南',
      url: '/OurJS/getting_started/'
    },
    {
      text: '演示',
      url: '/OurJS/demos/',
      submenu: [
        {
          text: '事件',
          url: '/OurJS/demos/event/'
        },
        {
          text: '动画',
          url: '/OurJS/demos/animation/'
        },
        {
          text: 'Ajax',
          url: '/OurJS/demos/request/'
        },
        {
          text: '存储',
          url: '/OurJS/demos/storage/'
        },
        {
          text: '浏览器信息',
          url: '/OurJS/demos/navigator/'
        }
      ]
    },
    {
      text: 'UI 组件',
      url: '/OurJS/components/',
      submenu: [
        {
          text: '标签面板',
          url: '/OurJS/components/tabpanel/'
        },
        {
          text: '幻灯片播放',
          url: '/OurJS/components/slideshow/'
        },
        {
          text: '模态对话框',
          url: '/OurJS/components/dialog/'
        },
        {
          text: '分页导航条',
          url: '/OurJS/components/paginator/'
        },
        {
          text: '月历 &amp; 日期选择器',
          url: '/OurJS/components/calendar/'
        },
        {
          text: '表单验证',
          url: '/OurJS/components/validator/'
        }
      ]
    },
    {
      text: '参考文档',
      url: '/OurJS/docs/',
      submenu: [
        {
          text: 'API 参考',
          url: '/OurJS/docs/api.html'
        },
        {
          text: 'DOM 事件列表',
          url: '/OurJS/docs/events.html'
        },
        {
          text: '140 个预命名颜色列表',
          url: '/OurJS/docs/colors.html'
        }
      ]
    }
  ];

  // 注入页头及菜单容器。
  $(document.body).prepend($('<div id="header"><div><h1 id="logo"><span>OurJS</span></h1><ul id="menu"></ul></div></div>'));
  if (navigator.isIE6) {
    $('#header').setStyle('position', 'fixed');
  }

  // 生成菜单。
  var pathname = location.pathname;
  var isCurrent = function(href) {
    return pathname.contains(href);
  };
  var getMenuHTML = function(menu) {
    var html = '';
    menu.forEach(function(menu) {
      html = html.concat('<li><a href="' + menu.url + '"' + (isCurrent(menu.url) ? ' class="current"' : '') + '>' + menu.text + '</a>' + (menu.submenu ? '<ul>' + getMenuHTML(menu.submenu) + '</ul>' : '') + '</li>');
    });
    return html;
  };
  var $menu = $('#menu');
  $menu.innerHTML = getMenuHTML(menuData);
  $menu.getFirstChild().addClass('first');
  $menu.find('ul').forEach(function($ul) {
    var $li = $ul.getParent();
    if ($li.getParent() !== $menu) {
      $li.addClass('folder');
    }
  });

  // 简易多级菜单，未考虑溢出视口的情况。
  var isIE6 = navigator.isIE6;
  $menu
      .on('mouseenter:relay(li)', function() {
        if (isIE6) {
          this.addClass('hover');
        }
        var $ul;
        if ($ul = this.getFirstChild().getNextSibling()) {
          if (isIE6) {
            $ul.setStyle('display', 'block');
          } else {
            $ul.fadeIn();
          }
        }
      })
      .on('mouseleave:relay(li)', function() {
        if (isIE6) {
          this.removeClass('hover');
        }
        var $ul;
        if ($ul = this.getFirstChild().getNextSibling()) {
          if (isIE6) {
            $ul.setStyle('display', 'none');
          } else {
            $ul.fadeOut();
          }
        }
      });

  // 注入页脚。
  $(document.body).append($('<div id="footer"><span>&copy;2010-2012 Sun DG. Released under the <a href="http://www.opensource.org/licenses/mit-license.php" target="_blank">MIT license</a>.</span></div>'));

}, true);
