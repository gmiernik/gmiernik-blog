import { visit } from 'unist-util-visit';
import plantumlEncoder from 'plantuml-encoder';

export function remarkPlantUML() {
  return (tree: any) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'plantuml' || node.lang === 'puml') {
        const encoded = plantumlEncoder.encode(node.value);
        const imageUrl = `https://www.plantuml.com/plantuml/svg/${encoded}`;
        
        node.type = 'html';
        node.value = `<div class="plantuml-diagram flex justify-center my-6 overflow-x-auto p-4 bg-slate-900/60 rounded-xl border border-teal-500/20 shadow-lg">
          <img src="${imageUrl}" alt="PlantUML Diagram" loading="lazy" class="max-w-full h-auto drop-shadow-md" />
        </div>`;
      }
    });
  };
}
