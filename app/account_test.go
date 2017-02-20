package main

import (
	"log"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"strings"
	"testing"

	"gopkg.in/mgo.v2"

	"github.com/Code4SierraLeone/KnowYourCity/base"
)

func aTestRegistration(t *testing.T) {
	file, err := os.OpenFile("error.log", os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0666)
	if err != nil {
		log.Fatal(err)
	}
	base.Init(file)
	_, err1 := mgo.Dial("localhost")
	if err1 != nil {
		t.Fatal(err1)
	}
	params := url.Values{
		"email":       []string{"e@g.com"},
		"userName":   []string{"sa"},,
		"password":    []string{"1234"},
	}
	r, err2 := http.NewRequest("POST", "localhost:8090/register", strings.NewReader(params.Encode()))
	if err2 != nil {
		t.Fatal(err2)
	}
	r.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")
	w := httptest.NewRecorder()
	// OpenVars(r)
	// SetVar(r, "db", db)
	Register(w, r)
	if w.Code != http.StatusOK {
		t.Fatal(w.Body)
	}
}
func aTestLogin(t *testing.T) {
	file, err := os.OpenFile("error.log", os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0666)
	if err != nil {
		log.Fatal(err)
	}
	base.Init(file)
	params := url.Values{
		"email":    []string{"e@g.com"},
		"password": []string{"1234"},
	}
	r, err1 := http.NewRequest("POST", "localhost:8090/login", strings.NewReader(params.Encode()))
	if err1 != nil {
		t.Fatal(err1)
	}
	r.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")
	w := httptest.NewRecorder()
	Login(w, r)
	if w.Code != http.StatusOK {
		t.Fatal(w.Body)
	}
}

func aTest2F(t *testing.T) {
	file, err := os.OpenFile("error.log", os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0666)
	if err != nil {
		log.Fatal(err)
	}
	base.Init(file)
	params := url.Values{
		"uid":  []string{"SU-14059"},
		"code": []string{"10456"},
	}
	r, err1 := http.NewRequest("POST", "localhost:8090/2factor", strings.NewReader(params.Encode()))
	if err1 != nil {
		t.Fatal(err1)
	}
	r.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")
	w := httptest.NewRecorder()
	L2Factor(w, r)
	if w.Code != http.StatusOK {
		t.Fatal(w.Body)
	}
}

func aTestLogout(t *testing.T) {
	file, err := os.OpenFile("error.log", os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0666)
	if err != nil {
		log.Fatal(err)
	}
	base.Init(file)
	params := url.Values{
		"uid": []string{"SU-14059"},
	}
	r, err1 := http.NewRequest("POST", "localhost:8090/logout", strings.NewReader(params.Encode()))
	if err1 != nil {
		t.Fatal(err1)
	}
	r.Header.Set("Content-Type", "application/x-www-form-urlencoded; param=value")
	w := httptest.NewRecorder()
	Logout(w, r)
	if w.Code != http.StatusOK {
		t.Fatal(w.Body)
	}
}
