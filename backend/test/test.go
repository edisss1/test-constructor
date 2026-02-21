package test

import (
	"net/http"
	"time"

	"github.com/edisss1/test-constructor/db"
	"github.com/edisss1/test-constructor/structs"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

func CreateTest(c *gin.Context) {
	var test structs.Test

	if err := c.ShouldBindJSON(&test); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// getting creatorID from JWT
	creatorID, exists := c.Get("id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// setting creatorID
	test.CreatorID = creatorID.(bson.ObjectID)

	// setting createdAt and updatedAt
	test.CreatedAt = time.Now()
	test.UpdatedAt = time.Now()

	collection := db.DB.Collection("tests")

	// inserting test into the collection
	_, err := collection.InsertOne(c, test)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Test created successfully"})
}
