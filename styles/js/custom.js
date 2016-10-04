/* 
@ Developer: Fairlance (vk.com/null.root)
@ Last modified: 03.10.16  
*/
$(document).ready(function() {

    var page_name = location.pathname;
    if (getCookie('session_encrypt') == undefined && page_name.substr(page_name.lastIndexOf("/") + 1) == 'index.html' || page_name.substr(page_name.lastIndexOf("/") + 1) == '') {
        $('#main_row').load('main.html?hash=' + Math.random(), function() {
            $("#users_table").load('backend/SimpleBackend.php?p=user_table', '');

            $("#auth").submit(function(e) {
                e.preventDefault();
                /*  alert("Test Push"); */
                var login = $('#login').val(),
                    password = $('#password').val(),
                    email = $('#email').val();

                var resp_login = AjaxLoad('backend/SimpleBackend.php?p=auth', '&login=' + login + '&password=' + password);


                if (resp_login.success != undefined) {
                    $.notify(resp_login.success, {
                        className: 'success',
                        position: "top left"
                    })

                    function redirect_to_user() {
                        window.location = 'user.html';
                    }
                    setTimeout(redirect_to_user, 3000);
                }


                if (resp_login.error != undefined)
                    $.notify(resp_login.error, {
                        className: 'error',
                        position: "top left"
                    });

            })

        });

    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    $("#xml_parse").click(function(e) {
        $.notify('Вы вышли со своей учетной записи.', {
            className: 'success',
            position: "top left"
        });
    })

    $("#logout").click(function(e) {
        $.notify('Вы вышли со своей учетной записи.', {
            className: 'success',
            position: "top left"
        });
        AjaxLoad('backend/SimpleBackend.php?p=logout');

        function redirect_to_main() {
            window.location = 'index.html';
        }
        setTimeout(redirect_to_main, 3000);
    })

    var page_name = location.pathname;
    if (getCookie('session_encrypt') != undefined && page_name.substr(page_name.lastIndexOf("/") + 1) == 'index.html' || page_name.substr(page_name.lastIndexOf("/") + 1) == '') {
        window.location = 'user.html';
    }

    $("#parser_xml").click(function(e) {


        $("#main_row").load('xml_parser.html?hash=' + Math.random(), function() {

            $("#xml_parse").click(function(e) {

                $("#xml_parse").html('<b>Обновить данные</b>');

                $('#xml_example > tbody').text('');

                var Resp = XMLParse('Response.xml');

                var DataBuy = Resp.getElementsByTagName("test1"); // Парсинг тегов и создание обьекта
                if (DataBuy)
                    for (var i1 = 0; i1 < DataBuy.length; i1++) {
                        $('#xml_example > tbody').append(
                            '<tr><td>' + DataBuy[i1].getElementsByTagName("vagr")[0].innerHTML + '</td><td>' + DataBuy[i1].getElementsByTagName("pot")[0].innerHTML + '</td><td>' + DataBuy[i1].getElementsByTagName("pnaz")[0].innerHTML + '</td><td>' + DataBuy[i1].getElementsByTagName("firmo")[0].innerHTML + '</td><td>' + DataBuy[i1].getElementsByTagName("firmp")[0].innerHTML + '</td><td>' + DataBuy[i1].getElementsByTagName("q")[0].innerHTML + '</td><td>' + DataBuy[i1].getElementsByTagName("v")[0].innerHTML + '</td><td>' + DataBuy[i1].getElementsByTagName("p")[0].innerHTML + '</td><td>' + DataBuy[i1].getElementsByTagName("itogo")[0].innerHTML + '</td></tr>'
                        );
                    }
                if (DataBuy) {
                    $.notify('Парсинг завершен. В базе ' + DataBuy.length + ' записей.', {
                        className: 'success',
                        position: "top left"
                    });
                }
            })
        });

        $("#parser_xml").attr('class', 'active');
        $("#users").attr('class', 'passive')
    })
    $("#users").click(function(e) {
        $("#users").attr('class', 'active');
        $("#parser_xml").attr('class', 'passive');
        $('#main_row').load('main.html?hash=' + Math.random(), function() {
            $("#users_table").load('backend/SimpleBackend.php?p=user_table', '');
        });

    })

    $("#users_table").load('backend/SimpleBackend.php?p=user_table', '');

    /* Парсинг XML на страницу */
    function XMLParse(url) {
        var xml;
        if (window.XMLHttpRequest) {
            xml = new window.XMLHttpRequest();
            xml.open("GET", url, false);
            xml.overrideMimeType('text/xml; charset=utf-8');
            xml.send("");
            return xml.responseXML;
        } else
        if (window.ActiveXObject) {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.load(url);
            return xml;
        } else {
            $.notify('Браузер не поддерживает загрузку XML', {
                className: 'error',
                position: "top left"
            });
            return null;
        }
    }

    function AjaxLoad(path, payload) {
        var payload = payload || '';
        var result = "";
        $.ajax({
            /* type: "POST", */
            url: path,
            data: payload,
            async: false,
            success: function(data) {
                result = data;
            }
        });
        return result;
    }
});