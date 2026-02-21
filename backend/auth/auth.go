package auth

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/edisss1/test-constructor/db"
	"github.com/edisss1/test-constructor/structs"
	"github.com/gin-gonic/gin"
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
	accessToken, _ := GenerateAccessToken(user.ID)
	refreshToken, _ := GenerateRefreshToken(user.ID)

	// TODO: remove this
	log.Printf("Access token: %v, Refresh token: %v", accessToken, refreshToken)

	refresh := RefreshTokenClaims{
		UserID:    user.ID,
		Token:     refreshToken,
		ExpiresAt: time.Now().Add(time.Hour * 24 * 30),
	}

	// storing refresh token in the db
	_, err = db.DB.Collection("refresh-tokens").InsertOne(ctx, refresh)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert token"})
		return
	}

	c.SetCookie("refreshToken", refreshToken, int(time.Hour*24*30), "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{"token": accessToken})

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

func Refresh(c *gin.Context) {
	// getting refresh token from cookie
	refreshToken, err := c.Cookie("refreshToken")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No refresh token"})
		return
	}

	// validating refresh token
	claims, err := ValidateToken(refreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid refresh token"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := db.DB.Collection("refresh-tokens")
	var stored RefreshTokenClaims
	filter := bson.M{"token": refreshToken}

	err = collection.FindOne(ctx, filter).Decode(&stored)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Refresh token not found"})
		return
	}

	// rotating refresh token
	_, err = collection.DeleteOne(ctx, filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting refresh token " + err.Error()})
	}

	// creating new tokens
	newRefreshToken, err := GenerateRefreshToken(claims.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating refresh token " + err.Error()})
	}
	newAccessToken, err := GenerateAccessToken(claims.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating access token " + err.Error()})
	}

	// storing new refresh token in cookie
	c.SetCookie("refreshToken", newRefreshToken, int(time.Hour*24*30), "/", "", false, true)

	// sending new access token
	c.JSON(http.StatusOK, gin.H{"token": newAccessToken})

}

func Logout(c *gin.Context) {
	refreshToken, err := c.Cookie("refreshToken")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No refresh token"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	collection := db.DB.Collection("refresh-tokens")
	filter := bson.M{"token": refreshToken}

	// deleting refresh token from cookie and db
	c.SetCookie("refreshToken", "", -1, "/", "", false, true)
	_, err = collection.DeleteOne(ctx, filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting refresh token " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
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
	objID, ok := userID.(bson.ObjectID)
	log.Printf("User ID: %v", objID)
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
