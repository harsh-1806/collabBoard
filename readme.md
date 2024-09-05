# Collaborative Whiteboard

![Collaborative Whiteboard](./public/images/board.png)

## Overview

The **Collaborative Whiteboard** is a real-time drawing application that enables multiple users to draw and interact on a shared canvas simultaneously. Leveraging Socket.IO, this app ensures that all drawing activities, color selections, and brush sizes are synchronized across all users in real-time.

## Features

- **Real-Time Collaboration**: Draw and see changes instantly with other users.
- **Color Synchronization**: Colors are consistent across all connected clients.
- **Adjustable Brush Size**: Customize brush size to suit your needs.
- **Responsive Design**: Optimized for various screen sizes.

[![Video Demo](./public/images/vid.png)](https://drive.google.com/file/d/1ohHUh9icgxzVUjlQrotn7tqr7aFH_ygp/view?usp=drive_link)


## Getting Started

To get a local copy up and running, follow these simple steps:


### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/collaborative-whiteboard.git
   cd collaborative-whiteboard
   ```
2. **Local installations**

   ```bash
    npm init
    npm i express
    npm i socket.io
    npm i nodemon -g
  ```
3. **Running server**
  ```bash
   node index.js
   ```