package main

import (
	"log"
	"net/http"

	"github.com/edisss1/test-constructor/auth"
	"github.com/edisss1/test-constructor/db"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("failed to load env: %v", err)
	}

	db.Connect()

	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.POST("/login", auth.Login)
	r.POST("/signup", auth.SignUp)
	r.GET("/me", auth.AuthMiddleware(), auth.GetCurrentUser)

	if err := r.Run(); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}

}
