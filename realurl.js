/**
 * Copyright 2015 Atsushi Kojo.
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
  "use strict";
  var realurl = require('realurl');

  function RealURLNode (n) {
    RED.nodes.createNode(this, n);
    var node = this;
    this.on('input', function (msg) {
      if (typeof msg.payload === 'string') {
        realurl.get(msg.payload, function (err, result) {
          if (err) {
            node.error(err.toString());
            node.status({ fill: 'red', shape: 'ring', text: 'failed' });
          } else {
            msg.payload = result;
            node.status({});
            node.send(msg);
          }
        });
      } else {
        node.error('msg.payload : the short URL is not defined as a string');
      }
    });
  }
  RED.nodes.registerType('realurl', RealURLNode);
}