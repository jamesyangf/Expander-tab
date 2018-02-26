/* Expander.js 
* James Yang 
* CSC 437 
* Clint Staley
*/

var createTabNode = function(rootNode) {
   for (var i = 1; i < rootNode.childNodes.length; i+=3) {

      // Creating the node and child nodes
      var tabDiv = document.createElement('div');
      var upNode = document.createElement('img');
      var downNode = document.createElement('img');
      var content = document.createElement('div');

      // Add properties to the nodes and child nodes
      tabDiv.className = 'tab';
      content.className = 'content';
      content.innerHTML = rootNode.childNodes[i].title;
      upNode.src = 'up.png';
      downNode.src = 'down.png';
      upNode.style.height = '25px';
      upNode.style.width = '25px';
      downNode.style.height = '25px';
      downNode.style.width = '25px';
      
      // Add the child node to the node
      tabDiv.appendChild(upNode);
      tabDiv.appendChild(downNode);
      tabDiv.appendChild(content);

      // Add the node to the root node
      rootNode.childNodes[i].before(tabDiv);
   }
};

var addClickListener = function(rootNode) {
   var tab = rootNode.childNodes;
   for (var i = 0; i < tab.length; i++) {
      // Adding click here
      if (tab[i].className === 'tab') {
         var tabNodes = tab[i].childNodes;
         for (var j = 0; j < tabNodes.length; j++) {
            // the title div
            if (tabNodes[j].className === 'content') {
               var content = tabNodes[j];
               content.addEventListener('click', function () {
                  if (this.style.backgroundColor === 'rgb(255, 153, 163)') {
                     this.parentNode.nextSibling.style.display = 'block';
                     this.style.backgroundColor = '#7FFF00';
                  }
                  else {
                     this.parentNode.nextSibling.style.display = 'none';
                     this.style.backgroundColor = 'rgb(255, 153, 163)';
                  }
               });
            }
            else if (tabNodes[j].getAttribute('src') === 'up.png') {
               var upDiv = tabNodes[j];
               upDiv.addEventListener('click', function () {
                  if (this.parentNode.previousSibling.previousSibling && this.parentNode.previousSibling.previousSibling.title) {
                     this.parentNode.previousSibling.previousSibling.previousSibling.before(this.parentNode);
                     this.parentNode.nextSibling.before(this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling);
                     this.parentNode.nextSibling.nextSibling.before(this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling);
                  }
               }); 
            }
            else if (tabNodes[j].getAttribute('src') === 'down.png') {
               var downDiv = tabNodes[j];
               downDiv.addEventListener('click', function () {
                  if (this.parentNode.nextSibling.nextSibling.nextSibling && this.parentNode.nextSibling.nextSibling.nextSibling.className) {
                     this.parentNode.before(this.parentNode.nextSibling.nextSibling.nextSibling);
                     this.parentNode.before(this.parentNode.nextSibling.nextSibling.nextSibling);
                     this.parentNode.before(this.parentNode.nextSibling.nextSibling.nextSibling);
                  }
               }); 
            }
         }
      }
      // margin to the content
      else if (rootNode.childNodes[i].title) {
         rootNode.childNodes[i].style.paddingLeft = '13px';
      }
   }
}


var Expander = function() {
}

Expander.__proto__.makeExpander = function(rootNode) {
   
   // Create the tab nodes
   createTabNode(rootNode);

   // Add Click Listener to the node
   addClickListener(rootNode);
   
}