FROM mongo

COPY *.json /data/
COPY import_data.sh /data/
WORKDIR /data
CMD chmod u+x import_data.sh && ./import_data.sh
