package main

import (
	"log"
	"net/http"
	"os"
	"os/user"
)

// Simple HTTP server that will serve static files from a specified directory.
// @author Jungho Kim, jk@architech.ca

func main() {
	if user, err := user.Current(); err != nil {
		log.Printf("Running as UID: %s, GID: %s, Username: %s",
			user.Uid, user.Gid, user.Username)
	} else {
		log.Fatalf("Failed to get UID/GID.  Error %s", err)
	}

	if htmlDir := os.Getenv("HTML_DIR"); len(htmlDir) > 0 {
		log.Printf("Serving html files from %s", htmlDir)
		log.Fatal(http.ListenAndServe(":8080", http.FileServer(http.Dir(htmlDir))))
	} else {
		log.Fatal("Invalid HTML_DIR.  Must be a full path to an existing directory.")
	}
}
