package base

import (
	"net/rpc"
	"testing"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

var selCode int

func TestCreateAuth(t *testing.T) {
	mSession, err := mgo.Dial("localhost")
	if err != nil {
		t.Fatal("Session Creation failed")
	}
	auth := new(Authentication)
	auth.Setup(mSession)
	auth.Id = bson.NewObjectId()
	auth.UID = "2222"
	auth.Email = "e@g.com"
	auth.Password = "1234"
	auth.Code = 0
	if err := auth.Create(); err != nil {
		t.Fatal(err)
	}
}

func TestAuthAdmin(t *testing.T) {
	mSession, err := mgo.Dial("localhost")
	if err != nil {
		t.Fatal("Session Creation failed")
	}
	client, err1 := rpc.DialHTTP("rcp", ":9004")
	if err1 != nil {
		t.Fatal(err1)
	}
	auth := new(Authentication)
	auth.Setup(mSession)
	if err := auth.AuthenticateAdmin("e@g.com", "1234", client); err != nil {
		t.Fatal(err)
	}
	selCode = auth.Code
}

func Test2F(t *testing.T) {
	mSession, err := mgo.Dial("localhost")
	if err != nil {
		t.Fatal("Session Creation failed")
	}
	auth := new(Authentication)
	auth.Setup(mSession)
	if err := auth.Complete2F("2222", selCode); err != nil {
		t.Fatal(err)
	}
}
