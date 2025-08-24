import '../scss/main.scss';

$(function() {
  const container = $('.flower-container');

  function createflower() {
    const size = Math.random() * 80 + 30; // サイズ
    const duration = Math.random() * 7 + 5; // 落下時間
    const left = Math.random() * 100;
    const rotation = Math.random() * 360; // 初期回転
    const rotationSpeed = Math.random() * 60 - 30; // 回転速度（正と負で回転方向を変える）

    const flower = $('<div>')
      .addClass('flower')
      .css({
        width: size + 'px',
        height: size + 'px',
        left: left + '%',
        transform: `rotate(${rotation}deg)` // 初期回転を適用
      })
      .appendTo(container);

    flower.css({
      'animation-duration': duration + 's',
      'animation-name': 'fall-and-rotate' // アニメーション名を指定
    });

    // アニメーション終了後の処理（回転速度も考慮して削除）
    flower.on('animationend', function() {
      $(this).remove();
    });

    // アニメーションの途中で回転を加える（CSSアニメーションと連携）
    flower.css('animation-timing-function', `linear, ease-in-out`); // 均等な落下と緩やかな回転
    flower.css('--rotation-speed', `${rotationSpeed}deg`); // CSS変数として回転速度を渡す（より複雑な制御も可能）
  }

  createflower(); // ページ読み込み時に1回実行
  setInterval(createflower, 2000); // 生成頻度を調整
});