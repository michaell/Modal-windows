const allPhotos = document.querySelectorAll(".photos__wrap"); // массив всех фото
const allWindows = document.querySelectorAll(".windows__win"); // массив всех окон
const allBtns = document.querySelectorAll(".windows__btn"); // массив всех закрывающих окон
const overlay = document.querySelector(".overlay"); // оверлэй (серый экран между страницей и всплывающем окном)

// функция добавляющая нумерованные классы фотографиям по типу photo-1, photo-2 и тд. Соответсвенноо, если в разметку будут добавлены новые фото, скрипт будет работать.
const addPhotoClasses = function () {
	for (const [i, photo] of allPhotos.entries()) {
		photo.classList.add(`photo-${i + 1}`);
	}
};

// функция добавляющая нумерованные классы всплывающим окнам по аналогии с фотками.
const addWinClasses = function () {
	for (const [i, window] of allWindows.entries()) {
		window.classList.add(`window-${i + 1}`);
	}
};

// функция удаляющая нумерованные классы у окон (нужно для работы закрывающей окно кнопки).
const removeWinClsses = function () {
	for (const [i, window] of allWindows.entries()) {
		window.classList.remove(`window-${i + 1}`);
	}
};

addPhotoClasses();
addWinClasses();

// Функционал открывания окна
const showWindow = function () {
	overlay.classList.remove("hidden"); // включаем оверлэй
	const photoIndex = this.className.slice(-1); // Получаем номер нажатой картинки. Ключевое слово this нужно, чтобы className взял коассы у div photos__wrap, а не его дочернего img.

	for (const win of allWindows) {
		// сравниваем номер нажатой фотки с номером окна и если они соответствуют, открываем окно.
		const winIndex = win.className.slice(-1);
		if (photoIndex === winIndex) {
			win.classList.remove("hidden");
		}
	}
};

// Функционал закрытия окна при нажатии кнопки
const closeWindow = function () {
	overlay.classList.add("hidden");
	for (const win of allWindows) {
		win.classList.add("hidden");
	}
	removeWinClsses(); // нумерные классы нужно удалить и потом заново добавить. Иначе последним классом в списке окажется hidden и при повторном нажатии на эту фотку скрипт не сработает. То есть для работы скрипта важно в каком порядке классы прописаны в HTML (класс с номером должен быть последним).
	addWinClasses();
};

// Функционал закрытия окна при нажатии escape
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") {
		closeWindow();
	}
});

// навешиваем прослушиватели событий на все фотки и кнопки закрывания окон.
for (const photo of allPhotos) {
	photo.addEventListener("click", showWindow); // открытие модального окна при нажатии на фотку
}
for (const btn of allBtns) {
	btn.addEventListener("click", closeWindow); // закрытие модального окна при нажатии на кнопку
}

//закрытие модального окна при нажатии на оверлэй
overlay.addEventListener("click", closeWindow);
