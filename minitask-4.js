const http = require("http")

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.write("hello world")
    res.end()
});


server.listen(3000, function(){
    console.log("Server running on http://localhost:3000")
}) 
 