package main

import (
	"log"
	"time"

	"github.com/edisss1/test-constructor/auth"
	"github.com/edisss1/test-constructor/db"
	"github.com/edisss1/test-constructor/test"
	"github.com/gin-contrib/cors"
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

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           24 * time.Hour,
	}))

	routeGroup := r.Group("/api")

	routeGroup.Use(auth.AuthMiddleware())

	// auth and user data
	r.POST("/login", auth.Login)
	r.POST("/signup", auth.SignUp)
	r.POST("/logout", auth.Logout)
	routeGroup.GET("/refresh", auth.Refresh)

	routeGroup.GET("/me", auth.GetCurrentUser)

	// tests
	r.POST("/tests", auth.AuthMiddleware(), test.CreateTest)

	if err := r.Run(); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}

}
