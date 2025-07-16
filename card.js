let videoList = { data: [] };

function httpGet(url) {
  try {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
  } catch (e) {
    document.getElementById('cardcontainer').innerHTML = `<p style="color:#ff2222">加载失败，请尝试刷新：${e}</p>`;
    return null; // 添加返回值避免后续错误
  }
}

function getPage(page){
  try {
    // 添加空值检查
    const response = httpGet('https://qqqqqwww993.github.io/hachimis/index.json');
    if (!response) return null;
    
    const index = JSON.parse(response);
    return 'https://qqqqqwww993.github.io' + index.hachimis[page-1];
  } catch (e) {
    console.error("哈！", e);
    return null;
  }
}

console.log('你好');

// 1. 解析JSON数据
function card(objList) {
  try {
    // 安全解析并更新全局 videoList
    const parsedData = JSON.parse(objList);
    videoList = parsedData || { data: [] }; // 确保有默认值
    
    // 2. 生成卡片HTML字符串
    const cardsHTML = videoList.data.map(item => {
      // 添加空值检查
      const tags = item.tag || [];
      const tagsHTML = tags.map(tag => 
        `<span class="tag">${tag}</span>`
      ).join('');
      
      // 安全日期处理
      const date = item.date ? new Date(item.date).toLocaleString() : "";
      
      return `
      <div class="card">
        <div class="cardcontent">
          <h3><a href="${item.bvid || '#'}" target="_blank">${item.title || ""}</a></h3>
          <p class="author">${item.author || ""}&nbsp;${date}</p>
          <p>${item.desc || ""}</p>
          <div class="tagcontainer">${tagsHTML}</div>
        </div>
      </div>`;
    }).join('');

    // 3. 插入DOM
    document.getElementById('cardcontainer').innerHTML = cardsHTML;
  } catch (e) {
    console.error("哈！", e);
    document.getElementById('cardcontainer').innerHTML = `<p style="color:#ff2222">哈！${e.message}</p>`;
  }
}

// 搜索函数添加空值检查
function search(keyword) {
  const data = videoList.data || [];
  const result = data.filter(item => {
    const title = item.title?.toLowerCase() || "";
    const author = item.author?.toLowerCase() || "";
    const desc = item.desc?.toLowerCase() || "";
    const tags = item.tag?.map(t => t.toLowerCase()) || [];
    
    return (
      title.includes(keyword) ||
      author.includes(keyword) ||
      desc.includes(keyword) ||
      tags.some(tag => tag.includes(keyword))
    );
  });
  
  return { data: result };
}