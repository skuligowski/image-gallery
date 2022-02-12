docker login
docker buildx build --platform=linux/amd64,linux/arm64 -t skuligowski/image-gallery:1.0.0 --push .