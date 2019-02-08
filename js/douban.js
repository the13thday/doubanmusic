var main = {
    init: function () {
        this.search();
        this.createTurnPage();
        this.createTab();
        this.createSliderTab();
        this.createSwitch1();
        this.createSwitch2();
    },
    search: function () {
        $('.search-wrap').searchBox({
            text: '唱片名 表演者 条码',
            url: "https://api.douban.com/v2/music/search",
            method: "GET",
            dataType: "jsonp",
            data: "q=",
            count: "&count=7",
            callbacks: showList,
        });
        function showList(data) {
            data = data.musics;
            var dataList = '';
            data.forEach(function (elem) {
                dataList += '<li class="item">\
        <a href="' + elem.mobile_link + '">\
            <div class="cover"><img src="' + (elem.image || '') + '" alt=""></div>\
            <span class="desc">' + (elem.author ? elem.author[0].name : '') + '</span>\
        </a></li>'
            });
            $('#search .search-info').html(dataList);
        }
    },
    createTurnPage: function () {
        $('.slider-page').createTurnPage({
            image: ['./img/banner1.jpg', './img/banner2.jpg', './img/banner3.jpg','./img/banner4.jpg','./img/banner5.jpg','./img/banner6.jpg',
            './img/banner7.jpg']
            });
    },
    createTab: function () {
        $('.popular-artists').createTab({
            titles: ['本周流行音乐人', '上升最快音乐人'],
            content: [data1, data2],
            contentTitle: ['artists', 'new-artists']
        });
    },
    createSliderTab: function () {
        $('.editor-recommend').createSliderTab({
            header: '编辑推荐',
            content: sliderData
        });
    },
    createSwitch1: function () {
        $('.new-albums').createSwitch1({
            header: '新碟榜',
            title: ['最热', '话语', '欧美', '日韩', '单曲'],
            content: [albumsItem1, albumsItem2, albumsItem3, albumsItem4, albumsItem5]
        });
    },
    createSwitch2: function () {
        $('.hot').createSwitch2({
            header: '近期热门歌单',
            title: ['最热', '流行', '摇滚', '民谣', '原声'],
            content: [hotItem1, hotItem2, hotItem3, hotItem4, hotItem5]
        });
    }
}
main.init();







