import { Widget, WidgetTalk, SkipMode, setWidgetNFT, getWidgetNFT, WidgetNFT } from "./imports/index"
import { textDialogs} from './jsonData/textsData'

//inicio de nuestra clase que extiende de WidgetTalk
class WidgetRobot extends WidgetTalk{
  show(bVisible: boolean){
    super.show(bVisible)
    if (!bVisible) {
      this.callback()
    }
  }
}

export function getHUD(){
    return hud
}

export class HUD_ABM {  //clase HUD personalizada
  canvas: UICanvas      //nuevo canvas
  widgets: Widget[]     //widgets
  wgTalkRobot: WidgetRobot //widgets talk
  constructor(){
    this.canvas = new UICanvas() 
    this.canvas.visible = true
    this.wgTalkRobot = new WidgetRobot(this.canvas, 1, true, SkipMode.Click)
    this.wgTalkRobot.faceImage.visible = false
    this.widgets = [this.wgTalkRobot]
    }

  //funcion para seleccionar el index del dialogo (control conversacion)
  setRobotDialogIndex(newIndex: number){
    this.wgTalkRobot.dialogIndex = newIndex
    this.wgTalkRobot.dialogData = textDialogs[newIndex]
    this.wgTalkRobot.textData = {
      dialogId: newIndex,
      textId: -1
    }
  }
  //funcion  que muestra el dialogo del index indicado y esconde el resto
  showWidgetIndex(index: number, hideOthers:boolean, showForTime: number=0){
    if (hideOthers) {
      this.hideAll()
    }
    if (this.widgets[index]) {
      if(showForTime>0){
        this.widgets[index].showForTime(true, showForTime)
      }
      else {this.widgets[index].show(true)}
    }
  }
  //esconde el dialogo indicado
  hideWidgetIndex(index: number){
    if (this.widgets[index] && this.widgets[index].container.visible) {
      this.widgets[index].show(false);
    }
  }
  //esconde todos los dialogos
  hideAll(){
    for (let i = 0; i < this.widgets.length; i++) {
      this.hideWidgetIndex(i)
    }
  }
}

var hud: HUD_ABM = new HUD_ABM()