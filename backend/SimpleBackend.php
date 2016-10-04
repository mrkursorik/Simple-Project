<?
/* 
@ Developer: Fairlance (vk.com/null.root)
@ Last modified: 03.10.16  
*/
function MysqlConnect() {
global $FairlanceSQL;
$dsn = "mysql:host=localhost;dbname=SimpleProject;charset=utf8";
$opt = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
);
$FairlanceSQL = new PDO($dsn, "fairlancer", "fairlancer", $opt);
return $FairlanceSQL;
}

if(empty($_REQUEST))
exit('Hacking attempt!');

switch($_REQUEST['p']){
case "userinfo": 
MysqlConnect();
$Response = $FairlanceSQL->prepare('SELECT * FROM `users` WHERE `session`=? LIMIT 1');
header('Content-type: application/json');
 try{
		$Response->execute(array(@$_COOKIE['session_encrypt']));
		echo json_encode($Response->fetch(), true);
		} catch (PDOException $e) {
		echo json_encode(array('error' => 'Ошибка: Ошибка выполнения запроса.'), true);
		}
break;
case "auth": 
$login = htmlspecialchars($_REQUEST['login'], ENT_QUOTES);
$password = htmlspecialchars($_REQUEST['password'], ENT_QUOTES);
if(!preg_match('/[A-Za-z0-9]{4,12}/', $login) && !preg_match('/[A-Za-z0-9]{4,12}/', $password)){
header('Content-type: application/json');
echo json_encode(array('error' => 'Логин или пароль содержат недопустимые символы.'), true);
exit;
}
MysqlConnect();
$Response = $FairlanceSQL->prepare('SELECT * FROM `users` ORDER BY `sp_user` DESC');
header('Content-type: application/json');
 try{
		$Response->execute(array($login));
		//echo json_encode($Response->fetch(), true);
		} catch (PDOException $e) {
		echo json_encode(array('error' => 'Ошибка: Ошибка выполнения запроса.'), true);
		}
		if($Response->fetch()['sp_password'] == md5($password)){
		$session = sha1($login.$password.time()); // Генерируем секретный ключ доступа
		try{
		$FairlanceSQL->query("UPDATE `users` SET `session`='$session' WHERE `sp_user`='$login'");
		setcookie("session_encrypt", $session, time()+9999999, "/", $_SERVER["SERVER_NAME"], 0);
		} catch(PDOException $e) {
		echo json_encode(array('error' => 'Ошибка: Ошибка выполнения запроса.'), true);
		}
		echo json_encode(array('success' => 'Вы успешно авторизировались.'), true);
		} else {
		echo json_encode(array('error' => 'Ошибка: Неверный логин или пароль.'), true);
		}
break;
case "user_table": 
MysqlConnect();
$Response = $FairlanceSQL->prepare('SELECT * FROM `users` ORDER BY `sp_user` DESC LIMIT 3');
 try{
		$Response->execute();
		?>
     <table class="table table-responsive"><thead><tr><th>Логин</th><th>ФИО</th></tr></thead><tbody> 
		<?
        foreach($Response as $key => $value){
		echo '<tr><td><b><i class="fa fa-user" aria-hidden="true"></i> '.$value["sp_user"].'</b></td><td>'.$value["sp_fio"].'</td></tr>';
		}
		?>
	   </tbody></table>
		<?
		} catch (PDOException $e) {
		echo json_encode(array('error' => 'Ошибка: Ошибка выполнения запроса.'), true);
		}
break;
case "xml_parse": 

break;
case "logout": 
setcookie("session_encrypt", "", null, "/", $_SERVER["SERVER_NAME"], 0);
echo json_encode(array('success' => 'Вы успешно вышли.'), true);
break;
}

?>