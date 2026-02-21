package structs

import (
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Question struct {
	ID            bson.ObjectID `bson:"_id,omitempty"`
	Question      string        `bson:"question"`
	Answers       []string      `bson:"answers"`
	CorrectAnswer int           `bson:"correctAnswer"`
}
