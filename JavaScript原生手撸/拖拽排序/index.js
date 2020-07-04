window.onload = function () {
  const dataArr = [
    {
      content: '拿铁',
      id: 1,
      serial: 2
    },
    {
      content: '减肥',
      id: 2,
      serial: 1
    },
    {
      content: '吃饭',
      id: 3,
      serial: 3
    }
  ]
  const oBox = document.querySelector('.box')

  init()

  function init() {
    bindHtml(dataArr)
    bindEvent(oBox, dataArr)
    bindDrop(oBox, dataArr)
  }

  function bindHtml(dataArr) {
    dataArr = dataArr.sort(function (a, b) {
      return a.serial - b.serial
    })
    let str = ''
    for (let i = 0; i < dataArr.length; i++) {
      str += `<tr id="${dataArr[i]['id']}" draggable="true">
                <td>${dataArr[i]['content']}</td>
                <td>${dataArr[i]['serial']}</td>
                <td>
                  <a href="javascript:;">${dataArr[i]['serial'] === 1 ? '' : '置顶'}</a>
                  <a href="javascript:;">上</a>
                  <a href="javascript:;">下</a>
                </td>
              </tr>`
    }
    oBox.innerHTML = str
  }

  function bindEvent(dom, dataArr) {
    dom.addEventListener('click', function (e) {
      const currentBtn = e.target.innerHTML
      const currentId = Number(e.target.parentNode.parentNode.id)

      if (currentBtn === '上') {
        for (let i = 0; i < dataArr.length; i++) {
          if (dataArr[i]['id'] === currentId) {
            if (dataArr[i]['serial'] - 1 !== 0) {
              dataArr[i]['serial']--
            } else {
              return
            }
            dataArr[i-1]['serial']++
            break
          }
        }
        bindHtml(dataArr)
      }

      if (currentBtn === '下') {
        for (let i = 0; i < dataArr.length; i++) {
          if (dataArr[i]['id'] === currentId) {
            if (dataArr[i]['serial'] === dataArr.length) {
              return
            } else {
              dataArr[i]['serial']++
            }
            dataArr[i+1]['serial']--
            break
          }
        }
        bindHtml(dataArr)
      }

      if (currentBtn === '置顶') {
        for (let i = 0; i < dataArr.length; i++) {
          if (dataArr[i]['id'] === currentId) {
            dataArr[i]['serial'] = 1
            for (let j = 0; j < i; j++){
              dataArr[j]['serial']++
            }
          }
        }
        bindHtml(dataArr)
      }
    })
  }

  function bindDrop(dom, dataArr) {
    let currentDragId, currentDropId, tempDragSerial, tempDropSerial;

    dom.addEventListener('dragstart', function (e) {
      currentDragId = Number(e.target.id)
    })

    dom.addEventListener('dragover', function (e) {
      e.preventDefault()
    })

    dom.addEventListener('drop', function (e) {
      if (e.target.tagName === 'TD') {
        currentDropId = Number(e.target.parentNode.id)
      }

      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i]['id'] === currentDragId) {
          tempDragSerial = dataArr[i]['serial']
        }
      }

      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i]['id'] === currentDropId) {
          tempDropSerial = dataArr[i]['serial']
          dataArr[i]['serial'] = tempDragSerial
        }
      }

      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i]['id'] === currentDragId) {
          dataArr[i]['serial'] = tempDropSerial
        }
      }

      bindHtml(dataArr)
    })
  }
}