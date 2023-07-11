
/**
 * Class to contain methods related to the editors.
 */
class EditorInput {

    /**
     * Returns the textarea element object from the editor.
     * 
     * @param {String} editorId the id of the editor
     * @returns {HTMLElement} the textarea element from within the editor
     */
    static getInput(editorId) {
        return EditorInput._getChild(editorId, "input");
    }

    /**
     * Returns the code element object from the editor.
     * 
     * @param {String} editorId the id of the editor
     * @returns {HTMLElement} the code element from within the editor
     */
    static getHighlighted(editorId) {
        return EditorInput._getChild(editorId, "highlighted");
    }

    /**
     * Updates the content of the highlighted input in the code element from the textarea element.
     * 
     * @param {String} input the textarea element that calls the method
     */
    static update(input) {
        var content = input.value;

        if (content[content.length - 1] == "\n") { // If the last character is a newline character
            content += " "; // Add a placeholder space character to the final line
        }
        content = EditorInput._escapeHtml(content);

        var hightlighted = EditorInput._findElementWithId(input.parentNode.children, "highlighted");

        var mapping = SyntaxHighlighter.getMapping(input.parentNode.id);

        content = SyntaxHighlighter.highlight(content, mapping);
        
        hightlighted.innerHTML = content;
    }

    /**
     * Returns the raw input to the editor.
     * 
     * @param {String} editorId the editor ID to get the value from
     * @returns {String} the textarea value
     */
    static getValue(editorId) {
        var editor = EditorInput.getInput(editorId);
        return editor.value;
    }

    /**
     * Resets the editor.
     * 
     * @param {String} editorId the id of the editor to reset
     */
    static reset(editorId) {
        EditorInput.getInput(editorId).value = "";
        EditorInput.getHighlighted(editorId).innerHTML = "";
    }


    static scroll(input) {
        /* Scroll result to scroll coords of event - sync with textarea */
        let highlighted = EditorInput._findElementWithId(input.parentNode.children, "highlighted");
        // Get and set x and y
        highlighted.scrollTop = input.scrollTop;
        highlighted.scrollLeft = input.scrollLeft;
    }


    static tabHandler(element, event) {
        let code = element.value;
        if (event.key == "Tab") {
            /* Tab key pressed */
            event.preventDefault(); // stop normal
            let before_tab = code.slice(0, element.selectionStart); // text before tab
            let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
            let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
            element.value = before_tab + "\t" + after_tab;
            // add tab char
            // move cursor
            element.selectionStart = cursor_pos;
            element.selectionEnd = cursor_pos;
            EditorInput.update(element); // Update text to include indent
        }
    }


    // Methods to get the input and the highlighted elements from the editor id

    /**
     * Returns the child from the given element with the id.
     * 
     * @param {String} elementId the element to search in
     * @param {String} id the id of the element to find
     * @returns {HTMLElement} the element
     */
    static _getChild(elementId, id) {
        Debugger.log("Getting child with ID '" + id + "' from '" + elementId + "'");
        var element = document.getElementById(elementId);
        return EditorInput._findElementWithId(element.children, id);
    }

    /**
     * Returns the child from the given element with the id.
     * 
     * @param {HTMLCollection} elements the elements to search in
     * @param {String} id the id of the element to find
     * @returns {HTMLElement} the element
     */
    static _findElementWithId(elements, id) {
        var i = 0;
        while (!(elements[i].id == id)) {
            i++;
        }
        return elements[i];
    };


    /**
     * Escapes HTML in a string.
     * 
     * @param {String} unsafe the string to escape
     * @returns {String} the escaped string
     */
    static _escapeHtml(unsafe) {
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

}
