var keys = [];
$.each(data.Customers, function(e){
    if(keys.length < Object.keys(data.Customers[e]).length){
        keys = Object.keys(data.Customers[e]);
    }
})
/* for (var i = 0; i < data.Customers.length; i++) {
    if (keys.length < Object.keys(data.Customers[i]).length) {
        keys = Object.keys(data.Customers[i]);
        console.log(keys.length);
    }
} */
$.each(keys, function(a){
    $(".datatable thead").append("<th>"+ keys[a] + "</th>")
})
/* for (var i = 0; i < keys.length; i++) {
    $(".datatable thead").append("<th>" + keys[i] + "</th>")
} */
var emptydata = "";
$.each(data.Customers, function (key, value) {
    emptydata += "<tr>"
    for (var i = 0; i < keys.length; i++) {
        var val = value[keys[i]];
        if (val === undefined) {
            val = ""
        }
        emptydata += '<td>' + val + '</td>'
    }
    emptydata += "</tr>";
})
$(".datatable").append(emptydata);
/*--- Search Bar ---*/
var lineStr = $(".datatable tbody tr").text().toLowerCase();
$(".search").keyup(function () {
    var searchTerm = $(this).val().toLowerCase();
    var x = _.filter(data.Customers, function (o) {  
        var control = false;
        for (var u = 0; u < keys.length; u++) {
            var keyscontent = o[keys[u]];
            if (keyscontent && !control) {
                control = keyscontent.toLowerCase().indexOf(searchTerm) > -1
            }
        }
        return control;
    })
    $("tbody").html("");
    $(".pagin li").addClass("gizle");
    $(".datatable tbody tr").addClass("gizle");
    for (var i = 0; i < x.length; i++) {
        var emptydata2 = " ";
        emptydata2 += "<tr>"
        for (var k = 0; k < keys.length; k++) {
            var filterkeys = x[i][keys[k]];
            if (filterkeys === undefined) {
                filterkeys = " ";
            }
            emptydata2 += "<td>" + filterkeys + "</td>";
        }
        emptydata2 += "</tr>"
        $("tbody").append(emptydata2);
    }
    var datastr = $(emptydata2).text().toLowerCase();
    if (datastr.indexOf(searchTerm) === 0) {
        /* $("#pagin").empty(); */
        var pageSize = 10;
        showPage = function (page) {
            $(".datatable tbody tr").hide();
            $(".datatable tbody tr").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }
        var liCount = Math.ceil(datalength / pageSize);
        /* console.log(liCount); */
        for (var i = 0; i < liCount; i++) {
            var $li = document.createElement("li");
            var $a = document.createElement("a");
            $($li).append($a);
            $($a).text(i + 1)
            /* $("#pagin li a").addClass("paginlinks") */
            $(".pagin").append($li);
            $(".pagin li:first-child a").addClass("current firstPage")
        }
        showPage(1);
        $(".pagin li a").click(function () {
            $(".pagin li a").removeClass("current");
            $(this).addClass("current");
            showPage(parseInt($(this).text()))
        });
    }
    else if (datastr.indexOf(searchTerm) > 0) {
       
        var pageSize = 10;
        showPage = function (page) {
            $(".datatable tbody tr").hide();
            $(".datatable tbody tr").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }
        var liCount = Math.ceil(x.length / pageSize);
        /* console.log(liCount); */
        for (var i = 0; i < liCount; i++) {
            var $li = document.createElement("li");
            var $a = document.createElement("a");
            $($li).append($a);
            $($a).text(i + 1)
            /* $("#pagin li a").addClass("paginlinks") */
            $(".pagin").append($li);
            $(".pagin li:first-child a").addClass("current firstPage")
        }
        showPage(1);
        $(".pagin li a").click(function () {
            $(".pagin li a").removeClass("current");
            $(this).addClass("current");
            showPage(parseInt($(this).text()))
        });
    }
})
    /*--- Pagination Bar ---*/
    var datalength = data.Customers.length;
    var pageSize = 10;
    showPage = function (page) {
        $(".datatable tbody tr").hide();
        $(".datatable tbody tr").each(function (n) {
            if (n >= pageSize * (page - 1) && n < pageSize * page)
                $(this).show();
        });
    }
    var liCount = Math.ceil(datalength / pageSize);
    /* console.log(liCount); */
    for (var i = 0; i < liCount; i++) {
        var $li = document.createElement("li");
        var $a = document.createElement("a");
        $($li).append($a);
        $($a).text(i + 1)
        /* $("#pagin li a").addClass("paginlinks") */
        $(".pagin").append($li);
        $(".pagin li:first-child a").addClass("current firstPage")
    }
    showPage(1);
    $(".pagin li a").click(function () {
        $(".pagin li a").removeClass("current");
        $(this).addClass("current");
        showPage(parseInt($(this).text()))
    });
/* $(".search").keyup(function(){
    var searchTerm = $(this).val().toLowerCase();
    var tr = $(".datatable tbody tr");
    for(var i=0; i<tr.length; i++){
        td = tr[i].getElementsByTagName("td")[5];
        if(td){
            var txtValue = td.textContent || td.innerText;
            if(txtValue.toLowerCase().indexOf(searchTerm) === -1){
                $(tr[i]).hide();
            }
            else{
                $(tr[i]).show();
            }
        }
    }
}) */

/* $(".search").keyup(function () {
    var searchTerm = $(this).val().toLowerCase()
    $(".datatable tbody tr").each(function(){
        var lineStr = $(this).text().toLowerCase();
        if(lineStr.indexOf(searchTerm) === -1){
            $(this).hide();
        }else{
            $(this).show();
            
        }
    })
}) */
