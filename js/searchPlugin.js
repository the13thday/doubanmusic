(function ($){
    searchBox = function () {
    }
    searchBox.prototype = {
        init: function (config) {
            this.url = config.url || '#';
            this.method = config.method || 'GET';
            this.dataType = config.dataType || 'json';
            this.data = config.data || '';
            this.count = config.count || '5';
            this.callbacks = config.callbacks || '';
            this.flag = true;
            this.createDom(config);
            this.bindEvent();
        },
        
        createDom: function (config) {
            var wrap = config.father;
            var str = '<form action="">\
            <input type="text" class="search" placeholder="' + (config.text || '请输入文字提示') + '">\
            <input type="submit" class="btn" value=""></form>';
            this.info = $('<ul class="search-info"></ul>');
            wrap.attr('id', 'search').css('position', 'relative').append($(str)).append(this.info);
        },

        bindEvent: function () {
            var self = this;
            $('#search .search').on('input', function () {
                var value = $('#search .search').val();
                self.debounce(self.getData(value), 2000);
                self.info.show();
            })
            .on('blur', function () {
                setTimeout(function () {
                    self.info.hide();
                }, 300);
            });
            $('#search .btn').on('click', function (e) {
                var value = $('#search .search').val();
                e.preventDefault();
                location.href = "https://music.douban.com/subject_search?search_text=" + value;
            })
        },

        getData: function (value) {
            var self = this;
            if(self.flag) {
                self.flag = false;
                $.ajax({
                    url: this.url,
                    type: this.method,
                    dataType: this.dataType,
                    data: this.data + value + this.count,
                    success: function (data) {
                        self.callbacks(data);
                    },
                    complete: function () {
                        self.flag = true;
                    }
                })
            } 
        },

        debounce: function (fn, delay) {
            var timer = null;
            return function () {
                var self = this,
                    args = Array.prototype.slice.call(arguments);
                clearTimeout(timer);
                timer = setTimeout(function (){
                    fn.apply(self, args);
                }, delay)
            }
        }
    }
    searchBox.prototype.init.prototype = searchBox.prototype;

    $.fn.extend({
        searchBox: function (config) {
            config.father = this;
            return new searchBox.prototype.init(config);
        }
    })
}(jQuery))
