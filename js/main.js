$(function() {
  const container = $('.flower-container');

  function createflower() {
    const size = Math.random() * 80 + 30;
    const duration = Math.random() * 7 + 5;
    const left = Math.random() * 100;
    const rotation = Math.random() * 360;
    const rotationSpeed = Math.random() * 60 - 30;

    const flower = $('<div>')
      .addClass('flower')
      .css({
        width: size + 'px',
        height: size + 'px',
        left: left + '%',
        transform: `rotate(${rotation}deg)`, // 初期回転
        'animation-duration': `${duration}s`, // アニメーション時間
        'animation-name': 'fall' // 落下アニメーション
      })
      .appendTo(container);

    // アニメーション終了後に削除
    flower.on('animationend', function() {
      $(this).remove();
    });
  }

  createflower();
  setInterval(createflower, 1000);
});