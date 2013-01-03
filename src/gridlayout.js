/**
 * 简单易用的网格布局插件
 * email: admin@xhou.net
 * author: houfeng(侯锋)
 */

window.gridLayout = window.gridLayout || {};
(function(owner) {
    owner.init=function(grid) {
        var me = this;
        if(!grid) {
            return;
        }
        grid = $(grid);
        //
        var scrollY = grid.attr('grid-scroll-x');
        var scrollX = grid.attr('grid-scroll-y');
        var correctionX = parseInt(grid.attr("grid-correction-x") || '0');
        var correctionY = parseInt(grid.attr("grid-correction-y") || '0');
        var size = {
            width: ((scrollX && grid[0].scrollWidth > grid[0].offsetWidth) ? grid[0].scrollWidth : grid[0].offsetWidth) + correctionX,
            height: ((scrollY && grid[0].scrollHeight > grid[0].offsetHeight) ? grid[0].scrollHeight : grid[0].offsetHeight) + correctionY
        };
        //alert(size.width);
        var cols = grid.attr("cols");
        var rows = grid.attr("rows");
        if(!cols || !rows) {
            return;
        }
        cols = me._handleSize(cols.split(','), size.width);
        rows = me._handleSize(rows.split(','), size.height);
        //
        var cells = null;
        var findAll = grid.attr("grid-find-all") || grid.attr("findAll");
        if(findAll) {
            cells = grid.find(".ui-grid-item");
        } else {
            cells = grid.children(".ui-grid-item");
        }
        //
        for(var r = 0; r < rows.length; r++) {
            for(var c = 0; c < cols.length; c++) {
                var cell = cells[cols.length * r + c];
                $(cell).outerWidth(cols[c]).outerHeight(rows[r]);
            }
        }
    };
    /**
     * 高宽转换处理
     * @param   {String} list 逗号隔开的整形数值
     * @param   {String} max  网络对应的长或宽
     * @return  {void}        无返回值
     * @private
     */
    owner._handleSize= function(list, max) {
        var autoCount = 0;
        var fiexdStat = 0;
        $.each(list, function(i) {
            if(this.indexOf('%') > -1) {
                list[i] = max * parseInt(this) / 100;
            } else {
                list[i] = parseInt(this);
            }
            if(isNaN(list[i])) {
                autoCount++;
            } else {
                fiexdStat += list[i];
            }
        });
        if(autoCount > 0) {
            var autoAvg = (max - fiexdStat) / autoCount;
            $.each(list, function(i) {
                if(isNaN(list[i])) {
                    list[i] = autoAvg;
                }
            });
        }
        return list;
    };
}(window.gridLayout));
//
$(function(){
    var _grids=$('.ui-grid');
    var _layout=function(){
        _grids.each(function(){
            window.gridLayout.init(this);
        });
    };
    _layout();
    $(window).resize(_layout);
});