package base

import (
	"net/http"

	"github.com/Code4SierraLeone/KnowYourCity/base"

	"gopkg.in/mgo.v2"
)

func withCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		rw.Header().Set("Access-Control-Allow-Origin", "*")
		next(rw, r)
	}
}

func withUID(next http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		uid := r.FormValue("uid")
		if uid == "" {
			base.RespondError(rw, r, "No UID")
			return
		}
		client, err := rpc.DialHTTP("tcp", ":9004")
		if err != nil {
			ReportFatal(rw, r, err)
			return
		}
		defer client.Close()
		var valid bool
		if err := client.Call("UUIDValidator.Validate", uid, &valid); err != nil {
			ReportFatal(rw, r, err)
			return
		}
		if !valid {
			base.RespondError(rw, r, "Invalid UID. No Session exists")
			return
		}
		if !CheckSession(r.Header.Get("X-FORWARDED-FOR"), uid) {
			base.RespondCustom(rw, r, 10, "Invalid IP")
			return
		}
		SetVar(r, "uid", uid)
		next(rw, r)
	}
}

func WithDB(dbSession *mgo.Session, next http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		mydb := dbSession.Copy()
		defer mydb.Close()
		SetVar(r, "db", mydb)
		next(rw, r)
	}
}

func withClient(next http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		client, err := rpc.DialHTTP("tcp", ":9004")
		if err != nil {
			ReportFatal(rw, r, err)
			return
		}
		defer client.Close()
		SetVar(r, "rpc", client)
		next(rw, r)
	}

}


