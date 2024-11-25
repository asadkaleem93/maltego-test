import { Graphs } from "@/app/interface";

export const searchGraphsFromNodes = (originalData: Graphs[], searchFileText: string) => {
    const newGraphs: Graphs[] = [];
    for (let i = 0; i < originalData.length; i++) {
        for (let j = 0; j < originalData[i].data.nodes.length; j++) {
            const nodeLabel = originalData[i].data.nodes[j].label;
            if (
                nodeLabel
                    .toLocaleLowerCase()
                    .includes(searchFileText.toLocaleLowerCase())
            ) {
                newGraphs.push(originalData[i]);
                break;
            }
        }
    }
    return newGraphs
}