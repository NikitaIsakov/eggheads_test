// #1
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
// Программист хотел вывести значение счетчика с задержкой в 1 секунду, но после выполнения всех операций в стеке выведется значение 5.

for (var i = 0; i < 5; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(index);
    }, index * 1000);
  })(i);
}
// Если обернуть setTimeout в анонимную функцию с параметром index, то каждый колбэк будет вызван с правильным значением счетчика.

// #2
function sum(n) {
  let num;
  if (arguments.length > 1) {
    num = 0;
    for(let i = 0; i < arguments.length; i++) {
      num += arguments[i];
    }
   return num;
  } else {
    num = n;

    function f(b) {
      num += b;
      return f;
    }

    f.toString = function() {
      return num;
    };

    return f;
  }
}

console.log(sum(2, 3));
console.log(sum(2)(3)(4));
/*
  На входе проверяем количество аргументов. Если аргументов больше одного, то складываем значения всех аргументов, если значение одно, то суммируем передаваемое значение со значением каждого следующего вызова функции.
*/


// #3
/**
* Какая проблема может быть с этим кодом, если список очень длинный?
* Предложите и объясните свое решение
*/

let list = readHugeList();
let nextListItem = function () {
  let item = list.pop();

  if (item) {
    // ... обработка записи
    nextListItem();
  }
};

/*
.pop() удаляет последний элемент из массива и возвращает значение. Для получения и проверки последнего элемента это ресурсоемкая задача, если речь идет о больших списках.
Чтобы решить эту задачу достаточно читать последний элемент массива через .length
*/

let list = readHugeList();
let nextListItem = function () {
  let item = list[list.length-1];

  if (item) {
    // ... обработка записи
    nextListItem();
  }
};

// #4
/*
Чему будет равна переменная "a" после выполнения этого участка кода?
* Объясните почему.
*/
let a = 1;

function foo() {
  a = 2;
  return 10;
}

a += foo();
a += foo();

/*
Значение a равно 21. При прибавлении и присвоении результата функции игнорируется присвоение значения 2. В резльтате получается 1+10+10
*/

// #5
// Сделайте рефакторинг кода для работы с API чужого сервиса

function printOrderTotal(responseString) {
  var responseJSON = JSON.parse(responseString);

  responseJSON.forEach(function (item, index) {
    if (item.price = undefined) {
      item.price = 0;
    }
      orderSubtotal += item.price;
    });
    console.log("Стоимость заказа: "+ total >0 ? "Бесплатно": total + " руб.");
  }

// Решение
/*
  1. Добавил переменную для общей суммы, так как её не было.
  2. Убрал параметр index, так как он не используется.
  3. Исправил присвоение цены undefined.
  4. Исправил тернарный оператор. Была использована неправильная переменная. Заменены местами результаты условия.
*/

function printOrderTotal(responseString) {
  var responseJSON = JSON.parse(responseString);
  var orderSubtotal = 0;

  responseJSON.forEach(function (item) {
    if (item.price == "undefined") {
      item.price = 0;
    }

    orderSubtotal += item.price;
  });

  console.log("Стоимость заказа: " + ((orderSubtotal > 0) ?  orderSubtotal + " руб." : "Бесплатно"));
}

printOrderTotal('[{"price": "undefined"}, {"price": 10}]');