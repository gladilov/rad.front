
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

