function getPageno() {
  const param = new URLSearchParams(location.search);
  const pageno = parseInt(param.get('pageno'));

  if(isNaN(pageno))
    return 1;
  else if(pageno<1)
    return 1;
  return pageno;
}

async function fetch(pageno=1, pagesize=10) {
  const api = 'http://sample.bmaster.kro.kr/contacts';
  const url = `${api}?pageno=${pageno}&pagesize=${pagesize}`;
  try {
    return await $.ajax(url);
  } catch(err) {
    console.log(err);
    return null;
  }
}

function printContacts(contacts) {
  const $parent = $('#tbody');
  for(c of contacts) {
    const html = `
      <tr>
        <td>${c.no}</td>
        <td><a href='read.html?no=${c.no}'>${c.name}</a></td>
        <td>${c.tel}</td>
        <td>${c.address}</td>
      </tr>
    `;
    $parent.append(html);
  }
}

function getPagination({pageno, totalcount, pagesize, blocksize=5}) {
  const 페이지개수 = Math.ceil(totalcount/pagesize);
  const prev = Math.floor((pageno-1)/blocksize)*blocksize;
  const start = prev + 1;
  let end = prev + blocksize;
  let next = end + 1;
  if(end>=페이지개수) {
    end = 페이지개수;
    next = 0;
  }
  return {prev, start, end, next, pageno};
}

function printPagination({prev, start, end, next, pageno}) {
  const $parent = $('#pagination');
  if(prev>0) {
    const html=`<li class="page-item"><a href="list.html?pageno=${prev}" class="page-link">이전으로</a></li> `;
    $parent.append(html);
  }
  for(let i=start; i<=end; i++) {
    let classname = 'page-item';
    if(i===pageno)
      classname = 'page-item active'
    const html=`<li class="${classname}"><a href="list.html?pageno=${i}" class="page-link">${i}</a></li> `;
    $parent.append(html);
  }
  if(next>0) {
    const html=`<li class="page-item"><a href="list.html?pageno=${next}" class="page-link">다음으로</a></li> `;
    $parent.append(html);
  }
}



