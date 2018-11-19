var SpriteConstraint = {};

(function() {
    
    SpriteConstraint.create = function(engine, sprite, options) {
        var defaults = {
            engine: engine,
            sprite: sprite,
        };

        var spriteConstraint = Common.extend(defaults, options);

        Matter.Events.on(engine, 'beforeUpdate', function() {
            SpriteConstraint.update(spriteConstraint);
        });

        return spriteConstraint;
    };

    SpriteConstraint.update = function(spriteConstraint) {
        let body = spriteConstraint.sprite.body;
        let sprite = spriteConstraint.sprite.s;

        if(spriteConstraint) {
            sprite.x = body.position.x;
            sprite.y = body.position.y;
            sprite.rotation = body.angle;
        }
    };
})();