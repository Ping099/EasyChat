const arr = { a: 1, b: { c: [2, { d: 3 }], e: 4 } }

function stringify(data) {
  if (typeof data === 'number') {
    return String(data)
  } else if (typeof data === 'string') {
    return `"data.replace(/"/g, '/"')"`
  } else if (Array.isArray(data)) {
    let res = '['
    for (let i = 0; i < data.length; i++) {
      if (data.length - 1 > i) res += stringify(data[i]) + ','
      else res += stringify(data[i])
    }
    res += ']'
    return res
  } else {
    let res = '{'
    let arr = Object.keys(data)
    for (let i = 0; i < arr.length; i++) {
      if (i < arr.length - 1) res += `"${arr[i]}":` + stringify(data[arr[i]]) + ','
      else res += `"${arr[i]}":` + stringify(data[arr[i]])
    }
    res += '}'
    return res
  }
}

const res = stringify(arr)
console.log(JSON.stringify(arr))
console.log(res)
