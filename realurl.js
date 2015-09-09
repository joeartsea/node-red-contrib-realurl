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

  function RealURLNode(n) {
    RED.nodes.createNode(this, n);
    var node = this;

    var request = require('request');

    this.on('input', function (msg) {
      var timeoutval = msg.timeout || 15000;
      request({
        method: 'HEAD',
        url: msg.payload,
        followAllRedirects: true,
        headers: { 'User-Agent': '-U Mozilla' },
        timeout: timeoutval,
        jar: true
      },
        function (err, response) {
          if (err) {
            node.error(err, msg);
            node.status({ fill: 'red', shape: 'ring', text: 'failed' });
            node.send(msg);
          } else {
            msg.payload = response.request.href;
            node.status({});
            node.send(msg);
          }
        });

    });
  }

  RED.nodes.registerType('realurl', RealURLNode);
}