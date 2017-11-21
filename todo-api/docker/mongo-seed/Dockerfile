FROM mongo

COPY test-todoItems.json /test-todoItems.json
CMD mongoimport --host mongodb --db reach-engine --collection todos --type json --file /test-todoItems.json --jsonArray