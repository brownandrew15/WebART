
/**
 * Class to contain methods related to Syntax Highlighting in the editors.
 */
class SyntaxHighlighter {

    // object to store the colour mappings
    static mappings = {}

    /**
     * Sets the colour mapping for an ID.
     * 
     * @param {String} id the editor id
     * @param {Object} mapping the colour mapping
     */
    static addMapping(id, mapping) {
        SyntaxHighlighter.mappings[id] = mapping;
    }

    /**
     * Returns the syntax highlighting for the editor with the given id.
     * 
     * @param {String} id the editor ID
     * @returns {Object} the colour mapping or an empty object if there is no mapping for the id
     */
    static getMapping(id) {
        var mapping = SyntaxHighlighter.mappings[id];
        if (mapping === undefined) {
            Debugger.log("No mapping for ID " + id);
            return {};
        } 
        return mapping;
    }


    /**
     * Highlights the given text with the mapping provided.
     * 
     * @param {String} text the text to highlight
     * @param {Object} mapping the mapping to define the colours and which strings should be highighted
     * @returns {String} the highlighted text
     */
    static highlight(text, mapping) {
        for (let colour in mapping) {
            text = SyntaxHighlighter._addHighlighting(text, mapping[colour], colour);
        }
        return text;
    }


    /**
     * Adds the syntax highlighting to a string.
     * 
     * @param {String} text The text to highlight
     * @param {String} keywords The keywords to highlight in the content
     * @param {String} colour The colour to highlight the keywords in
     * @returns {String} the highlighted content
     */
    static _addHighlighting(text, keywords, colour) {
        for (var i = 0; i < keywords.length; i++) {
            var keyword = keywords[i].replace(/[^A-z0-9]/gi, ''); //remove non-alphanumeric characters
            var regex = new RegExp("(\\b)(" + keyword + ")(\\b)", "g"); // match keyword surrounded by word boundries
            text = text.replace(regex, "$1<span style=\"color: " + colour + ";\">$2</span>$3");
        }
        return text;
    }

}