interface InitProps {
    gridId:string;
    colModel:{
        name:string;
        key?:boolean;
        hidden?:boolean;
        label?:string;
        classes?:string;
        formatter?:any;
        width?:number;
        editable?:boolean;
        edittype?:any;
    }[],
    url?:string;
    data?:any[],
    localTypeUrl?:string;
    height?:number;
    rowsShown?:number;
    filter?:boolean;
    beforeSearch?:Function;
    afterSearch?:Function;
    multiselect?:boolean;
    multiboxonly?:boolean;
    rowNum?:number;
    rowList?:number[];
    width?:number;
    sortname?:string;
    sortorder?:'asc' | 'desc';
    scroll?:boolean;
    jsonReader?:any;
    gridComplete?:Function;
    onSelectRow?:Function;
}

interface ReloadProps {
    gridId:string;
}

interface GetDataProps {
    gridId:string;
    rowId?:string;
}

interface UpdateDataProps {
    gridId:string;
    data:any;
}

interface EditRowProps {
    gridId:string;
    rowId:string;
}

class Grid {
    init(properties:InitProps) {
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
            $grid.jqGrid('setGridWidth', gridParentWidth - 2, $grid.width() < gridParentWidth);
        }

        $(window).bind('resize', function () {
            setGridWidth();
        });

        $grid.jqGrid({ //TODO: Use localization
            colModel: properties.colModel,
            data: properties.data ? properties.data : null,
            datatype: properties.url ? 'json' : 'local',
            //url: properties.url ? system.serverUrl + properties.url : false,
            //ajaxGridOptions: system.ajaxOptions,
            mtype: properties.url ? 'GET' : null,
            multiselect: typeof (properties.multiselect) === 'boolean' ? properties.multiselect : true,
            multiboxonly: typeof (properties.multiboxonly) === 'boolean' ? properties.multiboxonly : true,
            viewrecords: true,
            rowNum: properties.rowNum ? properties.rowNum : 10,
            rowList: properties.rowList ? properties.rowList : [10, 20, 30, 50, 100, 200],
            pager: '#' + pagerId,
            //height: properties.height ? properties.height : 300,
            //width: properties.width ? properties.width : null,
            autoWidth: true,
            shrinkToFit: false,
            sortname: properties.sortname ? properties.sortname : null,
            sortorder: properties.sortorder ? properties.sortorder : 'desc',
            //scroll: properties.scroll ? properties.scroll : false,
            //emptyrecords: i18next.t('ui.emptyrecords'),
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
            /*loadComplete: function () {
             setGridWidth();
             //setHeight();
             },*/
            gridComplete: function () {
                setGridWidth();
                if (properties.gridComplete) {
                    properties.gridComplete();
                }
            },
            onSelectRow: function (rowId, status, e) {
                if (properties.onSelectRow) {
                    properties.onSelectRow(rowId, status, e);
                }
            }
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

    reload(properties:ReloadProps, callback:Function) {
        var $grid = $('#' + properties.gridId);
        $grid.trigger('reloadGrid');
        callback();
    }

    getSelectedRows(gridId:string):string[] {
        var $grid = $('#' + gridId),
            response = [],
            isMultiselect = $grid.jqGrid('getGridParam', 'multiselect');
        if (isMultiselect) {
            response = $grid.jqGrid('getGridParam', 'selarrrow');
        } else {
            var rowId = $grid.jqGrid('getGridParam', 'selrow');
            if (rowId)
                response = [rowId];
        }

        return (response ? response : []);
    }

    getData(properties:GetDataProps) {
        var $grid = $('#' + properties.gridId);

        var response = $grid.jqGrid('getRowData', properties && properties.rowId ? properties.rowId : null);

        return (response);
    }

    updateData(properties:UpdateDataProps) {
        var $grid = $('#' + properties.gridId);

        $grid.jqGrid('clearGridData')
            .jqGrid('setGridParam', {data: properties.data})
            .trigger('reloadGrid', [{page: 1}]);
    }

    edittingRowId;

    editRow(properties:EditRowProps) {
        var $grid = $('#' + properties.gridId);

        if (this.edittingRowId)$grid.jqGrid('restoreRow', this.edittingRowId);
        this.edittingRowId = properties.rowId;
        $grid.jqGrid('editRow', properties.rowId, true);
    }
}

const grid = new Grid();

export {grid};