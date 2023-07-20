@namespace
class SpriteKind:
    TiroInimigo = SpriteKind.create()
    tiroespecial = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    sprites.destroy(otherSprite, effects.cool_radial, 200)
    scene.camera_shake(4, 100)
    municao.value += 100
sprites.on_overlap(SpriteKind.player, SpriteKind.tiroespecial, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    sprites.destroy(sprite2, effects.fire, 500)
    sprites.destroy(otherSprite2, effects.fire, 500)
sprites.on_overlap(SpriteKind.projectile,
    SpriteKind.TiroInimigo,
    on_on_overlap2)

def on_a_pressed():
    global projectile2, projectile
    if True:
        projectile2 = sprites.create_projectile_from_sprite(img("""
                . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . 4 4 . . . . . . . 
                            . . . . . . 4 5 5 4 . . . . . . 
                            . . . . . . 2 5 5 2 . . . . . . 
                            . . . . . . . 2 2 . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . .
            """),
            minhaNave,
            0,
            -82)
        projectile2.set_flag(SpriteFlag.AUTO_DESTROY, True)
        pause(200)
    projectile = sprites.create_projectile_from_sprite(img("""
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
        """),
        minhaNave,
        0,
        -50)
    projectile.set_flag(SpriteFlag.AUTO_DESTROY, True)
    pause(200)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def addEnemyNv1():
    global navesInimigas, localizacaoAleatoria, statusbar, projetilInimigo
    navesInimigas = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    localizacaoAleatoria = randint(0, scene.screen_width())
    statusbar = statusbars.create(20, 4, StatusBarKind.health)
    statusbar.attach_to_sprite(navesInimigas, 5, 0)
    navesInimigas.set_position(localizacaoAleatoria, 0)
    navesInimigas.set_velocity(0, 30)
    projetilInimigo = sprites.create(img("""
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
        """),
        SpriteKind.TiroInimigo)
    projetilInimigo.set_position(localizacaoAleatoria, 0)
    projetilInimigo.set_velocity(0, 50)
    navesInimigas.set_flag(SpriteFlag.AUTO_DESTROY, True)
    projetilInimigo.set_flag(SpriteFlag.AUTO_DESTROY, True)

def on_on_score():
    global nivel
    nivel += 1
info.on_score(10, on_on_score)

def on_on_overlap3(sprite3, otherSprite3):
    sprites.destroy(otherSprite3, effects.fire, 500)
    scene.camera_shake(4, 500)
    info.change_life_by(-1)
    if info.life() == 0:
        game.game_over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.TiroInimigo, on_on_overlap3)

def on_on_zero(status):
    sprites.destroy(status.sprite_attached_to(), effects.fire, 500)
    info.change_score_by(1)
statusbars.on_zero(StatusBarKind.health, on_on_zero)

def on_on_overlap4(sprite4, otherSprite4):
    sprites.destroy(otherSprite4, effects.bubbles, 200)
    gasolina.value += 30
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap4)

def on_on_zero2(status2):
    sprites.destroy(status2.sprite_attached_to(), effects.fire, 500)
    info.set_life(0)
    if info.life() == 0:
        game.game_over(False)
statusbars.on_zero(StatusBarKind.energy, on_on_zero2)

def on_on_overlap5(sprite5, otherSprite5):
    sprites.destroy(sprite5)
    statusbars.get_status_bar_attached_to(StatusBarKind.health, otherSprite5).value += -50
    sprites.destroy(otherSprite5)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap5)

def on_on_overlap6(sprite6, otherSprite6):
    sprites.destroy(otherSprite6, effects.fire, 500)
    scene.camera_shake(4, 500)
    info.change_life_by(-1)
    if info.life() == 0:
        game.game_over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap6)

consumivelgas: Sprite = None
novoTiro: Sprite = None
random_loc_2 = 0
random_loc_3 = 0
projetilInimigo: Sprite = None
statusbar: StatusBarSprite = None
localizacaoAleatoria = 0
navesInimigas: Sprite = None
projectile: Sprite = None
projectile2: Sprite = None
municao: StatusBarSprite = None
gasolina: StatusBarSprite = None
minhaNave: Sprite = None
game.show_long_text("Aperte Espaço para atirar e use as setas para se mover.",
    DialogLayout.BOTTOM)
game.show_long_text("Desvie dos projeteis e naves inimigas, você também pode destruir eles com seus foguetes",
    DialogLayout.CENTER)
effects.star_field.start_screen_effect()
minhaNave = sprites.create(img("""
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
    """),
    SpriteKind.player)
controller.move_sprite(minhaNave)
minhaNave.set_stay_in_screen(True)
info.set_life(3)
info.set_score(0)
nivel = 0
gasolina = statusbars.create(20, 4, StatusBarKind.energy)
gasolina.attach_to_sprite(minhaNave, 3, 0)
municao = statusbars.create(10, 3, StatusBarKind.magic)
municao.attach_to_sprite(minhaNave, -4, 0)

def on_update_interval():
    global random_loc_3, projectile2
    random_loc_3 = randint(0, scene.screen_width())
    projectile2 = sprites.create(img("""
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
        """),
        SpriteKind.tiroespecial)
    projectile2.set_position(random_loc_2, 0)
    projectile2.set_velocity(0, 35)
game.on_update_interval(5000, on_update_interval)

def on_update_interval2():
    addEnemyNv1()
game.on_update_interval(2000, on_update_interval2)

def on_update_interval3():
    global novoTiro
    for value in sprites.all_of_kind(SpriteKind.enemy):
        novoTiro = sprites.create(img("""
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
            """),
            SpriteKind.TiroInimigo)
        novoTiro.set_position(value.x, value.y)
        novoTiro.set_velocity(0, 50)
        novoTiro.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(2000, on_update_interval3)

def on_update_interval4():
    gasolina.value += -1
game.on_update_interval(100, on_update_interval4)

def on_update_interval5():
    municao.value += -4
game.on_update_interval(100, on_update_interval5)

def on_update_interval6():
    global random_loc_2, consumivelgas
    random_loc_2 = randint(0, scene.screen_width())
    consumivelgas = sprites.create(img("""
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
        """),
        SpriteKind.food)
    consumivelgas.set_position(random_loc_2, 0)
    consumivelgas.set_velocity(0, 45)
game.on_update_interval(3000, on_update_interval6)
