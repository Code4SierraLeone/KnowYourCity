// The main binary is the KnowYourCity server.
package main

import (
	"encoding/json"
	"log"
	"flag"
	"net/http"
	"flag"

	"github.com/Code4SierraLeone/KnowYourCity/base" // interesting approach here, have to look it up

	"gopkg.in/mgo.v2"
	"github.com/bitly/go-nsq"
	"github.com/fatih/color"
	"github.com/go-errors/errors"
	"github.com/gorilla/mux"
	"github.com/gorilla/securecookie"
)

var hashKey = securecookie.GenerateRandomKey(32)
var blockKey = securecookie.GenerateRandomKey(32)
var sc = securecookie.New(hashKey, blockKey)

// Configures variables
var (
	serveraddr string
)

func main() {
	serveraddr = *flag.String("srv", ":9004", "-srv=addr; set server listening address.Default :9004")
	flag.Parse()

	dbSession, err := dialDB()
	if err != nil {
		log.Fatal(err)
	}

	router := mux.NewRouter()
	setAccountRoutes(router, dbSession)

	// TODO: Switch to TLS in prod(samson)
	http.ListenAndServe(serveraddr, router)
}

func dialDB() (*mgo.Session, error) {
	return mgo.Dial("localhost")
}

func setAccountRoutes(router *mux.Router, dbSession *mgo.Session) {
	router.HandleFunc("/account/register", withCORS(withClient(DbSession(db, SecretCode(Register))))).Methods("POST")
	router.HandleFunc("/account/login", withCORS(withClient(DbSession(db, Login)))).Methods("POST")
	router.HandleFunc("/account/password/forgot", withCORS(withClient(DbSession(db, ForgotPass)))).Methods("POST")
	router.HandleFunc("/page/account/password/reset", withCORS(withClient(DbSession(db, ResetPassPage)))).Methods("POST")
	router.HandleFunc("/account/password/reset", withCORS(withClient(DbSession(db, ResetPass)))).Methods("POST")
	router.HandleFunc("/account/2factor", withCORS(withClient(DbSession(db, L2Factor)))).Methods("POST")
	router.HandleFunc("/account/logout", withCORS(withClient(DbSession(db, Logout)))).Methods("POST")

	router.HandleFunc("/keys/code/get", withCORS(withClient(DbSession(dbSession, GetSecretCode))))
	router.HandleFunc("/keys/code/set", withCORS(withClient(DbSession(dbSession, SetSecretCode))))
}

func ReportFatal(rw http.ResponseWriter, r *http.Request, err error) {
	cometutils.RespondError(rw, r, err)
}

// LogError logs errors to file and stderr
func LogError(err error) {
	color.Set(color.BgRed)
	cometutils.Error.Println(errors.Wrap(err, 1).ErrorStack())
	color.Unset()
}

// LogWarning logs warnings to stdout
func LogWarning(info interface{}) {
	color.Set(color.BgYellow)
	cometutils.Warning.Println(info)
	color.Unset()
}

// LogDebug logs debug info to stdout
func LogDebug(info interface{}) {
	color.Set(color.BgCyan)
	cometutils.Debug.Println(info)
	color.Unset()
}

// LogInfo logs info to
func LogInfo(info interface{}) {
	color.Set(color.BgGreen)
	cometutils.Info.Println(info)
	color.Unset()
}


/*
For purpose of TLS in TODO :42
func setupTLS(ws *webserver.Server, config *serverinit.Config, hostname string) {
	cert, key := config.OptionalString("httpsCert", ""), config.OptionalString("httpsKey", "")
	if !config.OptionalBool("https", true) {
		return
	}
	if (cert != "") != (key != "") {
		exitf("httpsCert and httpsKey must both be either present or absent")
	}

	defCert := osutil.DefaultTLSCert()
	defKey := osutil.DefaultTLSKey()
	const hint = "You must add this certificate's fingerprint to your client's trusted certs list to use it. Like so:\n\"trustedCerts\": [\"%s\"],"
	if cert == defCert && key == defKey {
		_, err1 := wkfs.Stat(cert)
		_, err2 := wkfs.Stat(key)
		if err1 != nil || err2 != nil {
			if os.IsNotExist(err1) || os.IsNotExist(err2) {
				sig, err := httputil.GenSelfTLSFiles(hostname, defCert, defKey)
				if err != nil {
					exitf("Could not generate self-signed TLS cert: %q", err)
				}
				log.Printf(hint, sig)
			} else {
				exitf("Could not stat cert or key: %q, %q", err1, err2)
			}
		}
	}
	// Always generate new certificates if the config's httpsCert and httpsKey are empty.
	if cert == "" && key == "" {
		sig, err := httputil.GenSelfTLSFiles(hostname, defCert, defKey)
		if err != nil {
			exitf("Could not generate self signed creds: %q", err)
		}
		log.Printf(hint, sig)
		cert = defCert
		key = defKey
	}
	data, err := wkfs.ReadFile(cert)
	if err != nil {
		exitf("Failed to read pem certificate: %s", err)
	}
	sig, err := httputil.CertFingerprint(data)
	if err != nil {
		exitf("certificate error: %v", err)
	}
	log.Printf("TLS enabled, with SHA-256 certificate fingerprint: %v", sig)
	ws.SetTLS(cert, key)
}
*/

