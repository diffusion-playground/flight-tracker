import TopicsTreeBuilder from "./topics-tree";

export default class FlightTrackerTree {   
    constructor(treeDivSelector) {
        this.topicsRootEl = document.querySelector(treeDivSelector);        
        this.maxLevels = 11;
        this.treeFragment = new DocumentFragment();
        this.treeRootEl = this.createTreeFragmentRootNode();
        this.isGenerated = false
        this.subscribeCallback = null
        this.selectedNode = null
        this.nonCollapsiblePaths = ['opensky-network.org', 'REST']
    }

    createTreeFragmentRootNode = () => {
        const fragmentTreeRoot = document.createElement('div');
        fragmentTreeRoot.classList.add('topic-container', 'treeRootEl');
        this.treeFragment.appendChild(fragmentTreeRoot);
        return fragmentTreeRoot;
    }

    setSubscribeCallback = callback => {
        this.subscribeCallback = callback
        return this
    }

    showTreeFromData = results => {        
        this.processNodes(results.map(dryResult => {            
            return {
                path: dryResult.path(),
                pathItems: dryResult.path().split('/'),
                value: dryResult.value()? dryResult.value().get() : ''
            }            
        }))
        
        //Show the tree
        this.topicsRootEl.innerHTML = '';
        this.topicsRootEl.appendChild(this.treeFragment);

        this.isGenerated = true

        this.addTreeListeners();

        setTimeout(
            this.selectPath('/REST/opensky-network.org'),
            1000
        )

        return this
    }

    processNodes = nodes => {        
        for (const node of nodes) {
            this.processNode(null, node.pathItems)
        }        
        this.setLeafNodesIcon()
    }

    setLeafNodesIcon = () => {
        [...this.treeRootEl.querySelectorAll('[data-is-leaf="true"] > a > span')]
        .map(item => {
            item.classList.remove('expand')
            item.classList.add('plane')
        })
    }

    processNode = (parentNode, items, idx = 0, basePath = '', indent = 0.25) => {
        const isRoot = !parentNode ? true: false
        parentNode = parentNode || this.treeRootEl        
        if (!items[idx]) {
            return;
        }
        basePath = `${basePath}/${items[idx]}`
        let foundNode = this.findNodeByPath(basePath, parentNode)
        if (!foundNode) {         
            parentNode.dataset.isLeaf = false   
            foundNode = this.addNode(basePath, items[idx], parentNode, indent, isRoot)
        }        
        this.processNode(foundNode, items, idx + 1, basePath, indent + 0.25)
    }

    addNode = (nodePath, nodeName, parentNode, indent = 0.25, isRoot = true) => {
        const newFragmentNode = document.createElement('div');
        newFragmentNode.classList.add('topic-node', 'isTreeTopic', this.getNodeType(isRoot), 'd-block');
        const collapsableClass = (this.nonCollapsiblePaths.includes(nodeName)) ? 'not-collapsable' : 'collapsable'
        newFragmentNode.classList.add(collapsableClass)
        newFragmentNode.dataset.path = nodePath
        newFragmentNode.dataset.isLeaf = true
        newFragmentNode.style.marginLeft = `${indent}rem`
        const icon = '<span class="icon expand"></span>'
        newFragmentNode.innerHTML = `<a href="#" class="text-decoration-none">${icon} ${nodeName}</a>`
        parentNode.appendChild(newFragmentNode);
        return newFragmentNode;
    }

    getNodeType = (isRoot) => {
        return (isRoot ? 'root-node':'item-node')
    }

    isHidden = isRoot => isRoot ? 'd-block' : 'd-none'

    findNodeByPath = (path, parentNode) => {
        const node = [...parentNode.querySelectorAll('.isTreeTopic')].find(node => node.dataset.path === path)        
        return node;
    }

    addTreeListeners = (treeEl, callback) => {
        const callbackFn = callback || this.onTreeNodeClick;
        [...(treeEl || this.treeRootEl).querySelectorAll('.isTreeTopic > a')]
            .map(treeNode => treeNode.addEventListener('click', evt => callbackFn(evt)))
    }

    onTreeNodeClick = evt => {
        evt.preventDefault();
        evt.stopPropagation(); 
        this.markNodeSelected(evt.currentTarget)
        if (evt.currentTarget.parentNode.classList.contains('collapsable')) {
            this.toggleTreeNode(evt)
        }
        if (this.subscribeCallback) {
            this.subscribeCallback(evt.currentTarget.parentNode.dataset)
        }
    }

    markNodeSelected = node => {
        this.selectedNode?.classList.remove('selected')
        this.selectedNode = node
        this.selectedNode.classList.add('selected');
    }

    toggleTreeNode = evt => {
        const parent = evt.currentTarget.parentNode;
        [...parent.querySelectorAll(':scope > div.isTreeTopic')].map(childNode => this.toggleChildNode(childNode))        
        this.toggleTreeIcon(parent.querySelector(':scope span.icon'))
    }

    toggleChildNode = childNode => {
        if (childNode.classList.contains('d-none')) {
            childNode.classList.remove('d-none');
            childNode.classList.add('d-block');
        } else {
            childNode.classList.remove('d-block');
            childNode.classList.add('d-none');
        }
    }

    toggleTreeIcon = icon => {
        if (icon && !icon.classList.contains('plane')) {
            if (icon.classList.contains('expand')) {
                icon.classList.remove('expand')
                icon.classList.add('collapse');
            } else {
                icon.classList.remove('collapse')
                icon.classList.add('expand');
            }
        }
    }

    selectPath = path => {
        // tree-node is a div that contains an a
        const node = this.treeRootEl.querySelector(`div[data-path="${path}"] a`)        
        node.click()
    }
}