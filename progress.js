		function drawCircle(parent, thick, percent, tick, color1, color2) { // 부모요소, 두께, 퍼센트, 채워지는 속도, 꽉찼을때 color, 시작 color
			const pt = percent;
			const radius = parent.clientHeight / 2;
			if (percent >= 100) {
				percent = 99.99;
			}
			percent *= 2;
			const canvas = document.createElement('canvas');
			canvas.height = radius * 2;
			canvas.width = radius * 2;
			parent.appendChild(canvas);
			const ctx = canvas.getContext('2d');
			ctx.scale(1, 1);

			let div = document.createElement('div');
			div.className = 'percent';
			parent.appendChild(div);
			let size = 0;
			let interval = setInterval(function () {
				if (size + tick >= percent) {
					size = percent;
				}
				ctx.clearRect(0, 0, radius * 2, radius * 2)
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = '#abc';
				ctx.arc(radius, radius, radius, 0, Math.PI * 2);
				ctx.fill();

				ctx.beginPath();
				ctx.fillStyle = '#333333';
				ctx.arc(radius, radius, radius - thick, 0, Math.PI * 2);
				ctx.fill();

				div.innerHTML = Math.round(size / 2) + '%';
				div.style.fontSize = radius / 3 + "px";
				ctx.beginPath();
				ctx.lineWidth = thick;
				const gr = ctx.createLinearGradient(0, 0, (2 * radius * Math.PI) * size / 100 / 2, 0);
				gr.addColorStop("0", color1);
				gr.addColorStop("1", color2);
				ctx.strokeStyle = gr;
				ctx.arc(radius, radius, radius - thick / 2, Math.PI * 2 - Math.PI / 2, (Math.PI * size / 100) - (Math
					.PI / 2));
				ctx.stroke();
				size += tick;
				if (size >= percent) {
					clearInterval(interval);
				}
			}, 10)
			ctx.restore();
		}
