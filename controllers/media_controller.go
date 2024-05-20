package controllers

import (
	"fiber-cloudinary-api/dtos"
	"fiber-cloudinary-api/models"
	"fiber-cloudinary-api/services"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func FileUpload(c *fiber.Ctx) error {
	formHeader, err := c.FormFile("file")

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(
			dtos.MediaDto{
				StatusCode: http.StatusInternalServerError,
				Message:    "error",
				Data:       &fiber.Map{"data": "Select a file to upload."},
			})
	}

	formFile, err := formHeader.Open()

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(
			dtos.MediaDto{
				StatusCode: http.StatusInternalServerError,
				Message:    "error",
				Data:       &fiber.Map{"data": err.Error()},
			})
	}

	uploadUrl, err := services.NewMediaUpload().FileUpload(models.File{File: formFile})

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(
			dtos.MediaDto{
				StatusCode: http.StatusInternalServerError,
				Message:    "error",
				Data:       &fiber.Map{"data": err.Error()},
			})
	}

	return c.Status(http.StatusOK).JSON(
		dtos.MediaDto{
			StatusCode: http.StatusOK,
			Message:    "success",
			Data:       &fiber.Map{"data": uploadUrl},
		})
}

func RemoteUpload(c *fiber.Ctx) error {
	var url models.Url

	// validate the request body
	if err := c.BodyParser(&url); err != nil {
		return c.Status(http.StatusBadRequest).JSON(
			dtos.MediaDto{
				StatusCode: http.StatusBadRequest,
				Message:    "error",
				Data:       &fiber.Map{"data": err.Error()},
			})
	}

	uploadUrl, err := services.NewMediaUpload().RemoteUpload(url)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(
			dtos.MediaDto{
				StatusCode: http.StatusInternalServerError,
				Message:    "error",
				Data:       &fiber.Map{"data": "Error uploading file from remote url."},
			})
	}

	return c.Status(http.StatusOK).JSON(
		dtos.MediaDto{
			StatusCode: http.StatusOK,
			Message:    "success",
			Data:       &fiber.Map{"data": uploadUrl},
		})
}
