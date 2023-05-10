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


// Erste Version von chatGPT
//
// function render() {
//     // Wählen Sie den div-Container aus dem DOM
//     const container = document.getElementById('content');

//     // Erstellen Sie eine Tabelle
//     const table = document.createElement('table');

//     // Schleife über die Zeilen und Spalten der Tabelle
//     for (let i = 0; i < 3; i++) {
//         // Erstellen Sie eine Zeile
//         const row = document.createElement('tr');

//         for (let j = 0; j < 3; j++) {
//             // Berechnen Sie den Index im Array
//             const index = i * 3 + j;

//             // Erstellen Sie eine Zelle
//             const cell = document.createElement('td');

//             // Setzen Sie den Inhalt der Zelle basierend auf dem Feld im Array
//             if (fields[index] === 'circle') {
//                 cell.innerHTML = generateCircleSVG();
//             } else if (fields[index] === 'cross') {
//                 cell.innerHTML = generateCrossSVG();
//             }

//             // Fügen Sie die Zelle zur Zeile hinzu
//             row.appendChild(cell);
//         }

//         // Fügen Sie die Zeile zur Tabelle hinzu
//         table.appendChild(row);
//     }

//     // Fügen Sie die Tabelle zum Container hinzu
//     container.innerHTML = '';
//     container.appendChild(table);
// }


// Zweite Version ... setzte abwechselnd im Spielfeld
//
// function render() {
//     // Wählen Sie den div-Container aus dem DOM
//     const container = document.getElementById('content');

//     // Erstellen Sie eine Tabelle
//     const table = document.createElement('table');

//     // Schleife über die Zeilen und Spalten der Tabelle
//     for (let i = 0; i < 3; i++) {
//         // Erstellen Sie eine Zeile
//         const row = document.createElement('tr');

//         for (let j = 0; j < 3; j++) {
//             // Berechnen Sie den Index im Array
//             const index = i * 3 + j;

//             // Erstellen Sie eine Zelle
//             const cell = document.createElement('td');

//             // Fügen Sie die onclick-Funktion hinzu
//             cell.onclick = function() {
//                 // Fügen Sie das passende Feld in dem Array "fields" abwechselnd ein
//                 if (index % 2 === 0) {
//                     fields[index] = 'circle';
//                     cell.innerHTML = generateCircleSVG();
//                 } else {
//                     fields[index] = 'cross';
//                     cell.innerHTML = generateCrossSVG();
//                 }
//                 // Entfernen Sie die onclick-Funktion von dem <td>-Element
//                 cell.onclick = null;
//             };

//             // Setzen Sie den Inhalt der Zelle basierend auf dem Feld im Array
//             if (fields[index] === 'circle') {
//                 cell.innerHTML = generateCircleSVG();
//             } else if (fields[index] === 'cross') {
//                 cell.innerHTML = generateCrossSVG();
//             }

//             // Fügen Sie die Zelle zur Zeile hinzu
//             row.appendChild(cell);
//         }

//         // Fügen Sie die Zeile zur Tabelle hinzu
//         table.appendChild(row);
//     }

//     // Fügen Sie die Tabelle zum Container hinzu
//     container.innerHTML = '';
//     container.appendChild(table);
// }


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




// Erste Version von chatGPT
//
// function generateCircleSVG() {
//     const svgCode = `
//       <svg viewBox="0 0 70 70">
//         <circle cx="35" cy="35" r="30" fill="none" stroke="#0EBCEE" stroke-width="5" />
//         <circle cx="35" cy="35" r="30" fill="none" stroke="#0EBCEE" stroke-width="5">
//           <animate attributeName="stroke-dasharray" dur="2s" repeatCount="1" from="0, 0" to="188.5, 0" fill="freeze" />
//           <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="1" from="0" to="188.5" fill="freeze" />
//         </circle>
//       </svg>
//     `;
//     return svgCode;
// }


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


function checkWin() {
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

    // Überprüfung jeder Gewinnlinie
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return lines[i]; // Gewinnerlinie zurückgeben
        }
    }

    return null; // Kein Gewinner gefunden
}

// Erste Version
//
// function drawWinningLine(cells) {
//     console.log(cells);
//     const svgCode = `
//       <svg viewBox="0 0 300 300">
//         <line x1="${cells[0].offsetLeft + 50}" y1="${cells[0].offsetTop + 50}" x2="${cells[2].offsetLeft + 50}" y2="${cells[2].offsetTop + 50}" stroke="#ffffff" stroke-width="10" />
//       </svg>
//     `;
//     const line = document.createElement('div');
//     line.innerHTML = svgCode;
//     line.style.position = 'absolute';
//     line.style.zIndex = 10;
//     document.body.appendChild(line);
// }


// Zweite Version
// function drawWinningLine(cells) {
//     console.log('drawWinningLine gestartet');
//     const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//     svg.setAttribute('viewBox', '0 0 70 70');
//     svg.setAttribute('class', 'winning-line');
//     const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//     line.setAttribute('stroke', '#FFFFFF');
//     line.setAttribute('stroke-width', '5');
//     line.setAttribute('stroke-linecap', 'round');
//     line.setAttribute('stroke-dasharray', '200');
//     line.setAttribute('stroke-dashoffset', '200');
//     const x1 = cells[0].offsetLeft + cells[0].offsetWidth / 2;
//     const y1 = cells[0].offsetTop + cells[0].offsetHeight / 2;
//     const x2 = cells[2].offsetLeft + cells[2].offsetWidth / 2;
//     const y2 = cells[2].offsetTop + cells[2].offsetHeight / 2;
//     console.log(x1, x2, y1, y2);
//     if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) { // Check if cells are visible
//         console.log('Linie wird gezogen');
//       line.setAttribute('x1', x1);
//       line.setAttribute('y1', y1);
//       line.setAttribute('x2', x2);
//       line.setAttribute('y2', y2);
//       svg.appendChild(line);
//       document.getElementById('content').appendChild(svg);
//     }
//   }

// function drawWinningLine(result) {
//     // Erstellen Sie ein neues SVG-Element
//     const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//     svg.setAttribute('viewBox', '0 0 300 300');

//     // Erstellen Sie eine Linie
//     const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

//     // Setzen Sie die Koordinaten der Linie basierend auf dem Ergebnis des checkForWinner
//     if (result.direction === 'horizontal') {
//         line.setAttribute('x1', result.start * 100 + 50 + table.offsetLeft);
//         line.setAttribute('y1', result.row * 100 + 50 + table.offsetTop);
//         line.setAttribute('x2', result.end * 100 + 50 + table.offsetLeft);
//         line.setAttribute('y2', result.row * 100 + 50 + table.offsetTop);
//     } else if (result.direction === 'vertical') {
//         line.setAttribute('x1', result.column * 100 + 50 + table.offsetLeft);
//         line.setAttribute('y1', result.start * 100 + 50 + table.offsetTop);
//         line.setAttribute('x2', result.column * 100 + 50 + table.offsetLeft);
//         line.setAttribute('y2', result.end * 100 + 50 + table.offsetTop);
//     } else if (result.direction === 'diagonal1') {
//         line.setAttribute('x1', result.start * 100 + 50 + table.offsetLeft);
//         line.setAttribute('y1', result.start * 100 + 50 + table.offsetTop);
//         line.setAttribute('x2', result.end * 100 + 50 + table.offsetLeft);
//         line.setAttribute('y2', result.end * 100 + 50 + table.offsetTop);
//     } else if (result.direction === 'diagonal2') {
//         line.setAttribute('x1', result.start * 100 + 50 + table.offsetLeft);
//         line.setAttribute('y1', (2 - result.start) * 100 + 50 + table.offsetTop);
//         line.setAttribute('x2', result.end * 100 + 50 + table.offsetLeft);
//         line.setAttribute('y2', (2 - result.end) * 100 + 50 + table.offsetTop);
//     }

//     // Setzen Sie die Attribute der Linie
//     line.setAttribute('stroke', '#FFFFFF');
//     line.setAttribute('stroke-width', '10');
//     line.setAttribute('stroke-linecap', 'round');

//     // Fügen Sie die Linie zum SVG-Element hinzu
//     svg.appendChild(line);

//     // Fügen Sie das SVG-Element zur Tabelle hinzu
//     table.appendChild(svg);
// }

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
  
    // Setze die Positionen der Linie
    line.setAttribute('x1', positions[0].x);
    line.setAttribute('y1', positions[0].y);
    line.setAttribute('x2', positions[positions.length - 1].x);
    line.setAttribute('y2', positions[positions.length - 1].y);
  
    svg.appendChild(line);
  
    const container = document.getElementById('content');
    container.appendChild(svg);
  }
  