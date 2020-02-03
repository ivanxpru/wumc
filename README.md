# Wii U Media Center

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6bbce57a45f444f5906731c6292b1439)](https://app.codacy.com/manual/ivanxp/wumc?utm_source=github.com&utm_medium=referral&utm_content=ivanxpru/wumc&utm_campaign=Badge_Grade_Dashboard)

Смотрим фильмы и сериалы на игровой консоли **Nintendo Wii U**!
## Подготовка

Для работы проекта необходимы: `node.js`, а также любой веб-сервер. Их установка и настройка не входит в данное описание, используйте любые другие, удобные для вас ресурсы.

## Подготовка веб-сервера для доступа к медиафайлам

Необходимо настроить доступ через веб-интерфейс к директории, где будет хранится ваша медиатека. Листинг директорий через веб необязателен, т.к. будут использоваться прямые ссылки к файлам. Например, ваша медиатека расположена в директории `/media/wumc/`, а через веб она будет доступна по адресу: `http://server/wumc`

## Подготовка структуры медиатеки

Например, если ваша медиатека будет расположена в директории `/media/wumc`, то внутри необходимо создать папки:
```
/media/wumc/tv
/media/wumc/movies
/media/wumc/serials
```
## Подготовка медиафайлов

**Wii U Media Center** работает как HLS-сервер, поэтому вам необходимо подготовить файлы для работы. 

Игровая консоль Nintendo Wii U поддерживает видеофайлы с видеокодеком `H.264` и аудиокодеком `AAC/2ch`. Несколько аудиодорожек **Nintendo Wii U** не поддерживает. Поэтому, если исходный файл кодирован с использованием этих кодеков, то конвертация в HLS-формат значительно ускорится. Идеально подходят видеофайлы предназначенные для просмотра на **Apple TV**.

Теперь разберём подготовку медиафайлов для просмотра.

 Начнём с подготовки фильма. Фильмы будут хранится в директории `/media/movies`. Далее в этой директории необходимо создать дополнительные директории со списком жанров. Например: `adventure  drama  family  fantasy  sci-fi  thriller`. Зайдите в директорию, наиболее близкую по жанру для вашего фильма и создайте там директорию с названием фильма. Например, у вас получится так: `/media/wumc/movies/sci-fi/Ready Player One`. Далее внутри директории с фильмом необходимо разместить три файла:
 ```
 poster.jpg - постер фильма. Размер 220x330 px.
 background.jpg - фоновое изображение. Размер  1920x1080 px.
 overview.txt - краткое описание фильма.
 ```
 Всё необходимое можно найти на сайте [themoviedb.org](https://www.themoviedb.org/) или любом другом.
Всё готово для кодирования фильма. Зайдём в директорию с фильмом и введём команду: 
`ffmpeg -i ~/Downloads/Your_film.mkv -map 0:0 -map 0:1 -c:v copy -c:a aac -b:a 160k -ac 2 -movflags +faststart  -bsf:v h264_mp4toannexb -start_number 0 -hls_time 10 -hls_list_size 0 -f hls -hls_segment_filename video_seg%3d.ts playlist.m3u8`.
В данном примере мы кодируем аудиодорожку в формат `AAC/2ch`, а видеодорожку оставляем без изменений, при условии, что она в формате `H.264`.
На выходе мы должны получить файл `playlist.m3u8` и множество файлов `video_segXXX.ts`. Фильм готов!

Для сериалов необходимо создать допольнительные директории с номером сезона сериала. Например:
`/media/wumc/serials/sci-fi/Stranger Things/Season 1`
Далее для каждого эпизода необходимо создать директории, которые содержат вначале нумерацию сезона и эпизода в формате `sXXeXX.Episode_name`. Например:
`/media/wumc/serials/sci-fi/Stranger Things/Season 1/s01e01.Chapter One: The Vanishing of Will Byers`
Далее необходимо зайти в директорию с эпизодом и аналогично подготовке фильмов произвести кодирование видеофайла.

## Установка Wii U Media Center

Для установки **Wii U Media Center** необходимо войти в папку `wumc` и запустить в терминале команду: `npm install` Установятся все необходимые для работы приложения пакеты.

## Развёртывание Wii U Media Center

Зайдите в папку `wumc` и введите в терминале команду:
`npm run build`
После того как выполнение команды завершится у вас появится папка: `wumc/dist` Зайдите в неё и откройте в тектовом редакторе файл `config.json`  В этом файле вы можете изменить порт, на котором будет работать сервер **Wii U Media Center** и указать расположение директорий с фильмами и сериалами. Также необходимо указать путь (path), по которому эти директории будут доступны через http.

## Запуск Wii U Media Center

Зайдите в папку `wumc` и введите в терминале команду:
`npm run start`
При успешном запуске вы увидите в терминале сообщение:
`Запущен сервер express на порту 9000`
Номер порта может отличаться от указанного, если вы его изменили в файле `config.jsom`.

Теперь на **Wii U Gamepad** запустите веб-браузер и введите адрес: `http://server_ip:9000/` Должна открыться главная страница **Wii U Media Center**. Чтобы скрыть нижние кнопки навигации браузера, нажмите на левый стик. Интерфейс **Wii U Media Center** интуитивно понятен и описывать его тут нет смысла.

Наслаждайтесь просмотром!