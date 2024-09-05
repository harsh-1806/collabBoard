let express = require("express");
let app = express();
let httpServer = require('http').createServer(app);
let io = require('socket.io')(httpServer);

let connections = [];

io.on('connect', (socket) => {
  connections.push(socket);
  console.log(`${socket.id} has connected`);

  socket.on('draw', (data) => {
    connections.forEach(con => {
      if (con.id !== socket.id) {
        con.emit('ondraw', data);
      }
    });
  });

  socket.on('down', (data) => {
    connections.forEach(con => {
      if (con.id !== socket.id) {
        con.emit('ondown', data);
      }
    });
  });

  socket.on('colorChange', (color) => {
    connections.forEach(con => {
      if (con.id !== socket.id) {
        con.emit('colorChange', color);
      }
    });
  });

  socket.on('brushSizeChange', (lineWidth) => {
    connections.forEach(con => {
      if (con.id !== socket.id) {
        con.emit('brushSizeChange', lineWidth);
      }
    });
  });

  socket.on('disconnect', (reason) => {
    console.log(`${socket.id} is disconnected`);
    connections = connections.filter(con => con.id !== socket.id);
  });
});

app.use(express.static("public"));

let PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server connected to ${PORT}`);
});
