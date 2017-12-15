package main

//Simple API that integrates with a service external to the K8S cluster.
//Note the RANDOM_QUOTE_SERVICE environment variable value will be the
//name of the service resource deployed to K8S.
import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	resty "gopkg.in/resty.v1"
)

func main() {

	log.Println("Starting up random-quote api...")
	router := mux.NewRouter()
	router.HandleFunc("/random-quote", getRandomQuote).Methods("GET")
	log.Fatal(http.ListenAndServe(":8000", router))
}

func getRandomQuote(w http.ResponseWriter, r *http.Request) {
	quoteService := os.Getenv("RANDOM_QUOTE_SERVICE")
	log.Printf("Getting random quote from %s for request from %s\n",
		quoteService, r.RemoteAddr)

	resp, err := resty.R().Get(quoteService)

	if err != nil {
		log.Fatal(err)
		panic(err)
	}

	w.Write(resp.Body())
}