var manageDOM = {

    clearContent: function () {
        var content = document.getElementById('content');
        var wrapper = document.getElementById('wrapper');
        var css = document.getElementById('content_css');
        css.setAttribute('href', '');
    
        if (wrapper !== null) {
            console.log("REMOVED!");
            content.removeChild(wrapper);
        }
    },

    array2Div: function(arr) {

        var c = document.getElementById("content");

        var wrapper = document.createElement("div");
        wrapper.id = "wrapper";

        arr.forEach( function (element) {
            var e = document.createElement("div");
            e.id = element;
            wrapper.appendChild(e);
        });
        c.appendChild(wrapper);
    }
}

module.exports = manageDOM;