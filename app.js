const select = document.querySelector('#masala'),
  LEFTup = document.querySelector('.left > .up'),
  LEFTdown = document.querySelector('.left > .down'),
  dashboard = document.querySelector('#dashboard'),
  right = document.querySelector('.left'),
  RIGHTdown = document.querySelector('body > div > div.right > .down')

let MASALAshartlari = [
  {
    tepasi: `
          <h1>Masala sharti:</h1><hr>
  <p>bu masalada sizga gap beriladi.</p>
  <p>shu gapdagi so'zlarni teskari qilib qaytarish kerak!</p>
  <p>e'tibor bering faqat so'zlarni teskari qilib jo'natish kerak</p>
  `,
    pasi: `
          <h2>Namuna:</h2><hr>
  <p>bu so'z teskari bo'lishi kerak!</p>
  <p>ub z'os irakset ihsil'ob !karek</p>
    `,
    Test: function (gap) {
      return gap
        .split(' ')
        .map(e => [...e].reverse().join(''))
        .join(' ')
    },
    BOARD: `function $(_){return _}`,
  },
  {
    tepasi: `
          <h1>Masala sharti:</h1><hr>
  <p>oddiy X O o'yini bilasiz</p>
  <p>3x3 sizga array kurinishida beriladi</p>
  <p>siz kim yutganini topishingiz kerak</p>
  <p>agar hech kim yutmagan bo'lsa "0" qaytaring</p>
  `,
    pasi: `<p>
          <h2>Namuna:</h2><hr>
    [
      [O,X,X],
      [O,O,X],
      [_,_,X]
    ]
    </p>
    <p>bo'sh joylar "_" bilan yozilgan!
    </p>
    <p>return X</p>
    `,
    Test: function (board) {
      board = (board + '').replace(/\,/g, '')
      if (/XXX|X..X..X|X...X...X/gi.test(board)) return 'X'
      if (/OOO|O..O..O|O...O...O/gi.test(board)) return 'O'
      return 0
    },
    BOARD: `function $(_){retturn _}
    `,
  },
  {
    tepasi: `
          <h1>Masala sharti:</h1><hr>
  <p>bu masalada siz oddiy funksiya(lar) yasaysiz</p>
  <pre>
  1-9gacha bo'lgan raqamlar matematik ammallar ishtirok etadi.
  _1(plus(_2())) // 1 + 2 = 3
  _4(plus(_4())) // 4 + 4 = 8
  </pre>
  `,
    pasi: `
          <h2>Namuna:</h2><hr>
    <p>OMAD!</p>
    `,
    Test: '',
    BOARD: `
    function _1(){}; function plus(){}; function minus(){}; function multiply(){}; function divide(){}  `,
  },
]
let num = 1
start()

select.onchange = eve => {
  RIGHTdown.innerHTML = null
  num = eve.target.value
  start()
}

function start() {
  dashboard.innerText = null
  try {
    let count = []
    let malumot = MASALAshartlari[num - 1]
    LEFTup.innerHTML = malumot.tepasi
    LEFTdown.innerHTML = malumot.pasi
    dashboard.innerText = malumot.BOARD

    // teskari gaplar uchun !!!
    if (num == 1) {
      let dataFORtest = [
        'Tarix bilan yaqindan qiziqmaydigan odamlar koʻpincha ikkita notoʻgʻri fikr bilan kifoyatlanadilar',
        'Usmonlilarning beylik davridan to imperiyaning qulashiga qadar va hatto imperiyadan keyingi Turkiya Respublikasi davrida ham ushbu hududlarda istiqomat qilishgan',
        'Usmonlilar imperiyasining yuksalish davri 15-16-asrlar yahudiylarning oltin davri boʻlgan.',
        'Usmonlilar davlatiga ilk bosmaxonani olib kelgan yahudiylar davlat ishlarida ham faol qatnashgan va katta lavozimlarni egallashgan.',
        '17-asrga toʻgʻri kelgan Usmonlilar imperiyasining turgʻunlik davrida Usmonli yahudiylari madaniy va iqtisodiy inqirozga yuz tutdilar.',
        '18-asrda yuz bergan tanazzul davrida, yahudiylar Sabetay Sevi voqeasidan kelib chiqqan zarba bilan „passiv himoya psixoziga“ kirishdilar',
        'Soʻnggi davlatning qulash davrida yahudiylarning madaniy darajasi shu qadar pasayib ketgan ediki, hatto chet tilini oʻrganish biryoqda tursin hatto dindan chiqib ketayotgandek tuyuldi. Ammo Usmonlilarning qaysi davrida boʻlsa boʻlsin, yahudiylar jamoasi usmonlilar tuprogʻida boshqa xristian davlatlardagilarga nisbatan ishonch va tinchlikda yashadilar.',
        'Bu davlat dastlab Kichik Osiyoning Shimoliygʻarbiy qismi Eski shahar va Anatoliya hududida saljuqiylarning Koʻniya sultonligiga tobe kichik bir beklik (beylik) shaklida tashkil topgan',
        'Bu beklikning ilk hukmdori Ertoʻgʻrul boʻlsa ham, uning oʻgʻli — Usmonbey davrida beklik mustaqil davlatga aylanganligi uchun uning nomi bilan Usmonli bekligi deb atalgan.',
        'Keyinchalik bu davlat Usmonli imperiyasi nomini olib, oʻrta asrlarda jahonning eng qudratli davlatlaridan biriga aylandi.',
      ]

      let run = document.createElement('button')
      run.innerText = 'run...'
      run.onclick = () => {
        RIGHTdown.innerText = null
        count = []
        let k = 0

        let ID = setInterval(() => {
          try {
            if (count.filter(e => e).length == count.length && count.length > 9) {
              count = []
              alert(`masala to'gri yechildi!!!`)
            }
            if (k == 10) {
              clearInterval(ID)
              return
            }

            const i = dataFORtest[k]
            let fun = new Function('_', dashboard.value + ` return $(_)`)
            console.log('your: ', fun(i))
            console.log('exp: ', malumot.Test(i))
            console.log('------------')

            //add result
            count.push(fun(i) === malumot.Test(i))
            let li = document.createElement('li')
            li.innerHTML = `<u>${count.length}</u>: ` + (fun(i) === malumot.Test(i))
            RIGHTdown.append(li)
            k++
          } catch (err) {
            clearInterval(ID)
            return alert(err)
          }
        }, 200)
        RIGHTdown.append(run)
      }
      RIGHTdown.append(run)
    }

    // X O o'yini uchun !
    else if (num == 2) {
      let dataFORtest = [
        [
          ['X', 'X', 'X'],
          ['_', 'O', 'O'],
          ['_', '_', '_'],
        ],
        [
          ['X', 'O', 'X'],
          ['_', 'O', 'O'],
          ['_', 'X', '_'],
        ],
        [
          ['_', 'X', 'X'],
          ['O', 'O', 'O'],
          ['X', '_', '_'],
        ],
        [
          ['X', 'X', 'O'],
          ['_', 'O', 'O'],
          ['O', 'X', '_'],
        ],
        [
          ['O', 'X', 'X'],
          ['X', 'X', 'O'],
          ['O', 'O', 'X'],
        ],
        [
          ['X', 'O', 'O'],
          ['_', 'X', 'O'],
          ['_', '_', 'X'],
        ],
        [
          ['O', 'X', 'X'],
          ['_', 'O', 'O'],
          ['X', '_', '_'],
        ],
        [
          ['O', 'O', 'X'],
          ['_', 'O', 'O'],
          ['X', 'X', 'X'],
        ],
        [
          ['X', 'X', 'X'],
          ['_', 'O', 'O'],
          ['O', '_', '_'],
        ],
        [
          ['X', 'X', 'X'],
          ['X', 'O', 'O'],
          ['_', 'O', '_'],
        ],
      ]
      let run = document.createElement('button')
      run.innerText = 'run...'
      run.onclick = () => {
        RIGHTdown.innerText = null
        count = []
        let k = 0

        let ID = setInterval(() => {
          try {
            if (count.filter(e => e).length == count.length && count.length > 9) {
              count = []
              alert(`masala to'gri yechildi!!!`)
            }
            if (k == 10) {
              clearInterval(ID)
              return
            }
            const i = dataFORtest[k]

            let fun = new Function('_', dashboard.value + ` return $(_)`)
            console.log('your: ', fun(i))
            console.log('exp: ', malumot.Test(i))
            console.log('------------')

            count.push(fun(i) === malumot.Test(i))
            let li = document.createElement('li')
            li.innerHTML = `<u>${count.length}</u>: ` + (fun(i) === malumot.Test(i))
            RIGHTdown.append(li)
            k++
          } catch (err) {
            clearInterval(ID)
            return alert(err)
          }
        }, 200)
        RIGHTdown.append(run)
      }
      RIGHTdown.append(run)
    }

    // BOMBA
    else if (num == 3) {
      let dataFORtest = [
        ['_9(plus(_4()))', 13],
        ['_6(minus(_4()))', 2],
        ['_4(plus(_4()))', 8],
        ['_5(multiply(_4()))', 20],
        ['_3(minus(_4()))', -1],
        ['_1(plus(_4()))', 5],
        ['_9(multiply(_9()))', 81],
        ['_8(divide(_4()))', 2],
        ['_2(plus(_1()))', 3],
        ['_9(plus(_1()))', 10],
      ]

      let run = document.createElement('button')

      run.innerText = 'run...'
      run.onclick = () => {
        RIGHTdown.innerText = null
        count = []
        let k = 0

        let ID = setInterval(() => {
          try {
            if (count.filter(e => e).length == count.length && count.length > 9) {
              count = []
              alert(`masala to'gri yechildi!!!`)
            }
            if (k == 10) {
              clearInterval(ID)
              return
            }
            const i = dataFORtest[k]
            let fun = new Function(dashboard.value + '; return ' + i[0])

            console.log('your: ', fun(i))
            console.log('exp: ', malumot.Test(i))
            console.log('------------')

            count.push(fun() == i[1])
            let li = document.createElement('li')
            li.innerHTML = `<u>${count.length}</u>: ` + (fun() == i[1])
            RIGHTdown.append(li)
            k++
          } catch (err) {
            clearInterval(ID)
            return alert(err)
          }
        }, 200)
        RIGHTdown.append(run)
      }
      RIGHTdown.append(run)
    }
  } catch (e) {
    return alert(e)
  }
}
