var manageDOM = {

    clearContent: function (parent) {
        var content = document.getElementById(parent);
        var wrapper = document.getElementById(parent + "_wrapper");
        var css = document.getElementById(parent + '_css');
        css.setAttribute('href', '');
    
        if (wrapper !== null) {
            console.log("REMOVED!");
            content.removeChild(wrapper);
        }
    },

    array2Div: function(arr, parent) {

        var c = document.getElementById(parent);

        var wrapper = document.createElement("div");
        wrapper.id = parent + "_wrapper";

        arr.forEach( function (element) {
            var e = document.createElement("div");
            e.id = element;
            wrapper.appendChild(e);
        });
        c.appendChild(wrapper);
    }
}

module.exports = manageDOM;