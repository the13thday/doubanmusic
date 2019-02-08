(function ($) {
    function Swiper(options) {
        this.opts = options || {};
        this.wrap = options.father;
        this.init();   
    }

    Swiper.prototype.init = function () {  
        this.timer = undefined;
        this.lock = true;   
        this.index = 0;
        this.flag = true;
        this.image = this.opts.image;
        this.len = this.image.length;
        this.Num = this.len;
        this.imgW = parseInt(this.wrap.css('width'));
        this.imgH = parseInt(this.wrap.css('height'));
        this.createDom();
        this.bindEvent();
        this.auto(this.flag);
        this.film = $('.film');
    }

    Swiper.prototype.createDom = function () {
        var image = this.opts.image;
        var len = this.len;
        var str = '';
        var filmBox = $('<div class="film-box"></div>');
        var film = $('<ul class="film"></ul>');
        var leftBtn = $('<div class="btn left-btn">&lt</div>');
        var rightBtn = $('<div class="btn right-btn">&gt</div>');
        var indexBox = $('<div class="index-box"/>');
        var indexStr = '';
        for (var i = 0; i < len; i++) {
            str += '<li><a href="javaScript:void(0)"><img src="' + image[i] + '"></a></li>';
            indexStr += '<span></span>';
        }
        str += '<li><a href="javaScript:void(0)"><img src="' + image[0] + '"></a></li>';
        film.html(str);
        $(indexStr).appendTo(indexBox);
        $(indexBox).children().eq(0).addClass('active');
         // 写样式
        filmBox.css({
            width: this.imgW + 'px',
            height: this.imgH + 'px'
        });
        film.css({
            width: (len + 1) * this.imgW + 'px',
            height: this.imgH + 'px'
        });
        film.children().css({
            width: this.imgW + 'px',
            height: this.imgH + 'px'
        });
        leftBtn.add(rightBtn).css({
            marginTop: -this.imgH / 20 + 'px',
            backgroundColor: "#0ff",
            width: this.imgW / 20 + 'px',
            height: this.imgH / 10 + 'px',
            fontSize: this.imgH / 10 + 'px',
            lineHeight: this.imgH / 10 + 'px',
        });   
        indexBox.children().css({
            width: this.imgH / 25 + 'px',
            height: this.imgH / 25 + 'px',
            margin: this.imgH / 50 + 'px',         
        });
        filmBox.append(film).append(leftBtn).append(rightBtn).append(indexBox).appendTo(this.wrap);
    }

    Swiper.prototype.bindEvent = function() {
        var self = this;
        $('.left-btn').add('.right-btn').on('click', function () {
            if ($(this).hasClass('left-btn')) {
                self.autoMove('rtl');
            } else if ($(this).hasClass('right-btn')) {
                self.autoMove('ltr');
            }
            self.changeIndex(self.index);
        });

        $('.index-box').on('click', 'span', function () {
            self.autoMove($(this).index());
            self.changeIndex(self.index);
        });

        $('.film-box').hover(function () {
            $(this).find('.btn').show();
            clearTimeout(self.timer);
            self.flag = false;
        }, function () {
            $(this).find('.btn').hide();
            self.flag = true;
            self.auto(self.flag);
        })
    }

    Swiper.prototype.autoMove = function (direction) {
        var self = this,
            lock = self.lock,
            Num = self.Num,
            film = self.film,
            imgW = self.imgW
            flag = self.flag;
        if (lock) {
            lock = false;
            var a = 1;    
            if (direction === 'ltr' || direction === 'rtl') {
                if (direction === 'ltr') {
                    if (self.index === Num - 1) {
                        a = 0;
                        film.animate({ left: -imgW * Num + 'px' },'swing', function () {
                            $(this).css('left', '0px');
                            self.auto(flag);
                            // lock = true;
                        });
                        self.index = 0;
                    } else {
                        self.index++;
                    }
                }
                else {
                    if (self.index === 0) {
                        film.css('left', -imgW * Num + 'px');
                        self.index = Num - 1;
                    } else {
                        self.index--;
                    }
                }
            } else {
                self.index = direction;
            }
            if (a) {
                self.slider();
            }
        }
    }

    Swiper.prototype.auto = function (flag) {
        if (flag) { 
            var self = this;
            clearTimeout(self.timer);
            self.timer = setTimeout(function () {
                self.autoMove('ltr');
                self.changeIndex(self.index);
            }, 1500);
        }
    }

    Swiper.prototype.slider = function () { 
        var self = this;
        self.film.animate({ left: -self.index * self.imgW + 'px' },'swing', function () {
            self.auto(self.flag);
            self.lock = true;
        });
    }

    Swiper.prototype.changeIndex = function (index) {
        $('span.active').removeClass('active');
        $('span').eq(this.index).addClass('active');
    }

    $.fn.extend({
        createTurnPage: function (imgArr) {
            imgArr.father = this || $('body');
            this.attr('id', 'turnPage')
            new Swiper(imgArr);
        }
    })
}(jQuery));