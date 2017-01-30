package base

import (
	"testing"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func TestCreateA(t *testing.T) {
	mSession, err := mgo.Dial("localhost")
	if err != nil {
		t.Fatal("Session Creation failed")
	}
	ad := new(Admin)
	ad.Id = bson.NewObjectId()
	ad.UID = "test"
	ad.Email = "g@g.com"
	ad.UserName = "test"
	ad.Designation = "1"
	ad.Setup(mSession)
	if err := ad.Create(); err != nil {
		t.Fatal(err)
	}
}

func TestGetA(t *testing.T) {
	mSession, err := mgo.Dial("localhost")
	if err != nil {
		t.Fatal("Session Creation failed")
	}
	ad := new(Admin)
	ad.Setup(mSession)
	if err := ad.Get("g@g.com", ""); err != nil {
		t.Error(err)
	}
}

func TestDeleteA(t *testing.T) {
	mSession, err := mgo.Dial("localhost")
	if err != nil {
		t.Fatal("Session Creation failed")
	}
	ad := new(Admin)
	ad.Setup(mSession)
	if t.Failed() {
		t.Error("Relies on GET test")
	}
	ad.Get("g@g.com", "")
	ad.Setup(mSession)
	if err := ad.Delete(); err != nil {
		t.Error(err)
	}
}

func TestUpdateA(t *testing.T) {
	mSession, err := mgo.Dial("localhost")
	if err != nil {
		t.Fatal("Session Creation failed")
	}
	ad := new(Admin)
	ad.Setup(mSession)
	ad.Id = bson.NewObjectId()
	ad.UID = "test"
	ad.Email = "g@g.com"
	ad.UserName = "test"
	ad.Designation = "1"
	if err := ad.Update(); err != nil {
		t.Fatal(err)
	}
}
