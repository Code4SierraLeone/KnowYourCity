package base

import (
	"net/http"
	"sync"

	"gopkg.in/mgo.v2"
)

var dbSessions = make(map[*http.Request]map[string]interface{})
var dbSessionsLock sync.RWMutex

func SetVar(r *http.Request, key string, val interface{}) {
	dbSessionsLock.Lock()
	if dbSessions == nil {
		dbSessions = map[*http.Request]map[string]interface{}{}
	}
	if dbSessions[r] == nil {
		dbSessions[r] = make(map[string]interface{})
	}
	dbSessions[r][key] = val
	dbSessionsLock.Unlock()
}

func GetVar(r *http.Request, key string) interface{} {
	dbSessionsLock.Lock()
	val := dbSessions[r][key]
	dbSessionsLock.Unlock()
	return val
}

func RemoveVars(r *http.Request) {
	dbSessionsLock.Lock()
	delete(dbSessions, r)
	dbSessionsLock.Unlock()
}
func DbSession(db *mgo.Session, next http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		thisDb := db.Copy()
		defer thisDb.Close()
		SetVar(r, "db", thisDb)
		next(rw, r)

	}
}
