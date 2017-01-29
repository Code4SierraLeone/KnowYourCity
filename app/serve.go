package main

import (
	"net/http"
	"flag"
)

var (
	serveraddr string
)

func main() {
	serveraddr = *flag.String("srv", ":9004", "-srv=addr; set server listening address.Default :9004")
	flag.Parse()

	http.ListenAndServe(serveraddr, http.FileServer(http.Dir("")))
}

/*
Temporary server
*/
