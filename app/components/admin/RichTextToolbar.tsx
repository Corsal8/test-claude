import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import { $createCodeNode, $isCodeNode } from "@lexical/code";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import {
  Bold,
  Code,
  Code2,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Strikethrough,
  WrapText,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils/cn";
import { INSERT_IMAGE_COMMAND } from "~/components/admin/ImageNode";

const LANGUAGES = [
  { value: "", label: "auto" },
  { value: "bash", label: "bash" },
  { value: "css", label: "css" },
  { value: "dockerfile", label: "dockerfile" },
  { value: "go", label: "go" },
  { value: "html", label: "html" },
  { value: "java", label: "java" },
  { value: "javascript", label: "javascript" },
  { value: "json", label: "json" },
  { value: "markdown", label: "markdown" },
  { value: "python", label: "python" },
  { value: "rust", label: "rust" },
  { value: "sql", label: "sql" },
  { value: "typescript", label: "typescript" },
  { value: "yaml", label: "yaml" },
];

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, isActive, disabled, title, children }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(isActive && "bg-accent text-accent-foreground")}
    >
      {children}
    </Button>
  );
}

interface FormatState {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  code: boolean;
  isH2: boolean;
  isH3: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isCodeBlock: boolean;
  codeLanguage: string;
  isLink: boolean;
}

const DEFAULT_FORMAT: FormatState = {
  bold: false,
  italic: false,
  strikethrough: false,
  code: false,
  isH2: false,
  isH3: false,
  isBulletList: false,
  isOrderedList: false,
  isCodeBlock: false,
  codeLanguage: "",
  isLink: false,
};

export function RichTextToolbar() {
  const [editor] = useLexicalComposerContext();
  const [fmt, setFmt] = useState<FormatState>(DEFAULT_FORMAT);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          setFmt(DEFAULT_FORMAT);
          return;
        }

        const anchorNode = selection.anchor.getNode();
        const topLevel = anchorNode.getTopLevelElement();

        let isH2 = false,
          isH3 = false,
          isBulletList = false,
          isOrderedList = false,
          isCodeBlock = false,
          codeLanguage = "";

        if (topLevel) {
          if ($isHeadingNode(topLevel)) {
            const tag = topLevel.getTag();
            isH2 = tag === "h2";
            isH3 = tag === "h3";
          } else if ($isCodeNode(topLevel)) {
            isCodeBlock = true;
            codeLanguage = topLevel.getLanguage() ?? "";
          } else if ($isListNode(topLevel)) {
            isBulletList = topLevel.getListType() === "bullet";
            isOrderedList = topLevel.getListType() === "number";
          }
        }

        setFmt({
          bold: selection.hasFormat("bold"),
          italic: selection.hasFormat("italic"),
          strikethrough: selection.hasFormat("strikethrough"),
          code: selection.hasFormat("code"),
          isH2,
          isH3,
          isBulletList,
          isOrderedList,
          isCodeBlock,
          codeLanguage,
          isLink: false, // simplified; link detection omitted
        });
      });
    });
  }, [editor]);

  const toggleHeading = useCallback(
    (level: "h2" | "h3") => {
      const isActive = level === "h2" ? fmt.isH2 : fmt.isH3;
      editor.update(() => {
        const sel = $getSelection();
        if (!$isRangeSelection(sel)) return;
        $setBlocksType(sel, () => (isActive ? $createParagraphNode() : $createHeadingNode(level)));
      });
    },
    [editor, fmt.isH2, fmt.isH3],
  );

  const toggleCodeBlock = useCallback(() => {
    editor.update(() => {
      const sel = $getSelection();
      if (!$isRangeSelection(sel)) return;
      $setBlocksType(sel, () => (fmt.isCodeBlock ? $createParagraphNode() : $createCodeNode()));
    });
  }, [editor, fmt.isCodeBlock]);

  const toggleList = useCallback(
    (type: "bullet" | "number") => {
      if ((type === "bullet" && fmt.isBulletList) || (type === "number" && fmt.isOrderedList)) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(
          type === "bullet" ? INSERT_UNORDERED_LIST_COMMAND : INSERT_ORDERED_LIST_COMMAND,
          undefined,
        );
      }
    },
    [editor, fmt.isBulletList, fmt.isOrderedList],
  );

  const addLink = useCallback(() => {
    const url = window.prompt("URL");
    if (!url) return;
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url });
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("Image URL");
    if (!url) return;
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src: url, alt: "" });
  }, [editor]);

  const insertParagraphAfterCodeBlock = useCallback(() => {
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
  }, [editor]);

  const changeCodeLanguage = useCallback(
    (language: string) => {
      editor.update(() => {
        const sel = $getSelection();
        if (!$isRangeSelection(sel)) return;
        const node = sel.anchor.getNode().getTopLevelElement();
        if (node && $isCodeNode(node)) {
          node.setLanguage(language);
        }
      });
    },
    [editor],
  );

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-1">
      <ToolbarButton
        title="Bold"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        isActive={fmt.bold}
      >
        <Bold className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        isActive={fmt.italic}
      >
        <Italic className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Strikethrough"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
        isActive={fmt.strikethrough}
      >
        <Strikethrough className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Inline code"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        isActive={fmt.code}
      >
        <Code className="size-4" />
      </ToolbarButton>

      <div className="mx-1 w-px self-stretch bg-border" />

      <ToolbarButton title="Heading 2" onClick={() => toggleHeading("h2")} isActive={fmt.isH2}>
        <Heading2 className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Heading 3" onClick={() => toggleHeading("h3")} isActive={fmt.isH3}>
        <Heading3 className="size-4" />
      </ToolbarButton>

      <div className="mx-1 w-px self-stretch bg-border" />

      <ToolbarButton
        title="Bullet list"
        onClick={() => toggleList("bullet")}
        isActive={fmt.isBulletList}
      >
        <List className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Ordered list"
        onClick={() => toggleList("number")}
        isActive={fmt.isOrderedList}
      >
        <ListOrdered className="size-4" />
      </ToolbarButton>

      <div className="mx-1 w-px self-stretch bg-border" />

      <ToolbarButton title="Code block" onClick={toggleCodeBlock} isActive={fmt.isCodeBlock}>
        <Code2 className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Horizontal rule"
        onClick={() => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)}
      >
        <Minus className="size-4" />
      </ToolbarButton>

      <div className="mx-1 w-px self-stretch bg-border" />

      <ToolbarButton title="Link" onClick={addLink} isActive={fmt.isLink}>
        <LinkIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Image" onClick={addImage}>
        <ImageIcon className="size-4" />
      </ToolbarButton>

      {fmt.isCodeBlock && (
        <>
          <div className="mx-1 w-px self-stretch bg-border" />
          <select
            value={fmt.codeLanguage}
            onChange={(e) => changeCodeLanguage(e.target.value)}
            className="h-6 rounded border bg-background px-1.5 text-xs text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
            title="Code block language"
          >
            {LANGUAGES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ToolbarButton
            title="Insert paragraph below (Mod+Enter)"
            onClick={insertParagraphAfterCodeBlock}
          >
            <WrapText className="size-4" />
          </ToolbarButton>
        </>
      )}
    </div>
  );
}
