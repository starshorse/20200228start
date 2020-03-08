#!\bin\bash
curl -v -H "Content-Type:application/json" -XPOST --data "{\"username\":\"dickeyxxx\", \"body\":\"node rules!\"}" localhost:3000/api/posts
