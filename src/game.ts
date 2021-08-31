import { NPC, NPCDelay } from '@dcl/npc-scene-utils'
import resources from './resources'
import { AliceDialog, BobDialog, CharlieDialog } from './modules/dialogData'
//import ui
import utils from "node_modules/decentraland-ecs/dist/index"
//IMPORTS PICAZO PARA NPC
import { TagComponent, UpdateMovementComponentsSystem, Trigger, delay } from "./imports/index"
import { HUD_ABM } from "./hud"

//creacion nuevo HUD/canvas
var hud = new HUD_ABM()
const canvas = hud.canvas

// Base scene
const baseScene = new Entity()
baseScene.addComponent(resources.models.standard.baseScene)
baseScene.addComponent(new Transform())
engine.addEntity(baseScene)


/*
//hp bar
import * as ui from '../node_modules/@dcl/ui-scene-utils/dist/index'

export class ExpSystem {
  expBar: ui.UIBar;
  expTotal: number;
  expGained: number;


  constructor() {
    this.expBar = new ui.UIBar(0, -30, 130, Color4.Blue(), ui.BarStyles.ROUNDSILVER, 1)
    //cogemos la exp del usuario
    this.expTotal = 50;
    //cuando se completa la quest le damos 25 de experiencia
    this.expGained = 25;
    
    //this.acumulador = 0;
  }
  update() {
    if (alice.questCompleted === true){
      //calculo de la experiencia total resultante
      this.expTotal = this.expTotal + this.expGained;
      this.expBar = new ui.UIBar(this.expTotal, -30, 130, Color4.Blue(), ui.BarStyles.ROUNDSILVER, 1)
    } 
    else {
      this.expBar = new ui.UIBar(this.expTotal, -30, 130, Color4.Blue(), ui.BarStyles.ROUNDSILVER, 1)
    }
  }
}
*/

//NPC PICAZO OP

function loadNPC(){
  var padre: Entity
  const NPCIdel = new Entity()
  const NPCTalk = new Entity()
  const click = new Entity()
  for (const entityId in engine.getEntitiesWithComponent(TagComponent)){
    // Elemento de la lista
    let entity: Entity = (engine.getEntitiesWithComponent(TagComponent)[entityId] as Entity)
    if(entity.getComponent(TagComponent).tag == "Avatar"){
        padre = entity
    }
  } 
  NPCIdel.addComponent(new GLTFShape("assets/glb_assets/coinNPC_idle.glb"))
  NPCIdel.addComponent(new Transform())
  NPCIdel.setParent(padre)
  NPCTalk.addComponent(new GLTFShape("assets/glb_assets/coinNPC_talk.glb"))
  NPCTalk.addComponent(new Transform())
  NPCTalk.setParent(padre)
  NPCTalk.getComponent(GLTFShape).visible = false
  click.addComponent(new BoxShape())
  click.getComponent(BoxShape).visible = true
  click.getComponent(BoxShape).withCollisions = false
  click.addComponent(new Transform())
  click.getComponent(Transform).position = new Vector3(0,1,0)
  click.getComponent(Transform).scale = new Vector3(0.5,2,0.5)
  click.addComponent(new Material())
  click.getComponent(Material).albedoColor = new Color4(1,1,1,0)
  click.setParent(padre)
  let onClickEvent = null
  onClickEvent = new OnClick(()=>{
      if(NPCIdel.getComponent(GLTFShape).visible == true){
        onClickEvent.distance = 0
        NPCIdel.getComponent(GLTFShape).visible = false
        NPCTalk.getComponent(GLTFShape).visible = true
        hud.showWidgetIndex(0, true)
        hud.wgTalkRobot.callback = function() {
          NPCIdel.getComponent(GLTFShape).visible = true
          NPCTalk.getComponent(GLTFShape).visible = false
          onClickEvent.distance = 8
        }
      }
      // else{
      //   NPCIdel.getComponent(GLTFShape).visible = true
      //   NPCTalk.getComponent(GLTFShape).visible = false
      // }
    },
    {
      hoverText: "Hey"
    }
  )
  click.addComponent(onClickEvent)
}









/* NPC DECENTRALAND
// Alice
export const alice = new NPC(
  {
    position: new Vector3(8, 1.6, 5),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  resources.models.robots.alice,
  () => {
    // animations
    alice.playAnimation('Hello', true, 2)

    let dummyent = new Entity()
    dummyent.addComponent(
      new NPCDelay(2, () => {
        alice.playAnimation('Talk')
      })
    )
    engine.addEntity(dummyent)

    // sound
    alice.addComponentOrReplace(new AudioSource(resources.sounds.alice))
    alice.getComponent(AudioSource).playOnce()

    // dialog UI
    alice.talk(AliceDialog)
  },
  {
    faceUser: true,
    portrait: {
      path: 'images/portraits/alice.png',
      height: 256,
      width: 256,
      section: {
        sourceHeight: 512,
        sourceWidth: 512,
      },
    },
    onWalkAway: () => {
      alice.playAnimation('Goodbye', true, 2)
    },
  }
)
*/