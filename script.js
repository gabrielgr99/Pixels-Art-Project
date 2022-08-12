// Cria divs com as cores, randomiza-as e adiciona na paleta. A cor preta sempre será a primeira
// Para adicionar mais cores basta passar um número maior como parâmetro para função
function createColors(num) {
  let arrayColors = [];
  let tagDivColorPalette = document.createElement('div');

  tagDivColorPalette.className = 'color';
  tagDivColorPalette.classList.add('selected');
  tagDivColorPalette.style.backgroundColor = 'rgb(0, 0, 0)';
  document.getElementById('color-palette').appendChild(tagDivColorPalette);

  for (let index = 0; index < num - 1; index += 1) {
    const rgbNumber = [Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)];

    arrayColors.push(rgbNumber);

    tagDivColorPalette = document.createElement('div');
    tagDivColorPalette.className = 'color';
    tagDivColorPalette.style.backgroundColor = `rgb(${rgbNumber})`;
    document.getElementById('color-palette').appendChild(tagDivColorPalette);
  }

  const tagBody = document.getElementsByTagName('body')[0];
  tagBody.style.backgroundImage = `linear-gradient(to bottom, rgba(${arrayColors[0]}, 0.8), rgba(${arrayColors[2]}, 0.8))`;
}

createColors(4);

function errors(length) {
  // Exibe um alerta se não for passado nenhum valor ou valor inválido
  if (length === '') {
    window.alert('Board inválido!');
  }

  let size = length;
  // Determina tamanho mínimo de 5x5 e máximo de 50x50
  if (length < 5) { size = 5; }
  else if (length > 50) { size = 50; }
  else if (length >= 5 && length <= 50) { size = length }
  else {
    window.alert('Board inválido!');
    size = 5;
    document.getElementById('board-size').type = 'number';
  }

  return size;
}

// Cria o quadro de pixels
// O tamanho do quadro é determinado pelo parametro passado pra função
function createBoard(length) {
  const size = errors(length);

  for (let a = 0; a < size; a += 1) {
    const pixelLine = document.createElement('tr');
    document.getElementById('pixel-board').appendChild(pixelLine);

    for (let b = 0; b < size; b += 1) {
      const pixelColum = document.createElement('td');
      pixelColum.className = 'pixel';
      pixelLine.appendChild(pixelColum);
    }
  }
  listenPaint();
}

createBoard(5);

// Adiciona a classe selected na cor que receber o clique e retira das outras
const tagsdiv = [...document.getElementsByClassName('color')];

function selectColor() {
  tagsdiv.forEach((element) => {
    const div = element;
    div.className = 'color';
  });
  this.classList.add('selected');
}

tagsdiv.forEach((div) => { div.addEventListener('click', selectColor); });

// Pinta o quadro com a cor selecionado
function paintPixel() {
  this.style.backgroundColor = document.getElementsByClassName('selected')[0].style.backgroundColor;
  this.style.transition = '0.3s';
}

function listenPaint() {
  const tagsTd = [...document.getElementsByClassName('pixel')];
  tagsTd.forEach((tag) => { tag.addEventListener('click', paintPixel); });
}

// Limpa as cores do quadro ao clicar no botão limpar
function clearBoard() {
  const tagsTd = [...document.getElementsByClassName('pixel')];
  tagsTd.forEach((element) => {
    const tag = element;
    tag.style.backgroundColor = '';
  });
}

document.getElementById('clear-board').addEventListener('click', clearBoard);

// Altera o tamanho do quadro conforme valor recebido pelo input
function generateBoard() {
  const lengthBoard = document.getElementById('board-size').value;
  document.getElementById('pixel-board').innerHTML = '';
  createBoard(lengthBoard);
}

document.getElementById('generate-board').addEventListener('click', generateBoard);

// window.onunload = (
//   createBoard()
// )