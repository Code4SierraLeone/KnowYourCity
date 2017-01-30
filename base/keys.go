package base

import (
	"time"


	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Keys holds metadata about unique key
type Keys struct {
	ID           bson.ObjectId   `bson:"_id" json:"-"`
	Code         string          `bson:"code" json:"code"`
	Timestamp    string          `bson:"timestamp" json:"timestamp"`
	dbCollection *mgo.Collection `bson:"-" json:"-"`
}

func (keys *Keys) Setup(dbSession *mgo.Session) {
	keys.dbCollection = dbSession.DB("system_setup").C("keys")
}

// 
func (keys *Keys) Create() error {
	tz, _ := base.GetTimeZone()
	keys.Timestamp = time.Now().In(tz).Format(time.ANSIC)
	return keys.dbCollection.Insert(keys)
}
func (keys *Keys) Get() ([]Keys, error) {
	var k []Keys
	if err := keys.dbCollection.Find(bson.M{}).All(&k); err != nil {
		return k, err
	}
	return k, nil

}
func (keys *Keys) Update(prevcode string) error {
	keys.Timestamp = time.Now().Format("01/02/2006")
	return keys.dbCollection.Update(bson.M{"code": prevcode}, bson.M{"$set": keys})
}
