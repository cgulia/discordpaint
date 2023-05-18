function paint(arg, rm) {
    if (arg[0] == "dot" || arg[0] == "d") {
        var pixelx = parseInt(arg[1]);
        var pixely = parseInt(arg[2]);
        var color = Jimp.cssColorToHex(arg[3]);
        Jimp.read("canvas.png", (err, canvas) => {
            if (err) throw err;
                canvas.setPixelColor(color, pixelx, pixely)
                canvas.write('canvas.png')
                canvas.resize(1280, 640, Jimp.RESIZE_NEAREST_NEIGHBOR)
                canvas.write('canvas_lg.png');
        });
    } else if (arg[0] == "line" || arg[0] == "l") {
        var startx = parseInt(arg[1]);
        var starty = parseInt(arg[2]);
        var endx =   parseInt(arg[3]);
        var endy =   parseInt(arg[4]);
        var color = Jimp.cssColorToHex(arg[5]);
        var pixels = [];
        if (startx == endx) {
            for (let sy=starty;sy<endy;sy++) {
                var npixel = [startx, sy];
                pixels.push(npixel);
            }
        } else if (starty == endy) {
            for (let sx=startx;sx<endx;sx++) {
                var npixel = [sx, starty];
                pixels.push(npixel);
            }
        } else {
            return;
        }

        Jimp.read("canvas.png", (err, canvas) => {
            if (err) throw err;
                pixels.forEach((px) => {
                    canvas.setPixelColor(color, px[0], px[1]);
                });
                canvas.write('canvas.png')
                canvas.resize(1280, 640, Jimp.RESIZE_NEAREST_NEIGHBOR)
                canvas.write('canvas_lg.png');
        });
    }
    clear();
    async function clear() {
        const fetched = await client.channels.get(paintchannel).fetchMessages({limit: 99});
        client.channels.get(paintchannel).bulkDelete(fetched);
    }
    setTimeout(sendpaint, 500);
}