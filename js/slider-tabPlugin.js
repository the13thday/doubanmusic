sliderData = [
    {src: './img/e1.jpg', imglink: '#', title: '【专辑】', artist: '死谷烂谷', h3link: '#', des: '迷你噪音',
     h4link: '#', intr: '香港草根民谣乐队“迷你噪音”的第二张专辑。青春自有暗号续舞步，让所行所思超越口号。'},
     {src: './img/e2.jpg', imglink: '#', title: '【歌曲】', artist: '马云们', h3link: '#', des: 'SEENSCA',
     h4link: '#', intr: '为小说《马云们》做的配乐，“这年头还有谁不识马云!” 别光听歌，小说也可以看一看'},
     {src: './img/e3.jpg', imglink: '#', title: '【音乐人】', artist: '按时放发蓝围巾', h3link: '#', des: '7人关注',
     h4link: '#', intr: '一些广东城市的实地录音，也可能不是广东，不是城市，都没有关系。不是音乐，胜似音乐。'},
     {src: './img/e4.jpg', imglink: '#', title: '【专辑】', artist: '《只说一次》配乐', h3link: '#', des: '沈帜',
     h4link: '#', intr: '卧轨的火车的主唱/吉他手沈帜，为短片《只说一次》做的配乐。阴沉的小短曲，浓郁黑色电影的味道。'},
     {src: './img/e5.jpg', imglink: '#', title: '【音乐人】', artist: '橡木桶盖', h3link: '#', des: '31人关注',
     h4link: '#', intr: '原广州后摇乐队隔离区的分支计划。吉他好听，气氛也不错，钢琴与昆虫最佳。收听采样两相宜。'},
     {src: './img/e6.jpg', imglink: '#', title: '【音乐人】', artist: '梦盈', h3link: '#', des: '24人关注',
     h4link: '#', intr: '广州的民谣女歌手。在你还以为是另一个行走远方云里烟里的吉他弹唱时，会发现一些不一样。'}
];

(function ($) {
    function SliderTab(options) {
        this.wrap = options.father;
        this.header = options.header || '标题栏';
        this.content = options.content || '';
        this.init();
    }

    SliderTab.prototype = {
        init: function () {
            this.setHead();
            this.setBody();
            this.bindEvent();
        },

        setHead: function () {
            $('<div class="header"><h2>' + this.header + '</h2></div>').appendTo(this.wrap);
        },

        setBody: function () {
            var content = this.content;
            var len = content.length;
            var main = $('<div class="slider-section"></div>');
            var btn = this.btn = $('<ul class="btn"><li class="left">&lt</li><li class="right">&gt</li></ul>');
            var sliderViewport = $('<div class="slider-wall clearfit"></div>');
            var sliderList = this.sliderList = $('<div/>').attr('class', 'slider-list');
            var str = '';
            content.forEach(function (ele, index) {
                str += '<div class="slider-item">\
                <a class="slider-img" href="'+ ele.imglink + '">\
                    <img src="' + ele.src + '" alt="">\
                </a>\
                <p>' + ele.title + '</p>\
                <h3>\
                    <a href="' + ele.h3link + '">'+ ele.artist + '</a>\
                </h3>\
                <h4>\
                    <a href="'+ ele.h4link +'">' + ele.des + '</a>\
                </h4>\
                <p>' + ele.intr + '</p>\
            </div>'
            });
            sliderList.html(str).appendTo(sliderViewport);
            main.append(btn).append(sliderViewport).appendTo(this.wrap);      
        },
        bindEvent: function () {
            var sliderList = this.sliderList;
            var flag = this.flag = true;
            this.btn.on('click', 'li', function () {
                if ($(this).hasClass('left')) {
                    if(!flag) {
                        sliderList.animate({left: '0px'},function () {
                            flag = true;
                        })
                    } 
                } else if($(this).hasClass('right')) {
                    if(flag) {
                        var pos = parseInt(sliderList.css('width')) / 2;
                        sliderList.animate({left: -pos + 'px'}, function () {
                            flag = false;
                        })
                    }           
                }
            })
        }
    }
    
    $.fn.extend({
        createSliderTab: function (options) {
            options.father = this;
            this.attr('id', 'slider-tab');
            return new SliderTab(options);
        }
    })
}(jQuery))

