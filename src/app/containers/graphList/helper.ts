import { Graph } from "@/app/interface";

export const searchGraphsFromNodes = (originalData: Graph[], searchFileText: string) => {
    const newGraphs: Graph[] = [];
    for (let i = 0; i < originalData.length; i++) {
        for (let j = 0; j < originalData[i].data.nodes.length; j++) {
            const nodeLabel = originalData[i].data.nodes[j].label;
            if (
                nodeLabel
                    .toLocaleLowerCase()
                    .includes(searchFileText.trim().toLocaleLowerCase())
            ) {
                // THE REASON I BREAK THE INNER LOOP HERE IS BECAUSE LETS SUPPOSE WE FIND NODE AT FIRST INDEX
                // THEN WE HAVE TO SHOW THAT GRAPH, IT DOES NOT MATTER IF THIS NODE IS FOUND AGAIN IN THE NODES
                newGraphs.push(originalData[i]);
                break;
            }
        }
    }
    return newGraphs
}