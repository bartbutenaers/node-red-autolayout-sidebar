# node-red-autolayout-sidebar
A sidebar plugin for Node-RED to offer auto-layouting, i.e. rearrange the selected nodes in a flow (based om specified layout parameters).

All credits for the layout logic go to [Gerrit Riessen](https://github.com/gorenje)!  This sidebar plugin is based on his [node-red-contrib-auto-alignment](https://github.com/gorenje/node-red-contrib-auto-alignment) node, and some code snippets are copied shameless :-)
Since I am more a fan of sidebars (instead of plugins) for this kind of flow editor features, I developed this sidebar as an addition to Gerrit's node-red-contrib-auto-alignment node.

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install @bartbutenaers/node-red-autolayout-sidebar
```
Caution: NodeJs version ***17.0.0*** is minimal required by the DagreJs graph library!

## Experimental
This sidebar plugin is experimental, which means some breaking changes might be introduced in the near future!

The reason is that there are a number of uncertainties at this moment:
+ Which algorithm fits best for Node-RED flows?
+ Is one of these algorithms capable to handle all the use cases?
+ And so on...

For more details on why there isn't a one-size-fits-all solution, check out discussions [here](https://discourse.nodered.org/t/noisecraft-anyone-heard-of-it/79813/32) and [here](https://discourse.nodered.org/t/node-red-auto-layouting-using-elkjs-dagre/81052) on discourse.

## Issues
If you have an issue or question about the algorithms (i.e. how the nodes are layouted), it might be better to start a new discussion on the Node-RED [forum](https://discourse.nodered.org/).  That way others in the community can think loud, and join the discussion.  Please mention Gerrit (@gregorius) and me (@bartbutenaers) in that discussion, to make sure we get a notification about it.

## Node usage
The following demo shows how to auto layout the selected nodes in a flow.

![auto_layout_demo](https://github.com/bartbutenaers/node-red-autolayout-sidebar/assets/14224149/10c5f04d-e0bb-4a55-ad24-571b2aba9646)

The steps described in detail:

1. Open the *"Auto Layout"* sidebar:

2. Select a node in the flow (from where on the successive nodes need to be auto layouted).

3. Optionally select another layouting algorithm in the sidebar.

4. Optionally change the layout parameters of the selected algorithm, via the json typedinput field.

5. Press the green *"Execute auto layout"* button in the sidebar.

## Node Undo

Because the undo does not work in the sidebar, an undo button has been added:

![img](https://cdn.openmindmap.org/content/1699442004757_auto-layout-undo.gif)

The Undo button works just as normal undo and multiple click will cause other things to be undone aswell: the undo button is **not** specific to the layout, it **will** undo other actions.

## Node properties

### Algorithm
The following layouting algorithms are currently supported:
+ ***Dagre LR***: arrange the nodes from left to right (via the Dagre library).
+ ***Dagre Longest Path***: arrange the nodes based on the longest path via the Dijkstra's algorithm (via the Dagre librar).
+ ***ELKjs Mr. Tree***: arrange the nodes in a flow via a parent-children tree hierarchy.
+ ***ELKjs Layered Upwards***: arrange the nodes in a flow by arranging as many edges as possible in subsequent layers upwards (via the ELKjs library).
+ ***ELKjs Layered Downwards***: arrange the nodes in a flow by arranging as many edges as possible in subsequent layers downwards (via the ELKjs library).
+ ***ELKjs Box***: arrange the nodes in a flow by packing them like boxes.
+ ***Pull Request 2267***: algorithm implemented in a draft [pull request](https://github.com/node-red/node-red/pull/2267) dedicated for Node-RED.

### Settings
The settings depend on the selected layouting algorithm.

Settings for the dagrejs library (see a full list of all properties in their [wiki](https://github.com/dagrejs/dagre/wiki#configuring-the-layout)):
+ ***rankdir***: direction of the layout (e.g. “LR” stands for Left to Right).
+ ***marginx***: horizontal margin (in pixels) around the nodes.
+ ***marginy***: vertical margin (in pixels) around the nodes.
+ ***ranker***: method used for ranking nodes.
+ ***nodesep***: separation between adjacent nodes in the graph. This will be a horizontal separation (when rankdir is ‘TB’ or ‘BT’), or a vertical separation (when rankdir is ‘LR’ or ‘RL’).
+ ***ranksep***: separation between adjacent levels in the graph. This will be a horizontal separation (when rankdir is ‘TB’ or ‘BT’), or a vertical separation (when rankdir is ‘LR’ or ‘RL’).


Settings for the ELKjs library (see a full list of all properties in their [documentation](https://eclipse.dev/elk/reference/options.html)):
+ ***algorithm***: the layout algorithm1.
+ ***elk.direction***: the main layout direction ("UP" or "DOWN").
+ ***cycleBreaking.strategy***: "INTERACTIVE": This sets the strategy for cycle breaking (removing cycles in the graph for layout purposes) to interactive, which preserves the order of nodes within a layer but still minimizes crossings between edges connecting long edge dummies3.
+ ***layering.strategy***: the strategy to assign nodes to layers.
+ ***crossingMinimization.semiInteractive***: when true, semi-interactive crossing minimization is activated (which preserves the order of nodes within a layer but still minimizes crossings between edges connecting long edge).
+ ***separateConnectedComponents***: when true, each connected component of the graph is processed separately.
+ ***strategy***: "NETWORK_SIMPLEX": This sets the strategy for node placement (determining the x and y coordinates of nodes) to network simplex6.
+ ***nodeNode***: minimal distance to be preserved between each two nodes.
+ ***spacing.nodeNodeBetweenLayers***: spacing to be preserved between any pair of nodes of two adjacent layers.
+ ***spacing.edgeNode***: spacing to be preserved between nodes and edges.
+ ***spacing.edgeNodeBetweenLayers***: spacing to be preserved between nodes and edges that are routed next to the node’s layer.
+ ***spacing.edgeEdge***: spacing to be preserved between any two edges.
+ ***spacing.edgeEdgeBetweenLayers***: spacing between pairs of edges crossing the same layer.
+ ***hierarchyHandling***: controls how hierarchy is handled in the layout (e.g. "INCLUDE_CHILDREN" means that child nodes are included in the layout).
+ ***edgeNodeBetweenLayers***: spacing between edges and nodes between layers.
+ ***nodePlacement.bk.fixedAlignment***: the alignment of nodes during node placement (via the Brandes & Köpf node placement algorithm).
+ ***layerConstraint***: "FIRST" constrains a node to be placed in the first layer.
+ ***childAreaHeight***: the height of the area available for placing child nodes.
+ ***childAreaWidth***: the width of the area available for placing child nodes.

## Sharing Settings

If you have a layout configuration that you wish to include in the presets, then please share your configuration in the [Node-RED forum](https://discourse.nodered.org/t/announcement-node-red-autolayout-sidebar-experimental-version-s/82263).

Any suggestions and ideas are most welcome :+1:

