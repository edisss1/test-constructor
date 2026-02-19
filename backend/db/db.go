package db

import (
	"context"
	"log"
	"os"
	"sync"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var (
	Client *mongo.Client
	Once   sync.Once
	DB     *mongo.Database
	DBName = "test-constructor"
)

func Connect() {
	Once.Do(func() {
		mongoURI := os.Getenv("MONGO_URI")
		clientOptions := options.Client().ApplyURI(mongoURI)

		var err error
		Client, err = mongo.Connect(clientOptions)
		if err != nil {
			log.Fatalf("Failed to connect to MongoDB: %v", err)
		}

		if err = Client.Ping(context.Background(), nil); err != nil {
			log.Fatalf("Failed to ping MongoDB: %v", err)
		}

		DB = Client.Database(DBName)
		log.Println("Connected to MongoDB")

		usersCollection := DB.Collection("users")

		indexModel := mongo.IndexModel{
			Keys:    bson.M{"email": 1},
			Options: options.Index().SetUnique(true),
		}

		_, err = usersCollection.Indexes().CreateOne(context.Background(), indexModel)
		if err != nil {
			log.Fatalf("Failed to create email index: %v", err)
		}
	})
}
