import { Application, Sprite, Text } from "pixi.js";
import { gsap } from "gsap";
export class Game extends Application {
  private spin: boolean;
  private sliceAngle = 360 / 12;
  constructor(opts: any) {
    super(opts);
    this.preload(
      [
        { name: "wheel", url: "assets/wheel2.png" },
        { name: "ptr", url: "assets/ptr1.png" },
      ],
      this.onLoad.bind(this)
    );
  }
  preload(list: any[], cb: () => {}): void {
    this.loader.add(list);
    this.loader.load(cb);
  }
  winnerpage(luck: number): void {
    let arr = [12,11,10,9,8,7,6,5,4,3,2,1];
    let text = new Text(
      "Yayyy... You have won : " +
        arr[luck] +
        "$ from this lucky spin wheel\n"
    );
    text.x = innerWidth / 2;
    text.y = innerHeight / 2;
    text.anchor.set(0.5);
    this.stage.addChild(text);
    setTimeout(() => {
      text.visible = false;
      this.onLoad();
    }, 3000);
  }

  onLoad(): void {
    const wheel = new Sprite(this.loader.resources["wheel"].texture);
    wheel.scale.set(0.7);
    wheel.anchor.set(0.5);
    wheel.x = this.screen.width / 2;
    wheel.y = this.screen.height / 2;
    this.stage.addChild(wheel);
    wheel.interactive = true;
    wheel.buttonMode = true;
    console.log(this.stage);

    const ptr = new Sprite(this.loader.resources["ptr"].texture);
    ptr.scale.set(0.13);
    ptr.anchor.set(0.5);
    ptr.x = this.screen.width / 2;
    ptr.y = this.screen.height / 2 - 175;
    this.stage.addChild(ptr);

    wheel.on("pointerup", () => {
      let random = Math.floor(Math.random() * 12);
      let stopAngle = random * this.sliceAngle;
      gsap.fromTo(
        wheel,
        { angle: 0 },
        { angle: 3600 + stopAngle, duration: 6, ease: "expo.out" }
      );
      setTimeout(() => {}, 6000);

      setTimeout(() => {
        wheel.visible = false;
        ptr.visible = false;

        this.winnerpage(random);
      }, 8000);
    });
  }
}