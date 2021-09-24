export default class TopicsTreeBuilder {
    constructor(treeDivSelector, baseTopic) {
        this.topicsRootEl = document.querySelector(treeDivSelector);
        this.baseTopic = baseTopic;
        this.maxLevels = 11;
        this.treeFragment = new DocumentFragment();
        this.treeRootEl = this.createTreeFragmentRootNode();
        this.isGenerated = false;
    }

    createTreeFragmentRootNode = () => {
        const fragmentTreeRoot = document.createElement('div');
        fragmentTreeRoot.classList.add('topic-container', 'treeRootEl');
        this.treeFragment.appendChild(fragmentTreeRoot);
        return fragmentTreeRoot;
    }

    buildTreeFragment = (results, isPartial = false) => {
        if (isPartial) {
            this.addLevelToFragmentTree(results, 0, null, this.baseTopic);
            return;
        }
        results.forEach(topicResult => {
            try {
                this.addLevelToFragmentTree(topicResult.value().get(), 0, null, this.baseTopic);
            } catch (e) {
                console.log('Error building tree', e);
            }
        });        
    }

    getStartingNode = (results, nodeNameToFind, nodeId) => {
        this.findNode(results, nodeNameToFind, nodeId);
    }

    findNode = (node, nodeNameToFind, nodeId) => {
        if (Array.isArray(node)) {
            node.forEach((topicResult, idx) => {
                //console.log('isArray; ', topicResult, nodeNameToFind, idx);
                if (topicResult.name === nodeNameToFind) {
                    console.log('FOUND!!', topicResult);
                    return topicResult;
                }
                this.findNode(topicResult, nodeNameToFind, nodeId);                
            });
            return;
        }
        
        if (typeof node === 'object') {            
            for (const [key, value] of Object.entries(node)) {
                //console.log('isObject', value, nodeNameToFind, key);
                if (value.name === nodeNameToFind) {
                    console.log('FOUND!!', value);
                    return value;                    
                }
                this.findNode(value, nodeNameToFind, nodeId);
            }
        }
    }

    updateTreeData = (results, forceUpdate = false) => {
        if (results.length > 0 && (!this.isGenerated || forceUpdate) && this.topicsRootEl) {
            this.buildTreeFragment(results);

            console.log('Tree GENERATED - Ready to SHOW')

            this.isGenerated = true;

            //Show the tree
            this.topicsRootEl.innerHTML = '';
            this.topicsRootEl.appendChild(this.treeFragment);

            this.addTreeListeners();

            //App.observerSvc.dispatch(Observer.EVENT_ON_TREE_GENERATED, {});
        }
    }

    addLevelToFragmentTree = (levelObject, currentLevel = 0, parentNode = null, currentPath = '') => {
        currentLevel++;
        let realParentNode = parentNode || this.treeRootEl;
        const isRoot = parentNode === null;

        if (Array.isArray(levelObject)) {
            levelObject.forEach((topicResult, idx) => {
                let newPath = `${currentPath}/${idx}`;
                let newNode = this.addNewFragmentNode(idx, topicResult, isRoot, realParentNode, currentLevel, newPath);
                if (currentLevel <= this.maxLevels) {
                    this.addLevelToFragmentTree(topicResult, currentLevel, newNode, newPath);
                }
            });
            return;
        }

        if (typeof levelObject === 'object' && levelObject !== null) {            
            for (const [key, value = ''] of Object.entries(levelObject)) {
                let newPath = `${currentPath}/${key}`;
                let newNode = this.addNewFragmentNode(key, value, isRoot, realParentNode, currentLevel, newPath);
                if (currentLevel <= this.maxLevels) {
                    this.addLevelToFragmentTree(value, currentLevel, newNode, newPath);
                }
            }
        }
    }

    addNewFragmentNode = (textValue, childValue, isRoot, realParentNode, currentLevel, currentPath, autoExpand = false) => {
        const newFragmentNode = document.createElement('div');
        newFragmentNode.classList.add('topic-node');
        const showValue = (!Array.isArray(childValue)) && (typeof childValue !== 'object');
        const icon = !showValue && currentLevel <= this.maxLevels ? autoExpand ? `<i class="bi bi-node-minus"></i>` : `<i class="bi bi-node-plus"></i>` : '';
        newFragmentNode.innerHTML = `
            <a href="#" class="text-decoration-none isTreeTopic" data-path="${currentPath}">${icon} ${textValue}${showValue? `: <b class="text-info">${childValue}</b>`:''}</a>
        `;

        let newNodeNodes = null;
        if (!showValue) {
            newNodeNodes = document.createElement('div');
            newNodeNodes.classList.add('topic-container');
            if (!autoExpand) {
                newNodeNodes.classList.add('d-none');
            }
            newFragmentNode.appendChild(newNodeNodes);
        }

        realParentNode.appendChild(newFragmentNode);
        return newNodeNodes || newFragmentNode;
    }

    addTreeListeners = (treeEl, callback) => {
        const callbackFn = callback || this.onTreeNodeClick;
        const parentTreeEl = treeEl || this.treeRootEl;
        const treeNodes = parentTreeEl.querySelectorAll('.isTreeTopic');
        for(const treeNode of treeNodes) {
            treeNode.addEventListener('click', evt => callbackFn(evt));
        }
    }

    onTreeNodeClick = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        this.toggleTreeNode(evt);
        //App.observerSvc.dispatch(Observer.EVENT_ON_TOPIC_CLICKED, evt.currentTarget);
    }

    toggleTreeNode = evt => {
        const parent = evt.currentTarget.parentNode;
        let childNode = parent.querySelector(':scope > div.list-group');
        if (childNode) {
            if (childNode.classList.contains('d-none')) {
                childNode.classList.remove('d-none');
                childNode.classList.add('d-block');
            } else {
                childNode.classList.remove('d-block');
                childNode.classList.add('d-none');
            }
        }
        let icon = parent.querySelector(':scope a > i');
        if (icon) {
            if (icon.classList.contains('bi-node-plus')) {
                icon.classList.remove('bi-node-plus')
                icon.classList.add('bi-node-minus');
            } else {
                icon.classList.remove('bi-node-minus')
                icon.classList.add('bi-node-plus');
            }
        }
    }
    
    showTreeInElementFromPath = (titleDiv, bodyDiv, path) => {
        titleDiv.innerHTML = `<small>${path.join('/')}</small>`;
        bodyDiv.innerHTML = '';
        let treeFragment = new DocumentFragment();
        const fragmentTreeRoot = document.createElement('div');
        fragmentTreeRoot.classList.add('list-group', 'list-group-flush');
        treeFragment.appendChild(fragmentTreeRoot);        
        console.log(path);                
        
        this.addPathToTree(path, fragmentTreeRoot)

        bodyDiv.appendChild(treeFragment);
        this.addTreeListeners(bodyDiv, evt => {            
                evt.preventDefault();
                evt.stopPropagation();
                this.toggleTreeNode(evt);
        });
    }

    addPathToTree = (path, fragmentTreeRoot) => {
        let parent = null;
        let isRoot = true;
        let newPath = '';
        let currentLevel = 1;
        for (const item of path) {
            if (item.length === 0) continue;                        
            newPath = `${newPath}/${item}`;
            let foundNode = this.findNode(parent || this.treeRootEl, newPath)
            if (!foundNode) {
                parent = this.addNewFragmentNode(item, [], isRoot, parent || fragmentTreeRoot, currentLevel, newPath, true);
            } else {
                parent = foundNode
            }
            console.log('PARENT: ', parent)
            isRoot = false;            
            currentLevel++;
        }
        return {parent, isRoot, newPath}
    }

    showTreeFromResults = (results, callback, bodyDiv = null, data = null) => {
        this.treeFragment = new DocumentFragment();
        this.treeRootEl = this.createTreeFragmentRootNode();
        bodyDiv = bodyDiv || this.topicsRootEl
        bodyDiv.innerHTML = '';
        this.buildTreeFragment(results, true);
        console.log('Tree FROM RESULTS GENERATED')
        //Show the tree
        bodyDiv.appendChild(this.treeFragment);
        this.addTreeListeners(this.topicsRootEl, evt => {
            evt.preventDefault();
            evt.stopPropagation();
            this.toggleTreeNode(evt);
            callback(evt, results, data);
        });
    }

    highlightPath = expectedPath => {
        const firstExpectedPathSegments = expectedPath.split(',')[0].split('/');
        let path = '';
        firstExpectedPathSegments.map(segment => {
            if (segment === '') {
                return;
            }
            path = `${path}/${segment}`
            let node = this.treeRootEl.querySelector(`.isTreeTopic[data-path="${path}"]`);
            console.log('NodeFound:', node);
            node.classList.add('text-success', 'highlighted');
        });
    }

    cloneFromOtherTree = otherTreeSelector => {        
        const otherTree = document.querySelector(otherTreeSelector)
        this.topicsRootEl.appendChild(otherTree.cloneNode(true));
        this.treeRootEl = this.topicsRootEl.querySelector('.treeRootEl');
    }
}