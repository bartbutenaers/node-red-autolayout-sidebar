/**
 * Copyright 2023 Bart Butenaers & Gerrit Riessen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
 module.exports = function (RED) {
    const fs   = require('fs');
    const path = require('path');

    // -------------------------------------------------------------------------------------------------
    // Determining the path to the files in the dependent elkjs module once.
    // See https://discourse.nodered.org/t/use-files-from-dependent-npm-module/17978/5?u=bartbutenaers
    // -------------------------------------------------------------------------------------------------
    var elkJsBundledPath = require.resolve("elkjs");

    // For example suppose the require.resolved results in elkJsBundledPath = /home/pi/.node-red/node_modules/elkjs/lib/main.js
    elkJsBundledPath = elkJsBundledPath.replace("main.js", "elk.bundled.js");

    if (!fs.existsSync(elkJsBundledPath)) {
        console.log("Javascript file " + elkJsBundledPath + " does not exist");
        elkJsBundledPath = null;
    }

    // -------------------------------------------------------------------------------------------------
    // Determining the path to the files in the dependent elkjs module once.
    // See https://discourse.nodered.org/t/use-files-from-dependent-npm-module/17978/5?u=bartbutenaers
    // -------------------------------------------------------------------------------------------------
    var dagreJsMinifiedPath = require.resolve("@dagrejs/dagre");

    // For example suppose the require.resolved results in dagreJsMinifiedPath = /home/pi/.node-red/node_modules/@dagrejs/dagre/index.js
    dagreJsMinifiedPath = dagreJsMinifiedPath.replace("index.js", "dist" + path.sep + "dagre.min.js");

    if (!fs.existsSync(dagreJsMinifiedPath)) {
        console.log("Javascript file " + dagreJsMinifiedPath + " does not exist");
        dagreJsMinifiedPath = null;
    }
 
    function AutoLayoutConfigNode (config) {
        RED.nodes.createNode(this, config)
        // Remark: we only store here the server-relevant settings
    }

    RED.nodes.registerType('auto_layout_config', AutoLayoutConfigNode);
    
    // Make all the javascript library files available to the FLOW EDITOR.
    // We use a separate endpoint, since no permissions are required to read those resources.
    // Otherwise we get 'unauthorized' problems, when calling this endpoint from a 'script' tag.
    // See details on https://discourse.nodered.org/t/unauthorized-when-accessing-custom-admin-endpoint/20201/4
    RED.httpAdmin.get('/auto_layout_config/lib/:libraryname', function(req, res){ 
        // Send the requested js library file to the client
        switch (req.params.libraryname) {
            case "elkjs":
                // The ElkJs graph layout library
                if (elkJsBundledPath) {
                    res.sendFile(elkJsBundledPath);
                    return;
                }
                break;
            case "dagrejs":
                // The DagreJs graph layout library
                if (dagreJsMinifiedPath) {
                    res.sendFile(dagreJsMinifiedPath);
                    return;
                }
                break;
        }
        
        res.writeHead(404);
        return res.end("The requested library is not supported");
    });
}
