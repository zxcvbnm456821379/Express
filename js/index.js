window.onload = function () {
    function close() {
        document.querySelector('input').value = '';
    }

    let input = document.querySelector('input');
    input.oninput = function () {
        document.querySelector('.close').style.visibility = 'visible';
        document.querySelector('.close').onclick = function () {
            close();
            this.style.visibility = 'hidden';
        }
        if (this.value == '') {
            document.querySelector('.close').style.visibility = 'hidden';
        }
    }

    let expressNum = "";
    document.querySelector('.serach-btn').onclick = function () {
        if (isNaN(document.querySelector('input').value.slice(2)) || document.querySelector('input').value == '') {
            document.querySelector('.message').style.display = 'inline-block';
            setTimeout(() => {
                document.querySelector('.message').style.display = 'none';
            }, 1500)
            return false;
        } else {
            expressNum = document.querySelector('input').value;
            document.querySelector('.loading').style.display = 'inline-block';
            document.querySelector('.listpage').style.display = 'block';
            document.querySelector('.listpage input').value = expressNum;
            getData(expressNum);
          
            document.querySelector('.content').style.display = 'none';
            let telm = ``;
            telm += `<li>${expressNum}</li>`;
            document.querySelector('.strong').style.display = 'block';
            document.querySelector('.strong ul').innerHTML = telm;

        }
    }

    function template(res) {
        //解构数据
        let data = res.data.info;
        data.reverse();
        //433274537523361
        let html = ``;
        for (item in data) {
            html += `
                <li class="last">
                    <div class="time">
                         <div>${data[item].time.split(' ')[0]}</div>
                         <div>${data[item].time.split(' ')[1]}</div>
                    </div>
                    <div class="dot"></div>
                    <div class="text">${data[item].content}</div>
                 </li>
            `;
        }
        let com = ` 
            <div class="com">快递公司：${ res.data.com }</div>
            <p>状态：<span style="color: red;">${ res.data.status_desc }</span></p>
        `;
       
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.list-header').innerHTML = com;
        document.querySelector('.result-success ul').innerHTML = html;
        let li = document.querySelectorAll('.result-success li');
        li[0].className = 'last current';
    }

    function getData(phone) {
        let xhr = new XMLHttpRequest();
        let data = `token=GSA37mwWjz2YxAo9&number=${phone}&com=&order=asc`;
        xhr.open('GET', 'https://v2.alapi.cn/api/kd?' + data);
        xhr.send(null);
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                template(JSON.parse(this.responseText));
                document.querySelector('.empty-null').style.display = 'none';
            } else {
                document.querySelector('.result-success ul').innerHTML = '';
                document.querySelector('.empty-null').style.display = 'block';
            }
        })

    }

    document.querySelector('.go-home').onclick = function () {
        document.querySelector('.listpage').style.display = 'none';
        document.querySelector('.loading').style.display = 'none';
    }

}