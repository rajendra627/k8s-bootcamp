FROM mongo

WORKDIR /data
COPY *.json /data/
COPY import_data.sh .
CMD chmod +x import_data.sh && ./import_data.sh