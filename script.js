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
          <animate attributeName="stroke-dashoffset" dur="0.75s" to="0" fill="freeze" />
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
          <animate attributeName="stroke-dashoffset" dur="0.75s" to="0" fill="freeze" />
        </line>
        <line x1="60" y1="10" x2="10" y2="60" stroke="#F7C607" stroke-width="7" stroke-linecap="round" stroke-dasharray="150" stroke-dashoffset="150">
          <animate attributeName="stroke-dashoffset" dur="0.75s" to="0" fill="freeze" />
        </line>
      </svg>
    `;
    return svgCode;
}
