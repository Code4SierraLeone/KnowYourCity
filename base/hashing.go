package base

import (
	"crypto/md5"
	"crypto/sha1"
	"encoding/base64"
	"io"
)

// GetMd5 gets the md5 hash of a string
func GetMd5(input string) string {
	h := md5.New()
	io.WriteString(h, input)
	return string(h.Sum(nil))
}

// GetSha gets sha1 sum of token
func GetSha(input string) string {
	hasher := sha1.New()
	hasher.Write([]byte(input))
	return base64.URLEncoding.EncodeToString(hasher.Sum(nil))
}

func GetBase64(input string) string {
	return base64.URLEncoding.EncodeToString([]byte(input))
}

func DecodeBase64(input string) (string, error) {
	decoded, err := base64.URLEncoding.DecodeString(input)
	return string(decoded), err
}
