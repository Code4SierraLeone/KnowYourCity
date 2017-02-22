package main

import (
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"flag"
	"fmt"
	"gopkg.in/mgo.v2"
	"github.com/gorilla/securecookie"
	"net/http"
	"log"
	//	"reflect"
)

// If content-type not set manually, it will be guessed by http://golang.org/src/pkg/net/http/sniff.go
// w.Header().Set("Content-Type", "text/html; charset=utf-8")
// io.WriteString(w, v)
// io.WriteString(w, `<br><form method="POST" action="/post"><input name="s"></form>`)
// io.WriteString(w, `<div>hello</div>`)

// HTTP is stateless: a client computer running a web browser must establish a new TCP network connection to the web server with each new HTTP GET or POST request. The web server, therefore, cannot rely on an established TCP network connection for longer than a single HTTP GET or POST operation.
// Session management is the technique used by the web developer to make the stateless HTTP protocol support session state. For example, once a user has been authenticated to the web server, the user's next HTTP request (GET or POST) should not cause the web server to ask for the user's account and password again. For a discussion of the methods used to accomplish this please see HTTP cookie.
// http://en.wikipedia.org/wiki/Session_management
// http://en.wikipedia.org/wiki/HTTP_cookie
var store = sessions.NewCookieStore([]byte("something-very-secret"))

var addr = flag.String("addr", ":9004", "http service address") // Q=17, R=18

func main() {
	store.Options.Secure = true
	flag.Parse()
	// If only one version can be returned (i.e., the other redirects to it), that’s great!
	// http://googlewebmastercentral.blogspot.com/2010/04/to-slash-or-not-to-slash.html
	r := mux.NewRouter().StrictSlash(true)
	// If a site is accessed over HTTPS and loads some parts of a page over insecure HTTP, the user might still be vulnerable to some attacks or some kinds of surveillance. For instance, the New York Times makes many HTML pages available in HTTPS, but other resources such as images, CSS, JavaScript, or third party ads and tracking beacons, are only loadable over HTTP. That means that these resources are sent unencrypted, and someone spying on you could probably infer the article you were reading.
	// There are also potential vulnerabilities when parts of a page are loaded over HTTP because an attacker might replace them with versions containing false information, or Javascript code that helps the attacker spy on the user or take over an account.
	//
	// In order to [enable HTTPS by default for GMail] we had to deploy
	// no additional machines and no special hardware. On our production
	// frontend machines, SSL/TLS accounts for less than 1% of the CPU load, less
	// than 10KB of memory per connection and less than 2% of network overhead.
	// www.eff.org/https-everywhere/faq

	// no referral with https?

	//Not needed, because there is redirecting
	//s := r.Schemes("https").Sub-router()
	r.HandleFunc("/", http.HandlerFunc(index))
	// REST good practice: trailing slash denotes a directory, while the lack of it denotes a file/resource
	// http://techblog.bozho.net/?p=401
	r.HandleFunc("/login", http.HandlerFunc(Login))
	r.HandleFunc("/register", http.HandlerFunc(Register))
	r.HandleFunc("/password/reset", http.HandlerFunc(ResetPassPage))
	r.HandleFunc("/password/reset", http.HandlerFunc(ResetPass))
	r.HandleFunc("/password/forgot", http.HandlerFunc(ForgotPass))
	r.HandleFunc("/2factor", http.HandlerFunc(L2Factor))
	r.HandleFunc("/logout", http.HandlerFunc(Logout))
	r.HandleFunc("/code/get", http.HandlerFunc(GetSecretCode))
	r.HandleFunc("/code/set", http.HandlerFunc(SetSecretCode))


	http.Handle("/", r)
	fs := JustFilesFilesystem{http.Dir("assets/")}
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(fs)))

	// starting in goroutines with error reporting, thanks to davecheney from #go-nuts
	// like this: http://serverfault.com/questions/67316/in-nginx-how-can-i-rewrite-all-http-requests-to-https-while-maintaining-sub-dom
	// It will direct from http://localhost/users to https://localhost:9999/users, but not from http://localhost:9999/users
	go func() {
		log.Fatalf("ListenAndServe: %v", http.ListenAndServe(":9004", http.HandlerFunc(notlsHandler)))
	}()
	go func() {
		fmt.Println("https://localhost"+*addr)
		// go run generate_cert.go --host localhost
		// this works for other domain than localhost, no need to supply domain name:
		// openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes
		// http://stackoverflow.com/questions/10175812/how-to-build-a-self-signed-certificate-with-openssl
		log.Fatalf("ListenAndServeTLS: %v", http.ListenAndServeTLS(*addr, "tls/cert.pem", "tls/key.pem", nil))
	}()
	select {}

}

func index(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if r.Method != "GET" || r.URL.Path != "/" {
		serve404(w)
		return
	}

	pageTemplate.Execute(w, tplValues)
	if err != nil {
		serveError(w, err)
	}

}
