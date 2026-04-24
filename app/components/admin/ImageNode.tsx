import type { JSX } from "react";
import {
  DecoratorNode,
  createCommand,
  type DOMConversionMap,
  type DOMExportOutput,
  type LexicalCommand,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from "lexical";

type SerializedImageNode = Spread<
  { src: string; alt: string; type: "image"; version: 1 },
  SerializedLexicalNode
>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<{ src: string; alt: string }> =
  createCommand("INSERT_IMAGE_COMMAND");

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __alt: string;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__alt, node.__key);
  }

  static importJSON(s: SerializedImageNode): ImageNode {
    return new ImageNode(s.src, s.alt);
  }

  constructor(src: string, alt = "", key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__alt = alt;
  }

  exportJSON(): SerializedImageNode {
    return { ...super.exportJSON(), type: "image", version: 1, src: this.__src, alt: this.__alt };
  }

  isInline(): boolean {
    return false;
  }

  createDOM(): HTMLElement {
    return document.createElement("span");
  }

  updateDOM(): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap {
    return {
      img: () => ({
        conversion: (element: HTMLElement) => ({
          node: new ImageNode(
            element.getAttribute("src") ?? "",
            element.getAttribute("alt") ?? "",
          ),
        }),
        priority: 0 as const,
      }),
    };
  }

  exportDOM(): DOMExportOutput {
    const img = document.createElement("img");
    img.setAttribute("src", this.__src);
    if (this.__alt) img.setAttribute("alt", this.__alt);
    return { element: img };
  }

  decorate(): JSX.Element {
    return <img src={this.__src} alt={this.__alt} className="max-w-full rounded" />;
  }
}
