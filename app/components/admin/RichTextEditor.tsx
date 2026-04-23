import { useEditor, EditorContent } from "@tiptap/react";
import { TextSelection } from "@tiptap/pm/state";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
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

const lowlight = createLowlight(common);

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

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  title,
  children,
}: ToolbarButtonProps) {
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

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link.configure({ openOnClick: false }),
      Image,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    editorProps: {
      handleKeyDown(view, event) {
        // Mod-Enter inside a code block → insert paragraph below
        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
          const { state } = view;
          const { $from } = state.selection;
          for (let d = $from.depth; d >= 0; d--) {
            if ($from.node(d)?.type.name === "codeBlock") {
              const insertPos = $from.after(d);
              const tr = state.tr
                .insert(insertPos, state.schema.nodes.paragraph.create())
                .setSelection(TextSelection.create(
                  state.tr.insert(insertPos, state.schema.nodes.paragraph.create()).doc,
                  insertPos + 1,
                ));
              view.dispatch(tr);
              return true;
            }
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Image URL");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  // Converts only the current paragraph to a code block, ignoring any
  // multi-block selection that might accidentally include empty lines.
  const toggleCurrentBlockAsCodeBlock = () => {
    if (editor.isActive("codeBlock")) {
      editor.chain().focus().toggleCodeBlock().run();
      return;
    }
    const { $from } = editor.state.selection;
    editor
      .chain()
      .focus()
      .setTextSelection({ from: $from.start($from.depth - 1), to: $from.end($from.depth - 1) })
      .toggleCodeBlock()
      .run();
  };

  // Inserts a paragraph immediately after the current code block.
  const addParagraphAfterCodeBlock = () => {
    editor.chain().focus().command(({ state, tr, dispatch }) => {
      const { $from } = state.selection;
      for (let d = $from.depth; d >= 0; d--) {
        if ($from.node(d)?.type.name === "codeBlock") {
          const insertPos = $from.after(d);
          if (dispatch) {
            tr.insert(insertPos, state.schema.nodes.paragraph.create());
            tr.setSelection(TextSelection.create(tr.doc, insertPos + 1));
          }
          return true;
        }
      }
      return false;
    }).run();
  };

  const isInCodeBlock = editor.isActive("codeBlock");
  const currentLanguage = editor.getAttributes("codeBlock").language ?? "";

  return (
    <div className="rounded-md border">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b p-1">
        <ToolbarButton
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Inline code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
        >
          <Code className="size-4" />
        </ToolbarButton>

        <div className="mx-1 w-px self-stretch bg-border" />

        <ToolbarButton
          title="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 className="size-4" />
        </ToolbarButton>

        <div className="mx-1 w-px self-stretch bg-border" />

        <ToolbarButton
          title="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Ordered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="size-4" />
        </ToolbarButton>

        <div className="mx-1 w-px self-stretch bg-border" />

        <ToolbarButton
          title="Code block"
          onClick={toggleCurrentBlockAsCodeBlock}
          isActive={isInCodeBlock}
        >
          <Code2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="size-4" />
        </ToolbarButton>

        <div className="mx-1 w-px self-stretch bg-border" />

        <ToolbarButton
          title="Link"
          onClick={addLink}
          isActive={editor.isActive("link")}
        >
          <LinkIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Image" onClick={addImage}>
          <ImageIcon className="size-4" />
        </ToolbarButton>

        {/* Code block controls — only visible when cursor is inside a code block */}
        {isInCodeBlock && (
          <>
            <div className="mx-1 w-px self-stretch bg-border" />
            <select
              value={currentLanguage}
              onChange={(e) =>
                editor
                  .chain()
                  .focus()
                  .updateAttributes("codeBlock", { language: e.target.value })
                  .run()
              }
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
              onClick={addParagraphAfterCodeBlock}
            >
              <WrapText className="size-4" />
            </ToolbarButton>
          </>
        )}
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="min-h-64 px-4 py-3 text-sm [&_.ProseMirror]:outline-none [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h2]:mt-6 [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_p]:mb-1.5 [&_.ProseMirror_ul]:mb-2 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:mb-2 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:text-xs [&_.ProseMirror_pre]:mb-2 [&_.ProseMirror_pre]:rounded-lg [&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_blockquote]:border-l-2 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:text-muted-foreground [&_.ProseMirror_a]:text-sky-400 [&_.ProseMirror_a]:underline [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded"
      />
    </div>
  );
}
