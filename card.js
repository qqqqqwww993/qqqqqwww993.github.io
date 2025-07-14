function httpGet(url) {
  try {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
  } catch (e) {
    document.getElementById('cardcontainer').innerHTML = `<p style="color:#ff2222">加载失败，请尝试刷新：${e}</p>`;
  }

}
const videoList = JSON.parse(httpGet('https://qqqqqwww993.github.io/hachimi.json'));

console.log('你好');
// 1. 解析JSON数据
function card(objList) {

  // 2. 生成卡片HTML字符串
  const cardsHTML = objList.data.map(item => {
    // 处理标签
    const tagsHTML = item.tag.map(tag =>
      `<span class="tag">${tag}</span>`
    ).join('');

    return `
  <div class="card">
    <img width="330" src="${item.img}" alt="${item.title}封面">
    <div class="cardcontent">
      <h3><a href="${item.bvid}" target="_blank">${item.title}</a></h3>
      <p>${item.author}&nbsp;${item.date}</p>
      <p>${item.desc}</p>
      <div class="tagcontainer">${tagsHTML}</div>
    </div>
  </div>`;
  }).join('');

  // 3. 插入DOM
  document.getElementById('cardcontainer').innerHTML = cardsHTML;
}
card(videoList)
function search(keyword) {
  const result = videoList.data.filter(item =>
    item.title.toLowerCase().includes(keyword) ||
    item.author.toLowerCase().includes(keyword) ||
    item.tag.some(tag => tag.toLowerCase().includes(keyword))
  )
  return { data: result }
}