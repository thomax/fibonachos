const width = window.innerWidth
const height = window.innerHeight
const directions = ['right', 'up', 'left', 'down']
const drawSquares = true
const drawSpiral = false
const drawRandomLines = false

function setup() {
  createCanvas(width, height)
  background(255, 200, 100)
  fill(255, 5, 200, 100)
  angleMode(DEGREES)
  noLoop()
}

const coordinates = []

async function draw() {
  let prevSize = 1
  let prevX = width / 2
  let prevY = height / 2
  for (let i = 1; i < 20; i++) {
    strokeWeight(1)
    const size = sizeOf(i)
    // cycle through directions
    const direction = directions[(i - 1) % 4]
    const { x, y } = calculatePosition(size, prevSize, prevX, prevY, direction)
    // record square coordinates
    coordinates.push({ x, y })
    coordinates.push({ x: x + size, y })
    coordinates.push({ x, y: y + size })
    coordinates.push({ x: x + size, y: y + size })

    if (drawSquares) {
      square(x, y, size)
    }
    await new Promise(r => setTimeout(r, 50))

    // draw fibonacci spiral
    let radius = size * 2
    strokeWeight(1)

    if (drawSpiral) {
      if (direction === 'right') {
        arc(x, y, radius, radius, 0, 90)
      }
      if (direction === 'up') {
        arc(x, y + size, radius, radius, 270, 360)
      }
      if (direction === 'left') {
        arc(x + size, y + size, radius, radius, 180, 270)
      }
      if (direction === 'down') {
        arc(x + size, y, radius, radius, 90, 180)
      }
    }

    prevSize = size
    prevX = x
    prevY = y
  }
  // draw lines between random coordinates
  if (drawRandomLines) {
    stroke(10, 100, 200, 100)
    strokeWeight(1)
    for (let i = 0; i < 30; i++) {
      const start = random(coordinates)
      const end = random(coordinates)
      line(start.x, start.y, end.x, end.y)
    }
  }
}

// fibonacci number at position n
function sizeOf(n) {
  if (n <= 1) {
    return n
  }
  return sizeOf(n - 1) + sizeOf(n - 2)
}

function calculatePosition(size, prevSize, prevX, prevY, direction) {
  if (direction === 'right') {
    return { x: prevX + prevSize, y: prevY - size + prevSize }
  }
  if (direction === 'up') {
    return { x: prevX - size + prevSize, y: prevY - size }
  }
  if (direction === 'left') {
    return { x: prevX - size, y: prevY }
  }
  if (direction === 'down') {
    return { x: prevX, y: prevY + prevSize }
  }
}
