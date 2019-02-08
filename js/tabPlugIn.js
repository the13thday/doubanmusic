data1 = [
    {src: './img/01.jpg', link: 'www', title: 'P.K.14', genre: '摇滚 Rock', fleece: 'fleece'},
    {src: './img/02.jpg', link: '#', title: '沈帜', genre: '轻音乐 Easy Listening', fleece: ''},
    {src: './img/03.jpg', link: '#', title: 'A.J.Alex', genre: '原声 Soundtrack', fleece: 'fleece'},
    {src: './img/04.jpg', link: 'www#', title: 'Arrebato', genre: '电子 Electronica', fleece: ''},
    {src: './img/05.jpg', link: '#', title: '王敖（音乐人）', genre: '世界音乐 World', fleece: ''},
    {src: './img/06.jpg', link: 'www#', title: '沈空西院与万柳塘公园', genre: '民谣 Folk', fleece: ''},
    {src: './img/07.jpg', link: '#', title: '黎忘年', genre: '摇滚 Rock', fleece: ''},
    {src: './img/08.jpg', link: '#', title: 'Shekhinah | 安娜与陈飙', genre: '摇滚 Rock', fleece: ''}, 
];
data2 = [
    {src: './img/09.jpg', link: '#', title: 'Soil terrapin', genre: '说唱 Rap', fleece: ''},
    {src: './img/10.jpg', link: '#', title: '鞭子情人', genre: '民谣 Folk', fleece: 'fleece'},
    {src: './img/11.jpg', link: '#', title: 'Ascension Music Group', genre: '说唱 Rap', fleece: ''},
    {src: './img/12.jpg', link: '#', title: '包小静', genre: '说唱 Rap', fleece: ''},
    {src: './img/13.jpg', link: '#', title: '德宏老爹', genre: '说唱 Rap', fleece: ''},
    {src: './img/14.jpg', link: '#', title: '罗艺恒', genre: '流行 Pop', fleece: 'fleece'},
    {src: './img/15.jpg', link: '#', title: '英伦盒子', genre: '民谣 Folk', fleece: ''},
    {src: './img/16.jpg', link: '#', title: '李蔓', genre: '流行 Pop', fleece: ''}
];

(function ($) {
    function NewTab(options) {
        this.options = options;
        this.wrap = options.father;
        this.header = options.header;
        this.titles = options.titles || '';
        this.content = options.content || '';
        this.contentTitle = options.contentTitle || '';
        this.init();
    }

    NewTab.prototype = {
        init: function () {
           this.createHeader();
           this.createBody();
           this.bindEvent();
        },
        createHeader: function() {
            var header = this.header,
                titles = this.titles,
                str = '',
                i;
            str += '<ul class="header">';
            if(header) {
                str += '<h2>' + header + '<h2>';
            }
            for(i = 0; i < titles.length; i++) {
                str += '<li class="artist-tab">' + titles[i] + '</li> | ';
            }
            str += '</ul>';
            this.wrap.html(str).find('li:first').addClass('active');     
        },
        createBody: function () {
            var content = this.content,
                contentTitle = this.contentTitle,
                temp = [],
                str;
            for(var i = 0; i < content.length; i++) {
                str = '';
                temp[i] = $('<div class="' + contentTitle[i] + '"></div>');    
                content[i].forEach(function (ele, index) {
                    if(index % 4 === 0) {
                        str += '<div class="clearfit"></div>';
                    }
                    str += '<div class="artist-item">\
                    <div class="cover">\
                        <a class="photo" href='+ ele.link +'>\
                            <img src="' + ele.src + '">\
                        </a>\
                    </div>\
                    <a href="#" class="title ' + ele.fleece + '">' + ele.title + '</a>\
                    <p class="genre">' + ele.genre + '</p>\
                </div>'          
                })
                str += '<div class="clearfit"></div>';
                temp[i].html(str);           
            }
            for(var i = 0; i < temp.length; i++) {
                this.wrap.append(temp[i]);
            }
            this.wrap.find('.artists').addClass('active');
        },

        bindEvent: function () {
            var wrap = this.wrap;
            wrap.find('.header').on('click', '.artist-tab', function () {
                wrap.find('.active').removeClass('active');
                $(this).addClass('active');
                wrap.find('>div').eq($(this).index()).addClass('active');
            })
        }
    }
    

    $.fn.extend({
        createTab: function (options) {
            options.father = this;
            this.attr('id', 'tab');
            return new NewTab(options);
        }})
}(jQuery))



                         