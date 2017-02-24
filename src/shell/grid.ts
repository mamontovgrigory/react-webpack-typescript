interface Properties {
    gridId:string;
    colModel:{
        name:string;
        hidden?:boolean;
    }[],
    url?:string;
    data?:any[],
    localTypeUrl?:string;
    height?:number;
    rowsShown?:number;
    filter?:boolean;
    beforeSearch?:Function;
    afterSearch?:Function;
}

class Grid {
    init(properties:Properties) {
        var $grid = $('#' + properties.gridId),
            pagerId = 'p-' + properties.gridId;

        $grid.jqGrid('GridUnload');

        $grid.after($('<div>', {
            'id': pagerId
        }));

        var gridRowHeight = 22,
            scrollHeight = 20;

        function setHeight() { //Высота по умолчанию = rowsCount * gridRowHeight, если есть измеритель - устанавливается его высота
            if (!properties.height) {
                var height;
                var rowsCount = $grid.jqGrid('getGridParam', 'reccount'),
                    rowsShown = properties.rowsShown ? properties.rowsShown : 10;
                if (rowsCount === 0) {
                    height = gridRowHeight * 3;
                } else if (rowsCount <= rowsShown) {
                    height = (rowsCount * gridRowHeight) + scrollHeight;
                } else {
                    height = gridRowHeight * rowsShown + scrollHeight;
                }
                $grid.jqGrid('setGridHeight', height);
            }
        }

        function setGridWidth() {
            var gridParentWidth = $('#gbox_' + properties.gridId).parent().width();
            //$grid.setGridWidth(gridParentWidth - 2, $grid.width() < gridParentWidth);
            $grid.setGridParam({
                width: gridParentWidth - 2,
                shrink: $grid.width() < gridParentWidth
            });
        }

        $(window).bind('resize', function () {
            setGridWidth();
        });

        function initGrid() {
            $grid.jqGrid({
                colModel: properties.colModel,
                data: properties.data ? properties.data : null,
                datatype: properties.url ? 'json' : 'local'
                /*url: properties.url ? system.serverUrl + properties.url : false,
                 data: properties.data ? properties.data : false,
                 ajaxGridOptions: system.ajaxOptions,
                 mtype: properties.url ? 'GET' : false,
                 datatype: properties.url ? 'json' : 'local',
                 colModel: properties.colModel,
                 multiselect: typeof (properties.multiselect) === 'boolean' ? properties.multiselect : true,
                 multiboxonly: typeof (properties.multiboxonly) === 'boolean' ? properties.multiboxonly : true,
                 viewrecords: true,
                 rowNum: properties.rowNum ? properties.rowNum : 30,
                 rowList: properties.rowList ? properties.rowList : [10, 20, 30, 50, 100, 200],
                 pager: '#' + pagerId,
                 height: properties.height ? properties.height : 300,
                 width: properties.width ? properties.width : false,
                 autowidth: true,
                 shrinkToFit: false,
                 sortname: properties.sortname ? properties.sortname : false,
                 sortorder: properties.sortorder ? properties.sortorder : 'desc',
                 scroll: properties.scroll ? properties.scroll : false,
                 emptyrecords: i18next.t('ui.emptyrecords'),
                 jsonReader: properties.jsonReader ?
                 properties.jsonReader :
                 {
                 page: 'page',
                 total: 'total',
                 records: 'records',
                 root: 'rows',
                 repeatitems: false,
                 id: 'id'
                 },
                 loadComplete: function () {
                 setGridWidth();
                 //setHeight();
                 },
                 gridComplete: function () {
                 if (properties.gridComplete && typeof (properties.gridComplete) === 'function') {
                 properties.gridComplete();
                 }
                 },
                 onSelectRow: function (rowId, status, e) {
                 if (properties.onSelectRow && typeof (properties.onSelectRow) === 'function') {
                 properties.onSelectRow(rowId, status, e);
                 }
                 }*/
            });

            $grid.jqGrid('filterToolbar',
                properties.filter !== false ? {
                    searchOnEnter: false,
                    stringResult: true,
                    defaultSearch: 'cn',
                    autoSearch: true,
                    beforeSearch: function () {
                        if (properties.beforeSearch) properties.beforeSearch();
                    },
                    afterSearch: function () {
                        if (properties.afterSearch) properties.afterSearch();
                    }
                } : false);
        }

        if (properties.localTypeUrl) {
            /*$grid.data(localTypeUrlData, properties.localTypeUrl);
             mediator.publish(channels.shell.request.send, {
             url: properties.localTypeUrl,
             type: 'GET',
             success: function (response) {
             properties.data = response && response.rows ? response.rows : response;
             initGrid();
             }
             });*/
        } else {
            initGrid()
        }
    }
}

export default new Grid ;