package base

import (
	"errors"
	"net/rpc"
	"time"

	"github.com/Code4SierraLeone/KnowYourCity/utils"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Authentication holds metadata about Admin User for Authentication.
type Authentication struct {
	Id           bson.ObjectId   `bson:"_id"`
	UID          string          `bson:"uid"`
	Email        string          `bson:"email"`
	Password     string          `bson:"password"`
	Code         int             `bson:"code"` // for 2 factor auth
	LastLogin    string          `bson:"last_login"`
	dbCollection *mgo.Collection `bson:"-"`
}

var localSession *mgo.Session

// Setup creates an instance session with new unique key per session
func (auth *Authentication) Setup(session *mgo.Session) {
	auth.dbCollection = session.DB("system_users").C("sys_authentication")
	localSession = session.Copy()
	index := mgo.Index{
		Key:    []string{"email"},
		Unique: true,
		Sparse: true,
	}
	auth.dbCollection.EnsureIndex(index)
}

func (auth *Authentication) Create() error {
	if auth.dbCollection == nil {
		return errors.New("Uninitialized Object Authentication")
	}
	tz, _ := utils.GetTimeZone()
	auth.LastLogin = time.Now().In(tz).Format(time.ANSIC)
	return auth.dbCollection.Insert(auth)
}

func (auth *Authentication) Get(uid string) error {
	return auth.dbCollection.Find(bson.M{"uid": uid}).One(auth)
}

func (auth *Authentication) Delete() error {
	return auth.dbCollection.RemoveId(auth.Id)
}
func (auth *Authentication) Update() error {
	if auth.dbCollection == nil {
		return errors.New("Uninitialized Object Authentication")
	}
	query := bson.M{"_id": auth.Id}
	change := bson.M{"$set": auth}
	return auth.dbCollection.Update(query, change)
}

// AuthenticateAdmin queries the db for admin user and verifies auth details
func (auth *Authentication) AuthenticateAdmin(email, pass string, client *rpc.Client) error {
	if auth.dbCollection == nil {
		return errors.New("Uninitialized Object Authentication")
	}
	if auth.dbCollection.Find(bson.M{"email": email, "password": pass}).One(auth) != nil {
		return errors.New("not found")
	}
	// Call to helper service to generate disposable auth code
	var authCode int

	admin := new(Admin)
	admin.Setup(localSession.Copy())
	if err := client.Call("UUIDGenerator.GenerateAuthCode", 0, &authCode); err != nil {
		return err
	}
	if admin.Get(email, "") != nil {
		return errors.New("Admin does not exist")
	}
	auth.Setup(localSession.Copy())
	auth.Code = authCode
	auth.LastLogin = time.Now().String()
	if err := auth.Update(); err != nil {
		return err
	}
	return nil
}

// AuthenticateSysUser authenticates the user and on success creates a new session
func (auth *Authentication) AuthenticateSysUser(email, pass string) error {
	// add session
	if auth.dbCollection == nil {
		return errors.New("Uninitialized Object Authentication")
	}
	return auth.dbCollection.Find(bson.M{"email": email, "password": pass}).One(auth)
}
