import { loader } from "@monaco-editor/react";

let setup: Promise<void> | null = null;

export function setupMonaco(): Promise<void> {
    if (setup === null) {
        setup = (async () => {
            const [monaco, { default: EditorWorker }] = await Promise.all([
                import("monaco-editor"),
                import("monaco-editor/editor/editor.worker.js?worker"),
            ]);
            self.MonacoEnvironment = { getWorker: () => new EditorWorker() };
            loader.config({ monaco });
        })();
    }
    return setup;
}
