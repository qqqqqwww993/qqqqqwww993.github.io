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
const videoList = JSON.parse(httpGet('https://qqqqqwww993.github.io/hachimis/h1.json'));

console.log('你好');
// 1. 解析JSON数据
function card(objList) {
  dataArray = objList.data || [];
  // 2. 生成卡片HTML字符串
  cardsHTML = dataArray.map(item => {
    // 处理标签
    console.log(item)
    console.log(item.tag)
    
    tagsHTML = (item.tag || []).map(tag =>
      `<span class="tag">${tag}</span>`
    ).join('');
    
    const date=new Date(item.date).toLocaleString();
    return `
  <div class="card">
    <div class="cardcontent">
      <h3><a href="${item.bvid}" target="_blank">${item.title}</a></h3>
      <p class="author">${item.author}&nbsp;${date}</p>
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
  const searchData = videoList.data || [];
  const result = searchData.filter(item => {
    const lowerKeyword = keyword.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(lowerKeyword)) ||
      (item.author && item.author.toLowerCase().includes(lowerKeyword)) ||
      (item.desc && item.desc.toLowerCase().includes(lowerKeyword)) ||
      (item.tag && item.tag.some(tag => 
        tag.toLowerCase().includes(lowerKeyword)
      )
    ));
  });
  return { data: result };
}