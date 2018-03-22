
Для того чтобы наше приложение имело префикс во 
всех url /etp_front в конфигурацию сервера необходимо 
добавить следующий location

<pre>
location ^~ /etp_front {
    root /srv/www/rad.front;
    try_files $uri $uri/ /etp_front/index.html;
    expires      off;
}
</pre>

Приложение следует собирать командой:
<pre>
ng build --env=prod --base-href=/etp_front/ --output-path=./etp_front
</pre>
запускать из каталога проекта
--env - устанавливает окружение, с которым собирать проект.

На стороне бэкэнда для того чтобы принимать кросдоменные запросы необходимо добавить следующее
для обслуживания запросов типа OPTIONS.
Остальное пропускаем дальше стандартным путем
<pre>
   location / {
        if ($request_method = 'OPTIONS') {
              add_header 'Access-Control-Allow-Origin' "$http_origin";
              #
              # Om nom nom cookies
              #
              add_header 'Access-Control-Allow-Credentials' 'true';
              add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
              #
              # Custom headers and headers various browsers **should** be OK with but aren't
              #
              add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
              #
              # Tell client that this pre-flight info is valid for 20 days
              #
              add_header 'Access-Control-Max-Age' 1728000;
              add_header 'Content-Type' 'text/plain charset=UTF-8';
              
              return 200 'GET,POST';
        }

        try_files $uri $uri/ /index.php$args;
</pre>

Пример запуска при условии что в nginx стоит proxy на запущеную ноду
ng serve  --env=kota --base-href=/etp_front/ --output-path=./etp_front --port=4300 --host=local.test-gz.lot-online.ru
