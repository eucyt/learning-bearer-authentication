curl -X POST http://localhost:3002/auth/login -d '{"email": "hoge1@example.com", "password": "Password"}' -H "
Content-Type: application/json"

curl http://localhost:3002/auth/test -H "Authorization: Bearer "