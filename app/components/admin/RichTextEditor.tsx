import { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_LOW,
  KEY_ENTER_COMMAND,
} from "lexical";
import { $isCodeNode } from "@lexical/code";
import { ImageNode, INSERT_IMAGE_COMMAND } from "~/components/admin/ImageNode";
import { RichTextToolbar } from "~/components/admin/RichTextToolbar";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const EDITOR_NODES = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  CodeNode,
  LinkNode,
  HorizontalRuleNode,
  ImageNode,
];

const EDITOR_THEME = {
  paragraph: "mb-1.5",
  heading: {
    h2: "mb-2 mt-6 text-xl font-bold",
    h3: "mb-2 mt-4 text-lg font-semibold",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    strikethrough: "line-through",
    code: "rounded bg-muted px-1 font-mono text-xs",
    underline: "underline",
  },
  list: {
    ul: "mb-2 list-disc pl-5",
    ol: "mb-2 list-decimal pl-5",
    listitem: "mb-0.5",
  },
  link: "cursor-pointer text-sky-400 underline",
  code: "mb-2 block rounded-lg bg-muted p-3 font-mono text-xs whitespace-pre-wrap",
  quote: "mb-2 border-l-2 pl-4 text-muted-foreground",
  horizontalRule: "my-4 border-t",
};

function HtmlInitPlugin({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!html) return;
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      const root = $getRoot();
      root.clear();
      for (const node of nodes) {
        root.append(node);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function OnChangeExportPlugin({ onChange }: { onChange: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        onChange($generateHtmlFromNodes(editor));
      });
    });
  }, [editor, onChange]);

  return null;
}

function ImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      ({ src, alt }) => {
        $insertNodes([new ImageNode(src, alt)]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}

function CodeBlockKeyPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event: KeyboardEvent | null) => {
        if (!event?.metaKey && !event?.ctrlKey) return false;
        let isInCodeBlock = false;
        editor.getEditorState().read(() => {
          const sel = $getSelection();
          if (!$isRangeSelection(sel)) return;
          const node = sel.anchor.getNode().getTopLevelElement();
          isInCodeBlock = node ? $isCodeNode(node) : false;
        });
        if (!isInCodeBlock) return false;
        editor.update(() => {
          const sel = $getSelection();
          if (!$isRangeSelection(sel)) return;
          const node = sel.anchor.getNode().getTopLevelElement();
          if (node && $isCodeNode(node)) {
            const paragraph = $createParagraphNode();
            node.insertAfter(paragraph);
            paragraph.select();
          }
        });
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <LexicalComposer
      initialConfig={{
        namespace: "RichTextEditor",
        nodes: EDITOR_NODES,
        onError: console.error,
        theme: EDITOR_THEME,
      }}
    >
      <div className="rounded-md border">
        <div className="border-b">
          <RichTextToolbar />
        </div>
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-64 px-4 py-3 text-sm outline-none" />
            }
            placeholder={
              <div className="pointer-events-none absolute top-0 px-4 py-3 text-sm text-muted-foreground">
                Start writing...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <HorizontalRulePlugin />
        <ImagePlugin />
        <CodeBlockKeyPlugin />
        <HtmlInitPlugin html={content} />
        <OnChangeExportPlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  );
}
