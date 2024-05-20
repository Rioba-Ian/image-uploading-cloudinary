package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func EnvCloudName() string {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv("CLOUDINARY_API_CLOUD_NAME")
}

func EnvCloudApiKey() string {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv("CLOUDINARY_API_KEY")
}

func EnvCloudApiSecret() string {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv("CLOUDINARY_API_SECRET")
}

func EnvCloudUploadFolder() string {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv("CLOUDINARY_UPLOAD_FOLDER")
}
