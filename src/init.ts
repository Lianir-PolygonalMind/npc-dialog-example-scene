//IMPORTS PICAZO PARA NPC
import { TagComponent, UpdateMovementComponentsSystem, Trigger, delay } from "./imports/index"
import { HUD_ABM } from "./hud"

//creacion nuevo HUD/canvas
var hud = new HUD_ABM()
const canvas = hud.canvas


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
//Iniciamos la funcion loadNPC creando una entidad padre,
//constantes para los glbs de las animaciones
//for e if para recorrer el game buscando el tag del NPC "Avatar" y lo declaramos 
//la entidad padre para nuestro NPC
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
  //Cambiamos su gltf por la animación idle, correspondiente, y le asignamos la posicion del padre
  //Repetimos la operacion para el talk, además talk la hacemos invisible
  NPCIdel.addComponent(new GLTFShape("assets/glb_assets/coinNPC_idle.glb"))
  NPCIdel.addComponent(new Transform())
  NPCIdel.setParent(padre)
  NPCTalk.addComponent(new GLTFShape("assets/glb_assets/coinNPC_talk.glb"))
  NPCTalk.addComponent(new Transform())
  NPCTalk.setParent(padre)
  NPCTalk.getComponent(GLTFShape).visible = false
  //construimos la entidad click para trampearla y deshabilitarla para que interactue con el npc
  click.addComponent(new BoxShape())
  click.getComponent(BoxShape).visible = true
  click.getComponent(BoxShape).withCollisions = false
  click.addComponent(new Transform())
  click.getComponent(Transform).position = new Vector3(0,1,0)
  click.getComponent(Transform).scale = new Vector3(0.5,2,0.5)
  click.addComponent(new Material())
  click.getComponent(Material).albedoColor = new Color4(1,1,1,0)
  click.setParent(padre)
  //creamos la variable onClickEvent para crear el evento de hablar con el NPC
  //si Idel visible, deshabilitamos el onclickEvent, hacemos invisible Idel y hacemos visible Talk
  let onClickEvent = null
  onClickEvent = new OnClick(()=>{
      if(NPCIdel.getComponent(GLTFShape).visible == true){
        onClickEvent.distance = 0
        NPCIdel.getComponent(GLTFShape).visible = false
        NPCTalk.getComponent(GLTFShape).visible = true
        //llamamos al hud, para mostrar el texto en el index X
        //al terminar de hablar hacemos visible la animacion de Idle y Escondemos Talk
        //reactivamos el evento onClick del NPC
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
//load Functions
export const loadInit = function(){
    loadNPC()
  }
loadInit()
