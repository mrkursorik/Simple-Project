-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 04 2016 г., 23:53
-- Версия сервера: 5.5.50-log
-- Версия PHP: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `SimpleProject`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `sp_id` int(11) unsigned NOT NULL,
  `sp_user` varchar(255) NOT NULL,
  `sp_group` int(2) DEFAULT '1',
  `sp_password` varchar(255) NOT NULL,
  `session` varchar(100) DEFAULT NULL,
  `sp_regdate` timestamp NULL DEFAULT NULL,
  `sp_about` text NOT NULL,
  `sp_fio` varchar(255) NOT NULL,
  `sp_photo` varchar(255) DEFAULT NULL,
  `sp_other` varchar(255) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`sp_id`, `sp_user`, `sp_group`, `sp_password`, `session`, `sp_regdate`, `sp_about`, `sp_fio`, `sp_photo`, `sp_other`) VALUES
(1, 'admin', 1, '098f6bcd4621d373cade4e832627b4f6', 'b9af76078dca4cc7e485ccde1c9640b1fab0217c', '2016-10-03 12:25:00', 'Пишу стихи по утрам.', 'Есенин Сергей Александрович', 'https://pic.rutube.ru/user/a5/81/a581ed9d0e5cd166bda67d4bdc07e005.png', 'dolor ipsum'),
(2, 'PushkinAS', 0, '098f6bcd4621d373cade4e832627b4f6', '985b5da45eecd624f18ba7f5846267ecdb76ddfe', '2016-10-04 03:10:00', 'Мороз и солнце...', 'Пушкин Александр Сергеевич', 'https://pic.rutube.ru/user/a5/81/a581ed9d0e5cd166bda67d4bdc07e005.png', 'dolor ipsum'),
(3, 'Bethoven1770', 0, '098f6bcd4621d373cade4e832627b4f6', '139bbef16f185ca1b6c5e8e5c7473505be063c9b', '2016-10-04 16:10:00', 'Сочиняю музыку по вечерам.', 'Бетховен Людвиг Ван', 'https://pic.rutube.ru/user/a5/81/a581ed9d0e5cd166bda67d4bdc07e005.png', 'dolor ipsum');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`sp_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `sp_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
