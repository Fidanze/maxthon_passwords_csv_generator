async function parseFunc() {
  function delay() {
    return new Promise(resolve => setTimeout(resolve, 1 /*time of delay*/));
  }

  const table = document.getElementById('tablePassword')
  const rowCount = table.childElementCount

  let data = new Array()

  for (let i = 0; i < rowCount; i++) {
    const row = table.children[i]
    const title = row.children[0].textContent.length === 0 ? '---' : row.children[0].textContent
    const website = row.children[1].textContent
    const login = row.children[2].textContent

    const passwordInputBeforeShowing = row.children[3].children[0]
    passwordInputBeforeShowing.click()
    await delay()
    const passwordEye = row.children[3].children[1]
    passwordEye.click()
    await delay()

    const password = table.children[i].children[3].children[0].value
    console.log(`${i + 1}/${rowCount}`)
    data.push([title, login, password, website])
  }

  data.unshift(['Title', 'Username', 'Password', 'URL'])
  const csvContent = data.map(e => e.join(",")).join("\n");

  // Create a blob
  let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  let url = URL.createObjectURL(blob);

  // Create a link to download it
  let pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', 'passwords.csv' /*name of file*/);
  pom.click();
}

await parseFunc()