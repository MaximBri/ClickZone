#!/bin/bash

while true; do
    flask db upgrade
    if [[ "$?" == "0" ]]; then
        echo "Database upgrade successful."
        break
    else
        echo "Database upgrade failed, retrying in 5 seconds..."
        sleep 5
    fi
done

exec gunicorn -b :5000 --access-logfile - --error-logfile - ClickZone:app