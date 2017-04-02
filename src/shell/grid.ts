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
        sorttype?:any;
        stype?:string;
        searchoptions?:any;
        editable?:boolean;
        edittype?:string;
        editoptions?:{value:any}
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
    ondblClickRow?:Function;
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

class Grid {
    init(props:InitProps) {
        var $grid = $('#' + props.gridId),
            pagerId = 'p-' + props.gridId;

        $grid.jqGrid('GridUnload');

        $grid.after($('<div>', {
            'id': pagerId
        }));

        var gridRowHeight = 22,
            scrollHeight = 20;

        function setHeight() { //Высота по умолчанию = rowsCount * gridRowHeight, если есть измеритель - устанавливается его высота
            if (!props.height) {
                var height;
                var rowsCount = $grid.jqGrid('getGridParam', 'reccount'),
                    rowsShown = props.rowsShown ? props.rowsShown : 10;
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
            var gridParentWidth = $('#gbox_' + props.gridId).parent().width();
            $grid.jqGrid('setGridWidth', gridParentWidth - 2, $grid.width() < gridParentWidth);
        }

        $(window).bind('resize', function () {
            setGridWidth();
        });

        let lastsel;
        $grid.jqGrid({ //TODO: Use localization
            colModel: props.colModel,
            data: props.data ? props.data : null,
            datatype: props.url ? 'json' : 'local',
            //url: props.url ? system.serverUrl + props.url : false,
            //ajaxGridOptions: system.ajaxOptions,
            mtype: props.url ? 'GET' : null,
            multiselect: typeof (props.multiselect) === 'boolean' ? props.multiselect : true,
            multiboxonly: typeof (props.multiboxonly) === 'boolean' ? props.multiboxonly : true,
            viewrecords: true,
            rowNum: props.rowNum ? props.rowNum : 25,
            rowList: props.rowList ? props.rowList : [15, 25, 50, 100, 200],
            pager: '#' + pagerId,
            //height: props.height ? props.height : 300,
            //width: props.width ? props.width : null,
            autoWidth: true,
            shrinkToFit: false,
            sortname: props.sortname ? props.sortname : null,
            sortorder: props.sortorder ? props.sortorder : 'desc',
            //scroll: props.scroll ? props.scroll : false,
            //emptyrecords: i18next.t('ui.emptyrecords'),
            jsonReader: props.jsonReader ?
                props.jsonReader :
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
                if (props.gridComplete) {
                    props.gridComplete();
                }
            },
            onSelectRow: function (rowId, status, e) {
                if (props.onSelectRow) {
                    props.onSelectRow(rowId, status, e);
                }
            },
            ondblClickRow: function (rowId, status, e) {
                if (props.ondblClickRow) {
                    props.ondblClickRow(rowId, status, e);
                }
            }
        });

        $grid.jqGrid('filterToolbar',
            props.filter !== false ? {
                searchOnEnter: false,
                stringResult: true,
                defaultSearch: 'cn',
                autoSearch: true,
                beforeSearch: function () {
                    if (props.beforeSearch) props.beforeSearch();
                },
                afterSearch: function () {
                    if (props.afterSearch) props.afterSearch();
                }
            } : false);
    }

    reload(props:ReloadProps, callback:Function) {
        var $grid = $('#' + props.gridId);
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

    getData(props:GetDataProps) {
        var $grid = $('#' + props.gridId);

        var response = $grid.jqGrid('getRowData', props && props.rowId ? props.rowId : null);

        return (response);
    }

    updateData(props:UpdateDataProps) {
        var $grid = $('#' + props.gridId);

        $grid.jqGrid('clearGridData')
            .jqGrid('setGridParam', {data: props.data})
            .trigger('reloadGrid', [{page: 1}]);
    }

    editRow(props:{gridId:string, rowId:string, parameters?:{keys:boolean,aftersavefunc?:Function}}) {
        var $grid = $('#' + props.gridId);

        $grid.jqGrid('editRow', props.rowId, props.parameters);
    }

    restoreRow(props:{gridId:string, rowId:string}) {
        var $grid = $('#' + props.gridId);
        $grid.jqGrid('restoreRow', props.rowId);
    }
}

const grid = new Grid();

export {grid};