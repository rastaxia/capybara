document.querySelector("#advYes").addEventListener("click", function () {
  document.querySelector(".postCombat1").style.display = "none";
  const mapData = [
    { id: 1, x: 100, y: 75, clickable: true },
    { id: 2, x: 250, y: 25, clickable: false },
    { id: 3, x: 250, y: 125, clickable: false },
    { id: 4, x: 550, y: 25, clickable: false },
    { id: 5, x: 550, y: 125, clickable: false },
    { id: 6, x: 750, y: 0, clickable: false },
    { id: 7, x: 750, y: 100, clickable: false },
    { id: 8, x: 750, y: 200, clickable: false },
  ];

  const mapConnections = [
    { from: 1, to: [2, 3] },
    { from: 2, to: [4] },
    { from: 3, to: [5] },
    { from: 4, to: [6, 7] },
    { from: 5, to: [7, 8] },
  ];

  const map = document.getElementById("map");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");

  const rooms = [];

  const createRoom = (roomData) => {
    const room = document.createElement("span");
    room.style.display = "inline-block";
    room.classList.add("room");
    room.style.left = `${roomData.x}px`;
    room.style.top = `${roomData.y}px`;
    room.innerText = roomData.id;

    if (roomData.clickable) {
      room.classList.add("room-clickable");
    }

    room.addEventListener("click", () => {
      const selectedRoom = rooms.find((r) =>
        r.classList.contains("room-clicked")
      );
      if (selectedRoom) {
        selectedRoom.classList.remove("room-clicked");
      }

      room.classList.add("room-clicked");

      const connectedRooms =
        mapConnections.find((c) => c.from === roomData.id)?.to || [];
      rooms.forEach((r) => {
        if (connectedRooms.includes(Number(r.innerText))) {
          r.classList.add("room-clickable");
        } else {
          r.classList.remove("room-clickable");
        }
      });
    });

    rooms.push(room);
    map.appendChild(room);
  };

  mapData.forEach((roomData) => createRoom(roomData));

  const connectRooms = (fromRoom, toRoom) => {
    const fromRoomData = mapData.find((r) => r.id === fromRoom);
    const toRoomData = mapData.find((r) => r.id === toRoom);

    const fromRoomRect = fromRoomData
      ? rooms
          .find((r) => r.innerText === String(fromRoom))
          ?.getBoundingClientRect()
      : null;
    const toRoomRect = toRoomData
      ? rooms
          .find((r) => r.innerText === String(toRoom))
          ?.getBoundingClientRect()
      : null;

    if (fromRoomRect && toRoomRect) {
      const fromRoomCenterX = fromRoomRect.left + fromRoomRect.width;
      console.log(fromRoomCenterX);
      const fromRoomCenterY = fromRoomRect.top + fromRoomRect.height;
      console.log(fromRoomCenterY);
      const toRoomCenterX = toRoomRect.left + toRoomRect.width;
      console.log(toRoomCenterX);
      const toRoomCenterY = toRoomRect.top + toRoomRect.height;
      console.log(toRoomCenterY);

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", fromRoomCenterX);
      line.setAttribute("y1", fromRoomCenterY);
      line.setAttribute("x2", toRoomCenterX);
      line.setAttribute("y2", toRoomCenterY);
      line.setAttribute("stroke", "white");
      line.setAttribute("stroke-dasharray", "4");

      svg.appendChild(line);
    }
  };

  mapConnections.forEach((connection) => {
    connection.to.forEach((roomId) => connectRooms(connection.from, roomId));
  });

  map.insertBefore(svg, map.firstChild);
});
