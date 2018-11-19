let RenderPixi = (function() {

    let _requestAnimationFrame,
        _cancelAnimationFrame;

    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                                      || window.mozRequestAnimationFrame || window.msRequestAnimationFrame 
                                      || function(callback){ window.setTimeout(function() { callback(Common.now()); }, 1000 / 60); };
   
        _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame 
                                      || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
    }

    return {
        add: function(render, resource) {
            PIXI.loader.add(resource).load(function(res) {
                Matter.Events.trigger(render, 'afterLoaded', res);
            });
        },

        create: function(options) {

            var defaults = {
                engine: null,
                frameRequestId: null,
                options: {
                    width: 800,
                    height: 600,
                    target: null,
                }
            };
    
            var render = Common.extend(defaults, options);

            render.app = new PIXI.Application(render);
            render.canvas = render.app.view;
            if(null === render.target) {
                document.body.appendChild(render.app.view);
            } else {
                render.target.appendChild(render.app.view);
            }

            return render;
        },

        run: function(render) {
            (function loop(time){
                render.frameRequestId = _requestAnimationFrame(loop);
                render.app.renderer.render(render.app.stage);
            })();

            return render;
        },
    };
})();