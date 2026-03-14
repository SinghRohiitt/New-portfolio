
declare module "gsap-trial/ScrollSmoother";
declare module "gsap-trial/SplitText" {
  export class SplitText {
    constructor(target: Element | string, vars?: any);

    lines: HTMLElement[];
    words: HTMLElement[];
    chars: HTMLElement[];

    revert(): void;
  }
}