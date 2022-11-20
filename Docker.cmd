docker login
docker buildx build --platform=linux/amd64,linux/arm64 -t skuligowski/image-gallery:2.0.0_rc1 --push .