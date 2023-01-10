const btn = document.getElementById('btn');
const val = document.getElementById('input');
const screen = document.getElementById('screenDetails');
btn.addEventListener('click', () => {
  const title = val.value;
  const x = window.electronAPI.setText(title).then(res => {
    screen.innerText = res;
  });
});