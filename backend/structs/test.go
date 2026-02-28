package structs

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type Test struct {
	ID               bson.ObjectID `bson:"_id,omitempty"`
	CreatorID        bson.ObjectID `bson:"creatorID"`
	Name             string        `bson:"name"`
	Questions        []Question    `bson:"questions"`
	MultipleVariants bool          `bson:"multipleVariants"`
	CreatedAt        time.Time     `bson:"createdAt"`
	UpdatedAt        time.Time     `bson:"updatedAt"`
}
