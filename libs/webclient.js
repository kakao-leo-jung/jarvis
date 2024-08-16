import fetch from "node-fetch";

export async function postByForm(url, body) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  }).then(async response => {
    if (!response.ok) {
      throw new Error('Error : ' + response.status);
    }
    const body = await response.json();
    console.log(JSON.stringify(body))
    return body
  })
  .then(data => {
    if (data.code !== 0) {
      throw new Error('Error : ' + data.code + ' ' + data.msg)
    }
    return data.data
  })
}

export async function get(url, params) {
  return await fetch(url + "?" + new URLSearchParams(params))
  .then(async response => {
    if (!response.ok) {
      throw new Error('Error : ' + response.status);
    }
    const body = await response.json();
    console.log(JSON.stringify(body))
    return body
  })
  .then(data => {
    if (data.code !== 0) {
      throw new Error('Error : ' + data.code + ' ' + data.msg)
    }
    return data.data
  })
}