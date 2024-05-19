package main

import (
	"fiber-cloudinary-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendStatus(200)
	})

	app.Post("/file", controllers.FileUpload)
	app.Post("/remote", controllers.RemoteUpload)

	app.Listen(":8080")
}
