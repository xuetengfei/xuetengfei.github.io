javascript: (() => {
  function f(s) {
    const blacklists = ['楽天', '円', '勝手に安', 'さらに', 'を使い倒す'];
    let r = true;
    for (let i = 0; i < blacklists.length; i++) {
      if (s.includes(blacklists[i])) {
        r = false;
        break;
      }
    }
    return r;
  }
  function copyToClipboard(text) {
    const input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
  }
  var content = [...document.querySelectorAll('div[data-testid="tweetText"]')]
    .map(v =>
      [...v.querySelectorAll('span')]
        .map(v => v.textContent)
        .filter(f)
        .reduce((acc, cur) => acc + cur, ''),
    )
    .map(v => '-'.repeat(4) + v)
    .reduce((acc, cur) => acc + cur, '');
  const x = '----[推文地址](' + window.location.href + ')';
  copyToClipboard(content + x + '#twitter');
})();

// [JavaScript Minifier & Compressor | Toptal®](https://www.toptal.com/developers/javascript-minifier)

// javascript:(()=>{function e(e){let t=["楽天","円","勝手に安","さらに","を使い倒す"],l=!0;for(let r=0;r<t.length;r++)if(e.includes(t[r])){l=!1;break}return l}function t(e){let t=document.createElement("textarea");t.style.position="fixed",t.style.opacity=0,t.value=e,document.body.appendChild(t),t.select(),document.execCommand("Copy"),document.body.removeChild(t)}var l=[...document.querySelectorAll('div[data-testid="tweetText"]')].map(t=>[...t.querySelectorAll("span")].map(e=>e.textContent).filter(e).reduce((e,t)=>e+t,"")).map(e=>"-".repeat(4)+e).reduce((e,t)=>e+t,"");let r="----[推文地址]("+window.location.href+")";t(l+r+"----#twitter")})();
