let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
];


function init() {
  render();
}


// Dritte Version ... jetzt mit currentPlayer
//
let currentPlayer = 'circle';

function render() {
  // Wählen Sie den div-Container aus dem DOM
  const container = document.getElementById('content');

  // Erstellen Sie eine Tabelle
  const table = document.createElement('table');

  // Schleife über die Zeilen und Spalten der Tabelle
  for (let i = 0; i < 3; i++) {
    // Erstellen Sie eine Zeile
    const row = document.createElement('tr');

    for (let j = 0; j < 3; j++) {
      // Berechnen Sie den Index im Array
      const index = i * 3 + j;

      // Erstellen Sie eine Zelle
      const cell = document.createElement('td');
      cell.setAttribute('id', `cell-${index}`);

      // Setzen Sie den Inhalt der Zelle basierend auf dem Feld im Array
      if (fields[index] === 'circle') {
        cell.innerHTML = generateCircleSVG();
      } else if (fields[index] === 'cross') {
        cell.innerHTML = generateCrossSVG();
      } else {
        cell.onclick = () => {
          // Wechseln Sie den aktuellen Spieler
          currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

          // Setzen Sie das aktuelle Feld im Array auf den aktuellen Spieler
          fields[index] = currentPlayer;

          // Fügen Sie den SVG-Code des aktuellen Spielers in die Zelle ein
          if (currentPlayer === 'circle') {
            cell.innerHTML = generateCircleSVG();
          } else {
            cell.innerHTML = generateCrossSVG();
          }

          // Entfernen Sie das onclick-Attribut, um weitere Klicks auf diese Zelle zu verhindern
          cell.removeAttribute('onclick');

          // Testen Sie, ob das Spiel vorbei ist
          const result = checkWin();
          if (result) {
            // Wenn das Spiel vorbei ist, zeichnen Sie eine Linie durch die siegreichen Zellen
            drawWinningLine(result);
          }
        }
      }

      // Fügen Sie die Zelle zur Zeile hinzu
      row.appendChild(cell);
    }

    // Fügen Sie die Zeile zur Tabelle hinzu
    table.appendChild(row);
  }

  // Fügen Sie die Tabelle zum Container hinzu
  container.innerHTML = '';
  container.appendChild(table);
}


// Zweite Version, eine Zeile von mir deaktiviert <!-- -->
//
function generateCircleSVG() {
  const svgCode = `
      <svg viewBox="0 0 70 70">
        <circle cx="35" cy="35" r="30" fill="none" stroke="#0EBCEE" stroke-width="5" stroke-dasharray="188.5" stroke-dashoffset="188.5">
          <animate attributeName="stroke-dashoffset" dur="0.5s" to="0" fill="freeze" />
          <!-- animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 35 35" to="360 35 35" dur="0.75s" fill="freeze" / -->
        </circle>
      </svg>
    `;
  return svgCode;
}


// Erste Version von chatGPT ... sieht gleich gut aus
//
function generateCrossSVG() {
  const svgCode = `
      <svg viewBox="0 0 70 70">
        <line x1="10" y1="10" x2="60" y2="60" stroke="#F7C607" stroke-width="7" stroke-linecap="round" stroke-dasharray="150" stroke-dashoffset="150">
          <animate attributeName="stroke-dashoffset" dur="0.5s" to="0" fill="freeze" />
        </line>
        <line x1="60" y1="10" x2="10" y2="60" stroke="#F7C607" stroke-width="7" stroke-linecap="round" stroke-dasharray="150" stroke-dashoffset="150">
          <animate attributeName="stroke-dashoffset" dur="0.5s" to="0" fill="freeze" />
        </line>
      </svg>
    `;
  return svgCode;
}

// Gewinnlinien definieren
const lines = [
  [0, 1, 2], // erste horizontale Linie
  [3, 4, 5], // zweite horizontale Linie
  [6, 7, 8], // dritte horizontale Linie
  [0, 3, 6], // erste vertikale Linie
  [1, 4, 7], // zweite vertikale Linie
  [2, 5, 8], // dritte vertikale Linie
  [0, 4, 8], // erste diagonale Linie
  [2, 4, 6], // zweite diagonale Linie
];

function checkWin() {

  // Überprüfung jeder Gewinnlinie
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return lines[i]; // Gewinnerlinie zurückgeben
    }
  }

  return null; // Kein Gewinner gefunden
}


function drawWinningLine(result) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 300 300');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('class', 'winning-line');

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('stroke', '#ffffff');
  line.setAttribute('stroke-width', '10');
  line.setAttribute('stroke-linecap', 'round');

  // Berechne die Positionen der gewinnenden Zellen
  const positions = result.map((index) => {
    const cell = document.getElementById(`cell-${index}`);
    const rect = cell.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  });

  let posInArray = getPosInArray(lines, result);
  console.log(posInArray);
  // 0,1,2 --> Waagerecht, 3,4,5 --> Senkrecht, 6 --> Diagonal links oben nach rechts unten, 7 --> Diagonal rechts oben nach links unten

  // Setze die Positionen der Linie
  // line.setAttribute('x1', positions[0].x);
  // line.setAttribute('y1', positions[0].y);
  // line.setAttribute('x2', positions[positions.length - 1].x);
  // line.setAttribute('y2', positions[positions.length - 1].y);
  switch (posInArray) {
    case 0:
    case 1:
    case 2:
      line.setAttribute('x1', 10);
      line.setAttribute('x2', 290);
      line.setAttribute('y1', 45 + (posInArray * 102));
      line.setAttribute('y2', 45 + (posInArray * 102));
      break;
    case 3:
    case 4:
    case 5:
      line.setAttribute('x1', 56 + ((posInArray - 3) * 95));
      line.setAttribute('x2', 56 + ((posInArray - 3) * 95));
      line.setAttribute('y1', 10);
      line.setAttribute('y2', 290);
      break;
    case 6:
      line.setAttribute('x1', 10);
      line.setAttribute('x2', 290);
      line.setAttribute('y1', 10);
      line.setAttribute('y2', 290);
      break;
    case 7:
      line.setAttribute('x1', 290);
      line.setAttribute('x2', 10);
      line.setAttribute('y1', 10);
      line.setAttribute('y2', 290);
      break;
  }


  svg.appendChild(line);

  const container = document.getElementById('content');
  container.appendChild(svg);
}


function getPosInArray(arrayOuter, arrayInner) {
  for (let i = 0; i < arrayOuter.length; i++) {
    if (arrayOuter[i][0] == arrayInner[0] && arrayOuter[i][1] == arrayInner[1] && arrayOuter[i][2] == arrayInner[2]) {
      return i;
    }
  }
}
