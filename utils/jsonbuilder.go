package utils

import (
	"encoding/json"
	"net/http"
)

func RespondSuccess(rw http.ResponseWriter, r *http.Request, data interface{}) error {
	resp := map[string]interface{}{
		"success": 1,
		"message": data,
	}
	return json.NewEncoder(rw).Encode(resp)
}
func RespondError(rw http.ResponseWriter, r *http.Request, data interface{}) error {
	resp := map[string]interface{}{
		"success": 0,
		"message": data,
	}
	return json.NewEncoder(rw).Encode(resp)
}
func RespondCustom(rw http.ResponseWriter, r *http.Request, code int, data interface{}) error {
	resp := map[string]interface{}{
		"success": code,
		"message": data,
	}
	return json.NewEncoder(rw).Encode(resp)
}
func BuildJSON(data interface{}) ([]byte, error) {
	return json.Marshal(data)
}
