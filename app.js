let level = 1
let seconds = 30
let size = 2
let interval
var myTable = document.querySelector('#my_table')
var playGame = true
var numcolumn
var numrow

function startGame() {
	let startButton = document.getElementById('start')
	if (playGame) {
		startButton.innerHTML = 'Сброс'
		startButton.style.backgroundColor = '#006A80'
		gameTime(playGame);
		myGame();
		playGame = false
	}
	else {
		startButton.innerHTML = 'Старт'
		startButton.style.backgroundColor = '#4b0082'
		seconds = 30
		level = 1
		size = 2
		myTable.innerHTML = ''
		gameTime(playGame)
		playGame = true
	}
	newLevel(level)
}

function newLevel(level) {
	let elem = document.getElementById('my_level')
	elem.innerHTML = level
}

function gameTime(playGame) {
	document.getElementById('timer').innerHTML = seconds //вывод секунд

	if (!playGame) clearInterval(interval)
	else interval = setInterval(() => {
		seconds--
		if (seconds === 0) { //таймер
			clearInterval(interval)
			alert(`Время вышло!\nВы смогли дойти до ${level} уровня за 30 секунд.`)
			startGame()
		}
		if (seconds > 10) document.getElementById('timer').style.color = 'black'
		else document.getElementById('timer').style.color = 'red' //цвет числа
		document.getElementById('timer').innerHTML = seconds
	}, 1000)
}

function myGame() {
	newLevel(level)
	let myArray = tableGame()
	for (let i = 0; i < myArray.length; i++) {
		myArray[i].onclick = function () {
			let numcol = myArray[i].cellIndex
			let numr = (i - numcol) / size
			if (numcol == numcolumn && numr == numrow) {
				size++
				level++
				myGame()
			}
			else {
				alert(`ОШИБКА!\nЗа ${seconds} секунд вы достигли ${level} уровня.`)
				startGame()
			}
		}
	}
}

function tableGame() {
	//стираем предыдущую таблица
	myTable.innerHTML = ''

	//цвет
	let distinction = 20
	let oneColor
	//основной цвет
	let hue = getRandomInt(0, 360)
	let saturation = getRandomInt(0, 100)
	let lightness = getRandomInt(20, 80)
	let mainColor = 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)'
	// отличающийся цвет
	if (level < 15)
		distinction -= level
	else distinction = 5
	if (lightness > 50) oneColor = 'hsl(' + hue + ',' + saturation + '%,' + (lightness - distinction) + '%)'
	else oneColor = 'hsl(' + hue + ',' + saturation + '%,' + (lightness + distinction) + '%)'
	//уменьшаем размер ячеек в таблице
	let padding = 20
	if (level > 9 && level < 15) padding = padding - 2 * (level - 10)
	else if (level > 14) padding = 10

	// массив таблицы
	numcolumn = getRandomInt(0, size)
	numrow = getRandomInt(0, size)
	let myArr = []

	for (var i = 0; i < size; i++) {
		let tr = document.createElement('tr');
		for (var j = 0; j < size; j++) {
			let td = document.createElement('td');
			if (i == numrow && j == numcolumn) {
				td.style.padding = padding.toString() + 'px'
				td.style.backgroundColor = oneColor
				myArr.push(td)
			}
			else {
				td.style.padding = padding.toString() + 'px'
				td.style.backgroundColor = mainColor
				myArr.push(td)
			}
			tr.appendChild(td);
		}
		myTable.appendChild(tr);
	}
	return myArr
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}