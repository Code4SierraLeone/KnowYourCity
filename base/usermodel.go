package base

import (
	"errors"
	"time"

	"github.com/Code4SierraLeone/KnowYourCity/base"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Admin holds metadata about a Admin User.
type Admin struct {
	Id           bson.ObjectId   `bson:"_id" json:"-"`
	UID          string          `bson:"uid" json:"uid"`
	Email        string          `bson:"email" json:"email"`
	UserName     string          `bson:"user_name" json:"userName"`
	Timestamp    string          `bson:"timestamp" json:"timestamp"`
	dbCollection *mgo.Collection `bson:"-" json:"-"`
}

// Setup sets up the collection to use for the mongodb instance
func (ad *Admin) Setup(dbSession *mgo.Session) {
	ad.dbCollection = dbSession.DB("system_users").C("admins")
	index := mgo.Index{
		Key:    []string{"email"},
		Unique: true,
		Sparse: true,
	}
	ad.dbCollection.EnsureIndex(index)
}

// Create creates an administrator account
func (ad *Admin) Create() error {
	if ad.dbCollection == nil {
		return errors.New("Uninitialized Object Admin")
	}
	tz, _ := base.GetTimeZone()
	ad.Timestamp = time.Now().In(tz).Format(time.ANSIC)
	return ad.dbCollection.Insert(ad)
}

// Update updates the current administrator details
func (ad *Admin) Update() error {
	if ad.dbCollection == nil {
		return errors.New("Uninitialized Object Admin")
	}
	query := bson.M{"uid": ad.UID}
	change := bson.M{"$set": ad}
	return ad.dbCollection.Update(query, change)
}

// Delete deletes the current administrator
func (ad *Admin) Delete() error {
	if ad.dbCollection == nil {
		return errors.New("Uninitialized Object Admin")
	}
	return ad.dbCollection.RemoveId(ad.Id)
}

// Get gets an admin by email or uid
func (ad *Admin) Get(email, uid string) error {
	if ad.dbCollection == nil {
		return errors.New("Uninitialized Object Admin")
	}
	if email == "" { //use uid
		return ad.dbCollection.Find(bson.M{"uid": uid}).One(ad)
	}
	return ad.dbCollection.Find(bson.M{"email": email}).One(ad)

}

// GetAllAdmins queries the database for,` and returns all admins
func GetAllAdmins(session *mgo.Session) ([]Admin, error) {
	collection := session.DB("system_users").C("admins")
	var admins []Admin
	return admins, collection.Find(nil).All(&admins)

}
