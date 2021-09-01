import { TagComponent } from "./imports/index"


var entity19028 = new Entity("COG")
engine.addEntity(entity19028)
entity19028.addComponent(new Transform({ position: new Vector3(16, 0, 16) }))
entity19028.getComponent(Transform).rotation.set(0, 1, 0, 0)
entity19028.getComponent(Transform).scale.set(1, 1, 1)

var entity17744 = new Entity("Avatar")
entity17744.addComponent(new TagComponent())
entity17744.getComponent(TagComponent).tag = "Avatar" 
entity17744.setParent(entity19028)
entity17744.addComponent(new Transform({ position: new Vector3(3.024, 2.4598, -11.316) }))
entity17744.getComponent(Transform).rotation.set(0, -0.2588186, 0, 0.965926)
entity17744.getComponent(Transform).scale.set(1.25, 1.25, 1.25)




