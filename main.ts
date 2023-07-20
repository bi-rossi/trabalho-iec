namespace SpriteKind {
    export const TiroInimigo = SpriteKind.create()
    export const tiroespecial = SpriteKind.create()
    export const projectile2 = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (municao.value > 0) {
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
        projectile2 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 3 1 3 . . . . . . 
            . . . . . . 2 3 1 3 2 . . . . . 
            . . . . . . 2 1 1 1 2 . . . . . 
            . . . . . . 2 1 1 1 3 . . . . . 
            . . . . . . 3 1 1 1 3 . . . . . 
            . . . . . . 3 1 1 1 3 . . . . . 
            . . . . . . 3 1 1 1 3 . . . . . 
            . . . . . . 2 3 1 3 2 . . . . . 
            . . . . . . . 2 2 2 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, minhaNave, 0, -95)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.tiroespecial, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.coolRadial, 200)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 100)
    municao.value += 100
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite4, otherSprite4) {
    sprites.destroy(otherSprite4, effects.bubbles, 200)
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
    gasolina.value += 30
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite5, otherSprite5) {
    sprites.destroy(sprite5)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite5).value += -50
    sprites.destroy(otherSprite5)
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b b . . . . . . . . 
        . . . . . b b b b . . . . . . . 
        . . . . b b 2 2 b b . . . . . . 
        . . . . b 2 2 2 2 b . . . . . . 
        . . . . b b b b b b . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, minhaNave, 0, -50)
    projectile.setFlag(SpriteFlag.AutoDestroy, true)
    pause(100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.TiroInimigo, function (sprite3, otherSprite3) {
    sprites.destroy(otherSprite3, effects.fire, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.gameOver(false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite6, otherSprite6) {
    sprites.destroy(otherSprite6, effects.fire, 500)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.gameOver(false)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.TiroInimigo, function (sprite2, otherSprite2) {
    sprites.destroy(sprite2, effects.fire, 500)
    sprites.destroy(otherSprite2, effects.fire, 500)
})
function addEnemyNv1 () {
    let velocidade = 0
    navesInimigas = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 2 . . . . . 2 . . . . 
        . . . . . . 2 . . . 2 . . . . . 
        . . . . . 2 2 2 2 2 2 2 . . . . 
        . . . . . 2 . 2 2 2 . 2 . . . . 
        . . . . 2 2 . 2 2 2 . 2 2 . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . . 2 . 2 . . . . . 2 . 2 . . 
        . . . 2 . . 2 . . . 2 . . 2 . . 
        . . . 2 . . . 2 . 2 . . . 2 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    localizacaoAleatoria = randint(0, scene.screenWidth())
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar.attachToSprite(navesInimigas, 5, 0)
    navesInimigas.setPosition(localizacaoAleatoria, 0)
    navesInimigas.setVelocity(velocidade, 35)
    projetilInimigo = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . 2 f 2 . . . . . . . 
        . . . . . f f 2 f f . . . . . . 
        . . . . . 2 2 f 2 2 . . . . . . 
        . . . . . . f 2 f . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.TiroInimigo)
    projetilInimigo.setPosition(localizacaoAleatoria, 0)
    projetilInimigo.setVelocity(0, 50)
    navesInimigas.setFlag(SpriteFlag.AutoDestroy, true)
    projetilInimigo.setFlag(SpriteFlag.AutoDestroy, true)
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    sprites.destroy(status.spriteAttachedTo(), effects.fire, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.projectile2, SpriteKind.Enemy, function (sprite5, otherSprite5) {
    sprites.destroy(otherSprite5)
    projectile2.startEffect(effects.halo)
    info.changeScoreBy(1)
})
function callEnemy2 () {
    navesInimigas2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 4 . . . . . . . . . 4 . . . 
        . . . 8 . . 8 8 8 . . 8 . . . . 
        . . 4 8 . 8 8 8 8 8 . 8 4 . . . 
        . . . 8 8 8 1 8 1 8 8 8 . . . . 
        . . . . . 8 8 8 8 8 . . . . . . 
        . . . . . 8 8 8 8 8 . . . . . . 
        . . . . 8 . . 8 . . 8 . . . . . 
        . . . 8 . . 8 . 8 . . 8 . . . . 
        . . 4 . . . . . . . . . 4 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    localizacaoAleatoria = randint(0, scene.screenWidth())
    statusbar2 = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar2.attachToSprite(navesInimigas2, 5, 0)
    navesInimigas2.setPosition(localizacaoAleatoria, 0)
    navesInimigas2.setVelocity(0, 20)
    ProjetilInimigo2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 2 4 2 2 . . . . . . 
        . . . . . 2 4 2 4 2 . . . . . . 
        . . . . . 2 2 4 2 2 . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.TiroInimigo)
    ProjetilInimigo2.setPosition(localizacaoAleatoria, 0)
    ProjetilInimigo2.setVelocity(0, 30)
    navesInimigas2.setFlag(SpriteFlag.AutoDestroy, true)
    ProjetilInimigo2.setFlag(SpriteFlag.AutoDestroy, true)
}
statusbars.onZero(StatusBarKind.Energy, function (status2) {
    sprites.destroy(status2.spriteAttachedTo(), effects.fire, 500)
    info.setLife(0)
    if (info.life() == 0) {
        game.gameOver(false)
    }
})
info.onScore(5, function () {
    nivel += 1
})
let consumivelgas: Sprite = null
let novoTiro: Sprite = null
let random_loc_2 = 0
let random_loc_3 = 0
let nivel = 0
let ProjetilInimigo2: Sprite = null
let statusbar2: StatusBarSprite = null
let navesInimigas2: Sprite = null
let projetilInimigo: Sprite = null
let statusbar: StatusBarSprite = null
let localizacaoAleatoria = 0
let navesInimigas: Sprite = null
let projectile: Sprite = null
let projectile2: Sprite = null
let municao: StatusBarSprite = null
let gasolina = 0
let minhaNave: Sprite = null
game.showLongText("Aperte Espaço para atirar e use as setas para se mover.", DialogLayout.Bottom)
game.showLongText("Desvie dos projeteis e naves inimigas, você também pode destruir eles com seus foguetes", DialogLayout.Center)
effects.starField.startScreenEffect()
minhaNave = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . 8 . . . . . . . . 
    . . . . . . 2 . 2 . . . . . . . 
    . . . . . 8 . 8 . 8 . . . . . . 
    . . . 8 . 8 8 f 8 8 . 8 . . . . 
    . . . 2 8 8 . 8 . 8 8 2 . . . . 
    . . . 8 . . f 8 f . . 8 . . . . 
    . . . . . . . 8 . . . . . . . . 
    . . . . . 8 8 2 8 8 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(minhaNave)
minhaNave.setStayInScreen(true)
info.setLife(3)
info.setScore(0)
gasolina = 0
gasolina.attachToSprite(minhaNave, 3, 0)
municao = statusbars.create(20, 4, StatusBarKind.Energy)
municao.attachToSprite(minhaNave, -4, 0)
game.onUpdateInterval(5000, function () {
    random_loc_3 = randint(0, scene.screenWidth())
    projectile2 = sprites.create(img`
        . . . . . b b b b b b . . . . . 
        . . . b b 9 9 9 9 9 9 b b . . . 
        . . b b 9 9 9 9 9 9 9 9 b b . . 
        . b b 9 d 9 9 9 9 9 9 9 9 b b . 
        . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
        b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
        b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
        b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
        b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
        . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
        . b d 5 3 3 3 3 3 3 3 d 5 b b . 
        . . b d 5 d 3 3 3 3 5 5 b b . . 
        . . . b b 5 5 5 5 5 5 b b . . . 
        . . . . . b b b b b b . . . . . 
        `, SpriteKind.tiroespecial)
    projectile2.setPosition(random_loc_2, 0)
    projectile2.setVelocity(0, 35)
    projectile2.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(2000, function () {
    addEnemyNv1()
})
game.onUpdateInterval(2000, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        novoTiro = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 2 . . 2 . . . . . . . 
            . . . . . . 2 2 . . . . . . . . 
            . . . . . f e f f . . . . . . . 
            . . . . e f f f e f . . . . . . 
            . . . . . f e f f . . . . . . . 
            . . . . . . f e . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.TiroInimigo)
        novoTiro.setPosition(value.x, value.y)
        novoTiro.setVelocity(0, 50)
        novoTiro.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
game.onUpdateInterval(1000, function () {
    navesInimigas.vx += randint(-15, 15)
})
game.onUpdateInterval(100, function () {
    municao.value += -4
})
game.onUpdateInterval(3000, function () {
    random_loc_2 = randint(0, scene.screenWidth())
    consumivelgas = sprites.create(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        .....7977777777.....
        .....7777777777.....
        ......66666666......
        ......77777777......
        .....7797777777.....
        .....7977777777.....
        .....7977777777.....
        .....7777777777.....
        .....7777777777.....
        .....7777777776.....
        .....7777777776.....
        ......76666666......
        ....................
        ....................
        `, SpriteKind.Food)
    consumivelgas.setPosition(random_loc_2, 0)
    consumivelgas.setVelocity(0, 45)
    consumivelgas.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(3000, function () {
    if (nivel == 1 && Math.percentChance(20)) {
        callEnemy2()
    }
})
game.onUpdateInterval(200, function () {
    gasolina.value += -1
})
