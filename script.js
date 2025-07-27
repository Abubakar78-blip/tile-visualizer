document.getElementById('visualizerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const width = parseInt(document.getElementById('roomWidth').value);
  const height = parseInt(document.getElementById('roomHeight').value);
  const orientation = parseInt(document.getElementById('orientation').value);
  const tileFile = document.getElementById('tileImage').files[0];

  const canvas = document.getElementById('tileCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = function (e) {
    img.onload = function () {
      const pattern = ctx.createPattern(img, 'repeat');
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((orientation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };
    img.src = e.target.result;
  };

  if (tileFile) reader.readAsDataURL(tileFile);
});
