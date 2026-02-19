package structs

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type User struct {
	ID        bson.ObjectID `bson:"_id,omitempty"`
	UserName  string        `json:"userName" bson:"userName"`
	Email     string        `json:"email" bson:"email"`
	Password  string        `json:"password" bson:"password"`
	CreatedAt time.Time     `json:"createdAt" bson:"createdAt"`
}
