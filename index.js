const fetch = require('node-fetch');
var cheerio = require('cheerio');
const chalk = require('chalk');
const readlineSync = require('readline-sync');

const getJudul = (judul) => new Promise((resolve, reject) => {
    fetch(`http://149.56.24.226/?s=${judul.replace(/\s/g, "+")}`, {
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            },
    })
    .then(async res => {

        const result = await res.text()
        $ = cheerio.load(result)
        const ress = $('div[class="col-xs-9 col-sm-10 search-content"] h2 a').attr('href')
        const titlenya = $('div[class="col-xs-9 col-sm-10 search-content"] h2 a').attr('title')
        const ress2 = $('img[class="img-thumbnail"]').attr('src')
        const hasil = {
            link: ress,
            title: titlenya,
            img: `http:`+ress2
        }
        resolve(hasil)
    })
    .catch(err => reject(err))
});

const getDownloadSource = (link) => new Promise((resolve, reject) => {
    fetch(link, {
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            },
    })
    .then(async res => {

        const result = await res.text()
        $ = cheerio.load(result)
        const ress = $('a[class="btn btn-success"]').attr('href')
        resolve(ress)
    })
    .catch(err => reject(err))
});

const getRedirect = (link) => new Promise((resolve, reject) => {
    fetch(link, {
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            },
    })
    .then(async res => {

        const result = await res.text()
        $ = cheerio.load(result)
        const ress = `http://` + link.split('/')[2] + $('frame').attr('src')
        resolve(ress)
    })
    .catch(err => reject(err))
});

const getinsideRedirect = (link) => new Promise((resolve, reject) => {
    fetch(link, {
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            },
    })
    .then(async res => {

        const result = await res.text()
        $ = cheerio.load(result)
        const ress = $('a[target="_parent"]').attr('href')
        resolve(ress)
    })
    .catch(err => reject(err))
});

const getDownloadPage = (link) => new Promise((resolve, reject) => {
    fetch(link, {
        method: 'GET',
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            },
    })
    .then(async res => {
        var anjing = new Array()
        res.headers.raw()['set-cookie'].forEach(element => {
            anjing.push(element.split(';')[0]+`;`)
        });
        const result = await res.text()
        const ress = 
        {
            link: `https://` + link.split('/')[2] + result.split('$.post("')[1].split('"')[0],
            boday: result.split('}).done(')[0].split('{')[1],
            cookie:`__cfduid=d9fe08c82af51db7b9c63ebddc7ae68861587402310; _ga=GA1.2.658651104.1587402312; _gid=GA1.2.729933755.1587402312; __asc=10283a85171988d0ae80d16e6eb; __auc=10283a85171988d0ae80d16e6eb; _gat=1; ` + anjing.join('')
        }
        resolve(ress)
    })
    .catch(err => reject(err))
});

const getDownloadLink = (link, cookie, referer, boddy) => new Promise((resolve, reject) => {
    const boday = boddy
    fetch(link, {
        method: 'POST',
        headers: {
            "Connection": "keep-alive",
            "Content-Length": boday.length,
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            "Accept": "*/*",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": referer,
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cookie": cookie,          
            },
            body: boday
    })
    .then(async res => {
        const result = await res.text()
        $ = cheerio.load(result)
        const fruits = [];
        const link = [];
        const anjay = [];
        $(`a[target='_blank']`).each(function(i, elem) {
          fruits[i] = (i+1) + '.' + $(this).attr('class').replace('btn-', '').replace('btnx','')+'p'+ ' => ' + $(this).attr('href') 
          link[i] = $(this).attr('href')
        });
        link.forEach(elem =>{
            if(elem.includes('layarkacaxxi.org'))
            {
                anjay.push(elem.split('/')[4])
            }
        })
        const resultnew ={
            link: anjay[0],
            mirror: fruits
        }
        resolve(resultnew)
    })
    .catch(err => reject(err))
});

const startDownloadLast = (link) => new Promise((resolve, reject) => {
    fetch(link, {
        method: 'POST',
    })
    .then(async res => {
        const result = await res.json()
        resolve(result)
    })
    .catch(err => reject(err))
});

(async() => {

    console.log(chalk.cyan('- - SGBTEAM - -\nLayarkaca 21 Get Direct Link\nWithout Ads!\nCreated by AREL TIYAN\n- - SGBTEAM - -'))
    while(1)
    {
        try{
            
            
            const judul        = readlineSync.question(chalk.yellow("Judul filmnya dong gantenk/cantig : "))
            const startGetJudul = await getJudul(judul)
            console.log('[GET] => JUDUL')
            if(typeof startGetJudul.link == 'undefined')
            {
                console.log('gaada')
            }else{
                console.log(`\n${chalk.yellow('Dicek dulu yaaaaa ada yang salah tidak')}\n\n${chalk.cyan('JUDUL ==>')} ${chalk.yellow(startGetJudul.title)}\n`)
                const benar        = readlineSync.question(chalk.yellow("Bener ga judulnya gantenk/cantig? [y/n] : "))
                if(benar == 'y')
                {
                    const startGetDownloadSource = await getDownloadSource(startGetJudul.link)
                    console.log('[GET] => LINK DOWNLOAD')
                    if(typeof startGetDownloadSource == 'undefined')
                    {
                        console.log('error startGetDownloadSource ')
                    }else{
                        const startGetRedirect = await getRedirect(startGetDownloadSource)
                        console.log('[BYPASS] => REDIRECT')
                        if(typeof startGetRedirect == 'undefined')
                        {
                            console.log('error startGetRedirect ')
                        }else{
                            const startinsideGetRedirect = await getinsideRedirect(startGetRedirect)
                            console.log('[BYPASS] => REDIRECT 2')
                            if(typeof startinsideGetRedirect == 'undefined')
                            {
                                console.log('error startinsideGetRedirect ')
                            }else{
                                const startgetDownloadPage = await getDownloadPage(startinsideGetRedirect)
                                console.log('[BYPASS] => DOWNLOAD PAGE')
                                if(typeof startgetDownloadPage.link == 'undefined')
                                {
                                    console.log('error startgetDownloadPage ')
                                }else{
                                    const startgetDownloadLink = await getDownloadLink(startgetDownloadPage.link, startgetDownloadPage.cookie, startinsideGetRedirect, startgetDownloadPage.boday)
                                    console.log('[BYPASS] => GETTING DOWNLOAD LINK')
                                    if(typeof startgetDownloadLink.link == 'undefined')
                                    {
                                        console.log('[ERROR] => GETTING DOWNLOAD LINK\n')
                                        console.log('[SUCCESS] => GETTING MIRROR DOWNLOAD LINK\n')
                                        const text = chalk.yellow('MIRROR DOWNLOAD') + '\n'+ chalk.green(startgetDownloadLink.mirror.join('\n'))
                                        console.log(text)
                                    }else{
                                        const startDownloadLastt = await startDownloadLast(`https://layarkacaxxi.org/api/source/` + startgetDownloadLink.link)
                                        if(startDownloadLastt.success == true)
                                        {
                                            
                                            console.log('[SUCCESS] => GETTING DOWNLOAD LINK\n')
                                            const link = [];
                                            for(let i=0;i<startDownloadLastt.data.length;i++)
                                            {
                                                link.push(startDownloadLastt.data[i].label+' => '+ startDownloadLastt.data[i].file)
                                            }
                                            const a = {
                                                direct: link,
                                                mirror: startgetDownloadLink.mirror
                                            }
                                            const text = chalk.yellow(`LINK DIRECT (AUTO DOWNLOAD)`) + `\n` + chalk.green(a.direct.join('\n')) + `\n\n` + chalk.yellow('MIRROR DOWNLOAD') + '\n'+ chalk.green(a.mirror.join('\n'))
                                            console.log(text)
                                        }else{
                                            console.log('[ERROR] => GETTING DOWNLOAD LINK\n')
                                            console.log('[SUCCESS] => GETTING MIRROR DOWNLOAD LINK\n')
                                            const text = chalk.yellow('MIRROR DOWNLOAD') + '\n'+ chalk.green(startgetDownloadLink.mirror.join('\n'))
                                            console.log(text)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    console.log('Oke deh gantenk/cantig kita cari lagi')
                }
            }
        }catch(err)
        {
            console.log('Errorrrrrr =>', err)
        }
    }
    
})()
