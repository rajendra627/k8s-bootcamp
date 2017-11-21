FROM mongo

COPY test-data.json /test-data.json
CMD mongoimport --host mongodb --db reach-engine --collection todos --type json --file /test-data.json --jsonArray