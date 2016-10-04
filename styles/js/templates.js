/* 
@ Developer: Fairlance (vk.com/null.root)
@ Last modified: 03.10.16  
*/
$(document).ready(function() {
    var cookie_encrypt_hash = getCookie('session_encrypt');
    if (cookie_encrypt_hash == undefined) {
        $.notify('Доступ запрещен! Войдите на сайт и повторите попытку.', {
            className: 'error',
            position: "top center"
        });
        $('.wrapper, footer').attr('style', 'display: none;');
    } else {
        var InfoObj = AjaxLoad('backend/SimpleBackend.php?p=userinfo');
        WriteData();
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

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function WriteData() {
        var a = ['user', 'fio', 'group', 'date', 'avatar'];
        var b = [InfoObj.sp_user, InfoObj.sp_fio, InfoObj.sp_group == 1 ? 'Администраторы' : 'Пользователи', InfoObj.sp_regdate, InfoObj.sp_photo];
        for (var i = 0; i < a.length; ++i) {
            var re = new RegExp('{' + a[i] + '}', 'g');
            document.body.innerHTML = document.body.innerHTML.replace(re, b[i]);
        }
    }

    $("#SaveSettings").click(function(e) {
        $.notify('Настройки надежно сохранены.', {
            className: 'success',
            position: "top left"
        });
    })

});