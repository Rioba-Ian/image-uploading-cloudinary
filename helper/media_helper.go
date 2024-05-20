package helper

import (
	"context"
	"fiber-cloudinary-api/config"
	"time"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
)

func ImageUploadHelper(input interface{}) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	cld, err := cloudinary.NewFromParams(config.EnvCloudName(), config.EnvCloudApiKey(), config.EnvCloudApiSecret())
	if err != nil {
		return "", err
	}

	// upload file
	uploadParam, err := cld.Upload.Upload(ctx, input, uploader.UploadParams{Folder: config.EnvCloudUploadFolder()})
	if err != nil {
		return "", err
	}

	return uploadParam.SecureURL, nil
}
