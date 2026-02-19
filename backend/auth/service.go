package auth

import "golang.org/x/crypto/bcrypt"

func HashPassword(p string) string {
	hash, _ := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)

	return string(hash)
}

func CheckPasswordHash(hashedPassword, p string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(p))
	return err
}
