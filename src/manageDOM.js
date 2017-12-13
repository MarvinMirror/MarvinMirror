var manageDOM = {

    clearContent: (parent) => {
        var content = document.getElementById(parent);
        var wrapper = document.getElementById(parent + "_wrapper");
    
        if (wrapper !== null) {
            content.removeChild(wrapper);
        }
    },

    array2Div: (arr, parent) => {

        var c = document.getElementById(parent);

        var wrapper = document.createElement("div");
        wrapper.id = parent + "_wrapper";

        arr.forEach((element) => {
            var e = document.createElement("div");
            e.id = element;
            wrapper.appendChild(e);
        });
        c.appendChild(wrapper);
    }
}

module.exports = manageDOM;