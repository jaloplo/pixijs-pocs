var Sprite = {};

(function() {
    
    Sprite.create = function(body, pixiApp, options) {
        var defaults = {
            app: pixiApp,
            body: body,
            resource: null,
            texture: null,
        };

        var sprite = Common.extend(defaults, options);

        if(sprite.texture) {
            sprite.s = new PIXI.Sprite(PIXI.loader.resources[sprite.resource].textures[sprite.texture]);
        } else {
            sprite.s = new PIXI.Sprite(PIXI.loader.resources[sprite.resource].texture);
        }

        sprite.s.anchor.set(0.5);
        sprite.s.x = sprite.body.position.x;
        sprite.s.y = sprite.body.position.y;
        sprite.s.rotation = sprite.body.angle;

        sprite.app.stage.addChild(sprite.s);

        return sprite;
    };
})();