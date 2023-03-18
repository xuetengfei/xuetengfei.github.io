javascript: (() => {
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
  var content = [...document.querySelectorAll('[data-testid="tweetText"]')]
    .map(v =>
      [...v.querySelectorAll('span')]
        .map(v => v.textContent)
        .reduce((acc, cur) => acc + cur, ''),
    )
    .map(v => '-'.repeat(4) + v)
    .reduce((acc, cur) => acc + cur, '');
  const x = '[推文地址](' + window.location.href + ')';
  copyToClipboard(content + x);
})();
