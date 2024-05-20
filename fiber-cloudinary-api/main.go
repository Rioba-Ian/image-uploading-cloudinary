package main

import (
	"fiber-cloudinary-api/controllers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000, https://image-uploading-cloudinary.vercel.app",
	}))

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendStatus(200)
	})

	app.Post("/file", controllers.FileUpload)
	app.Post("/remote", controllers.RemoteUpload)

	app.Listen(":8080")
}
