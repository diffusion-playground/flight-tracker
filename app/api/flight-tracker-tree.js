import TopicsTreeBuilder from "./topics-tree";

export default class FlightTrackerTree extends TopicsTreeBuilder {
    constructor(treeDivSelector, baseTopic) {        
        super(treeDivSelector, baseTopic)
        this.dataTree = null;
    }

    showTreeFromData = (results, bodyDiv) => {        
        bodyDiv = bodyDiv || this.topicsRootEl
        bodyDiv.innerHTML = '';
        let treeFragment = new DocumentFragment();
        const fragmentTreeRoot = document.createElement('div');
        fragmentTreeRoot.classList.add('list-group', 'list-group-flush');
        treeFragment.appendChild(fragmentTreeRoot);                        

        for (const result of results) {
            this.addPathToTree(result.path().split('/'), fragmentTreeRoot)
        }

        bodyDiv.appendChild(treeFragment);
        this.addTreeListeners(bodyDiv, evt => {            
                evt.preventDefault();
                evt.stopPropagation();
                this.toggleTreeNode(evt);
        });
    }

    

}