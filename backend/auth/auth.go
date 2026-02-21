package auth

import (
	"context"
	"net/http"
	"time"

	"github.com/edisss1/test-constructor/db"
	"github.com/edisss1/test-constructor/structs"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/v2/bson"
)

func Login(c *gin.Context) {

	// getting credentials
	var credentials struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// getting user from the database
	collection := db.DB.Collection("users")
	filter := bson.M{"email": credentials.Email}
	var user structs.User

	// checking if user exists
	err := collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials " + err.Error()})
		return
	}

	// checking if password hash matches the password provided
	err = CheckPasswordHash(user.Password, credentials.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials " + err.Error()})
		return
	}

	// generating JWT
	token, err := GenerateToken(user.ID)

	c.JSON(http.StatusOK, gin.H{"token": token})

}

func SignUp(c *gin.Context) {

	collection := db.DB.Collection("users")

	// getting user data
	var user structs.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// hashing password and setting createdAt
	hashedPassword := HashPassword(user.Password)
	user.Password = hashedPassword
	user.CreatedAt = time.Now()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// inserting user into the database
	_, err := collection.InsertOne(ctx, user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})

}

// GetCurrentUser returns the current logged in user
func GetCurrentUser(c *gin.Context) {
	// getting user ID from the context
	userID, exists := c.Get("id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized in user check"})
		return
	}

	// converting userID to ObjectID
	objID, ok := userID.(primitive.ObjectID)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID type"})
		return
	}

	// getting user from the database
	collection := db.DB.Collection("users")
	var user structs.User
	filter := bson.M{"_id": objID}

	if err := collection.FindOne(context.Background(), filter).Decode(&user); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User doesn't exist: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}
